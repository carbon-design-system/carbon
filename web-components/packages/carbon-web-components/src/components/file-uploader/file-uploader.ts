/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './file-uploader.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * The shell UI for file uploader.
 *
 * @element cds-file-uploader
 * @slot label-title.
 * @slot lebel-description.
 */
@customElement(`${prefix}-file-uploader`)
class CDSFileUploader extends LitElement {
  /**
   * `true` if the file uploader should disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The description text.
   */
  @property({ attribute: 'label-description' })
  labelDescription = '';

  /**
   * The label title.
   */
  @property({ attribute: 'label-title' })
  labelTitle = '';

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      const { selectorUploaderItem } = this
        .constructor as typeof CDSFileUploader;
      const uploaderItem = this.querySelector(
        selectorUploaderItem
      ) as CDSFileUploader;
      uploaderItem.disabled = this.disabled;
    }
  }

  render() {
    const { disabled, labelDescription, labelTitle } = this;

    const labelClasses = classMap({
      [`${prefix}--file--label`]: true,
      [`${prefix}--label-description--disabled`]: disabled,
    });

    const descriptionClasses = classMap({
      [`${prefix}--label-description`]: true,
      [`${prefix}--label-description--disabled`]: disabled,
    });

    return html`
      <p class="${labelClasses}">
        <slot name="label-title">${labelTitle}</slot>
      </p>
      <p class="${descriptionClasses}">
        <slot name="label-description">${labelDescription}</slot>
      </p>
      <slot name="drop-container"></slot>
      <div class="${prefix}--file-container">
        <slot></slot>
      </div>
    `;
  }

  /**
   * A selector that will return the `<input>` to enter starting date.
   */
  static get selectorUploaderItem() {
    return `${prefix}-file-uploader-button,${prefix}-file-uploader-drop-container`;
  }

  static styles = styles;
}

export default CDSFileUploader;
