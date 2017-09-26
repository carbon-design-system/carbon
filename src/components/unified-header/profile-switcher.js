import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

class ProfileSwitcher extends mixin(createComponent, initComponentBySearch) {
  /**
   * Profile Switcher.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a profile switcher.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorProfileSwitcher] The data attribute selector for the profile switcher.
   * @param {string} [options.selectorAccount]
   *   The data attribute selector for the element containing the account name in the profile switcher.
   * @param {string} [options.selectorOrg]
   *   The data attribute selector for the element containing the organization name in the profile switcher.
   * @param {string} [options.selectorSpace]
   *   The data attribute selector for the element containing the space name in the profile switcher.
   * @param {string} [options.selectorAccountDropdown]
   *   The data attribute selector for the dropdown item containing the current account name.
   * @param {string} [options.selectorOrgDropdown]
   *   The data attribute selector for the dropdown item containing the current organization name.
   * @param {string} [options.selectorSpaceDropdown]
   *   The data attribute selector for the dropdown item containing the current space name.
   */
  constructor(element, options) {
    super(element, options);

    this.hDocumentClick = on(this.element.ownerDocument, 'click', evt => {
      this.handleDocumentClick(evt);
    });

    this.element.addEventListener('dropdown-beingselected', event => {
      if (event.target.querySelector(this.options.selectorAccountDropdown) !== null) {
        const linkedIconNode = event.detail.item.querySelector(this.options.classLinkedIcon);
        this.element.isLinked = !!linkedIconNode;
        this.element.linkedIcon = linkedIconNode && linkedIconNode.cloneNode(true);
        const linkedAccountNode = event.detail.item.querySelector(this.options.selectorAccountSlLinked);
        this.element.linkedAccount = linkedAccountNode && linkedAccountNode.cloneNode(true);
      }
    });

    const toggleNode = this.element.querySelector(this.options.selectorToggle);
    if (toggleNode) {
      toggleNode.addEventListener('keydown', event => {
        this.toggle(event);
      });

      toggleNode.addEventListener('mouseenter', event => {
        this.getLinkedData(event);
        this.determineSwitcherValues(true);
      });

      toggleNode.addEventListener('mouseleave', event => {
        this.getLinkedData(event);
        this.determineSwitcherValues(false);
      });
    }

    this.element.ownerDocument.addEventListener('keyup', () => this.handleBlur());
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

  getLinkedData(event) {
    if (event.target.querySelector(this.options.selectorLinkedAccount) !== null) {
      if (event.target.querySelector(this.options.selectorLinkedAccount).textContent.length > 1) {
        this.element.isLinked = true;
      } else {
        this.element.isLinked = false;
      }
    }
  }

  handleBlur() {
    if (!this.element.contains(document.activeElement)) {
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
    const isToggle = eventMatches(evt, this.options.selectorToggle);
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
    const linkedElement = this.element.querySelector(this.options.selectorLinkedAccount);
    const nameElement = this.element.querySelector(this.options.selectorAccount);
    const regionElement = this.element.querySelector(this.options.selectorRegion);
    const orgElement = this.element.querySelector(this.options.selectorOrg);
    const spaceElement = this.element.querySelector(this.options.selectorSpace);
    const menuElement = this.element.querySelector(this.options.selectorMenu);
    const isOpen = this.element.classList.contains(this.options.classSwitcherOpen);

    if (linkedElement) {
      if (this.element.isLinked) {
        if (this.element.linkedAccount) {
          if (linkedElement.textContent.length) {
            linkedElement.querySelector(
              this.options.selectorAccountSlLinked
            ).textContent = this.element.linkedAccount.textContent;
          } else {
            linkedElement.appendChild(this.element.linkedAccount);
            if (this.element.linkedIcon) {
              linkedElement.appendChild(this.element.linkedIcon);
            }
          }
        }
      } else {
        linkedElement.textContent = '';
      }
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
      if (nameElement) {
        nameElement.textContent = nameDropdownValue;
      }
      if (orgElement) {
        orgElement.textContent = orgDropdownValue;
      }
      if (spaceElement) {
        spaceElement.textContent = spaceDropdownValue;
      }
      if (regionElement) {
        regionElement.textContent = regionDropdownValue;
      }
      if (menuElement) {
        menuElement.style.width = `${this.element.getBoundingClientRect().width}px`;
      }
    } else {
      if (nameElement) {
        if (nameDropdownValue.length > 25) {
          nameShort = `${nameDropdownValue.substr(0, 25)}...`;
          nameElement.textContent = nameShort;
        } else {
          nameElement.textContent = nameDropdownValue;
        }
      }

      if (orgElement) {
        if (orgDropdownValue.length > 25) {
          orgShort = `${orgDropdownValue.slice(0, 12)}...${orgDropdownValue.slice(-13)}`;
          orgElement.textContent = orgShort;
        } else {
          orgElement.textContent = orgDropdownValue;
        }
      }

      if (spaceElement) {
        if (spaceDropdownValue.length > 25) {
          spaceShort = `${spaceDropdownValue.substr(0, 25)}...`;
          spaceElement.textContent = spaceShort;
        } else {
          spaceElement.textContent = spaceDropdownValue;
        }
      }

      if (regionElement) {
        regionElement.textContent = regionDropdownValue;
      }

      if (menuElement) {
        menuElement.style.width = `${this.element.getBoundingClientRect().width}px`;
      }
    }
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    super.release();
  }

  /**
   * The component options.
   * @member ProfileSwitcher.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find profile switchers.
   * @property {string} [selectorProfileSwitcher] The data attribute selector for the profile switcher.
   * @property {string} [selectorAccount]
   *   The data attribute selector for the element containing the account name in the profile switcher.
   * @property {string} [selectorOrg]
   *   The data attribute selector for the element containing the organization name in the profile switcher.
   * @property {string} [selectorSpace]
   *   The data attribute selector for the element containing the space name in the profile switcher.
   * @property {string} [selectorAccountDropdown]
   *   The data attribute selector for the dropdown item containing the current account name.
   * @property {string} [selectorOrgDropdown]
   *   The data attribute selector for the dropdown item containing the current organization name.
   * @property {string} [selectorSpaceDropdown]
   *   The data attribute selector for the dropdown item containing the current space name.
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
    selectorAccountSlLinked: '[data-dropdown-account-sl-linked]',
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

export default ProfileSwitcher;
