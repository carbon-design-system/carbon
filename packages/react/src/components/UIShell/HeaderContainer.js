import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

const HeaderContainer = ({
  isSideNavExpanded,
  headerNavRef,
  render: Children,
}) => {
  const [isSideNavExpandedState, setIsSideNavExpandedState] = useState(
    isSideNavExpanded
  );

  const handleHeaderMenuButtonClick = useCallback(() => {
    setIsSideNavExpandedState(!isSideNavExpandedState);
  }, [isSideNavExpandedState, setIsSideNavExpandedState]);

  headerNavRef = React.createRef();

  return (
    <Children
      isSideNavExpanded={isSideNavExpandedState}
      onClickSideNavExpand={handleHeaderMenuButtonClick}
      headerNavRef={headerNavRef}
    />
  );
};

HeaderContainer.propTypes = {
  /**
   * Optionally provide a custom class name that is applied to the underlying <header>
   */
  isSideNavExpanded: PropTypes.bool,
  headerNavRef: PropTypes.object,
};

HeaderContainer.defaultProps = {
  isSideNavExpanded: false,
};

export default HeaderContainer;
