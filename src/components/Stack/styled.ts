import styled from 'styled-components';

const BASE_SPACING = 14;

type Distribution =
  | 'leading'
  | 'trailing'
  | 'center'
  | 'equalSpacing'
  | 'fill'
  | 'fillEvenly';
type Alignment = 'leading' | 'trailing' | 'center' | 'baseline' | 'fill';

const alignmentMap = (alignment: Alignment) => {
  switch (alignment) {
    case 'leading':
      return 'align-items: flex-start';
    case 'trailing':
      return 'align-items: flex-end';
    case 'center':
      return 'align-items: center';
    case 'fill':
      return 'align-items: stretch';
    case 'baseline':
      return 'align-items: baseline';
    default:
      break;
  }
};
const distributionMap = (distribution: Distribution) => {
  switch (distribution) {
    case 'leading':
      return 'justify-content: flex-start';
    case 'trailing':
      return 'justify-content: flex-end';
    case 'center':
      return 'justify-content: center';
    case 'fill':
      return 'flex: 1 1 auto';
    case 'equalSpacing':
      return 'justify-content: space-between';
    case 'fillEvenly':
      return 'flex: 1 1 auto';
    default:
      break;
  }
};

export const Stack = styled.div<{
  noWrap?: boolean;
  distribution?: Distribution;
  alignment?: Alignment;
  vertical?: boolean;
  fill?: boolean;
}>`
  align-items: stretch;
  display: flex;
  ${props => (props.alignment ? alignmentMap(props.alignment) : null)};
  ${props => (props.distribution ? distributionMap(props.distribution) : null)};
  flex-wrap: ${props => (props.noWrap ? 'nowrap' : 'wrap')};
  margin-top: ${-1 * BASE_SPACING}px;
  margin-left: ${-1 * BASE_SPACING}px;
  flex-direction: ${props => (props.vertical ? 'column' : 'row')};
  > .Item {
    margin-top: ${BASE_SPACING}px;
    margin-left: ${BASE_SPACING}px;
    max-width: 100%;
  }
`;
