import CampaignStanding from "@/components/CampaignStanding";
import OperationCard from "@/components/OperationCard";
import { Footer, Header } from "@/components/Chrome";
import { getOperations, getStanding } from "@/lib/data";
import { FACTIONS } from "@/lib/types";

export const dynamic = "force-dynamic";

const TEAM = [
  {
    name: "Jason Mlak",
    role: "Missions & props",
    bio: "Army veteran, paintball since 2002, airsoft since 2017. Has run everything from weekend games to two-day milsims and served as leadership and admin for other milsim companies. Writes the missions and builds the props.",
  },
  {
    name: "Jonathan Lao",
    role: "Squad support",
    bio: "Started in California in 2002, picked it back up in Colorado in 2018. Runs an HPA'd A&K MK46 and the SSW role with Division Airsoft across 15+ milsim events. Motto: accuracy through volume.",
  },
  {
    name: "Joseph Smith",
    role: "Event design",
    bio: "Twenty years in the sport and a decade deep in milsim. Built P3 around the details other events leave out — the small things that take an event from good to unforgettable.",
  },
  {
    name: "Matthew Krueger",
    role: "Operations",
    bio: "Playing since 2012, runs the Designated Marksman role with a custom MTW. Runs Big Red Airsoft, a high-end supply shop specializing in HPA. Handles most of what you do not directly see.",
  },
];

export default async function Home() {
  const [operations, standing] = await Promise.all([getOperations(), getStanding()]);

  const upcoming = operations
    .filter((o) => o.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = operations
    .filter((o) => o.status !== "upcoming")
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Header />
      <main id="top">
        <div className="wrap board" id="campaign">
          <div className="board-head">
            <div>
              <p className="eyebrow">Colorado · Milsim event company</p>
              <h1>Airsoft events built by airsofters</h1>
            </div>
            <p className="lede">
              Immersive scenarios, interactive props and missions written to be played, not just
              announced. Four factions, one running campaign — every operation moves the board.
            </p>
          </div>
          <CampaignStanding standing={standing} />
        </div>

        <section id="operations">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Operations</p>
              <h2>Next on the board</h2>
              <p>
                Every operation is written as a chapter of the campaign. Results carry forward.
              </p>
            </div>

            <div className="ops">
              {upcoming.length > 0 ? (
                upcoming.map((op) => <OperationCard key={op.id} op={op} />)
              ) : (
                <div className="empty">
                  <p className="eyebrow">No operations on the board</p>
                  <p>
                    The next operation has not been announced yet. Follow on Instagram to hear it
                    first.
                  </p>
                </div>
              )}
            </div>

            {past.length > 0 && (
              <>
                <div className="sec-head" style={{ marginTop: 48 }}>
                  <p className="eyebrow">Campaign history</p>
                  <h2>Completed operations</h2>
                </div>
                <div className="ops">
                  {past.map((op) => (
                    <OperationCard key={op.id} op={op} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section id="factions">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Order of battle</p>
              <h2>Four factions, one war</h2>
              <p>
                Pick a side at check-in. Your uniform is your allegiance — dress to the faction list
                or you will be reassigned.
              </p>
            </div>

            <div className="factions">
              {FACTIONS.map((f) => (
                <div className="fac" key={f.key}>
                  <div className="fac-plate">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.logo} alt={`${f.name} faction flag`} />
                  </div>
                  <div className="fac-body">
                    <div className="row1">
                      <span className="sw" style={{ background: f.colorVar }} />
                      <h3>{f.name}</h3>
                    </div>
                    <p>{f.blurb}</p>
                    <div className="uniform">
                      <b>Acceptable uniforms</b>
                      {f.uniforms}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-note">
              <p className="eyebrow">Standing order — red is admin</p>
              <p>
                No player wears red, in any faction. Red is reserved for Admin on the field so staff
                are identifiable at a glance. Construct Militia players also avoid any opposing
                faction&apos;s colors or camo.
              </p>
            </div>
          </div>
        </section>

        <section id="intel">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Intel</p>
              <h2>Before you deploy</h2>
              <p>
                Read the rules and watch the walkthrough before your first event. Both are required
                for check-in.
              </p>
            </div>
            <div className="intel">
              <div className="card">
                <h3>Rules of engagement</h3>
                <p>
                  The full ruleset — engagement distances, hit calling, medic rules, safety zones,
                  chrono limits and check-in procedure.
                </p>
                <a className="btn btn-ghost" href="https://pewpewpewductions.com/rules">
                  Download rules
                </a>
              </div>
              <div className="card">
                <h3>Rules walkthrough</h3>
                <p>
                  The same ruleset explained on camera, with the situations new players ask about
                  most.
                </p>
                <a className="btn btn-ghost" href="https://www.youtube.com/@PewPewPewductions">
                  Watch the video
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="roster">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Who runs it</p>
              <h2>Built by airsofters</h2>
              <p>
                Combined, the team brings experience from over 50 milsim events, countless weekend
                games and more than 40 years in the sport. The goal is to elevate the whole
                experience — communication, check-in, prep and post-event, not just the gameplay —
                and to build the Colorado airsoft community while doing it.
              </p>
            </div>
            <div className="roster">
              {TEAM.map((p) => (
                <div className="person" key={p.name}>
                  <h3>{p.name}</h3>
                  <p className="role">{p.role}</p>
                  <p>{p.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
