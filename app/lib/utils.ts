import imageUrlBuilder from "@sanity/image-url";
import { Image } from "@sanity/types";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "i97qsvhm", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-12-24",
});

export const urlFor = (source: Image) => imageUrlBuilder(client).image(source);

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = date.toLocaleString("en-US", options);
  let [month, day, year, at, time, am] = formattedDate.split(" ");
  day = day.replace(",", "");

  // // Add ordinal suffix to day
  // const [month, day, year] = datePart.split(" ");
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  return `${time} ${am} - ${month} ${dayWithSuffix}, ${year}`;
}

function getOrdinalSuffix(day: string): string {
  const dayNum = parseInt(day, 10);
  if (dayNum > 3 && dayNum < 21) return "th";
  switch (dayNum % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
