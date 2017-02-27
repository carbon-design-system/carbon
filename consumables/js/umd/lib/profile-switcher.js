(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/get', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../misc/on', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../misc/on'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.get, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.on, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.profileSwitcher = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _get2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _get3 = _interopRequireDefault(_get2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);

  var _on2 = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ProfileSwitcher = function (_mixin) {
    (0, _inherits3.default)(ProfileSwitcher, _mixin);

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
    function ProfileSwitcher(element, options) {
      (0, _classCallCheck3.default)(this, ProfileSwitcher);

      var _this = (0, _possibleConstructorReturn3.default)(this, (ProfileSwitcher.__proto__ || (0, _getPrototypeOf2.default)(ProfileSwitcher)).call(this, element, options));

      _this.hDocumentClick = (0, _on2.default)(_this.element.ownerDocument, 'click', function (evt) {
        _this.handleDocumentClick(evt);
      });

      _this.element.addEventListener('dropdown-beingselected', function (event) {
        if (event.target.querySelector(_this.options.selectorAccountDropdown) !== null) {
          if (event.detail.item.querySelector(_this.options.classLinkedIcon) !== null) {
            _this.element.linkedAccount = event.detail.item.querySelector(_this.options.selectorAccountSlLinked).cloneNode(true);
            _this.element.isLinked = true;
            _this.element.linkedIcon = event.detail.item.querySelector(_this.options.classLinkedIcon).cloneNode(true);
          } else {
            _this.element.linkedAccount = '';
            _this.element.isLinked = false;
            _this.element.linkedIcon = '';
          }
        }
      });

      _this.element.querySelector(_this.options.selectorToggle).addEventListener('keydown', function (event) {
        _this.toggle(event);
      });

      _this.element.querySelector(_this.options.selectorToggle).addEventListener('mouseenter', function (event) {
        _this.getLinkedData(event);
        _this.determineSwitcherValues(true);
      });

      _this.element.querySelector(_this.options.selectorToggle).addEventListener('mouseleave', function (event) {
        _this.getLinkedData(event);
        _this.determineSwitcherValues(false);
      });

      _this.element.ownerDocument.addEventListener('keyup', function () {
        return _this.handleBlur();
      });
      return _this;
    }

    /**
     * Opens and closes the menu.
     * @param {Event} event The event triggering this method.
     */


    (0, _createClass3.default)(ProfileSwitcher, [{
      key: 'toggle',
      value: function toggle(event) {
        var isOfSelf = this.element.contains(event.target);
        if (event.which === 13 || event.which === 32) {
          if (isOfSelf) {
            this.element.classList.toggle(this.options.classSwitcherOpen);
          } else if (!isOfSelf && this.element.classList.contains(this.options.classSwitcherOpen)) {
            this.element.classList.remove(this.options.classSwitcherOpen);
          }
        }
      }
    }, {
      key: 'getLinkedData',
      value: function getLinkedData(event) {
        if (event.target.querySelector(this.options.selectorLinkedAccount) !== null) {
          if (event.target.querySelector(this.options.selectorLinkedAccount).textContent.length > 1) {
            this.element.isLinked = true;
          } else {
            this.element.isLinked = false;
          }
        }
      }
    }, {
      key: 'handleBlur',
      value: function handleBlur() {
        if (!this.element.contains(document.activeElement)) {
          this.element.classList.remove(this.options.classSwitcherOpen);
        }
      }
    }, {
      key: 'handleDocumentClick',
      value: function handleDocumentClick(evt) {
        var clickTarget = evt.target;
        var isOfSelf = this.element.contains(clickTarget);
        var isToggle = this.element.ownerDocument.querySelector(this.options.selectorToggle).contains(clickTarget);
        var isOpen = this.element.classList.contains(this.options.classSwitcherOpen);

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
    }, {
      key: 'determineSwitcherValues',
      value: function determineSwitcherValues(isHovered) {
        var linkedElement = this.element.querySelector(this.options.selectorLinkedAccount);
        var nameElement = this.element.querySelector(this.options.selectorAccount);
        var regionElement = this.element.querySelector(this.options.selectorRegion);
        var orgElement = this.element.querySelector(this.options.selectorOrg);
        var spaceElement = this.element.querySelector(this.options.selectorSpace);
        var menuElement = this.element.querySelector(this.options.selectorMenu);
        var isOpen = this.element.classList.contains(this.options.classSwitcherOpen);

        if (linkedElement) {
          if (this.element.isLinked) {
            if (this.element.linkedAccount) {
              if (linkedElement.textContent.length) {
                linkedElement.querySelector(this.options.selectorAccountSlLinked).textContent = this.element.linkedAccount.textContent;
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

        var nameDropdownValue = '';
        if (this.element.querySelector(this.options.selectorAccountDropdown)) {
          if (this.element.isLinked) {
            nameDropdownValue = this.element.querySelector(this.options.selectorAccountLinked).textContent;
          } else {
            nameDropdownValue = this.element.querySelector(this.options.selectorAccountDropdown).textContent;
          }
        }

        var regionDropdownValue = '';
        if (this.element.querySelector(this.options.selectorRegionDropdown)) {
          regionDropdownValue = this.element.querySelector(this.options.selectorRegionDropdown).textContent;
        }

        var orgDropdownValue = '';
        if (this.element.querySelector(this.options.selectorOrgDropdown)) {
          orgDropdownValue = this.element.querySelector(this.options.selectorOrgDropdown).textContent;
        }

        var spaceDropdownValue = '';
        if (this.element.querySelector(this.options.selectorSpaceDropdown)) {
          spaceDropdownValue = this.element.querySelector(this.options.selectorSpaceDropdown).textContent;
        }

        var nameShort = void 0;
        var orgShort = void 0;
        var spaceShort = void 0;

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
    }, {
      key: 'release',
      value: function release() {
        if (this.hDocumentClick) {
          this.hDocumentClick = this.hDocumentClick.release();
        }
        (0, _get3.default)(ProfileSwitcher.prototype.__proto__ || (0, _getPrototypeOf2.default)(ProfileSwitcher.prototype), 'release', this).call(this);
      }
    }]);
    return ProfileSwitcher;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  ProfileSwitcher.options = {
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
    classLinkedIcon: '.bx--account-switcher__linked-icon'
  };
  ProfileSwitcher.components = new _weakMap2.default();
  exports.default = ProfileSwitcher;
});