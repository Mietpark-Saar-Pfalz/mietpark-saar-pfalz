import React from 'react';

export default function Impressum() {
    return (
        <div className="legal-page page-content container">
            <h1>Impressum</h1>

            <section className="legal-section">
                <h2>Angaben gemäß § 5 TMG</h2>
                <p>
                    Einzelunternehmer<br />
                    Daniel Brußig<br />
                    Kastanienweg 17<br />
                    66424 Homburg
                </p>
            </section>

            <section className="legal-section">
                <h2>Kontakt</h2>
                <p>
                    Telefon: +49 (0) 1737615995<br />
                    E-Mail: kontakt@mietpark-saar-pfalz.com
                </p>
            </section>

            <section className="legal-section">
                <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
                <p>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </section>

            <style jsx>{`
        .page-content {
          padding-top: 4rem;
          padding-bottom: 4rem;
          min-height: 60vh;
          max-width: 900px;
        }
        h1 {
          margin-bottom: 3rem;
        }
        .legal-section {
          margin-bottom: 2.5rem;
        }
        .legal-section h2 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
      `}</style>
        </div>
    );
}
