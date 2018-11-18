import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdCreateArchive24 from '../../../es/watson-health/cd--create-archive/24.js';

storiesOf('WatsonHealthCdCreateArchive24', module)
  .add('default', () => <WatsonHealthCdCreateArchive24 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdCreateArchive24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdCreateArchive24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCdCreateArchive24>
  ));
