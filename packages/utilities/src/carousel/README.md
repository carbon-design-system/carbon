# carousel

`carousel` is a lightweight,headless, framework-agnostic JavaScript utility for
building swipeable, carousel like components

## Features

- Swipe gesture support
- Transition animations
- View history tracking
- Custom event hooks (`onViewChangeStart`, `onViewChangeEnd`)
- Programmatic navigation (`next`, `prev`, `goToIndex`, `reset`)
- SCSS-based styling system

## Getting started

The utility can be initialized from any on-load function by passing in the
carousel container element. You may optionally set a height on the container—if
not provided, the utility will automatically use the smallest height among the
items. Once initialized, it returns a set of APIs that enable programmatic
navigation between views.

By default, the carousel responds to swipe gestures, horizontal scroll gestures,
and click-and-drag interactions. To disable this behavior, you can set the
`excludeSwipeSupport` flag to true.

Here's the usage example.

```html
<div id="myCarousel">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</div>
```

```ts
import { initCarousel } from '@carbon/utilities';

const container = document.getElementById('myCarousel');

const config = {
  onViewChangeStart: (startData) =>
    console.log('View change started', startData),
  onViewChangeEnd: (endData) => console.log('View change ended', endData),
  excludeSwipeSupport: false,
};
const carousel = initCarousel(container, config);

// Navigation controls
carousel.next();
carousel.prev();
carousel.goToIndex(2);
carousel.reset();
```

## Styling

The carousel utility provides SCSS mixins for styling carousel components with
smooth animations and accessibility features.

### SCSS Import Options

**Option 1: From `@carbon/react`** (React apps)

```scss
@use '@carbon/react/scss/_carbon-utilities.scss';
```

**Option 2: From `@carbon/styles`**

```scss
@use '@carbon/styles/scss/_carbon-utilities.scss';
```

**Option 3: From `@carbon/utilities`** (Direct access)

```scss
@use '@carbon/utilities/scss/carousel';
```

### Configuration to override animation time

```scss
@use '@carbon/utilities/scss/carousel' with (
  $animateTime: 500ms
);
```

### For Web Component Applications

If you're building Web Components, there are few mixins exported to be used for
wrappers and view items

**Import styles:**

```scss
@use '@carbon/styles/scss/_carbon-utilities.scss' as carousel; // or @use '@carbon/utilities/scss/carousel' as carousel ;

:host {
  @include carousel.carousel;
  or
  @include carousel.wrapperStyles; // for wrapper styles
  @include carousel.viewStyles; // for view styles
}
```

### Available Mixins

- `carousel()` - Includes all carousel styles (wrapper, and view styles)
- `wrapperStyles()` - Styles for the carousel wrapper container
- `viewStyles()` - Styles for different carousel view items

### Variables

- `$animateTime` - Animation duration (default: `$duration-moderate-02` from
  Carbon motion)
