/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Layers from '@carbon/icons/lib/layers/16';
import { prefix } from '../../src/globals/settings';

import styles from './with-layer.scss';

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
      const layer2 = this.content.cloneNode(true) as HTMLElement;
      const layer3 = this.content.cloneNode(true) as HTMLElement;
      layer2.setAttribute('slot', 'layer-2');
      layer3.setAttribute('slot', 'layer-3');
      this.appendChild(layer2);
      this.appendChild(layer3);
    }
  }

  render() {
    return html`
      <div class="${prefix}--with-layer">
        <div class="${prefix}--with-layer__layer">
          <div class="${prefix}--with-layer__label">${Layers()} Layer 1</div>
          <div class="${prefix}--with-layer__content">
            <cds-layer>
              <slot @slotchange="${this._handleSlotChange}"></slot>
              <div class="${prefix}--with-layer__layer">
                <div class="${prefix}--with-layer__label">
                  ${Layers()} Layer 2
                </div>
                <div class="${prefix}--with-layer__content">
                  <cds-layer>
                    <slot name="layer-2"></slot>
                    <div class="${prefix}--with-layer__layer">
                      <div class="${prefix}--with-layer__label">
                        ${Layers()} Layer 3
                      </div>
                      <div class="${prefix}--with-layer__content">
                        <cds-layer>
                          <slot name="layer-3"></slot>
                        </cds-layer>
                      </div>
                    </div>
                  </cds-layer>
                </div>
              </div>
            </cds-layer>
          </div>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSLayer;
