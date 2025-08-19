import { Skeleton } from "@/components/ui/skeleton";
import {
  FormSectionSkeleton,
  InputSkeleton,
  TextareaSkeleton,
  SelectSkeleton,
  FileUploadSkeleton,
  TagInputSkeleton,
  FormGridSkeleton,
  SocialMediaSkeleton,
  OfficeLocationsSkeleton,
} from "./form-skeletons";

export function CompanyProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 w-full">
      {/* Back button skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-9 w-80 mb-2" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>

      {/* Basic Information Section */}
      <FormSectionSkeleton>
        <FormGridSkeleton columns={2} fields={2} />
        <SelectSkeleton />
        <InputSkeleton />
        <div className="grid gap-4 md:grid-cols-3">
          <SelectSkeleton />
          <InputSkeleton />
          <SelectSkeleton />
        </div>
        <FileUploadSkeleton />
      </FormSectionSkeleton>

      {/* Description & Mission Section */}
      <FormSectionSkeleton>
        <TextareaSkeleton rows={4} />
        <TextareaSkeleton rows={3} />
      </FormSectionSkeleton>

      {/* Work Culture & Tags Section */}
      <FormSectionSkeleton>
        <SelectSkeleton />
        <TagInputSkeleton />
      </FormSectionSkeleton>

      {/* Values & Benefits Section */}
      <FormSectionSkeleton>
        <TagInputSkeleton />
        <TagInputSkeleton />
      </FormSectionSkeleton>

      {/* Office Locations Section */}
      <FormSectionSkeleton>
        <OfficeLocationsSkeleton />
      </FormSectionSkeleton>

      {/* Social Media Section */}
      <FormSectionSkeleton>
        <SocialMediaSkeleton />
      </FormSectionSkeleton>

      {/* Action buttons skeleton */}
      <div className="flex justify-end gap-4">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
