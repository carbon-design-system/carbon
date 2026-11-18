/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const IBM_COMMON_SRC = 'https://1.www.s81c.com/common/stats/ibm-common.js';

/**
 * Shared Tealium/GA config for manager-head and preview-head
 *
 * @param {string} siteName - the `_ibmAnalytics.settings.name` for this
 *   Storybook
 * @returns {{ managerAnalyticsHead: string, previewAnalyticsHead: string }}
 */
export function getIbmAnalyticsHeads(siteName) {
  const ibmAnalytics = {
    settings: {
      name: siteName,
      isSpa: true,
      tealiumProfileName: 'ibm-web-app',
    },
    onLoad: [['ibmStats.pageview', []]],
  };

  const digitalData = {
    page: {
      pageInfo: {
        ibm: {
          siteId: `IBM_${siteName}`,
        },
      },
      category: {
        primaryCategory: 'PC100',
      },
    },
  };

  const setGlobals = `
    window._ibmAnalytics = ${JSON.stringify(ibmAnalytics)};
    window.digitalData = ${JSON.stringify(digitalData)};
  `;

  /**
   * manager (index.html): always top-level window, so set the globals and
   * load ibm-common.js with static script
   */
  const managerAnalyticsHead = `
  <!-- Tealium/GA set up -->
  <script type="text/javascript">${setGlobals}</script>
  <script src="${IBM_COMMON_SRC}" type="text/javascript" async="async"></script>
  `;

  /**
   * preview (iframe.html): only set up analytics when opened directly, since the
   * manager already loads ibm-common.js when preview is embedded.
   *
   * Skip automated browsers. Playwright opens this document as the top window,
   * and ibm-common.js injects a third-party "Your privacy choices" control that
   * fails the accessibility scan (aria-label on a paragraph).
   */
  const previewAnalyticsHead = `
  <!-- Tealium/GA set up -->
  <script type="text/javascript">
    if (window.self === window.top && !navigator.webdriver) {${setGlobals}
      var ibmCommonScript = document.createElement('script');
      ibmCommonScript.type = 'text/javascript';
      ibmCommonScript.async = true;
      ibmCommonScript.src = '${IBM_COMMON_SRC}';
      document.head.appendChild(ibmCommonScript);
    }
  </script>
  `;

  return { managerAnalyticsHead, previewAnalyticsHead };
}
