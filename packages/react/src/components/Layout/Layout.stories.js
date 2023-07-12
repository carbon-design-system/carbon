/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { Accordion, AccordionItem } from '../Accordion';
import Button from '../Button';
import { HStack, VStack } from '../Stack';
import { TextInput } from '../TextInput';

import { Layout, LayoutConstraint } from './';
import mdx from './Layout.mdx';

export default {
  title: 'Experimental/unstable__Layout',
  component: Layout,
  subcomponents: {
    LayoutConstraint,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const Demo = () => (
  <VStack gap={6}>
    <HStack>
      <TextInput labelText="<TextInput />" placeholder="Placeholder" />
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button>&lt;Button /&gt;</Button>
      </div>
      <TextInput
        labelText='<TextInput size="sm" />'
        size="sm"
        placeholder="Placeholder"
      />
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button size="sm">&lt;Button size=&quot;sm&quot; /&gt;</Button>
      </div>
    </HStack>
    <Accordion>
      <AccordionItem title="<AccordionItem />">Content</AccordionItem>
    </Accordion>
  </VStack>
);

export const Playground = (args) => {
  return (
    <VStack gap={10}>
      <h1>Layout demo</h1>
      <div>
        <h2>Outside of &lt;Layout&gt;</h2>
        <br />
        <Demo />
      </div>
      <div>
        <h2>Inside of &lt;Layout&gt;</h2>
        <br />
        <Layout {...args}>
          <Demo />
        </Layout>
      </div>
    </VStack>
  );
};
