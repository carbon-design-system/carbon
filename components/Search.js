import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from './Icon';

class Search extends Component {
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
  };

  state = {
    format: 'list',
    value: '',
    hasContent: false,
  };

  toggleClearIcon = evt => {
    const hasContent = evt.target.value.length > 0;
    this.setState({
      hasContent,
      value: evt.target.value,
    });
  };

  clearInput = () => {
    this.setState({
      value: '',
      hasContent: false,
    });
    this.input.focus();
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

  // eslint-disable-next-line consistent-return
  searchFilterBtn = () => {
    if (!this.props.small) {
      return (
        <button
          className="bx--search-button"
          type="button"
          aria-label={this.props.searchButtonLabelText}
        >
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
          aria-label={this.props.layoutButtonLabelText}
        >
          {this.state.format === 'list'
            ? <div className="bx--search__toggle-layout__container">
                <Icon
                  name="list"
                  description="list"
                  className="bx--search-view"
                />
              </div>
            : <div className="bx--search__toggle-layout__container">
                <Icon
                  name="grid"
                  description="toggle-layout"
                  className="bx--search-view"
                />
              </div>}
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

    const searchClasses = classNames({
      'bx--search bx--search-with-options': true,
      'bx--search--lg': !small,
      'bx--search--sm': small,
      [className]: className,
    });

    const clearClasses = classNames({
      'bx--search-close': true,
      'bx--search-close--hidden': !this.state.hasContent,
    });

    return (
      <div className={searchClasses} role="search">
        <Icon
          name="search--glyph"
          description="search"
          className="bx--search-magnifier"
        />
        <label htmlFor={id} className="bx--label">{labelText}</label>
        <input
          {...other}
          type={type}
          className="bx--search-input"
          id={id}
          placeholder={placeHolderText}
          value={this.state.value}
          onInput={this.toggleClearIcon}
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

export default Search;
