/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { query, state } from 'lit/decorators.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/button/index';
import '@carbon/web-components/es/components/text-input/index';
import '@carbon/web-components/es/components/radio-button/index';
import '@carbon/web-components/es/components/stack/index';
import styles from './create-modal.scss?lit';

const blockClass = `c4p--create-modal`;

/**
 * CreateModalWithFormValidation - Example showing form validation in CreateModal.
 * 
 * Demonstrates required field validation with invalid state on blur.
 *
 * @element create-modal-with-form-validation
 */

@customElement(`create-modal-with-form-validation`)
class CreateModalWithFormValidation extends HostListenerMixin(LitElement) {
  @state()
  private requiredInput = '';

  @state()
  private optionalInput1 = '';

  @state()
  private optionalInput2 = '';

  @state()
  private selectedRadio = 'radio-1';

  @state()
  private isInvalid = false;

  @state()
  private dirtyInput = false;

  @query('cds-modal')
  private modalRef!: HTMLElement;

  private handleRequiredInput = (evt: Event) => {
    this.requiredInput = (evt.target as HTMLInputElement).value;
    this.dirtyInput = true;
    if (this.requiredInput.length > 0) {
      this.isInvalid = false;
    }
  };

  private handleRequiredBlur = () => {
    if (this.requiredInput.length === 0) {
      this.isInvalid = true;
    }
  };

  private handleOptionalInput1 = (evt: Event) => {
    this.optionalInput1 = (evt.target as HTMLInputElement).value;
  };

  private handleOptionalInput2 = (evt: Event) => {
    this.optionalInput2 = (evt.target as HTMLInputElement).value;
  };

  private handleRadioChange = (evt: Event) => {
    this.selectedRadio = (evt.target as HTMLInputElement).value;
  };

  private handleClose = () => {
    this.modalRef?.removeAttribute('open');
    // Reset form
    this.requiredInput = '';
    this.optionalInput1 = '';
    this.optionalInput2 = '';
    this.selectedRadio = 'radio-1';
    this.isInvalid = false;
    this.dirtyInput = false;
  };

  private handleSubmit = () => {
    if (this.requiredInput.length === 0) {
      this.isInvalid = true;
      return;
    }
    console.log('Form submitted with values:', {
      requiredInput: this.requiredInput,
      optionalInput1: this.optionalInput1,
      optionalInput2: this.optionalInput2,
      selectedRadio: this.selectedRadio,
    });
    this.handleClose();
  };

  render() {
    const isSubmitDisabled = this.requiredInput.length === 0;

    return html`
      <style>
        ${styles}
      </style>
      <cds-button
        kind="primary"
        @click=${() => this.modalRef?.setAttribute('open', '')}
      >
        Launch Modal
      </cds-button>
      <cds-modal
        class="${blockClass}"
        size="sm"
        ?open=${false}
        prevent-close-on-click-outside
        @cds-modal-closed=${this.handleClose}
        aria-label="Title"
        selector-primary-focus=".cds--text-input"
      >
        <cds-modal-close-button
          @click=${this.handleClose}
        ></cds-modal-close-button>
        
        <cds-modal-header class="${blockClass}__heading">
          <cds-modal-heading>
            Title
          </cds-modal-heading>
          <p class="${blockClass}__subtitle">Your subtitle text will appear here</p>
        </cds-modal-header>

        <cds-modal-body has-form>
          <p class="${blockClass}__description">
            This is example description text that will appear here in your modal
          </p>
          <cds-stack gap="4">
            <cds-text-input
              label="Text input label"
              placeholder="Placeholder"
              value=${this.requiredInput}
              @input=${this.handleRequiredInput}
              @blur=${this.handleRequiredBlur}
              ?invalid=${this.isInvalid}
              invalid-text="This is a required field"
            ></cds-text-input>

            <cds-text-input
              label="Text input label (optional)"
              placeholder="Placeholder"
              value=${this.optionalInput1}
              @input=${this.handleOptionalInput1}
            ></cds-text-input>

            <cds-text-input
              label="Text input label (optional)"
              placeholder="Placeholder"
              value=${this.optionalInput2}
              @input=${this.handleOptionalInput2}
            ></cds-text-input>

            <cds-radio-button-group
              legend-text="Radio button legend text goes here"
              name="radio-button-group"
              value=${this.selectedRadio}
              @cds-radio-button-group-changed=${this.handleRadioChange}
            >
              <cds-radio-button
                label-text="Radio-1"
                value="radio-1"
              ></cds-radio-button>
              <cds-radio-button
                label-text="Radio-2"
                value="radio-2"
              ></cds-radio-button>
              <cds-radio-button
                label-text="Radio-3"
                value="radio-3"
              ></cds-radio-button>
            </cds-radio-button-group>
          </cds-stack>
        </cds-modal-body>

        <cds-modal-footer>
          <cds-modal-footer-button
            kind="secondary"
            data-modal-close
            @click=${this.handleClose}
          >
            Cancel
          </cds-modal-footer-button>
          <cds-modal-footer-button
            kind="primary"
            ?disabled=${isSubmitDisabled}
            @click=${this.handleSubmit}
          >
            Create
          </cds-modal-footer-button>
        </cds-modal-footer>
      </cds-modal>
    `;
  }

  static styles = styles;
}

export default CreateModalWithFormValidation;
