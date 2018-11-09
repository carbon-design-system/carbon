import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdArchive32 from '../../../lib/WatsonHealthCdArchive/32';

storiesOf('WatsonHealthCdArchive32', module)
  .add('default', () => <WatsonHealthCdArchive32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdArchive32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdArchive32 focusable>
      <title>Icon title</title>
    </WatsonHealthCdArchive32>
  ));
