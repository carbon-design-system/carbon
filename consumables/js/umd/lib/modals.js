(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/get', 'babel-runtime/helpers/inherits', 'babel-runtime/helpers/toConsumableArray', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-launcher', '../mixins/evented-state', '../polyfills/toggle-class', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/inherits'), require('babel-runtime/helpers/toConsumableArray'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-launcher'), require('../mixins/evented-state'), require('../polyfills/toggle-class'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.get, global.inherits, global.toConsumableArray, global.mixin, global.createComponent, global.initComponentByLauncher, global.eventedState, global.toggleClass, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.modals = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _get2, _inherits2, _toConsumableArray2, _mixin2, _createComponent, _initComponentByLauncher, _eventedState, _toggleClass) {
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

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentByLauncher2 = _interopRequireDefault(_initComponentByLauncher);

  var _eventedState2 = _interopRequireDefault(_eventedState);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @param {Element} element The element to obtain transition duration from.
   * @returns {number} The transition duration of the given property set in the given element.
   */
  function getTransitionDuration(element) {
    var computedStyle = element.ownerDocument.defaultView.getComputedStyle(element);
    var durations = computedStyle.transitionDuration.split(/,\s*/).map(function (transitionDuration) {
      return parseFloat(transitionDuration);
    }).filter(function (duration) {
      return !isNaN(duration);
    });
    return durations.length > 0 ? Math.max.apply(Math, (0, _toConsumableArray3.default)(durations)) : 0;
  }

  var Modal = function (_mixin) {
    (0, _inherits3.default)(Modal, _mixin);

    /**
     * Modal dialog.
     * @extends CreateComponent
     * @extends InitComponentByLauncher
     * @extends EventedState
     * @param {HTMLElement} element The element working as a modal dialog.
     * @param {Object} [options] The component options.
     * @param {string} [options.classVisible] The CSS class for the visible state.
     * @param {string} [options.classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
     * @param {string} [options.eventBeforeShown]
     *   The name of the custom event fired before this modal is shown.
     *   Cancellation of this event stops showing the modal.
     * @param {string} [options.eventAfterShown]
     *   The name of the custom event telling that modal is sure shown
     *   without being canceled by the event handler named by `eventBeforeShown` option (`modal-beingshown`).
     * @param {string} [options.eventBeforeHidden]
     *   The name of the custom event fired before this modal is hidden.
     *   Cancellation of this event stops hiding the modal.
     * @param {string} [options.eventAfterHidden]
     *   The name of the custom event telling that modal is sure hidden
     *   without being canceled by the event handler named by `eventBeforeHidden` option (`modal-beinghidden`).
     */
    function Modal(element, options) {
      (0, _classCallCheck3.default)(this, Modal);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call(this, element, options));

      _this.hookCloseActions();
      return _this;
    }

    /**
     * A method called when this widget is created upon clicking on launcher button.
     * @param {Event} event The event triggering the creation.
     */


    (0, _createClass3.default)(Modal, [{
      key: 'createdByLauncher',
      value: function createdByLauncher(event) {
        this.show(event);
      }
    }, {
      key: 'hookCloseActions',
      value: function hookCloseActions() {
        var _this2 = this;

        this.element.addEventListener('click', function (event) {
          if (event.currentTarget === event.target) _this2.hide(event);
        });

        if (this.keydownHandler) {
          this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
          this.keydownHandler = null;
        }

        this.keydownHandler = function (event) {
          if (event.which === 27) {
            _this2.hide(event);
          }
        };

        this.element.ownerDocument.body.addEventListener('keydown', this.keydownHandler);

        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll('[data-modal-close]'))).forEach(function (element) {
          element.addEventListener('click', function (event) {
            _this2.hide(event);
          });
        });
      }
    }, {
      key: 'shouldStateBeChanged',
      value: function shouldStateBeChanged(state) {
        return state !== (this.element.classList.contains(this.options.classVisible) ? 'shown' : 'hidden');
      }
    }, {
      key: '_changeState',
      value: function _changeState(state, detail, callback) {
        var _this3 = this;

        var finished = void 0;
        var visible = state === 'shown';
        var finishedTransition = function finishedTransition() {
          if (!finished) {
            finished = true;
            _this3.element.removeEventListener('transitionend', finishedTransition);
            if (visible && _this3.element.offsetWidth > 0 && _this3.element.offsetHeight > 0) {
              // Sets focus to modal's container element so that hitting tab navigates user to first navigable element in modal.
              // Application can override this behavior by hooking to `modal-shown` event and setting focus to an element.
              // (e.g. default input box, default button)
              _this3.element.focus();
            }
            callback();
          }
        };

        this.element.addEventListener('transitionend', finishedTransition);
        var transitionDuration = getTransitionDuration(this.element);
        (0, _toggleClass2.default)(this.element, this.options.classVisible, visible);
        (0, _toggleClass2.default)(this.element.ownerDocument.body, this.options.classNoScroll, visible);
        if (transitionDuration === 0) {
          finishedTransition();
        }
      }
    }, {
      key: 'show',
      value: function show(launchingElementOrEvent, callback) {
        var launchingElementOrEventOmitted = !launchingElementOrEvent || typeof launchingElementOrEvent === 'function';
        if (launchingElementOrEventOmitted) {
          callback = launchingElementOrEvent; // eslint-disable-line no-param-reassign
        }

        var launchingElement = launchingElementOrEventOmitted ? null : launchingElementOrEvent.delegateTarget || launchingElementOrEvent.currentTarget || launchingElementOrEvent;

        var launchingEvent = launchingElementOrEventOmitted ? null : launchingElementOrEvent.currentTarget && launchingElementOrEvent;

        if (launchingElement && !launchingElement.nodeType) {
          throw new TypeError('DOM Node should be given for launching element.');
        }

        if (launchingEvent && !launchingEvent.type) {
          throw new TypeError('DOM event should be given for launching event.');
        }

        this.changeState('shown', { launchingElement: launchingElement, launchingEvent: launchingEvent }, callback);
      }
    }, {
      key: 'hide',
      value: function hide(launchingElementOrEvent, callback) {
        var launchingElementOrEventOmitted = !launchingElementOrEvent || typeof launchingElementOrEvent === 'function';
        if (launchingElementOrEventOmitted) {
          callback = launchingElementOrEvent; // eslint-disable-line no-param-reassign
        }

        var launchingElement = launchingElementOrEventOmitted ? null : launchingElementOrEvent.currentTarget || launchingElementOrEvent;

        var launchingEvent = launchingElementOrEventOmitted ? null : launchingElementOrEvent.currentTarget && launchingElementOrEvent;

        if (launchingElement && !launchingElement.nodeType) {
          throw new TypeError('DOM Node should be given for launching element.');
        }

        if (launchingEvent && !launchingEvent.type) {
          throw new TypeError('DOM event should be given for launching event.');
        }

        this.changeState('hidden', { launchingElement: launchingElement, launchingEvent: launchingEvent }, callback);
      }
    }, {
      key: 'release',
      value: function release() {
        if (this.keydownHandler) {
          this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
          this.keydownHandler = null;
        }
        (0, _get3.default)(Modal.prototype.__proto__ || (0, _getPrototypeOf2.default)(Modal.prototype), 'release', this).call(this);
      }
    }], [{
      key: 'hook',
      value: function hook() {
        console.warn('Modals.hook() is deprecated. Use Modals.init() instead.'); // eslint-disable-line no-console
      }
    }]);
    return Modal;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentByLauncher2.default, _eventedState2.default));

  Modal.components = new _weakMap2.default();
  Modal.options = {
    selectorInit: '[data-modal]',
    attribInitTarget: 'data-modal-target',
    classVisible: 'is-visible',
    classNoScroll: 'bx--noscroll',
    eventBeforeShown: 'modal-beingshown',
    eventAfterShown: 'modal-shown',
    eventBeforeHidden: 'modal-beinghidden',
    eventAfterHidden: 'modal-hidden',
    initEventNames: ['click']
  };
  exports.default = Modal;
});