import {
    calculatePerformanceMetrics,
    getFirstTransactionDate,
} from "./portfolioUtils";

test("finds the earliest valid date across all transactions", () => {
    const transactions = [
        { date: "20240315", type: "transfer in" },
        { date: "20200102", type: "purchase" },
        { date: "20220630", type: "transfer out" },
        { date: "not-a-date", type: "purchase" },
    ];

    expect(getFirstTransactionDate(transactions)).toEqual(
        new Date("2020-01-02"),
    );
});

test("returns undefined when there are no valid transaction dates", () => {
    expect(getFirstTransactionDate(undefined)).toBeUndefined();
    expect(getFirstTransactionDate([{ date: "not-a-date" }])).toBeUndefined();
});

test("calculates gain and return for purchase transactions", () => {
    expect(
        calculatePerformanceMetrics(150, [
            { date: "20200102", type: "purchase", unitPrice: 10, quantity: 10 },
        ]),
    ).toMatchObject({
        gain: 50,
        returnRate: 0.5,
    });
});

test("calculates net investment across purchases and transfers", () => {
    const metrics = calculatePerformanceMetrics(
        150,
        [
            { type: "transfer in", marketValue: 100 },
            { type: "transfer out", marketValue: 20 },
        ],
    );

    expect(metrics.gain).toBe(70);
    expect(metrics.returnRate).toBe(0.875);
    expect(metrics.annualizedReturn).toBeUndefined();
});

test("returns unavailable metrics when transaction values or types are unsupported", () => {
    expect(
        calculatePerformanceMetrics(150, [
            { type: "sale", marketValue: 20 },
            { type: "purchase", marketValue: 100 },
        ]),
    ).toEqual({
        gain: undefined,
        returnRate: undefined,
        annualizedReturn: undefined,
    });
    expect(
        calculatePerformanceMetrics(150, [{ type: "purchase" }]),
    ).toEqual({
        gain: undefined,
        returnRate: undefined,
        annualizedReturn: undefined,
    });
});
