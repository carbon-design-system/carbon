# Service cards!

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

This block should exist as a partial. And should be iterated within an unordered list as follows:

```html
<ul class="bx-card-list">
	{# servicesData }
		{> serviceCard }
	{/ servicesData }
</ul>
```