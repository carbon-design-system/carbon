export default class FileUploader {
  constructor(element, options) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    const labelSelector = options && options.labelSelector || element.getAttribute('data-label');
    this.labelNode = element.parentNode.querySelector(labelSelector) || element.nextElementSibling;

    FileUploader.components.set(this.element, this);

    element.addEventListener('change', (event) => this.updateLabel(event));
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
      this.labelNode.innerHTML = fileName;
    }
  }

  release() {
    FileUploader.components.delete(this.element);
  }

  static create(element, options) {
    return FileUploader.components.get(element) || new FileUploader(element, options);
  }
}

FileUploader.components = new WeakMap();
