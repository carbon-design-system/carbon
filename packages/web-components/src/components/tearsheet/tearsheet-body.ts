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
import { consume } from '@lit/context';
import {
  tearsheetContext,
  defaultTearsheetState,
  type TearsheetContextValue,
} from './tearsheet-context';
import { CollapsibleController } from '../../globals/js/utils/collapsible-controller';

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
class CDSTearsheetBody extends HostListenerMixin(LitElement) {
  @property({ reflect: true })
  slot = 'body';

  @property({ type: Boolean, reflect: true, attribute: 'is-flush' })
  isFlush: boolean = false;

  @query('slot[name="summary-content"]')
  private _summaryContentSlot?: HTMLSlotElement;

  @state()
  private _hasSummaryContent = false;

  @consume({ context: tearsheetContext, subscribe: true })
  private _tearsheetCtx?: TearsheetContextValue;

  // @ts-expect-error // CollapsibleController uses 'this' before super() in strict mode
  private _collapsibleController = new CollapsibleController(this, {
    container: () => this.getMainContentContainer(),
    triggerCollapse: (collapse: boolean) => this.collapseHeader(collapse),
    disable: () =>
      (this._tearsheetCtx?.state ?? defaultTearsheetState)
        .disableHeaderCollapse,
  });

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
        this._tearsheetCtx?.setState({ fullyCollapsed: true });
      }
    } else if (scrollContainer.scrollTop === 0) {
      this._tearsheetCtx?.setState({ fullyCollapsed: false });
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
    const { hasAILabel } = this._tearsheetCtx?.state ?? defaultTearsheetState;

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
