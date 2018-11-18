import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthDicom_600032 from '../../../es/watson-health/dicom--6000/32.js';

storiesOf('WatsonHealthDicom_600032', module)
  .add('default', () => <WatsonHealthDicom_600032 />)
  .add('with accessibility label', () => (
    <WatsonHealthDicom_600032 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthDicom_600032 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthDicom_600032>
  ));
