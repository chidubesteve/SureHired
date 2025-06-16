import { Header } from '@/components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { pricingPlans } from '../data/PricingPlans';
import { LuCheck } from 'react-icons/lu';

interface PricingStepProps  {
    selectedPlan: string;
    setSelectedPlan: (planId: string) => void;
    onBack: () => void;
    onNext: () => void;
}

const PricingStep = ({
  selectedPlan,
  setSelectedPlan,
  onBack,
  onNext,
}: PricingStepProps) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-neutral-600">
            Select the plan that best fits your hiring needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "border-brand-500 shadow-lg"
                  : "hover:border-brand-200"
              } ${plan.popular ? "border-brand-300" : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-brand-600">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-brand-600">
                  ${plan.price}
                </div>
                <CardDescription>
                  {plan.duration} days visibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <LuCheck className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {selectedPlan === plan.id && (
                  <div className="mt-4 p-2 bg-brand-50 rounded-lg text-center">
                    <span className="text-sm text-brand-700 font-medium">
                      Selected
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <Button variant="outline" onClick={() => onBack()}>
            Back to Job Details
          </Button>
          <Button onClick={onNext} disabled={!selectedPlan} className="bg-brand-600 hover:bg-brand-700">
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingStep