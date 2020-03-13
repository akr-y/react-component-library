import styled from '@emotion/styled';
import { darken } from 'polished';
import { Size, TextAlign } from './Button';
import {
  primary,
  minor,
  danger,
  darker,
  lighter,
  secondary,
  base,
} from '../../utilities/color';

type ButtonProps = {
  size?: Size;
  align?: TextAlign;
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  loading?: boolean;
  plain?: boolean;
  pressed?: boolean;
  outline?: boolean;
  textAlign?: TextAlign;
};
const RADIUS = '6px'; // ToDo: Should be provided from theme configure
const commonStyle = (props: ButtonProps) => `
  border: unset;
  border-radius: ${RADIUS};
  padding: ${paddingSize(props.size)};
  box-shadow: ${boxShadow(props)}
  background: ${background(props)}
  color: ${fontColor(props)};
  pointer-events: ${props.disabled ? ' none' : 'unset'};
  font-size: 16px;
  font-weight: normal;
  outline: unset;
  transition-duration: 0.5s;
  transition-timing-function: ease-in;
`;

const commonFeedbackStyle = `
  box-shadow: -8px -8px 20px ${lighter}, 8px 8px 20px ${darker}, -1px -1px 0px ${lighter}, 1px 1px 0px ${darker};
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(.15,2.1,.5,.60);
`;

const paddingSize = (s?: Size) => {
  switch (s) {
    case 'slim':
      return '4px 8px;';
    case 'large':
      return '16px 24px;';
    default:
      return '10px 16px;';
  }
};

const background = (props: ButtonProps) => {
  if (props.disabled) {
    return `${minor};`;
  }
  if (props.plain) {
    return 'unset;';
  }
  if (props.destructive) {
    return `${danger};`;
  }
  if (props.primary) {
    return `${primary};`;
  }
  if (props.secondary) {
    return `${secondary};`;
  }
  if (props.outline) {
    return `${base};`;
  }
  return `${base};`;
};

const fontColor = (props: ButtonProps) => {
  if (props.disabled) {
    return `${darker};`;
  }
  if (props.destructive || props.primary || props.secondary) {
    return `#fff;`;
  }
  return `${darken(0.1, darker)};`;
};

const boxShadow = (props: ButtonProps) => {
  if (props.plain) {
    return 'unset;';
  }
  if (props.destructive) {
    return `-4px -4px 14px ${lighter}, 4px 4px 14px ${darker}, -1px -1px 2px ${lighter}, 1px 1px 2px ${darker};`;
  }
  if (props.primary) {
    return `-4px -4px 14px ${lighter}, 4px 4px 14px ${darker}, -1px -1px 2px ${lighter}, 1px 1px 2px ${darker};`;
  }
  if (props.outline) {
    return `-1px -1px 1px ${lighter}, 1px 1px 1px ${darker};`;
  }
  if (props.pressed) {
    return `
    1px 1px 3px ${darker} inset, -1px -1px 3px ${lighter} inset,
      -1px -1px 1px ${darker}, 1px 1px 1px ${lighter};`;
  }
  if (props.disabled) {
    return `unset;`;
  }
  return `-4px -4px 14px ${lighter}, 4px 4px 14px ${darker}, -1px -1px 2px ${lighter}, 1px 1px 2px ${darker};`;
};

export const StyledButton = styled.button<ButtonProps>`
  ${props => commonStyle(props)}
  &:hover {
    ${commonFeedbackStyle}
  }
`;

export const StyledAnchor = styled.a<ButtonProps>`
  ${props => commonStyle(props)}
  text-decolation: none;
  &:hover {
    ${commonFeedbackStyle}
  }
`;
