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
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['children', 'className'],
    },
  },
};

const headingArgTypes = {
  rootHeading: {
    control: { type: 'text' },
    table: { category: 'Heading content' },
  },
  sectionHeading: {
    control: { type: 'text' },
    table: { category: 'Heading content' },
  },
  nestedHeading: {
    control: { type: 'text' },
    table: { category: 'Heading content' },
  },
};

const headingArgs = {
  rootHeading: 'Account settings',
  sectionHeading: 'Profile',
  nestedHeading: 'Contact information',
};

export const Default = ({ rootHeading, sectionHeading, nestedHeading }) => {
  return (
    <>
      <Heading>{rootHeading}</Heading>
      <Section>
        <Heading>{sectionHeading}</Heading>
        <Section>
          <Heading>{nestedHeading}</Heading>
        </Section>
      </Section>
    </>
  );
};

Default.args = headingArgs;
Default.argTypes = headingArgTypes;

export const CustomLevel = ({
  rootHeading,
  sectionHeading,
  nestedHeading,
  level,
}) => {
  return (
    <>
      <Heading>{rootHeading}</Heading>
      <Section level={level}>
        <Heading>{sectionHeading}</Heading>
        <Section>
          <Heading>{nestedHeading}</Heading>
        </Section>
      </Section>
    </>
  );
};

CustomLevel.args = {
  ...headingArgs,
  level: 5,
};
CustomLevel.argTypes = {
  ...headingArgTypes,
  level: {
    control: { type: 'select' },
    options: [1, 2, 3, 4, 5, 6],
    table: { category: 'Section' },
  },
};
