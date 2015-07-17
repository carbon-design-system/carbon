# Cards

A card is a user interface element that looks like a card or tile that consists of related data -- for Bluemix, this is data related to app or service instances.

Cards are meant to provide useful, glanceable information about apps and services.

They also allow users an access point to more complex and detailed information that relates to a particular card and the instance it represents.
 





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
