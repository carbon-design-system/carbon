/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { spacing } from '@carbon/layout';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';

/**
 * The steps in the spacing scale
 * @type {Array<number>}
 */
const SPACING_STEPS = Array.from({ length: spacing.length - 1 }).map(
  (_, step) => {
    return step + 1;
  }
);

/**
 * The Stack component is a useful layout utility in a component-based model.
 * This allows components to not use margin and instead delegate the
 * responsibility of positioning and layout to parent components.
 *
 * In the case of the Stack component, it uses the spacing scale from the
 * Design Language in order to determine how much space there should be between
 * items rendered by the Stack component. It also supports a custom `gap` prop
 * which will allow a user to provide a custom value for the gap of the layout.
 *
 * This component supports both horizontal and vertical orientations.
 *
 * Inspiration for this component:
 *
 * - https://paste.twilio.design/layout/stack/
 * - https://github.com/Workday/canvas-kit/blob/f2f599654876700f483a1d8c5de82a41315c76f1/modules/labs-react/layout/lib/Stack.tsx
 */
const Stack = React.forwardRef(function Stack(props, ref) {
  const {
    as: BaseComponent = 'div',
    children,
    className: customClassName,
    gap,
    orientation = 'vertical',
    ...rest
  } = props;
  const prefix = usePrefix();
  const className = cx(customClassName, {
    [`${prefix}--stack-${orientation}`]: true,
    [`${prefix}--stack-scale-${gap}`]: typeof gap === 'number',
  });
  const style = {};

  if (typeof gap === 'string') {
    style[`--${prefix}-stack-gap`] = gap;
  }

  return (
    <BaseComponent {...rest} ref={ref} className={className} style={style}>
      {children}
    </BaseComponent>
  );
});

Stack.propTypes = {
  /**
   * Provide a custom element type to render as the outermost element in
   * the Stack component. By default, this component will render a `div`.
   */
  as: PropTypes.elementType,

  /**
   * Provide the elements that will be rendered as children inside of the Stack
   * component. These elements will have having spacing between them according
   * to the `step` and `orientation` prop
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be used by the outermost element rendered by
   * Stack
   */
  className: PropTypes.string,

  /**
   * Provide either a custom value or a step from the spacing scale to be used
   * as the gap in the layout
   */
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(SPACING_STEPS)]),

  /**
   * Specify the orientation of them items in the Stack
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

export { Stack };
