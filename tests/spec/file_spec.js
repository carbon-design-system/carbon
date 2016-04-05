import '../../consumables/js/polyfills/custom-event';
import '../utils/es6-weak-map-global'; // For PhantomJS
import { FileUploader } from '../../consumables/js/es2015/index.js';;

describe('Test file uploader', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new FileUploader();
      }).to.throw;
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new FileUploader(document.createTextNode(''));
      }).to.throw;
    });

    it(`Should search for an element with options.labelSelector`, function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;

      const parentElement = document.createElement('div');
      const element = document.createElement('div');

      const labelNode = document.createElement('div');
      labelNode.id = id;

      parentElement.appendChild(element);
      parentElement.appendChild(labelNode);

      const uploader = new FileUploader(element, { labelSelector: `#${id}` });
      expect(uploader.labelNode).to.equal(labelNode);
    });

    it(`Should search for an element with data-label attribute`, function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;

      const parentElement = document.createElement('div');
      const element = document.createElement('div');
      element.dataset.label = `#${id}`;

      const labelNode = document.createElement('div');
      labelNode.id = id;

      parentElement.appendChild(element);
      parentElement.appendChild(labelNode);

      const uploader = new FileUploader(element);
      expect(uploader.labelNode).to.equal(labelNode);
    });

    it(`Should use next sibling as the default label node`, function () {
      const parentElement = document.createElement('div');
      const element = document.createElement('div');
      const labelNode = document.createElement('div');
      parentElement.appendChild(element);
      parentElement.appendChild(labelNode);

      const uploader = new FileUploader(element);
      expect(uploader.labelNode).to.equal(labelNode);
    });
  });

  describe('Update in file uploader', function () {
    let element;
    let labelNode;

    before(function () {
      const parentElement = document.createElement('div');
      element = document.createElement('div');
      labelNode = document.createElement('div');
      parentElement.appendChild(element);
      parentElement.appendChild(labelNode);

      new FileUploader(element);
    });

    it(`Should show the count of files if multiple files are selected`, function () {
      element.files = [{}, {}];
      element.dataset.multipleCaption = '{count} files are selected.';
      element.dispatchEvent(new CustomEvent('change'));
      expect(labelNode.textContent).to.equal('2 files are selected.');
    });

    it(`Should show nothing if data-multiple-caption attribute is not there, even if multiple files are selected`, function () {
      element.files = [{}, {}];
      element.dispatchEvent(new CustomEvent('change'));
      expect(labelNode.textContent).to.equal('');
    });

    it(`Should extract file name portion if just one file is selected`, function () {
      element.value = 'foo\\bar';
      element.files = [{}];
      element.dispatchEvent(new CustomEvent('change'));
      expect(labelNode.textContent).to.equal('bar');
    });

    it(`Should handle HTML tag in file name correctly`, function () {
      element.value = '<html>.html';
      element.files = [{}];
      element.dispatchEvent(new CustomEvent('change'));
      expect(labelNode.textContent).to.equal('<html>.html');
    });

    afterEach(function () {
      labelNode.textContent = '';
      element.dataset.multipleCaption = '';
      element.files = [];
    });
  });
});
