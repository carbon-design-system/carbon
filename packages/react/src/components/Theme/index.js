/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { LayerContext } from '../Layer/LayerContext';

export const ThemeContext = React.createContext({
  theme: 'white',
});

export function GlobalTheme({ children, theme }) {
  const value = useMemo(() => {
    return {
      theme,
    };
  }, [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

GlobalTheme.propTypes = {
  /**
   * Provide child elements to be rendered inside of `GlobalTheme`, this is
   * typically the root of your app
   */
  children: PropTypes.node,

  /**
   * Specify the global theme for your app
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),
};

/**
 * Specify the theme to be applied to a page, or a region in a page
 */
export function Theme({
  as: BaseComponent = 'div',
  children,
  className: customClassName,
  theme,
  ...rest
}) {
  const prefix = usePrefix();
  const className = cx(customClassName, {
    [`${prefix}--white`]: theme === 'white',
    [`${prefix}--g10`]: theme === 'g10',
    [`${prefix}--g90`]: theme === 'g90',
    [`${prefix}--g100`]: theme === 'g100',
    [`${prefix}--layer-one`]: true,
  });
  const value = React.useMemo(() => {
    return {
      theme,
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <LayerContext.Provider value={1}>
        <BaseComponent {...rest} className={className}>
          {children}
        </BaseComponent>
      </LayerContext.Provider>
    </ThemeContext.Provider>
  );
}

Theme.propTypes = {
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
   * Specify the theme
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),
};

/**
 * Get access to the current theme
 */
export function useTheme() {
  return React.useContext(ThemeContext);
}
