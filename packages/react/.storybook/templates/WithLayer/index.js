/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import './WithLayer.scss';

import { Layer } from '../../../src';

import { Annotation } from '../Annotation';
import { prefix } from '../_prefix';

function WithLayer({ children }) {
  function renderChild(layer) {
    return typeof children === 'function' ? children(layer) : children;
  }

  return (
    <Annotation type="layer" text="Layer 1" className={`${prefix}--with-layer`}>
      {renderChild(0)}

      <Annotation
        type="layer"
        text="Layer 2"
        className={`${prefix}--with-layer`}>
        <Layer>
          {renderChild(1)}

          <Annotation
            type="layer"
            text="Layer 3"
            className={`${prefix}--with-layer`}>
            <Layer>{renderChild(2)}</Layer>
          </Annotation>
        </Layer>
      </Annotation>
    </Annotation>
  );
}

WithLayer.propTypes = {
  /**
   * The component demo to be rendered on all layers.
   * Can be either a node or a function that receives the layer
   * index as a parameter and returns the child for that layer.
   */
  children: PropTypes.oneOf([PropTypes.node, PropTypes.func]),
};

export { WithLayer };
