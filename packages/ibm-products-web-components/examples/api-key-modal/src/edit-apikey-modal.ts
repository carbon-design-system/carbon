/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/inline-loading/index.js';
import CheckmarkFilled16 from '@carbon/icons/es/checkmark--filled/16.js';
import ErrorFilled16 from '@carbon/icons/es/error--filled/16.js';
import InformationFilled16 from '@carbon/icons/es/information--filled/16.js';
import Copy16 from '@carbon/icons/es/copy/16.js';
import { iconLoader } from "@carbon/web-components/es/globals/internal/icon-loader.js";
import { ref } from 'lit/directives/ref.js';
import styles from './api-key-modal.scss?lit';
import './api-key-downloader';

const blockClass = `c4p--apikey-modal`;

/**
 * EditApiKeyModal.
 *
 * @element edit-api-key-modal
 *
 * */

@customElement(`edit-apikey-modal`)
class EditApiKeyModal extends HostListenerMixin(LitElement) {
  @property({ type: Boolean })
  error = false;

  @state()
  loading = false;

  @state()
  editing = true;

  @state()
  copyError = false;

  @state()
  successful = false;

  @state()
  editSuccess = false;

  @state()
  apiKeyName: string = '';

  @state()
  hasDownloadLink = false;

  @state()
  successMessage: string = '';

  @state()
  apiKeyLoaded: Boolean = false;

  private apiKey: string = '';
  private nameRequired = true;
  private textInputRef: HTMLElement | null = null;

  protected firstUpdated() {
    this.apiKeyName = 'test_key_1';
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('editSuccess') && this.editSuccess && this.textInputRef) {
      setTimeout(() => {
        const input = this.textInputRef?.shadowRoot?.querySelector('input');
        input?.focus();
      }, 0);
    }
  }
  private _inputHandler(e: Event) {
    this.apiKeyName = (e.target as HTMLInputElement).value;
  }

  private onCloseHandler() {
    this.apiKeyName = '';
    this.apiKey = '';
  }

  private wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  private async _submitHandler(e: Event): Promise<void> {
    if (this.apiKeyLoaded) {
      try {
        await navigator.clipboard.writeText(this.apiKey);
      } catch (e) {
        this.copyError = true;
      }
    } else {
      this.error = false;
      this.loading = true;
      await this.wait(1000);
      if (this.error) {
        this.error = true;
      } else {
        this.editSuccess = true;
      }
      this.loading = false;
      this.requestUpdate();
    }
  }

  private isPrimaryButtonDisabled = () => {
    if (this.loading) {
      return true;
    }
    if (this.nameRequired && !this.apiKeyName) {
      return true;
    }
    return false;
  };

  render() {
    let modalRef: HTMLElement | null = null;
    this.apiKeyLoaded = this.apiKey && !this.loading;
    this.hasDownloadLink = true;

    return html`
      <style>
        ${styles}
      </style>
      <cds-button
        kind="primary"
        @click=${() => modalRef?.setAttribute('open', '')}
      >
        Edit API key
      </cds-button>
      <cds-modal
        class=${blockClass}
        size="sm"
        ?open="false"
        prevent-close-on-click-outside
        ${ref((el) => (modalRef = el as HTMLElement))}
        @cds-modal-closed=${() => {
          modalRef?.removeAttribute('open');
          this.onCloseHandler();
        }}
      >
        <cds-modal-header class=${`${blockClass}__header`}>
          <cds-modal-label>An example of Generate API key</cds-modal-label>
          <cds-modal-heading>Save an API key</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body class=${`${blockClass}__body-container`}>
          <cds-modal-body-content class=${`${blockClass}__body`}>
            (Optional description text) To connect securely to [product name],
            your application or tool needs an API key with permission to access
            resources such as [product resource name].
          </cds-modal-body-content>

          ${this.apiKey
            ? html`
                <cds-text-input
                  value=${this.apiKey}
                  label="API key"
                  showPasswordLabel="Show key"
                  hidePasswordLabel="Hide key"
                  tooltipPosition="left"
                  type="password"
                  show-password-visibility-toggle="true"
                  readonly="true"
                  helper-text="This is your unique API key and is non-recoverable. If you lose this API key, you will have to reset it."
                />
              `
            : null}
          ${!this.apiKeyLoaded && this.nameRequired
            ? html` <cds-form-item>
                <cds-text-input
                  ${ref((el) => (this.textInputRef = el as HTMLElement))}
                  label="Name your application"
                  id="test-id"
                  .value=${this.apiKeyName}
                  @input="${this._inputHandler}"
                  placeholder="Application name"
                  ?disabled=${this.loading}
                  ?required=${this.nameRequired}
                  helper-text="Providing the application name will help you identify your API key later."
                ></cds-text-input>
              </cds-form-item>`
            : null}
          ${this.loading
            ? html`
                <cds-inline-loading
                  ?icon-description="Generating"
                  class=${`${blockClass}__loader`}
                  >Saving...</cds-inline-loading
                >
              `
            : null}
          ${this.copyError || this.error
            ? html`
                <div class=${`${blockClass}__messaging`}>
                  <div class=${`${blockClass}__error-icon`}>
                    ${iconLoader(ErrorFilled16, { slot: 'icon' })}
                  </div>
                  <p
                    class=${`${blockClass}__messaging-text`}
                    role="alert"
                    aria-live="assertive"
                  >
                    ${this.copyError ? html`` : html`Failed to edit API key`}
                  </p>
                </div>
              `
            : null}
          ${this.apiKeyLoaded
            ? html`
                <div class=${`${blockClass}__messaging`}>
                  ${iconLoader(InformationFilled16, { slot: 'icon' })}
                  ${this.hasDownloadLink
                    ? html` <api-key-downloader
                        apiKey=${this.apiKey}
                        fileName="apikey"
                        linkText="Download as JSON"
                        fileType="json"
                        downloadLinkLabel="Download API Key in Java Script File format"
                      />`
                    : html`
                        <div
                          class=${`${blockClass}__messaging-text`}
                          role="alert"
                          aria-live="assertive"
                        >
                          <p>
                            This is your unique API key and is non-recoverable.
                            If you lose this API key, you will have to reset it.
                          </p>
                        </div>
                      `}
                </div>
              `
            : null}
          ${this.editSuccess || this.apiKeyLoaded
            ? html`
                <div class=${`${blockClass}__messaging`}>
                  ${iconLoader(CheckmarkFilled16, {
                    slot: 'icon',
                    class: `${blockClass}__checkmark-icon`,
                  })}
                  <p
                    class=${`${blockClass}__messaging-text`}
                    role="alert"
                    aria-live="assertive"
                  >
                    API key successfully saved
                  </p>
                </div>
              `
            : null}
        </cds-modal-body>
        <cds-modal-footer class=${`${blockClass}__footer`}>
          <cds-modal-footer-button
            kind="secondary"
            data-modal-close
            @click=${() => {
              this.onCloseHandler();
            }}
            >Close</cds-modal-footer-button
          >
          <cds-modal-footer-button
            ?disabled=${this.isPrimaryButtonDisabled()}
            @click=${this._submitHandler}
            >${this.apiKeyLoaded ? iconLoader(Copy16, { slot: 'icon' }) : 'Save API key'}
          </cds-modal-footer-button>
        </cds-modal-footer>
      </cds-modal>
    `;
  }
  static styles = styles;
}
export default EditApiKeyModal;
