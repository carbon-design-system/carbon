import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdCreateArchive32 from '../../../es/watson-health/cd--create-archive/32.js';

storiesOf('WatsonHealthCdCreateArchive32', module)
  .add('default', () => <WatsonHealthCdCreateArchive32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdCreateArchive32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdCreateArchive32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCdCreateArchive32>
  ));
