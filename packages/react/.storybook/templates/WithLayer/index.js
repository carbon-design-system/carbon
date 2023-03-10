/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import './WithLayer.scss';

import { Layers as Icon } from '@carbon/react/icons';
import { Layer } from '../../../src';

import { prefix } from '../_prefix';

function WithLayer({ children }) {
  function renderChild(layer) {
    return typeof children === 'function' ? children(layer) : children;
  }

  return (
    <div className={`${prefix}--with-layer`}>
      <div className={`${prefix}--with-layer__label`}>
        <Icon />
        layer-01
      </div>
      <div className={`${prefix}--with-layer__wrapper`}>
        {renderChild(0)}

        <div className={`${prefix}--with-layer__label`}>
          <Icon />
          layer-02
        </div>
        <div className={`${prefix}--with-layer__wrapper`}>
          <Layer>
            {renderChild(1)}

            <div className={`${prefix}--with-layer__label`}>
              <Icon />
              layer-03
            </div>
            <div className={`${prefix}--with-layer__wrapper`}>
              <Layer>{renderChild(2)}</Layer>
            </div>
          </Layer>
        </div>
      </div>
    </div>
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
