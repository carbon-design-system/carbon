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
  @property({ reflect: true, type: String })
  align = 'top';

  @property({ reflect: true, type: Boolean })
  closeOnActivation = false;

  @property({ reflect: true, type: Boolean })
  defaultOpen = false;

  @property({ reflect: true, type: String })
  duration;

  @property({ attribute: 'enter-delay-ms', type: Number })
  enterDelayMs = 100;

  @property({ attribute: 'exit-delay-ms', type: Number })
  exitDelayMs = 300;

  /**
   * Handles `mouseover` event on this element.
   */
  @HostListener('mouseover')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleOver = async () => {
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
   * Handles `keydown` event on this element.
   */
  @HostListener('mouseleave')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleHoverOut = async () => {
    setTimeout(async () => {
      const { open } = this;
      if (open) {
        this.open = false;
      }
    }, this.exitDelayMs);
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
   * Handles `focus` event on this element.
   */
  @HostListener('focus')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocus = async () => {
    this._handleOver();
  };

  /**
   * Handles `focusout` event on this element.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocusOut = async () => {
    this._handleHoverOut();
  };

  /**
   * Handles `keydown` event on this element.
   * Space & enter will toggle state, Escape will only close.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = async (event) => {
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'Escape') {
      this._handleHoverOut();
    }
  };

  connectedCallback() {
    if (!this.hasAttribute('highContrast')) {
      this.setAttribute('highContrast', '');
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      // TODO: Should we use a property?
      this.setAttribute('tabindex', '0');
    }
    if (!this.hasAttribute('aria-haspopup')) {
      this.setAttribute('aria-haspopup', 'true');
    }
    if (!this.hasAttribute('aria-expanded')) {
      this.setAttribute('aria-expanded', 'false');
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
