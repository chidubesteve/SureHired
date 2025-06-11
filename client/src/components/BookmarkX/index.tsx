"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LuBookmark } from "react-icons/lu";

type Props = {
  isHoverStyleApplied?: boolean;
};
export const ClientSaveButtonJsx = (props: Props) => {
  const { isHoverStyleApplied = true } = props;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
    console.log("clicked");
  };
  return (
    <Button
      variant={`${isHoverStyleApplied ? "ghost" : "outline"}`}
      size={"sm"}
      className={`${
        isHoverStyleApplied &&
        "opacity-0 group-hover:opacity-100 transition-opacity"
      } ${isBookmarked && "bg-brand-50 border-brand-200"}`}
      onClick={handleBookmark}
    >
      <LuBookmark
        className={`w-4 h-4 ${
          isBookmarked ? "fill-brand-600 text-brand-600" : ""
        }`}
      />
    </Button>
  );
};
