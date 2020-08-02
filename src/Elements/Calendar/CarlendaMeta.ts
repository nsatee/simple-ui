export type CalendarInfoType = {
  index: number;
  code: string;
  display: string;
};

export const monthData = [
  {
    code: "Jan",
    display: "January",
  },
  {
    code: "Feb",
    display: "February",
  },
  {
    code: "Mar",
    display: "March",
  },
  {
    code: "Apr",
    display: "April",
  },
  {
    code: "May",
    display: "May",
  },
  {
    code: "Jun",
    display: "June",
  },
  {
    code: "Jul",
    display: "July",
  },
  {
    code: "Aug",
    display: "August",
  },
  {
    code: "Sep",
    display: "September",
  },
  {
    code: "Oct",
    display: "October",
  },
  {
    code: "Nov",
    display: "November",
  },
  {
    code: "Dec",
    display: "December",
  },
] as Array<{ code: string; display: string }>;

export const dayData = [
  {
    index: 0,
    code: "sun",
    display: "Sunday",
  },
  {
    index: 1,
    code: "mon",
    display: "Monday",
  },
  {
    index: 2,
    code: "tue",
    display: "Tuesday",
  },
  {
    index: 3,
    code: "wed",
    display: "Wednesday",
  },
  {
    index: 4,
    code: "thu",
    display: "Thursday",
  },
  {
    index: 5,
    code: "fri",
    display: "Friday",
  },
  {
    index: 6,
    code: "sat",
    display: "Saturday",
  },
] as CalendarInfoType[];
