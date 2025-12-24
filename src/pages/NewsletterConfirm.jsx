import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function NewsletterConfirm() {
    const checklistItems = [
        {
            title: 'Bestätigung erfolgreich',
            description: 'Ihre E-Mail-Adresse wurde verifiziert. Ab sofort erhalten Sie maximal vier Ausgaben pro Jahr.'
        },
        {
            title: 'Persönlich & regional',
            description: 'Wir teilen nur Inhalte, die Mietpark-Kund:innen im Saarland wirklich weiterhelfen.'
        },
        {
            title: 'Widerruf jederzeit',
            description: 'Ein Klick auf „Abmelden“ genügt – alternativ per E-Mail an kontakt@mietpark-saar-pfalz.com.'
        }
    ];

    const nextSteps = [
        {
            title: 'Neuigkeiten im Blog',
            text: 'Planen Sie jetzt schon den nächsten Ausflug – mit Tipps zu Dachboxen, Fahrradträgern und Hüpfburgen.',
            cta: 'Zum Blog',
            to: '/blog'
        },
        {
            title: 'Direkte Beratung',
            text: 'Sie haben eine konkrete Anfrage? Daniel Brußig hilft Ihnen persönlich weiter – telefonisch oder per E-Mail.',
            cta: 'Kontakt aufnehmen',
            to: '#contact'
        }
    ];

    const seoDescription = 'Newsletter-Anmeldung bestätigt – Mietpark Saar-Pfalz versendet vierteljährliche Updates mit Dachbox-Tipps, Verfügbarkeiten und persönlichen Empfehlungen.';

    return (
        <div className="legal-page" style={{ background: '#f8f9fa' }}>
            <SEOHead
                title="Newsletter bestätigt | Mietpark Saar-Pfalz"
                description={seoDescription}
                keywords="Newsletter Mietpark Saar-Pfalz, Double Opt In, Bestätigung"
            />

            <section style={{
                background: 'linear-gradient(135deg, #1a4d2e 0%, #4f772d 100%)',
                padding: '4rem 0',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <p style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: '999px',
                        padding: '0.4rem 1rem',
                        marginBottom: '1.4rem'
                    }}>
                        <span role="img" aria-label="success">✅</span> Anmeldung bestätigt
                    </p>
                    <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Willkommen im Mietpark Newsletter</h1>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                        Vielen Dank! Ihre Anmeldung wurde erfolgreich bestätigt. Sie erhalten maximal vier Nachrichten pro Jahr – mit regionalen Verfügbarkeitsupdates,
                        Transport-Tipps und exklusiven Hinweisen von Mietpark Saar-Pfalz.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <Link to="/" className="btn btn-secondary" style={{ marginRight: '1rem' }}>Zur Startseite</Link>
                        <Link to="/blog" className="btn btn-accent">Blog entdecken</Link>
                    </div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '3rem' }}>
                <div className="container" style={{ display: 'grid', gap: 'var(--spacing-xxl)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    <div style={{ background: 'white', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', padding: 'var(--spacing-xxl)' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Was Sie erwartet</h2>
                        <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-muted)' }}>
                            Der Newsletter erscheint vierteljährlich – keine Werbung, keine täglichen Mails. Stattdessen erhalten Sie kompakte Empfehlungen und konkrete Hinweise, wenn Dachboxen oder Zubehör knapp werden.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--spacing-md)' }}>
                            {checklistItems.map(item => (
                                <li key={item.title} style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                    <span style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>•</span>
                                    <div>
                                        <strong style={{ display: 'block' }}>{item.title}</strong>
                                        <span style={{ color: 'var(--text-muted)' }}>{item.description}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ background: 'white', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', padding: 'var(--spacing-xxl)' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Nächste Schritte</h2>
                        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                            {nextSteps.map(step => (
                                <div key={step.title} style={{ border: '1px solid var(--border)', borderRadius: 'var(--border-radius-md)', padding: 'var(--spacing-lg)' }}>
                                    <h3 style={{ marginBottom: 'var(--spacing-xs)', color: 'var(--primary)' }}>{step.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)' }}>{step.text}</p>
                                    {step.to.startsWith('#') ? (
                                        <a href={step.to} className="btn btn-outline-primary">{step.cta}</a>
                                    ) : (
                                        <Link to={step.to} className="btn btn-outline-primary">{step.cta}</Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ paddingBottom: '4rem' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ background: '#1a4d2e', color: 'white', borderRadius: 'var(--border-radius-lg)', padding: 'var(--spacing-xxxl)', boxShadow: 'var(--shadow-lg)' }}>
                        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Noch Fragen?</h2>
                        <p style={{ marginBottom: 'var(--spacing-lg)', lineHeight: 1.7 }}>
                            Melden Sie sich direkt bei Daniel Brußig – telefonisch, per WhatsApp oder E-Mail. Wir antworten in der Regel innerhalb eines Werktages und helfen Ihnen bei individuellen Anfragen sofort weiter.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                            <a href="mailto:kontakt@mietpark-saar-pfalz.com" className="btn btn-secondary">E-Mail senden</a>
                            <a href="tel:+491737615995" className="btn btn-accent">Anrufen</a>
                            <Link to="/" className="btn btn-outline-light">Zurück zur Homepage</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
