import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Error, Key } from '../../../types';
import { Input, TextArea } from './styled';

type Type =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week'
  | 'currency';

type Alignment = 'left' | 'center' | 'right';

interface NonMutuallyExclusiveProps {
  /** Text to display before value */
  prefix?: React.ReactNode;
  /** Text to display after value */
  suffix?: React.ReactNode;
  /** Hint text to display */
  placeholder?: string;
  /** Initial value for the input */
  value?: string;
  /** Additional hint text to display */
  helpText?: React.ReactNode;
  /** Label for the input */
  label: string;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Show a clear text button in the input */
  clearButton?: boolean;
  /** Disable editing of the input */
  readOnly?: boolean;
  /** Automatically focus the input */
  autoFocus?: boolean;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Allow for multiple lines of input */
  multiline?: boolean | number;
  /** Error to display beneath the label */
  error?: Error | boolean;
  /** Determine type of input */
  type?: Type;
  /** Name of the input */
  name?: string;
  /** ID for the input */
  id?: string;
  /** Defines a specific role attribute for the input */
  role?: string;
  /** Limit increment value for numeric and date-time inputs */
  step?: number;
  /** Enable automatic completion by the browser */
  autoComplete?: boolean | string;
  /** Mimics the behavior of the native HTML attribute, limiting the maximum value */
  max?: number | string;
  /** Maximum character length for an input */
  maxLength?: number;
  /** Mimics the behavior of the native HTML attribute, limiting the minimum value */
  min?: number | string;
  /** Minimum character length for an input */
  minLength?: number;
  /** A regular expression to check the value against */
  pattern?: string;
  /** Indicate whether value should have spelling checked */
  spellCheck?: boolean;
  /** Indicates the id of a component owned by the input */
  ariaOwns?: string;
  /** Indicates the id of a component controlled by the input */
  ariaControls?: string;
  /** Indicates the id of a related component’s visually focused element to the input */
  ariaActiveDescendant?: string;
  /** Indicates what kind of user input completion suggestions are provided */
  ariaAutocomplete?: string;
  /** Indicates whether or not the character count should be displayed */
  showCharacterCount?: boolean;
  /** Determines the alignment of the text in the input */
  align?: Alignment;
  /** Callback when clear button is clicked */
  onClearButtonClick?(id: string): void;
  /** Callback when value is changed */
  onChange?(value: string, id: string): void;
  /** Callback when input is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

export type TextFieldProps = NonMutuallyExclusiveProps &
  (
    | { readOnly: true }
    | { disabled: true }
    | { onChange(value: string, id: string): void }
  );

export function TextField({
  prefix,
  suffix,
  placeholder,
  value,
  helpText,
  label,
  labelHidden,
  disabled,
  clearButton,
  readOnly,
  autoFocus,
  focused,
  multiline,
  error,
  type,
  name,
  id: idProp,
  role,
  step,
  autoComplete,
  max,
  maxLength,
  min,
  minLength,
  pattern,
  spellCheck,
  ariaOwns,
  ariaControls,
  ariaActiveDescendant,
  ariaAutocomplete,
  onClearButtonClick,
  onChange,
  onFocus,
  onBlur,
}: TextFieldProps) {
  const [height, setHeight] = useState<number | null>(null);
  const [focus, setFocus] = useState(Boolean(focused));

  const id = `TextField${new Date().getMilliseconds}`;

  const inputRef = useRef<HTMLElement>(null);
  const prefixRef = useRef<HTMLDivElement>(null);
  const suffixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input || focused === undefined) return;
    focused ? input.focus() : input.blur();
  }, [focused]);

  // Use a typeof check here as Typescript mostly protects us from non-stringy
  // values but overzealous usage of `any` in consuming apps means people have
  // been known to pass a number in, so make it clear that doesn't work.
  const normalizedValue = typeof value === 'string' ? value : '';
  const inputType = type === 'currency' ? 'text' : type;

  const prefixMarkup = prefix ? (
    <div id={`${id}Prefix`} ref={prefixRef}>
      {prefix}
    </div>
  ) : null;

  const suffixMarkup = suffix ? (
    <div id={`${id}Suffix`} ref={suffixRef}>
      {suffix}
    </div>
  ) : null;

  const clearButtonMarkup =
    clearButton && normalizedValue !== '' ? (
      <button
        type="button"
        onClick={handleClearButtonPress}
        disabled={disabled}
      >
        -
      </button>
    ) : null;

  const style = multiline && height ? { height } : null;

  const describedBy: string[] = [];
  if (error) {
    describedBy.push(`${id}Error`);
  }

  const labelledBy: string[] = [];

  if (prefix) {
    labelledBy.push(`${id}Prefix`);
  }

  if (suffix) {
    labelledBy.push(`${id}Suffix`);
  }

  const input = React.createElement(multiline ? TextArea : Input, {
    name,
    id,
    disabled,
    readOnly,
    role,
    autoFocus,
    'value': normalizedValue,
    placeholder,
    onFocus,
    onBlur,
    'onKeyPress': handleKeyPress,
    style,
    'autoComplete': autoComplete,
    'onChange': handleChange,
    'ref': inputRef,
    min,
    max,
    step,
    minLength,
    maxLength,
    spellCheck,
    pattern,
    'type': inputType,
    'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined,
    'aria-labelledby': labelledBy.join(' '),
    'aria-invalid': Boolean(error),
    'aria-owns': ariaOwns,
    'aria-activedescendant': ariaActiveDescendant,
    'aria-autocomplete': ariaAutocomplete,
    'aria-controls': ariaControls,
  });

  return (
    <div onFocus={handleFocus} onBlur={handleBlur} onClick={handleClick}>
      {prefixMarkup}
      {input}
      {suffixMarkup}
      {clearButtonMarkup}
    </div>
  );

  function handleClearButtonPress() {
    onClearButtonClick && onClearButtonClick(id);
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    const { key, which } = event;
    const numbersSpec = /[\d.eE+-]$/;
    if (type !== 'number' || which === Key.Enter || numbersSpec.test(key)) {
      return;
    }
    event.preventDefault();
  }

  function containsAffix(target: HTMLElement | EventTarget) {
    return (
      target instanceof HTMLElement &&
      ((prefixRef.current && prefixRef.current.contains(target)) ||
        (suffixRef.current && suffixRef.current.contains(target)))
    );
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event.currentTarget.value, id);
  }

  function handleFocus({ target }: React.FocusEvent) {
    if (containsAffix(target)) {
      return;
    }
    setFocus(true);
  }

  function handleBlur() {
    setFocus(false);
  }

  function handleClick({ target }: React.MouseEvent) {
    if (containsAffix(target)) {
      return;
    }
    inputRef.current && inputRef.current.focus();
  }
}
