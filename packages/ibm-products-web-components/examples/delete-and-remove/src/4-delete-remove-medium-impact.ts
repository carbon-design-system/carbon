/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/notification/toast-notification.js';

import { getCurrentTime } from './utils';
import styles from './delete-and-remove.scss?lit';

// example implementation of medium impact delete / remove pattern
@customElement('delete-remove-medium-impact')
export class DeleteRemoveMediumImpact extends LitElement {
  static styles = styles;

  @property()
  action: string;

  @state()
  private _open: boolean = false;

  @state()
  private _showNotification: boolean = false;

  private _close() {
    this._open = false;
  }

  private _onNotificationClose() {
    this._showNotification = false;
  }

  private _onDeleteButtonClick() {
    this._open = true;
    this._onNotificationClose();
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
        ${this.action === 'delete' ? 'Delete' : 'Remove'}
      </cds-button>
      <cds-modal ?open="${this._open}" prevent-close>
        <cds-modal-header>
          <cds-modal-close-button
            @click="${this._close}"
          ></cds-modal-close-button>
          <cds-modal-label
            >${this.action === 'delete' ? 'Delete' : 'Remove'}
            Bx1001</cds-modal-label
          >
          <cds-modal-heading>Confirm ${this.action}</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body>
          <cds-modal-body-content description="">
            ${this.action === 'delete' ? 'Deleting' : 'Removing'} 'Bx1001' will
            permanently ${this.action} the configuration.
            ${this.action === 'delete' ? 'This action cannot be undone.' : null}
          </cds-modal-body-content>
        </cds-modal-body>
        <cds-modal-footer>
          <cds-modal-footer-button kind="secondary" @click="${this._close}"
            >Cancel</cds-modal-footer-button
          >
          <cds-modal-footer-button kind="danger" @click="${this._onDelete}">
            ${this.action === 'delete' ? 'Delete' : 'Remove'}
          </cds-modal-footer-button>
        </cds-modal-footer>
      </cds-modal>
      ${this._showNotification
        ? html`<cds-toast-notification
            class="notification"
            kind="success"
            title="Success"
            subtitle="Bx1001 has been successfully ${this.action === 'delete'
              ? 'deleted'
              : 'removed'}."
            caption=${getCurrentTime()}
            low-contrast="true"
            timeout="3000"
            @cds-notification-closed="${this._onNotificationClose}"
          ></cds-toast-notification>`
        : null}
    `;
  }
}

export default DeleteRemoveMediumImpact;
