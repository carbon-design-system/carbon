import PropTypes from 'prop-types';
import React from 'react';

const TabContent = props => {
  const { selected, children, ...other } = props;

  return (
    <div {...other} selected={selected} hidden={!selected}>
      {children}
    </div>
  );
};

TabContent.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
};

TabContent.defaultProps = {
  selected: false,
};

export default TabContent;
