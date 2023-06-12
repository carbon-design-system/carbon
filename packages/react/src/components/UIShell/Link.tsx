/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  type ElementType,
  type ForwardedRef,
  forwardRef,
  type WeakValidationMap,
  type Ref,
} from 'react';
import deprecate from '../../prop-types/deprecate';
import { type PolymorphicProps } from '../../types/common';

// Note: Maybe we should use `as` instead of `element`? `as` appears to be
// standard and is used in other places in this project.

type LinkBaseProps<E extends ElementType> = {
  /**
   * @deprecated Use `as` instead
   */
  element?: E | undefined;
  ref?: Ref<E>;
};

export type LinkProps<E extends ElementType> = PolymorphicProps<
  E,
  LinkBaseProps<E>
>;

function LinkRenderFunction<E extends ElementType = 'a'>(
  {
    element,
    as: BaseComponent,
    // Captured here to prevent it from being passed into the created element.
    // See https://github.com/carbon-design-system/carbon/issues/3970
    isSideNavExpanded: _isSideNavExpanded,
    ...rest
  }: LinkProps<E>,
  ref: ForwardedRef<E>
) {
  const BaseComponentAsAny = (BaseComponent ?? element ?? 'a') as any;
  return <BaseComponentAsAny ref={ref} {...rest} />;
}

/**
 * Link is a custom component that allows us to supporting rendering elements
 * other than `a` in our markup. The goal is to allow users to support passing
 * in their own components to support use-cases like `react-router` or
 * `@reach/router`
 */
const Link = forwardRef(LinkRenderFunction) as (<E extends ElementType = 'a'>(
  props: LinkProps<E>
) => JSX.Element) & {
  displayName?: string;
  propTypes?: WeakValidationMap<LinkProps<any>>;
};

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
