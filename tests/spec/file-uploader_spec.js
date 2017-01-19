import '../../demo/polyfills/custom-event';
import '../utils/es6-weak-map-global'; // For PhantomJS
import FileUploader from '../../src/components/file-uploader/file-uploader';

const HTML = `
<div class="bx--file-uploader">
  <label
    for="files1"
    class="bx--file-uploader__label"
    tabindex="0">Add other files</label>
  <input
    type="file"
    class="bx--file-uploader__input"
    id="files1"
    data-file-uploader
    data-target="[data-file-container]"
    multiple
  />
  <div data-file-container class="bx--file-uploader__container"></div>
</div>

<div class="bx--file-uploader">
  <label
    for="files2"
    class="bx--file-uploader__label"
    tabindex="0">Add other files</label>
  <input
    type="file"
    class="bx--file-uploader__input"
    id="files2"
    data-file-uploader
    data-target="#bob"
    multiple
  />
  <div id="bob" class="bx--file-uploader__container"></div>
</div>
`;

describe('File Uploader', function () {
  describe('Constructor', function () {
    it('should throw if root element is not given', function () {
      expect(() => {
        new FileUploader();
      }).to.throw(Error);
    });

    it('should throw if root element is not a DOM element', function () {
      expect(() => {
        new FileUploader(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('should set default options', function () {
      const fileUploader = new FileUploader(document.createElement('div'));
      expect(fileUploader.options).to.deep.equal({
        selectorInit: '[data-file-uploader]',
        selectorContainer: '[data-file-container]',
      });
    });

    it('should search for an element with options.selectorInit', function () {
      const element = document.createElement('div');
      element.dataset.id = 'foo';
      const fileUploader = new FileUploader(element, { selectorInit: '[data-id="foo"]' });
      expect(fileUploader.options.selectorInit).to.equal('[data-id="foo"]');
    });

    it('should have matching id and uniqueStateContainerID values', function () {
      const element = document.createElement('div');
      element.id = 'uniqueID';
      const fileUploader = new FileUploader(element);
      expect(fileUploader.uniqueStateContainerID).to.equal(element.id);
    });

    it('should have empty default state', function () {
      const element = document.createElement('div');
      const fileUploader = new FileUploader(element);
      expect(fileUploader.state).to.equal('');
    });
  });

  describe('HTML state - initial', function () {
    let instance;
    let element;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    before(function () {
      document.body.appendChild(wrapper);
      element = document.querySelector('#files1[data-file-uploader]');
      instance = new FileUploader(element);
    });

    it('should call #injectInitialStateHTML() on change event', function () {
      const spyStateChange = sinon.spy(instance, 'injectInitialStateHTML');
      element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
      expect(spyStateChange).to.have.been.called;
    });

    it('should set this.state to "default"', function () {
      element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
      expect(instance.state).to.equal('default');
    });

    after(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('Injecting HTML state', function () {
    let instance;
    let element;
    let containerElement;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    before(function () {
      document.body.appendChild(wrapper);
      element = document.querySelector('#files1');
      instance = new FileUploader(element);
      containerElement = document.querySelector('.bx--file-uploader__container');
    });

    it('should set dataset.state to "upload"', function () {
      instance.injectStateHTML('upload', containerElement, '<div></div>');
      expect(element.dataset.state).to.equal('upload');
    });

    it('should set dataset.state to "edit"', function () {
      instance.injectStateHTML('edit', containerElement, '<div></div>');
      expect(element.dataset.state).to.equal('edit');
    });

    it('should insert given HTML to given target', function () {
      containerElement.innerHTML = '';
      instance.injectStateHTML('edit', containerElement, '<div></div>');
      expect(containerElement.innerHTML).to.equal('<div></div>');
    });

    after(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('HTML state - edit', function () {
    let instance;
    let element;
    let containerElement;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    before(function () {
      document.body.appendChild(wrapper);
      element = document.querySelector('#files1[data-file-uploader]');
      instance = new FileUploader(element);
      instance.state = 'default';
      containerElement = document.querySelector(instance.options.selectorContainer);
      containerElement.innerHTML = `
      <span class="bx--file-uploader__selected-file">
        <p class="bx--file-uploader__filename">testName</p>
        <span 
          data-for="${instance.uniqueStateContainerID}" 
          class="bx--file-uploader__state-container"
        ></span>
      </span>`;
    });


    it('should return object with all given params', function () {
      const foo = instance.setStateHTML('edit');
      expect(foo).to.deep.equal({
        state: 'edit',
        selector: `[data-for=${instance.uniqueStateContainerID}]`,
        stateContainers: [... element.ownerDocument.querySelectorAll(`[data-for=${instance.uniqueStateContainerID}]`)],
      });
    });

    it('should throw if .bx--file-uploader__container is empty', function () {
      containerElement.innerHTML = '';
      expect(() => {
        instance.setStateHTML('edit');
      }).to.throw(Error);
    });

    it('#setStateHTML("edit") should be called', function () {
      const stub = sinon.stub(instance, 'setStateHTML');
      stub('edit');
      expect(stub).to.have.been.called;
    });

    after(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });

  describe('HTML state - upload', function () {
    let instance;
    let element;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;

    before(function () {
      document.body.appendChild(wrapper);
      element = document.querySelector('#files1[data-file-uploader]');
      instance = new FileUploader(element);
      instance.injectInitialStateHTML();
    });

    it('should throw if .bx--file-uploader__container is empty', function () {
      expect(() => {
        instance.setStateHTML('upload');
      }).to.throw(Error);
    });

    it('#setStateHTML("upload") should be called', function () {
      const stub = sinon.stub(instance, 'setStateHTML');
      stub('upload');
      expect(stub).to.have.been.called;
    });

    after(function () {
      instance.release();
      document.body.removeChild(wrapper);
    });
  });
});
