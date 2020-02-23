import React, { useState } from 'react';
import { TextField } from './TextField';
import styled from 'styled-components';

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
        onChange={(v: string) => {
          setText(v);
        }}
      />
    </Container>
  );
};
