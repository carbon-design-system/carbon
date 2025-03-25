/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import Copy16 from '@carbon/icons/lib/copy/16.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './copy-button.scss?lit';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import '../copy/copy';

/**
 * Copy button.
 *
 * @element cds-copy-button
 */
@customElement(`${prefix}-copy-button`)
class CDSCopyButton extends FocusMixin(LitElement) {
  /**
   * Specify an optional className to be added to your Button
   */
  @property({ reflect: true, attribute: 'button-class-name' })
  buttonClassName;

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify the string that is displayed when the button is clicked and the content is copi
   */
  @property()
  feedback = 'Copied!';

  /**
   * How the tooltip is aligned to the trigger button.
   */
  @property({ reflect: true })
  align = POPOVER_ALIGNMENT.BOTTOM;

  /**
   * Specify whether a auto align functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoAlign = false;

  /**
   * The number in milliseconds to determine how long the tooltip should remain.
   */
  @property({ type: Number, attribute: 'feedback-timeout' })
  feedbackTimeout = 2000;

  render() {
    const {
      buttonClassName,
      disabled,
      feedback,
      feedbackTimeout,
      align,
      autoAlign,
    } = this;

    let classes = `${prefix}--copy-btn`;

    if (buttonClassName) {
      classes += ` ${buttonClassName}`;
    }

    return html`
      <cds-copy
        ?disabled=${disabled}
        ?autoalign=${autoAlign}
        feedback=${feedback}
        feedback-timeout=${feedbackTimeout}
        button-class-name=${classes}
        align=${align}>
        ${Copy16({ slot: 'icon', class: `${prefix}--snippet__icon` })}
        <slot slot="tooltip-content"></slot>
      </cds-copy>
    `;
  }

  static styles = styles;
}

export default CDSCopyButton;
