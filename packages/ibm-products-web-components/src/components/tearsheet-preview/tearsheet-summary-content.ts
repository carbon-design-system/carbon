/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import '../side-panel/index.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './tearsheet.scss?lit';
import { SignalWatcher } from '@lit-labs/signals';
import { tearsheetSignal } from './tearsheet-signal';

const blockClass = `${prefix}--tearsheet__next`;

/**
 * Tearsheet Summary Content component - Right-side panel for summary details.
 * Automatically converts to a slide-in panel on small screens.
 *
 * @element c4p-tearsheet-summary-content
 * @slot - Content for the summary panel
 * @fires cds-tearsheet-summary-closed - Fired when the summary panel is closed (mobile only)
 */
@customElement(`${prefix}-tearsheet-summary-content`)
class CDSTearsheetSummaryContent extends SignalWatcher(
  HostListenerMixin(LitElement)
) {
  @property({ reflect: true })
  slot = 'summary-content';

  @property({ type: Boolean, reflect: true, attribute: 'is-flush' })
  isFlush: boolean = false;

  /**
   * In mobile screens right side summary-content section won't be visible by default.
   * This prop can be toggled to open/close right panel in this case.
   */
  @property({ type: Boolean, reflect: true, attribute: 'summary-panel-open' })
  summaryPanelOpen: boolean = false;

  /**
   * Optional aria-label for the summary panel. Defaults to "Summary panel".
   */
  @property({ attribute: 'summary-panel-aria-label' })
  summaryPanelAriaLabel: string = 'Summary panel';

  /**
   * Handler for closing the summary panel
   */
  private handleClose = () => {
    this.summaryPanelOpen = false;
    this.dispatchEvent(
      new CustomEvent('cds-tearsheet-summary-closed', {
        bubbles: true,
        composed: true,
      })
    );
  };

  firstUpdated() {
    this.classList.add(`${blockClass}__summary-content`);
  }

  render() {
    const { isSm } = tearsheetSignal.get();

    const classes = classMap({
      [`${blockClass}__flush`]: this.isFlush,
    });

    return !isSm
      ? html` <aside class="${classes}">
          <slot></slot>
        </aside>`
      : html` <c4p-side-panel
          size="sm"
          ?slide-in=${true}
          ?open="${this.summaryPanelOpen}"
          placement="right"
          aria-label="${this.summaryPanelAriaLabel}"
          aria-modal="true"
          @c4p-side-panel-closed="${this.handleClose}"
        >
          <slot></slot>
        </c4p-side-panel>`;
  }

  static styles = styles;
}
export default CDSTearsheetSummaryContent;
