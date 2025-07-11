/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { LayerContext } from './LayerContext';
import { LayerLevel, MAX_LEVEL, MIN_LEVEL, levels } from './LayerLevel';
import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '../../internal/PolymorphicProps';
import { clamp } from '../../internal/clamp';

/**
 * A custom hook that will return information about the current layer. A common
 * field to pull from this is the `level` for the layer that the component that
 * calls this hook is currently in
 */
export function useLayer() {
  const level = React.useContext(LayerContext);
  return {
    level,
  };
}

export interface LayerBaseProps {
  /**
   * Provide child elements to be rendered inside of `Theme`
   */
  children?: React.ReactNode;

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className?: string;

  /**
   * Specify the layer level and override any existing levels based on hierarchy
   */
  level?: LayerLevel;

  /**
   * Applies a css background-color set to $layer-background
   */
  withBackground?: boolean;
}

export type LayerProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, LayerBaseProps>;

const Layer = React.forwardRef(
  <T extends React.ElementType = 'div'>(props: LayerProps<T>, ref) => {
    const {
      as,
      className: customClassName,
      children,
      level: overrideLevel,
      withBackground = false,
      ...rest
    } = props;

    const contextLevel = React.useContext(LayerContext);
    const level = overrideLevel ?? contextLevel;
    const prefix = usePrefix();
    const className = cx(
      `${prefix}--layer-${levels[level]}`,
      {
        [`${prefix}--layer__with-background`]: withBackground,
      },
      customClassName
    );
    // The level should be between MIN_LEVEL and MAX_LEVEL
    const value = clamp(level + 1, MIN_LEVEL, MAX_LEVEL);

    const BaseComponent = as || 'div';

    return (
      <LayerContext.Provider value={value}>
        <BaseComponent ref={ref} {...rest} className={className}>
          {children}
        </BaseComponent>
      </LayerContext.Provider>
    );
  }
);

Layer.displayName = 'Layer';

Layer.propTypes = {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements to be rendered inside of `Theme`
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className: PropTypes.string,

  /**
   * Specify the layer level and override any existing levels based on hierarchy
   */
  level: PropTypes.oneOf([0, 1, 2]),

  /**
   * Applies a css background-color set to $layer-background
   */
  withBackground: PropTypes.bool,
};

export { Layer };
