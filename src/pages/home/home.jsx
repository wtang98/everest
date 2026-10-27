import React from "react";
import { Link } from "react-router";
import Contact from "../contact/contact";
import "./home.scss";
import everestLogo from "../../assets/everest_white.png";
import gigaLogo from "../../assets/giga logo.png";

const translations = {
    Eng: {
        eyebrow: "Independent thinking. Personal service.",
        title: "A considered approach to your financial future.",
        intro:
            "Securities, investment and family office services, delivered with care and integrity in Hong Kong.",
        contact: "Start a conversation",
        explore: "Explore what we do",
        securities: "Securities",
        securitiesDescription:
            "A full range of securities trading and brokerage services for individual, corporate and institutional clients.",
        services: "Investment & family office",
        servicesDescription:
            "Asset, investment and family office management shaped around your goals and circumstances.",
        about: "Independent by design",
        aboutDescription:
            "Independence, integrity, transparency and reliability guide the way we work. Our independent structure lets us focus on solutions tailored to each client.",
        learnMore: "Learn more",
        providedBy: "A connected group of specialists",
        everest: "Everest (Hong Kong) Securities Limited",
        giga: "Giga (Hong Kong) Limited",
    },
    简体: {
        eyebrow: "独立思考，贴心服务",
        title: "审慎规划您的财务未来。",
        intro: "扎根香港，以关怀与诚信提供证券、投资及家族办公室服务。",
        contact: "与我们联系",
        explore: "了解我们的服务",
        securities: "证券服务",
        securitiesDescription:
            "为个人、企业及机构客户提供全面的证券交易与经纪服务。",
        services: "投资与家族办公室",
        servicesDescription:
            "根据您的目标与实际情况，提供资产、投资及家族办公室管理服务。",
        about: "以独立为本",
        aboutDescription:
            "独立、诚信、透明与可靠是我们的工作准则。独立的架构让我们专注于为每位客户量身定制解决方案。",
        learnMore: "了解更多",
        providedBy: "专业团队协同服务",
        everest: "Everest（香港）证券有限公司",
        giga: "Giga（香港）有限公司",
    },
    繁體: {
        eyebrow: "獨立思考，貼心服務",
        title: "審慎規劃您的財務未來。",
        intro: "扎根香港，以關懷與誠信提供證券、投資及家族辦公室服務。",
        contact: "與我們聯絡",
        explore: "了解我們的服務",
        securities: "證券服務",
        securitiesDescription:
            "為個人、企業及機構客戶提供全面的證券交易與經紀服務。",
        services: "投資與家族辦公室",
        servicesDescription:
            "根據您的目標與實際情況，提供資產、投資及家族辦公室管理服務。",
        about: "以獨立為本",
        aboutDescription:
            "獨立、誠信、透明與可靠是我們的工作準則。獨立的架構讓我們專注於為每位客戶量身定制解決方案。",
        learnMore: "了解更多",
        providedBy: "專業團隊協同服務",
        everest: "Everest（香港）證券有限公司",
        giga: "Giga（香港）有限公司",
    },
};

const Home = ({ currentLanguage }) => {
    const text = translations[currentLanguage] || translations.Eng;

    return (
        <main className="home">
            <section className="home__hero">
                <div className="home__hero-inner">
                    <p className="home__eyebrow">{text.eyebrow}</p>
                    <h1>{text.title}</h1>
                    <p className="home__intro">{text.intro}</p>
                    <div className="home__hero-actions">
                        <Link className="home__primary-link" to="/contact">
                            {text.contact}
                            <span aria-hidden="true">→</span>
                        </Link>
                        <a className="home__secondary-link" href="#expertise">
                            {text.explore}
                        </a>
                    </div>
                </div>
                <div className="home__group" aria-label={text.providedBy}>
                    <p>{text.providedBy}</p>
                    <div className="home__group-companies">
                        <Link to="/securities" aria-label={text.everest}>
                            <img src={everestLogo} alt={text.everest} />
                        </Link>
                        <span aria-hidden="true" />
                        <Link to="/services" aria-label={text.giga}>
                            <img src={gigaLogo} alt={text.giga} />
                        </Link>
                    </div>
                </div>
                <a className="home__scroll" href="#expertise">
                    {text.explore}
                    <span aria-hidden="true">↓</span>
                </a>
            </section>

            <section className="home__expertise" id="expertise">
                <div className="home__section-heading">
                    <p className="home__eyebrow">{text.providedBy}</p>
                    <h2>{text.explore}</h2>
                </div>
                <div className="home__cards">
                    <article className="home__card">
                        <Link
                            className="home__card-image home__card-image--securities"
                            to="/securities"
                            aria-label={text.securities}
                        />
                        <div className="home__card-content">
                            <span className="home__card-index">01</span>
                            <h3>{text.securities}</h3>
                            <p>{text.securitiesDescription}</p>
                            <Link className="home__text-link" to="/securities">
                                {text.learnMore}
                                <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </article>
                    <article className="home__card">
                        <Link
                            className="home__card-image home__card-image--services"
                            to="/services"
                            aria-label={text.services}
                        />
                        <div className="home__card-content">
                            <span className="home__card-index">02</span>
                            <h3>{text.services}</h3>
                            <p>{text.servicesDescription}</p>
                            <Link className="home__text-link" to="/services">
                                {text.learnMore}
                                <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </article>
                </div>
            </section>

            <section className="home__about">
                <div className="home__about-image" role="img" aria-label="" />
                <div className="home__about-content">
                    <p className="home__eyebrow">{text.about}</p>
                    <h2>{text.about}</h2>
                    <p>{text.aboutDescription}</p>
                    <Link className="home__text-link" to="/about">
                        {text.learnMore}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </section>

            <Contact currentLanguage={currentLanguage} />
        </main>
    );
};

export default Home;
