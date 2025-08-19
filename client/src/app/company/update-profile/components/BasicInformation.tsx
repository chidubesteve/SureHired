import { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuUpload } from "react-icons/lu";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import Image from "next/image";
import { CompanySchemaType } from "../ValidationSchema";
import { companySize } from "../page";

interface BasicInformationProps {
  form: UseFormReturn<CompanySchemaType>;
  size?: companySize;
}

const BasicInformation = ({ form, size }: BasicInformationProps) => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();

  const {
    register,
    formState: { errors },
    control,
  } = form;

  const handleDrop = (files: File[]) => {
    setFiles(files);

    if (files.length > 0) {
      form.setValue("logo", files[0], {
        shouldValidate: true,});
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setFilePreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Basic Information</CardTitle>
        <CardDescription>Essential details about your company</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Company Name *</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="industry">Industry *</Label>
            <Input id="industry" {...register("industry")} />
            {errors.industry && (
              <p className="text-sm text-red-500 mt-1">
                {errors.industry.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="size">Company Size *</Label>
            <Controller
              control={control}
              name="size"
              defaultValue={size}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={size}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10 employees">
                      1-10 employees
                    </SelectItem>
                    <SelectItem value="11-50 employees">
                      11-50 employees
                    </SelectItem>
                    <SelectItem value="51-200 employees">
                      51-200 employees
                    </SelectItem>
                    <SelectItem value="200-500 employees">
                      200-500 employees
                    </SelectItem>
                    <SelectItem value="500+ employees">
                      500+ employees
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label htmlFor="founded">Founded Year *</Label>
            <Input
              id="founded"
              type="number"
              {...register("founded", { valueAsNumber: true })}
            />
            {errors.founded && (
              <p className="text-sm text-red-500 mt-1">
                {errors.founded.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="hqLocation">Headquarters Location *</Label>
            <Input
              id="hqLocation"
              placeholder="e.g. 99 Market avenue, San Francisco, CA"
              {...register("hqLocation")}
            />
            {errors.hqLocation && (
              <p className="text-sm text-red-500 mt-1">
                {errors.hqLocation.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="website">Website *</Label>
            <Input id="website" type="url" {...register("website")} />
            {errors.website && (
              <p className="text-sm text-red-500 mt-1">
                {errors.website.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2 space-y-1">
            <Label htmlFor="logo">Company Logo (optional)</Label>
            <Dropzone
              accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
              onDrop={handleDrop}
              maxSize={1024 * 1024 * 2} // 2MB
              onError={console.error}
              src={files}
              className="border-dashed border-2 border-neutral-300 rounded-lg p-4 relative"
            >
              <DropzoneEmptyState>
                <LuUpload className="!w-8 !h-8 text-gray-600" />
                <p className="text-center text-neutral-500">
                  Drag & drop your logo here or click to upload
                </p>
                <p className="text-center italic text-xs text-neutral-500">
                  Supported formats: PNG, JPG, JPEG, WEBP (max 2MB)
                </p>
              </DropzoneEmptyState>
              <DropzoneContent>
                {filePreview && (
                  <div className="h-[102px] w-full">
                    <Image
                      alt="Preview"
                      width={102}
                      height={102}
                      placeholder="data:image/..."
                      className="absolute top-0 left-0 h-full w-full object-cover"
                      src={filePreview}
                    />
                  </div>
                )}
              </DropzoneContent>
            </Dropzone>
            {errors.logo && (
              <p className="text-sm text-red-500 mt-1">{errors.logo.message}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformation;
