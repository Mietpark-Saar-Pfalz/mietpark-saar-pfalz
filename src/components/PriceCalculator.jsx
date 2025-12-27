import React, { useState } from 'react';

const currencyFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
});

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
};

const addDaysToDateString = (dateString, days) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return null;
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
};

export default function PriceCalculator({
    product,
    roofRackNeeded,
    onRoofRackChange,
    onQuote
}) {
    const pricing = product?.pricing;
    const calculatorConfig = pricing?.calculator;
    const supportsRoofRack = Boolean(pricing?.supportsRoofRack);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [calculation, setCalculation] = useState(null);
    const [error, setError] = useState('');

    const roofRackSelection = supportsRoofRack ? (roofRackNeeded ?? true) : true;

    const minStart = getTodayDate();
    const minEnd = (() => {
        if (product?.id === 5) {
            if (startDate) {
                return addDaysToDateString(startDate, 1) || getTomorrowDate();
            }
            return getTomorrowDate();
        }
        return startDate || getTodayDate();
    })();

    const handleCalculate = () => {
        if (!startDate || !endDate) {
            setError('Bitte geben Sie Start- und Enddatum ein.');
            setCalculation(null);
            onQuote?.(null);
            return;
        }

        const result = calculatePrice({
            startDate,
            endDate,
            includeRoofRack: roofRackSelection,
            pricing
        });

        if (result.error) {
            setError(result.error);
            setCalculation(null);
            onQuote?.(null);
            return;
        }

        setError('');
        setCalculation(result);
        onQuote?.(result);
    };

    if (!calculatorConfig) {
        return null;
    }

    return (
        <section className="detail-section" aria-label="Preisrechner">
            <div className="price-calculator-card">
                <div className="price-calculator-headline">
                    <div>
                        <p className="price-table-overline">Preisrechner</p>
                        <h3>In drei Schritten zum Mietpreis</h3>
                        <p>Zeitraum wählen · Dachträger-Option festlegen · Preis berechnen</p>
                    </div>
                </div>

                <div className="price-calculator-grid">
                    <label>
                        <span>Startdatum</span>
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} min={minStart} />
                    </label>
                    <label>
                        <span>Enddatum</span>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={minEnd} />
                    </label>
                    {supportsRoofRack && (
                        <div className="roofrack-selector" role="group" aria-label="Dachträger-Option">
                            <span>
                                Mit Dachträger?
                                {pricing.tooltip && (
                                    <button
                                        type="button"
                                        className="inline-tooltip"
                                        data-tooltip={pricing.tooltip}
                                        aria-label="Hinweis zur Dachträger-Option"
                                    >
                                        i
                                    </button>
                                )}
                            </span>
                            <div className="roofrack-buttons">
                                <button
                                    type="button"
                                    className={roofRackSelection ? 'active' : ''}
                                    onClick={() => onRoofRackChange?.(true)}
                                >
                                    Ja, inkl. Dachträger
                                </button>
                                <button
                                    type="button"
                                    className={!roofRackSelection ? 'active' : ''}
                                    onClick={() => onRoofRackChange?.(false)}
                                >
                                    Nein, bereits vorhanden
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button className="btn btn-primary" type="button" onClick={handleCalculate}>
                    Mietzeitraum eingeben und Preis berechnen
                </button>

                {error && (
                    <div className="price-calculator-error" role="alert">
                        {error}
                    </div>
                )}

                {calculation && (
                    <div className="price-calculator-result" role="status" aria-live="polite">
                        <p className="result-title">
                            Vorläufiger Mietpreis: <strong>{calculation.totalFormatted}</strong>
                        </p>
                        <ul>
                            <li>Basismietpreis: {calculation.baseFormatted}</li>
                            {calculation.seasonSurcharge > 0 && (
                                <li>Saisonaufschlag ({calculation.seasonWeeks} Woche(n)): {calculation.seasonFormatted}</li>
                            )}
                            <li>Zeitraum: {calculation.periodLabel}</li>
                            {supportsRoofRack && (
                                <li>Dachträger-Option: {calculation.roofRackLabel}</li>
                            )}
                        </ul>
                        {calculation.breakdown.length > 0 && (
                            <details>
                                <summary>Berechnungsdetails anzeigen</summary>
                                <ul>
                                    {calculation.breakdown.map(item => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </details>
                        )}
                        <p className="price-calculator-disclaimer">
                            Der angezeigte Betrag ist eine Orientierung. Sie erhalten den finalen Preis mit Ihrer Buchungsbestätigung.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

function calculatePrice({ startDate, endDate, includeRoofRack, pricing }) {
    const calculatorConfig = pricing?.calculator;
    const supportsRoofRack = Boolean(pricing?.supportsRoofRack);

    if (!calculatorConfig) {
        return { error: 'Für dieses Produkt ist noch keine Preislogik hinterlegt.' };
    }

    const start = toDate(startDate);
    const end = toDate(endDate);

    if (!start || !end) {
        return { error: 'Ungültige Datumsangabe.' };
    }

    if (end <= start) {
        return { error: 'Das Enddatum muss nach dem Startdatum liegen.' };
    }

    const totalDays = Math.ceil((end - start) / MS_IN_DAY);

    if (totalDays <= 0) {
        return { error: 'Der Mietzeitraum muss mindestens einen Tag umfassen.' };
    }

    const holidaySet = buildHolidaySet(start.getFullYear(), end.getFullYear());
    let remainingDays = totalDays;
    let cursor = new Date(start);
    let basePrice = 0;
    const breakdown = [];

    const selectPrice = rate => {
        if (!supportsRoofRack) {
            return rate.withRack;
        }
        if (includeRoofRack) {
            return rate.withRack;
        }
        return typeof rate.withoutRack === 'number' ? rate.withoutRack : rate.withRack;
    };

    const weeklyRates = [...(calculatorConfig.weeklyRates || [])].sort((a, b) => b.weeks - a.weeks);
    const smallestWeeklyRate = [...(calculatorConfig.weeklyRates || [])].sort((a, b) => a.weeks - b.weeks)[0];

    while (remainingDays >= 7 && weeklyRates.length > 0) {
        const remainingWeeks = Math.floor(remainingDays / 7);
        const matchingRate = weeklyRates.find(rate => rate.weeks <= remainingWeeks) || weeklyRates[weeklyRates.length - 1];

        if (!matchingRate) {
            break;
        }

        const price = selectPrice(matchingRate);
        basePrice += price;
        breakdown.push(`${matchingRate.label}: ${currencyFormatter.format(price)}`);
        const consumedDays = matchingRate.weeks * 7;
        remainingDays -= consumedDays;
        cursor = addDays(cursor, consumedDays);
    }

    const weekendPackageDays = calculatorConfig.weekendRate?.days || 3;
    while (
        calculatorConfig.weekendRate &&
        remainingDays >= weekendPackageDays &&
        cursor.getDay() === 5
    ) {
        const price = selectPrice(calculatorConfig.weekendRate);
        basePrice += price;
        breakdown.push(`${calculatorConfig.weekendRate.label}: ${currencyFormatter.format(price)}`);
        remainingDays -= weekendPackageDays;
        cursor = addDays(cursor, weekendPackageDays);
    }

    const hasDayRates = calculatorConfig.dayRates?.weekday || calculatorConfig.dayRates?.weekend;

    while (remainingDays > 0 && hasDayRates) {
        const isWeekendOrHoliday = isWeekend(cursor) || isPublicHoliday(cursor, holidaySet);
        const rate = isWeekendOrHoliday ? calculatorConfig.dayRates?.weekend : calculatorConfig.dayRates?.weekday;

        if (!rate) {
            break;
        }

        const price = selectPrice(rate);
        basePrice += price;
        breakdown.push(`${rate.label} (${formatDate(cursor)}): ${currencyFormatter.format(price)}`);
        remainingDays -= 1;
        cursor = addDays(cursor, 1);
    }

    if (remainingDays > 0 && !hasDayRates) {
        if (smallestWeeklyRate) {
            const price = selectPrice(smallestWeeklyRate);
            basePrice += price;
            breakdown.push(`Mindestmiete (${smallestWeeklyRate.label}): ${currencyFormatter.format(price)}`);
            remainingDays = 0;
        } else if (calculatorConfig.weekendRate) {
            const price = selectPrice(calculatorConfig.weekendRate);
            basePrice += price;
            breakdown.push(`Pauschale (${calculatorConfig.weekendRate.label}): ${currencyFormatter.format(price)}`);
            remainingDays = 0;
        } else {
            return { error: 'Für einzelne Tage ist noch kein Preis hinterlegt. Bitte kontaktieren Sie uns direkt.' };
        }
    }

    const { seasonSurcharge, seasonWeeks } = calculateSeasonImpact(start, end, pricing?.seasonPeriods);

    return {
        total: basePrice + seasonSurcharge,
        totalFormatted: currencyFormatter.format(basePrice + seasonSurcharge),
        baseFormatted: currencyFormatter.format(basePrice),
        basePrice,
        seasonSurcharge,
        seasonFormatted: currencyFormatter.format(seasonSurcharge),
        seasonWeeks,
        periodLabel: `${formatDate(start)} bis ${formatDate(addDays(end, -1))}`,
        roofRackLabel: supportsRoofRack ? (includeRoofRack ? 'Mit Dachträger' : 'Ohne Dachträger') : null,
        breakdown
    };
}

const MS_IN_DAY = 1000 * 60 * 60 * 24;

function toDate(value) {
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
}

function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}

function formatDate(date) {
    return date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
}

function isPublicHoliday(date, holidaySet) {
    const iso = date.toISOString().split('T')[0];
    return holidaySet.has(iso);
}

function buildHolidaySet(startYear, endYear) {
    const set = new Set();
    for (let year = startYear; year <= endYear; year++) {
        getStaticHolidays(year).forEach(h => set.add(h));
    }
    return set;
}

function getStaticHolidays(year) {
    const holidays = [];
    const push = (month, day) => holidays.push(formatISO(year, month, day));

    push(1, 1); // Neujahr
    push(5, 1); // Tag der Arbeit
    push(10, 3); // Tag der Deutschen Einheit
    push(12, 25);
    push(12, 26);

    const easter = calculateEaster(year);
    holidays.push(formatISOFromDate(addDays(easter, -2))); // Karfreitag
    holidays.push(formatISOFromDate(addDays(easter, 1))); // Ostermontag
    holidays.push(formatISOFromDate(addDays(easter, 39))); // Christi Himmelfahrt
    holidays.push(formatISOFromDate(addDays(easter, 50))); // Pfingstmontag

    return holidays;
}

function calculateEaster(year) {
    const f = Math.floor;
    const a = year % 19;
    const b = f(year / 100);
    const c = year % 100;
    const d = f(b / 4);
    const e = b % 4;
    const g = f((8 * b + 13) / 25);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = f(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = f((a + 11 * h + 22 * l) / 451);
    const month = f((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
}

function formatISO(year, month, day) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatISOFromDate(date) {
    return formatISO(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function calculateSeasonImpact(start, end, seasonPeriods = []) {
    if (!Array.isArray(seasonPeriods) || seasonPeriods.length === 0) {
        return { seasonSurcharge: 0, seasonWeeks: 0 };
    }

    const seasonCounters = seasonPeriods.map(period => ({ period, days: 0 }));

    for (let cursor = new Date(start); cursor < end; cursor = addDays(cursor, 1)) {
        seasonCounters.forEach(entry => {
            if (isDateWithinSeason(cursor, entry.period)) {
                entry.days += 1;
            }
        });
    }

    return seasonCounters.reduce((acc, entry) => {
        if (!entry.days || !(entry.period?.surchargePerWeek > 0)) {
            return acc;
        }

        const weeks = Math.ceil(entry.days / 7);
        return {
            seasonSurcharge: acc.seasonSurcharge + weeks * entry.period.surchargePerWeek,
            seasonWeeks: acc.seasonWeeks + weeks
        };
    }, { seasonSurcharge: 0, seasonWeeks: 0 });
}

function isDateWithinSeason(date, period) {
    if (!period) {
        return false;
    }

    const startValue = parseSeasonBoundary(period.start);
    const endValue = parseSeasonBoundary(period.end);

    if (!startValue || !endValue) {
        return false;
    }

    const current = (date.getMonth() + 1) * 100 + date.getDate();
    const startNumber = startValue.month * 100 + startValue.day;
    const endNumber = endValue.month * 100 + endValue.day;

    if (startNumber <= endNumber) {
        return current >= startNumber && current <= endNumber;
    }

    return current >= startNumber || current <= endNumber;
}

function parseSeasonBoundary(value) {
    if (!value) {
        return null;
    }

    const [month, day] = value.split('-').map(Number);

    if (!month || !day) {
        return null;
    }

    return { month, day };
}
