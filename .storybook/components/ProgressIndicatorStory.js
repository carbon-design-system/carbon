import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ProgressIndicator from '../../components/ProgressIndicator';
import ProgressIndicatorStep from '../../components/ProgressIndicatorStep';

storiesOf('Progress Indicator', module)
  .addWithInfo(
    '',
    `
      Progress Indicators display steps in a process. It should indicate when steps have been complete, the active step,
      and the steps to come.
    `,
    () => (
      <ProgressIndicator className="some-class">
        <ProgressIndicatorStep className="special-step">Step 1</ProgressIndicatorStep>
        <ProgressIndicatorStep>Step 2</ProgressIndicatorStep>
        <ProgressIndicatorStep active>Step 3</ProgressIndicatorStep>
        <ProgressIndicatorStep>Step 4</ProgressIndicatorStep>
      </ProgressIndicator>
  ));
