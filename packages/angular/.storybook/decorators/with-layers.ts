/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Decorator } from '@storybook/angular';
import { LayerComponent } from '@carbon/angular/layer';

/**
 * Wraps a story in layer backgrounds to show how a component renders on
 * `$background`, `$layer-01` and `$layer-02`. Angular counterpart of the
 * `withLayers` decorator in `@carbon/web-components` Storybook.
 *
 *
 * @example
 * ```ts
 * export const WithLayer: Story = {
 *   decorators: [withLayers],
 *   render: (args) => ({ props: args, template: `<cds-ng-select …/>` }),
 * };
 * ```
 */
export const withLayers: Decorator = (storyFn) => {
  const story = storyFn();
  const content = story.template ?? '';
  return {
    ...story,
    moduleMetadata: {
      ...story.moduleMetadata,
      imports: [...(story.moduleMetadata?.imports ?? []), LayerComponent],
    },
    template: `
      <cds-ng-layer with-background>
        <div class="cds--with-layer__background">
          <div class="cds--with-layer__label">$background</div>
          <div class="cds--with-layer__content">
            ${content}
            <cds-ng-layer with-background>
              <div class="cds--with-layer__layer">
                <div class="cds--with-layer__label">$layer-01</div>
                <div class="cds--with-layer__content">
                  ${content}
                  <cds-ng-layer with-background>
                    <div class="cds--with-layer__layer">
                      <div class="cds--with-layer__label">$layer-02</div>
                      <div class="cds--with-layer__content">
                        ${content}
                      </div>
                    </div>
                  </cds-ng-layer>
                </div>
              </div>
            </cds-ng-layer>
          </div>
        </div>
      </cds-ng-layer>
    `,
  };
};
