/*
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PageHeader extends Component {
  static propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    const { label, title } = this.props;

    const labelContent = label ? (
      <h4 className="page-header__label">{label}</h4>
    ) : (
      <div className="page-header__label" />
    );

    return (
      <div className="page-header">
        {labelContent}
        <h1 id="page-title" className="page-header__title">
          {title}
        </h1>
      </div>
    );
  }
}

export default PageHeader;
