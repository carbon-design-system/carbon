/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { addons } from 'storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
});

const PREVIEW_IFRAME_ID = 'storybook-preview-iframe';
const CLIPBOARD_PERMISSIONS = ['clipboard-read', 'clipboard-write'];

function allowPreviewClipboardAccess() {
  const iframe = document.getElementById(PREVIEW_IFRAME_ID);

  if (!iframe) {
    return;
  }

  const allow = iframe.getAttribute('allow') || '';
  const permissions = new Set(
    allow
      .split(';')
      .map((permission) => permission.trim())
      .filter(Boolean)
  );

  CLIPBOARD_PERMISSIONS.forEach((permission) => {
    permissions.add(permission);
  });

  const nextAllow = Array.from(permissions).join('; ');

  if (allow !== nextAllow) {
    iframe.setAttribute('allow', nextAllow);
  }
}

allowPreviewClipboardAccess();

new MutationObserver(allowPreviewClipboardAccess).observe(
  document.documentElement,
  {
    attributeFilter: ['allow'],
    attributes: true,
    childList: true,
    subtree: true,
  }
);

// These options used by storybook often conflict with developer tools,
// conditional panels, or other things that get in the way of our workflow
localStorage.removeItem('@storybook/ui/store');
localStorage.removeItem('storybook-layout');
