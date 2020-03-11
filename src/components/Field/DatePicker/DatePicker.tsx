import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeftMinor, ArrowRightMinor } from '@shopify/polaris-icons';
import {
  Range,
  Months,
  Year,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
  Weekdays,
} from '@shopify/javascript-utilities/dates';
import { DatePickerContainer, Header, MonthContainer } from './styled';
import { Button } from '../../Button';
import { monthName } from './utilities';
import { Month } from './components';
export { Range, Months, Year };

export interface DatePickerProps {
  /** ID for the element */
  id?: string;
  /** The selected date or range of dates */
  selected?: Date[];
  /** The month to show */
  month: Months;
  /** The year to show */
  year: Year;
  /** Allow a range of dates to be selected */
  allowRange?: boolean;
  /** Disable selecting dates before this. */
  disableDatesBefore?: Date;
  /** Disable selecting dates after this. */
  disableDatesAfter?: Date;
  /** The selection can span multiple months */
  multiMonth?: boolean;
  /** First day of week. Sunday by default */
  weekStartsOn?: Weekdays;
  /** Callback when date is selected. */
  onChange?(date: Date[]): void;
  /** Callback when month is changed. */
  onMonthChange?(month: Months, year: Year): void;
}

export const DatePicker = ({
  id,
  selected,
  month,
  year,
  allowRange,
  multiMonth,
  disableDatesBefore,
  disableDatesAfter,
  weekStartsOn = Weekdays.Sunday,
  onMonthChange,
  onChange = noop,
}: DatePickerProps) => {
  // const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);
  const [focusDate, setFocusDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setFocusDate(undefined);
  }, [selected]);

  const handleFocus = useCallback((date: Date) => {
    setFocusDate(date);
  }, []);

  const handleDateSelection = useCallback(
    (dates: Date[]) => {
      console.log(dates);
      onChange(dates);
    },
    [onChange]
  );

  const handleMonthChangeClick = useCallback(
    (month: Months, year: Year) => {
      if (!onMonthChange) {
        return;
      }
      setFocusDate(undefined);
      onMonthChange(month, year);
    },
    [onMonthChange]
  );

  const showNextYear = getNextDisplayYear(month, year);
  const showNextMonth = getNextDisplayMonth(month);

  const showNextToNextYear = getNextDisplayYear(showNextMonth, showNextYear);
  const showNextToNextMonth = getNextDisplayMonth(showNextMonth);

  const showPreviousYear = getPreviousDisplayYear(month, year);
  const showPreviousMonth = getPreviousDisplayMonth(month);

  const previousMonthName = monthName(showPreviousMonth);
  const nextMonth = multiMonth
    ? monthName(showNextToNextMonth)
    : monthName(showNextMonth);
  const nextYear = multiMonth ? showNextToNextYear : showNextYear;

  const monthIsSelected = useMemo(() => selected, [selected]);

  const secondDatePicker = multiMonth ? (
    <Month
      onFocus={handleFocus}
      focusedDate={focusDate}
      month={showNextMonth}
      year={showNextYear}
      selected={monthIsSelected}
      onChange={handleDateSelection}
      disableDatesBefore={disableDatesBefore}
      disableDatesAfter={disableDatesAfter}
      allowRange={allowRange}
      weekStartsOn={weekStartsOn}
    />
  ) : null;

  return (
    <DatePickerContainer id={id}>
      <Header>
        <Button
          plain
          accessibilityLabel={`${previousMonthName} / ${showPreviousYear}`}
          onClick={() =>
            handleMonthChangeClick(showPreviousMonth, showPreviousYear)
          }
        >
          ←
        </Button>
        <Button
          plain
          accessibilityLabel={`${nextMonth} / ${nextYear}`}
          onClick={() => handleMonthChangeClick(showNextMonth, showNextYear)}
        >
          →
        </Button>
      </Header>
      <MonthContainer>
        <Month
          onFocus={handleFocus}
          focusedDate={focusDate}
          month={month}
          year={year}
          selected={selected}
          onChange={handleDateSelection}
          disableDatesBefore={disableDatesBefore}
          disableDatesAfter={disableDatesAfter}
          allowRange={allowRange}
          weekStartsOn={weekStartsOn}
        />
        {secondDatePicker}
      </MonthContainer>
    </DatePickerContainer>
  );
};

function noop() {}
