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
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/textarea/index.js';
import errorFilled16 from '@carbon/icons/es/error--filled/16';
import { iconLoader } from "@carbon/web-components/es/globals/internal/icon-loader.js";
import styles from './saving.scss?lit';

const blockClass = `c4p--saving`;

type Status = 'default' | 'in-progress' | 'success' | 'fail';
const statusObj = {
  default: {
    text: 'Save',
  },
  ['in-progress']: {
    text: 'Saving...',
  },
  success: {
    text: 'Saved',
  },
  fail: {
    text: 'Failed to save. Try again?',
  },
};
/**
 * Saving.
 *
 * @element auto-saving
 *
 * */

@customElement(`auto-saving`)
class AutoSaving extends HostListenerMixin(LitElement) {
  @state()
  status: Status = 'default';
  @state()
  dirtyInput: boolean = false;
  @state()
  text?: string;
  firstUpdated() {
    const textAreaComponent = this.renderRoot.querySelector(
      'cds-textarea'
    ) as LitElement | null;
    textAreaComponent?.updateComplete.then(() => {
      const nativeTextarea =
        textAreaComponent.shadowRoot?.querySelector('textarea');
      nativeTextarea?.addEventListener('input', this._onChangeHandler);
    });
  }
  render() {
    const { status, dirtyInput } = this;
    return html`
      <style>
        ${styles}
      </style>
      <cds-textarea
        id="save-auto-textarea"
        label="Enter in the thing you wanted saved"
        class="saving-story-textarea"
      ></cds-textarea>
      ${dirtyInput && status !== 'default'
        ? html`
            <div class="${blockClass}__message">
              ${status === 'fail'
                ? html`
                    <div class="${blockClass}__error-icon">
                      <ErrorFilled size="{16}" />
                      ${iconLoader(errorFilled16, {})}
                    </div>
                  `
                : ''}
              <p class="${blockClass}__text">${statusObj[status]?.text}</p>
            </div>
          `
        : ''}
    `;
  }
  _onChangeHandler = async () => {
    if (!this.dirtyInput) {
      this.dirtyInput = true;
    }
    this.status = 'in-progress';
    setTimeout(() => {
      this.status = 'success';
    }, 2000);
  };
  static styles = styles;
}
export default AutoSaving;
