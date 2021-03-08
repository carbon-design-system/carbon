/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import useResizeObserver from 'use-resize-observer/polyfilled';
import debounce from 'lodash.debounce';
import { ChevronDown16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import Copy from '../Copy';
import Button from '../Button';
import CopyButton from '../CopyButton';
import getUniqueId from '../../tools/uniqueId';

const { prefix } = settings;

const defaultMaxClosedNumberOfRows = 15;
const defaultMaxExpandedNumberOfRows = 30;
const defaultMinClosedNumberOfRows = 3;
const defaultMinExpandedNumberOfRows = 16;
const defaultShowLessText = 'Show less';
const defaultShowMoreText = 'Show more';
const defaultType = 'single';
const defaultWrapText = false;

const rowHeightInPixels = 16;

function CodeSnippet({
  ariaLabel,
  children,
  className,
  copyButtonDescription,
  copyLabel, //TODO: Merge this prop to `ariaLabel` in `v11`
  disabled,
  feedback,
  hideCopyButton,
  light,
  maxClosedNumberOfRows = defaultMaxClosedNumberOfRows,
  maxExpandedNumberOfRows = defaultMaxExpandedNumberOfRows,
  minClosedNumberOfRows = defaultMinClosedNumberOfRows,
  minExpandedNumberOfRows = defaultMinExpandedNumberOfRows,
  onClick,
  showLessText = defaultShowLessText,
  showMoreText = defaultShowMoreText,
  type = defaultType,
  wrapText = defaultWrapText,
  ...rest
}) {
  const [expandedCode, setExpandedCode] = useState(false);
  const [shouldShowMoreLessBtn, setShouldShowMoreLessBtn] = useState(false);
  const { current: uid } = useRef(getUniqueId());
  const codeContentRef = useRef();
  const codeContainerRef = useRef();
  const [hasLeftOverflow, setHasLeftOverflow] = useState(false);
  const [hasRightOverflow, setHasRightOverflow] = useState(false);
  const getCodeRef = useCallback(() => {
    if (type === 'single') {
      return codeContainerRef;
    }
    if (type === 'multi') {
      return codeContentRef;
    }
  }, [type]);

  const getCodeRefDimensions = useCallback(() => {
    const {
      clientWidth: codeClientWidth,
      scrollLeft: codeScrollLeft,
      scrollWidth: codeScrollWidth,
    } = getCodeRef().current;

    return {
      horizontalOverflow: codeScrollWidth > codeClientWidth,
      codeClientWidth,
      codeScrollWidth,
      codeScrollLeft,
    };
  }, [getCodeRef]);

  const handleScroll = useCallback(() => {
    if (
      type === 'inline' ||
      (type === 'single' && !codeContainerRef?.current) ||
      (type === 'multi' && !codeContentRef?.current)
    ) {
      return;
    }

    const {
      horizontalOverflow,
      codeClientWidth,
      codeScrollWidth,
      codeScrollLeft,
    } = getCodeRefDimensions();

    setHasLeftOverflow(horizontalOverflow && !!codeScrollLeft);
    setHasRightOverflow(
      horizontalOverflow && codeScrollLeft + codeClientWidth !== codeScrollWidth
    );
  }, [type, getCodeRefDimensions]);

  useResizeObserver(
    {
      ref: getCodeRef(),
      onResize: () => {
        if (codeContentRef?.current && type === 'multi') {
          const { height } = codeContentRef.current.getBoundingClientRect();

          if (height > maxClosedNumberOfRows * rowHeightInPixels) {
            setShouldShowMoreLessBtn(
              maxClosedNumberOfRows < minExpandedNumberOfRows
            );
          } else {
            setShouldShowMoreLessBtn(false);
            setExpandedCode(false);
          }
        }
        if (
          (codeContentRef?.current && type === 'multi') ||
          (codeContainerRef?.current && type === 'single')
        ) {
          debounce(handleScroll, 200);
        }
      },
    },
    [type, maxClosedNumberOfRows, minExpandedNumberOfRows, rowHeightInPixels]
  );

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  const codeSnippetClasses = classNames(className, `${prefix}--snippet`, {
    [`${prefix}--snippet--${type}`]: type,
    [`${prefix}--snippet--disabled`]: type !== 'inline' && disabled,
    [`${prefix}--snippet--expand`]: expandedCode,
    [`${prefix}--snippet--light`]: light,
    [`${prefix}--snippet--no-copy`]: hideCopyButton,
    [`${prefix}--snippet--wraptext`]: wrapText,
  });

  if (type === 'inline') {
    if (hideCopyButton) {
      return (
        <span className={codeSnippetClasses}>
          <code id={uid}>{children}</code>
        </span>
      );
    }

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

  const expandCodeBtnText = expandedCode ? showLessText : showMoreText;

  const containerStyle =
    type !== 'multi'
      ? {}
      : {
          style: {
            maxHeight:
              (expandedCode ? maxExpandedNumberOfRows : maxClosedNumberOfRows) *
              rowHeightInPixels,
            minHeight:
              (expandedCode ? minExpandedNumberOfRows : minClosedNumberOfRows) *
              rowHeightInPixels,
          },
        };

  return (
    <div {...rest} className={codeSnippetClasses}>
      <div
        ref={codeContainerRef}
        role={type === 'single' ? 'textbox' : null}
        tabIndex={type === 'single' && !disabled ? 0 : null}
        className={`${prefix}--snippet-container`}
        aria-label={ariaLabel || copyLabel || 'code-snippet'}
        onScroll={(type === 'single' && handleScroll) || null}
        {...containerStyle}>
        <code>
          <pre
            ref={codeContentRef}
            onScroll={(type === 'multi' && handleScroll) || null}>
            {children}
          </pre>
        </code>
      </div>
      {/**
       * left overflow indicator must come after the snippet due to z-index and
       * snippet focus border overlap
       */}
      {hasLeftOverflow && (
        <div className={`${prefix}--snippet__overflow-indicator--left`} />
      )}
      {hasRightOverflow && (
        <div className={`${prefix}--snippet__overflow-indicator--right`} />
      )}
      {!hideCopyButton && (
        <CopyButton
          disabled={disabled}
          onClick={onClick}
          feedback={feedback}
          iconDescription={copyButtonDescription}
        />
      )}
      {shouldShowMoreLessBtn && (
        <Button
          kind="ghost"
          size="field"
          className={`${prefix}--snippet-btn--expand`}
          disabled={disabled}
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
   * Specify a label to be read by screen readers on the containing <textbox> node
   */
  ariaLabel: PropTypes.string,

  /**
   * Provide the content of your CodeSnippet as a string
   */
  children: PropTypes.string,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the description for the Copy Button
   */
  copyButtonDescription: PropTypes.string,

  /**
   * Specify a label to be read by screen readers on the containing <textbox> node
   */
  copyLabel: PropTypes.string,

  /**
   * Specify whether or not the CodeSnippet should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the string displayed when the snippet is copied
   */
  feedback: PropTypes.string,

  /**
   * Specify whether or not a copy button should be used/rendered.
   */
  hideCopyButton: PropTypes.bool,

  /**
   * Specify whether you are using the light variant of the Code Snippet,
   * typically used for inline snippet to display an alternate color
   */
  light: PropTypes.bool,

  /**
   * Specify the maximum number of rows to be shown when in closed view
   */
  maxClosedNumberOfRows: PropTypes.number,

  /**
   * Specify the maximum number of rows to be shown when in expanded view
   */
  maxExpandedNumberOfRows: PropTypes.number,

  /**
   * Specify the minimum number of rows to be shown when in closed view
   */
  minClosedNumberOfRows: PropTypes.number,

  /**
   * Specify the minimum number of rows to be shown when in expanded view
   */
  minExpandedNumberOfRows: PropTypes.number,

  /**
   * An optional handler to listen to the `onClick` even fired by the Copy Button
   */
  onClick: PropTypes.func,

  /**
   * Specify a string that is displayed to close the Code Snippet
   */
  showLessText: PropTypes.string,

  /**
   * Specify a string that is displayed to expand the Code Snippet
   */
  showMoreText: PropTypes.string,

  /**
   * Provide the type of Code Snippet
   */
  type: PropTypes.oneOf(['single', 'inline', 'multi']),

  /**
   * Specify whether or not to wrap the text.
   */
  wrapText: PropTypes.bool,
};

export default CodeSnippet;
