import React from "react";
import Contact from "../contact/contact";
import { Link } from "react-router";
import "./home.scss";
import everestLogo from "../../assets/everest_white.png";
import gigaLogo from "../../assets/giga logo.png";

const Home = ({ currentLanguage }) => {
    return (
        <div className="home">
            <div className="home--landing">
                <div className="home--landing__container">
                    <div className="logo">
                        <div className="text">Securities provided by:</div>
                        <div className="text">
                            Everest (Hong Kong) Securities Limited
                        </div>
                        <div className="img-container">
                            <Link to={"/securities"}>
                                <img
                                    src={everestLogo}
                                    className="eLogo"
                                    alt=""
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="logo">
                        <div className="text">Services provided by:</div>
                        <div className="text">Giga (Hong Kong) Limited</div>
                        <div className="img-container">
                            <Link to={"/services"}>
                                <img src={gigaLogo} className="gLogo" alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home--offerings">
                <div className="home--offerings__container">
                    <div className="img2" />
                    <div className="home--offerings__container--description">
                        <p className="title">
                            {
                                {
                                    Eng: "Securities",
                                    简体: "证券",
                                    繁體: "證券",
                                }[currentLanguage]
                            }
                        </p>
                        <p className="content">
                            {
                                {
                                    Eng: "We provide a full range of securities trading and brokerage services to individual, corporate, and institutional clients.",
                                    简体: "我们为个人、企业和机构客户提供全面的证券交易和经纪服务。",
                                    繁體: "我們為個人、企業和機構客戶提供全面的證券交易和經紀服務。",
                                }[currentLanguage]
                            }
                        </p>
                        <p className="link">
                            <Link to={"/securities"}>
                                {
                                    {
                                        Eng: "Learn More",
                                        简体: "了解更多",
                                        繁體: "了解更多",
                                    }[currentLanguage]
                                }
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="home--offerings__container">
                    <div className="img" />
                    <div className="home--offerings__container--description">
                        <p className="title">
                            {
                                { Eng: "Services", 简体: "服务", 繁體: "服務" }[
                                    currentLanguage
                                ]
                            }
                        </p>
                        <p className="content">
                            {
                                {
                                    Eng: "We provide asset, investment and family office management services tailored to meet the unique needs of our clients.",
                                    简体: "我们提供量身定制的资产、投资和家族办公室管理服务，以满足客户的独特需求。",
                                    繁體: "我們提供量身訂制的資產、投資和家族辦公室管理服務，以滿足客戶的獨特需求。",
                                }[currentLanguage]
                            }
                        </p>
                        <p className="link">
                            <Link to={"/services"}>
                                {
                                    {
                                        Eng: "Learn More",
                                        简体: "了解更多",
                                        繁體: "了解更多",
                                    }[currentLanguage]
                                }
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="home--about">
                <div className="home--about__container">
                    <div className="img" />
                    <div className="home--about__container--description">
                        <p className="title">
                            {
                                {
                                    Eng: "About Us",
                                    简体: "关于我们",
                                    繁體: "關於我們",
                                }[currentLanguage]
                            }
                        </p>
                        <p className="content">
                            {
                                {
                                    Eng: " Independence, Integrity, Transparency and Reliability are the key guiding principles of the firm. We are not tied or obligated to any single institution or partner and thus can source and provide bespoke solutions for our clients.",
                                    简体: "独立、诚信、透明与可靠是本公司的核心指导原则。我们不隶属于任何单一机构或合作伙伴，亦不受其义务约束，因此能为客户量身定制并提供专属解决方案。",
                                    繁體: "獨立、誠信、透明與可靠是本公司核心指導原則。我們不隸屬於任何單一機構或合作夥伴，亦不受其義務約束，因此能為客戶量身定制並提供專屬解決方案。",
                                }[currentLanguage]
                            }
                        </p>
                        <p className="link">
                            <Link to={"/about"}>
                                {
                                    {
                                        Eng: "Learn More",
                                        简体: "了解更多",
                                        繁體: "了解更多",
                                    }[currentLanguage]
                                }
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Contact currentLanguage={currentLanguage} />
        </div>
    );
};

export default Home;
