import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdCreateArchive20 from '../../../es/watson-health/cd--create-archive/20.js';

storiesOf('WatsonHealthCdCreateArchive20', module)
  .add('default', () => <WatsonHealthCdCreateArchive20 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdCreateArchive20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdCreateArchive20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCdCreateArchive20>
  ));
