/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import ChevronDownGlyph from '@carbon/icons/lib/chevron--down/16';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { forEach } from '../../globals/internal/collection-helpers';
import CDSHeaderMenuItem from './header-menu-item';
import styles from './header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Header menu.
 *
 * @element cds-header-menu
 * @csspart trigger The trigger button.
 * @csspart trigger-icon The trigger button icon.
 * @csspart menu-body The menu body.
 */
@customElement(`${prefix}-header-menu`)
class CDSHeaderMenu extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * The trigger button.
   */
  @query('[part="trigger"]')
  protected _topMenuItem!: HTMLElement;

  /**
   * keeps track if header menu has any active submenus
   */
  private _hasActiveChildren = false;

  /**
   * Handles `click` event handler on this element.
   */
  private _handleClick() {
    this._handleUserInitiatedToggle();
  }

  /**
   * Handler for the `keydown` event on the trigger button.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydownTrigger({ key }: KeyboardEvent) {
    if (key === 'Esc' || key === 'Escape') {
      this._handleUserInitiatedToggle(false);
    }
  }

  /**
   * Handles user-initiated toggling the open state.
   *
   * @param [force] If specified, forces the open state to the given one.
   */
  private _handleUserInitiatedToggle(force: boolean = !this.expanded) {
    this.expanded = force;
    if (!force) {
      this._topMenuItem.focus();
    }
  }

  /**
   * Handles `blur` event handler on this element.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur({ relatedTarget }: FocusEvent) {
    if (!this.contains(relatedTarget as Node)) {
      this.expanded = false;
    }
  }

  /**
   * `true` if the menu should be expanded.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
   */
  @property({ type: Boolean, attribute: 'is-active', reflect: true })
  isActive = false;

  /**
   * The content of the trigger button.
   */
  @property({ attribute: 'trigger-content' })
  triggerContent = '';

  /**
   * The `aria-label` attribute for the menu UI.
   */
  @property({ attribute: 'menu-label' })
  menuLabel!: string;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    const { selectorItem } = this.constructor as typeof CDSHeaderMenu;
    forEach(this.querySelectorAll(selectorItem), (elem) => {
      if ((elem as CDSHeaderMenuItem).isActive === true) {
        this._hasActiveChildren = true;
      }
    });

    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('expanded')) {
      const { selectorItem } = this.constructor as typeof CDSHeaderMenu;
      const { expanded } = this;
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        (elem as HTMLElement).tabIndex = expanded ? 0 : -1;
      });
    }
  }

  render() {
    const {
      expanded,
      isActive,
      triggerContent,
      menuLabel,
      _hasActiveChildren,
      _handleClick: handleClick,
    } = this;

    const linkClasses = classMap({
      [`${prefix}--header__menu-item`]: true,
      [`${prefix}--header__menu-title`]: true,
      [`${prefix}--header__menu-item--current`]:
        isActive || (_hasActiveChildren && !expanded),
    });

    return html`
      <a
        part="trigger"
        role="button"
        tabindex="0"
        class="${linkClasses}"
        href="javascript:void 0"
        aria-haspopup="menu"
        aria-expanded="${String(Boolean(expanded))}"
        @click=${handleClick}>
        ${triggerContent}${ChevronDownGlyph({
          part: 'trigger-icon',
          class: `${prefix}--header__menu-arrow`,
        })}
      </a>
      <ul
        part="menu-body"
        class="${prefix}--header__menu"
        aria-label="${ifDefined(menuLabel)}">
        <slot></slot>
      </ul>
    `;
  }

  /**
   * A selector that will return the menu items.
   */
  static get selectorItem() {
    return `${prefix}-header-menu-item`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSHeaderMenu;
