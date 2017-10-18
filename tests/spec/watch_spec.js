import { delay } from 'bluebird'; // For testing on browsers not supporting Promise
import { componentClasses, settings } from '../../src/index';
import mixin from '../../src/globals/js/misc/mixin';
import createComponent from '../../src/globals/js/mixins/create-component';
import initComponentBySearch from '../../src/globals/js/mixins/init-component-by-search';
import initComponentByEvent from '../../src/globals/js/mixins/init-component-by-event';
import initComponentByLauncher from '../../src/globals/js/mixins/init-component-by-launcher';
import watch from '../../src/globals/js/watch';

settings.disableAutoInit = true;

describe('Test watch mode', function() {
  const watchOptions = { foo: 'Foo' };
  const ClassInitedBySearch = class extends mixin(createComponent, initComponentBySearch) {
    release = spyReleaseComponentBySearch;
    static options = {
      selectorInit: '[data-my-component-inited-by-search]',
    };
    static components = new WeakMap();
  };

  const spyInitComponentBySearch = sinon.spy(ClassInitedBySearch, 'init');
  const spyReleaseComponentBySearch = sinon.spy(ClassInitedBySearch.prototype, 'release');

  const ClassInitedByEvent = class extends mixin(createComponent, initComponentByEvent) {
    release = spyReleaseComponentByEvent;
    static options = {
      selectorInit: '[data-my-component-inited-by-event]',
      initEventNames: ['instantiating-event'],
    };
    static components = new WeakMap();
  };

  const spyInitComponentByEvent = sinon.spy(ClassInitedByEvent, 'init');
  const spyReleaseComponentByEvent = sinon.spy(ClassInitedByEvent.prototype, 'release');

  const ClassInitedByLauncher = class extends mixin(createComponent, initComponentByLauncher) {
    release = spyReleaseComponentByLauncher;
    static options = {
      selectorInit: '[data-my-component-inited-by-launcher]',
      attribInitTarget: 'data-init-target',
      initEventNames: ['launching-event'],
    };
    static components = new WeakMap();
  };

  const spyInitComponentByLauncher = sinon.spy(ClassInitedByLauncher, 'init');
  const spyReleaseComponentByLauncher = sinon.spy(ClassInitedByLauncher.prototype, 'release');

  componentClasses.splice(0, componentClasses.length, ClassInitedBySearch, ClassInitedByEvent, ClassInitedByLauncher);

  describe('Handling regular components', function() {
    let lastTarget;
    let stubObserve;
    let handle;
    let element;

    before(function() {
      const origObserve = MutationObserver.prototype.observe;
      stubObserve = sinon.stub(MutationObserver.prototype, 'observe').callsFake(function stubObserveImpl(target, options) {
        lastTarget = target;
        origObserve.call(this, target, options);
      });
    });

    it('Should throw if given element is neither a DOM element or a document', function() {
      expect(() => {
        handle = watch(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should look at document if no element is given', function() {
      handle = watch();
      expect(lastTarget).to.equal(document);
    });

    it('Should instantiate the components', async function() {
      handle = watch(document, watchOptions);

      spyInitComponentBySearch.reset();

      expect(lastTarget, 'Watch target').to.equal(document);
      expect(spyInitComponentByEvent, 'Call count of ClassInitedByEvent.init()').to.have.been.calledOnce;
      expect(spyInitComponentByEvent, 'Args of ClassInitedByEvent.init()').to.have.been.calledWith(document, watchOptions);
      expect(spyInitComponentByLauncher, 'Call count of ClassInitedByLauncher.init()').to.have.been.calledOnce;
      expect(spyInitComponentByLauncher, 'Args of ClassInitedByLauncher.init()').to.have.been.calledWith(document, watchOptions);

      element = document.createElement('div');
      element.dataset.myComponentInitedBySearch = '';
      document.body.appendChild(element);

      await delay(0); // Wait for mutation observer to deliver records

      expect(spyInitComponentBySearch, 'Call count of ClassInitedBySearch.init()').to.have.been.calledOnce;
      expect(spyInitComponentBySearch.args[0][1], 'Option arg of ClassInitedBySearch.init()').to.deep.equal(watchOptions);
    });

    it('Should release the components', async function() {
      handle = watch();

      element = document.createElement('div');
      document.body.appendChild(element);

      const elementInitedBySearch = document.createElement('div');
      elementInitedBySearch.dataset.myComponentInitedBySearch = '';
      element.appendChild(elementInitedBySearch);

      const elementInitedByEvent = document.createElement('div');
      elementInitedByEvent.dataset.myComponentInitedByEvent = '';
      element.appendChild(elementInitedByEvent);

      elementInitedByEvent.dispatchEvent(
        new CustomEvent('instantiating-event', {
          bubbles: true,
          cancelable: true,
        })
      );

      const elementInitedByLauncher = document.createElement('div');
      elementInitedByLauncher.dataset.myComponentInitedByLauncher = '';
      element.appendChild(elementInitedByLauncher);

      const launcherButton = document.createElement('button');
      launcherButton.dataset.initTarget = '[data-my-component-inited-by-launcher]';
      element.appendChild(launcherButton);

      launcherButton.dispatchEvent(new CustomEvent('launching-event', { bubbles: true, cancelable: true }));

      await delay(0); // Wait for mutation observer to deliver records

      document.body.removeChild(element);

      await delay(0); // Wait for mutation observer to deliver records

      expect(spyReleaseComponentBySearch).to.have.been.calledOnce;
      expect(spyReleaseComponentByEvent).to.have.been.calledOnce;
      expect(spyReleaseComponentByLauncher).to.have.been.calledOnce;
    });

    it('Should release the components even if the removed node is of the component', async function() {
      handle = watch();

      element = document.createElement('div');
      element.dataset.myComponentInitedBySearch = '';
      document.body.appendChild(element);

      await delay(0); // Wait for mutation observer to deliver records

      document.body.removeChild(element);

      await delay(0); // Wait for mutation observer to deliver records

      expect(spyReleaseComponentBySearch).to.have.been.calledOnce;
    });

    it('Should stop instantiating components once the handle is released', async function() {
      handle = watch(document, watchOptions);

      spyInitComponentBySearch.reset();

      expect(lastTarget, 'Watch target').to.equal(document);
      expect(spyInitComponentByEvent, 'Call count of ClassInitedByEvent.init()').to.have.been.calledOnce;
      expect(spyInitComponentByEvent, 'Args of ClassInitedByEvent.init()').to.have.been.calledWith(document, watchOptions);
      expect(spyInitComponentByLauncher, 'Call count of ClassInitedByLauncher.init()').to.have.been.calledOnce;
      expect(spyInitComponentByLauncher, 'Args of ClassInitedByLauncher.init()').to.have.been.calledWith(document, watchOptions);

      element = document.createElement('div');
      element.dataset.myComponentInitedBySearch = '';
      document.body.appendChild(element);

      handle = handle.release();

      await delay(0); // Wait for mutation observer to deliver records

      expect(spyInitComponentBySearch, 'Call count of ClassInitedBySearch.init()').not.to.have.been.called;
    });

    afterEach(function() {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
        element = null;
      }
      if (handle) {
        handle = handle.release();
      }
    });

    after(function() {
      stubObserve.restore();
    });
  });

  describe('Handling checkbox', function() {
    let element;
    let handle;

    before(function() {
      handle = watch();
      element = document.createElement('input');
      element.type = 'checkbox';
      document.body.appendChild(element);
    });

    it('Should add checked attribute when it is checked', function() {
      element.removeAttribute('checked');
      element.checked = true;
      element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
      expect(element.hasAttribute('checked')).to.be.true;
    });

    after(function() {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
        element = null;
      }
      if (handle) {
        handle = handle.release();
      }
    });
  });

  afterEach(function() {
    spyReleaseComponentByLauncher.reset();
    spyReleaseComponentByEvent.reset();
    spyReleaseComponentBySearch.reset();
    spyInitComponentByLauncher.reset();
    spyInitComponentByEvent.reset();
    spyInitComponentBySearch.reset();
  });
});
