/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import styles from './file-uploader.scss';

export { FORM_ELEMENT_COLOR_SCHEME as TILE_COLOR_SCHEME } from '../../globals/shared-enums';

const { prefix } = settings;

/**
 * The value to set to `event.dataTransfer.dropEffect`, keyed by the event nane.
 */
const dropEffects = {
  dragover: 'copy',
  dragleave: 'move',
};

/**
 * File drop container.
 * @element bx-file-drop-container
 * @fires bx-file-drop-container-changed The custom event fired when there is a user gesture to select files to upload.
 */
@customElement(`${prefix}-file-drop-container`)
class BXFileDropContainer extends HostListenerMixin(LitElement) {
  /**
   * `true` to show the active state of this UI.
   */
  private _active = false;

  /**
   * Handles user gesture to select files to upload.
   * @param event The event.
   */
  private _handleChange(event: Event | DragEvent) {
    const addedFiles = this._getFiles(event);
    const { eventChange, selectorInput } = this.constructor as typeof BXFileDropContainer;
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
      (fileInput as HTMLInputElement).value = ''; // carbon-web-components#904
    }
  }

  /**
   * Handles `dragover`, `dragleave` and `drop` events.
   * @param event The event.
   */
  @HostListener('dragover')
  @HostListener('dragleave')
  @HostListener('drop')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleDrag(event: DragEvent) {
    event.preventDefault(); // Prevents page navigation upon dropping
    if (this.disabled) {
      return;
    }
    const { dataTransfer, type } = event;
    const dropEffect = dropEffects[type];
    if (dataTransfer && dropEffect) {
      dataTransfer.dropEffect = dropEffect;
    }
    this._active = type === 'dragover';
    if (type === 'drop') {
      this._handleChange(event);
    }
    this.requestUpdate();
  }

  /**
   * @param event The event.
   * @returns The list of files user chose to upload.
   */
  private _getFiles(event: Event | DragEvent) {
    const { files } = (event.type === 'drop' ? (event as DragEvent).dataTransfer : (event.target as HTMLInputElement)) ?? {};
    const { accept } = this;
    if (!accept || !/^(change|drop)$/.test(event.type)) {
      return Array.from(files ?? []);
    }
    const acceptedTypes = new Set(accept.split(' '));
    return Array.prototype.filter.call(files, ({ name, type: mimeType = '' }) => {
      const fileExtensionRegExp = /\.[^.]+$/;
      const hasFileExtension = fileExtensionRegExp.test(name);
      const [fileExtension] = !hasFileExtension ? [undefined] : fileExtensionRegExp.exec(name) ?? [];
      return acceptedTypes.has(mimeType) || (fileExtension && acceptedTypes.has(fileExtension));
    }) as File[];
  }

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
   * The shadow DOM slot to put this drop container in.
   */
  @property({ reflect: true })
  slot = 'drop-container';

  render() {
    const { accept, disabled, multiple, _active: active, _handleChange: handleChange } = this;
    const labelClasses = classMap({
      [`${prefix}--file-browse-btn`]: true,
      [`${prefix}--file-browse-btn--disabled`]: disabled,
    });
    const dropareaClasses = classMap({
      [`${prefix}--file__drop-container`]: true,
      [`${prefix}--file__drop-container--drag-over`]: active,
    });
    return html`
      <label class="${labelClasses}" for="file" tabindex="0">
        <div class="${dropareaClasses}" role="button">
          <slot></slot>
          <input
            id="file"
            type="file"
            class="${prefix}--file-input"
            tabindex="-1"
            accept="${ifNonEmpty(accept)}"
            ?disabled="${disabled}"
            ?multiple="${multiple}"
            @change="${handleChange}" />
        </div>
      </label>
    `;
  }

  /**
   * The name of the custom event fired when there is a user gesture to select files to upload.
   */
  static get eventChange() {
    return `${prefix}-file-drop-container-changed`;
  }

  /**
   * A selector that will return the file `<input>`.
   */
  static get selectorInput() {
    return `.${prefix}--file-input`;
  }

  static styles = styles;
}

export default BXFileDropContainer;
