import mixin from '../../../src/globals/js/misc/mixin';
import initComponentByLauncher from '../../../src/globals/js/mixins/init-component-by-launcher';
import EventManager from '../../utils/event-manager';

describe('Test init component by launcher', function() {
  let container;
  let launcherButton;
  let context;
  const events = new EventManager();
  const spyCreate = jasmine.createSpy();
  const spyCreatedByLauncher = jasmine.createSpy();
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

  it('Should throw if given element is null', function() {
    expect(() => {
      Class.init(null);
    }).toThrowError(
      TypeError,
      'DOM document or DOM element should be given to search for and initialize this widget.'
    );
  });

  it('Should throw if given element is neither a DOM element or a document', function() {
    expect(() => {
      Class.init(document.createTextNode(''));
    }).toThrowError(
      TypeError,
      'DOM document or DOM element should be given to search for and initialize this widget.'
    );
  });

  it('Should do nothing if there is no target modals for a button upon button click', function() {
    launcherButton = document.createElement('a');
    document.body.appendChild(launcherButton);
    expect(
      launcherButton.dispatchEvent(
        new CustomEvent('click', { bubbles: true, cancelable: true })
      )
    ).toBe(true);
  });

  it('Should create an instance if the given element is of the widget', function() {
    container = document.createElement('div');
    container.dataset.myComponent = '';
    context = Class.init(container, initOptions);
    expect(spyCreate.calls.allArgs()).toEqual([[container, initOptions]]);
  });

  it('Should throw if launcher targets to multiple components', function() {
    const origOnError = window.onError;
    window.onerror = null; // Mocha sets its own global `onerror` handler that causes test to fail
    try {
      const spyGlobalError = jasmine.createSpy();
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
      expect(spyGlobalError).toHaveBeenCalledTimes(1);
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
    expect(
      spyCreate,
      'Call count of create() before hitting launcher button'
    ).not.toHaveBeenCalled();
    launcherButton.dispatchEvent(new CustomEvent('foo', { bubbles: true }));
    expect(spyCreate.calls.allArgs(), 'create()').toEqual([[container, {}]]);
    expect(
      spyCreatedByLauncher,
      'Call count of createdByLauncher()'
    ).toHaveBeenCalledTimes(1);
  });

  it('Should cancel the event if launcher button is <a>', function() {
    container = document.createElement('div');
    container.dataset.myComponent = '';
    document.body.appendChild(container);
    launcherButton = document.createElement('a');
    launcherButton.dataset.initTarget = '[data-my-component]';
    document.body.appendChild(launcherButton);
    context = Class.init();
    expect(
      launcherButton.dispatchEvent(
        new CustomEvent('foo', { bubbles: true, cancelable: true })
      )
    ).toBe(false);
  });

  afterEach(function() {
    spyCreatedByLauncher.calls.reset();
    spyCreate.calls.reset();
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
