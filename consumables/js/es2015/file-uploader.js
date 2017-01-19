import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/array-from';

class FileUploader extends mixin(createComponent, initComponent) {
  /**
   * File uploader.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a file uploader.
   * @param {Object} [options] The component options.
   * @param {string} [options.labelSelector] The CSS selector to find the label for the file name.
   */
  constructor(element, options) {
    super(element, options);

    this.labelNode = this.element.nextElementSibling
      || this.element.ownerDocument.querySelector(`.bx--file__label${this.options.selectorLabel}`);

    element.addEventListener('change', (event) => { this.updateLabel(event); });
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
   */
  static options = {
    selectorInit: '[data-file-uploader]',
    selectorLabel: '[data-file-appearance]',
  };
}

export default FileUploader;
