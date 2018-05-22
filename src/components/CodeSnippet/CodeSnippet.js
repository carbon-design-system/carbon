import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Copy from '../Copy';
import CopyButton from '../CopyButton';
import Icon from '../Icon';

export default class CodeSnippet extends Component {
  static propTypes = {
    /**
     * The type of code snippet
     * can be inline, single or multi
     */
    type: PropTypes.oneOf(['single', 'inline', 'multi']),
    className: PropTypes.string,
    children: PropTypes.string,
    feedback: PropTypes.string,
    copyLabel: PropTypes.string,
    onClick: PropTypes.func,
    /**
     * Used with multi snippet only
     * when text is more than 15 lines
     */
    showMoreText: PropTypes.string,
    showLessText: PropTypes.string,
    /**
     * Used with inline snippet only
     * to display alternate color
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
      copyLabel,
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
      <div role="textbox" tabIndex={0} className="bx--snippet-container">
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

    const copy = <CopyButton onClick={onClick} feedback={feedback} />;

    if (type === 'inline') {
      return (
        <Copy
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
