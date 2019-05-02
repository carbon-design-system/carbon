/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Search16 from '@carbon/icons-react/lib/search/16';
import { settings } from 'carbon-components';
import ClickListener from '../../internal/ClickListener';

const { prefix } = settings;

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
     * The placeholder text of the `<input>`.
     */
    placeHolderText: PropTypes.string,

    /**
     * The text in the `<label>`.
     */
    labelText: PropTypes.node,

    /**
     * The ID of the `<input>`.
     */
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
      [`${prefix}--search ${prefix}--search--sm ${prefix}--toolbar-search`]: true,
      [`${prefix}--toolbar-search--active`]: this.state.expanded,
      [className]: className,
    });

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div className={searchClasses} role={role}>
          <label htmlFor={id} className={`${prefix}--label`}>
            {labelText}
          </label>
          <input
            {...other}
            type={type}
            className={`${prefix}--search-input`}
            id={id}
            placeholder={placeHolderText}
            ref={input => {
              this.input = input;
            }}
          />
          <button
            className={`${prefix}--toolbar-search__btn`}
            title={labelText}
            onClick={this.expandSearch}>
            <Search16
              className={`${prefix}--search-magnifier`}
              aria-label={labelText}
            />
          </button>
        </div>
      </ClickListener>
    );
  }
}
