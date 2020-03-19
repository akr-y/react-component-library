import styled from '@emotion/styled';
import { darken } from 'polished';
import { shadowInset, shadowDefault } from '../../../utilities/shadow';
import {
  darker,
  primary,
  base,
  lighter,
  secondary,
} from '../../../utilities/color';

interface Props {
  disabled?: boolean;
}

const commonStyle = (props: Props) => `
  border: unset;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: ${
    props.disabled ? `0 0 0 1px ${darken(0.2, base)} inset` : shadowInset
  };
  background: ${props.disabled ? base : '#fff'};
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
    box-shadow: 0 0 0 ${darker} inset, 0 0 0 ${lighter} inset, 0 0 5px ${primary};
  }
`;

export const Input = styled.input`
  ${props => commonStyle(props)}
`;

export const TextArea = styled.textarea`
  ${props => commonStyle(props)}
`;

export const Label = styled.p`
  color: ${darken(0.3, darker)};
  font-size: 14px;
  margin: 0;
`;

export const Container = styled.label`
  width: auto;
`;
export const FieldContainer = styled.div`
  position: relative;
`;
