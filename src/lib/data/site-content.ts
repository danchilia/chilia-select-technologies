export type Stat = {
  label: string;
  value: number;
  suffix: string;
};

export const stats: Stat[] = [
  { label: "Projects Delivered", value: 30, suffix: "+" },
  { label: "Years of Experience", value: 5, suffix: "+" },
  { label: "Client Satisfaction", value: 100, suffix: "%" },
  { label: "Average Response Time", value: 24, suffix: "h" },
];

export type WhyChooseUsItem = {
  title: string;
  description: string;
  icon: string;
};

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    title: "Professional Design",
    description: "Every project is custom-designed around your brand, never a recycled template.",
    icon: "Palette",
  },
  {
    title: "Fast Performance",
    description: "Sites and applications built with performance as a core requirement, not an afterthought.",
    icon: "Zap",
  },
  {
    title: "Responsive Design",
    description: "A flawless experience across desktop, laptop, tablet, and mobile from day one.",
    icon: "Smartphone",
  },
  {
    title: "SEO Friendly",
    description: "Built on a technical foundation that helps search engines find and rank your business.",
    icon: "Search",
  },
  {
    title: "Secure Development",
    description: "Security best practices applied throughout development, not patched on afterward.",
    icon: "ShieldCheck",
  },
  {
    title: "Reliable Support",
    description: "Clear communication and dependable support during and after every project.",
    icon: "LifeBuoy",
  },
  {
    title: "Affordable Pricing",
    description: "Transparent, straightforward pricing with no hidden fees or surprise costs.",
    icon: "Wallet",
  },
  {
    title: "Clean Code",
    description: "Maintainable, well-structured code that you fully own and can build on for years.",
    icon: "Code2",
  },
];

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "2021",
    title: "Founded with a focus on quality",
    description: "Chilia Select Technologies began with a simple standard: every project should look and perform like it came from an established agency, regardless of client size.",
  },
  {
    year: "2022",
    title: "Expanded into custom software",
    description: "Beyond websites, we began building custom business management systems and web applications for clients whose operations needed more than off-the-shelf tools.",
  },
  {
    year: "2024",
    title: "Adopted a modern technical standard",
    description: "We standardized our development process around Next.js, TypeScript, and modern performance practices to consistently deliver faster, more reliable products.",
  },
  {
    year: "Today",
    title: "Serving clients internationally",
    description: "We now work with businesses across multiple countries, supporting international payments and remote collaboration as a core part of how we operate.",
  },
];

export const values = [
  {
    title: "Quality Without Compromise",
    description: "We would rather deliver a smaller project exceptionally than a larger one carelessly. Every detail is treated as part of the final product.",
  },
  {
    title: "Transparency",
    description: "Clear pricing, clear timelines, and clear communication, so clients always know where their project stands.",
  },
  {
    title: "Ownership Mentality",
    description: "We approach every project as if it were our own business, because a client's success is the clearest measure of our work.",
  },
  {
    title: "Long-Term Thinking",
    description: "We build systems designed to grow with your business, not to be rebuilt from scratch in two years.",
  },
];
