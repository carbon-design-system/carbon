import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';

storiesOf('AppContainer', module)
  .add('Default', () => (
    <AppContainer>
      Wraps all content inside body to add Global styles and toggle Dark/Light UIs with state
    </AppContainer>
  ))
