/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './file-uploader.scss';

/**
 * The shell UI for file uploader.
 *
 * @element cds-file-uploader
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
      <strong class="${prefix}--file--label"
        ><slot name="label-text">${labelText}</slot></strong
      >
      <p class="${prefix}--label-description">
        <slot name="helperText-text">${helperText}</slot>
      </p>
      <slot name="drop-container"></slot>
      <div class="${prefix}--file-container">
        <slot></slot>
      </div>
    `;
  }

  static styles = styles;
}

export default BXFileUploader;
