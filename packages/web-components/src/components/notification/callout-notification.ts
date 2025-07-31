/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, svg } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSActionableNotification, {
  iconsForKinds,
} from './actionable-notification';
import styles from './actionable-notification.scss?lit';

/**
 * Callout notification.
 *
 * @element cds-callout-notification
 * @slot subtitle - The subtitle.
 * @slot title - The title.
 * @slot action - The action button.
 */
@customElement(`${prefix}-callout-notification`)
class CDSCalloutNotification extends CDSActionableNotification {
  /**
   * Specify the id for the title element.
   */
  @property({ type: String, reflect: true, attribute: 'title-id' })
  titleId = '';

  protected _renderIcon() {
    const { statusIconDescription, kind } = this;
    const { [kind]: icon } = iconsForKinds;
    return !icon
      ? undefined
      : icon({
          class: `${prefix}--inline-notification__icon`,
          children: !statusIconDescription
            ? undefined
            : svg`<title>${statusIconDescription}</title>`,
        });
  }

  protected _renderText() {
    const { caption, subtitle, title, titleId, _type: type } = this;
    return html`
      <div class="${prefix}--${type}-notification__text-wrapper">
        <div class="${prefix}--${type}-notification__content">
          ${title &&
          html`<div
            class="${prefix}--${type}-notification__title"
            id="${titleId}">
            ${title}<slot name="title"></slot>
          </div>`}
          ${subtitle &&
          html`<div class="${prefix}--${type}-notification__subtitle">
            ${subtitle}<slot name="subtitle"></slot>
          </div>`}
          ${caption &&
          html`<div class="${prefix}--${type}-notification__caption">
            ${caption}<slot name="caption"></slot>
          </div>`}
          <slot></slot>
        </div>
      </div>
    `;
  }

  protected _renderButton() {
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    this.removeAttribute('role');
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const button = this.querySelector(
      (this.constructor as typeof CDSCalloutNotification).selectorActionButton
    );
    if (button) {
      button.setAttribute('kind', 'ghost');
      if (this.titleId) {
        button.setAttribute('aria-describedby', this.titleId);
      }
      button.setAttribute('hide-close-button', 'true');
    }
  }
  static styles = styles;
}
export default CDSCalloutNotification;
