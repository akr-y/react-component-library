import React, { useCallback, useMemo } from 'react';
import {
  Range,
  Weekdays,
  Months,
  Year,
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
} from '@shopify/javascript-utilities/dates';
// import {classNames} from '../../../../utilities/css';
// import {useI18n} from '../../../../utilities/i18n';
// import styles from '../../DatePicker.scss';
import { Day } from '../Day';
import { Weekday } from '../Weekday';
import { monthName, weekdayName } from '../../utilities';

export interface MonthProps {
  focusedDate?: Date;
  selected?: Range;
  hoverDate?: Date;
  month: Months;
  year: Year;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  allowRange?: boolean;
  weekStartsOn: Weekdays;
  onChange?(date: Range): void;
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
  hoverDate,
  disableDatesBefore,
  disableDatesAfter,
  allowRange,
  onChange = noop,
  onHover = noop,
  onFocus = noop,
  month,
  year,
  weekStartsOn,
}: MonthProps) {
  const isInHoveringRange = allowRange ? hoveringDateIsInRange : () => false;
  const now = new Date();
  const current = now.getMonth() === month && now.getFullYear() === year;
  // const className = classNames(
  //   styles.Title,
  //   current && styles['Month-current']
  // );
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
      onChange(getNewRange(allowRange ? selected : undefined, selectedDate));
    },
    [allowRange, onChange, selected]
  );

  const lastDayOfMonth = useMemo(
    () => new Date(year, (month as number) + 1, 0),
    [month, year]
  );

  function renderWeek(day: Date, dayIndex: number) {
    if (day == null) {
      return (
        <Day key={dayIndex} onHover={onHover} lastDayOfMonth={lastDayOfMonth} />
      );
    }

    const disabled =
      (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
      (disableDatesAfter && isDateAfter(day, disableDatesAfter));

    return (
      <Day
        focused={focusedDate != null && isSameDay(day, focusedDate)}
        day={day}
        key={dayIndex}
        onFocus={onFocus}
        onClick={handleDateClick}
        onHover={onHover}
        selected={selected != null && dateIsSelected(day, selected)}
        inRange={selected != null && dateIsInRange(day, selected)}
        disabled={disabled}
        inHoveringRange={
          selected != null &&
          hoverDate != null &&
          isInHoveringRange(day, selected, hoverDate)
        }
      />
    );
  }

  const weeksMarkup = weeks.map((week, index) => (
    <div role="row" key={index}>
      {week.map((day, dayIndex) => day && renderWeek(day, dayIndex))}
    </div>
  ));

  return (
    <div role="grid">
      <div>
        {`${monthName(month)}`} {year}
      </div>
      <div role="rowheader">{weekdays}</div>
      {weeksMarkup}
    </div>
  );
}

function noop() {}

function hoveringDateIsInRange(
  day: Date | null,
  range: Range,
  hoverEndDate: Date
) {
  if (day == null) {
    return false;
  }
  const { start, end } = range;
  return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
}

function getWeekdaysOrdered(weekStartsOn: Weekdays): Weekdays[] {
  const weekDays = [...WEEKDAYS];
  const restOfDays = weekDays.splice(weekStartsOn);
  return [...restOfDays, ...weekDays];
}
