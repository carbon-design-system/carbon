import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import ButtonContainer from '../../containers/ButtonContainer';
import PrimaryButton from '../../elements/PrimaryButton';
import SecondaryButton from '../../elements/SecondaryButton';

storiesOf('ButtonContainer', module)
  .addDecorator((story) => (
    <AppContainer>{story()}</AppContainer>
  ))
  .add('Default', () => (
    <ButtonContainer>
      <SecondaryButton>Backward</SecondaryButton>
      <PrimaryButton>Forward</PrimaryButton>
    </ButtonContainer>
  ))
