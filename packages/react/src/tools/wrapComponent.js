/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const wrapComponent = ({ name, className, type }) => {
  const Component = ({ className: baseClassName, ...other }) => {
    const componentClass = cx(className, baseClassName);
    return React.createElement(type, {
      ...other,
      // Prevent Weird quirk where `cx` will evaluate to an empty string, '',
      // and so we have empty `class` attributes in the resulting markup
      // eslint-disable-next-line no-extra-boolean-cast
      className: !!componentClass ? componentClass : undefined,
    });
  };
  Component.displayName = name;
  Component.propTypes = {
    className: PropTypes.string,
  };
  return Component;
};

export default wrapComponent;
