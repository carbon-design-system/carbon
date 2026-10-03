/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import HostListenerMixin from '../../globals/mixins/host-listener';
import '../side-panel/index';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

import styles from './tearsheet.scss?lit';
import { consume } from '@lit/context';
import {
  tearsheetContext,
  defaultTearsheetState,
  type TearsheetContextValue,
} from './tearsheet-context';
import { prefix } from '../../globals/settings.js';

/**
 * Tearsheet Influencer component - Left-side panel for contextual information.
 * Automatically converts to a slide-in panel on small screens.
 *
 * @element cds-tearsheet-influencer
 * @slot - Content for the influencer panel
 * @fires cds-tearsheet-influencer-closed - Fired when the influencer panel is closed (mobile only)
 */
@customElement(`${prefix}-tearsheet-influencer`)
class CDSTearsheetInfluencer extends HostListenerMixin(LitElement) {
  @property({ reflect: true })
  slot = 'influencer';

  @property({ type: Boolean, reflect: true, attribute: 'is-flush' })
  isFlush: boolean = false;

  @property({
    type: Boolean,
    reflect: true,
    attribute: 'influencer-panel-open',
  })
  influencerPanelOpen: boolean = false;

  @property({ attribute: 'influencer-panel-aria-label' })
  influencerPanelAriaLabel: string = 'Influencer panel';

  @consume({ context: tearsheetContext, subscribe: true })
  private _tearsheetCtx?: TearsheetContextValue;

  private handleClose = () => {
    this.influencerPanelOpen = false;
    this.dispatchEvent(
      new CustomEvent(`${prefix}-tearsheet-influencer-closed`, {
        bubbles: true,
        composed: true,
      })
    );
  };

  render() {
    const { isSm } = this._tearsheetCtx?.state ?? defaultTearsheetState;

    return !isSm
      ? html` <aside aria-label="${this.influencerPanelAriaLabel}">
          <slot></slot>
        </aside>`
      : html` <cds-side-panel
          size="sm"
          ?open="${this.influencerPanelOpen}"
          placement="left"
          aria-label="${this.influencerPanelAriaLabel}"
          aria-modal="true"
          @cds-side-panel-closed="${this.handleClose}">
          <slot></slot>
        </cds-side-panel>`;
  }

  static styles = styles;
}
export default CDSTearsheetInfluencer;
