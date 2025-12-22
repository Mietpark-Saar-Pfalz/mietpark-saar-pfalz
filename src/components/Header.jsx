import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

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
        <header className="header">
            <div className="container header-content">
                <a href="#home" className="logo">
                    <img src="/images/logo.png" alt="Mietpark Saar-Pfalz" style={{ height: '50px' }} />
                </a>
                {/* Desktop Navigation */}
                <nav className="nav-desktop">
                    <ul className="nav-list">
                        <li><a href="/#home">Startseite</a></li>
                        <li><a href="/#products">Vermietung</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/#contact">Kontakt</a></li>
                        <li><a href="https://wa.me/491737615995" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 'bold' }}>WhatsApp</a></li>
                    </ul>
                </nav>
                <a href="/#contact" className="btn btn-primary nav-desktop-btn">Anfrage senden</a>

                {/* Mobile Hamburger Icon */}
                <button className="hamburger-menu-icon" onClick={toggleMobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                {/* Mobile Menu Overlay */}
                <animated.nav className="nav-mobile-overlay" style={mobileMenuAnimation}>
                    <button className="close-mobile-menu" onClick={toggleMobileMenu}>×</button>
                    <ul className="nav-list-mobile">
                        <li><a href="/#home" onClick={toggleMobileMenu}>Startseite</a></li>
                        <li><a href="/#products" onClick={toggleMobileMenu}>Vermietung</a></li>
                        <li><a href="/blog" onClick={toggleMobileMenu}>Blog</a></li>
                        <li><a href="/#contact" onClick={toggleMobileMenu}>Kontakt</a></li>
                        <li><a href="https://wa.me/491737615995" target="_blank" rel="noopener noreferrer" onClick={toggleMobileMenu} style={{ color: '#25D366', fontWeight: 'bold' }}>WhatsApp</a></li>
                        <li><a href="/#contact" className="btn btn-primary" onClick={toggleMobileMenu}>Anfrage senden</a></li>
                    </ul>
                </animated.nav>
            </div>
        </header>
    );
}
