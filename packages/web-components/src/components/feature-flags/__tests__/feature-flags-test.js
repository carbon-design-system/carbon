/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import { isFeatureFlagEnabled } from '@carbon/web-components/es/components/feature-flags/index.js';
import '@carbon/web-components/es/components/toggle/index.js';

describe('feature-flag', function () {
  it('should render', async () => {
    const featureFlag = html`<feature-flags enable-dialog-element="true"
      ><div id="child"></div
    ></feature-flags>`;
    const el = await fixture(featureFlag);
    await expect(el).dom.to.equalSnapshot();
  });

  it('should add feature flag to child component', async () => {
    const featureFlag = html`<feature-flags
      enable-v12-toggle-reduced-label-spacing>
      <cds-toggle
        id="child"
        label-text="Label"
        label-a="On"
        label-b="Off"
        toggled></cds-toggle>
    </feature-flags>`;
    const el = await fixture(featureFlag);
    const child = el.querySelector('#child');
    expect(child).to.have.attribute(
      'enable-v12-toggle-reduced-label-spacing',
      ''
    );
  });

  it('should return true if feature is enabled', async () => {
    const featureFlag = html`<feature-flags enable-dialog-element="true"
      ><div id="child"></div
    ></feature-flags>`;
    const el = await fixture(featureFlag);
    const child = el.querySelector('#child');
    expect(child).to.exist;
    expect(isFeatureFlagEnabled('enable-dialog-element', child)).to.be.true;
  });

  it('should return true for boolean feature flag attributes', async () => {
    const featureFlag = html`<feature-flags enable-dialog-element
      ><div id="child"></div
    ></feature-flags>`;
    const el = await fixture(featureFlag);
    const child = el.querySelector('#child');
    expect(child).to.exist;
    expect(isFeatureFlagEnabled('enable-dialog-element', child)).to.be.true;
  });

  it('should return false if feature is disabled', async () => {
    const featureFlag = html`<feature-flags enable-dialog-element="false"
      ><div id="child"></div
    ></feature-flags>`;
    const el = await fixture(featureFlag);
    const child = el.querySelector('#child');
    expect(isFeatureFlagEnabled('enable-dialog-element', child)).to.be.false;
  });

  it('should enable v12 flags with the v12 release flag', async () => {
    const featureFlag = html`<feature-flags enable-v12-release
      ><div id="child"></div
    ></feature-flags>`;
    const el = await fixture(featureFlag);
    const child = el.querySelector('#child');
    expect(child).to.exist;
    expect(
      isFeatureFlagEnabled('enable-v12-toggle-reduced-label-spacing', child)
    ).to.be.true;
    expect(isFeatureFlagEnabled('enable-dialog-element', child)).to.be.false;
  });

  it('should add enabled v12 release flags to child components', async () => {
    const featureFlag = html`<feature-flags enable-v12-release>
      <cds-toggle
        id="child"
        label-text="Label"
        label-a="On"
        label-b="Off"
        toggled></cds-toggle>
    </feature-flags>`;
    const el = await fixture(featureFlag);
    const child = el.querySelector('#child');
    expect(child).to.have.attribute(
      'enable-v12-toggle-reduced-label-spacing',
      ''
    );
  });

  it('should remove v12 release flag attributes from child components when disabled', async () => {
    const featureFlag = html`<feature-flags enable-v12-release>
      <cds-toggle
        id="child"
        label-text="Label"
        label-a="On"
        label-b="Off"
        toggled></cds-toggle>
    </feature-flags>`;
    const el = await fixture(featureFlag);
    const child = el.querySelector('#child');
    expect(child).to.have.attribute(
      'enable-v12-toggle-reduced-label-spacing',
      ''
    );

    el.setAttribute('enable-v12-release', 'false');
    await el.updateComplete;

    expect(child).not.to.have.attribute(
      'enable-v12-toggle-reduced-label-spacing'
    );
  });

  it('should recognize multiple enabled flags', async () => {
    const el = await fixture(html`
      <feature-flags
        enable-dialog-element="true"
        enable-treeview-controllable="true">
        <div id="child"></div>
      </feature-flags>
    `);
    const child = el.querySelector('#child');
    expect(isFeatureFlagEnabled('enable-dialog-element', child)).to.be.true;
    expect(isFeatureFlagEnabled('enable-treeview-controllable', child)).to.be
      .true;
  });

  it('should inherit flags from parent feature-flags', async () => {
    const el = await fixture(html`
      <feature-flags enable-dialog-element="true">
        <feature-flags>
          <div id="child"></div>
        </feature-flags>
      </feature-flags>
    `);
    const child = el.querySelector('#child');
    expect(isFeatureFlagEnabled('enable-dialog-element', child)).to.be.true;
  });

  it('should inherit the v12 release flag from parent feature-flags', async () => {
    const el = await fixture(html`
      <feature-flags enable-v12-release>
        <feature-flags enable-v12-toggle-reduced-label-spacing="false">
          <div id="child"></div>
        </feature-flags>
      </feature-flags>
    `);
    const child = el.querySelector('#child');
    expect(
      isFeatureFlagEnabled('enable-v12-toggle-reduced-label-spacing', child)
    ).to.be.true;
  });

  it('should add inherited v12 release flag attributes in nested scopes', async () => {
    const el = await fixture(html`
      <feature-flags enable-v12-release>
        <feature-flags enable-v12-toggle-reduced-label-spacing="false">
          <cds-toggle
            id="child"
            label-text="Label"
            label-a="On"
            label-b="Off"
            toggled></cds-toggle>
        </feature-flags>
      </feature-flags>
    `);
    const child = el.querySelector('#child');
    expect(child).to.have.attribute(
      'enable-v12-toggle-reduced-label-spacing',
      ''
    );
  });

  it('should allow nested scopes to disable the v12 release flag', async () => {
    const el = await fixture(html`
      <feature-flags enable-v12-release>
        <feature-flags enable-v12-release="false">
          <cds-toggle
            id="child"
            label-text="Label"
            label-a="On"
            label-b="Off"
            toggled></cds-toggle>
        </feature-flags>
      </feature-flags>
    `);
    const child = el.querySelector('#child');
    expect(
      isFeatureFlagEnabled('enable-v12-toggle-reduced-label-spacing', child)
    ).to.be.false;
    expect(child).not.to.have.attribute(
      'enable-v12-toggle-reduced-label-spacing'
    );
  });

  it('should sync nested scopes when a parent v12 release flag changes', async () => {
    const el = await fixture(html`
      <feature-flags enable-v12-release>
        <div>
          <feature-flags>
            <cds-toggle
              id="child"
              label-text="Label"
              label-a="On"
              label-b="Off"
              toggled></cds-toggle>
          </feature-flags>
        </div>
      </feature-flags>
    `);
    const child = el.querySelector('#child');
    expect(child).to.have.attribute(
      'enable-v12-toggle-reduced-label-spacing',
      ''
    );

    el.setAttribute('enable-v12-release', 'false');
    await el.updateComplete;

    expect(
      isFeatureFlagEnabled('enable-v12-toggle-reduced-label-spacing', child)
    ).to.be.false;
    expect(child).not.to.have.attribute(
      'enable-v12-toggle-reduced-label-spacing'
    );
  });

  it('should override parent flag if child redefines it', async () => {
    const el = await fixture(html`
      <feature-flags enable-dialog-element="false">
        <feature-flags enable-dialog-element="true">
          <div id="child"></div>
        </feature-flags>
      </feature-flags>
    `);
    const child = el.querySelector('#child');
    expect(isFeatureFlagEnabled('enable-dialog-element', child)).to.be.true;
  });

  it('should return false for unknown flags', async () => {
    const el = await fixture(html`
      <feature-flags>
        <div id="child"></div>
      </feature-flags>
    `);
    const child = el.querySelector('#child');
    expect(isFeatureFlagEnabled('enable-dialog-element', child)).to.be.false;
  });
});
