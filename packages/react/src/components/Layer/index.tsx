/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { LayerContext } from './LayerContext';
import { LayerLevel, MAX_LEVEL, MIN_LEVEL, levels } from './LayerLevel';

type func = (...args: unknown[]) => unknown;

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

interface LayerProps {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as?: func | string | React.ElementType;

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
}

export const Layer = React.forwardRef(function Layer(
  {
    as: BaseComponent = 'div',
    className: customClassName,
    children,
    level: overrideLevel,
    ...rest
  }: LayerProps,
  ref
) {
  const contextLevel = React.useContext(LayerContext);
  const level = overrideLevel ?? contextLevel;
  const prefix = usePrefix();
  const className = cx(`${prefix}--layer-${levels[level]}`, customClassName);
  // The level should be between MIN_LEVEL and MAX_LEVEL
  const value = Math.max(
    MIN_LEVEL,
    Math.min(level + 1, MAX_LEVEL)
  ) as LayerLevel;

  return (
    <LayerContext.Provider value={value}>
      <BaseComponent ref={ref} {...rest} className={className}>
        {children}
      </BaseComponent>
    </LayerContext.Provider>
  );
});
