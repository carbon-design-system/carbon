/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { WeakValidationMap } from 'prop-types';
import React, { ForwardedRef, JSX, type ElementType } from 'react';
import deprecate from '../../prop-types/deprecate';
import { PolymorphicProps } from '../../types/common';
import { HeaderMenuItemBaseProps } from './HeaderMenuItem';

export interface LinkBaseProps {
  /**
   * @deprecated Use `as` instead
   */
  element?: ElementType | undefined;
  as?: ElementType | undefined;
  isSideNavExpanded?: boolean | undefined;
}

export type LinkProps<E extends ElementType = 'a'> = PolymorphicProps<
  E,
  LinkBaseProps
>;

export interface LinkComponent {
  <E extends ElementType = 'a'>(props: LinkProps<E>): JSX.Element | null;
  displayName?: string;
  propTypes?: WeakValidationMap<LinkProps<any>>;
}

// First define the component without generics
type LinkPropsWithoutRef = Omit<LinkProps<'a'>, 'ref'>;

const LinkBase = (
  {
    element,
    as: BaseComponent,
    // Captured here to prevent it from being passed into the created element.
    // See https://github.com/carbon-design-system/carbon/issues/3970
    isSideNavExpanded: _isSideNavExpanded,
    ...rest
  }: LinkPropsWithoutRef,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const BaseComponentAsAny = (BaseComponent ?? element ?? 'a') as any;
  return <BaseComponentAsAny ref={ref} {...rest} />;
};

// Use forwardRef with the non-generic function
const Link = React.forwardRef(LinkBase) as unknown as LinkComponent;

/**
 * Link is a custom component that allows us to supporting rendering elements
 * other than `a` in our markup. The goal is to allow users to support passing
 * in their own components to support use-cases like `react-router` or
 * `@reach/router`
 */

const LinkPropTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.elementType,

  /**
   * The base element to use to build the link. Defaults to `a`, can also accept
   * alternative tag names or custom components like `Link` from `react-router`.
   * @deprecated Use `as` instead
   *
   */
  element: deprecate(
    PropTypes.elementType,
    'The `element` prop for `Link` has been deprecated. Please use `as` ' +
      'instead. This will be removed in the next major release.'
  ),

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,
};

Link.displayName = 'Link';
Link.propTypes = LinkPropTypes;

export { LinkPropTypes };
export default Link;
