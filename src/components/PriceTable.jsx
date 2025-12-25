import React, { useId, useState } from 'react';

export default function PriceTable({ product }) {
    const pricing = product?.pricing;
    const seasonPeriods = (pricing?.seasonPeriods || []).filter(period => period);
    const showSeasonInfo = seasonPeriods.length > 0;

    if (!pricing?.table?.length) {
        return null;
    }

    const showRoofRackColumn = pricing.supportsRoofRack && pricing.table.some(row => typeof row.withoutRack === 'number');
    const priceHeaderLabel = showRoofRackColumn ? 'Preis inkl. Dachträger (€)' : 'Preis (€)';

    return (
        <section className="detail-section" aria-label={`Preise für ${product.title}`}>
            <div className="price-table-card card">
                <div className="price-table-header">
                    <div>
                        <p className="price-table-overline">Mietpreise</p>
                        <h3>{product.title}</h3>
                        {product.volume && (
                            <p className="price-table-volume">Volumen: {product.volume} Liter</p>
                        )}
                    </div>
                    {pricing.tooltip && showRoofRackColumn && (
                        <TooltipTrigger text={pricing.tooltip} />
                    )}
                </div>

                <div className="price-table-scroll" role="region" aria-live="polite">
                    <table className="price-table">
                        <thead>
                            <tr>
                                <th>Mietdauer</th>
                                <th>{priceHeaderLabel}</th>
                                {showRoofRackColumn && <th>Preis ohne Dachträger (€)</th>}
                                <th>Saisonaufschlag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricing.table.map((row, idx) => (
                                <tr key={`${row.duration}-${idx}`}>
                                    <td>{row.duration}</td>
                                    <td>{formatCurrency(row.withRack)}</td>
                                    {showRoofRackColumn && (
                                        <td>{typeof row.withoutRack === 'number' ? formatCurrency(row.withoutRack) : '–'}</td>
                                    )}
                                    <td>{row.seasonSurcharge || '–'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {pricing.info && (
                    <p className="price-table-note">{pricing.info} Der finale Mietpreis wird nach Eingabe Ihres Zeitraums dynamisch berechnet.</p>
                )}

                {showSeasonInfo && (
                    <div className="season-info-box" role="note">
                        <p><strong>Saisonzeiten:</strong></p>
                        <ul>
                            {seasonPeriods.map(period => (
                                <li key={period.label || `${period.start}-${period.end}`}>
                                    {formatSeasonLabel(period)}
                                    {typeof period.surchargePerWeek === 'number' && period.surchargePerWeek > 0 && (
                                        <>: +{formatCurrency(period.surchargePerWeek)} pro Woche</>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <p className="season-info-text">Während dieser Zeiträume wird automatisch ein Aufschlag pro Woche berechnet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

function TooltipTrigger({ text }) {
    const tooltipId = useId();
    const [visible, setVisible] = useState(false);

    return (
        <span
            className="tooltip-wrapper"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <button
                type="button"
                className="tooltip-trigger"
                aria-describedby={tooltipId}
                onFocus={() => setVisible(true)}
                onBlur={() => setVisible(false)}
            >
                i
            </button>
            <span
                id={tooltipId}
                role="tooltip"
                className={`tooltip-bubble ${visible ? 'visible' : ''}`}
                aria-hidden={!visible}
            >
                {text}
            </span>
        </span>
    );
}

function formatCurrency(value) {
    if (typeof value !== 'number') {
        return value || '–';
    }

    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(value);
}

function formatSeasonLabel(period) {
    if (period.label) {
        return period.label;
    }

    if (period.start && period.end) {
        return `${formatSeasonDate(period.start)} – ${formatSeasonDate(period.end)}`;
    }

    return 'Saisonzeitraum';
}

function formatSeasonDate(value) {
    if (!value) {
        return '';
    }

    const [month, day] = value.split('-').map(Number);
    const date = new Date(2000, (month || 1) - 1, day || 1);

    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long'
    });
}
