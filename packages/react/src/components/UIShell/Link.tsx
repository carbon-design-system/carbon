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
  type ComponentProps,
  Ref,
} from 'react';

// Note: Maybe we should use `as` instead of `element`? `as` appears to be
// standard and is used in other places in this project.

type LinkProps<E extends ElementType> = ComponentProps<E> & {
  element?: E | undefined;
  ref?: Ref<E>;
};

function LinkRenderFunction<E extends ElementType>(
  {
    element: Element = 'a' as E,
    // Captured here to prevent it from being passed into the created element.
    // See https://github.com/carbon-design-system/carbon/issues/3970
    isSideNavExpanded: _isSideNavExpanded,
    ...rest
  }: LinkProps<E>,
  ref: ForwardedRef<E>
) {
  const ElementAsAny = Element as any;
  return <ElementAsAny ref={ref} {...rest} />;
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
   * The base element to use to build the link. Defaults to `a`, can also accept
   * alternative tag names or custom components like `Link` from `react-router`.
   */
  element: PropTypes.elementType,

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
