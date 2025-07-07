import { AlertCircle } from "lucide-react";
import React from "react";

type Props = {
  message: string;
};

const FetchingError = ({ message }: Props) => {
  return (
    <div
      className="flex w-[100%] items-center justify-center self-end"
      style={{ height: "inherit" }}
    >
      <AlertCircle className="dark:text-gray-500" />
      <p className="ml-2 text-lg font-medium dark:text-gray-500">{message}</p>
    </div>
  );
};

export default FetchingError;
