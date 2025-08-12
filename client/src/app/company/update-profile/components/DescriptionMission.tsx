import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CompanySchemaType } from "../ValidationSchema";

interface DescriptionMissionProps {
  form: UseFormReturn<CompanySchemaType>;
}

const DescriptionMission = ({ form }: DescriptionMissionProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Company Description & Mission
        </CardTitle>
        <CardDescription>Tell candidates about your company</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="description">Company Description *</Label>
          <Textarea id="description" {...register("description")} rows={4} />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="mission">Mission Statement *</Label>
          <Textarea id="mission" {...register("mission")} rows={4} />
          {errors.mission && (
            <p className="text-sm text-red-500 mt-1">
              {errors.mission.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DescriptionMission;
