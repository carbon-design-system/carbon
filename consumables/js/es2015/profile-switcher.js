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
      selectorToggle: '[data-profile-switcher-toggle]',
      selectorMenu: '[data-switcher-menu]',
      selectorAccount: '[data-switcher-account]',
      selectorOrg: '[data-switcher-org]',
      selectorSpace: '[data-switcher-space]',
      selectorAccountDropdown: '[data-dropdown-account]',
      selectorOrgDropdown: '[data-dropdown-org]',
      selectorSpaceDropdown: '[data-dropdown-space]',
      classSwitcherOpen: 'bx--account-switcher--open',
    }, options);

    this.constructor.components.set(this.element, this);

    this.hDocumentClick = on(this.element.ownerDocument, 'click', (evt) => this.handleDocumentClick(evt));
    this.element.querySelector(this.options.selectorToggle).addEventListener('keypress', (event) => this.toggle(event));

    this.element.querySelector(this.options.selectorToggle).addEventListener('mouseenter', () => this.determineSwitcherValues(true));

    this.element.querySelector(this.options.selectorToggle).addEventListener('mouseleave', () => this.determineSwitcherValues(false));

    this.determineSwitcherValues(false);
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
   * Opens and closes the menu.
   * @param {Event} event The event triggering this method.
   */
  toggle(event) {
    if (event.which === 13) {
      const isOfSelf = this.element.contains(event.target);
      if (isOfSelf) {
        this.element.classList.toggle(this.options.classSwitcherOpen);
      } else if (!isOfSelf && this.element.classList.contains(this.options.classSwitcherOpen)) {
        this.element.classList.remove(this.options.classSwitcherOpen);
      }
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
    const isToggle = this.element.ownerDocument.querySelector(this.options.selectorToggle).contains(clickTarget);
    const isOpen = this.element.classList.contains(this.options.classSwitcherOpen);

    if (isOfSelf) {
      if (isToggle && isOpen) {
        this.element.classList.remove(this.options.classSwitcherOpen);
      } else if (isOpen) {
        this.determineSwitcherValues();
      } else {
        this.element.classList.add(this.options.classSwitcherOpen);
      }
    } else {
      this.element.classList.remove(this.options.classSwitcherOpen);
    }
  }

  /**
   * Handles logic to determine what text to display in profile switcher.
   * If the text is over 25 characters long, truncate and add ellipses.
   * Also adds logic to change the switcher width based on the width of the hovered
   * profile switcher
   * @param {boolean} isHovered boolean value passed by the event listener on bx--toggle.
   */
  determineSwitcherValues(isHovered) {
    const nameElement = this.element.querySelector(this.options.selectorAccount);
    const orgElement = this.element.querySelector(this.options.selectorOrg);
    const spaceElement = this.element.querySelector(this.options.selectorSpace);
    const menuElement = this.element.querySelector(this.options.selectorMenu);
    const isOpen = this.element.classList.contains(this.options.classSwitcherOpen);

    const nameDropdownValue = this.element.querySelector(this.options.selectorAccountDropdown).textContent;
    const orgDropdownValue = this.element.querySelector(this.options.selectorOrgDropdown).textContent;
    const spaceDropdownValue = this.element.querySelector(this.options.selectorSpaceDropdown).textContent;
    let nameShort;
    let orgShort;

    if (isHovered && !isOpen) {
      nameElement.textContent = nameDropdownValue;
      orgElement.textContent = orgDropdownValue;
      spaceElement.textContent = spaceDropdownValue;
      menuElement.style.width = this.element.getBoundingClientRect().width + 'px';
    } else {
      if (nameDropdownValue.length > 25) {
        nameShort = nameDropdownValue.substr(0, 25) + '...';
        nameElement.textContent = nameShort;
      } else {
        nameElement.textContent = nameDropdownValue;
      }

      if (orgDropdownValue.length > 25) {
        orgShort = orgDropdownValue.slice(0, 12) + '...' + orgDropdownValue.slice(-13);
        orgElement.textContent = orgShort;
      } else {
        orgElement.textContent = orgDropdownValue;
      }
      menuElement.style.width = this.element.getBoundingClientRect().width + 'px';
      spaceElement.textContent = spaceDropdownValue;
    }
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    this.constructor.components.delete(this.element);
  }
}

/**
* The component options..
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
