import React from "react";
import { Link } from "react-router";
import "./contactButton.scss";

const ContactButton = ({ currentLanguage }) => {
    return (
        <div className="contactButton">
            <Link to="/contact">
                {
                    { Eng: "Contact Us", 简体: "联系我们", 繁體: "聯絡我們" }[
                        currentLanguage
                    ]
                }
            </Link>
        </div>
    );
};

export default ContactButton;
