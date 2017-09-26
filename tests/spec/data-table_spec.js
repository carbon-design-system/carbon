import EventManager from '../utils/event-manager';
import ResponsiveTable from '../../src/components/data-table/data-table';
import HTML from '../../src/components/data-table/data-table.html';

describe('Test responsive table', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new ResponsiveTable();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new ResponsiveTable(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Initial Tasks', function() {
    let container;
    let element;
    let table;

    before(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-responsive-table]');
      table = new ResponsiveTable(element);
    });

    it('Should add zebra stripe classes to table rows', function() {
      const rows = [...element.querySelectorAll('tbody > tr')];
      const evenRows = rows.filter((row, index) => index % 2 === 0);
      const oddRows = rows.filter((row, index) => index % 2 !== 0);

      evenRows.forEach(row => {
        expect(row.classList.contains('bx--parent-row--even')).to.be.true;
      });

      oddRows.forEach(row => {
        expect(row.classList.contains('bx--parent-row--even')).to.be.false;
      });
    });

    it('Should remove expandable rows from the DOM', function() {
      const rows = [...element.querySelectorAll('tbody > tr')];

      rows.forEach(row => {
        expect(row.classList.contains('bx--expandable-row')).to.be.false;
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
    let expanseTable;
    let container;

    before(function() {
      container = document.createElement('div');
      element;
      expanseTable;
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-responsive-table]');
      expanseTable = new ResponsiveTable(element);
    });

    it('On first click, insert the saved row', function() {
      const firstRowExpand = document.querySelector('.bx--table-expand');
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));

      expect(document.querySelector('.bx--expandable-row')).to.not.be.null;
    });

    it('Remove element on second click', function() {
      const firstRowExpand = document.querySelector('.bx--table-expand');
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));

      expect(document.querySelector('.bx--expandable-row')).to.be.null;
    });

    it('Clicking a row expand table cell should trigger the event', function() {
      const rowExpansion = document.querySelector('.bx--table-expand');
      const spyToggleRowExpandEvent = sinon.spy();
      events.on(element.ownerDocument.body, 'responsive-table-aftertoggleexpand', spyToggleRowExpandEvent);
      rowExpansion.dispatchEvent(new CustomEvent('click', { bubbles: true }));

      expect(spyToggleRowExpandEvent).to.have.been.called;
    });

    it('The event should trigger the function', function() {
      const rowExpansion = document.querySelector('.bx--table-expand');

      const spyToggleRowExpand = sinon.spy(expanseTable, '_toggleRowExpand');
      rowExpansion.dispatchEvent(new CustomEvent('click', { bubbles: true }));

      expect(spyToggleRowExpand).to.have.been.called;
    });

    afterEach(function() {
      events.reset();
    });

    after(function() {
      document.body.removeChild(container);
      expanseTable.release();
    });
  });
});
