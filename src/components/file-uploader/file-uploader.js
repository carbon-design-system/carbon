import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';

class FileUploader extends mixin(createComponent, initComponentBySearch, eventedState) {
  /**
   * File uploader.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends eventedState
   * @param {HTMLElement} element The element working as a file uploader.
   * @param {Object} [options] The component options. See static options.
   */
  constructor(element, options = {}) {
    super(element, options);
    this.input = this.element.querySelector(this.options.selectorInput);
    this.container = this.element.querySelector(this.options.selectorContainer);

    if (!this.input) {
      throw new Error('Cannot find the file input box.');
    }

    if (!this.container) {
      throw new Error('Cannot find the file names container.');
    }

    this.inputId = this.input.getAttribute('id');
    this.input.addEventListener('change', () => this._displayFilenames());
  }

  _filenamesHTML(name, id) {
    return `<span class="bx--file__selected-file">
      <p class="bx--file-filename">${name}</p>
      <span data-for="${id}" class="bx--file__state-container"></span>
    </span>`;
  }

  _uploadHTML() {
    return `
      <div data-loading class="bx--loading">
        <svg class="bx--loading__svg" viewBox="-42 -42 84 84">
          <circle cx="0" cy="0" r="37.5" />
        </svg>
      </div>`;
  }

  _closeButtonHTML() {
    return `
      <svg class="bx--file-close" tabindex="0" viewBox="0 0 16 16" fill-rule="evenodd" width="16" height="16">
        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8
          9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />
      </svg>`;
  }

  _checkmarkHTML() {
    return `
      <svg class="bx--file-complete" viewBox="0 0 16 16" fill-rule="evenodd" width="16" height="16">
       <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.7 11.5L3.4 8.1l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.6z"/>
      </svg>`;
  }

  _changeState = (state, detail, callback) => {
    if (state === 'delete-filename-fileuploader') {
      this.container.removeChild(detail.filenameElement);
    }
    callback();
  };

  _getStateContainers() {
    const stateContainers = [...this.element.querySelectorAll(`[data-for=${this.inputId}]`)];

    if (stateContainers.length === 0) {
      throw new TypeError('State container elements not found; invoke _displayFilenames() first');
    }

    if (stateContainers[0].dataset.for !== this.inputId) {
      throw new TypeError('File input id must equal [data-for] attribute');
    }

    return stateContainers;
  }

  /**
   * Inject selected files into DOM. Invoked on change event.
   */
  _displayFilenames() {
    const container = this.element.querySelector(this.options.selectorContainer);
    const HTMLString = [...this.input.files].map(file => this._filenamesHTML(file.name, this.inputId)).join('');

    container.insertAdjacentHTML('afterbegin', HTMLString);
  }

  _removeState(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
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

  setState(state, selectIndex) {
    const stateContainers = this._getStateContainers();

    if (state === 'edit') {
      this._handleStateChange(stateContainers, selectIndex, this._closeButtonHTML());
      stateContainers.forEach(el => {
        el.addEventListener('click', evt => {
          const detail = {
            initialEvt: evt,
            filenameElement: evt.currentTarget.parentNode,
          };
          this._changeState('delete-filename-fileuploader', detail);
        });
      });
    }

    if (state === 'upload') {
      this._handleStateChange(stateContainers, selectIndex, this._uploadHTML());
    }

    if (state === 'complete') {
      this._handleStateChange(stateContainers, selectIndex, this._checkmarkHTML());
    }
  }

  /**
   * The map associating DOM element and file uploader instance.
   * @member FileUploader.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  static options = {
    selectorInit: '[data-file]',
    selectorInput: 'input[type="file"].bx--file-input',
    selectorContainer: '[data-file-container]',
    selectorCloseButton: '.bx--file-close',
    eventBeforeDeleteFilenameFileuploader: 'fileuploader-before-delete-filename',
    eventAfterDeleteFilenameFileuploader: 'fileuploader-after-delete-filename',
  };
}

export default FileUploader;
