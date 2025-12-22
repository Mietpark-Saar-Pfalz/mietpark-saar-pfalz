import React from 'react';
import { useSpring, animated } from 'react-spring';
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
    let heroConfig = {
        image: '/images/hero_summer.jpg',
        title: 'Mehr Platz für Ihre Erlebnisse.',
        subtitle: 'Dachboxen, Heckboxen & mehr – Mieten statt kaufen im Mietpark Saar-Pfalz.'
    };

    if ([10, 11, 0, 1].includes(currentMonth)) {
        // Winter: Nov, Dec, Jan, Feb
        heroConfig = {
            image: '/images/hero_winter.jpg', // Geändert zu hero_winter.jpg für besseren Kontrast
            title: 'Mehr Raum für Winterabenteuer.',
            subtitle: 'Dachboxen & Skiträger für Ihren Skiurlaub – Mieten in Homburg und Umgebung im Mietpark Saar-Pfalz.'
        };
    } else if ([8, 9].includes(currentMonth)) {
        // Autumn: Sep, Oct
        heroConfig = {
            image: '/images/hero_autumn.jpg',
            title: 'Ihr Begleiter für den Herbst.',
            subtitle: 'Stauraum für goldene Oktober-Touren – Mieten in Homburg und Umgebung im Mietpark Saar-Pfalz.'
        };
    } else {
        // Spring/Summer: Mar - Aug
        heroConfig = {
            image: '/images/hero_summer.jpg',
            title: 'Mehr Platz für den Sommerurlaub.',
            subtitle: 'Dachboxen, Fahrradträger & mehr für Ihre Reise – Mieten in Homburg und Umgebung im Mietpark Saar-Pfalz.'
        };
    }

    const titleAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { mass: 1, tension: 120, friction: 14 },
        delay: 200
    });
    const h1Style = {
        marginBottom: 'var(--spacing-md)',
        fontSize: '3.2rem',
        fontWeight: '900',
        color: 'white',
        textShadow: '0 3px 6px rgba(0,0,0,0.4), 0 6px 12px rgba(0,0,0,0.3)',
        letterSpacing: '-0.025em',
        lineHeight: '1.1',
        textAlign: 'center'
    }
    const pStyle = {
        marginBottom: 'var(--spacing-lg)',
        fontSize: '1.3rem',
        fontWeight: '400',
        color: 'rgba(255,255,255,0.95)',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        lineHeight: '1.6',
        textAlign: 'center',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

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
            <SEOHead />
            {/* Hero Section */}
            <section className="hero" id="home" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('${heroConfig.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                position: 'relative'
            }}>
                <div className="container hero-content" style={{ position: 'relative', zIndex: 1 }}>
                    <animated.h1 style={{...titleAnimation, ...h1Style}}>{heroConfig.title}</animated.h1>
                    <animated.p style={{...subtitleAnimation, ...pStyle}}>{heroConfig.subtitle}</animated.p>
                    <animated.div className="hero-actions" style={actionsAnimation}>
                        <a href="#products" className="btn btn-accent">Zum Angebot</a>
                        <a href="#contact" className="btn btn-secondary">Kontakt</a>
                    </animated.div>
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
                    <h2 className="section-title" style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: 'var(--spacing-md)', fontSize: '3rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Unser Mietangebot</h2>
                    <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: 'var(--spacing-xxxl)', color: 'var(--text-muted)', fontSize: '1.2rem' }}>Wählen Sie einen Artikel für Details und Buchung.</p>

                    <div className="products-list-vertical" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xxl)', maxWidth: '900px', margin: '0 auto' }}>
                        {products.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="card product-card-horizontal" style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 'var(--spacing-xl)',
                                    gap: 'var(--spacing-lg)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    cursor: 'pointer',
                                    borderRadius: '16px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                                    }}
                                >
                                    <div style={{ flex: '0 0 250px', height: '180px', borderRadius: '12px', overflow: 'hidden', background: '#f8f9fa', border: '1px solid #eee' }}>
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
                                    <div style={{ flex: 1 }}>
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
                    <h2 className="section-title" style={{ marginBottom: 'var(--spacing-md)' }}>Häufig gestellte Fragen & Tipps</h2>
                    <p className="section-subtitle" style={{ marginBottom: 'var(--spacing-xxxl)' }}>Antworten auf Ihre Fragen und nützliche Blogartikel</p>

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
            <section className="section bg-light">
                <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, white 0%, #f8f9fa 100%)',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: 'var(--spacing-xxxl)',
                        boxShadow: 'var(--shadow-lg)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative elements */}
                        <div style={{
                            position: 'absolute',
                            top: '-30px',
                            left: '-30px',
                            width: '120px',
                            height: '120px',
                            background: 'var(--accent)',
                            opacity: 0.1,
                            borderRadius: '50%',
                            transform: 'rotate(25deg)'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            bottom: '-40px',
                            right: '-40px',
                            width: '150px',
                            height: '150px',
                            background: 'var(--primary)',
                            opacity: 0.08,
                            borderRadius: '50%',
                            transform: 'rotate(-15deg)'
                        }}></div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{
                                color: 'var(--primary)',
                                marginBottom: 'var(--spacing-md)',
                                fontSize: '2.5rem',
                                fontWeight: '800'
                            }}>
                                📧 Mehr Tipps erhalten?
                            </h2>
                            <p style={{
                                marginBottom: 'var(--spacing-xxl)',
                                fontSize: '1.2rem',
                                lineHeight: '1.6',
                                color: 'var(--text-main)',
                                maxWidth: '700px',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                Abonnieren Sie unseren Newsletter und erhalten Sie regelmäßig Transport-Tipps, saisonale Angebote und Montage-Guides direkt in Ihr Postfach.
                            </p>

                            {/* Benefits Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: 'var(--spacing-lg)',
                                marginBottom: 'var(--spacing-xxxl)',
                                maxWidth: '800px',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                <div style={{
                                    background: 'white',
                                    padding: 'var(--spacing-lg)',
                                    borderRadius: 'var(--border-radius-lg)',
                                    boxShadow: 'var(--shadow-sm)',
                                    border: '1px solid var(--border)',
                                    transition: 'transform 0.3s, box-shadow 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                }}
                                >
                                    <div style={{
                                        fontSize: '2.5rem',
                                        marginBottom: 'var(--spacing-sm)',
                                        color: 'var(--accent)'
                                    }}>📦</div>
                                    <h4 style={{
                                        marginBottom: 'var(--spacing-xs)',
                                        color: 'var(--primary)',
                                        fontSize: '1.1rem',
                                        fontWeight: '600'
                                    }}>Transport-Tipps</h4>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text-muted)',
                                        margin: 0
                                    }}>Praktische Ratschläge für sicheren Transport Ihrer Ausrüstung</p>
                                </div>

                                <div style={{
                                    background: 'white',
                                    padding: 'var(--spacing-lg)',
                                    borderRadius: 'var(--border-radius-lg)',
                                    boxShadow: 'var(--shadow-sm)',
                                    border: '1px solid var(--border)',
                                    transition: 'transform 0.3s, box-shadow 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                }}
                                >
                                    <div style={{
                                        fontSize: '2.5rem',
                                        marginBottom: 'var(--spacing-sm)',
                                        color: 'var(--accent)'
                                    }}>🎯</div>
                                    <h4 style={{
                                        marginBottom: 'var(--spacing-xs)',
                                        color: 'var(--primary)',
                                        fontSize: '1.1rem',
                                        fontWeight: '600'
                                    }}>Saisonale Angebote</h4>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text-muted)',
                                        margin: 0
                                    }}>Exklusive Rabatte und zeitlich begrenzte Aktionen</p>
                                </div>

                                <div style={{
                                    background: 'white',
                                    padding: 'var(--spacing-lg)',
                                    borderRadius: 'var(--border-radius-lg)',
                                    boxShadow: 'var(--shadow-sm)',
                                    border: '1px solid var(--border)',
                                    transition: 'transform 0.3s, box-shadow 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                }}
                                >
                                    <div style={{
                                        fontSize: '2.5rem',
                                        marginBottom: 'var(--spacing-sm)',
                                        color: 'var(--accent)'
                                    }}>🛠️</div>
                                    <h4 style={{
                                        marginBottom: 'var(--spacing-xs)',
                                        color: 'var(--primary)',
                                        fontSize: '1.1rem',
                                        fontWeight: '600'
                                    }}>Montage-Guides</h4>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text-muted)',
                                        margin: 0
                                    }}>Schritt-für-Schritt Anleitungen für Ihre Ausrüstung</p>
                                </div>
                            </div>

                            {/* Newsletter Form */}
                            <div style={{
                                background: 'var(--accent)',
                                padding: 'var(--spacing-xxl)',
                                borderRadius: 'var(--border-radius-lg)',
                                maxWidth: '600px',
                                margin: '0 auto',
                                color: 'white'
                            }}>
                                <h3 style={{
                                    marginBottom: 'var(--spacing-lg)',
                                    fontSize: '1.5rem',
                                    fontWeight: '700'
                                }}>
                                    Jetzt kostenlos anmelden! ✨
                                </h3>

                                <form style={{
                                    display: 'flex',
                                    gap: 'var(--spacing-md)',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    alignItems: 'stretch'
                                }}>
                                    <input
                                        type="email"
                                        placeholder="ihre@email.de"
                                        required
                                        style={{
                                            flex: 1,
                                            minWidth: '280px',
                                            padding: 'var(--spacing-md) var(--spacing-lg)',
                                            borderRadius: 'var(--border-radius-md)',
                                            border: 'none',
                                            fontSize: '1.1rem',
                                            background: 'white',
                                            color: 'var(--text-main)'
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            background: 'white',
                                            color: 'var(--accent)',
                                            border: 'none',
                                            padding: 'var(--spacing-md) var(--spacing-xxl)',
                                            borderRadius: 'var(--border-radius-md)',
                                            fontSize: '1.1rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            minWidth: '180px'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = 'var(--primary)';
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = 'white';
                                            e.target.style.color = 'var(--accent)';
                                        }}
                                    >
                                        ✅ Abonnieren
                                    </button>
                                </form>

                                <div style={{
                                    marginTop: 'var(--spacing-lg)',
                                    padding: 'var(--spacing-md)',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: 'var(--border-radius-md)',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        margin: 0,
                                        textAlign: 'center',
                                        lineHeight: '1.5'
                                    }}>
                                        🔒 <strong>Datenschutz ist uns wichtig:</strong><br />
                                        Ihre Daten werden ausschließlich für den Newsletter verwendet und nicht an Dritte weitergegeben.
                                        Abmeldung ist jederzeit mit einem Klick möglich. Mehr in unserer
                                        <a href="/datenschutz" style={{
                                            color: 'white',
                                            textDecoration: 'underline',
                                            fontWeight: '500',
                                            marginLeft: '0.3rem'
                                        }}>Datenschutzerklärung</a>.
                                    </p>
                                </div>

                                <p style={{
                                    fontSize: '0.8rem',
                                    marginTop: 'var(--spacing-lg)',
                                    opacity: 0.9,
                                    fontStyle: 'italic'
                                }}>
                                    💡 Nur 1-2 Newsletter pro Monat – garantiert keine Spam-Mails!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="section" id="contact">
                <div className="container">
                    <h2 className="section-title" style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '1rem' }}>So finden Sie uns</h2>
                    <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '3rem' }}>Mietpark Saar-Pfalz, Kastanienweg 17, 66424 Homburg</p>

                    <div className="contact-wrapper">
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
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
                        <p>Haben Sie allgemeine Fragen?</p>
                        <a href="mailto:kontakt@mietpark-saar-pfalz.com" className="btn btn-primary" style={{ marginTop: 'var(--spacing-md)' }}>Email senden</a>
                    </div>
                </div>
            </section>
        </>
    );
}
