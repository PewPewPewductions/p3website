import type { Operation, Standing } from "./types";

/**
 * Content carried over from pewpewpewductions.com on 21 Sep 2026.
 * Used only when Supabase environment variables are absent, so the site
 * still renders real content on a bare deploy. Once Supabase is wired up,
 * these rows are seeded into the database and this file stops being read.
 */

export const FALLBACK_STANDING: Standing = {
  points: { ADF: 280, CM: 21, EAP: 242, RDC: 30 },
  updated_at: null,
};

export const FALLBACK_OPERATIONS: Operation[] = [
  {
    id: "freedom-3",
    title: "Operation: Freedom 3",
    date: "2025-04-26",
    end_date: null,
    start_time: "09:00",
    status: "completed",
    venue: "Dynamic Paintball and Airsoft",
    ticket_url: null,
    briefing:
      "As we prepare for Operation Freedom 3, we look back to the outcome of Freedom 2. Freedom 2 saw a new government put in place with a new military. Some of the world has seen this as a sign of vulnerability. With reports of Russia, China, and North Korea pressuring Canada into joining the Eurasian Axis of Power (EAP). The EAP has somehow leveraged Canada into allowing EAP troops to move into Canada and they are setting up outposts along the American border. Along with the EAP troops there are reports of a private military contracting group known as Red Diamond Contracting (RDC). The RDC is made up of former military from all over the world and is known to work for the highest bidder and their ruthless tactics. In response America is forming a special unit to combat the encroaching EAP and RDC knocking on its Northern door. The American task force is called the American Defense Force (ADF). With America trying to recover from the civil unrest it has faced the last few years and a new president and government being implemented, it has reactivated and enhanced the draft, drafting American citizens to fight along the ADF. This civilian force is called Construct Militia (CM). The ADF along with the CM are mobilizing and reinforcing the border.\n\nWe are on the brink of another world war. EAP is set to invade America trying to capitalize on what looks like vulnerability and topple the once powerhouse of the world. Is America strong enough to fight back and repel the EAP knocking on its Northern border?",
  },
  {
    id: "extraction",
    title: "Mission: Extraction",
    date: "2025-05-24",
    end_date: null,
    start_time: "17:00",
    status: "completed",
    venue: "Go Airheads",
    ticket_url: null,
    briefing:
      "In the aftermath of the failed RDC mission to free the EAP General, new information has been brought to the ADF's attention from a captured Red Diamond Contracting operator.\n\nThe rescue of the EAP General by RDC was just a diversionary tactic, meant for ADF/CM forces to divert troops from other locations and focus all effort on preventing the EAP General's escape. With ADF/CM focused elsewhere, EAP/RDC were successful in completing their real main objective: acquiring a list of all compromised deep cover EAP/RDC agents. With this newly acquired intel, EAP/RDC operatives are launching multiple simultaneous missions to extract these High Value Targets (HVT). You and your squad will be tasked to infiltrate the ADF base on foot, find all additional intel, find the HVT, call in the chopper for evac and hold out until it arrives.\n\nFor this mission you will encounter OPFOR (ADF/CM) forces as well as possibly another extraction team focused on finding their HVT. Whether you choose to engage the other team or focus on your mission is up to you and your team. Be forewarned: we only have airspace for ONE extraction chopper to be called in at a time.\n\nWill you be the team having to wait to call for extraction, or will you be the fastest team to extract with the HVT?",
  },
  {
    id: "maple-fury",
    title: "Battle: Maple Fury",
    date: "2025-06-28",
    end_date: "2025-06-29",
    start_time: "09:00",
    status: "completed",
    venue: "Two Chicks Paintball",
    ticket_url: null,
    briefing:
      "Canada is in crisis. U.S. tariffs on lumber, oil, and manufacturing have crippled the economy, triggering mass job losses, supply chain failures, and nationwide unrest. As diplomatic efforts stall, Canada's government is forced to consider drastic measures. With climate change revealing vast northern resources, the Eurasian Axis Power (EAP) — China, Russia, and North Korea — offers Canada assistance, strengthening their alliance against the U.S.\n\nTensions explode when multiple pro-American Canadian politicians are assassinated by masked operatives. Footage suggests American involvement, but the U.S. denies responsibility, claiming a false flag operation by EAP to justify war. In a historic shift, Canada formally joins the EAP.\n\nAs Eurasian forces mobilize worldwide, Canada launches Operation Maple Fury, a full-scale invasion of the United States. Backed by the ruthless Red Diamond Contracting (RDC), Canadian forces swiftly take Alaska, seizing key energy resources and severing U.S. access to the Arctic. With U.S. troops deployed overseas, America is caught off guard. The newly formed American Defense Force (ADF) attempts a counteroffensive but is repelled. Canadian and Eurasian troops, reinforced by RDC operatives, push south through the Rockies, securing Idaho, Montana, and Wyoming, with Colorado as their next target. Their strategy is clear: sever the U.S. in half, isolate its forces, and pave the way for a larger invasion.\n\nThe world watches as America prepares to make its stand. The battle for survival has begun.",
  },
];
