import WeightChart from "../components/WeightChart";
import { weightHistory, healthRecords } from "../data/mockData";

export default function Records() {
  return (
    <>
      <h3 className="sec-title">
        📈 体重のうつりかわり <small>直近8週</small>
      </h3>
      <div className="card chart-card">
        <h4>いまの体重</h4>
        <div className="now">
          2.1 <small>kg（先週 +0.1kg）</small>
        </div>
        <div className="chart-wrap">
          <WeightChart points={weightHistory} />
        </div>
      </div>

      <h3 className="sec-title">🗒️ さいきんの記録</h3>
      <div className="card">
        {healthRecords.map((r) => (
          <div className="log" key={r.id}>
            <span className="d">{r.date}</span>
            <span className="t">{r.note}</span>
            <span className="tag">{r.tags[0]}</span>
          </div>
        ))}
      </div>
    </>
  );
}
