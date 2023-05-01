/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from '../copy-button/copy-button.scss';
import CDSIconButton from '../icon-button/icon-button';

/**
 * Copy.
 *
 * @element cds-copy
 */
@customElement(`${prefix}-copy`)
class CDSCopy extends CDSIconButton {
  /**
   * `true` to show the feedback tooltip.
   */
  private _showFeedback = false;

  /**
   * `true` to show the feedback tooltip.
   */
  private _animation = '';

  private _createHandleFeedbackTooltip = () => {
    let timeoutId: number | void;
    return (timeout: number) => {
      const buttonClasses = this.shadowRoot?.querySelector('button')?.classList;

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
      this._showFeedback = true;
      buttonClasses?.add(`${prefix}--copy-btn--animating`);
      this._animation = 'fade-in';
      buttonClasses?.add(`${prefix}--copy-btn--${this._animation}`);
      this.requestUpdate();
      timeoutId = setTimeout(() => {
        this._showFeedback = false;
        this._animation = 'fade-out';
        buttonClasses?.remove(`${prefix}--copy-btn--fade-in`);
        buttonClasses?.add(`${prefix}--copy-btn--${this._animation}`);
        this.requestUpdate();
      }, timeout) as unknown as number;
    };
  };

  /**
   * Handles showing/hiding the feedback tooltip.
   */
  private _handleFeedbackTooltip = this._createHandleFeedbackTooltip();

  /**
   * Handles `click` event on the copy button.
   */
  private _handleClickButton() {
    this._handleFeedbackTooltip(this.feedbackTimeout);
  }

  /**
   * Specify the string that is displayed when the button is clicked and the content is copi
   */
  @property()
  feedback = 'Copied!';

  /**
   * The number in milliseconds to determine how long the tooltip should remain.
   */
  @property({ type: Number, attribute: 'feedback-timeout' })
  feedbackTimeout = 2000;

  // eslint-disable-next-line class-methods-use-this
  protected _renderTooltipContent() {
    return html`
      <cds-tooltip-content>
        ${this._showFeedback
          ? this.feedback
          : html`<slot name="tooltip-content"></slot>`}
      </cds-tooltip-content>
    `;
  }

  connectedCallback() {
    this.closeOnActivation = false;
    this.align = 'bottom';

    this.addEventListener('click', this._handleClickButton);

    super.connectedCallback();
  }

  firstUpdated() {
    this.shadowRoot
      ?.querySelector('button')
      ?.classList.add(`${prefix}--copy-btn`);
  }

  updated(changedProperties) {
    this.shadowRoot
      ?.querySelector('button')
      ?.addEventListener('animationend', () => {
        if (this._animation === 'fade-out') {
          const buttonClasses =
            this.shadowRoot?.querySelector('button')?.classList;
          buttonClasses?.remove(`${prefix}--copy-btn--animating`);
          buttonClasses?.remove(`${prefix}--copy-btn--${this._animation}`);
          this._animation = '';
        }
      });

    super.updated(changedProperties);
  }

  static styles = styles;
}

export default CDSCopy;
