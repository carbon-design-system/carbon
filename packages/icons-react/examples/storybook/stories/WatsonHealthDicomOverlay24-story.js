import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthDicomOverlay24 from '../../../es/watson-health/dicom--overlay/24.js';

storiesOf('WatsonHealthDicomOverlay24', module)
  .add('default', () => <WatsonHealthDicomOverlay24 />)
  .add('with accessibility label', () => (
    <WatsonHealthDicomOverlay24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthDicomOverlay24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthDicomOverlay24>
  ));
