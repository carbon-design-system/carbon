import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { iconSearch } from 'carbon-icons';
import Icon from '../Icon';
import ClickListener from '../../internal/ClickListener';

export default class ToolbarSearch extends Component {
  static propTypes = {
    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The `type` of the `<input>`.
     */
    type: PropTypes.string,

    /**
     * `true` to use the small version of the UI.
     */
    small: PropTypes.bool,

    /**
     * The description of the search icon.
     */
    iconDescription: PropTypes.string,

    /**
     * The placeholder text of the `<input>`.
     */
    placeHolderText: PropTypes.string,

    /**
     * The text in the `<label>`.
     */
    labelText: PropTypes.string,

    /**
     * The ID of the `<input>`.
     */
    id: PropTypes.string,
  };

  static defaultProps = {
    type: 'search',
    id: 'search__input',
    labelText: '',
    iconDescription: 'search',
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
      iconDescription,
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
              icon={iconSearch}
              description={iconDescription}
              className="bx--search-magnifier"
            />
          </button>
        </div>
      </ClickListener>
    );
  }
}
