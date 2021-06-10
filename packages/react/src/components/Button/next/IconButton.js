/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const IconButton = (props) => {
  const buttonClasses = classNames(
    props.className,
    `${prefix}--btn--icon-only`,
    `${prefix}--btn--selected`
  );

  return <div {...props}>hello</div>;
};

export default IconButton;
