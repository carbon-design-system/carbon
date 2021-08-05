/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { TextDirectionContext } from './TextDirectionContext';

function Text({ as: BaseComponent = 'span', children, dir = 'auto', ...rest }) {
  const context = useContext(TextDirectionContext);
  const textProps = {};
  const value = {
    ...context,
  };

  if (!context) {
    textProps.dir = dir;
    value.direction = dir;
  } else {
    const { direction: parentDirection, getTextDirection } = context;

    if (getTextDirection && getTextDirection.current) {
      const text = getTextFromChildren(children);
      const override = getTextDirection.current(text);

      if (parentDirection !== override) {
        textProps.dir = override;
        value.direction = override;
      } else if (parentDirection === 'auto') {
        textProps.dir = override;
      }
    } else if (parentDirection !== dir) {
      textProps.dir = dir;
      value.direction = dir;
    } else if (parentDirection === 'auto') {
      textProps.dir = dir;
    }
  }

  return (
    <TextDirectionContext.Provider value={value}>
      <BaseComponent {...rest} {...textProps}>
        {children}
      </BaseComponent>
    </TextDirectionContext.Provider>
  );
}

Text.propTypes = {
  /**
   * Provide a custom element type used to render the outermost node
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements or text to be rendered inside of this component
   */
  children: PropTypes.node.isRequired,

  /**
   * Specify the text direction to be used for this component and any of its
   * children
   */
  dir: PropTypes.oneOf(['ltr', 'rtl', 'auto']),
};

function getTextFromChildren(children) {
  if (typeof children === 'string') {
    return children;
  }

  const text = React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child;
    }
    return null;
  }).filter((text) => {
    return text !== null;
  });

  if (text.length === 1) {
    return text[0];
  }

  return text;
}

export { Text };
