/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

const toArray = arrayLike => Array.prototype.slice.call(arrayLike);

class FileUploader extends mixin(
  createComponent,
  initComponentBySearch,
  eventedState,
  handles
) {
  /**
   * File uploader.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends eventedState
   * @extends Handles
   * @param {HTMLElement} element The element working as a file uploader.
   * @param {object} [options] The component options. See static options.
   */
  constructor(element, options = {}) {
    super(element, options);
    this.input = this.element.querySelector(this.options.selectorInput);
    this.container = this.element.querySelector(this.options.selectorContainer);
    this.dropContainer = this.element.querySelector(
      this.options.selectorDropContainer
    );

    if (!this.input) {
      throw new TypeError('Cannot find the file input box.');
    }

    if (!this.container) {
      throw new TypeError('Cannot find the file names container.');
    }

    this.inputId = this.input.getAttribute('id');
    this.manage(on(this.input, 'change', () => this._displayFilenames()));
    this.manage(on(this.container, 'click', this._handleDeleteButton));
    this.manage(
      on(this.element.ownerDocument, 'dragleave', this._handleDragDrop)
    );
    this.manage(on(this.dropContainer, 'dragover', this._handleDragDrop));
    this.manage(on(this.dropContainer, 'drop', this._handleDragDrop));
  }

  _filenamesHTML(name, id) {
    return `<span class="${this.options.classSelectedFile}">
      <p class="${this.options.classFileName}">${name}</p>
      <span data-for="${id}" class="${this.options.classStateContainer}"></span>
    </span>`;
  }

  _uploadHTML() {
    return `
      <div class="${this.options.classLoadingAnimation}">
        <div data-inline-loading-spinner class="${this.options.classLoading}">
          <svg class="${this.options.classLoadingSvg}" viewBox="-75 -75 150 150">
            <circle class="${this.options.classLoadingBackground}" cx="0" cy="0" r="37.5" />
            <circle class="${this.options.classLoadingStroke}" cx="0" cy="0" r="37.5" />
          </svg>
        </div>
      </div>`;
  }

  _closeButtonHTML() {
    return `
      <button class="${this.options.classFileClose}" type="button" aria-label="close">
      <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
      <path fill="#231F20" d="M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z"/>
      </svg>
      </button>`;
  }

  _checkmarkHTML() {
    return `
      <svg focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style="will-change: transform;"
        xmlns="http://www.w3.org/2000/svg"
        class="${this.options.classFileComplete}"
        width="16" height="16" viewBox="0 0 16 16"
        aria-hidden="true">
        <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zM7 11L4.3 8.3l.9-.8L7 9.3l4-3.9.9.8L7 11z"></path>
        <path d="M7 11L4.3 8.3l.9-.8L7 9.3l4-3.9.9.8L7 11z" data-icon-path="inner-path" opacity="0"></path>
      </svg>
    `;
  }

  _changeState = (state, detail, callback) => {
    if (state === 'delete-filename-fileuploader') {
      this.container.removeChild(detail.filenameElement);
    }
    if (typeof callback === 'function') {
      callback();
    }
  };

  _getStateContainers() {
    const stateContainers = toArray(
      this.element.querySelectorAll(`[data-for=${this.inputId}]`)
    );

    if (stateContainers.length === 0) {
      throw new TypeError(
        'State container elements not found; invoke _displayFilenames() first'
      );
    }

    if (stateContainers[0].dataset.for !== this.inputId) {
      throw new TypeError('File input id must equal [data-for] attribute');
    }

    return stateContainers;
  }

  /**
   * Inject selected files into DOM. Invoked on change event.
   * @param {File[]} files The files to upload.
   */
  _displayFilenames(files = this.input.files) {
    const container = this.element.querySelector(
      this.options.selectorContainer
    );
    const HTMLString = toArray(files)
      .map(file => this._filenamesHTML(file.name, this.inputId))
      .join('');

    container.insertAdjacentHTML('afterbegin', HTMLString);
  }

  _removeState(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError(
        'DOM element should be given to initialize this widget.'
      );
    }
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  _handleStateChange(elements, selectIndex, html) {
    if (selectIndex === undefined) {
      elements.forEach(el => {
        this._removeState(el);
        el.insertAdjacentHTML('beforeend', html);
      });
    } else {
      elements.forEach((el, index) => {
        if (index === selectIndex) {
          this._removeState(el);
          el.insertAdjacentHTML('beforeend', html);
        }
      });
    }
  }

  /**
   * Handles delete button.
   * @param {Event} evt The event triggering this action.
   * @private
   */
  _handleDeleteButton = evt => {
    const target = eventMatches(evt, this.options.selectorCloseButton);
    if (target) {
      this.changeState('delete-filename-fileuploader', {
        initialEvt: evt,
        filenameElement: target.closest(this.options.selectorSelectedFile),
      });
    }
  };

  /**
   * Handles drag/drop event.
   * @param {MouseEvent} evt The event.
   * @private
   */
  _handleDragDrop = evt => {
    const isOfSelf = this.element.contains(evt.target);
    // In IE11 `evt.dataTransfer.types` is a `DOMStringList` instead of an array
    if (
      Array.prototype.indexOf.call(evt.dataTransfer.types, 'Files') >= 0 &&
      !eventMatches(evt, this.options.selectorOtherDropContainers)
    ) {
      const inArea =
        isOfSelf && eventMatches(evt, this.options.selectorDropContainer);
      if (evt.type === 'dragover') {
        evt.preventDefault();
        const dropEffect = inArea ? 'copy' : 'none';
        if (Array.isArray(evt.dataTransfer.types)) {
          // IE11 throws a "permission denied" error accessing `.effectAllowed`
          evt.dataTransfer.effectAllowed = dropEffect;
        }
        evt.dataTransfer.dropEffect = dropEffect;
        this.dropContainer.classList.toggle(
          this.options.classDragOver,
          Boolean(inArea)
        );
      }
      if (evt.type === 'dragleave') {
        this.dropContainer.classList.toggle(this.options.classDragOver, false);
      }
      if (inArea && evt.type === 'drop') {
        evt.preventDefault();
        this._displayFilenames(evt.dataTransfer.files);
        this.dropContainer.classList.remove(this.options.classDragOver);
      }
    }
  };

  setState(state, selectIndex) {
    const stateContainers = this._getStateContainers();

    if (state === 'edit') {
      this._handleStateChange(
        stateContainers,
        selectIndex,
        this._closeButtonHTML()
      );
    }

    if (state === 'upload') {
      this._handleStateChange(stateContainers, selectIndex, this._uploadHTML());
    }

    if (state === 'complete') {
      this._handleStateChange(
        stateContainers,
        selectIndex,
        this._checkmarkHTML()
      );
    }
  }

  /**
   * The map associating DOM element and file uploader instance.
   * @member FileUploader.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-file]',
      selectorInput: `input[type="file"].${prefix}--file-input`,
      selectorContainer: '[data-file-container]',
      selectorCloseButton: `.${prefix}--file-close`,
      selectorSelectedFile: `.${prefix}--file__selected-file`,
      selectorDropContainer: `[data-file-drop-container]`,
      selectorOtherDropContainers: '[data-drop-container]',
      classLoading: `${prefix}--loading ${prefix}--loading--small`,
      classLoadingAnimation: `${prefix}--inline-loading__animation`,
      classLoadingSvg: `${prefix}--loading__svg`,
      classLoadingBackground: `${prefix}--loading__background`,
      classLoadingStroke: `${prefix}--loading__stroke`,
      classFileName: `${prefix}--file-filename`,
      classFileClose: `${prefix}--file-close`,
      classFileComplete: `${prefix}--file-complete`,
      classSelectedFile: `${prefix}--file__selected-file`,
      classStateContainer: `${prefix}--file__state-container`,
      classDragOver: `${prefix}--file__drop-container--drag-over`,
      eventBeforeDeleteFilenameFileuploader:
        'fileuploader-before-delete-filename',
      eventAfterDeleteFilenameFileuploader:
        'fileuploader-after-delete-filename',
    };
  }
}

export default FileUploader;
