/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { MutableRefObject, ReactNode, useRef } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

const randoms = [0.973051493507435, 0.15334737213558558, 0.5671034553053769];

function getRandomInt(min: number, max: number, n: number) {
  return Math.floor(randoms[n % 3] * (max - min + 1)) + min;
}

interface SkeletonTextProps {
  /**
   * Specify an optional className to be applied to the container node.
   */
  className?: string;

  /**
   * Generates skeleton text at a larger size.
   */
  heading?: boolean;

  /**
   * The number of lines shown if paragraph is true.
   */
  lineCount?: number;

  /**
   * Set this to true to generate multiple lines of text.
   */
  paragraph?: boolean;

  /**
   * Width (in px or %) of single line of text or max-width of paragraph lines.
   */
  width?: string;
}

const SkeletonText = ({
  paragraph = false,
  lineCount = 3,
  width = '100%',
  heading = false,
  className = '',
  ...rest
}: SkeletonTextProps) => {
  const prefix = usePrefix();
  const skeletonTextClasses = classNames({
    [`${prefix}--skeleton__text`]: true,
    [`${prefix}--skeleton__heading`]: heading,
    [className]: className,
  });

  const widthNum = parseInt(width, 10);
  const widthPx = width.includes('px');
  const widthPercent = width.includes('%');

  let lineCountNumber = 1;

  if (paragraph) {
    lineCountNumber = lineCount;
  }

  const refs: MutableRefObject<(HTMLParagraphElement | null)[]> = useRef([]);

  useIsomorphicEffect(() => {
    refs.current.map((item, j) => {
      const randomPercentWidth = getRandomInt(0, 75, j) + 'px';
      const randomPxWidth =
        getRandomInt(Math.max(widthNum - 75, 0), widthNum, j) + 'px';

      if (item) {
        if (widthPercent && paragraph) {
          item.style.width = `calc(${width} - ${randomPercentWidth})`;
        } else if (widthPx && paragraph) {
          item.style.width = randomPxWidth;
        } else {
          item.style.width = width;
        }
      }
    });
  }, [
    lineCountNumber,
    paragraph,
    refs,
    width,
    widthNum,
    widthPercent,
    widthPx,
  ]);

  const lines: ReactNode[] = [];
  for (let i = 0; i < lineCountNumber; i++) {
    lines.push(
      <p
        className={skeletonTextClasses}
        key={i}
        ref={(el) => (refs.current = [...refs.current, el])}
        {...rest}
      />
    );
  }

  if (lineCountNumber !== 1) {
    return <div>{lines}</div>;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{lines}</>;
};

SkeletonText.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
  /**
   * generates skeleton text at a larger size
   */
  heading: PropTypes.bool,
  /**
   * the number of lines shown if paragraph is true
   */
  lineCount: PropTypes.number,
  /**
   * will generate multiple lines of text
   */
  paragraph: PropTypes.bool,
  /**
   * width (in px or %) of single line of text or max-width of paragraph lines
   */
  width: PropTypes.string,
};

SkeletonText.defaultProps = {
  paragraph: false,
  width: '100%',
  heading: false,
  lineCount: 3,
};

export default SkeletonText;
