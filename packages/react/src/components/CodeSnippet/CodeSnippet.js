/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { ChevronDown16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import Copy from '../Copy';
import Button from '../Button';
import CopyButton from '../CopyButton';
import getUniqueId from '../../tools/uniqueId';

const { prefix } = settings;

function CodeSnippet({
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
  ...rest
}) {
  const [expandedCode, setExpandedCode] = useState(false);
  const [shouldShowMoreLessBtn, setShouldShowMoreLessBtn] = useState(false);
  const { current: uid } = useRef(getUniqueId());
  const codeContentRef = useRef();

  useLayoutEffect(() => {
    if (codeContentRef.current) {
      const { height } = codeContentRef.current.getBoundingClientRect();
      setShouldShowMoreLessBtn(type === 'multi' && height > 255);
    }
  }, [children, type]);

  const codeSnippetClasses = classNames(className, {
    [`${prefix}--snippet`]: true,
    [`${prefix}--snippet--${type}`]: type,
    [`${prefix}--snippet--expand`]: expandedCode,
    [`${prefix}--snippet--light`]: light,
  });

  const expandCodeBtnText = expandedCode ? showLessText : showMoreText;

  if (type === 'inline') {
    return (
      <Copy
        {...rest}
        onClick={onClick}
        aria-label={copyLabel || ariaLabel}
        aria-describedby={uid}
        className={codeSnippetClasses}
        feedback={feedback}>
        <code id={uid}>{children}</code>
      </Copy>
    );
  }

  return (
    <div {...rest} className={codeSnippetClasses}>
      <div
        role="textbox"
        tabIndex={0}
        className={`${prefix}--snippet-container`}
        aria-label={ariaLabel || copyLabel || 'code-snippet'}>
        <code>
          <pre ref={codeContentRef}>{children}</pre>
        </code>
      </div>
      <CopyButton
        className={`${prefix}--snippet-button`}
        onClick={onClick}
        feedback={feedback}
        iconDescription={copyButtonDescription}
      />
      {shouldShowMoreLessBtn && (
        <Button
          kind="ghost"
          size="small"
          className={`${prefix}--snippet-btn--expand`}
          onClick={() => setExpandedCode(!expandedCode)}>
          <span className={`${prefix}--snippet-btn--text`}>
            {expandCodeBtnText}
          </span>
          <ChevronDown16
            aria-label={expandCodeBtnText}
            className={`${prefix}--icon-chevron--down ${prefix}--snippet__icon`}
            name="chevron--down"
            role="img"
          />
        </Button>
      )}
    </div>
  );
}

CodeSnippet.propTypes = {
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
   * typically used for inline snippet to display an alternate color
   */
  light: PropTypes.bool,
};

CodeSnippet.defaultProps = {
  type: 'single',
  showMoreText: 'Show more',
  showLessText: 'Show less',
};

export default CodeSnippet;
