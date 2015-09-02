# Cards
Cards are links which always appear as list items within a view. They provide an at-a glance preview of the content they link to. Cards can be as minimal as a title, icon and description, or as detailed as including a title,  chart, several live metrics, and several pieces of metadata.

## Basic use

Whenever you are creating a collection of items which each surface a large amount of information in a similar schema, cards may be a useful pattern.

The HTML for a card is made of any or all of the following parts in order:

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

![anatomy of a light card]
(https://uploads.github.ibm.com/github-enterprise-assets/0000/0206/0000/0704/03641b96-5181-11e5-9978-0dd20e828b59.png)
![anatomy of a dark card](https://uploads.github.ibm.com/github-enterprise-assets/0000/0206/0000/0707/19844864-5182-11e5-9b2b-b751c9673ad7.png)

Full HTML example of a Cloud Foundry app card:

```html
<li>
  <a class="object-card" href="#">
    <div class="object-card__card-header">
      <img src="http://placecreature.com/25/25" alt="" class="card-header__icon">
      <h3 class="card-header__title">cool-app</h3>
    </div>
    <svg class="object-card__graph">
      <!-- ... -->
    </svg>
    <div class="object-card__card-metric">
      <h1 class="card-metric__figure">87<span class="card-metric__unit">%</span></h1>
      <p class="card-metric__label">success rate</p>
    </div>
    <div class="object-card__card-metric">
      <h1 class="card-metric__figure">4.2<span class="card-metric__unit">k</span></h1>
      <p class="card-metric__label">requests / second</p>
    </div>
    <div class="object-card__card-metadata">
      <img src="" alt="" class="card-metadata__icon">
      <p class="card-metadata__value">route: coolapp.mybluemix.net</p>
    </div>
    <div class="object-card__card-metadata">
      <img src="" alt="" class="card-metadata__icon">
      <p class="card-metadata__value">runtime: SDK for Node.js</p>
    </div>
  </a>
</li>
```

A more minimal service card:

```html
<li>
  <a class="object-card" href="#">
    <div class="object-card__card-header">
      <img src="http://placecreature.com/25/25" alt="" class="card-header__icon">
      <h3 class="card-header__title">Data Cache</h3>
    </div>
    <div class="object-card__card-metadata">
      <img src="" alt="" class="card-metadata__icon">
      <p class="card-metadata__value">Plan: Standard</p>
    </div>
    <div class="object-card__card-metadata">
      <img src="" alt="" class="card-metadata__icon">
      <p class="card-metadata__value">Monthly Quota: 56mb</p>
    </div>
  </a>
</li>
```

## Classes
| Class | Effect | Remarks |
|-----------|--------|---------|
|`object-card`| Defines a single card | Always resides in an `<li>` |
|`object-card__card-header`| Contains the header for the object card | The bottom border of the header can change colors depending on state|
|`card-header__icon`| The icon for the card||
|`card-header__title`| The title of the card | Card titles have a max line length of [TBD], after which they use an ellipses overflow|
|`object-card__graph`| A small data visualization to give more detail on an object's state | Designs unfinished |
|`object-card__description`| A description of the card's linked content. Usually used in browse and purchase experience | Descriptions have a max-character length of [TBD], after which they use an ellipses overflow |
|`object-card__card-metric`| a dyanmic metric which offers detail on an object's state at a given time. | e.g. avg. response time, data used, success rate, etc. |
|`card-metric__figure`| The actual value of a single metric on a card. | 4 character max |
|`card-metric__unit`| The unit of the card metric. | e.g. %, k, ms, mb, etc. |
|`card-metric__label`| The label for the card metric | 17 Character max. No ellipses overflow |
|`object-card__card-metadata`| A piece of static metadata which helps to identify an object. Usually a configured piece of information | e.g. route, endpoint, location, runtime, network, IP address, etc. |
|`card-metadata__icon`| An optional icon for a piece of metadata ||
|`card-metadata__value`| The actual value of the metadata item ||