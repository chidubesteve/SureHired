"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CheckoutStep from "./steps/CheckoutStep";
import PricingStep from "./steps/PricingStep";
import JobFormStep from "./steps/JobFormStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationQuestion } from "@/types/applicationQuestions";
import { JobFormData, JobFormSchema } from "./validation/JobFormSchema";

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type ExperienceLevelType =
  | "Entry-level"
  | "Mid-level"
  | "Senior-level"
  | "Executive";

const PostJobPage = () => {
  const [step, setStep] = useState<"form" | "pricing" | "checkout">("form");
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [applicationQuestions, setApplicationQuestions] = useState<
    ApplicationQuestion[]
  >([]);

  const form = useForm<JobFormData>({
    resolver: zodResolver(JobFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      companyName: "",
      location: "",
      salary: "",
      jobType: "Full-time",
      experience: "Entry-level",
      description: "",
      requirements: "",
      benefits: "",
      email: "",
      companyWebsite: "",
      applicationMethod: "in-app",
      applicationUrl: undefined,
      applicationQuestions: [],
    },
  });

  const applicationMethod = form.watch("applicationMethod");

  const addQuestion = (question: ApplicationQuestion) => {
    const currentQuestions = form.getValues("applicationQuestions") ?? []; // fallback to empty array
    const updatedQuestions = [...currentQuestions, question];

    setApplicationQuestions(updatedQuestions);
    form.setValue("applicationQuestions", updatedQuestions);
  };
  

  const removeQuestion = (id: string) => {
    const updated = applicationQuestions && applicationQuestions.filter((q) => q.id !== id);
    setApplicationQuestions(updated);
    form.setValue("applicationQuestions", updated);
  };

  if (step === "pricing") {
    return (
      <PricingStep
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        onBack={() => setStep("form")}
        onNext={() => setStep("checkout")}
      />
    );
  }

  if (step === "checkout") {
    return (
      <CheckoutStep
        selectedPlan={selectedPlan}
        formValues={form.getValues()}
        onBack={() => setStep("pricing")}
      />
    );
  }

  return (
    <JobFormStep
      form={form}
      onNext={() => setStep("pricing")}
      applicationMethod={applicationMethod}
      applicationQuestions={applicationQuestions}
      setApplicationQuestions={setApplicationQuestions}
      addQuestion={addQuestion}
      removeQuestion={removeQuestion}
    />
  );
};

export default PostJobPage;
