/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/toggle/__tests__/toggle-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 */

import { TestBed } from '@angular/core/testing';
import { ToggleComponent } from '../../../generated/Toggle';
import { render } from '../../../testing/render';

const imports = [ToggleComponent];

const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-toggle') as HTMLElement & {
    toggled: boolean;
    shadowRoot: ShadowRoot;
    updateComplete: Promise<void>;
  };

describe('cds-ng-toggle (parity with web-components toggle-test.js)', () => {
  it('should match button and label ids', async () => {
    const { fixture } = await render(
      `
      <cds-ng-toggle
        labelText="test label"
        labelA="On"
        labelB="Off"></cds-ng-toggle>
      `,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;

    const switchEl = host.shadowRoot.querySelector('[role="switch"]');
    const labelEl = host.shadowRoot.querySelector('label');

    expect(switchEl).toBeTruthy();
    expect(labelEl).toBeTruthy();
    expect(switchEl?.id).toBe(labelEl?.getAttribute('for'));
  });

  it('renders labelA when unchecked and labelB when checked', async () => {
    const { fixture } = await render(
      `
      <cds-ng-toggle
        labelText="Airplane mode"
        labelA="On"
        labelB="Off"></cds-ng-toggle>
      `,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;

    expect(host.shadowRoot.textContent).toContain('Off');
    expect(host.shadowRoot.textContent).not.toContain('On');

    host.toggled = true;
    await host.updateComplete;

    expect(host.shadowRoot.textContent).toContain('On');
    expect(host.shadowRoot.textContent).not.toContain('Off');
  });

  it('supports sm size', async () => {
    const { fixture } = await render(
      `
      <cds-ng-toggle
        labelText="Test label"
        labelA="On"
        labelB="Off"
        size="sm"></cds-ng-toggle>
      `,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;

    const inputDiv = host.shadowRoot.querySelector('label > div');
    const classList = inputDiv?.classList || [];
    expect(
      Array.from(classList).some((cls) =>
        cls.includes('--toggle__appearance--sm')
      )
    ).toBe(true);
  });

  it('supports to use top label as side label', async () => {
    const { fixture } = await render(
      `
      <cds-ng-toggle
        labelText="Test label"
        labelA="On"
        labelB="Off"
        [hideLabel]="true"></cds-ng-toggle>
      `,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;

    const label = host.shadowRoot.querySelector('label > span');
    const classList = label?.classList || [];
    expect(
      Array.from(classList).some((cls) => cls.includes('--visually-hidden'))
    ).toBe(true);

    expect(host.shadowRoot.textContent).toContain('Test label');
    expect(host.shadowRoot.textContent).not.toContain('Off');
    expect(host.shadowRoot.textContent).not.toContain('On');

    host.toggled = true;
    await host.updateComplete;

    expect(host.shadowRoot.textContent).toContain('Test label');
    expect(host.shadowRoot.textContent).not.toContain('Off');
    expect(host.shadowRoot.textContent).not.toContain('On');
  });

  it("doesn't render sideLabel if hideLabel is true and no label-text is provided", async () => {
    const { fixture: fix1 } = await render(
      `<cds-ng-toggle></cds-ng-toggle>`,
      imports
    );
    const elRegular = wc(fix1.nativeElement);
    await elRegular.updateComplete;

    expect(elRegular.shadowRoot.textContent).toContain('Off');

    const buttonRegular = elRegular.shadowRoot.querySelector(
      'button'
    ) as HTMLButtonElement;
    buttonRegular?.click();

    await elRegular.updateComplete;
    expect(elRegular.shadowRoot.textContent).toContain('On');

    TestBed.resetTestingModule();

    const { fixture: fix2 } = await render(
      `<cds-ng-toggle [hideLabel]="true"></cds-ng-toggle>`,
      imports
    );
    const elHideLabel = wc(fix2.nativeElement);
    await elHideLabel.updateComplete;

    const sideLabel1 = elHideLabel.shadowRoot.querySelector(
      '.cds-ng--toggle__text, .cds--toggle__text'
    );
    expect(sideLabel1?.textContent?.trim() || '').toBe('');

    const buttonHideLabel = elHideLabel.shadowRoot.querySelector(
      'button'
    ) as HTMLButtonElement;
    buttonHideLabel?.click();

    await elHideLabel.updateComplete;
    const sideLabel2 = elHideLabel.shadowRoot.querySelector(
      '.cds-ng--toggle__text, .cds--toggle__text'
    );
    expect(sideLabel2?.textContent?.trim() || '').toBe('');
  });

  it('supports disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle [disabled]="true"></cds-ng-toggle>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;
    const button = host.shadowRoot.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('respects disabled to prevent changes', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle [disabled]="true"></cds-ng-toggle>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;

    expect(host.toggled).toBe(false);
    const button = host.shadowRoot.querySelector('button') as HTMLButtonElement;
    button.click();
    await host.updateComplete;
    expect(host.toggled).toBe(false);
  });

  it('respects readonly to prevent changes', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle [readOnly]="true"></cds-ng-toggle>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;

    expect(host.toggled).toBe(false);
    const button = host.shadowRoot.querySelector('button') as HTMLButtonElement;
    button.click();
    await host.updateComplete;
    expect(host.toggled).toBe(false);
  });

  it('can be controlled with using toggled', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle></cds-ng-toggle>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;

    expect(host.toggled).toBe(false);
    host.toggled = true;
    await host.updateComplete;
    expect(host.toggled).toBe(true);
  });

  it('should fire cds-toggle-changed event when toggle is changed', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle></cds-ng-toggle>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;

    const button = host.shadowRoot.querySelector('button') as HTMLButtonElement;
    let detail: any = null;
    host.addEventListener('cds-ng-toggle-changed', (e: any) => {
      detail = e.detail;
    });
    button.click();
    await host.updateComplete;

    expect(detail).toBeTruthy();
    expect(detail.toggled).toBe(true);
  });

  it('should not fire changed event when readonly', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle [readOnly]="true"></cds-ng-toggle>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;

    const button = host.shadowRoot.querySelector('button') as HTMLButtonElement;
    let fired = false;
    host.addEventListener('cds-ng-toggle-changed', () => {
      fired = true;
    });
    button.click();
    await host.updateComplete;

    expect(fired).toBe(false);
  });

  it('should not fire changed event when disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle [disabled]="true"></cds-ng-toggle>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    await host.updateComplete;

    const button = host.shadowRoot.querySelector('button') as HTMLButtonElement;
    let fired = false;
    host.addEventListener('cds-ng-toggle-changed', () => {
      fired = true;
    });
    button.click();
    await host.updateComplete;

    expect(fired).toBe(false);
  });
});
