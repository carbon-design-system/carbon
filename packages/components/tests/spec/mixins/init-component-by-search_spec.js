import mixin from '../../../src/globals/js/misc/mixin';
import initComponentBySearch from '../../../src/globals/js/mixins/init-component-by-search';

describe('Test init component by search', function () {
  let container;
  const spyCreate = jasmine.createSpy();
  const options = { foo: 'Foo' };
  const Class = class extends mixin(initComponentBySearch) {
    static options = {
      selectorInit: '[data-my-component]',
    };

    static create = spyCreate;

    static components = new WeakMap();
  };

  it('Should throw if given element is null', function () {
    expect(() => {
      Class.init(null);
    }).toThrowError(
      TypeError,
      'DOM document or DOM element should be given to search for and initialize this widget.'
    );
  });

  it('Should throw if given element is neither a DOM element or a document', function () {
    expect(() => {
      Class.init(document.createTextNode(''));
    }).toThrowError(
      TypeError,
      'DOM document or DOM element should be given to search for and initialize this widget.'
    );
  });

  it('Should search from document if root element is not given', function () {
    container = document.createElement('div');
    container.dataset.myComponent = '';
    document.body.appendChild(container);
    Class.init();
    expect(spyCreate.calls.allArgs()).toEqual([[container, {}]]);
  });

  it('Should search from document if document node is given', function () {
    container = document.createElement('div');
    container.dataset.myComponent = '';
    document.body.appendChild(container);
    Class.init(container.ownerDocument, options);
    expect(spyCreate.calls.allArgs()).toEqual([[container, options]]);
  });

  it('Should create an instance if the given element is of the widget', function () {
    container = document.createElement('div');
    container.dataset.myComponent = '';
    Class.init(container, options);
    expect(spyCreate.calls.allArgs()).toEqual([[container, options]]);
  });

  afterEach(function () {
    spyCreate.calls.reset();
    if (container) {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      container = null;
    }
  });
});
