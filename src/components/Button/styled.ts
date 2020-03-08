import styled from 'styled-components';
import { darken } from 'polished';
import { Size, TextAlign } from './Button';

const RADIUS = '48px'; // ToDo: Should be provided from theme configure
const COLOR_BASE = '#E0E5EC';
const COLOR_LIGHTER = '#FFFFFF';
const COLOR_DARKER = '#A3B1C6';
const COLOR_PRIMARY = '#07f';

const commonStyle = `
  border: unset;
  border-radius: ${RADIUS};
  padding: 10px 16px;
  background-color: ${COLOR_BASE};
  box-shadow: -6px -6px 16px ${COLOR_LIGHTER}, 6px 6px 16px ${COLOR_DARKER}, -1px -1px 2px ${COLOR_LIGHTER}, 1px 1px 2px ${COLOR_DARKER};
  color: ${darken(0.1, COLOR_DARKER)};
  font-size: 16px;
  font-weight: normal;
  outline: unset;
  transform: translateY(0px);
  transition: 0.3s ease-out;
`;

const commonFeedbackStyle = `
  box-shadow: -8px -8px 20px ${COLOR_LIGHTER}, 8px 8px 20px ${COLOR_DARKER}, -1px -1px 0px ${COLOR_LIGHTER}, 1px 1px 0px ${COLOR_DARKER};
  transform: translateY(-2px);
  transition: 0.3s ease-in;
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
    return `${COLOR_DARKER};`;
  }
  if (props.primary) {
    return `${COLOR_PRIMARY};`;
  }
  if (props.outline) {
    return `${COLOR_BASE};`;
  }
  return `${COLOR_BASE};`;
};

const fontColor = (props: ButtonProps) => {
  if (props.destructive) {
    return `#fff;`;
  }
  if (props.primary) {
    return `#fff;`;
  }
  return `${darken(0.1, COLOR_DARKER)};`;
};

export const StyledButton = styled.button<ButtonProps>`
  ${commonStyle}
  background: ${props => background(props)}
  color: ${props => fontColor(props)}
  &:hover {
    ${commonFeedbackStyle}
  }
`;

export const StyledAnchor = styled.a<ButtonProps>`
  ${commonStyle}
  background: ${props => background(props)}
  color: ${props => fontColor(props)}
  text-decolation: none;
  &:hover {
    ${commonFeedbackStyle}
  }
`;
