"use client";

import { useActionState, useState } from "react";
import {
  deleteOperation,
  saveOperation,
  saveScores,
  type ActionState,
} from "./actions";
import { FACTIONS, type Operation, type Standing } from "@/lib/types";

const EMPTY: ActionState = { ok: true, message: "" };

const BLANK: Operation = {
  id: "",
  title: "",
  date: "",
  end_date: null,
  start_time: null,
  status: "upcoming",
  venue: null,
  ticket_url: null,
  briefing: null,
};

export default function Console({
  operations,
  standing,
}: {
  operations: Operation[];
  standing: Standing;
}) {
  const [editing, setEditing] = useState<Operation | null>(null);
  const [opState, opAction, opPending] = useActionState(saveOperation, EMPTY);
  const [delState, delAction, delPending] = useActionState(deleteOperation, EMPTY);
  const [scoreState, scoreAction, scorePending] = useActionState(saveScores, EMPTY);

  return (
    <>
      <div className="panelbox">
        <p className="eyebrow" style={{ marginBottom: 14 }}>
          Campaign points
        </p>
        <form action={scoreAction}>
          <div className="score-grid">
            {FACTIONS.map((f) => (
              <div className="field" key={f.key}>
                <label htmlFor={`pts_${f.key}`}>{f.key}</label>
                <input
                  id={`pts_${f.key}`}
                  name={`pts_${f.key}`}
                  type="number"
                  min={0}
                  step={1}
                  defaultValue={standing.points[f.key] ?? 0}
                />
              </div>
            ))}
          </div>
          <div className="row-actions">
            <button className="btn btn-primary btn-sm" disabled={scorePending}>
              {scorePending ? "Saving…" : "Save points"}
            </button>
            {scoreState.message && <span style={{ fontSize: 14 }}>{scoreState.message}</span>}
          </div>
        </form>
      </div>

      <div className="panelbox">
        <p className="eyebrow" style={{ marginBottom: 14 }}>
          Operations
        </p>

        {operations.length === 0 && (
          <div className="ed-row">No operations yet.</div>
        )}

        {[...operations]
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((op) => (
            <div className="ed-row" key={op.id}>
              <span>{op.title}</span>
              <span className="row-actions">
                <span className="d">
                  {op.date} · {op.status}
                </span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setEditing(op)}
                  type="button"
                >
                  Edit
                </button>
              </span>
            </div>
          ))}

        <div className="row-actions" style={{ marginTop: 14 }}>
          <button
            className="btn btn-ghost btn-sm"
            type="button"
            onClick={() => setEditing({ ...BLANK })}
          >
            Add an operation
          </button>
          {delState.message && <span style={{ fontSize: 14 }}>{delState.message}</span>}
        </div>
      </div>

      {editing && (
        <div className="panelbox">
          <p className="eyebrow" style={{ marginBottom: 14 }}>
            {editing.id ? "Edit operation" : "New operation"}
          </p>
          <form action={opAction} key={editing.id || "new"}>
            <input type="hidden" name="id" value={editing.id} />
            <div className="field">
              <label htmlFor="title">Operation name</label>
              <input
                id="title"
                name="title"
                required
                defaultValue={editing.title}
                placeholder="Operation: Freedom 4"
              />
            </div>
            <div className="grid2">
              <div className="field">
                <label htmlFor="date">Start date</label>
                <input id="date" name="date" type="date" required defaultValue={editing.date} />
              </div>
              <div className="field">
                <label htmlFor="end_date">End date (optional)</label>
                <input
                  id="end_date"
                  name="end_date"
                  type="date"
                  defaultValue={editing.end_date ?? ""}
                />
              </div>
              <div className="field">
                <label htmlFor="start_time">Start time</label>
                <input
                  id="start_time"
                  name="start_time"
                  type="time"
                  defaultValue={editing.start_time ?? ""}
                />
              </div>
              <div className="field">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" defaultValue={editing.status}>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="venue">Area of operations</label>
              <input
                id="venue"
                name="venue"
                defaultValue={editing.venue ?? ""}
                placeholder="Dynamic Paintball and Airsoft"
              />
            </div>
            <div className="field">
              <label htmlFor="ticket_url">Ticket link</label>
              <input
                id="ticket_url"
                name="ticket_url"
                type="url"
                defaultValue={editing.ticket_url ?? ""}
                placeholder="https://"
              />
            </div>
            <div className="field">
              <label htmlFor="briefing">Briefing</label>
              <textarea
                id="briefing"
                name="briefing"
                defaultValue={editing.briefing ?? ""}
                placeholder="The scenario players read before the event."
              />
            </div>
            <div className="row-actions">
              <button className="btn btn-primary btn-sm" disabled={opPending}>
                {opPending ? "Saving…" : "Save operation"}
              </button>
              <button className="btn btn-ghost btn-sm" type="button" onClick={() => setEditing(null)}>
                Cancel
              </button>
              {opState.message && <span style={{ fontSize: 14 }}>{opState.message}</span>}
            </div>
          </form>

          {editing.id && (
            <form action={delAction} style={{ marginTop: 16 }}>
              <input type="hidden" name="id" value={editing.id} />
              <button
                className="btn btn-ghost btn-sm"
                style={{ color: "var(--admin)", borderColor: "var(--admin)" }}
                disabled={delPending}
              >
                {delPending ? "Removing…" : "Delete this operation"}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
