import React from 'react';
import { storiesOf } from '@storybook/react';
import PageFirst24 from '../../../es/page--first/24.js';

storiesOf('PageFirst24', module)
  .add('default', () => <PageFirst24 />)
  .add('with accessibility label', () => (
    <PageFirst24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PageFirst24 aria-label="Icon label">
      <title>Icon title</title>
    </PageFirst24>
  ));
