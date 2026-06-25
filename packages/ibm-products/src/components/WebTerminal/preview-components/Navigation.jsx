//
// Copyright IBM Corp. 2020, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from '@carbon/react';
import { Terminal, Search, User } from '@carbon/react/icons';

import { useWebTerminal } from '../hooks';

const Navigation = () => {
  const { openWebTerminal } = useWebTerminal();

  return (
    <Header aria-label="IBM Platform Name">
      <HeaderName href="#" prefix="IBM">
        [Platform]
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Web terminal" onClick={openWebTerminal}>
          <Terminal size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
          <Search size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User" onClick={() => {}}>
          <User size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};

export default Navigation;
