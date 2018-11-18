import React from 'react';
import { storiesOf } from '@storybook/react';
import Catalog20 from '../../../es/catalog/20.js';

storiesOf('Catalog20', module)
  .add('default', () => <Catalog20 />)
  .add('with accessibility label', () => (
    <Catalog20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Catalog20 aria-label="Icon label">
      <title>Icon title</title>
    </Catalog20>
  ));
