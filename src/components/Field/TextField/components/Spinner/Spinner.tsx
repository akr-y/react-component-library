import React from 'react';
import { CaretDownMinor, CaretUpMinor } from '@shopify/polaris-icons';
import { Icon } from '../../../../Icon';

export interface SpinnerProps {
  onChange(delta: number): void;
  onClick?(): void;
  onMouseDown(onChange: Function): void;
  onMouseUp(): void;
}

export function Spinner({
  onChange,
  onClick,
  onMouseDown,
  onMouseUp,
}: SpinnerProps) {
  function handleStep(step: number) {
    return () => onChange(step);
  }

  function handleMouseDown(onChange: Function) {
    return (event: React.MouseEvent) => {
      if (event.button !== 0) return;
      onMouseDown(onChange);
    };
  }

  return (
    <div onClick={onClick} aria-hidden>
      <div
        role="button"
        tabIndex={-1}
        onClick={handleStep(1)}
        onMouseDown={handleMouseDown(handleStep(1))}
        onMouseUp={onMouseUp}
      >
        <div>
          <Icon source={CaretUpMinor} />
        </div>
      </div>

      <div
        role="button"
        tabIndex={-1}
        onClick={handleStep(-1)}
        onMouseDown={handleMouseDown(handleStep(-1))}
        onMouseUp={onMouseUp}
      >
        <div>
          <Icon source={CaretDownMinor} />
        </div>
      </div>
    </div>
  );
}
