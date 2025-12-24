import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import { products } from '../data/products';

// Separate component for benefit cards with animation
const BenefitCard = ({ benefit, index }) => {
    const benefitAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { mass: 1, tension: 170, friction: 26 },
        delay: 100 * index + 900 // Staggered delay after hero animations
    });

    return (
        <animated.div className="benefit" style={benefitAnimation}>
            <div className="icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
        </animated.div>
    );
};

export default function Home() {
    // Seasonal logic for Hero Section
        const currentMonth = new Date().getMonth(); // 0-11
        const partnerLine = 'Ihr verlässlicher Partner im Saarland, Homburg und Umgebung seit 2023.';
        const makeSubtitle = (text) => `${partnerLine} ${text}`;
        let heroConfig = {
            image: '/images/hero_summer.jpg',
            title: 'Mehr Platz für Ihre Erlebnisse.',
            subtitle: makeSubtitle('Dachboxen, Heckboxen & mehr – Mieten statt kaufen im Mietpark Saar-Pfalz.')
        };

    if ([10, 11, 0, 1].includes(currentMonth)) {
        // Winter: Nov, Dec, Jan, Feb
        heroConfig = {
            image: '/images/hero_winter.jpg', // Geändert zu hero_winter.jpg für besseren Kontrast
            title: 'Mehr Raum für Winterabenteuer.',
            subtitle: makeSubtitle('Dachboxen für Ski & Snowboard – Mieten in Homburg und Umgebung im Mietpark Saar-Pfalz.')
        };
    } else if ([8, 9].includes(currentMonth)) {
        // Autumn: Sep, Oct
        heroConfig = {
            image: '/images/hero_autumn.jpg',
            title: 'Ihr Begleiter für den Herbst.',
            subtitle: makeSubtitle('Stauraum für goldene Oktober-Touren und Snowboard-Equipment – Mieten in Homburg und Umgebung.')
        };
    } else {
        // Spring/Summer: Mar - Aug
        heroConfig = {
            image: '/images/hero_summer.jpg',
            title: 'Mehr Platz für den Sommerurlaub.',
            subtitle: makeSubtitle('Dachboxen, Fahrradträger & Wintersport-Ausrüstung für Ihre Reise – Mieten in Homburg und Umgebung.')
        };
    }

    const titleAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { mass: 1, tension: 120, friction: 14 },
        delay: 200
    });
    // Use CSS classes for responsive typography (.hero-title, .hero-subtitle)

    const subtitleAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { mass: 1, tension: 120, friction: 14 },
        delay: 400
    });


    const actionsAnimation = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { mass: 1, tension: 120, friction: 14 },
        delay: 800
    });

    const seoDescription = `${partnerLine} Flexible Dachbox-Miete, Montageservice und persönliche Beratung für Urlauber und Pendler im Saarland.`;
    const seoKeywords = 'Dachbox mieten Saarland, Dachbox Homburg, Heckbox Vermietung, Fahrradträger leihen';

    const benefitsData = [
        {
            icon: '✓',
            title: 'Flexible Abholung',
            description: 'Möglich vor Mietbeginn – stressfrei und individuell in Homburg.'
        },
        {
            icon: '€',
            title: 'Faire Preise',
            description: 'Transparente Wochenpreise. Kaution 150€.'
        },
        {
            icon: '🛠️',
            title: 'Montage inklusive',
            description: 'Wir helfen bei der Montage & Einweisung.'
        }
    ];

    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterConsent, setNewsletterConsent] = useState(false);
    const [newsletterStatus, setNewsletterStatus] = useState({ type: 'idle', message: '' });
    const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
    const newsletterEndpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
    // NOTE: This regex must stay in sync mit workers/newsletter/src/index.js
    const newsletterEmailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;

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
                body: JSON.stringify({ email, consent: newsletterConsent, source: 'home' }),
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

    // Structured Data Script in useEffect hinzufügen
    React.useEffect(() => {
        const localBusinessSchema = {
            "@context": "http://schema.org",
            "@type": "LocalBusiness",
            "name": "Mietpark Saar-Pfalz",
            "image": "https://mietpark-saar-pfalz.com/images/logo.png",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kastanienweg 17",
                "addressLocality": "Homburg",
                "postalCode": "66424",
                "addressRegion": "Saarland",
                "addressCountry": "DE"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "49.2838384",
                "longitude": "7.3414247"
            },
            "url": "https://mietpark-saar-pfalz.com/",
            "telephone": "+491737615995",
            "description": partnerLine,
            "priceRange": "€€",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday"
                    ],
                    "opens": "09:00",
                    "closes": "17:00"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "13:00"
                }
            ]
        };

        // Entferne vorhandene Structured Data
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Neue Structured Data hinzufügen
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(localBusinessSchema);
        document.head.appendChild(script);

        // Cleanup beim Unmount
        return () => {
            const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, []);

    return (
        <>
            <SEOHead description={seoDescription} keywords={seoKeywords} />
            {/* Hero Section */}
            <section className="hero" id="home" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('${heroConfig.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                position: 'relative'
            }}>
                <div className="container hero-content" style={{ position: 'relative', zIndex: 1 }}>
                    <animated.h1 className="hero-title" style={titleAnimation}>{heroConfig.title}</animated.h1>
                    <animated.p className="hero-subtitle" style={subtitleAnimation}>{heroConfig.subtitle}</animated.p>
                    <animated.div className="hero-actions" style={actionsAnimation}>
                        <a href="#products" className="btn btn-accent">Zum Angebot</a>
                        <a href="#contact" className="btn btn-secondary">Kontakt</a>
                    </animated.div>
                </div>
            </section>

            <section className="section partner-highlight">
                <div className="container partner-card">
                    <div className="partner-text">
                        <div className="partner-badge">Seit 2023</div>
                        <h2 style={{ marginBottom: 'var(--spacing-xs)' }}>Verlässlicher Partner für Dachboxen im Saarland</h2>
                        <p>{partnerLine} Von der Beratung über Abholung bis zur Montage – wir sind Ihr persönlicher Ansprechpartner.</p>
                        <div className="partner-list">
                            <div>
                                <span>📍</span>
                                <p>Homburg & Umgebung ist unsere Heimat – schnelle Abholung & Rückgabe.</p>
                            </div>
                            <div>
                                <span>🤝</span>
                                <p>Persönliche Betreuung: Daniel Brußig steht mit Rat und Tat zur Seite.</p>
                            </div>
                            <div>
                                <span>⚡</span>
                                <p>Antworten innerhalb eines Werktages, inklusive telefonischer Beratung.</p>
                            </div>
                        </div>
                        <a href="#contact" className="btn btn-accent" style={{ marginTop: 'var(--spacing-md)' }}>Direkt anfragen</a>
                    </div>
                    <div className="partner-avatar-block">
                        <img src="/images/Betreiber.jpeg" alt="Daniel Brußig" />
                        <p><strong>Daniel Brußig</strong> – Betreiber & Ansprechpartner</p>
                        <p className="partner-avatar-caption">Ihr zuverlässiger Partner für Dachboxen, Fahrradträger & Wintersport-Ausrüstung seit 2023.</p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="section bg-light">
                <div className="container">
                    <div className="benefits-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-xl)' }}>
                        {benefitsData.map((benefit, index) => (
                            <BenefitCard key={index} benefit={benefit} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="section bg-light">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="section-title" style={{ marginBottom: 'var(--spacing-md)' }}>Was unsere Kunden sagen</h2>
                    <p className="section-subtitle" style={{ marginBottom: 'var(--spacing-xxxl)' }}>Vertrauen Sie auf ehrliche Erfahrungen</p>
                    <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-xl)' }}>
                        <div className="testimonial-card" style={{ background: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'left' }}>
                            <p style={{ fontStyle: 'italic', marginBottom: 'var(--spacing-md)' }}>"Super Service, sehr freundlich und hilfsbereit, sehr spontan, ein Tag vor Urlaubsbeginn noch eine Dachbox ausgeliehen, Preis-Leistung auch absolut super, viele gängige Dachträger verfügbar, würde jederzeit wieder dort eine Dachbox ausleihen."</p>
                            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>– Peter Weber</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>⭐⭐⭐⭐⭐</div>
                        </div>
                        <div className="testimonial-card" style={{ background: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'left' }}>
                            <p style={{ fontStyle: 'italic', marginBottom: 'var(--spacing-md)' }}>"Professionelle Abwicklung, freundlicher Kontakt und schnelle Rückmeldungen auf Fragen. Jederzeit wieder, vorbehaltlos zu empfehlen."</p>
                            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>– Bastian Boysen</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>⭐⭐⭐⭐⭐</div>
                        </div>
                        <div className="testimonial-card" style={{ background: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'left' }}>
                            <p style={{ fontStyle: 'italic', marginBottom: 'var(--spacing-md)' }}>"Sehr schnelle und reibungslose Abwicklung."</p>
                            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>– Viktor Gass</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Products Section (List View) */}
            <section className="section" id="products">
                <div className="container">
                    <h2
                        className="section-title"
                        style={{
                            textAlign: 'center',
                            marginBottom: 'var(--spacing-md)',
                            fontSize: '3rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: 'var(--white)',
                            textShadow: '0 3px 6px rgba(0,0,0,0.45)'
                        }}
                    >Unser Mietangebot</h2>
                    <p
                        className="section-subtitle"
                        style={{
                            textAlign: 'center',
                            marginBottom: 'var(--spacing-xxxl)',
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: '1.2rem',
                            textShadow: '0 2px 4px rgba(0,0,0,0.35)'
                        }}
                    >Wählen Sie einen Artikel für Details und Buchung.</p>

                    <div className="products-list-vertical" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xxl)', maxWidth: '900px', margin: '0 auto' }}>
                        {products.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="card product-card-horizontal"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                                    }}
                                >
                                    <div className="product-image">
                                        {product.image ? (
                                            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                                {/* TODO: Bilder in WebP konvertieren und <picture>-Elemente verwenden für bessere Performance */}
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    loading="lazy"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'contain',
                                                        transition: 'transform 0.4s ease'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1.0)'}
                                                />
                                            </div>
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>Kein Bild</div>
                                        )}
                                    </div>
                                    <div className="product-card-body">
                                        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.8rem', fontWeight: 'bold' }}>
                                            {product.title}
                                            {[1, 2, 6].includes(product.id) && <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)', display: 'block', marginTop: 'var(--spacing-xxs)' }}>(Träger optional)</span>}
                                        </h3>

                                        <p style={{ marginBottom: '1rem', fontSize: '1.1rem', lineHeight: '1.5', color: '#495057' }}>
                                            {product.description.split('. ')[0]}.
                                            <br />
                                            <span style={{ color: 'var(--accent)', fontWeight: '500' }}>
                                                {[1, 2, 6, 3].includes(product.id) && 'Inklusive Montage.'}
                                                {(product.id === 4 || product.id === 7) && 'Inklusive Einweisung.'}
                                                {product.id === 5 && 'Inklusive Gebläse & Zubehör.'}
                                            </span>
                                        </p>

                                        {/* Suitcase Icons based on volume */}
                                        {product.volume && (
                                            <div style={{ display: 'flex', gap: 'var(--spacing-xxs)', marginBottom: 'var(--spacing-md)', opacity: 0.8 }} title={`${product.volume} Liter Stauraum`}>
                                                {[...Array(Math.floor(product.volume / 100))].map((_, i) => (
                                                    <span key={i} role="img" aria-label="Koffer" style={{ fontSize: '1.2rem' }}>🧳</span>
                                                ))}
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                                            <span style={{ fontWeight: '800', color: 'var(--accent)', fontSize: '1.4rem' }}>{product.prices?.text || product.price}</span>
                                            <span className="btn btn-outline-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}>Details & Buchen →</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ and Blog Section */}
            <section className="section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2
                        className="section-title"
                        style={{
                            marginBottom: 'var(--spacing-md)',
                            color: 'var(--white)',
                            textShadow: '0 2px 4px rgba(0,0,0,0.35)'
                        }}
                    >Häufig gestellte Fragen & Tipps</h2>
                    <p
                        className="section-subtitle"
                        style={{
                            marginBottom: 'var(--spacing-xxxl)',
                            color: 'rgba(255,255,255,0.9)',
                            textShadow: '0 2px 4px rgba(0,0,0,0.25)'
                        }}
                    >Antworten auf Ihre Fragen und nützliche Blogartikel</p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
                        <Link to="/faq" className="btn btn-primary" style={{ padding: 'var(--spacing-md) var(--spacing-xxl)' }}>Zu den FAQs</Link>
                        <Link to="/blog" className="btn btn-secondary" style={{ padding: 'var(--spacing-md) var(--spacing-xxl)' }}>Zum Blog</Link>
                    </div>

                    <div className="faq-preview" style={{ marginTop: 'var(--spacing-xxxl)', textAlign: 'left' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Beliebte Fragen</h3>
                        <div className="faq-item" style={{ marginBottom: 'var(--spacing-md)', padding: 'var(--spacing-md)', background: '#f8f9fa', borderRadius: 'var(--border-radius-md)', borderLeft: '4px solid var(--accent)' }}>
                            <h4 style={{ margin: '0 0 var(--spacing-xxs) 0', color: 'var(--text-main)' }}>Wie funktioniert die Buchung?</h4>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Ganz einfach: Wählen Sie Ihr Wunschprodukt, senden Sie eine unverbindliche Anfrage über das Formular und wir melden uns zeitnah mit einem Angebot.</p>
                        </div>
                        <div className="faq-item" style={{ marginBottom: 'var(--spacing-md)', padding: 'var(--spacing-md)', background: '#f8f9fa', borderRadius: 'var(--border-radius-md)', borderLeft: '4px solid var(--accent)' }}>
                            <h4 style={{ margin: '0 0 var(--spacing-xxs) 0', color: 'var(--text-main)' }}>Welche Dachbox passt auf mein Auto?</h4>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Die meisten unserer Dachboxen passen auf gängige Dachträgersysteme. Im Formular können Sie Ihr Fahrzeugmodell angeben, wir beraten Sie gerne.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="section bg-light" id="newsletter">
                <div className="container">
                    <div className="newsletter-card" style={{
                        background: 'white',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: 'var(--spacing-xxxl)',
                        boxShadow: 'var(--shadow-lg)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 'var(--spacing-xxl)',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <span style={{
                                        background: 'var(--accent)',
                                        color: 'white',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '999px',
                                        fontSize: '0.85rem',
                                        letterSpacing: '0.05em'
                                    }}>Vierteljährlich · Persönlich · DSGVO-konform</span>
                                </div>
                                <h2 style={{ fontSize: '2.3rem', color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Newsletter</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>
                                    Erhalte einmal pro Quartal kompakte Updates zu Verfügbarkeiten, Dachbox-Checks und regionalen Transport-Tipps. Kurz, persönlich und nur dann, wenn es wirklich etwas Neues gibt.
                                </p>

                                <div style={{ display: 'grid', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)' }}>
                                    {[
                                        { icon: '📅', title: 'Saisonale Tipps', text: 'Praktische Checklisten für Ferien- und Wintersaison.' },
                                        { icon: '📦', title: 'Verfügbarkeiten zuerst', text: 'Frühzeitige Hinweise, wenn Dachboxen knapp werden.' },
                                        { icon: '✉️', title: 'Max. 4 E-Mails/Jahr', text: 'Nur relevante Infos, Abmeldung jederzeit möglich.' }
                                    ].map((item, index) => (
                                        <div key={item.title} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                                            <div style={{
                                                width: '52px',
                                                height: '52px',
                                                borderRadius: '999px',
                                                background: index === 0 ? 'rgba(25,135,84,0.15)' : index === 1 ? 'rgba(0,123,255,0.13)' : 'rgba(255,193,7,0.2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.5rem'
                                            }}>{item.icon}</div>
                                            <div>
                                                <strong style={{ display: 'block', color: 'var(--primary)' }}>{item.title}</strong>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.text}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: 'var(--border-radius-lg)',
                                padding: 'var(--spacing-xl) var(--spacing-xxl)',
                                position: 'relative'
                            }}>
                                <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.15, fontSize: '2rem' }}>✉️</div>
                                <h3
                                    id="newsletter-heading"
                                    style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.7rem' }}
                                >Jetzt vormerken lassen</h3>
                                <p style={{ marginBottom: 'var(--spacing-lg)', lineHeight: 1.6 }}>
                                    Nur E-Mail-Adresse + Einwilligung – danach erhältst du eine kurze Bestätigungsmail. Ohne Klick auf den persönlichen Link erfolgt kein Versand.
                                </p>
                                <form
                                    onSubmit={handleNewsletterSubmit}
                                    aria-labelledby="newsletter-heading"
                                    style={{ display: 'grid', gap: 'var(--spacing-md)' }}
                                >
                                    <div>
                                        <label htmlFor="newsletter-email" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>E-Mail-Adresse *</label>
                                        <input
                                            id="newsletter-email"
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
                                            Ich bestätige, dass ich den Newsletter erhalten möchte und habe die <a href="/datenschutz" style={{ color: 'white', textDecoration: 'underline' }}>Datenschutzerklärung</a> gelesen.
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
                                        <div style={{
                                            padding: '0.8rem 1rem',
                                            borderRadius: 'var(--border-radius-md)',
                                            background: newsletterStatus.type === 'success' ? 'rgba(25,135,84,0.15)' : newsletterStatus.type === 'error' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.3)'
                                        }}>
                                            {newsletterStatus.message}
                                        </div>
                                    )}
                                </div>

                                <p style={{ fontSize: '0.85rem', marginTop: 'var(--spacing-lg)', opacity: 0.9 }}>
                                    Versand maximal viermal im Jahr. Abmeldung jederzeit per Link in jeder E-Mail, kein individuelles Öffnungs-Tracking.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="section" id="contact">
                <div className="container">
                    <h2
                        className="section-title"
                        style={{
                            textAlign: 'center',
                            color: 'var(--white)',
                            marginBottom: '1rem',
                            textShadow: '0 2px 6px rgba(0,0,0,0.4)'
                        }}
                    >So finden Sie uns</h2>
                    <p
                        className="section-subtitle"
                        style={{
                            textAlign: 'center',
                            marginBottom: '3rem',
                            color: 'rgba(255,255,255,0.9)',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}
                    >Mietpark Saar-Pfalz, Kastanienweg 17, 66424 Homburg</p>

                    <div className="contact-wrapper contact-grid">
                        <div className="contact-content">
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2605.626785684618!2d7.339235976516628!3d49.28383847933125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4795b5a7a7a7a7a7%3A0x1234567890abcdef!2sKastanienweg%2017%2C%2066424%20Homburg!5e0!3m2!1sde!2sde!4v1703149920000!5m2!1sde!2sde"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Standort"
                                ></iframe>
                            </div>
                        </div>

                        <div className="contact-helper">
                            <div className="support-card">
                                <img src="/images/Betreiber.jpeg" alt="Daniel Brußig" className="support-avatar" />
                                <p className="support-tagline">Ihr Partner im Saarland, Homburg und Umgebung seit 2023</p>
                                <h3>Haben Sie Fragen?</h3>
                                <p>Kontaktieren Sie mich direkt – ich beantworte jede Anfrage persönlich und begleite Sie vom ersten Gespräch bis zur Übergabe.</p>
                                <div className="support-actions">
                                    <a href="mailto:kontakt@mietpark-saar-pfalz.com" className="btn btn-primary support-btn">Email senden</a>
                                    <a href="tel:+491737615995" className="btn btn-secondary support-btn">Jetzt anrufen</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
