import React from 'react';
import { storiesOf } from '@storybook/react';
import Wikis24 from '../../../es/wikis/24.js';

storiesOf('Wikis24', module)
  .add('default', () => <Wikis24 />)
  .add('with accessibility label', () => (
    <Wikis24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Wikis24 aria-label="Icon label">
      <title>Icon title</title>
    </Wikis24>
  ));
