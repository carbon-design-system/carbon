/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Button,
  Content,
  Header,
  HeaderContainer,
  HeaderName,
} from '@carbon/react';
import DocsPage from './CreateSidePanel.mdx';
import { Default } from './example/preview-components/Default';
import { WithValidation } from './example/preview-components/WithValidation';
import './example/styles/_story-styles.scss';

const prefix = 'create-side-panel-stories__';

const PAGE_CONTENT_ID = 'create-side-panel-page-content';

const PageShell = ({ children }) => (
  <>
    <HeaderContainer
      render={() => (
        <Header>
          <HeaderName href="/" prefix="IBM">
            Cloud Pak
          </HeaderName>
        </Header>
      )}
    />
    <Content id={PAGE_CONTENT_ID}>{children}</Content>
  </>
);

export default {
  title: 'Examples/Create flows/Create Side Panel',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { page: DocsPage },
  },
};

export const createSidePanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <PageShell>
      <div className={`${prefix}launcher-button`}>
        <Button onClick={() => setOpen(!open)}>
          {open ? 'Close SidePanel' : 'Open SidePanel'}
        </Button>
      </div>
      <Default
        open={open}
        setOpen={setOpen}
        selectorPageContent={`#${PAGE_CONTENT_ID}`}
      />
    </PageShell>
  );
};
createSidePanel.storyName = 'Default';

export const withFormValidation = () => {
  const [open, setOpen] = useState(false);

  return (
    <PageShell>
      <div className={`${prefix}launcher-button`}>
        <Button onClick={() => setOpen(!open)}>
          {open ? 'Close SidePanel' : 'Open SidePanel'}
        </Button>
      </div>
      <WithValidation
        open={open}
        setOpen={setOpen}
        selectorPageContent={`#${PAGE_CONTENT_ID}`}
      />
    </PageShell>
  );
};
withFormValidation.storyName = 'With Form Validation';
