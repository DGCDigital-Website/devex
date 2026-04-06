import type {
  ServiceItem,
  TeamMember,
  CountriesData,
  Project,
  JobPosting,
  BlogPost,
} from "./types";

// ─────────────────────────────────────────
// COMPANY METADATA
// ─────────────────────────────────────────
export const COMPANY = {
  name: "Devex Global Consult",
  shortName: "DGC",
  tagline: "Powerful Insights | Proven Delivery",
  phone: "+254 752 889 900",
  email: "info@devexglobal.com",
  address: "The Mint Hub, Westlands, Nairobi, Kenya",
  addressLines: ["The Mint Hub", "Westlands", "Nairobi, Kenya"],
  hours: "Mon–Fri: 9AM–5PM | Sat: 9AM–1PM",
  website: "https://devexglobal.com",
  social: {
    linkedin: "https://linkedin.com/company/devex-global-consult",
    twitter: "https://twitter.com/devexglobal",
    facebook: "https://facebook.com/devexglobal",
  },
} as const;

// ─────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────
export const SERVICES: ServiceItem[] = [
  {
    id: "organizational-strengthening",
    slug: "organizational-strengthening",
    title: "Organizational Strengthening",
    shortTitle: "Org. Strengthening",
    icon: "Building2",
    tagline: "Building resilient institutions",
    description:
      "We help organizations build internal capacity, governance structures, and systems that drive sustainable impact.",
    longDescription:
      "DGC's Organizational Strengthening practice partners with NGOs, government agencies, and private sector entities to diagnose institutional gaps and build the systems, processes, and human capital needed to deliver their mandates effectively. From governance reviews to strategic planning, our approach is evidence-based, participatory, and sustainable.",
    features: [
      "Institutional capacity assessments and audits",
      "Governance and board effectiveness reviews",
      "Organizational restructuring and change management",
      "Strategic planning and results-based management",
      "Performance management system design",
      "Financial management and compliance systems",
    ],
    color: "#3D9DD9",
  },
  {
    id: "capacity-strengthening",
    slug: "capacity-strengthening",
    title: "Capacity Strengthening",
    shortTitle: "Capacity Strengthening",
    icon: "Users2",
    tagline: "Empowering people to deliver",
    description:
      "Tailored training, mentorship, and learning solutions that build competency at individual and organisational levels.",
    longDescription:
      "Our Capacity Strengthening practice designs and delivers bespoke training and learning interventions grounded in adult learning principles. We move beyond one-off workshops to embed lasting skills through coaching, mentorship, peer learning, and knowledge management systems.",
    features: [
      "Training needs assessments (TNA)",
      "Curriculum and module development",
      "Facilitation of workshops and masterclasses",
      "Mentorship and coaching programmes",
      "Resource mobilisation and proposal writing support",
      "Leadership development and succession planning",
    ],
    color: "#177DA6",
  },
  {
    id: "system-strengthening",
    slug: "system-strengthening",
    title: "System Strengthening",
    shortTitle: "System Strengthening",
    icon: "Network",
    tagline: "Designing systems that scale",
    description:
      "Data, M&E, and information management systems that give organisations actionable intelligence and accountability.",
    longDescription:
      "DGC's System Strengthening practice builds the information architecture that powers evidence-based decision-making. We design and implement MEAL frameworks, data management systems, and learning platforms that connect field data to strategic leadership in real time.",
    features: [
      "MEAL framework design and rollout",
      "DHIS2, KoBo, and ODK implementation",
      "GIS mapping and spatial analysis",
      "Real-time data dashboards and visualisation",
      "Research, evaluation, and learning (REL) systems",
      "Accountability and feedback mechanisms",
    ],
    color: "#50D4F2",
  },
  {
    id: "safety-security",
    slug: "safety-security",
    title: "Safety & Security System Strengthening",
    shortTitle: "Safety & Security",
    icon: "Shield",
    tagline: "Protecting people and operations",
    description:
      "Comprehensive safety and security risk management for NGOs operating in complex and fragile environments.",
    longDescription:
      "DGC's Safety & Security practice provides holistic, context-sensitive risk management solutions for humanitarian and development organisations working in fragile and conflict-affected states. We go beyond policy documents to build organisational culture, staff competency, and operational systems that protect people.",
    features: [
      "Security risk assessments (SRA) and context analysis",
      "Safety and security policy and protocol development",
      "Incident management and crisis response planning",
      "Staff safety training and simulation exercises",
      "Context monitoring and early warning systems",
      "Duty of care framework development",
    ],
    color: "#7ED1F2",
  },
];

// ─────────────────────────────────────────
// TEAM MEMBERS
// ─────────────────────────────────────────
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "albino-luciani",
    name: "Dr. Albino Luciani",
    role: "Chief Executive Officer",
    credentials: "PhD",
    bio: "Dr. Luciani brings over 30 years of experience in international development consulting, evaluation, and organisational strengthening. He has led assignments across 22 African, 8 Asian, 4 Middle Eastern, and 3 European countries, working with USAID, WFP, UN Women, IRC, and major bilateral donors.",
    image: "/images/team/albino-luciani.jpg",
    featured: true,
    expertise: ["Organisational Development", "Strategic Evaluation", "Leadership & Governance", "MEAL Systems"],
    countriesCount: 39,
  },
  {
    id: "lowie-rosales",
    name: "Lowie Rosales",
    role: "Senior Consultant",
    bio: "Lowie specialises in capacity strengthening and MEAL system design across humanitarian and development contexts, with deep expertise in East and Central Africa.",
    image: "/images/team/lowie-rosales.jpg",
    featured: true,
    expertise: ["Capacity Strengthening", "MEAL", "Humanitarian Response"],
  },
  {
    id: "gilbert-onyango",
    name: "Gilbert Onyango",
    role: "Senior Consultant",
    bio: "Gilbert leads DGC's digital data systems practice, with expertise in DHIS2, GIS, spatial analytics, and quantitative evaluation methods.",
    image: "/images/team/gilbert-onyango.jpg",
    featured: true,
    expertise: ["DHIS2", "GIS & Spatial Analysis", "Data Systems", "Quantitative M&E"],
  },
  {
    id: "manon-de-courten",
    name: "Manon de Courten",
    role: "Senior Consultant",
    bio: "Manon is a recognised expert in gender mainstreaming, SGBV programming, and feminist evaluation methodologies, with assignments across Africa, Asia, and the Middle East.",
    image: "/images/team/manon-de-courten.jpg",
    featured: true,
    expertise: ["Gender & Inclusion", "SGBV", "Feminist Evaluation"],
  },
  {
    id: "noella-mutanda",
    name: "Noella M. Mutanda",
    role: "Senior Consultant",
    bio: "Noella has led complex multi-country evaluations for USAID, UNDP, and UN Women across East Africa, with a focus on health and livelihoods programming.",
    image: "/images/team/noella-mutanda.jpg",
    featured: false,
    expertise: ["Research & Evaluation", "Health Systems", "East Africa"],
  },
  {
    id: "habtamu-adane",
    name: "Habtamu Adane",
    role: "Consultant",
    bio: "Habtamu designs safety and security frameworks for NGOs operating in fragile and conflict-affected states, with particular expertise in the Horn of Africa.",
    image: "/images/team/habtamu-adane.jpg",
    featured: false,
    expertise: ["Safety & Security", "FCAS", "Horn of Africa"],
  },
  {
    id: "karin-van-den-belt",
    name: "Karin van den Belt",
    role: "Senior Consultant",
    bio: "Karin specialises in governance reviews, board effectiveness, and institutional change management for international NGOs and multilateral organisations.",
    image: "/images/team/karin-van-den-belt.jpg",
    featured: false,
    expertise: ["Organisational Development", "Governance", "Change Management"],
  },
  {
    id: "moses-lusih",
    name: "Moses Lusih",
    role: "M&E Consultant",
    bio: "Moses brings deep expertise in health systems strengthening, RMNCAH, and primary healthcare delivery evaluation across Kenya and East Africa.",
    image: "/images/team/moses-lusih.jpg",
    featured: false,
    expertise: ["Health Systems", "RMNCAH", "M&E"],
  },
  {
    id: "mr-odhek",
    name: "Mr. Odhek",
    role: "Junior Consultant",
    bio: "Mr. Odhek supports DGC's research, data collection, and analysis activities across field assignments in Kenya and the broader East Africa region.",
    image: "/images/team/mr-odhek.jpg",
    featured: false,
    expertise: ["Research Support", "Field Data Collection", "Analysis"],
  },
  {
    id: "habiba-bahati",
    name: "Habiba Bahati Abdalla",
    role: "Administrative Assistant",
    bio: "Habiba manages DGC's day-to-day operations, client communications, and administrative coordination across all ongoing assignments.",
    image: "/images/team/habiba-bahati.jpg",
    featured: false,
    expertise: ["Administration", "Client Relations", "Operations"],
  },
];

// ─────────────────────────────────────────
// GEOGRAPHIC FOOTPRINT
// ─────────────────────────────────────────
export const COUNTRIES: CountriesData = {
  africa: [
    { name: "Kenya",        iso: "KE", lat: -1.286389,  lng: 36.817223 },
    { name: "Uganda",       iso: "UG", lat:  0.347596,  lng: 32.58252  },
    { name: "Tanzania",     iso: "TZ", lat: -6.369028,  lng: 34.888822 },
    { name: "Rwanda",       iso: "RW", lat: -1.943889,  lng: 29.873888 },
    { name: "Burundi",      iso: "BI", lat: -3.381592,  lng: 29.918886 },
    { name: "Eritrea",      iso: "ER", lat: 15.179384,  lng: 39.782334 },
    { name: "Ethiopia",     iso: "ET", lat:  9.145,     lng: 40.489674 },
    { name: "South Sudan",  iso: "SS", lat:  6.877,     lng: 31.307    },
    { name: "Somalia",      iso: "SO", lat:  5.152149,  lng: 46.199616 },
    { name: "Zambia",       iso: "ZM", lat: -13.133897, lng: 27.849332 },
    { name: "Malawi",       iso: "MW", lat: -13.254308, lng: 34.301525 },
    { name: "Nigeria",      iso: "NG", lat:  9.081999,  lng:  8.675277 },
    { name: "DRC",          iso: "CD", lat: -4.038333,  lng: 21.758664 },
    { name: "Sudan",        iso: "SD", lat: 12.862807,  lng: 30.217636 },
    { name: "Djibouti",     iso: "DJ", lat: 11.825138,  lng: 42.590275 },
    { name: "Côte d'Ivoire",iso: "CI", lat:  7.539989,  lng: -5.54708  },
    { name: "Ghana",        iso: "GH", lat:  7.946527,  lng: -1.023194 },
    { name: "Mauritius",    iso: "MU", lat: -20.348404, lng: 57.552152 },
    { name: "Egypt",        iso: "EG", lat: 26.820553,  lng: 30.802498 },
    { name: "Tunisia",      iso: "TN", lat: 33.886917,  lng:  9.537499 },
    { name: "Senegal",      iso: "SN", lat: 14.497401,  lng: -14.452362},
    { name: "Eswatini",     iso: "SZ", lat: -26.522503, lng: 31.465866 },
    { name: "South Africa", iso: "ZA", lat: -28.004999, lng: 23.89827  },
    { name: "Madagascar",   iso: "MG", lat: -18.766947, lng: 46.869107 },
  ],
  asia: [
    { name: "Thailand",    iso: "TH", lat: 15.870032, lng: 100.992541 },
    { name: "Pakistan",    iso: "PK", lat: 30.375321, lng:  69.345116 },
    { name: "Afghanistan", iso: "AF", lat: 33.93911,  lng:  67.709953 },
    { name: "Myanmar",     iso: "MM", lat: 21.913965, lng:  95.956223 },
    { name: "Indonesia",   iso: "ID", lat: -0.789275, lng: 113.921327 },
  ],
};

// ─────────────────────────────────────────
// PROJECTS / PORTFOLIO
// ─────────────────────────────────────────
export const PROJECTS: Project[] = [
  // ── ORGANIZATIONAL STRENGTHENING ──────────────────────────────────
  {
    id: "wfp-kenya-strategic-plan",
    title: "WFP Kenya Country Strategic Plan 2022–2026",
    client: "WFP", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2021,
    service: "organizational-strengthening", thematic: "food-security",
    description: "Led development of the WFP Kenya Country Strategic Plan 2022–2026 as Technical Lead for Evaluation & Learning, incorporating zero hunger, nutrition, climate resilience, and gender-transformative frameworks aligned with national food security goals.",
    tags: ["Strategic Planning", "Food Security", "WFP", "Kenya"], donor: "WFP",
  },
  {
    id: "irc-global-strategy",
    title: "IRC Global Strategy 2020–2024",
    client: "IRC", country: "Multi-Country (41)", region: "Global", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2019,
    service: "organizational-strengthening", thematic: "governance",
    description: "Core team member for IRC's 41-country global strategy development, driving organisational alignment, theory of change architecture, and outcome framework design across humanitarian and development contexts in Africa, Asia, Middle East, and Latin America.",
    tags: ["Strategic Planning", "Governance", "IRC", "Global"], donor: "IRC",
  },
  {
    id: "usaid-deai-strategy",
    title: "USAID Eastern Africa Diversity, Equity, Accountability & Inclusion Strategy",
    client: "USAID", country: "Multi-Country (6)", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2024,
    service: "organizational-strengthening", thematic: "gender",
    description: "Team Leader for development of USAID Eastern Africa's Diversity, Equity, Accountability, and Inclusion (DEAI) Strategy, setting a regional framework for inclusive programming and workforce practices across Kenya, Uganda, Tanzania, Ethiopia, Rwanda, and Burundi.",
    tags: ["Strategic Planning", "Gender", "Inclusion", "USAID", "East Africa"], donor: "USAID",
    isoList: ["KE", "UG", "TZ", "ET", "RW", "BI"],
  },
  {
    id: "usaid-rdcs-eastern-africa",
    title: "USAID Regional Development Cooperation Strategy — Eastern Africa",
    client: "USAID", country: "Multi-Country (6)", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2021,
    service: "organizational-strengthening", thematic: "governance",
    description: "M&E and Learning Specialist for USAID's Regional Development Cooperation Strategy (RDCS) and Country Development Cooperation Strategies (CDCS) across Kenya, Uganda, Tanzania, Ethiopia, Rwanda, and Burundi.",
    tags: ["Strategic Planning", "USAID", "East Africa", "MEL"], donor: "USAID",
    isoList: ["KE", "UG", "TZ", "ET", "RW", "BI"],
  },
  {
    id: "eac-food-security",
    title: "EAC Food Security Action Plan II (2017–2021)",
    client: "East African Community", country: "Multi-Country (6)", region: "East Africa", iso: "TZ",
    lat: -6.369028, lng: 34.888822, year: 2017,
    service: "organizational-strengthening", thematic: "food-security",
    description: "Team Lead for development of the East African Community Food Security Action Plan II, covering Kenya, Uganda, Tanzania, Rwanda, Ethiopia, and South Sudan — addressing regional food systems, cross-border trade, and climate resilience.",
    tags: ["Strategic Planning", "Food Security", "EAC", "Regional"], donor: "EAC",
    isoList: ["KE", "UG", "TZ", "RW", "ET", "SS"],
  },
  {
    id: "cbm-kenya-country-strategy",
    title: "CBM Kenya Country Community Support Services Strategy",
    client: "CBM", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2023,
    service: "organizational-strengthening", thematic: "health",
    description: "Team Lead for the country situational analysis and development of CBM Kenya's Country Community Support Services Strategy, informing disability-inclusive development and eye health programming priorities.",
    tags: ["Strategic Planning", "Disability", "Eye Health", "CBM", "Kenya"], donor: "CBM",
  },
  {
    id: "amref-icd-strategy-mtr",
    title: "Amref Health Africa ICD Strategy Mid-Term Review",
    client: "Amref Health Africa", country: "Multi-Country (10)", region: "Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2021,
    service: "organizational-strengthening", thematic: "health",
    description: "Team Lead for the mid-term review of Amref Health Africa's Institute of Capacity Development (ICD) Strategy across Kenya, Uganda, Tanzania, Malawi, Zambia, Ethiopia, Senegal, Côte d'Ivoire, South Sudan, and South Africa.",
    tags: ["Evaluation", "Capacity Development", "Amref", "Africa"], donor: "Amref Health Africa",
    isoList: ["KE", "UG", "TZ", "MW", "ZM", "ET", "SN", "CI", "SS", "ZA"],
  },
  // ── CAPACITY STRENGTHENING ────────────────────────────────────────
  {
    id: "unicef-moh-mental-health",
    title: "UNICEF/MoH Kenya Mental Health Integration Handbook",
    client: "UNICEF", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2024,
    service: "capacity-strengthening", thematic: "health",
    description: "Team Leader for development of the national handbook for integrating mental health into the Ministry of Health's continuum of care for ANC, MCH, and PNC services targeting pregnant adolescent girls.",
    tags: ["Capacity Building", "Mental Health", "UNICEF", "Kenya", "SRHR"], donor: "UNICEF",
  },
  {
    id: "amref-annual-technical-report-2021",
    title: "Amref Health Africa Annual Technical Report",
    client: "Amref Health Africa", country: "Multi-Country (10)", region: "Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2021,
    service: "capacity-strengthening", thematic: "health",
    description: "Team Lead for development of Amref Health Africa's annual technical report synthesising programme results across Kenya, Uganda, Tanzania, Malawi, Zambia, Ethiopia, Senegal, Côte d'Ivoire, South Sudan, and South Africa.",
    tags: ["Reporting", "Health Systems", "Amref", "Multi-Country"], donor: "Amref Health Africa",
    isoList: ["KE", "UG", "TZ", "MW", "ZM", "ET", "SN", "CI", "SS", "ZA"],
  },
  {
    id: "amref-covid-lessons-2022",
    title: "Amref Health Africa COVID-19 Pandemic Lessons Documentation",
    client: "Amref Health Africa", country: "Multi-Country (8)", region: "Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2022,
    service: "capacity-strengthening", thematic: "health",
    description: "Team Lead for cross-country documentation of lessons learned from Amref Health Africa's COVID-19 pandemic response across Kenya, Uganda, Tanzania, Malawi, Ethiopia, Senegal, South Sudan, and European offices.",
    tags: ["Lessons Learned", "COVID-19", "Health", "Amref", "Africa"], donor: "Amref Health Africa",
    isoList: ["KE", "UG", "TZ", "MW", "ET", "SN", "SS"],
  },
  // ── SYSTEM STRENGTHENING ──────────────────────────────────────────
  {
    id: "fairtrade-mel-ecosystem",
    title: "Fairtrade Africa MEL Ecosystem — Phase I & II",
    client: "Fairtrade Africa", country: "Multi-Country (12)", region: "Africa", iso: "GH",
    lat: 7.946527, lng: -1.023194, year: 2021,
    service: "system-strengthening", thematic: "food-security",
    description: "Team Lead for design and rollout of a continental MEL ecosystem for Fairtrade Africa across Kenya, Uganda, Tanzania, Malawi, Zambia, South Africa, Madagascar, Egypt, Tunisia, Senegal, Côte d'Ivoire, and Ghana — including KoBoToolbox digital tools and live dashboards.",
    tags: ["MEL Systems", "Data Management", "Fairtrade", "Africa"], donor: "Fairtrade Africa",
    isoList: ["KE", "UG", "TZ", "MW", "ZM", "ZA", "MG", "EG", "TN", "SN", "CI", "GH"],
  },
  {
    id: "fairtrade-mel-ecosystem-phase3",
    title: "Fairtrade Africa MEL Ecosystem — Phase III Digital Alignment",
    client: "Fairtrade Africa", country: "Multi-Country (12)", region: "Africa", iso: "GH",
    lat: 7.946527, lng: -1.023194, year: 2022,
    service: "system-strengthening", thematic: "food-security",
    description: "Team Lead for Phase III development and alignment of Fairtrade Africa's digital data management system, integrating producer-level data flows into a unified continental MEL architecture across 12 African countries.",
    tags: ["MEL Systems", "Digital Systems", "Fairtrade", "Africa"], donor: "Fairtrade Africa",
    isoList: ["KE", "UG", "TZ", "MW", "ZM", "ZA", "MG", "EG", "TN", "SN", "CI", "GH"],
  },
  {
    id: "fairtrade-africa-mtr",
    title: "Fairtrade Africa 2021–2025 Strategic Plan Mid-Term Review",
    client: "Fairtrade Africa", country: "Multi-Country (12)", region: "Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2023,
    service: "system-strengthening", thematic: "food-security",
    description: "Team Leader for mid-term review of Fairtrade Africa's 2021–2025 Strategic Plan across 12 African countries, assessing smallholder farmer livelihood outcomes, gender integration, MEL systems performance, and organisational effectiveness.",
    tags: ["Evaluation", "Food Security", "Fairtrade", "Multi-Country"], donor: "Fairtrade Africa",
    isoList: ["KE", "UG", "TZ", "MW", "ZM", "ZA", "MG", "EG", "TN", "SN", "CI", "GH"],
  },
  {
    id: "fairtrade-covid-impact-eval",
    title: "Fairtrade Africa COVID-19 Funding Impact Evaluation",
    client: "Fairtrade Africa", country: "Multi-Country (12)", region: "Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2021,
    service: "system-strengthening", thematic: "food-security",
    description: "Team Lead for impact evaluation of COVID-19 emergency funding for Fairtrade Africa producer organisations across 12 countries, assessing economic resilience, food security, and smallholder farmer recovery outcomes.",
    tags: ["Impact Evaluation", "COVID-19", "Food Security", "Fairtrade", "Africa"], donor: "Fairtrade Africa",
    isoList: ["KE", "UG", "TZ", "MW", "ZM", "ZA", "MG", "EG", "TN", "SN", "CI", "GH"],
  },
  {
    id: "recover-africa-mel",
    title: "RECOVER Africa M&E Systems — Fairtrade International",
    client: "Fairtrade International", country: "Multi-Country (12)", region: "Africa", iso: "ET",
    lat: 9.145, lng: 40.489674, year: 2020,
    service: "system-strengthening", thematic: "food-security",
    description: "MEL Advisor for design and implementation of Africa-wide M&E systems for the RECOVER Africa project, supporting COVID-19 economic recovery across Fairtrade producer organisations in 12 countries.",
    tags: ["MEL Systems", "COVID-19", "Resilience", "Fairtrade", "Africa"], donor: "Fairtrade International",
    isoList: ["KE", "UG", "TZ", "MW", "ZM", "ZA", "MG", "EG", "TN", "SN", "CI"],
  },
  {
    id: "undp-kenya-devolution-mtr",
    title: "UNDP/UN Women/UNICEF Kenya Joint Devolution Programme MTR",
    client: "UNDP", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2022,
    service: "system-strengthening", thematic: "governance",
    description: "Evaluation Expert for the mid-term review of the joint UNDP/UN Women/UNICEF Kenya devolution programme, assessing county-level governance, gender equity, and social protection outcomes across 47 counties.",
    tags: ["Evaluation", "Governance", "Gender", "UNDP", "Kenya"], donor: "UNDP",
  },
  {
    id: "dutch-mofa-drc",
    title: "Dutch MOFA Civil Society Policy Framework DQA — DRC",
    client: "Dutch Ministry of Foreign Affairs", country: "DRC", region: "Central Africa", iso: "CD",
    lat: -4.038333, lng: 21.758664, year: 2024,
    service: "system-strengthening", thematic: "governance",
    description: "Team Lead for data quality assessment (DQA) and third-party monitoring of the Strengthening Civil Society Policy Framework funded by the Dutch Ministry of Foreign Affairs in the Democratic Republic of Congo.",
    tags: ["DQA", "Third-Party Monitoring", "Civil Society", "DRC"], donor: "Dutch Ministry of Foreign Affairs",
  },
  {
    id: "sida-somalia-resilience",
    title: "SIDA Somalia Resilience Programme End-Term Review",
    client: "Swedish Development Corporation", country: "Somalia", region: "Horn of Africa", iso: "SO",
    lat: 5.152149, lng: 46.199616, year: 2023,
    service: "system-strengthening", thematic: "food-security",
    description: "Team Lead for end-term evaluation of SIDA's Somalia Resilience Programme, examining food security, livelihoods, value chains, emergency response, health, education, and women's empowerment outcomes.",
    tags: ["Evaluation", "Resilience", "Food Security", "SIDA", "Somalia"], donor: "SIDA",
  },
  {
    id: "amref-kenya-sp-baseline-2023",
    title: "Amref Health Africa Kenya Strategic Plan Baseline Assessment 2023–2030",
    client: "Amref Health Africa", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2023,
    service: "system-strengthening", thematic: "health",
    description: "Team Lead for the baseline assessment for Amref Health Africa Kenya's 2023–2030 Strategic Plan, establishing indicator benchmarks across community health, reproductive health, and health systems strengthening domains.",
    tags: ["Baseline", "Health Systems", "Amref", "Kenya"], donor: "Amref Health Africa",
  },
  {
    id: "world-bank-kusp-vfm",
    title: "Kenya Urban Roads Programme Value for Money Assessment",
    client: "World Bank", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2023,
    service: "system-strengthening", thematic: "governance",
    description: "Statistician for the value for money (VfM) assessment of the Kenya Urban Roads Programme (KUSP) commissioned by the World Bank and Kenya Ministry of Lands, analysing cost-effectiveness and development impact of urban infrastructure investments.",
    tags: ["Value for Money", "Infrastructure", "World Bank", "Kenya"], donor: "World Bank",
  },
  {
    id: "amref-power-to-youth-mtr",
    title: "Amref Power to You(th) Programme Mid-Term Evaluation",
    client: "Amref Netherlands", country: "Multi-Country (7)", region: "Africa", iso: "ET",
    lat: 9.145, lng: 40.489674, year: 2022,
    service: "system-strengthening", thematic: "health",
    description: "Team Lead for mid-term evaluation of the Power to You(th) Programme across Ethiopia, Kenya, Uganda, Malawi, Ghana, Senegal, and Indonesia, assessing adolescent SRHR, mental health, and youth empowerment outcomes.",
    tags: ["Evaluation", "Youth", "SRHR", "Amref", "Multi-Country"], donor: "Amref Netherlands",
    isoList: ["ET", "KE", "UG", "MW", "GH", "SN", "ID"],
  },
  {
    id: "dfpa-srh-baseline-east-africa",
    title: "Danish FPA Sexual & Reproductive Health Baseline — East Africa",
    client: "Danish Family Planning Association", country: "Multi-Country (3)", region: "East Africa", iso: "ET",
    lat: 9.145, lng: 40.489674, year: 2022,
    service: "system-strengthening", thematic: "health",
    description: "Team member for baseline study on Sexual and Reproductive Health Rights in East Africa, establishing metrics for family planning access, SRHR knowledge, and gender equity indicators across Ethiopia, Kenya, and Uganda.",
    tags: ["Baseline", "SRHR", "Family Planning", "East Africa"], donor: "Danish Family Planning Association",
    isoList: ["ET", "KE", "UG"],
  },
  {
    id: "save-children-kenya-pneumonia",
    title: "Save the Children Kenya Pneumonia Urban Slums End-Line Evaluation",
    client: "Save the Children International", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2022,
    service: "system-strengthening", thematic: "health",
    description: "Principal Investigator for end-line evaluation of the Kenya pneumonia in urban slums of Nairobi project, assessing reductions in childhood pneumonia morbidity and mortality through integrated community health interventions.",
    tags: ["Evaluation", "Child Health", "Urban Health", "Kenya"], donor: "Save the Children",
  },
  {
    id: "unicef-kenya-nutrition-2021",
    title: "UNICEF Kenya Nutrition & Sanitation Programme End Point Revision",
    client: "UNICEF", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2021,
    service: "system-strengthening", thematic: "health",
    description: "Team Lead for end point revision of Kenya's Nutrition and Sanitation Programme and development of a national scale-up roadmap, informing the government's investment framework for nutrition-sensitive interventions.",
    tags: ["Evaluation", "Nutrition", "WASH", "UNICEF", "Kenya"], donor: "UNICEF",
  },
  {
    id: "save-children-kenya-health-signature",
    title: "Save the Children Kenya Health Signature Project End-Term Evaluation",
    client: "Save the Children", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2021,
    service: "system-strengthening", thematic: "health",
    description: "Team Lead for end-of-term evaluation of the Kenya Health Signature Project Phase 2, examining maternal and child health outcomes, community health worker performance, and county health systems strengthening results.",
    tags: ["Evaluation", "Child Health", "Maternal Health", "Kenya"], donor: "Save the Children",
  },
  {
    id: "intrahealth-kenya-baseline",
    title: "IntraHealth Human Resources for Health Baseline — 27 Counties",
    client: "IntraHealth International", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2017,
    service: "system-strengthening", thematic: "health",
    description: "Team Lead for baseline assessment of human resources for health across 27 Kenyan counties and 12 health worker training institutions, establishing workforce benchmarks for a USAID-funded health systems strengthening programme.",
    tags: ["Baseline", "Health Systems", "USAID", "Kenya"], donor: "USAID",
  },
  {
    id: "fhi360-nhpplus-endterm",
    title: "USAID Kenya Nutrition and Health Program Plus End-Term Evaluation",
    client: "FHI360", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2019,
    service: "system-strengthening", thematic: "health",
    description: "Team Lead for end-of-term evaluation of the USAID-funded Kenya Nutrition and Health Program Plus (NHP+), assessing nutrition outcomes, health systems strengthening, and integrated service delivery performance.",
    tags: ["Evaluation", "Nutrition", "Health", "USAID", "Kenya"], donor: "USAID",
  },
  {
    id: "kenya-rapid-mte",
    title: "Kenya Resilient Arid Lands Partnership Mid-Term Evaluation",
    client: "Millennium Water Alliance", country: "Kenya", region: "East Africa", iso: "KE",
    lat: 1.4168, lng: 38.4246, year: 2018,
    service: "system-strengthening", thematic: "food-security",
    description: "Team Lead for mid-term evaluation of the Kenya Resilient Arid Lands Partnership (Kenya RAPID) across Garissa, Isiolo, Marsabit, Turkana, and Wajir Counties, assessing WASH, livelihoods, and climate resilience outcomes.",
    tags: ["Evaluation", "WASH", "Resilience", "Arid Lands", "Kenya"], donor: "Millennium Water Alliance",
  },
  {
    id: "cbm-ophthalmology-impact-eval",
    title: "CBM Ophthalmology Training Scholarship Programme Impact Evaluation",
    client: "CBM Germany", country: "Multi-Country (3)", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2017,
    service: "system-strengthening", thematic: "health",
    description: "Team Lead for impact evaluation of CBM Germany's ophthalmology training scholarship programme (2000–2016) across Kenya, Uganda, and Tanzania, measuring the contribution of trained eye health specialists to national eye care systems.",
    tags: ["Impact Evaluation", "Eye Health", "CBM", "East Africa"], donor: "CBM Germany",
    isoList: ["KE", "UG", "TZ"],
  },
  {
    id: "amref-maternal-health-nairobi-2017",
    title: "Amref Maternal & Newborn Health Urban Poor End-Term Evaluation",
    client: "Amref Health Africa", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2017,
    service: "system-strengthening", thematic: "health",
    description: "Team Lead for end-term evaluation of the Improving Maternal, Newborn, and Child Health Among the Urban Poor project in Nairobi County, assessing coverage, quality of care, and equity of maternal health services.",
    tags: ["Evaluation", "Maternal Health", "Urban Health", "Amref", "Kenya"], donor: "Amref Health Africa",
  },
  // ── SAFETY & SECURITY ─────────────────────────────────────────────
  {
    id: "drc-somalia-emergency-2018",
    title: "Danish Refugee Council Somalia Integrated Emergency Response Evaluation",
    client: "Danish Refugee Council", country: "Somalia", region: "Horn of Africa", iso: "SO",
    lat: 5.152149, lng: 46.199616, year: 2018,
    service: "safety-security", thematic: "humanitarian",
    description: "Team Lead for evaluation of the Danish Refugee Council's integrated emergency response in Somalia, covering WASH, health, education, disaster risk reduction, and food security programming in conflict-affected communities.",
    tags: ["Evaluation", "Emergency Response", "Humanitarian", "Somalia"], donor: "Danish Refugee Council",
  },
  {
    id: "mercy-corps-somalia-education",
    title: "Mercy Corps Somalia School Environment & Education Programme Impact Evaluation",
    client: "Mercy Corps USA", country: "Somalia", region: "Horn of Africa", iso: "SO",
    lat: 5.152149, lng: 46.199616, year: 2017,
    service: "safety-security", thematic: "humanitarian",
    description: "Team Member for impact evaluation of Mercy Corps' School Environment and Education Development Programme in Somalia, assessing improvements in education access, WASH infrastructure, and child health outcomes in conflict-affected areas.",
    tags: ["Impact Evaluation", "Education", "WASH", "Humanitarian", "Somalia"], donor: "Mercy Corps USA",
  },
  {
    id: "acted-adeso-somalia-study",
    title: "ACTED/ADESO Compounding Chronic Sequential Shocks Study — Lower Juba",
    client: "ACTED / ADESO", country: "Somalia", region: "Horn of Africa", iso: "SO",
    lat: 0.3566, lng: 42.5456, year: 2017,
    service: "safety-security", thematic: "humanitarian",
    description: "Team Lead for empirical study to identify and respond to compounding factors of chronic sequential shocks in Lower Juba, Somalia, informing adaptive humanitarian programming for drought- and conflict-affected communities.",
    tags: ["Research", "Resilience", "Humanitarian", "Somalia", "ACTED"], donor: "ACTED / ADESO",
  },
  // ── ADDITIONAL UNAIDS / IGAD / GLOBAL FUND CONSULTANCIES ──────────
  {
    id: "unaids-aids-progress-reporting-2012",
    title: "UNAIDS AIDS Progress Reporting & Review — East Africa",
    client: "UNAIDS Technical Support Facility-EA", country: "Multi-Country (8)", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2012,
    service: "system-strengthening", thematic: "health",
    description: "Technical Advisor for AIDS Progress Reporting across 8 East African countries, supporting national AIDS authorities with data quality, epidemiological analysis, and programmatic review against UNAIDS targets.",
    tags: ["HIV/AIDS", "Reporting", "UNAIDS", "East Africa"], donor: "UNAIDS",
    isoList: ["KE", "UG", "TZ", "RW", "BI", "ET", "ER", "SS"],
  },
  {
    id: "global-fund-principal-recipient-assessment",
    title: "Global Fund Principal Recipient & Sub-Recipient Assessment — East Africa",
    client: "Global Fund to Fight AIDS, TB and Malaria", country: "Multi-Country (8)", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2012,
    service: "system-strengthening", thematic: "health",
    description: "Technical Advisor for fiduciary and programmatic assessment of Global Fund Principal Recipients and Sub-Recipients across 8 countries, evaluating grant management, financial controls, and service delivery performance.",
    tags: ["Evaluation", "HIV/AIDS", "Global Fund", "East Africa"], donor: "Global Fund",
    isoList: ["KE", "UG", "TZ", "RW", "BI", "ET", "ER", "SD"],
  },
  {
    id: "igad-regional-hiv-strategy",
    title: "IGAD Regional HIV/AIDS Partnership Programme — Strategic Plan Costing",
    client: "IGAD (Intergovernmental Authority on Development)", country: "Multi-Country (8)", region: "Horn of Africa", iso: "ET",
    lat: 9.145, lng: 40.489674, year: 2012,
    service: "organizational-strengthening", thematic: "health",
    description: "Technical Advisor for costing of the IGAD Regional HIV/AIDS Partnership Programme Regional Strategic Plan, supporting the intergovernmental body's member states — Kenya, Uganda, Tanzania, Rwanda, Burundi, Ethiopia, Eritrea, South Sudan, and Djibouti — in resource allocation planning.",
    tags: ["Strategic Planning", "HIV/AIDS", "IGAD", "Horn of Africa"], donor: "UNAIDS / IGAD",
    isoList: ["KE", "UG", "TZ", "RW", "BI", "ET", "ER", "SS", "DJ"],
  },
  {
    id: "irc-mel-framework-asia",
    title: "IRC M&E Framework 2015–2018 — Asia Region",
    client: "International Rescue Committee", country: "Multi-Country (4)", region: "Asia", iso: "TH",
    lat: 15.870032, lng: 100.992541, year: 2016,
    service: "system-strengthening", thematic: "humanitarian",
    description: "Team Member for development of the International Rescue Committee's M&E Framework for 2015–2018 across Asia, establishing performance measurement systems for humanitarian and resilience programming in Thailand, Pakistan, Afghanistan, and Myanmar.",
    tags: ["MEL Systems", "Humanitarian", "IRC", "Asia"], donor: "IRC",
    isoList: ["TH", "PK", "AF", "MM"],
  },
  {
    id: "caritas-switzerland-mel-strategy",
    title: "Caritas Switzerland M&E Strategy & Participatory Manual",
    client: "Caritas Switzerland", country: "Multi-Country (3)", region: "Horn of Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2015,
    service: "capacity-strengthening", thematic: "humanitarian",
    description: "Team Lead for development of Caritas Switzerland's M&E Strategy 2015–2018 and accompanying Participatory M&E Manual across Kenya, Somalia, and Ethiopia, strengthening field teams' capacity for community-centred monitoring and data use.",
    tags: ["MEL Systems", "Capacity Building", "Caritas", "Horn of Africa"], donor: "Caritas Switzerland",
    isoList: ["KE", "SO", "ET"],
  },
  {
    id: "action-africa-health-mel-strategy",
    title: "Action Africa Help International M&E Strategy 2014–2017",
    client: "Action Africa Help International", country: "Multi-Country (3)", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2014,
    service: "organizational-strengthening", thematic: "humanitarian",
    description: "Team Lead for development of Action Africa Help International's M&E Strategy covering Kenya, South Sudan, and Uganda, establishing results frameworks, indicator registries, and data collection systems for humanitarian and development programmes.",
    tags: ["MEL Systems", "Strategic Planning", "East Africa"], donor: "Action Africa Help International",
    isoList: ["KE", "SS", "UG"],
  },
];

// ─────────────────────────────────────────
// JOB POSTINGS
// ─────────────────────────────────────────
export const JOB_POSTINGS: JobPosting[] = [
  {
    id: "senior-mel-consultant",
    title: "Senior Consultant — MEL",
    location: "Nairobi, Kenya (Hybrid)",
    type: "Full-time",
    deadline: "2025-04-30",
    description:
      "Lead complex monitoring, evaluation, and learning assignments across East Africa for international development and humanitarian clients.",
    requirements: [
      "7+ years MEL experience in international development",
      "Master's degree in relevant field",
      "STATA or R proficiency",
      "Experience with USAID or UN-funded programmes",
      "Fluency in English; French an advantage",
    ],
    thematic: "system-strengthening",
  },
  {
    id: "gender-specialist",
    title: "Gender & Inclusion Specialist",
    location: "Remote / East Africa",
    type: "Contract",
    deadline: "2025-04-15",
    description:
      "Support gender mainstreaming, SGBV programme design, and feminist evaluation assignments for DGC clients across Africa.",
    requirements: [
      "5+ years gender programming experience",
      "Feminist evaluation methodology expertise",
      "Experience with GBV/SGBV programmes",
      "French language proficiency preferred",
      "Willingness to travel across East Africa",
    ],
    thematic: "gender",
  },
];

// ─────────────────────────────────────────
// BLOG POSTS
// ─────────────────────────────────────────
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "innovation-for-sustainable-growth",
    title: "Innovation for Sustainable Growth in African Development",
    excerpt:
      "How African development organisations can harness innovation — from digital tools to adaptive management — to deliver more impactful and sustainable programmes.",
    publishedAt: "2023-01-15",
    author: "Dr. Albino Luciani",
    category: "Innovation",
    coverImage: "/images/blog/innovation.jpg",
    readingTime: 6,
    tags: ["Innovation", "Sustainability", "Africa", "Development"],
    content: `Innovation is no longer optional for organisations seeking lasting impact across Africa. As funding landscapes shift and development challenges grow more complex, organisations that fail to adapt risk irrelevance.

At DGC, we define innovation broadly: it encompasses new tools, yes, but also new ways of thinking — adaptive management, iterative learning, and a willingness to challenge orthodoxies that no longer serve the communities we exist to support.

The most successful African development organisations today share a common thread: they treat failure as data. When a programme doesn't work, they don't hide it. They document it, analyse it, and use it to redesign their next intervention. This culture of honest learning is perhaps the most powerful innovation available to any organisation, and it costs nothing but courage.

Digital tools have dramatically expanded what's possible in the field. Mobile data collection, cloud-based M&E platforms, and AI-assisted analysis are no longer luxuries reserved for large multilaterals. Organisations of all sizes can now access tools that were unimaginable a decade ago. The challenge isn't access — it's integration. Too many organisations adopt digital tools without embedding them in their learning systems, with the result that data sits in dashboards nobody reads.

The organisations we admire — and aspire to support — are those that close the loop: from field reality to strategic decision, in near real time. That's the innovation agenda we believe in.`,
  },
  {
    slug: "digital-transformation-ngo",
    title: "Digital Transformation for NGOs: A Practical Guide",
    excerpt:
      "A step-by-step framework for NGOs embarking on digital transformation — from data collection to cloud-based M&E systems.",
    publishedAt: "2023-01-08",
    author: "Gilbert Onyango",
    category: "Digital",
    coverImage: "/images/blog/digital.jpg",
    readingTime: 8,
    tags: ["Digital", "NGO", "M&E", "Data Systems"],
    content: `Digital transformation has become a defining challenge for NGOs in the 2020s. The organisations that thrive will be those that treat data as a strategic asset — not a compliance burden.

The journey begins with an honest assessment of where you are. Most NGOs have data scattered across spreadsheets, paper forms, and disconnected systems. The first step isn't buying new software — it's understanding what you already have, what you actually need, and what's blocking the connection between the two.

Step 1: Map your data flows. Before you digitise anything, draw a map of how information currently moves through your organisation — from field to programme to leadership. You will almost certainly find redundant processes, lost data, and decisions being made without evidence. This map becomes your transformation roadmap.

Step 2: Choose tools that fit your context. KoBo Toolbox and ODK are excellent for field data collection in low-bandwidth environments. DHIS2 is the gold standard for health data management across Africa. But the best tool is the one your team will actually use — so involve field staff in selection decisions.

Step 3: Build for learning, not just reporting. The most common failure in NGO digital transformation is building systems that generate data for donor reports but tell programme staff nothing useful. Design your dashboards and analytics around the questions your managers actually need answered.

Step 4: Invest in people, not just platforms. Technology is only as good as the people who use it. Every digital transformation project needs a dedicated capacity building component — training, mentorship, and ongoing technical support. Systems without skilled users quickly become shelf-ware.`,
  },
  {
    slug: "power-of-mel",
    title: "The Power of MEL: Why Monitoring, Evaluation and Learning Transforms Organisations",
    excerpt:
      "Organisations with mature MEL systems don't just report on outcomes — they learn, adapt, and continuously improve. Here is why MEL should be every organisation's strategic priority.",
    publishedAt: "2022-12-20",
    author: "Lowie Rosales",
    category: "MEL",
    coverImage: "/images/blog/mel.jpg",
    readingTime: 7,
    tags: ["MEL", "M&E", "Learning", "Accountability"],
    content: `Monitoring, Evaluation and Learning is frequently treated as a compliance requirement — a box to tick for donors. The organisations that break free from this mindset consistently outperform their peers.

The distinction between M&E and MEL is not merely semantic. Traditional M&E asks: did we do what we said we would do? MEL asks a more powerful question: did we achieve what we hoped to achieve, and what did we learn that changes how we work?

That "L" — Learning — is where the transformation happens. Learning organisations don't just collect data; they create feedback loops that connect evidence to decisions at every level of the organisation. Field staff learn from their experiences and adapt in real time. Programme managers use evidence to pivot strategies mid-course. Leadership makes resource allocation decisions grounded in results rather than assumptions.

Building this culture requires investment. It requires time in programme budgets for reflection, analysis, and course-correction — time that is often squeezed out by implementation pressures. It requires leadership that genuinely values evidence over narrative, even when the evidence is uncomfortable. And it requires MEL systems designed around the questions that matter to the programme, not only the indicators that matter to the donor.

At DGC, we have seen the difference that mature MEL systems make. Programmes with strong learning cultures achieve better outcomes, adapt more effectively to crises, and build the evidence base that attracts continued investment. The return on MEL investment is not just accountability — it is effectiveness.`,
  },
  {
    slug: "the-dgc-approach",
    title: "The DGC Approach: Powerful Insights, Proven Delivery",
    excerpt:
      "An inside look at how Devex Global Consult approaches every engagement — from initial scoping to final recommendations — and why our methodology delivers results.",
    publishedAt: "2022-12-10",
    author: "Dr. Albino Luciani",
    category: "About DGC",
    coverImage: "/images/blog/approach.jpg",
    readingTime: 5,
    tags: ["DGC", "Methodology", "Consulting", "Africa"],
    content: `At DGC, we believe that great consulting begins with deep listening. Before we propose a methodology, we invest in understanding the organisational context, the political economy, and the human realities that shape every programme.

Our approach is built on three pillars: rigour, relevance, and relationships.

Rigour means that every recommendation we make is grounded in evidence. We don't operate on intuition or template solutions. We design mixed-methods approaches that triangulate data sources, validate findings with stakeholders, and surface the complexity that simple frameworks miss.

Relevance means that our outputs are designed to be used, not filed. We write for the programme manager making a resourcing decision, not for the evaluator reading a portfolio. Our recommendations are specific, time-bound, and prioritised — because organisations can't act on fifty recommendations at once.

Relationships are the foundation on which rigour and relevance rest. We have built long-term partnerships with clients across East Africa and beyond, because we understand that the most valuable consulting relationships are ones in which the client trusts us enough to share what isn't working — not just what is.

Across 480+ evaluations, assessments, and consultancies delivered since our founding, we have maintained one consistent commitment: to give our clients the truth, clearly and constructively, in a form they can act on. That is what we mean by Powerful Insights, Proven Delivery.`,
  },
];
