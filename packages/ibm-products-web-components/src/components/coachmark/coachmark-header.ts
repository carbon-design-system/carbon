/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import '@carbon/web-components/es/components/button/index';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import styles from './coachmark-header.scss?lit';
import Close from '@carbon/icons/es/close/16';
import Draggable from '@carbon/icons/es/draggable/16';
import { SignalWatcher } from '@lit-labs/signals';
import {
  coachmarkDetailsSignal,
  updateCoachmarkDetailsSignal,
} from './coachmark-context';
import iconLoader from '@carbon/web-components/es/globals/internal/icon-loader';

/**
 * coachmark-header for content header section
 * @element c4p-coachmark-header
 */
@customElement(`${prefix}-coachmark-header`)
class CDSCoachmarkHeader extends SignalWatcher(HostListenerMixin(LitElement)) {
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  @property({ reflect: true })
  closeIconDescription?: string = '';

  /**
   * Tooltip text and aria label for the Drag button icon.
   */
  @property({ reflect: true })
  dragIconDescription?: string = '';

  private _handleClick = (event: Event) => {
    event.stopPropagation();

    const coachmark = this.closest(`${prefix}-coachmark`) as HTMLElement | null;
    if (coachmark) {
      coachmark.dispatchEvent(
        new CustomEvent(`${prefix}-coachmark-request-close`, {
          bubbles: true,
          composed: true,
          cancelable: true,
          detail: { source: 'header-close-button' },
        })
      );

      (coachmark as any).open = false;
    }

    updateCoachmarkDetailsSignal({
      name: 'open',
      detail: false,
    });
  };

  render() {
    const { floating } = coachmarkDetailsSignal.get();
    return html`
      ${floating
        ? html`
            <cds-button
              kind="ghost"
              size="sm"
              class="${prefix}--coachmark-header-drag-handle"
              tooltip-text="${this.dragIconDescription}"
            >
              ${iconLoader(Draggable, {
                slot: 'icon',
                class: `${prefix}--coachmark-header-drag-icon`,
              })}
            </cds-button>
          `
        : nothing}
      <slot name="header"></slot>
      <cds-button
        kind="ghost"
        size="sm"
        tooltip-text="${this.closeIconDescription}"
        @click=${this._handleClick}
      >
        ${iconLoader(Close, {
          slot: 'icon',
          class: `${prefix}--coachmark-header-close-icon`,
        })}
      </cds-button>
    `;
  }
  static styles = styles;
}

export default CDSCoachmarkHeader;
