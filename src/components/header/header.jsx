import React, { useState } from "react";
import { Link } from "react-router";
import "./header.scss";
import { useMyContext } from "../../stateLayer/stateProvider.js";

const navigation = [
    { path: "/", label: { Eng: "Home", 简体: "主页", 繁體: "主頁" } },
    {
        path: "/securities",
        label: { Eng: "Securities", 简体: "证券", 繁體: "證券" },
    },
    {
        path: "/services",
        label: { Eng: "Services", 简体: "服务", 繁體: "服務" },
    },
    {
        path: "/about",
        label: { Eng: "About", 简体: "关于", 繁體: "關於" },
    },
    {
        path: "/contact",
        label: { Eng: "Contact", 简体: "联系", 繁體: "聯絡" },
    },
];

const languageNames = { Eng: "English", 简体: "简体中文", 繁體: "繁體中文" };

export const Header = ({ currentLanguage, setCurrentLanguage }) => {
    const { user } = useMyContext();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLanguage = () => {
        const languages = ["Eng", "简体", "繁體"];
        const nextLanguage =
            languages[
                (languages.indexOf(currentLanguage) + 1) % languages.length
            ];
        setCurrentLanguage(nextLanguage);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="header">
            <Link className="header__brand" to="/" onClick={closeMenu}>
                <span className="header__brand-mark" aria-hidden="true">
                    E
                </span>
                <span className="header__brand-name">
                    <strong>EVEREST</strong>
                    <span>HONG KONG</span>
                </span>
            </Link>

            <button
                className="header__menu-toggle"
                type="button"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={menuOpen}
                aria-controls="primary-navigation"
                onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
                <span />
                <span />
                <span />
            </button>

            <nav
                className={`header__navigation${menuOpen ? " is-open" : ""}`}
                id="primary-navigation"
                aria-label="Main navigation"
            >
                {navigation.map(({ path, label }) => (
                    <Link
                        key={path}
                        to={path}
                        onClick={closeMenu}
                        className="header__nav-link"
                    >
                        {label[currentLanguage]}
                    </Link>
                ))}
            </nav>

            <div className="header__actions">
                <Link
                    className="header__investor-link"
                    to={user !== undefined ? "/portfolio" : "/login"}
                >
                    {user !== undefined
                        ? {
                              Eng: "Investor area",
                              简体: "投资者专区",
                              繁體: "投資者專區",
                          }[currentLanguage]
                        : {
                              Eng: "Investor login",
                              简体: "投资者登录",
                              繁體: "投資者登錄",
                          }[currentLanguage]}
                </Link>
                <button
                    className="header__language"
                    type="button"
                    onClick={handleLanguage}
                    aria-label={`Current language: ${languageNames[currentLanguage]}. Change language`}
                >
                    {currentLanguage}
                </button>
            </div>
        </header>
    );
};
