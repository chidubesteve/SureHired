"use client";
import { Header } from "@/components";
import BackToX from "@/components/BackToX";
import { Jobs } from "@/data/Job";
import React, { useMemo, useState, use } from "react";
import { useForm } from "react-hook-form";
import {
  LuBriefcase,
  LuBuilding2,
  LuClock,
  LuDollarSign,
  LuMapPin,
  LuUpload,
} from "react-icons/lu";
import {
  ApplicationFormType,
  createApplicationFormSchema,
} from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import RenderAdditionalQuestion from "./RenderAdditionalQuestion";
import Image from "next/image";

type inputTypes = "textarea" | "select" | "radio" | "checkbox";

const applicationQuestions = [
  {
    id: "q1",
    question: "Are you eligible to work?",
    type: "radio" as inputTypes,
    required: true,
    options: ["Yes", "No"],
  },
  {
    id: "q2",
    question: "Select your skills",
    type: "checkbox" as inputTypes,
    required: true,
    options: ["React", "Node.js", "Python"],
  },
  {
    id: "q3",
    question: "Why do you want to join our company?",
    type: "textarea" as inputTypes,
    required: false,
  },
  {
    id: "q4",
    question: "Are you authorized to work in the US?",
    type: "select" as inputTypes,
    options: ["Yes", "No", "Require sponsorship"],
    required: true,
  },
];
const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  // TODO: replace with dynamic job id, use to fetch job details and extra questions if any. now create static example questions

  const schema = useMemo(
    () => createApplicationFormSchema(applicationQuestions),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      answers: Object.fromEntries(
        applicationQuestions.map((q) => [q.id, q.type === "checkbox" ? [] : ""])
      ),
    },
  });

  console.log("Form errors:", errors);

  const job = Jobs.find((job) => job.id === id);

  const onSubmit = async (data: ApplicationFormType) => {
    setIsSubmitting(true);
    console.log("Submitting application:", data);

    // TODO: Submit application to backend

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    // TODO: Show success toast and redirect
    router.push(`/jobs/${id}?applied=true`);
  };

  if (!job) {
    return (
      <div className="space-y-2 text-lg font-bold text-center flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl">404</h2>
        <LuBriefcase className="w-12 h-12" />
        <span>Job not found</span>
      </div>
    );
  }
  // dynamic job id, use to fetch job details
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackToX path="/jobs" dest="Job Details" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-6">
                Apply for {job.title}
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className="mt-1"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className="mt-1"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-1"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="mt-1"
                        placeholder="Optional"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className="mt-1"
                      placeholder="City, State/Country"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                    Resume
                  </h2>
                  <div>
                    <Label htmlFor="resume">Upload Resume *</Label>
                    <div className="mt-1 flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg p-6 hover:border-brand-500 transition-colors">
                      <div className="text-center">
                        <LuUpload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                        <div className="flex flex-col sm:flex-row items-center gap-1">
                          <Label
                            htmlFor="resume"
                            className="cursor-pointer text-brand-600 hover:text-brand-700"
                          >
                            Click to upload
                          </Label>
                          <span className="text-neutral-500">
                            or drag and drop
                          </span>
                        </div>
                        <p className="text-sm text-neutral-500 mt-1">
                          PDF, DOC, DOCX up to 10MB
                        </p>
                      </div>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        {...register("resumeFile", {
                          required: "Resume is required",
                        })}
                        className="hidden"
                      />
                    </div>
                    {errors.resumeFile && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.resumeFile.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    {...register("coverLetter")}
                    className="mt-1"
                    rows={4}
                    placeholder="Tell us why you're interested in this position... (Optional)"
                  />
                </div>

                {/* Custom Questions */}
                {applicationQuestions && (
                  <div>
                    <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                      Additional Questions
                    </h2>
                    <div className="space-y-4">
                      {applicationQuestions.map((question) => (
                        <RenderAdditionalQuestion
                          key={question.id}
                          question={question}
                          register={register}
                          errors={errors}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {/* Submit Button */}
                <div className="pt-6 border-t border-neutral-200">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white"
                    size="lg"
                  >
                    {isSubmitting
                      ? "Submitting Application..."
                      : "Submit Application"}
                  </Button>
                  <p className="text-sm text-neutral-500 text-center mt-2">
                    By submitting this application, you agree to our terms and
                    privacy policy.
                  </p>
                </div>
              </form>
            </div>
          </div>
          {/* Job Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 sticky top-24">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${
                    job.company.name
                  }&chars=${
                    job.company.name.trim().split(/\s+/).length
                  }&radius=25`}
                  alt={job.company.name}
                  width={50}
                  height={50}
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {job.title}
                  </h3>
                  <p className="text-neutral-600">{job.company.name}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-neutral-600 text-sm">
                  <LuMapPin className="w-4 h-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-neutral-600 text-sm">
                  <LuClock className="w-4 h-4 mr-2" />
                  {job.type}
                </div>
                <div className="flex items-center text-neutral-600 text-sm">
                  <LuDollarSign className="w-4 h-4 mr-2" />
                  {job.salary}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <div className="flex items-center text-neutral-600 text-sm">
                  <LuBuilding2 className="w-4 h-4 mr-2" />
                  <span>Application Type: In-app</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
