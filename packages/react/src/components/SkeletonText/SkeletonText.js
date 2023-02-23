/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

const randoms = [0.973051493507435, 0.15334737213558558, 0.5671034553053769];

function getRandomInt(min, max, n) {
  return Math.floor(randoms[n % 3] * (max - min + 1)) + min;
}

const SkeletonText = ({
  paragraph,
  lineCount,
  width,
  heading,
  className,
  ...other
}) => {
  const prefix = usePrefix();
  const skeletonTextClasses = classNames({
    [`${prefix}--skeleton__text`]: true,
    [`${prefix}--skeleton__heading`]: heading,
    [className]: className,
  });

  const widthNum = parseInt(width, 10);

  const widthPx = width.includes('px');

  const widthPercent = width.includes('%');

  let lineCountNumber;
  if (!paragraph) {
    lineCountNumber = '1';
  } else {
    lineCountNumber = lineCount;
  }

  const refs = useRef([]);

  useIsomorphicEffect(() => {
    refs.current.map((item, j) => {
      const randomPercentWidth = getRandomInt(0, 75, j) + 'px';
      const randomPxWidth = getRandomInt(widthNum - 75, widthNum, j) + 'px';

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

  const lines = [];
  for (var i = 0; i < lineCountNumber; i++) {
    lines.push(
      <p
        className={skeletonTextClasses}
        key={i}
        ref={(el) => (refs.current = [...refs.current, el])}
        {...other}
      />
    );
  }

  if (lineCountNumber !== '1') {
    return <div>{lines}</div>;
  } else {
    return lines;
  }
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
