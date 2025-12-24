import React from 'react';
import { Link } from 'react-router-dom';

export default function Datenschutz() {
    return (
        <div className="legal-page datenschutz-page">
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #1a4d2e 0%, #4f772d 100%)',
                padding: '4rem 0 3rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <Link to="/" className="btn" style={{
                        marginBottom: '1.5rem',
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.3)',
                        backdropFilter: 'blur(10px)',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span>←</span> Zurück zur Startseite
                    </Link>
                    <h1 style={{
                        color: 'white',
                        fontSize: '2.5rem',
                        marginBottom: '0.5rem',
                        fontWeight: '800',
                        textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}>Datenschutzerklärung</h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.95)',
                        fontSize: '1.1rem',
                        textShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>Mietpark Saar-Pfalz in Homburg/Saar</p>
                </div>
            </div>

            {/* Content */}
            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>1. Information über die Erhebung personenbezogener Daten</h2>

                        <h3 style={{ fontSize: '1.1rem', marginTop: '2rem', marginBottom: '0.5rem' }}>1.1</h3>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            Wir freuen uns, dass Sie unsere Website besuchen und bedanken uns für Ihr Interesse. Im Folgenden informieren wir Sie über den Umgang mit Ihren personenbezogenen Daten bei der Nutzung unserer Website. Personenbezogene Daten sind hierbei alle Daten, mit denen Sie persönlich identifiziert werden können.
                        </p>

                        <h3 style={{ fontSize: '1.1rem', marginTop: '2rem', marginBottom: '0.5rem' }}>1.2</h3>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist <strong>Daniel Brußig, Kastanienweg 17, 66424 Homburg, Deutschland</strong>, Tel.: +491737615995, E-Mail: kontakt@mietpark-saarpfalz.com. Der für die Verarbeitung von personenbezogenen Daten Verantwortliche ist diejenige natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
                        </p>

                        <h3 style={{ fontSize: '1.1rem', marginTop: '2rem', marginBottom: '0.5rem' }}>1.3</h3>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung personenbezogener Daten und anderer vertraulicher Inhalte (z.B. Bestellungen oder Anfragen an den Verantwortlichen) eine SSL-bzw. TLS-Verschlüsselung. Sie können eine verschlüsselte Verbindung an der Zeichenfolge „https://" und dem Schloss-Symbol in Ihrer Browserzeile erkennen.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>2. Datenerfassung beim Besuch unserer Website</h2>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            Bei der bloß informatorischen Nutzung unserer Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur solche Daten, die Ihr Browser an unseren Server übermittelt (sog. „Server-Logfiles"). Wenn Sie unsere Website aufrufen, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen die Website anzuzeigen:
                        </p>
                        <ul style={{ lineHeight: '1.8', color: '#444', paddingLeft: '2rem', marginTop: '1rem' }}>
                            <li>Unsere besuchte Website</li>
                            <li>Datum und Uhrzeit zum Zeitpunkt des Zugriffes</li>
                            <li>Menge der gesendeten Daten in Byte</li>
                            <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
                            <li>Verwendeter Browser</li>
                            <li>Verwendetes Betriebssystem</li>
                            <li>Verwendete IP-Adresse (ggf.: in anonymisierter Form)</li>
                        </ul>
                        <p style={{ lineHeight: '1.8', color: '#444', marginTop: '1rem' }}>
                            Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>3. Cookies</h2>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            Um den Besuch unserer Website attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen, verwenden wir auf verschiedenen Seiten sogenannte Cookies. Hierbei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät abgelegt werden.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>4. Kontaktaufnahme</h2>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            Im Rahmen der Kontaktaufnahme mit uns (z.B. per Kontaktformular oder E-Mail) werden personenbezogene Daten erhoben. Diese Daten werden ausschließlich zum Zweck der Beantwortung Ihres Anliegens bzw. für die Kontaktaufnahme und die damit verbundene technische Administration gespeichert und verwendet.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>5. Newsletter & Double-Opt-In</h2>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            Wenn Sie sich auf unserer Website für den vierteljährlichen Newsletter anmelden, verarbeiten wir ausschließlich Ihre E-Mail-Adresse sowie den Zeitpunkt der Anmeldung. Die Eingabe erfolgt über ein Formular, das durch einen Cloudflare Worker gesichert ist. Dieser Worker übernimmt die Validierung, speichert keine Daten dauerhaft und leitet die geprüften Informationen ausschließlich an unseren E-Mail-Dienstleister Brevo (Sendinblue GmbH, Deutschland) weiter.
                        </p>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            Die Anmeldung erfolgt mittels Double-Opt-In-Verfahren: Nach Absenden des Formulars erhalten Sie eine Bestätigungsmail von Brevo, in der Sie Ihre Anmeldung über einen personalisierten Link bestätigen müssen. Ohne Bestätigung findet kein Versand statt. Brevo protokolliert Zeitstempel, IP-Adresse und den Klick auf den Bestätigungslink, sodass wir Ihrer Einwilligung gemäß Art. 7 DSGVO nachkommen können.
                        </p>
                        <ul style={{ lineHeight: '1.8', color: '#444', paddingLeft: '2rem', marginTop: '1rem' }}>
                            <li><strong>Zweck:</strong> Versand des vierteljährlichen Newsletters mit Tipps, Verfügbarkeiten und Hinweisen zu Mietprodukten.</li>
                            <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</li>
                            <li><strong>Empfänger:</strong> Brevo (Sendinblue GmbH) als Auftragsverarbeiter; Verarbeitung innerhalb der EU.</li>
                            <li><strong>Speicherdauer:</strong> Bis zum Widerruf Ihrer Einwilligung; anschließend Löschung binnen 30 Tagen.</li>
                            <li><strong>Tracking:</strong> Wir werten nur aggregierte Öffnungs- und Klickraten aus, keine personenbezogenen Profile.</li>
                        </ul>
                        <p style={{ lineHeight: '1.8', color: '#444', marginTop: '1rem' }}>
                            Sie können den Newsletter jederzeit über den Abmeldelink in jeder E-Mail oder per Nachricht an <a href="mailto:kontakt@mietpark-saarpfalz.com" style={{ color: 'var(--primary)' }}>kontakt@mietpark-saarpfalz.com</a> abbestellen. Ihre ursprüngliche Einwilligung können Sie ebenfalls widerrufen; die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt hiervon unberührt.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>6. Rechte des Betroffenen</h2>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            Das geltende Datenschutzrecht gewährt Ihnen gegenüber dem Verantwortlichen hinsichtlich der Verarbeitung Ihrer personenbezogenen Daten umfassende Betroffenenrechte (Auskunfts- und Interventionsrechte):
                        </p>
                        <ul style={{ lineHeight: '1.8', color: '#444', paddingLeft: '2rem', marginTop: '1rem' }}>
                            <li>Auskunftsrecht gemäß Art. 15 DSGVO</li>
                            <li>Recht auf Berichtigung gemäß Art. 16 DSGVO</li>
                            <li>Recht auf Löschung gemäß Art. 17 DSGVO</li>
                            <li>Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO</li>
                            <li>Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO</li>
                            <li>Recht auf Widerruf erteilter Einwilligungen gemäß Art. 7 Abs. 3 DSGVO</li>
                            <li>Recht auf Beschwerde gemäß Art. 77 DSGVO</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>7. Dauer der Speicherung personenbezogener Daten</h2>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            Die Dauer der Speicherung von personenbezogenen Daten bemisst sich anhand der jeweiligen Rechtsgrundlage, am Verarbeitungszweck und – sofern einschlägig – zusätzlich anhand der jeweiligen gesetzlichen Aufbewahrungsfrist (z.B. handels- und steuerrechtliche Aufbewahrungsfristen).
                        </p>
                    </section>

                    <div style={{
                        marginTop: '4rem',
                        padding: '2rem',
                        background: '#f8f9fa',
                        borderRadius: '12px',
                        borderLeft: '4px solid var(--primary)'
                    }}>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                            <strong>Stand:</strong> Dezember 2025<br />
                            Bei Fragen zum Datenschutz kontaktieren Sie uns gerne unter: <a href="mailto:kontakt@mietpark-saarpfalz.com" style={{ color: 'var(--primary)' }}>kontakt@mietpark-saarpfalz.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
