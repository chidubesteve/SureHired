import { Header } from '@/components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { JobFormData } from '../validation/JobFormSchema';
import { pricingPlans } from '../data/PricingPlans';

interface CheckoutStepProps {
  selectedPlan: string;
  formValues: JobFormData;
  onBack: () => void;
}

const CheckoutStep = ({
  selectedPlan,
  formValues,
  onBack,
}: CheckoutStepProps) => {
  console.log("CheckoutStep - formValues:", formValues);
  console.log("CheckoutStep - selectedPlan:", selectedPlan);

  const plan = pricingPlans.find((p) => p.id === selectedPlan);
  if (!plan) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Plan not found
          </h1>
          <p className="text-neutral-600">
            The selected plan could not be found.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Complete Your Job Posting
          </h1>
          <p className="text-neutral-600">
            You&apos;re almost done! Complete your payment to publish your job
            listing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{plan?.duration} days</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${plan?.price}</span>
                </div>
              </div>
              <Button className="w-full mt-4">Complete Payment</Button>
              <p className="text-sm text-neutral-500 text-center">
                Secure payment powered by Stripe
              </p>
            </CardContent>
          </Card>

          {/* Job Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Job Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="font-bold text-lg">{formValues.title}</h3>
                <p className="text-neutral-600">{formValues.companyName}</p>
                <p className="text-sm text-neutral-500">
                  {formValues.location}
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">{formValues.jobType}</Badge>
                  <Badge variant="outline">
                    {formValues.experience}
                  </Badge>
                </div>
                {formValues.salary && (
                  <p className="font-medium text-brand-600">
                    {formValues.salary}
                  </p>
                )}
                <div className="mt-4">
                  <Badge variant="outline">
                    {formValues.applicationMethod === "in-app"
                      ? "In-App Application"
                      : "External Application"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full mt-4"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default CheckoutStep