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

export function dateIsInRange(day: Date | null, range: Range) {
  if (day == null) {
    return false;
  }
  var start = range.start,
    end = range.end;
  return Boolean(start && day > start && end && day < end);
}

export function dateIsSelected(day: Date | null, range: Range) {
  if (day == null) {
    return false;
  }
  var start = range.start,
    end = range.end;
  return Boolean(
    (start && isSameDay(start, day)) || (end && isSameDay(end, day))
  );
}

export function getNewRange(range: Range | undefined, selected: Date) {
  if (range == null) {
    return { start: selected, end: selected };
  }
  var start = range.start,
    end = range.end;
  if (end && (isDateAfter(start, end) || isDateBefore(start, end))) {
    return { start: selected, end: selected };
  }
  if (start) {
    if (isDateBefore(selected, start)) {
      return { start: selected, end: selected };
    }
    return { start: start, end: selected };
  }
  if (end) {
    if (isDateBefore(selected, end)) {
      return { start: selected, end: end };
    }
    return { start: start || end, end: selected };
  }
  return { start: selected, end: selected };
}
