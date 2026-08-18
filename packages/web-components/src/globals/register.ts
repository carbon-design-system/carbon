/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Public registration API for `@carbon/web-components`
 *
 * Component classes are side-effect free; importing a class does not
 * register it. Registration is opt-in, using `defineCustomElement`.
 * By default, Carbon web components auto-register via their import barrels.
 */

/**
 * Custom element constructor that carries the registered tag name as a
 * static `is` property instead of baking the tag name into a decorator.
 */
export interface CarbonCustomElementConstructor
  extends CustomElementConstructor {
  /**
   * the tag name this element registers under
   */
  is: string;
}

/**
 * Options for {@link defineCustomElement}
 */
export interface DefineCustomElementOptions {
  /**
   * The tag name to register under. Defaults to the class's static `is`.
   * Pass custom name to avoid global-registry collisions.
   *
   * ```js
   * import CDSButton from '@carbon/web-components/es/components/button/button.js';
   * import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';
   *
   * // <cwc-button>
   * defineCustomElement(CDSButton, { name: 'cwc-button' });
   * ```
   */
  name?: string;
  /**
   * A custom registry to define the element in. Defaults to the global
   * `customElements`. Pass a scoped `CustomElementRegistry` to keep registration
   * out of global namespace.
   *
   * ```js
   * import CDSButton from '@carbon/web-components/es/components/button/button.js';
   * import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';
   *
   * // Requires native support or the
   * // `@webcomponents/scoped-custom-element-registry` polyfill.
   * const registry = new CustomElementRegistry();
   * defineCustomElement(CDSButton, { registry });
   *
   * // <cds-button> resolves to this registry, not the global one
   * host.attachShadow({ mode: 'open', customElementRegistry: registry });
   * ```
   */
  registry?: CustomElementRegistry;
}

/**
 * Register a custom element class, under `options.name` in `options.registry`.
 * Called by the registering barrels so importing a class stays pure.
 *
 * Re-registering the same class under the same tag is a no-op. If the tag is
 * registered by a different class, i.e. two copies on the same page, the first
 * definition wins and a warning is emitted in development.
 *
 * Classes can only be registered once per registry. If the tag is free but
 * `clazz` is already registered under another name, e.g. a custom name call
 * after the default tag was defined, a subclass is registered under the new name
 * instead as `instanceof clazz`.
 *
 * @param clazz The custom element class to register
 * @param options Registration options
 * @returns The registered class, for re-export. This is `clazz` itself,
 *   except in the subclass case above, where it is the subclass that was
 *   actually registered under `options.name`.
 */
export const defineCustomElement = <T extends CarbonCustomElementConstructor>(
  clazz: T,
  options: DefineCustomElementOptions = {}
): T => {
  const registry = options.registry ?? customElements;
  const name = options.name ?? clazz.is;
  if (!name) {
    return clazz;
  }

  const existing = registry.get(name);

  if (existing) {
    // Tag already definied, redefining with same class is a no-op. If more than
    // one copy fights for tag the first definition wins
    if (existing !== clazz && process.env.NODE_ENV === 'development') {
      globalThis.console?.warn(
        `[@carbon/web-components] <${name}> is already defined by a different ` +
          `class. This usually means more than one copy of ` +
          `@carbon/web-components is on the page; the first definition wins and ` +
          `components may mix versions. Deduplicate the dependency, or register ` +
          `into a scoped registry.`
      );
    }
    return clazz;
  }

  // Tag name is free, but a class can only be registered once per registry.
  // If `clazz` is already registered under another name, e.g. default `cds-`,
  // `define()` throws `NotSupportedError`. Register new subclass under new
  // name instead, so the custom name works. Elements stay `instanceof clazz`.
  try {
    registry.define(name, clazz as unknown as CustomElementConstructor);
  } catch (error) {
    if (
      error == null ||
      (error as { name?: string }).name !== 'NotSupportedError'
    ) {
      throw error;
    }

    const ScopedElement = class extends (clazz as unknown as CustomElementConstructor) {};
    // keep static `is` in sync with the tag is was registered under
    Object.defineProperty(ScopedElement, 'is', { value: name });
    registry.define(name, ScopedElement);
    return ScopedElement as unknown as T;
  }

  return clazz;
};

export default defineCustomElement;
