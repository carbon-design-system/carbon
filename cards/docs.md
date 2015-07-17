# Cards

A card is a user interface element that looks like a card or tile that consists of related data -- for Bluemix, this is data related to app or service instances.

Cards are meant to provide useful, glanceable information about apps and services.

They also allow users an access point to more complex and detailed information that relates to a particular card and the instance it represents.

# Basic use

<!-- Write something here about using or constructing an unordered list <ul> to define a group of cards. Each list item <li> should represent a card. -->

<!-- Add a class on the list-items <li> to define the cards as either service-cards or app-cards (`.bx-card--app-card` or `.bx-card--service-card`) -->

# Examples

A list of cards that represent user's apps.

```html
<ul class="bx-card-list">
  <li class="bx-card--app-card">...</li>
  <li class="bx-card--app-card">...</li>
  <li class="bx-card--app-card">...</li>
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
|`bx-card--app-card`| Defines an app card | Required; applies specifc styles that are exclusive to app cards |
|`bx-card--service-card`| Defines an service card | Required; applies specifc styles that are exclusive to service cards |
|`bx-card--catalog-card`(?)| Defines a catalog card | Not sure what this is... |
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








1. Always prepend classes with `bx-card` (this is <prepend> in the formulas below).
* Add type of card to prefix: `bx-btn--service-card`.
* If there is an secondary modifier add `--class`.
* Available card types are: `-service-card`,`-app-card`,`-catalog-card`
* The state container changes color based on the state message. Available types are '--healthy', '--in-prog', '--warning', '--error'

Cards are used as summaries for, and access to detail pages for specific items. All cards will appear in unordered lists.

A single service card element would be marked up as follows:

```html
<li class="bx-card--service-card">
	<a href="/{serviceguid}/details">
		<img src="" alt="" class="bx-card-icon">
		<h3 class="bx-card-title">I am a card title</h3>
		<ul class="bx-card-bindings-list">
			<li class="bx-card-binding">I am a binding</li>
			<li class="bx-card-binding">I am a binding</li>
			<li class="bx-card-binding">I am a binding</li>
		</ul>
		<div class="bx-card-state-container">
			<p class="bx-card-state">Running</p>
		</div>
	</a>
</li>
```

This block should exist as a partial. And should be iterated within an unordered list. Here's what this might look like in dust.js

```html
<ul class="bx-card-list">
	{# servicesData }
		{> serviceCard }
	{/ servicesData }
</ul>
```
