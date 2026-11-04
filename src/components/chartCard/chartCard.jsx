import "./chartCard.scss";

const ChartCard = ({
    title,
    subtitle,
    headerAside,
    className = "",
    children,
}) => (
    <article className={`chart-card${className ? ` ${className}` : ""}`}>
        <div className="chart-card__heading">
            <div>
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
            </div>
            {headerAside && (
                <div className="chart-card__aside">{headerAside}</div>
            )}
        </div>
        {children}
    </article>
);

export default ChartCard;
