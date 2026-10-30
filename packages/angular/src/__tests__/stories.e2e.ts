/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@playwright/test';

/**
 * Renders every story of the built Storybook in a browser and checks that it
 * renders, that its `play()` function passes, and that the page throws no
 * uncaught errors. Requires `yarn storybook:build` first.
 *
 * Component behavior is covered by the web components' own test suites, run
 * against the vendored copy with `yarn test:wc` (ADR 0019).
 */

const indexFile = fileURLToPath(
  new URL('../../storybook-static/index.json', import.meta.url)
);
const index = JSON.parse(readFileSync(indexFile, 'utf8')) as {
  entries: Record<string, { id: string; type: string }>;
};
const storyIds = Object.values(index.entries)
  .filter((entry) => entry.type === 'story')
  .map((entry) => entry.id);

type StoryResult = { status: string; message?: string };

for (const id of storyIds) {
  test(id, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    // Storybook reports the outcome on its channel: `storyRendered` once the
    // story and its play function have finished, or one of the error events.
    await page.addInitScript(() => {
      const win = window as unknown as {
        __STORYBOOK_ADDONS_CHANNEL__?: {
          on: (event: string, listener: (payload?: unknown) => void) => void;
        };
        __storyResult?: Promise<StoryResult>;
      };
      win.__storyResult = new Promise((resolve) => {
        const listen = () => {
          const channel = win.__STORYBOOK_ADDONS_CHANNEL__;
          if (!channel) {
            setTimeout(listen, 20);
            return;
          }
          channel.on('storyRendered', () => resolve({ status: 'rendered' }));
          for (const event of [
            'playFunctionThrewException',
            'storyThrewException',
            'storyErrored',
          ]) {
            channel.on(event, (payload) => {
              const { message, title } = (payload ?? {}) as {
                message?: string;
                title?: string;
              };
              resolve({ status: event, message: message ?? title });
            });
          }
        };
        listen();
      });
    });

    await page.goto(`/iframe.html?id=${id}&viewMode=story`);
    const result = await page.evaluate(
      () =>
        (window as unknown as { __storyResult: Promise<StoryResult> })
          .__storyResult
    );

    expect(result).toEqual({ status: 'rendered' });
    expect(pageErrors).toEqual([]);
  });
}
