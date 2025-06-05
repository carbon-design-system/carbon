import {
  FeatureFlags as GlobalFeatureFlags,
  createScope,
} from '@carbon/feature-flags';

type FeatureFlags = Record<string, boolean>;

export class FeatureFlagsElement extends HTMLElement {
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
    this.updateScope();
    this.render();
  }

  attributeChangedCallback(
    name: string,
    _oldVal: string | null,
    newVal: string | null
  ) {
    const value = newVal !== null && newVal !== 'false';
    this.flags[name] = value;
    this.updateScope();
    this.dispatchEvent(
      new CustomEvent('flags-changed', { detail: this.scope })
    );
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

  private render() {
    this.shadowRoot!.innerHTML = `<slot></slot>`;
  }

  public isFeatureFlagEnabled(flag: string): boolean {
    return this.scope.enabled(flag);
  }

  private getScope() {
    return this.scope;
  }
}

customElements.define('feature-flags', FeatureFlagsElement);

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
