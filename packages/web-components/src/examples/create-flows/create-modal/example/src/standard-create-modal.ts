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
import '@carbon/web-components/es/components/textarea/index';
import '@carbon/web-components/es/components/dropdown/index';
import '@carbon/web-components/es/components/form-group/index';
import '@carbon/web-components/es/components/stack/index';
import styles from './create-modal.scss?lit';

const blockClass = `c4p--create-modal`;

/**
 * StandardCreateModal - A self-contained example of the CreateModal pattern.
 *
 * @element standard-create-modal
 */

@customElement(`standard-create-modal`)
class StandardCreateModal extends HostListenerMixin(LitElement) {
  @state()
  private textInputValue = '';

  @state()
  private textAreaValue = '';

  @state()
  private selectedDropdown = '';

  @query('cds-modal')
  private modalRef!: HTMLElement;

  private handleTextInput = (evt: Event) => {
    this.textInputValue = (evt.target as HTMLInputElement).value;
  };

  private handleTextAreaInput = (evt: Event) => {
    this.textAreaValue = (evt.target as HTMLTextAreaElement).value;
  };

  private handleDropdownChange = (evt: Event) => {
    this.selectedDropdown = (evt.target as any).value;
  };

  private handleClose = () => {
    this.modalRef?.removeAttribute('open');
    // Reset form
    this.textInputValue = '';
    this.textAreaValue = '';
    this.selectedDropdown = '';
  };

  private handleSubmit = () => {
    console.log('Form submitted with values:', {
      textInput: this.textInputValue,
      textArea: this.textAreaValue,
      dropdown: this.selectedDropdown,
    });
    this.handleClose();
  };

  render() {
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
              helper-text="Helper text goes here"
              placeholder="Placeholder"
              value=${this.textInputValue}
              @input=${this.handleTextInput}
              data-modal-primary-focus
            ></cds-text-input>

            <cds-dropdown
              title-text="Dropdown label"
              helper-text="This is some helper text"
              label="Dropdown menu options"
              value=${this.selectedDropdown}
              @cds-dropdown-selected=${this.handleDropdownChange}
            >
              <cds-dropdown-item value="option-0">Option 0</cds-dropdown-item>
              <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
              <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
            </cds-dropdown>

            <cds-textarea
              label="Text area label"
              helper-text="Optional helper text"
              placeholder="Placeholder text"
              value=${this.textAreaValue}
              @input=${this.handleTextAreaInput}
            ></cds-textarea>
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

export default StandardCreateModal;
