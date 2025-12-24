import React, { useState } from 'react';

const badgeText = 'Vierteljährlich · Persönlich · DSGVO-konform';
const benefitItems = [
    { icon: '📅', title: 'Saisonale Tipps', text: 'Praktische Checklisten für Ferien- und Wintersaison.' },
    { icon: '📦', title: 'Verfügbarkeiten zuerst', text: 'Frühzeitige Hinweise, wenn Dachboxen knapp werden.' },
    { icon: '✉️', title: 'Max. 4 E-Mails/Jahr', text: 'Nur relevante Infos, Abmeldung jederzeit möglich.' }
];

export default function NewsletterSection({ sectionId, variant = 'default' }) {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterConsent, setNewsletterConsent] = useState(false);
    const [newsletterStatus, setNewsletterStatus] = useState({ type: 'idle', message: '' });
    const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
    const newsletterEndpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
    // NOTE: This regex must stay in sync with workers/newsletter/src/index.js
    const newsletterEmailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;

    const isCompact = variant === 'compact';
    const headingId = sectionId ? `${sectionId}-heading` : 'newsletter-heading';

    const handleNewsletterSubmit = async (event) => {
        event.preventDefault();
        const email = newsletterEmail.trim();

        if (!newsletterEmailRegex.test(email)) {
            setNewsletterStatus({ type: 'error', message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein (z. B. ihr.name@example.com).' });
            return;
        }

        if (!newsletterConsent) {
            setNewsletterStatus({ type: 'error', message: 'Bitte bestätigen Sie die Datenschutzerklärung, um den Newsletter zu erhalten.' });
            return;
        }

        if (!newsletterEndpoint) {
            if (import.meta.env.DEV) {
                console.warn('Newsletter endpoint ist nicht konfiguriert. Bitte VITE_NEWSLETTER_ENDPOINT setzen.');
            }
            setNewsletterStatus({ type: 'error', message: 'Newsletter-Service ist momentan nicht verfügbar. Bitte versuchen Sie es später erneut.' });
            return;
        }

        setNewsletterSubmitting(true);
        setNewsletterStatus({ type: 'loading', message: 'Anmeldung wird gesendet …' });

        try {
            const response = await fetch(newsletterEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, consent: newsletterConsent, source: variant === 'compact' ? 'article' : 'home' }),
                mode: 'cors'
            });

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(result?.message || 'Leider konnte die Anmeldung nicht abgeschlossen werden.');
            }

            setNewsletterStatus({ type: 'success', message: result?.message || 'Vielen Dank! Bitte bestätige deine Anmeldung im Posteingang.' });
            setNewsletterEmail('');
            setNewsletterConsent(false);
        } catch (error) {
            const fallback = error instanceof Error ? error.message : 'Es ist ein unbekannter Fehler aufgetreten.';
            setNewsletterStatus({ type: 'error', message: fallback.includes('fetch') ? 'Netzwerkfehler – bitte versuche es in wenigen Sekunden erneut.' : fallback });
        } finally {
            setNewsletterSubmitting(false);
        }
    };

    return (
        <section className="section bg-light" id={sectionId}>
            <div className="container" style={isCompact ? { maxWidth: '960px' } : undefined}>
                <div
                    className="newsletter-card"
                    style={{
                        padding: isCompact ? 'var(--spacing-xxl)' : 'var(--spacing-xxxl)',
                        borderRadius: 'var(--border-radius-lg)',
                        boxShadow: 'var(--shadow-lg)',
                        background: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: isCompact ? 'minmax(0, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 'var(--spacing-xxl)',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{ textAlign: isCompact ? 'center' : 'left' }}>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <span
                                    style={{
                                        background: 'var(--accent)',
                                        color: 'white',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '999px',
                                        fontSize: '0.85rem',
                                        letterSpacing: '0.05em',
                                        display: 'inline-block'
                                    }}
                                >
                                    {badgeText}
                                </span>
                            </div>
                            <h2
                                style={{
                                    fontSize: isCompact ? '2rem' : '2.3rem',
                                    color: 'var(--primary)',
                                    marginBottom: 'var(--spacing-md)'
                                }}
                            >
                                Newsletter
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                                Erhalte einmal pro Quartal kompakte Updates zu Verfügbarkeiten, Dachbox-Checks und regionalen Transport-Tipps.
                                Kurz, persönlich und nur dann, wenn es wirklich etwas Neues gibt.
                            </p>

                            <div style={{ display: 'grid', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)' }}>
                                {benefitItems.map((item, index) => (
                                    <div
                                        key={item.title}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'auto 1fr',
                                            gap: 'var(--spacing-md)',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: isCompact ? '46px' : '52px',
                                                height: isCompact ? '46px' : '52px',
                                                borderRadius: '999px',
                                                background:
                                                    index === 0
                                                        ? 'rgba(25,135,84,0.15)'
                                                        : index === 1
                                                            ? 'rgba(0,123,255,0.13)'
                                                            : 'rgba(255,193,7,0.2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: isCompact ? '1.3rem' : '1.5rem'
                                            }}
                                        >
                                            {item.icon}
                                        </div>
                                        <div>
                                            <strong style={{ display: 'block', color: 'var(--primary)' }}>{item.title}</strong>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: 'var(--border-radius-lg)',
                                padding: isCompact ? 'var(--spacing-lg) var(--spacing-xl)' : 'var(--spacing-xl) var(--spacing-xxl)',
                                position: 'relative'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.15, fontSize: '2rem' }}>✉️</div>
                            <h3 id={headingId} style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.7rem' }}>
                                Jetzt vormerken lassen
                            </h3>
                            <p style={{ marginBottom: 'var(--spacing-lg)', lineHeight: 1.6 }}>
                                Nur E-Mail-Adresse + Einwilligung – danach erhältst du eine kurze Bestätigungsmail. Ohne Klick auf den
                                persönlichen Link erfolgt kein Versand.
                            </p>
                            <form onSubmit={handleNewsletterSubmit} aria-labelledby={headingId} style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                                <div>
                                    <label htmlFor={`${headingId}-email`} style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                                        E-Mail-Adresse *
                                    </label>
                                    <input
                                        id={`${headingId}-email`}
                                        className="newsletter-input"
                                        type="email"
                                        value={newsletterEmail}
                                        onChange={(event) => setNewsletterEmail(event.target.value)}
                                        placeholder="ihre.email@example.com"
                                        required
                                    />
                                </div>

                                <label style={{ display: 'flex', gap: '0.6rem', fontSize: '0.9rem', alignItems: 'flex-start' }}>
                                    <input
                                        type="checkbox"
                                        checked={newsletterConsent}
                                        onChange={(event) => setNewsletterConsent(event.target.checked)}
                                        required
                                        style={{ marginTop: '0.2rem' }}
                                    />
                                    <span>
                                        Ich bestätige, dass ich den Newsletter erhalten möchte und habe die{' '}
                                        <a href="/datenschutz" style={{ color: 'white', textDecoration: 'underline' }}>
                                            Datenschutzerklärung
                                        </a>{' '}
                                        gelesen.
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={newsletterSubmitting}
                                    style={{
                                        background: 'white',
                                        color: 'var(--primary)',
                                        border: 'none',
                                        padding: '0.9rem 1.5rem',
                                        borderRadius: 'var(--border-radius-md)',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        opacity: newsletterSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {newsletterSubmitting ? 'Wird gesendet …' : 'Per E-Mail vormerken'}
                                </button>
                            </form>

                            <div aria-live="polite" style={{ minHeight: '3rem', marginTop: 'var(--spacing-sm)' }}>
                                {newsletterStatus.type !== 'idle' && (
                                    <div
                                        style={{
                                            padding: '0.8rem 1rem',
                                            borderRadius: 'var(--border-radius-md)',
                                            background:
                                                newsletterStatus.type === 'success'
                                                    ? 'rgba(25,135,84,0.15)'
                                                    : newsletterStatus.type === 'error'
                                                        ? 'rgba(255,255,255,0.15)'
                                                        : 'rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.3)'
                                        }}
                                    >
                                        {newsletterStatus.message}
                                    </div>
                                )}
                            </div>

                            <p style={{ fontSize: '0.85rem', marginTop: 'var(--spacing-lg)', opacity: 0.9 }}>
                                Versand maximal viermal im Jahr. Abmeldung jederzeit per Link in jeder E-Mail, kein individuelles
                                Öffnungs-Tracking.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
