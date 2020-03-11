import React from 'react';
import { Error } from '../../../types';
// import styles from './Choice.scss';

export interface ChoiceProps {
  /** A unique identifier for the choice */
  id: string;
  /**	Label for the choice */
  label: React.ReactNode;
  /** Whether the associated form control is disabled */
  disabled?: boolean;
  /** Display an error message */
  error?: Error | boolean;
  /** Visually hide the label */
  labelHidden?: boolean;
  /**  Content to display inside the choice */
  children?: React.ReactNode;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Callback when clicked */
  onClick?(): void;
  /** Callback when mouse over */
  onMouseOver?(): void;
  /** Callback when mouse out */
  onMouseOut?(): void;
}

export function Choice({
  id,
  label,
  disabled,
  error,
  children,
  labelHidden,
  helpText,
  onClick,
  onMouseOut,
  onMouseOver,
}: ChoiceProps) {
  // const className = classNames(
  //   styles.Choice,
  //   labelHidden && styles.labelHidden,
  //   disabled && styles.disabled
  // );

  // Deleted
  // <span className={styles.Control}>{children}</span>
  // <span className={styles.Label}>{label}</span>

  const labelMarkup = (
    <label
      htmlFor={id}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <span>{children}</span>
      <span>{label}</span>
    </label>
  );

  // Deleted
  // className={styles.HelpText}
  const helpTextMarkup = helpText ? (
    <div id={helpTextID(id)}>{helpText}</div>
  ) : null;

  // Deleted
  // className={styles.Descriptions}
  const descriptionMarkup = helpTextMarkup ? <div>{helpTextMarkup}</div> : null;

  return descriptionMarkup ? (
    <div>
      {labelMarkup}
      {descriptionMarkup}
    </div>
  ) : (
    labelMarkup
  );
}

export function helpTextID(id: string) {
  return `${id}HelpText`;
}
