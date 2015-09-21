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

# Examples

A list of cards that represent user's deployments.

```html
<ul class="card-list">
  <li class="card" data-type="deployment">...</li>
  <li class="card" data-type="deployment">...</li>
  <li class="card" data-type="deployment">...</li>
</ul>
```

A single card that represents a user's app with a running status.

```html
<li class="card" data-type="deployment">
  <a href="#" class="card__link-wrapper">
    <div class="card__info">
      <img src="..." alt="..." class="info__icon">
      <h3 class="info__name">deployment-card</h3>
      <a href="#" class="info__link">app-card.mybluemix.net</a>
    </div>
    <div class="card__bindings">
      <img src="..." alt="#" class="bindings__icon">
    </div>
    <div class="card__state">
      <span class="state__icon--running"></span>
      <p class="state__status-text--running">Running</p>
    </div>
  </a>
</li>
```

# Classes

| Class | Effect | Remarks |
|-----------|--------|---------|
|`card-list`| Defines a list of cards | - |
|`card`| Defines a single card in a list of cards | - |
|`card__info`| A section of card information | i.e. includes name, link, icon |
|`info__icon`| An icon that represents the card | - |
|`info__name`| A name that represents the card | - |
|`info__link`| A relevant link for what that card represents | i.e. a deployment card will link to the app itself |
|`card__bindings`| A section that displays all bindings for that card | i.e. services, other integrations, etc. |
|`bindings__icon`| An icon that represents a binding | - |
|`card__state`| A region of the card with status information | - |
|`state__icon`| An icon that represents the state of the card | - |
|`state__icon--running`| Defines a warning state for a card | - |
|`state__icon--warning`| Defines a warning state for a card | - |
|`state__icon--error`| Defines an error state for a card | - |
|`state__status-text--running`| Text inside card__state | Reads as "Running" |
|`state__status-text--warning`| Text inside card__state | Reads as "Warning" |
|`state__status-text--error`| Text inside card__state | Reads as "Error" |

# Attributes

| Attributes | Effect | Remarks |
|-----------|--------|---------|
|`data-type`| Defines the type of card in a list of cards | - |
|`data-type="deployment"`| Defines a deployment card | - |
|`data-type="environment"`| Defines a environment card | - |
|`data-type="integration"`| Defines a integration card | - |
|`data-type="pipeline"`| Defines a pipeline card | - |
|`data-type="service"`| Defines a service card | - |
