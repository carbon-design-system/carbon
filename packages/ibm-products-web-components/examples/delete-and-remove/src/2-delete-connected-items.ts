/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/form/form-item.js';
import '@carbon/web-components/es/components/text-input/text-input.js';
import '@carbon/web-components/es/components/notification/toast-notification.js';
import '@carbon/web-components/es/components/checkbox/checkbox.js';
import '@carbon/web-components/es/components/link/link.js';

import { getCurrentTime } from './utils';
import styles from './delete-and-remove.scss?lit';
import Launch16 from '@carbon/icons/es/launch/16';
import { iconLoader } from "@carbon/web-components/es/globals/internal/icon-loader.js";

// example implementation of high impact deletion with connected items pattern
@customElement('delete-connected-items')
export class DeleteConnectedItems extends LitElement {
  static styles = styles;

  @state()
  private _open: boolean = false;

  @state()
  private _showNotification: boolean = false;

  @state()
  private _textInput: string = '';

  @state()
  private _enableDelete: boolean = false;

  @state()
  private _isCheckboxChecked: boolean = false;

  @state()
  private _connectedItems: Array<any> = [
    { name: 'Route1_name' },
    { name: 'Hpt-392-ser' },
    { name: 'Route2_name' },
  ];

  private _close() {
    this._open = false;
    this._textInput = '';
    this._isCheckboxChecked = false;
  }

  private _onNotificationClose() {
    this._showNotification = false;
  }

  private _onDeleteButtonClick() {
    this._open = true;
    this._onNotificationClose();
  }

  private _setDeleteButtonState() {
    const isResourceNameMatching = this._textInput === 'Bx1001';
    this._enableDelete = this._isCheckboxChecked && isResourceNameMatching;
  }

  private _onInputChange(e: Event) {
    this._textInput = (e.target as HTMLInputElement).value;
    this._setDeleteButtonState();
  }

  private _onCheckboxChange(e: CustomEvent) {
    this._isCheckboxChecked = e.detail.checked;
    this._setDeleteButtonState();
  }

  private _onDelete(e: Event) {
    this._close();
    this._showNotification = true;
  }

  render() {
    return html`
      <cds-button
        type="button"
        kind="danger"
        size="md"
        @click="${this._onDeleteButtonClick}"
      >
        Delete
      </cds-button>
      <cds-modal class="deletion-connected-items" ?open="${this._open}" prevent-close>
        <cds-modal-header>
          <cds-modal-close-button
            @click="${this._close}"
          ></cds-modal-close-button>
          <cds-modal-label>Delete Bx1001</cds-modal-label>
          <cds-modal-heading>Confirm delete</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body>
          <cds-modal-body-content description="">
            When you delete the 'Bx1001', this resource and all connected items
            are permanently deleted. This action cannot be undone.
          </cds-modal-body-content>
          <cds-form-item>
            <cds-text-input
              placeholder="Name of resource"
              label="Type Bx1001 to confirm"
              value="${this._textInput}"
              @input="${this._onInputChange}"
              autocomplete="off"
            >
            </cds-text-input>
          </cds-form-item>
          <cds-modal-label
            >The following connected items will also be deleted. Review each
            item to confirm that they can be deleted.</cds-modal-label
          >

          <cds-checkbox
            ?checked=${this._isCheckboxChecked}
            @cds-checkbox-changed="${this._onCheckboxChange}"
            >${this._connectedItems.length} items:</cds-checkbox
          >

          <ul class="no-bullets">
            ${map(
              this._connectedItems,
              (item) =>
                html`<li>
                  <cds-link>
                    ${item.name} ${iconLoader(Launch16, { slot: 'icon' })}
                  </cds-link>
                </li>`
            )}
          </ul>
        </cds-modal-body>
        <cds-modal-footer>
          <cds-modal-footer-button kind="secondary" @click="${this._close}"
            >Cancel</cds-modal-footer-button
          >
          <cds-modal-footer-button
            ?disabled="${!this._enableDelete}"
            kind="danger"
            @click="${this._onDelete}"
            >Delete</cds-modal-footer-button
          >
        </cds-modal-footer>
      </cds-modal>
      ${this._showNotification
        ? html`<cds-toast-notification
            class="notification"
            kind="success"
            title="Success"
            subtitle="Bx1001 and all connected items have been successfully deleted."
            caption=${getCurrentTime()}
            low-contrast="true"
            timeout="3000"
            @cds-notification-closed="${this._onNotificationClose}"
          ></cds-toast-notification>`
        : null}
    `;
  }
}

export default DeleteConnectedItems;
