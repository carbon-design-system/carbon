import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';

storiesOf('AppContainer', module)
  .add('Dark UI', () => (
    <AppContainer>body</AppContainer>
  ))
  .add('Light UI', () => (
    <AppContainer className="bx--global-light-ui">body</AppContainer>
  ))
