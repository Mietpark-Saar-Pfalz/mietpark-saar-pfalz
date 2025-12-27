import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const mobileMenuAnimation = useSpring({
        right: isMobileMenuOpen ? '0' : '-100%',
        opacity: isMobileMenuOpen ? 1 : 0,
        config: { mass: 1, tension: 200, friction: 20 }
    });

    return (
        <>
            <header className="header">
                <div className="container header-content">
                    <Link to="/" className="logo">
                        <img src="/images/logo.png" alt="Mietpark Saar-Pfalz" style={{ height: '50px' }} />
                    </Link>
                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        <ul className="nav-list">
                            <li><Link to="/">Startseite</Link></li>
                            <li><a href="/#products">Vermietung</a></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/impressum">Impressum</Link></li>
                            <li><Link to="/agb">AGB</Link></li>
                            <li><Link to="/datenschutz">Datenschutz</Link></li>
                            <li><a href="/#contact">Kontakt</a></li>
                        </ul>
                    </nav>
                    <a href="/#contact" className="btn btn-primary nav-desktop-btn">Anfrage senden</a>

                    {/* Mobile Hamburger Icon */}
                    <button
                        className="hamburger-menu-icon"
                        onClick={toggleMobileMenu}
                        aria-label="Menü öffnen"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>

                    {/* Mobile Menu Overlay */}
                    <animated.nav className="nav-mobile-overlay" style={mobileMenuAnimation}>
                        <button className="close-mobile-menu" onClick={toggleMobileMenu}>×</button>
                        <ul className="nav-list-mobile">
                            <li><Link to="/" onClick={toggleMobileMenu}>Startseite</Link></li>
                            <li><a href="/#products" onClick={toggleMobileMenu}>Vermietung</a></li>
                            <li><Link to="/blog" onClick={toggleMobileMenu}>Blog</Link></li>
                            <li><Link to="/impressum" onClick={toggleMobileMenu}>Impressum</Link></li>
                            <li><Link to="/agb" onClick={toggleMobileMenu}>AGB</Link></li>
                            <li><Link to="/datenschutz" onClick={toggleMobileMenu}>Datenschutz</Link></li>
                            <li><a href="/#contact" onClick={toggleMobileMenu}>Kontakt</a></li>
                            <li><a href="https://wa.me/491737615995" target="_blank" rel="noopener noreferrer" onClick={toggleMobileMenu} className="whatsapp-link-mobile">WhatsApp</a></li>
                            <li><a href="/#contact" className="btn btn-primary" onClick={toggleMobileMenu}>Anfrage senden</a></li>
                        </ul>
                    </animated.nav>
                </div>
            </header>

            <a
                href="https://wa.me/491737615995"
                className="whatsapp-fab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat starten"
            >
                <span aria-hidden="true">💬</span>
                <span className="whatsapp-fab-text">WhatsApp</span>
            </a>
        </>
    );
}
