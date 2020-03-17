import React, { useCallback, useMemo } from 'react';
import {
  Weekdays,
  Months,
  Year,
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
} from '@shopify/javascript-utilities/dates';
import {
  WeekStyled,
  MonthStyled,
  Title,
  WeekHeadings,
  WeeksContainer,
} from '../../styled';
import { Day } from '../Day';
import { Weekday } from '../Weekday';
import {
  getNewList,
  monthName,
  weekdayName,
  dateIsSelected,
} from '../../utilities';

export interface MonthProps {
  focusedDate?: Date;
  selected?: Date[];
  hoverDate?: Date;
  month: Months;
  year: Year;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  allowRange?: boolean;
  weekStartsOn: Weekdays;
  onChange?(date: Date[]): void;
  onHover?(hoverEnd: Date): void;
  onFocus?(date: Date): void;
  monthName?(month: Months): string;
  weekdayName?(weekday: Weekdays): string;
}

const WEEKDAYS = [
  Weekdays.Sunday,
  Weekdays.Monday,
  Weekdays.Tuesday,
  Weekdays.Wednesday,
  Weekdays.Thursday,
  Weekdays.Friday,
  Weekdays.Saturday,
];

export function Month({
  focusedDate,
  selected,
  disableDatesBefore,
  disableDatesAfter,
  onChange = noop,
  onFocus = noop,
  month,
  year,
  weekStartsOn,
}: MonthProps) {
  const now = new Date();
  const current = now.getMonth() === month && now.getFullYear() === year;
  const weeks = useMemo(() => getWeeksForMonth(month, year, weekStartsOn), [
    month,
    weekStartsOn,
    year,
  ]);
  const weekdays = getWeekdaysOrdered(weekStartsOn).map(weekday => (
    <Weekday
      key={weekday}
      title={`${weekdayName(weekday)}`}
      current={current && new Date().getDay() === weekday}
      label={weekday}
    />
  ));

  const handleDateClick = useCallback(
    (selectedDate: Date) => {
      onChange(getNewList(selected, selectedDate));
    },
    [onChange, selected]
  );

  const lastDayOfMonth = useMemo(
    () => new Date(year, (month as number) + 1, 0),
    [month, year]
  );

  function renderWeek(day: Date | null, dayIndex: number) {
    if (day == null) {
      return <Day key={dayIndex} lastDayOfMonth={lastDayOfMonth} />;
    }

    const disabled =
      (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
      (disableDatesAfter && isDateAfter(day, disableDatesAfter));

    return (
      <Day
        focused={focusedDate && isSameDay(day, focusedDate)}
        day={day}
        key={dayIndex}
        onFocus={onFocus}
        onClick={handleDateClick}
        selected={selected && dateIsSelected(day, selected)}
        disabled={disabled}
      />
    );
  }

  const weeksMarkup = weeks.map((week, index) => (
    <WeekStyled role="row" key={index}>
      {week.map(renderWeek)}
    </WeekStyled>
  ));

  return (
    <MonthStyled role="grid">
      <Title>
        {`${monthName(month)?.toUpperCase()}`} {year}
      </Title>
      <WeekHeadings role="rowheader">{weekdays}</WeekHeadings>
      <WeeksContainer>{weeksMarkup}</WeeksContainer>
    </MonthStyled>
  );
}

function noop() {}

function hoveringDateIsInList(day: Date | null, dates: Date[]) {
  if (day == null) {
    return false;
  }
  return Boolean(dates.includes(day));
}

function getWeekdaysOrdered(weekStartsOn: Weekdays): Weekdays[] {
  const weekDays = [...WEEKDAYS];
  const restOfDays = weekDays.splice(weekStartsOn);
  return [...restOfDays, ...weekDays];
}
