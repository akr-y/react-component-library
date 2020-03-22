import React, { useState } from 'react';
import { TextField } from './TextField';
import { Stack } from '../../Stack';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 400px;
`;

export default { title: 'TextField' };

export const defaultTextField = () => {
  const [text, setText] = useState('');
  const [textError, setTextError] = useState('Error Text');
  return (
    <Container>
      <Stack vertical>
        <Stack.Item>
          <TextField
            label="Label"
            value={text}
            placeholder={'placeholder'}
            helpText="Help text"
            onChange={(v: string) => {
              setText(v);
            }}
          />
        </Stack.Item>
        <Stack.Item>
          <TextField
            label="Label"
            value={'Disabled text'}
            disabled
            onChange={(v: string) => {
              setText(v);
            }}
          />
        </Stack.Item>
        <Stack.Item>
          <TextField
            label="Label"
            value={textError}
            error
            helpText="Help text"
            onChange={(v: string) => {
              setTextError(v);
            }}
          />
        </Stack.Item>
      </Stack>
    </Container>
  );
};
