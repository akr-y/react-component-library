import styled from '@emotion/styled';
import { darken } from 'polished';
import {
  shadowInset,
  shadowDefault,
  shadowErrorInset,
} from '../../../utilities/shadow';
import {
  darker,
  primary,
  base,
  lighter,
  secondary,
  danger,
} from '../../../utilities/color';

interface Props {
  disabled?: boolean;
  error?: boolean;
}

const boxShadow = (props: Props) => {
  if (props.disabled) {
    return `0 0 0 1px ${darken(0.2, base)} inset`;
  }
  if (props.error) {
    return shadowErrorInset;
  }
  return shadowInset;
};

const color = (props: Props) => {
  if (props.error) {
    return danger;
  }
  return darken(0.1, darker);
};

const placeholder = (props: Props) => {
  if (props.error) {
    return danger;
  }
  return darken(0.1, base);
};

const commonStyle = (props: Props) => `
  border: unset;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: ${boxShadow(props)};
  background: ${props.disabled ? base : '#fff'};
  color: ${color(props)};
  font-size: 16px;
  padding: 8px;
  transition: 0.3s;
  width: 100%;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${placeholder(props)};
  }
  :-ms-input-placeholder {
     color: ${placeholder(props)};
  }
  &:focus {
    outline: unset;
    box-shadow: ${
      props.error
        ? `0 0 0 ${danger} inset, 0 0 0 ${lighter} inset, 0 0 5px ${danger}`
        : `0 0 0 ${darker} inset, 0 0 0 ${lighter} inset, 0 0 5px ${primary}`
    };
  }
`;

export const Input = styled.input`
  ${props => commonStyle(props)}
`;

export const TextArea = styled.textarea`
  ${props => commonStyle(props)}
`;

export const Label = styled.p<Props>`
  color: ${props => (props.error ? danger : darken(0.3, darker))};
  transition: 0.3s;
  font-size: 14px;
  margin: 0;
`;

export const Container = styled.label`
  width: auto;
`;
export const FieldContainer = styled.div`
  position: relative;
`;

export const HelpText = styled.p<Props>`
  font-size: 12px;
  color: ${props => color(props)};
  margin: 3px 0 0;
`;
