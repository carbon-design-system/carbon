/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import AspectRatio from '../AspectRatio';

function DemoContainer({ children }) {
  return <div style={{ width: 300, height: 300 }}>{children}</div>;
}

function DemoObject() {
  return (
    <div style={{ backgroundColor: 'black', width: '100%', height: '100%' }} />
  );
}

storiesOf('AspectRatio', module)
  .add('default', () => (
    <DemoContainer>
      <AspectRatio>
        <DemoObject />
      </AspectRatio>
    </DemoContainer>
  ))
  .add('16x9', () => (
    <DemoContainer>
      <AspectRatio ratio="16x9">
        <DemoObject />
      </AspectRatio>
    </DemoContainer>
  ))
  .add('2x1', () => (
    <DemoContainer>
      <AspectRatio ratio="2x1">
        <DemoObject />
      </AspectRatio>
    </DemoContainer>
  ))
  .add('4x3', () => (
    <DemoContainer>
      <AspectRatio ratio="4x3">
        <DemoObject />
      </AspectRatio>
    </DemoContainer>
  ));
