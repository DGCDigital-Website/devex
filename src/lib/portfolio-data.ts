export type PortfolioProject = {
  id: string;
  title: string;
  client: string;
  country: string;
  region: string;
  year: number;
  service: "organizational-strengthening" | "capacity-strengthening" | "system-strengthening" | "safety-security";
  thematic?: string;
  description: string;
  tags?: string[];
  donor?: string;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "wfp-kenya-strategic-plan",
    title: "WFP Kenya Country Strategic Plan 2022–2026",
    client: "WFP",
    country: "Kenya",
    region: "East Africa",
    year: 2021,
    service: "organizational-strengthening",
    thematic: "food-security",
    description:
      "Development of the WFP Kenya Country Strategic Plan 2022–2026, incorporating zero hunger, nutrition, and climate resilience frameworks.",
    tags: ["Strategic Planning", "Food Security", "WFP"],
    donor: "WFP",
  },
  {
    id: "irc-global-strategy",
    title: "IRC Global Strategy 2020–2024",
    client: "IRC",
    country: "Multi-Country (41)",
    region: "Global",
    year: 2019,
    service: "organizational-strengthening",
    thematic: "governance",
    description:
      "Lead consultant for IRC's 41-country global strategy development, including organisational alignment, theory of change, and outcome framework design.",
    tags: ["Strategic Planning", "Governance", "IRC", "Global"],
    donor: "IRC",
  },
  {
    id: "fairtrade-africa-mtr",
    title: "Fairtrade Africa Mid-Term Review",
    client: "Fairtrade",
    country: "Multi-Country (12)",
    region: "Africa",
    year: 2022,
    service: "system-strengthening",
    thematic: "food-security",
    description:
      "Mid-term review of Fairtrade Africa's strategy across 12 African countries, assessing farmer outcomes, gender integration, and organisational effectiveness.",
    tags: ["Evaluation", "Food Security", "Fairtrade", "Multi-Country"],
    donor: "Fairtrade",
  },
  {
    id: "fairtrade-mel-ecosystem",
    title: "Fairtrade Africa MEL Ecosystem",
    client: "Fairtrade",
    country: "Multi-Country (12)",
    region: "Africa",
    year: 2021,
    service: "system-strengthening",
    thematic: "food-security",
    description:
      "Design and rollout of a continental MEL ecosystem for Fairtrade Africa covering 12 countries, including digital data collection tools and a live dashboard.",
    tags: ["MEL Systems", "Data Management", "Fairtrade"],
    donor: "Fairtrade",
  },
  {
    id: "undp-kenya-devolution-mtr",
    title: "UNDP/UN Women/UNICEF Kenya Joint Devolution MTR",
    client: "UNDP",
    country: "Kenya",
    region: "East Africa",
    year: 2020,
    service: "system-strengthening",
    thematic: "governance",
    description:
      "Mid-term review of the joint UNDP/UN Women/UNICEF Kenya devolution programme, assessing county-level governance, gender, and social protection outcomes.",
    tags: ["Evaluation", "Governance", "Gender", "UNDP"],
    donor: "UNDP",
  },
  {
    id: "sida-somalia-resilience",
    title: "SIDA Somalia Resilience Programme End-Term Review",
    client: "SIDA",
    country: "Somalia",
    region: "Horn of Africa",
    year: 2022,
    service: "system-strengthening",
    thematic: "food-security",
    description:
      "End-term evaluation of SIDA's resilience programme in Somalia, examining food security, livelihoods, and climate adaptation outcomes.",
    tags: ["Evaluation", "Resilience", "Somalia", "SIDA"],
    donor: "SIDA",
  },
];

export const SERVICE_LABELS: Record<PortfolioProject["service"], string> = {
  "organizational-strengthening": "Organizational Strengthening",
  "capacity-strengthening": "Capacity Strengthening",
  "system-strengthening": "System Strengthening",
  "safety-security": "Safety & Security",
};

