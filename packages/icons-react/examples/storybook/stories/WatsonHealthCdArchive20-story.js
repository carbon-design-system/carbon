import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdArchive20 from '../../../es/watson-health/cd--archive/20.js';

storiesOf('WatsonHealthCdArchive20', module)
  .add('default', () => <WatsonHealthCdArchive20 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdArchive20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdArchive20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCdArchive20>
  ));
