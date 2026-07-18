export type PricingTier = {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  bestFor: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$600",
    priceNote: "starting price",
    description: "A professional, custom-built website for businesses establishing their first strong online presence.",
    bestFor: "Small businesses and solo professionals",
    features: [
      "Up to 5 custom-designed pages",
      "Mobile-responsive development",
      "Basic on-page SEO setup",
      "Contact form integration",
      "1 round of revisions",
      "2 weeks average delivery",
      "30 days of post-launch support",
    ],
  },
  {
    name: "Professional",
    price: "$1,500",
    priceNote: "starting price",
    description: "A fully custom website or web application built for growing businesses that need more depth and functionality.",
    bestFor: "Growing businesses and e-commerce brands",
    features: [
      "Up to 12 custom-designed pages",
      "Advanced animations and interactions",
      "E-commerce or booking functionality",
      "Technical + on-page SEO setup",
      "CMS integration for easy content updates",
      "3 rounds of revisions",
      "4–6 weeks average delivery",
      "90 days of post-launch support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceNote: "quote based on scope",
    description: "Custom software, business management systems, and large-scale platforms engineered around your exact operations.",
    bestFor: "Organizations needing custom software or complex platforms",
    features: [
      "Unlimited pages and custom modules",
      "Custom web application or management system",
      "API integrations and third-party connections",
      "Role-based user accounts and permissions",
      "Dedicated technical consulting",
      "Scalable architecture and database design",
      "Flexible delivery timeline based on scope",
      "Ongoing maintenance and support plan",
    ],
  },
];

export const comparisonFeatures = [
  { feature: "Custom design (no templates)", starter: true, professional: true, enterprise: true },
  { feature: "Mobile-responsive development", starter: true, professional: true, enterprise: true },
  { feature: "On-page SEO setup", starter: true, professional: true, enterprise: true },
  { feature: "Technical SEO optimization", starter: false, professional: true, enterprise: true },
  { feature: "CMS content management", starter: false, professional: true, enterprise: true },
  { feature: "E-commerce / booking functionality", starter: false, professional: true, enterprise: true },
  { feature: "Custom web application development", starter: false, professional: false, enterprise: true },
  { feature: "API and third-party integrations", starter: false, professional: "Add-on", enterprise: true },
  { feature: "Role-based user accounts", starter: false, professional: false, enterprise: true },
  { feature: "Dedicated technical consulting", starter: false, professional: false, enterprise: true },
  { feature: "Post-launch support", starter: "30 days", professional: "90 days", enterprise: "Custom plan" },
];
