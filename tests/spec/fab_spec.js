import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../consumables/js/polyfills/custom-event';
import { FabButton } from '../../consumables/js/es2015/index.js';

describe('Test floating action button', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new FabButton();
      }).to.throw;
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new FabButton(document.createTextNode(''));
      }).to.throw;
    });
  });

  describe('Toggling', function () {
    let fab;
    let element;

    before(function () {
      element = document.createElement('a');
      fab = new FabButton(element);
      document.body.appendChild(element);
    });

    it(`Should cancel the event for <a>`, function () {
      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
      expect(element.dispatchEvent(new CustomEvent('click', { cancelable: true }))).to.be.false;
    });

    it(`Should turn to open state from closed state`, function () {
      element.classList.add('is-closed');
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('is-closed')).to.be.false;
    });

    it(`Should turn to closed state from open state`, function () {
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('is-closed')).to.be.true;
    });

    afterEach(function () {
      element.classList.remove('is-closed');
    });

    after(function () {
      fab.release();
      document.body.removeChild(element);
    });
  });

  describe('Managing instances', function () {
    let element;

    before(function () {
      element = document.createElement('a');
    });

    it('Should prevent creating duplicate instances', function () {
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

    it('Should let create a new instance for an element if an earlier one has been released', function () {
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

  describe('Automatic creation', function () {
    let element;

    before(function () {
      element = document.createElement('a');
      element.dataset.fab = '';
      document.body.appendChild(element);
    });

    xit(`Should create an instance upon clicking`, function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.classList.contains('is-closed')).to.be.true;
    });

    xit(`Shouldn't create a new instance upon clicking if one has been there already`, function () {
      const stubComponentsSet = sinon.stub(FabButton.components, 'set');
      try {
        element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(element.classList.contains('is-closed')).to.be.false;
        expect(stubComponentsSet).not.have.been.called;
      } finally {
        stubComponentsSet.restore();
      }
    });

    after(function () {
      const fab = FabButton.components.get(element);
      if (fab) {
        fab.release();
      }
      document.body.removeChild(element);
    });
  });
});
