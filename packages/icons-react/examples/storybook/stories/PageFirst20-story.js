import React from 'react';
import { storiesOf } from '@storybook/react';
import PageFirst20 from '../../../es/page--first/20.js';

storiesOf('PageFirst20', module)
  .add('default', () => <PageFirst20 />)
  .add('with accessibility label', () => (
    <PageFirst20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PageFirst20 aria-label="Icon label">
      <title>Icon title</title>
    </PageFirst20>
  ));
