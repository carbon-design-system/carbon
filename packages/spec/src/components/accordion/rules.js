/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ValidationError } from '../../error';
import { axe } from '../../aat';
import { diff } from '../../tools/diff';
import { createExpected } from '../../tools/html';

import {
  press,
  pressEnter,
  pressSpace,
  pressTab,
  pressShiftTab,
} from '../../tools/keyboard';

const defaultContext = {
  children: [
    {
      header: 'header-1',
      panel: 'panel-1',
    },
    {
      header: 'header-2',
      panel: 'panel-2',
    },
    {
      header: 'header-3',
      panel: 'panel-3',
    },
  ],
};

export const rules = [
  {
    id: 'accordion.markup',
    description:
      'The accordion default state matches at least the expected HTML structure',
    level: 'error',
    context: defaultContext,
    validate(root, context) {
      const expected = createExpected(
        'ul',
        {
          class: 'bx--accordion',
        },
        ...context.children.map(child =>
          createExpected(
            'li',
            {
              class: 'bx--accordion__item',
            },
            createExpected(
              'button',
              {
                class: 'bx--accordion__heading',
                'aria-expanded': 'false',
              },
              createExpected('svg', {
                class: 'bx--accordion__arrow',
              })
            ),
            createExpected(
              'div',
              {
                class: 'bx--accordion__content',
              },
              child.panel
            )
          )
        )
      );

      const differences = diff(expected, root);
      if (differences.length > 0) {
        return differences.map(difference => new ValidationError(difference));
      }
    },
  },

  {
    id: 'accordion.header.interaction.expand.mouse',
    description:
      'An accordion header expands its associated panel on mouse click',
    reference: 'https://www.w3.org/TR/wai-aria-practices/#accordion',
    level: 'error',
    context: defaultContext,
    validate(root, context) {
      const headers = root.querySelectorAll('.bx--accordion__heading');

      for (let i = 0; i < context.children.length; i++) {
        const header = headers[i];
        header.click();

        if (header.getAttribute('aria-expanded') === 'false') {
          return new ValidationError([
            'Expected aria-expanded to be true after the heading is clicked',
          ]);
        }
      }
    },
  },

  {
    id: 'accordion.header.interaction.collapse.mouse',
    description:
      'An accordion header collapses its associated panel on mouse click if ' +
      'the panel is open',
    reference: 'https://www.w3.org/TR/wai-aria-practices/#accordion',
    level: 'error',
    context: defaultContext,
    validate(root, context) {
      const headers = root.querySelectorAll('.bx--accordion__heading');

      for (let i = 0; i < context.children.length; i++) {
        const header = headers[i];
        header.click();
        header.click();

        if (header.getAttribute('aria-expanded') === 'true') {
          return new ValidationError([
            'Expected aria-expanded to be true after the heading is clicked',
          ]);
        }
      }
    },
  },

  {
    id: 'accordion.header.interaction.expand.keyboard.enter',
    description:
      'When focus is on the accordion header for a collapsed panel ' +
      'then pressing Enter will expand the associated panel',
    reference: 'https://www.w3.org/TR/wai-aria-practices/#accordion',
    level: 'error',
    context: defaultContext,
    validate(root, context) {
      const headers = root.querySelectorAll('.bx--accordion__heading');

      for (let i = 0; i < context.children.length; i++) {
        pressTab(root);
        pressEnter(document.activeElement);

        if (headers[i].getAttribute('aria-expanded') === 'false') {
          return new ValidationError([
            'Expected aria-expanded to be true after the heading is clicked',
          ]);
        }
      }
    },
  },

  {
    id: 'accordion.header.interaction.collapse.keyboard.enter',
    description:
      'When focus is on the accordion header for a collapsed panel ' +
      'then pressing Enter will expand the associated panel',
    reference: 'https://www.w3.org/TR/wai-aria-practices/#accordion',
    level: 'error',
    context: defaultContext,
    validate(root, context) {
      const headers = root.querySelectorAll('.bx--accordion__heading');

      for (let i = 0; i < context.children.length; i++) {
        pressTab(root);
        pressEnter(document.activeElement);
        pressEnter(document.activeElement);

        if (headers[i].getAttribute('aria-expanded') === 'true') {
          return new ValidationError([
            'Expected aria-expanded to be false after the heading is collapsed',
          ]);
        }
      }
    },
  },

  {
    id: 'accordion.header.interaction.expand.keyboard.space',
    description:
      'When focus is on the accordion header for a collapsed panel ' +
      'then pressing Space will expand the associated panel',
    reference: 'https://www.w3.org/TR/wai-aria-practices/#accordion',
    level: 'error',
    context: defaultContext,
    validate(root, context) {
      const headers = root.querySelectorAll('.bx--accordion__heading');

      for (let i = 0; i < context.children.length; i++) {
        pressTab(root);
        pressSpace(document.activeElement);

        if (headers[i].getAttribute('aria-expanded') === 'false') {
          return new ValidationError([
            'Expected aria-expanded to be true after the heading is clicked',
          ]);
        }
      }
    },
  },

  {
    id: 'accordion.header.interaction.collapse.keyboard.space',
    description:
      'When focus is on the accordion header for a expanded panel ' +
      'then pressing Space will collapse the associated panel',
    reference: 'https://www.w3.org/TR/wai-aria-practices/#accordion',
    level: 'error',
    context: defaultContext,
    validate(root, context) {
      const headers = root.querySelectorAll('.bx--accordion__heading');

      for (let i = 0; i < context.children.length; i++) {
        pressTab(root);
        pressSpace(document.activeElement);
        pressSpace(document.activeElement);

        if (headers[i].getAttribute('aria-expanded') === 'true') {
          return new ValidationError([
            'Expected aria-expanded to be false after the heading is collapsed',
          ]);
        }
      }
    },
  },

  {
    id: 'accordion.header.interaction.move.keyboard.tab',
    description:
      'Moves focus to the next focusable element; all focusable ' +
      'elements in the accordion are included in the page Tab sequence.',
    reference: 'https://www.w3.org/TR/wai-aria-practices/#accordion',
    level: 'error',
    context: defaultContext,
    validate(root, context) {
      const headers = root.querySelectorAll('.bx--accordion__heading');

      for (let i = 0; i < context.children.length; i++) {
        pressTab(document.body);
        if (document.activeElement !== headers[i]) {
          return new ValidationError([
            'Expected elements in accordion to follow page Tab sequence.',
          ]);
        }
      }
    },
  },

  {
    id: 'accordion.interaction.movement.keyboard.shift+tab',
    description:
      'Moves focus to the previous focusable element; all focusable elements ' +
      'in the accordion are included in the page Tab sequence.',
    reference: 'https://www.w3.org/TR/wai-aria-practices/#accordion',
    level: 'error',
    context: defaultContext,
    validate(root, context) {
      const headers = root.querySelectorAll('.bx--accordion__heading');

      for (let i = context.children.length - 1; i >= 0; i--) {
        pressShiftTab();
        if (document.activeElement !== headers[i]) {
          return new ValidationError([
            'Expected elements in accordion to follow page Tab sequence.',
          ]);
        }
      }
    },
  },

  {
    id: 'accordion.interaction.movement.keyboard.down-arrow',
    description:
      'If focus is on an accordion header, moves focus to ' +
      'the next accordion header. If focus is on the last accordion header, ' +
      'either does nothing or moves focus to the first accordion header.',
    reference: 'https://www.w3.org/TR/wai-aria-practices/#accordion',
    level: 'error',
    context: defaultContext,
    validate(root) {
      const headers = root.querySelectorAll('.bx--accordion__heading');

      pressTab();

      for (let i = 1; i < headers.length; i++) {
        press(document.activeElement, 'ArrowDown');
        if (headers[i] !== document.activeElement) {
          return new ValidationError([
            'Expected ArrowDown to move focus to the next accordion header',
          ]);
        }
      }
    },
  },

  // TODO:
  // UpArrow
  // Home/End

  {
    id: 'accordion.header.target.size',
    description:
      'The target size for triggering an accordion header should ' +
      'meet the minimum size requirement of 40px by 40px',
    reference: 'TODO',
    level: 'error',
    context: defaultContext,
    validate() {
      // TODO: would need to be run in a real browser that implements a layout
      // engine
    },
  },

  {
    id: 'accordion.header.interaction.click.cancel',
    description: 'State change should not occur click cancel',
    reference: 'TODO',
    level: 'error',
    context: defaultContext,
    validate() {
      // TODO: would need to be run in a real browser that implements a layout
      // engine
    },
  },

  {
    id: 'accordion.aat.axe',
    description: 'should pass axe automated accessibility tests',
    reference: 'https://www.deque.com/axe/',
    level: 'error',
    context: defaultContext,
    async validate(root) {
      const { violations } = await axe(root);
      if (violations.length > 0) {
        return new ValidationError(violations);
      }
    },
  },
];
