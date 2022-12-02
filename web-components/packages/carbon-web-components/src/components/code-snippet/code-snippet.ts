/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { TemplateResult } from 'lit-html';
import { html, property, query, customElement, LitElement } from 'lit-element';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import settings from 'carbon-components/es/globals/js/settings';
import FocusMixin from '../../globals/mixins/focus';
import {
  _createHandleFeedbackTooltip as createHandleCopyButtonFeedbackTooltip,
  _renderButton as renderCopyButton,
} from '../copy-button/copy-button';
import { CODE_SNIPPET_COLOR_SCHEME, CODE_SNIPPET_TYPE } from './defs';
import styles from './code-snippet.scss';

export { CODE_SNIPPET_COLOR_SCHEME, CODE_SNIPPET_TYPE };

const { prefix } = settings;

/**
 * @param values The values to render.
 * @param values.children The child nodes.
 * @param values.handleClick The handler for the `click` event on the button.
 * @returns The template result for the expando.
 */
const renderExpando = ({
  children,
  handleClick,
}: {
  children: string | TemplateResult;
  handleClick: EventListener;
}) => html`
  <button
    type="button"
    class="${prefix}--snippet-btn--expand"
    @click="${handleClick}">
    <span id="button-text" class="${prefix}--snippet-btn--text">
      ${children}
    </span>
    ${ChevronDown16({
      'aria-labeledby': 'button-text',
      class: `${prefix}--icon-chevron--down ${prefix}--snippet__icon`,
      role: 'img',
    })}
  </button>
`;

/**
 * @param values The values to render.
 * @param values.assistiveText The assistive text to announce that the node is for code snippet.
 * @param [values.expanded] `true` to show the expanded state (for multi-line variant).
 * @param values.children The child nodes.
 * @returns The template result for the code snippet.
 */
const renderCode = ({
  assistiveText,
  expanded,
  children,
}: {
  assistiveText: string;
  expanded?: boolean;
  children: string | TemplateResult;
}) => {
  const classes = classMap({
    [`${prefix}--snippet-container`]: true,
    [`${prefix}-ce--snippet-container--expanded`]: Boolean(expanded),
  });
  // Ensures no extra whitespace text node
  // prettier-ignore
  return html`
    <div role="textbox" tabindex="0" class="${classes}" aria-label="${assistiveText}"><code><pre>${children}</pre></code></div>
  `;
};

/**
 * Basic code snippet.
 *
 * @element bx-code-snippet
 */
@customElement(`${prefix}-code-snippet`)
class BXCodeSnippet extends FocusMixin(LitElement) {
  /**
   * `true` to expand multi-line variant of code snippet.
   */
  private _expanded = false;

  /**
   * `true` to show the feedback tooltip.
   */
  private _showCopyButtonFeedback = false;

  /**
   * `true` to show the expando.
   */
  private _showExpando = false;

  /**
   * Handles `click` event on the copy button.
   */
  private _handleClickCopyButton() {
    const { ownerDocument: doc } = this;
    const selection = doc!.defaultView!.getSelection();
    selection!.removeAllRanges();
    const code = doc!.createElement('code');
    code.className = `${prefix}--visually-hidden`;
    const pre = doc!.createElement('pre');
    pre.textContent = this.textContent;
    code.appendChild(pre);
    // Using `<code>` in shadow DOM seems to lose the LFs in some browsers
    doc!.body.appendChild(code);
    const range = doc!.createRange();
    range.selectNodeContents(code);
    selection!.addRange(range);
    doc!.execCommand('copy');
    this._handleCopyButtonFeedbackTooltip(this.copyButtonFeedbackTimeout);
    doc!.body.removeChild(code);
    selection!.removeAllRanges();
  }

  /**
   * Handles showing/hiding the feedback tooltip.
   */
  private _handleCopyButtonFeedbackTooltip =
    createHandleCopyButtonFeedbackTooltip(
      ({ showFeedback = false }: { showFeedback?: boolean }) => {
        this._showCopyButtonFeedback = showFeedback;
        this.requestUpdate();
      }
    );

  /**
   * Handles `click` event on the expando.
   */
  private _handleClickExpando() {
    this._expanded = !this._expanded;
    this.requestUpdate();
  }

  /**
   * Handles change in slot content to determine if the content
   */
  private _handleSlotChange() {
    const { type, _preNode: preNode } = this;
    if (type === CODE_SNIPPET_TYPE.MULTI) {
      if (preNode.getBoundingClientRect().height > 255) {
        this._showExpando = true;
        this.requestUpdate();
      }
    }
  }

  /**
   * The `<pre>` element in the shadow DOM.
   */
  @query('pre')
  private _preNode!: HTMLPreElement;

  /**
   * An assistive text for screen reader to advice a DOM node is for code snippet.
   */
  @property({ attribute: 'code-assistive-text' })
  codeAssistiveText = 'code-snippet';

  /**
   * The context content for the collapse button.
   */
  @property({ attribute: 'collapse-button-text' })
  collapseButtonText = 'Show less';

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = CODE_SNIPPET_COLOR_SCHEME.REGULAR;

  /**
   * An assistive text for screen reader to announce, telling that the button copies the content to the clipboard.
   */
  @property({ attribute: 'copy-button-assistive-text' })
  copyButtonAssistiveText = 'Copy to clipboard';

  /**
   * The feedback text for the copy button.
   */
  @property({ attribute: 'copy-button-feedback-text' })
  copyButtonFeedbackText = 'Copied!';

  /**
   * The number in milliseconds to determine how long the tooltip for the copy button should remain.
   */
  @property({ type: Number, attribute: 'copy-button-feedback-timeout' })
  copyButtonFeedbackTimeout = 2000;

  /**
   * The context content for the expand button.
   */
  @property({ attribute: 'expand-button-text' })
  expandButtonText = 'Show more';

  /**
   * The type of code snippet.
   */
  @property({ reflect: true })
  type = CODE_SNIPPET_TYPE.SINGLE;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

  render() {
    const {
      codeAssistiveText,
      collapseButtonText,
      copyButtonAssistiveText,
      copyButtonFeedbackText,
      expandButtonText,
      type,
      _expanded: expanded,
      _showCopyButtonFeedback: showCopyButtonFeedback,
      _showExpando: showExpando,
      _handleClickCopyButton: handleClickCopyButton,
      _handleClickExpando: handleClickExpando,
      _handleSlotChange: handleSlotChange,
    } = this;

    if (type === CODE_SNIPPET_TYPE.SINGLE) {
      // Ensures no extra whitespace text node
      // prettier-ignore
      return html`
        ${renderCode({
          assistiveText: codeAssistiveText,
          expanded,
          children: html`<slot @slotchange="${handleSlotChange}"></slot>`,
        })}
        ${renderCopyButton({
          assistiveText: copyButtonAssistiveText,
          feedbackText: copyButtonFeedbackText,
          showFeedback: showCopyButtonFeedback,
          handleClickButton: handleClickCopyButton,
          className: `${prefix}--snippet-button`,
        })}
      `;
    }

    if (type === CODE_SNIPPET_TYPE.MULTI) {
      // Ensures no extra whitespace text node
      // prettier-ignore
      return html`
        ${renderCode({
          assistiveText: codeAssistiveText,
          expanded,
          children: html`<slot @slotchange="${handleSlotChange}"></slot>`,
        })}
        ${renderCopyButton({
          assistiveText: copyButtonAssistiveText,
          feedbackText: copyButtonFeedbackText,
          showFeedback: showCopyButtonFeedback,
          handleClickButton: handleClickCopyButton,
          className: `${prefix}--snippet-button`,
        })}
        ${!showExpando
          ? undefined
          : renderExpando({
              children: expanded
                ? html`<slot name="collapse-button-text">${collapseButtonText}</slot>`
                : html`<slot name="expand-button-text">${expandButtonText}</slot>`,
              handleClick: handleClickExpando,
            })}
      `;
    }

    // Ensures no extra whitespace text node
    // prettier-ignore
    return html`
      ${renderCopyButton({
        assistiveText: copyButtonAssistiveText,
        feedbackText: copyButtonFeedbackText,
        showFeedback: showCopyButtonFeedback,
        handleClickButton: handleClickCopyButton,
        className: `${prefix}--snippet ${prefix}--snippet--inline`,
        children: html`<code aria-label="${codeAssistiveText}"><slot></slot></code>`,
      })}
    `;
  }

  static styles = styles;
}

export default BXCodeSnippet;
