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
carousel container element. Once initialized, it returns a set of APIs that
enable programmatic navigation between views.

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

## Height Management

The carousel automatically calculates and manages the height of the carousel
container based on the content of the carousel items. Understanding how height
is calculated helps you control the carousel's appearance.

### Height Calculation Modes

#### Default Mode (Minimum Height)

By default, the carousel calculates height based on the **smallest item**:

```ts
const carousel = initCarousel(container);
// Uses the smallest item height (minimum 10rem/160px)
```

**How it works:**

- Finds the smallest height among all carousel items
- Enforces a minimum threshold of **4rem ** at default font size
- If the smallest item is less than the threshold, uses the threshold height
- Ensures all items fit within the container without overflow

#### Maximum Height Mode

Use `useMaxHeight: true` to calculate based on the **largest item**:

```ts
const carousel = initCarousel(container, {
  useMaxHeight: true,
});
// Uses the largest item height
```

**How it works:**

- Finds the largest height among all carousel items
- Sets the container to accommodate the tallest item
- Ensures the tallest item is fully visible without scrolling
- All items are positioned absolutely within this maximum height

### Controlling Carousel Height

You have several options to control the carousel height:

#### 1. Use the `useMaxHeight` Configuration

```ts
// Use maximum item height
const carousel = initCarousel(container, {
  useMaxHeight: true,
});
```

#### 2. Set CSS Height on the Container

The carousel respects any height set via CSS. If the container height is greater
than the minimum threshold (4rem), automatic height calculation is bypassed:

```css
#myCarousel {
  height: 500px; /* Fixed height */
}
```

```ts
const carousel = initCarousel(document.getElementById('myCarousel'));
// Will use the 500px height from CSS
```

#### 3. Set Height on Individual Items

You can set explicit heights on carousel items, and the carousel will calculate
based on those heights:

```css
#myCarousel > div {
  height: 300px;
}
```

```ts
const carousel = initCarousel(document.getElementById('myCarousel'));
// Will calculate based on 300px item heights
```

### Height Calculation Examples

**Example 1: Variable height items (default mode)**

```html
<div id="carousel">
  <div style="height: 200px">Slide 1</div>
  <div style="height: 300px">Slide 2</div>
  <div style="height: 250px">Slide 3</div>
</div>
```

```ts
const carousel = initCarousel(document.getElementById('carousel'));
// Container height will be 200px (smallest item)
```

**Example 2: Variable height items (max height mode)**

```ts
const carousel = initCarousel(document.getElementById('carousel'), {
  useMaxHeight: true,
});
// Container height will be 300px (largest item)
```

**Example 3: Fixed container height**

```html
<div id="carousel" style="height: 400px">
  <div>Slide 1</div>
  <div>Slide 2</div>
</div>
```

```ts
const carousel = initCarousel(document.getElementById('carousel'));
// Container height remains 400px (CSS takes precedence)
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
