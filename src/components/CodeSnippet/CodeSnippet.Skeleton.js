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

export default class CodeSnippetSkeleton extends Component {
  static propTypes = {
    /**
     * The type of code snippet
     * can be single or multi
     */
    type: PropTypes.oneOf(['single', 'multi']),

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,
  };

  static defaultProps = {
    type: 'single',
  };

  render() {
    const { className, type, ...other } = this.props;

    const codeSnippetClasses = classNames(className, {
      [`${prefix}--snippet`]: true,
      [`${prefix}--skeleton`]: true,
      [`${prefix}--snippet--single`]: type === 'single',
      [`${prefix}--snippet--multi`]: type === 'multi',
    });

    if (type === 'single') {
      return (
        <div className={codeSnippetClasses} {...other}>
          <div className={`${prefix}--snippet-container`}>
            <span />
          </div>
        </div>
      );
    }

    if (type === 'multi') {
      return (
        <div className={codeSnippetClasses} {...other}>
          <div className={`${prefix}--snippet-container`}>
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    }
  }
}
