import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function Blog() {
    // Blogs mit verfügbarem Content
    const blogsWithContent = [1, 2]; // Dachbox-Blog und Fahrradträger-Blog

    const blogPosts = [
        {
            id: 1,
            title: "Die besten Dachboxen für Ihren Winterurlaub",
            excerpt: "Die besten Dachboxen für Ihren Winterurlaub: Sicher und entspannt in den Schnee. Erfahren Sie, worauf es bei der Wahl der richtigen Dachbox ankommt und welche Modelle wir in unserer Vermietung anbieten.",
            date: "22. Dezember 2025",
            readTime: "6 min Lesezeit",
            image: "/images/dachbox_xl1_main.jpg",
            category: "Dachboxen"
        },
        {
            id: 2,
            title: "Fahrradträger: Sicher transportieren für jeden Ausflug",
            excerpt: "Alles Wissenswerte über Fahrradträger fürs Auto. Von der Montage bis zur sicheren Befestigung - wir geben Tipps für Ihren nächsten Fahrradurlaub.",
            date: "30. Juni 2025",
            readTime: "8 min Lesezeit",
            image: "/images/fahrradtraeger_home_preview.jpg",
            category: "Fahrradträger"
        },
        {
            id: 3,
            title: "Heckbox vs. Dachbox: Was passt besser zu Ihnen?",
            excerpt: "Heckbox oder Dachbox? Wir vergleichen beide Varianten und helfen Ihnen bei der Entscheidung für Ihren nächsten Urlaub.",
            date: "15. Januar 2026",
            readTime: "6 min Lesezeit",
            image: "/images/heckbox_home_preview.jpg",
            category: "Vergleich"
        },
        {
            id: 4,
            title: "Dachträger-Grundlagen: Geschlossen oder offen?",
            excerpt: "Geschlossene oder offene Reling? Erfahren Sie, welcher Dachträger-Typ zu Ihrem Auto passt und worauf Sie bei der Auswahl achten sollten.",
            date: "1. Februar 2026",
            readTime: "3 min Lesezeit",
            image: "/images/dachtraeger_home_preview.jpg",
            category: "Dachträger"
        },
        {
            id: 5,
            title: "Kindergeburtstag mit Hüpfburg: Tipps für den perfekten Tag",
            excerpt: "Planen Sie einen unvergesslichen Kindergeburtstag mit unserer Hüpfburg-Vermietung. Praktische Tipps und Sicherheitsratschläge.",
            date: "15. März 2026",
            readTime: "4 min Lesezeit",
            image: "/images/huepfburg_home_preview.jpg",
            category: "Hüpfburg"
        },
        {
            id: 6,
            title: "Winterreifen sicher transportieren: Unsere Tipps",
            excerpt: "Wie transportieren Sie Ihre Winterreifen am besten? Dachbox, Heckbox oder doch die Garage? Wir haben die Antworten.",
            date: "1. April 2026",
            readTime: "3 min Lesezeit",
            image: "/images/dachbox_m_gal1.jpg",
            category: "Transport"
        }
    ];

    return (
        <div className="blog-page">
            <SEOHead />
            {/* Hero Section */}
            <section className="hero" style={{
                background: 'linear-gradient(135deg, #0f3d24 0%, #2d5a3d 50%, #1a4d2e 100%)',
                padding: 'var(--spacing-xxxl) 0 var(--spacing-xxl)',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Subtle overlay for better text contrast */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
                    pointerEvents: 'none'
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{
                        fontSize: '3.5rem',
                        marginBottom: 'var(--spacing-md)',
                        fontWeight: '900',
                        color: 'white',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)',
                        letterSpacing: '-0.02em'
                    }}>Mietpark Blog</h1>
                    <p style={{
                        fontSize: '1.4rem',
                        maxWidth: '750px',
                        margin: '0 auto var(--spacing-lg)',
                        lineHeight: '1.7',
                        color: 'rgba(255,255,255,0.95)',
                        textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        fontWeight: '300'
                    }}>
                        Tipps, Tricks und Ratgeber rund um Dachboxen, Fahrradträger und Transportlösungen
                    </p>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: 'var(--spacing-xxl)',
                        marginBottom: 'var(--spacing-xxxl)'
                    }}>
                        {blogPosts.map(post => (
                            <article key={post.id} className="blog-card" style={{
                                background: 'white',
                                borderRadius: 'var(--border-radius-lg)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-md)',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }}
                            >
                                <div style={{
                                    height: '200px',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1.0)'}
                                    />
                                    <span style={{
                                        position: 'absolute',
                                        top: 'var(--spacing-md)',
                                        right: 'var(--spacing-md)',
                                        background: 'var(--accent)',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600'
                                    }}>
                                        {post.category}
                                    </span>
                                </div>
                                <div style={{ padding: 'var(--spacing-xl)' }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: 'var(--spacing-md)',
                                        marginBottom: 'var(--spacing-md)',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-muted)'
                                    }}>
                                        <span>📅 {post.date}</span>
                                        <span>⏱️ {post.readTime}</span>
                                    </div>
                                    <h3 style={{
                                        color: 'var(--primary)',
                                        marginBottom: 'var(--spacing-md)',
                                        fontSize: '1.4rem',
                                        fontWeight: '700',
                                        lineHeight: '1.3'
                                    }}>
                                        {post.title}
                                    </h3>
                                    <p style={{
                                        color: 'var(--text-main)',
                                        marginBottom: 'var(--spacing-lg)',
                                        lineHeight: '1.6'
                                    }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{
                                        borderTop: '1px solid #eee',
                                        paddingTop: 'var(--spacing-md)',
                                        textAlign: 'right'
                                    }}>
                                        {blogsWithContent.includes(post.id) ? (
                                            <Link to={`/blog/${post.id}`} style={{
                                                color: 'var(--accent)',
                                                fontWeight: '600',
                                                fontSize: '0.9rem',
                                                textDecoration: 'none'
                                            }}>
                                                WEITERLESEN →
                                            </Link>
                                        ) : (
                                            <span style={{
                                                color: 'var(--text-muted)',
                                                fontWeight: '600',
                                                fontSize: '0.9rem'
                                            }}>
                                                FOLGT
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Newsletter Signup */}
                    <div style={{
                        background: 'linear-gradient(135deg, var(--bg-light) 0%, #f0f4f0 100%)',
                        padding: 'var(--spacing-xxxl)',
                        borderRadius: 'var(--border-radius-lg)',
                        textAlign: 'center',
                        marginBottom: 'var(--spacing-xxxl)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative background */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '80px',
                            height: '80px',
                            background: 'var(--accent)',
                            opacity: 0.1,
                            borderRadius: '50%',
                            transform: 'rotate(15deg)'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '30px',
                            width: '60px',
                            height: '60px',
                            background: 'var(--primary)',
                            opacity: 0.1,
                            borderRadius: '50%',
                            transform: 'rotate(-20deg)'
                        }}></div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{
                                color: 'var(--primary)',
                                marginBottom: 'var(--spacing-md)',
                                fontSize: '2rem',
                                fontWeight: '700'
                            }}>
                                📬 Bleiben Sie informiert!
                            </h2>
                            <p style={{
                                marginBottom: 'var(--spacing-xl)',
                                fontSize: '1.1rem',
                                lineHeight: '1.6',
                                color: 'var(--text-main)',
                                maxWidth: '600px',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                Abonnieren Sie unseren Newsletter und erhalten Sie regelmäßig Tipps zu Transportlösungen und Reisevorbereitung.
                            </p>

                            {/* Benefits */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 'var(--spacing-lg)',
                                marginBottom: 'var(--spacing-xxl)',
                                flexWrap: 'wrap'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-xs)',
                                    fontSize: '0.95rem',
                                    color: 'var(--text-main)'
                                }}>
                                    <span style={{ color: 'var(--accent)' }}>✓</span>
                                    Transport-Tipps
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-xs)',
                                    fontSize: '0.95rem',
                                    color: 'var(--text-main)'
                                }}>
                                    <span style={{ color: 'var(--accent)' }}>✓</span>
                                    Saisonale Angebote
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-xs)',
                                    fontSize: '0.95rem',
                                    color: 'var(--text-main)'
                                }}>
                                    <span style={{ color: 'var(--accent)' }}>✓</span>
                                    Montage-Guides
                                </div>
                            </div>

                            <form style={{
                                display: 'flex',
                                gap: 'var(--spacing-md)',
                                maxWidth: '550px',
                                margin: '0 auto',
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
                                        border: '2px solid #e1e5e9',
                                        fontSize: '1rem',
                                        transition: 'border-color 0.3s',
                                        background: 'white'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-accent"
                                    style={{
                                        padding: 'var(--spacing-md) var(--spacing-xxl)',
                                        fontWeight: '600',
                                        whiteSpace: 'nowrap',
                                        minWidth: '160px'
                                    }}
                                >
                                    Abonnieren ✨
                                </button>
                            </form>

                            <div style={{
                                marginTop: 'var(--spacing-lg)',
                                padding: 'var(--spacing-md)',
                                background: 'white',
                                borderRadius: 'var(--border-radius-md)',
                                border: '1px solid var(--border)',
                                maxWidth: '500px',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                <p style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--text-muted)',
                                    margin: 0,
                                    textAlign: 'center',
                                    lineHeight: '1.4'
                                }}>
                                    🔒 <strong>Datenschutz:</strong> Ihre Daten werden nur für den Newsletter verwendet.
                                    Abmeldung jederzeit möglich. Mehr in unserer
                                    <a href="/datenschutz" style={{
                                        color: 'var(--accent)',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        marginLeft: '0.3rem'
                                    }}>Datenschutzerklärung</a>.
                                </p>
                            </div>

                            <p style={{
                                fontSize: '0.75rem',
                                color: '#6c757d',
                                marginTop: 'var(--spacing-md)',
                                fontStyle: 'italic'
                            }}>
                                💡 Ca. 1-2 Newsletter pro Monat – garantiert kein Spam!
                            </p>
                        </div>
                    </div>

                    {/* Categories */}
                    <div style={{
                        background: 'white',
                        padding: 'var(--spacing-xl)',
                        borderRadius: 'var(--border-radius-lg)',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <h3 style={{
                            color: 'var(--primary)',
                            marginBottom: 'var(--spacing-lg)',
                            textAlign: 'center'
                        }}>
                            Themen
                        </h3>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'var(--spacing-md)',
                            justifyContent: 'center'
                        }}>
                            {['Dachboxen', 'Fahrradträger', 'Dachträger', 'Hüpfburg', 'Transport', 'Vergleich'].map(category => (
                                <span key={category} style={{
                                    background: 'var(--bg-light)',
                                    color: 'var(--primary)',
                                    padding: 'var(--spacing-xs) var(--spacing-md)',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'var(--accent)';
                                    e.target.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'var(--bg-light)';
                                    e.target.style.color = 'var(--primary)';
                                }}
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to Home */}
            <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-xxl) 0'
            }}>
                <Link to="/" className="btn btn-secondary">
                    ← Zurück zur Startseite
                </Link>
            </div>
        </div>
    );
}
