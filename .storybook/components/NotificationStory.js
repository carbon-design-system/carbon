import React from 'react';
import { action, storiesOf } from '@storybook/react';
import Notification, {
  ToastNotification,
  InlineNotification
} from '../../components/Notification';

const notificationProps = {
  toast: {
    onCloseButtonClick: action('onCloseButtonClick'),
    className: 'some-class',
    title: 'this is a title',
    subtitle: 'subtitle',
    caption: 'caption',
    iconDescription: 'describes the close button',
    style: { minWidth: '30rem', marginBottom: '.5rem' }
  },
  inline: {
    onCloseButtonClick: action('onCloseButtonClick'),
    className: 'some-class',
    title: 'this is a title',
    subtitle: 'subtitle',
    iconDescription: 'describes the close button'
  }
};

storiesOf('Notifications', module)
  .addWithInfo(
    'Deprecated: <Notfication />',
    `
      Toast notifications are typically passive, meaning they won't affect the user's workflow if not addressed.
      Toast Notifications use 'kind' props to specify the kind of notification that should render (error, info, success, warning).
    `,
    () =>
      <div>
        <Notification {...notificationProps.toast} kind="error" />
        <Notification {...notificationProps.toast} kind="info" />
        <Notification {...notificationProps.toast} kind="success" />
        <Notification {...notificationProps.toast} kind="warning" />
        <Notification {...notificationProps.inline} kind="error" />
        <Notification {...notificationProps.inline} kind="info" />
        <Notification {...notificationProps.inline} kind="success" />
        <Notification {...notificationProps.inline} kind="warning" />
      </div>
  )
  .addWithInfo(
    'Toast',
    `
  ...
  `,
    () =>
      <div>
        <ToastNotification {...notificationProps.toast} kind="error" />
        <ToastNotification {...notificationProps.toast} kind="info" />
        <ToastNotification {...notificationProps.toast} kind="success" />
        <ToastNotification {...notificationProps.toast} kind="warning" />
      </div>
  )
  .addWithInfo(
    'inline',
    `
  ...
  `,
    () =>
      <div>
        <InlineNotification {...notificationProps.inline} kind="error" />
        <InlineNotification {...notificationProps.inline} kind="info" />
        <InlineNotification {...notificationProps.inline} kind="success" />
        <InlineNotification {...notificationProps.inline} kind="warning" />
      </div>
  );
