import { pricingById } from './pricingConfig';

export const products = [
    {
        id: 1,
        title: "Dachbox 1 XL",
        description: "Viel Platz für Urlaub & Familie. Die Norauto Bermude 500 bietet beidseitige Öffnung und ein Master-Fit Schnellbefestigungssystem.",
        prices: {
            base: 55,
            text: "ab 55€ / Woche"
        },
        volume: 524,
        dimensions: "215 x 90 x 42 cm",
        details: {
            maxLoad: "75 kg",
            weight: "20,5 kg",
            mountingSystem: "Master-Fit (Schnellbefestigung)",
            opening: "Beidseitig (DualSide)",
            skiCapacity: "5 – 7 Paare",
            snowboardCapacity: "3 – 5 Stück",
            deposit: "150€",
            note: "Ski bis 200cm möglich",
            features: [
                "Master-Fit Schnellbefestigung",
                "Beidseitige Öffnung (Dual-Side)",
                "Zentrales Schließsystem",
                "Aerodynamisches Design"
            ]
        },
        image: "/images/dachbox2_home_preview.png",
        gallery: [
            "/images/dachbox1_detail_main.jpg",
            "/images/dachbox1_detail_gallery_1.jpg",
            "/images/dachbox1_detail_gallery_2.jpg",
            "/images/dachbox1_detail_gallery_3.jpg"
        ],
        pricing: pricingById[1] ?? null,
        calendarUrl: "https://calendar.google.com/calendar/embed?src=c_45869d79b1bea0a3dadbffdf704c2d50916e158b98e1ca144095d2213a8b16f7%40group.calendar.google.com&ctz=Europe%2FBerlin"
    },
    {
        id: 2,
        title: "Dachbox 2 XL",
        description: "Premium Stauraum für Ihre Reisen. Die Thule Force 3 XL (Nachfolgemodell der Force XT) bietet maximale Aerodynamik und beidseitige Öffnung.",
        prices: {
            base: 55,
            text: "ab 55€ / Woche"
        },
        volume: 500,
        dimensions: "215 x 87 x 47 cm",
        details: {
            deposit: "150€",
            note: "Ski bis 195cm möglich. Max. 60kg Zuladung.",
            maxLoad: "60 kg",
            weight: "22 kg",
            mountingSystem: "PowerClick (Schnellbefestigung)",
            opening: "Beidseitig (DualSide)"
        },
        image: "/images/dachbox1_home_preview.png",
        gallery: [
            "/images/dachbox2_detail_main.jpg",
            "/images/dachbox2_detail_gallery_1.jpg",
            "/images/dachbox2_detail_gallery_2.jpg",
            "/images/dachbox2_detail_gallery_3.jpg"
        ],
        pricing: pricingById[2] ?? null,
        calendarUrl: "https://calendar.google.com/calendar/embed?src=c_325271d09d1e42f08d6352af65db474f22363c9f34ea8bac21815715b62006a1%40group.calendar.google.com&ctz=Europe%2FBerlin"
    },
    {
        id: 6,
        title: "Dachbox 3 M",
        description: "Kompakt und praktisch. 147 x 88 x 44 cm. Ideal für Campingausrüstung.",
        prices: {
            base: 45,
            text: "ab 45€ / Woche"
        },
        volume: 300,
        dimensions: "147 x 88 x 44 cm",
        details: {
            deposit: "150€",
            note: "⚠️ Keine Skier (zu kurz)"
        },
        image: "/images/dachbox3_home_preview.jpg",
        gallery: [
            "/images/dachbox3_detail_main.jpg",
            "/images/dachbox3_detail_info_1.jpg",
            "/images/dachbox3_detail_gallery_1.jpg",
            "/images/dachbox3_detail_gallery_2.jpg",
            "/images/dachbox3_detail_gallery_3.jpg"
        ],
        pricing: pricingById[6] ?? null,
        calendarUrl: "https://calendar.google.com/calendar/embed?src=c_be91fd4328707c9ba54b5554a4c8d6e4c3fd52ddb0bebd2457e094d08983bf21%40group.calendar.google.com&ctz=Europe%2FBerlin"
    },
    {
        id: 3,
        title: "Heckbox für AHK",
        description: "Bequemes Beladen auf der Anhängerkupplung. Abklappbar (kippbar) für Kofferraumzugang. Inklusive Montage.",
        prices: {
            base: 50,
            text: "ab 50€ / Woche",
            tiers: [
                { duration: "1 Woche", price: "50€" },
                { duration: "2 Wochen", price: "80€" },
                { duration: "3 Wochen", price: "120€" }
            ]
        },
        volume: 300,
        dimensions: "115 x 54 x 57 cm",
        details: {
            deposit: "150€",
            note: "Zuladung 20kg. Benötigt Anhängerkupplung. Kippbar für Kofferraumzugang. Zusätzlich wird ein separates Nummernschild ohne Plakette benötigt."
        },
        image: "/images/heckbox_home_preview.jpg",
        gallery: [
            "/images/heckbox_detail_main.jpg",
            "/images/heckbox_detail_info_1.png",
            "/images/heckbox_detail_info_2.png",
            "/images/heckbox_detail_gallery_1.jpg",
            "/images/heckbox_detail_gallery_2.jpg",
            "/images/heckbox_detail_gallery_3.jpg"
        ],
        pricing: pricingById[3] ?? null,
        calendarUrl: "https://calendar.google.com/calendar/embed?src=c_67b52d42d115607bc8287ee750efac0e4b5d4bfeec19532a22c412ff61dc83e9%40group.calendar.google.com&ctz=Europe%2FBerlin"
    },
    {
        id: 4,
        title: "Fahrradträger EUFAB POKER-F",
        description: "Sicherer Transport für 2 Fahrräder oder E-Bikes (bis 60kg). Der EUFAB POKER-F überzeugt durch seine einfache Handhabung und Stabilität. Dank der praktischen Abklappfunktion bleibt Ihr Kofferraum auch mit montierten Rädern zugänglich. Bei Abholung erhalten Sie von uns eine ausführliche Einweisung in das Schnellverschluss-System.",
        prices: {
            text: "ab 5€ / Tag"
        },
        image: "/images/fahrradtraeger_home_preview.png",
        gallery: [
            "/images/fahrradtraeger_detail_main.png",
            "/images/fahrradtraeger_detail_gallery_1.jpg",
            "/images/fahrradtraeger_detail_gallery_2.jpg",
            "/images/fahrradtraeger_detail_gallery_3.jpg"
        ],
        calendarUrl: "https://calendar.google.com/calendar/embed?src=c_dc2b0497c2d7fc848be4e800c0481e4bdd4df06b29d336c59a76dccbfb543dae%40group.calendar.google.com&ctz=Europe%2FBerlin",
        details: {
            deposit: "50€",
            note: "Max. 60kg Zuladung - Ideal für E-Bikes. Inklusive Einweisung (keine Montage). Für den Betrieb ist ein zusätzliches Nummernschild ohne Plakette erforderlich.",
            capacity: "2 Fahrräder",
            weight: "ca. 18 kg",
            dimensions: "142 x 70 x 58 cm",
            foldedDimensions: "25 x 86 x 58 cm",
            features: [
                "Abklappbar (Kofferraumzugang möglich)",
                "Zusammenklappbar",
                "E-Bike geeignet",
                "Schnellverschluss-System",
                "Komplett vormontiert"
            ]
        },
        pricing: pricingById[4] ?? null,
    },
    {
        id: 5,
        title: "Hüpfburg",
        description: "Der Spaß für jeden Kindergeburtstag. Doppelrutsche & Kletterwand. Mit Schönwetter-Garantie!",
        prices: {
            text: "ab 40€ / Tag"
        },
        image: "/images/huepfburg_home_preview.jpg",
        gallery: [
            "/images/huepfburg_detail_main.jpg",
            "/images/huepfburg_detail_gallery_1.jpg",
            "/images/huepfburg_detail_gallery_2.jpg",
            "/images/huepfburg_detail_gallery_3.jpg"
        ],
        calendarUrl: "https://calendar.google.com/calendar/embed?src=c_4986c8a9d132733c99d2f80982cf70ee74afa3a79c929d48c88f250c0004112e%40group.calendar.google.com&ctz=Europe%2FBerlin",
        pricing: pricingById[5] ?? null,
        details: {
            deposit: "50€",
            dimensions: "4,24 x 3,00 x 2,40 m",
            capacity: "Bis zu 4 Kinder (3-10 Jahre)",
            note: "Schlauch & Gebläse inklusive. Passt in Kofferraum. Kostenlose Stornierung bei Regen!",
            features: [
                "Doppelrutsche", "Sprungbereich", "Kletterwand", "Bällebad-Ecke",
                "Fußballtor", "Basketballkorb", "Zielspiel & Ringwurf"
            ],
            rules: [
                "Ständige Aufsicht erforderlich", "Keine Schuhe", "Kein Essen/Trinken", "Nur im Freien",
                "Kein Feuer", "Gebläse muss laufen", "Nicht bei Regen/Gewitter betreiben"
            ],
            included: [
                "Gebläse", "Transporttasche", "Kabeltrommel", "Erdanker"
            ]
        }
    },
    {
        id: 7,
        title: "Dachträger einzeln",
        description: "Passende Grundträger für PKW-Modelle mit geschlossener oder offener Reling. Inklusive Einweisung.",
        prices: {
            base: 10,
            text: "ab 10€ / Woche",
            tiers: [
                { duration: "1 Woche", price: "10€" },
                { duration: "2 Wochen", price: "15€" },
                { duration: "3 Wochen", price: "20€" }
            ]
        },
        details: {
            deposit: "50€",
            note: "Auf Anfrage für Ihr Fahrzeugmodell verfügbar."
        },
        image: "/images/dachtraeger_home_preview.jpg",
        gallery: ["/images/dachtraeger_detail_main.jpg"],
        pricing: pricingById[7] ?? null
    }
];
