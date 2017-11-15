import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import CopyButton from '../CopyButton';

const CodeSnippet = ({
  className,
  type,
  children,
  onClick,
  wrappedContentRef,
  ...other
}) => {
  const snippetType =
    type === 'terminal' ? 'bx--snippet--terminal' : 'bx--snippet--code';
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

CodeSnippet.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
  wrappedContentRef: PropTypes.func,
};

CodeSnippet.defaultProps = {
  type: 'terminal',
};

export default CodeSnippet;
