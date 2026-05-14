import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { CompanySchemaType } from "../ValidationSchema";

interface ValuesAndBenefitsProps {
  form: UseFormReturn<CompanySchemaType>;
}

const ValuesAndBenefits = ({ form }: ValuesAndBenefitsProps) => {
  const [newValue, setNewValue] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  const {
    formState: { errors },
    watch,
    setValue,
  } = form;

  const values = watch("values");
  const benefits = watch("benefits");

  const addValue = () => {
    if (newValue.trim() && values && !values.includes(newValue.trim())) {
      const updatedValues = [...values, newValue.trim()];
      setValue("values", updatedValues);
      setNewValue("");
    }
  };

  const removeValue = (valueToRemove: string) => {
    const updatedValues =
      values && values.filter((value) => value !== valueToRemove);
    setValue("values", updatedValues);
  };

 const addBenefit = () => {

   if (newBenefit.trim() && benefits && !benefits.includes(newBenefit.trim())) {
     const updatedBenefits = [...benefits, newBenefit.trim()];
     setValue("benefits", updatedBenefits);
     setNewBenefit("");
   }
 };

  const removeBenefit = (benefitToRemove: string) => {
    const updatedBenefits =
      benefits && benefits.filter((benefit) => benefit !== benefitToRemove);
    setValue("benefits", updatedBenefits);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Company Values & Benefits</CardTitle>
        <CardDescription>What makes your company special</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Company Values</Label>
          <div className="flex flex-wrap gap-2 my-2">
            {values &&
              values.map((value, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {value}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeValue(value)}
                  />
                </Badge>
              ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Add company value..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addValue();
                }
              }}
            />
            <Button type="button" onClick={addValue} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {errors.values && (
            <p className="text-sm text-red-500 mt-1">{errors.values.message}</p>
          )}
        </div>

        <div>
          <Label>Employee Benefits</Label>
          <div className="flex flex-wrap gap-2 my-2">
            {benefits &&
              benefits.map((benefit, index) => (
                <Badge
                  key={index}
                  variant="default"
                  className="flex items-center gap-1"
                >
                  {benefit}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeBenefit(benefit)}
                  />
                </Badge>
              ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              placeholder="Add employee benefit..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  addBenefit();
                }
              }}
            />
            <Button type="button" onClick={addBenefit} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {errors.benefits && (
            <p className="text-sm text-red-500 mt-1">
              {errors.benefits.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuesAndBenefits;
