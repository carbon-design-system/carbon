import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import '../../../demo/polyfills/element-matches';
import '../../../demo/polyfills/object-assign';
import '../../../demo/polyfills/array-from';

const initialStateHTML = (name, id) =>
  (`
    <span class="bx--file-uploader__selected-file">
      <p class="bx--file-uploader__filename">${name}</p>
      <span data-for="${id}" class="bx--file-uploader__state-container"></span>
    </span>
  `);

const uploadStateHTML = () =>
  (`
    <div data-loading class="bx--loading">
      <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
        <circle cx="0" cy="0" r="37.5" />
      </svg>
    </div>`
  );

const editStateHTML = () =>
  (`
    <svg class="bx--file-uploader__close-icon">
      <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v5/img/bluemix-icons.svg#close--glyph"></use>
    </svg>`
  );

class FileUploader extends mixin(createComponent, initComponentBySearch) {
  /**
   * File uploader.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a file uploader.
   * @param {Object} [options] The component options.
   * @param {string} [options.labelSelector] The CSS selector to find the label for the file name.
   */
  constructor(element, options = {}) {
    super(element, options);
    this.uniqueStateContainerID = this.element.getAttribute('id');
    this.options = Object.assign(Object.create(this.constructor.options), options);
    this.state = '';

    this.constructor.components.set(this.element, this);

    if (element.classList.contains('bx--file-uploader__input')) {
      element.addEventListener('change', () => this.injectInitialStateHTML());
    }
  }

  /**
   * Display selected files for upload, invoked on change event
   * @param {string} CSS selector for HTMLElement container that displays selected files.
   */
  injectInitialStateHTML(selectorContainer = this.options.selectorContainer) {
    const selector = this.element.dataset.target || selectorContainer;
    const container = this.element.ownerDocument.querySelector(selector);
    const HTMLString = [...this.element.files]
      .map(file => initialStateHTML(file.name, this.uniqueStateContainerID))
      .join('');

    container.insertAdjacentHTML('afterbegin', HTMLString);
    this.state = 'default';
    return this.state;
  }

  /**
   * Set dataset.state using given state
   * insert HTMLString with given html param into target
   */
  injectStateHTML(state, target, html) {
    this.element.dataset.state = state;
    target.insertAdjacentHTML('afterbegin', html);
  }

  /**
   * Set stateful HTML into each selected file state container
   * Sets [data-state] to given state on this.element
   * Removes any existing HTML in state container
   * Should only be called after change event or after invoking injectInitialStateHTML()
   * @param {string} State ('edit' or 'upload') determines which HTML fragment to inject
   */
  setStateHTML(state) {
    const selector = `[data-for=${this.uniqueStateContainerID}]`;
    const stateContainers = [...this.element.ownerDocument.querySelectorAll(selector)];

    if (stateContainers.length === 0) {
      throw new TypeError('State container elements not found; invoke injectInitialStateHTML() before injectStateHTML())');
    }

    if (state === undefined || state === '') {
      throw new TypeError('injectStateHTML() missing String args: "edit" or "upload"');
    }

    stateContainers.forEach((container) => {
      const childNode = container.querySelector('div') || container.querySelector('svg') || false;
      if (childNode) {
        container.removeChild(childNode);
      }

      if (state === 'upload') {
        this.injectStateHTML('upload', container, uploadStateHTML());
      }

      if (state === 'edit') {
        this.injectStateHTML('edit', container, editStateHTML());
      }
    });

    this.state = state;

    return {
      state: this.state,
      selector,
      stateContainers,
    };
  }

  /**
   * The map associating DOM element and file uploader instance.
   * @member FileUploader.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode FileUploader.create .create()}, or {@linkcode FileUploader.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode FileUploader.init .init()} works.
   * @member FileUploader.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find file uploaders.
   * @property {string} selectorContainer The selector to find "file uploader container" showing all selected files to display.
   * @property {string} [labelSelector] The CSS selector to find the label for the file name.
   */
  static options = {
    selectorInit: '[data-file-uploader]',
    selectorContainer: '[data-file-container]',
  };
}

export default FileUploader;
