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
                    <h3>Links</h3>
                    <ul>
                        <li><a href="/#home">Startseite</a></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/impressum">Impressum</Link></li>
                        <li><Link to="/agb">AGB</Link></li>
                        <li><Link to="/datenschutz">Datenschutz</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Mietpark Saar-Pfalz. Alle Rechte vorbehalten.</p>
            </div>

        </footer>
    );
}
