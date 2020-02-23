import React, { useState } from 'react';
import { TextField } from './TextField';

export default { title: 'TextField' };

export const defaultTextField = () => {
  const [text, setText] = useState('');
  return (
    <TextField
      label="Label"
      value={text}
      onChange={(v: string) => {
        setText(v);
      }}
    />
  );
};
