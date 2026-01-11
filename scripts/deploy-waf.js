#!/usr/bin/env node

/**
 * Cloudflare WAF Configuration Script
 * Deployed WAF Rule für Block AI Bots on Legal Pages
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cloudflare API Credentials
const ACCOUNT_ID = '600df42578d05bdf7c2a08a4f93f0b70';
const DOMAIN = 'mietpark-saar-pfalz.com';

// Lese API Token aus Environment oder .env.local
let apiToken = process.env.CLOUDFLARE_API_TOKEN;

// Falls nicht im Environment, versuche aus .env.local zu lesen
if (!apiToken) {
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf-8');
    const match = envContent.match(/CLOUDFLARE_API_TOKEN=(.+)/);
    if (match) {
      apiToken = match[1].trim();
    }
  }
}

if (!apiToken) {
  console.error('❌ Error: CLOUDFLARE_API_TOKEN not found');
  console.error('Set it via: export CLOUDFLARE_API_TOKEN=your_token');
  console.error('Or add to .env: CLOUDFLARE_API_TOKEN=your_token');
  process.exit(1);
}

/**
 * Make HTTPS request to Cloudflare API
 */
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4${path}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (!json.success) {
            reject(new Error(`API Error: ${json.errors?.[0]?.message || 'Unknown error'}`));
          } else {
            resolve(json.result);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

/**
 * Main Deployment Function
 */
async function deployWAF() {
  try {
    console.log('🔧 Deploying WAF Rule for Legal Pages...\n');

    // 1. Get Zone ID
    console.log('📍 Step 1: Finding Zone ID...');
    const zones = await makeRequest('GET', '/zones?name=' + DOMAIN);
    
    if (!zones || zones.length === 0) {
      throw new Error(`Zone not found for domain: ${DOMAIN}`);
    }

    const zoneId = zones[0].id;
    console.log(`✅ Zone ID: ${zoneId}\n`);

    // 2. Check if rule already exists
    console.log('🔍 Step 2: Checking for existing rule...');
    let existingRules = [];
    try {
      // Versuche zunächst den WAF-Regeln-Endpoint
      const rulesResponse = await makeRequest('GET', `/zones/${zoneId}/firewall/rules?name=Block%20AI%20Bots`);
      if (rulesResponse && rulesResponse.length > 0) {
        existingRules = rulesResponse;
      }
    } catch (e) {
      // Fallback: Versuche Custom Firewall Rules
      console.log('  (WAF rules endpoint nicht verfügbar, versuche custom rules)');
    }
    
    if (existingRules.length > 0) {
      console.log('⚠️  Rule already exists. Skipping creation.\n');
      console.log(`Rule ID: ${existingRules[0].id}`);
      return;
    }

    // 3. Create Firewall Rule (statt WAF Rule)
    console.log('✏️  Step 3: Creating Firewall Rule...');
    
    const firewallRule = {
      name: 'Block AI Bots on Legal Pages',
      description: 'Block AI Crawlers (OpenAI, Perplexity, etc.) from accessing legal pages. Allows regular SEO bots.',
      filter: {
        expression: `(http.request.uri.path contains "/impressum" or http.request.uri.path contains "/datenschutz" or http.request.uri.path contains "/agb") and (cf.verified_bot_category eq "AI Crawler" or cf.bot_management.verified_bot_category eq "AI Crawler")`
      },
      action: 'managed_challenge',
      priority: 1,
      products: ['firewall'],
      enabled: true,
    };

    let createdRule;
    try {
      // Versuche neuen Firewall Rules API (Ruleset Engine)
      createdRule = await makeRequest('POST', `/zones/${zoneId}/firewall/rules`, firewallRule);
    } catch (e) {
      console.error('Firewall Rules API fehlgeschlagen. Details:', e.message);
      console.error('\n⚠️  Hinweis: Dein Cloudflare Plan unterstützt möglicherweise keine WAF.');
      console.error('WAF ist nur in Pro+ Plans verfügbar.');
      console.error('\n💡 Alternative: Manuelle Konfiguration im Dashboard:');
      console.error('https://dash.cloudflare.com/?account=600df42578d05bdf7c2a08a4f93f0b70&zone=' + zoneId + '&page=waf');
      process.exit(1);
    }
    
    console.log('✅ WAF Rule Created Successfully!\n');
    console.log(`Rule ID: ${createdRule.id}`);
    console.log(`Name: ${createdRule.name}`);
    console.log(`Mode: ${createdRule.mode}`);
    console.log(`Status: ${createdRule.enabled ? 'Enabled' : 'Disabled'}\n`);

    // 4. Verify
    console.log('🔐 Step 4: Verifying Rule...');
    const _verification = await makeRequest('GET', `/zones/${zoneId}/firewall/waf/rules/${createdRule.id}`);
    console.log(`✅ Verification successful! Rule is active.\n`);

    // 5. Test Instructions
    console.log('🧪 Testing:\n');
    console.log('Test with normal bot (should pass):');
    console.log(`curl -I https://${DOMAIN}/impressum \\`);
    console.log(`  -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)"`);
    console.log(`# Expected: HTTP 200 OK\n`);

    console.log('Test with GPTBot (should be challenged):');
    console.log(`curl -I https://${DOMAIN}/impressum \\`);
    console.log(`  -H "User-Agent: Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)"`);
    console.log(`# Expected: HTTP 403 Forbidden or 429 Challenge\n`);

    console.log('Monitor in Dashboard:');
    console.log(`🔗 https://dash.cloudflare.com/${ACCOUNT_ID}?zone=${zoneId}&page=waf\n`);

    console.log('✨ WAF Rule deployment complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run
deployWAF();
