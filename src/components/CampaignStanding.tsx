"use client";

import { useState } from "react";
import { FACTIONS, type Standing } from "@/lib/types";

const ORDER = ["ADF", "CM", null, "EAP", "RDC"] as const;

export default function CampaignStanding({ standing }: { standing: Standing }) {
  const [showTable, setShowTable] = useState(false);

  const pts = standing.points;
  const total = FACTIONS.reduce((a, f) => a + (pts[f.key] || 0), 0);
  const allied = (pts.ADF || 0) + (pts.CM || 0);
  const axis = (pts.EAP || 0) + (pts.RDC || 0);
  const share = (v: number) => (total ? (v / total) * 100 : 0);

  const stamp = standing.updated_at ? new Date(standing.updated_at) : null;

  return (
    <div className="standing">
      <div className="standing-top">
        <div className="bloc-score allied">
          <span className="tag">Allied</span>
          <span className="v num">{allied.toLocaleString()}</span>
        </div>
        <div className="mid">Campaign standing</div>
        <div className="bloc-score axis">
          <span className="v num">{axis.toLocaleString()}</span>
          <span className="tag">Axis</span>
        </div>
      </div>

      <div className="meter" role="img" aria-label="Campaign points by faction">
        {ORDER.map((k, i) => {
          if (k === null) return <div className="gapline" key={`gap-${i}`} />;
          const f = FACTIONS.find((x) => x.key === k)!;
          const v = pts[f.key] || 0;
          const pct = share(v);
          return (
            <div
              key={f.key}
              className={`seg ${f.key}`}
              style={{ flex: `1 1 ${pct.toFixed(3)}%` }}
              title={`${f.key} · ${f.name} — ${v.toLocaleString()} pts, ${pct.toFixed(1)}% of board`}
              aria-label={`${f.name}: ${v} points, ${pct.toFixed(1)} percent`}
            >
              {pct > 8 ? f.key : ""}
            </div>
          );
        })}
      </div>

      <div className="meter-scale">
        <span>ADF + CM</span>
        <span>{total.toLocaleString()} pts contested</span>
        <span>EAP + RDC</span>
      </div>

      <div className="chips">
        {[...FACTIONS]
          .sort((a, b) => (pts[b.key] || 0) - (pts[a.key] || 0))
          .map((f) => {
            const v = pts[f.key] || 0;
            return (
              <div className="chip" key={f.key}>
                <div className="row1">
                  <span className="sw" style={{ background: f.colorVar }} />
                  <span className="ac">{f.key}</span>
                </div>
                <div className="nm">{f.name}</div>
                <div className="pts num">{v.toLocaleString()}</div>
                <div className="shr">{share(v).toFixed(1)}% of board</div>
              </div>
            );
          })}
      </div>

      <div className="standing-foot">
        <span>
          {stamp
            ? `Standing last updated ${stamp.toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}`
            : "Standing carried forward from the last completed operation"}
        </span>
        <button
          className="linkish"
          onClick={() => setShowTable((s) => !s)}
          aria-expanded={showTable}
        >
          {showTable ? "Hide table" : "Show as table"}
        </button>
      </div>

      {showTable && (
        <table className="scoretable">
          <caption className="eyebrow" style={{ textAlign: "left", padding: "10px 10px 6px" }}>
            Campaign points by faction
          </caption>
          <thead>
            <tr>
              <th>Faction</th>
              <th>Bloc</th>
              <th style={{ textAlign: "right" }}>Points</th>
              <th style={{ textAlign: "right" }}>Share</th>
            </tr>
          </thead>
          <tbody>
            {FACTIONS.map((f) => (
              <tr key={f.key}>
                <td>
                  {f.name} ({f.key})
                </td>
                <td>{f.bloc === "allied" ? "Allied" : "Axis"}</td>
                <td className="n">{(pts[f.key] || 0).toLocaleString()}</td>
                <td className="n">{share(pts[f.key] || 0).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
