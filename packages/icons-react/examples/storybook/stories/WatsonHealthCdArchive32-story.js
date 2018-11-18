import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdArchive32 from '../../../es/watson-health/cd--archive/32.js';

storiesOf('WatsonHealthCdArchive32', module)
  .add('default', () => <WatsonHealthCdArchive32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdArchive32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdArchive32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCdArchive32>
  ));
