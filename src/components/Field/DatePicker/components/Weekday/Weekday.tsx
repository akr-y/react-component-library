import React, { memo } from 'react';
import { Weekdays } from '@shopify/javascript-utilities/dates';
// import {classNames} from '../../../../utilities/css';

import { WeekdayStyled } from '../../styled';

export interface WeekdayProps {
  label: Weekdays;
  title: string;
  current: boolean;
}

export const Weekday = memo(function Weekday({
  label,
  title,
  current,
}: WeekdayProps) {
  return (
    <WeekdayStyled aria-label={Weekdays[label]} current={current}>
      {title.slice(0, 3).toUpperCase()}
    </WeekdayStyled>
  );
});
