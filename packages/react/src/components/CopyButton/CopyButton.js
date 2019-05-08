/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import Copy16 from '@carbon/icons-react/lib/copy/16';

const { prefix } = settings;

export default class CopyButton extends Component {
  static propTypes = {
    /**
     * Specify an optional className to be applied to the underlying <button>
     */
    className: PropTypes.string,

    /**
     * Provide a description for the icon representing the copy action that can
     * be read by screen readers
     */
    iconDescription: PropTypes.string,

    /**
     * Specify the string that is displayed when the button is clicked and the
     * content is copied
     */
    feedback: PropTypes.string,

    /**
     * Specify the time it takes for the feedback message to timeout
     */
    feedbackTimeout: PropTypes.number,

    /**
     * Specify an optional `onClick` handler that is called when the underlying
     * <button> is clicked
     */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    iconDescription: 'Copy to clipboard',
    feedback: 'Copied!',
    feedbackTimeout: 2000,
    onClick: () => {},
  };

  state = {
    showFeedback: false,
  };

  /* istanbul ignore next */
  componentWillUnmount() {
    if (typeof this.timeoutId !== 'undefined') {
      clearTimeout(this.timeoutId);
      delete this.timeoutId;
    }
  }

  handleClick = evt => {
    this.setState({ showFeedback: true });
    this.timeoutId = setTimeout(() => {
      this.setState({ showFeedback: false });
    }, this.props.feedbackTimeout);

    this.props.onClick(evt);
  }; // eslint-disable-line no-unused-vars

  render() {
    const {
      iconDescription,
      className,
      feedback,
      feedbackTimeout, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;
    const classNames = classnames(`${prefix}--snippet-button`, className);
    const feedbackClassNames = classnames(`${prefix}--btn--copy__feedback`, {
      [`${prefix}--btn--copy__feedback--displayed`]: this.state.showFeedback,
    });

    return (
      <button
        type="button"
        className={classNames}
        onClick={this.handleClick}
        title={iconDescription}
        {...other}>
        <Copy16
          className={`${prefix}--snippet__icon`}
          aria-label={iconDescription}
        />
        <div className={feedbackClassNames} data-feedback={feedback} />
      </button>
    );
  }
}
