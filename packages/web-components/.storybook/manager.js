/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Conditionally generate CSS to hide a component based on its corresponding
 * feature flag environment variable.
 *
 * @param {*} envVar
 *   Environment variable to check.
 * @param {*} cssId
 *   CSS ID for selector.
 * @returns
 */
const getCss = (envVar, cssId) => {
  return envVar !== 'true'
    ? `button[id^="${cssId}"] { display: none !important; }\n`
    : '';
};

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

// Build string of CSS rules.
let css = '';
if (!process.env.CDS_FLAGS_ALL) {
  css += getCss(
    process.env.CDS_EXPERIEMENTAL_COMPONENT_NAME,
    'components-experimental-component-name'
  );
}

// Inject any CSS rules into the page.
if (css.length) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}
