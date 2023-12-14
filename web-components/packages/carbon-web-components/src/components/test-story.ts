import type { Meta, StoryObj } from '@storybook/web-components';

import { html } from 'lit';
import './copy-button/copy-button';

type CustomArgs = { footer?: string };

const meta: Meta<CustomArgs> = {
  title: 'Page',
  component: 'demo-page',
  render: ({ footer }) => html`
    <demo-page>
        <cds-copy-button>TEST</cds-copy-button>
      <footer>${footer}</footer>
    </demo-page>
  `,
};

export default meta;
type Story = StoryObj<CustomArgs>;

export const CustomFooter: Story = {
  args: {
    footer: 'Built with Storybook',
  },
};