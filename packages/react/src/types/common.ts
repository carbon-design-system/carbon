import * as React from 'react';

export type ReactAttr<T = HTMLElement> = React.HTMLAttributes<T>;

export type ForwardRefProps<T, P = unknown> = React.PropsWithoutRef<
  React.PropsWithChildren<P>
> &
  React.RefAttributes<T>;
export type ForwardRefReturn<T, P = unknown> = React.ForwardRefExoticComponent<
  ForwardRefProps<T, P>
>;

/**
 * For "as" props.  Creates an "as" property that supports native html tags such as 'span', 'a', 'button' as well as custom functional components
 * All native props for the supplied html tag/component are inferred as part of the base component props, allowing us to use props like `href` on an 'a' element etc
 */
export type PolymorphicProps<Element extends React.ElementType, Props> = Props &
  Omit<React.ComponentProps<Element>, 'as'> & {
    as?: Element;
  };

export interface InternationalProps<
  MID = string,
  ARGS = Record<string, unknown>
> {
  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice.
   */
  translateWithId?(messageId: MID, args?: ARGS): string;
}
