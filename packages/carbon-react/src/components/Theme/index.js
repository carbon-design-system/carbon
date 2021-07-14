/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ThemeContext = React.createContext({ theme: 'white' });

export function Theme({
  as: BaseComponent = 'div',
  children,
  className: customClassName,
  theme,
  ...rest
}) {
  const className = cx(customClassName, {
    'bx--white': theme === 'white',
    'bx--g10': theme === 'g10',
    'bx--g90': theme === 'g90',
    'bx--g100': theme === 'g100',
  });
  const value = React.useMemo(() => {
    return {
      theme,
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <BaseComponent {...rest} className={className}>
        {children}
      </BaseComponent>
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
   * Specify the theme
   */
  theme: PropTypes.string,
};

export function useTheme() {
  return React.useContext(ThemeContext);
}
