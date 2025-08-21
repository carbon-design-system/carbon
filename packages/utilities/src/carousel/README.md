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

### Import styles

Apply `@include carousel;` inside a SCSS file for React/class-based or Web
Components with :host selectors. Automatically handles animations, view
transitions, and reduced motion preferences across platforms.

```css
@use '@carbon/utilities/styles/carousel/_index.scss' as carousel;

@include carousel.carousel;
```
