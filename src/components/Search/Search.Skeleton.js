import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

export default class SearchSkeleton extends Component {
  static propTypes = {
    small: PropTypes.bool,
  };

  static defaultProps = {
    small: false,
  };

  render() {
    const { small, id } = this.props;

    const searchClasses = classNames({
      'bx--skeleton': true,
      'bx--search--lg': !small,
      'bx--search--sm': small,
    });

    return (
      <div className={searchClasses} role="search">
        <label htmlFor={id} className="bx--label" />
        <div className="bx--search-input" />
      </div>
    );
  }
}
