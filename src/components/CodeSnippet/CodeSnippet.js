import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Copy from '../Copy';
import CopyButton from '../CopyButton';
import Icon from '../Icon';

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
     * Specify the label used for the Copy Button
     */
    copyLabel: PropTypes.string,

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
      copyLabel,
      copyButtonDescription,
      light,
      showMoreText,
      showLessText,
      ...other
    } = this.props;

    const codeSnippetClasses = classNames(className, {
      'bx--snippet': true,
      'bx--snippet--single': type === 'single',
      'bx--snippet--multi': type === 'multi',
      'bx--snippet--inline': type === 'inline',
      'bx--snippet--expand': this.state.expandedCode,
      'bx--snippet--light': light,
    });

    const expandCodeBtnText = this.state.expandedCode
      ? showLessText
      : showMoreText;

    const moreLessBtn = (
      <button
        className="bx--btn bx--btn--ghost bx--btn--sm bx--snippet-btn--expand"
        type="button"
        onClick={this.expandCode}>
        <span className="bx--snippet-btn--text">{expandCodeBtnText}</span>
        <Icon
          aria-hidden="true"
          alt={expandCodeBtnText}
          name="chevron--down"
          description={expandCodeBtnText}
          className="bx--icon-chevron--down"
        />
      </button>
    );

    const code = (
      <div
        role="textbox"
        tabIndex={0}
        className="bx--snippet-container"
        aria-label={ariaLabel ? ariaLabel : 'code-snippet'}>
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
          className={codeSnippetClasses}
          aria-label={copyLabel}
          feedback={feedback}>
          <code>{children}</code>
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
