import React, { useState, useCallback } from 'react';
import { DatePicker } from './DatePicker';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 400px;
`;

export default { title: 'DatePicker' };

export const defaultDatePicker = () => {
  const [days, setDays] = useState<Date[]>([new Date('2020-02-05 00:00:00')]);
  const [{ month, year }, setDate] = useState({
    month: 1,
    year: 2018,
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );
  const handler = (d: Date[]) => {
    setDays(d);
  };
  return (
    <Container>
      <DatePicker
        month={month}
        year={year}
        selected={days}
        onMonthChange={handleMonthChange}
        onChange={d => handler(d)}
      />
    </Container>
  );
};
