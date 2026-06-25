/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, TemplateResult, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/inline-loading/index.js';
import '@carbon/web-components/es/components/form-group/index.js';
import '@carbon/web-components/es/components/radio-button/index.js';
import '@carbon/web-components/es/components/toggle/index.js';
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
 * CustomGenerate.
 *
 * @element custom-generate
 *
 * */

@customElement(`custom-generate`)
class CustomGenerate extends HostListenerMixin(LitElement) {
  @state()
  error = false;

  @state()
  loading = false;

  @property({ type: Boolean })
  editing = false;

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

  @state()
  allResources: Boolean = false;

  @state() resource: String = '';

  @state() private hasSteps = true;

  @state() private currentStep = 0;

  @state() customSteps: Array<{
    valid?: boolean;
    title?: string;
    content?: TemplateResult;
  }> = [];

  @state() name = '';

  @state() permissions = '';

  @state() private hasPreviousStep = false;

  private apiKey: string = '';
  private nameRequired = true;
  private hasNextStep: Boolean = false;
  private modalRef: HTMLElement | null = null;
  private passwordInputRef: HTMLElement | null = null;

  firstUpdated() {
    if (this.editing && !this.name) {
      this.name = 'test_key_1';
    }
    if (this.editing && !this.permissions) {
      this.permissions = 'Read only';
    }
    if (this.editing && !this.resource) {
      this.resource = 'resource_1';
    }
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('apiKeyLoaded') && this.apiKeyLoaded && this.passwordInputRef) {
      setTimeout(() => {
        const input = this.passwordInputRef?.shadowRoot?.querySelector('input');
        input?.focus();
      }, 0);
    }
  }

  private _inputHandler(e: Event) {
    this.apiKeyName = (e.target as HTMLInputElement).value;
  }

  private _setName(e: Event) {
    this.name = (e.target as HTMLInputElement).value;
  }

  private _setPermissions(event: CustomEvent<{ value: string }>) {
    this.permissions = event.detail.value;
  }

  private _setResources(e: Event) {
    this.resource = (e.target as HTMLInputElement).value;
  }

  private onCloseHandler() {
    if (this.hasPreviousStep && !this.apiKeyLoaded) {
      this.currentStep = this.currentStep - 1;
    } else {
      this.modalRef?.removeAttribute('open');
      this.apiKeyName = '';
      this.apiKey = '';
      if (!this.editing) {
        this.name = '';
        this.resource = '';
        this.permissions = '';
      }
      this.currentStep = 0;
    }
  }

  private wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  private async _submitHandler(e: Event): Promise<void> {
    if (this.hasNextStep) {
      this.currentStep = this.currentStep + 1;
    } else if (this.apiKeyLoaded) {
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
        if (this.editing) {
          this.editSuccess = true;
        } else {
          this.apiKey = '111-111-111-111';
        }
      }
      this.loading = false;
      this.requestUpdate();
    }
  }

  private isPrimaryButtonDisabled = () => {
    if (this.loading) {
      return true;
    }
    if (
      this.hasSteps &&
      'valid' in (this.customSteps?.[this.currentStep] || [])
    ) {
      return !this.customSteps[this.currentStep]?.valid;
    }
    if (!this.hasSteps && this.nameRequired && !this.apiKeyName) {
      return true;
    }
    return false;
  };

  private allResourcesHandler = () => {
    if (this.allResources && this.resource) {
      this.resource = '';
    }
    this.allResources = !this.allResources;
  };

  private getPrimaryButtonText = () => {
    if (this.hasNextStep) {
      return 'Next';
    }
    if (this.apiKeyLoaded) {
      return 'Copy';
    }
    if (this.editing) {
      return 'Save API key';
    }
    return 'Generate';
  };

  private getSecondaryButtonText = () => {
    if (this.hasPreviousStep && !this.apiKeyLoaded) {
      return 'Previous';
    }
    return 'Close';
  };

  render() {
    this.apiKeyLoaded = this.apiKey && !this.loading;
    this.hasDownloadLink = true;
    this.hasNextStep =
      this.hasSteps && this.currentStep < this.customSteps.length - 1;
    this.hasPreviousStep = this.hasSteps && this.currentStep !== 0;

    if ((this.editing && this.editSuccess) || this.apiKeyLoaded) {
      this.title = 'Generate an API key';
      this.successMessage = 'API key successfully saved';
    } else if (this.hasSteps) {
      this.title =
        this.customSteps[this.currentStep]?.title || 'Generate API key';
    } else {
      this.title = 'Generate API key';
    }

    this.customSteps = [
      {
        valid: Boolean(this.name && this.permissions),
        title: this.editing ? 'Edit API key' : 'Generate API key',
        content: html`
          <cds-modal-body-content class=${`${blockClass}__body`}>
            (Optional description text) To connect securely to [product name],
            your application or tool needs an API key with permission to access
            resources such as [product resource name].
          </cds-modal-body-content>
          <cds-form-item>
            <cds-text-input
              .value=${this.name}
              @input="${this._setName}"
              label="Name your application"
              placeholder="Application name"
              id="name-input"
            ></cds-text-input>
          </cds-form-item>
          <cds-form-group
            legend-text="What do you want your application to be able to do"
          >
            <cds-radio-button-group
              name="permission"
              value=${this.permissions}
              @cds-radio-button-group-changed=${this._setPermissions}
              orientation="vertical"
            >
              <cds-radio-button
                label-text="Read and write"
                value="Read and write"
              ></cds-radio-button>
              <cds-radio-button
                label-text="Read only"
                value="Read only"
              ></cds-radio-button>
              <cds-radio-button
                label-text="Write only"
                value="Write only"
              ></cds-radio-button>
            </cds-radio-button-group>
          </cds-form-group>
        `,
      },
      {
        valid: Boolean(
          this.allResources || (!this.allResources && !!this.resource)
        ),
        title: 'Choose which resources the API will have access to',
        content: html`
          <cds-form-group
            legend-text="What do you want your application to be able to do"
            class=${`${blockClass}__resource-toggle`}
          >
            <cds-toggle
              id="toggle1"
              label-text="All resources"
              label-a="On"
              label-b="Off"
              value=${this.allResources}
              @cds-toggle-changed=${this.allResourcesHandler}
              ?disabled=${this.loading}
            ></cds-toggle>
          </cds-form-group>
          <cds-form-group
            legend-text="What do you want your application to be able to do"
            class=${`${blockClass}__resource-name`}
          >
            <cds-text-input
              value=${this.resource}
              @input="${this._setResources}"
              label="Which resource?"
              id="resource-input"
              placeholder="Resources name"
              ?disabled=${this.loading || this.allResources}
            />
          </cds-form-group>
          ${this.loading
            ? html`
                <cds-inline-loading
                  ?icon-description=${this.loading ? 'Saving' : 'Generating'}
                  class=${`${blockClass}__loader`}
                >
                  ${this.loading
                    ? 'Saving...'
                    : 'Generating...'}</cds-inline-loading
                >
              `
            : null}
          ${this.editSuccess
            ? html`
                <div class=${`${blockClass}__messaging`}>
                  Edited successfully, API key successfully saved.
                </div>
              `
            : null}
        `,
      },
    ];

    return html`
      <style>
        ${styles}
      </style>
      <cds-button
        kind="primary"
        @click=${() => this.modalRef?.setAttribute('open', '')}
      >
        ${this.editing ? html`Edit API key` : html`Generate API key`}
      </cds-button>
      <cds-modal
        class=${blockClass}
        size="sm"
        ?open="false"
        ${ref((el) => (this.modalRef = el as HTMLElement))}
        prevent-close-on-click-outside
      >
        <cds-modal-header class=${`${blockClass}__header`}>
          <cds-modal-label>An example of Generate API key</cds-modal-label>
          <cds-modal-heading>${this.title}</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body class=${`${blockClass}__body-container`}>
          ${this.hasSteps && !this.apiKeyLoaded
            ? html` ${this.customSteps[this.currentStep]?.content}`
            : html`
                ${this.apiKey
                  ? html`
                      <cds-text-input
                        ${ref((el) => (this.passwordInputRef = el as HTMLElement))}
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
                        >Generating...</cds-inline-loading
                      >
                    `
                  : null}
                ${this.copyError || this.error
                  ? html`
                      <div class=${`${blockClass}__messaging`}>
                        <div class=${`${blockClass}__error-icon`}>
                          ${iconLoader(ErrorFilled16, {
                            slot: 'icon',
                            // class: `${blockClass}__error-icon`,
                          })}
                        </div>
                        <p
                          class=${`${blockClass}__messaging-text`}
                          role="alert"
                          aria-live="assertive"
                        >
                          ${this.copyError
                            ? html``
                            : html`Failed to create API key`}
                        </p>
                      </div>
                    `
                  : null}
                ${this.apiKeyLoaded
                  ? html`
                      <div class=${`${blockClass}__messaging`}>
                        ${iconLoader(InformationFilled16, {
                          slot: 'icon',
                        })}
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
                                ${this.successMessage}
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
                          API key successfully created
                        </p>
                      </div>
                    `
                  : null}
              `}
        </cds-modal-body>
        <cds-modal-footer class=${`${blockClass}__footer`}>
          <cds-modal-footer-button
            kind="secondary"
            @click=${() => {
              this.onCloseHandler();
            }}
            >${this.getSecondaryButtonText()}</cds-modal-footer-button
          >
          <cds-modal-footer-button
            ?disabled=${this.isPrimaryButtonDisabled()}
            @click=${this._submitHandler}
            >${this.apiKeyLoaded
              ? html`Copy ${iconLoader(Copy16, { slot: 'icon' })}`
              : this.getPrimaryButtonText()}
          </cds-modal-footer-button>
        </cds-modal-footer>
      </cds-modal>
    `;
  }
  static styles = styles;
}
export default CustomGenerate;
