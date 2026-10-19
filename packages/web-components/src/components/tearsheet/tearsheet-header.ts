/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import '../modal/index';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './tearsheet-header.scss?lit';
import {
  tearsheetContext,
  defaultTearsheetState,
  type TearsheetContextValue,
} from './tearsheet-context';
import { consume } from '@lit/context';
import { registerFocusableContainers } from '../../utilities/manageFocusTrap/manageFocusTrap';

const blockClass = `${prefix}--tearsheet`;

/** Minimal interface used to read the protected uniqueId from CDSTearsheet
 *  without importing the class (avoids circular dep). */
interface CDSTearsheetHost extends HTMLElement {
  readonly uniqueId: string;
}

/**
 * Tearsheet Header component - Contains the header section with title, description, and actions.
 *
 * @element cds-tearsheet-header
 * @slot header-content - The main header content area (use cds-tearsheet-header-content)
 * @slot - Default slot for other content
 * @slot navigation-bar - Navigation tabs or breadcrumbs below the header
 * @fires cds-tearsheet-header-collapse-change - Internal event; parent tearsheet re-dispatches
 *   this as the public `cds-tearsheet-collapse-change` event.
 */
@customElement(`${prefix}-tearsheet-header`)
class CDSTearsheetHeader extends HostListenerMixin(LitElement) {
  @property({ reflect: true })
  slot = 'header';

  @property({ reflect: true, attribute: 'close-icon-description' })
  closeIconDescription: string = 'Close';

  @property({ type: Boolean, reflect: true, attribute: 'hide-close-button' })
  hideCloseButton: boolean = false;

  @property({
    type: Boolean,
    reflect: true,
    attribute: 'disable-header-collapse',
  })
  disableHeaderCollapse: boolean = false;

  @consume({ context: tearsheetContext, subscribe: true })
  private _tearsheetCtx?: TearsheetContextValue;

  /** Cached uniqueId of the parent cds-tearsheet. Resolved once in
   *  connectedCallback via closest() so we avoid repeated DOM traversal. */
  private _uniqueId: string = '';

  connectedCallback() {
    super.connectedCallback();
    this._uniqueId = this._resolveUniqueId();
  }

  protected firstUpdated() {
    // Push initial prop values into context now that @consume has resolved
    // _tearsheetCtx. Doing this in connectedCallback was too early — the
    // @consume decorator populates the field after the element connects, so
    // the call there was always hitting undefined and silently doing nothing.
    this._tearsheetCtx?.setState({
      disableHeaderCollapse: this.disableHeaderCollapse,
      closeIconDescription: this.closeIconDescription,
      hideCloseButton: this.hideCloseButton,
    });
    registerFocusableContainers(this.shadowRoot, this._uniqueId);
  }

  private _resolveUniqueId(): string {
    const host = this.closest<HTMLElement & CDSTearsheetHost>(
      `${prefix}-tearsheet`
    );
    return host?.uniqueId ?? '';
  }

  protected updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has('disableHeaderCollapse')) {
      this._tearsheetCtx?.setState({
        disableHeaderCollapse: this.disableHeaderCollapse,
      });
    }
    if (_changedProperties.has('closeIconDescription')) {
      this._tearsheetCtx?.setState({
        closeIconDescription: this.closeIconDescription,
      });
    }
    if (_changedProperties.has('hideCloseButton')) {
      this._tearsheetCtx?.setState({
        hideCloseButton: this.hideCloseButton,
      });
    }
    this.updateCollapsedAttribute();
  }

  private updateCollapsedAttribute() {
    const { fullyCollapsed, open } =
      this._tearsheetCtx?.state ?? defaultTearsheetState;
    const wasCollapsed = this.hasAttribute('collapsed');

    if (open) {
      if (fullyCollapsed) {
        this.setAttribute('collapsed', '');
      } else {
        this.removeAttribute('collapsed');
      }
    } else {
      this.removeAttribute('collapsed');
    }

    const isNowCollapsed = this.hasAttribute('collapsed');
    if (isNowCollapsed !== wasCollapsed) {
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSTearsheetHeader).eventCollapseChange,
          {
            bubbles: true,
            composed: true,
            detail: { collapsed: isNowCollapsed },
          }
        )
      );
    }
  }

  render() {
    const { fullyCollapsed } =
      this._tearsheetCtx?.state ?? defaultTearsheetState;

    const classes = classMap({
      [`${blockClass}__header`]: true,
      [`${blockClass}__header--with-close-icon`]: !!this.hideCloseButton,
      [`${blockClass}__header-collapsed`]: !!fullyCollapsed,
    });
    return html`<cds-modal-header class="${classes}">
      <slot name="header-content"></slot>
      <slot></slot>
      <slot name="navigation-bar"></slot>
    </cds-modal-header>`;
  }

  static styles = styles;

  static get eventCloseButtonClicked() {
    return `${prefix}-tearsheet-header-close-button-clicked`;
  }

  static get eventCollapseChange() {
    return `${prefix}-tearsheet-header-collapse-change`;
  }
}
export default CDSTearsheetHeader;
