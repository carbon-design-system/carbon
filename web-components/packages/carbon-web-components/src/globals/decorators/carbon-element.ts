/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
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
import {
  Constructor,
  ClassDescriptor,
} from '@lit/reactive-element/decorators/base.js';

/**
 * Allow for custom element classes with private constructors
 */
type CustomElementClass = Omit<typeof HTMLElement, 'new'>;

const legacyCustomElement = (tagName: string, clazz: CustomElementClass) => {
  try {
    customElements.define(tagName, clazz as CustomElementConstructor);
  } catch (error) {
    console.warn(`Attempting to re-define ${tagName}`);
  }
  // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason.
  // `Constructor<HTMLElement>` is helpful to make sure the decorator is
  // applied to elements however.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return clazz as any;
};

const standardCustomElement = (
  tagName: string,
  descriptor: ClassDescriptor
) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    // This callback is called once the class is otherwise fully defined
    finisher(clazz: Constructor<HTMLElement>) {
      try {
        customElements.define(tagName, clazz);
      } catch (error) {
        console.warn(`Attempting to re-define ${tagName}`);
      }
    },
  };
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
 *
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */
export const carbonElement =
  (tagName: string) =>
  (classOrDescriptor: CustomElementClass | ClassDescriptor) =>
    typeof classOrDescriptor === 'function'
      ? legacyCustomElement(tagName, classOrDescriptor)
      : standardCustomElement(tagName, classOrDescriptor as ClassDescriptor);
