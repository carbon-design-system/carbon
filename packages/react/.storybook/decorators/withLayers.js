/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Layer } from '../../src';
import { Annotation } from '../templates/Annotation';

/**
 * Decorator that wraps a story with layer backgrounds to demonstrate
 * how components render across different layer contexts.
 *
 * @param {Function} Story - The story component to wrap
 * @param {Object} context - The story context
 * @returns {React.ReactElement} The story content wrapped in layer backgrounds
 *
 * @example
 * ```js
 * export const MyStoryWithLayers = {
 *   decorators: [withLayers],
 *   render: () => <MyComponent />
 * };
 * ```
 */
export const withLayers = (Story, context) => {
  return (
    <Annotation type="background" text="$background">
      <Story {...context} />
      <Layer withBackground>
        <Annotation type="layer" text="$layer-01">
          <Story {...context} />
          <Layer withBackground>
            <Annotation type="layer" text="$layer-02">
              <Story {...context} />
            </Annotation>
          </Layer>
        </Annotation>
      </Layer>
    </Annotation>
  );
};

// Made with Bob
