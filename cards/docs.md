# Cards

A card is a user interface element that looks like a card or tile that encapsulates a set of related data -- for Bluemix, this is data related to the following categories:

- deployment
- environment
- integration
- pipeline
- service

Cards are meant to provide useful, glanceable information about apps and services.
They also allow users an access point to more complex and detailed information that relates to a particular card and the instance it represents.

# Basic use

*the following paragraph is placeholder text*

Start with something about how to include this component, maybe it's npm install? Maybe it's cdn? We don't know yet...
Write something here about using or constructing an unordered list `<ul>` to define a group of cards. Need to confirm if cards will always exist in groups/lists. Will there ever be cards that exist on their own?

# Examples

A list of cards that represent user's deployments.

```html
<ul class="bx-card-list">
  <li class="bx-card" data-type="deployment">...</li>
  <li class="bx-card" data-type="deployment">...</li>
  <li class="bx-card" data-type="deployment">...</li>
</ul>
```

A single card that represents a user's app.

```html
<li class="bx-card--app-card">
  <a href="(app detail URL)">
    <img class="bx-card--icon" src="(icon URL)" alt="(app name)">
    <h3 class="bx-card--name">app name</h3>
    <ul class="bx-card--bindings-list">
      <li class="bx-card--binding">binding</li>
      <li class="bx-card--binding">binding</li>
      <li class="bx-card--binding">binding</li>
    </ul>
    <div class="bx-card--state-container">
      <p class="bx-card--state--healthy">Running</p>
    </div>
  </a>
</li>
```

# Classes

| Class | Effect | Remarks |
|-----------|--------|---------|
|`bx-card-list`| Defines a list of cards | Required |
|`bx-card`| Defines a single card in a list of cards | Required |
|`bx-card--icon`| Defines an icon for a card | Required |
|`bx-card--name`| Defines a name for a card | Required |
|`bx-card--bindings-list`| Defines a list of bindings for a card | Required; bindings could be service bindings for apps, or vice versa. |
|`bx-card--binding`| Defines a binding for a card | Required |
|`bx-card--state-container`| Defines a container that contains information about the state of a card | Used mainly for apps, services use this container to show different content (like, plans) |
|`bx-card--state`| Defines the state of a card | Required, must be modified with a class extension, see classes below |
|`bx-card--state--healthy`| Defines a healthy state for a card | Required |
|`bx-card--state--in-prog`| Defines an in-progress state for a card | Required |
|`bx-card--state--warning`| Defines a warning state for a card | Required |
|`bx-card--state--error`| Defines an error state for a card | Required |

# Attributes

| Attr | Effect | Remarks |
|`data-type`| Defines the type of card in a list of cards | Required |
|`data-type="deployment"`| Defines a deployment card | Required |
|`data-type="environment"`| Defines a environment card | Required |
|`data-type="integration"`| Defines a integration card | Required |
|`data-type="pipeline"`| Defines a pipeline card | Required |
|`data-type="service"`| Defines a service card | Required |
