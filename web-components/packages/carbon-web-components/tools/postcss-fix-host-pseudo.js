/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const postcss = require('postcss');
const parser = require('postcss-selector-parser');

const pseudoElementNames = [
  'first-line',
  'first-letter',
  'selection',
  'inactive-selection',
  'spelling-error',
  'grammar-error',
  'before',
  'after',
  'marker',
  'placeholder',
];
const rePseudoElements = new RegExp(`::?(${pseudoElementNames.join('|')})`);

/**
 * Below Sass code yields `:hover:host(bx-foo) svg` and `:host(bx-foo):hover svg` selectors.
 * We want `:host(bx-foo:hover)` instead.
 *
 * Though generating `:host(bx-foo:hover)` from below Sass code is not what Sass language intends,
 * `:hover:host(bx-foo) svg` or `:host(bx-foo):hover svg` is not meangful in real world.
 * Therefore this PostCSS plugin converts `:hover:host(bx-foo) svg` and `:host(bx-foo):hover svg` to `:host(bx-foo:hover)`.
 *
 * ```scss
 * .bx--foo {
 *   &:hover {
 *     svg {
 *       fill: white;
 *     }
 *   }
 * }
 *
 * :host(bx-foo) {
 *   @extend .bx--foo;
 * }
 *
 * :host(bx-foo) {
 *   &:hover {
 *     svg {
 *       fill: white;
 *     }
 *   }
 * }
 * ```
 */
// eslint-disable-next-line prefer-arrow-callback
module.exports = postcss.plugin('fix-host-pseudo', function postCssPluginFixHostPseudo() {
  return function fixHostPseudo(css) {
    css.walkRules(async rule => {
      await parser(selectors => {
        selectors.walkPseudos(pseudo => {
          if (pseudo.value === ':host') {
            if (pseudo.nodes.length !== 1 || pseudo.first.type !== 'selector') {
              // eslint-disable-next-line no-console
              console.warn('Found :host() with more than one child or with a non-selector child. Skipping...');
            } else {
              const pseudosToMove = [];
              for (
                let precedingNode = pseudo.prev();
                precedingNode && precedingNode.type !== 'combinator';
                precedingNode = precedingNode.prev()
              ) {
                if (precedingNode.type !== 'pseudo' || !rePseudoElements.test(precedingNode.value)) {
                  pseudosToMove.unshift(precedingNode);
                }
              }
              for (
                let followingNode = pseudo.next();
                followingNode && followingNode.type !== 'combinator';
                followingNode = followingNode.next()
              ) {
                if (followingNode.type !== 'pseudo' || !rePseudoElements.test(followingNode.value)) {
                  pseudosToMove.push(followingNode);
                }
              }
              pseudosToMove.forEach(item => {
                const newNode = item.clone();
                newNode.spaces.before = '';
                newNode.spaces.after = '';
                pseudo.first.append(newNode);
                item.remove();
              });
            }
          }
        });
      }).process(rule);
    });
  };
});
