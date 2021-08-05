/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { LayoutDirectionContext } from './LayoutDirectionContext';

function LayoutDirection({
  as: BaseComponent = 'div',
  children,
  dir,
  ...rest
}) {
  const value = React.useMemo(() => {
    return {
      direction: dir,
    };
  }, [dir]);

  return (
    <LayoutDirectionContext.Provider value={value}>
      <BaseComponent dir={dir} {...rest}>
        {children}
      </BaseComponent>
    </LayoutDirectionContext.Provider>
  );
}

LayoutDirection.propTypes = {
  /**
   * Customize the element type used to render the outermost node
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements or components to be rendered inside of this
   * component
   */
  children: PropTypes.node,

  /**
   * Specify the layout direction of this part of the page
   */
  dir: PropTypes.oneOf(['ltr', 'rtl']).isRequired,
};

export { LayoutDirectionContext, LayoutDirection };
