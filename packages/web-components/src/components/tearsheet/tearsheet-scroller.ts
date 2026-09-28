/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import Chevron20 from '@carbon/icons/es/chevron--up/20';
import { iconLoader } from '../../globals/internal/icon-loader';
import '../button/index';
import '../icon-button/index';
import '../popover/popover-content';
import CDSButton from '../button/button';
import { prefix } from '../../globals/settings';
import {
  getTearsheetSignal,
  getTearsheetState,
  updateTearsheetState,
  getParentTearsheetId,
} from './tearsheet-signal';
import { SignalWatcher } from '@lit-labs/signals';

const blockClass = `${prefix}--tearsheet`;

/**
 * Tearsheet Scroller button
 * @element cds-tearsheet-scroller
 */
@customElement(`${prefix}-tearsheet-scroller`)
export class CDSTearsheetScroller extends SignalWatcher(CDSButton) {
  @property({ reflect: true })
  slot = 'scroller';

  @property({ reflect: true, type: String })
  align = 'left';

  @property({ reflect: true, type: String })
  collapseText = 'Collapse';

  @property({ reflect: true, type: String })
  expandText = 'Expand';

  @property({ reflect: true })
  size = 'md';

  /** uniqueId of the parent cds-tearsheet, read once in connectedCallback. */
  private _uniqueId: string = '';

  connectedCallback(): void {
    super.connectedCallback();
    this._uniqueId = getParentTearsheetId(this);
  }

  protected _renderTooltipContent() {
    return html`
      <cds-tooltip-content>
        <slot name="tooltip-content"></slot>
      </cds-tooltip-content>
    `;
  }

  private _handleScroller = () => {
    const { fullyCollapsed } = getTearsheetState(this._uniqueId);
    updateTearsheetState(this._uniqueId, {
      fullyCollapsed: !fullyCollapsed,
    });
  };

  render() {
    // getTearsheetSignal(id).get() subscribes SignalWatcher to only this
    // instance's signal — changes in other tearsheets never trigger a re-render.
    const { fullyCollapsed } = getTearsheetSignal(this._uniqueId).get();

    const iconClasses = classMap({
      [`scroller-collapsed`]: !!fullyCollapsed,
      [`${blockClass}__scroller-button`]: true,
    });

    return html`<cds-icon-button
      kind="ghost"
      size="md"
      class=${iconClasses}
      @click=${this._handleScroller}>
      ${iconLoader(Chevron20, { slot: 'icon' })}
      <span slot="tooltip-content">
        ${fullyCollapsed ? this.expandText : this.collapseText}
      </span>
    </cds-icon-button>`;
  }

  static styles = css`
    .scroller-collapsed svg {
      transform: rotate(180deg);
    }
  `;
}

export default CDSTearsheetScroller;
