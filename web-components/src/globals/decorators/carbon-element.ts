/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */

import type { Constructor } from '@lit/reactive-element/decorators/base.js';

/**
 * Allow for custom element classes with private constructors
 */
type CustomElementClass = Omit<typeof HTMLElement, 'new'>;

export type CustomElementDecorator = {
  // legacy
  (cls: CustomElementClass): void;

  // standard
  (
    target: CustomElementClass,
    context: ClassDecoratorContext<Constructor<HTMLElement>>
  ): void;
};

/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */
export const carbonElement =
  (tagName: string): CustomElementDecorator =>
  (
    classOrTarget: CustomElementClass | Constructor<HTMLElement>,
    context?: ClassDecoratorContext<Constructor<HTMLElement>>
  ) => {
    if (context !== undefined) {
      context.addInitializer(() => {
        customElements.define(
          tagName,
          classOrTarget as CustomElementConstructor
        );
      });
    } else {
      try {
        customElements.define(
          tagName,
          classOrTarget as CustomElementConstructor
        );
      } catch (error) {
        console.warn(`Attempting to re-define ${tagName}`);
      }
    }
  };
