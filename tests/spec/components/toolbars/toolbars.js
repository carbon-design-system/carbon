import '../../../../global/js/custom-event';

import '../../../utils/es6-weak-map-global'; // For PhantomJS

import Toolbars from '../../../../components/toolbars/toolbars';

describe('Test toolbars', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new Toolbars(); // eslint-disable-line no-new
      }).to.throw;
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new Toolbars(document.createTextNode('')); // eslint-disable-line no-new
      }).to.throw;
    });
  });

  describe('Toggling', function () {
    let element;
    let searchFieldNode;
    let toolbars;

    before(function () {
      const id = `__element_${Math.random().toString(36).substr(2)}`;

      searchFieldNode = document.createElement('div');
      searchFieldNode.id = id;

      element = document.createElement('a');
      element.setAttribute('data-list-icons-search-action-target', `#${id}`);
      element.appendChild(searchFieldNode);

      toolbars = new Toolbars(element);
      document.body.appendChild(element);
    });

    beforeEach(function () {
      toolbars.searchFieldNode = searchFieldNode;
    });

    it(`Shouldn't cause error even without searchFieldNode`, function () {
      toolbars.searchFieldNode = null;
      expect(() => {
        element.dispatchEvent(new CustomEvent('click'));
      }).not.to.throw;
    });

    it(`Should cancel the event for <a>`, function () {
      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
      expect(element.dispatchEvent(new CustomEvent('click', { cancelable: true }))).to.be.false;
    });

    it(`Should clear search field upon toggling`, function () {
      element.dispatchEvent(new CustomEvent('click'));
      expect(searchFieldNode.value).to.equal('');
    });

    it(`Should turn to open state from closed state`, function () {
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('show-search')).to.be.true;
      expect(searchFieldNode.classList.contains('show-search')).to.be.true;
    });

    it(`Should turn to closed state from open state`, function () {
      element.classList.add('show-search');
      searchFieldNode.classList.add('show-search');
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('show-search')).to.be.false;
      expect(searchFieldNode.classList.contains('show-search')).to.be.false;
    });

    afterEach(function () {
      searchFieldNode.classList.remove('show-search');
      element.classList.remove('show-search');
    });

    after(function () {
      toolbars.release();
      document.body.removeChild(element);
    });
  });

  describe('Managing instances', function () {
    let fab;
    let element;

    before(function () {
      element = document.createElement('a');
    });

    it('Should prevent creating duplicate instances', function () {
      let first;
      let second;
      try {
        first = Toolbars.create(element);
        second = Toolbars.create(element);
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
        first = Toolbars.create(element);
        first.release();
        second = Toolbars.create(element);
        expect(first).not.to.equal(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });

    after(function () {
      fab && fab.release();
    });
  });
});
