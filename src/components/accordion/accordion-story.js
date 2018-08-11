import './_accordion.scss';

import { storiesOf } from '@storybook/html';
import Accordion from './accordion';

storiesOf('Accordion', module).add('default', () => {
  const root = document.createElement('div');

  const innerHTML = `<ul data-accordion class="bx--accordion">
  <li data-accordion-item class="bx--accordion__item">
    <button class="bx--accordion__heading" aria-expanded="false" aria-controls="pane1">
      <svg class="bx--accordion__arrow" width="7" height="12" viewBox="0 0 7 12">
        <path fill-rule="nonzero" d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z" />
      </svg>
      <p class="bx--accordion__title">Section 1 title </p>
    </button>
    <div id="pane1" class="bx--accordion__content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </li>
  <li data-accordion-item class="bx--accordion__item">
    <button class="bx--accordion__heading" aria-expanded="false" aria-controls="pane2">
      <svg class="bx--accordion__arrow" width="7" height="12" viewBox="0 0 7 12">
        <path fill-rule="nonzero" d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z" />
      </svg>
      <p class="bx--accordion__title">Section 2 title</p>
    </button>
    <div id="pane2" class="bx--accordion__content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </li>
  <li data-accordion-item class="bx--accordion__item">
    <button class="bx--accordion__heading" aria-expanded="false" aria-controls="pane3">
      <svg class="bx--accordion__arrow" width="7" height="12" viewBox="0 0 7 12">
        <path fill-rule="nonzero" d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z" />
      </svg>
      <p class="bx--accordion__title">Section 3 title</p>
    </button>
    <div id="pane3" class="bx--accordion__content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </li>
  <li data-accordion-item class="bx--accordion__item">
    <button class="bx--accordion__heading" aria-expanded="false" aria-controls="pane4">
      <svg class="bx--accordion__arrow" width="7" height="12" viewBox="0 0 7 12">
        <path fill-rule="nonzero" d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z" />
      </svg>
      <p class="bx--accordion__title">Section 4 title</p>
    </button>
    <div id="pane4" class="bx--accordion__content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </li>
    </ul>`
    .split('\n')
    .join('');

  root.innerHTML = innerHTML;

  const accordion = root.firstChild;

  new Accordion(accordion);

  return accordion;
});
