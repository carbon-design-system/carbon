/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ThemeContext = createContext({ theme: 'white' });

export function Theme(props) {
  const value = React.useMemo(() => {
    return { theme: props.theme };
  }, [props.theme]);
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

Theme.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string,
};

export function useTheme() {
  return React.useContext(ThemeContext);
}
