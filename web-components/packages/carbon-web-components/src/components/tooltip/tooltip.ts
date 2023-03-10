/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import Information16 from '@carbon/icons/lib/information/16';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { find } from '../../globals/internal/collection-helpers';
import BXFloatingMenu from '../floating-menu/floating-menu';
import BXFloatingMenuTrigger from '../floating-menu/floating-menu-trigger';
import styles from './tooltip.scss';

/**
 * Trigger button of tooltip.
 *
 * @element cds-tooltip
 */
@customElement(`${prefix}-tooltip`)
class BXTooltip
  extends HostListenerMixin(LitElement)
  implements BXFloatingMenuTrigger
{
  /**
   * The menu body.
   */
  private _menuBody: BXFloatingMenu | null = null;

  /**
   * The trigger button.
   */
  @query('#trigger')
  private _triggerNode!: HTMLElement;

  @property({ reflect: true, type: String })
  align = 'bottom';

  @property({ reflect: true, type: String })
  duration;

  @property({ attribute: 'enter-delay-ms', type: Number })
  enterDelayMs = 100;

  @property({ attribute: 'exit-delay-ms', type: Number })
  exitDelayMs = 300;

  /**
   * Handles `click` event on this element.
   */
  @HostListener('mouseover')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = async () => {
    setTimeout(async () => {
      this.open = !this.open;
      const { open, updateComplete } = this;
      if (open) {
        await updateComplete;
        const { _menuBody: menuBody } = this;
        (
          menuBody?.shadowRoot?.querySelector(
            BXTooltip.selectorTooltipBody
          ) as HTMLElement
        )?.focus();
      }
    }, this.enterDelayMs);
  };

  /**
   * Handles `keydown` event on this element.
   */
  @HostListener('mouseout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleHoverOut = async () => {
    setTimeout(async () => {
      const { open } = this;
      if (open) {
        this.open = !this.open;
      }
    }, this.exitDelayMs);
  };

  /**
   * Handles `keydown` event on this element.
   * Space & enter will toggle state, Escape will only close.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = async (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      this._handleOver();
    }
  };

  /**
   * `true` if the dropdown should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * @returns The position of the trigger button in the viewport.
   */
  get triggerPosition() {
    const { _triggerNode: triggerNode } = this;
    if (!triggerNode) {
      throw new TypeError('Cannot find the trigger button.');
    }
    return triggerNode.getBoundingClientRect();
  }

  connectedCallback() {
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
    if (changedProperties.has('open')) {
      if (!this._menuBody) {
        this._menuBody = find(
          this.childNodes,
          (elem) => (elem.constructor as typeof BXFloatingMenu).FLOATING_MENU
        );
      }
      if (this._menuBody) {
        this._menuBody.open = this.open;
      }
      this.setAttribute('aria-expanded', String(Boolean(this.open)));
    }
  }

  render() {
    const buttonClasses = classMap({
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: true,
      [`${prefix}--popover--high-contrast`]: true,
      [`${prefix}--tooltip`]: true,
      [`${prefix}--popover--open`]: this.open,
      [`${prefix}--popover--${this.align}`]: true,
    });
    return html`
      <span class="${buttonClasses}">
        <button class="sb-tooltip-trigger">
          ${Information16({ id: 'trigger' })}
        </button>
        <span class="${prefix}--popover">
          <span class="${prefix}--popover-content ${prefix}--tooltip-content">
            <slot></slot>
          </span>
          <span class="${prefix}--popover-caret"> </span>
        </span>
      </span>
    `;
  }

  static get selectorTooltipBody() {
    return `.${prefix}--tooltip__content`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXTooltip;
