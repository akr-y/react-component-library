import styled from '@emotion/styled';
import { darken } from 'polished';
import { shadowInset, shadowDefault } from '../../../utilities/shadow';
import { darker, primary, base, lighter } from '../../../utilities/color';
// ToDo: Should be provided from theme configure

const commonStyle = `
  border: unset;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: ${shadowInset};
  color: ${darken(0.1, darker)};
  font-size: 16px;
  padding: 8px;
  transition: 0.3s;
  width: 100%;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${darken(0.1, base)};
  }
  :-ms-input-placeholder {
     color: ${darken(0.1, base)};
  }
  &:focus {
    outline: unset;
    box-shadow: 0 0 0 ${darker} inset, 0 0 0 ${lighter} inset, 0 1px 3px 1px ${primary};
  }
`;

export const Input = styled.input`
  ${commonStyle}
`;

export const TextArea = styled.textarea`
  ${commonStyle}
`;

export const Label = styled.p`
  color: ${darken(0.1, darker)};
  font-size: 14px;
  margin: 0;
`;

export const Container = styled.div`
  width: auto;
`;
