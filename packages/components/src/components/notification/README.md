### SCSS

#### Mixins

| Name                         | Params           | Description                               |
| ---------------------------- | ---------------- | ----------------------------------------- |
| `inline-notification--color` | `$color`: String | Applies given `$color` to border and icon |
| `notification--color`        | `$color`: String | Applies given `$color` to left border     |

#### Modifiers

Use these modifiers with `.bx--inline-notification` class.

| Selector                                 | Description                                                    |
| ---------------------------------------- | -------------------------------------------------------------- |
| `.bx--inline-notification--low-contrast` | Use low contrast variant (The color scheme used until `v10.2`) |
| `.bx--inline-notification--error`        | Apply error color to border and icon                           |
| `.bx--inline-notification--success`      | Apply success color to border and icon                         |
| `.bx--inline-notification--info`         | Apply info color to border and icon                            |
| `.bx--inline-notification--warning`      | Apply warning color to border and icon                         |

Use these modifiers with `.bx--toast-notification` class.

| Selector                                | Description                                                    |
| --------------------------------------- | -------------------------------------------------------------- |
| `.bx--toast-notification--low-contrast` | Use low contrast variant (The color scheme used until `v10.2`) |
| `.bx--toast-notification--error`        | Apply error color on left border                               |
| `.bx--toast-notification--success`      | Apply success color on left border                             |
| `.bx--toast-notification--info`         | Apply info color on left border                                |
| `.bx--toast-notification--warning`      | Apply warning color on left border                             |

### JavaScript

#### Getting component class reference

##### ES2015

```javascript
import { Notification } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var Notification = CarbonComponents.Notification;
```

#### Instantiating

```javascript
// `#my-notification` is an element with `[data-notification]` attribute
Notification.create(document.getElementById('my-notification'));
```

#### Public Methods

| Name      | Params | Description                                                                       |
| --------- | ------ | --------------------------------------------------------------------------------- |
| `remove`  |        | Removes the component, deletes the instance, and removes document event listeners |
| `release` |        | Delete the instance                                                               |

##### Example - Removing a notification

```javascript
// `#my-notification` is an element with `[data-notification]` attribute
notificationInstance = Notification.create(
  document.getElementById('my-notification')
);
notificationInstance.remove();
```

#### Options

| Option                          | Default Selector             | Description                                            |
| ------------------------------- | ---------------------------- | ------------------------------------------------------ |
| `selectorInit`                  | `[data-notification]`        | The selector to find instances of the component        |
| `selectorButton`                | `[data-notification-btn]`    | The selector to find the close button in the component |
| `eventBeforeDeleteNotification` | `notification-before-delete` | Event before deleting the notification                 |
| `eventAfterDeleteNotification`  | `notification-after-delete`  | Event after deleting the notification                  |

##### Example - Preventing a notification from being removed in a certain condition

```javascript
document.addEventListener('notification-before-delete', function(evt) {
  if (!myApplication.shouldNotificationBeRemoved(evt.target)) {
    evt.preventDefault();
  }
});
```

##### Example - Notifying events of all notifications being removed to an analytics library

```javascript
document.addEventListener('notification-after-delete', function(evt) {
  myAnalyticsLibrary.send({
    action: 'Notification removed',
    id: evt.target.id,
  });
});
```

### FAQ

#### Using aria live regions and alert roles

Using `role="alert"` is an aggressive call to action that the prompts a screen
reader user to take immediate action on something that changed in the UI. This
is usually reserved for things that are important or time-sensitive like:

- An invalid value was entered into a form field
- The user's login session is about to expire
- The connection to the server was lost, local changes will not be saved

Use the alert role sparingly and only in situations where the user's immediate
attention is required. Dynamic changes that are less urgent should use a less
aggressive method, such as `aria-live="polite"` or other live region roles.

Don't use an alert role on all notifications.

By default, we recommend that error and warning notifications use
`role="alert"`, while success and info notifications use `aria-live="polite"`.
But as always, this will depend on the urgency of the notification.

**Sources:**

- [Use the alert role - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role)
- [ARIA Live Regions - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
