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
import type { TemplateResult } from 'lit';

/**
 * Storybook template layer component, strictly for presentation purposes
 *
 * @element sb-template-layers
 * @slot The elements contained within the component (legacy mode).
 */
@customElement(`sb-template-layers`)
class CDSLayer extends LitElement {
  /**
   * Render function that returns the content to display in each layer.
   * When provided, this takes precedence over slotted content.
   */
  @property({ attribute: false })
  renderContent?: () => TemplateResult;

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
  private _getPathToElement(root: HTMLElement, target: HTMLElement): number[] {
    const path: number[] = [];
    let current = target;

    while (current && current !== root) {
      const parent = current.parentElement;
      if (!parent) break;

      const index = Array.from(parent.children).indexOf(current);
      path.unshift(index);
      current = parent;
    }

    return path;
  }

  private _getElementByPath(
    root: HTMLElement | null,
    path: number[]
  ): HTMLElement | null {
    let current: HTMLElement | Element | null = root;

    for (const index of path) {
      if (!current || !current.children[index]) {
        return null;
      }
      current = current.children[index];
    }

    return current as HTMLElement;
  }

  updated() {
    if (this.content && !this._layer1 && !this.renderContent) {
      this._layer1 = this.content.cloneNode(true) as HTMLElement;
      this._layer2 = this.content.cloneNode(true) as HTMLElement;
      this._layer1.setAttribute('slot', 'layer-1');
      this._layer2.setAttribute('slot', 'layer-2');
      this.appendChild(this._layer1);
      this.appendChild(this._layer2);

      this._observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            const target = mutation.target as HTMLElement;
            const attrName = mutation.attributeName!;
            const newValue = target.getAttribute(attrName);

            // Skip attributes that are typically set by user interactions
            // These should not be synced between layer instances
            const skipAttributes = [
              'open',
              'value',
              'aria-expanded',
              'aria-activedescendant',
              'aria-selected',
            ];

            if (skipAttributes.includes(attrName)) {
              return;
            }

            const path = this._getPathToElement(this.content, target);

            const clone1Target = this._getElementByPath(this._layer1, path);
            const clone2Target = this._getElementByPath(this._layer2, path);

            if (newValue !== null) {
              clone1Target?.setAttribute(attrName, newValue);
              clone2Target?.setAttribute(attrName, newValue);
            } else {
              clone1Target?.removeAttribute(attrName);
              clone2Target?.removeAttribute(attrName);
            }
          }
        });
      });

      this._observer.observe(this.content, {
        attributes: true,
        attributeOldValue: true,
        subtree: true,
      });
    }
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    super.disconnectedCallback();
  }

  render() {
    // If renderContent is provided, use it to render three independent instances
    if (this.renderContent) {
      console.log('here???');

      return html`
        <cds-layer with-background>
          <div class="${prefix}--with-layer">
            <div class="${prefix}--with-layer__background">
              <div class="${prefix}--with-layer__label">
                ${iconLoader(Layers)} $background
              </div>
              <div class="${prefix}--with-layer__content">
                ${this.renderContent()}
                <cds-layer with-background>
                  <div class="${prefix}--with-layer__layer">
                    <div class="${prefix}--with-layer__label">
                      ${iconLoader(Layers)} $layer-01
                    </div>
                    <div class="${prefix}--with-layer__content">
                      ${this.renderContent()}
                      <cds-layer with-background>
                        <div class="${prefix}--with-layer__layer">
                          <div class="${prefix}--with-layer__label">
                            ${iconLoader(Layers)} $layer-02
                          </div>
                          <div class="${prefix}--with-layer__content">
                            ${this.renderContent()}
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

    // Legacy mode: use slots with cloning and mutation observer
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
