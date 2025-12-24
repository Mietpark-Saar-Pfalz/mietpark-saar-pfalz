import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import NewsletterSection from '../components/NewsletterSection';

export default function BlogDetail() {
    const { id } = useParams();

    const blogPosts = [
        {
            id: 1,
            title: "Die besten Dachboxen für Ihren Winterurlaub",
            content: `
                <h2>Die besten Dachboxen für Ihren Winterurlaub: Sicher und entspannt in den Schnee</h2>
                <p>Der lang ersehnte Winterurlaub steht vor der Tür, die Ski sind gewachst und die Ausrüstung ist gepackt. Doch beim Beladen des Autos folgt oft die Ernüchterung: Skier, Snowboards, Stiefel und Helme sind extrem voluminös und nehmen im Kofferraum wertvollen Platz weg. Eine Dachbox ist die ideale Lösung, um zusätzlichen Stauraum zu schaffen, die Sicherheit der Insassen zu erhöhen und das Fahrzeuginnere sauber und trocken zu halten.</p>

                <h2>Worauf kommt es bei der Wahl der richtigen Dachbox an?</h2>
                <p>Bevor Sie sich für ein Modell entscheiden, sollten Sie auf folgende Kriterien achten:</p>

                <h3>1. Die richtige Länge</h3>
                <p>Um Alpinski (meist 150–190 cm) komfortabel unterzubringen, sollte die Box idealerweise 15 bis 20 cm länger als die Skier sein. XL-Modelle sind hier meist die beste Wahl, da sie auch für längeres Equipment wie Langlaufski geeignet sind.</p>

                <h3>2. Material und Winterfestigkeit</h3>
                <p>Hochwertige Boxen bestehen meist aus schlagfestem ABS-Kunststoff. Dieses Material ist leicht, stabil und wetterbeständig, was besonders bei extremen Minustemperaturen im Gebirge wichtig ist, um ein Verspröden des Kunststoffs zu verhindern.</p>

                <h3>3. Sicherheit und Montage</h3>
                <p>Moderne Systeme verfügen über Schnellbefestigungen mit Drehmomentbegrenzung. Ein hörbares Klicken signalisiert dabei, dass die Box sicher auf dem Träger fixiert ist.</p>

                <h2>Unsere Empfehlungen aus der Vermietung</h2>
                <p>In meiner Vermietung biete ich Ihnen zwei leistungsstarke Modelle an, die mit jeweils 500 Litern Volumen maximale Kapazität für Familien und Gruppen bieten:</p>

                <h3>• Dachbox Nr. 1: Thule Force 3 Dachbox XL (500 Liter)</h3>
                <p>Diese vielseitige Cargo-Box ist ein echter Allrounder für den täglichen Einsatz und lange Reisen. Mit ihrem PowerClick-Schnellbefestigungssystem ist sie in wenigen Minuten sicher montiert. Ein großer Vorteil für den Winterurlaub: Sie lässt sich dank DualSide-Öffnung bequem von beiden Seiten beladen. Sie bietet Platz für ca. 5 bis 7 Paar Ski (bis 200 cm Länge) oder 3 bis 4 Skier plus mehrere große Taschen.</p>

                <h3>• Dachbox Nr. 2: Bermude 500 XL (500 Liter)</h3>
                <p>Das Modell Bermude steht für ein hervorragendes Preis-Leistungs-Verhältnis und robuste Qualität. Auch diese Box bietet mit 500 Litern üppigen Stauraum für umfangreiches Gepäck und Sportgeräte. Dank der aerodynamischen Form bleibt der Mehrverbrauch an Kraftstoff moderat. Sie ist eine exzellente Wahl für alle, die eine zuverlässige und geräumige Transportlösung suchen.</p>

                <h2>Profi-Tipps für die Fahrt in den Skiurlaub</h2>

                <h3>• Richtig Beladen</h3>
                <p>Schwere Gegenstände wie Skier gehören in die Mitte der Box, direkt über die Träger. Nutzen Sie weiches Gepäck wie Skijacken oder Decken im vorderen Bereich als Puffer, um die Boxenwand bei einer Notbremsung vor harten Skispitzen zu schützen.</p>

                <h3>• Geschwindigkeit anpassen</h3>
                <p>Auch wenn es kein gesetzliches Tempolimit gibt, empfehlen Experten und Hersteller eine Richtgeschwindigkeit von maximal 130 km/h. Bedenken Sie, dass der Kraftstoffverbrauch durch den Luftwiderstand um bis zu 20 % steigen kann.</p>

                <h3>• Dachlast prüfen</h3>
                <p>Das Gesamtgewicht aus Dachträger, Box und Ladung darf die im Fahrzeugschein angegebene maximale Dachlast nicht überschreiten.</p>

                <h2>Fazit</h2>
                <p>Warum eine teure Box kaufen, die den Rest des Jahres nur Platz in der Garage wegnimmt? Mieten Sie eine meiner XL-Dachboxen und starten Sie mit maximalem Komfort in Ihr Winterabenteuer!</p>

                <blockquote>
                <p><em>Analogie zur Verdeutlichung: Eine Dachbox zu beladen ist wie das Packen eines Wanderrucksacks: Das Schwere gehört nah an den Rücken (bzw. die Fahrzeugmitte), und die weichen Sachen polstern alles ab, damit auf holprigen Wegen nichts verrutscht oder die "Haut" der Box von innen beschädigt wird.</em></p>
                </blockquote>

                <p><strong>Bei Fragen zu unseren Dachboxen kontaktieren Sie uns gerne!</strong> Wir beraten Sie persönlich und helfen Ihnen, die richtige Box für Ihren Winterurlaub zu finden.</p>
            `,
            image: "/images/dachbox_xl1_main.jpg",
            category: "Dachboxen",
            date: "22. Dezember 2025",
            readTime: "6 min Lesezeit"
        },
        {
            id: 2,
            title: "Fahrradträger: Sicher transportieren für jeden Ausflug",
            content: `
                <p>Ob der lang ersehnte Radurlaub oder ein spontaner Wochenendtrip ins Grüne – wer sein eigenes Fahrrad dabei hat, ist am Zielort flexibel und mobil. Doch bevor die Reise losgehen kann, steht die Frage nach dem richtigen Transport im Raum. Ein hochwertiger Fahrradträger ist hierbei der Schlüssel für eine entspannte Fahrt. In diesem Ratgeber erfahren Sie alles Wissenswerte von der Modellauswahl bis hin zur sicheren Befestigung.</p>

                <h2>Die Qual der Wahl: Welches Trägersystem passt zu Ihnen?</h2>
                <p>Grundsätzlich unterscheidet man zwischen drei gängigen Systemen, die jeweils spezifische Vor- und Nachteile bieten:</p>

                <h3>Kupplungsträger</h3>
                <p>Diese Modelle gelten als die sicherste und komfortabelste Lösung. Sie werden direkt auf der Anhängerkupplung montiert. Da die Räder auf Hüfthöhe geladen werden, ist der Kraftaufwand minimal – ideal für schwere E-Bikes. Zudem bleibt bei abklappbaren Modellen der Zugang zum Kofferraum erhalten.</p>

                <h3>Dachträger</h3>
                <p>Eine preiswerte Alternative, die freie Sicht durch die Heckscheibe gewährt. Allerdings treibt der hohe Luftwiderstand den Kraftstoffverbrauch um bis zu 41 % in die Höhe. Zudem ist das Heben der Räder auf das Dach körperlich anstrengend und die Durchfahrtshöhe bei Parkhäusern muss beachtet werden.</p>

                <h3>Heckklappenträger</h3>
                <p>Falls keine Anhängerkupplung vorhanden ist, können diese Träger direkt an der Heckklappe eingehängt werden. Sie sind meist günstiger als Kupplungsträger, schränken jedoch oft die Sicht nach hinten ein und belasten die Scharniere der Heckklappe.</p>

                <h2>Spezialfall E-Bikes und Carbon-Rahmen</h2>
                <p>Nicht jedes Fahrrad darf auf jeden Träger. Besonders bei modernen Rädern gibt es wichtige Kriterien:</p>

                <h3>E-Bikes</h3>
                <p>Aufgrund des hohen Gewichts von oft über 25 kg pro Rad benötigen Sie einen speziellen E-Bike-Träger mit hoher Tragkraft und breiteren Schienenabständen. Entfernen Sie vor der Fahrt unbedingt den Akku und verstauen Sie diesen stoßgeschützt im Fahrzeuginneren.</p>

                <h3>Carbon-Fahrräder</h3>
                <p>Die leichten Rahmen sind extrem empfindlich gegenüber punktuellem Druck. Verwenden Sie am besten Träger mit Drehmoment-Begrenzern (wie das Thule AcuTight System), die durch ein „Klick" signalisieren, wenn der optimale Halt erreicht ist. Zusätzlich schützen Gummiauflagen oder spezielle „Carbon Frame Protector" den Rahmen vor Rissen.</p>

                <h2>Montage und Beladung: So reisen Sie sicher</h2>
                <p>Bevor es auf die Autobahn geht, sollten Sie diese Checkliste befolgen:</p>

                <ol>
                    <li><strong>Lose Teile entfernen:</strong> Trinkflaschen, Luftpumpen, Tachos oder Körbe müssen abmontiert werden, damit sie nicht zum gefährlichen Wurfgeschoss werden.</li>
                    <li><strong>Gewicht richtig verteilen:</strong> Laden Sie das schwerste Fahrrad (meist das E-Bike) immer zuerst, also am dichtesten zum Fahrzeug hin.</li>
                    <li><strong>Haltbarkeit prüfen:</strong> Nutzen Sie einen Drehmomentschlüssel für die Verschraubungen und führen Sie vor der Abfahrt einen „Wackeltest" durch.</li>
                    <li><strong>Sichtbarkeit:</strong> Kennzeichen und Beleuchtung müssen jederzeit frei sichtbar sein.</li>
                </ol>

                <h2>Rechtliches und Auslandsvorschriften</h2>
                <p>In Deutschland ist ein separates Zusatzkennzeichen für Heckträger zwingend vorgeschrieben, falls das originale Nummernschild verdeckt wird. Eine selbstgebastelte Lösung aus Pappe ist verboten und kann Bußgelder von mindestens 60 Euro nach sich ziehen.</p>

                <p>Planen Sie eine Reise nach Italien, Spanien oder Portugal? Informieren Sie sich vorab über die Warntafelpflicht. In Italien entfällt laut neueren Dekreten für 2025 die Warntafelpflicht für viele Kupplungsträger, sofern Kennzeichen und Licht sichtbar sind, jedoch herrscht hier oft noch juristische Unsicherheit – im Zweifel ist das Mitführen einer rot-weiß schraffierten Tafel (50x50 cm) ratsam.</p>

                <h2>Pflegetipps für eine lange Lebensdauer</h2>
                <p>Damit Ihr Träger viele Jahre hält, sollten Sie ihn regelmäßig pflegen:</p>

                <ul>
                    <li>Reinigen Sie ihn von Straßensalz und Schmutz (bei Hochdruckreinigern mindestens 30 cm Abstand halten)</li>
                    <li>Schmieren Sie bewegliche Teile und kontrollieren Sie Lackschäden, um Korrosion zu vermeiden</li>
                    <li>Lagern Sie den Träger im Winter an einem trockenen, UV-geschützten Ort</li>
                </ul>

                <p>Zusammenfassend lässt sich sagen: Die Wahl des richtigen Fahrradträgers ist wie das Packen eines guten Wanderrucksacks: Wenn die Last gleichmäßig verteilt und alles fest verzurrt ist, spürt man das zusätzliche Gewicht kaum und kommt sicher an jedes Ziel.</p>

                <h2>Bei Mietpark Saar-Pfalz beraten wir Sie gerne!</h2>
                <p>Sie haben Fragen zu Fahrradträgern oder möchten ein Modell mieten? Kontaktieren Sie uns – wir helfen Ihnen, die richtige Wahl zu treffen und Ihr Fahrrad sicher zu transportieren.</p>
            `,
            image: "/images/fahrradtraeger_home_preview.jpg",
            category: "Fahrradträger",
            date: "12. Dezember 2024",
            readTime: "8 min Lesezeit"
        },
        {
            id: 3,
            title: "Heckbox vs. Dachbox: Was passt besser zu Ihnen?",
            content: `
                <h2>Die Entscheidung: Heckbox oder Dachbox?</h2>
                <p>Beim Transport von Gepäck oder Sportausrüstung stehen Autofahrer oft vor der Wahl zwischen Heckbox und Dachbox. Beide Varianten haben ihre Vor- und Nachteile.</p>

                <h3>Heckbox – Praktisch und einfach</h3>
                <ul>
                    <li>Einfache Beladung auf Hüfthöhe</li>
                    <li>Kein Kraftaufwand beim Be- und Entladen</li>
                    <li>Zugang zum Kofferraum bleibt frei</li>
                    <li>Höheres Diebstahlrisiko</li>
                </ul>

                <h3>Dachbox – Sicher und windschnittig</h3>
                <ul>
                    <li>Besseres Platzangebot</li>
                    <li>Höhere Sicherheit vor Diebstahl</li>
                    <li>Bessere Aerodynamik</li>
                    <li>Höherer Kraftstoffverbrauch</li>
                    <li>Be- und Entladen körperlich anspruchsvoller</li>
                </ul>

                <h3>Unsere Empfehlung</h3>
                <p>Bei Mietpark Saar-Pfalz beraten wir Sie individuell. Die Wahl hängt von Ihren Bedürfnissen, dem Fahrzeugtyp und der Nutzung ab. Vereinbaren Sie einen Termin für eine persönliche Beratung!</p>
            `,
            image: "/images/heckbox_home_preview.jpg",
            category: "Vergleich",
            date: "8. Dezember 2024",
            readTime: "6 min Lesezeit"
        },
        {
            id: 4,
            title: "Dachträger-Grundlagen: Geschlossen oder offen?",
            content: `
                <h2>Dachträger: Geschlossen oder offen?</h2>
                <p>Dachträger sind die Basis für Dachboxen und andere Aufbauten. Doch welche Variante ist die richtige?</p>

                <h3>Geschlossene Dachträger</h3>
                <ul>
                    <li>Höhere Stabilität</li>
                    <li>Besserer Wetterschutz</li>
                    <li>Teurer in der Anschaffung</li>
                    <li>Schwerer</li>
                </ul>

                <h3>Offene Dachträger</h3>
                <ul>
                    <li>Preiswerter</li>
                    <li>Leichter</li>
                    <li>Weniger stabil</li>
                    <li>Geringerer Wetterschutz</li>
                </ul>

                <p>Bei uns erhalten Sie beide Varianten. Wir prüfen vor Ort, welches System zu Ihrem Fahrzeug passt!</p>
            `,
            image: "/images/dachtraeger_home_preview.jpg",
            category: "Dachträger",
            date: "5. Dezember 2024",
            readTime: "3 min Lesezeit"
        },
        {
            id: 5,
            title: "Kindergeburtstag mit Hüpfburg: Tipps für den perfekten Tag",
            content: `
                <h2>Der perfekte Kindergeburtstag mit Hüpfburg</h2>
                <p>Eine Hüpfburg macht jeden Kindergeburtstag unvergesslich. Bei Mietpark Saar-Pfalz erhalten Sie nicht nur die Hüpfburg, sondern auch wertvolle Tipps für die Organisation.</p>

                <h3>Unsere Hüpfburg-Modelle</h3>
                <ul>
                    <li>Verschiedene Größen für 5-20 Kinder</li>
                    <li>Stabile, geprüfte Qualität</li>
                    <li>Inklusive Gebläse und Sicherheitsnetze</li>
                    <li>Leichter Auf- und Abbau</li>
                </ul>

                <h3>Organisations-Tipps</h3>
                <ul>
                    <li>Stellen Sie die Hüpfburg auf ebenem, sauberem Untergrund auf</li>
                    <li>Halten Sie einen Sicherheitsabstand zu Bäumen und Gebäuden ein</li>
                    <li>Überwachen Sie die Kinder jederzeit</li>
                    <li>Stellen Sie Erste-Hilfe-Material bereit</li>
                </ul>

                <p>Kontaktieren Sie uns für eine individuelle Beratung und das passende Hüpfburg-Modell für Ihren Kindergeburtstag!</p>
            `,
            image: "/images/huepfburg_home_preview.jpg",
            category: "Hüpfburg",
            date: "1. Dezember 2024",
            readTime: "4 min Lesezeit"
        },
        {
            id: 6,
            title: "Winterreifen sicher transportieren: Unsere Tipps",
            content: `
                <h2>Winterreifen sicher transportieren</h2>
                <p>Die kalte Jahreszeit naht und Sie müssen Ihre Winterreifen transportieren? Erfahren Sie, wie Sie Ihre Reifen sicher und platzsparend transportieren.</p>

                <h3>Transportmöglichkeiten</h3>
                <ul>
                    <li><strong>Dachbox:</strong> Sicherer Transport, geschützt vor Witterung</li>
                    <li><strong>Heckbox:</strong> Einfache Beladung, aber höheres Diebstahlrisiko</li>
                    <li><strong>Im Kofferraum:</strong> Nur für wenige Reifen geeignet</li>
                </ul>

                <h3>Sicherheit geht vor</h3>
                <ul>
                    <li>Verzurren Sie die Reifen unbedingt</li>
                    <li>Verteilen Sie das Gewicht gleichmäßig</li>
                    <li>Prüfen Sie die Ladungssicherung vor Fahrtantritt</li>
                    <li>Halten Sie die zulässige Dachlast ein</li>
                </ul>

                <p>Bei Fragen zu Winterreifen-Transport beraten wir Sie gerne persönlich!</p>
            `,
            image: "/images/dachbox_m_gal1.jpg",
            category: "Transport",
            date: "28. November 2024",
            readTime: "3 min Lesezeit"
        }
    ];

    const post = blogPosts.find(p => p.id === parseInt(id));

    if (!post) {
        return (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-xxxl)' }}>
                <h1>Artikel nicht gefunden</h1>
                <Link to="/blog" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold' }}>
                    ← Zurück zum Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="blog-detail-page">
            <SEOHead />
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #1a4d2e 0%, #4f772d 100%)',
                padding: 'var(--spacing-xxxl) 0 var(--spacing-xxl)',
                color: 'white',
                marginBottom: 'var(--spacing-xxxl)'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--spacing-xl)' }}>
                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-md)',
                        marginBottom: 'var(--spacing-md)',
                        fontSize: '0.9rem'
                    }}>
                        <span>📅 {post.date}</span>
                        <span>⏱️ {post.readTime}</span>
                        <span>🏷️ {post.category}</span>
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: 'var(--spacing-lg)',
                        fontWeight: '800',
                        lineHeight: '1.2'
                    }}>
                        {post.title}
                    </h1>
                </div>
            </section>

            {/* Article Content */}
            <article style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--spacing-xl)' }}>
                <div style={{
                    marginBottom: 'var(--spacing-xxxl)',
                    background: 'white',
                    borderRadius: 'var(--border-radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <img
                        src={post.image}
                        alt={post.title}
                        style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'cover'
                        }}
                    />
                    <div style={{ padding: 'var(--spacing-xxl)' }}>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                </div>

                {/* Back to Blog */}
                <div style={{ textAlign: 'center' }}>
                    <Link to="/blog" style={{
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                    }}>
                        ← Zurück zum Blog
                    </Link>
                </div>
            </article>

            <NewsletterSection sectionId="newsletter-article" variant="compact" source="article" />
        </div>
    );
}
