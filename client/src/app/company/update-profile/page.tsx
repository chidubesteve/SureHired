"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { useCreateCompanyMutation } from "@/redux/services/company";
import { companySchema, CompanySchemaType } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

// Import form sections
import BasicInformation from "./components/BasicInformation";
import DescriptionMission from "./components/DescriptionMission";
import WorkCultureTags from "./components/WorkCultureTags";
import ValuesAndBenefits from "./components/ValuesAndBenefits";
import OfficeLocations from "./components/OfficeLocations";
import SocialMedia from "./components/SocialMedia";

const CompanyProfileUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCompanyName = searchParams.get("company") || "";
  const { data: session } = useSession();
  const signedInUserId = session && session.user.id;

  const [createCompany, { error }] = useCreateCompanyMutation();

  const form = useForm({
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
      logo: undefined,
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

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    setValue,
  } = form;

  useEffect(() => {
    if (initialCompanyName) {
      setValue("name", initialCompanyName);
    }
  }, [initialCompanyName, setValue]);

  const onSubmit = async (data: CompanySchemaType) => {
    try {
      const res = await createCompany({
        userId: signedInUserId!,
        data,
      }).unwrap();
      toast.success(res.message || "Company created successfully!");
      router.push("/company/dashboard");
    } catch (err) {
      console.error("Error creating company:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to create company"
      );
    }
  };

  if (error) {
    toast.error(
      error instanceof Error ? error.message : "Sorry!, couldn't create company"
    );
  }

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
        <BasicInformation form={form} />
        <DescriptionMission form={form} />
        <WorkCultureTags form={form} />
        <ValuesAndBenefits form={form} />
        <OfficeLocations form={form} />
        <SocialMedia form={form} />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
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
    </div>
  );
};

export default CompanyProfileUpdate;
