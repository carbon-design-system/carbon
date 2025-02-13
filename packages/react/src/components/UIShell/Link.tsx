/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  ForwardedRef,
  type ElementType,
  type WeakValidationMap,
} from 'react';
import deprecate from '../../prop-types/deprecate';
import { PolymorphicRef } from '../../internal/PolymorphicProps';
import { PolymorphicProps } from '../../types/common';
import { HeaderMenuItemBaseProps } from './HeaderMenuItem';

// Note: Maybe we should use `as` instead of `element`? `as` appears to be
// standard and is used in other places in this project.

export interface LinkBaseProps {
  /**
   * @deprecated Use `as` instead
   */
  element?: undefined;
  ref?: ForwardedRef<ElementType>;
}

export type LinkProps<E extends React.ElementType> = PolymorphicProps<
  E,
  LinkBaseProps
>;

export interface LinkComponent {
  <E extends ElementType = 'a'>(
    props: LinkProps<E> | HeaderMenuItemBaseProps
  ): JSX.Element | null;
  displayName?: string;
  propTypes?: WeakValidationMap<LinkProps<any>>;
}

export const Link: LinkComponent = React.forwardRef(function LinkRenderFunction<
  E extends ElementType = 'a',
>(
  {
    element,
    as: BaseComponent,
    // Captured here to prevent it from being passed into the created element.
    // See https://github.com/carbon-design-system/carbon/issues/3970
    isSideNavExpanded: _isSideNavExpanded,
    ...rest
  }: LinkProps<E>,
  ref: PolymorphicRef<E>
) {
  const BaseComponentAsAny = (BaseComponent ?? element ?? 'a') as any;
  return <BaseComponentAsAny ref={ref} {...rest} />;
}) as LinkComponent;
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
