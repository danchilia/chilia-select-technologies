export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  idealFor: string;
  icon: string;
  category: "web" | "software" | "growth";
};

export const services: Service[] = [
  {
    slug: "business-website-development",
    title: "Business Website Development",
    shortDescription:
      "Custom-built websites that position your business as credible, modern, and ready to convert visitors into customers.",
    description:
      "A complete, custom-coded business website designed around your brand and your customers' journey, from first impression to inquiry. We handle strategy, design, development, and launch, so you receive a site that is fast, mobile-ready, and built to represent your company at a professional standard.",
    benefits: [
      "Custom design, not a generic template",
      "Mobile-first, fully responsive layout",
      "Optimized for search engines from day one",
      "Fast loading speeds on every device",
      "Content structured to build trust and drive inquiries",
    ],
    idealFor: "Small and mid-sized businesses that need a professional online presence to compete for customers.",
    icon: "Globe",
    category: "web",
  },
  {
    slug: "corporate-websites",
    title: "Corporate Websites",
    shortDescription:
      "Polished, enterprise-grade websites that communicate scale, stability, and professionalism to partners and clients.",
    description:
      "For established companies, your website is often the first proof of legitimacy a prospective client or partner will see. We build corporate websites with a refined visual identity, clear information architecture, and content sections tailored to investors, partners, and enterprise buyers.",
    benefits: [
      "Enterprise-grade visual design",
      "Structured multi-department content",
      "Leadership, careers, and press-ready sections",
      "Scalable architecture for future growth",
      "Consistent brand system across every page",
    ],
    idealFor: "Established companies and organizations that need a website reflecting their scale and credibility.",
    icon: "Building2",
    category: "web",
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    shortDescription:
      "High-conversion landing pages built for a single goal: turning traffic into leads, signups, or sales.",
    description:
      "We design and build focused landing pages for campaigns, product launches, and lead generation. Every element, from headline and layout to call-to-action and load time, is engineered around a single conversion goal, backed by clean, fast code.",
    benefits: [
      "Conversion-focused layout and copy structure",
      "A/B test-ready component structure",
      "Sub-second load times",
      "Seamless integration with ad campaigns",
      "Built-in lead capture forms",
    ],
    idealFor: "Businesses running marketing campaigns or launching a new product that need a dedicated conversion page.",
    icon: "Rocket",
    category: "web",
  },
  {
    slug: "e-commerce-development",
    title: "E-commerce Development",
    shortDescription:
      "Custom online stores with secure checkout, inventory management, and a shopping experience built to convert.",
    description:
      "We build e-commerce platforms that make it easy for customers to browse, buy, and return. From product catalogs to secure payment processing and order management, every part of the store is custom-built around your catalog and your customers.",
    benefits: [
      "Secure, PCI-compliant checkout flows",
      "Inventory and order management tools",
      "Fast product search and filtering",
      "Mobile-optimized shopping experience",
      "Integration with payment providers and shipping",
    ],
    idealFor: "Retailers and product-based businesses ready to sell online with a store they fully own.",
    icon: "ShoppingCart",
    category: "web",
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    shortDescription:
      "Transform an outdated or underperforming website into a fast, modern, and conversion-ready experience.",
    description:
      "If your current website no longer represents your business, we rebuild it from the ground up, preserving your existing content and SEO equity while modernizing design, performance, and usability.",
    benefits: [
      "Modernized design without losing brand equity",
      "SEO-safe migration process",
      "Improved page speed and Core Web Vitals",
      "Updated UX based on current best practices",
      "Fresh mobile experience",
    ],
    idealFor: "Businesses with an existing website that no longer performs, converts, or reflects their brand.",
    icon: "RefreshCcw",
    category: "web",
  },
  {
    slug: "portfolio-websites",
    title: "Portfolio Websites",
    shortDescription:
      "Elegant, visually driven websites for professionals and studios who need their work to speak for itself.",
    description:
      "For architects, designers, agencies, and consultants, we build portfolio websites that let visual work take center stage, with fast image loading, refined typography, and case-study layouts that showcase results.",
    benefits: [
      "Gallery and case-study layouts",
      "Optimized image loading and lazy rendering",
      "Clean, distraction-free typography",
      "Built-in inquiry and booking forms",
      "Personal brand-forward design",
    ],
    idealFor: "Professionals, studios, and consultants whose work needs a refined visual showcase.",
    icon: "Image",
    category: "web",
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    shortDescription:
      "Purpose-built web applications that automate workflows and solve problems off-the-shelf software can't.",
    description:
      "When a standard tool doesn't fit how your business actually operates, we design and build custom web applications, from internal dashboards to customer-facing platforms, using modern, scalable architecture.",
    benefits: [
      "Built around your exact workflow",
      "Role-based access and secure authentication",
      "Scalable database and API architecture",
      "Clean, maintainable codebase",
      "Ongoing support as your needs evolve",
    ],
    idealFor: "Businesses whose operations have outgrown spreadsheets and generic software.",
    icon: "LayoutDashboard",
    category: "software",
  },
  {
    slug: "business-management-systems",
    title: "Business Management Systems",
    shortDescription:
      "Centralized systems to manage staff, operations, records, and reporting from a single dashboard.",
    description:
      "We build management systems tailored to how your organization runs, combining scheduling, records, reporting, and user permissions into one secure platform that replaces scattered spreadsheets and manual processes.",
    benefits: [
      "Centralized operations dashboard",
      "Custom reporting and analytics",
      "Role-based permissions for staff and admins",
      "Secure data storage and backups",
      "Designed to scale as your team grows",
    ],
    idealFor: "Organizations managing complex operations that need a single, reliable system of record.",
    icon: "Building",
    category: "software",
  },
  {
    slug: "school-management-systems",
    title: "School Management Systems",
    shortDescription:
      "All-in-one platforms for student records, attendance, grading, timetables, and parent communication.",
    description:
      "We build school management systems that bring administration, teachers, students, and parents onto one platform, covering enrollment, attendance, grading, timetables, fees, and communication.",
    benefits: [
      "Student, staff, and parent portals",
      "Attendance and grading modules",
      "Automated fee and payment tracking",
      "Timetable and scheduling tools",
      "Secure records management",
    ],
    idealFor: "Schools and educational institutions ready to move administration off paper and spreadsheets.",
    icon: "GraduationCap",
    category: "software",
  },
  {
    slug: "pos-systems",
    title: "POS Systems",
    shortDescription:
      "Reliable point-of-sale systems for retail and hospitality with real-time sales and inventory tracking.",
    description:
      "We design point-of-sale systems that keep checkout fast and accurate while giving owners real-time visibility into sales, inventory, and staff performance across one or multiple locations.",
    benefits: [
      "Fast, reliable checkout flow",
      "Real-time inventory synchronization",
      "Sales reporting and analytics dashboard",
      "Multi-location support",
      "Staff accounts and permission controls",
    ],
    idealFor: "Retail stores, restaurants, and service businesses that need dependable point-of-sale software.",
    icon: "CreditCard",
    category: "software",
  },
  {
    slug: "api-integration",
    title: "API Integration",
    shortDescription:
      "Connect your website or software to payment gateways, CRMs, and third-party services that power your business.",
    description:
      "We integrate the tools your business already depends on, including payment processors, CRMs, email platforms, and shipping providers, into a unified, reliable system that reduces manual work.",
    benefits: [
      "Secure, well-documented integrations",
      "Payment gateway and CRM connections",
      "Automated data synchronization",
      "Error handling and monitoring",
      "Reduced manual data entry",
    ],
    idealFor: "Businesses relying on multiple platforms that need them working together seamlessly.",
    icon: "Plug",
    category: "software",
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance",
    shortDescription:
      "Ongoing updates, monitoring, and support to keep your website secure, fast, and running smoothly.",
    description:
      "A website is never truly finished. Our maintenance plans keep your platform updated, secure, and performing well, with regular monitoring and fast response when something needs attention.",
    benefits: [
      "Regular software and security updates",
      "Uptime and performance monitoring",
      "Priority bug fixes",
      "Monthly performance reports",
      "Direct access to your development team",
    ],
    idealFor: "Businesses that want their website professionally maintained without hiring in-house staff.",
    icon: "Wrench",
    category: "growth",
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    shortDescription:
      "Technical and on-page SEO that helps your business get found by the customers searching for you.",
    description:
      "We optimize site structure, content, metadata, and technical performance so search engines can properly index and rank your website, helping you show up where your customers are already looking.",
    benefits: [
      "Technical SEO audits and fixes",
      "On-page optimization and metadata",
      "Structured data implementation",
      "Local SEO for regional businesses",
      "Ongoing keyword and content strategy",
    ],
    idealFor: "Businesses that need to be found on Google by the customers actively searching for their services.",
    icon: "Search",
    category: "growth",
  },
  {
    slug: "performance-optimization",
    title: "Performance Optimization",
    shortDescription:
      "Faster load times and smoother experiences through technical performance tuning and modern best practices.",
    description:
      "Slow websites lose customers. We audit and optimize your site's performance, including code splitting, image optimization, caching, and rendering strategy, to deliver a fast experience on every device and connection.",
    benefits: [
      "Improved Core Web Vitals scores",
      "Optimized images and asset delivery",
      "Efficient code splitting and caching",
      "Better rankings from faster load times",
      "Reduced bounce rates",
    ],
    idealFor: "Businesses with an existing site suffering from slow load times or poor performance scores.",
    icon: "Gauge",
    category: "growth",
  },
  {
    slug: "hosting-assistance",
    title: "Hosting Assistance",
    shortDescription:
      "Guidance and setup for reliable, secure hosting so your website stays online and performs well.",
    description:
      "We help you choose, configure, and manage hosting infrastructure suited to your website or application, including domain setup, SSL, backups, and deployment pipelines.",
    benefits: [
      "Hosting platform selection and setup",
      "Domain and SSL configuration",
      "Automated backups",
      "Deployment pipeline setup",
      "Ongoing hosting support",
    ],
    idealFor: "Businesses that want reliable hosting without navigating the technical setup themselves.",
    icon: "Server",
    category: "growth",
  },
  {
    slug: "technical-consulting",
    title: "Technical Consulting",
    shortDescription:
      "Strategic technical guidance to help you make confident decisions about your website and software investments.",
    description:
      "Not sure what to build or how to approach a technical project? We offer consulting to help you scope requirements, evaluate technology choices, and plan a roadmap before committing budget to development.",
    benefits: [
      "Technology stack recommendations",
      "Project scoping and requirements planning",
      "Budget and timeline guidance",
      "Architecture and scalability review",
      "Vendor-neutral advice",
    ],
    idealFor: "Business owners and teams planning a technical project who want expert guidance before building.",
    icon: "Lightbulb",
    category: "growth",
  },
];
