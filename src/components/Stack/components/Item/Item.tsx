import React from 'react';
import styled from '@emotion/styled';

interface Props {
  fill: number;
}

const BASE_SPACING = 14;
const ItemComponent = styled.div<Props>`
  flex: ${props => (props.fill ? '1 1 auto' : '0 0 auto')};
  min-width: 0;
  margin-top: ${BASE_SPACING}px;
  margin-left: ${BASE_SPACING}px;
  max-width: 100%;
`;

export interface ItemProps {
  /** Elements to display inside item */
  children?: React.ReactNode;
  /** Fill the remaining horizontal space in the stack with the item  */
  fill?: boolean;
  /**
   * @default false
   */
}

export function Item({ children, fill }: ItemProps) {
  return <ItemComponent fill={fill ? 1 : 0}>{children}</ItemComponent>;
}
