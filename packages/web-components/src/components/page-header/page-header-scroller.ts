/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import styles from './page-header.scss?lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import Chevron20 from '@carbon/icons/es/chevron--up/20';
import ChevronDown20 from '@carbon/icons/es/chevron--down/20';
import { iconLoader } from '../../globals/internal/icon-loader';
import '../button/index';
import { pageHeaderContext } from './context';
import { consume } from '@lit/context';
import CDSButton from '../button/button';
import { prefix } from '../../globals/settings';
import { scrollableAncestorInner } from './utils';

/**
 * Page header Scroller button
 * @element cds-page-header-scroller
 */
@customElement(`${prefix}-page-header-scroller`)
export class PageHeaderScroller extends CDSButton {
  /**
   * Specify how the trigger should align with the tooltip
   */
  @property({ reflect: true, type: String })
  align = 'top';

  /**
   * Specify whether a auto align functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoalign = true;

  /**
   * Determines whether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  @property({ attribute: 'close-on-activation', reflect: true, type: Boolean })
  closeOnActivation = true;

  /**
   * Specify the collapse text for the scroller button
   */
  @property({ reflect: true, type: String })
  collapseText = 'Collapse';

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  @property({ reflect: true, type: Boolean })
  defaultOpen = false;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  @property({ attribute: 'enter-delay-ms', type: Number })
  enterDelayMs = 100;

  /**
   * Specify the expand text for the scroller button
   */
  @property({ reflect: true, type: String })
  expandText = 'Expand';

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  @property({ attribute: 'leave-delay-ms', type: Number })
  leaveDelayMs = 300;

  /**
   * Specify the size of the Button. Defaults to `md`.
   */
  @property({ reflect: true })
  size = 'md';

  @consume({ context: pageHeaderContext, subscribe: true })
  @state()
  context;

  protected _renderTooltipContent() {
    return html`
      <cds-tooltip-content>
        <slot name="tooltip-content"></slot>
      </cds-tooltip-content>
    `;
  }

  private _handleScroller = () => {
    const { root, fullyCollapsed } = this.context ?? {};
    const searchRoot: Element | null =
      root ?? this.closest(`${prefix}-page-header`);
    const contentElement = searchRoot?.querySelector<HTMLElement>(
      `${prefix}-page-header-content`
    );
    if (!contentElement) {
      return;
    }
    const scrollableTarget = scrollableAncestorInner(
      contentElement
    ) as HTMLElement;

    // Page header content is not fully collapsed
    if (!fullyCollapsed) {
      const pageHeaderContentHeight = contentElement.offsetHeight;
      scrollableTarget?.scrollTo({
        top: pageHeaderContentHeight, // headerTopValue, check if breadcrumb bar is included
        behavior: 'smooth',
      });
    } else {
      // Page header content is fully collapsed
      scrollableTarget?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  render() {
    const {
      align,
      closeOnActivation,
      defaultOpen,
      enterDelayMs,
      leaveDelayMs,
      disabled,
      size,
      context,
      autoalign,
    } = this;

    const iconClasses = classMap({
      [`${prefix}--page-header-scroller-collapsed`]: !!context?.fullyCollapsed,
      [`${prefix}--page-header-scroller-icon`]: true,
    });
    return html`<cds-icon-button
      align=${align}
      ?close-on-activation=${closeOnActivation}
      ?defaultOpen=${defaultOpen}
      ?disabled=${disabled}
      enter-delay-ms=${enterDelayMs}
      kind="ghost"
      leave-delay-ms=${leaveDelayMs}
      size=${size}
      ?autoalign=${autoalign}
      class=${iconClasses}
      label=${context?.fullyCollapsed ? this.expandText : this.collapseText}
      @click=${this._handleScroller}>
      ${context?.fullyCollapsed
        ? html`${iconLoader(ChevronDown20, { slot: 'icon' })}`
        : html`${iconLoader(Chevron20, { slot: 'icon' })}`}
      <span slot="tooltip-content">
        ${context?.fullyCollapsed ? this.expandText : this.collapseText}
      </span>
    </cds-icon-button>`;
  }
  static styles = styles;
}
