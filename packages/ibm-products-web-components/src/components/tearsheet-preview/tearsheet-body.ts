/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import '@carbon/web-components/es/components/layer/index.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './tearsheet.scss?lit';
import { SignalWatcher } from '@lit-labs/signals';

import { CollapsibleController } from '../../globals/js/utils/collapsible-controller';
import { tearsheetSignal, updateTearsheetSignals } from './tearsheet-signal';

const blockClass = `${prefix}--tearsheet__next`;

/**
 * Tearsheet Body component - Contains the main content area with optional influencer and summary panels.
 * Supports automatic header collapse on scroll.
 *
 * @element c4p-tearsheet-body
 * @slot influencer - Left-side panel for contextual information (use c4p-tearsheet-influencer)
 * @slot main-content - Primary content area
 * @slot summary-content - Right-side panel for summary details (use c4p-tearsheet-summary-content)
 */
@customElement(`${prefix}-tearsheet-body`)
class CDSTearsheetBody extends SignalWatcher(HostListenerMixin(LitElement)) {
  @property({ reflect: true })
  slot = 'body';

  @property({ type: Boolean, reflect: true, attribute: 'is-flush' })
  isFlush: boolean = false;

  @query('slot[name="summary-content"]')
  private _summaryContentSlot?: HTMLSlotElement;

  @state()
  private _hasSummaryContent = false;

  /**@ts-ignore */
  private _collapsibleController = new CollapsibleController(this, {
    container: () => this.getMainContentContainer(),
    triggerCollapse: (collapse: boolean) => this.collapseHeader(collapse),
    disable: () => {
      const { disableHeaderCollapse } = tearsheetSignal.get();

      return disableHeaderCollapse;
    },
  });

  private getMainContentContainer(): HTMLElement | null {
    // Query the shadow DOM for the main content container
    return this.querySelector('[slot="main-content"]') || null;
  }

  private collapseHeader(collapse: boolean) {
    const scrollContainer =
      this.shadowRoot?.querySelector(`.${blockClass}__main-content`) || null;
    if (!scrollContainer) {
      return;
    }

    if (collapse) {
      // Collapse header only when there is scroll
      const canScroll =
        scrollContainer.scrollHeight > scrollContainer.clientHeight;

      if (canScroll) {
        updateTearsheetSignals({
          fullyCollapsed: true,
        });
      }
    } else if (scrollContainer.scrollTop === 0) {
      // Expand header when scroll reaches top
      updateTearsheetSignals({
        fullyCollapsed: false,
      });
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this._checkSummaryContent();
  }

  private _checkSummaryContent() {
    if (this._summaryContentSlot) {
      const assignedNodes = this._summaryContentSlot.assignedElements();
      this._hasSummaryContent = assignedNodes.length > 0;
    }
  }

  private _handleSlotChange() {
    this._checkSummaryContent();
  }

  render() {
    const { hasAILabel } = tearsheetSignal.get();

    const mainContentClasses = classMap({
      [`${blockClass}__main-content`]: true,
      [`${blockClass}__flush`]: this.isFlush,
      [`${blockClass}__main-content--no-summary`]: !this._hasSummaryContent,
      [`${blockClass}__main-content--has-ai-label`]: hasAILabel,
    });

    return html`
      <cds-layer class="${mainContentClasses}" ?with-background="${true}">
        <slot name="main-content"></slot>
      </cds-layer>
      <slot
        name="summary-content"
        @slotchange="${this._handleSlotChange}"
      ></slot>
    `;
  }

  static styles = styles;
}

export default CDSTearsheetBody;
