import EventManager from '../utils/event-manager';
import DataTableV2 from '../../src/components/data-table-v2/data-table-v2';
import HTML from '../../src/components/data-table-v2/data-table-v2.html';
import ExpandableHTML from '../../src/components/data-table-v2/data-table-v2-expandable.html';

describe('Dropdown', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new DataTableV2();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new DataTableV2(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Initial tasks', function() {
    let container;
    let element;
    let table;

    before(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-table-v2]');
      table = new DataTableV2(element);
    });

    it('Expandable rows should be removed from the DOM', function() {
      const rows = [...element.querySelectorAll('tbody > tr')];

      rows.forEach(row => {
        expect(row.classList.contains('[data-child-row]')).to.be.false;
      });
    });

    after(function() {
      document.body.removeChild(container);
      table.release();
    });
  });

  describe('Row Expansion', function() {
    const events = new EventManager();
    let element;
    let table;
    let container;

    before(function() {
      container = document.createElement('div');
      container.innerHTML = ExpandableHTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-table-v2]');
      table = new DataTableV2(element);
    });

    it('Should insert the row on click', function() {
      const firstRowExpand = document.querySelector('[data-event="expand"]');
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(document.querySelector('[data-child-row]')).to.not.be.null;
    });

    it('Should remove the row on second click', function() {
      const firstRowExpand = document.querySelector('[data-event="expand"]');
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(document.querySelector('[data-child-row]')).to.be.null;
    });

    it('Should emit an event on row expansion click', function() {
      const firstRowExpand = document.querySelector('[data-event="expand"]');
      const spyToggleRowExpandEvent = sinon.spy();
      events.on(element.ownerDocument.body, 'data-table-v2-aftertoggleexpand', spyToggleRowExpandEvent);
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyToggleRowExpandEvent).to.have.been.called;
    });

    it('The event should trigger the function', function() {
      const firstRowExpand = document.querySelector('[data-event="expand"]');
      const spyToggleRowExpand = sinon.spy(table, '_rowExpandToggle');
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyToggleRowExpand).to.have.been.called;
    });

    afterEach(function() {
      events.reset();
    });

    after(function() {
      document.body.removeChild(container);
      table.release();
    });
  });

  describe('Sort', function() {
    const events = new EventManager();
    let element;
    let table;
    let container;

    before(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-table-v2]');
      table = new DataTableV2(element);
    });

    it('Should toggle the class on click', function() {
      const firstSort = document.querySelector('[data-event="sort"');
      firstSort.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(firstSort.classList.contains('bx--table-sort-v2--ascending')).to.be.true;
    });

    it('Should emit an event on sort click', function() {
      const firstSort = document.querySelector('[data-event="sort"');
      const spyToggleSortEvent = sinon.spy();
      events.on(element.ownerDocument.body, 'data-table-v2-aftertogglesort', spyToggleSortEvent);
      firstSort.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyToggleSortEvent).to.have.been.called;
    });

    afterEach(function() {
      events.reset();
    });

    after(function() {
      document.body.removeChild(container);
      table.release();
    });
  });

  describe('Action bar', function() {
    const events = new EventManager();
    let element;
    let table;
    let container;

    before(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-table-v2]');
      table = new DataTableV2(element);
    });

    it('Should activate the action bar on checkbox select', function() {
      const firstSelect = document.querySelector('[data-event="select"]');
      firstSelect.click();

      const batchActions = document.querySelector('.bx--batch-actions');
      expect(batchActions.classList.contains('bx--batch-actions--active')).to.be.true;
    });

    // it('Should close the action bar on a cancel click', function() {});

    it('Should close the action bar on no checkboxes selected', function() {
      const firstSelect = document.querySelector('[data-event="select"]');
      firstSelect.click();

      const batchActions = document.querySelector('.bx--batch-actions');
      expect(batchActions.classList.contains('bx--batch-actions--active')).to.be.false;
    });

    // it('Should close the action bar on ESC key', function() {});

    it('Should select all checkboxes on select all event', function() {
      const firstSelect = document.querySelector('[data-event="select-all"]');
      firstSelect.click();

      const batchActions = document.querySelector('.bx--batch-actions');
      expect(batchActions.classList.contains('bx--batch-actions--active')).to.be.true;
    });

    afterEach(function() {
      events.reset();
    });

    after(function() {
      document.body.removeChild(container);
      table.release();
    });
  });
});
