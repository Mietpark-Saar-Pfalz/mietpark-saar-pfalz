import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>Mietpark Saar-Pfalz</h3>
                    <p>Ihr zuverlässiger Partner für Dachboxen, Fahrradträger und mehr in Homburg.</p>
                </div>
                <div className="footer-section">
                    <h3>Kontakt</h3>
                    <p>Kastanienweg 17</p>
                    <p>66424 Homburg/Saar</p>
                    <p>Tel: +49 173 761 5995</p>
                    <p>Email: kontakt@mietpark-saar-pfalz.com</p>
                </div>
                <div className="footer-section">
                    <h3>Navigation</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Startseite</Link></li>
                        <li><a href="/#products">Vermietung</a></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Rechtliches</h3>
                    <ul className="footer-links">
                        <li><Link to="/impressum">Impressum</Link></li>
                        <li><Link to="/agb">AGB</Link></li>
                        <li><Link to="/datenschutz">Datenschutzerklärung</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Mietpark Saar-Pfalz. Alle Rechte vorbehalten.</p>
                <p style={{ marginTop: '0.5rem' }}>
                    Website by <strong>Serverraum247</strong> ·{' '}
                    <a
                        href="mailto:webmaster@serverraum247.dev"
                        style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                    >
                        webmaster@serverraum247.dev
                    </a>
                </p>
            </div>

        </footer>
    );
}
