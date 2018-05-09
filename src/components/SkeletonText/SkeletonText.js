import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const SkeletonText = ({
  paragraph,
  lineCount,
  width,
  heading,
  className,
  ...other
}) => {
  const skeletonTextClasses = classNames({
    'bx--skeleton__text': true,
    'bx--skeleton__heading': heading,
    [className]: className,
  });

  const widthNum = parseInt(width, 10);

  const widthPx = width.includes('px');

  const widthPercent = width.includes('%');

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (widthPercent & paragraph) {
    const lines = [];
    for (var i = 0; i < lineCount; i++) {
      const randomWidth = getRandomInt(0, 75) + 'px';
      lines.push(
        <p
          className={skeletonTextClasses}
          style={{ width: `calc(${width} - ${randomWidth})` }}
          key={i}
          {...other}
        />
      );
    }
    return <div>{lines}</div>;
  }

  if (widthPx & paragraph) {
    const lines = [];
    for (var j = 0; j < lineCount; j++) {
      const randomWidth = getRandomInt(widthNum - 75, widthNum) + 'px';
      lines.push(
        <p
          className={skeletonTextClasses}
          style={{ width: randomWidth }}
          key={j}
          {...other}
        />
      );
    }
    return <div>{lines}</div>;
  }
  return (
    <p className={skeletonTextClasses} style={{ width: width }} {...other} />
  );
};

SkeletonText.propTypes = {
  /**
   * will generate multiple lines of text
   */
  paragraph: PropTypes.bool,
  /**
   * the number of lines in a paragraph
   */
  lineCount: PropTypes.number,
  /**
   * width (in px or %) of single line of text or max-width of paragraph lines
   */
  width: PropTypes.string,
  /**
   * generates skeleton text at a larger size
   */
  heading: PropTypes.bool,
  className: PropTypes.string,
};

SkeletonText.defaultProps = {
  paragraph: false,
  width: '100%',
  heading: false,
  lineCount: 3,
};

export default SkeletonText;
