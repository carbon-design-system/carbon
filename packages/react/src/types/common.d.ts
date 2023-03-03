import * as React from 'react';

/**
 * Returns all valid attributes and properties for a native HTML element.
 * T must be a valid html element (ex: 'td', 'div', 'button', 'form')
 */
export type ReactAttr<TElement extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[TElement];

export type ForwardRefProps<T, P = unknown> = React.PropsWithoutRef<
  React.PropsWithChildren<P>
> &
  React.RefAttributes<T>;
export type ForwardRefReturn<T, P = unknown> = React.ForwardRefExoticComponent<
  ForwardRefProps<T, P>
>;

/**
 * For "as" props.  Creates an "as" property that supports native html tags such as 'span', 'a', 'button' as well as custom functional components
 * All native props for the supplied html tag/component are inferred as part of the base component props, allowing us to use props like `href` on an 'a' element ect
 */
export type PolymorphicProps<Element extends React.ElementType, Props> = Props &
  Omit<React.ComponentProps<Element>, 'as'> & {
    as?: Element;
  };
