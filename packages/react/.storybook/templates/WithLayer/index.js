/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

import { Layer } from '../../../src';

import { Annotation } from '../Annotation';
import { prefix } from '../_prefix';

function WithLayer({ children }) {
  function renderChild(layer) {
    return typeof children === 'function' ? children(layer) : children;
  }

  return (
    <Annotation type="background" text="$background">
      {renderChild(0)}
      <Layer withBackground>
        <Annotation type="layer" text="$layer-01">
          {renderChild(1)}
          <Layer withBackground>
            <Annotation type="layer" text="$layer-02">
              {renderChild(2)}
            </Annotation>
          </Layer>
        </Annotation>
      </Layer>
    </Annotation>
  );
}

WithLayer.propTypes = {
  /**
   * The component demo to be rendered on all layers.
   * Can be either a node or a function that receives the layer
   * index as a parameter and returns the child for that layer.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export { WithLayer };
