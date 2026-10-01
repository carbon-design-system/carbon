/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import '../layer/index';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './tearsheet.scss?lit';
import { SignalWatcher } from '@lit-labs/signals';

import { CollapsibleController } from '../../globals/js/utils/collapsible-controller';
import {
  getTearsheetSignal,
  getTearsheetState,
  updateTearsheetState,
  getParentTearsheetId,
} from './tearsheet-signal';

const blockClass = `${prefix}--tearsheet`;

/**
 * Tearsheet Body component - Contains the main content area with optional influencer and summary panels.
 * Supports automatic header collapse on scroll.
 *
 * @element cds-tearsheet-body
 * @slot influencer - Left-side panel for contextual information (use cds-tearsheet-influencer)
 * @slot main-content - Primary content area
 * @slot summary-content - Right-side panel for summary details (use cds-tearsheet-summary-content)
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

  /** uniqueId of the parent cds-tearsheet, read once in connectedCallback. */
  private _uniqueId: string = '';

  // @ts-expect-error // CollapsibleController uses 'this' before super() in strict mode
  private _collapsibleController = new CollapsibleController(this, {
    container: () => this.getMainContentContainer(),
    triggerCollapse: (collapse: boolean) => this.collapseHeader(collapse),
    disable: () => getTearsheetState(this._uniqueId).disableHeaderCollapse,
  });

  connectedCallback(): void {
    super.connectedCallback();
    this._uniqueId = getParentTearsheetId(this);
  }

  private getMainContentContainer(): HTMLElement | null {
    return this.querySelector('[slot="main-content"]') || null;
  }

  private collapseHeader(collapse: boolean) {
    const scrollContainer =
      this.shadowRoot?.querySelector(`.${blockClass}__main-content`) || null;
    if (!scrollContainer) return;

    if (collapse) {
      const canScroll =
        scrollContainer.scrollHeight > scrollContainer.clientHeight;
      if (canScroll) {
        updateTearsheetState(this._uniqueId, { fullyCollapsed: true });
      }
    } else if (scrollContainer.scrollTop === 0) {
      updateTearsheetState(this._uniqueId, { fullyCollapsed: false });
    }
  }

  protected override firstUpdated(): void {
    this._checkSummaryContent();
  }

  private _checkSummaryContent() {
    if (this._summaryContentSlot) {
      this._hasSummaryContent =
        this._summaryContentSlot.assignedElements().length > 0;
    }
  }

  private _handleSlotChange() {
    this._checkSummaryContent();
  }

  render() {
    // getTearsheetSignal(id).get() subscribes SignalWatcher to only this
    // instance's signal — changes in other tearsheets never trigger a re-render.
    const { hasAILabel } = getTearsheetSignal(this._uniqueId).get();

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
        @slotchange="${this._handleSlotChange}"></slot>
    `;
  }

  static styles = styles;
}

export default CDSTearsheetBody;
