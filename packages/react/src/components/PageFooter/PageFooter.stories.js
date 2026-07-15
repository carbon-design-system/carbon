/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import Button from '../Button';
import PageFooter from './';
import mdx from './PageFooter.mdx';
import './PageFooter.stories.scss';

export default {
  title: 'Preview/preview_PageFooter',
  component: PageFooter,
  parameters: {
    docs: {
      page: mdx,
    },
    layout: 'fullscreen',
  },
  args: {
    cancelLabel: 'Cancel',
    previousLabel: 'Previous',
    nextLabel: 'Next',
  },
  argTypes: {
    children: {
      control: false,
    },
    className: {
      control: false,
    },
    cancelLabel: {
      control: 'text',
      description: 'Sets the ghost action label for this story.',
      table: { category: 'Story controls' },
    },
    previousLabel: {
      control: 'text',
      description: 'Sets the secondary action label for this story.',
      table: { category: 'Story controls' },
    },
    nextLabel: {
      control: 'text',
      description: 'Sets the primary action label for this story.',
      table: { category: 'Story controls' },
    },
  },
};

export const Default = {
  render: ({ cancelLabel, previousLabel, nextLabel }) => {
    return (
      <main className="page-footer-story">
        <div className="page-footer-story__content">
          <h1>Creation flow</h1>
          <p>The page footer remains visible while page content scrolls.</p>
        </div>
        <PageFooter aria-label="Creation flow actions">
          <Button kind="ghost" onClick={action('Cancel clicked')}>
            {cancelLabel}
          </Button>
          <Button kind="secondary" onClick={action('Previous clicked')}>
            {previousLabel}
          </Button>
          <Button kind="primary" onClick={action('Next clicked')}>
            {nextLabel}
          </Button>
        </PageFooter>
      </main>
    );
  },
};
