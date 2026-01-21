/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import styles from './contained-list.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export type Variants = 'on-page' | 'disclosed';

/**
 * Contained list.
 *
 * @element cds-contained-list
 * @slot - The list items (cds-contained-list-item elements)
 * @slot action - The action slot for interactive elements in header
 * @slot label - The label text
 */
@customElement(`${prefix}-contained-list`)
class CDSContainedList extends LitElement {
  /**
   * Specify whether the dividing lines in between list items should be inset.
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-inset' })
  isInset = false;

  /**
   * The kind of ContainedList you want to display
   */
  @property({ reflect: true })
  kind: Variants = 'on-page';

  /**
   * A label describing the contained list.
   */
  @property({ reflect: true })
  label = '';

  /**
   * Specify the size of the contained list.
   */
  @property({ reflect: true })
  size?: 'sm' | 'md' | 'lg' | 'xl';

  render() {
    const { isInset, kind, label, size } = this;

    const classes = classMap({
      [`${prefix}--contained-list`]: true,
      [`${prefix}--contained-list--${kind}`]: true,
      [`${prefix}--contained-list--inset-rulers`]: isInset,
      [`${prefix}--layout--size-${size}`]: !!size,
    });

    const hasLabelSlot = this.querySelector('[slot="label"]') !== null;

    return html`
      <div class="${classes}">
        ${label || hasLabelSlot
          ? html`
              <div class="${prefix}--contained-list__header">
                <div class="${prefix}--contained-list__label">
                  ${hasLabelSlot ? html`<slot name="label"></slot>` : label}
                </div>
                <div class="${prefix}--contained-list__action">
                  <slot name="action"></slot>
                </div>
              </div>
            `
          : ''}
        <ul role="list">
          <slot></slot>
        </ul>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSContainedList;
