import '../polyfills/array-from';
import '../polyfills/element-matches';
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

    this.options = Object.assign(this.constructor.options, options);

    this.constructor.components.set(this.element, this);

    this.hDocumentClick = on(this.element.ownerDocument, 'click', (evt) => this.handleDocumentClick(evt));

    let linkedAccount;
    let isLinked;
    let linkedIcon;
    this.element.addEventListener('dropdown-beingselected', (event) => {
      if (event.target.querySelector(this.options.selectorAccountDropdown) !== null) {
        if (event.detail.item.querySelector(this.options.classLinkedIcon) !== null) {
          this.element.linkedAccount = event.detail.item.childNodes[1].cloneNode(true);
          this.element.isLinked = true;
          this.element.linkedIcon = event.detail.item.querySelector(this.options.classLinkedIcon).cloneNode(true);
        } else {
          this.element.linkedAccount = '';
          this.element.isLinked = false;
          this.element.linkedIcon = '';
        }
      }
    });

    this.element.querySelector(this.options.selectorToggle).addEventListener('keydown', (event) => this.toggle(event));

    this.element.querySelector(this.options.selectorToggle).addEventListener('mouseenter', () => this.determineSwitcherValues(linkedAccount, linkedIcon, isLinked, true));

    this.element.querySelector(this.options.selectorToggle).addEventListener('mouseleave', () => this.determineSwitcherValues(linkedAccount, linkedIcon, isLinked, false));

    this.element.ownerDocument.addEventListener('keyup', () => this.handleBlur());
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
   * @param {string} [options.selectorInit] The CSS selector to find profile switchers.
   */
  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target, effectiveOptions);
    } else {
      [... target.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element, effectiveOptions));
    }
  }

  /**
   * Opens and closes the menu.
   * @param {Event} event The event triggering this method.
   */
  toggle(event) {
    const isOfSelf = this.element.contains(event.target);
    if (event.which === 13 || event.which === 32) {
      if (isOfSelf) {
        this.element.classList.toggle(this.options.classSwitcherOpen);
      } else if (!isOfSelf && this.element.classList.contains(this.options.classSwitcherOpen)) {
        this.element.classList.remove(this.options.classSwitcherOpen);
      }
    }
  }

  handleBlur() {
    if (!(this.element.contains(document.activeElement))) {
      this.element.classList.remove(this.options.classSwitcherOpen);
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
  determineSwitcherValues(linkedAccount, linkedIcon, isLinked, isHovered) {
    const linkedElement = this.element.querySelector(this.options.selectorLinkedAccount);
    const nameElement = this.element.querySelector(this.options.selectorAccount);
    const regionElement = this.element.querySelector(this.options.selectorRegion);
    const orgElement = this.element.querySelector(this.options.selectorOrg);
    const spaceElement = this.element.querySelector(this.options.selectorSpace);
    const menuElement = this.element.querySelector(this.options.selectorMenu);
    const isOpen = this.element.classList.contains(this.options.classSwitcherOpen);

    if (this.element.isLinked) {
      linkedElement.appendChild(this.element.linkedAccount);
      linkedElement.appendChild(this.element.linkedIcon);
    } else {
      linkedElement.textContent = '';
    }

    let nameDropdownValue = '';
    if (this.element.querySelector(this.options.selectorAccountDropdown)) {
      if (this.element.isLinked) {
        nameDropdownValue = this.element.querySelector(this.options.selectorAccountLinked).textContent;
      } else {
        nameDropdownValue = this.element.querySelector(this.options.selectorAccountDropdown).textContent;
      }
    }

    let regionDropdownValue = '';
    if (this.element.querySelector(this.options.selectorRegionDropdown)) {
      regionDropdownValue = this.element.querySelector(this.options.selectorRegionDropdown).textContent;
    }

    let orgDropdownValue = '';
    if (this.element.querySelector(this.options.selectorOrgDropdown)) {
      orgDropdownValue = this.element.querySelector(this.options.selectorOrgDropdown).textContent;
    }

    let spaceDropdownValue = '';
    if (this.element.querySelector(this.options.selectorSpaceDropdown)) {
      spaceDropdownValue = this.element.querySelector(this.options.selectorSpaceDropdown).textContent;
    }

    let nameShort;
    let orgShort;
    let spaceShort;

    if (isHovered && !isOpen) {
      nameElement.textContent = nameDropdownValue;
      orgElement.textContent = orgDropdownValue;
      spaceElement.textContent = spaceDropdownValue;
      regionElement.textContent = regionDropdownValue;
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

      if (spaceDropdownValue.length > 25) {
        spaceShort = spaceDropdownValue.substr(0, 25) + '...';
        spaceElement.textContent = spaceShort;
      } else {
        spaceElement.textContent = spaceDropdownValue;
      }

      regionElement.textContent = regionDropdownValue;
      menuElement.style.width = this.element.getBoundingClientRect().width + 'px';
    }
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    this.constructor.components.delete(this.element);
  }

  /**
   * The component options.
   * @member ProfileSwitcher.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find profile switchers.
   * @property {string} [selectorProfileSwitcher] The data attribute selector for the profile switcher.
   * @property {string} [selectorAccount] The data attribute selector for the element containing the account name in the profile switcher.
   * @property {string} [selectorOrg] The data attribute selector for the element containing the organization name in the profile switcher.
   * @property {string} [selectorSpace] The data attribute selector for the element containing the space name in the profile switcher.
   * @property {string} [selectorAccountDropdown] The data attribute selector for the dropdown item containing the current account name.
   * @property {string} [selectorOrgDropdown] The data attribute selector for the dropdown item containing the current organization name.
   * @property {string} [selectorSpaceDropdown] The data attribute selector for the dropdown item containing the current space name.
   */
  static options = {
    selectorInit: '[data-profile-switcher]',
    // Data Attribute selectors
    selectorProfileSwitcher: '[data-profile-switcher]',
    selectorToggle: '[data-profile-switcher-toggle]',
    selectorMenu: '[data-switcher-menu]',
    selectorLinkedAccount: '[data-switcher-account-sl]',
    selectorAccount: '[data-switcher-account]',
    selectorRegion: '[data-switcher-region]',
    selectorOrg: '[data-switcher-org]',
    selectorSpace: '[data-switcher-space]',
    selectorDropdown: '[data-dropdown]',
    selectorAccountDropdown: '[data-dropdown-account]',
    selectorAccountSlDropdown: '[data-dropdown-account-sl]',
    selectorAccountLinked: '[data-dropdown-account-linked]',
    selectorRegionDropdown: '[data-dropdown-region]',
    selectorOrgDropdown: '[data-dropdown-org]',
    selectorSpaceDropdown: '[data-dropdown-space]',
    classSwitcherOpen: 'bx--account-switcher--open',
    classLinkedIcon: '.bx--account-switcher__linked-icon',
  };

  /**
   * The map associating DOM element and profile switcher instance.
   * @member ProfileSwitcher.components
   * @type {WeakMap}
   */
  static components = new WeakMap();
}
