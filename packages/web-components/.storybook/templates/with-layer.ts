/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconLoader } from '../../src/globals/internal/icon-loader';
import Layers from '@carbon/icons/es/layers/16.js';
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
  private _observer: MutationObserver | null = null;
  private _layer1: HTMLElement | null = null;
  private _layer2: HTMLElement | null = null;

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
    if (this.content && !this._layer1) {
      // Initial clone
      this._layer1 = this.content.cloneNode(true) as HTMLElement;
      this._layer2 = this.content.cloneNode(true) as HTMLElement;
      this._layer1.setAttribute('slot', 'layer-1');
      this._layer2.setAttribute('slot', 'layer-2');
      this.appendChild(this._layer1);
      this.appendChild(this._layer2);

      // Watch for attribute changes on original
      this._observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            const attrName = mutation.attributeName!;
            const newValue = this.content.getAttribute(attrName);

            if (newValue !== null) {
              this._layer1?.setAttribute(attrName, newValue);
              this._layer2?.setAttribute(attrName, newValue);
            } else {
              this._layer1?.removeAttribute(attrName);
              this._layer2?.removeAttribute(attrName);
            }
          }
        });
      });

      this._observer.observe(this.content, {
        attributes: true,
        attributeOldValue: true,
      });
    }
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    super.disconnectedCallback();
  }

  render() {
    return html`
      <cds-layer with-background>
        <div class="${prefix}--with-layer">
          <div class="${prefix}--with-layer__background">
            <div class="${prefix}--with-layer__label">
              ${iconLoader(Layers)} $background
            </div>
            <div class="${prefix}--with-layer__content">
              <slot @slotchange="${this._handleSlotChange}"></slot>
              <cds-layer with-background>
                <div class="${prefix}--with-layer__layer">
                  <div class="${prefix}--with-layer__label">
                    ${iconLoader(Layers)} $layer-01
                  </div>
                  <div class="${prefix}--with-layer__content">
                    <slot name="layer-1"></slot>
                    <cds-layer with-background>
                      <div class="${prefix}--with-layer__layer">
                        <div class="${prefix}--with-layer__label">
                          ${iconLoader(Layers)} $layer-02
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
