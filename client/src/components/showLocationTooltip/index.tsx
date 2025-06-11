import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

type Props = {
  location: string[];
};

const LocationDisplay = ({ location }: Props) => {
  const summary =
    location.length > 1
      ? `${location[0]} + ${location.length - 1} more`
      : location[0];
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-pointer underline decoration-dotted text-sm ">
            {summary}
          </span>
        </TooltipTrigger>
        <TooltipContent
          className="bg-white text-black border border-gray-200"
          sideOffset={4}
        >
          <TooltipArrow className="fill-neutral-200" width={11} height={7} />
          <p>{location.join(", ")}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default LocationDisplay;
