import {
  differenceInDays,
  differenceInMinutes,
  differenceInSeconds,
  format,
  formatDistanceToNow,
  parseISO,
} from "date-fns";

export function formatPostedDate(postedDate) {
  const date = parseISO(postedDate); // convert the iso string to a date object

  const now = new Date();
  const daysDifference = differenceInDays(now, date);

  if (daysDifference >= 30) {
    // for jobs older than 30 days (date, 'MMMM d, yyyy')
    return `Posted on ${format(date, "MMM d, yyyy")}`;
  }
  const seconds = differenceInSeconds(now, date);
  const minutes = differenceInMinutes(now, date);

  if (seconds < 60) return "Posted just now";
  if (minutes < 1) return "Posted less than a minute ago";

  // for jobs within 30 days show relative time (eg: 1 hour ago)
  return `${formatDistanceToNow(date, { addSuffix: true })}`;
}
