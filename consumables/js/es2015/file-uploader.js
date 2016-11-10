import '../polyfills/element-matches';

export default class FileUploader {
  /**
   * File uploader.
   * @implements Component
   * @param {HTMLElement} element The element working as a file uploader.
   * @param {Object} [options] The component options.
   * @param {string} [options.labelSelector] The CSS selector to find the label for the file name.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.options = Object.assign(Object.create(this.constructor.options), options);

    const labelSelector = this.options.labelSelector || element.dataset.label;
    this.labelNode = element.parentNode.querySelector(labelSelector) || element.nextElementSibling;

    this.constructor.components.set(this.element, this);

    element.addEventListener('change', (event) => this.updateLabel(event));
  }

  /**
   * Instantiates file uploader of the given element.
   * @param {HTMLElement} element The element working as a file uploader.
   * @param {Object} [options] The component options.
   * @param {string} [options.labelSelector] The CSS selector to find the label for the file name.
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Instantiates file uploader in the given node.
   * If the given element indicates that it's an file uploader, instantiates it.
   * Otherwise, instantiates file uploader by searching for file uploader in the given node.
   * @param {HTMLElement} element The element working as a file uploader.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorInit] The CSS selector to find file uploaders.
   * @param {string} [options.labelSelector] The CSS selector to find the label for the file name.
   */
  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target, effectiveOptions);
    } else {
      [... target.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element, effectiveOptions));
    }
  }

  /**
   * Updates the label for the file name upon file selection.
   * @param {Event} event The event triggering this method.
   */
  updateLabel(event) {
    let fileName = '';
    const element = this.element;

    if (element.files && element.files.length > 1) {
      fileName = (element.dataset.multipleCaption || '').replace('{count}', element.files.length);
    } else {
      fileName = event.target.value.split('\\').pop();
    }

    if (fileName) {
      this.labelNode.textContent = fileName;
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  /**
   * The map associating DOM element and file uploader instance.
   * @member FileUploader.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode FileUploader.create .create()}, or {@linkcode FileUploader.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode FileUploader.init .init()} works.
   * @member FileUploader.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find file uploaders.
   * @property {string} [labelSelector] The CSS selector to find the label for the file name.
   */
  static options = {
    selectorInit: '[data-file-uploader]',
  };
}
