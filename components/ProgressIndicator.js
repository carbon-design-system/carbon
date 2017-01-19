import React, { PropTypes, Children } from 'react';
import classnames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/progress-indicator/progress-indicator.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const ProgressIndicator = ({ children, className, ...other }) => {
  const classNames = classnames('bx--progress-indicator', className);
  let complete = true;
  // Marks all ProgressIndicatorStep children as being complete until the active step is found
  const mappedChildren = Children.map(children, child => {
    if (child.props.active) {
      complete = false;
    }
    return React.cloneElement(child, {
      complete,
    });
  });
  return <ul className={classNames} {...other}>{mappedChildren}</ul>;
};

ProgressIndicator.propTypes = propTypes;

export default ProgressIndicator;
