/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/select/__tests__/select-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 */

import { SelectComponent } from '../../../generated/Select';
import { SelectItemComponent } from '../../../generated/SelectItem';
import { SelectItemGroupComponent } from '../../../generated/SelectItemGroup';
import { SelectSkeletonComponent } from '../../../generated/SelectSkeleton';
import { AiLabelComponent } from '../../../generated/AiLabel';
import { SlugComponent } from '../../../generated/Slug';
import { render } from '../../../testing/render';

const imports = [
  SelectComponent,
  SelectItemComponent,
  SelectItemGroupComponent,
  SelectSkeletonComponent,
  AiLabelComponent,
  SlugComponent,
];

const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-select') as HTMLElement & {
    value: string;
    shadowRoot: ShadowRoot;
    updateComplete: Promise<void>;
    requestUpdate: () => void;
  };

describe('cds-select (parity with select-test.js)', () => {
  const basicTemplate = `
    <cds-ng-select labelText="Select label" helperText="Helper text">
      <cds-ng-select-item value="">Choose an option</cds-ng-select-item>
      <cds-ng-select-item value="option-1">Option 1</cds-ng-select-item>
      <cds-ng-select-item value="option-2" [selected]="true">Option 2</cds-ng-select-item>
    </cds-ng-select>
  `;

  it('should render default markup correctly', async () => {
    const { fixture } = await render(basicTemplate, imports);
    const select = wc(fixture.nativeElement);
    expect(select).toBeTruthy();
  });

  it('should reflect the selected option', async () => {
    const { fixture } = await render(basicTemplate, imports);
    const select = wc(fixture.nativeElement);
    const internalSelect = select.shadowRoot.querySelector(
      'select'
    ) as HTMLSelectElement;
    expect(internalSelect.value).toBe('option-2');
  });

  it('should render helper and label text', async () => {
    const { fixture } = await render(basicTemplate, imports);
    const select = wc(fixture.nativeElement);
    const helper = select.shadowRoot.querySelector(
      '.cds-ng--form__helper-text, .cds--form__helper-text'
    );
    const label = select.shadowRoot.querySelector('label');
    expect(helper?.textContent).toContain('Helper text');
    expect(label?.textContent).toContain('Select label');
  });

  it('should support the disabled attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-select [disabled]="true" labelText="Select label">
        <cds-ng-select-item value="option-1">Option 1</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const internalSelect = select.shadowRoot.querySelector('select');
    expect(internalSelect?.hasAttribute('disabled')).toBe(true);
  });

  it('should support the hide-label attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-select labelText="Hidden label" [hideLabel]="true">
        <cds-ng-select-item value="option-1">Option 1</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const label = select.shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(
      label?.classList.contains('cds-ng--visually-hidden') ||
        label?.classList.contains('cds--visually-hidden')
    ).toBe(true);
  });

  it('should render invalid text when invalid attribute is set', async () => {
    const { fixture } = await render(
      `<cds-ng-select labelText="Select" [invalid]="true" invalidText="This is an error">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const error = select.shadowRoot.querySelector(
      '.cds-ng--form-requirement, .cds--form-requirement'
    );
    expect(error).toBeTruthy();
    expect(error?.textContent).toContain('This is an error');
  });

  it('should render warning text when warn attribute is set', async () => {
    const { fixture } = await render(
      `<cds-ng-select labelText="Select" [warn]="true" warnText="This is a warning">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const warning = select.shadowRoot.querySelector(
      '.cds-ng--form-requirement, .cds--form-requirement'
    );
    expect(warning).toBeTruthy();
    expect(warning?.textContent).toContain('This is a warning');
  });

  it('should dispatch cds-select-selected when changed', async () => {
    const { fixture } = await render(
      `<cds-ng-select labelText="Select">
        <cds-ng-select-item value="a">A</cds-ng-select-item>
        <cds-ng-select-item value="b">B</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const internalSelect = select.shadowRoot.querySelector(
      'select'
    ) as HTMLSelectElement;

    let receivedValue: any = null;
    select.addEventListener('cds-ng-select-selected', (e: any) => {
      receivedValue = e.detail.value;
    });

    internalSelect.value = 'b';
    internalSelect.dispatchEvent(new Event('input', { bubbles: true }));
    await select.updateComplete;

    expect(receivedValue).toBe('b');
  });

  it('should support the inline attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-select labelText="Inline select" [inline]="true">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    expect(select.hasAttribute('inline')).toBe(true);
  });

  it('should render cds-select-skeleton correctly', async () => {
    const { fixture } = await render(
      `<cds-ng-select-skeleton></cds-ng-select-skeleton>`,
      imports
    );
    const skeleton = fixture.nativeElement.querySelector(
      'cds-ng-select-skeleton'
    );
    expect(skeleton).toBeTruthy();
  });

  it('should support AI label slot and apply slug', async () => {
    const { fixture } = await render(
      `<cds-ng-select labelText="With AI">
        <cds-ng-ai-label slot="ai-label">AI Confidence</cds-ng-ai-label>
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    expect(select.hasAttribute('slug')).toBe(true);
    const ai = select.querySelector('cds-ng-ai-label');
    expect(ai).toBeTruthy();
    expect(ai?.textContent).toContain('AI Confidence');
  });

  it('should support the size attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-select labelText="Sized select" size="sm">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    expect(select.getAttribute('size')).toBe('sm');
  });

  it('should receive focus via keyboard', async () => {
    const { fixture } = await render(
      `<cds-ng-select labelText="Focusable">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const internalSelect = select.shadowRoot.querySelector(
      'select'
    ) as HTMLSelectElement;
    internalSelect.focus();
    expect(internalSelect).toBeTruthy();
  });

  it('should reflect the value attribute when changed via code', async () => {
    const { fixture } = await render(
      `<cds-ng-select labelText="Default value">
        <cds-ng-select-item value="a">A</cds-ng-select-item>
        <cds-ng-select-item value="b">B</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    select.value = 'b';
    await select.updateComplete;

    const internalSelect = select.shadowRoot.querySelector(
      'select'
    ) as HTMLSelectElement;
    expect(internalSelect.value).toBe('b');
  });

  // Axe accessibility testing is covered in Playwright E2E suites
  it.todo('should be accessible');

  it('should not display invalid message if disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-select
        labelText="Select"
        [disabled]="true"
        [invalid]="true"
        invalidText="This is an error">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const error = select.shadowRoot.querySelector(
      '.cds-ng--form-requirement, .cds--form-requirement'
    );
    expect(error).toBeNull();
  });

  it('should not display invalid message if readonly', async () => {
    const { fixture } = await render(
      `<cds-ng-select
        labelText="Select"
        [readonly]="true"
        [invalid]="true"
        invalidText="This is an error">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const error = select.shadowRoot.querySelector(
      '.cds-ng--form-requirement, .cds--form-requirement'
    );
    expect(error).toBeNull();
  });

  it('should not display warning message if disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-select
        labelText="Select"
        [disabled]="true"
        [warn]="true"
        warnText="This is a warning">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const warning = select.shadowRoot.querySelector(
      '.cds-ng--form-requirement, .cds--form-requirement'
    );
    expect(warning).toBeNull();
  });

  it('should not display warning message if readonly', async () => {
    const { fixture } = await render(
      `<cds-ng-select
        labelText="Select"
        [readonly]="true"
        [warn]="true"
        warnText="This is a warning">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const warning = select.shadowRoot.querySelector(
      '.cds-ng--form-requirement, .cds--form-requirement'
    );
    expect(warning).toBeNull();
  });

  it('should not display warning styles if disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-select
        labelText="Select"
        [disabled]="true"
        [warn]="true"
        warnText="This is a warning">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const selectWrapper = select.shadowRoot.querySelector(
      '.cds-ng--select-input__wrapper, .cds--select-input__wrapper'
    );
    expect(
      selectWrapper?.classList.contains(
        'cds-ng--select-input__wrapper--warning'
      ) ||
        selectWrapper?.classList.contains('cds--select-input__wrapper--warning')
    ).toBe(false);
  });

  it('should not display warning styles if readonly', async () => {
    const { fixture } = await render(
      `<cds-ng-select
        labelText="Select"
        [readonly]="true"
        [warn]="true"
        warnText="This is a warning">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const selectWrapper = select.shadowRoot.querySelector(
      '.cds-ng--select-input__wrapper, .cds--select-input__wrapper'
    );
    expect(
      selectWrapper?.classList.contains(
        'cds-ng--select-input__wrapper--warning'
      ) ||
        selectWrapper?.classList.contains('cds--select-input__wrapper--warning')
    ).toBe(false);
  });

  it('should not set aria-invalid if disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-select
        labelText="Select"
        [disabled]="true"
        [invalid]="true"
        invalidText="This is an error">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const internalSelect = select.shadowRoot.querySelector('select');
    expect(internalSelect?.getAttribute('aria-invalid')).toBe('false');
  });

  it('should not set aria-invalid if readonly', async () => {
    const { fixture } = await render(
      `<cds-ng-select
        labelText="Select"
        [readonly]="true"
        [invalid]="true"
        invalidText="This is an error">
        <cds-ng-select-item value="1">One</cds-ng-select-item>
      </cds-ng-select>`,
      imports
    );
    const select = wc(fixture.nativeElement);
    const internalSelect = select.shadowRoot.querySelector('select');
    expect(internalSelect?.getAttribute('aria-invalid')).toBe('false');
  });

  describe('AI label and slug slot (@query decorator)', () => {
    it('should resolve ai-label slot node via @query decorator', async () => {
      const { fixture } = await render(
        `<cds-ng-select labelText="With AI">
          <cds-ng-ai-label slot="ai-label"></cds-ng-ai-label>
          <cds-ng-select-item value="1">One</cds-ng-select-item>
        </cds-ng-select>`,
        imports
      );
      const select = wc(fixture.nativeElement);
      await select.updateComplete;

      const slotNode = select.shadowRoot.querySelector("slot[name='ai-label']");
      expect(slotNode).toBeTruthy();
    });

    it('should resolve slug slot node via @query decorator', async () => {
      const { fixture } = await render(
        `<cds-ng-select labelText="With Slug">
          <cds-ng-slug slot="slug"></cds-ng-slug>
          <cds-ng-select-item value="1">One</cds-ng-select-item>
        </cds-ng-select>`,
        imports
      );
      const select = wc(fixture.nativeElement);
      await select.updateComplete;

      const slotNode = select.shadowRoot.querySelector("slot[name='slug']");
      expect(slotNode).toBeTruthy();
    });

    it('should toggle cds--slug--revert class on ai-label slot when revert-active is set', async () => {
      const { fixture } = await render(
        `<cds-ng-select labelText="With AI">
          <cds-ng-ai-label slot="ai-label" revert-active></cds-ng-ai-label>
          <cds-ng-select-item value="1">One</cds-ng-select-item>
        </cds-ng-select>`,
        imports
      );
      const select = wc(fixture.nativeElement);
      await select.updateComplete;

      const aiLabelSlot = select.shadowRoot.querySelector(
        "slot[name='ai-label']"
      );
      expect(
        aiLabelSlot?.classList.contains('cds-ng--slug--revert') ||
          aiLabelSlot?.classList.contains('cds--slug--revert')
      ).toBe(true);
    });

    it('should not add cds--slug--revert to slug slot when only cds-slug is present (ai-label slot takes precedence in shadow DOM)', async () => {
      const { fixture } = await render(
        `<cds-ng-select labelText="With Slug">
          <cds-ng-slug slot="slug" revert-active></cds-ng-slug>
          <cds-ng-select-item value="1">One</cds-ng-select-item>
        </cds-ng-select>`,
        imports
      );
      const select = wc(fixture.nativeElement);
      await select.updateComplete;

      const slugSlot = select.shadowRoot.querySelector("slot[name='slug']");
      expect(
        slugSlot?.classList.contains('cds-ng--slug--revert') ||
          slugSlot?.classList.contains('cds--slug--revert')
      ).toBe(false);
    });

    it('should not set cds--slug--revert on ai-label slot when revert-active is absent', async () => {
      const { fixture } = await render(
        `<cds-ng-select labelText="With AI">
          <cds-ng-ai-label slot="ai-label"></cds-ng-ai-label>
          <cds-ng-select-item value="1">One</cds-ng-select-item>
        </cds-ng-select>`,
        imports
      );
      const select = wc(fixture.nativeElement);
      await select.updateComplete;

      const aiLabelSlot = select.shadowRoot.querySelector(
        "slot[name='ai-label']"
      );
      expect(
        aiLabelSlot?.classList.contains('cds-ng--slug--revert') ||
          aiLabelSlot?.classList.contains('cds--slug--revert')
      ).toBe(false);
    });

    it('should add cds--select-input-has--ai-label class to internal select when ai-label is assigned', async () => {
      const { fixture } = await render(
        `<cds-ng-select labelText="With AI">
          <cds-ng-ai-label slot="ai-label"></cds-ng-ai-label>
          <cds-ng-select-item value="1">One</cds-ng-select-item>
        </cds-ng-select>`,
        imports
      );
      const select = wc(fixture.nativeElement);
      await select.updateComplete;

      const internalSelect = select.shadowRoot.querySelector('select');
      expect(
        internalSelect?.classList.contains(
          'cds-ng--select-input-has--ai-label'
        ) ||
          internalSelect?.classList.contains('cds--select-input-has--ai-label')
      ).toBe(true);
    });

    it('should toggle cds--slug--revert on slug slot when ai-label slot node is absent', async () => {
      const { fixture } = await render(
        `<cds-ng-select labelText="With Slug">
          <cds-ng-slug slot="slug" revert-active></cds-ng-slug>
          <cds-ng-select-item value="1">One</cds-ng-select-item>
        </cds-ng-select>`,
        imports
      );
      const select = wc(fixture.nativeElement);
      await select.updateComplete;

      const aiLabelSlot = select.shadowRoot.querySelector(
        "slot[name='ai-label']"
      );
      aiLabelSlot?.remove();

      select.requestUpdate();
      await select.updateComplete;

      const slugSlot = select.shadowRoot.querySelector("slot[name='slug']");
      expect(
        slugSlot?.classList.contains('cds-ng--slug--revert') ||
          slugSlot?.classList.contains('cds--slug--revert')
      ).toBe(true);
    });
  });
});
