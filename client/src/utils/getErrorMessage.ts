/* eslint-disable @typescript-eslint/no-explicit-any */
// This utility function accepts an error and returns a string message.
// If the error is an instance of Error, it returns the error message.
// If the error is an object with a 'data' property and the 'data' property has a string 'message' property, it returns the 'message' property.
// Otherwise, it returns a default message.
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data?.message === "string"
  ) {
    return (error as any).data.message;
  } else {
    return "An unexpected error occurred.";
  }
};
export default getErrorMessage;