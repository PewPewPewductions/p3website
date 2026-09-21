"use client";

import { useActionState } from "react";
import { signIn, type ActionState } from "./actions";

const EMPTY: ActionState = { ok: true, message: "" };

export default function SignIn() {
  const [state, action, pending] = useActionState(signIn, EMPTY);

  return (
    <div className="panelbox" style={{ maxWidth: 420 }}>
      <form action={action}>
        <div className="field">
          <label htmlFor="password">Passphrase</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>
        <div className="row-actions">
          <button className="btn btn-primary btn-sm" disabled={pending}>
            {pending ? "Checking…" : "Sign in"}
          </button>
          {state.message && <span style={{ fontSize: 14 }}>{state.message}</span>}
        </div>
      </form>
    </div>
  );
}
