import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Icon from '../../elements/Icon';
import AppContainer from '../../containers/AppContainer';

storiesOf('Icon', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('default', () => (
    <Icon
      name="search"
      fill="red"
      description="search microservices"
    />
  ));
