import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Generic input field skeleton
export function InputSkeleton({ label = true }: { label?: boolean }) {
  return (
    <div className="space-y-2">
      {label && <Skeleton className="h-4 w-20" />}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Generic textarea skeleton
export function TextareaSkeleton({
  label = true,
  rows = 3,
}: {
  label?: boolean;
  rows?: number;
}) {
  return (
    <div className="space-y-2">
      {label && <Skeleton className="h-4 w-24" />}
      <Skeleton
        className={`w-full ${
          rows === 3 ? "h-20" : rows === 4 ? "h-24" : "h-32"
        }`}
      />
    </div>
  );
}

// Generic select/dropdown skeleton
export function SelectSkeleton({ label = true }: { label?: boolean }) {
  return (
    <div className="space-y-2">
      {label && <Skeleton className="h-4 w-16" />}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// File upload skeleton
export function FileUploadSkeleton({ label = true }: { label?: boolean }) {
  return (
    <div className="space-y-2">
      {label && <Skeleton className="h-4 w-20" />}
      <div className="border-2 border-dashed border-muted rounded-lg p-6">
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

// Tag input skeleton
export function TagInputSkeleton({ label = true }: { label?: boolean }) {
  return (
    <div className="space-y-2">
      {label && <Skeleton className="h-4 w-20" />}
      <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[42px]">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

// Form section skeleton wrapper
export function FormSectionSkeleton({
  title = true,
  description = true,
  children,
}: {
  title?: boolean;
  description?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 p-6 border rounded-lg">
      {title && <Skeleton className="h-6 w-48" />}
      {description && <Skeleton className="h-4 w-96" />}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// Grid layout skeleton for form fields
export function FormGridSkeleton({
  columns = 2,
  fields = 4,
}: {
  columns?: number;
  fields?: number;
}) {
  return (
    <div
      className={`grid gap-4 ${
        columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
      }`}
    >
      {Array.from({ length: fields }).map((_, index) => (
        <InputSkeleton key={index} />
      ))}
    </div>
  );
}

// Social media links skeleton
export function SocialMediaSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5" />
          <InputSkeleton label={false} />
        </div>
      ))}
    </div>
  );
}

// Office locations skeleton
export function OfficeLocationsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex justify-between items-start">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-8" />
          </div>
          <FormGridSkeleton columns={2} fields={4} />
        </div>
      ))}
      <Skeleton className="h-10 w-40" />
    </div>
  );
}
