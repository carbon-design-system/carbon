import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icon from '../../elements/Icon';
import AppContainer from '../../containers/AppContainer';

storiesOf('Icon', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addWithInfo(
    'simple usage',
    `
      basic usage text
    `,
    () => (<Icon name="search" fill="red" description="search microservices" />),
  );
