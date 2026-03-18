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
  ],
  asia: [
    { name: "Thailand",    iso: "TH", lat: 15.870032, lng: 100.992541 },
    { name: "Pakistan",    iso: "PK", lat: 30.375321, lng:  69.345116 },
    { name: "Afghanistan", iso: "AF", lat: 33.93911,  lng:  67.709953 },
    { name: "Myanmar",     iso: "MM", lat: 21.913965, lng:  95.956223 },
  ],
};

// ─────────────────────────────────────────
// PROJECTS / PORTFOLIO
// ─────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: "wfp-kenya-strategic-plan",
    title: "WFP Kenya Country Strategic Plan 2022–2026",
    client: "WFP", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2021,
    service: "organizational-strengthening", thematic: "food-security",
    description: "Development of the WFP Kenya Country Strategic Plan 2022–2026, incorporating zero hunger, nutrition, and climate resilience frameworks.",
    tags: ["Strategic Planning", "Food Security", "WFP"], donor: "WFP",
  },
  {
    id: "irc-global-strategy",
    title: "IRC Global Strategy 2020–2024",
    client: "IRC", country: "Multi-Country (41)", region: "Global", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2019,
    service: "organizational-strengthening", thematic: "governance",
    description: "Lead consultant for IRC's 41-country global strategy development, including organisational alignment, theory of change, and outcome framework design.",
    tags: ["Strategic Planning", "Governance", "IRC", "Global"], donor: "IRC",
  },
  {
    id: "fairtrade-africa-mtr",
    title: "Fairtrade Africa Mid-Term Review",
    client: "Fairtrade", country: "Multi-Country (12)", region: "Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2022,
    service: "system-strengthening", thematic: "food-security",
    description: "Mid-term review of Fairtrade Africa's strategy across 12 African countries, assessing farmer outcomes, gender integration, and organisational effectiveness.",
    tags: ["Evaluation", "Food Security", "Fairtrade", "Multi-Country"], donor: "Fairtrade",
  },
  {
    id: "fairtrade-mel-ecosystem",
    title: "Fairtrade Africa MEL Ecosystem",
    client: "Fairtrade", country: "Multi-Country (12)", region: "Africa", iso: "GH",
    lat: 7.946527, lng: -1.023194, year: 2021,
    service: "system-strengthening", thematic: "food-security",
    description: "Design and rollout of a continental MEL ecosystem for Fairtrade Africa covering 12 countries, including digital data collection tools and a live dashboard.",
    tags: ["MEL Systems", "Data Management", "Fairtrade"], donor: "Fairtrade",
  },
  {
    id: "undp-kenya-devolution-mtr",
    title: "UNDP/UN Women/UNICEF Kenya Joint Devolution MTR",
    client: "UNDP", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2020,
    service: "system-strengthening", thematic: "governance",
    description: "Mid-term review of the joint UNDP/UN Women/UNICEF Kenya devolution programme, assessing county-level governance, gender, and social protection outcomes.",
    tags: ["Evaluation", "Governance", "Gender", "UNDP"], donor: "UNDP",
  },
  {
    id: "sida-somalia-resilience",
    title: "SIDA Somalia Resilience Programme End-Term Review",
    client: "SIDA", country: "Somalia", region: "Horn of Africa", iso: "SO",
    lat: 5.152149, lng: 46.199616, year: 2022,
    service: "system-strengthening", thematic: "food-security",
    description: "End-term evaluation of SIDA's resilience programme in Somalia, examining food security, livelihoods, and climate adaptation outcomes.",
    tags: ["Evaluation", "Resilience", "Somalia", "SIDA"], donor: "SIDA",
  },
  {
    id: "dutch-mofa-drc",
    title: "Dutch MOFA DQA/Third-Party Monitoring — DRC",
    client: "Dutch MOFA", country: "DRC", region: "Central Africa", iso: "CD",
    lat: -4.038333, lng: 21.758664, year: 2021,
    service: "system-strengthening", thematic: "governance",
    description: "Data quality assessments and third-party monitoring for Dutch MOFA-funded programmes in DRC, covering governance, health, and humanitarian response.",
    tags: ["DQA", "Third-Party Monitoring", "DRC"], donor: "Dutch MOFA",
  },
  {
    id: "intrahealth-kenya-baseline",
    title: "IntraHealth Kenya HR for Health Baseline — 27 Counties",
    client: "IntraHealth", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2019,
    service: "system-strengthening", thematic: "health",
    description: "Baseline assessment of HR for Health systems across all 27 Kenyan counties, establishing benchmarks for a USAID-funded health workforce strengthening programme.",
    tags: ["Baseline", "Health Systems", "USAID", "Kenya"], donor: "USAID",
  },
  {
    id: "unicef-moh-mental-health",
    title: "UNICEF/MoH Kenya Mental Health Handbook",
    client: "UNICEF", country: "Kenya", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2020,
    service: "capacity-strengthening", thematic: "health",
    description: "Development of the national mental health handbook for Kenya's Ministry of Health in partnership with UNICEF, incorporating community-based mental health approaches.",
    tags: ["Capacity Building", "Mental Health", "UNICEF", "Kenya"], donor: "UNICEF",
  },
  {
    id: "eac-food-security",
    title: "EAC Food Security Action Plan II",
    client: "EAC", country: "Multi-Country", region: "East Africa", iso: "TZ",
    lat: -6.369028, lng: 34.888822, year: 2020,
    service: "organizational-strengthening", thematic: "food-security",
    description: "Development of the East African Community's Food Security Action Plan II, covering regional food systems, cross-border trade, and climate resilience.",
    tags: ["Strategic Planning", "Food Security", "EAC", "Regional"], donor: "EAC",
  },
  {
    id: "recover-africa-mel",
    title: "RECOVER Africa M&E Systems",
    client: "RECOVER Africa", country: "Multi-Country", region: "Africa", iso: "ET",
    lat: 9.145, lng: 40.489674, year: 2021,
    service: "system-strengthening", thematic: "health",
    description: "Design and implementation of monitoring and evaluation systems for the RECOVER Africa COVID-19 response programme across multiple African countries.",
    tags: ["MEL Systems", "COVID-19", "Health", "Africa"], donor: "Multi-donor",
  },
  {
    id: "usaid-deai-strategy",
    title: "USAID Eastern Africa DEAI Strategy",
    client: "USAID", country: "Multi-Country", region: "East Africa", iso: "KE",
    lat: -1.286389, lng: 36.817223, year: 2022,
    service: "organizational-strengthening", thematic: "gender",
    description: "Development of USAID Eastern Africa's Diversity, Equity, Accessibility, and Inclusion (DEAI) strategy across the regional mission portfolio.",
    tags: ["Strategic Planning", "Gender", "USAID", "DEAI"], donor: "USAID",
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
