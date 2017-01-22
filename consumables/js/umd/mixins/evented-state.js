(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/json/stringify', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/json/stringify'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.toConsumableArray, global.stringify, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits);
    global.eventedState = mod.exports;
  }
})(this, function (exports, _toConsumableArray2, _stringify, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (ToMix) {
    /**
     * Mix-in class to manage events associated with states.
     * @class EventedState
     */
    var EventedState = function (_ToMix) {
      (0, _inherits3.default)(EventedState, _ToMix);

      function EventedState() {
        (0, _classCallCheck3.default)(this, EventedState);
        return (0, _possibleConstructorReturn3.default)(this, (EventedState.__proto__ || (0, _getPrototypeOf2.default)(EventedState)).apply(this, arguments));
      }

      (0, _createClass3.default)(EventedState, [{
        key: '_changeState',

        /**
         * The internal implementation for {@link EventedState#changeState `.changeState()`}, performing actual change in state.
         * @param {string} [state] The new state. Can be an omitted, which means toggling.
         * @param {Object} [detail]
         *   The object that should be put to event details that is fired before/after changing state.
         *   Can have a `group` property, which specifies what state to be changed.
         * @param {EventedState~changeStateCallback} callback The callback called once changing state is finished or is canceled.
         * @private
         */
        value: function _changeState() {
          throw new Error('_changeState() should be overriden to perform actual change in state.');
        }

        /**
         * Changes the state of this component.
         * @param {string} [state] The new state. Can be an omitted, which means toggling.
         * @param {Object} [detail]
         *   The object that should be put to event details that is fired before/after changing state.
         *   Can have a `group` property, which specifies what state to be changed.
         * @param {EventedState~changeStateCallback} [callback] The callback called once changing state is finished or is canceled.
         */

      }, {
        key: 'changeState',
        value: function changeState() {
          var _this2 = this;

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var state = typeof args[0] === 'string' ? args.shift() : undefined;
          var detail = Object(args[0]) === args[0] && typeof args[0] !== 'function' ? args.shift() : undefined;
          var callback = typeof args[0] === 'function' ? args.shift() : undefined;

          if (typeof this.shouldStateBeChanged === 'function' && !this.shouldStateBeChanged(state, detail)) {
            if (callback) {
              callback(null, true);
            }
            return;
          }

          var data = {
            group: detail && detail.group,
            state: state
          };

          var eventNameSuffix = [data.group, state].filter(Boolean).join('-').split('-') // Group or state may contain hyphen
          .map(function (item) {
            return item[0].toUpperCase() + item.substr(1);
          }).join('');

          var eventStart = new CustomEvent(this.options['eventBefore' + eventNameSuffix], {
            bubbles: true,
            cancelable: true,
            detail: detail
          });

          var canceled = !this.element.dispatchEvent(eventStart);

          if (canceled) {
            if (callback) {
              var error = new Error('Changing state (' + (0, _stringify2.default)(data) + ') has been canceled.');
              error.canceled = true;
              callback(error);
            }
          } else {
            var changeStateArgs = [state, detail].filter(Boolean);
            this._changeState.apply(this, (0, _toConsumableArray3.default)(changeStateArgs).concat([function () {
              _this2.element.dispatchEvent(new CustomEvent(_this2.options['eventAfter' + eventNameSuffix], {
                bubbles: true,
                cancelable: true,
                detail: detail
              }));
              if (callback) {
                callback();
              }
            }]));
          }
        }

        /**
         * Tests if change in state should happen or not.
         * Classes inheriting {@link EventedState `EventedState`} should override this function.
         * @function EventedState#shouldStateBeChanged
         * @param {string} [state] The new state. Can be an omitted, which means toggling.
         * @param {Object} [detail]
         *   The object that should be put to event details that is fired before/after changing state.
         *   Can have a `group` property, which specifies what state to be changed.
         * @returns {boolean}
         *   `false` if change in state shouldn't happen, e.g. when the given new state is the same as the current one.
         */

      }]);
      return EventedState;
    }(ToMix);

    /**
     * The callback called once changing state is finished or is canceled.
     * @callback EventedState~changeStateCallback
     * @param {Error} error
     *   An error object with `true` in its `canceled` property if changing state is canceled.
     *   Cancellation happens if the handler of a custom event, that is fired before changing state happens,
     *   calls `.preventDefault()` against the event.
     * @param {boolean} keptState
     *   `true` if the call to {@link EventedState#changeState `.changeState()`} didn't cause actual change in state.
     */

    return EventedState;
  };

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _stringify2 = _interopRequireDefault(_stringify);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});