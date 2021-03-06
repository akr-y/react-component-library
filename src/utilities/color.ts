import { State } from '../types';

export const base = '#E0E5EC';
export const lighter = '#FFFFFF';
export const darker = '#7489a9';
export const primary = '#3C00AB';
export const danger = '#E92D48';
export const warning = '#F96552';
export const secondary = '#191b32';
export const minor = '#c7d3e4';

export const colorMap: (state?: State) => string = (state?: State) => {
  switch (state) {
    case 'primary':
      return primary;
    case 'destructive':
      return danger;
    case 'secondary':
      return secondary;
    default:
      return darker;
  }
};
