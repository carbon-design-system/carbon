/**
 * Copyright IBM Corp. 2016, 2023
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
import { PolymorphicProps } from '../../types/common';

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

interface LayerBaseProps {
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

export type LayerProps<T extends React.ElementType> = PolymorphicProps<
  T,
  LayerBaseProps
>;

export interface LayerComponent {
  <T extends React.ElementType>(
    props: LayerProps<T>,
    context?: any
  ): React.ReactElement<any, any> | null;
}

const LayerRenderFunction = React.forwardRef(function Layer<
  T extends React.ElementType
>(
  {
    as = 'div' as T,
    className: customClassName,
    children,
    level: overrideLevel,
    ...rest
  }: LayerProps<T>,
  ref: React.Ref<unknown>
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

  const BaseComponent = as as React.ElementType;

  return (
    <LayerContext.Provider value={value}>
      <BaseComponent ref={ref} {...rest} className={className}>
        {children}
      </BaseComponent>
    </LayerContext.Provider>
  );
});

LayerRenderFunction.displayName = 'Layer';
LayerRenderFunction.propTypes = {
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
};

export const Layer = LayerRenderFunction as LayerComponent;
