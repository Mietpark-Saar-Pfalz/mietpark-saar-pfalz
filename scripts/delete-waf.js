#!/usr/bin/env node

/**
 * Delete WAF Rule
 * Löscht die existierende Rule "Block AI Bots on Legal Pages"
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ACCOUNT_ID = '600df42578d05bdf7c2a08a4f93f0b70';
const DOMAIN = 'mietpark-saar-pfalz.com';
const RULE_ID = '1af13b18e5564b9fb8b96c2e5ecefc1d'; // Die existierende Rule ID

let apiToken = process.env.CLOUDFLARE_API_TOKEN;

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
  process.exit(1);
}

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

async function deleteRule() {
  try {
    console.log('🗑️  Deleting old WAF Rule...\n');

    // 1. Get Zone ID
    console.log('📍 Finding Zone ID...');
    const zones = await makeRequest('GET', '/zones?name=' + DOMAIN);
    const zoneId = zones[0].id;
    console.log(`✅ Zone ID: ${zoneId}\n`);

    // 2. Delete Rule
    console.log(`🗑️  Deleting rule ${RULE_ID}...`);
    await makeRequest('DELETE', `/zones/${zoneId}/firewall/rules/${RULE_ID}`);
    console.log('✅ Rule deleted successfully!\n');

    console.log('💡 Next: Run `npm run deploy:waf` to create the updated rule');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deleteRule();
