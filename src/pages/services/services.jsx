import React, { useState } from "react";
import "./services.scss";

const Services = ({ currentLanguage }) => {
    const [currentlyViewed, setCurrentlyViewed] = useState(
        "Investment Management"
    );

    return (
        <div className="services">
            <div className="services__container">
                <div className="services__container--landing">
                    <div className="services__container--landing__img" />
                    <div className="services__container--landing__description">
                        <div className="title">
                            {
                                {
                                    Eng: "Our Services",
                                    简体: "我们的服务",
                                    繁體: "我們的服務",
                                }[currentLanguage]
                            }
                        </div>
                    </div>
                </div>
                <div className="services__container--about">
                    {
                        {
                            Eng: "Our strategies and tailored approach across all asset classes enable us to achieve our clients needs and goals. We actively monitor our offerings with the objective to outperform benchmark returns in every situation.",
                            简体: "我们跨资产类别的策略与定制化方法，使我们能够有效满足客户的需求与目标。我们积极监控各项投资方案，力求在任何市场环境下都能实现超越基准回报的目标。",
                            繁體: "我們跨資產類別的策略與定制化方法，使我們能夠有效滿足客戶的需求與目標。我們積極監控各項投資方案，力求在任何市場環境下都能實現超越基準回報的目標。",
                        }[currentLanguage]
                    }
                </div>
                <div className="services__container--carousel">
                    <div className="services__container--carousel--buttons">
                        <div
                            onClick={() =>
                                setCurrentlyViewed("Investment Management")
                            }
                            className={`selector ${
                                currentlyViewed === "Investment Management" &&
                                "highlighted"
                            }`}
                        >
                            <p>
                                {
                                    {
                                        Eng: "Investment Management",
                                        简体: "投资管理",
                                        繁體: "投資管理",
                                    }[currentLanguage]
                                }
                            </p>
                        </div>
                        <div
                            onClick={() =>
                                setCurrentlyViewed("Asset Management")
                            }
                            className={`selector ${
                                currentlyViewed === "Asset Management" &&
                                "highlighted"
                            }`}
                        >
                            <p>
                                {
                                    {
                                        Eng: "Asset Management",
                                        简体: "资产管理",
                                        繁體: "資產管理",
                                    }[currentLanguage]
                                }
                            </p>
                        </div>
                        <div
                            onClick={() =>
                                setCurrentlyViewed("Family Office Management")
                            }
                            className={`selector ${
                                currentlyViewed ===
                                    "Family Office Management" && "highlighted"
                            }`}
                        >
                            <p>
                                {
                                    {
                                        Eng: "Family Office Management",
                                        简体: "家族办公室管理",
                                        繁體: "家族辦公室管理",
                                    }[currentLanguage]
                                }
                            </p>
                        </div>
                    </div>
                    <div className="services__container--carousel--content">
                        {currentlyViewed === "Investment Management" && (
                            <div className="services__container--carousel--content--investment">
                                <div className="services__container--carousel--content--investment__img" />
                                <div className="services__container--carousel--content--investment__description">
                                    <div className="title">
                                        {
                                            {
                                                Eng: "Investment Management",
                                                简体: "投资管理",
                                                繁體: "投資管理",
                                            }[currentLanguage]
                                        }
                                    </div>
                                    <div className="text">
                                        {
                                            {
                                                Eng: "  We cater to private and institutional clients considering bespoke investment management while achieving a consistent performance. Through an in-depth interactive approach, we clearly define the respective investment objectives & guidelines and build a portfolio tailored to our clients’ requirements.",
                                                简体: "我们为追求定制化投资管理并期望获得稳定回报的私人及机构客户提供服务。通过深入的互动沟通，我们清晰界定各自的投资目标与指引，并据此构建符合客户需求的定制化投资组合。",
                                                繁體: "我們為追求定制化投資管理並期望獲得穩定回報的私人及機構客戶提供服務。透過深入的互動溝通，我們清晰界定各自的投資目標與指引，並據此構建符合客戶需求的定制化投資組合。",
                                            }[currentLanguage]
                                        }
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentlyViewed === "Asset Management" && (
                            <div className="services__container--carousel--content--asset">
                                <div className="services__container--carousel--content--asset__img" />
                                <div className="services__container--carousel--content--asset__description">
                                    <div className="title">
                                        {
                                            {
                                                Eng: "Asset Management",
                                                简体: "资产管理",
                                                繁體: "資產管理",
                                            }[currentLanguage]
                                        }
                                    </div>
                                    <div className="text">
                                        {
                                            {
                                                Eng: " Our management is based on an active, dynamic and opportunistic strategy, linked to an in-depth knowledge of financial markets.",
                                                简体: "我们的管理体系立足于主动、动态且机遇驱动的策略，并建立在对金融市场的深刻认知之上。",
                                                繁體: "我們的管理體系立足於主動、動態且機遇驅動的策略，並建立在對金融市場的深刻認知之上。",
                                            }[currentLanguage]
                                        }
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentlyViewed === "Family Office Management" && (
                            <div className="services__container--carousel--content--family">
                                <div className="services__container--carousel--content--family__img" />
                                <div className="services__container--carousel--content--family__description">
                                    <div className="title">
                                        {
                                            {
                                                Eng: "Family Office Management",
                                                简体: "家族办公室管理",
                                                繁體: "家族辦公室管理",
                                            }[currentLanguage]
                                        }
                                    </div>
                                    <div className="text">
                                        {
                                            {
                                                Eng: " We offer an end-to-end service, covering all aspects of wealth and estate planning. We assist in provision for future generations, in domiciliation, support in establishing vehicles such as trusts, foundations and companies that securely hold your assets.    ",
                                                简体: "我们提供涵盖财富与遗产规划全流程的一站式服务，包括协助安排后代保障、户籍规划，以及支持设立信托、基金会和公司等用于安全持有资产的专属架构。",
                                                繁體: "我們提供涵蓋財富與遺產規劃全流程的一站式服務，包括協助安排後代保障、戶籍規劃，以及支持設立信託、基金會和公司等用於安全持有資產的專屬架構。",
                                            }[currentLanguage]
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="services__container--risk">
                    <div className="services__container--risk__description">
                        <div className="title">
                            {
                                {
                                    Eng: "Risk Control & Strategy",
                                    简体: "风险控制与策略",
                                    繁體: "風險控制與策略",
                                }[currentLanguage]
                            }
                        </div>
                        <div className="text">
                            {
                                {
                                    Eng: "Everests' investment philosophy relies on fundamental, bottom-up stock specific research to identify long equity investments, which are then constructed within a disciplined risk managed portfolio in an effort to isolate stock specific alpha and minimize unintended systematic portfolio volatility.  ",
                                    简体: "Everests' 的投资理念立足于基本面自下而上的个股研究，以此甄选长期股权投资标的，并通过严格的风险管理投资组合构建体系，有效分离个股超额收益，最大限度降低非系统性投资组合波动。",
                                    繁體: "Everests' 的投資理念立足於基本面自下而上的個股研究，以此甄選長期股權投資標的，並通過嚴格的風險管理投資組合構建體系，有效分離個股超額收益，最大限度降低非系統性投資組合波動。",
                                }[currentLanguage]
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Services;
