import React from 'react';
import { storiesOf } from '@storybook/react';
import Wikis20 from '../../../es/wikis/20.js';

storiesOf('Wikis20', module)
  .add('default', () => <Wikis20 />)
  .add('with accessibility label', () => (
    <Wikis20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Wikis20 aria-label="Icon label">
      <title>Icon title</title>
    </Wikis20>
  ));
