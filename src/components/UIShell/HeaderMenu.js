import { ChevronDownGlyph } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { keys, match, matches } from '../../tools/key';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

const { prefix } = settings;

/**
 * `HeaderMenu` is used to render submenu's in the `Header`. Most often children
 * will be a `HeaderMenuItem`. It handles certain keyboard events to help
 * with managing focus. It also passes along refs to each child so that it can
 * help manage focus state of its children.
 */
class HeaderMenu extends React.Component {
  static propTypes = {
    /**
     * Required props for the accessibility label of the menu
     */
    ...AriaLabelPropType,

    /**
     * Provide a custom ref handler for the menu button
     */
    focusRef: PropTypes.func,

    /**
     * Optionally provide a tabIndex for the underlying menu button
     */
    tabIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      // Used to manage the expansion state of the menu
      expanded: false,
      // Refers to the menuitem that is currently focused
      // Note: children should have `role="menuitem"` on node consuming ref
      selectedIndex: null,
    };
    this.items = [];
  }

  /**
   * Handle expansion state
   */
  handleOnMouseOver = () => {
    this.setState({ expanded: true });
  };

  /**
   * Handle collapse state. The `mouseleave` event is used here instead of
   * `mouseout` because `mouseout` will fire if we move our mouse over
   * menuitems.
   */
  handleOnMouseLeave = () => {
    this.setState({ expanded: false });
  };

  /**
   * Keyboard event handler for the entire menu. Handles the behavior as
   * described in:
   * https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#kbd2_label
   */
  handleOnKeyDown = event => {
    // If we recieve a RIGHT or LEFT key event we should close our menu and
    // allow the event to propagate to the corresponding parent menubar or menu
    if (matches(event, [keys.RIGHT, keys.LEFT])) {
      this.setState({ expanded: false, selectedIndex: null });
      return;
    }

    // If we receive an ESC key event we want to close the menu and restore
    // focus to the menu button
    if (match(event, keys.ESC)) {
      event.stopPropagation();
      this.setState({ expanded: false, selectedIndex: null }, () => {
        this.menuButtonRef.focus();
      });
      return;
    }

    // If we recieve a HOME or END keyboard event we want to prevent the default
    // behavior (which is to scroll to the beginning or end of the document) and
    // also stop the event from propagating.
    //
    // We also want to update the selectedIndex value accordingly and then focus
    // the corresponding menuitem.
    //
    // Our final check on selectedIndex is to make sure that we don't cancel the
    // HOME or END events for the menubar. We should propagate these events if
    // our menu is not open.
    if (
      matches(event, [keys.HOME, keys.END]) &&
      this.state.selectedIndex !== null
    ) {
      event.preventDefault();
      event.stopPropagation();
      const selectedIndex = match(event, keys.HOME) ? 0 : this.items.length - 1;
      this.setState({ selectedIndex }, () => {
        this.items[this.state.selectedIndex].focus();
      });
      return;
    }

    if (matches(event, [keys.DOWN, keys.UP])) {
      event.stopPropagation();
      const { which } = event;
      this.setState(
        state => {
          // We use the modulo (%) operator here to implement a circular
          // buffer so that when we hit the end of the list it wraps to the
          // beginning, and when it hits the beginning of a list it wraps to the
          // end.
          const selectedIndex = match(which, keys.DOWN)
            ? (state.selectedIndex + 1) % this.items.length
            : (state.selectedIndex + this.items.length - 1) % this.items.length;
          return {
            selectedIndex,
          };
        },
        () => {
          this.items[this.state.selectedIndex].focus();
        }
      );
    }
  };

  /**
   * Handles keyboard events on the menu button. Only needs to support ArrowUp
   * and ArrowDown and should set the focus position accordingly on the child
   * item.
   *
   * We stop this event from propagating because a parent menubar or menu does
   * not need this event.
   */
  handleMenuButtonKeyDown = event => {
    if (matches(event, [keys.DOWN, keys.UP])) {
      event.stopPropagation();
      const selectedIndex =
        event.which === keys.DOWN ? 0 : this.items.length - 1;
      this.setState(
        {
          expanded: true,
          selectedIndex,
        },
        () => {
          this.items[this.state.selectedIndex].focus();
        }
      );
    }
  };

  /**
   * Handle our blur event from our underlying menuitems. Will mostly be used
   * for toggling the expansion status of our menu in response to a user
   * clicking off of the menu or menubar.
   */
  handleOnBlur = event => {
    // Rough guess for a blur event that is triggered outside of our menu or
    // menubar context
    if (!event.relatedTarget) {
      this.setState({ expanded: false, selectedIndex: null });
    }
  };

  /**
   * ref handler for our menu button. This node is represented by the
   * `role="menu"` attribute. If we are supplied a `focusRef` prop, we also
   * forward along the node.
   *
   * This is useful when this component is a child in a
   * menu or menubar as it will allow the parent to explicitly focus the menu
   * button node when that child should receive focus.
   */
  handleMenuButtonRef = node => {
    if (this.props.focusRef) {
      this.props.focusRef(node);
    }
    this.menuButtonRef = node;
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
      className: customClassName,
      children,
      tabIndex,
    } = this.props;
    const accessibilityLabel = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };
    const className = cx(`${prefix}--header__submenu`, customClassName);
    // Notes on eslint comments and based on the examples in:
    // https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
    // - The focus is handled by the <a> menuitem, onMouseOver is for mouse
    // users
    // - aria-haspopup can definitely have the value "menu"
    // - aria-expanded is on their example node with role="menuitem"
    // - href can be set to javascript:void(0), ideally this will be a button
    return (
      <li // eslint-disable-line jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        className={className}
        onKeyDown={this.handleOnKeyDown}
        onMouseOver={this.handleOnMouseOver}
        onMouseLeave={this.handleOnMouseLeave}
        onBlur={this.handleOnBlur}>
        <a // eslint-disable-line jsx-a11y/role-supports-aria-props,jsx-a11y/anchor-is-valid
          aria-haspopup="menu" // eslint-disable-line jsx-a11y/aria-proptypes
          aria-expanded={this.state.expanded}
          className={cx(
            `${prefix}--header__menu-item`,
            `${prefix}--header__menu-title`
          )}
          href="javascript:void(0)"
          ref={this.handleMenuButtonRef}
          role="menuitem"
          tabIndex={tabIndex}
          onKeyDown={this.handleMenuButtonKeyDown}>
          {ariaLabel}
          <ChevronDownGlyph className={`${prefix}--header__menu-arrow`} />
        </a>
        <ul
          {...accessibilityLabel}
          className={`${prefix}--header__menu`}
          role="menu">
          {React.Children.map(children, this._renderMenuItem)}
        </ul>
      </li>
    );
  }

  /**
   * Render an individual menuitem, passing along `role: 'none'` because the
   * host node <li> doesn't apply when in a <ul> with `role="menu"` and so we
   * need to revert the semantics.
   *
   * We also capture the `ref` for each child inside of `this.items` to properly
   * manage focus. In addition to this focus management, all items receive a
   * `tabIndex: -1` so the user won't hit a large number of items in their tab
   * sequence when they might not want to go through all the items.
   */
  _renderMenuItem = (item, index) => {
    return React.cloneElement(item, {
      ref: this.handleItemRef(index),
      role: 'none',
      tabIndex: index !== 0 ? -1 : 0,
    });
  };
}

export default React.forwardRef((props, ref) => {
  return <HeaderMenu {...props} focusRef={ref} />;
});
