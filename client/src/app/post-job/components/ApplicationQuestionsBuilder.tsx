import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { ApplicationQuestion } from "@/types/applicationQuestions";
import { v4 as uuidv4 } from "uuid";

interface ApplicationQuestionsBuilderProps {
  addQuestion: (question: ApplicationQuestion) => void;
}

const ApplicationQuestionsBuilder = ({ addQuestion }: ApplicationQuestionsBuilderProps) => {
  const [newQuestion, setNewQuestion] = useState<ApplicationQuestion>({
    id: uuidv4(),
    question: "",
    type: "textarea",
    required: false,
    options: undefined,
  });
  const [newOption, setNewOption] = useState<string>("");

  const addOption = () => {
    if (newOption.trim()) {
      setNewQuestion({
        ...newQuestion,
        options: [...(newQuestion.options || []), newOption.trim()],
      });
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options?.filter((_, i) => i !== index),
    });
  };

  const handleAddQuestion = () => {
    if (newQuestion.question.trim()) {
      addQuestion(newQuestion);
      setNewQuestion({
        id: uuidv4(),
        question: "",
        type: "textarea",
        required: false,
        options: undefined,
      });
      setNewOption("");
    }
  };

  return (
    <div className="p-4 border border-dashed border-neutral-300 rounded-lg">
      <div className="space-y-4">
        <div>
          <Label>Question</Label>
          <Input
            placeholder="Enter your question..."
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Input Type</Label>
            <select
              value={newQuestion.type}
              onChange={(e) => {
                const type = e.target.value as ApplicationQuestion["type"];
                setNewQuestion({
                  ...newQuestion,
                  type,
                  options: ["select", "radio", "checkbox"].includes(type)
                    ? []
                    : undefined,
                });
              }}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
            >
              <option value="textarea">Text Area</option>
              <option value="text">Text Input</option>
              <option value="select">Dropdown</option>
              <option value="radio">Radio Buttons</option>
              <option value="checkbox">Checkboxes</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={newQuestion.required}
              onCheckedChange={(checked) =>
                setNewQuestion({ ...newQuestion, required: checked })
              }
            />
            <Label>Required</Label>
          </div>
        </div>

        {["select", "radio", "checkbox"].includes(newQuestion.type) && (
          <div>
            <Label>Options</Label>
            <div className="space-y-2">
              {newQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input value={option} readOnly />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(index)}
                  >
                    <LuTrash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add option..."
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  disabled={!newOption.trim()}
                >
                  <LuPlus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddQuestion}
          disabled={!newQuestion.question.trim()}
        >
          <LuPlus className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </div>
    </div>
  );
};

export default ApplicationQuestionsBuilder;
