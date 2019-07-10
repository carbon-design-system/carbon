import React, { createContext, useState } from 'react';

export const UIShellContext = createContext({
  isSideNavExpanded: false,
  setIsSideNavExpanded: () => {},
  isSideNavPinned: false,
  setIsSideNavPinned: () => {},
  name: 'default',
});

export const UIShellContextProvider = props => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [isSideNavPinned, setIsSideNavPinned] = useState(false);

  const value = {
    isSideNavExpanded: isSideNavPinned ? true : isSideNavExpanded,
    setIsSideNavExpanded: isSideNavPinned ? () => {} : setIsSideNavExpanded,
    setIsSideNavPinned,
    isSideNavPinned,
  };

  return <UIShellContext.Provider {...props} value={value} />;
};
