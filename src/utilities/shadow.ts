import { darker, lighter } from '../utilities/color';

export const shadowDefault = `-4px -4px 14px ${lighter}, 4px 4px 14px ${darker}, -1px -1px 2px ${lighter}, 1px 1px 2px ${darker}`;
export const shadowLite = `-1px -1px 1px ${lighter}, 1px 1px 1px ${darker}`;
export const shadowInset = `1px 1px 3px ${darker} inset, -1px -1px 3px ${lighter} inset,
-1px -1px 1px ${darker}, 1px 1px 1px ${lighter}`;
export const shadowScaled = `-8px -8px 20px ${lighter}, 8px 8px 20px ${darker}, -1px -1px 0px ${lighter}, 1px 1px 0px ${darker}`;
