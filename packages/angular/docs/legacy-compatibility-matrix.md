# Legacy compatibility matrix: `carbon-components-angular` to `@carbon/angular/legacy`

Generated from `temp/carbon-components-angular` (selectors,
`@Input()`/`@Output()` names, `ControlValueAccessor`) and
`packages/web-components/custom-elements.json` (tags, properties, attributes).
It is a triage aid, not a verified API diff.

## How to read this

- **Input match** is `matched / total` CCA input names that also exist, by name,
  as a property or attribute on the web component. It says nothing about whether
  the types or behavior agree.
- **Tag mappings** where the CCA and web component tags differ were inferred
  from names. They are marked unverified.
- **Not covered:** CCA outputs are listed but not compared. Web component events
  are `cds-*` custom events or native events, and almost none share CCA's output
  names. Every row with outputs needs an output adapter.

| Tier               | Meaning                                                                                                 | Host is the web component?                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Thin**           | Same tag, no model-shaped inputs, at least 70% of input names match.                                    | Yes. Subclass the generated wrapper and add the CCA aliases.                                             |
| **Adapter**        | Same tag, but a model-shaped input (`items`, `model`, `notificationObj`, …) or under 70% input overlap. | Yes. The legacy class extends the generated wrapper and adds projection, form-value mapping and outputs. |
| **Tag differs**    | The web component has a different tag.                                                                  | No. The host cannot carry the CCA tag. Needs a decision per row.                                         |
| **No counterpart** | No web component, or the selector looks CCA-internal.                                                   | No. Port from CCA, drop, or document as removed.                                                         |

Element selectors: **119** (`cds-*` only). Thin **6**, Adapter **57**, Tag
differs **32**, No counterpart **24**.

## Thin

| CCA selector                | Input match | Unmatched CCA inputs | CCA outputs | CVA | Notes |
| --------------------------- | ----------- | -------------------- | ----------- | --- | ----- |
| `cds-content-switcher`      | 4/5         | `ariaLabel`          | `selected`  | -   | -     |
| `cds-modal-footer`          | 0/0         | -                    | -           | -   | -     |
| `cds-popover-content`       | 0/0         | -                    | -           | -   | -     |
| `cds-progress-bar`          | 8/9         | `id`                 | -           | -   | -     |
| `cds-table-toolbar-content` | 0/0         | -                    | -           | -   | -     |
| `cds-table-toolbar-search`  | 0/0         | -                    | -           | Y   | -     |

## Adapter

| CCA selector                  | Input match | Unmatched CCA inputs                                                                                                                                         | CCA outputs                                                                              | CVA | Notes                                                           |
| ----------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------- |
| `cds-accordion`               | 3/5         | `align`, `skeleton`                                                                                                                                          | -                                                                                        | -   | -                                                               |
| `cds-accordion-item`          | 2/6         | `context`, `expanded`, `id`, `skeleton`                                                                                                                      | `selected`                                                                               | -   | -                                                               |
| `cds-actionable-notification` | 0/1         | `notificationObj`                                                                                                                                            | -                                                                                        | -   | model-shaped input: `notificationObj`                           |
| `cds-ai-label`                | 5/14        | `align`, `ariaLabel`, `autoAlign`, `caret`, `dropShadow`, `highContrast`, `id`, `isOpen` …                                                                   | `isOpenChange`, `onClose`, `onOpen`, `revertClick`                                       | -   | -                                                               |
| `cds-breadcrumb`              | 2/8         | `ariaLabel`, `autoAlign`, `description`, `items`, `skeleton`, `threshold`                                                                                    | `navigation`                                                                             | -   | model-shaped input: `items`; large CCA template                 |
| `cds-breadcrumb-item`         | 0/6         | `ariaCurrent`, `current`, `href`, `route`, `routeExtras`, `skeleton`                                                                                         | `navigation`                                                                             | -   | -                                                               |
| `cds-button-set`              | 1/2         | `fluid`                                                                                                                                                      | -                                                                                        | -   | -                                                               |
| `cds-checkbox`                | 13/19       | `ariaLabel`, `ariaLabelledby`, `decorator`, `readOnly`, `required`, `skeleton`                                                                               | `checkedChange`, `click`, `indeterminateChange`                                          | Y   | large CCA template                                              |
| `cds-checkbox-group`          | 7/11        | `decorator`, `fieldsetAriaLabelledby`, `legend`, `readOnly`                                                                                                  | -                                                                                        | -   | -                                                               |
| `cds-clickable-tile`          | 5/9         | `decorator`, `route`, `routeExtras`, `theme`                                                                                                                 | `navigation`                                                                             | -   | -                                                               |
| `cds-code-snippet`            | 8/15        | `copyButtonDescription`, `display`, `expanded`, `feedbackText`, `skeleton`, `theme`, `translations`                                                          | -                                                                                        | -   | model-shaped input: `translations`; large CCA template          |
| `cds-combo-box`               | 10/30       | `appendInline`, `autocomplete`, `clearSelectionAria`, `clearSelectionTitle`, `clearSelectionsAria`, `clearSelectionsTitle`, `closeMenuAria`, `decorator` …   | `clear`, `close`, `search`, `selected`, `submit`                                         | Y   | model-shaped input: `itemValueKey`, `items`; large CCA template |
| `cds-combo-button`            | 4/8         | `comboId`, `description`, `tooltipAutoAlign`, `tooltipPlacement`                                                                                             | `actionClick`                                                                            | -   | -                                                               |
| `cds-contained-list`          | 4/7         | `action`, `actionData`, `labelId`                                                                                                                            | -                                                                                        | -   | -                                                               |
| `cds-contained-list-item`     | 2/5         | `action`, `actionData`, `icon`                                                                                                                               | `click`                                                                                  | -   | -                                                               |
| `cds-date-picker`             | 4/29        | `ariaLabel`, `decorator`, `flatpickrOptions`, `helperText`, `id`, `inputPattern`, `invalid`, `invalidText` …                                                 | `onClose`, `valueChange`                                                                 | Y   | model-shaped input: `flatpickrOptions`                          |
| `cds-date-picker-input`       | 11/18       | `decorator`, `hasIcon`, `helperText`, `id`, `label`, `skeleton`, `theme`                                                                                     | `valueChange`                                                                            | Y   | large CCA template                                              |
| `cds-dialog`                  | 0/1         | `dialogConfig`                                                                                                                                               | `close`                                                                                  | -   | model-shaped input: `dialogConfig`                              |
| `cds-dropdown`                | 10/29       | `allowNullValues`, `appendInline`, `clearText`, `decorator`, `disableArrowKeys`, `displayValue`, `dropUp`, `fluid` …                                         | `close`, `onClose`, `selected`                                                           | Y   | model-shaped input: `itemValueKey`; large CCA template          |
| `cds-expandable-tile`         | 2/6         | `decorator`, `interactive`, `theme`, `translations`                                                                                                          | -                                                                                        | -   | model-shaped input: `translations`                              |
| `cds-file-uploader`           | 1/16        | `accept`, `buttonText`, `buttonType`, `description`, `drop`, `dropText`, `fileActionsTpl`, `fileItemSize` …                                                  | `filesChange`                                                                            | Y   | model-shaped input: `fileActionsTpl`, `fileNameTpl`             |
| `cds-header`                  | 0/7         | `brand`, `href`, `name`, `route`, `routeExtras`, `skipTo`, `useRouter`                                                                                       | `navigation`                                                                             | -   | -                                                               |
| `cds-header-menu`             | 0/5         | `headerItems`, `href`, `icon`, `title`, `trigger`                                                                                                            | -                                                                                        | -   | model-shaped input: `headerItems`                               |
| `cds-icon-button`             | 5/10        | `buttonAttributes`, `buttonId`, `buttonNgClass`, `description`, `showTooltipWhenDisabled`                                                                    | `blur`, `click`, `focus`, `tooltipClick`                                                 | -   | -                                                               |
| `cds-inline-loading`          | 2/8         | `errorText`, `isActive`, `loadingText`, `state`, `success`, `successText`                                                                                    | `onSuccess`                                                                              | -   | -                                                               |
| `cds-inline-notification`     | 0/1         | `notificationObj`                                                                                                                                            | -                                                                                        | -   | model-shaped input: `notificationObj`                           |
| `cds-loading`                 | 0/3         | `isActive`, `size`, `title`                                                                                                                                  | -                                                                                        | -   | -                                                               |
| `cds-menu-button`             | 5/8         | `buttonTabIndex`, `menuId`, `open`                                                                                                                           | -                                                                                        | -   | -                                                               |
| `cds-menu-item`               | 2/7         | `checked`, `icon`, `info`, `type`, `value`                                                                                                                   | `checkedChange`, `itemClick`                                                             | -   | -                                                               |
| `cds-modal`                   | 4/9         | `decorator`, `isFullWidth`, `selectorPrimaryFocus`, `theme`, `trigger`                                                                                       | `close`, `overlaySelected`                                                               | -   | -                                                               |
| `cds-modal-header`            | 0/4         | `closeLabel`, `decorator`, `showCloseButton`, `theme`                                                                                                        | `closeSelect`                                                                            | -   | -                                                               |
| `cds-notification`            | 0/1         | `notificationObj`                                                                                                                                            | -                                                                                        | -   | model-shaped input: `notificationObj`                           |
| `cds-overflow-menu`           | 1/9         | `buttonLabel`, `customTrigger`, `description`, `flip`, `offset`, `placement`, `triggerClass`, `wrapperClass`                                                 | `openChange`                                                                             | -   | -                                                               |
| `cds-pagination`              | 4/12        | `backwardDisabled`, `forwardDisabled`, `itemsPerPageOptions`, `model`, `pageSelectThreshold`, `showPageInput`, `skeleton`, `translations`                    | `selectPage`                                                                             | -   | model-shaped input: `model`, `translations`; large CCA template |
| `cds-pagination-nav`          | 2/6         | `disabled`, `model`, `numOfItemsToShow`, `translations`                                                                                                      | `selectPage`                                                                             | -   | model-shaped input: `model`, `translations`                     |
| `cds-progress-indicator`      | 0/6         | `current`, `orientation`, `skeleton`, `spacing`, `steps`, `translations`                                                                                     | `stepSelected`                                                                           | -   | model-shaped input: `steps`, `translations`                     |
| `cds-search`                  | 7/19        | `active`, `ariaLabel`, `clearButtonTitle`, `fluid`, `id`, `label`, `required`, `searchTitle` …                                                               | `clear`, `open`, `search`, `valueChange`                                                 | Y   | -                                                               |
| `cds-select`                  | 11/18       | `ariaLabel`, `decorator`, `display`, `fluid`, `label`, `skeleton`, `theme`                                                                                   | `valueChange`                                                                            | Y   | large CCA template                                              |
| `cds-skeleton-icon`           | 0/1         | `ai`                                                                                                                                                         | -                                                                                        | -   | -                                                               |
| `cds-skeleton-placeholder`    | 0/1         | `ai`                                                                                                                                                         | -                                                                                        | -   | -                                                               |
| `cds-skeleton-text`           | 1/5         | `ai`, `lines`, `maxLineWidth`, `minLineWidth`                                                                                                                | -                                                                                        | -   | -                                                               |
| `cds-slider`                  | 6/11        | `disableArrowKeys`, `id`, `label`, `shiftMultiplier`, `skeleton`                                                                                             | `valueChange`                                                                            | Y   | large CCA template                                              |
| `cds-structured-list`         | 1/6         | `ariaLabel`, `flushed`, `name`, `selection`, `skeleton`                                                                                                      | `selected`                                                                               | Y   | -                                                               |
| `cds-tab`                     | 7/19        | `active`, `cacheActive`, `closeButtonAriaLabel`, `context`, `heading`, `iconLabel`, `id`, `isTooltipOpen` …                                                  | `selected`, `tabClose`                                                                   | -   | model-shaped input: `tabContent`                                |
| `cds-table`                   | 2/23        | `ariaDescribedby`, `ariaLabelledby`, `columnsDraggable`, `columnsResizable`, `enableSingleSelect`, `expandButtonAriaLabel`, `footerTemplate`, `isDataGrid` … | `deselectAll`, `deselectRow`, `rowClick`, `scrollLoad`, `selectAll`, `selectRow`, `sort` | -   | model-shaped input: `model`, `translations`                     |
| `cds-table-toolbar`           | 1/5         | `ariaLabel`, `batchText`, `cancelText`, `model`                                                                                                              | `cancel`                                                                                 | -   | model-shaped input: `model`                                     |
| `cds-tabs`                    | 4/14        | `ariaLabel`, `ariaLabelledby`, `cacheActive`, `followFocus`, `isNavigation`, `position`, `scrollDebounceWait`, `scrollIntoView` …                            | `tabClose`                                                                               | -   | -                                                               |
| `cds-tabs-skeleton`           | 1/2         | `numOftabs`                                                                                                                                                  | -                                                                                        | -   | -                                                               |
| `cds-tabs-vertical`           | 0/7         | `ariaLabel`, `ariaLabelledby`, `cacheActive`, `followFocus`, `height`, `isNavigation`, `skeleton`                                                            | -                                                                                        | -   | -                                                               |
| `cds-tag`                     | 2/5         | `class`, `decorator`, `skeleton`                                                                                                                             | -                                                                                        | -   | -                                                               |
| `cds-tile`                    | 1/3         | `decorator`, `theme`                                                                                                                                         | -                                                                                        | -   | -                                                               |
| `cds-tile-group`              | 0/3         | `legend`, `multiple`, `name`                                                                                                                                 | `selected`                                                                               | Y   | -                                                               |
| `cds-toggle`                  | 2/7         | `ariaLabel`, `label`, `offText`, `onText`, `skeleton`                                                                                                        | -                                                                                        | Y   | -                                                               |
| `cds-toggletip`               | 0/2         | `id`, `isOpen`                                                                                                                                               | -                                                                                        | -   | -                                                               |
| `cds-tooltip`                 | 2/6         | `description`, `disabled`, `id`, `templateContext`                                                                                                           | -                                                                                        | -   | -                                                               |
| `cds-tree-node`               | 5/15        | `children`, `depth`, `expanded`, `gap`, `icon`, `iconContext`, `labelContext`, `node` …                                                                      | `nodeBlur`, `nodeFocus`, `nodeSelect`, `nodetoggle`                                      | -   | model-shaped input: `node`; large CCA template                  |
| `cds-tree-view`               | 3/7         | `id`, `isMultiSelect`, `labelContext`, `tree`                                                                                                                | `select`, `toggle`                                                                       | -   | model-shaped input: `tree`                                      |

## Tag differs

| CCA selector               | Web component tag (unverified) | Input match | CCA outputs                  | CVA |
| -------------------------- | ------------------------------ | ----------- | ---------------------------- | --- |
| `cds-context-menu-divider` | `cds-menu-item-divider`        | 0/0         | -                            | -   |
| `cds-context-menu-group`   | `cds-menu-item-group`          | 1/3         | `valueChange`                | -   |
| `cds-context-menu-item`    | `cds-menu-item`                | 2/7         | `checkedChange`, `itemClick` | -   |
| `cds-file`                 | `cds-file-uploader-item`       | 1/5         | `remove`                     | -   |
| `cds-hamburger`            | `cds-header-menu-button`       | 1/3         | `selected`                   | -   |
| `cds-header-action`        | `cds-header-global-action`     | 1/3         | `activeChange`, `selected`   | -   |
| `cds-header-item`          | `cds-header-nav-item`          | 1/6         | `navigation`                 | -   |
| `cds-header-navigation`    | `cds-header-nav`               | 0/2         | -                            | -   |
| `cds-list-column`          | `cds-structured-list-cell`     | 0/2         | -                            | -   |
| `cds-list-header`          | `cds-structured-list-head`     | 0/1         | -                            | -   |
| `cds-list-row`             | `cds-structured-list-row`      | 0/1         | `change`                     | -   |
| `cds-menu-divider`         | `cds-menu-item-divider`        | 0/0         | -                            | -   |
| `cds-menu-group`           | `cds-menu-item-group`          | 1/3         | `valueChange`                | -   |
| `cds-number`               | `cds-number-input`             | 18/27       | `change`                     | Y   |
| `cds-overflow-menu-option` | `cds-overflow-menu-item`       | 3/6         | `selected`                   | -   |
| `cds-panel`                | `cds-header-panel`             | 1/2         | -                            | -   |
| `cds-radio`                | `cds-radio-button`             | 5/11        | `change`                     | Y   |
| `cds-radio-group`          | `cds-radio-button-group`       | 9/16        | `change`                     | Y   |
| `cds-selection-tile`       | `cds-selectable-tile`          | 4/7         | `change`                     | -   |
| `cds-sidenav`              | `cds-side-nav`                 | 1/7         | -                            | -   |
| `cds-sidenav-item`         | `cds-side-nav-link`            | 3/7         | `navigation`, `selected`     | -   |
| `cds-sidenav-menu`         | `cds-side-nav-menu`            | 2/5         | -                            | -   |
| `cds-switcher-list`        | `cds-switcher`                 | 0/0         | -                            | -   |
| `cds-switcher-list-item`   | `cds-switcher-item`            | 1/5         | `navigation`                 | -   |
| `cds-table-header`         | `cds-table-header-title`       | 0/0         | -                            | -   |
| `cds-tag-filter`           | `cds-dismissible-tag`          | 2/3         | `click`, `close`             | -   |
| `cds-tag-operational`      | `cds-operational-tag`          | 1/1         | -                            | -   |
| `cds-tag-selectable`       | `cds-selectable-tag`           | 3/5         | `selectedChange`             | -   |
| `cds-timepicker`           | `cds-time-picker`              | 9/13        | `valueChange`                | Y   |
| `cds-timepicker-select`    | `cds-time-picker-select`       | 2/5         | -                            | Y   |
| `cds-toast`                | `cds-toast-notification`       | 0/1         | -                            | -   |
| `cds-tooltip-definition`   | `cds-definition-tooltip`       | 1/4         | -                            | -   |

## No counterpart

| CCA selector                    | Inputs | Outputs | Reason                             |
| ------------------------------- | ------ | ------- | ---------------------------------- |
| `cds-context-menu`              | 3      | 0       | context-menu root (CCA-specific)   |
| `cds-documentation`             | 1      | 0       | docs helper                        |
| `cds-dropdown-list`             | 5      | 3       | internal to CCA Dropdown           |
| `cds-header-global`             | 0      | 0       | layout slot                        |
| `cds-icon-tab`                  | 1      | 0       | CCA-specific                       |
| `cds-label`                     | 16     | 0       | label wrapper for `cdsText` inputs |
| `cds-menu`                      | 3      | 0       | context-menu root (CCA-specific)   |
| `cds-overflow-custom-menu-pane` | 0      | 0       | internal to CCA OverflowMenu       |
| `cds-overflow-menu-pane`        | 0      | 0       | internal to CCA OverflowMenu       |
| `cds-overlay`                   | 3      | 1       | Angular-only modal overlay         |
| `cds-pagination-nav-item`       | 2      | 1       | internal to CCA PaginationNav      |
| `cds-pagination-overflow`       | 3      | 1       | internal to CCA PaginationNav      |
| `cds-placeholder`               | 1      | 0       | Angular-only service anchor        |
| `cds-tab-header`                | 8      | 0       | internal to CCA Tabs               |
| `cds-tab-header-group`          | 2      | 1       | internal to CCA Tabs               |
| `cds-tab-header-group-vertical` | 3      | 1       | internal to CCA Tabs               |
| `cds-tab-headers`               | 1      | 1       | internal to CCA Tabs               |
| `cds-tab-headers-vertical`      | 1      | 0       | internal to CCA Tabs               |
| `cds-table-container`           | 0      | 0       | layout wrapper                     |
| `cds-table-header-decorator`    | 0      | 0       | CCA-specific                       |
| `cds-table-toolbar-actions`     | 0      | 0       | maps to batch actions (unverified) |
| `cds-tabs-vertical-grouped`     | 1      | 0       | CCA vertical tab grouping          |
| `cds-text-label`                | 18     | 0       | label wrapper for `cdsText` inputs |
| `cds-textarea-label`            | 17     | 0       | label wrapper for `cdsTextArea`    |

## Attribute directives (no host element)

These cannot be wrapper components, because the host is a native element or an
arbitrary element. Most are `@HostBinding` class toggles that depend on
`@carbon/styles` only, not on web components, so they can be ported close to
unchanged. Rows marked **behavior** carry logic and need individual review.
Classification is by name and input count; files were not read individually.

| Directive                     | Inputs | Class        | Likely handling                                                    |
| ----------------------------- | ------ | ------------ | ------------------------------------------------------------------ |
| `[cdsAILabelActions]`         | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsAILabelContent]`         | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsAILabelPopover]`         | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsAboveFold]`              | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsAbstractDropdownView]`   | 1      | behavior     | review: has logic or is a base class                               |
| `[cdsActionableButton]`       | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsActionableSubtitle]`     | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsActionableTitle]`        | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsAspectRatio]`            | 1      | class/markup | port from CCA (styles only)                                        |
| `[cdsBaseModal]`              | 1      | behavior     | review: has logic or is a base class                               |
| `[cdsBelowFold]`              | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsButton]`                 | 6      | class/markup | port from CCA (applies `cds--btn*` classes to a native `<button>`) |
| `[cdsClickableTileIcon]`      | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsCol]`                    | 4      | class/markup | port from CCA (styles only)                                        |
| `[cdsContentOption]`          | 2      | class/markup | port from CCA (styles only)                                        |
| `[cdsDialog]`                 | 13     | behavior     | review: has logic or is a base class                               |
| `[cdsExpandedRowHover]`       | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsGrid]`                   | 4      | class/markup | port from CCA (styles only)                                        |
| `[cdsIcon]`                   | 8      | class/markup | port from CCA (styles only)                                        |
| `[cdsLayer]`                  | 2      | class/markup | port from CCA (styles only)                                        |
| `[cdsLinkIcon]`               | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsLink]`                   | 1      | class/markup | port from CCA (styles only)                                        |
| `[cdsListItem]`               | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsList]`                   | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsModalContentText]`       | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsModalContent]`           | 1      | class/markup | port from CCA (styles only)                                        |
| `[cdsModalHeaderHeading]`     | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsModalHeaderLabel]`       | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsNotificationSubtitle]`   | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsNotificationTitle]`      | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsOverflowMenu]`           | 6      | behavior     | review: has logic or is a base class                               |
| `[cdsPassword]`               | 6      | behavior     | review: has logic or is a base class                               |
| `[cdsPopover]`                | 6      | behavior     | review: has logic or is a base class                               |
| `[cdsRow]`                    | 2      | class/markup | port from CCA (styles only)                                        |
| `[cdsScrollableList]`         | 5      | behavior     | review: has logic or is a base class                               |
| `[cdsStack]`                  | 3      | class/markup | port from CCA (styles only)                                        |
| `[cdsTabHeader]`              | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsTableHeadCellLabel]`     | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsTableHeaderDescription]` | 1      | class/markup | port from CCA (styles only)                                        |
| `[cdsTableHeaderTitle]`       | 1      | class/markup | port from CCA (styles only)                                        |
| `[cdsTable]`                  | 1      | behavior     | review: has logic or is a base class                               |
| `[cdsTagIcon]`                | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsTextArea]`               | 4      | class/markup | port from CCA (styles only)                                        |
| `[cdsText]`                   | 5      | class/markup | port from CCA (styles only)                                        |
| `[cdsTheme]`                  | 2      | class/markup | port from CCA (styles only)                                        |
| `[cdsToastCaption]`           | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsToastSubtitle]`          | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsToastTitle]`             | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsToggletipAction]`        | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsToggletipButton]`        | 1      | class/markup | port from CCA (styles only)                                        |
| `[cdsToggletipContent]`       | 0      | class/markup | port from CCA (styles only)                                        |
| `[cdsToggletipLabel]`         | 0      | class/markup | port from CCA (styles only)                                        |
| `[routerLink]`                | 1      | behavior     | review: has logic or is a base class                               |

## Services and modules (not component-shaped)

CCA has 17 `@Injectable` services (including `ModalService`,
`NotificationService`, `PlaceholderService`, `IconService`, `I18n`,
`DocumentService`, `ElementService`, `EventService`, `DialogService`) and 58
NgModules with secondary entry points. Services that create components
dynamically (modal, notification) need rewriting against the web components;
this is outside the generated-wrapper pattern.
