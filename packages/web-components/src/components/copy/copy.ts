/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from '../copy-button/copy-button.scss?lit';
import CDSIconButton from '../icon-button/icon-button';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Copy.
 *
 * @element cds-copy
 */
@customElement(`${prefix}-copy`)
class CDSCopy extends CDSIconButton {
  /**
   * `true` to show the feedback tooltip and announce feedback.
   */
  private _showFeedback = false;

  /**
   * Animation state for feedback tooltip CSS classes.
   */
  private _animation = '';

  private _handleAnimationEnd = () => {
    if (this._animation === 'fade-out') {
      const buttonClasses = this.shadowRoot?.querySelector('button')?.classList;
      buttonClasses?.remove(`${prefix}--copy-btn--animating`);
      buttonClasses?.remove(`${prefix}--copy-btn--${this._animation}`);
      this._animation = '';
    }
  };

  private _createHandleFeedbackTooltip = () => {
    let timeoutId: number | undefined;
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

    this.addEventListener('click', this._handleClickButton);

    super.connectedCallback();

    // The shadow root is created by `super.connectedCallback()` on first
    // connection. Re-adding the same listener on reconnect is a no-op.
    this.shadowRoot?.addEventListener('animationend', this._handleAnimationEnd);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClickButton);
    this.shadowRoot?.removeEventListener(
      'animationend',
      this._handleAnimationEnd
    );
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Determine the baseline accessible label from the host element, slot, or default.
    const host =
      (this.getRootNode() as ShadowRoot)?.host ||
      (this.parentNode as ShadowRoot)?.host;
    // Prefer the property over the attribute: it is the source of truth once set
    // programmatically, while the attribute may be stale.
    const hostIconDescription =
      (host as { iconDescription?: string })?.iconDescription ||
      host?.getAttribute('icon-description');
    const hostText = host?.textContent?.trim();
    const slottedContent = this.querySelector(
      '[slot=tooltip-content]'
    )?.textContent?.trim();
    const initialLabel =
      hostText ||
      hostIconDescription ||
      slottedContent ||
      this.getAttribute('aria-label') ||
      'Copy to clipboard';

    // When feedback is active, dynamically update the button's aria-label
    // to the feedback message (e.g. "Copied!") so VoiceOver and other screen readers
    // immediately announce the action confirmation.
    const currentLabel = this._showFeedback ? this.feedback : initialLabel;

    this.shadowRoot
      ?.querySelector('button')
      ?.setAttribute('aria-label', currentLabel);
  }

  static styles = styles;
}

export default CDSCopy;
