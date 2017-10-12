import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import CopyButton from './CopyButton';

const propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
  wrappedContentRef: PropTypes.func,
};

const defaultProps = {
  type: 'terminal',
};

const CodeSnippet = ({
  className,
  type,
  children,
  onClick,
  wrappedContentRef,
  ...other,
}) => {
  const snippetType = type === 'terminal'
    ? 'bx--snippet--terminal'
    : 'bx--snippet--code';
  const wrapperClasses = classNames('bx--snippet', className, snippetType);
  return (
    <div className={wrapperClasses} {...other}>
      <div className="bx--snippet-container">
        <code>
          <pre ref={wrappedContentRef}>{children}</pre>
        </code>
      </div>
      <CopyButton onClick={onClick} />
    </div>
  );
};

CodeSnippet.propTypes = propTypes;
CodeSnippet.defaultProps = defaultProps;

export default CodeSnippet;
