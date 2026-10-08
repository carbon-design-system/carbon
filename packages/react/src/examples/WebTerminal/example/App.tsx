/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Code, Copy } from '@carbon/react/icons';
import { Default } from './preview-components';
import '@carbon/styles/css/styles.css';
import './styles/_web-terminal.scss';
import './index.scss';

const actions = [
  {
    renderIcon: (props) => <Code size={16} {...props} />,
    onClick: () => {},
    iconDescription: 'Create new deployment',
  },
  {
    renderIcon: (props) => <Copy size={16} {...props} />,
    onClick: () => {},
    iconDescription: 'Copy logs',
  },
];

const sharedArgs = {
  closeIconDescription: 'Close terminal',
  documentationLinksIconDescription: 'Show documentation links',
};

export const App = () => {
  return (
    <div className="example-container">
      <section className="example-section">
        <Default {...sharedArgs} actions={actions} isInitiallyOpen={false} />
      </section>
    </div>
  );
};

export default App;
