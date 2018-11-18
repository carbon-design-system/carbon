import React from 'react';
import { storiesOf } from '@storybook/react';
import FingerprintRecognition20 from '../../../es/fingerprint-recognition/20.js';

storiesOf('FingerprintRecognition20', module)
  .add('default', () => <FingerprintRecognition20 />)
  .add('with accessibility label', () => (
    <FingerprintRecognition20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FingerprintRecognition20 aria-label="Icon label">
      <title>Icon title</title>
    </FingerprintRecognition20>
  ));
