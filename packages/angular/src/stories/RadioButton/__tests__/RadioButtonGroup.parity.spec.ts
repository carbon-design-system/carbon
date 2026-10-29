/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/radio-button/__tests__/radio-button-group-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 */

import { RadioButtonComponent } from '../../../generated/RadioButton';
import { RadioButtonGroupComponent } from '../../../generated/RadioButtonGroup';
import { render } from '../../../testing/render';

const imports = [RadioButtonComponent, RadioButtonGroupComponent];

const groupWc = (el: HTMLElement) =>
  el.querySelector('cds-ng-radio-button-group') as HTMLElement & {
    value: string;
    shadowRoot: ShadowRoot;
    updateComplete: Promise<void>;
  };

const radioWc = (el: HTMLElement, value: string) =>
  el.querySelector(`cds-ng-radio-button[value="${value}"]`) as HTMLElement & {
    checked: boolean;
    updateComplete: Promise<void>;
  };

describe('cds-ng-radio-button-group (parity with web-components radio-button-group-test.js)', () => {
  it('should render `legend-text`', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group legendText="test">
        <cds-ng-radio-button></cds-ng-radio-button>
        <cds-ng-radio-button></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    const legend = host.shadowRoot?.querySelector('legend');
    expect(legend).toBeTruthy();
    expect(legend?.textContent).toContain('test');
  });

  it('should render a <fieldset> wrapper', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group legendText="test">
        <cds-ng-radio-button></cds-ng-radio-button>
        <cds-ng-radio-button></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    const fieldset = host.shadowRoot?.querySelector('fieldset');
    expect(fieldset).toBeTruthy();
  });

  it('should associate helper text with the <fieldset>', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group helperText="Helper text">
        <cds-ng-radio-button></cds-ng-radio-button>
        <cds-ng-radio-button></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    const fieldset = host.shadowRoot?.querySelector('fieldset');
    const helperText = host.shadowRoot?.querySelector(
      '.cds-ng--form__helper-text, .cds--form__helper-text'
    );

    expect(helperText).toBeTruthy();
    expect(fieldset?.getAttribute('aria-describedby')).toBe(helperText?.id);
  });

  it('should render `legend-text` inside a <fieldset>', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group legendText="test">
        <cds-ng-radio-button></cds-ng-radio-button>
        <cds-ng-radio-button></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    const legend = host.shadowRoot?.querySelector('legend');
    expect(legend).toBeTruthy();
    expect(legend?.textContent).toContain('test');
    const fieldset = legend?.closest('fieldset');
    expect(fieldset).toBeTruthy();
  });

  it('should render <cds-radio-button> children', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group>
        <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
        <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    const rb1 = host.querySelector('cds-ng-radio-button[value="test-1"]');
    const rb2 = host.querySelector('cds-ng-radio-button[value="test-2"]');
    expect(rb1).toBeTruthy();
    expect(rb2).toBeTruthy();
  });

  it('supports a custom class', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group class="test-class">
        <cds-ng-radio-button></cds-ng-radio-button>
        <cds-ng-radio-button></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    expect(host.classList.contains('test-class')).toBe(true);
  });

  it('disables the <fieldset> when disabled', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group [disabled]="true">
        <cds-ng-radio-button></cds-ng-radio-button>
        <cds-ng-radio-button></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    const fieldset = host.shadowRoot?.querySelector(
      'fieldset'
    ) as HTMLFieldSetElement;
    expect(fieldset?.disabled).toBe(true);
  });

  it('respects disabled to prevent changes', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group [disabled]="true">
        <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    const rb = radioWc(host, 'test-1');
    expect(rb?.checked).toBe(false);

    rb?.click();
    await host.updateComplete;

    expect(rb?.checked).toBe(false);
  });

  it('respects readOnly to prevent changes', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group [readOnly]="true">
        <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    const rb = radioWc(host, 'test-1');
    expect(rb?.checked).toBe(false);

    rb?.click();
    await host.updateComplete;

    expect(rb?.checked).toBe(false);
  });

  it('selects initial value', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group value="test-1">
        <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
        <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    const rb1 = radioWc(host, 'test-1');
    expect(rb1?.checked).toBe(true);
  });

  it('should support `checked` attribute in radio-button when there is no value in group', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button-group>
        <cds-ng-radio-button checked value="test-1"></cds-ng-radio-button>
        <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports
    );
    const host = groupWc(fixture.nativeElement);
    const rb1 = radioWc(host, 'test-1');
    expect(rb1?.checked).toBe(true);
  });

  it('updates selection when `value` prop changes programmatically', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `
      <cds-ng-radio-button-group [value]="groupValue">
        <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
        <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports,
      { groupValue: 'test-1' }
    );
    const host = groupWc(fixture.nativeElement);
    const rb1 = radioWc(host, 'test-1');
    const rb2 = radioWc(host, 'test-2');
    expect(rb1?.checked).toBe(true);
    expect(rb2?.checked).toBe(false);

    h.groupValue = 'test-2';
    await update();

    expect(rb1?.checked).toBe(false);
    expect(rb2?.checked).toBe(true);
  });

  it('updates selection when value is set while the group is readonly', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `
      <cds-ng-radio-button-group [readOnly]="true" [value]="groupValue">
        <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
        <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
      </cds-ng-radio-button-group>
      `,
      imports,
      { groupValue: 'test-1' }
    );
    const host = groupWc(fixture.nativeElement);
    h.groupValue = 'test-2';
    await update();

    const rb1 = radioWc(host, 'test-1');
    const rb2 = radioWc(host, 'test-2');

    expect(rb1?.checked).toBe(false);
    expect(rb2?.checked).toBe(true);
  });

  describe('Invalid and Warning States', () => {
    it('should show invalid message when invalid prop is true', async () => {
      const { fixture } = await render(
        `
        <cds-ng-radio-button-group [invalid]="true" invalidText="Invalid selection">
          <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
          <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
        </cds-ng-radio-button-group>
        `,
        imports
      );
      const host = groupWc(fixture.nativeElement);
      const invalidMessage = host.shadowRoot?.querySelector(
        '.cds-ng--form-requirement, .cds--form-requirement'
      );
      expect(invalidMessage).toBeTruthy();
      expect(invalidMessage?.textContent).toContain('Invalid selection');

      const fieldset = host.shadowRoot?.querySelector('fieldset');
      expect(
        fieldset?.classList.contains('cds-ng--radio-button-group--invalid') ||
          fieldset?.classList.contains('cds--radio-button-group--invalid')
      ).toBe(true);
      expect(fieldset?.getAttribute('aria-describedby')).toBe(
        invalidMessage?.id
      );
    });

    it('should show warning message when warn prop is true', async () => {
      const { fixture } = await render(
        `
        <cds-ng-radio-button-group [warn]="true" warnText="Warning message">
          <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
          <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
        </cds-ng-radio-button-group>
        `,
        imports
      );
      const host = groupWc(fixture.nativeElement);
      const warnMessage = host.shadowRoot?.querySelector(
        '.cds-ng--form-requirement, .cds--form-requirement'
      );
      expect(warnMessage).toBeTruthy();
      expect(warnMessage?.textContent).toContain('Warning message');

      const fieldset = host.shadowRoot?.querySelector('fieldset');
      expect(
        fieldset?.classList.contains('cds-ng--radio-button-group--warning') ||
          fieldset?.classList.contains('cds--radio-button-group--warning')
      ).toBe(true);
      expect(fieldset?.getAttribute('aria-describedby')).toBe(warnMessage?.id);
    });

    it('should not show invalid message or class when disabled and invalid', async () => {
      const { fixture } = await render(
        `
        <cds-ng-radio-button-group
          [disabled]="true"
          [invalid]="true"
          invalidText="Invalid selection">
          <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
          <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
        </cds-ng-radio-button-group>
        `,
        imports
      );
      const host = groupWc(fixture.nativeElement);
      const invalidMessage = host.shadowRoot?.querySelector(
        '.cds-ng--form-requirement, .cds--form-requirement'
      );
      expect(invalidMessage).toBeNull();

      const fieldset = host.shadowRoot?.querySelector('fieldset');
      expect(
        fieldset?.classList.contains('cds-ng--radio-button-group--invalid') ||
          fieldset?.classList.contains('cds--radio-button-group--invalid')
      ).toBe(false);
    });

    it('should not show warning message or class when disabled and warn', async () => {
      const { fixture } = await render(
        `
        <cds-ng-radio-button-group
          [disabled]="true"
          [warn]="true"
          warnText="Warning message">
          <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
          <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
        </cds-ng-radio-button-group>
        `,
        imports
      );
      const host = groupWc(fixture.nativeElement);
      const warnMessage = host.shadowRoot?.querySelector(
        '.cds-ng--form-requirement, .cds--form-requirement'
      );
      expect(warnMessage).toBeNull();

      const fieldset = host.shadowRoot?.querySelector('fieldset');
      expect(
        fieldset?.classList.contains('cds-ng--radio-button-group--warning') ||
          fieldset?.classList.contains('cds--radio-button-group--warning')
      ).toBe(false);
    });

    it('should not show invalid message or class when readonly and invalid', async () => {
      const { fixture } = await render(
        `
        <cds-ng-radio-button-group
          [readOnly]="true"
          [invalid]="true"
          invalidText="Invalid selection">
          <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
          <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
        </cds-ng-radio-button-group>
        `,
        imports
      );
      const host = groupWc(fixture.nativeElement);
      const invalidMessage = host.shadowRoot?.querySelector(
        '.cds-ng--form-requirement, .cds--form-requirement'
      );
      expect(invalidMessage).toBeNull();

      const fieldset = host.shadowRoot?.querySelector('fieldset');
      expect(
        fieldset?.classList.contains('cds-ng--radio-button-group--invalid') ||
          fieldset?.classList.contains('cds--radio-button-group--invalid')
      ).toBe(false);
    });

    it('should not show warning message or class when readonly and warn', async () => {
      const { fixture } = await render(
        `
        <cds-ng-radio-button-group
          [readOnly]="true"
          [warn]="true"
          warnText="Warning message">
          <cds-ng-radio-button value="test-1"></cds-ng-radio-button>
          <cds-ng-radio-button value="test-2"></cds-ng-radio-button>
        </cds-ng-radio-button-group>
        `,
        imports
      );
      const host = groupWc(fixture.nativeElement);
      const warnMessage = host.shadowRoot?.querySelector(
        '.cds-ng--form-requirement, .cds--form-requirement'
      );
      expect(warnMessage).toBeNull();

      const fieldset = host.shadowRoot?.querySelector('fieldset');
      expect(
        fieldset?.classList.contains('cds-ng--radio-button-group--warning') ||
          fieldset?.classList.contains('cds--radio-button-group--warning')
      ).toBe(false);
    });
  });
});
