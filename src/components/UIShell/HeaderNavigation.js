import { settings } from 'carbon-components';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { keys, match, matches, getCharacterFor } from '../../tools/key';

const { prefix } = settings;

export default class HeaderNavigation extends React.Component {
  static propTypes = {
    /**
     * Required props for accessibility label on the underlying menu
     */
    ...AriaLabelPropType,

    /**
     * Optionally provide a custom class to apply to the underlying <nav> node
     */
    className: PropTypes.string,

    /**
     * Provide valid children of HeaderNavigation, for example `HeaderMenuItem`
     * or `HeaderMenu`
     */
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.items = [];
    this.state = {
      selectedIndex: 0,
    };
  }

  handleOnKeyDown = event => {
    if (matches(event, [keys.LEFT, keys.RIGHT, keys.HOME, keys.END])) {
      event.stopPropagation();
      const { which } = event;
      this.setState(
        state => {
          const { selectedIndex } = state;
          const { length } = this.items;
          let nextSelectedIndex = null;

          // We use the modulo (%) operator here to implement a circular
          // buffer so that when we hit the end of the list it wraps to the
          // beginning, and when it hits the beginning of a list it wraps to the
          // end.
          if (match(which, keys.RIGHT)) {
            nextSelectedIndex = (selectedIndex + 1) % length;
          }
          if (match(which, keys.LEFT)) {
            nextSelectedIndex = (selectedIndex + length - 1) % length;
          }
          if (match(which, keys.HOME)) {
            nextSelectedIndex = 0;
          }
          if (match(which, keys.END)) {
            nextSelectedIndex = length - 1;
          }

          return {
            selectedIndex: nextSelectedIndex,
          };
        },
        () => {
          this.items[this.state.selectedIndex].focus();
        }
      );
      return;
    }

    // Support transitioning to next item through typing the first letter of
    // that menu item
    const character = getCharacterFor(event);

    this.setState(state => {
      let nextSelectedIndex = null;
      for (let i = state.selectedIndex; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.textContent[0].toLowerCase() === character.toLowerCase()) {
          item.focus();
          nextSelectedIndex = i;
          break;
        }
      }

      if (nextSelectedIndex) {
        return {
          selectedIndex: nextSelectedIndex,
        };
      }
    });
  };

  /**
   * Handles individual menuitem refs. We assign them to a class instance
   * property so that we can properly manage focus of our children.
   */
  handleItemRef = index => node => {
    this.items[index] = node;
  };

  render() {
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      className: customClassName,
      ...rest
    } = this.props;
    const className = cx(`${prefix}--header__nav`, customClassName);
    // Assign both label strategies in this option, only one should be defined
    // so when we spread that should be the one that is applied to the node
    const accessibilityLabel = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };

    // Since the menubar presents a site navigation system, it is wrapped in a
    // navigation region implemented with a nav element that has an aria-label
    // that matches the label on the menubar.
    // https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
    return (
      <nav {...rest} {...accessibilityLabel} className={className}>
        <ul
          {...accessibilityLabel}
          className={`${prefix}--header__menu-bar`}
          role="menubar"
          onKeyDown={this.handleOnKeyDown}>
          {React.Children.map(children, this._renderNavItem)}
        </ul>
      </nav>
    );
  }

  /**
   * Render an individual menuitem, adding a `ref` for each child inside of
   * `this.items` to properly manage focus. In addition to this focus management,
   * all items receive a `tabIndex: -1`, unless it is the selected item,
   * so the user won't hit a large number of items in their tab sequence when they
   * might not want to go through all the items.
   */
  _renderNavItem = (child, index) => {
    return React.cloneElement(child, {
      ref: this.handleItemRef(index),
      tabIndex: this.state.selectedIndex !== index ? -1 : 0,
    });
  };
}
