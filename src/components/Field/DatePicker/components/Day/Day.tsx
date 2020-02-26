import React, { useRef, useEffect, memo } from 'react';
import { Months, isSameDay } from '@shopify/javascript-utilities/dates';
import { DayStyled, EmptyDay } from '../../styled';
// import styles from '../../DatePicker.scss';

export interface DayProps {
  focused?: boolean;
  day?: Date;
  selected?: boolean;
  inRange?: boolean;
  inHoveringRange?: boolean;
  disabled?: boolean;
  lastDayOfMonth?: any;
  onClick?(day: Date): void;
  onHover?(day?: Date): void;
  onFocus?(day: Date): void;
}

export const Day = memo(function Day({
  day,
  focused,
  onClick,
  onHover = noop,
  onFocus = noop,
  selected,
  disabled,
  lastDayOfMonth,
}: DayProps) {
  const dayNode = useRef<HTMLButtonElement>(null);
  const hoverValue = lastDayOfMonth || day;

  useEffect(() => {
    if (focused && dayNode.current) {
      dayNode.current.focus();
    }
  }, [focused]);

  if (!day) {
    return <EmptyDay></EmptyDay>;
  }
  const handleClick = onClick && !disabled ? onClick.bind(null, day) : noop;
  const today = isSameDay(new Date(), day);
  const date = day.getDate();
  const tabIndex =
    (focused || selected || today || date === 1) && !disabled ? 0 : -1;
  const ariaLabel = [
    `${today ? 'today' : ''}`,
    `${Months[day.getMonth()]} `,
    `${date} `,
    `${day.getFullYear()}`,
  ].join('');

  return (
    <DayStyled
      onFocus={() => onFocus(day)}
      type="button"
      ref={dayNode}
      tabIndex={tabIndex}
      onMouseOver={() => onHover(hoverValue)}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-selected={selected}
      selected={selected}
      aria-disabled={disabled}
      role="gridcell"
    >
      {date}
    </DayStyled>
  );
});

function noop() {}
