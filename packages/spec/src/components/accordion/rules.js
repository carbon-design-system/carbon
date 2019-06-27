/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ValidationError } from '../../error';
import { diff } from '../../tools/diff';
import { createExpected } from '../../tools/html';

import { pressEnter, pressSpace } from '../../tools/keyboard';

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
                'aria-controls': node => {
                  const attribute = node.getAttribute('aria-controls');
                  const id = node.parentNode.childNodes[1].id;
                  if (attribute !== id) {
                    return [
                      [
                        'Expected the value for `aria-controls` to match the id of the panel',
                        attribute,
                        id,
                      ],
                    ];
                  }
                },
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
    id: 'accordion.header.interaction.mouse',
    description:
      'The accordion header expands its associated panel on mouse click',
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
    id: 'accordion.header.interaction.keyboard.enter',
    description:
      'When focus is on the accordion header for a collapsed panel ' +
      'then pressing Enter will expand the associated panel',
    reference: 'https://www.w3.org/TR/wai-aria-practices/#accordion',
    level: 'error',
    context: defaultContext,
    validate(root, context, { wrapEvent }) {
      const headers = root.querySelectorAll('.bx--accordion__heading');

      document.addEventListener('keydown', () => {
        console.log('keydown');
      });

      for (let i = 0; i < context.children.length; i++) {
        const header = headers[i];
        header.focus();
        pressSpace(header);
        // console.log(document.activeElement);

        console.log(header.getAttribute('aria-expanded'));
        // if (header.getAttribute('aria-expanded') === 'false') {
        // return new ValidationError([
        // 'Expected aria-expanded to be true after the heading is clicked',
        // ]);
        // }
      }
    },
  },

  // ESC?

  // Keyboard
  // One of [Enter, Space]:
  // When focus is on the accordion header for a collapsed panel,
  // expands the associated panel.

  // Tab: moves focus to next focusable element. All focusable elements in the
  // accordion are included in the page Tab sequence

  // Shift + tab: moves focus to the previous focusable element; all focusable
  // elements in the accordoin are included the page Tab sequence

  // Optional
  // Down Arrow: if focus is on an accordion header
];
