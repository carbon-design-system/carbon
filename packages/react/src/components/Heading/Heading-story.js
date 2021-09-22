/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Section, Heading } from '../Heading';
import mdx from './Heading.mdx';

export default {
  title: 'Experimental/unstable_Heading',
  component: Heading,
  subcomponents: {
    Section,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const heading = () => {
  return (
    <>
      <Heading>h1</Heading>
      <Section>
        <Heading>h2</Heading>
        <Section>
          <Heading>h3</Heading>
        </Section>
      </Section>
    </>
  );
};
