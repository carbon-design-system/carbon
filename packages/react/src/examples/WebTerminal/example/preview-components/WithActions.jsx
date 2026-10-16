/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// cspell:words joebob

import React from 'react';
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from '@carbon/react';
import { Terminal, Search, User } from '@carbon/react/icons';
import {
  WebTerminal,
  WebTerminalContentWrapper,
  WebTerminalProvider,
  useWebTerminal,
} from '../components';

const Navigation = () => {
  const { toggleWebTerminal } = useWebTerminal();

  return (
    <Header aria-label="IBM Platform Name">
      <HeaderName href="#" prefix="IBM">
        [Platform]
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Web terminal"
          onClick={toggleWebTerminal}
        >
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

export const WithActions = ({ actions, ...args }) => (
  <WebTerminalProvider>
    <Navigation />
    <WebTerminal {...args} actions={actions}>
      <div className="example-terminal">
        <p>Connection successful.</p>
        <p>
          DISCLAIMER: This is not a real terminal, you would pass your own
          terminal component into the children of the WebTerminal component.
        </p>
        <p>Please see the docs of this component for more information.</p>
        <p>joebob:~$</p>
      </div>
    </WebTerminal>
  </WebTerminalProvider>
);
