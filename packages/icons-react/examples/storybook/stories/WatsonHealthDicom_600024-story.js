import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthDicom_600024 from '../../../es/watson-health/dicom--6000/24.js';

storiesOf('WatsonHealthDicom_600024', module)
  .add('default', () => <WatsonHealthDicom_600024 />)
  .add('with accessibility label', () => (
    <WatsonHealthDicom_600024 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthDicom_600024 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthDicom_600024>
  ));
