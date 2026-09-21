export type FactionKey = "ADF" | "CM" | "EAP" | "RDC";

export type OpStatus = "upcoming" | "completed" | "cancelled";

export interface Operation {
  id: string;
  title: string;
  date: string;        // YYYY-MM-DD
  end_date: string | null;
  start_time: string | null;  // HH:MM
  status: OpStatus;
  venue: string | null;
  ticket_url: string | null;
  briefing: string | null;
}

export interface Standing {
  points: Record<FactionKey, number>;
  updated_at: string | null;
}

export interface Faction {
  key: FactionKey;
  name: string;
  bloc: "allied" | "axis";
  colorVar: string;
  logo: string;
  blurb: string;
  uniforms: string;
}

export const FACTIONS: Faction[] = [
  {
    key: "ADF",
    name: "American Defense Force",
    bloc: "allied",
    colorVar: "var(--allied-1)",
    logo: "/logos/Logo_ADF.webp",
    blurb:
      "A joint task force across the American militaries, formed in response to the Eurasian Axis of Power and the attack from the North.",
    uniforms:
      "DCU/Chocolate Chip, Multicam, Multicam Arid, Tan/Coyote, AOR1, Desert Tiger Stripe.",
  },
  {
    key: "CM",
    name: "Construct Militia",
    bloc: "allied",
    colorVar: "var(--allied-2)",
    logo: "/logos/Logo_CM.webp",
    blurb:
      "Civilians. America reinstated the draft and is calling citizens to fight alongside the ADF — though not every civilian aligns with them.",
    uniforms:
      "Civilian clothing, plaid, Hawaiian, jeans. Nothing red — that is Admin. No opposing faction colors or camo. Paired with another faction, their pants are acceptable but the top must be CM.",
  },
  {
    key: "EAP",
    name: "Eurasian Axis of Power",
    bloc: "axis",
    colorVar: "var(--axis-1)",
    logo: "/logos/Logo_EAP.webp",
    blurb:
      "Russia, China and North Korea, with Canada pressured into joining. Canada is now the staging ground for attacks on America.",
    uniforms:
      "M81/Woodland, Multicam Tropic, OD/Ranger Green, Tiger Stripe, Cadpat, EMR.",
  },
  {
    key: "RDC",
    name: "Red Diamond Contracting",
    bloc: "axis",
    colorVar: "var(--axis-2)",
    logo: "/logos/Logo_RDC.webp",
    blurb:
      "A private military group of former soldiers from around the world, known for working for the highest bidder and for ruthless tactics. Currently the EAP's tip of the spear.",
    uniforms: "Black, White, Grey, Multicam Black, Multicam Alpine.",
  },
];

export const FACTION_KEYS: FactionKey[] = ["ADF", "CM", "EAP", "RDC"];
