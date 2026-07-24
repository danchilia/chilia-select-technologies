export type Project = {
  slug: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  features: string[];
  accentFrom: string;
  accentTo: string;
  screenshot?: string;
};

export const projects: Project[] = [
  {
    slug: "restaurant-website",
    name: "Coastal Table Restaurant",
    category: "Business Website",
    industry: "Restaurant & Hospitality",
    description:
      "A concept website for a fine-dining restaurant, built to showcase the menu, take reservations, and capture the atmosphere of the dining experience online.",
    challenge:
      "Restaurants need a website that feels as considered as the experience itself, while making it effortless for guests to view the menu and book a table.",
    solution:
      "A visually rich, single-scroll experience with an animated menu showcase, an integrated reservation flow, and location details optimized for local search.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: ["Online reservation flow", "Animated menu showcase", "Local SEO structure", "Mobile-first design"],
    accentFrom: "#1e293b",
    accentTo: "#0f172a",
    screenshot: "/portfolio/restaurant-website.webp",
  },
  {
    slug: "dental-clinic",
    name: "Brightsmile Dental Clinic",
    category: "Business Website",
    industry: "Healthcare",
    description:
      "A concept website for a dental practice designed to build patient trust, explain services clearly, and simplify appointment booking.",
    challenge:
      "Healthcare websites must balance a calming, trustworthy tone with clear, structured information about services and insurance.",
    solution:
      "A clean, accessible layout with service breakdowns, patient-friendly navigation, and a streamlined appointment request form.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: ["Appointment request form", "Service and treatment pages", "Insurance information section", "Accessibility-first design"],
    accentFrom: "#2563eb",
    accentTo: "#1e293b",
    screenshot: "/portfolio/dental-clinic.webp",
  },
  {
    slug: "construction-company",
    name: "Ironline Construction Group",
    category: "Corporate Website",
    industry: "Construction",
    description:
      "A concept corporate website for a construction company, built to present past projects, capabilities, and safety credentials to commercial clients.",
    challenge:
      "Construction firms need to project scale and reliability to win larger commercial contracts and reassure procurement teams.",
    solution:
      "A structured corporate site with a project showcase, capability statements, and a request-a-quote flow built for commercial buyers.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: ["Project portfolio showcase", "Capability statement pages", "Quote request system", "Team and safety credentials"],
    accentFrom: "#0f172a",
    accentTo: "#2563eb",
    screenshot: "/portfolio/construction-company.webp",
  },
  {
    slug: "cleaning-company",
    name: "Pristine Cleaning Services",
    category: "Business Website",
    industry: "Home Services",
    description:
      "A concept website for a residential and commercial cleaning company, focused on fast quote requests and service-area clarity.",
    challenge:
      "Local service businesses lose customers when pricing and booking feel complicated or unclear.",
    solution:
      "A conversion-focused layout with instant quote requests, transparent service packages, and a service-area map section.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: ["Instant quote request form", "Service package comparison", "Service-area coverage section", "Recurring booking prompts"],
    accentFrom: "#16a34a",
    accentTo: "#0f172a",
    screenshot: "/portfolio/cleaning-company.webp",
  },
  {
    slug: "real-estate-agency",
    name: "Meridian Real Estate Group",
    category: "Business Website",
    industry: "Real Estate",
    description:
      "A concept real estate platform with property listings, advanced search filters, and agent profile pages.",
    challenge:
      "Real estate websites require fast, filterable property search alongside a premium visual presentation of listings.",
    solution:
      "A listings platform with filterable search, high-impact property galleries, and dedicated agent profile and contact pages.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    features: ["Filterable property search", "Property gallery pages", "Agent profile pages", "Inquiry and scheduling forms"],
    accentFrom: "#1e293b",
    accentTo: "#2563eb",
  },
  {
    slug: "law-firm",
    name: "Sterling & Associates Law",
    category: "Corporate Website",
    industry: "Legal Services",
    description:
      "A concept website for a law firm designed to communicate authority, practice-area expertise, and ease of consultation booking.",
    challenge:
      "Legal websites must feel authoritative and precise while remaining approachable enough to encourage a first consultation.",
    solution:
      "A refined, editorial-style layout with practice-area pages, attorney profiles, and a confidential consultation request form.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: ["Practice area pages", "Attorney profile pages", "Confidential consultation form", "Case results section"],
    accentFrom: "#0f172a",
    accentTo: "#1e293b",
  },
  {
    slug: "accounting-firm",
    name: "Ledgerwise Accounting",
    category: "Corporate Website",
    industry: "Finance & Accounting",
    description:
      "A concept website for an accounting firm built to present services clearly to both individual and business clients.",
    challenge:
      "Financial service firms need to appear precise and trustworthy while serving two distinct audiences: individuals and businesses.",
    solution:
      "A dual-path homepage directing individual and business clients to tailored service pages, with a secure document request form.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: ["Dual-audience navigation", "Service comparison pages", "Secure document request form", "Resource and tax-guide library"],
    accentFrom: "#2563eb",
    accentTo: "#0f172a",
  },
  {
    slug: "school-management-system",
    name: "EduCore School Management System",
    category: "Business Software",
    industry: "Education",
    description:
      "A concept full-stack platform for school administration, covering enrollment, attendance, grading, and parent communication.",
    challenge:
      "Schools running administration through spreadsheets and paper records struggle with accuracy, communication, and reporting.",
    solution:
      "A role-based platform with dedicated admin, teacher, and parent portals, real-time attendance and grading, and automated reporting.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Node.js"],
    features: ["Admin, teacher, and parent portals", "Attendance and grading modules", "Automated report cards", "Fee and payment tracking"],
    accentFrom: "#1e293b",
    accentTo: "#16a34a",
  },
  {
    slug: "pos-system",
    name: "Checkpoint POS System",
    category: "Business Software",
    industry: "Retail",
    description:
      "A concept point-of-sale system for multi-location retail, built for fast checkout and real-time inventory visibility.",
    challenge:
      "Multi-location retailers need checkout speed alongside accurate, synchronized inventory and sales data across every store.",
    solution:
      "A POS platform with a fast checkout interface, real-time inventory sync, and a centralized owner dashboard for sales analytics.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Node.js"],
    features: ["Fast checkout interface", "Real-time inventory sync", "Multi-location dashboard", "Sales and staff reporting"],
    accentFrom: "#0f172a",
    accentTo: "#2563eb",
    screenshot: "/portfolio/pos-system.webp",
  },
  {
    slug: "inventory-management-system",
    name: "StockFlow Inventory System",
    category: "Business Software",
    industry: "Logistics & Warehousing",
    description:
      "A concept inventory management platform for tracking stock levels, purchase orders, and warehouse movement in real time.",
    challenge:
      "Growing businesses outgrow spreadsheets and need accurate, real-time visibility into stock across multiple warehouses.",
    solution:
      "A centralized system for stock tracking, automated low-stock alerts, purchase order management, and warehouse-level reporting.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Node.js"],
    features: ["Real-time stock tracking", "Automated low-stock alerts", "Purchase order management", "Multi-warehouse reporting"],
    accentFrom: "#2563eb",
    accentTo: "#1e293b",
  },
];
