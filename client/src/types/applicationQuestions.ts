export interface ApplicationQuestion {
  id: string;
  question: string;
  type: "textarea" | "select" | "radio" | "checkbox";
  required: boolean;
  options?: string[];
}
