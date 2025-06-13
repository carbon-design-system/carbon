/**
 * Copyright IBM Corp. 2025, 2025
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
 * Available flags:
 * - enable-dialog-element
 * - enable-treeview-controllable
 * - ... (and others listed in observedAttributes)
 *
 * How to check a Flag in your component:
 *   import { isFeatureFlagEnabled } from './feature-flags';
 *   isFeatureFlagEnabled('enable-dialog-element', this)
 *   Returns true if the flag is enabled in the nearest <feature-flags> ancestor
 */

import {
  FeatureFlags as GlobalFeatureFlags,
  createScope,
} from '@carbon/feature-flags';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { LitElement, html } from 'lit';

/**
 * Feature Flgs
 *
 * @element feature-flags
 */

type FeatureFlags = Record<string, boolean>;

@customElement('feature-flags')
class FeatureFlagsElement extends LitElement {
  private scope = GlobalFeatureFlags;
  private flags: FeatureFlags = {};

  static get observedAttributes() {
    return [
      'enable-v12-tile-default-icons',
      'enable-v12-tile-radio-icons',
      'enable-v12-overflowmenu',
      'enable-treeview-controllable',
      'enable-experimental-focus-wrap-without-sentinels',
      'enable-dialog-element',
      'enable-v12-dynamic-floating-styles',
    ];
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
    const value = newVal === 'true';
    this.flags[name] = value;
    this.updateScope();
  }

  private getParentScope(): FeatureFlagsElement | null {
    let parent = this.parentNode;
    while (parent) {
      if (parent instanceof FeatureFlagsElement) {
        return parent.getScope();
      }
      parent = parent.parentNode;
    }
    return null;
  }

  private updateScope() {
    const newScope = createScope(this.flags);
    const parentScope = this.getParentScope() || GlobalFeatureFlags;
    if (parentScope) {
      newScope.mergeWithScope(parentScope);
    }
    this.scope = newScope;
  }

  render() {
    return html` <slot></slot> `;
  }

  public isFeatureFlagEnabled(flag: string): boolean {
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
  let parent = el.parentNode;
  while (parent) {
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
  return instance?.isFeatureFlagEnabled(flag) ?? false;
}
