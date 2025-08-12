"use client";
import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { LuArrowLeft, LuMapPin } from "react-icons/lu";
import { useCreateCompanyMutation } from "@/redux/services/company";
import { companySchema, CompanySchemaType } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

const CompanyProfileUpdate = () => {
  const [newTag, setNewTag] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const initialCompanyName = searchParams.get("company") || "";
  console.log("Initial Company Name:", initialCompanyName);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting},
    control,
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(companySchema),
    mode: "onChange",
    defaultValues: {
      name: initialCompanyName || "",
      industry: "",
      description: "",
      mission: "",
      website: "",
      hqLocation: "",
      size: "1-10 employees",
      founded: new Date().getFullYear(),
      workStyle: "Remote",
      tags: [],
      values: [],
      benefits: [],
      socials: {
        linkedin: "",
        github: "",
        twitter: "",
        facebook: "",
        instagram: "",
        youtube: "",
        tiktok: "",
        other: "",
      },
      offices: [],
    },
  });
  console.log("form validity: ", isValid);
  // Watch dynamic fields to keep them in sync
  const tags = watch("tags");
  const values = watch("values");
  const benefits = watch("benefits");
  const offices = watch("offices");
  const { data:session } = useSession()
  const signedInUserId = session && session.user.id;

  const [createCompany, { error }] = useCreateCompanyMutation();

  useEffect(() => {
    if (initialCompanyName) {
      setValue("name", initialCompanyName);
    }
  }, [initialCompanyName, setValue]);

  const addTag = async () => {
    if (newTag.trim() && tags.length < 3 && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setValue("tags", updatedTags);
      setNewTag("");

      await trigger("tags"); // Trigger validation for tags
    }
  };

  const removeTag = async (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setValue("tags", updatedTags);
    await trigger("tags"); // Trigger validation for tags
  };

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

  // Value management functions
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

  // Benefit management functions
  const addBenefit = () => {
    if (
      newBenefit.trim() &&
      benefits &&
      !benefits.includes(newBenefit.trim())
    ) {
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

  const onSubmit = async (data: CompanySchemaType) => {
    console.log("Updated company data:", data);
    try {
      const res = await createCompany({ userId:signedInUserId!, data }).unwrap();
      toast.success(res.message || "Company created successfully!");
      router.push("/company/dashboard"); // Or wherever
    } catch (err) {
      console.error("Error creating company:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to create company"
      );
    }
  };

  if (error)
    return toast.error(
      error instanceof Error ? error.message : "Sorry!, couldn't create company"
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 w-full">
      <Button variant={"link"} onClick={() => router.back()} className="px-0">
        <LuArrowLeft />
        Go Back
      </Button>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Update Company Profile
        </h1>
        <p className="text-neutral-600 flex flex-col gap-1.5">
          Keep your company information up to date
          <small className="italic">fields marked with * are required</small>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Basic Information</CardTitle>
            <CardDescription>
              Essential details about your company
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Company Name *</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
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
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue />
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
            </div>
          </CardContent>
        </Card>

        {/* Description and Mission */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Company Description & Mission
            </CardTitle>
            <CardDescription>
              Tell candidates about your company
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Company Description *</Label>
              <Textarea
                id="description"
                {...register("description")}
                rows={4}
              />
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

        {/* Work Style and Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Work Culture & Tags</CardTitle>
            <CardDescription>
              Define your work style and industry keywords
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="workStyle">Work Style *</Label>
              <Controller
                name="workStyle"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Onsite">Onsite</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label>Industry Tags (Max 3) *</Label>
              <div className="flex flex-wrap gap-2 my-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              {tags.length < 3 && (
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add industry tag..."
                    onKeyUp={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {errors.tags && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.tags.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Values and Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Company Values & Benefits
            </CardTitle>
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
                {errors.values && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.values.message}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Add company value..."
                  onKeyUp={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addValue())
                  }
                />
                <Button type="button" onClick={addValue} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
                {errors.values && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.values.message}
                  </p>
                )}
              </div>
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
                  onKeyUp={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addBenefit())
                  }
                />
                <Button type="button" onClick={addBenefit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
                {errors.benefits && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.benefits.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Office Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Office Locations</CardTitle>
            <CardDescription>
              Manage your company&apos;s office locations (excluding
              headquarters)
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
                        <Label htmlFor={`office-location-${index}`}>
                          Location
                        </Label>
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
                        <Label htmlFor={`office-address-${index}`}>
                          Address
                        </Label>
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

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Social Media</CardTitle>
            <CardDescription>Connect your social profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  type="url"
                  {...register("socials.linkedin")}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
                {errors.socials?.linkedin && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.socials.linkedin.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  type="url"
                  {...register("socials.github")}
                  placeholder="https://github.com/yourcompany"
                />
                {errors.socials?.github && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.socials.github.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="github">X (f.k.a Twitter)</Label>
                <Input
                  id="twitter"
                  type="url"
                  {...register("socials.twitter")}
                  placeholder="https://x.com/yourcompany"
                />
                {errors.socials?.twitter && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.socials.twitter.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="github">Youtube</Label>
                <Input
                  id="youtube"
                  type="url"
                  {...register("socials.youtube")}
                  placeholder="https://youtube.com/@yourcompany"
                />
                {errors.socials?.youtube && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.socials.youtube.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="github">TikTok</Label>
                <Input
                  id="tiktok"
                  type="url"
                  {...register("socials.tiktok")}
                  placeholder="https://tiktok.com/@yourcompany"
                />
                {errors.socials?.tiktok && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.socials.tiktok.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="github">Facebook</Label>
                <Input
                  id="facebook"
                  type="url"
                  {...register("socials.facebook")}
                  placeholder="https://facebook.com/yourcompany"
                />
                {errors.socials?.facebook && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.socials.facebook.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="github">Other</Label>
                <Input
                  id="other"
                  type="url"
                  {...register("socials.other")}
                  placeholder="https://example.com"
                />
                {errors.socials?.other && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.socials.other.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-brand-600 hover:bg-brand-700 disabled:hover:!cursor-not-allowed"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>

      {/* Debug info - remove in production */}
      {/* {process.env.NODE_ENV === "development" && (
        <div className="bg-gray-100 p-4 rounded text-xs">
          <p>Form Valid: {isValid ? "Yes" : "No"}</p>
          <p>Tags: {JSON.stringify(tags)}</p>
          <p>Errors: {JSON.stringify(errors, null, 2)}</p>
        </div>
      )} */}
    </div>
  );
};

export default CompanyProfileUpdate;
