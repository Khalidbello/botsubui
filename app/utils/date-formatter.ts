// functiont to format date to Nigeria time
function dateFormatter(date: any) {
  const date0 = new Date(date);
  // Create an Intl.DateTimeFormat object with the Nigeria time zone
  const nigeriaFormatter = new Intl.DateTimeFormat("en-NG", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // This will format the time in 12-hour format with AM/PM
  });
  // Format the Nigeria time using the formatter
  return nigeriaFormatter.format(date0);
} // end of dateFormatter

export default dateFormatter;
