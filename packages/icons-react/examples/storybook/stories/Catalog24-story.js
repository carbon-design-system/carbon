import React from 'react';
import { storiesOf } from '@storybook/react';
import Catalog24 from '../../../es/catalog/24.js';

storiesOf('Catalog24', module)
  .add('default', () => <Catalog24 />)
  .add('with accessibility label', () => (
    <Catalog24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Catalog24 aria-label="Icon label">
      <title>Icon title</title>
    </Catalog24>
  ));
