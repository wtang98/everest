import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import { useMyContext } from "../../stateLayer/stateProvider.js";
import HoldingCard from "../../components/holdingCard/holdingCard.jsx";
import { calculatePerformanceMetrics } from "./portfolioUtils.js";
import "./portfolio.scss";

const AgCharts = lazy(async () => {
    const [{ AgCharts }, { AllCommunityModule, ModuleRegistry }] =
        await Promise.all([
            import("ag-charts-react"),
            import("ag-charts-community"),
        ]);
    ModuleRegistry.registerModules([AllCommunityModule]);
    return { default: AgCharts };
});

const Portfolio = () => {
    const navigate = useNavigate();
    const { user, authReady } = useMyContext();
    const [portfolioData, setPortfolioData] = useState(undefined);
    const [transactionData, setTransactionData] = useState(undefined);
    const [openTab, setOpenTab] = useState("portfolio");
    const [userName, setUserName] = useState("");

    // const examplePortfolioData = [
    //     {
    //         stockCode: "SGREF",
    //         stockName: "SGREF",
    //         unitPrice: 0.5,
    //         quantity: 1000,
    //     },
    // ];

    const fetchPortfolioData = useCallback(async () => {
        const userRef = doc(db, "users", user.uid);

        try {
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                setUserName(docSnap.data().name);
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        }

        try {
            const unitPrice = await (
                await getDocs(collection(db, "prices"))
            ).docs.map((doc) => ({
                [doc.id]: doc.data().price,
            }))[0];

            const portfolioRef = collection(db, "users", user.uid, "portfolio");
            const querySnapshot = await getDocs(portfolioRef);
            const items = querySnapshot.docs.map((doc) => {
                return {
                    unitPrice: unitPrice[doc.data().stockCode],
                    marketValue:
                        unitPrice[doc.data().stockCode] * doc.data().quantity,
                    ...doc.data(),
                };
            });
            setPortfolioData(items);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    }, [user]);

    const fetchTransactionData = useCallback(async () => {
        try {
            const transactionRef = collection(
                db,
                "users",
                user.uid,
                "transactions",
            );
            const querySnapshot = await getDocs(transactionRef);
            const items = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                marketValue: doc.data().unitPrice * doc.data().quantity,
            }));
            setTransactionData(items);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    }, [user]);

    useEffect(() => {
        if (!authReady) return;

        if (!user) {
            navigate("/login");
        } else {
            fetchPortfolioData();
            fetchTransactionData();
        }
    }, [user, authReady, fetchPortfolioData, fetchTransactionData, navigate]);

    const currencyValueFormatter = (params) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(params.value);
    };

    const portfolioChartData = (portfolioData ?? []).filter(
        (item) => Number.isFinite(item.marketValue) && item.marketValue > 0,
    );

    const totalPortfolioValue = portfolioChartData.reduce(
        (total, item) => total + item.marketValue,
        0,
    );

    const {
        gain: performanceGain,
        returnRate: performanceReturn,
        annualizedReturn,
    } = calculatePerformanceMetrics(totalPortfolioValue, transactionData);

    const portfolioShareFormatter = new Intl.NumberFormat("en-US", {
        style: "percent",
        maximumFractionDigits: 2,
    });

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);

    const formatPercent = (value) =>
        new Intl.NumberFormat("en-US", {
            style: "percent",
            maximumFractionDigits: 2,
        }).format(value);

    const handleTabClick = (tabName) => {
        setOpenTab(tabName);
    };

    return (
        <div className="portfolio">
            <div className="portfolio__container">
                <div className="landing">
                    {userName && `Welcome ${userName}`}
                </div>
                <Suspense
                    fallback={
                        <p className="charts__empty">Loading charts...</p>
                    }
                >
                    <section className="charts" aria-label="Portfolio summary">
                        {portfolioData === undefined ? (
                            <p className="charts__empty">
                                Loading portfolio data...
                            </p>
                        ) : portfolioChartData?.length === 0 ? (
                            <p className="charts__empty">
                                No portfolio holdings to chart.
                            </p>
                        ) : (
                            <>
                                <article className="chart-card chart-card--allocation">
                                    <div className="chart-card__heading">
                                        <div>
                                            <h2>Portfolio allocation</h2>
                                            <p>Market value by holding</p>
                                        </div>
                                        <div className="portfolio-total">
                                            <span>Total portfolio value</span>
                                            <strong>
                                                {formatCurrency(
                                                    totalPortfolioValue,
                                                )}
                                            </strong>
                                        </div>
                                    </div>
                                    <AgCharts
                                        className="chart-card__chart"
                                        options={{
                                            data: portfolioChartData,
                                            series: [
                                                {
                                                    type: "donut",
                                                    angleKey: "marketValue",
                                                    calloutLabelKey:
                                                        "stockCode",
                                                    innerRadiusRatio: 0.62,
                                                    fills: [
                                                        "#102b45",
                                                        "#c9a56c",
                                                        "#637181",
                                                        "#93a5b5",
                                                        "#d8c6a5",
                                                    ],
                                                    tooltip: {
                                                        renderer: ({
                                                            datum,
                                                        }) => ({
                                                            title: datum.stockCode,
                                                            data: [
                                                                {
                                                                    label: "Market value",
                                                                    value: currencyValueFormatter(
                                                                        {
                                                                            value: datum.marketValue,
                                                                        },
                                                                    ),
                                                                },
                                                                {
                                                                    label: "Share of portfolio",
                                                                    value: portfolioShareFormatter.format(
                                                                        datum.marketValue /
                                                                            totalPortfolioValue,
                                                                    ),
                                                                },
                                                            ],
                                                        }),
                                                    },
                                                },
                                            ],
                                            tooltip: {
                                                enabled: true,
                                            },
                                            legend: {
                                                position: "bottom",
                                            },
                                        }}
                                    />
                                </article>
                                <article className="chart-card performance-card">
                                    <h2>Performance metrics</h2>
                                    <dl className="performance-card__metrics">
                                        <div>
                                            <dt>% increase</dt>
                                            <dd>
                                                {performanceReturn === undefined
                                                    ? "N/A"
                                                    : formatPercent(
                                                          performanceReturn,
                                                      )}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt>% increase YoY</dt>
                                            <dd>
                                                {annualizedReturn === undefined
                                                    ? "N/A"
                                                    : formatPercent(
                                                          annualizedReturn,
                                                      )}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt>$ increase</dt>
                                            <dd>
                                                {performanceGain === undefined
                                                    ? "N/A"
                                                    : formatCurrency(
                                                          performanceGain,
                                                      )}
                                            </dd>
                                        </div>
                                    </dl>
                                </article>
                            </>
                        )}
                    </section>
                </Suspense>
                <div className="tabs">
                    <div
                        className={`tab ${openTab === "portfolio" ? "active" : ""}`}
                        onClick={() => handleTabClick("portfolio")}
                    >
                        Portfolio
                    </div>
                    <div
                        className={`tab ${openTab === "transactions" ? "active" : ""}`}
                        onClick={() => handleTabClick("transactions")}
                    >
                        Transactions
                    </div>
                </div>
                <div className="grid">
                    <div className="grid__cards">
                        {openTab === "portfolio" ? (
                            portfolioData === undefined ? (
                                <p className="grid__empty">
                                    Loading portfolio...
                                </p>
                            ) : portfolioData.length === 0 ? (
                                <p className="grid__empty">
                                    No portfolio holdings yet.
                                </p>
                            ) : (
                                portfolioData.map((item, index) => (
                                    <HoldingCard
                                        key={`${item.stockCode}-${index}`}
                                        stockCode={item.stockCode}
                                        stockName={item.stockName}
                                        valueLabel="Market value"
                                        value={currencyValueFormatter({
                                            value: item.marketValue,
                                        })}
                                        details={[
                                            {
                                                label: "Unit price",
                                                value: currencyValueFormatter({
                                                    value: item.unitPrice,
                                                }),
                                            },
                                            {
                                                label: "Quantity",
                                                value: item.quantity,
                                            },
                                        ]}
                                    />
                                ))
                            )
                        ) : transactionData === undefined ? (
                            <p className="grid__empty">
                                Loading transactions...
                            </p>
                        ) : transactionData.length === 0 ? (
                            <p className="grid__empty">No transactions yet.</p>
                        ) : (
                            transactionData.map((item, index) => (
                                <HoldingCard
                                    key={`${item.date}-${item.stockCode}-${index}`}
                                    isTransaction
                                    stockCode={item.stockCode}
                                    stockName={item.stockName}
                                    valueLabel="Transaction value"
                                    value={currencyValueFormatter({
                                        value: item.marketValue,
                                    })}
                                    details={[
                                        {
                                            label: "Date",
                                            value: item.date
                                                ? String(item.date).replace(
                                                      /(\d{4})(\d{2})(\d{2})/,
                                                      "$1-$2-$3",
                                                  )
                                                : "—",
                                        },
                                        {
                                            label: "Unit price",
                                            value: currencyValueFormatter({
                                                value: item.unitPrice,
                                            }),
                                        },
                                        {
                                            label: "Quantity",
                                            value: item.quantity,
                                        },
                                    ]}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
