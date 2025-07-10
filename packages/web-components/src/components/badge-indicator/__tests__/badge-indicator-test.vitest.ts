import '../badge-indicator';

import { expect, describe, it, beforeEach } from 'vitest';

async function vitestFixture<T extends HTMLElement>(
  template: string
): Promise<T> {
  document.body.innerHTML = '';
  const div = document.createElement('div');
  div.innerHTML = template;
  const element = div.firstElementChild as T;
  document.body.appendChild(element);

  await Promise.resolve();
  await element.updateComplete;

  return element;
}

describe('BadgeIndicator (Vitest)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders a badge indicator', async () => {
    const el = await vitestFixture<HTMLElement>(
      `<badge-indicator></badge-indicator>`
    );
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.tagName).toBe('BADGE-INDICATOR');
  });

  it.skip('sets the "value" property correctly', async () => {
    const el = await vitestFixture<any>(
      `<badge-indicator value="5"></badge-indicator>`
    );
    expect(el.value).toBe('5');

    const shadowRoot = el.shadowRoot;

    expect(shadowRoot?.textContent).toContain('5');
  });
});
