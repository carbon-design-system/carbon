/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/button/index';
import '@carbon/web-components/es/components/form-group/index';
import '@carbon/web-components/es/components/radio-button/index';
import CheckmarkFilled16 from '@carbon/icons/es/checkmark--filled/16';
import ErrorFilled16 from '@carbon/icons/es/error--filled/16';
import { iconLoader } from "@carbon/web-components/es/globals/internal/icon-loader.js";
import '@carbon/web-components/es/components/loading/index';
import { ref } from 'lit/directives/ref.js';
import styles from './export-modal.scss?lit';

const blockClass = `c4p--export-modal`;

/**
 * ExportModalPreformattedExtension.
 *
 * @element export-modal-preformatted-extension
 *
 * */

@customElement(`export-modal-preformatted-extension`)
class ExportModalPreformattedExtension extends HostListenerMixin(LitElement) {
  @state()
  filename = 'Sample02.pdf';

  @state()
  loading = false;

  @state()
  error = false;

  @state()
  successful = false;

  @state()
  preformattedExtension = [
    {
      extension: 'YAML',
      description: 'best for IBM managed cloud',
    },
    {
      extension: 'BAR',
      description: 'best for integration server',
    },
  ];

  @state()
  extension = '';

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

  render() {
    let modalRef: HTMLElement | null = null;

    if (
      this.preformattedExtension &&
      this.preformattedExtension.length > 0 &&
      this.preformattedExtension[0]?.extension
    ) {
      this.extension = this.preformattedExtension?.[0]?.extension;
    }

    const extensionChangeHandler = (evt: Event) => {
      this.extension = (evt.target as HTMLInputElement).value;
    };

    const onCloseHandler = () => {
      this.successful = false;
      this.error = false;
    };

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
            onCloseHandler();
          }}
        ></cds-modal-close-button>
        <cds-modal-header class=${`${blockClass}__heading`}>
          <cds-modal-heading>Export</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body class=${`${blockClass}__body-container`}>
          ${!submitted
            ? html` <div class=${`${blockClass}__input-container`}>
                <cds-form-group legend-text="Choose an export format">
                  ${this.preformattedExtension.length
                    ? html`<cds-radio-button-group
                        name="extensions"
                        @input="${extensionChangeHandler}"
                        value=${this.extension}
                        orientation="vertical"
                      >
                        ${this.preformattedExtension.map(
                          (o) =>
                            html` <cds-radio-button
                              label-text=${`${o.extension} (${o.description})`}
                              value=${o.extension}
                              id=${o.extension}
                            ></cds-radio-button>`
                        )}
                      </cds-radio-button-group>`
                    : null}
                </cds-form-group>
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
                  onCloseHandler();
                }}
                >Cancel</cds-modal-footer-button
              >
              <cds-modal-footer-button
                ?disabled=${!this.filename || this.loading}
                @click=${() => {
                  this.submitHandler();
                  onCloseHandler();
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
export default ExportModalPreformattedExtension;
