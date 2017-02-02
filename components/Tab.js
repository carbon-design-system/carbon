import React, { PropTypes } from 'react';
import classNames from 'classnames';

class Tab extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    handleTabClick: PropTypes.func,
    handleTabAnchorFocus: PropTypes.func,
    handleTabKeyDown: PropTypes.func,
    href: PropTypes.string,
    index: PropTypes.number,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    selected: PropTypes.bool,
    tabIndex: PropTypes.number,
  }

  static defaultProps = {
    tabIndex: 0,
    href: '#',
    selected: false,
    onClick: () => {},
    onKeyDown: () => {},
  }

  setTabFocus(evt) {
    const leftKey = 37;
    const rightKey = 39;
    if (evt.which === leftKey) {
      this.props.handleTabAnchorFocus(this.props.index - 1);
    } else if (evt.which === rightKey) {
      this.props.handleTabAnchorFocus(this.props.index + 1);
    } else {
      return;
    }
  }

  render() {
    const {
      className,
      handleTabClick,
      handleTabAnchorFocus, // eslint-disable-line
      handleTabKeyDown,
      href,
      index,
      label,
      selected,
      tabIndex,
      onClick,
      onKeyDown,
      ...other,
    } = this.props;

    const classes = classNames(
      'bx--tabs__nav-item',
      { 'bx--tabs--selected': selected },
      className,
    );

    const props = {
      li: {
        className: classes,
        onClick: (evt) => {
          handleTabClick(index, label, evt);
          onClick(evt);
        },
        onKeyDown: (evt) => {
          this.setTabFocus(evt);
          handleTabKeyDown(index, label, evt);
          onKeyDown(evt);
        },
        role: 'presentation',
        selected,
      },
      anchor: {
        className: 'bx--tabs__nav-link',
        href,
        ref: 'tabAnchor',
        role: 'tab',
        tabIndex,
      },
    };

    return (
      <li {...other} {...props.li}>
        <a {...props.anchor}>{label}</a>
      </li>
    );
  }
}

export default Tab;
