/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Layers from '@carbon/icons/lib/layers/16.js';
import { prefix } from '../../src/globals/settings';
import '../../src/components/layer/index.js';
import styles from './with-layer.scss?lit';

/**
 * Storybook template layer component, strictly for presentation purposes
 *
 * @element sb-template-layers
 * @slot The elements contained within the component.
 */
@customElement(`sb-template-layers`)
class CDSLayer extends LitElement {
  @property()
  content;

  private _handleSlotChange({ target }: Event) {
    if (!this.content) {
      const content = (target as HTMLSlotElement)
        .assignedNodes()
        .filter(
          (node) =>
            node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
        );

      this.content = content[0];
    }
  }

  updated() {
    if (this.content) {
      const layer1 = this.content.cloneNode(true) as HTMLElement;
      const layer2 = this.content.cloneNode(true) as HTMLElement;
      layer1.setAttribute('slot', 'layer-1');
      layer2.setAttribute('slot', 'layer-2');
      this.appendChild(layer1);
      this.appendChild(layer2);
    }
  }

  render() {
    return html`
      <cds-layer with-background>
        <div class="${prefix}--with-layer">
          <div class="${prefix}--with-layer__background">
            <div class="${prefix}--with-layer__label">
              ${Layers()} $background
            </div>
            <div class="${prefix}--with-layer__content">
              <slot @slotchange="${this._handleSlotChange}"></slot>
              <cds-layer with-background>
                <div class="${prefix}--with-layer__layer">
                  <div class="${prefix}--with-layer__label">
                    ${Layers()} $layer-01
                  </div>
                  <div class="${prefix}--with-layer__content">
                    <slot name="layer-1"></slot>
                    <cds-layer with-background>
                      <div class="${prefix}--with-layer__layer">
                        <div class="${prefix}--with-layer__label">
                          ${Layers()} $layer-02
                        </div>
                        <div class="${prefix}--with-layer__content">
                          <slot name="layer-2"></slot>
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
  }

  static styles = styles;
}

export default CDSLayer;
