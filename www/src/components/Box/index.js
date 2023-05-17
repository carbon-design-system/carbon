/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as classes from './Box.module.scss';

import cx from 'clsx';
import React from 'react';

const keys = Object.keys(classes);

function Box({ children, ...rest }) {
  const child = React.Children.only(children);
  const childProps = {};
  const tokens = keys.filter((key) => {
    if (rest[key]) {
      return true;
    }
    childProps[key] = rest[key];
    return false;
  });
  const className = cx(
    tokens.map((token) => {
      return classes[token];
    })
  );
  return React.cloneElement(child, {
    ...childProps,
    className: cx(child.props.className, className),
  });
}

export { Box };
