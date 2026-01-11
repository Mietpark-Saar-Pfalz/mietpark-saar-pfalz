import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import emailjs from '@emailjs/browser';
import ProductGallery from '../components/ProductGallery';
import SEOHead from '../components/SEOHead';
import NewsletterSection from '../components/NewsletterSection';
import PriceTable from '../components/PriceTable';
import PriceCalculator from '../components/PriceCalculator';
import ShareButtons from '../components/ShareButtons';

const buildPriceBreakdownText = (quote) => {
    if (!quote) {
        return 'Nicht berechnet';
    }

    const parts = [
        `Gesamtsumme: ${quote.totalFormatted}`,
        `Basismietpreis: ${quote.baseFormatted}`,
        `Zeitraum: ${quote.periodLabel}`
    ];

    if (quote.seasonSurcharge > 0) {
        parts.push(`Saisonaufschlag (${quote.seasonWeeks} Woche(n)): ${quote.seasonFormatted}`);
    }

    if (quote.roofRackLabel) {
        parts.push(`Dachträger-Option: ${quote.roofRackLabel}`);
    }

    if (quote.breakdown?.length) {
        parts.push(`Details: ${quote.breakdown.join(' / ')}`);
    }

    return parts.join(' | ');
};

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const [roofRackNeeded, setRoofRackNeeded] = useState(() => {
        if (!product?.pricing?.supportsRoofRack) {
            return null;
        }
        return true;
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [lastPriceQuote, setLastPriceQuote] = useState(null);

    // Form state
    const [formData, setFormData] = useState(() => {
        // Load from localStorage if available
        const cached = localStorage.getItem(`formData_${product.id}`);
        if (cached) {
            try {
                return JSON.parse(cached);
            } catch {
                return {
                    user_name: '',
                    user_email: '',
                    user_phone: '',
                    car_model: '',
                    hsn: '',
                    tsn: '',
                    rental_start: '',
                    rental_end: '',
                    railing_type: '',
                    message: ''
                };
            }
        }
        return {
            user_name: '',
            user_email: '',
            user_phone: '',
            car_model: '',
            hsn: '',
            tsn: '',
            rental_start: '',
            rental_end: '',
            railing_type: '',
            message: ''
        };
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
    const [fieldErrors, setFieldErrors] = useState({});

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const addDaysToDateString = (dateString, days) => {
        const d = new Date(dateString);
        if (Number.isNaN(d.getTime())) return null;
        d.setDate(d.getDate() + days);
        return d.toISOString().split('T')[0];
    };

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // e wird verwendet, daher kein unused var Fehler
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // Save to localStorage
        localStorage.setItem(`formData_${product.id}`, JSON.stringify(newFormData));

        // Validate form immediately to show real-time feedback
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: !validateField(name, value) }));

    };

    // New helper function to validate individual fields
    const validateField = (name, value) => {
        switch (name) {
            case 'user_name':
            case 'user_email':
            case 'message':
                return value.trim() !== '';
            case 'car_model':
                return ![3, 4, 5].includes(product.id) ? value.trim() !== '' : true;
            case 'rental_start':
            case 'rental_end': {
                if (!value) return false;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const startDate = new Date(formData.rental_start);

                if (name === 'rental_start' && new Date(value) < today) return false;
                if (name === 'rental_end' && new Date(value) <= startDate) return false;
                return true;
            }
            default:
                return true;
        }
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Upload image to ImgBB
    const uploadImageToImgBB = async (file) => {
        if (!imgbbApiKey) {
            console.warn('ImgBB upload skipped: Missing VITE_IMGBB_API_KEY');
            return null;
        }
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                return data.data.url;
            } else {
                console.error('ImgBB upload error:', data.error.message);
                return null;
            }
        } catch (error) {
            console.error('Error uploading image to ImgBB:', error);
            return null;
        }
    };

    // Validate form before submission
    const validateForm = () => {
        const errors = {};

        // Always required fields
        if (!formData.user_name.trim()) {
            errors.user_name = true;
        }
        if (!formData.user_email.trim()) {
            errors.user_email = true;
        }
        if (!formData.message.trim()) {
            errors.message = true;
        }

        // PKW Model required for Dachboxen (IDs 1, 2, 6)
        if ([1, 2, 6].includes(product.id) && !formData.car_model.trim()) {
            errors.car_model = true;
        }

        // Date validation
        if (!formData.rental_start) {
            errors.rental_start = true;
        }
        if (!formData.rental_end) {
            errors.rental_end = true;
        }

        if (formData.rental_start && formData.rental_end) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startDate = new Date(formData.rental_start);
            const endDate = new Date(formData.rental_end);

            if (startDate < today) {
                errors.rental_start = true;
            }

            if (endDate <= startDate) {
                errors.rental_end = true;
            }
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        const missingEnvVars = [];
        if (!emailServiceId) missingEnvVars.push('VITE_EMAILJS_SERVICE_ID');
        if (!emailTemplateId) missingEnvVars.push('VITE_EMAILJS_TEMPLATE_ID');
        if (!emailPublicKey) missingEnvVars.push('VITE_EMAILJS_PUBLIC_KEY');

        if (missingEnvVars.length > 0) {
            console.error(`EmailJS configuration missing: ${missingEnvVars.join(', ')}`);
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Prepare template parameters
            const templateParams = {
                product_title: product.title,
                user_name: formData.user_name,
                user_email: formData.user_email,
                user_phone: formData.user_phone || 'Nicht angegeben',
                car_model: formData.car_model || 'Nicht angegeben',
                hsn: formData.hsn || 'Nicht angegeben',
                tsn: formData.tsn || 'Nicht angegeben',
                rental_start: formData.rental_start,
                rental_end: formData.rental_end,
                roof_rack_needed_text: roofRackNeeded ? 'Ja' : 'Nein', // Changed parameter name
                railing_type: formData.railing_type || 'Nicht angegeben',
                message: formData.message,
                uploaded_file_url: '', // Will be updated with ImgBB URL
                calculated_price: lastPriceQuote?.totalFormatted || 'Nicht berechnet',
                price_breakdown: buildPriceBreakdownText(lastPriceQuote)
            };

            let imgbbUrl = '';
            if (selectedFile) {
                imgbbUrl = await uploadImageToImgBB(selectedFile);
                if (imgbbUrl) {
                    templateParams.uploaded_file_url = imgbbUrl;
                }
            }

            // Send email via EmailJS
            await emailjs.send(
                emailServiceId,
                emailTemplateId,
                templateParams,
                emailPublicKey
            );

            setSubmitStatus('success');
            // Clear localStorage
            localStorage.removeItem(`formData_${product.id}`);
            // Reset form
            setFormData({
                user_name: '',
                user_email: '',
                user_phone: '',
                car_model: '',
                hsn: '',
                tsn: '',
                rental_start: '',
                rental_end: '',
                railing_type: '',
                message: ''
            });
            setRoofRackNeeded(false);
            setFieldErrors({});
            setSelectedFile(null); // Reset selected file after successful submission
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // useEffect für Structured Data - vor der if (!product) return

    if (!product) {
        return <div className="container" style={{ padding: '5rem 1rem' }}>Produkt nicht gefunden. <Link to="/">Zurück zur Übersicht</Link></div>;
    }

    const images = product.gallery && product.gallery.length > 0 ? product.gallery : (product.image ? [product.image] : []);

    const canonicalUrl = `https://mietpark-saar-pfalz.com/product/${product.id}`;
    const shareUrl = canonicalUrl;

    const metaChips = [
        product.volume ? { label: 'Volumen', value: `${product.volume} L` } : null,
        product.dimensions ? { label: 'Maße', value: product.dimensions } : null,
        product.details?.maxLoad ? { label: 'Zuladung', value: product.details.maxLoad } : null,
        product.details?.weight ? { label: 'Eigengewicht', value: product.details.weight } : null,
        product.details?.deposit ? { label: 'Kaution', value: product.details.deposit } : null,
    ].filter(Boolean);

    const heroPriceText = product.prices?.text || (product.prices?.base ? `ab ${product.prices.base}€` : null);

    const minRentalStart = getTodayDate();
    const minRentalEnd = (() => {
        if (product.id === 5) {
            // Hüpfburg: Enddatum mindestens morgen bzw. Start+1
            if (formData.rental_start) {
                return addDaysToDateString(formData.rental_start, 1) || getTomorrowDate();
            }
            return getTomorrowDate();
        }
        return formData.rental_start || getTodayDate();
    })();

    // Schema.org Product Data
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": images.map(img => img.startsWith('http') ? img : `https://mietpark-saar-pfalz.com${img}`),
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Mietpark Saar-Pfalz"
        },
        "offers": {
            "@type": "Offer",
            "url": canonicalUrl,
            "priceCurrency": "EUR",
            "price": product.prices?.base || "0",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/UsedCondition"
        }
    };

    return (
        <div className="product-detail-page">
            <SEOHead
                title={product.title}
                description={`${product.title} mieten in Homburg. ${product.description}`}
                keywords={`Mieten, ${product.title}, Saarland, Homburg, Dachbox, Fahrradträger`}
                image={product.image}
                url={`/product/${product.id}`}
                type="product"
                schema={productSchema}
            />
            {/* Hero / Header for Product */}
            <div style={{
                background: 'linear-gradient(135deg, #1a4d2e 0%, #4f772d 100%)',
                padding: 'var(--spacing-xxxl) 0 var(--spacing-xxl)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative circles */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '-30px',
                    width: '150px',
                    height: '150px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <Link to="/" className="btn" style={{
                        marginBottom: 'var(--spacing-md)',
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.3)',
                        backdropFilter: 'blur(10px)',
                        padding: 'var(--spacing-sm-custom-small)',
                        borderRadius: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s'
                    }}>
                        <span>←</span> Zurück zur Übersicht
                    </Link>
                    <h1 style={{
                        color: 'white',
                        fontSize: '2.5rem',
                        marginBottom: 'var(--spacing-md)',
                        fontWeight: '800',
                        textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}>{product.title}</h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.95)',
                        fontSize: '1.2rem',
                        maxWidth: '760px',
                        lineHeight: '1.6',
                        marginBottom: 'var(--spacing-md)',
                        textShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>{product.description}</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: 'var(--spacing-lg)' }}>
                        <span style={{
                            background: 'rgba(255,255,255,0.18)',
                            color: 'white',
                            padding: '0.35rem 0.8rem',
                            borderRadius: '999px',
                            fontWeight: 600,
                            letterSpacing: '0.01em',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}>Mieten in Homburg & Saarpfalz</span>
                        {heroPriceText && (
                            <span style={{
                                background: 'rgba(255,255,255,0.12)',
                                color: 'white',
                                padding: '0.35rem 0.8rem',
                                borderRadius: '999px',
                                fontWeight: 600,
                                letterSpacing: '0.01em',
                                border: '1px solid rgba(255,255,255,0.24)'
                            }}>Preisinfo: {heroPriceText}</span>
                        )}
                        {product.details?.note && (
                            <span style={{
                                background: 'rgba(255,255,255,0.12)',
                                color: 'white',
                                padding: '0.35rem 0.8rem',
                                borderRadius: '999px',
                                fontWeight: 600,
                                letterSpacing: '0.01em',
                                border: '1px solid rgba(255,255,255,0.24)'
                            }}>{product.details.note}</span>
                        )}
                    </div>

                    <ShareButtons title={product.title} url={shareUrl} variant="hero" compact />
                </div>
            </div>

            <div className="container" style={{ marginTop: 'var(--spacing-xl)' }}>
                {/* Gallery Section */}
                <section className="detail-section" style={{ marginBottom: 'var(--spacing-xxxl)' }}>
                    <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Galerie</h2>
                    <ProductGallery images={images} title={product.title} />
                </section>

                {/* Info Section */}
                <section className="detail-section" style={{ marginBottom: 'var(--spacing-xxxl)' }}>
                    <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Informationen & Highlights</h2>
                    <div className="product-detail-grid">
                        <div className="info-panel card">
                            <p className="info-overline">Gut zu wissen</p>
                            <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-sm)', color: 'var(--primary)' }}>
                                {product.title} mieten – zuverlässig, sauber, startklar
                            </h3>
                            <p style={{ color: '#1f2937', marginBottom: 'var(--spacing-md)' }}>
                                {product.description} Jetzt in Homburg und Umgebung mieten, inkl. persönlicher Einweisung vor Ort.
                            </p>

                            {metaChips.length > 0 && (
                                <div className="meta-chip-row">
                                    {metaChips.map((chip, idx) => (
                                        <span key={idx} className="meta-chip">
                                            <strong>{chip.label}:</strong> {chip.value}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {product.details?.features && (
                                <div style={{ marginTop: 'var(--spacing-lg)' }}>
                                    <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>Produkt-Highlights</h4>
                                    <ul className="feature-list">
                                        {product.details.features.map((f, i) => (
                                            <li key={i}>{f}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {product.volume && (
                                <div className="volume-row">
                                    <strong>Stauraum (~{product.volume} L):</strong>
                                    <div className="volume-icons" title={`${product.volume} Liter Stauraum`}>
                                        {[...Array(Math.floor(product.volume / 100))].map((_, i) => (
                                            <span key={i} role="img" aria-label="Koffer">🧳</span>
                                        ))}
                                    </div>
                                    <p className="muted-text">1 Koffer ≈ 100 Liter</p>
                                </div>
                            )}

                            <div className="secondary-facts">
                                {product.details?.mountingSystem && <span><strong>Befestigung:</strong> {product.details.mountingSystem}</span>}
                                {product.details?.opening && <span><strong>Öffnung:</strong> {product.details.opening}</span>}
                                {product.details?.skiCapacity && <span><strong>Ski-Kapazität:</strong> {product.details.skiCapacity}</span>}
                                {product.details?.snowboardCapacity && <span><strong>Snowboard-Kapazität:</strong> {product.details.snowboardCapacity}</span>}
                                {product.details?.capacity && <span><strong>Kapazität:</strong> {product.details.capacity}</span>}
                                {product.details?.foldedDimensions && <span><strong>Klappmaß:</strong> {product.details.foldedDimensions}</span>}
                            </div>

                            {product.details?.note && (
                                <div className="note-box">{product.details.note}</div>
                            )}
                        </div>

                        <aside className="price-summary-card">
                            <p className="info-overline">Preis & Konditionen</p>
                            <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-sm)', color: '#111827' }}>
                                {product.prices?.text || 'Individuelle Preise auf Anfrage'}
                            </h3>

                            <ul className="price-list">
                                {product.prices?.tiers ? (
                                    product.prices.tiers.map((tier, idx) => (
                                        <li key={idx}>
                                            <span>{tier.duration}</span>
                                            <strong>{tier.price}</strong>
                                        </li>
                                    ))
                                ) : product.prices?.base ? (
                                    <>
                                        <li>
                                            <span>Basismiete (Woche)</span>
                                            <strong>{product.prices.base}€</strong>
                                        </li>
                                        {![3, 7].includes(product.id) && (
                                            <li className="muted-text" style={{ display: 'block' }}>
                                                Dachträger ist optional und kann im Formular ausgewählt werden (falls benötigt).
                                            </li>
                                        )}
                                    </>
                                ) : (
                                    <li>
                                        <span>Preis</span>
                                        <strong>{product.prices?.text || product.price}</strong>
                                    </li>
                                )}
                            </ul>

                            {product.details?.deposit && (
                                <div className="muted-text" style={{ marginTop: 'var(--spacing-sm)' }}>
                                    Kaution: {product.details.deposit}
                                </div>
                            )}

                            <a className="btn btn-primary" href="#booking-form" style={{ width: '100%', textAlign: 'center', marginTop: 'var(--spacing-md)' }}>
                                Jetzt anfragen
                            </a>
                        </aside>
                    </div>
                </section>

                <PriceTable product={product} />

                <PriceCalculator
                    product={product}
                    roofRackNeeded={product.pricing?.supportsRoofRack ? roofRackNeeded : null}
                    onRoofRackChange={value => setRoofRackNeeded(value)}
                    onQuote={setLastPriceQuote}
                />

                <hr style={{ margin: 'var(--spacing-xxl) 0', opacity: 0.1 }} />

                <hr style={{ margin: 'var(--spacing-xxl) 0', opacity: 0.1 }} />

                {/* Calendar Section - Skip for Dachträger einzeln (ID 7) */}
                {product.calendarUrl && (
                    <section className="detail-section" style={{ marginBottom: 'var(--spacing-xxxl)' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Verfügbarkeit</h2>
                        <p className="text-muted" style={{ marginBottom: 'var(--spacing-xs)' }}>Prüfen Sie hier die generelle Verfügbarkeit vor Ihrer Anfrage.</p>
                        <div className="calendar-wrapper" style={{
                            position: 'relative',
                            paddingBottom: '75%', // 4:3 Aspect Ratio for mobile/tablet
                            height: 0,
                            overflow: 'hidden',
                            borderRadius: 'var(--border-radius-md)',
                            boxShadow: 'var(--shadow-md)',
                            background: '#fff'
                        }}>
                            <iframe
                                src={product.calendarUrl}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 0
                                }}
                                frameborder="0"
                                scrolling="no"
                            ></iframe>
                        </div>
                    </section>
                )}

                <hr style={{ margin: 'var(--spacing-xxl) 0', opacity: 0.1 }} />

                {/* Booking Form Section */}
                <section id="booking-form" className="detail-section" style={{ marginBottom: 'var(--spacing-xxxl)' }}>
                    <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Buchungsanfrage</h2>
                    <div className="form-card" style={{ backgroundColor: '#f8f9fa', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius-md)' }}>
                        {/* Hüpfburg Rich Info Display */}
                        {product.id === 5 && (
                            <div style={{
                                marginBottom: 'var(--spacing-xl)',
                                background: '#fff',
                                border: '2px solid var(--accent)',
                                borderRadius: 'var(--border-radius-lg)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-md)'
                            }}>
                                <div style={{ background: 'var(--accent)', color: '#fff', padding: 'var(--spacing-md)', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>🏰</span> Hüpfburg Details & Mietinfos
                                </div>
                                <div style={{ padding: 'var(--spacing-md)' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-xl)' }}>
                                        <div>
                                            <h4 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-xs)', borderBottom: '2px solid #eee', paddingBottom: 'var(--spacing-xxs)' }}>Highlights</h4>
                                            <ul style={{ paddingLeft: 'var(--spacing-md)', color: '#444' }}>
                                                {product.details.features.map((f, i) => <li key={i}>{f}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem', borderBottom: '2px solid #eee', paddingBottom: '0.3rem' }}>Lieferumfang / Zubehör</h4>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {product.details.included.map((item, i) => (
                                                    <span key={i} style={{
                                                        background: '#e9ecef',
                                                        padding: '4px 12px',
                                                        borderRadius: '20px',
                                                        fontSize: '0.85rem',
                                                        color: 'var(--primary)'
                                                    }}>{item}</span>
                                                ))}
                                            </div>
                                            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                                                <strong>Maße:</strong> {product.details.dimensions}<br />
                                                <strong>Alter:</strong> {product.details.capacity}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1.5rem', background: '#fff9db', padding: '1rem', borderRadius: '10px', border: '1px solid #ffe066' }}>
                                        <h4 style={{ color: '#856404', fontSize: '1rem', marginBottom: '0.5rem' }}>⚠️ Wichtige Sicherheitsregeln</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                                            {product.details.rules.map((rule, i) => (
                                                <div key={i} style={{ fontSize: '0.85rem', color: '#856404', display: 'flex', gap: '5px' }}>
                                                    <span>•</span> {rule}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1.5rem', textAlign: 'center', background: '#f8f9fa', padding: '1rem', borderRadius: '10px' }}>
                                        <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--accent)' }}>
                                            ☀️ Schönwetter-Garantie: {product.details.note.split('!')[0]}!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Mietobjekt</label>
                                    <input type="text" value={product.title} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', background: '#e9ecef' }} />
                                </div>

                                {/* PKW Model - Hide for Heckbox (ID 3), Fahrradträger (ID 4), Hüpfburg (ID 5) */}
                                {![3, 4, 5].includes(product.id) ? (
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>PKW Modell / Marke</label>
                                        <input type="text" name="car_model" value={formData.car_model} onChange={handleInputChange} placeholder="z.B. VW Passat Kombi B8" required style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: fieldErrors.car_model ? '2px solid #dc3545' : '1px solid #ddd', background: fieldErrors.car_model ? '#ffe6e6' : 'white' }} />
                                        {fieldErrors.car_model && <p style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: 'var(--spacing-xxs)' }}>Bitte geben Sie Ihr PKW Modell ein.</p>}
                                    </div>
                                ) : (
                                    <div className="form-group">
                                        {/* Spacer to keep grid alignment or empty */}
                                    </div>
                                )}
                            </div>

                            {/* HSN / TSN Fields for Dachboxen (NOT Heckbox, NOT Fahrradträger, NOT Hüpfburg) */}
                            {![3, 4, 5].includes(product.id) && (
                                <div style={{ marginBottom: '1.5rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px', border: '1px dashed #ced4da' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>Fahrzeugdaten (Optional)</label>
                                    <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '1rem' }}>
                                        Damit wir den <strong>perfekten Dachträger</strong> für Ihr Auto auswählen können, helfen uns die HSN und TSN Nummern.
                                    </p>

                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <div style={{ flex: 1, minWidth: '120px' }}>
                                            <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem' }}>
                                                HSN - Herstellernummer (Feld 2.1)
                                            </label>
                                            <input type="text" name="hsn" value={formData.hsn} onChange={handleInputChange} placeholder="z.B. 0603" maxLength="4" style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: '120px' }}>
                                            <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem' }}>
                                                TSN - Typenschlüsselnummer (Feld 2.2)
                                            </label>
                                            <input type="text" name="tsn" value={formData.tsn} onChange={handleInputChange} placeholder="z.B. AQM" maxLength="8" style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }} />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: '#6c757d', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.5rem' }}>📄</span>
                                        <span>
                                            Sie finden diese Codes im <strong>Fahrzeugschein</strong> (Zulassungsbescheinigung Teil I) in den Feldern <strong>2.1</strong> und <strong>2.2</strong> (oberste Zeile).
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Zeitraum Von</label>
                                    <input type="date" name="rental_start" value={formData.rental_start} onChange={handleInputChange} min={minRentalStart} required style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: fieldErrors.rental_start ? '2px solid #dc3545' : '1px solid #ddd', background: fieldErrors.rental_start ? '#ffe6e6' : 'white' }} />
                                    {fieldErrors.rental_start && <p style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: 'var(--spacing-xxs)' }}>Bitte geben Sie ein gültiges Startdatum ein.</p>}
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Zeitraum Bis</label>
                                    <input type="date" name="rental_end" value={formData.rental_end} onChange={handleInputChange} min={minRentalEnd} required style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: fieldErrors.rental_end ? '2px solid #dc3545' : '1px solid #ddd', background: fieldErrors.rental_end ? '#ffe6e6' : 'white' }} />
                                    {fieldErrors.rental_end && <p style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: 'var(--spacing-xxs)' }}>Bitte geben Sie ein gültiges Enddatum ein, das nach dem Startdatum liegt.</p>}
                                </div>
                            </div>

                            {lastPriceQuote && (
                                <div className="price-quote-banner" role="status">
                                    <p style={{ margin: 0 }}>
                                        Letzte Preisberechnung: <strong>{lastPriceQuote.totalFormatted}</strong> ({lastPriceQuote.periodLabel})
                                    </p>
                                    {product.pricing?.supportsRoofRack && (
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#495057' }}>Auswahl: {lastPriceQuote.roofRackLabel}</p>
                                    )}
                                </div>
                            )}

                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name</label>
                                    <input type="text" name="user_name" value={formData.user_name} onChange={handleInputChange} placeholder="Ihr Vor- und Nachname" required style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: fieldErrors.user_name ? '2px solid #dc3545' : '1px solid #ddd', background: fieldErrors.user_name ? '#ffe6e6' : 'white' }} />
                                    {fieldErrors.user_name && <p style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: 'var(--spacing-xxs)' }}>Bitte geben Sie Ihren Namen ein.</p>}
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
                                    <input type="email" name="user_email" value={formData.user_email} onChange={handleInputChange} placeholder="ihre@email.de" required style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: fieldErrors.user_email ? '2px solid #dc3545' : '1px solid #ddd', background: fieldErrors.user_email ? '#ffe6e6' : 'white' }} />
                                    {fieldErrors.user_email && <p style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: 'var(--spacing-xxs)' }}>Bitte geben Sie eine gültige E-Mail-Adresse ein.</p>}
                                </div>
                            </div>

                            {/* Dachträger Logic - Only show if NOT Heckbox (id 3), Fahrradträger (id 4) or Dachträger einzeln (id 7) */}
                            {![3, 4, 7].includes(product.id) && (
                                <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #dee2e6', borderRadius: '8px', background: 'white' }}>
                                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>Benötigen Sie einen Dachträger?</label>
                                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="roofrack"
                                                value="yes"
                                                checked={roofRackNeeded === true}
                                                onChange={() => setRoofRackNeeded(true)}
                                            />
                                            Ja
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="roofrack"
                                                value="no"
                                                checked={roofRackNeeded === false}
                                                onChange={() => setRoofRackNeeded(false)}
                                            />
                                            Nein (vorhanden)
                                        </label>
                                    </div>

                                    {roofRackNeeded && (
                                        <div className="fade-in">
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Welche Art von Reling haben Sie? <span style={{ fontSize: '0.9rem', color: '#dc3545', marginLeft: '0.5rem' }}>⚠️ Hinweis: Keine Träger für Fixpunkte/ohne Reling.</span></label>
                                            <select name="railing_type" value={formData.railing_type} onChange={handleInputChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '0.5rem' }}>
                                                <option value="">Bitte wählen...</option>
                                                <option value="Geschlossene Reling">Geschlossene Reling (liegt am Dach an)</option>
                                                <option value="Offene Reling">Offene Reling (Abstand zum Dach)</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Heckbox Note */}
                            {product.id === 3 && (
                                <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #e7f1ff', borderRadius: '8px', background: '#e7f1ff', color: '#004085' }}>
                                    <strong>ℹ️ Hinweis:</strong> Für diesen Artikel wird eine Anhängerkupplung benötigt.
                                </div>
                            )}

                            {/* High Season Anzahlung Hinweis für Dachboxen (ID 1,2,6) und Heckbox (ID 3) */}
                            {[1, 2, 3, 6].includes(product.id) && (
                                <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '2px solid #ffc107', borderRadius: '8px', background: '#fff9e6', color: '#856404' }}>
                                    <strong>💰 Anzahlung in der Hauptsaison:</strong>
                                    <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
                                        Bei Buchungen in der Hauptsaison (Weihnachts-, Winter-, Oster-, Sommer- und Herbstferien) ist eine Anzahlung von <strong>30% der Gesamtmiete</strong> bei Angebotsannahme erforderlich. 
                                        Im Falle einer Stornierung wird die Anzahlung gemäß unserer <a href="/agb" style={{ color: '#856404', textDecoration: 'underline' }}>Stornobedingungen</a> verrechnet.
                                    </p>
                                </div>
                            )}

                            {/* Optional Image Upload for Dachbox 1-3 and Dachträger einzeln (ID 7) */}
                            {[1, 2, 6, 7].includes(product.id) && (
                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Foto hochladen (Optional)</label>
                                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ width: '100%', padding: '0.5rem', background: '#f8f9fa', borderRadius: '6px', border: '1px solid #ddd' }} />
                                    <small style={{ color: '#6c757d', display: 'block', marginTop: '0.3rem' }}>Hilfreich für Fahrzeugschein oder Dachreling (max. 5MB)</small>
                                </div>
                            )}

                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nachricht / Sonstiges *</label>
                                <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" placeholder="Ihre Nachricht an uns..." required style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: fieldErrors.message ? '2px solid #dc3545' : '1px solid #ddd', background: fieldErrors.message ? '#ffe6e6' : 'white' }}></textarea>
                                {fieldErrors.message && <p style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: 'var(--spacing-xxs)' }}>Bitte geben Sie eine Nachricht ein.</p>}
                            </div>

                            {/* Success/Error Messages */}
                            {submitStatus === 'success' && (
                                <div style={{
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    background: '#d4edda',
                                    border: '1px solid #c3e6cb',
                                    borderRadius: '8px',
                                    color: '#155724',
                                    textAlign: 'center'
                                }}>
                                    <strong>✅ Anfrage erfolgreich versendet!</strong><br />
                                    <small>Wir melden uns schnellstmöglich bei Ihnen.</small>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div style={{
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    background: '#f8d7da',
                                    border: '1px solid #f5c6cb',
                                    borderRadius: '8px',
                                    color: '#721c24',
                                    textAlign: 'center'
                                }}>
                                    <strong>❌ Fehler beim Versenden</strong><br />
                                    <small>Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.</small>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    opacity: isSubmitting ? 0.6 : 1,
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isSubmitting ? '⏳ Wird gesendet...' : 'Unverbindliche Anfrage senden'}
                            </button>

                            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#6c757d', textAlign: 'center' }}>
                                <small>
                                    Nach Ihrer Anfrage erhalten Sie von uns ein unverbindliches Angebot per E-Mail.
                                    Erst mit Ihrer Bestätigung kommt ein Mietvertrag zustande. <br />
                                    Bezahlung erfolgt vor Ort (Bar, EC-Karte, PayPal).
                                </small>
                            </p>
                        </form>

                        <div className="detail-support-callout" aria-live="polite">
                            <img src="/images/Betreiber.jpeg" alt="Daniel Brußig" />
                            <div>
                                <p className="callout-title">Bei Fragen zögern Sie nicht – ich bin persönlich für Sie da.</p>
                                <p className="callout-text">Als Betreiber und Ansprechpartner beantworte ich alle offenen Punkte rund um Dachboxen, Ski- & Snowboard-Transport oder Zubehör.</p>
                                <div className="callout-actions">
                                    <a href="mailto:kontakt@mietpark-saar-pfalz.com" className="btn btn-primary">Email senden</a>
                                    <a href="tel:+491737615995" className="btn btn-secondary">Anrufen</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <NewsletterSection sectionId="newsletter-detail" variant="compact" source="product_detail" />
        </div>
    );
}
