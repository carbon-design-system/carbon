import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';

class CodeSnippet extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * CodeSnippet UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a CodeSnippet UI.
   */

  constructor(element, options) {
    super(element, options);
    this.manage(
      on(this.element, 'click', event => {
        this._handleClick(event);
      })
    );

    this._initCodeSnippet();
  }

  _handleClick() {
    this.element.parentElement.classList.toggle('bx--snippet--expand');

    if (this.element.parentElement.classList.contains('bx--snippet--expand')) {
      this.element.querySelectorAll('.bx--snippet-btn--text')[0].innerHTML = this.options.showLess;
    } else {
      this.element.querySelectorAll('.bx--snippet-btn--text')[0].innerHTML = this.options.showMore;
    }
  }

  _initCodeSnippet() {
    this.element.querySelectorAll('.bx--snippet-btn--text')[0].innerHTML = this.options.showMore;
    if (this.element.parentElement.offsetHeight < 288) {
      this.element.classList.add('bx--snippet-btn--expand--hide');
      this.element.parentElement.classList.add('bx--snippet--expand');
    }
  }

  /**
   * The map associating DOM element and copy button UI instance.
   * @member CodeSnippet.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode CodeSnippet.create .create()},
   * or {@linkcode CodeSnippet.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode CodeSnippet.init .init()} works.
   * @member CodeSnippet.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find copy button UIs.
   */
  static options = {
    selectorInit: '.bx--snippet--multi .bx--snippet-btn--expand',
    showMore: 'Show more',
    showLess: 'Show less',
  };
}

export default CodeSnippet;
