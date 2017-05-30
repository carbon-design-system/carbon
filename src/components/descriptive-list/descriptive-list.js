import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventMatches from '../../globals/js/misc/event-matches';

class DescriptiveList extends mixin(createComponent, initComponentBySearch) {
  /**
   * DescriptiveList
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The root element of tables
   * @param {Object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorRow] css selector for selected row
   */
  constructor(element, options) {
    super(element, options);

    this.labels = [...this.element.querySelectorAll('input.bx--descriptive-list-input')];

    this.element.addEventListener('keydown', (evt) => {
      if (evt.which === 13) {
        const selectedRow = eventMatches(event, this.options.selectorRow);
        if (selectedRow) {
          const id = `#${selectedRow.getAttribute('for')}`;
          const input = document.querySelector(`${id}.bx--descriptive-list-input`);
          input.checked = !input.checked;
        }
      }
    });
  }

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-descriptive-list]',
    selectorRow: '.bx--descriptive-list-row',
  };
}

export default DescriptiveList;
