import {
  Range,
  Months,
  Weekdays,
  isSameDay,
  isDateAfter,
  isDateBefore,
} from '@shopify/javascript-utilities/dates';

export function monthName(month: Months) {
  switch (month) {
    case 0:
      return 'january';
    case 1:
      return 'february';
    case 2:
      return 'march';
    case 3:
      return 'april';
    case 4:
      return 'may';
    case 5:
      return 'june';
    case 6:
      return 'july';
    case 7:
      return 'august';
    case 8:
      return 'september';
    case 9:
      return 'october';
    case 10:
      return 'november';
    case 11:
      return 'december';
  }
}

export function weekdayName(weekday: Weekdays) {
  switch (weekday) {
    case 0:
      return 'sunday';
    case 1:
      return 'monday';
    case 2:
      return 'tuesday';
    case 3:
      return 'wednesday';
    case 4:
      return 'thursday';
    case 5:
      return 'friday';
    case 6:
      return 'saturday';
  }
}

export function dateIsInList(day: Date | null, dates: Date[]) {
  if (day == null) {
    return false;
  }

  return Boolean(dates.includes(day));
}

export function dateIsSelected(day: Date | null, dates: Date[]) {
  if (day == null) {
    return false;
  }
  return Boolean(dates.includes(day));
}
function arrayUnique(array: Date[]) {
  let i = 0;
  const length = array.length;
  for (i; i < length; ++i) {
    let j = i + 1;
    for (j; j < length; ++j) {
      if (array[i] === array[j]) array.splice(j--, 1);
    }
  }

  return array;
}

export function getNewRange(dates: Date[] | undefined, selected: Date) {
  if (dates == null) {
    return [selected];
  }
  return arrayUnique(dates.concat([selected]));
}
