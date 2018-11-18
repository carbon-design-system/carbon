import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdArchive24 from '../../../es/watson-health/cd--archive/24.js';

storiesOf('WatsonHealthCdArchive24', module)
  .add('default', () => <WatsonHealthCdArchive24 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdArchive24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdArchive24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCdArchive24>
  ));
