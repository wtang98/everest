import "./holdingCard.scss";

const HoldingCard = ({
    stockCode,
    stockName,
    valueLabel,
    value,
    details,
    isTransaction = false,
}) => (
    <div
        className={`holding-card${isTransaction ? " holding-card--transaction" : ""}`}
    >
        <div className="holding-card__header">
            <div className="holding-card__identity">
                <h2>{stockCode}</h2>
                <p>{stockName}</p>
            </div>
            <div className="holding-card__value">
                <span>{valueLabel}</span>
                <strong>{value}</strong>
            </div>
        </div>
        <dl className="holding-card__details">
            {details.map(({ label, value: detailValue }) => (
                <div key={label}>
                    <dt>{label}</dt>
                    <dd>{detailValue}</dd>
                </div>
            ))}
        </dl>
    </div>
);

export default HoldingCard;
