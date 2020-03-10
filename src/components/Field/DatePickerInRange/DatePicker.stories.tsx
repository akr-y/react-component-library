import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 400px;
`;

export default { title: 'DatePicker INRANGE' };

export const defaultDatePicker = () => {
  const [days, setDays] = useState([]);
  return (
    <Container>
      <DatePicker month={1} year={2020} onChange={d => console.log(d)} />
    </Container>
  );
};
