import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ApplicationQuestion } from "@/types/applicationQuestions";
import { UseFormReturn } from "react-hook-form";
import { LuBriefcase, LuTrash2 } from "react-icons/lu";
import { JobFormData } from "../validation/JobFormSchema";
import ApplicationQuestionsBuilder from "../components/ApplicationQuestionsBuilder";
import { Header } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobFormStepProps {
  form: UseFormReturn<JobFormData>;
  onNext: () => void;
  applicationMethod: "in-app" | "external";
  applicationQuestions: ApplicationQuestion[];
  setApplicationQuestions: React.Dispatch<
    React.SetStateAction<ApplicationQuestion[]>
  >;
  addQuestion: (question: ApplicationQuestion) => void;
  removeQuestion: (id: string) => void;
}

// JobFormStep.tsx
export default function JobFormStep({
  form,
  onNext,
  applicationMethod,
  applicationQuestions,
  setApplicationQuestions,
  addQuestion,
  removeQuestion,
}: JobFormStepProps) {
  const onSubmit = (data: unknown) => {
    const allValues = form.getValues();
    console.log("JobFormStep - form data:", allValues);
    console.log("✅ SUBMITTING FORM:", data);
    onNext(); // Proceed to pricing after validation
  };
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Post a Job
          </h1>
          <p className="text-xl text-neutral-600">
            Find the perfect candidate for your team
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-semibold text-neutral- leading-none tracking-tight">
              <LuBriefcase className="w-5 h-5 mr-2" />
              Job Details
            </CardTitle>
            <CardDescription>
              Fill out the information below to create your job listing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.error("JobFormStep - form errors:", errors);
                })}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Senior Software Engineer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. TechCorp Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. San Francisco, CA or Remote"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary Range</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g.75,000 or 80,000 - 120,000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type *</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none">
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Full-time">
                                Full-time
                              </SelectItem>
                              <SelectItem value="Part-time">
                                Part-time
                              </SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Internship">
                                Internship
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level *</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none">
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Entry-level">
                                Entry Level (0-2 years)
                              </SelectItem>
                              <SelectItem value="Mid-level">
                                Mid Level (3-5 years)
                              </SelectItem>
                              <SelectItem value="Senior-level">
                                Senior Level (5+ years)
                              </SelectItem>
                              <SelectItem value="Executive">
                                Executive
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the role, responsibilities, and what makes this opportunity unique..."
                          className="min-h-[120px]"
                          {...field}
                          maxLength={4000}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List the required skills, qualifications, and experience..."
                          className="min-h-[100px]"
                          {...field}
                          maxLength={1000}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits & Perks</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Health insurance, remote work, professional development, etc..."
                          className="min-h-[80px]"
                          {...field}
                          maxLength={1000}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="hiring@company.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyWebsite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Application Method Section */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Application Method
                  </h3>

                  <FormField
                    control={form.control}
                    name="applicationMethod"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={field.value === "external"}
                              onCheckedChange={(checked) =>
                                field.onChange(checked ? "external" : "in-app")
                              }
                            />
                            <Label>External Application</Label>
                          </div>
                          <span className="text-sm text-neutral-500">
                            {field.value === "in-app"
                              ? "Candidates apply through our platform"
                              : "Redirect to your own application page"}
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />

                  {applicationMethod === "external" && (
                    <FormField
                      control={form.control}
                      name="applicationUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application URL *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://yourcompany.com/careers/apply"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {applicationMethod === "in-app" && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">
                          Additional Application Questions
                        </Label>
                        <p className="text-sm text-neutral-500 mb-4">
                          Add custom questions to gather more information from
                          candidates
                        </p>
                      </div>

                      {/* Display existing questions */}
                      {applicationQuestions.length > 0 && (
                        <div className="space-y-3">
                          {applicationQuestions.map((question) => (
                            <div
                              key={question.id}
                              className="p-4 border border-neutral-200 rounded-lg"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="font-medium">
                                    {question.question}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline">
                                      {question.type}
                                    </Badge>
                                    {question.required && (
                                      <Badge variant="outline">Required</Badge>
                                    )}
                                  </div>
                                  {question.options &&
                                    question.options.length > 0 && (
                                      <div className="mt-2">
                                        <p className="text-sm text-neutral-600">
                                          Options:
                                        </p>
                                        <ul className="text-sm text-neutral-500 ml-4">
                                          {question.options.map(
                                            (option, optIndex) => (
                                              <li key={optIndex}>• {option}</li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeQuestion(question.id)}
                                >
                                  <LuTrash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add new question form */}
                      <ApplicationQuestionsBuilder addQuestion={addQuestion} />
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" size="lg" className="">
                    Continue to Pricing
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
