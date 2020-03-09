import styled from 'styled-components';
import { darken } from 'polished';
import { Size, TextAlign } from './Button';
import {
  primary,
  secondary,
  danger,
  darker,
  lighter,
  base,
} from '../../utilities/color';

const RADIUS = '6px'; // ToDo: Should be provided from theme configure
const commonStyle = `
  border: unset;
  border-radius: ${RADIUS};
  padding: 10px 16px;
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

type ButtonProps = {
  size?: Size;
  align?: TextAlign;
  primary?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  loading?: boolean;
  plain?: boolean;
  outline?: boolean;
  textAlign?: TextAlign;
};

const background = (props: ButtonProps) => {
  if (props.plain) {
    return 'unset;';
  }
  if (props.destructive) {
    return `${danger};`;
  }
  if (props.primary) {
    return `${primary};`;
  }
  if (props.outline) {
    return `${base};`;
  }
  return `${base};`;
};

const fontColor = (props: ButtonProps) => {
  if (props.destructive) {
    return `#fff;`;
  }
  if (props.primary) {
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
  return `-4px -4px 14px ${lighter}, 4px 4px 14px ${darker}, -1px -1px 2px ${lighter}, 1px 1px 2px ${darker};`;
};

export const StyledButton = styled.button<ButtonProps>`
  ${commonStyle}
  box-shadow: ${props => boxShadow(props)}
  background: ${props => background(props)}
  color: ${props => fontColor(props)}
  &:hover {
    ${commonFeedbackStyle}
  }
`;

export const StyledAnchor = styled.a<ButtonProps>`
  ${commonStyle}
  box-shadow: ${props => boxShadow(props)}
  background: ${props => background(props)}
  color: ${props => fontColor(props)}
  text-decolation: none;
  &:hover {
    ${commonFeedbackStyle}
  }
`;
