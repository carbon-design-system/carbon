import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdCreateArchive32 from '../../../lib/WatsonHealthCdCreateArchive/32';

storiesOf('WatsonHealthCdCreateArchive32', module)
  .add('default', () => <WatsonHealthCdCreateArchive32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdCreateArchive32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdCreateArchive32 focusable>
      <title>Icon title</title>
    </WatsonHealthCdCreateArchive32>
  ));
