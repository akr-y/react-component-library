import React from 'react';
import { Stack } from './Stack';

export default { title: 'Stack' };

export const defaultStack = () => {
  return (
    <Stack>
      <Stack.Item fill>
        <p>Item 1 fill</p>
      </Stack.Item>
      <Stack.Item>
        <p>Item 2</p>
      </Stack.Item>
      <Stack.Item>
        <p>Item 3</p>
      </Stack.Item>
    </Stack>
  );
};
