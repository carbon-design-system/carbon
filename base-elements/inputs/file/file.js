export default class FileUploader {
  constructor(element, options) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    const labelSelector = options && options.labelSelector || element.getAttribute('data-label');
    this.labelNode = element.parentNode.querySelector(labelSelector) || element.nextElementSibling;

    element.addEventListener('change', (e) => this.updateLabel(e));
  }

  updateLabel(e) {
    let fileName = '';
    const element = this.element;

    if (element.files && element.files.length > 1) {
      fileName = (element.getAttribute('data-multiple-caption') || '').replace('{count}', element.files.length);
    } else {
      fileName = e.target.value.split('\\').pop();
    }

    if (fileName) {
      this.labelNode.innerHTML = fileName;
    }
  }
}
