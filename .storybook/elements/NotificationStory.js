import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import Notification from '../../elements/Notification';

const notificationProps = {
  toast: {
    onCloseButtonClick: action('onCloseButtonClick'),
    className: 'some-class',
    title: 'this is a title',
    subtitle: 'subtitle',
    caption: 'caption',
    iconDescription: 'describes the close button',
  },
  inline: {
    onCloseButtonClick: action('onCloseButtonClick'),
    className: 'some-class',
    title: 'this is a title',
    subtitle: 'subtitle',
    iconDescription: 'describes the close button',
  },
};

storiesOf('Notifications', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addWithInfo(
    'Toast',
    `
      Toast Notifications use kind props to specify the kind of notification that should render (error, info, success, warning).
    `,
    () => (
      <div>
        <Notification {...notificationProps.toast} kind="error" />
        <Notification {...notificationProps.toast} kind="info" />
        <Notification {...notificationProps.toast} kind="success" />
        <Notification {...notificationProps.toast} kind="warning" />
      </div>
    ),
  )
  .addWithInfo(
    'Inline',
    `
      Toast Notifications use kind props to specify the kind of notification that should render (error, info, success, warning).
    `,
    () => (
      <div>
        <Notification {...notificationProps.inline} kind="error" />
        <Notification {...notificationProps.inline} kind="info" />
        <Notification {...notificationProps.inline} kind="success" />
        <Notification {...notificationProps.inline} kind="warning" />
      </div>
    ),
  )
