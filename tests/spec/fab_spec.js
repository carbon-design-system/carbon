import FabButton from '../../src/components/fab/fab';

describe('Test floating action button', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new FabButton();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new FabButton(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });
  });

  describe('Toggling', function() {
    let fab;
    let element;

    beforeAll(function() {
      element = document.createElement('a');
      fab = new FabButton(element);
      document.body.appendChild(element);
    });

    it('Should cancel the event for <a>', function() {
      // eslint-disable-next-line max-len
      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
      expect(element.dispatchEvent(new CustomEvent('click', { cancelable: true }))).toBe(false);
    });

    it('Should turn to open state from closed state', function() {
      element.dataset.state = 'open';
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.dataset.state).toBe('closed');
    });

    it('Should turn to closed state from open state', function() {
      element.dataset.state = 'closed';
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.dataset.state).toBe('open');
    });

    afterEach(function() {
      element.dataset.state = 'open';
    });

    afterAll(function() {
      fab.release();
      document.body.removeChild(element);
    });
  });

  describe('Managing instances', function() {
    let element;

    beforeAll(function() {
      element = document.createElement('a');
    });

    it('Should prevent creating duplicate instances', function() {
      let first;
      let second;
      try {
        first = FabButton.create(element);
        second = FabButton.create(element);
        expect(first).toBe(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });

    it('Should let create a new instance for an element if an earlier one has been released', function() {
      let first;
      let second;
      try {
        first = FabButton.create(element);
        first.release();
        second = FabButton.create(element);
        expect(first).not.toBe(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });
  });

  describe('Automatic creation', function() {
    let element;
    let initContext;

    beforeAll(function() {
      initContext = FabButton.init();
      element = document.createElement('a');
      element.dataset.fab = '';
      element.dataset.state = 'open';
      document.body.appendChild(element);
    });

    it('Should create an instance upon clicking', function() {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.dataset.state).toBe('closed');
    });

    it('Should not create a new instance upon clicking if one has been there already', function() {
      spyOn(FabButton.components, 'set').and.callThrough();
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.dataset.state).toBe('closed');
      expect(FabButton.components.set).not.toHaveBeenCalled();
    });

    it('Should provide a way to remove event listener', function() {
      const container = document.createElement('div');
      const elementInContainer = document.createElement('a');

      if (initContext) {
        initContext.release();
        initContext = null;
      }

      elementInContainer.dataset.fab = '';
      elementInContainer.dataset.state = 'open';
      container.appendChild(elementInContainer);
      document.body.appendChild(container);
      try {
        FabButton.init(container).release();
        elementInContainer.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(elementInContainer.dataset.state).not.toBe('closed');
      } finally {
        document.body.removeChild(container);
      }
    });

    afterEach(function() {
      element.dataset.state = 'open';
    });

    afterAll(function() {
      const fab = FabButton.components.get(element);
      if (fab) {
        fab.release();
      }
      document.body.removeChild(element);
      if (initContext) {
        initContext.release();
      }
    });
  });
});
