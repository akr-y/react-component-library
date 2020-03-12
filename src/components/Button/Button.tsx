import React from 'react';
import { StyledButton, StyledAnchor } from './styled';

export type Size = 'slim' | 'medium' | 'large';
export type TextAlign = 'left' | 'right' | 'center';

export interface ButtonProps {
  /** The content to display inside the button */
  children?: string | string[] | React.ReactNode;
  /** A destination to link to, rendered in the href attribute of a link */
  url?: string;
  /** A unique identifier for the button */
  id?: string;
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
  /** Indicates a dangerous or potentially negative action */
  destructive?: boolean;
  /** Disables the button, disallowing merchant interaction */
  disabled?: boolean;
  /** Replaces button text with a spinner while a background action is being performed */
  loading?: boolean;
  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: Size;
  /** Changes the inner text alignment of the button */
  textAlign?: TextAlign;
  /** Gives the button a subtle alternative to the default button styling, appropriate for certain backdrops */
  outline?: boolean;
  /** Gives the button the appearance of being pressed */
  pressed?: boolean;
  /** Allows the button to grow to the width of its container */
  fullWidth?: boolean;
  /** Allows the button to submit a form */
  submit?: boolean;
  /** Renders a button that looks like a link */
  plain?: boolean;
  /** Makes `plain` and `outline` Button colors (text, borders, icons) the same as the current text color. Also adds an underline to `plain` Buttons */
  monochrome?: boolean;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Callback when clicked */
  onClick?(): void;
  /** Callback when button becomes focussed */
  onFocus?(): void;
  /** Callback when focus leaves button */
  onBlur?(): void;
}

const DEFAULT_SIZE = 'medium';

export const Button = ({
  id,
  url,
  disabled,
  loading,
  children,
  accessibilityLabel,
  onClick,
  onFocus,
  onBlur,
  external,
  primary,
  outline,
  destructive,
  plain,
  monochrome,
  submit,
  size = DEFAULT_SIZE,
  textAlign,
  fullWidth,
  pressed,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const childMarkup = children ? <>{children}</> : null;

  const content = <>{childMarkup}</>;

  const type = submit ? 'submit' : 'button';

  let buttonMarkup;

  if (url) {
    buttonMarkup = isDisabled ? (
      <a id={id} aria-label={accessibilityLabel}>
        {content}
      </a>
    ) : (
      <StyledAnchor
        size={size}
        id={id}
        href={url}
        target={external ? '_blank' : ''}
        plain={plain}
        primary={primary}
        outline={outline}
        textAlign={textAlign}
        destructive={destructive}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={accessibilityLabel}
      >
        {content}
      </StyledAnchor>
    );
  } else {
    buttonMarkup = (
      <StyledButton
        size={size}
        id={id}
        type={type}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        plain={plain}
        primary={primary}
        outline={outline}
        textAlign={textAlign}
        destructive={destructive}
        disabled={isDisabled}
        aria-label={accessibilityLabel}
        role={loading ? 'alert' : undefined}
        aria-busy={loading ? true : undefined}
      >
        {content}
      </StyledButton>
    );
  }

  return buttonMarkup;
};
