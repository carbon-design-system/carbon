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
  .add('Default', () => (
    <ButtonSet>
      <SecondaryButton>Backward</SecondaryButton>
      <PrimaryButton>Forward</PrimaryButton>
    </ButtonSet>
  ));
