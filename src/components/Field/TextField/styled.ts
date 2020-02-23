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
  color: ${darken(0.1, COLOR_DARKER)};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${darken(0.1, COLOR_BASE)};
  }
  :-ms-input-placeholder {
     color: ${darken(0.1, COLOR_BASE)};
  }
  padding: 8px;
  width: 100%;
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

export const Label = styled.p`
  color: ${darken(0.1, COLOR_DARKER)};
  font-size: 14px;
  margin: 0;
`;

export const Container = styled.div`
  width: auto;
`;
