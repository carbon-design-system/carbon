import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export default class Tab extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    handleTabClick: PropTypes.func,
    handleTabAnchorFocus: PropTypes.func,
    handleTabKeyDown: PropTypes.func,
    href: PropTypes.string.isRequired,
    index: PropTypes.number,
    label: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    tabIndex: PropTypes.number.isRequired,
  };

  static defaultProps = {
    role: 'presentation',
    label: 'provide a label',
    tabIndex: 0,
    href: '#',
    selected: false,
    onClick: () => {},
    onKeyDown: () => {},
  };

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
      ...other
    } = this.props;

    const classes = classNames(
      'bx--tabs__nav-item',
      { 'bx--tabs__nav-item--selected': selected },
      className
    );

    return (
      <li
        {...other}
        tabIndex={-1}
        className={classes}
        onClick={evt => {
          handleTabClick(index, label, evt);
          onClick(evt);
        }}
        onKeyDown={evt => {
          this.setTabFocus(evt);
          handleTabKeyDown(index, label, evt);
          onKeyDown(evt);
        }}
        role="presentation"
        selected={selected}>
        <a
          className="bx--tabs__nav-link"
          href={href}
          role="tab"
          tabIndex={tabIndex}
          ref="tabAnchor">
          {label}
        </a>
      </li>
    );
  }
}
