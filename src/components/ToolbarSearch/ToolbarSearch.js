import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import ClickListener from '../../internal/ClickListener';

export default class ToolbarSearch extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.string,
    small: PropTypes.bool,
    placeHolderText: PropTypes.string,
    labelText: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    type: 'search',
    id: 'search__input',
    labelText: '',
    placeHolderText: '',
    role: 'search',
  };

  state = {
    expanded: false,
  };

  expandSearch = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
    this.input.focus();
  };

  handleClickOutside = () => {
    this.setState({
      expanded: false,
    });
  };

  render() {
    const {
      className,
      type,
      id,
      placeHolderText,
      labelText,
      role,
      ...other
    } = this.props;

    const searchClasses = classNames({
      'bx--search bx--search--sm bx--toolbar-search': true,
      'bx--toolbar-search--active': this.state.expanded,
      [className]: className,
    });

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div className={searchClasses} role={role}>
          <label htmlFor={id} className="bx--label">
            {labelText}
          </label>
          <input
            {...other}
            type={type}
            className="bx--search-input"
            id={id}
            placeholder={placeHolderText}
            ref={input => {
              this.input = input;
            }}
          />
          <button
            className="bx--toolbar-search__btn"
            onClick={this.expandSearch}>
            <Icon
              name="search"
              description="search"
              className="bx--search-magnifier"
            />
          </button>
        </div>
      </ClickListener>
    );
  }
}
