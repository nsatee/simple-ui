import React from "react";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {
  Container,
  Header,
  HeaderSection,
  Wrapper,
  CalendarHeader,
  ArrowButton,
  Days,
  Dates,
  Date,
  Day,
  BorderButton,
} from "./style";
import {useCalendar} from "./hooks";

const Calendar: React.FC<{ onChange?: Function }> = ({onChange}) => {
  const calendar = useCalendar(onChange);
  
  return (
    <Container>
      <Header>
        <HeaderSection>
          <BorderButton onClick={() => calendar.handleChange("today")}>
            Today
          </BorderButton>
        </HeaderSection>
        <HeaderSection>
          <span>{calendar.now.dayjs.format("MMMM Do, YYYY")}</span>
        </HeaderSection>
      </Header>
      <Wrapper>
        <CalendarHeader>
          <ArrowButton onClick={() => calendar.handleChange("last")}>
            <FiArrowLeft size={24}/>
          </ArrowButton>
          <span>
            {calendar.activeCalendar.display.month},{" "}
            {calendar.activeCalendar.display.year}
          </span>
          <ArrowButton onClick={() => calendar.handleChange("next")}>
            <FiArrowRight size={24}/>
          </ArrowButton>
        </CalendarHeader>
        <Days>
          {calendar.days.map((day, index) => (
            <Day key={index} as="span">
              {day.code}
            </Day>
          ))}
        </Days>
        <Dates>
          {calendar.renderData.last.map((day) => (
            <Date
              key={day.date}
              outFocus
              onClick={() => calendar.handleChange("last", day.dateString)}
            >
              {day.date}
            </Date>
          ))}
          {calendar.renderData.current.map((day) => (
            <Date
              key={day.dateString}
              current={
                calendar.now.string === day.dateString &&
                day.monthInfo[day.from].monthValue ===
                calendar.activeDate.value.month
              }
              onClick={() => {
                calendar.handleChange("current", day.dateString);
              }}
              className={
                calendar.activeDate.string === day.dateString ? "selected" : ""
              }
            >
              {day.date}
            </Date>
          ))}
          {calendar.renderData.next.map((day) => (
            <Date
              key={day.dateString}
              outFocus
              onClick={() => calendar.handleChange("next", day.dateString)}
            >
              {day.date}
            </Date>
          ))}
        </Dates>
      </Wrapper>
    </Container>
  );
};

export default Calendar;
