/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import cx from 'classnames';
import { prefix } from '../_prefix';
import { Form, Slider } from '../../../src';
import './WithDisplayBox.scss';

const blockClass = `${prefix}--display-box`;

function WithDisplayBox({ children, className, msg }) {
  const [width, setWidth] = useState(400);

  return (
    <div
      className={cx(blockClass, className)}
      style={{ '--container-width': `${width}px` }}>
      <Form>
        <Slider
          max={1600}
          min={100}
          step={5}
          value={width}
          onChange={({ value }) => setWidth(value)}
          labelText="Adjust maximum width of container in which the component is displayed."
        />
      </Form>
      <div className={`${blockClass}__story`}>
        <div className={`${blockClass}__indicator`}>
          <div className={`${blockClass}__message`}>
            Width available to component (not part of component).
          </div>
          <div className={`${blockClass}__indicator--left`} />
          <div className={`${blockClass}__indicator--right`} />
        </div>
        {children}
      </div>
    </div>
  );
}

WithDisplayBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  msg: PropTypes.node,
};

export { WithDisplayBox };
