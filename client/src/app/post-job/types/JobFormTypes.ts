

export interface PricingPlan {
  id: string;
  name: string;
  duration: number;
  price: number;
  features: string[];
  popular?: boolean;
}
