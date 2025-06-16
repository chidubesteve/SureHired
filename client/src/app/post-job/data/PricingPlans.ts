import { PricingPlan } from "../types/JobFormTypes";

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    duration: 15,
    price: 99,
    features: [
      "15 days visibility",
      "Standard job listing",
      "Email notifications",
      "Basic analytics",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    duration: 30,
    price: 149,
    features: [
      "30 days visibility",
      "Featured job listing",
      "Priority in search results",
      "Email & SMS notifications",
      "Advanced analytics",
      "Company logo display",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    duration: 60,
    price: 249,
    features: [
      "60 days visibility",
      "Top placement guarantee",
      "Highlighted job listing",
      "Multi-channel notifications",
      "Detailed analytics dashboard",
      "Company branding",
      "Dedicated support",
    ],
  },
];
