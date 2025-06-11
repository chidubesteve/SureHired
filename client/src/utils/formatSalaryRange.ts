export function formatSalaryRange(salaryRange: string) {
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  const [min, max] = salaryRange
    .split("-")
    .map((s) => parseInt(s.trim().replace(/,/g, ""), 10)); // Remove commas and parse numbers

  if (isNaN(min)) return salaryRange; // Fallback if parsing fails

  const formattedMin = formatter.format(min);
  const formattedMax = max ? formatter.format(max) : null;

  return formattedMax ? `${formattedMin} - ${formattedMax}` : formattedMin;
}
