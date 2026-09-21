"use client";

import { useState } from "react";
import type { Operation } from "@/lib/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseDate(s: string | null) {
  if (!s) return null;
  const p = s.split("-").map(Number);
  if (p.length !== 3 || p.some(isNaN)) return null;
  return new Date(p[0], p[1] - 1, p[2]);
}

function fmtTime(t: string | null) {
  if (!t) return "";
  const [hRaw, m] = t.split(":");
  let h = Number(hRaw);
  if (isNaN(h)) return "";
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m || "00"} ${ap}`;
}

export default function OperationCard({ op }: { op: Operation }) {
  const [expanded, setExpanded] = useState(false);
  const d = parseDate(op.date);
  const end = parseDate(op.end_date);
  const done = op.status === "completed" || op.status === "cancelled";

  const dayTxt =
    d && end && end.getDate() !== d.getDate() ? `${d.getDate()}–${end.getDate()}` : d ? String(d.getDate()) : "";

  return (
    <div className={`op${done ? " done" : ""}`}>
      <div className="dtg">
        {d ? (
          <>
            <div className="d">{dayTxt}</div>
            <div className="m">{MONTHS[d.getMonth()]}</div>
            <div className="y">
              {d.getFullYear()}
              {op.start_time ? ` · ${fmtTime(op.start_time)}` : ""}
            </div>
          </>
        ) : (
          <div className="m">TBD</div>
        )}
      </div>

      <div className="op-body">
        <h3>{op.title || "Untitled operation"}</h3>
        {op.venue && (
          <p className="ao">
            AO · <b>{op.venue}</b>
          </p>
        )}
        {op.briefing && (
          <>
            <p className={`brief${expanded ? "" : " clamp"}`}>{op.briefing}</p>
            <button
              className="linkish"
              style={{ marginTop: 10 }}
              onClick={() => setExpanded((e) => !e)}
            >
              {expanded ? "Collapse briefing" : "Read the full briefing"}
            </button>
          </>
        )}
      </div>

      <div className="op-actions">
        <span className={`status ${op.status}`}>{op.status}</span>
        {op.ticket_url && !done && (
          <a className="btn btn-primary btn-sm" href={op.ticket_url}>
            Get tickets
          </a>
        )}
      </div>
    </div>
  );
}
