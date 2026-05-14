"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import {
  useCreateCompanyMutation,
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} from "@/redux/services/company";
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
import { useGetUserProfileQuery } from "@/redux/services/user";
import { createCompanyArgs } from "@/types/Company";
import Loading from "./loading";
import getErrorMessage from "@/utils/getErrorMessage";

export type companySize =
  | "1-10 employees"
  | "11-50 employees"
  | "51-200 employees"
  | "200-500 employees"
  | "500+ employees";

const CompanyProfileUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [logoPreview, setLogoPreview] = useState<string | undefined>();
  const initialCompanyName = searchParams.get("company") || "";
  const { data: session } = useSession();
  const signedInUserId = session && session.user && session.user.id;
  console.log(session, "Session Data");
  const { data: user, error: userError } = useGetUserProfileQuery(
    signedInUserId!,
    {
      skip: !signedInUserId,
    }
  );
  const companyId = user && user.data.companyId;
  console.log("User Profile Data:", user);
  console.log("Company ID from user profile:", companyId);
  /* If companyId exists → Update Mode (fetch company data and prefill form).

If companyId is null → Create Mode (empty form, except maybe initialCompanyName from query).
*/
  const [updateCompany, { error: updateError }] = useUpdateCompanyMutation();
  const [createCompany, { error }] = useCreateCompanyMutation();
  const {
    data,
    isLoading,
    isFetching,
    error: companyError,
  } = useGetCompanyByIdQuery(companyId || "", {
    skip: !companyId,
  });
  console.log("Company Data:", data);
  const companySize = data?.data.size as companySize;
  const workStyle = data?.data.workStyle || "Remote"; // Default to "Remote" if not set

  const form = useForm({
    resolver: zodResolver(companySchema),
    mode: "onSubmit",
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
    formState: { isValid, isSubmitting, errors },
    setValue,
    getValues,
  } = form;
  console.log("is form valid", isValid);
  console.log("Form errors:", errors);

  useEffect(() => {
    if (initialCompanyName) {
      setValue("name", initialCompanyName);
    }
  }, [initialCompanyName, setValue]);

  useEffect(() => {
    if (data) {
      form.reset({
        ...data.data,
        size: data?.data.size as companySize, // Ensure size is typed correctly
        workStyle: data?.data.workStyle || "Remote",
        logo: undefined, // Reset logo to undefined for new upload
      });
      form.trigger(); // Trigger validation
      setLogoPreview(data?.data.logo as string | undefined); // Set file preview if logo exists
      console.log("Reset form with data:", data.data);
    }
  }, [data, form, getValues]);

  const onSubmit = async (data: CompanySchemaType) => {
    try {
      let res;
      // if updating, and the logo hasn't changed (URL still the same), don't include it in the update going to the server
      //TODO: in prod, change http to https
      if (companyId && logoPreview === data.logo && logoPreview?.startsWith("http")) {
        delete data.logo;
        console.log("Logo unchanged, not including in update:", data);
      }
      if (companyId) {
        // Update existing company
        res = await updateCompany({
          id: signedInUserId!,
          data: {
            ...form.getValues(),
          } as Partial<createCompanyArgs>,
        }).unwrap();
      } else {
        // Create new company
        res = await createCompany({
          userId: signedInUserId!,
          data,
        }).unwrap();
      }
      toast.success(
        res.message ||
          `Company ${companyId ? "updated" : "created"} successfully!`
      );
      router.push("/company/dashboard");
    } catch (err) {
      console.error("Error creating company:", err);
      const errorMessage = getErrorMessage(err);
      console.log("Extracted error message:", errorMessage);
      toast.error(errorMessage);
    }
  };

  if (error) {
    const errorMessage = getErrorMessage(error);
    console.log("Extracted error message:", errorMessage);
    toast.error(errorMessage);
  }

  if (userError) {
    const errorMessage = getErrorMessage(userError);
    console.log("Extracted error message:", errorMessage);
    toast.error(errorMessage);
  }

  if (companyError) {
    const errorMessage = getErrorMessage(companyError);
    console.log("Extracted error message:", errorMessage);
    toast.error(errorMessage);
  }

  if (updateError) {
    const errorMessage = getErrorMessage(updateError);
    console.log("Extracted error message:", errorMessage);
    toast.error(errorMessage);
  }

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-background">
        <Loading />
      </div>
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
        <BasicInformation
          form={form}
          size={companySize}
          logoPreview={logoPreview}
          setLogoPreview={setLogoPreview}
        />
        <DescriptionMission form={form} />
        <WorkCultureTags form={form} workStyle={workStyle} />
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
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfileUpdate;
