/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * <feature-flags> provides scoped feature flags to child components.
 *
 * Usage:
 * Wrap any child components inside <feature-flags> to provide scoped feature flags like this:
 * <feature-flags enable-dialog-element="true">
 *   <component></component>
 * </feature-flags>
 *
 * The supported flags are documented as `@attr` tags on `FeatureFlagsElement`
 * below, which is also what surfaces them in `custom-elements.json`.
 *
 * How to check a Flag in your component:
 *   import { isFeatureFlagEnabled } from './feature-flags';
 *   isFeatureFlagEnabled('enable-dialog-element', this)
 *   Returns true if the flag is enabled in the nearest <feature-flags> ancestor
 */

import {
  FeatureFlags as GlobalFeatureFlags,
  createScope,
  notifyAvailableFlag,
} from '@carbon/feature-flags';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { LitElement, html } from 'lit';

type FeatureFlags = Record<string, boolean>;

const hasOwn = <T extends object>(obj: T, key: PropertyKey): key is keyof T =>
  Object.prototype.hasOwnProperty.call(obj, key);

/**
 * Feature Flags
 *
 * Provides scoped feature flags to child components. Flags are read from the
 * nearest `<feature-flags>` ancestor, and nested elements inherit any flag they
 * do not set themselves.
 *
 * Attributes are declared below rather than inferred, because the flag list is
 * built at runtime from `observedAttributes` and cannot be read statically.
 *
 * @element feature-flags
 *
 * @attr {boolean} enable-v12-release - Enable the features and functionality
 * for the v12 Release. Enabling this turns on every `enable-v12-*` flag at
 * once.
 * @attr {boolean} enable-v12-tile-default-icons - Enable rendering of default
 * icons in the tile components. Becomes the default behavior in v12.
 * @attr {boolean} enable-v12-tile-radio-icons - Enable rendering of radio icons
 * in the `cds-radio-tile` component. Becomes the default behavior in v12.
 * @attr {boolean} enable-v12-overflowmenu - Enable the use of the v12
 * `cds-overflow-menu` leveraging the menu subcomponents. Becomes the default
 * behavior in v12.
 * @attr {boolean} enable-v12-dynamic-floating-styles - Enable dynamic setting
 * of floating styles for components like `cds-popover`, `cds-tooltip`, etc.
 * Becomes the default behavior in v12.
 * @attr {boolean} enable-v12-toggle-reduced-label-spacing - Enable a reduced
 * spacing between the toggle control and its label. Becomes the default
 * behavior in v12.
 * @attr {boolean} enable-treeview-controllable - Enable the new `cds-treeview`
 * controllable API.
 * @attr {boolean} enable-dialog-element - Enable components to utilize the
 * native `dialog` element.
 * @attr {boolean} enable-focus-wrap-without-sentinels - Enable the new focus
 * wrap behavior that doesn't use sentinel nodes.
 * @attr {boolean} enable-experimental-focus-wrap-without-sentinels - Deprecated,
 * use `enable-focus-wrap-without-sentinels` instead.
 */
@customElement('feature-flags')
class FeatureFlagsElement extends LitElement {
  private scope = GlobalFeatureFlags;
  private flags: FeatureFlags = {};

  /**
   * Mapping of feature flag attributes to their related component names.
   */
  private static readonly flagComponentMap = {
    'enable-v12-release': null,
    'enable-v12-tile-default-icons': 'CDS-CLICKABLE-TILE',
    'enable-v12-tile-radio-icons': 'CDS-TILE',
    'enable-v12-overflowmenu': 'CDS-OVERFLOW-MENU',
    'enable-treeview-controllable': 'CDS-TREEVIEW',
    'enable-experimental-focus-wrap-without-sentinels': 'CDS-FOCUS-WRAP',
    'enable-focus-wrap-without-sentinels': 'CDS-FOCUS-WRAP',
    'enable-dialog-element': 'CDS-MODAL',
    'enable-v12-dynamic-floating-styles': 'CDS-FLOATING',
    'enable-v12-toggle-reduced-label-spacing': 'CDS-TOGGLE',
  } as const;

  static get observedAttributes() {
    return Object.keys(FeatureFlagsElement.flagComponentMap);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateScope();
  }

  attributeChangedCallback(
    name: string,
    _oldVal: string | null,
    newVal: string | null
  ) {
    const value = newVal !== null && newVal !== 'false';
    this.flags[name] = value;

    // Set feature flag to top component level
    const relatedComponent = hasOwn(FeatureFlagsElement.flagComponentMap, name)
      ? FeatureFlagsElement.flagComponentMap[name]
      : null;
    if (
      relatedComponent &&
      this.firstElementChild?.tagName === relatedComponent
    ) {
      this.firstElementChild.setAttribute(name, '');
    }

    this.updateScope();
  }

  private syncFeatureFlagAttributes() {
    for (const [flag, relatedComponent] of Object.entries(
      FeatureFlagsElement.flagComponentMap
    )) {
      if (!relatedComponent) {
        continue;
      }

      let isEnabled = false;
      try {
        isEnabled = this.scope.enabled(flag);
      } catch {
        isEnabled = false;
      }

      for (const element of this.querySelectorAll(
        relatedComponent.toLowerCase()
      )) {
        if (findParentFeatureFlags(element as HTMLElement) !== this) {
          continue;
        }

        if (isEnabled) {
          element.setAttribute(flag, '');
        } else {
          element.removeAttribute(flag);
        }
      }
    }
  }

  private getParentFeatureFlagsElement() {
    let parent: Node | null = this.parentNode;
    while (parent) {
      if (parent instanceof ShadowRoot) {
        parent = parent.host;
        continue;
      }
      if (parent instanceof FeatureFlagsElement) {
        return parent;
      }
      parent = parent.parentNode;
    }
    return null;
  }

  private getParentScope() {
    return this.getParentFeatureFlagsElement()?.getScope() ?? null;
  }

  private syncChildFeatureFlagScopes() {
    for (const element of this.querySelectorAll('feature-flags')) {
      if (
        element instanceof FeatureFlagsElement &&
        element.getParentFeatureFlagsElement() === this
      ) {
        element.updateScope();
      }
    }
  }

  private updateScope() {
    const newScope = createScope(this.flags);
    const parentScope = this.getParentScope() || GlobalFeatureFlags;
    if (parentScope) {
      newScope.mergeWithScope(parentScope);
    }
    this.scope = newScope;
    this.syncFeatureFlagAttributes();
    this.syncChildFeatureFlagScopes();
  }

  render() {
    return html` <slot></slot> `;
  }

  public isFeatureFlagEnabled(flag: string) {
    return this.scope.enabled(flag);
  }

  private getScope() {
    return this.scope;
  }
}

export default FeatureFlagsElement;

// Utility functions

// Function to find the nearest parent FeatureFlagsElement
export function findParentFeatureFlags(
  el: HTMLElement
): FeatureFlagsElement | null {
  let parent: Node | null = el.parentNode;
  while (parent) {
    if (parent instanceof ShadowRoot) {
      parent = parent.host;
      continue;
    }
    if (parent instanceof FeatureFlagsElement) {
      return parent;
    }
    parent = (parent as HTMLElement).parentNode;
  }
  return null;
}

// function to check if a feature flag is enabled in components
export function isFeatureFlagEnabled(
  flag: string,
  context: HTMLElement
): boolean {
  const instance = findParentFeatureFlags(context);
  const enabled = instance?.isFeatureFlagEnabled(flag) ?? false;

  if (process.env.NODE_ENV !== 'production') {
    notifyAvailableFlag(flag, enabled);
  }

  return enabled;
}
