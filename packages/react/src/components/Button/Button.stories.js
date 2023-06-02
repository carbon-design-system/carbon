/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Add } from '@carbon/icons-react';
import { default as Button, ButtonSkeleton } from '../Button';
import ButtonSet from '../ButtonSet';
import mdx from './Button.mdx';

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: {
    ButtonSet,
    ButtonSkeleton,
  },
  argTypes: {
    kind: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'ghost',
        'danger',
        'danger--tertiary',
        'danger--ghost',
      ],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
    children: {
      control: false,
    },
    renderIcon: {
      control: false,
    },
    as: {
      control: false,
    },
    small: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22%20title%22%3A%22ButtonFragment%22%2C%22data%22%3A%7B%22items%22%3A%20%5B%7B%22type%22%3A%22button%22%2C%22kind%22%3A%22primary%22%2C%20%22text%22%3A%22Button%22%2C%22size%22%3A%22%22%2C%22id%22%3A%222%22%20%2C%22codeContext%22%3A%7B%22name%22%3A%22button-2%22%7D%7D%5D%2C%22%20id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
      <Button {...args}>Button</Button>
    </>
  );
};

export const Secondary = (args) => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22%20title%22%3A%22ButtonFragment%22%2C%22data%22%3A%7B%22items%22%3A%20%5B%7B%22type%22%3A%22button%22%2C%22kind%22%3A%22secondary%22%2C%20%22text%22%3A%22Button%22%2C%22size%22%3A%22%22%2C%22id%22%3A%222%22%20%2C%22codeContext%22%3A%7B%22name%22%3A%22button-2%22%7D%7D%5D%2C%22%20id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
      <Button kind="secondary" {...args}>
        Button
      </Button>
    </>
  );
};

export const Tertiary = (args) => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22%20title%22%3A%22ButtonFragment%22%2C%22data%22%3A%7B%22items%22%3A%20%5B%7B%22type%22%3A%22button%22%2C%22kind%22%3A%22tertiary%22%2C%20%22text%22%3A%22Button%22%2C%22size%22%3A%22%22%2C%22id%22%3A%222%22%20%2C%22codeContext%22%3A%7B%22name%22%3A%22button-2%22%7D%7D%5D%2C%22%20id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
      <Button kind="tertiary" {...args}>
        Button
      </Button>
    </>
  );
};

export const Danger = (args) => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22%20title%22%3A%22ButtonFragment%22%2C%22data%22%3A%7B%22items%22%3A%20%5B%7B%22type%22%3A%22button%22%2C%22kind%22%3A%22danger%22%2C%20%22text%22%3A%22Button%22%2C%22size%22%3A%22%22%2C%22id%22%3A%222%22%20%2C%22codeContext%22%3A%7B%22name%22%3A%22button-2%22%7D%7D%5D%2C%22%20id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
      <Button kind="danger" {...args}>
        Button
      </Button>
      &nbsp;
      <Button kind="danger--tertiary" {...args}>
        Tertiary Danger Button
      </Button>
      &nbsp;
      <Button kind="danger--ghost" {...args}>
        Ghost Danger Button
      </Button>
    </>
  );
};

export const Ghost = (args) => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22%20title%22%3A%22ButtonFragment%22%2C%22data%22%3A%7B%22items%22%3A%20%5B%7B%22type%22%3A%22button%22%2C%22kind%22%3A%22ghost%22%2C%20%22text%22%3A%22Button%22%2C%22size%22%3A%22%22%2C%22id%22%3A%222%22%20%2C%22codeContext%22%3A%7B%22name%22%3A%22button-2%22%7D%7D%5D%2C%22%20id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
      <Button kind="ghost" {...args}>
        Button
      </Button>
    </>
  );
};

export const IconButton = (args) => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22%20title%22%3A%22ButtonFragment%22%2C%22data%22%3A%7B%22items%22%3A%20%5B%7B%22type%22%3A%22button%22%2C%22kind%22%3A%22primary%22%2C%20%22text%22%3A%22Button%22%2C%22size%22%3A%22%22%2C%22id%22%3A%222%22%20%2C%22codeContext%22%3A%7B%22name%22%3A%22button-2%22%7D%7D%5D%2C%22%20id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <Button
      renderIcon={Add}
      iconDescription="Icon Description"
      hasIconOnly
      onClick={action('onClick')}
      {...args}
    />
  </>
);

export const SetOfButtons = (args) => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22%20title%22%3A%22ButtonFragment%22%2C%22data%22%3A%7B%22items%22%3A%20%5B%7B%22type%22%3A%22button%22%2C%22kind%22%3A%22primary%22%2C%20%22text%22%3A%22Button%22%2C%22size%22%3A%22%22%2C%22id%22%3A%222%22%20%2C%22codeContext%22%3A%7B%22name%22%3A%22button-2%22%7D%7D%5D%2C%22%20id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
      <ButtonSet>
        <Button kind="secondary" {...args}>
          Secondary button
        </Button>
        <Button kind="primary" {...args}>
          Primary button
        </Button>
      </ButtonSet>
    </>
  );
};

export const Skeleton = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22%20title%22%3A%22ButtonFragment%22%2C%22data%22%3A%7B%22items%22%3A%20%5B%7B%22type%22%3A%22button%22%2C%22kind%22%3A%22primary%22%2C%20%22text%22%3A%22Button%22%2C%22size%22%3A%22%22%2C%22id%22%3A%222%22%20%2C%22codeContext%22%3A%7B%22name%22%3A%22button-2%22%7D%7D%5D%2C%22%20id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <ButtonSkeleton />
    &nbsp;
    <ButtonSkeleton size="sm" />
  </>
);
