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
    <style>
      .${prefix}--with-layer__layer {
        position: relative;
        border: 1px dashed #a56eff;
        margin-block-start: var(--cds-spacing-07);
      }

      .${prefix}--with-layer__label {
        font-family: var(
          --cds-code-01-font-family,
          'IBM Plex Mono',
          'Menlo',
          'DejaVu Sans Mono',
          'Bitstream Vera Sans Mono',
          Courier,
          monospace
        );
        font-size: var(--cds-code-01-font-size);
        font-weight: var(--cds-code-01-font-weight);
        line-height: var(--cds-code-01-line-height);
        letter-spacing: var(--cds-code-01-letter-spacing);
        display: inline-flex;
        padding: var(--cds-spacing-02);
        background-color: var(--cds-tag-background-purple);
        color: var(--cds-tag-color-purple);
        column-gap: var(--cds-spacing-02);
      }

      .${prefix}--with-layer__background {
        border: 1px dashed #ee5396;
        min-block-size: 100vh;
      }

      .${prefix}--with-layer__background > .${prefix}--with-layer__label {
        background-color: var(--cds-tag-background-magenta);
        color: var(--cds-tag-color-magenta);
      }

      .${prefix}--with-layer__content {
        padding: var(--cds-spacing-05);
      }
    </style>
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
