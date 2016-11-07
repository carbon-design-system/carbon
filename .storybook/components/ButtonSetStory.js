import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../components/AppContainer';
import ButtonSet from '../../components/ButtonSet';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';

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
