export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  color: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  featured: boolean;
  expertise: string[];
  credentials?: string;
  countriesCount?: number;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
}

export interface CountryPoint {
  name: string;
  iso: string;
  lat: number;
  lng: number;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  country: string;
  region: string;
  iso: string;
  lat: number;
  lng: number;
  year: number;
  service: string;
  thematic: string;
  description: string;
  tags: string[];
  donor?: string;
  isoList?: string[]; // for multi-country projects — spreads the pin across all listed ISOs
}

export interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship" | "Part-time" | "Temporary";
  deadline: string;
  description: string;
  requirements: string[];
  thematic?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  category: string;
  coverImage: string;
  readingTime: number;
  tags: string[];
  content?: string;
}

export interface CountriesData {
  africa: CountryPoint[];
  asia: CountryPoint[];
}
