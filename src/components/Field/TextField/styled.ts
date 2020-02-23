import styled from 'styled-components';
import { darken } from 'polished';

const RADIUS = '10px'; // ToDo: Should be provided from theme configure
const COLOR_BASE = '#E0E5EC';
const COLOR_LIGHTER = '#FFFFFF';
const COLOR_DARKER = '#A3B1C6';

const commonStyle = `
  border: unset;
  border-radius: 6px;
  box-shadow: 1px 1px 3px ${COLOR_DARKER} inset, -1px -1px 3px ${COLOR_LIGHTER} inset,
    -1px -1px 1px ${COLOR_DARKER}, 1px 1px 1px ${COLOR_LIGHTER};
  font-size: 16px;
  padding: 8px;
  &:focus {
    outline: unset;
  }
`;

export const Input = styled.input`
  ${commonStyle}
`;

export const TextArea = styled.textarea`
  ${commonStyle}
`;
