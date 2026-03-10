/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../src/globals/settings';
import { iconLoader } from '../../src/globals/internal/icon-loader';
import Layers from '@carbon/icons/es/layers/16.js';
import '../../src/components/layer/index';
import './_with-layers.scss';

/**
 * Decorator that wraps a story with layer backgrounds to demonstrate
 * how components render across different layer contexts.
 *
 * @param story - The story function to wrap
 * @returns The story content wrapped in layer backgrounds
 *
 * @example
 * ```ts
 * export const MyStoryWithLayers = {
 *   decorators: [withLayers],
 *   render: () => html`<my-component></my-component>`
 * };
 * ```
 */
export const withLayers = (story) => {
  const content = story();
  return html`
    <cds-layer with-background>
      <div class="${prefix}--with-layer">
        <div class="${prefix}--with-layer__background">
          <div class="${prefix}--with-layer__label">
            ${iconLoader(Layers)} $background
          </div>
          <div class="${prefix}--with-layer__content">
            ${content}
            <cds-layer with-background>
              <div class="${prefix}--with-layer__layer">
                <div class="${prefix}--with-layer__label">
                  ${iconLoader(Layers)} $layer-01
                </div>
                <div class="${prefix}--with-layer__content">
                  ${content}
                  <cds-layer with-background>
                    <div class="${prefix}--with-layer__layer">
                      <div class="${prefix}--with-layer__label">
                        ${iconLoader(Layers)} $layer-02
                      </div>
                      <div class="${prefix}--with-layer__content">
                        ${content}
                      </div>
                    </div>
                  </cds-layer>
                </div>
              </div>
            </cds-layer>
          </div>
        </div>
      </div>
    </cds-layer>
  `;
};
