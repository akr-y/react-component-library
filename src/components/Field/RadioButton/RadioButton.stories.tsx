import React, { useState, useCallback } from 'react';
import { RadioButton } from './RadioButton';
import { Stack } from '../../Stack';
import styled from '@emotion/styled';

export default { title: 'RadioButton' };

export const defaultRadioButton = () => {
  const [value, setValue] = useState('disabled');

  const handleChange = useCallback((_checked, newValue) => {
    console.log(_checked);
    console.log(newValue);
    setValue(newValue);
  }, []);
  return (
    <Stack>
      <RadioButton
        label="Yes"
        id="yes"
        value={'yes'}
        name="radiobuttonsample"
        onChange={handleChange}
      />
      <RadioButton
        label="Maybe"
        id="maybe"
        value={'maybe'}
        name="radiobuttonsample"
        onChange={handleChange}
      />
      <RadioButton
        label="NO!"
        id="no"
        value={'no'}
        name="radiobuttonsample"
        onChange={handleChange}
      />
    </Stack>
  );
};
