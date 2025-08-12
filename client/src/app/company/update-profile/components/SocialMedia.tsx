import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CompanySchemaType } from "../ValidationSchema";

interface SocialMediaProps {
  form: UseFormReturn<CompanySchemaType>;
}

const SocialMedia = ({ form }: SocialMediaProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
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
              {...register("socials.linkedin")}
              placeholder="https://linkedin.com/company/yourcompany"
            />
            {errors.socials?.linkedin && (
              <p className="text-sm text-red-500 mt-1">
                {errors.socials.linkedin.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              type="url"
              {...register("socials.github")}
              placeholder="https://github.com/yourcompany"
            />
            {errors.socials?.github && (
              <p className="text-sm text-red-500 mt-1">
                {errors.socials.github.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="twitter">X (f.k.a Twitter)</Label>
            <Input
              id="twitter"
              type="url"
              {...register("socials.twitter")}
              placeholder="https://x.com/yourcompany"
            />
            {errors.socials?.twitter && (
              <p className="text-sm text-red-500 mt-1">
                {errors.socials.twitter.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              type="url"
              {...register("socials.facebook")}
              placeholder="https://facebook.com/yourcompany"
            />
            {errors.socials?.facebook && (
              <p className="text-sm text-red-500 mt-1">
                {errors.socials.facebook.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              type="url"
              {...register("socials.instagram")}
              placeholder="https://instagram.com/yourcompany"
            />
            {errors.socials?.instagram && (
              <p className="text-sm text-red-500 mt-1">
                {errors.socials.instagram.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="youtube">Youtube</Label>
            <Input
              id="youtube"
              type="url"
              {...register("socials.youtube")}
              placeholder="https://youtube.com/yourcompany"
            />
            {errors.socials?.youtube && (
              <p className="text-sm text-red-500 mt-1">
                {errors.socials.youtube.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="tiktok">TikTok</Label>
            <Input
              id="tiktok"
              type="url"
              {...register("socials.tiktok")}
              placeholder="https://tiktok.com/@yourcompany"
            />
            {errors.socials?.tiktok && (
              <p className="text-sm text-red-500 mt-1">
                {errors.socials.tiktok.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="other">Other</Label>
            <Input
              id="other"
              type="url"
              {...register("socials.other")}
              placeholder="https://yourcompany.com/social"
            />
            {errors.socials?.other && (
              <p className="text-sm text-red-500 mt-1">
                {errors.socials.other.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMedia;
