import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthDicomOverlay32 from '../../../lib/WatsonHealthDicomOverlay/32';

storiesOf('WatsonHealthDicomOverlay32', module)
  .add('default', () => <WatsonHealthDicomOverlay32 />)
  .add('with accessibility label', () => (
    <WatsonHealthDicomOverlay32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthDicomOverlay32 focusable>
      <title>Icon title</title>
    </WatsonHealthDicomOverlay32>
  ));
