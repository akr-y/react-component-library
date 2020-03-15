import styled from '@emotion/styled';
import { lighten, darken } from 'polished';
import { base, tight, extraTight } from '../../../utilities/spacing';
import { primary, darker, secondary, lighter } from '../../../utilities/color';

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
export const WeeksContainer = styled.div`
  border-radius: 8px;
  box-shadow: 1px 1px 3px ${lighten(0.1, darker)}, -1px -1px 3px ${lighter};
  overflow: hidden;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: 4px 4px 10px ${lighten(0.1, darker)}, -4px -4px 10px ${lighter},
      -1px -1px 0px ${lighter}, 1px 1px 0px ${darker};
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

export const DayContainer = styled.div`
  position: relative;
  flex: 1 0 0%;
  width: ${100 / 7}%;
  margin: 0;
`;

export const DayStyled = styled.button<DayProps>`
  display: block;
  padding: ${tight}px;
  color: ${props => stateHandler(props, 'inherit', '#fff', darker)};
  background: ${props => stateHandler(props, 'transparent', secondary, '#ddd')};
  border: unset;
  outline: none;
  font-size: ${FONT_SIZE}px;
  font-weight: ${props => (props.today ? 700 : 400)};
  text-align: center;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  z-index: ${props => (props.selected ? ZINDEX_SELECTED : 1)};
  transition: 0.3s;
  position: relative;
  width: 100%;
  &:first {
    margin-left: 0;
  }
  &:hover {
    color: #fff;
    background: ${darken(0.15, darker)};
    border-color: ${primary};
  }
  &:focus {
    // box-shadow: inset 0 0 0 2px ${primary};
  }
`;

export const DayShadowLayer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  box-shadow: -4px -4px 12px ${lighter}, 4px 4px 12px ${darker},
    -1px -1px 0px ${lighter}, 1px 1px 0px ${darker};
  content: '';
  display: block;
  top: 0;
  left: 0;
  z-index: -2;
`;

export const EmptyDay = styled.div`
  display: block;
  flex: 1 0 0%;
  width: ${100 / 7}%;
  margin: 0;
  padding: ${tight}px;
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
