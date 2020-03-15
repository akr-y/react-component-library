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
  colorMap,
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

const stateString = (props: ButtonProps) => {
  if (props.primary) return 'primary';
  if (props.secondary) return 'secondary';
  if (props.destructive) return 'destructive';
  if (props.disabled) return 'disabled';
};

const rippleStyle = (color?: string) => `

  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, ${darken(
      0.1,
      color || darker
    )} 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10,10);
    opacity: 0;
    transition: transform .5s, opacity 1s;
  }

  &:active:after {
    transform: scale(0,0);
    opacity: .2;
    transition: 0s;
  }
`;
const styleWithProps = (props: ButtonProps) => `
  background: ${background(props)}
  border: unset;
  border-radius: ${RADIUS};
  box-shadow: ${boxShadow(props)}
  color: ${fontColor(props)};
  cursor: pointer;
  font-size: 16px;
  font-weight: normal;
  outline: unset;
  padding: ${paddingSize(props.size)};
  pointer-events: ${props.disabled ? ' none' : 'unset'};
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
  
  ${rippleStyle(stateString(props) ? colorMap(stateString(props)) : undefined)}
`;

const styleFeedbackWithProps = (props: ButtonProps) => `
  box-shadow: ${
    props.pressed
      ? `
      0px 0px 0px ${darker} inset, 0 0 0 ${lighter} inset,
        -8px -8px 20px ${lighter}, 8px 8px 20px ${darker};`
      : `-8px -8px 20px ${lighter}, 8px 8px 20px ${darker}, -1px -1px 0px ${lighter}, 1px 1px 0px ${darker};`
  }
  transition-duration: 0.2s;
  transition-timing-function: ease-oun;
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
  ${props => styleWithProps(props)}
  &:hover {
    ${props => styleFeedbackWithProps(props)}
  }
`;

export const StyledAnchor = styled.a<ButtonProps>`
  ${props => styleWithProps(props)}
  text-decolation: none;
  &:hover {
    ${props => styleFeedbackWithProps(props)}
  }
`;
