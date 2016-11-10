import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/loading/loading.scss';

const propTypes = {
  active: React.PropTypes.bool,
  className: React.PropTypes.string,
};

const defaultProps = {
  active: true,
};

const Loading = ({ className, active, ...other }) => {
  let classToAdd;

  if (window.ActiveXObject || 'ActiveXObject' in window) {
    classToAdd = active ? 'bx--loading--ie' : 'bx--loading--ie bx--loading--stop--ie';
  } else {
    classToAdd = active ? 'bx--loading' : 'bx--loading bx--loading--stop';
  }

  const loadingClasses = classNames(
    classToAdd,
    [className]: className
  );

  return (
    <div {...other} className={loadingClasses}>
      <svg className="bx--loading__svg" viewBox="-75 -75 150 150">
        <circle cx="0" cy="0" r="37.5" />
      </svg>
    </div>
  );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
