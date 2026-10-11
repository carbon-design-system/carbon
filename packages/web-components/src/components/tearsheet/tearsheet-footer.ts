/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './tearsheet.scss?lit';
import type { ActionButton, ButtonSize } from '../action-set/index.js';
import {
  tearsheetContext,
  defaultTearsheetState,
  type TearsheetContextValue,
} from './tearsheet-context';
import { consume } from '@lit/context';
import '../action-set/index.js';
import { registerFocusableContainers } from '../../utilities/manageFocusTrap/manageFocusTrap';

const blockClass = `${prefix}--tearsheet`;

/** Minimal interface used to read the protected uniqueId from CDSTearsheet
 *  without importing the class (avoids circular dep). */
interface CDSTearsheetHost extends HTMLElement {
  readonly uniqueId: string;
}

/**
 * Tearsheet Footer component - Contains action buttons at the bottom of the tearsheet.
 *
 * @element cds-tearsheet-footer
 * @slot - Default slot for custom footer content (rendered before actions)
 */
@customElement(`${prefix}-tearsheet-footer`)
class CDSTearsheetFooter extends HostListenerMixin(LitElement) {
  @property({ reflect: true })
  slot = 'footer';

  @property({ type: Array })
  actions: ActionButton[] = [];

  @property({ attribute: 'button-size' })
  buttonSize?: ButtonSize;

  @query('cds-action-set')
  private actionSetElement?: HTMLElement;

  private _actionSetRegistered = false;

  @consume({ context: tearsheetContext, subscribe: true })
  private _tearsheetCtx?: TearsheetContextValue;

  /** Cached uniqueId of the parent cds-tearsheet. Resolved once in
   *  connectedCallback so we avoid repeated DOM traversal on every update. */
  private _uniqueId: string = '';

  connectedCallback(): void {
    super.connectedCallback();
    const host = this.closest<HTMLElement & CDSTearsheetHost>(
      `${prefix}-tearsheet`
    );
    this._uniqueId = host?.uniqueId ?? '';
  }

  protected override firstUpdated(): void {
    registerFocusableContainers(this, this._uniqueId);
  }

  protected override updated(): void {
    if (
      this.actionSetElement?.shadowRoot &&
      this._uniqueId &&
      !this._actionSetRegistered
    ) {
      registerFocusableContainers(
        this.actionSetElement.shadowRoot,
        this._uniqueId
      );
      this._actionSetRegistered = true;
    }
  }

  private _renderActions() {
    if (!this.actions || this.actions.length === 0) {
      return null;
    }
    const { variant } = this._tearsheetCtx?.state ?? defaultTearsheetState;
    const actionSetSize = variant === 'wide' ? '2xl' : 'lg';
    const buttonSize = this.buttonSize || (variant === 'wide' ? '2xl' : 'xl');

    return html`
      <cds-action-set
        size="${actionSetSize}"
        button-size="${buttonSize}"
        .actions="${this.actions}"
        ?disable-stacking="${true}">
      </cds-action-set>
    `;
  }

  render() {
    const actionCount = this.actions?.length || 0;
    const classes = classMap({
      [`${blockClass}__footer`]: true,
      [`${blockClass}__footer--three-actions`]: actionCount === 3,
      [`${blockClass}__footer--many-actions`]: actionCount > 3,
    });

    return html`<footer class="${classes}">
      <slot></slot>
      ${this._renderActions()}
    </footer>`;
  }

  static styles = styles;
}

export default CDSTearsheetFooter;
