import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification, {
  ToastNotification,
  InlineNotification,
} from '../Notification';
import Link from '../Link';

const notificationProps = {
  toast: {
    onCloseButtonClick: action('onCloseButtonClick'),
    className: 'some-class',
    title: 'Notification title',
    subtitle: 'Subtitle text goes here.',
    caption: 'Time stamp [00:00:00]',
    captionNode: <Link href="#">The caption can be any node.</Link>,
    iconDescription: 'describes the close button',
    style: { minWidth: '30rem', marginBottom: '.5rem' },
  },
  inline: {
    onCloseButtonClick: action('onCloseButtonClick'),
    className: 'some-class',
    title: 'Notification title',
    subtitle: 'Subtitle text goes here.',
    iconDescription: 'describes the close button',
  },
  subtitleNode: <Link href="#">The subtitle can be any node.</Link>,
};

storiesOf('Notifications', module)
  .addWithInfo(
    'Deprecated: <Notfication />',
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
        <Notification {...notificationProps.inline} kind="error" />
        <Notification {...notificationProps.inline} kind="info" />
        <Notification {...notificationProps.inline} kind="success" />
        <Notification {...notificationProps.inline} kind="warning" />
      </div>
    )
  )
  .addWithInfo(
    'Toast',
    `
  ...
  `,
    () => {
      const { toast } = notificationProps;
      return (
        <div>
          <ToastNotification {...toast} kind="error" />
          <ToastNotification {...toast} kind="info" />
          <ToastNotification {...toast} kind="success" />
          <ToastNotification {...toast} kind="warning" />
          <ToastNotification
            {...{
              ...toast,
              subtitle: notificationProps.subtitleNode,
              caption: toast.captionNode,
            }}
            kind="info"
          />
        </div>
      );
    }
  )
  .addWithInfo(
    'inline',
    `
  ...
  `,
    () => (
      <div>
        <InlineNotification {...notificationProps.inline} kind="error" />
        <InlineNotification {...notificationProps.inline} kind="info" />
        <InlineNotification {...notificationProps.inline} kind="success" />
        <InlineNotification {...notificationProps.inline} kind="warning" />
        <InlineNotification
          {...{
            ...notificationProps.inline,
            subtitle: notificationProps.subtitleNode,
          }}
          kind="info"
        />
      </div>
    )
  );
