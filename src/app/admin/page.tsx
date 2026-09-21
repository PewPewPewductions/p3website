import Console from "./Console";
import SignIn from "./SignIn";
import { isSignedIn, signOut } from "./actions";
import { adminEnabled, dbEnabled, getOperations, getStanding } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Command console — Pew Pew Pewductions", robots: "noindex" };

export default async function AdminPage() {
  const [operations, standing, signedIn] = await Promise.all([
    getOperations(),
    getStanding(),
    isSignedIn(),
  ]);

  return (
    <div className="admin-wrap">
      <p className="eyebrow">Pew Pew Pewductions</p>
      <h1 style={{ fontSize: 34, fontWeight: 800, margin: "6px 0 24px" }}>Command console</h1>

      {!dbEnabled && (
        <div className="notice">
          <p className="eyebrow">Read-only deployment</p>
          <p>
            No database is configured, so the site is serving the bundled fallback content and
            nothing here can be saved. Add <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, <code>SUPABASE_SERVICE_ROLE_KEY</code> and{" "}
            <code>ADMIN_PASSWORD</code> in the Vercel project settings, run the migration in{" "}
            <code>supabase/migrations</code>, and redeploy.
          </p>
        </div>
      )}

      {dbEnabled && !adminEnabled && (
        <div className="notice">
          <p className="eyebrow">Editing disabled</p>
          <p>
            The site is reading from the database, but <code>SUPABASE_SERVICE_ROLE_KEY</code> or{" "}
            <code>ADMIN_PASSWORD</code> is missing, so nothing can be written.
          </p>
        </div>
      )}

      {adminEnabled && !signedIn && <SignIn />}

      {adminEnabled && signedIn && (
        <>
          <form action={signOut} style={{ marginBottom: 20 }}>
            <button className="btn btn-ghost btn-sm">Sign out</button>
          </form>
          <Console operations={operations} standing={standing} />
        </>
      )}

      <p style={{ marginTop: 40 }}>
        <a href="/">← Back to the site</a>
      </p>
    </div>
  );
}
