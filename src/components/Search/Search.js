import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

export default class Search extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    small: PropTypes.bool,
    placeHolderText: PropTypes.string,
    labelText: PropTypes.node.isRequired,
    id: PropTypes.string,
    closeButtonLabelText: PropTypes.string,
    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    type: 'text',
    small: false,
    placeHolderText: '',
    onChange: () => {},
    light: false,
  };

  state = {
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

  handleChange = evt => {
    this.setState({
      hasContent: evt.target.value !== '',
    });

    this.props.onChange(evt);
  };

  render() {
    const {
      className,
      type,
      id = (this._inputId =
        this._inputId ||
        `search__input__id_${Math.random()
          .toString(36)
          .substr(2)}`),
      placeHolderText,
      labelText,
      closeButtonLabelText,
      small,
      light,
      ...other
    } = this.props;

    const { hasContent } = this.state;

    const searchClasses = classNames({
      'bx--search': true,
      'bx--search--lg': !small,
      'bx--search--sm': small,
      'bx--search--light': light,
      [className]: className,
    });

    const clearClasses = classNames({
      'bx--search-close': true,
      'bx--search-close--hidden': !hasContent,
    });

    return (
      <div className={searchClasses} role="search">
        <Icon
          name="search"
          description={labelText}
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
        <button
          className={clearClasses}
          onClick={this.clearInput}
          type="button"
          aria-label={closeButtonLabelText}>
          <Icon name="close--solid" description={closeButtonLabelText} />
        </button>
      </div>
    );
  }
}
