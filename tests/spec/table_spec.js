import '../utils/es6-weak-map-global'; // For PhantomJS
import EventManager from '../utils/event-manager';
import Promise from 'bluebird'; // For testing on browsers not supporting Promise
import { promisify } from 'bluebird';
import '../../consumables/js/polyfills/custom-event';
import Table from '../../consumables/js/es2015/table';

describe('Test table', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new Table();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new Table(document.createTextNode(''));
      }).to.throw(Error);
    });

    it(`Should set default options`, function () {
      const table = new Table(document.createElement('table'));
      try {
        expect(table.options).to.deep.equal({
          selectorInit: '[data-table]',
          selectorTitle: '.bx--table__column-title',
          selectorRow: '.bx--table__row',
          selectorCheckbox: '.bx--checkbox',
          classSortState: 'bx--table__column-title--rotated',
          classCheckState: 'bx--table__row--checked',
          eventBeforeSortToggled: 'table-sort-beingtoggled',
          eventAfterSortToggled: 'table-sort-toggled',
          eventBeforeCheckToggled: 'table-check-beingtoggled',
          eventAfterCheckToggled: 'table-check-toggled',
          initEventNames: ['click'],
        });
      } finally {
        table.release();
      }
    });
  });

  describe('Toggling sorted state', function () {
    let table;
    let headerNode;
    let element;

    const events = new EventManager();

    before(function () {
      element = document.createElement('table');
      headerNode = element.appendChild(document.createElement('th'));
      headerNode.classList.add('bx--table__column-title');
      table = new Table(element);
      document.body.appendChild(element);
    });

    it(`Should turn to rotated state from non-rotated state`, function () {
      headerNode.classList.remove('bx--table__column-title--rotated');
      headerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(headerNode.classList.contains('bx--table__column-title--rotated')).to.be.true;
    });

    it(`Should turn to non-rotated state from rotated state`, function () {
      headerNode.classList.add('bx--table__column-title--rotated');
      headerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(headerNode.classList.contains('bx--table__column-title--rotated')).to.be.false;
    });

    it(`Should provide a way to cancel toggling`, function () {
      events.on(element, 'table-sort-beingtoggled', (e) => {
        expect(e.detail.newState).to.equal(true);
        e.preventDefault();
      });
      headerNode.classList.remove('bx--table__column-title--rotated');
      headerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(headerNode.classList.contains('bx--table__column-title--rotated')).to.be.false;
    });

    it(`Should emit an event after toggling is done`, async function () {
      const e = await new Promise((resolve) => {
        events.on(element, 'table-sort-toggled', resolve);
        headerNode.classList.remove('bx--table__column-title--rotated');
        headerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      expect(e.detail.newState).to.equal(true);
      expect(headerNode.classList.contains('bx--table__column-title--rotated')).to.be.true;
    });

    afterEach(function () {
      events.reset();
    });

    after(function () {
      table.release();
      document.body.removeChild(element);
    });
  });

  describe('Toggling checked state', function () {
    let table;
    let rowNode;
    let checkboxNode;
    let element;

    const events = new EventManager();

    before(function () {
      element = document.createElement('table');
      rowNode = element.appendChild(document.createElement('tr'));
      rowNode.classList.add('bx--table__row');
      checkboxNode = rowNode.appendChild(document.createElement('input'));
      checkboxNode.type = 'checkbox';
      checkboxNode.classList.add('bx--checkbox');
      table = new Table(element);
      document.body.appendChild(element);
    });

    it(`Should turn to checked state from non-checked state`, function () {
      rowNode.classList.remove('bx--table__row--checked');
      checkboxNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(rowNode.classList.contains('bx--table__row--checked')).to.be.true;
    });

    it(`Should turn to non-checked state from checked state`, function () {
      rowNode.classList.add('bx--table__row--checked');
      checkboxNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(rowNode.classList.contains('bx--table__row--checked')).to.be.false;
    });

    it(`Should provide a way to cancel toggling`, function () {
      events.on(element, 'table-check-beingtoggled', (e) => {
        expect(e.detail.newState).to.equal(true);
        e.preventDefault();
      });
      rowNode.classList.remove('bx--table__row--checked');
      checkboxNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(rowNode.classList.contains('bx--table__row--checked')).to.be.false;
    });

    it(`Should emit an event after toggling is done`, async function () {
      const e = await new Promise((resolve) => {
        events.on(element, 'table-check-toggled', resolve);
        rowNode.classList.remove('bx--table__row--checked');
        checkboxNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      });
      expect(e.detail.newState).to.equal(true);
      expect(rowNode.classList.contains('bx--table__row--checked')).to.be.true;
    });

    afterEach(function () {
      events.reset();
    });

    after(function () {
      table.release();
      document.body.removeChild(element);
    });
  });

  describe('Programmatic toggling of state', function () {
    let table;
    let headerNode;
    let element;

    const events = new EventManager();

    before(function () {
      element = document.createElement('table');
      headerNode = element.appendChild(document.createElement('th'));
      headerNode.classList.add('bx--table__column-title');
      table = new Table(element);
      document.body.appendChild(element);
    });

    it(`Should turn to on state from off state`, async function () {
      headerNode.classList.remove('bx--table__column-title--rotated');
      const [toggledElement, newState] = await promisify(table.toggleState, {
        context: table,
        multiArgs: true,
      })('Sort', headerNode);
      expect(toggledElement, 'toggledElement').to.equal(headerNode);
      expect(newState, 'newState').to.be.true;
      expect(headerNode.classList.contains('bx--table__column-title--rotated'), 'CSS class').to.be.true;
    });

    it(`Should turn to on state from off state`, async function () {
      headerNode.classList.add('bx--table__column-title--rotated');
      const [toggledElement, newState] = await promisify(table.toggleState, {
        context: table,
        multiArgs: true,
      })('Sort', headerNode);
      expect(toggledElement, 'toggledElement').to.equal(headerNode);
      expect(newState, 'newState').to.be.false;
      expect(headerNode.classList.contains('bx--table__column-title--rotated'), 'CSS class').to.be.false;
    });

    it(`Should provide a way to cancel turning to on state from off state`, async function () {
      events.on(element, 'table-sort-beingtoggled', (e) => e.preventDefault());
      headerNode.classList.remove('bx--table__column-title--rotated');
      let errorToggleState;
      try {
        await promisify(table.toggleState, {
          context: table,
          multiArgs: true,
        })('Sort', headerNode);
      } catch (error) {
        errorToggleState = error;
      }
      expect(errorToggleState, 'errorToggleState').to.be.ok;
      expect(errorToggleState.canceled, 'errorToggleState.canceled').to.be.true;
      expect(errorToggleState.element, 'errorToggleState.element').to.equal(headerNode);
      expect(errorToggleState.newState, 'errorToggleState.newState').to.be.true;
      expect(headerNode.classList.contains('bx--table__column-title--rotated'), 'CSS class').to.be.false;
    });

    it(`Should provide a way to cancel turning to off state from on state`, async function () {
      events.on(element, 'table-sort-beingtoggled', (e) => e.preventDefault());
      headerNode.classList.add('bx--table__column-title--rotated');
      let errorToggleState;
      try {
        await promisify(table.toggleState, {
          context: table,
          multiArgs: true,
        })('Sort', headerNode);
      } catch (error) {
        errorToggleState = error;
      }
      expect(errorToggleState, 'errorToggleState').to.be.ok;
      expect(errorToggleState.canceled, 'errorToggleState.canceled').to.be.true;
      expect(errorToggleState.element, 'errorToggleState.element').to.equal(headerNode);
      expect(errorToggleState.newState, 'errorToggleState.newState').to.be.false;
      expect(headerNode.classList.contains('bx--table__column-title--rotated'), 'CSS class').to.be.true;
    });

    afterEach(function () {
      events.reset();
    });

    after(function () {
      table.release();
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
        first = Table.create(element);
        second = Table.create(element);
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
        first = Table.create(element);
        first.release();
        second = Table.create(element);
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
    let headerNode;
    let initContext;
    let stubComponentsSet;

    before(function () {
      element = document.createElement('table');
      element.dataset.table = '';
      headerNode = element.appendChild(document.createElement('th'));
      headerNode.classList.add('bx--table__column-title');
      document.body.appendChild(element);
    });

    beforeEach(function () {
      headerNode.classList.remove('bx--table__column-title--rotated');
    });

    it(`Should create an instance upon clicking`, function () {
      initContext = Table.init();
      headerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(headerNode.classList.contains('bx--table__column-title--rotated')).to.be.true;
    });

    it(`Shouldn't create a new instance upon clicking if one has been there already`, function () {
      initContext = Table.init();
      Table.create(element);
      stubComponentsSet = sinon.stub(Table.components, 'set');
      headerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(headerNode.classList.contains('bx--table__column-title--rotated')).to.be.false;
      expect(stubComponentsSet).not.have.been.called;
    });

    it(`Should provide a way to remove event listener`, function () {
      Table.init().release();
      headerNode.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(headerNode.classList.contains('bx--table__column-title--rotated')).to.be.false;
    });

    afterEach(function () {
      const table = Table.components.get(element);
      if (table) {
        table.release();
      }
      if (initContext) {
        initContext.release();
        initContext = null;
      }
      if (stubComponentsSet) {
        stubComponentsSet.restore();
        stubComponentsSet = null;
      }
    });

    after(function () {
      document.body.removeChild(element);
    });
  });
});
