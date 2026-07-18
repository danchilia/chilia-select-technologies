export type Technology = {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools & Hosting";
  description: string;
};

export const technologies: Technology[] = [
  { name: "React", category: "Frontend", description: "Component-driven UI library powering fast, interactive interfaces." },
  { name: "Next.js", category: "Frontend", description: "Production React framework for performance, routing, and SEO." },
  { name: "TypeScript", category: "Frontend", description: "Typed JavaScript for safer, more maintainable code." },
  { name: "Tailwind CSS", category: "Frontend", description: "Utility-first CSS for consistent, responsive design systems." },
  { name: "Node.js", category: "Backend", description: "JavaScript runtime powering scalable server-side applications." },
  { name: "Express", category: "Backend", description: "Minimal, flexible Node.js framework for building APIs." },
  { name: "PHP", category: "Backend", description: "Server-side language used across a wide range of business platforms." },
  { name: "Laravel", category: "Backend", description: "Elegant PHP framework for building robust web applications." },
  { name: "Supabase", category: "Database", description: "Open-source backend platform with a managed Postgres database." },
  { name: "PostgreSQL", category: "Database", description: "Powerful, reliable relational database for complex applications." },
  { name: "MySQL", category: "Database", description: "Widely-used relational database for structured business data." },
  { name: "Firebase", category: "Database", description: "Real-time database and backend services for dynamic applications." },
  { name: "Git", category: "Tools & Hosting", description: "Version control for safe, collaborative development." },
  { name: "GitHub", category: "Tools & Hosting", description: "Code hosting, review, and CI/CD workflows." },
  { name: "Vercel", category: "Tools & Hosting", description: "Deployment platform optimized for Next.js performance." },
  { name: "Hostinger", category: "Tools & Hosting", description: "Reliable, affordable hosting for business websites." },
];

export const technologyCategories = ["Frontend", "Backend", "Database", "Tools & Hosting"] as const;
