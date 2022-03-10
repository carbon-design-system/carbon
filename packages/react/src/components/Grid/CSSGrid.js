/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { GridSettings, useGridSettings } from './GridContext';

function CSSGrid({
  as: BaseComponent = 'div',
  children,
  className: customClassName,
  condensed = false,
  fullWidth = false,
  narrow = false,
  ...rest
}) {
  const prefix = usePrefix();
  const { subgrid } = useGridSettings();
  let mode = 'wide';
  if (narrow) {
    mode = 'narrow';
  } else if (condensed) {
    mode = 'condensed';
  }

  if (subgrid) {
    return (
      <GridSettings mode="css-grid" subgrid>
        <Subgrid
          as={BaseComponent}
          className={customClassName}
          mode={mode}
          {...rest}>
          {children}
        </Subgrid>
      </GridSettings>
    );
  }

  const className = cx(customClassName, {
    [`${prefix}--css-grid`]: true,
    [`${prefix}--css-grid--condensed`]: mode === 'condensed',
    [`${prefix}--css-grid--narrow`]: mode === 'narrow',
    [`${prefix}--css-grid--full-width`]: fullWidth,
  });

  return (
    <GridSettings mode="css-grid" subgrid>
      <BaseComponent className={className} {...rest}>
        {children}
      </BaseComponent>
    </GridSettings>
  );
}

CSSGrid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `Grid`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Grid`
   */
  className: PropTypes.string,

  /**
   * Collapse the gutter to 1px. Useful for fluid layouts.
   * Rows have 1px of margin between them to match gutter.
   */
  condensed: PropTypes.bool,

  /**
   * Remove the default max width that the grid has set
   */
  fullWidth: PropTypes.bool,

  /**
   * Container hangs 16px into the gutter. Useful for
   * typographic alignment with and without containers.
   */
  narrow: PropTypes.bool,
};

function Subgrid({
  as: BaseComponent = 'div',
  className: customClassName,
  children,
  mode,
  ...rest
}) {
  const prefix = usePrefix();
  const className = cx(customClassName, {
    [`${prefix}--subgrid`]: true,
    [`${prefix}--subgrid--condensed`]: mode === 'condensed',
    [`${prefix}--subgrid--narrow`]: mode === 'narrow',
    [`${prefix}--subgrid--wide`]: mode === 'wide',
  });
  return (
    <BaseComponent {...rest} className={className}>
      {children}
    </BaseComponent>
  );
}

Subgrid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `Subgrid`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Subgrid`
   */
  className: PropTypes.string,

  /**
   * Specify the grid mode for the subgrid
   */
  mode: PropTypes.oneOf(['wide', 'narrow', 'condensed']),
};

export { CSSGrid };
