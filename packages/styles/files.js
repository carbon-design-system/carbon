/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// NOTE: This file is not published and is only available within the monorepo.

const path = require('path');

const files = [
  // Main bundle entrypoint
  'index.scss',

  // Sass entrypoints
  'scss/_breakpoint.scss',
  'scss/_colors.scss',
  'scss/_config.scss',
  'scss/_feature-flags.scss',
  'scss/_layer.scss',
  'scss/_layout.scss',
  'scss/_motion.scss',
  'scss/_reset.scss',
  'scss/_spacing.scss',
  'scss/_theme.scss',
  'scss/_themes.scss',
  'scss/_zone.scss',

  // Compatability with previous versions
  'scss/compat/_theme.scss',
  'scss/compat/_themes.scss',

  // Components
  'scss/components/_index.scss',
  'scss/components/accordion/_accordion.scss',
  'scss/components/accordion/_index.scss',
  'scss/components/aspect-ratio/_aspect-ratio.scss',
  'scss/components/aspect-ratio/_index.scss',
  'scss/components/breadcrumb/_breadcrumb.scss',
  'scss/components/breadcrumb/_index.scss',
  'scss/components/button/_button.scss',
  'scss/components/button/_index.scss',
  'scss/components/button/_tokens.scss',
  'scss/components/checkbox/_checkbox.scss',
  'scss/components/checkbox/_index.scss',
  'scss/components/code-snippet/_code-snippet.scss',
  'scss/components/code-snippet/_index.scss',
  'scss/components/combo-box/_combo-box.scss',
  'scss/components/combo-box/_index.scss',
  'scss/components/contained-list/_contained-list.scss',
  'scss/components/contained-list/_index.scss',
  'scss/components/content-switcher/_content-switcher.scss',
  'scss/components/content-switcher/_index.scss',
  'scss/components/copy-button/_copy-button.scss',
  'scss/components/copy-button/_index.scss',
  'scss/components/data-table/_data-table.scss',
  'scss/components/data-table/_index.scss',
  'scss/components/data-table/action/_data-table-action.scss',
  'scss/components/data-table/action/_index.scss',
  'scss/components/data-table/expandable/_data-table-expandable.scss',
  'scss/components/data-table/expandable/_index.scss',
  'scss/components/data-table/skeleton/_data-table-skeleton.scss',
  'scss/components/data-table/skeleton/_index.scss',
  'scss/components/data-table/sort/_data-table-sort.scss',
  'scss/components/data-table/sort/_index.scss',
  'scss/components/date-picker/_date-picker.scss',
  'scss/components/date-picker/_index.scss',
  'scss/components/dropdown/_dropdown.scss',
  'scss/components/dropdown/_index.scss',
  'scss/components/file-uploader/_file-uploader.scss',
  'scss/components/file-uploader/_index.scss',
  'scss/components/form/_form.scss',
  'scss/components/form/_index.scss',
  'scss/components/fluid-combo-box/_fluid-combo-box.scss',
  'scss/components/fluid-combo-box/_index.scss',
  'scss/components/fluid-date-picker/_fluid-date-picker.scss',
  'scss/components/fluid-date-picker/_index.scss',
  'scss/components/fluid-dropdown/_fluid-dropdown.scss',
  'scss/components/fluid-dropdown/_index.scss',
  'scss/components/fluid-list-box/_fluid-list-box.scss',
  'scss/components/fluid-list-box/_index.scss',
  'scss/components/fluid-multiselect/_fluid-multiselect.scss',
  'scss/components/fluid-multiselect/_index.scss',
  'scss/components/fluid-number-input/_fluid-number-input.scss',
  'scss/components/fluid-number-input/_index.scss',
  'scss/components/fluid-search/_fluid-search.scss',
  'scss/components/fluid-search/_index.scss',
  'scss/components/fluid-select/_fluid-select.scss',
  'scss/components/fluid-select/_index.scss',
  'scss/components/fluid-text-area/_fluid-text-area.scss',
  'scss/components/fluid-text-area/_index.scss',
  'scss/components/fluid-text-input/_fluid-text-input.scss',
  'scss/components/fluid-text-input/_index.scss',
  'scss/components/fluid-time-picker/_fluid-time-picker.scss',
  'scss/components/fluid-time-picker/_index.scss',
  'scss/components/inline-loading/_index.scss',
  'scss/components/inline-loading/_inline-loading.scss',
  'scss/components/link/_index.scss',
  'scss/components/link/_link.scss',
  'scss/components/list/_index.scss',
  'scss/components/list/_list.scss',
  'scss/components/list-box/_index.scss',
  'scss/components/list-box/_list-box.scss',
  'scss/components/loading/_index.scss',
  'scss/components/loading/_loading.scss',
  'scss/components/menu/_index.scss',
  'scss/components/menu/_menu.scss',
  'scss/components/modal/_index.scss',
  'scss/components/modal/_modal.scss',
  'scss/components/multiselect/_index.scss',
  'scss/components/multiselect/_multiselect.scss',
  'scss/components/notification/_actionable-notification.scss',
  'scss/components/notification/_index.scss',
  'scss/components/notification/_inline-notification.scss',
  'scss/components/notification/_toast-notification.scss',
  'scss/components/notification/_tokens.scss',
  'scss/components/number-input/_index.scss',
  'scss/components/number-input/_number-input.scss',
  'scss/components/overflow-menu/_index.scss',
  'scss/components/overflow-menu/_overflow-menu.scss',
  'scss/components/pagination/_index.scss',
  'scss/components/pagination/_pagination.scss',
  'scss/components/pagination/_unstable_pagination.scss',
  'scss/components/pagination-nav/_index.scss',
  'scss/components/pagination-nav/_pagination-nav.scss',
  'scss/components/popover/_index.scss',
  'scss/components/popover/_popover.scss',
  'scss/components/progress-bar/_index.scss',
  'scss/components/progress-bar/_progress-bar.scss',
  'scss/components/progress-indicator/_index.scss',
  'scss/components/progress-indicator/_progress-indicator.scss',
  'scss/components/radio-button/_index.scss',
  'scss/components/radio-button/_radio-button.scss',
  'scss/components/search/_index.scss',
  'scss/components/search/_search.scss',
  'scss/components/select/_index.scss',
  'scss/components/select/_select.scss',
  'scss/components/skeleton-styles/_index.scss',
  'scss/components/skeleton-styles/_skeleton-styles.scss',
  'scss/components/slider/_index.scss',
  'scss/components/slider/_slider.scss',
  'scss/components/slug/_index.scss',
  'scss/components/slug/_slug.scss',
  'scss/components/stack/_index.scss',
  'scss/components/stack/_stack.scss',
  'scss/components/structured-list/_index.scss',
  'scss/components/structured-list/_structured-list.scss',
  'scss/components/tabs/_index.scss',
  'scss/components/tabs/_tabs.scss',
  'scss/components/tag/_index.scss',
  'scss/components/tag/_tag.scss',
  'scss/components/tag/_tokens.scss',
  'scss/components/text-area/_index.scss',
  'scss/components/text-area/_text-area.scss',
  'scss/components/text-input/_index.scss',
  'scss/components/text-input/_text-input.scss',
  'scss/components/tile/_index.scss',
  'scss/components/tile/_tile.scss',
  'scss/components/time-picker/_index.scss',
  'scss/components/time-picker/_time-picker.scss',
  'scss/components/toggle/_index.scss',
  'scss/components/toggle/_toggle.scss',
  'scss/components/toggletip/_index.scss',
  'scss/components/toggletip/_toggletip.scss',
  'scss/components/tooltip/_index.scss',
  'scss/components/tooltip/_tooltip.scss',
  'scss/components/treeview/_index.scss',
  'scss/components/treeview/_treeview.scss',
  'scss/components/ui-shell/_index.scss',
  'scss/components/ui-shell/_ui-shell.scss',
  'scss/components/ui-shell/content/_content.scss',
  'scss/components/ui-shell/content/_index.scss',
  'scss/components/ui-shell/header/_header.scss',
  'scss/components/ui-shell/header/_index.scss',
  'scss/components/ui-shell/header-panel/_header-panel.scss',
  'scss/components/ui-shell/header-panel/_index.scss',
  'scss/components/ui-shell/side-nav/_index.scss',
  'scss/components/ui-shell/side-nav/_side-nav.scss',
  'scss/components/ui-shell/switcher/_index.scss',
  'scss/components/ui-shell/switcher/_switcher.scss',

  // Fonts
  'scss/fonts/_index.scss',
  'scss/fonts/_mono.scss',
  'scss/fonts/_sans-arabic.scss',
  'scss/fonts/_sans-devanagari.scss',
  'scss/fonts/_sans-hebrew.scss',
  'scss/fonts/_sans-thai-looped.scss',
  'scss/fonts/_sans-thai.scss',
  'scss/fonts/_sans.scss',
  'scss/fonts/_serif.scss',
  'scss/fonts/_src.scss',

  // Grid
  'scss/grid/_css-grid.scss',
  'scss/grid/_flexbox.scss',
  'scss/grid/_mixins.scss',
  'scss/grid/_index.scss',

  // Type
  'scss/type/_index.scss',
  'scss/type/_reset.scss',

  // Utilities
  'scss/utilities/_box-shadow.scss',
  'scss/utilities/_button-reset.scss',
  'scss/utilities/_component-reset.scss',
  'scss/utilities/_component-tokens.scss',
  'scss/utilities/_convert.scss',
  'scss/utilities/_custom-property.scss',
  'scss/utilities/_focus-outline.scss',
  'scss/utilities/_hide-at-breakpoint.scss',
  'scss/utilities/_high-contrast-mode.scss',
  'scss/utilities/_index.scss',
  'scss/utilities/_keyframes.scss',
  'scss/utilities/_layout.scss',
  'scss/utilities/_placeholder-colors.scss',
  'scss/utilities/_rotate.scss',
  'scss/utilities/_skeleton.scss',
  'scss/utilities/_text-overflow.scss',
  'scss/utilities/_text-truncate.scss',
  'scss/utilities/_visually-hidden.scss',
  'scss/utilities/_z-index.scss',
];

module.exports = {
  files: files.map((filepath) => {
    const basename = path.basename(filepath);
    // The path used for the `@forward` rule in the file itself
    let importPath = '';

    // If we have an `_index.scss` entrypoint, we can re-export from the
    // directory itself
    if (basename === '_index.scss') {
      importPath = path.dirname(filepath);
    } else if (filepath !== 'index.scss') {
      // Otherwise, let's drop the leading `_` and trailing `.scss` from the
      // file name to get the import
      const basename = path
        .basename(filepath)
        .replace(/^_/, '')
        .replace(/\.scss$/, '');
      importPath = path.join(path.dirname(filepath), basename);
    }

    return {
      filepath,
      relativePath: importPath,
      importPath: path.join('@carbon/styles', importPath),
    };
  }),
};
