import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { composeEventHandlers } from '../../tools/events';

export default class ContentSwitcher extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number,
  };

  static defaultProps = {
    selectedIndex: 0,
  };

  static getDerivedStateFromProps({ selectedIndex }, state) {
    const { prevSelectedIndex } = state || {};
    return state && prevSelectedIndex === selectedIndex
      ? null
      : {
          selectedIndex,
          prevSelectedIndex: selectedIndex,
        };
  }

  getChildren(children) {
    return React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        index,
        onClick: composeEventHandlers([
          this.handleChildChange,
          child.props.onClick,
        ]),
        onKeyDown: this.handleChildChange,
        selected: index === this.state.selectedIndex,
      })
    );
  }

  handleChildChange = data => {
    const { selectedIndex } = this.state;
    const { index } = data;

    if (selectedIndex !== index) {
      this.setState({ selectedIndex: index });
      this.props.onChange(data);
    }
  };

  render() {
    const {
      children,
      className,
      selectedIndex, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classes = classNames('bx--content-switcher', className);

    return (
      <div {...other} className={classes}>
        {this.getChildren(children)}
      </div>
    );
  }
}
