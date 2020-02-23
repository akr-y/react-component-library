import React from 'react';
import { IconProps } from '../../types';
// This is needed for the polaris
// styleguide to generate the props explorer
interface Props extends IconProps {}

export function Icon({ source, accessibilityLabel }: Props) {
  let contentMarkup: React.ReactNode;
  if (typeof source === 'function') {
    const SourceComponent = source;
    contentMarkup = <SourceComponent focusable="false" aria-hidden="true" />;
  } else if (source === 'placeholder') {
    contentMarkup = <div />;
  } else {
    contentMarkup = (
      <img
        src={`data:image/svg+xml;utf8,${source}`}
        alt=""
        aria-hidden="true"
      />
    );
  }

  return <span aria-label={accessibilityLabel}>{contentMarkup}</span>;
}
