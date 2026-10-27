import "./footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <p>
                © {new Date().getFullYear()} Everest (Hong Kong) Securities
                Limited and Giga (Hong Kong) Limited
            </p>
        </footer>
    );
};

export default Footer;
