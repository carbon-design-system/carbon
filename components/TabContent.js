import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  selected: false,
};

const TabContent = (props) => {
  const {
    selected,
    children,
    ...other,
  } = props;

  return (
    <div
      {...other}
      selected={selected}
      hidden={!selected}
    >
      {children}
    </div>
  );
};

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;

export default TabContent;
