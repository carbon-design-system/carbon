# carousal

`carousal` is a lightweight,headless, framework-agnostic JavaScript utility for
building swipeable, carousal like components

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

By default, the carousal responds to swipe gestures, horizontal scroll gestures,
and click-and-drag interactions. To disable this behavior, you can set the
`excludeSwipeSupport` flag to true.

Here's the usage example.

```html
<div id="myCarousal">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</div>
```

```ts
import { initCarousal } from '@carbon/utilities';

const container = document.getElementById('myCarousal');

const config = {
  onViewChangeStart: (startData) =>
    console.log('View change started', startData),
  onViewChangeEnd: (endData) => console.log('View change ended', endData),
  excludeSwipeSupport: false,
};
const carousal = initCarousal(container, config);

// Navigation controls
carousal.next();
carousal.prev();
carousal.goToIndex(2);
carousal.reset();
```

### Import styles

Apply `@include carouselClassStyles;` inside a SCSS file for React/class-based
components. Use `@include carouselHostStyles;` for Web Components with :host
selectors. Automatically handles animations, view transitions, and reduced
motion preferences across platforms.

```css

@use '@carbon/utilities/styles/carousal/_index.scss' as carousel;

//usage in react app
@include carousel.carouselClassStyles;

// usage in webcomponents
@include carousel.carouselHostStyles();


```
