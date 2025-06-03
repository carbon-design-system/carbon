import {
  FeatureFlags as GlobalFeatureFlags,
  createScope,
} from '@carbon/feature-flags';
import { setFeatureFlagsInstance } from '../../../.storybook/with-feature-flag';

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
    setFeatureFlagsInstance(this);
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

  private updateScope() {
    const newScope = createScope(this.flags);
    newScope.mergeWithScope(GlobalFeatureFlags);
    this.scope = newScope;
  }

  private render() {
    this.shadowRoot!.innerHTML = `<slot></slot>`;
  }

  /** Public API to set flags programmatically */
  public setFlags(flags: FeatureFlags) {
    this.flags = { ...this.flags, ...flags };
    this.updateScope();
    this.dispatchEvent(
      new CustomEvent('flags-changed', { detail: this.scope })
    );
  }

  /** Public API to check a flag */
  public isFeatureFlagEnabled(flag: string): boolean {
    console.log(`Checking feature flag: ${flag}`);
    return this.scope.enabled(flag);
  }

  /** Optional getter to expose all flags */
  public getScope() {
    return this.scope;
  }
}

customElements.define('feature-flags', FeatureFlagsElement);
