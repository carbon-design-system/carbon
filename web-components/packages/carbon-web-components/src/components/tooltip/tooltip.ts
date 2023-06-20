/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import CDSPopover from '../popover/popover';
import '../popover/popover-content';
import styles from './tooltip.scss';
import CDSTooltipContent from './tooltip-content';

/**
 * Trigger button of tooltip.
 *
 * @element cds-tooltip
 */
@customElement(`${prefix}-tooltip`)
class CDSTooltip extends HostListenerMixin(CDSPopover) {
  /**
   * Specify how the trigger should align with the tooltip
   */
  @property({ reflect: true, type: String })
  align = 'top';

  /**
   * `true` if this tooltip is in a data table row
   */
  @property({ type: Boolean, reflect: true, attribute: 'data-table' })
  dataTable = false;

  /**
   * Specify whether the tooltip should be closed when clicked
   */
  @property({ reflect: true, type: Boolean })
  closeOnActivation = false;

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
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  @property({ attribute: 'leave-delay-ms', type: Number })
  leaveDelayMs = 300;

  /**
   * Specify the size of the tooltip
   */
  @property({ reflect: true })
  size = false;

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  @property({ reflect: true, attribute: 'toolbar-action', type: Boolean })
  toolbarAction = false;

  /**
   * Handles `mouseover` event on this element.
   */
  private _handleHover = async () => {
    setTimeout(async () => {
      this.open = true;
      const { open, updateComplete } = this;
      if (open) {
        await updateComplete;
        const { selectorTooltipContent } = this
          .constructor as typeof CDSTooltip;
        (this.querySelector(selectorTooltipContent) as HTMLElement)?.focus();
      }
    }, this.enterDelayMs);
  };

  /**
   * Handles `mouseleave` event on this element.
   */
  private _handleHoverOut = async () => {
    setTimeout(async () => {
      const { open } = this;
      if (open) {
        this.open = false;
      }
    }, this.leaveDelayMs);
  };

  /**
   * Handles `click` event on this element.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = async () => {
    if (this.closeOnActivation) {
      this._handleHoverOut();
    }
  };

  /**
   * Handles `keydown` event on this element.
   * Space & enter will toggle state, Escape will only close.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = async (event) => {
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'Escape') {
      this._handleHoverOut();
    }
  };

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const component = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    if (!component[0]) {
      return;
    }
    (component[0] as HTMLElement).addEventListener('focus', this._handleHover);
    (component[0] as HTMLElement).addEventListener(
      'focusout',
      this._handleHoverOut
    );
    (component[0] as HTMLElement).addEventListener(
      'mouseover',
      this._handleHover
    );
    (component[0] as HTMLElement).addEventListener(
      'mouseleave',
      this._handleHoverOut
    );
    this.requestUpdate();
  }

  connectedCallback() {
    if (!this.hasAttribute('highContrast')) {
      this.setAttribute('highContrast', '');
    }
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    const { selectorTooltipContent } = this.constructor as typeof CDSTooltip;
    const toolTipContent = this.querySelector(selectorTooltipContent);

    if (changedProperties.has('defaultOpen')) {
      this.open = this.defaultOpen;
    }

    if (changedProperties.has('open')) {
      this.open
        ? toolTipContent?.setAttribute('open', '')
        : toolTipContent?.removeAttribute('open');
      this.setAttribute('aria-expanded', String(Boolean(this.open)));
    }

    ['align', 'caret'].forEach((name) => {
      if (changedProperties.has(name)) {
        const { [name as keyof CDSTooltip]: value } = this;
        (toolTipContent as CDSTooltipContent)[name] = value;
      }
    });

    this.shadowRoot
      ?.querySelector(`.${prefix}--popover-container`)
      ?.classList.add(`${prefix}--tooltip`);
  }

  /**
   * A selector that will return the CDSTooltipContent.
   */
  static get selectorTooltipContent() {
    return `${prefix}-tooltip-content`;
  }

  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  } // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSTooltip;
