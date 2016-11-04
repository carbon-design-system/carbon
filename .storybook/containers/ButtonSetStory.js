import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import ButtonSet from '../../containers/ButtonSet';
import PrimaryButton from '../../elements/PrimaryButton';
import SecondaryButton from '../../elements/SecondaryButton';

storiesOf('ButtonSet', module)
  .addDecorator((story) => (
    <AppContainer>{story()}</AppContainer>
  ))
  .addWithInfo(
    '',
    `
      Button Sets are container components used when an action required by the user has more than one option. Always use a
      positive action button (primary) paired with a negative action button (secondary). Positive action buttons
      should be on the right, while negative action buttons will be on the left.
    `,
    () => (
      <ButtonSet>
        <SecondaryButton>Backward</SecondaryButton>
        <PrimaryButton>Forward</PrimaryButton>
      </ButtonSet>
  ));
