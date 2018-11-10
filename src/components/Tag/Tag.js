import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { componentsX } from '../../internal/FeatureFlags';

const TYPES = componentsX
  ? {
      basic: 'Component',
      red: 'Red',
      magenta: 'Magenta',
      purple: 'Purple',
      blue: 'Blue',
      cyan: 'Cyan',
      teal: 'Teal',
      green: 'Green',
      'cool-gray': 'Cool-Gray',
      'warm-gray': 'Warm-Gray',
    }
  : {
      beta: 'Beta',
      community: 'Community',
      custom: 'Custom',
      dedicated: 'Dedicated',
      experimental: 'Experimental',
      ibm: 'IBM',
      local: 'Local',
      private: 'Private',
      'third-party': 'Third-Party',
    };

const Tag = ({ children, className, type, ...other }) => {
  const tagClass = `bx--tag--${type}`;
  const tagClasses = classNames('bx--tag', tagClass, className);
  return (
    <span className={tagClasses} {...other}>
      {children || TYPES[type]}
    </span>
  );
};

Tag.propTypes = {
  /**
   * Provide content to be rendered inside of a <Tag>
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify the type of the <Tag>
   */
  type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
};

export const types = Object.keys(TYPES);
export default Tag;
