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
import { X, Plus } from "lucide-react";
import { LuMapPin } from "react-icons/lu";
import { CompanySchemaType } from "../ValidationSchema";

interface OfficeLocationsProps {
  form: UseFormReturn<CompanySchemaType>;
}

const OfficeLocations = ({ form }: OfficeLocationsProps) => {
  const { watch, setValue } = form;
  const offices = watch("offices");

  const addOffice = () => {
    const updatedOffices = [
      ...(offices || []),
      {
        location: "",
        address: "",
        isHeadquarters: false,
      },
    ];
    setValue("offices", updatedOffices);
  };

  const removeOffice = (index: number) => {
    const updatedOffices = offices && offices.filter((_, i) => i !== index);
    setValue("offices", updatedOffices);
  };

  const updateOffice = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updatedOffices =
      offices &&
      offices.map((office, i) =>
        i === index ? { ...office, [field]: value } : office
      );
    setValue("offices", updatedOffices);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Office Locations</CardTitle>
        <CardDescription>
          Manage your company&apos;s office locations (excluding headquarters)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {offices && offices.length > 0 && (
          <div className="space-y-4">
            {offices.map((office, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LuMapPin className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm font-medium">
                      Office {index + 1}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOffice(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`office-location-${index}`}>Location</Label>
                    <Input
                      id={`office-location-${index}`}
                      value={office.location}
                      onChange={(e) =>
                        updateOffice(index, "location", e.target.value)
                      }
                      placeholder="e.g., New York, NY"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`office-address-${index}`}>Address</Label>
                    <Input
                      id={`office-address-${index}`}
                      value={office.address}
                      onChange={(e) =>
                        updateOffice(index, "address", e.target.value)
                      }
                      placeholder="e.g., 123 Main Street"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={addOffice}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Office Location
        </Button>
      </CardContent>
    </Card>
  );
};

export default OfficeLocations;
