/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { SkeletonText } from '../SkeletonText';

interface AiSkeletonTextProps {
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

const AiSkeletonText = ({ className, ...rest }: AiSkeletonTextProps) => {
  const prefix = usePrefix();
  const aiSkeletonTextClasses = classNames(className, {
    [`${prefix}--skeleton__text--ai`]: true,
  });

  return <SkeletonText className={aiSkeletonTextClasses} {...rest} />;
};

AiSkeletonText.propTypes = {
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

export default AiSkeletonText;
