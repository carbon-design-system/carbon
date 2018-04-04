import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import CopyButton from '../CopyButton';

const CodeSnippet = ({
  className,
  type,
  children,
  feedback,
  onClick,
  wrappedContentRef,
  ...other
}) => {
  const snippetType =
    type === 'terminal' ? 'bx--snippet--terminal' : 'bx--snippet--code';
  const wrapperClasses = classNames('bx--snippet', className, snippetType);
  return (
    <div className={wrapperClasses} {...other}>
      <div role="textbox" tabIndex={0} className="bx--snippet-container">
        <code>
          <pre ref={wrappedContentRef}>{children}</pre>
        </code>
      </div>
      <CopyButton onClick={onClick} feedback={feedback} />
    </div>
  );
};

CodeSnippet.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
  feedback: PropTypes.string,
  onClick: PropTypes.func,
  wrappedContentRef: PropTypes.func,
};

CodeSnippet.defaultProps = {
  type: 'terminal',
};

export default CodeSnippet;
