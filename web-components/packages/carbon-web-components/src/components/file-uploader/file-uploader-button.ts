/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import styles from './file-uploader.scss';
import { BUTTON_KIND, BUTTON_SIZE } from '../button/defs';

export { FORM_ELEMENT_COLOR_SCHEME as TILE_COLOR_SCHEME } from '../../globals/shared-enums';

/**
 * File uploader button .
 *
 * @element cds-file-uploader-container
 * @fires cds-file-uploader-button-changed The custom event fired when there is a user gesture to select files to upload.
 */
@customElement(`${prefix}-file-uploader-button`)
class CDSFileUploaderButton extends HostListenerMixin(LitElement) {
  /**
   * Handles `click` event on the button.
   */
  private _handleClick(event) {
    event.target.value = null;
    const { selectorInput } = this.constructor as typeof CDSFileUploaderButton;
    this?.shadowRoot?.querySelector(selectorInput)?.setAttribute('value', '');
    (this?.shadowRoot?.querySelector(selectorInput) as HTMLElement).click();
  }

  /**
   * Handles `keydown` event on the button.
   */
  private _handleKeyDown(event) {
    const { selectorInput } = this.constructor as typeof CDSFileUploaderButton;
    if (event.key === 'Enter' || event.key === 'Space') {
      this?.shadowRoot?.querySelector(selectorInput)?.setAttribute('value', '');
      (this?.shadowRoot?.querySelector(selectorInput) as HTMLElement).click();
    }
  }

  /**
   * Handles user gesture to select files to upload.
   *
   * @param event The event.
   */
  private _handleChange(event: Event | DragEvent) {
    const addedFiles = this._getFiles(event);
    const { eventChange, selectorInput } = this
      .constructor as typeof CDSFileUploaderButton;
    this.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          addedFiles,
        },
      })
    );

    const fileInput = this?.shadowRoot?.querySelector(selectorInput);
    if (fileInput) {
      (fileInput as HTMLInputElement).value = '';
    }
  }

  /**
   * @param event The event.
   * @returns The list of files user chose to upload.
   */
  private _getFiles(event: Event | DragEvent) {
    const { files } =
      (event.type === 'drop'
        ? (event as DragEvent).dataTransfer
        : (event.target as HTMLInputElement)) ?? {};
    const { accept } = this;
    if (!accept || !/^(change|drop)$/.test(event.type)) {
      return Array.from(files ?? []);
    }
    const acceptedTypes = new Set(accept.split(' '));
    return Array.prototype.filter.call(
      files,
      ({ name, type: mimeType = '' }) => {
        const fileExtensionRegExp = /\.[^.]+$/;
        const hasFileExtension = fileExtensionRegExp.test(name);
        const [fileExtension] = !hasFileExtension
          ? [undefined]
          : fileExtensionRegExp.exec(name) ?? [];

        return (
          acceptedTypes.has(mimeType) ||
          (fileExtension && acceptedTypes.has(fileExtension))
        );
      }
    ) as File[];
  }

  /**
   * Button kind.
   */
  @property({ reflect: true, attribute: 'button-kind' })
  buttonKind = BUTTON_KIND.PRIMARY;

  /**
   * Button size.
   */
  @property({ reflect: true })
  size = BUTTON_SIZE.MEDIUM;

  /**
   * The file types the file input should accept, separated by space.
   */
  @property()
  accept = '';

  /**
   * `true` if this drop container should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if this drop container should accept more than one files at once.
   * Note that even with `false` set here, user _can_ select multiple files one by one.
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * The name of the input.
   */
  @property({ reflect: true })
  name = '';

  /**
   * The shadow DOM slot to put this drop container in.
   */
  @property({ reflect: true })
  slot = 'drop-container';

  render() {
    const {
      accept,
      disabled,
      multiple,
      name,
      buttonKind,
      size,
      _handleChange: handleChange,
    } = this;

    const labelClasses = classMap({
      [`${prefix}--file-browse-btn`]: true,
      [`${prefix}--file-browse-btn--disabled`]: disabled,
    });
    const buttonClasses = classMap({
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--${buttonKind}`]: buttonKind,
      [`${prefix}--layout--size-${size}`]: size,
      [`${prefix}--btn--disabled`]: disabled,
      [`${prefix}--btn--${size}`]: size,
    });
    return html`
      <button
        type="button"
        class="${buttonClasses}"
        @click="${this._handleClick}"
        @keydown="${this._handleKeyDown}">
        <slot></slot>
      </button>
      <label class="${labelClasses}" for="file"> </label>
      <input
        id="file"
        type="file"
        class="${prefix}--file-input"
        tabindex="-1"
        accept="${ifNonEmpty(accept)}"
        ?disabled="${disabled}"
        ?multiple="${multiple}"
        name="${ifNonEmpty(name)}"
        @change="${handleChange}" />
    `;
  }

  /**
   * The name of the custom event fired when there is a user gesture to select files to upload.
   */
  static get eventChange() {
    return `${prefix}-file-uploader-button-changed`;
  }

  /**
   * A selector that will return the file `<input>`.
   */
  static get selectorInput() {
    return `.${prefix}--file-input`;
  }

  static styles = styles;
}

export default CDSFileUploaderButton;
