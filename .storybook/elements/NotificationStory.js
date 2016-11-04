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
    'toast',
    `
      Toast notifications are typically passive, meaning they won't affect the user's workflow if not addressed.
      Toast Notifications use 'kind' props to specify the kind of notification that should render (error, info, success, warning).
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
    'inline',
    `
    Inline notifications appear in-page, and are important to the context of what the user's workflow.
    Inline Notifications use 'kind' props to specify the kind of notification that should render (error, info, success, warning).
    `,
    () => (
      <div>
        <Notification {...notificationProps.inline} kind="error" />
        <Notification {...notificationProps.inline} kind="info" />
        <Notification {...notificationProps.inline} kind="success" />
        <Notification {...notificationProps.inline} kind="warning" />
      </div>
    ),
  );
