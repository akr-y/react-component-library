import React, { memo, NamedExoticComponent } from 'react';
import { elementChildren, wrapWithComponent } from '../../utilities/components';
import { Stack as StackComponent } from './styled';
import { Item } from './components';

type Spacing = 'extraTight' | 'tight' | 'loose' | 'extraLoose' | 'none';

type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

type Distribution =
  | 'equalSpacing'
  | 'leading'
  | 'trailing'
  | 'center'
  | 'fill'
  | 'fillEvenly';

export interface StackProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
  wrap?: boolean;
  /** Stack the elements vertically */
  vertical?: boolean;
  /** Adjust spacing between elements */
  spacing?: Spacing;
  /** Adjust vertical alignment of elements */
  alignment?: Alignment;
  /** Adjust horizontal alignment of elements */
  distribution?: Distribution;
}

export const Stack = memo(function Stack({
  children,
  vertical,
  distribution,
  alignment,
  wrap,
}: StackProps) {
  const itemMarkup = elementChildren(children).map((child, index) => {
    const props = { key: index };
    return wrapWithComponent(child, Item, props);
  });
  return (
    <StackComponent
      vertical={vertical || false}
      alignment={alignment}
      distribution={distribution}
      noWrap={wrap || false}
    >
      {itemMarkup}
    </StackComponent>
  );
}) as NamedExoticComponent<StackProps> & {
  Item: typeof Item;
};

Stack.Item = Item;
