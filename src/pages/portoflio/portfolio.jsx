import React, { use, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.js";
import { useMyContext } from "../../stateLayer/stateProvider.js";
import "./portfolio.scss";

const Portfolio = () => {
    const navigate = useNavigate();
    const { user } = useMyContext();
    const [portfolioData, setPortfolioData] = useState(undefined);
    const [transactionData, setTransactionData] = useState(undefined);
    const [openTab, setOpenTab] = useState("portfolio");
    const [userName, setUserName] = useState("");

    const examplePortfolioData = [
        {
            stockCode: "SGREF",
            stockName: "SGREF",
            unitPrice: 0.5,
            quantity: 1000,
        },
    ];

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // setUser(currentUser);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    const fetchPortfolioData = async () => {
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
    };

    const fetchTransactionData = async () => {
        try {
            const transactionRef = collection(
                db,
                "users",
                user.uid,
                "transactions",
            );
            const querySnapshot = await getDocs(transactionRef);
            const items = querySnapshot.docs.map((doc) => ({
                marketValue: doc.data().unitPrice * doc.data().quantity,
                ...doc.data(),
            }));
            setTransactionData(items);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (user === undefined && storedUser === null) {
            navigate("/login");
        } else if (user !== undefined && storedUser !== null) {
            fetchPortfolioData();
            fetchTransactionData();
        }
    }, [user]);

    const currencyValueFormatter = (params) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(params.value);
    };

    const handleTabClick = (tabName) => {
        setOpenTab(tabName);
    };

    return (
        <div className="portfolio">
            <div className="landing">{userName && `Welcome ${userName}`}</div>
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
            {/* <div className="performance">
                <div className="performance-item">
                    <div className="performance-label">
                        Total Portfolio Value
                    </div>
                    <div className="performance-value"> </div>
                </div>
                <div className="performance-item">
                    <div className="performance-label">Gain/Loss </div>
                    <div className="performance-value"> </div>
                </div>
                <div className="performance-item">
                    <div className="performance-label">Total Return</div>
                    <div className="performance-value"> </div>
                </div>
            </div> */}
            <div className="grid">
                {openTab === "portfolio" ? (
                    <AgGridReact
                        defaultColDef={{
                            resizable: false,
                            suppressMovable: true,
                            sortable: false,
                        }}
                        tooltipShowMode={"whenTruncated"}
                        tooltipShowDelay={100}
                        rowData={portfolioData}
                        columnDefs={[
                            { field: "stockCode", width: 106 },
                            {
                                field: "stockName",
                                flex: 1,
                                cellStyle: () => ({ fontSize: "9px" }),
                            },
                            { field: "unitPrice", width: 97 },
                            { field: "quantity", width: 90 },
                            {
                                field: "marketValue",
                                width: 130,
                                valueFormatter: currencyValueFormatter,
                            },
                        ]}
                    />
                ) : (
                    <AgGridReact
                        defaultColDef={{
                            resizable: false,
                            suppressMovable: true,
                            sortable: false,
                        }}
                        tooltipShowMode={"whenTruncated"}
                        tooltipShowDelay={100}
                        rowData={transactionData}
                        columnDefs={[
                            {
                                field: "date",
                                width: 106,
                                cellEditor: "agDateCellEditor",
                                valueFormatter: (params) =>
                                    params.value
                                        ? String(params.value).replace(
                                              /(\d{4})(\d{2})(\d{2})/,
                                              "$1-$2-$3",
                                          )
                                        : "",
                            },
                            { field: "stockCode", width: 106 },
                            {
                                field: "stockName",
                                flex: 1,
                                cellStyle: () => ({ fontSize: "9px" }),
                            },
                            { field: "unitPrice", width: 100 },
                            { field: "quantity", width: 90 },
                            {
                                field: "marketValue",
                                width: 106,
                                valueFormatter: currencyValueFormatter,
                            },
                        ]}
                    />
                )}
            </div>
        </div>
    );
};

export default Portfolio;
