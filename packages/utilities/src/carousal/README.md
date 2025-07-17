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

The utility can be initialized within any on-load function by passing the
carousal container element. It's important to set explicit width and height on
the container, as the utility uses the container's dimensions to calculate and
apply the size of its child elements. Once initialized, the utility returns a
set of APIs that allow for programmatic navigation between views.

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

```css
@use '@carbon/utilities/styles/carousal/_index.scss';
```
