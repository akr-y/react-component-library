import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { base, tight, extraTight } from '../../../utilities/spacing';
import { primary, darker } from '../../../utilities/color';

const FONT_SIZE = 12;
const ZINDEX_SELECTED = 30;

export const DatePickerContainer = styled.div`
  position: relative;
`;

export const MonthContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${-1 * base}px;
  margin-left: ${-1 * base}px;
`;

export const MonthStyled = styled.div<{
  current?: boolean;
}>`
  flex: 1 1 auto;
  margin-top: ${base}px;
  margin-left: ${base}px;
  max-width: calc(100% - ${base}px);
  min-width: 230px;
  font-weight: ${props => (props.current ? 700 : 400)};
`;

export const WeekStyled = styled.div`
  display: flex;
  margin-top: -1px;
  &:first {
    margin-top: 0;
  }
`;

export const WeekHeadings = styled.div`
  display: flex;
`;

type DayProps = {
  today?: boolean;
  selected?: boolean;
  disabled?: boolean;
};

const stateHandler = (
  props: DayProps,
  normal: string | number,
  selected: string | number,
  disabled: string | number
) => {
  if (props.selected) {
    return selected;
  }
  if (props.disabled) {
    return disabled;
  }
  return normal;
};

export const DayStyled = styled.button<DayProps>`
  display: block;
  flex: 1 0 0%;
  width: ${100 / 7}%;
  margin: 0;
  padding: ${tight}px;
  color: ${props => stateHandler(props, 'inherit', '#fff', darker)};
  background: ${props => stateHandler(props, 'transparent', primary, '#ddd')};
  border: ${props =>
    props.selected
      ? `1px solid ${darken(0.1, primary)}`
      : `1px solid ${darker}`};
  border-radius: 0;
  outline: none;
  font-size: ${FONT_SIZE}px;
  font-weight: ${props => (props.today ? 700 : 400)};
  text-align: center;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  z-index: ${props => (props.selected ? ZINDEX_SELECTED : 1)};
  margin-left: -1px;
  transition: 0.3s;
  &:first {
    margin-left: 0;
  }
  &:hover {
    color: #fff;
    background: ${lighten(0.15, primary)};
    border-color: ${primary};
  }
  &:focus {
    box-shadow: inset 0 0 0 2px ${primary};
  }
`;

export const EmptyDay = styled.div`
  display: block;
  flex: 1 0 0%;
  width: ${100 / 7}%;
  margin: 0;
  padding: ${tight}px;
  border: 1px solid ${darker};
  margin-left: -1px;
  &:first {
    margin-left: 0;
  }
`;

export const WeekdayStyled = styled.div<{
  current?: boolean;
}>`
  display: block;
  flex: 1 0 0%;
  padding: ${tight}px;
  background: transparent;
  font-size: ${FONT_SIZE}px;
  text-align: center;
  color: ${props =>
    props.current ? darken(0.3, darker) : darken(0.2, darker)};
  font-weight: ${props => (props.current ? 700 : 400)};
`;

export const Header = styled.div`
  position: absolute;
  top: ${base}px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.div`
  flex: 1 1 auto;
  color: ${darken(0.3, darker)};
  margin-top: 2px;
  padding-bottom: ${extraTight}px;
  text-align: center;
`;
