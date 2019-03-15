/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class SearchSkeleton extends Component {
  static propTypes = {
    /**
     * Specify whether the Search should be a small variant
     */
    small: PropTypes.bool,
  };

  static defaultProps = {
    small: false,
  };

  render() {
    const { small, id } = this.props;

    const searchClasses = classNames({
      [`${prefix}--skeleton`]: true,
      [`${prefix}--search--xl`]: !small,
      [`${prefix}--search--sm`]: small,
    });

    return (
      <div className={searchClasses} role="search">
        {
          /* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
          <label htmlFor={id} className={`${prefix}--label`} />
        }
        <div className={`${prefix}--search-input`} />
      </div>
    );
  }
}
