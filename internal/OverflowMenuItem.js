import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/overflow-menu/overflow-menu.scss';

class OverflowMenuItem extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    itemText: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    isDelete: React.PropTypes.bool,
    isLastItem: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
  }

  static defaultProps = {
    type: 'button',
    isDelete: false,
    isLastItem: false,
  }

  render() {
    const {
      itemText,
      isDelete,
      isLastItem,
      ...other,
    } = this.props;

    const overflowMenuItemClasses = classNames({
      'bx--overflow-menu__btn': true,
      'bx--overflow-menu__btn--delete': isDelete,
      [this.props.className]: this.props.className,
    });

    const overflowMenuItem = isLastItem
    ? <span>
        <hr />
        <li>
          <button
            {...other}
            type="button"
            className={overflowMenuItemClasses}
          >{itemText}
          </button>
        </li>
      </span>
    : <li>
        <button
          {...other}
          type="button"
          className={overflowMenuItemClasses}
        >{itemText}
        </button>
      </li>
    ;

    return overflowMenuItem;
  }
}

export default OverflowMenuItem;
