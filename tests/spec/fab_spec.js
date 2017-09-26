import FabButton from '../../src/components/fab/fab';

describe('Test floating action button', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new FabButton();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new FabButton(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Toggling', function() {
    let fab;
    let element;

    before(function() {
      element = document.createElement('a');
      fab = new FabButton(element);
      document.body.appendChild(element);
    });

    it('Should cancel the event for <a>', function() {
      // eslint-disable-next-line max-len
      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
      expect(element.dispatchEvent(new CustomEvent('click', { cancelable: true }))).to.be.false;
    });

    it('Should turn to open state from closed state', function() {
      element.dataset.state = 'open';
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.dataset.state).to.equal('closed');
    });

    it('Should turn to closed state from open state', function() {
      element.dataset.state = 'closed';
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.dataset.state).to.equal('open');
    });

    afterEach(function() {
      element.dataset.state = 'open';
    });

    after(function() {
      fab.release();
      document.body.removeChild(element);
    });
  });

  describe('Managing instances', function() {
    let element;

    before(function() {
      element = document.createElement('a');
    });

    it('Should prevent creating duplicate instances', function() {
      let first;
      let second;
      try {
        first = FabButton.create(element);
        second = FabButton.create(element);
        expect(first).to.equal(second);
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
        expect(first).not.to.equal(second);
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

    before(function() {
      initContext = FabButton.init();
      element = document.createElement('a');
      element.dataset.fab = '';
      element.dataset.state = 'open';
      document.body.appendChild(element);
    });

    it('Should create an instance upon clicking', function() {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.dataset.state).to.equal('closed');
    });

    it('Should not create a new instance upon clicking if one has been there already', function() {
      const stubComponentsSet = sinon.stub(FabButton.components, 'set');
      try {
        element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(element.dataset.state).to.equal('closed');
        expect(stubComponentsSet).not.have.been.called;
      } finally {
        stubComponentsSet.restore();
      }
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
        expect(elementInContainer.dataset.state).not.to.equal('closed');
      } finally {
        document.body.removeChild(container);
      }
    });

    afterEach(function() {
      element.dataset.state = 'open';
    });

    after(function() {
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
