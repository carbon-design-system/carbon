import '../polyfills/array-from';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import on from '../misc/on';

export default class ProfileSwitcher {
  /**
   * Profile Switcher.
   * @implements Component
   * @param {HTMLElement} element The element working as a profile switcher.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorProfileSwitcher] The data attribute selector for the profile switcher.
   * @param {string} [options.selectorAccount] The data attribute selector for the element containing the account name in the profile switcher.
   * @param {string} [options.selectorOrg] The data attribute selector for the element containing the organization name in the profile switcher.
   * @param {string} [options.selectorSpace] The data attribute selector for the element containing the space name in the profile switcher.
   * @param {string} [options.selectorAccountDropdown] The data attribute selector for the dropdown item containing the current account name.
   * @param {string} [options.selectorOrgDropdown] The data attribute selector for the dropdown item containing the current organization name.
   * @param {string} [options.selectorSpaceDropdown] The data attribute selector for the dropdown item containing the current space name.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign({
      // Data Attribute selectors
      selectorProfileSwitcher: '[data-profile-switcher]',
      selectorAccount: '[data-switcher-account]',
      selectorOrg: '[data-switcher-org]',
      selectorSpace: '[data-switcher-space]',
      selectorAccountDropdown: '[data-dropdown-account]',
      selectorOrgDropdown: '[data-dropdown-org]',
      selectorSpaceDropdown: '[data-dropdown-space]',
    }, options);

    this.constructor.components.set(this.element, this);

    this.hDocumentClick = on(this.element.ownerDocument, 'click', (evt) => this.handleDocumentClick(evt));

    this.determineSwitcherValues();
  }

  /**
   * Instantiates a profile switcher of the given element.
   * @param {HTMLElement} element The element working as the profile switcher.
   * @param {Object} [options] The component options
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Instantiates a profile switcher in the given node.
   * If the given element indicates that it's a profile switcher (having `data-profile-switcher` attribute), instantiates it.
   * Otherwise, instantiates profile switcher by searching for profile switcher in the given node.
   * @param {Node} target The DOM node to instantiate profile switcher in. Should be a document or an element.
   * @param {Object} [options] The component options
   */
  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-profile-switcher]')].forEach(element => this.create(element, options));
    }
  }

  /**
   * Handles click on the document.
   * Closes the profile switcherwhen document is clicked outside the left navigation or
   * the user clicks the profile switcher while it is open.
   * @param {Event} event The event triggering this method.
   */
  handleDocumentClick(evt) {
    const clickTarget = evt.target;
    const isOfSelf = this.element.contains(clickTarget);
    const isToggle = this.element.ownerDocument.querySelector('[data-profile-switcher-toggle]').contains(clickTarget);
    const isOpen = this.element.classList.contains('bx--switcher--open');

    if (isOfSelf) {
      if (isToggle && isOpen) {
        this.element.classList.remove('bx--switcher--open');
      } else if (isOpen) {
        this.determineSwitcherValues();
      } else {
        this.element.classList.add('bx--switcher--open');
      }
    } else {
      this.element.classList.remove('bx--switcher--open');
    }
  }

  /**
   * Determines values to put in the profile switcher.
   */
  determineSwitcherValues() {
    const nameElement = this.element.querySelector(this.options.selectorAccount);
    const orgElement = this.element.querySelector(this.options.selectorOrg);
    const spaceElement = this.element.querySelector(this.options.selectorSpace);

    const nameDropdownValue = this.element.querySelector(this.options.selectorAccountDropdown).innerHTML;
    const orgDropdownValue = this.element.querySelector(this.options.selectorOrgDropdown).innerHTML;
    const spaceDropdownValue = this.element.querySelector(this.options.selectorSpaceDropdown).innerHTML;

    nameElement.innerHTML = nameDropdownValue;
    orgElement.innerHTML = orgDropdownValue;
    spaceElement.innerHTML = spaceDropdownValue;
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    this.constructor.components.delete(this.element);
  }
}

/**
* The component options.
 * @member {Object} ProfileSwitcher#options
 * @property {string} [options.selectorProfileSwitcher] The data attribute selector for the profile switcher.
 * @property {string} [options.selectorAccount] The data attribute selector for the element containing the account name in the profile switcher.
 * @property {string} [options.selectorOrg] The data attribute selector for the element containing the organization name in the profile switcher.
 * @property {string} [options.selectorSpace] The data attribute selector for the element containing the space name in the profile switcher.
 * @property {string} [options.selectorAccountDropdown] The data attribute selector for the dropdown item containing the current account name.
 * @property {string} [options.selectorOrgDropdown] The data attribute selector for the dropdown item containing the current organization name.
 * @property {string} [options.selectorSpaceDropdown] The data attribute selector for the dropdown item containing the current space name.
 */

/**
 * The map associating DOM element and profile switcher instance.
 * @type {WeakMap}
 */
ProfileSwitcher.components = new WeakMap();
