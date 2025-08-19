import { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { CompanySchemaType } from "../ValidationSchema";

interface WorkCultureTagsProps {
  form: UseFormReturn<CompanySchemaType>;
  workStyle?: "Remote" | "Onsite" | "Hybrid"
}

const WorkCultureTags = ({ form, workStyle }: WorkCultureTagsProps) => {
  const [newTag, setNewTag] = useState("");
  const {
    formState: { errors },
    control,
    watch,
    setValue,
    trigger,
  } = form;

  const tags = watch("tags");

  const addTag = async () => {
    if (newTag.trim() && tags.length < 3 && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setValue("tags", updatedTags);
      setNewTag("");
      await trigger("tags");
    }
  };

  const removeTag = async (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setValue("tags", updatedTags);
    await trigger("tags");
  };

  return (
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
            defaultValue={workStyle}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value} value={workStyle}>
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
            <p className="text-sm text-red-500 mt-1">{errors.tags.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkCultureTags;
