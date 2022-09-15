/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './file-uploader.scss';

const { prefix } = settings;

/**
 * The shell UI for file uploader.
 * @element bx-file-uploader
 * @slot helper-text The helper text.
 * @slot label-text The label text.
 */
@customElement(`${prefix}-file-uploader`)
class BXFileUploader extends LitElement {
  /**
   * The helper text.
   */
  @property({ attribute: 'helper-text' })
  helperText = '';

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  render() {
    const { helperText, labelText } = this;
    return html`
      <strong class="${prefix}--file--label"><slot name="label-text">${labelText}</slot></strong>
      <p class="${prefix}--label-description"><slot name="helperText-text">${helperText}</slot></p>
      <slot name="drop-container"></slot>
      <div class="${prefix}--file-container">
        <slot></slot>
      </div>
    `;
  }

  static styles = styles;
}

export default BXFileUploader;
