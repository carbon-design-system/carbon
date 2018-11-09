import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthDicom_600032 from '../../../lib/WatsonHealthDicom_6000/32';

storiesOf('WatsonHealthDicom_600032', module)
  .add('default', () => <WatsonHealthDicom_600032 />)
  .add('with accessibility label', () => (
    <WatsonHealthDicom_600032 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthDicom_600032 focusable>
      <title>Icon title</title>
    </WatsonHealthDicom_600032>
  ));
