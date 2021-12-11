/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { LayerContext } from './LayerContext';

const levels = ['one', 'two', 'three'];
const MAX_LEVEL = levels.length - 1;

export function Layer({
  as: BaseComponent = 'div',
  className: customClassName,
  children,
  ...rest
}) {
  const level = React.useContext(LayerContext);
  const prefix = usePrefix();
  const className = cx(`${prefix}--layer-${levels[level]}`, customClassName);

  return (
    // The level should be between 0 and MAX_LEVEL
    <LayerContext.Provider value={Math.max(0, Math.min(level + 1, MAX_LEVEL))}>
      <BaseComponent {...rest} className={className}>
        {children}
      </BaseComponent>
    </LayerContext.Provider>
  );
}

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
};
