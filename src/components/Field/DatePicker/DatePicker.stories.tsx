import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
`;

export default { title: 'DatePicker' };

export const defaultDatePicker = () => {
  const [days, setDays] = useState<Date[]>([new Date('2020-02-05 00:00:00')]);
  const handler = (d: Date[]) => {
    console.log(d);
    setDays(d);
  };
  return (
    <Container>
      <DatePicker
        month={1}
        year={2020}
        selected={days}
        onChange={d => handler(d)}
      />
    </Container>
  );
};
