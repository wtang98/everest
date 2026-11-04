export const parseTransactionDate = (value) => {
    const dateString = String(value ?? "");
    const normalizedDate = /^\d{8}$/.test(dateString)
        ? `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6, 8)}`
        : dateString;
    const date = new Date(normalizedDate);
    return Number.isNaN(date.getTime()) ? undefined : date;
};

export const getFirstTransactionDate = (transactions) =>
    (transactions ?? []).reduce((firstDate, transaction) => {
        const date = parseTransactionDate(transaction.date);
        return date && (!firstDate || date < firstDate) ? date : firstDate;
    }, undefined);

const getTransactionValue = (transaction) => {
    const storedValue = transaction.marketValue;
    if (
        storedValue !== undefined &&
        storedValue !== null &&
        storedValue !== "" &&
        Number.isFinite(Number(storedValue))
    ) {
        return Math.abs(Number(storedValue));
    }

    if (
        transaction.unitPrice === undefined ||
        transaction.unitPrice === null ||
        transaction.unitPrice === "" ||
        transaction.quantity === undefined ||
        transaction.quantity === null ||
        transaction.quantity === ""
    ) {
        return undefined;
    }

    const unitPrice = Number(transaction.unitPrice);
    const quantity = Number(transaction.quantity);
    return Number.isFinite(unitPrice) && Number.isFinite(quantity)
        ? Math.abs(unitPrice * quantity)
        : undefined;
};

const getTransactionDirection = (type) => {
    const normalizedType = String(type ?? "")
        .trim()
        .toLowerCase();

    if (
        normalizedType === "" ||
        normalizedType === "purchase" ||
        normalizedType === "buy" ||
        normalizedType === "transfer in"
    ) {
        return 1;
    }
    if (normalizedType === "transfer out") {
        return -1;
    }
    return undefined;
};

export const calculatePerformanceMetrics = (
    portfolioValue,
    transactions,
    asOfDate = new Date(),
) => {
    if (
        !Array.isArray(transactions) ||
        transactions.length === 0 ||
        !Number.isFinite(portfolioValue) ||
        portfolioValue < 0
    ) {
        return {
            gain: undefined,
            returnRate: undefined,
            annualizedReturn: undefined,
        };
    }

    const investedValue = transactions.reduce((total, transaction) => {
        const direction = getTransactionDirection(transaction.type);
        const value = getTransactionValue(transaction);
        return (
            total === undefined ||
            direction === undefined ||
            value === undefined
        )
            ? undefined
            : total + direction * value;
    }, 0);

    if (investedValue === undefined || investedValue <= 0) {
        return {
            gain: undefined,
            returnRate: undefined,
            annualizedReturn: undefined,
        };
    }

    const gain = portfolioValue - investedValue;
    const returnRate = gain / investedValue;
    const firstTransactionDate = getFirstTransactionDate(transactions);
    const years = firstTransactionDate
        ? (asOfDate.getTime() - firstTransactionDate.getTime()) /
          (365.25 * 24 * 60 * 60 * 1000)
        : 0;
    const annualizedReturn =
        years > 0
            ? Math.pow(portfolioValue / investedValue, 1 / years) - 1
            : undefined;

    return { gain, returnRate, annualizedReturn };
};
