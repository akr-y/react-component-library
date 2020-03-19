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
  return (
    <Container>
      <Stack vertical>
        <Stack.Item>
          <TextField
            label="Label"
            value={text}
            placeholder={'placeholder'}
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
      </Stack>
    </Container>
  );
};
