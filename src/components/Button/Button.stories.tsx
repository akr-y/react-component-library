import React from 'react';
import { Button } from './Button';
import { Stack } from '../Stack';

export default { title: 'Button' };

export const defaultButton = () => (
  <Stack>
    <Button>Default</Button>
    <Button primary>Primary</Button>
    <Button secondary>Secondary</Button>
    <Button destructive>Destructive</Button>
    <Button outline>Outine</Button>
    <Button plain>Plain</Button>
    <Button pressed>Pressed</Button>
    <Button disabled>Disabled</Button>
  </Stack>
);
