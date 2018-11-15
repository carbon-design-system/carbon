import cx from 'classnames';
import React from 'react';

export function Grid({
  bleed,
  condensed,
  children,
  className: customClassName,
  hang,
  padding,
  ...rest
}) {
  const className = cx({
    'bx--grid': true,
    'bx--grid--bleed': bleed,
    'bx--grid--condensed': condensed,
    'bx--grid--padding': padding,
    'bx--grid--hang': hang,
  });
  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
}

export function Row({
  children,
  className: customClassName,
  condensed,
  ...rest
}) {
  const className = cx({
    'bx--row': true,
    'bx--row--condensed': condensed,
  });
  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
}

export function Column({
  auto,
  breakpoint,
  children,
  className: customClassName,
  offset,
  span,
  ...rest
}) {
  const infix = breakpoint ? `bx--col-${breakpoint}` : 'bx--col';
  const className = cx({
    [infix]: !breakpoint,
    [`${infix}-${span}`]: span !== undefined,
    [`${infix}--auto`]: auto !== undefined,
    [`bx--offset-${breakpoint}-${offset}`]: offset !== undefined,
    [customClassName]: customClassName,
  });

  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
}
