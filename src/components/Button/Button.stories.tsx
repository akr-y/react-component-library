import React from 'react';
import { Button } from './Button';
import { Stack } from '../Stack';

export default { title: 'Button' };

export const defaultButton = () => (
  <Stack>
    <Button>Text</Button>
    <Button primary>Text</Button>
    <Button destructive>Text</Button>
    <Button plain>Text</Button>
  </Stack>
);
