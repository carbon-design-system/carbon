import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Icon from '../../components/Icon';
import AppContainer from '../../components/AppContainer';

storiesOf('Icon', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addWithInfo(
    '',
    `
      Icons are used in the product to present common actions and commands. Modify the fill
      property to change the color of the icon. The name property specifies which the icon to be displayed.
      For a full list of icon names, see: http://design-system.stage1.mybluemix.net/essentials/iconography.html#library.
    `,
    () => (<Icon name="search" fill="red" description="search microservices" />),
  );
