import styled from 'styled-components';
import { darken } from 'polished';

const RADIUS = '10px'; // ToDo: Should be provided from theme configure
const COLOR_BASE = '#E0E5EC';
const COLOR_LIGHTER = '#FFFFFF';
const COLOR_DARKER = '#A3B1C6';

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

export const StyledButton = styled.button`
  ${commonStyle}
  &:hover {
    ${commonFeedbackStyle}
  }
`;

export const StyledAnchor = styled.a`
  ${commonStyle}
  text-decolation: none;
  &:hover {
    ${commonFeedbackStyle}
  }
`;
