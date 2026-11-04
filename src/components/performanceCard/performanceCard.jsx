import ChartCard from "../chartCard/chartCard.jsx";
import "./performanceCard.scss";

const PerformanceCard = ({ metrics }) => (
    <ChartCard title="Performance metrics" className="performance-card">
        <dl className="performance-card__metrics">
            {metrics.map(({ label, value }) => (
                <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                </div>
            ))}
        </dl>
    </ChartCard>
);

export default PerformanceCard;
