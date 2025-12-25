import { XMLParser } from 'fast-xml-parser';
import pricingXml from './pricing.xml?raw';

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    allowBooleanAttributes: true,
    trimValues: true
});

const rawData = parser.parse(pricingXml);

const ensureArray = (value) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
};

const toNumber = (value) => {
    if (value === undefined || value === null || value === '') return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
};

const pricingById = {};

ensureArray(rawData?.pricing?.product).forEach(product => {
    const supportsRoofRack = product.supportsRoofRack === 'true';

    const table = ensureArray(product.tableRows?.row).map(row => ({
        duration: row.duration,
        withRack: toNumber(row.withRack),
        withoutRack: toNumber(row.withoutRack),
        seasonSurcharge: row.seasonNote || row.seasonSurcharge || '–'
    }));

    const dayRates = {};
    ensureArray(product.calculator?.dayRates?.rate).forEach(rate => {
        if (!rate?.type) return;
        dayRates[rate.type] = {
            label: rate.label,
            withRack: toNumber(rate.withRack),
            withoutRack: toNumber(rate.withoutRack)
        };
    });

    const weekendRate = product.calculator?.weekendRate ? {
        label: product.calculator.weekendRate.label,
        days: toNumber(product.calculator.weekendRate.days) || 3,
        withRack: toNumber(product.calculator.weekendRate.withRack),
        withoutRack: toNumber(product.calculator.weekendRate.withoutRack)
    } : null;

    const weeklyRates = ensureArray(product.calculator?.weeklyRates?.rate).map(rate => ({
        label: rate.label,
        weeks: toNumber(rate.weeks) || 1,
        withRack: toNumber(rate.withRack),
        withoutRack: toNumber(rate.withoutRack)
    }));

    const seasonPeriods = ensureArray(product.seasonPeriods?.period)
        .map(period => ({
            label: period.label,
            start: period.start,
            end: period.end,
            surchargePerWeek: toNumber(period.surchargePerWeek) || 0
        }))
        .filter(period => period.surchargePerWeek > 0);

    pricingById[Number(product.id)] = {
        supportsRoofRack,
        tooltip: product.tooltip || '',
        info: product.info || '',
        table,
        seasonPeriods,
        calculator: {
            dayRates,
            weekendRate,
            weeklyRates,
            seasonPeriods
        }
    };
});

export { pricingById };
