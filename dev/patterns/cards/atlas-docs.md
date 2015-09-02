# Cards
Cards are links which always appear as list items within a view and provide an at-a glance preview of its linked page's content. Cards can be as minimal as a title, icon and some metadata, or as detailed as including a chart, description, metadata or even live metrics.

## Basic use

Whenever you are creating a list of like, but complex content that needs more information for differentiation than just a title and icon, cards might be a useful pattern.

The HTML for a card is made of any composition of the following parts:

- card header
 - card icon
 - card title
- card graph
- card description
- card metric
 - card metric figure
 - card metric unit
 - card metric label
- card metadata item
 - card metadata icon
 - card metadata value

Full HTML example of a Cloud Foundry app card:
```html
<li>
  <a class="object-card">
    <div class="object-card__card-header">
      <img src="http://placecreature.com/25/25" alt="" class="card-header__icon">
      <h3 class="card-header__title">cool-app</h3>
    </div>
    <svg class="object-card__graph">
      ...
    </svg>
    <div class="object-card__card-metric">
      <h1 class="card-metric__figure">87<span class="card-metric__unit">%</span></h1>
      <p class="card-metric__label">Success</p>
    </div>
    <div class="object-card__card-metric">
      <h1 class="card-metric__figure">42<span class="card-metric__unit">ms</span></h1>
      <p class="card-metric__label">Avg. Response</p>
    </div>
    <div class="object-card__metadata-item">
      <img src="" alt="" class="metadata-item__icon">
      <p class="metadata-item__value">route: coolapp.mybluemix.net</p>
    </div>
    <div class="object-card__metadata-item">
      <img src="" alt="" class="metadata-item__icon">
      <p class="metadata-item__value">runtime: SDK for Node.js</p>
    </div>
  <a>
</li>
```

A more minimal service card:

```html

<div class="object-card">
  <div class="object-card__card-header">
    <img src="http://placecreature.com/25/25" alt="" class="card-header__icon">
    <h3 class="card-header__title">Data Cache</h3>
  </div>
  <div class="object-card__metadata-item">
    <img src="" alt="" class="metadata-item__icon">
    <p class="metadata-item__value">Plan: Standard</p>
  </div>
  <div class="object-card__metadata-item">
    <img src="" alt="" class="metadata-item__icon">
    <p class="metadata-item__value">Monthly Quota: 56mb</p>
  </div>
</div>
```

## Classes
