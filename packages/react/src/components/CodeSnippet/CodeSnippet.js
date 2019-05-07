/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import ChevronDown16 from '@carbon/icons-react/lib/chevron--down/16';
import { settings } from 'carbon-components';
import Copy from '../Copy';
import CopyButton from '../CopyButton';
import uid from '../../tools/uniqueId';

const { prefix } = settings;

export default class CodeSnippet extends Component {
  static propTypes = {
    /**
     * Provide the type of Code Snippet
     */
    type: PropTypes.oneOf(['single', 'inline', 'multi']),

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Provide the content of your CodeSnippet as a string
     */
    children: PropTypes.string,

    /**
     * Specify the string displayed when the snippet is copied
     */
    feedback: PropTypes.string,

    /**
     * Specify the description for the Copy Button
     */
    copyButtonDescription: PropTypes.string,

    /**
     * An optional handler to listen to the `onClick` even fired by the Copy
     * Button
     */
    onClick: PropTypes.func,

    /**
     * Specify a label to be read by screen readers on the containing <textbox>
     * node
     */
    copyLabel: PropTypes.string,

    /**
     * Specify a label to be read by screen readers on the containing <textbox>
     * node
     */
    ariaLabel: PropTypes.string,

    /**
     * Specify a string that is displayed when the Code Snippet text is more
     * than 15 lines
     */
    showMoreText: PropTypes.string,

    /**
     * Specify a string that is displayed when the Code Snippet has been
     * interacted with to show more lines
     */
    showLessText: PropTypes.string,

    /**
     * Specify whether you are using the light variant of the Code Snippet,
     * typically used for inline snippest to display an alternate color
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    type: 'single',
    showMoreText: 'Show more',
    showLessText: 'Show less',
  };

  state = {
    shouldShowMoreLessBtn: false,
    expandedCode: false,
  };

  componentDidMount() {
    if (this.codeContent) {
      if (this.codeContent.getBoundingClientRect().height > 255) {
        this.setState({ shouldShowMoreLessBtn: true });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children && this.codeContent) {
      if (this.codeContent.getBoundingClientRect().height > 255) {
        this.setState({ shouldShowMoreLessBtn: true });
      }
    }
  }

  expandCode = () => {
    this.setState({ expandedCode: !this.state.expandedCode });
  };

  render() {
    const {
      className,
      type,
      children,
      feedback,
      onClick,
      ariaLabel,
      copyLabel, //TODO: Merge this prop to `ariaLabel` in `v11`
      copyButtonDescription,
      light,
      showMoreText,
      showLessText,
      ...other
    } = this.props;

    // a unique id generated for aria-describedby
    this.uid = uid();

    const codeSnippetClasses = classNames(className, {
      [`${prefix}--snippet`]: true,
      [`${prefix}--snippet--single`]: type === 'single',
      [`${prefix}--snippet--multi`]: type === 'multi',
      [`${prefix}--snippet--inline`]: type === 'inline',
      [`${prefix}--snippet--expand`]: this.state.expandedCode,
      [`${prefix}--snippet--light`]: light,
    });

    const expandCodeBtnText = this.state.expandedCode
      ? showLessText
      : showMoreText;

    const moreLessBtn = (
      <button
        className={`${prefix}--btn ${prefix}--btn--ghost ${prefix}--btn--sm ${prefix}--snippet-btn--expand`}
        type="button"
        onClick={this.expandCode}>
        <span className={`${prefix}--snippet-btn--text`}>
          {expandCodeBtnText}
        </span>
        <ChevronDown16
          aria-label={expandCodeBtnText}
          className={`${prefix}--icon-chevron--down ${prefix}--snippet__icon`}
          name="chevron--down"
          role="img"
        />
      </button>
    );

    const code = (
      <div
        role="textbox"
        tabIndex={0}
        className={`${prefix}--snippet-container`}
        aria-label={ariaLabel || copyLabel || 'code-snippet'}>
        <code>
          <pre
            ref={codeContent => {
              this.codeContent = codeContent;
            }}>
            {children}
          </pre>
        </code>
      </div>
    );

    const copy = (
      <CopyButton
        onClick={onClick}
        feedback={feedback}
        iconDescription={copyButtonDescription}
      />
    );

    if (type === 'inline') {
      return (
        <Copy
          {...other}
          onClick={onClick}
          aria-label={copyLabel || ariaLabel}
          aria-describedby={this.uid}
          className={codeSnippetClasses}
          feedback={feedback}>
          <code id={this.uid}>{children}</code>
        </Copy>
      );
    }

    if (type === 'single') {
      return (
        <div {...other} className={codeSnippetClasses}>
          {code}
          {copy}
        </div>
      );
    }

    if (!this.state.shouldShowMoreLessBtn && type === 'multi') {
      return (
        <div {...other} className={codeSnippetClasses}>
          {code}
          {copy}
        </div>
      );
    }

    if (this.state.shouldShowMoreLessBtn && type === 'multi') {
      return (
        <div className={codeSnippetClasses} {...other}>
          {code}
          {copy}
          {moreLessBtn}
        </div>
      );
    }
  }
}
