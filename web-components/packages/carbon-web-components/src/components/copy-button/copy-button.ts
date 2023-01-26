/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html, TemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import Copy16 from '@carbon/icons/lib/copy/16';
import settings from 'carbon-components/es/globals/js/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './copy-button.scss';

const { prefix } = settings;

/**
 * Note: For `<bx-code-snippet>` only. The API is subject to change/removal.
 *
 * @param update The callback function that dictates how to update the DOM with new feedback tooltip state.
 * @returns A function that shows the feedback tooltip for the given duration.
 * @private
 */
export const _createHandleFeedbackTooltip = (
  update: (properties: { showFeedback?: boolean }) => void
) => {
  let timeoutId: number | void;
  return (timeout: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
    update({ showFeedback: true });
    timeoutId = setTimeout(() => {
      update({ showFeedback: false });
    }, timeout) as unknown as number;
  };
};

/**
 * Note: For `<bx-code-snippet>` only. The API is subject to change/removal.
 *
 * @param properties The properties to render.
 * @returns The template result for copy button from the given properties.
 * @private
 */
export const _renderButton = ({
  assistiveText,
  feedbackText,
  showFeedback = false,
  className = `${prefix}--snippet-button`,
  children = html`
    <slot>${Copy16({ class: `${prefix}--snippet__icon` })}</slot>
  `,
  handleClickButton,
}: {
  assistiveText: string;
  feedbackText: string;
  showFeedback?: boolean;
  className?: string;
  children?: TemplateResult;
  handleClickButton: EventListener;
}) => {
  const feedbackClasses = classMap({
    [`${prefix}--btn--copy__feedback`]: true,
    [`${prefix}--btn--copy__feedback--displayed`]: showFeedback,
  });
  return html`
    <button
      type="button"
      class="${className}"
      title="${ifDefined(assistiveText)}"
      @click="${handleClickButton}">
      ${children}
      <div
        class="${feedbackClasses}"
        data-feedback="${ifDefined(feedbackText)}"></div>
    </button>
  `;
};

/**
 * Copy button.
 *
 * @element bx-copy-button
 */
@customElement(`${prefix}-copy-button`)
class BXCopyButton extends FocusMixin(LitElement) {
  /**
   * Handles showing/hiding the feedback tooltip.
   */
  private _handleFeedbackTooltip = _createHandleFeedbackTooltip(
    ({ showFeedback = false }: { showFeedback?: boolean }) => {
      this._showFeedback = showFeedback;
      this.requestUpdate();
    }
  );

  /**
   * `true` to show the feedback tooltip.
   */
  private _showFeedback = false;

  /**
   * Handles `click` event on the copy button.
   */
  private _handleClickButton() {
    this._handleFeedbackTooltip(this.feedbackTimeout);
  }

  /**
   * An assistive text for screen reader to announce, telling that the button copies the content to the clipboard.
   */
  @property({ attribute: 'button-assistive-text' })
  buttonAssistiveText = 'Copy to clipboard';

  /**
   * The feedback text.
   */
  @property({ attribute: 'feedback-text' })
  feedbackText = 'Copied!';

  /**
   * The number in milliseconds to determine how long the tooltip should remain.
   */
  @property({ type: Number, attribute: 'feedback-timeout' })
  feedbackTimeout = 2000;

  render() {
    const {
      buttonAssistiveText,
      feedbackText,
      _handleClickButton: handleClickButton,
      _showFeedback: showFeedback,
    } = this;
    return _renderButton({
      assistiveText: buttonAssistiveText,
      feedbackText,
      showFeedback,
      handleClickButton,
    });
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default BXCopyButton;
