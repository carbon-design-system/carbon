import React from 'react';
import { storiesOf } from '@storybook/react';
import Catalog32 from '../../../es/catalog/32.js';

storiesOf('Catalog32', module)
  .add('default', () => <Catalog32 />)
  .add('with accessibility label', () => (
    <Catalog32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Catalog32 aria-label="Icon label">
      <title>Icon title</title>
    </Catalog32>
  ));
