/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Section, Heading } from '../Heading';
import mdx from './Heading.mdx';

export default {
  title: 'Components/Heading',
  component: Heading,
  subcomponents: {
    Section,
  },
  args: {
    as: 'section',
    level: 2,
  },
  argTypes: {
    as: {
      control: { type: 'text' },
      description:
        'Provide an alternative tag or component to use instead of the default <section> element',
      table: {
        category: 'Section',
      },
    },
    level: {
      control: {
        type: 'select',
      },
      description: 'Overrides the level of the section',
      options: [1, 2, 3, 4, 5, 6],
      table: {
        category: 'Section',
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['children', 'className'],
    },
  },
};

export const Default = (args) => {
  return (
    <>
      <Heading>Project overview</Heading>
      <Section as={args.as} level={args.level}>
        <Heading>Delivery milestones</Heading>
        <Section>
          <Heading>Release readiness</Heading>
        </Section>
      </Section>
    </>
  );
};

export const CustomLevel = (args) => {
  return (
    <>
      <Heading>Project overview</Heading>
      <Section as={args.as} level={args.level}>
        <Heading>Release readiness</Heading>
        <Section>
          <Heading>Final approvals</Heading>
        </Section>
      </Section>
    </>
  );
};

CustomLevel.args = {
  level: 5,
};
