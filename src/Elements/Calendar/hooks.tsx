import React, {useEffect} from "react";
import _ from "lodash";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {dayData, CalendarInfoType} from "./CarlendaMeta";

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

type RenderDateType = {
  dateString?: string;
  from: "last" | "current" | "next";
  date: number;
  dateData?: {
    index: number;
    code: string;
    display: string;
  };
  monthInfo?: any;
};

type useCalendarType = {
  now: {
    string: string;
    dayjs: dayjs.Dayjs;
  };
  activeDate: {
    dayjs: dayjs.Dayjs;
    string: string;
    display: {
      month: string;
      day: string;
      date: string;
      year: string;
    };
    value: {
      month: number;
      day: number;
      date: number;
      year: number;
    };
  };
  activeCalendar: {
    dayjs: dayjs.Dayjs;
    string: string;
    display: {
      month: string;
      day: string;
      date: string;
      year: string;
    };
  };
  renderData: {
    last: RenderDateType[];
    current: RenderDateType[];
    next: RenderDateType[];
  };
  days: CalendarInfoType[];
  handleChange: (
    type: "last" | "next" | "current" | "today",
    dateString?: string | undefined
  ) => void;
  result: {
    type: "single" | "multi" | "range";
    data: string;
  };
};

const FORMAT = "YYYY-MM-DD";

export const useCalendar = (onChange?: Function): useCalendarType => {
  const now = dayjs();
  const nowString = now.format(FORMAT);
  const [startMonth, changeMonth] = React.useState(now.startOf("month"));
  const [activeDateString, setActiveDate] = React.useState<string>();
  const lastMonth = startMonth.subtract(1, "M");
  const nextMonth = now.add(1, "M");
  const selectedMonth = React.useMemo<number>(
    () => parseInt(dayjs(startMonth).format("MM")),
    [startMonth]
  );
  const selectedYear = React.useMemo(() => startMonth.format("YYYY"), [
    startMonth,
  ]);
  const [selectedDate, setDate] = React.useState<number>();
  
  // Active calendar display
  const dateDisplay = React.useMemo(() => {
    const dateString = `${selectedYear}-${selectedMonth}-${now.format("DD")}`;
    return {
      dateString,
      month: dayjs(dateString).format("MMMM"),
      year: dayjs(dateString).format("YYYY"),
      date: selectedDate ? dayjs(dateString).format("Do") : now.format("Do"),
      day: dayjs(dateString).format("dddd"),
    };
  }, [selectedDate, selectedMonth, selectedYear, now]);
  
  //active date info
  const dateActiveDisplay = React.useMemo(() => {
    return {
      dateString: activeDateString,
      month: dayjs(activeDateString).format("MMMM"),
      year: dayjs(activeDateString).format("YYYY"),
      date: dayjs(activeDateString).format("Do"),
      day: dayjs(activeDateString).format("dddd"),
    };
  }, [activeDateString]);
  
  // Raw data to for rendering function
  const monthInfo = React.useMemo(
    () => ({
      last: {
        startDay: dayjs(lastMonth).format("ddd"),
        monthValue: selectedMonth - 1,
        endDate: dayjs(lastMonth).daysInMonth(),
      },
      current: {
        startDay: dayjs(startMonth).format("ddd"),
        monthValue: selectedMonth,
        endDate: dayjs(now).daysInMonth(),
      },
      next: {
        startDay: dayjs(nextMonth).format("ddd"),
        monthValue: selectedMonth + 1,
        endDate: dayjs(nextMonth).daysInMonth(),
      },
    }),
    [startMonth, lastMonth, nextMonth, now, selectedMonth]
  );
  
  const handleChange = (
    type: "last" | "next" | "current" | "today",
    dateString?: string
  ): void => {
    // select and make calendar jump to today
    if (type === "today") {
      changeMonth(now);
      setDate(parseInt(now.format("DD")));
      return setActiveDate(now.format(FORMAT));
    }
    // prev and next month
    if (type !== "current") {
      changeMonth(
        type === "last" ? startMonth.subtract(1, "M") : startMonth.add(1, "M")
      );
    }
    dateString && setDate(parseInt(dayjs(dateString).format("DD")));
    dateString && setActiveDate(dateString!);
  };
  
  useEffect(() => {
    onChange &&
    onChange(() => ({
      type: "single",
      data: dateActiveDisplay.dateString!,
    }));
  }, [onChange, dateActiveDisplay.dateString]);
  
  const renderData = React.useCallback(() => {
    const firstDayData = _.filter(dayData, {
      code: monthInfo.current.startDay.toLowerCase(),
    })[0];
    const overlapLastMonth = () => {
      const last = [] as RenderDateType[];
      const current = [] as RenderDateType[];
      const next = [] as RenderDateType[];
      let endDate = monthInfo.last.endDate;
      for (let i = 0; i < monthInfo.current.endDate; i++) {
        const date = `${selectedYear}-${
          monthInfo.current.monthValue < 9 ? "0" : ""
        }${monthInfo.current.monthValue}-${i < 9 ? "0" : ""}${i + 1}`;
        const dayNumber = parseInt(dayjs(date).format("d"));
        current.push({
          dateString: date,
          from: "current",
          date: i + 1,
          dateData: dayData[dayNumber],
          monthInfo,
        });
      }
      for (let i = 0; i < firstDayData.index; i++) {
        const date = `${selectedYear}-${
          monthInfo.last.monthValue < 9 ? "0" : ""
        }${monthInfo.last.monthValue}-${endDate < 9 ? "0" : ""}${endDate}`;
        last.unshift({
          dateString: date,
          from: "last",
          date: endDate,
          monthInfo,
        });
        endDate = endDate - 1;
      }
      for (let i = 0; i < 6 * 7 - (last.length + current.length); i++) {
        const date = `${selectedYear}-${
          monthInfo.next.monthValue < 9 ? "0" : ""
        }${monthInfo.next.monthValue}-${i + 1 < 9 ? "0" : ""}${i + 1}`;
        next.push({
          dateString: date,
          from: "next",
          date: i + 1,
          dateData: dayData[i + 1],
          monthInfo,
        });
      }
      
      return {
        last,
        current,
        next,
      };
    };
    
    return {
      last: overlapLastMonth().last,
      current: overlapLastMonth().current,
      next: overlapLastMonth().next,
    };
  }, [monthInfo, selectedYear]);
  
  return {
    now: {
      string: nowString,
      dayjs: now,
    },
    activeDate: {
      dayjs: dayjs(activeDateString),
      string: activeDateString!,
      display: {
        month: dateActiveDisplay.month,
        day: dateActiveDisplay.day,
        date: dateActiveDisplay.date,
        year: dateActiveDisplay.year,
      },
      value: {
        year: parseInt(dateDisplay.year),
        month: parseInt(dayjs(dateDisplay.dateString).format("MM")),
        date: parseInt(dayjs(dateDisplay.dateString).format("DD")),
        day: parseInt(dayjs(dateDisplay.dateString).format("d")),
      },
    },
    activeCalendar: {
      dayjs: dayjs(dateDisplay.dateString),
      string: dateDisplay.dateString!,
      display: {
        month: dateDisplay.month,
        day: dateDisplay.day,
        date: dateDisplay.date,
        year: dateDisplay.year,
      },
    },
    days: dayData,
    renderData: renderData(),
    handleChange: handleChange,
    result: {
      type: "single",
      data: dateActiveDisplay.dateString!,
    },
  };
};
