(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../misc/on', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../misc/on'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.create, global.assign, global.classCallCheck, global.createClass, global.on, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.profileSwitcher = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _create, _assign, _classCallCheck2, _createClass2, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _create2 = _interopRequireDefault(_create);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _on2 = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ProfileSwitcher = function () {
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
    function ProfileSwitcher(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, ProfileSwitcher);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      this.options = (0, _assign2.default)(this.constructor.options, options);

      this.constructor.components.set(this.element, this);

      this.hDocumentClick = (0, _on2.default)(this.element.ownerDocument, 'click', function (evt) {
        return _this.handleDocumentClick(evt);
      });

      var linkedAccount = void 0;
      var isLinked = void 0;
      var linkedIcon = void 0;
      this.element.addEventListener('dropdown-beingselected', function (event) {
        if (event.target.querySelector(_this.options.selectorAccountDropdown) !== null) {
          if (event.detail.item.querySelector(_this.options.classLinkedIcon) !== null) {
            _this.element.linkedAccount = event.detail.item.childNodes[1].cloneNode(true);
            _this.element.isLinked = true;
            _this.element.linkedIcon = event.detail.item.querySelector(_this.options.classLinkedIcon).cloneNode(true);
          } else {
            _this.element.linkedAccount = '';
            _this.element.isLinked = false;
            _this.element.linkedIcon = '';
          }
        }
      });

      this.element.querySelector(this.options.selectorToggle).addEventListener('keydown', function (event) {
        return _this.toggle(event);
      });

      this.element.querySelector(this.options.selectorToggle).addEventListener('mouseenter', function () {
        return _this.determineSwitcherValues(linkedAccount, linkedIcon, isLinked, true);
      });

      this.element.querySelector(this.options.selectorToggle).addEventListener('mouseleave', function () {
        return _this.determineSwitcherValues(linkedAccount, linkedIcon, isLinked, false);
      });

      this.element.ownerDocument.addEventListener('keyup', function () {
        return _this.handleBlur();
      });
    }

    /**
     * Instantiates a profile switcher of the given element.
     * @param {HTMLElement} element The element working as the profile switcher.
     * @param {Object} [options] The component options
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
      value: function determineSwitcherValues(linkedAccount, linkedIcon, isLinked, isHovered) {
        var linkedElement = this.element.querySelector(this.options.selectorLinkedAccount);
        var nameElement = this.element.querySelector(this.options.selectorAccount);
        var regionElement = this.element.querySelector(this.options.selectorRegion);
        var orgElement = this.element.querySelector(this.options.selectorOrg);
        var spaceElement = this.element.querySelector(this.options.selectorSpace);
        var menuElement = this.element.querySelector(this.options.selectorMenu);
        var isOpen = this.element.classList.contains(this.options.classSwitcherOpen);

        if (this.element.isLinked) {
          linkedElement.appendChild(this.element.linkedAccount);
          linkedElement.appendChild(this.element.linkedIcon);
        } else {
          linkedElement.textContent = '';
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
        this.constructor.components.delete(this.element);
      }
    }], [{
      key: 'create',
      value: function create(element, options) {
        return this.components.get(element) || new this(element, options);
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var effectiveOptions = (0, _assign2.default)((0, _create2.default)(this.options), options);
        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
          this.create(target, effectiveOptions);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
            return _this2.create(element, effectiveOptions);
          });
        }
      }
    }]);
    return ProfileSwitcher;
  }();

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
    selectorRegionDropdown: '[data-dropdown-region]',
    selectorOrgDropdown: '[data-dropdown-org]',
    selectorSpaceDropdown: '[data-dropdown-space]',
    classSwitcherOpen: 'bx--account-switcher--open',
    classLinkedIcon: '.bx--account-switcher__linked-icon'
  };
  ProfileSwitcher.components = new _weakMap2.default();
  exports.default = ProfileSwitcher;
});