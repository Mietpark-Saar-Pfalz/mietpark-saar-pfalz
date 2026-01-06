import React from 'react';

import SEOHead from '../components/SEOHead';

export default function Widerruf() {
    return (
        <div className="legal-page page-content container">
            <SEOHead
                title="Widerrufsbelehrung & Musterformular"
                description="Informationen zum gesetzlichen Widerrufsrecht für Verbraucher sowie das Muster-Widerrufsformular von Mietpark Saar-Pfalz."
                url="/widerruf"
            />

            <header className="datenschutz-hero">
                <p className="legal-eyebrow">Verbraucherschutz</p>
                <h1>Widerrufsbelehrung</h1>
                <p className="legal-meta">Stand: Januar 2026 · Gilt für alle Fernabsatzverträge mit Mietpark Saar-Pfalz</p>
            </header>

            <article className="legal-article">
                <section id="widerrufsrecht">
                    <h2>Widerrufsrecht</h2>
                    <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
                    <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
                    <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung (z.&nbsp;B. Brief oder E-Mail) informieren. Sie können dafür das unten hinterlegte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.</p>
                    <div className="legal-highlight" aria-label="Kontakt für Widerrufe">
                        <p className="legal-eyebrow">Anschrift für den Widerruf</p>
                        <address>
                            <strong>Mietpark Saar-Pfalz</strong><br />
                            Daniel Brußig<br />
                            Kastanienweg 17<br />
                            66424 Homburg, Deutschland<br />
                            Telefon: <a href="tel:+491737615995">+49&nbsp;173&nbsp;761&nbsp;5995</a><br />
                            E-Mail: <a href="mailto:kontakt@mietpark-saar-pfalz.com">kontakt@mietpark-saar-pfalz.com</a>
                        </address>
                    </div>
                    <p>Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
                </section>

                <section id="folgen">
                    <h2>Folgen des Widerrufs</h2>
                    <p>
                        Wenn Sie diesen Vertrag widerrufen, erstatten wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten,
                        die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen
                        vierzehn Tagen ab dem Tag, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.
                    </p>
                    <p>Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.</p>
                    <p className="legal-note">
                        Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt
                        bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
                    </p>
                </section>

                <section id="formular">
                    <h2>Muster-Widerrufsformular</h2>
                    <p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
                    <div className="legal-form" role="group" aria-labelledby="formular">
                        <p>An:</p>
                        <p>
                            Mietpark Saar-Pfalz<br />
                            Kastanienweg 17<br />
                            66424 Homburg/Saar<br />
                            E-Mail: kontakt@mietpark-saar-pfalz.com
                        </p>
                        <p className="form-line">Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Reservierung folgender Mietgegenstände:</p>
                        <p className="form-line">Bestellt am (*)/erhalten am (*): __________________________________________</p>
                        <p className="form-line">Name des/der Verbraucher(s): __________________________________________</p>
                        <p className="form-line">Anschrift des/der Verbraucher(s): __________________________________________</p>
                        <p className="form-line">Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): _______________________</p>
                        <p className="form-line">Datum: _______________________</p>
                        <p className="form-footnote">(*) Unzutreffendes streichen.</p>
                    </div>
                </section>
            </article>
        </div>
    );
}
