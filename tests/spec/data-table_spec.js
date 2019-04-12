import EventManager from '../utils/event-manager';
import flattenOptions from '../utils/flatten-options';
import DataTable from '../../src/components/data-table/data-table';
import HTML from '../../html/data-table/data-table.html';
import ExpandableHTML from '../../html/data-table/data-table--expandable.html';
import { componentsX } from '../../src/globals/js/feature-flags';

const suffix = componentsX ? '' : '-v2';

describe('DataTable', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new DataTable();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new DataTable(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should set default options', function() {
      const table = new DataTable(document.createElement('div'));
      expect(flattenOptions(table.options)).toEqual({
        selectorInit: `[data-table${suffix}]`,
        selectorToolbar: '.bx--table--toolbar',
        selectorActions: '.bx--batch-actions',
        selectorCount: '[data-items-selected]',
        selectorActionCancel: '.bx--batch-summary__cancel',
        selectorCheckbox: '.bx--checkbox',
        selectorExpandCells: `td.bx--table-expand${suffix}`,
        selectorExpandableRows: `.bx--expandable-row${suffix}`,
        selectorParentRows: `.bx--parent-row${suffix}`,
        selectorChildRow: '[data-child-row]',
        selectorTableBody: 'tbody',
        selectorTableSort: `.bx--table-sort${suffix}`,
        selectorTableSelected: `.bx--data-table${suffix}--selected`,
        selectorToolbarSearchContainer: '.bx--toolbar-search-container-expandable',
        selectorSearchMagnifier: '.bx--search-magnifier',
        selectorSearchInput: '.bx--search-input',
        classExpandableRow: `bx--expandable-row${suffix}`,
        classExpandableRowHidden: `bx--expandable-row--hidden${suffix}`,
        classExpandableRowHover: `bx--expandable-row--hover${suffix}`,
        classTableSortAscending: `bx--table-sort${suffix}--ascending`,
        classTableSortActive: `bx--table-sort${suffix}--active`,
        classToolbarSearchActive: 'bx--toolbar-search-container-active',
        classActionBarActive: 'bx--batch-actions--active',
        classTableSelected: `bx--data-table${suffix}--selected`,
        eventBeforeExpand: `data-table${suffix}-beforetoggleexpand`,
        eventAfterExpand: `data-table${suffix}-aftertoggleexpand`,
        eventBeforeSort: `data-table${suffix}-beforetogglesort`,
        eventAfterSort: `data-table${suffix}-aftertogglesort`,
        eventTrigger: '[data-event]',
        eventParentContainer: '[data-parent-row]',
      });
    });
  });

  describe('Initial tasks', function() {
    let container;
    let element;
    let table;

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector(`[data-table${suffix}]`);
      table = new DataTable(element);
    });

    it('Expandable rows should be removed from the DOM', function() {
      const rows = [...element.querySelectorAll('tbody > tr')];

      rows.forEach(row => {
        expect(row.classList.contains('[data-child-row]')).toBe(false);
      });
    });

    afterAll(function() {
      document.body.removeChild(container);
      table.release();
    });
  });

  describe('Row Expansion', function() {
    const events = new EventManager();
    let element;
    let table;
    let container;

    beforeEach(function() {
      container = document.createElement('div');
      container.innerHTML = ExpandableHTML;
      document.body.appendChild(container);
      element = document.querySelector(`[data-table${suffix}]`);
      table = new DataTable(element);
    });

    it('Should toggle the row on click', function() {
      const firstRowExpand = document.querySelector('[data-event="expand"]');
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      if (!componentsX) {
        expect(document.querySelector('[data-child-row]')).toBeTruthy();
      } else {
        expect(
          document.querySelector('[data-child-row]').previousElementSibling.classList.contains(`bx--expandable-row${suffix}`)
        ).toBe(true);
      }
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      if (!componentsX) {
        expect(document.querySelector('[data-child-row]')).toBeFalsy();
      } else {
        expect(
          document.querySelector('[data-child-row]').previousElementSibling.classList.contains(`bx--expandable-row${suffix}`)
        ).toBe(false);
      }
    });

    it('Should emit an event on row expansion click', function() {
      const firstRowExpand = document.querySelector('[data-event="expand"]');
      const spyToggleRowExpandEvent = jasmine.createSpy();
      events.on(element.ownerDocument.body, `data-table${suffix}-aftertoggleexpand`, spyToggleRowExpandEvent);
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyToggleRowExpandEvent).toHaveBeenCalled();
    });

    it('The event should trigger the function', function() {
      const firstRowExpand = document.querySelector('[data-event="expand"]');
      spyOn(table, '_rowExpandToggle');
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(table._rowExpandToggle).toHaveBeenCalled();
    });

    afterEach(function() {
      events.reset();
      table.release();
      document.body.removeChild(container);
    });
  });

  describe('Sort', function() {
    const events = new EventManager();
    let element;
    let table;
    let container;
    let firstSort;

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector(`[data-table${suffix}]`);
      firstSort = element.querySelector('[data-event="sort"]');
      table = new DataTable(element);
    });

    it('Should switch through tri-state sort', function() {
      firstSort.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(firstSort.classList.contains(`bx--table-sort${suffix}--ascending`)).toBe(true);
      expect(firstSort.getAttribute('data-previous-value') === 'ascending').toBe(true);

      firstSort.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(firstSort.classList.contains(`bx--table-sort${suffix}--ascending`)).toBe(false);
      expect(firstSort.getAttribute('data-previous-value') === 'descending').toBe(true);

      firstSort.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(firstSort.classList.contains(`bx--table-sort${suffix}--ascending`)).toBe(false);
      expect(firstSort.hasAttribute('data-previous-value')).toBe(false);
    });

    it('Should emit an event on sort click', function() {
      const spyToggleSortEvent = jasmine.createSpy();
      events.on(element.ownerDocument.body, `data-table${suffix}-aftertogglesort`, spyToggleSortEvent);
      firstSort.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyToggleSortEvent).toHaveBeenCalled();
    });

    afterEach(function() {
      firstSort.classList.remove(`bx--table-sort${suffix}--ascending`);
      firstSort.dataset.previousValue = '';
      events.reset();
    });

    afterAll(function() {
      document.body.removeChild(container);
      table.release();
    });
  });

  describe('Action bar', function() {
    const events = new EventManager();
    let element;
    let table;
    let container;

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector(`[data-table${suffix}]`);
      table = new DataTable(element);
    });

    it('Should toggle the action bar on checkbox select', function() {
      const firstSelect = document.querySelector('[data-event="select"]');
      firstSelect.click();

      const batchActions = element.querySelector('.bx--batch-actions');
      expect(batchActions.classList.contains('bx--batch-actions--active')).toBe(true);

      firstSelect.click();

      expect(batchActions.classList.contains('bx--batch-actions--active')).toBe(false);
    });

    // it('Should close the action bar on a cancel click', function() {});

    // it('Should close the action bar on ESC key', function() {});

    it('Should select all checkboxes on select all event', function() {
      const firstSelect = document.querySelector('[data-event="select-all"]');
      firstSelect.click();

      const batchActions = element.querySelector('.bx--batch-actions');
      expect(batchActions.classList.contains('bx--batch-actions--active')).toBe(true);
    });

    afterEach(function() {
      table._actionBarCancel();
      events.reset();
    });

    afterAll(function() {
      document.body.removeChild(container);
      table.release();
    });
  });

  describe('Toggle active search bar', function() {
    let table;
    let container;
    let dt;

    beforeEach(function() {
      /* istanbul ignore if */
      if (componentsX) {
        container = document.createElement('div');
        container.innerHTML = HTML;
        document.body.appendChild(container);
        dt = document.querySelector('.bx--data-table');
        table = new DataTable(container);
      }
    });

    it('Should open search bar on click', function() {
      /* istanbul ignore if */
      if (componentsX) {
        const search = document.querySelector('.bx--toolbar-search-container-expandable');
        const magnifier = document.querySelector('.bx--search-magnifier');
        magnifier.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(search.classList.contains('bx--toolbar-search-container-active')).toBe(true);
      }
    });

    it('Should close search bar on click', function() {
      /* istanbul ignore if */
      if (componentsX) {
        const search = document.querySelector('.bx--toolbar-search-container-expandable');
        search.classList.add('bx--toolbar-search-container-active');
        dt.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(search.classList.contains('bx--toolbar-search-container-active')).toBe(false);
      }
    });

    it('Should open search bar on keydown', function() {
      /* istanbul ignore if */
      if (componentsX) {
        const search = document.querySelector('.bx--toolbar-search-container-expandable');
        const magnifier = document.querySelector('.bx--search-magnifier');
        const event = new CustomEvent('keydown', { bubbles: true });
        event.which = 13;
        magnifier.dispatchEvent(event);
        expect(search.classList.contains('bx--toolbar-search-container-active')).toBe(true);
      }
    });

    it('Should close search bar on keydown', function() {
      /* istanbul ignore if */
      if (componentsX) {
        const search = document.querySelector('.bx--toolbar-search-container-expandable');
        const input = document.querySelector('input');
        search.classList.add('bx--toolbar-search-container-active');
        const event = new CustomEvent('keydown', { bubbles: true });
        event.which = 27;
        input.dispatchEvent(event);
        expect(search.classList.contains('bx--toolbar-search-container-active')).toBe(false);
      }
    });

    afterEach(function() {
      /* istanbul ignore if */
      if (componentsX) {
        document.body.removeChild(container);
        table.release();
      }
    });
  });
});
