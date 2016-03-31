export default class FileUploader {
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    const labelSelector = options.labelSelector || element.getAttribute('data-label');
    this.labelNode = element.parentNode.querySelector(labelSelector) || element.nextElementSibling;

    this.constructor.components.set(this.element, this);

    element.addEventListener('change', (event) => this.updateLabel(event));
  }

  static init(options) {
    [... document.querySelectorAll('[data-file-input]')].forEach(element => this.create(element, options));
  }

  updateLabel(event) {
    let fileName = '';
    const element = this.element;

    if (element.files && element.files.length > 1) {
      fileName = (element.getAttribute('data-multiple-caption') || '').replace('{count}', element.files.length);
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

  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }
}

FileUploader.components = new WeakMap();
