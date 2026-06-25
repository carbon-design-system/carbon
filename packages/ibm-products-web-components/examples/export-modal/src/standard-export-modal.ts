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
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/button/index';
import '@carbon/web-components/es/components/text-input/index';
import CheckmarkFilled16 from '@carbon/icons/es/checkmark--filled/16';
import ErrorFilled16 from '@carbon/icons/es/error--filled/16';
import { iconLoader } from "@carbon/web-components/es/globals/internal/icon-loader.js";
import '@carbon/web-components/es/components/loading/index';
import { ref } from 'lit/directives/ref.js';
import styles from './export-modal.scss?lit';

const blockClass = `c4p--export-modal`;

/**
 * StandardExportModal.
 *
 * @element standard-export-modal
 *
 * */

@customElement(`standard-export-modal`)
class StandardExportModal extends HostListenerMixin(LitElement) {
  @state()
  filename = '';

  @state()
  loading = false;

  @state()
  error = false;

  @state()
  successful = false;

  @state()
  dirtyInput: Boolean = false;

  @property({ type: Array })
  validExtensions: string[] = [];

  private wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  private async submitHandler() {
    this.loading = true;
    await this.wait(1000);
    const isSuccessful = true;
    if (isSuccessful) {
      this.successful = true;
    } else {
      this.error = true;
    }
    this.loading = false;
  }

  private hasInvalidExtension() {
    if (
      !this.dirtyInput ||
      !this.validExtensions ||
      !this.validExtensions.length
    ) {
      return false;
    }
    if (!this.filename.includes('.') || this.filename.endsWith('.')) {
      return true;
    }
    const ext = this.filename.split('.').pop();

    if (ext && !this.validExtensions.includes(ext)) {
      return true;
    }
    return false;
  }

  private initialFilenameSet = false;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (!this.initialFilenameSet && changedProperties.has('validExtensions')) {
      if (!this.validExtensions || this.validExtensions.length === 0) {
        this.filename = 'sample.pdf';
      }

      this.initialFilenameSet = true;
    }
  }

  private inputHandler = (evt: Event) => {
    this.filename = (evt.target as HTMLInputElement).value;
    this.dirtyInput = true;
  };

  private onCloseHandler = () => {
    this.successful = false;
    this.error = false;
  };

  render() {
    let modalRef: HTMLElement | null = null;
    const submitted = this.loading || this.error || this.successful;

    return html`
      <style>
        ${styles}
      </style>
      <cds-button
        kind="primary"
        @click=${() => modalRef?.setAttribute('open', '')}
      >
        Launch Modal
      </cds-button>
      <cds-modal
        class=${blockClass}
        size="sm"
        ?open="false"
        ${ref((el) => (modalRef = el as HTMLElement))}
        @cds-modal-closed=${() => {
          modalRef?.removeAttribute('open');
        }}
      >
        <cds-modal-close-button
          @click=${() => {
            modalRef?.setAttribute('open', 'false');
            this.onCloseHandler();
          }}
        ></cds-modal-close-button>
        <cds-modal-header class=${`${blockClass}__heading`}>
          <cds-modal-heading>Export</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body class=${`${blockClass}__body-container`}>
          ${!submitted
            ? html` ${this.validExtensions.length > 0
                  ? html`<p class=${`${blockClass}__body`}>
                      File must be exported in a PDF format
                    </p>`
                  : null}
                <div class=${`${blockClass}__input-container`}>
                  <cds-text-input
                    placeholder="URL"
                    label="File name"
                    id="test-id"
                    value=${this.filename}
                    @input=${this.inputHandler}
                    .invalid=${this.dirtyInput && this.hasInvalidExtension()}
                    invalid-text=${this.dirtyInput && this.hasInvalidExtension()
                      ? 'File must have valid extension .pdf'
                      : ''}
                  ></cds-text-input>
                </div>`
            : null}
          <div aria-live="polite" class=${`${blockClass}__messaging`}>
            ${this.loading
              ? html`
                  <cds-loading
                    aria-live="off"
                    small
                    .withOverlay=${false}
                  ></cds-loading>
                  <p>Exporting file...</p>
                `
              : null}
            ${this.successful
              ? html`
                  ${iconLoader(CheckmarkFilled16, {
                    slot: 'icon',
                    class: `${blockClass}__checkmark-icon`,
                  })}
                  <p>The file has been exported.</p>
                `
              : null}
            ${this.error
              ? html`
                  ${iconLoader(ErrorFilled16, {
                    slot: 'icon',
                    class: `${blockClass}__error-icon`,
                  })}
                  <p>Server error 500</p>
                `
              : null}
          </div>
        </cds-modal-body>
        ${!submitted
          ? html`<cds-modal-footer>
              <cds-modal-footer-button
                kind="secondary"
                data-modal-close
                @click=${() => {
                  modalRef?.setAttribute('open', 'false');
                  this.onCloseHandler();
                }}
                >Cancel</cds-modal-footer-button
              >
              <cds-modal-footer-button
                ?disabled=${!this.filename ||
                this.loading ||
                this.hasInvalidExtension()}
                @click=${() => {
                  this.submitHandler();
                  this.onCloseHandler();
                }}
                >Export</cds-modal-footer-button
              >
            </cds-modal-footer> `
          : null}
      </cds-modal>
    `;
  }
  static styles = styles;
}
export default StandardExportModal;
