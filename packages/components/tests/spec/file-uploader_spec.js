import FileUploader from '../../src/components/file-uploader/file-uploader';
import HTML from '../../html/file-uploader/file-uploader.html';
import flattenOptions from '../utils/flatten-options';

describe('File Uploader', function() {
  describe('Constructor', function() {
    let instance;
    let element;
    let wrapper;

    beforeAll(function() {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-file]');
      instance = new FileUploader(element);
    });

    it('should throw if root element is not given', function() {
      expect(() => {
        new FileUploader();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('should throw if root element is not a DOM element', function() {
      expect(() => {
        new FileUploader(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('should throw if the <input type="file"> is not found', function() {
      expect(() => {
        const div = document.createElement('div');
        div.innerHTML = `<div data-file-container></div>`;
        new FileUploader(div);
      }).toThrowError(TypeError, 'Cannot find the file input box.');
    });

    it('should throw if the <div data-file-container> is not found', function() {
      expect(() => {
        const div = document.createElement('div');
        div.innerHTML = `<input type="file" class="bx--file-input">`;
        new FileUploader(div);
      }).toThrowError(TypeError, 'Cannot find the file names container.');
    });

    it('should set default options', function() {
      expect(flattenOptions(instance.options)).toEqual({
        selectorInit: '[data-file]',
        selectorInput: 'input[type="file"].bx--file-input',
        selectorContainer: '[data-file-container]',
        selectorCloseButton: '.bx--file-close',
        classLoading: 'bx--loading',
        classLoadingSvg: 'bx--loading__svg',
        classFileName: 'bx--file-filename',
        classFileClose: 'bx--file-close',
        classFileComplete: 'bx--file-complete',
        classSelectedFile: 'bx--file__selected-file',
        classStateContainer: 'bx--file__state-container',
        eventBeforeDeleteFilenameFileuploader:
          'fileuploader-before-delete-filename',
        eventAfterDeleteFilenameFileuploader:
          'fileuploader-after-delete-filename',
      });
    });

    it('should access container element', function() {
      const container = element.querySelector('[data-file-container]');
      expect(instance.container).toBe(container);
    });

    it('should access the input element', function() {
      const input = element.querySelector('input');
      expect(instance.input).toBe(input);
    });

    it('should access id for input', function() {
      const input = element.querySelector('input');
      expect(instance.inputId).toBe(input.id);
    });

    afterAll(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('HTML methods', function() {
    let instance;
    let element;
    let wrapper;

    beforeEach(function() {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-file]');
      instance = new FileUploader(element);
    });

    it('_filenamesHTML method should use name', function() {
      const filenamesHTML = instance._filenamesHTML('testName', 'testId');
      const div = document.createElement('div');
      div.innerHTML = filenamesHTML;
      document.body.appendChild(div);
      const nameElement = document.querySelector('.bx--file-filename');

      expect(nameElement.innerHTML).toBe('testName');

      document.body.removeChild(div);
    });

    it('_filenamesHTML method should use id param to for [data-for] attr', function() {
      const filenamesHTML = instance._filenamesHTML('testName', 'testId');
      const div = document.createElement('div');
      div.innerHTML = filenamesHTML;
      document.body.appendChild(div);
      const idElement = document.querySelector('.bx--file__state-container');

      expect(idElement.dataset.for).toBe('testId');

      document.body.removeChild(div);
    });

    it('_uploadHTML method should return expected HTML string', function() {
      const uploadHTML = instance._uploadHTML();
      const div = document.createElement('div');
      div.innerHTML = uploadHTML;
      document.body.appendChild(div);
      const uploadElement = document.querySelector('[data-loading]');

      expect(uploadElement.classList.contains('bx--loading')).toBe(true);

      document.body.removeChild(div);
    });

    it('_closeButtonHTML method should return expected HTML string', function() {
      const closeButtonHTML = instance._closeButtonHTML();
      const div = document.createElement('div');
      div.innerHTML = closeButtonHTML;
      document.body.appendChild(div);
      const closeButtonElement = document.querySelector(
        'button[aria-label="close"]'
      );

      expect(
        closeButtonElement
          .getAttribute('class')
          .trim()
          .split(/\s+/)
          .indexOf('bx--file-close') >= 0
      ).toBe(true);

      document.body.removeChild(div);
    });

    it('_checkmarkHTML method should return expected HTML string', function() {
      const checkmarkHTML = instance._checkmarkHTML();
      const div = document.createElement('div');
      div.innerHTML = checkmarkHTML;
      document.body.appendChild(div);
      const closeButtonElement = document.querySelector('[width="16"]');

      expect(
        closeButtonElement
          .getAttribute('class')
          .trim()
          .split(/\s+/)
          .indexOf('bx--file-complete') >= 0
      ).toBe(true);

      document.body.removeChild(div);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_removeState()', function() {
    let instance;
    let element;
    let wrapper;

    beforeEach(function() {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-file]');
      instance = new FileUploader(element);
    });

    it('should throw if element param is not given', function() {
      expect(() => {
        instance._removeState(document.createTextNode(''));
      }).toThrowError(Error);
    });

    it('should be called', function() {
      const parentEl = document.createElement('div');
      const childEl = document.createElement('span');
      parentEl.appendChild(childEl);
      spyOn(instance, '_removeState');
      instance._removeState(parentEl);
      expect(instance._removeState).toHaveBeenCalled();
    });

    it('should remove the firstChild of given element', function() {
      const parentEl = document.createElement('div');
      parentEl.classList.add('foo');
      const childEl = document.createElement('span');
      parentEl.appendChild(childEl);
      document.body.appendChild(parentEl);
      instance._removeState(parentEl);
      expect(document.querySelector('.foo').firstChild).toBe(null);
      document.body.removeChild(parentEl);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_getStateContainers', function() {
    let instance;
    let element;
    let wrapper;

    beforeEach(function() {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-file]');
      instance = new FileUploader(element);
    });

    it('should throw if stateContainers are empty', function() {
      expect(() => {
        instance._getStateContainers();
      }).toThrowError(Error);
    });

    it('should throw if id for input[type="file"] does not equal [data-for] attribute on state container', function() {
      const filenameElement = instance._filenamesHTML('name', 'unmatching-id');
      instance.container.insertAdjacentHTML('beforeend', filenameElement);
      expect(() => {
        instance._getStateContainers();
      }).toThrowError(Error);
    });

    it('should be called', function() {
      const filenameElement = instance._filenamesHTML('name', instance.inputId);
      instance.container.insertAdjacentHTML('beforeend', filenameElement);
      spyOn(instance, '_getStateContainers');
      instance._getStateContainers();
      expect(instance._getStateContainers).toHaveBeenCalled();
    });

    it('should return an array', function() {
      const filenameElement = instance._filenamesHTML('name', instance.inputId);
      instance.container.insertAdjacentHTML('beforeend', filenameElement);
      const array = instance._getStateContainers();
      expect(Array.isArray(array)).toBe(true);
    });

    it('should have a length', function() {
      const filenameElement = instance._filenamesHTML('name', instance.inputId);
      instance.container.insertAdjacentHTML('beforeend', filenameElement);
      const array = instance._getStateContainers();
      expect(array.length).toBe(1);
    });

    it('should have an empty stateContainer', function() {
      const filenameElement = instance._filenamesHTML('name', instance.inputId);
      instance.container.insertAdjacentHTML('beforeend', filenameElement);
      const stateContainer = document.querySelector(
        '.bx--file__state-container'
      );
      expect(stateContainer.innerHTML).toBe('');
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('Displaying filenames with _displayFilenames', function() {
    let instance;
    let element;
    let wrapper;

    beforeAll(function() {
      wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-file]');
      instance = new FileUploader(element);
    });

    it('should be called on input change event', function() {
      spyOn(instance, '_displayFilenames');
      instance.input.dispatchEvent(
        new CustomEvent('change', { bubbles: true })
      );

      expect(instance._displayFilenames).toHaveBeenCalled();
    });

    afterAll(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('_handleStateChange', function() {
    let instance;
    let element;
    let wrapper;

    beforeEach(function() {
      wrapper = document.createElement('div');

      wrapper.innerHTML = HTML;
      document.body.appendChild(wrapper);
      element = document.querySelector('[data-file]');
      instance = new FileUploader(element);
    });

    it('should be called', function() {
      const testHTML =
        '<ul><li class="test">...</li><li class="test">...</li></ul>';
      const div = document.createElement('div');
      div.id = 'bob';
      div.innerHTML = testHTML;
      document.body.appendChild(div);
      spyOn(instance, '_handleStateChange');
      instance._handleStateChange(
        [...document.querySelectorAll('.test')],
        1,
        div
      );
      expect(instance._handleStateChange).toHaveBeenCalled();
      document.body.removeChild(div);
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
