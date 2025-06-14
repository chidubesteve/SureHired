import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ApplicationFormType } from "./ValidationSchema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

type QuestionType = {
  id: string;
  question: string;
  type: "textarea" | "select" | "radio" | "checkbox";
  required: boolean;
  options?: string[];
};

type Props = {
  question: QuestionType;
  register: UseFormRegister<ApplicationFormType>;
  errors: FieldErrors<ApplicationFormType>;
};

const RenderAdditionalQuestion = ({ question, register, errors }: Props) => {
  const { id, question: questionText, type, required, options } = question;

  // Access error message for the specific question
  const errorMessage = errors?.answers?.[id]?.message;

  // Debug: Log errors for this question
  console.log(`Errors for ${id} (${questionText}):`, errors?.answers?.[id]);

  switch (type) {
    case "textarea":
      return (
        <div className="mb-4">
          <Label htmlFor={`answers.${id}`}>
            {questionText} {required && "*"}
          </Label>
          <Textarea
            id={`answers.${id}`}
            {...register(`answers.${id}`)}
            className="resize-none mt-1"
            rows={5}
          />
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      );

    case "select":
      return (
        <div className="mb-4">
          <Label htmlFor={`answers.${id}`}>
            {questionText} {required && "*"}
          </Label>
          <Select {...register(`answers.${id}`)}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      );

    case "radio":
      return (
        <div className="mb-4">
          <Label>
            {questionText} {required && "*"}
          </Label>
          {options?.map((option) => (
            <div key={option} className="flex items-center">
              <Input
                id={`answers.${id}.${option}`}
                type="radio"
                value={option}
                {...register(`answers.${id}`)}
                className="mr-2 w-fit"
              />
              <Label htmlFor={`answers.${id}.${option}`}>{option}</Label>
            </div>
          ))}
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      );

    case "checkbox":
      return (
        <div className="mb-4">
          <Label>
            {questionText} {required && "*"}
          </Label>
          {options?.map((option, index) => (
            <div key={option} className="flex items-center">
              <Input
                type="checkbox"
                value={option}
                {...register(`answers.${id}`)} // Array registration
                id={`answers.${id}.${index}`}
                className="mr-2 w-fit"
              />
              <Label htmlFor={`answers.${id}.${index}`}>{option}</Label>
            </div>
          ))}
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      );

    default:
      return null;
  }
};

export default RenderAdditionalQuestion;
