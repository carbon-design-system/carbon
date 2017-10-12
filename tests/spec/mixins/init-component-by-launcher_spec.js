import mixin from '../../../src/globals/js/misc/mixin';
import initComponentByLauncher from '../../../src/globals/js/mixins/init-component-by-launcher';
import EventManager from '../../utils/event-manager';

describe('Test init component by launcher', function() {
  let container;
  let launcherButton;
  let context;
  const events = new EventManager();
  const spyCreate = sinon.spy();
  const spyCreatedByLauncher = sinon.spy();
  const initOptions = { foo: 'Foo' };
  const Class = class extends mixin(initComponentByLauncher) {
    static options = {
      selectorInit: '[data-my-component]',
      initEventNames: ['foo'],
      attribInitTarget: 'data-init-target',
    };
    static create(element, options) {
      spyCreate(element, options);
      return new this(element, options);
    }
    createdByLauncher = spyCreatedByLauncher;
  };

  it('Should throw if given element is neither a DOM element or a document', function() {
    expect(() => {
      Class.init(document.createTextNode(''));
    }).to.throw(Error);
  });

  it('Should do nothing if there is no target modals for a button upon button click', function() {
    launcherButton = document.createElement('a');
    document.body.appendChild(launcherButton);
    expect(launcherButton.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }))).to.be.true;
  });

  it('Should create an instance if the given element is of the widget', function() {
    container = document.createElement('div');
    container.dataset.myComponent = '';
    context = Class.init(container, initOptions);
    expect(spyCreate, 'Call count of create()').to.be.calledOnce;
    expect(spyCreate.firstCall.args, 'Arguments of create()').to.deep.equal([container, initOptions]);
  });

  it('Should throw if launcher targets to multiple components', function() {
    const origOnError = window.onError;
    window.onerror = null; // Mocha sets its own global `onerror` handler that causes test to fail
    try {
      const spyGlobalError = sinon.spy();
      events.on(window, 'error', spyGlobalError);
      container = document.createElement('div');
      [...new Array(2)].forEach(() => {
        const element = document.createElement('div');
        element.dataset.myComponent = '';
        container.appendChild(element);
      });
      document.body.appendChild(container);
      launcherButton = document.createElement('button');
      launcherButton.dataset.initTarget = '[data-my-component]';
      document.body.appendChild(launcherButton);
      context = Class.init();
      launcherButton.dispatchEvent(new CustomEvent('foo', { bubbles: true }));
      expect(spyGlobalError).to.have.been.calledOnce;
    } finally {
      window.onerror = origOnError;
    }
  });

  it('Should launch the component', function() {
    container = document.createElement('div');
    container.dataset.myComponent = '';
    document.body.appendChild(container);
    launcherButton = document.createElement('button');
    launcherButton.dataset.initTarget = '[data-my-component]';
    document.body.appendChild(launcherButton);
    context = Class.init();
    expect(spyCreate, 'Call count of create() before hitting launcher button').not.have.been.called;
    launcherButton.dispatchEvent(new CustomEvent('foo', { bubbles: true }));
    expect(spyCreate, 'Call count of create() after hitting launcher button').to.be.calledOnce;
    expect(spyCreate.firstCall.args, 'Arguments of create()').to.deep.equal([container, {}]);
    expect(spyCreatedByLauncher, 'Call count of createdByLauncher()').to.have.been.calledOnce;
  });

  it('Should cancel the event if launcher button is <a>', function() {
    container = document.createElement('div');
    container.dataset.myComponent = '';
    document.body.appendChild(container);
    launcherButton = document.createElement('a');
    launcherButton.dataset.initTarget = '[data-my-component]';
    document.body.appendChild(launcherButton);
    context = Class.init();
    expect(launcherButton.dispatchEvent(new CustomEvent('foo', { bubbles: true, cancelable: true }))).to.be.false;
  });

  afterEach(function() {
    spyCreatedByLauncher.reset();
    spyCreate.reset();
    events.reset();
    if (context) {
      context.release();
      context = null;
    }
    if (launcherButton) {
      if (launcherButton.parentNode) {
        launcherButton.parentNode.removeChild(launcherButton);
      }
      launcherButton = null;
    }
    if (container) {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      container = null;
    }
  });
});
