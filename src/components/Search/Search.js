import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

export default class Search extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.string,
    small: PropTypes.bool,
    placeHolderText: PropTypes.string,
    labelText: PropTypes.string,
    id: PropTypes.string,
    searchButtonLabelText: PropTypes.string,
    layoutButtonLabelText: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
    small: false,
    placeHolderText: '',
    onChange: () => {},
    labelText: 'Provide labelText',
  };

  state = {
    format: 'list',
    hasContent: this.props.value || this.props.defaultValue || false,
  };

  clearInput = evt => {
    if (!this.props.value) {
      this.input.value = '';
      this.props.onChange(evt);
    } else {
      const clearedEvt = Object.assign({}, evt.target, {
        target: {
          value: '',
        },
      });
      this.props.onChange(clearedEvt);
    }

    this.setState({ hasContent: false }, () => this.input.focus());
  };

  toggleLayout = () => {
    if (this.state.format === 'list') {
      this.setState({
        format: 'grid',
      });
    } else {
      this.setState({
        format: 'list',
      });
    }
  };

  handleChange = evt => {
    this.setState({
      hasContent: evt.target.value !== '',
    });

    this.props.onChange(evt);
  };

  // eslint-disable-next-line consistent-return
  searchFilterBtn = () => {
    if (!this.props.small) {
      return (
        <button
          className="bx--search-button"
          type="button"
          aria-label={this.props.searchButtonLabelText}>
          <Icon
            name="filter--glyph"
            description="filter"
            className="bx--search-filter"
          />
        </button>
      );
    }
  };

  // eslint-disable-next-line consistent-return
  searchLayoutBtn = () => {
    if (!this.props.small) {
      return (
        <button
          className="bx--search-button"
          type="button"
          onClick={this.toggleLayout}
          aria-label={this.props.layoutButtonLabelText}>
          {this.state.format === 'list' ? (
            <div className="bx--search__toggle-layout__container">
              <Icon
                name="list"
                description="list"
                className="bx--search-view"
              />
            </div>
          ) : (
            <div className="bx--search__toggle-layout__container">
              <Icon
                name="grid"
                description="toggle-layout"
                className="bx--search-view"
              />
            </div>
          )}
        </button>
      );
    }
  };

  render() {
    const {
      className,
      type,
      id,
      placeHolderText,
      labelText,
      small,
      ...other
    } = this.props;

    const { hasContent } = this.state;

    const searchClasses = classNames({
      'bx--search bx--search-with-options': true,
      'bx--search--lg': !small,
      'bx--search--sm': small,
      [className]: className,
    });

    const clearClasses = classNames({
      'bx--search-close': true,
      'bx--search-close--hidden': !hasContent,
    });

    return (
      <div className={searchClasses} role="search">
        <Icon
          name="search--glyph"
          description="search"
          className="bx--search-magnifier"
        />
        <label htmlFor={id} className="bx--label">
          {labelText}
        </label>
        <input
          {...other}
          type={type}
          className="bx--search-input"
          id={id}
          placeholder={placeHolderText}
          onChange={this.handleChange}
          ref={input => {
            this.input = input;
          }}
        />
        <Icon
          name="close--glyph"
          description="close"
          className={clearClasses}
          onClick={this.clearInput}
        />
        {this.searchFilterBtn()}
        {this.searchLayoutBtn()}
      </div>
    );
  }
}
