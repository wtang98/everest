import React, { useState } from "react";
import "./contact.scss";

const enquiryTypes = [
    {
        value: "general",
        label: { Eng: "General enquiry", 简体: "一般咨询", 繁體: "一般諮詢" },
    },
    {
        value: "asset",
        label: { Eng: "Asset management", 简体: "资产管理", 繁體: "資產管理" },
    },
    {
        value: "investment",
        label: {
            Eng: "Investment management",
            简体: "投资管理",
            繁體: "投資管理",
        },
    },
    {
        value: "family",
        label: {
            Eng: "Family office management",
            简体: "家族办公室管理",
            繁體: "家族辦公室管理",
        },
    },
    {
        value: "securities",
        label: {
            Eng: "Securities services",
            简体: "证券服务",
            繁體: "證券服務",
        },
    },
];

const copy = {
    Eng: {
        title: "Let's talk",
        intro: "Tell us a little about how we can help.",
        enquiryType: "Enquiry type",
        name: "Name",
        email: "Email address",
        phone: "Phone number",
        message: "Your message",
        messagePlaceholder: "How can our team help?",
        submit: "Compose email",
        note: "This opens your default email app so you can review and send your enquiry.",
    },
    简体: {
        title: "联系我们",
        intro: "请告诉我们您需要哪些协助。",
        enquiryType: "咨询类型",
        name: "姓名",
        email: "电子邮箱",
        phone: "电话号码",
        message: "留言内容",
        messagePlaceholder: "请告诉我们如何为您提供协助",
        submit: "撰写邮件",
        note: "此操作会打开您的默认邮件应用，供您检查并发送咨询。",
    },
    繁體: {
        title: "聯絡我們",
        intro: "請告訴我們您需要哪些協助。",
        enquiryType: "諮詢類型",
        name: "姓名",
        email: "電郵地址",
        phone: "電話號碼",
        message: "留言內容",
        messagePlaceholder: "請告訴我們如何為您提供協助",
        submit: "撰寫電郵",
        note: "此操作會開啟您的預設電郵應用程式，供您檢查並傳送諮詢。",
    },
};

const Contact = ({ currentLanguage }) => {
    const [enquiryType, setEnquiryType] = useState("general");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const text = copy[currentLanguage] || copy.Eng;

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedEnquiry = enquiryTypes.find(
            (type) => type.value === enquiryType,
        );
        const body = [
            `Enquiry type: ${selectedEnquiry.label[currentLanguage] || selectedEnquiry.label.Eng}`,
            "",
            message,
            "",
            `Regards,`,
            name,
            email,
            phone,
        ].join("\n");
        const query = new URLSearchParams({
            subject:
                selectedEnquiry.label[currentLanguage] ||
                selectedEnquiry.label.Eng,
            body,
        });

        window.location.href = `mailto:account.dept@giga-hk.com?${query.toString()}`;
    };

    return (
        <section className="contact" aria-labelledby="contact-title">
            <div className="contact__heading">
                <p className="contact__eyebrow">{text.title}</p>
                <h2 id="contact-title">{text.title}</h2>
                <p>{text.intro}</p>
            </div>
            <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__field">
                    <label htmlFor="enquiry-type">{text.enquiryType}</label>
                    <select
                        id="enquiry-type"
                        value={enquiryType}
                        onChange={(event) => setEnquiryType(event.target.value)}
                    >
                        {enquiryTypes.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label[currentLanguage] || label.Eng}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="contact__field">
                    <label htmlFor="contact-name">{text.name}</label>
                    <input
                        id="contact-name"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="contact__field">
                    <label htmlFor="contact-email">{text.email}</label>
                    <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="contact__field">
                    <label htmlFor="contact-phone">{text.phone}</label>
                    <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
                <div className="contact__field contact__field--message">
                    <label htmlFor="contact-message">{text.message}</label>
                    <textarea
                        id="contact-message"
                        placeholder={text.messagePlaceholder}
                        required
                        rows={4}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                </div>
                <div className="contact__submit">
                    <p>{text.note}</p>
                    <button type="submit">
                        {text.submit}
                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Contact;
