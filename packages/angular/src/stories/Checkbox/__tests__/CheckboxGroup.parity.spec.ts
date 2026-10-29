/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/checkbox/__tests__/checkbox-group-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 *
 * Each `it` keeps the WC test's title verbatim. Under ADR 0015 and ADR 0020 the host element
 * IS the web component, so assertions run against the shadow DOM of the
 * `cds-ng-checkbox-group` host.
 */

import { CheckboxComponent } from '../../../generated/Checkbox';
import { CheckboxGroupComponent } from '../../../generated/CheckboxGroup';
import { AiLabelComponent } from '../../../generated/AiLabel';
import { render } from '../../../testing/render';

const imports = [CheckboxGroupComponent, CheckboxComponent, AiLabelComponent];

type GroupEl = HTMLElement & {
  shadowRoot: ShadowRoot;
  updateComplete: Promise<void>;
  disabled: boolean;
};

const group = (el: HTMLElement) =>
  el.querySelector('cds-ng-checkbox-group') as GroupEl;

const children = `
  <cds-ng-checkbox default-checked>Checkbox label</cds-ng-checkbox>
  <cds-ng-checkbox>Checkbox label</cds-ng-checkbox>`;

describe('cds-ng-checkbox-group (parity with web-components checkbox-group-test.js)', () => {
  it('should render', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group legendText="Checkbox heading"></cds-ng-checkbox-group>`,
      imports
    );
    const root = group(fixture.nativeElement).shadowRoot;
    expect(root.querySelector('fieldset')).toBeTruthy();
    expect(root.querySelector('legend')?.textContent?.trim()).toBe(
      'Checkbox heading'
    );
  });

  it('should render helper-text', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group legendText="Checkbox heading" helperText="Helper text"></cds-ng-checkbox-group>`,
      imports
    );
    const helperText = group(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form__helper-text'
    );
    expect(helperText).toBeTruthy();
    expect(helperText?.textContent?.trim()).toBe('Helper text');
  });

  it('should display helper-text when invalid is true but disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group [invalid]="true" [disabled]="true" helperText="Helper text" legendText="Checkbox heading">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const helperText = group(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form__helper-text'
    );
    expect(helperText).toBeTruthy();
    expect(helperText?.textContent?.trim()).toBe('Helper text');
  });

  it('should set data-invalid when invalid attribute is true', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group [invalid]="true" legendText="Checkbox heading">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const fieldset = group(fixture.nativeElement).shadowRoot.querySelector(
      'fieldset'
    ) as HTMLElement;
    expect(fieldset.hasAttribute('data-invalid')).toBe(true);
  });

  it('should not set data-invalid when invalid attribute is true but readOnly', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group [invalid]="true" [readonly]="true" legendText="Checkbox heading">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const fieldset = group(fixture.nativeElement).shadowRoot.querySelector(
      'fieldset'
    ) as HTMLElement;
    expect(fieldset.hasAttribute('data-invalid')).toBe(false);
  });

  it('should not set data-invalid when invalid attribute is true but disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group [invalid]="true" [disabled]="true" legendText="Checkbox heading">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const fieldset = group(fixture.nativeElement).shadowRoot.querySelector(
      'fieldset'
    ) as HTMLElement;
    expect(fieldset.hasAttribute('data-invalid')).toBe(false);
  });

  it('should display invalid-text if invalid attribute is true', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group [invalid]="true" invalidText="Invalid text" legendText="Checkbox heading">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const invalidText = group(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(invalidText).toBeTruthy();
    expect(invalidText?.textContent?.trim()).toBe('Invalid text');
  });

  it('should clear child invalid-group state when group is disabled', async () => {
    const { fixture, host, update } = await render<{ disabled: boolean }>(
      `<cds-ng-checkbox-group [invalid]="true" [disabled]="disabled" legendText="Checkbox heading">${children}</cds-ng-checkbox-group>`,
      imports,
      { disabled: false }
    );
    const first = fixture.nativeElement.querySelector(
      'cds-ng-checkbox'
    ) as HTMLElement;
    expect(first.hasAttribute('invalid-group')).toBe(true);

    host.disabled = true;
    await update();

    expect(first.hasAttribute('invalid-group')).toBe(false);
  });

  it('should not display invalid-text if invalid attribute is true but readOnly', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group [invalid]="true" [readonly]="true" invalidText="Invalid text" legendText="Checkbox heading">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const invalidText = group(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(invalidText).toBeNull();
  });

  it('should not display invalid-text if invalid attribute is true but disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group [invalid]="true" [disabled]="true" invalidText="Invalid text" legendText="Checkbox heading">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const invalidText = group(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(invalidText).toBeNull();
  });

  it('should render legend-text', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group legendText="Checkbox heading"></cds-ng-checkbox-group>`,
      imports
    );
    const legend = group(fixture.nativeElement).shadowRoot.querySelector(
      'legend'
    );
    expect(legend).toBeTruthy();
    expect(legend?.textContent?.trim()).toBe('Checkbox heading');
  });

  it('should respect readOnly prop', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group legendText="Checkbox heading" [readonly]="true">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const fieldset = group(fixture.nativeElement).shadowRoot.querySelector(
      'fieldset'
    ) as HTMLElement;
    expect(fieldset.hasAttribute('aria-disabled')).toBe(true);
  });

  it('should respect warn prop', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group legendText="Checkbox heading" [warn]="true">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const warnIcon = group(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--checkbox__invalid-icon--warning'
    );
    expect(warnIcon).toBeTruthy();
  });

  it('should display warn-text if warn attribute is true', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group legendText="Checkbox heading" [warn]="true" warn-text="Warn text">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const warnText = group(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(warnText).toBeTruthy();
    expect(warnText?.textContent?.trim()).toBe('Warn text');
  });

  it('should not display warn-text if warn attribute is true but readOnly', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group legendText="Checkbox heading" [readonly]="true" [warn]="true" warn-text="Warn text">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const warnText = group(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(warnText).toBeNull();
  });

  it('should not display warn-text if warn attribute is true but disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group legendText="Checkbox heading" [disabled]="true" [warn]="true" warn-text="Warn text">${children}</cds-ng-checkbox-group>`,
      imports
    );
    const warnText = group(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(warnText).toBeNull();
  });

  const aiLabelBody = `
    <div slot="body-text">
      <p class="secondary">AI Explained</p>
      <h2 class="ai-label-heading">84%</h2>
    </div>`;

  const assignedAiLabel = (el: HTMLElement, slotName: string) => {
    const slot = group(el).shadowRoot.querySelector(
      `slot[name="${slotName}"]`
    ) as HTMLSlotElement;
    return slot
      .assignedNodes({ flatten: true })
      .find(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as Element).tagName.toLowerCase() === 'cds-ng-ai-label'
      );
  };

  it('should respect deprecated slug prop', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group legendText="Checkbox heading">
        <cds-ng-ai-label slot="slug" alignment="bottom-left">${aiLabelBody}</cds-ng-ai-label>
      </cds-ng-checkbox-group>`,
      imports
    );
    expect(assignedAiLabel(fixture.nativeElement, 'slug')).toBeTruthy();
  });

  it('should respect decorator prop', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group legendText="Checkbox heading">
        <cds-ng-ai-label slot="decorator" alignment="bottom-left">${aiLabelBody}</cds-ng-ai-label>
      </cds-ng-checkbox-group>`,
      imports
    );
    expect(assignedAiLabel(fixture.nativeElement, 'decorator')).toBeTruthy();
  });

  it('should render checkboxes horizontally', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-group orientation="horizontal" legendText="test-horizontal-prop">
        <cds-ng-checkbox>Checkbox label 1</cds-ng-checkbox>
        <cds-ng-checkbox>Checkbox label 2</cds-ng-checkbox>
        <cds-ng-checkbox>Checkbox label 3</cds-ng-checkbox>
      </cds-ng-checkbox-group>`,
      imports
    );
    const fieldset = group(fixture.nativeElement).shadowRoot.querySelector(
      'fieldset'
    ) as HTMLElement;
    expect(
      fieldset.classList.contains('cds-ng--checkbox-group--horizontal')
    ).toBe(true);
  });
});
