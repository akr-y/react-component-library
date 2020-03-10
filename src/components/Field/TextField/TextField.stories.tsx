import React, { useState } from 'react';
import { TextField } from './TextField';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 400px;
`;

export default { title: 'TextField' };

export const defaultTextField = () => {
  const [text, setText] = useState('');
  return (
    <Container>
      <TextField
        label="Label"
        labelHidden
        value={text}
        placeholder={'placeholder'}
        onChange={(v: string) => {
          setText(v);
        }}
      />
    </Container>
  );
};
