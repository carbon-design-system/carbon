import React from 'react';
import { storiesOf } from '@storybook/react';
import Wikis32 from '../../../es/wikis/32.js';

storiesOf('Wikis32', module)
  .add('default', () => <Wikis32 />)
  .add('with accessibility label', () => (
    <Wikis32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Wikis32 aria-label="Icon label">
      <title>Icon title</title>
    </Wikis32>
  ));
