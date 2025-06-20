"use client";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

const CompanyProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: "TechTrend Innovations",
    industry: "Technology",
    size: "200-500 employees",
    founded: 2015,
    hqLocation: "San Francisco, CA",
    website: "https://techtrend.com",
    description: "TechTrend Innovations is a leading technology company...",
    mission: "To empower businesses worldwide...",
    workStyle: "Hybrid",
  });

  const [tags, setTags] = useState([
    "EdTech",
    "Online Learning",
    "Remote-first",
  ]);
  const [values, setValues] = useState([
    "Innovation",
    "Collaboration",
    "Integrity",
  ]);
  const [benefits, setBenefits] = useState([
    "Competitive salary and equity",
    "Health insurance",
    "Flexible working hours",
  ]);
  const [newTag, setNewTag] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && tags.length < 3 && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addValue = () => {
    if (newValue.trim() && !values.includes(newValue.trim())) {
      setValues([...values, newValue.trim()]);
      setNewValue("");
    }
  };

  const removeValue = (valueToRemove: string) => {
    setValues(values.filter((value) => value !== valueToRemove));
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setBenefits(benefits.filter((benefit) => benefit !== benefitToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Updated company data:", {
      ...formData,
      tags,
      values,
      benefits,
    });

    toast.message("Profile Updated", {
      description: "Your company profile has been successfully updated.",
    });
  };
  const router = useRouter();

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
        <p className="text-neutral-600">
          Keep your company information up to date
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="size">Company Size</Label>
                <Select
                  value={formData.size}
                  onValueChange={(value) => handleInputChange("size", value)}
                >
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
              </div>
              <div>
                <Label htmlFor="founded">Founded Year</Label>
                <Input
                  id="founded"
                  type="number"
                  value={formData.founded}
                  onChange={(e) =>
                    handleInputChange("founded", parseInt(e.target.value))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="hqLocation">Headquarters Location</Label>
                <Input
                  id="hqLocation"
                  value={formData.hqLocation}
                  onChange={(e) =>
                    handleInputChange("hqLocation", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  required
                />
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
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                required
              />
            </div>
            <div>
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea
                id="mission"
                value={formData.mission}
                onChange={(e) => handleInputChange("mission", e.target.value)}
                rows={3}
                required
              />
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
              <Label htmlFor="workStyle">Work Style</Label>
              <Select
                value={formData.workStyle}
                onValueChange={(value) => handleInputChange("workStyle", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Industry Tags (Max 3)</Label>
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
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
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
                {values.map((value, index) => (
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
              </div>
              <div className="flex gap-2">
                <Input
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Add company value..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addValue())
                  }
                />
                <Button type="button" onClick={addValue} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label>Employee Benefits</Label>
              <div className="flex flex-wrap gap-2 my-2">
                {benefits.map((benefit, index) => (
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
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addBenefit())
                  }
                />
                <Button type="button" onClick={addBenefit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
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
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  type="url"
                  onChange={(e) => handleInputChange("github", e.target.value)}
                  placeholder="https://github.com/yourcompany"
                />
              </div>
              <div>
                <Label htmlFor="github">X (f.k.a Twitter)</Label>
                <Input
                  id="twitter"
                  type="url"
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                  placeholder="https://x.com/yourcompany"
                />
              </div>
              <div>
                <Label htmlFor="github">Youtube</Label>
                <Input
                  id="youtube"
                  type="url"
                  onChange={(e) => handleInputChange("youtube", e.target.value)}
                  placeholder="https://youtube.com/@yourcompany"
                />
              </div>
              <div>
                <Label htmlFor="github">TikTok</Label>
                <Input
                  id="tiktok"
                  type="url"
                  onChange={(e) => handleInputChange("tiktok", e.target.value)}
                  placeholder="https://tiktok.com/@yourcompany"
                />
              </div>
              <div>
                <Label htmlFor="github">Facebook</Label>
                <Input
                  id="facebook"
                  type="url"
                  onChange={(e) =>
                    handleInputChange("facebook", e.target.value)
                  }
                  placeholder="https://facebook.com/yourcompany"
                />
              </div>
              <div>
                <Label htmlFor="github">Other</Label>
                <Input
                  id="other"
                  type="url"
                  onChange={(e) => handleInputChange("other", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="bg-brand-600 hover:bg-brand-700">
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfileUpdate;
