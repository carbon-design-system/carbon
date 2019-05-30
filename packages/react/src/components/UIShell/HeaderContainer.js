import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

const HeaderContainer = ({ isSideNavExpanded, render: Children }) => {
  const [isSideNavExpandedState, setIsSideNavExpandedState] = useState(
    isSideNavExpanded
  );

  const handleHeaderMenuButtonClick = useCallback(() => {
    setIsSideNavExpandedState(!isSideNavExpandedState);
  }, [isSideNavExpandedState, setIsSideNavExpandedState]);

  return (
    <Children
      isSideNavExpanded={isSideNavExpandedState}
      onClickSideNavExpand={handleHeaderMenuButtonClick}
    />
  );
};

HeaderContainer.propTypes = {
  /**
   * Optionally provide a custom class name that is applied to the underlying <header>
   */
  isSideNavExpanded: PropTypes.bool,
};

HeaderContainer.defaultProps = {
  isSideNavExpanded: false,
};

export default HeaderContainer;
