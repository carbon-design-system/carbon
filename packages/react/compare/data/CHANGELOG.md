# Carbon React V11 → V12 changelog

Generated 2026-10-07T20:07:05.233Z from the live V11 and V12 Storybooks. Values are computed styles.

Components: 31 unchanged · 23 migrated · 32 changed · 18 inherited · 4 removed · 1 new

## Tokens

- added `--cds-button-radius`: 0px
- added `--cds-button-radius-ee`: 0px
- added `--cds-button-radius-es`: 999999px
- added `--cds-button-radius-se`: 0px
- added `--cds-button-radius-ss`: 999999px
- changed `--cds-popover-border-radius`: 2px → .25rem

## Release notes (V12 Storybook: Getting Started/Changelog)

- **August 31, 2026**: New border-radius tokens have been introduced for various border-radius values. These tokens are accompanied by new visual updates made to input components such as TextInput, NumberInput, Search and more. Updates include rounded corners, a new gradient border, and some added margins and insets for surrounding buttons and menus.
- **August 5, 2026**: A new preview DatePicker has been added to @carbon/react as preview__DatePicker. It is built on the Temporal API and a framework-agnostic state machine shared with @carbon/web-components, replacing the Flatpickr-based implementation. Stories and documentation can be found in the Components/Preview/preview__DatePicker section of Storybook.
- **July 22, 2026**: Initial motion API has been added to @carbon/motion and @carbon/react packages. Stories along with documentation in the Overview page can be viewed in the Elements/Motion section of Storybook. The initial work covers definition of "surfaces" which are different motion animations we want to standardize (currently examples!) and new React wrapper components that implement the Motion library under the hood. There is an option to also utilize native CSS for the "reveal" surfaces.

## Changed (32)

### Breadcrumb

_Components · max 5.2% pixels, 3/5 stories differ_

- **Visual** Breadcrumb · .cds--tooltip-trigger__wrapper · line-height 0px → 18.0001px _(2 stories)_
- **Visual** Breadcrumb · .cds--popover · line-height 0px → 18.0001px _(2 stories)_
- **Visual** Breadcrumb · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 18.0001px (inherited from Popover, Tooltip) _(2 stories)_
- **Visual** Breadcrumb · .cds--tooltip-trigger__wrapper · line-height 0px → 16px (inherited from Tooltip)
- **Visual** Breadcrumb · .cds--popover · line-height 0px → 16px (inherited from Popover)
- **Visual** Breadcrumb · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 16px (inherited from IconButton)
- **Structure** Breadcrumb · .cds--autoalign.cds--overflow-menu__container element added (inherited from OverflowMenu) _(3 stories)_
- **Structure** Breadcrumb · .cds--overflow-menu__wrapper element removed (inherited from OverflowMenu) _(3 stories)_
- **Structure** Breadcrumb · .cds--autoalign.cds--menu.cds--menu--border.cds--menu--md.cds--menu--open.cds--menu--shown.cds--overflow-menu__bottom-start element added (inherited from Menu, OverflowMenu)
- **Structure** Breadcrumb · .cds--menu-item element added (inherited from Menu, OverflowMenu)
- **Structure** Breadcrumb · .cds--menu-item__label element added (inherited from Menu, OverflowMenu)
- **Structure** Breadcrumb · .cds--breadcrumb-menu-options.cds--overflow-menu-options.cds--overflow-menu-options--open element removed
- **Structure** Breadcrumb · .cds--overflow-menu-options__option element removed
- **Structure** Breadcrumb · .cds--overflow-menu-options__btn element removed
- **Structure** Breadcrumb · .cds--overflow-menu-options__option-content element removed

### Button

_Components · max 6.6% pixels, 7/25 stories differ_

- **Visual** Button · .cds--btn · border-radius 0px → 999999px (pill) _(9 stories)_
- **Visual** Button · .cds--btn.cds--skeleton · border-radius 0px → 999999px (pill)

### ComboBox

_Components · max 1.0% pixels, 2/8 stories differ_

- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · background-color #f4f4f4 → transparent _(8 stories)_
- **Visual** ComboBox · .cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(8 stories)_
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · border-radius 0px → 4px _(8 stories)_
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · border-top/right/left none → 1px solid transparent _(8 stories)_
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(7 stories)_
- **Visual** ComboBox · .cds--text-input · border-bottom 1px solid #8d8d8d → none _(7 stories)_
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent _(7 stories)_
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · background-color #ffffff → transparent
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** ComboBox · .cds--text-input · border-bottom 1px solid transparent → none
- **Visual** ComboBox · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button)
- **Layout** ComboBox · .cds--text-input · height 40px → 38px (-2px) (inherited from TextInput) _(8 stories)_
- **Layout** ComboBox · .cds--text-input · width 300px → 298px (-2px) (inherited from TextInput) _(6 stories)_
- **Layout** ComboBox · .cds--text-input · width 1196px → 1194px (-2px) (inherited from TextInput)
- **Layout** ComboBox · .cds--text-input · width 400px → 398px (-2px) (inherited from TextInput)
- **Story** ComboBox · story graduated from Feature Flag: components-combobox--floating-styles
- **Flag** ComboBox · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### ComboButton

_Components · max 7.9% pixels, 5/5 stories differ_

- **Visual** ComboButton · .cds--btn · border-radius 0px → 999999px 0px 0px 999999px (pill) (inherited from Button) _(5 stories)_
- **Visual** ComboButton · .cds--btn.cds--combo-button__trigger · border-radius 0px → 0px 999999px 999999px 0px _(4 stories)_
- **Visual** ComboButton · .cds--btn · display inline-flex → block
- **Visual** ComboButton · .cds--btn · padding 0px → 14px 63px 14px 15px (inherited from Button)
- **Layout** ComboButton · .cds--btn · width 48px → 173.22px (+125.22px) (inherited from Button)
- **Structure** ComboButton · .cds--combo-button__container.cds--combo-button__container--lg element added
- **Structure** ComboButton · .cds--combo-button__primary-action element added
- **Structure** ComboButton · .cds--autoalign.cds--icon-tooltip.cds--popover--auto-align.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element added (inherited from IconButton, Popover, Tooltip)
- **Structure** ComboButton · .cds--tooltip-trigger__wrapper element added (inherited from Tooltip)
- **Structure** ComboButton · .cds--btn.cds--btn--icon-only.cds--btn--lg.cds--btn--primary.cds--combo-button__trigger.cds--layout--size-lg element added
- **Structure** ComboButton · .cds--popover element added (inherited from Popover)
- **Structure** ComboButton · .cds--combo-button__container.cds--combo-button__container--lg element removed
- **Structure** ComboButton · .cds--combo-button__primary-action element removed
- **Structure** ComboButton · .cds--btn.cds--btn--lg.cds--btn--primary.cds--layout--size-lg element removed (inherited from Button)
- **Structure** ComboButton · .cds--autoalign.cds--icon-tooltip.cds--popover--auto-align.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element removed (inherited from IconButton, Popover, Tooltip)
- **Structure** ComboButton · .cds--tooltip-trigger__wrapper element removed (inherited from Tooltip)
- **Structure** ComboButton · .cds--popover element removed (inherited from Popover)
- **Story** ComboButton · story graduated from Feature Flag: components-combobutton--floating-styles
- **Flag** ComboButton · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### ContainedList

_Components · max 0.4% pixels, 1/11 stories differ_

- **Visual** ContainedList · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Search)
- **Visual** ContainedList · .cds--search-magnifier · border-radius 0px → 4px (inherited from Tooltip)
- **Visual** ContainedList · .cds--tag · border-radius 16px → 2px
- **Visual** ContainedList · .cds--search-input · border-radius 0px → 4px (inherited from Search)
- **Visual** ContainedList · .cds--search-input · border-top/right/left none → 1px solid transparent (inherited from Search)
- **Visual** ContainedList · .cds--tooltip-trigger__wrapper · line-height 0px → 16px (inherited from Tooltip)
- **Visual** ContainedList · .cds--popover · line-height 0px → 16px (inherited from Popover)
- **Visual** ContainedList · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 16px (inherited from IconButton)
- **Structure** ContainedList · .cds--autoalign.cds--overflow-menu__container element added (inherited from OverflowMenu)
- **Structure** ContainedList · .cds--overflow-menu__wrapper element removed (inherited from OverflowMenu)

### DataTable

_Components · max 1.3% pixels, 1/25 stories differ_

- **Visual** DataTable · .cds--search-input · background-color #f4f4f4 → transparent (inherited from Search) _(8 stories)_
- **Visual** DataTable · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Search) _(8 stories)_
- **Visual** DataTable · .cds--search-input · border-radius 0px → 4px (inherited from Search) _(8 stories)_
- **Visual** DataTable · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · display inline-block → block (inherited from Popover, Tooltip) _(8 stories)_
- **Visual** DataTable · .cds--tooltip-trigger__wrapper · line-height 0px → 16px (inherited from Tooltip) _(8 stories)_
- **Visual** DataTable · .cds--popover · line-height 0px → 16px (inherited from Popover) _(8 stories)_
- **Visual** DataTable · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 16px (inherited from IconButton) _(8 stories)_
- **Visual** DataTable · .cds--btn.cds--overflow-menu · padding 8px 0px → 0px (inherited from OverflowMenu) _(8 stories)_
- **Visual** DataTable · .cds--search-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Search) _(5 stories)_
- **Visual** DataTable · .cds--search-input · border-top/right/left none → 1px solid transparent (inherited from Search) _(5 stories)_
- **Visual** DataTable · .cds--btn.cds--overflow-menu · border-radius 0px → 999999px (pill) (inherited from OverflowMenu)
- **Visual** DataTable · .cds--tooltip-trigger__wrapper · line-height 0px → 18.0001px
- **Visual** DataTable · .cds--popover · line-height 0px → 18.0001px
- **Visual** DataTable · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 18.0001px (inherited from Popover, Tooltip)
- **Layout** DataTable · .cds--table-column-menu · width 102.81px → 114.45px (+11.64px)
- **Structure** DataTable · .cds--autoalign.cds--overflow-menu.cds--overflow-menu__container.cds--toolbar-action element added (inherited from OverflowMenu) _(8 stories)_
- **Structure** DataTable · .cds--overflow-menu__wrapper element removed (inherited from OverflowMenu) _(8 stories)_
- **Structure** DataTable · .cds--autoalign.cds--overflow-menu__container element added (inherited from OverflowMenu)

### DatePicker

_Components · max 1.5% pixels, 6/9 stories differ_

> August 5, 2026: A new preview DatePicker has been added to @carbon/react as preview__DatePicker. It is built on the Temporal API and a framework-agnostic state machine shared with @carbon/web-components, replacing the Flatpickr-based implementation. Stories and documentation can be found in the Components/Preview/preview__DatePicker section of Storybook.

- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · background-color #f4f4f4 → transparent _(8 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(7 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-bottom 1px solid #8d8d8d → 1px solid transparent _(7 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px _(6 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-top/right/left none → 1px solid transparent _(6 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · background-color #ffffff → transparent _(3 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px 0px 0px 4px _(2 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 0px 4px 4px 0px _(2 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-top/left none → 1px solid transparent _(2 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-top/right none → 1px solid transparent _(2 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** DatePicker · .cds--label · border-radius 0px → 4px
- **Visual** DatePicker · .cds--date-picker__input.cds--skeleton · border-radius 0px → 4px 0px 0px 4px
- **Visual** DatePicker · .cds--date-picker__input.cds--skeleton · border-radius 0px → 0px 4px 4px 0px

### Dropdown

_Components · max 1.3% pixels, 5/9 stories differ_

- **Visual** Dropdown · .cds--dropdown.cds--list-box · border-radius 0px → 4px _(7 stories)_
- **Visual** Dropdown · .cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent _(7 stories)_
- **Visual** Dropdown · .cds--dropdown.cds--list-box · background-color #f4f4f4 → transparent _(5 stories)_
- **Visual** Dropdown · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(4 stories)_
- **Visual** Dropdown · .cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent _(4 stories)_
- **Visual** Dropdown · .cds--autoalign.cds--dropdown.cds--list-box · background-color #f4f4f4 → transparent
- **Visual** Dropdown · .cds--dropdown.cds--list-box · background-color #ffffff → transparent
- **Visual** Dropdown · .cds--autoalign.cds--dropdown.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Dropdown · .cds--dropdown.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Dropdown · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Dropdown · .cds--autoalign.cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** Dropdown · .cds--autoalign.cds--dropdown.cds--list-box · border-radius 0px → 4px
- **Visual** Dropdown · .cds--dropdown.cds--skeleton · border-radius 0px → 4px
- **Visual** Dropdown · .cds--autoalign.cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent
- **Layout** Dropdown · .cds--dropdown.cds--list-box · width 119.14px → 121.14px (+2px) _(2 stories)_
- **Story** Dropdown · story graduated from Feature Flag: components-dropdown--floating-styles
- **Flag** Dropdown · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### Fluid Components

_Components · max 5.3% pixels, 28/36 stories differ_

- **Visual** Fluid Components · .cds--form-item · border-radius 0px → 4px _(10 stories)_
- **Visual** Fluid Components · .cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(9 stories)_
- **Visual** Fluid Components · .cds--list-box.cds--skeleton · background-color #e8e8e8 → transparent (inherited from Dropdown) _(5 stories)_
- **Visual** Fluid Components · .cds--form-item · background-color #f4f4f4 → transparent _(5 stories)_
- **Visual** Fluid Components · .cds--list-box.cds--skeleton · background-image none → linear-gradient(#e8e8e8, #e8e8e8), linear-gradient(#e0e0e0 calc(100% - 4px), #c6c6c6 100%) (now drawn with gradients) (inherited from Dropdown) _(5 stories)_
- **Visual** Fluid Components · .cds--form-item · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(5 stories)_
- **Visual** Fluid Components · .cds--form-item · border none → 1px solid transparent _(5 stories)_
- **Visual** Fluid Components · .cds--list-box.cds--skeleton · border-bottom 1px solid #c6c6c6 → 1px solid transparent (inherited from Dropdown) _(5 stories)_
- **Visual** Fluid Components · .cds--list-box.cds--skeleton · border-radius 0px → 4px (inherited from Dropdown) _(5 stories)_
- **Visual** Fluid Components · .cds--label.cds--skeleton · border-radius 0px → 4px (inherited from FormLabel) _(5 stories)_
- **Visual** Fluid Components · .cds--skeleton.cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(5 stories)_
- **Visual** Fluid Components · .cds--list-box.cds--skeleton · border-top/right/left none → 1px solid transparent (inherited from Dropdown) _(5 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · background-color #f4f4f4 → transparent (inherited from ComboBox) _(4 stories)_
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · background-color #f4f4f4 → transparent (inherited from Dropdown) _(4 stories)_
- **Visual** Fluid Components · .cds--form-item.cds--text-input-wrapper · background-color #f4f4f4 → transparent (inherited from TextInput) _(4 stories)_
- **Visual** Fluid Components · .cds--text-input · background-color #f4f4f4 → transparent (inherited from TextInput) _(4 stories)_
- **Visual** Fluid Components · .cds--select · background-color #f4f4f4 → transparent (inherited from Select) _(4 stories)_
- **Visual** Fluid Components · .cds--select-input · background-color #f4f4f4 → transparent (inherited from Select) _(4 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent (inherited from MultiSelect) _(4 stories)_
- **Visual** Fluid Components · .cds--form-item · background-color #e8e8e8 → transparent _(4 stories)_
- **Visual** Fluid Components · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput) _(4 stories)_
- **Visual** Fluid Components · .cds--form-item · background-image none → linear-gradient(#e8e8e8, #e8e8e8), linear-gradient(#e0e0e0 calc(100% - 4px), #c6c6c6 100%) (now drawn with gradients) _(4 stories)_
- **Visual** Fluid Components · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput) _(4 stories)_
- **Visual** Fluid Components · .cds--form-item · border-bottom 1px solid #c6c6c6 → 1px solid transparent _(4 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · border-radius 0px → 4px (inherited from ComboBox) _(4 stories)_
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · border-radius 0px → 4px (inherited from Dropdown) _(4 stories)_
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--fluid.cds--multi-select__wrapper · border-radius 0px → 4px (inherited from Dropdown, MultiSelect) _(4 stories)_
- **Visual** Fluid Components · .cds--select-input__wrapper · border-radius 0px → 4px _(4 stories)_
- **Visual** Fluid Components · .cds--select-input · border-radius 0px → 4px (inherited from Select) _(4 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · border-radius 0px → 4px (inherited from MultiSelect) _(4 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · border-top/right/left none → 1px solid transparent (inherited from ComboBox) _(4 stories)_
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent (inherited from Dropdown) _(4 stories)_
- **Visual** Fluid Components · .cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput) _(4 stories)_
- **Visual** Fluid Components · .cds--select-input · border-top/right/left none → 1px solid transparent (inherited from Select) _(4 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent (inherited from MultiSelect) _(4 stories)_
- **Visual** Fluid Components · .cds--form-item · border-top/right/left none → 1px solid transparent _(4 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent (inherited from MultiSelect) _(3 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from ComboBox) _(3 stories)_
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Dropdown) _(3 stories)_
- **Visual** Fluid Components · .cds--select-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Select) _(3 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from MultiSelect) _(3 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from MultiSelect) _(3 stories)_
- **Visual** Fluid Components · .cds--text-input · border-bottom 1px solid #8d8d8d → none _(3 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from ComboBox) _(3 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-bottom 1px solid #8d8d8d → none _(3 stories)_
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Dropdown) _(3 stories)_
- **Visual** Fluid Components · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Select) _(3 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from MultiSelect) _(3 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from MultiSelect) _(3 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px (inherited from DatePicker) _(3 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · border-radius 0px → 4px (inherited from MultiSelect) _(3 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-top/right/left none → 1px solid transparent (inherited from DatePicker) _(3 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent (inherited from MultiSelect) _(3 stories)_
- **Visual** Fluid Components · .cds--search-input · background-color #f4f4f4 → transparent (inherited from Search) _(2 stories)_
- **Visual** Fluid Components · .cds--form-item.cds--password-input-wrapper.cds--text-input-wrapper · background-color #f4f4f4 → transparent (inherited from PasswordInput) _(2 stories)_
- **Visual** Fluid Components · .cds--password-input.cds--text-input · background-color #f4f4f4 → transparent (inherited from PasswordInput) _(2 stories)_
- **Visual** Fluid Components · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Search) _(2 stories)_
- **Visual** Fluid Components · .cds--password-input.cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from PasswordInput) _(2 stories)_
- **Visual** Fluid Components · .cds--number__control-btn · border none → 1px solid transparent (inherited from NumberInput) _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker-container · border-bottom 1px solid #8d8d8d → none (inherited from DatePicker) _(2 stories)_
- **Visual** Fluid Components · .cds--search-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Search) _(2 stories)_
- **Visual** Fluid Components · .cds--password-input.cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from PasswordInput) _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-left 1px solid #8d8d8d → 1px solid #e0e0e0 _(2 stories)_
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--fluid · border-radius 0px → 4px (inherited from Dropdown) _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px 0px 0px 4px (inherited from DatePicker) _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 0px 4px 4px 0px (inherited from DatePicker) _(2 stories)_
- **Visual** Fluid Components · .cds--dropdown__wrapper.cds--list-box__wrapper.cds--list-box__wrapper--fluid · border-radius 0px → 4px (inherited from Dropdown) _(2 stories)_
- **Visual** Fluid Components · .cds--search-input · border-radius 0px → 4px (inherited from Search) _(2 stories)_
- **Visual** Fluid Components · .cds--number__control-btn · border-radius 0px → 4px (inherited from NumberInput) _(2 stories)_
- **Visual** Fluid Components · .cds--password-input.cds--text-input · border-radius 0px → 4px (inherited from PasswordInput) _(2 stories)_
- **Visual** Fluid Components · .cds--btn.cds--tooltip__trigger · border-radius 0px → 4px (inherited from Button, Tooltip) _(2 stories)_
- **Visual** Fluid Components · .cds--tag · border-radius 16px → 4px (inherited from Tag) _(2 stories)_
- **Visual** Fluid Components · .cds--tag__close-icon · border-radius 50% → 4px (inherited from Tag) _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-top/left none → 1px solid transparent (inherited from DatePicker) _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-top/right none → 1px solid transparent (inherited from DatePicker) _(2 stories)_
- **Visual** Fluid Components · .cds--search-input · border-top/right/left none → 1px solid transparent (inherited from Search) _(2 stories)_
- **Visual** Fluid Components · .cds--password-input.cds--text-input · border-top/right/left none → 1px solid transparent (inherited from PasswordInput) _(2 stories)_
- **Visual** Fluid Components · .cds--number__rule-divider · display block → none (inherited from NumberInput) _(2 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · background-color #ffffff → transparent (inherited from MultiSelect)
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from ComboBox)
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from Dropdown)
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from MultiSelect)
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from MultiSelect)
- **Visual** Fluid Components · .cds--select-input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from Select)
- **Visual** Fluid Components · .cds--text-input · border-bottom 1px solid transparent → none
- **Visual** Fluid Components · .cds--select-input · border-bottom 1px solid #4589ff → 1px solid transparent (inherited from Select)
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--fluid.cds--list-box__wrapper--fluid--condensed · border-radius 0px → 4px (inherited from Dropdown)
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--decorator.cds--list-box__wrapper--fluid · border-radius 0px → 4px (inherited from Dropdown)
- **Visual** Fluid Components · .cds--dropdown__wrapper.cds--list-box__wrapper.cds--list-box__wrapper--fluid.cds--list-box__wrapper--fluid--condensed · border-radius 0px → 4px (inherited from Dropdown)
- **Visual** Fluid Components · .cds--dropdown__wrapper.cds--list-box__wrapper.cds--list-box__wrapper--decorator.cds--list-box__wrapper--fluid · border-radius 0px → 4px (inherited from Dropdown)
- **Visual** Fluid Components · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button)
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--fluid.cds--list-box__wrapper--fluid--condensed.cds--multi-select__wrapper · border-radius 0px → 4px (inherited from Dropdown, MultiSelect)
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--decorator.cds--list-box__wrapper--fluid.cds--multi-select__wrapper · border-radius 0px → 4px (inherited from Dropdown, MultiSelect)
- **Visual** Fluid Components · .cds--select-input · border-top/left none → 1px solid transparent (inherited from Select)
- **Layout** Fluid Components · .cds--text-input · height 64px → 62px (-2px) (inherited from TextInput) _(4 stories)_
- **Layout** Fluid Components · .cds--list-box__field · width 200px → 199px (-1px) (inherited from Dropdown) _(4 stories)_
- **Layout** Fluid Components · .cds--list-box__field::before · width 200px → 199px (-1px) (inherited from Dropdown) _(4 stories)_
- **Layout** Fluid Components · .cds--text-input · height 63px → 62px (-1px) (inherited from TextInput) _(3 stories)_
- **Layout** Fluid Components · .cds--text-input · width 400px → 398px (-2px) (inherited from TextInput) _(3 stories)_
- **Layout** Fluid Components · .cds--label.cds--skeleton · width 200px → 199px (-1px) (inherited from FormLabel) _(3 stories)_
- **Layout** Fluid Components · .cds--label.cds--skeleton::before · width 200px → 199px (-1px) (inherited from FormLabel) _(3 stories)_
- **Layout** Fluid Components · .cds--date-picker-container · height 64px → 63px (-1px) (inherited from DatePicker) _(2 stories)_
- **Layout** Fluid Components · .cds--number__rule-divider · height 16px → 0px (-16px) (inherited from NumberInput) _(2 stories)_
- **Layout** Fluid Components · .cds--number__rule-divider · width 1px → 0px (-1px) (inherited from NumberInput) _(2 stories)_
- **Layout** Fluid Components · .cds--date-picker-container · width 206.5px → 207.5px (+1px) (inherited from DatePicker)
- **Layout** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · width 206.5px → 207.5px (+1px) (inherited from DatePicker)
- **Layout** Fluid Components · .cds--text-input · width 600px → 598px (-2px) (inherited from TextInput)
- **Layout** Fluid Components · .cds--text-input · width 292px → 290px (-2px) (inherited from TextInput)
- **Layout** Fluid Components · .cds--text-input · width 334.47px → 332.47px (-2px) (inherited from TextInput)
- **Layout** Fluid Components · .cds--text-input · width 450px → 448px (-2px) (inherited from TextInput)
- **Layout** Fluid Components · .cds--text-input · width 416px → 414px (-2px) (inherited from TextInput)
- **Layout** Fluid Components · .cds--text-input · width 382px → 380px (-2px) (inherited from TextInput)
- **Layout** Fluid Components · .cds--label.cds--skeleton · width 37.5px → 36.5px (-1px) (inherited from FormLabel)
- **Layout** Fluid Components · .cds--label.cds--skeleton::before · width 37.5px → 36.5px (-1px) (inherited from FormLabel)
- **Layout** Fluid Components · .cds--list-box__field · width 37.5px → 36.5px (-1px) (inherited from Dropdown)
- **Layout** Fluid Components · .cds--list-box__field::before · width 37.5px → 36.5px (-1px) (inherited from Dropdown)
- **Layout** Fluid Components · .cds--list-box__field · width 75px → 74px (-1px) (inherited from Dropdown)
- **Layout** Fluid Components · .cds--list-box__field::before · width 75px → 74px (-1px) (inherited from Dropdown)
- **Layout** Fluid Components · .cds--label.cds--skeleton · width 75px → 74px (-1px) (inherited from FormLabel)
- **Layout** Fluid Components · .cds--label.cds--skeleton::before · width 75px → 74px (-1px) (inherited from FormLabel)

### Form

_Components · max 0.9% pixels, 2/2 stories differ_

- **Visual** Form · .cds--search-input · background-color #f4f4f4 → transparent (inherited from Search) _(2 stories)_
- **Visual** Form · .cds--text-input · background-color #f4f4f4 → transparent (inherited from TextInput) _(2 stories)_
- **Visual** Form · .cds--dropdown.cds--list-box · background-color #f4f4f4 → transparent (inherited from Dropdown) _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · background-color #f4f4f4 → transparent (inherited from DatePicker) _(2 stories)_
- **Visual** Form · .cds--select-input · background-color #f4f4f4 → transparent (inherited from Select) _(2 stories)_
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent (inherited from MultiSelect) _(2 stories)_
- **Visual** Form · .cds--password-input.cds--text-input · background-color #f4f4f4 → transparent (inherited from PasswordInput) _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · background-color #f4f4f4 → transparent (inherited from ComboBox) _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent (inherited from MultiSelect) _(2 stories)_
- **Visual** Form · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Search) _(2 stories)_
- **Visual** Form · .cds--password-input.cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from PasswordInput) _(2 stories)_
- **Visual** Form · .cds--number__control-btn · border none → 1px solid transparent (inherited from NumberInput) _(2 stories)_
- **Visual** Form · .cds--search-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Search) _(2 stories)_
- **Visual** Form · .cds--password-input.cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from PasswordInput) _(2 stories)_
- **Visual** Form · .cds--search-input · border-radius 0px → 4px (inherited from Search) _(2 stories)_
- **Visual** Form · .cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(2 stories)_
- **Visual** Form · .cds--dropdown.cds--list-box · border-radius 0px → 4px (inherited from Dropdown) _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px 0px 0px 4px (inherited from DatePicker) _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 0px 4px 4px 0px (inherited from DatePicker) _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px (inherited from DatePicker) _(2 stories)_
- **Visual** Form · .cds--number__control-btn · border-radius 0px → 4px (inherited from NumberInput) _(2 stories)_
- **Visual** Form · .cds--select-input · border-radius 0px → 4px (inherited from Select) _(2 stories)_
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · border-radius 0px → 4px (inherited from MultiSelect) _(2 stories)_
- **Visual** Form · .cds--password-input.cds--text-input · border-radius 0px → 4px (inherited from PasswordInput) _(2 stories)_
- **Visual** Form · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(2 stories)_
- **Visual** Form · .cds--btn.cds--tooltip__trigger · border-radius 0px → 4px (inherited from Button, Tooltip) _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · border-radius 0px → 4px (inherited from ComboBox) _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · border-radius 0px → 4px (inherited from MultiSelect) _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-top/left none → 1px solid transparent (inherited from DatePicker) _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-top/right none → 1px solid transparent (inherited from DatePicker) _(2 stories)_
- **Visual** Form · .cds--search-input · border-top/right/left none → 1px solid transparent (inherited from Search) _(2 stories)_
- **Visual** Form · .cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput) _(2 stories)_
- **Visual** Form · .cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent (inherited from Dropdown) _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-top/right/left none → 1px solid transparent (inherited from DatePicker) _(2 stories)_
- **Visual** Form · .cds--select-input · border-top/right/left none → 1px solid transparent (inherited from Select) _(2 stories)_
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent (inherited from MultiSelect) _(2 stories)_
- **Visual** Form · .cds--password-input.cds--text-input · border-top/right/left none → 1px solid transparent (inherited from PasswordInput) _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · border-top/right/left none → 1px solid transparent (inherited from ComboBox) _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent (inherited from MultiSelect) _(2 stories)_
- **Visual** Form · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput)
- **Visual** Form · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Dropdown)
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from DatePicker)
- **Visual** Form · .cds--select-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Select)
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from MultiSelect)
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from ComboBox)
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from MultiSelect)
- **Visual** Form · .cds--text-input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from TextInput)
- **Visual** Form · .cds--dropdown.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from Dropdown)
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from DatePicker)
- **Visual** Form · .cds--select-input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from Select)
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from MultiSelect)
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from ComboBox)
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from MultiSelect)
- **Visual** Form · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput)
- **Visual** Form · .cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Dropdown)
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from DatePicker)
- **Visual** Form · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Select)
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from MultiSelect)
- **Visual** Form · .cds--text-input · border-bottom 1px solid #8d8d8d → none
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from ComboBox)
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from MultiSelect)
- **Visual** Form · .cds--text-input · border-bottom 1px solid #4589ff → 1px solid transparent (inherited from TextInput)
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-bottom 1px solid #4589ff → 1px solid transparent (inherited from DatePicker)
- **Visual** Form · .cds--select-input · border-bottom 1px solid #4589ff → 1px solid transparent (inherited from Select)
- **Visual** Form · .cds--text-input · border-bottom 1px solid transparent → none
- **Visual** Form · .cds--number__rule-divider · display block → none (inherited from NumberInput)
- **Layout** Form · .cds--text-input · height 39px → 38px (-1px) (inherited from TextInput) _(2 stories)_
- **Layout** Form · .cds--text-input · height 40px → 38px (-2px) (inherited from TextInput) _(2 stories)_
- **Layout** Form · .cds--text-input · width 600px → 598px (-2px) (inherited from TextInput) _(2 stories)_
- **Layout** Form · .cds--text-input · width 292px → 290px (-2px) (inherited from TextInput) _(2 stories)_
- **Layout** Form · .cds--number__rule-divider · height 16px → 0px (-16px) (inherited from NumberInput)
- **Layout** Form · .cds--number__rule-divider · width 1px → 0px (-1px) (inherited from NumberInput)
- **Structure** Form · .cds--number__control-btn element removed (inherited from NumberInput)

### Menu

_Components · max 0.3% pixels, 1/1 stories differ_

- **Visual** Menu · .cds--menu-item · border-radius 0px → 4px
- **Visual** Menu · .cds--menu · border-radius 0px → 8px
- **Visual** Menu · .cds--menu-item-divider · margin 4px 0px → 4px -4px
- **Visual** Menu · .cds--menu · outline none → 1px solid #e0e0e0
- **Visual** Menu · .cds--menu-item · padding 0px 16px → 0px 12px
- **Visual** Menu · .cds--menu · padding 4px 0px → 4px
- **Flag** Menu · feature flag enable-v12-overflowmenu: off in V11 → on by default in V12

### MenuButton

_Components · max 2.3% pixels, 8/8 stories differ_

- **Visual** MenuButton · .cds--btn.cds--menu-button__trigger · border-radius 0px → 999999px (pill) _(8 stories)_
- **Flag** MenuButton · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### Modal

_Components · max 2.6% pixels, 7/11 stories differ_

- **Visual** Modal · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(11 stories)_
- **Visual** Modal · .cds--text-input · background-color #ffffff → transparent (inherited from TextInput) _(3 stories)_
- **Visual** Modal · .cds--select-input · background-color #ffffff → transparent (inherited from Select) _(3 stories)_
- **Visual** Modal · .cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput) _(3 stories)_
- **Visual** Modal · .cds--select-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Select) _(3 stories)_
- **Visual** Modal · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput) _(3 stories)_
- **Visual** Modal · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Select) _(3 stories)_
- **Visual** Modal · .cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(3 stories)_
- **Visual** Modal · .cds--select-input · border-radius 0px → 4px (inherited from Select) _(3 stories)_
- **Visual** Modal · .cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput) _(3 stories)_
- **Visual** Modal · .cds--select-input · border-top/right/left none → 1px solid transparent (inherited from Select) _(3 stories)_
- **Visual** Modal · .cds--autoalign.cds--combo-box.cds--list-box · background-color #ffffff → transparent (inherited from ComboBox) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--list-box.cds--multi-select · background-color #ffffff → transparent (inherited from MultiSelect) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--combo-box.cds--list-box · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from ComboBox) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from MultiSelect) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--combo-box.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from ComboBox) _(2 stories)_
- **Visual** Modal · .cds--text-input · border-bottom 1px solid #8d8d8d → none _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from MultiSelect) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--combo-box.cds--list-box · border-radius 0px → 4px (inherited from ComboBox) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--list-box.cds--multi-select · border-radius 0px → 4px (inherited from MultiSelect) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--combo-box.cds--list-box · border-top/right/left none → 1px solid transparent (inherited from ComboBox) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent (inherited from MultiSelect) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--dropdown.cds--list-box · background-color #ffffff → transparent (inherited from Dropdown)
- **Visual** Modal · .cds--autoalign.cds--dropdown.cds--list-box · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Modal · .cds--autoalign.cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Dropdown)
- **Visual** Modal · .cds--autoalign.cds--dropdown.cds--list-box · border-radius 0px → 4px (inherited from Dropdown)
- **Visual** Modal · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px (inherited from Popover, Tooltip)
- **Visual** Modal · .cds--autoalign.cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent (inherited from Dropdown)
- **Layout** Modal · .cds--text-input · height 40px → 38px (-2px) (inherited from TextInput) _(2 stories)_
- **Layout** Modal · .cds--text-input · width 734px → 732px (-2px) (inherited from TextInput) _(2 stories)_
- **Structure** Modal · .cds--popover-caret element removed (inherited from Popover)

### MultiSelect

_Components · max 1.7% pixels, 10/14 stories differ_

- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent _(9 stories)_
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · border-radius 0px → 4px _(9 stories)_
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent _(9 stories)_
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(8 stories)_
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent _(8 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent _(5 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · border-radius 0px → 4px _(5 stories)_
- **Visual** MultiSelect · .cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(5 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent _(5 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(4 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent _(4 stories)_
- **Visual** MultiSelect · .cds--tag__close-icon · border-radius 50% → 4px (inherited from Tag) _(2 stories)_
- **Visual** MultiSelect · .cds--tag · border-radius 16px → 4px (inherited from Tag) _(2 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · background-color #ffffff → transparent
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · background-color #ffffff → transparent
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** MultiSelect · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button)
- **Layout** MultiSelect · .cds--text-input · height 39px → 38px (-1px) (inherited from TextInput) _(5 stories)_
- **Layout** MultiSelect · .cds--text-input · width 300px → 298px (-2px) (inherited from TextInput) _(4 stories)_
- **Layout** MultiSelect · .cds--text-input · width 400px → 398px (-2px) (inherited from TextInput)
- **Flag** MultiSelect · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### Notifications

_Components · max 0.8% pixels, 3/7 stories differ_

- **Visual** Notifications · .cds--actionable-notification · border-radius 0px → 8px _(3 stories)_
- **Visual** Notifications · .cds--actionable-notification__close-button · border-radius 0px → 999999px (pill) _(3 stories)_
- **Visual** Notifications · .cds--actionable-notification__action-button.cds--btn · border-radius 0px → 999999px (pill) _(2 stories)_
- **Visual** Notifications · .cds--actionable-notification · border-radius 0px → 4px _(2 stories)_
- **Visual** Notifications · .cds--actionable-notification::before · border-radius 0px → 0px 4px 4px 0px
- **Visual** Notifications · .cds--inline-notification · border-radius 0px → 4px
- **Visual** Notifications · .cds--inline-notification__close-button · border-radius 0px → 999999px (pill)
- **Visual** Notifications · .cds--toast-notification · border-radius 0px → 8px
- **Visual** Notifications · .cds--toast-notification__close-button · border-radius 0px → 999999px (pill)
- **Visual** Notifications · .cds--inline-notification__close-button · margin 0px → 8px
- **Visual** Notifications · .cds--toast-notification__close-button · margin 0px 0px 0px 27.0312px → 8px 8px 0px 35.0312px

### NumberInput

_Components · max 0.6% pixels, 1/6 stories differ_

> August 31, 2026: New border-radius tokens have been introduced for various border-radius values. These tokens are accompanied by new visual updates made to input components such as TextInput, NumberInput, Search and more. Updates include rounded corners, a new gradient border, and some added margins and insets for surrounding buttons and menus.

- **Visual** NumberInput · .cds--number__control-btn · border none → 1px solid transparent _(5 stories)_
- **Visual** NumberInput · .cds--number__control-btn · border-radius 0px → 4px _(5 stories)_
- **Visual** NumberInput · .cds--number__rule-divider · display block → none _(4 stories)_
- **Visual** NumberInput · .cds--label.cds--skeleton · border-radius 0px → 4px (inherited from FormLabel)
- **Visual** NumberInput · .cds--number.cds--skeleton · border-radius 0px → 4px
- **Layout** NumberInput · .cds--number__rule-divider · height 16px → 0px (-16px) _(4 stories)_
- **Layout** NumberInput · .cds--number__rule-divider · width 1px → 0px (-1px) _(4 stories)_
- **Structure** NumberInput · .cds--number__control-btn element removed

### OverflowMenu

_Components · max 7.5% pixels, 1/6 stories differ_

- **Visual** OverflowMenu · .cds--btn.cds--overflow-menu · border-radius 0px → 999999px (pill) _(5 stories)_
- **Visual** OverflowMenu · .cds--tooltip-trigger__wrapper · line-height 0px → 16px (inherited from Tooltip)
- **Visual** OverflowMenu · .cds--popover · line-height 0px → 16px (inherited from Popover)
- **Visual** OverflowMenu · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 16px (inherited from IconButton)
- **Structure** OverflowMenu · .cds--autoalign.cds--overflow-menu__container element added _(2 stories)_
- **Structure** OverflowMenu · .cds--overflow-menu__wrapper element removed _(2 stories)_
- **Structure** OverflowMenu · .cds--autoalign.cds--icon-tooltip.cds--popover--auto-align.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element added (inherited from IconButton, Popover, Tooltip)
- **Structure** OverflowMenu · .cds--tooltip-trigger__wrapper element added (inherited from Tooltip)
- **Structure** OverflowMenu · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--overflow-menu element added
- **Structure** OverflowMenu · .cds--btn__icon.cds--overflow-menu__icon element added
- **Structure** OverflowMenu · .cds--popover element added (inherited from Popover)
- **Structure** OverflowMenu · .cds--icon-tooltip.cds--popover--caret.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element removed (inherited from IconButton, Popover, Tooltip)
- **Structure** OverflowMenu · .cds--tooltip-trigger__wrapper element removed (inherited from Tooltip)
- **Structure** OverflowMenu · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--btn--md.cds--layout--size-md.cds--overflow-menu.cds--overflow-menu--md element removed
- **Structure** OverflowMenu · .cds--btn__icon.cds--overflow-menu__icon element removed
- **Structure** OverflowMenu · .cds--popover element removed (inherited from Popover)
- **Story** OverflowMenu · story graduated from Feature Flag: components-overflowmenu--auto-align
- **Story** OverflowMenu · story graduated from Feature Flag: components-overflowmenu--floating-styles
- **Story** OverflowMenu · story graduated from Feature Flag: components-overflowmenu--nested
- **Story** OverflowMenu · story graduated from Feature Flag: components-overflowmenu--with-menu-alignment
- **Story** OverflowMenu · story removed: Default
- **Flag** OverflowMenu · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12
- **Flag** OverflowMenu · feature flag enable-v12-overflowmenu: off in V11 → on by default in V12

### PasswordInput

_Components · max 0.7% pixels, 1/1 stories differ_

- **Visual** PasswordInput · .cds--password-input.cds--text-input · background-color #f4f4f4 → transparent
- **Visual** PasswordInput · .cds--password-input.cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** PasswordInput · .cds--password-input.cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** PasswordInput · .cds--password-input.cds--text-input · border-radius 0px → 4px
- **Visual** PasswordInput · .cds--btn.cds--tooltip__trigger · border-radius 0px → 4px (inherited from Button, Tooltip)
- **Visual** PasswordInput · .cds--password-input.cds--text-input · border-top/right/left none → 1px solid transparent

### Popover

_Components · max 8.2% pixels, 5/6 stories differ_

- **Visual** Popover · .cds--popover-content · border-radius 2px → 8px _(4 stories)_
- **Visual** Popover · .cds--popover-content · border-radius 0px → 8px _(2 stories)_
- **Visual** Popover · .cds--popover-caret · display block → none _(2 stories)_
- **Structure** Popover · .cds--popover-caret element removed
- **Story** Popover · story graduated from Feature Flag: components-popover--floating-styles
- **Flag** Popover · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### ProgressBar

_Components · max 2.2% pixels, 1/4 stories differ_

- **Visual** ProgressBar · .cds--progress-bar__track · border-radius 0px → 999999px (pill) _(4 stories)_
- **Visual** ProgressBar · .cds--progress-bar__track::after · background-color transparent → #0f62fe _(2 stories)_
- **Visual** ProgressBar · .cds--progress-bar__track::after · background-image linear-gradient(90deg, #0f62fe 12.5%, transparent 12.5%) → none _(2 stories)_
- **Visual** ProgressBar · .cds--progress-bar__bar · border-radius 0px → 999999px (pill) _(2 stories)_
- **Visual** ProgressBar · .cds--progress-bar__track::after · border-radius 0px → 999999px (pill) _(2 stories)_
- **Layout** ProgressBar · .cds--progress-bar__track::after · width 1196px → 299px (-897px) _(2 stories)_

### Search

_Components · max 0.4% pixels, 2/5 stories differ_

> August 31, 2026: New border-radius tokens have been introduced for various border-radius values. These tokens are accompanied by new visual updates made to input components such as TextInput, NumberInput, Search and more. Updates include rounded corners, a new gradient border, and some added margins and insets for surrounding buttons and menus.

- **Visual** Search · .cds--search-input · border-radius 0px → 4px _(3 stories)_
- **Visual** Search · .cds--search-input · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Search · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** Search · .cds--search-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** Search · .cds--search-magnifier · border-radius 0px → 4px (inherited from Tooltip) _(2 stories)_
- **Visual** Search · .cds--search-input · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Search · .cds--search-input · background-color #ffffff → transparent
- **Visual** Search · .cds--search-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)

### Select

_Components · max 2.5% pixels, 4/5 stories differ_

- **Visual** Select · .cds--select-input · border-radius 0px → 4px _(4 stories)_
- **Visual** Select · .cds--select-input · background-color #f4f4f4 → transparent _(3 stories)_
- **Visual** Select · .cds--select-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** Select · .cds--select-input · border-top/right/left none → 1px solid transparent _(3 stories)_
- **Visual** Select · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** Select · .cds--select-input · background-color #ffffff → transparent
- **Visual** Select · .cds--select-input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Select · .cds--select-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Select · .cds--select-input · border none → 1px solid transparent
- **Visual** Select · .cds--select-input · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** Select · .cds--label.cds--skeleton · border-radius 0px → 4px (inherited from FormLabel)
- **Visual** Select · .cds--select.cds--skeleton · border-radius 0px → 4px

### StructuredList

_Components · max 6.6% pixels, 3/5 stories differ_

- **Visual** StructuredList · .cds--structured-list-td · padding 16px 16px 24px 0px → 16px 16px 24px
- **Structure** StructuredList · .cds--structured-list.cds--structured-list--selection element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-thead element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-row.cds--structured-list-row--header-row element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-th element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-tbody element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-row element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-td element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list__icon element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list.cds--structured-list--selection element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-thead element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-row.cds--structured-list-row--header-row element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-th element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-tbody element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-row element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-td element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-svg element removed _(2 stories)_
- **Structure** StructuredList · .cds--layer-two.cds--layer__with-background element added
- **Structure** StructuredList · .cds--layer-three.cds--layer__with-background element added
- **Structure** StructuredList · .cds--layer-two.cds--layer__with-background element removed
- **Structure** StructuredList · .cds--layer-three.cds--layer__with-background element removed
- **Story** StructuredList · story removed: Selection
- **Story** StructuredList · story removed: With Background Layer
- **Flag** StructuredList · feature flag enable-v12-structured-list-visible-icons: off in V11 → on by default in V12

### Tag

_Components · max 1.2% pixels, 6/6 stories differ_

- **Visual** Tag · .cds--tag · border-radius 16px → 4px _(5 stories)_
- **Visual** Tag · .cds--tag__close-icon · border-radius 50% → 4px _(2 stories)_
- **Visual** Tag · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button)
- **Visual** Tag · .cds--skeleton.cds--tag · border-radius 16px → 4px

### TextInput

_Components · max 1.6% pixels, 5/7 stories differ_

> August 31, 2026: New border-radius tokens have been introduced for various border-radius values. These tokens are accompanied by new visual updates made to input components such as TextInput, NumberInput, Search and more. Updates include rounded corners, a new gradient border, and some added margins and insets for surrounding buttons and menus.

- **Visual** TextInput · .cds--text-input · border-top/right/left none → 1px solid transparent _(6 stories)_
- **Visual** TextInput · .cds--text-input · background-color #f4f4f4 → transparent _(5 stories)_
- **Visual** TextInput · .cds--text-input · border-radius 0px → 4px _(5 stories)_
- **Visual** TextInput · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(4 stories)_
- **Visual** TextInput · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(4 stories)_
- **Visual** TextInput · .cds--text-input · background-color #ffffff → transparent
- **Visual** TextInput · .cds--text-input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** TextInput · .cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** TextInput · .cds--text-input · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** TextInput · .cds--label.cds--skeleton · border-radius 0px → 4px (inherited from FormLabel)
- **Visual** TextInput · .cds--skeleton.cds--text-input · border-radius 0px → 4px

### Tile

_Components · max 0.4% pixels, 2/23 stories differ_

- **Visual** Tile · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(2 stories)_
- **Structure** Tile · .cds--tile--icon element added _(2 stories)_
- **Flag** Tile · feature flag enable-experimental-tile-contrast: deprecated → opt-in
- **Flag** Tile · feature flag enable-tile-contrast: off in V11 → opt-in
- **Flag** Tile · feature flag enable-v12-tile-default-icons: off in V11 → on by default in V12
- **Flag** Tile · feature flag enable-v12-tile-radio-icons: off in V11 → on by default in V12

### TimePicker

_Components · max 1.7% pixels, 2/2 stories differ_

- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** TimePicker · .cds--select-input · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** TimePicker · .cds--select-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** TimePicker · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · border-radius 0px → 4px _(2 stories)_
- **Visual** TimePicker · .cds--select-input · border-radius 0px → 4px _(2 stories)_
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** TimePicker · .cds--select-input · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · background-color #ffffff → transparent
- **Visual** TimePicker · .cds--select-input · background-color #ffffff → transparent
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** TimePicker · .cds--select-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Layout** TimePicker · .cds--select-input · width 85px → 87px (+2px) _(2 stories)_
- **Layout** TimePicker · .cds--select-input · width 143px → 145px (+2px) _(2 stories)_

### Toggle

_Components · max 7.0% pixels, 3/5 stories differ_

- **Visual** Toggle · .cds--toggle__label-text · margin 0px 0px 16px → 0px 0px 8px _(3 stories)_
- **Visual** Toggle · .cds--toggle__label-text.cds--visually-hidden · margin -1px -1px 16px → -1px -1px 8px
- **Flag** Toggle · feature flag enable-v12-toggle-reduced-label-spacing: off in V11 → on by default in V12

### Toggletip

_Components · max 14.8% pixels, 1/3 stories differ_

- **Visual** Toggletip · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(2 stories)_
- **Visual** Toggletip · .cds--popover-content · border-radius 2px → 4px _(2 stories)_
- **Story** Toggletip · story graduated from Feature Flag: components-toggletip--floating-styles
- **Flag** Toggletip · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### Tooltip

_Components · max 4.4% pixels, 4/5 stories differ_

- **Visual** Tooltip · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(3 stories)_
- **Structure** Tooltip · .cds--autoalign.cds--popover--auto-align.cds--popover--bottom.cds--popover--high-contrast.cds--popover-container.cds--tooltip element added
- **Structure** Tooltip · .cds--tooltip-trigger__wrapper element added
- **Structure** Tooltip · .cds--popover element added (inherited from Popover)
- **Structure** Tooltip · .cds--autoalign.cds--popover--auto-align.cds--popover--bottom.cds--popover--high-contrast.cds--popover-container.cds--tooltip element removed
- **Structure** Tooltip · .cds--tooltip-trigger__wrapper element removed
- **Structure** Tooltip · .cds--popover element removed (inherited from Popover)
- **Story** Tooltip · story graduated from Feature Flag: components-tooltip--floating-styles
- **Flag** Tooltip · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### EmptyState

_Examples · max 0.1% pixels, 2/3 stories differ_

- **Visual** EmptyState · .cds--btn.cds--empty-state__action · border-radius 0px → 999999px (pill) _(3 stories)_
- **Visual** EmptyState · .cds--search-input · background-color #f4f4f4 → transparent (inherited from Search)
- **Visual** EmptyState · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Search)
- **Visual** EmptyState · .cds--search-input · border-radius 0px → 4px (inherited from Search)

### preview__Layout

_Preview · max 0.5% pixels, 1/1 stories differ_

- **Visual** preview__Layout · .cds--text-input · background-color #f4f4f4 → transparent (inherited from TextInput)
- **Visual** preview__Layout · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput)
- **Visual** preview__Layout · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput)
- **Visual** preview__Layout · .cds--text-input · border-radius 0px → 4px (inherited from TextInput)
- **Visual** preview__Layout · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button)
- **Visual** preview__Layout · .cds--tag · border-radius 16px → 4px (inherited from Tag)
- **Visual** preview__Layout · .cds--tag · border-radius 16px → 2px
- **Visual** preview__Layout · .cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput)
- **Layout** preview__Layout · .cds--text-input · width 210.38px → 211.72px (+1.34px) (inherited from TextInput)
- **Layout** preview__Layout · .cds--text-input · width 210.39px → 211.72px (+1.33px) (inherited from TextInput)

## Inherited (18)

### ComposedModal

_Components · max 2.5% pixels, 8/10 stories differ_

- **Visual** ComposedModal · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(10 stories)_
- **Visual** ComposedModal · .cds--text-input · background-color #ffffff → transparent (inherited from TextInput) _(6 stories)_
- **Visual** ComposedModal · .cds--select-input · background-color #ffffff → transparent (inherited from Select) _(6 stories)_
- **Visual** ComposedModal · .cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput) _(6 stories)_
- **Visual** ComposedModal · .cds--select-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Select) _(6 stories)_
- **Visual** ComposedModal · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput) _(6 stories)_
- **Visual** ComposedModal · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Select) _(6 stories)_
- **Visual** ComposedModal · .cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(6 stories)_
- **Visual** ComposedModal · .cds--select-input · border-radius 0px → 4px (inherited from Select) _(6 stories)_
- **Visual** ComposedModal · .cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput) _(6 stories)_
- **Visual** ComposedModal · .cds--select-input · border-top/right/left none → 1px solid transparent (inherited from Select) _(6 stories)_
- **Visual** ComposedModal · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px (inherited from Popover, Tooltip) _(2 stories)_
- **Visual** ComposedModal · .cds--dropdown.cds--list-box · background-color #ffffff → transparent (inherited from Dropdown)
- **Visual** ComposedModal · .cds--autoalign.cds--list-box.cds--multi-select · background-color #ffffff → transparent (inherited from MultiSelect)
- **Visual** ComposedModal · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Dropdown)
- **Visual** ComposedModal · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from MultiSelect)
- **Visual** ComposedModal · .cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Dropdown)
- **Visual** ComposedModal · .cds--autoalign.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from MultiSelect)
- **Visual** ComposedModal · .cds--dropdown.cds--list-box · border-radius 0px → 4px (inherited from Dropdown)
- **Visual** ComposedModal · .cds--autoalign.cds--list-box.cds--multi-select · border-radius 0px → 4px (inherited from MultiSelect)
- **Visual** ComposedModal · .cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent (inherited from Dropdown)
- **Visual** ComposedModal · .cds--autoalign.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent (inherited from MultiSelect)
- **Structure** ComposedModal · .cds--popover-caret element removed (inherited from Popover) _(2 stories)_

### CopyButton

_Components · max 0.0% pixels, 0/1 stories differ_

- **Visual** CopyButton · .cds--btn.cds--copy.cds--copy-btn · border-radius 0px → 999999px (pill) (inherited from Button)

### ErrorBoundary

_Components · max 1.7% pixels, 2/2 stories differ_

- **Visual** ErrorBoundary · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(2 stories)_

### FileUploader

_Components · max 1.2% pixels, 4/8 stories differ_

- **Visual** FileUploader · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(3 stories)_
- **Visual** FileUploader · .cds--btn.cds--skeleton · border-radius 0px → 999999px (pill) (inherited from Button)
- **Flag** FileUploader · feature flag enable-enhanced-file-uploader: off in V11 → opt-in

### FormGroup

_Components · max 0.3% pixels, 1/1 stories differ_

- **Visual** FormGroup · .cds--text-input · background-color #f4f4f4 → transparent (inherited from TextInput)
- **Visual** FormGroup · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput)
- **Visual** FormGroup · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput)
- **Visual** FormGroup · .cds--text-input · border-radius 0px → 4px (inherited from TextInput)
- **Visual** FormGroup · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button)
- **Visual** FormGroup · .cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput)

### FormLabel

_Components · max 0.0% pixels, 0/2 stories differ_

- **Visual** FormLabel · .cds--actionable-notification · border-radius 0px → 8px (inherited from Notifications)
- **Visual** FormLabel · .cds--actionable-notification::before · border-radius 0px → 0px 4px 4px 0px (inherited from Notifications)

### IconButton

_Components · max 9.6% pixels, 1/2 stories differ_

- **Visual** IconButton · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(2 stories)_
- **Visual** IconButton · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px (inherited from Popover, Tooltip)
- **Structure** IconButton · .cds--popover-caret element removed (inherited from Popover)

### Loading

_Components · max 3.6% pixels, 2/3 stories differ_

- **Visual** Loading · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(2 stories)_

### Pagination

_Components · max 1.3% pixels, 1/7 stories differ_

- **Visual** Pagination · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px (inherited from Popover, Tooltip)
- **Structure** Pagination · .cds--popover-caret element removed (inherited from Popover)

### Slider

_Components · max 0.2% pixels, 2/10 stories differ_

- **Visual** Slider · .cds--slider-text-input.cds--text-input · background-color #f4f4f4 → transparent (inherited from TextInput) _(5 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput) _(5 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput) _(5 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(5 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput) _(5 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · background-color #ffffff → transparent (inherited from TextInput) _(2 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput) _(2 stories)_

### Tabs

_Components · max 3.2% pixels, 5/17 stories differ_

- **Visual** Tabs · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(3 stories)_
- **Visual** Tabs · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px (inherited from Popover, Tooltip) _(2 stories)_
- **Structure** Tabs · .cds--popover-caret element removed (inherited from Popover) _(2 stories)_

### TreeView

_Components · max 0.3% pixels, 1/6 stories differ_

- **Visual** TreeView · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(2 stories)_
- **Visual** TreeView · .cds--btn.cds--tree-node__label__text-button · border-radius 0px → 999999px (pill) (inherited from Button)
- **Flag** TreeView · feature flag enable-treeview-controllable: off in V11 → opt-in

### UI Shell

_Components · max 0.0% pixels, 0/11 stories differ_

- **Visual** UI Shell · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(11 stories)_

### preview__Card

_Preview · max 0.0% pixels, 0/17 stories differ_

- **Visual** preview__Card · .cds--tag · border-radius 16px → 4px (inherited from Tag)

### preview__DatePicker

_Preview · max 1.5% pixels, 6/9 stories differ_

> August 5, 2026: A new preview DatePicker has been added to @carbon/react as preview__DatePicker. It is built on the Temporal API and a framework-agnostic state machine shared with @carbon/web-components, replacing the Flatpickr-based implementation. Stories and documentation can be found in the Components/Preview/preview__DatePicker section of Storybook.

- **Visual** preview__DatePicker · .cds--date-picker__input · background-color #f4f4f4 → transparent (inherited from DatePicker) _(8 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from DatePicker) _(7 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from DatePicker) _(7 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-radius 0px → 4px (inherited from DatePicker) _(6 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-top/right/left none → 1px solid transparent (inherited from DatePicker) _(6 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · background-color #ffffff → transparent (inherited from DatePicker) _(3 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from DatePicker) _(3 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-radius 0px → 4px 0px 0px 4px (inherited from DatePicker) _(2 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-radius 0px → 0px 4px 4px 0px (inherited from DatePicker) _(2 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-top/left none → 1px solid transparent (inherited from DatePicker) _(2 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-top/right none → 1px solid transparent (inherited from DatePicker) _(2 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%) (inherited from DatePicker)
- **Visual** preview__DatePicker · .cds--date-picker__input · border-bottom 1px solid #4589ff → 1px solid transparent (inherited from DatePicker)
- **Visual** preview__DatePicker · .cds--label.cds--skeleton · border-radius 0px → 4px (inherited from FormLabel)
- **Visual** preview__DatePicker · .cds--date-picker__input.cds--skeleton · border-radius 0px → 4px 0px 0px 4px (inherited from DatePicker)
- **Visual** preview__DatePicker · .cds--date-picker__input.cds--skeleton · border-radius 0px → 0px 4px 4px 0px (inherited from DatePicker)

### preview__Dialog

_Preview · max 2.8% pixels, 5/5 stories differ_

- **Visual** preview__Dialog · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(5 stories)_
- **Visual** preview__Dialog · .cds--text-input · background-color #ffffff → transparent (inherited from TextInput) _(3 stories)_
- **Visual** preview__Dialog · .cds--select-input · background-color #ffffff → transparent (inherited from Select) _(3 stories)_
- **Visual** preview__Dialog · .cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput) _(3 stories)_
- **Visual** preview__Dialog · .cds--select-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Select) _(3 stories)_
- **Visual** preview__Dialog · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput) _(3 stories)_
- **Visual** preview__Dialog · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Select) _(3 stories)_
- **Visual** preview__Dialog · .cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(3 stories)_
- **Visual** preview__Dialog · .cds--select-input · border-radius 0px → 4px (inherited from Select) _(3 stories)_
- **Visual** preview__Dialog · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px (inherited from Popover, Tooltip) _(3 stories)_
- **Visual** preview__Dialog · .cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput) _(3 stories)_
- **Visual** preview__Dialog · .cds--select-input · border-top/right/left none → 1px solid transparent (inherited from Select) _(3 stories)_
- **Structure** preview__Dialog · .cds--popover-caret element removed (inherited from Popover) _(3 stories)_

### preview__OverflowMenuV2

_Preview · max 0.0% pixels, 0/1 stories differ_

- **Visual** preview__OverflowMenuV2 · .cds--btn.cds--overflow-menu · border-radius 0px → 999999px (pill) (inherited from OverflowMenu)

### preview_Text

_Preview · max 0.1% pixels, 1/4 stories differ_

- **Visual** preview_Text · .cds--dropdown.cds--list-box · background-color #f4f4f4 → transparent (inherited from Dropdown)
- **Visual** preview_Text · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Dropdown)
- **Visual** preview_Text · .cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Dropdown)
- **Visual** preview_Text · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button)
- **Visual** preview_Text · .cds--dropdown.cds--list-box · border-radius 0px → 4px (inherited from Dropdown)
- **Visual** preview_Text · .cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent (inherited from Dropdown)

## Migrated (23)

### AddSelect

_Components_

- **API** AddSelect · package @carbon/ibm-products → @carbon/react
- **Story** AddSelect · story added: AddSelect.Body (no IBM Products equivalent)
- **Story** AddSelect · story added: AddSelect.Column (no IBM Products equivalent)
- **Story** AddSelect · story added: AddSelect.ItemPanel (no IBM Products equivalent)
- **Story** AddSelect · story added: AddSelect.Row (no IBM Products equivalent)
- **Story** AddSelect · story added: AddSelect.SelectionSummary (no IBM Products equivalent)
- **Story** AddSelect · story added: AddSelect.SelectionSummaryItem (no IBM Products equivalent)

### Coachmark

_Components · max 15.2% pixels, 5/5 stories differ_

- **API** Coachmark · class prefix c4p-- → cds--
- **API** Coachmark · package @carbon/ibm-products → @carbon/react
- **Visual** Coachmark · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px (inherited from Popover, Tooltip) _(2 stories)_
- **Visual** Coachmark · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(2 stories)_
- **Visual** Coachmark · .cds--icon-tooltip.cds--popover-container.cds--tooltip · display block → inline-block (inherited from IconButton, Popover, Tooltip) _(2 stories)_
- **Visual** Coachmark · .cds--btn · outline none → 1px solid transparent _(2 stories)_
- **Visual** Coachmark · .cds--btn · background-color transparent → #0f62fe (inherited from Button)
- **Visual** Coachmark · .cds--btn · color #0f62fe → #ffffff (inherited from Button)
- **Visual** Coachmark · .cds--btn · display inline-flex → flex (inherited from Button)
- **Visual** Coachmark · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · margin 0px → 0px 226px 0px 0px (inherited from Popover, Tooltip)
- **Visual** Coachmark · .cds--btn · margin 0px → 16px 0px 0px
- **Visual** Coachmark · .cds--btn · padding 0px → 5.99996px 63px 5.99996px 15px
- **Layout** Coachmark · .cds--btn · width 32px → 115.66px (+83.66px) (inherited from Button)
- **Structure** Coachmark · .cds--coachmark__next--coachmark-content.cds--popover-content element removed _(5 stories)_
- **Structure** Coachmark · .cds--coachmark__next--content-header element removed _(5 stories)_
- **Structure** Coachmark · .cds--coachmark__next--content-body element removed _(5 stories)_
- **Structure** Coachmark · .cds--layout element added _(3 stories)_
- **Structure** Coachmark · .cds--layer-one.cds--white element added _(3 stories)_
- **Structure** Coachmark · .cds--coachmark__next--coachmark-content.cds--popover-content element added _(3 stories)_
- **Structure** Coachmark · .cds--coachmark__next--content-header element added _(3 stories)_
- **Structure** Coachmark · .cds--icon-tooltip.cds--popover--caret.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element added (inherited from IconButton, Popover, Tooltip) _(3 stories)_
- **Structure** Coachmark · .cds--tooltip-trigger__wrapper element added (inherited from Tooltip) _(3 stories)_
- **Structure** Coachmark · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--btn--sm.cds--coachmark__next--content-header--close-button.cds--layout--size-sm element added _(3 stories)_
- **Structure** Coachmark · .cds--popover element added (inherited from Popover) _(3 stories)_
- **Structure** Coachmark · .cds--coachmark__next--content-body element added _(3 stories)_
- **Structure** Coachmark · .cds--g10.cds--layer-one element removed _(3 stories)_
- **Structure** Coachmark · .cds--popover-caret element removed (inherited from Popover) _(3 stories)_
- **Structure** Coachmark · .cds--icon-tooltip.cds--popover--caret.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element removed (inherited from IconButton, Popover, Tooltip) _(3 stories)_
- **Structure** Coachmark · .cds--tooltip-trigger__wrapper element removed (inherited from Tooltip) _(3 stories)_
- **Structure** Coachmark · .cds--popover element removed (inherited from Popover) _(3 stories)_
- **Structure** Coachmark · .cds--btn.cds--btn--primary.cds--btn--sm.cds--layout--size-sm element removed (inherited from Button) _(3 stories)_
- **Structure** Coachmark · .cds--coachmark--coachmark-content.cds--popover-content element added (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark--content-header element added (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark--content-body element added (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark-tagline.cds--coachmark-tagline--is-open element added (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark-tagline__cta element added (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark-tagline__idea element added (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark-tagline--close-btn-container element added (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--btn.cds--btn--primary.cds--btn--sm.cds--layout--size-sm element added (inherited from Button) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark__next element removed _(2 stories)_
- **Structure** Coachmark · .cds--coachmark-tagline.cds--coachmark-tagline--is-open element removed (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark-tagline__cta element removed (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark-tagline__idea element removed (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark-tagline--close-btn-container element removed (inherited from Popover) _(2 stories)_
- **Structure** Coachmark · .cds--coachmark.cds--coachmark--floating element added
- **Structure** Coachmark · .cds--coachmark element added
- **Structure** Coachmark · .cds--link element added (inherited from Link)
- **Structure** Coachmark · .cds--coachmark__next element added
- **Structure** Coachmark · .cds--popover--caret.cds--popover--drop-shadow.cds--popover--high-contrast.cds--popover--open.cds--popover--top.cds--popover-container element added (inherited from Popover)
- **Structure** Coachmark · .cds--coachmark-beacon.cds--coachmark-beacon-default element added (inherited from Popover)
- **Structure** Coachmark · .cds--coachmark-beacon__target element added (inherited from Popover)
- **Structure** Coachmark · .cds--coachmark-beacon__center element added (inherited from Popover)
- **Structure** Coachmark · .cds--popover-caret element added (inherited from Popover)
- **Structure** Coachmark · .cds--btn.cds--btn--ghost.cds--btn--sm.cds--layout--size-sm element added (inherited from Button)
- **Structure** Coachmark · .cds--coachmark__next.cds--coachmark__next--floating element removed
- **Structure** Coachmark · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--btn--sm.cds--coachmark-tagline--close-btn.cds--layout--size-sm element removed (inherited from Button)
- **Structure** Coachmark · .cds--link element removed (inherited from Link)
- **Structure** Coachmark · .cds--popover--caret.cds--popover--drop-shadow.cds--popover--high-contrast.cds--popover--open.cds--popover--top.cds--popover-container element removed (inherited from Popover)
- **Structure** Coachmark · .cds--coachmark-beacon.cds--coachmark-beacon-default element removed (inherited from Popover)
- **Structure** Coachmark · .cds--coachmark-beacon__target element removed (inherited from Popover)
- **Structure** Coachmark · .cds--coachmark-beacon__center element removed (inherited from Popover)
- **Structure** Coachmark · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--btn--sm.cds--coachmark__next--content-header--close-button.cds--layout--size-sm element removed
- **Structure** Coachmark · .cds--btn.cds--btn--ghost.cds--btn--sm.cds--layout--size-sm element removed (inherited from Button)

### ConditionBuilder

_Components · max 0.0% pixels, 0/4 stories differ_

- **API** ConditionBuilder · class prefix c4p-- → cds--
- **API** ConditionBuilder · package @carbon/ibm-products → @carbon/react
- **Visual** ConditionBuilder · .cds--btn.cds--condition-builder__addConditionText-button · border-radius 0px → 999999px (pill) _(3 stories)_
- **Visual** ConditionBuilder · .cds--condition-builder__button.cds--condition-builder__close-condition · background-color #ffffff → #f4f4f4
- **Visual** ConditionBuilder · .cds--condition-builder__add-button.cds--condition-builder__button · background-color #ffffff → #f4f4f4
- **Visual** ConditionBuilder · .cds--condition-builder__button · background-color #ffffff → #f4f4f4
- **Visual** ConditionBuilder · .cds--condition-builder__button.cds--condition-builder__property-field · background-color #ffffff → #f4f4f4
- **Visual** ConditionBuilder · .cds--condition-builder__button.cds--condition-builder__statement-button · background-color #ffffff → #f4f4f4
- **Visual** ConditionBuilder · .cds--condition-builder__button.cds--condition-builder__connector-button · background-color #ffffff → #f4f4f4
- **Visual** ConditionBuilder · .cds--condition-builder__button.cds--condition-builder__text-ellipsis · background-color #ffffff → #f4f4f4
- **Visual** ConditionBuilder · .cds--condition-builder__button.cds--condition-builder__text-ellipsis · display block → inline-flex
- **Structure** ConditionBuilder · .cds--layout element added _(4 stories)_
- **Story** ConditionBuilder · story added: Default (no IBM Products equivalent)
- **Story** ConditionBuilder · story added: Controlled Hierarchical (no IBM Products equivalent)
- **Story** ConditionBuilder · story added: Hierarchical (no IBM Products equivalent)
- **Story** ConditionBuilder · story added: Hierarchical With Actions (no IBM Products equivalent)
- **Story** ConditionBuilder · story added: Hierarchical With Initial State (no IBM Products equivalent)
- **Story** ConditionBuilder · story added: With Custom Operators (no IBM Products equivalent)
- **Story** ConditionBuilder · story added: With Custom Statements (no IBM Products equivalent)

### EditInPlace

_Components · max 3.2% pixels, 4/4 stories differ_

- **API** EditInPlace · class prefix c4p-- → cds--
- **API** EditInPlace · package @carbon/ibm-products → @carbon/react
- **Visual** EditInPlace · .cds--edit-in-place__text-input.cds--text-input · border-radius 0px → 4px _(4 stories)_
- **Structure** EditInPlace · .cds--layout element added _(4 stories)_

### FullPageError

_Components · max 0.0% pixels, 0/1 stories differ_

- **API** FullPageError · class prefix c4p-- → cds--
- **API** FullPageError · package @carbon/ibm-products → @carbon/react
- **Visual** FullPageError · .cds--full-page-error__label · font-size 47.25px → 47.2501px
- **Visual** FullPageError · .cds--full-page-error__title · font-size 47.25px → 47.2501px
- **Visual** FullPageError · .cds--full-page-error__label · line-height 56.2275px → 56.2276px
- **Visual** FullPageError · .cds--full-page-error__title · line-height 56.2275px → 56.2276px
- **Structure** FullPageError · .cds--layout element added
- **Structure** FullPageError · .cds--breadcrumb element added (inherited from Breadcrumb)
- **Structure** FullPageError · .cds--breadcrumb-item element added (inherited from Breadcrumb)
- **Structure** FullPageError · .cds--link element added (inherited from Link)
- **Structure** FullPageError · .cds--breadcrumb-with-overflow.cds--breadcrumb-with-overflow__with-items element removed
- **Structure** FullPageError · .cds--breadcrumb-with-overflow__space element removed
- **Structure** FullPageError · .cds--breadcrumb-with-overflow__breadcrumb-container.cds--breadcrumb-with-overflow__breadcrumb-container-with-items element removed
- **Structure** FullPageError · .cds--breadcrumb element removed (inherited from Breadcrumb)
- **Structure** FullPageError · .cds--breadcrumb-item.cds--breadcrumb-with-overflow__displayed-breadcrumb element removed (inherited from Breadcrumb)
- **Structure** FullPageError · .cds--link element removed (inherited from Link)
- **Story** FullPageError · story added: Error 403 (no IBM Products equivalent)
- **Story** FullPageError · story added: Error 404 (no IBM Products equivalent)

### InterstitialScreen

_Components · max 1.4% pixels, 4/6 stories differ_

- **API** InterstitialScreen · class prefix c4p-- → cds--
- **API** InterstitialScreen · package @carbon/ibm-products → @carbon/react
- **Visual** InterstitialScreen · .cds--interstitial-screen--body · background-color #f4f4f4 → #ffffff _(6 stories)_
- **Visual** InterstitialScreen · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(6 stories)_
- **Visual** InterstitialScreen · .cds--progress-line · background-color #c6c6c6 → #e0e0e0 (inherited from ProgressIndicator) _(4 stories)_
- **Visual** InterstitialScreen · .cds--body--with-modal-open · background-color #f4f4f4 → #ffffff _(4 stories)_
- **Visual** InterstitialScreen · .cds--modal-header · background-color #ffffff → #f4f4f4 _(4 stories)_
- **Visual** InterstitialScreen · .cds--btn-set.cds--modal-footer · background-color #f4f4f4 → #ffffff (inherited from Button) _(4 stories)_
- **Visual** InterstitialScreen · .cds--modal-container · background-color #ffffff → #f4f4f4 (inherited from Modal) _(4 stories)_
- **Visual** InterstitialScreen · .cds--modal-container · border 1px solid #e0e0e0 → 1px solid #c6c6c6 (inherited from Modal) _(4 stories)_
- **Visual** InterstitialScreen · .cds--modal-header · border-bottom 1px solid #e0e0e0 → 1px solid #c6c6c6 _(4 stories)_
- **Visual** InterstitialScreen · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px (inherited from Popover, Tooltip) _(4 stories)_
- **Visual** InterstitialScreen · .cds--btn-set.cds--modal-footer · border-top 1px solid #e0e0e0 → 1px solid #c6c6c6 (inherited from Button) _(4 stories)_
- **Visual** InterstitialScreen · .cds--btn.cds--modal-close · box-shadow #0f62fe 0px 0px 0px 1px inset, #f4f4f4 0px 0px 0px 2px inset → #0f62fe 0px 0px 0px 1px inset, #ffffff 0px 0px 0px 2px inset (inherited from Button) _(4 stories)_
- **Visual** InterstitialScreen · .cds--body--with-modal-open · padding 0px → 42px _(4 stories)_
- **Visual** InterstitialScreen · .cds--interstitial-screen--internal-header.cds--interstitial-screen--internal-header--has-title · background-color #ffffff → #f4f4f4 _(2 stories)_
- **Visual** InterstitialScreen · .cds--modal-footer · background-color #f4f4f4 → #ffffff _(2 stories)_
- **Visual** InterstitialScreen · .cds--interstitial-screen--internal-header.cds--interstitial-screen--internal-header--has-title · border-bottom 1px solid #e0e0e0 → 1px solid #c6c6c6 _(2 stories)_
- **Visual** InterstitialScreen · .cds--tag · border-radius 16px → 4px (inherited from Tag) _(2 stories)_
- **Visual** InterstitialScreen · .cds--modal-footer · border-top 1px solid #e0e0e0 → 1px solid #c6c6c6 _(2 stories)_
- **Visual** InterstitialScreen · .cds--tag · background-color #ffffff → #f4f4f4 (inherited from Tag)
- **Visual** InterstitialScreen · .cds--tag · background-color #f4f4f4 → #ffffff (inherited from Tag)
- **Structure** InterstitialScreen · .cds--layout element added _(6 stories)_
- **Structure** InterstitialScreen · .cds--popover-caret element removed (inherited from Popover) _(4 stories)_

### NotificationsPanel

_Components · max 0.0% pixels, 0/1 stories differ_

- **API** NotificationsPanel · class prefix c4p-- → cds--
- **API** NotificationsPanel · package @carbon/ibm-products → @carbon/react
- **Visual** NotificationsPanel · .cds--notifications-panel__time-section-label · background-color #ffffff → #f4f4f4
- **Visual** NotificationsPanel · .cds--notifications-panel__notification.cds--notifications-panel__notification-today · background-color #ffffff → #f4f4f4
- **Visual** NotificationsPanel · .cds--notifications-panel__notification.cds--notifications-panel__notification-previous · background-color #ffffff → #f4f4f4
- **Visual** NotificationsPanel · .cds--notifications-panel__notification.cds--notifications-panel__notification-previous::before · background-color #e0e0e0 → #c6c6c6
- **Visual** NotificationsPanel · .cds--notifications-panel__header-container · background-color #ffffff → #f4f4f4
- **Visual** NotificationsPanel · .cds--notifications-panel__bottom-actions · background-color #ffffff → #f4f4f4
- **Visual** NotificationsPanel · .cds--btn.cds--header__action.cds--header__action--active · background-color #ffffff → #f4f4f4 (inherited from Button, UI Shell)
- **Visual** NotificationsPanel · .cds--notifications-panel.cds--notifications-panel__container.cds--notifications-panel__entrance · background-color #ffffff → #f4f4f4
- **Visual** NotificationsPanel · .cds--header · background-color #f4f4f4 → #ffffff (inherited from UI Shell)
- **Visual** NotificationsPanel · .cds--notifications-panel__header-container · border-bottom 1px solid #e0e0e0 → 1px solid #c6c6c6
- **Visual** NotificationsPanel · .cds--header · border-bottom 1px solid #c6c6c6 → 1px solid #e0e0e0 (inherited from UI Shell)
- **Visual** NotificationsPanel · .cds--notifications-panel.cds--notifications-panel__container.cds--notifications-panel__entrance · border-bottom/left 1px solid #c6c6c6 → 1px solid #e0e0e0
- **Visual** NotificationsPanel · .cds--btn.cds--notifications-panel__view-all-button · border-right 1px solid #e0e0e0 → 1px solid #c6c6c6
- **Visual** NotificationsPanel · .cds--btn.cds--header__action.cds--header__action--active · border-right/left 1px solid #c6c6c6 → 1px solid #e0e0e0 (inherited from Button, UI Shell)
- **Visual** NotificationsPanel · .cds--notifications-panel__bottom-actions · border-top 1px solid #e0e0e0 → 1px solid #c6c6c6
- **Visual** NotificationsPanel · .cds--btn.cds--notifications-panel__dismiss-button · box-shadow #0f62fe 0px 0px 0px 1px inset, #f4f4f4 0px 0px 0px 2px inset → #0f62fe 0px 0px 0px 1px inset, #ffffff 0px 0px 0px 2px inset
- **Structure** NotificationsPanel · .cds--layout element added
- **Structure** NotificationsPanel · .cds--notifications-panel__story__add element added
- **Structure** NotificationsPanel · .cds--btn.cds--btn--primary element added (inherited from Button)
- **Structure** NotificationsPanel · .cds--notifications-panel__notification.cds--notifications-panel__notification-previous element removed
- **Structure** NotificationsPanel · .cds--notifications-panel__notification-status-icon.cds--notifications-panel__notification-status-icon-error element removed
- **Structure** NotificationsPanel · .cds--notifications-panel__notification-content element removed
- **Structure** NotificationsPanel · .cds--notifications-panel__notification-time-label element removed
- **Structure** NotificationsPanel · .cds--notifications-panel__notification-title element removed
- **Structure** NotificationsPanel · .cds--notifications-panel__notification-description.cds--notifications-panel__notification-short-description element removed
- **Structure** NotificationsPanel · .cds--btn.cds--btn--ghost.cds--btn--sm.cds--layout--size-sm.cds--notifications-panel__notification-read-more-button element removed
- **Structure** NotificationsPanel · .cds--btn__icon element removed (inherited from Button)
- **Structure** NotificationsPanel · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--btn--sm.cds--layout--size-sm.cds--notifications-panel__dismiss-single-button element removed
- **Structure** NotificationsPanel · .cds--popover element removed (inherited from Popover)
- **Structure** NotificationsPanel · .cds--notifications-panel__story__add element removed
- **Structure** NotificationsPanel · .cds--btn.cds--btn--primary element removed (inherited from Button)

### OptionsTile

_Components_

- **API** OptionsTile · package @carbon/ibm-products → @carbon/react
- **Story** OptionsTile · story added: Default (no IBM Products equivalent)
- **Story** OptionsTile · story added: Static (no IBM Products equivalent)

### PageHeader

_Components · max 2.9% pixels, 5/9 stories differ_

- **API** PageHeader · class prefix c4p-- → cds--
- **API** PageHeader · package @carbon/ibm-products → @carbon/react
- **Visual** PageHeader · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(8 stories)_
- **Visual** PageHeader · .cds--btn · display flex → inline-flex (inherited from Button) _(5 stories)_
- **Visual** PageHeader · .cds--btn · border none → 1px solid transparent (inherited from Button) _(4 stories)_
- **Visual** PageHeader · .cds--btn · font-size 16px → 14px (inherited from Button) _(4 stories)_
- **Visual** PageHeader · .cds--btn · line-height 20.5715px → 18.0001px (inherited from Button) _(4 stories)_
- **Visual** PageHeader · .cds--btn · outline 2px solid transparent → none (inherited from Button) _(4 stories)_
- **Visual** PageHeader · .cds--btn · outline-offset -2px → 0px (inherited from Button) _(4 stories)_
- **Visual** PageHeader · .cds--tooltip-trigger__wrapper · letter-spacing 0.16px → normal (inherited from Tooltip) _(3 stories)_
- **Visual** PageHeader · .cds--popover · letter-spacing 0.16px → normal (inherited from Popover) _(3 stories)_
- **Visual** PageHeader · .cds--page-header__breadcrumb-bar.cds--page-header__breadcrumb-bar-border · background-color #ffffff → #f4f4f4 _(2 stories)_
- **Visual** PageHeader · .cds--page-header__content · background-color #ffffff → #f4f4f4 _(2 stories)_
- **Visual** PageHeader · .cds--page-header__tab-bar · background-color #ffffff → #f4f4f4 _(2 stories)_
- **Visual** PageHeader · .cds--page-header.cds--page-header__next · background-color #ffffff → #f4f4f4 _(2 stories)_
- **Visual** PageHeader · .cds--tabs__nav-item.cds--tabs__nav-link · border-bottom 2px solid #c6c6c6 → 2px solid #e0e0e0 (inherited from Tabs) _(2 stories)_
- **Visual** PageHeader · .cds--page-header__breadcrumb-bar.cds--page-header__breadcrumb-bar-border · border-bottom 1px solid #e0e0e0 → 1px solid #c6c6c6 _(2 stories)_
- **Visual** PageHeader · .cds--page-header.cds--page-header__next · border-bottom 1px solid #e0e0e0 → 1px solid #c6c6c6 _(2 stories)_
- **Visual** PageHeader · .cds--tag · border-radius 16px → 4px (inherited from Tag) _(2 stories)_
- **Visual** PageHeader · .cds--page-header.cds--page-header__next · display inline-block → block _(2 stories)_
- **Visual** PageHeader · .cds--tooltip-trigger__wrapper · font-size 14px → 28px _(2 stories)_
- **Visual** PageHeader · .cds--popover · font-size 14px → 28px _(2 stories)_
- **Visual** PageHeader · .cds--tooltip-trigger__wrapper · font-size 28px → 16px (inherited from Tooltip) _(2 stories)_
- **Visual** PageHeader · .cds--popover · font-size 28px → 16px (inherited from Popover) _(2 stories)_
- **Visual** PageHeader · .cds--autoalign.cds--popover-container.cds--tooltip · font-size 14px → 28px (inherited from Popover) _(2 stories)_
- **Visual** PageHeader · .cds--autoalign.cds--popover-container.cds--tooltip · letter-spacing 0.16px → normal (inherited from Tooltip) _(2 stories)_
- **Visual** PageHeader · .cds--tooltip-trigger__wrapper · line-height 0px → 36.0002px _(2 stories)_
- **Visual** PageHeader · .cds--popover · line-height 0px → 36.0002px _(2 stories)_
- **Visual** PageHeader · .cds--tooltip-trigger__wrapper · line-height 36.0002px → 16px (inherited from Tooltip) _(2 stories)_
- **Visual** PageHeader · .cds--popover · line-height 36.0002px → 16px (inherited from Popover) _(2 stories)_
- **Visual** PageHeader · .cds--autoalign.cds--popover-container.cds--tooltip · line-height 0px → 36.0002px (inherited from Popover) _(2 stories)_
- **Visual** PageHeader · .cds--tag · background-color #e0e0e0 → #d0e2ff (inherited from Tag)
- **Visual** PageHeader · .cds--header · background-color #f4f4f4 → #ffffff (inherited from UI Shell)
- **Visual** PageHeader · .cds--tag · border 1px solid #a8a8a8 → 1px solid #78a9ff (inherited from Tag)
- **Visual** PageHeader · .cds--header · border-bottom 1px solid #c6c6c6 → 1px solid #e0e0e0 (inherited from UI Shell)
- **Visual** PageHeader · .cds--btn.cds--overflow-menu · border-radius 0px → 999999px (pill) (inherited from OverflowMenu)
- **Visual** PageHeader · .cds--tag__label · color #161616 → #0043ce (inherited from Tag)
- **Visual** PageHeader · .cds--tag · color #161616 → #0043ce (inherited from Tag)
- **Visual** PageHeader · .cds--tag · display inline-flex → flex (inherited from Tag)
- **Visual** PageHeader · .cds--btn.cds--overflow-menu · font-size 14px → 16px (inherited from OverflowMenu)
- **Visual** PageHeader · .cds--tooltip-trigger__wrapper · font-size 14px → 16px (inherited from Tooltip)
- **Visual** PageHeader · .cds--popover · font-size 14px → 16px (inherited from Popover)
- **Visual** PageHeader · .cds--icon-tooltip.cds--popover-container.cds--tooltip · font-size 14px → 16px (inherited from IconButton, Popover, Tooltip)
- **Visual** PageHeader · .cds--btn__icon.cds--overflow-menu__icon · font-size 14px → 16px (inherited from OverflowMenu)
- **Visual** PageHeader · .cds--icon-tooltip.cds--popover-container.cds--tooltip · letter-spacing 0.16px → normal (inherited from IconButton, Popover, Tooltip)
- **Visual** PageHeader · .cds--btn.cds--overflow-menu · line-height 18.0001px → 20.5715px (inherited from OverflowMenu)
- **Visual** PageHeader · .cds--tooltip-trigger__wrapper · line-height 0px → 16px (inherited from Tooltip)
- **Visual** PageHeader · .cds--popover · line-height 0px → 16px (inherited from Popover)
- **Visual** PageHeader · .cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 16px (inherited from IconButton, Popover, Tooltip)
- **Visual** PageHeader · .cds--btn__icon.cds--overflow-menu__icon · line-height 18.0001px → 20.5715px (inherited from OverflowMenu)
- **Layout** PageHeader · .cds--btn · height 0px → 40px (+40px) (inherited from Button) _(6 stories)_
- **Layout** PageHeader · .cds--btn · width 0px → 40px (+40px) (inherited from Button) _(6 stories)_
- **Layout** PageHeader · .cds--btn · width 0px → 173.22px (+173.22px) (inherited from Button) _(2 stories)_
- **Layout** PageHeader · .cds--tag · width 33.05px → 48.41px (+15.36px) (inherited from Tag)
- **Structure** PageHeader · .cds--layout element added _(9 stories)_
- **Structure** PageHeader · .cds--page-header.cds--page-header__next element removed _(8 stories)_
- **Structure** PageHeader · .cds--page-header.cds--page-header__next element added _(7 stories)_
- **Structure** PageHeader · .cds--css-grid element added _(7 stories)_
- **Structure** PageHeader · .cds--css-grid-column.cds--lg:col-span-16.cds--md:col-span-8.cds--sm:col-span-4 element added (inherited from AspectRatio, Grid, preview__Card) _(7 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb-container element added _(7 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb-wrapper element added _(7 stories)_
- **Structure** PageHeader · .cds--page-header-breadcrumb-overflow element added _(7 stories)_
- **Structure** PageHeader · .cds--breadcrumb.cds--breadcrumb--no-trailing-slash element added (inherited from Breadcrumb) _(7 stories)_
- **Structure** PageHeader · .cds--breadcrumb-item element added (inherited from Breadcrumb) _(7 stories)_
- **Structure** PageHeader · .cds--link element added (inherited from Link) _(7 stories)_
- **Structure** PageHeader · .cds--truncated-text__text-content element added (inherited from TruncatedText) _(7 stories)_
- **Structure** PageHeader · .cds--css-grid element removed _(7 stories)_
- **Structure** PageHeader · .cds--css-grid-column.cds--lg:col-span-16.cds--md:col-span-8.cds--sm:col-span-4 element removed (inherited from AspectRatio, Grid, preview__Card) _(7 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb-container element removed _(7 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb-wrapper element removed _(7 stories)_
- **Structure** PageHeader · .cds--page-header-breadcrumb-overflow element removed _(7 stories)_
- **Structure** PageHeader · .cds--breadcrumb.cds--breadcrumb--no-trailing-slash element removed (inherited from Breadcrumb) _(7 stories)_
- **Structure** PageHeader · .cds--breadcrumb-item element removed (inherited from Breadcrumb) _(7 stories)_
- **Structure** PageHeader · .cds--link element removed (inherited from Link) _(7 stories)_
- **Structure** PageHeader · .cds--truncated-text__text-content element removed (inherited from TruncatedText) _(7 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb-bar.cds--page-header__breadcrumb-bar-border element added _(6 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb__actions element added _(6 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb-page-actions element added _(6 stories)_
- **Structure** PageHeader · .cds--popover element added (inherited from Popover) _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content element added _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__title-wrapper element added _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__start element added _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__title-container element added _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__title element added _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__title-text.cds--truncated-text element added _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__body element added _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__subtitle element added _(6 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb-bar.cds--page-header__breadcrumb-bar-border element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb__actions element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb-page-actions element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__title-wrapper element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__start element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__title-container element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__title element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__title-text.cds--truncated-text element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__body element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__content__subtitle element removed _(6 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb__icon element added _(5 stories)_
- **Structure** PageHeader · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--btn--md.cds--layout--size-md element added (inherited from Button) _(5 stories)_
- **Structure** PageHeader · .cds--tooltip-trigger__wrapper element added (inherited from Tooltip) _(5 stories)_
- **Structure** PageHeader · .cds--icon-tooltip.cds--popover--caret.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element removed (inherited from IconButton, Popover, Tooltip) _(5 stories)_
- **Structure** PageHeader · .cds--tooltip-trigger__wrapper element removed (inherited from Tooltip) _(5 stories)_
- **Structure** PageHeader · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--btn--md.cds--layout--size-md element removed (inherited from Button) _(5 stories)_
- **Structure** PageHeader · .cds--popover element removed (inherited from Popover) _(5 stories)_
- **Structure** PageHeader · .cds--page-header__breadcrumb__icon element removed _(5 stories)_
- **Structure** PageHeader · .cds--autoalign.cds--icon-tooltip.cds--popover--auto-align.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element added (inherited from IconButton, Popover, Tooltip) _(4 stories)_
- **Structure** PageHeader · .cds--page-header__tab-bar element added _(3 stories)_
- **Structure** PageHeader · .cds--css-grid.cds--css-grid--condensed element added _(3 stories)_
- **Structure** PageHeader · .cds--tabs element added (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tab--list element added (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tabs__nav-item.cds--tabs__nav-item--selected.cds--tabs__nav-link element added (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tabs__nav-item-label-wrapper element added (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tabs__nav-item-label element added (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tabs__nav-item--close--hidden element added (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tabs__nav-item.cds--tabs__nav-link element added (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tag__label element added (inherited from Tag) _(3 stories)_
- **Structure** PageHeader · .cds--tab-content element added (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--page-header__content__page-actions element added _(3 stories)_
- **Structure** PageHeader · .cds--icon-tooltip.cds--popover--caret.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element added (inherited from IconButton, Popover, Tooltip) _(3 stories)_
- **Structure** PageHeader · .cds--page-header__tab-bar element removed _(3 stories)_
- **Structure** PageHeader · .cds--css-grid.cds--css-grid--condensed element removed _(3 stories)_
- **Structure** PageHeader · .cds--tabs element removed (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tab--list element removed (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tabs__nav-item.cds--tabs__nav-item--selected.cds--tabs__nav-link element removed (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tabs__nav-item-label-wrapper element removed (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tabs__nav-item-label element removed (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tabs__nav-item--close--hidden element removed (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tabs__nav-item.cds--tabs__nav-link element removed (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--tag__label element removed (inherited from Tag) _(3 stories)_
- **Structure** PageHeader · .cds--tab-content element removed (inherited from Tabs) _(3 stories)_
- **Structure** PageHeader · .cds--truncated-text__tooltip-trigger element added (inherited from TruncatedText) _(2 stories)_
- **Structure** PageHeader · .cds--page-header__content__contextual-actions element added _(2 stories)_
- **Structure** PageHeader · .cds--layout--size-lg.cds--tag.cds--tag--blue.cds--tag--lg element added (inherited from Tag) _(2 stories)_
- **Structure** PageHeader · .cds--popover--bottom.cds--popover--caret.cds--popover--high-contrast.cds--popover-container.cds--tooltip element removed (inherited from Popover, Tooltip) _(2 stories)_
- **Structure** PageHeader · .cds--truncated-text__tooltip-trigger element removed (inherited from TruncatedText) _(2 stories)_
- **Structure** PageHeader · .cds--page-header__content__contextual-actions element removed _(2 stories)_
- **Structure** PageHeader · .cds--layout--size-lg.cds--tag.cds--tag--blue.cds--tag--lg element removed (inherited from Tag) _(2 stories)_
- **Structure** PageHeader · .cds--page-header__content__page-actions element removed _(2 stories)_
- **Structure** PageHeader · .cds--btn.cds--btn--md.cds--btn--primary.cds--layout--size-md element removed (inherited from Button) _(2 stories)_
- **Structure** PageHeader · .cds--btn__icon element removed (inherited from Button) _(2 stories)_
- **Structure** PageHeader · .cds--breadcrumb-item.cds--breadcrumb-item--current.cds--page-header-title-breadcrumb.cds--page-header-title-breadcrumb-show.cds--page-header-title-breadcrumb-show__without-content-element element added (inherited from Breadcrumb)
- **Structure** PageHeader · .cds--link.cds--truncated-text element added (inherited from Link, TruncatedText)
- **Structure** PageHeader · .cds--page-header__breadcrumb__content-actions element added
- **Structure** PageHeader · .cds--page-header__tab-bar--tablist element added
- **Structure** PageHeader · .cds--page-header--tag-overflow-container element added
- **Structure** PageHeader · .cds--tag.cds--tag--blue element added (inherited from Tag)
- **Structure** PageHeader · .cds--tag.cds--tag--purple element added (inherited from Tag)
- **Structure** PageHeader · .cds--tag.cds--tag--red element added (inherited from Tag)
- **Structure** PageHeader · .cds--autoalign.cds--page-header--tag-overflow-popover.cds--popover--auto-align.cds--popover--bottom.cds--popover--drop-shadow.cds--popover-container element added (inherited from Popover)
- **Structure** PageHeader · .cds--tag.cds--tag--gray.cds--tag--operational element added (inherited from Tag)
- **Structure** PageHeader · .cds--css-grid-column.cds--lg:col-span-8.cds--md:col-span-4.cds--sm:col-span-4 element added (inherited from AspectRatio, Grid, preview__Card)
- **Structure** PageHeader · .cds--page-header__breadcrumb-bar element added
- **Structure** PageHeader · .cds--css-grid-column.cds--lg:col-span-8.cds--md:col-span-4.cds--sm:col-span-0 element added (inherited from AspectRatio, Grid, preview__Card)
- **Structure** PageHeader · .cds--aspect-ratio.cds--aspect-ratio--2x1.cds--page-header__hero-image.cds--page-header__hero-image--object-fit-cover element added
- **Structure** PageHeader · .cds--page-header__content__icon element added
- **Structure** PageHeader · .cds--btn.cds--btn--md.cds--btn--primary.cds--layout--size-md element added (inherited from Button)
- **Structure** PageHeader · .cds--btn__icon element added (inherited from Button)
- **Structure** PageHeader · .cds--breadcrumb-item.cds--page-header-breadcrumb-overflow-item.cds--page-header-overflow-breadcrumb-item-with-items element added (inherited from Breadcrumb)
- **Structure** PageHeader · .cds--overflow-menu__wrapper element added (inherited from OverflowMenu)
- **Structure** PageHeader · .cds--icon-tooltip.cds--popover--bottom.cds--popover--caret.cds--popover--high-contrast.cds--popover-container.cds--tooltip element added (inherited from IconButton, Popover, Tooltip)
- **Structure** PageHeader · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--overflow-menu element added (inherited from OverflowMenu)
- **Structure** PageHeader · .cds--overflow-menu__icon element added (inherited from OverflowMenu)
- **Structure** PageHeader · .cds--breadcrumb-item.cds--breadcrumb-item--current.cds--page-header-title-breadcrumb.cds--page-header-title-breadcrumb-show__with-content-element element added (inherited from Breadcrumb)
- **Structure** PageHeader · .cds--page-header__breadcrumb__content-actions.cds--page-header__breadcrumb__content-actions-with-global-actions element added
- **Structure** PageHeader · .cds--breadcrumb-item.cds--breadcrumb-item--current.cds--page-header-title-breadcrumb.cds--page-header-title-breadcrumb-show.cds--page-header-title-breadcrumb-show__without-content-element element removed (inherited from Breadcrumb)
- **Structure** PageHeader · .cds--link.cds--truncated-text element removed (inherited from Link, TruncatedText)
- **Structure** PageHeader · .cds--page-header__breadcrumb__content-actions element removed
- **Structure** PageHeader · .cds--page-header__tab-bar--tablist element removed
- **Structure** PageHeader · .cds--page-header--tag-overflow-container element removed
- **Structure** PageHeader · .cds--tag.cds--tag--blue element removed (inherited from Tag)
- **Structure** PageHeader · .cds--tag.cds--tag--purple element removed (inherited from Tag)
- **Structure** PageHeader · .cds--tag.cds--tag--red element removed (inherited from Tag)
- **Structure** PageHeader · .cds--tag.cds--tag--blue.cds--tag--operational element removed (inherited from Tag)
- **Structure** PageHeader · .cds--page-header--tag-overflow-popover.cds--popover--bottom.cds--popover--caret.cds--popover--drop-shadow.cds--popover-container element removed (inherited from Popover)
- **Structure** PageHeader · .cds--css-grid-column.cds--lg:col-span-8.cds--md:col-span-4.cds--sm:col-span-4 element removed (inherited from AspectRatio, Grid, preview__Card)
- **Structure** PageHeader · .cds--page-header__breadcrumb-bar element removed
- **Structure** PageHeader · .cds--subgrid.cds--subgrid--wide element removed
- **Structure** PageHeader · .cds--css-grid-column.cds--lg:col-span-8.cds--md:col-span-4.cds--sm:col-span-0 element removed (inherited from AspectRatio, Grid, preview__Card)
- **Structure** PageHeader · .cds--aspect-ratio.cds--aspect-ratio--2x1.cds--page-header__hero-image.cds--page-header__hero-image--object-fit-cover element removed
- **Structure** PageHeader · .cds--page-header__content__icon element removed
- **Structure** PageHeader · .cds--breadcrumb-item.cds--page-header-breadcrumb-overflow-item.cds--page-header-overflow-breadcrumb-item-with-items element removed (inherited from Breadcrumb)
- **Structure** PageHeader · .cds--overflow-menu__wrapper element removed (inherited from OverflowMenu)
- **Structure** PageHeader · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--overflow-menu element removed (inherited from OverflowMenu)
- **Structure** PageHeader · .cds--breadcrumb-item.cds--breadcrumb-item--current.cds--page-header-title-breadcrumb.cds--page-header-title-breadcrumb-show__with-content-element element removed (inherited from Breadcrumb)
- **Structure** PageHeader · .cds--page-header__breadcrumb__content-actions.cds--page-header__breadcrumb__content-actions-with-global-actions element removed
- **Structure** PageHeader · .cds--page-header.cds--page-header--disable-sticky-tab-bar.cds--page-header__next element removed

### SidePanel

_Components · max 10.8% pixels, 8/8 stories differ_

- **API** SidePanel · class prefix c4p-- → cds--
- **API** SidePanel · package @carbon/ibm-products → @carbon/react
- **Visual** SidePanel · .cds--header · background-color #161616 → #ffffff (inherited from UI Shell) _(8 stories)_
- **Visual** SidePanel · .cds--action-set.cds--btn-set.cds--side-panel__actions-container · background-color #ffffff → #f4f4f4 _(8 stories)_
- **Visual** SidePanel · .cds--side-panel · background-color #ffffff → #f4f4f4 _(8 stories)_
- **Visual** SidePanel · .cds--header · border-bottom 1px solid #393939 → 1px solid #e0e0e0 (inherited from UI Shell) _(8 stories)_
- **Visual** SidePanel · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(8 stories)_
- **Visual** SidePanel · .cds--action-set.cds--btn-set.cds--side-panel__actions-container · border-top 1px solid #e0e0e0 → 1px solid #c6c6c6 _(8 stories)_
- **Visual** SidePanel · .cds--header__name--prefix · color #f4f4f4 → #161616 (inherited from UI Shell) _(8 stories)_
- **Visual** SidePanel · .cds--header__name · color #f4f4f4 → #161616 (inherited from UI Shell) _(8 stories)_
- **Visual** SidePanel · .cds--text-input · background-color #f4f4f4 → #ffffff _(7 stories)_
- **Visual** SidePanel · .cds--text-area · background-color #f4f4f4 → #ffffff (inherited from TextArea) _(7 stories)_
- **Visual** SidePanel · .cds--list-box.cds--multi-select · background-color #f4f4f4 → #ffffff (inherited from Dropdown, MultiSelect) _(7 stories)_
- **Visual** SidePanel · .cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput) _(7 stories)_
- **Visual** SidePanel · .cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from Dropdown, MultiSelect) _(7 stories)_
- **Visual** SidePanel · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput) _(7 stories)_
- **Visual** SidePanel · .cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from Dropdown, MultiSelect) _(7 stories)_
- **Visual** SidePanel · .cds--side-panel · border-left 1px solid #e0e0e0 → 1px solid #c6c6c6 _(7 stories)_
- **Visual** SidePanel · .cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(7 stories)_
- **Visual** SidePanel · .cds--list-box.cds--multi-select · border-radius 0px → 4px (inherited from Dropdown, MultiSelect) _(7 stories)_
- **Visual** SidePanel · .cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput) _(7 stories)_
- **Visual** SidePanel · .cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent (inherited from Dropdown, MultiSelect) _(7 stories)_
- **Visual** SidePanel · .cds--btn · display flex → inline-flex (inherited from Button) _(7 stories)_
- **Visual** SidePanel · .cds--btn · margin 320px 515.406px → 0px (inherited from Button) _(7 stories)_
- **Visual** SidePanel · .cds--text-input · margin 0px 16px 0px 0px → 0px (inherited from TextInput) _(7 stories)_
- **Visual** SidePanel · .cds--text-area · padding 11px 16px → 11px 16px 8px (inherited from TextArea) _(7 stories)_
- **Visual** SidePanel · .cds--side-panel__title.cds--side-panel__title--no-label · background-color #ffffff → #f4f4f4 _(6 stories)_
- **Visual** SidePanel · .cds--side-panel__header.cds--side-panel__header--has-title.cds--side-panel__header--reduced-motion · background-color #ffffff → #f4f4f4 _(6 stories)_
- **Visual** SidePanel · .cds--side-panel__header.cds--side-panel__header--has-title.cds--side-panel__header--reduced-motion::before · background-color #e0e0e0 → #c6c6c6 _(6 stories)_
- **Visual** SidePanel · .cds--side-panel__header.cds--side-panel__header--has-title.cds--side-panel__header--reduced-motion · border-bottom 1px solid #e0e0e0 → 1px solid #c6c6c6 _(6 stories)_
- **Visual** SidePanel · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px (inherited from Popover, Tooltip) _(5 stories)_
- **Visual** SidePanel · .cds--btn.cds--side-panel__close-button · box-shadow #0f62fe 0px 0px 0px 1px inset, #f4f4f4 0px 0px 0px 2px inset → #0f62fe 0px 0px 0px 1px inset, #ffffff 0px 0px 0px 2px inset _(5 stories)_
- **Visual** SidePanel · .cds--side-panel__title · background-color #ffffff → #f4f4f4
- **Visual** SidePanel · .cds--side-panel__subtitle-text.cds--side-panel__subtitle-text-no-animation-no-action-toolbar · background-color #ffffff → #f4f4f4
- **Visual** SidePanel · .cds--side-panel__header.cds--side-panel__header--has-title.cds--side-panel__header--no-title-animation.cds--side-panel__header--reduced-motion · background-color #ffffff → #f4f4f4
- **Visual** SidePanel · .cds--side-panel__header.cds--side-panel__header--has-title.cds--side-panel__header--no-title-animation.cds--side-panel__header--reduced-motion::before · background-color #e0e0e0 → #c6c6c6
- **Visual** SidePanel · .cds--side-panel__header.cds--side-panel__header--reduced-motion · background-color #ffffff → #f4f4f4
- **Visual** SidePanel · .cds--side-panel__inner-content · background-image linear-gradient(to top, #ffffff 0%, #4589ff / 10% 0%, 15%, transparent 50%), linear-gradient(to top, #ffffff, #ffffff), linear-gradient(#a6c8ff / 64%, #78a9ff), linear-gradient(to top, #ffffff, #ffffff) → linear-gradient(to top, #f4f4f4 0%, #4589ff / 10% 0%, 15%, transparent 50%), linear-gradient(to top, #f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64%, #78a9ff), linear-gradient(to top, #f4f4f4, #f4f4f4)
- **Visual** SidePanel · .cds--side-panel__header.cds--side-panel__header--reduced-motion · border-bottom 1px solid #e0e0e0 → 1px solid #c6c6c6
- **Visual** SidePanel · .cds--side-panel__title-text · padding 0px 64px 0px 0px → 0px 32px 0px 0px
- **Visual** SidePanel · .cds--side-panel__subtitle-text · padding 0px 64px 16px 0px → 0px 32px 16px 0px
- **Visual** SidePanel · .cds--side-panel__inner-content · padding 8px 16px 16px → 0px 16px 16px
- **Layout** SidePanel · .cds--btn · width 185.19px → 154.95px (-30.24px) (inherited from Button) _(8 stories)_
- **Layout** SidePanel · .cds--text-area · height 102.94px → 99.94px (-3px) (inherited from TextArea) _(7 stories)_
- **Layout** SidePanel · .cds--text-input · width 215.5px → 447px (+231.5px) (inherited from TextInput) _(7 stories)_
- **Layout** SidePanel · .cds--side-panel__header.cds--side-panel__header--has-title.cds--side-panel__header--reduced-motion · height 193px → 161px (-32px)
- **Layout** SidePanel · .cds--action-set.cds--btn-set.cds--side-panel__actions-container · height 1px → 65px (+64px)
- **Structure** SidePanel · .cds--layout element added _(8 stories)_
- **Structure** SidePanel · .cds--content element removed _(8 stories)_
- **Structure** SidePanel · .cds--popover-caret element removed (inherited from Popover) _(5 stories)_
- **Structure** SidePanel · .cds--action-set__action-button.cds--action-set__action-button--expressive.cds--btn.cds--btn--expressive.cds--btn--primary element added (inherited from Button)
- **Structure** SidePanel · .cds--side-panel__action-toolbar element removed
- **Structure** SidePanel · .cds--btn.cds--btn--primary.cds--btn--sm.cds--layout--size-sm.cds--side-panel__action-toolbar-button.cds--side-panel__action-toolbar-leading-button element removed
- **Structure** SidePanel · .cds--btn__icon element removed (inherited from Button)
- **Structure** SidePanel · .cds--icon-tooltip.cds--popover--bottom-start.cds--popover--caret.cds--popover--high-contrast.cds--popover-container.cds--tooltip element removed (inherited from IconButton, Popover, Tooltip)
- **Structure** SidePanel · .cds--tooltip-trigger__wrapper element removed (inherited from Tooltip)
- **Structure** SidePanel · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--btn--sm.cds--layout--size-sm.cds--side-panel__action-toolbar-button element removed
- **Structure** SidePanel · .cds--popover element removed (inherited from Popover)

### TagOverflow

_Components · max 2.4% pixels, 8/8 stories differ_

- **API** TagOverflow · class prefix c4p-- → cds--
- **API** TagOverflow · package @carbon/ibm-products → @carbon/react
- **Visual** TagOverflow · .cds--popover-caret · display block → none (inherited from DefinitionTooltip, Popover, Tooltip) _(2 stories)_
- **Visual** TagOverflow · .cds--popover-caret · font-size 12px → 14px (inherited from DefinitionTooltip, Popover, Tooltip) _(2 stories)_
- **Visual** TagOverflow · .cds--popover-caret::after · font-size 12px → 14px (inherited from DefinitionTooltip, Popover, Tooltip) _(2 stories)_
- **Visual** TagOverflow · .cds--popover-caret · letter-spacing 0.32px → 0.16px (inherited from DefinitionTooltip, Popover, Tooltip) _(2 stories)_
- **Visual** TagOverflow · .cds--popover-caret::after · letter-spacing 0.32px → 0.16px (inherited from DefinitionTooltip, Popover, Tooltip) _(2 stories)_
- **Visual** TagOverflow · .cds--popover-caret · color #161616 → #ffffff (inherited from Popover, Tooltip)
- **Visual** TagOverflow · .cds--popover-caret::after · color #161616 → #ffffff (inherited from Popover, Tooltip)
- **Visual** TagOverflow · .cds--tag__label · color #9f1853 → #161616 (inherited from Tag)
- **Visual** TagOverflow · .cds--popover-caret · color #9f1853 → #ffffff (inherited from DefinitionTooltip, Popover)
- **Visual** TagOverflow · .cds--popover-caret::after · color #9f1853 → #ffffff (inherited from DefinitionTooltip, Popover)
- **Visual** TagOverflow · .cds--tag__label · display inline-block → block (inherited from Tag)
- **Visual** TagOverflow · .cds--tag__label · letter-spacing normal → 0.32px (inherited from Tag)
- **Visual** TagOverflow · .cds--popover-caret · line-height 16px → 18.0001px (inherited from Popover, Tooltip)
- **Visual** TagOverflow · .cds--popover-caret::after · line-height 16px → 18.0001px (inherited from Popover, Tooltip)
- **Visual** TagOverflow · .cds--tag__label · line-height normal → 16px (inherited from Tag)
- **Visual** TagOverflow · .cds--popover-caret · line-height 16px → 20px (inherited from DefinitionTooltip, Popover)
- **Visual** TagOverflow · .cds--popover-caret::after · line-height 16px → 20px (inherited from DefinitionTooltip, Popover)
- **Structure** TagOverflow · .cds--layout element added _(8 stories)_
- **Structure** TagOverflow · .cds--tag-overflow element added _(8 stories)_
- **Structure** TagOverflow · .cds--tag-overflow--align-start.cds--tag-overflow__visible-tags element added _(8 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__tag-container element added _(8 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__indicator element added _(8 stories)_
- **Structure** TagOverflow · .cds--tag-overflow-popover element added _(8 stories)_
- **Structure** TagOverflow · .cds--autoalign.cds--popover--auto-align.cds--popover--bottom.cds--popover--drop-shadow.cds--popover--high-contrast.cds--popover-container.cds--tag-overflow-popover__el element added (inherited from Popover) _(8 stories)_
- **Structure** TagOverflow · .cds--tag.cds--tag--gray.cds--tag--operational.cds--tag-overflow-popover__trigger element added (inherited from Tag) _(8 stories)_
- **Structure** TagOverflow · .cds--tag__label element added (inherited from Tag) _(8 stories)_
- **Structure** TagOverflow · .cds--popover element added (inherited from Popover) _(8 stories)_
- **Structure** TagOverflow · .cds--g10.cds--layer-one element removed _(8 stories)_
- **Structure** TagOverflow · .cds--tag-overflow element removed _(8 stories)_
- **Structure** TagOverflow · .cds--tag-overflow--align-start.cds--tag-overflow__visible-tags element removed _(8 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__tag-container element removed _(8 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__indicator element removed _(8 stories)_
- **Structure** TagOverflow · .cds--tag-overflow-popover element removed _(8 stories)_
- **Structure** TagOverflow · .cds--popover--bottom.cds--popover--caret.cds--popover--drop-shadow.cds--popover--high-contrast.cds--popover-container.cds--tag-overflow-popover__el element removed (inherited from Popover) _(8 stories)_
- **Structure** TagOverflow · .cds--tag.cds--tag--gray.cds--tag--operational.cds--tag-overflow-popover__trigger element removed (inherited from Tag) _(8 stories)_
- **Structure** TagOverflow · .cds--tag__label element removed (inherited from Tag) _(8 stories)_
- **Structure** TagOverflow · .cds--popover element removed (inherited from Popover) _(8 stories)_
- **Structure** TagOverflow · .cds--tooltip-trigger__wrapper element added (inherited from Tooltip) _(3 stories)_
- **Structure** TagOverflow · .cds--tag.cds--tag-overflow__item--tag element added _(3 stories)_
- **Structure** TagOverflow · .cds--tooltip-trigger__wrapper element removed (inherited from Tooltip) _(3 stories)_
- **Structure** TagOverflow · .cds--tag.cds--tag-overflow__item--tag element removed _(3 stories)_
- **Structure** TagOverflow · .cds--autoalign.cds--icon-tooltip.cds--popover--auto-align.cds--popover--bottom.cds--popover--high-contrast.cds--popover-container.cds--tooltip.cds--user-avatar__tooltip element added (inherited from IconButton, Popover, Tooltip, UserAvatar) _(2 stories)_
- **Structure** TagOverflow · .cds--user-avatar__tooltip-trigger element added (inherited from UserAvatar) _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-1-cyan element added _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-2-gray element added _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-3-green element added _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-4-magenta element added _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-5-purple element added _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-6-teal element added _(2 stories)_
- **Structure** TagOverflow · .cds--icon-tooltip.cds--popover--bottom.cds--popover--caret.cds--popover--high-contrast.cds--popover-container.cds--tooltip.cds--user-avatar__tooltip element removed (inherited from IconButton, Popover, Tooltip, UserAvatar) _(2 stories)_
- **Structure** TagOverflow · .cds--tooltip-trigger element removed (inherited from Tooltip) _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-1-cyan element removed _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-2-gray element removed _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-3-green element removed _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-4-magenta element removed _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-5-purple element removed _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-6-teal element removed _(2 stories)_
- **Structure** TagOverflow · .cds--tag-overflow__item element added
- **Structure** TagOverflow · .cds--tag.cds--tag--filter.cds--tag-overflow__item--tag element added
- **Structure** TagOverflow · .cds--interactive--tag-children element added
- **Structure** TagOverflow · .cds--autoalign.cds--icon-tooltip.cds--popover--auto-align.cds--popover--bottom.cds--popover--high-contrast.cds--popover-container.cds--tag-label-tooltip.cds--tooltip element added (inherited from IconButton, Popover, Tag, Tooltip)
- **Structure** TagOverflow · .cds--tag__close-icon element added (inherited from Tag)
- **Structure** TagOverflow · .cds--tag.cds--tag--red.cds--tag-overflow__item--tag element added
- **Structure** TagOverflow · .cds--tag.cds--tag--magenta.cds--tag-overflow__item--tag element added
- **Structure** TagOverflow · .cds--autoalign.cds--definition--tooltip--tag.cds--popover--auto-align.cds--popover--bottom.cds--popover--high-contrast.cds--popover-container element added (inherited from Popover)
- **Structure** TagOverflow · .cds--definition-term element added (inherited from Popover)
- **Structure** TagOverflow · .cds--tag.cds--tag--purple.cds--tag-overflow__item--tag element added
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-7-cyan element added
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-8-gray element added
- **Structure** TagOverflow · .cds--tag-overflow__item element removed
- **Structure** TagOverflow · .cds--tag.cds--tag--filter.cds--tag-overflow__item--tag element removed
- **Structure** TagOverflow · .cds--interactive--tag-children element removed
- **Structure** TagOverflow · .cds--icon-tooltip.cds--popover--bottom.cds--popover--caret.cds--popover--high-contrast.cds--popover-container.cds--tag-label-tooltip.cds--tooltip element removed (inherited from IconButton, Popover, Tag, Tooltip)
- **Structure** TagOverflow · .cds--tag__close-icon element removed (inherited from Tag)
- **Structure** TagOverflow · .cds--popover-content.cds--tooltip-content element removed (inherited from Popover, Tooltip)
- **Structure** TagOverflow · .cds--tag.cds--tag--red.cds--tag-overflow__item--tag element removed
- **Structure** TagOverflow · .cds--tag.cds--tag--magenta.cds--tag-overflow__item--tag element removed
- **Structure** TagOverflow · .cds--definition--tooltip--tag.cds--popover--bottom.cds--popover--caret.cds--popover--high-contrast.cds--popover-container element removed (inherited from Popover)
- **Structure** TagOverflow · .cds--definition-term element removed (inherited from Popover)
- **Structure** TagOverflow · .cds--definition-tooltip.cds--popover-content element removed (inherited from DefinitionTooltip, Popover)
- **Structure** TagOverflow · .cds--tag.cds--tag--purple.cds--tag-overflow__item--tag element removed
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-7-cyan element removed
- **Structure** TagOverflow · .cds--tag-overflow__item.cds--user-avatar.cds--user-avatar--md.cds--user-avatar--order-8-gray element removed

### Tearsheet

_Components · max 4.0% pixels, 10/10 stories differ_

- **API** Tearsheet · class prefix c4p-- → cds--
- **API** Tearsheet · package @carbon/ibm-products → @carbon/react
- **Visual** Tearsheet · .cds--body--with-modal-open · background-color #f4f4f4 → #ffffff _(10 stories)_
- **Visual** Tearsheet · .cds--modal-container.cds--tearsheet__container · background-color #ffffff → #f4f4f4 _(10 stories)_
- **Visual** Tearsheet · .cds--modal-container.cds--tearsheet__container · border 1px solid #e0e0e0 → 1px solid #c6c6c6 _(10 stories)_
- **Visual** Tearsheet · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(10 stories)_
- **Visual** Tearsheet · .cds--body--with-modal-open · padding 0px → 42px _(10 stories)_
- **Visual** Tearsheet · .cds--btn.cds--menu-button__trigger · border-radius 0px → 999999px (pill) (inherited from MenuButton) _(9 stories)_
- **Visual** Tearsheet · .cds--text-input · background-color #ffffff → transparent (inherited from TextInput) _(8 stories)_
- **Visual** Tearsheet · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput) _(8 stories)_
- **Visual** Tearsheet · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput) _(8 stories)_
- **Visual** Tearsheet · .cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(8 stories)_
- **Visual** Tearsheet · .cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput) _(8 stories)_
- **Visual** Tearsheet · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px (inherited from Popover, Tooltip) _(7 stories)_
- **Visual** Tearsheet · .cds--btn.cds--modal-close · box-shadow #0f62fe 0px 0px 0px 1px inset, #f4f4f4 0px 0px 0px 2px inset → #0f62fe 0px 0px 0px 1px inset, #ffffff 0px 0px 0px 2px inset (inherited from Button) _(7 stories)_
- **Visual** Tearsheet · .cds--popover-caret · color #161616 → #ffffff (inherited from Popover, Tooltip) _(7 stories)_
- **Visual** Tearsheet · .cds--popover-caret::after · color #161616 → #ffffff (inherited from Popover, Tooltip) _(7 stories)_
- **Visual** Tearsheet · .cds--popover-caret · display block → none (inherited from Popover, Tooltip) _(7 stories)_
- **Visual** Tearsheet · .cds--popover-caret · font-size 16px → 14px (inherited from Popover, Tooltip) _(7 stories)_
- **Visual** Tearsheet · .cds--popover-caret::after · font-size 16px → 14px (inherited from Popover, Tooltip) _(7 stories)_
- **Visual** Tearsheet · .cds--popover-caret · letter-spacing normal → 0.16px (inherited from Popover, Tooltip) _(7 stories)_
- **Visual** Tearsheet · .cds--popover-caret::after · letter-spacing normal → 0.16px (inherited from Popover, Tooltip) _(7 stories)_
- **Visual** Tearsheet · .cds--popover-caret · line-height 16px → 18.0001px (inherited from Popover, Tooltip) _(7 stories)_
- **Visual** Tearsheet · .cds--popover-caret::after · line-height 16px → 18.0001px (inherited from Popover, Tooltip) _(7 stories)_
- **Visual** Tearsheet · .cds--number__rule-divider · background-color #c6c6c6 → #e0e0e0 (inherited from NumberInput) _(6 stories)_
- **Visual** Tearsheet · .cds--number__control-btn · border none → 1px solid transparent (inherited from NumberInput) _(6 stories)_
- **Visual** Tearsheet · .cds--number__control-btn · border-radius 0px → 4px (inherited from NumberInput) _(6 stories)_
- **Visual** Tearsheet · .cds--number__rule-divider · display block → none (inherited from NumberInput) _(6 stories)_
- **Visual** Tearsheet · .cds--btn · background-color #0050e6 → #0f62fe (inherited from Button) _(3 stories)_
- **Visual** Tearsheet · .cds--progress-line · background-color #c6c6c6 → #e0e0e0 (inherited from ProgressIndicator) _(2 stories)_
- **Visual** Tearsheet · .cds--layer-one.cds--modal.cds--tearsheet · background-color transparent → #000000 / 60%
- **Visual** Tearsheet · .cds--modal-header.cds--tearsheet__header.cds--tearsheet__header--with-close-icon · background-color #ffffff → transparent
- **Visual** Tearsheet · .cds--modal-header.cds--tearsheet__header.cds--tearsheet__header--with-close-icon · border-bottom 1px solid #e0e0e0 → 1px solid #c6c6c6
- **Visual** Tearsheet · .cds--tabs__nav-item.cds--tabs__nav-link · border-bottom 2px solid #c6c6c6 → 2px solid #e0e0e0 (inherited from Tabs)
- **Visual** Tearsheet · .cds--btn.cds--tearsheet__scroller-button · border-radius 0px → 999999px (pill)
- **Visual** Tearsheet · .cds--body--with-modal-open · display block → flex
- **Visual** Tearsheet · .cds--tearsheet__header-description · display inline-flex → block
- **Visual** Tearsheet · .cds--modal-header.cds--tearsheet__header.cds--tearsheet__header--with-close-icon · display block → flex
- **Visual** Tearsheet · .cds--tearsheet__header-description · margin 16px 0px 0px → 0px
- **Visual** Tearsheet · .cds--modal-header.cds--tearsheet__header.cds--tearsheet__header--with-close-icon · padding 24px 32px → 24px 32px 0px
- **Visual** Tearsheet · .cds--btn · padding 16px 63px 32px 15px → 14px 63px 14px 15px (inherited from Button)
- **Visual** Tearsheet · .cds--btn · padding 16px 15px 32px 16px → 14px 15px 14px 32px (inherited from Button)
- **Layout** Tearsheet · .cds--number__rule-divider · height 16px → 0px (-16px) (inherited from NumberInput) _(6 stories)_
- **Layout** Tearsheet · .cds--btn · height 0px → 32px (+32px) (inherited from Button) _(6 stories)_
- **Layout** Tearsheet · .cds--number__rule-divider · width 1px → 0px (-1px) (inherited from NumberInput) _(6 stories)_
- **Layout** Tearsheet · .cds--btn · width 0px → 133.22px (+133.22px) (inherited from Button) _(6 stories)_
- **Layout** Tearsheet · .cds--btn.cds--menu-button__trigger · height 0px → 32px (+32px) (inherited from Button, MenuButton) _(3 stories)_
- **Layout** Tearsheet · .cds--btn.cds--menu-button__trigger · width 0px → 192px (+192px) (inherited from Button, MenuButton) _(3 stories)_
- **Layout** Tearsheet · .cds--modal-header.cds--tearsheet__header.cds--tearsheet__header--with-close-icon · height 137px → 167.98px (+30.98px)
- **Layout** Tearsheet · .cds--modal-container.cds--tearsheet__container · height 710px → 712px (+2px)
- **Layout** Tearsheet · .cds--text-input · width 415px → 830px (+415px) (inherited from TextInput)
- **Layout** Tearsheet · .cds--text-input · width 543px → 1086px (+543px) (inherited from TextInput)
- **Structure** Tearsheet · .cds--tearsheet__header-content-wrapper element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__header-actions element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__content__header-actions element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__header-action-item element added _(10 stories)_
- **Structure** Tearsheet · .cds--modal-close-button.cds--tearsheet__close-button element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__header-content element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__header-label element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__content__title-wrapper element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__header-title element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__content__title.cds--truncated-text element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__body element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__main-content element added _(10 stories)_
- **Structure** Tearsheet · .cds--tearsheet__footer element added _(10 stories)_
- **Structure** Tearsheet · .cds--modal-header.cds--tearsheet__header.cds--tearsheet__header--with-close-icon element added _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__header-description element added _(9 stories)_
- **Structure** Tearsheet · .cds--btn-set.cds--btn-set--fluid.cds--tearsheet__footer-button-set element added _(9 stories)_
- **Structure** Tearsheet · .cds--btn-set__fluid-inner.cds--btn-set__fluid-inner--auto-stack element added (inherited from Button) _(9 stories)_
- **Structure** Tearsheet · .cds--modal-header.cds--tearsheet__next__header.cds--tearsheet__next__header--with-close-icon element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__header-content-wrapper element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__header-actions element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__content__header-actions element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__header-action-item element removed _(9 stories)_
- **Structure** Tearsheet · .cds--modal-close-button.cds--tearsheet__next__close-button element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__header-content element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__header-label element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__content__title-wrapper element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__header-title element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__content__title.cds--truncated-text element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__header-description element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__body element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__main-content element removed _(9 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__footer.cds--tearsheet__next__footer--three-actions element removed _(8 stories)_
- **Structure** Tearsheet · .cds--layout element added _(7 stories)_
- **Structure** Tearsheet · .cds--layer-one.cds--modal.cds--tearsheet.cds--tearsheet--wide element added _(7 stories)_
- **Structure** Tearsheet · .cds--tearsheet__header-actions-menuButton element added _(7 stories)_
- **Structure** Tearsheet · .cds--layer-one.cds--modal.cds--tearsheet__next.cds--tearsheet__next--wide element removed _(7 stories)_
- **Structure** Tearsheet · .cds--btn.cds--btn--2xl.cds--btn--ghost.cds--layout--size-2xl element added (inherited from Button) _(6 stories)_
- **Structure** Tearsheet · .cds--btn.cds--btn--2xl.cds--btn--primary.cds--layout--size-2xl element added (inherited from Button) _(6 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__header-actions-menuButton element removed _(6 stories)_
- **Structure** Tearsheet · .cds--action-set.cds--action-set--2xl.cds--action-set--row-triple.cds--btn-set element removed (inherited from Button) _(6 stories)_
- **Structure** Tearsheet · .cds--action-set__action-button.cds--action-set__action-button--expressive.cds--action-set__action-button--ghost.cds--btn.cds--btn--2xl.cds--btn--expressive.cds--btn--ghost.cds--layout--size-2xl element removed (inherited from Button) _(6 stories)_
- **Structure** Tearsheet · .cds--action-set__action-button.cds--action-set__action-button--expressive.cds--btn.cds--btn--2xl.cds--btn--expressive.cds--btn--primary.cds--layout--size-2xl element removed (inherited from Button) _(6 stories)_
- **Structure** Tearsheet · .cds--tearsheet__summary-content element added _(4 stories)_
- **Structure** Tearsheet · .cds--btn.cds--btn--2xl.cds--btn--secondary.cds--layout--size-2xl element added (inherited from Button) _(4 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__summary-content element removed _(4 stories)_
- **Structure** Tearsheet · .cds--action-set__action-button.cds--action-set__action-button--expressive.cds--btn.cds--btn--2xl.cds--btn--expressive.cds--btn--secondary.cds--layout--size-2xl element removed (inherited from Button) _(4 stories)_
- **Structure** Tearsheet · .cds--tearsheet__header-actions-menuButton.cds--tearsheet__header-actions-menuButton--hidden element added _(3 stories)_
- **Structure** Tearsheet · .cds--tearsheet__title-start element added _(2 stories)_
- **Structure** Tearsheet · .cds--layer-one.cds--modal.cds--tearsheet.cds--tearsheet--narrow element added _(2 stories)_
- **Structure** Tearsheet · .cds--btn.cds--btn--ghost.cds--btn--xl.cds--layout--size-xl element added (inherited from Button) _(2 stories)_
- **Structure** Tearsheet · .cds--btn.cds--btn--secondary.cds--btn--xl.cds--layout--size-xl element added (inherited from Button) _(2 stories)_
- **Structure** Tearsheet · .cds--btn.cds--btn--primary.cds--btn--xl.cds--layout--size-xl element added (inherited from Button) _(2 stories)_
- **Structure** Tearsheet · .cds--layer-one.cds--modal-content.cds--tearsheet__body-layout.cds--tearsheet__body-layout--has-influencer element added _(2 stories)_
- **Structure** Tearsheet · .cds--tearsheet__influencer element added _(2 stories)_
- **Structure** Tearsheet · .cds--btn.cds--btn--2xl.cds--btn--disabled.cds--btn--secondary.cds--layout--size-2xl element added (inherited from Button) _(2 stories)_
- **Structure** Tearsheet · .cds--tearsheet__next__title-start element removed _(2 stories)_
- **Structure** Tearsheet · .cds--layer-one.cds--modal.cds--tearsheet__next.cds--tearsheet__next--narrow element removed _(2 stories)_
- **Structure** Tearsheet · .cds--action-set.cds--action-set--lg.cds--action-set--row-triple.cds--btn-set element removed (inherited from Button) _(2 stories)_
- **Structure** Tearsheet · .cds--action-set__action-button.cds--action-set__action-button--expressive.cds--action-set__action-button--ghost.cds--btn.cds--btn--expressive.cds--btn--ghost.cds--btn--xl.cds--layout--size-xl element removed (inherited from Button) _(2 stories)_
- **Structure** Tearsheet · .cds--action-set__action-button.cds--action-set__action-button--expressive.cds--btn.cds--btn--expressive.cds--btn--secondary.cds--btn--xl.cds--layout--size-xl element removed (inherited from Button) _(2 stories)_
- **Structure** Tearsheet · .cds--action-set__action-button.cds--action-set__action-button--expressive.cds--btn.cds--btn--expressive.cds--btn--primary.cds--btn--xl.cds--layout--size-xl element removed (inherited from Button) _(2 stories)_
- **Structure** Tearsheet · .cds--action-set__action-button.cds--action-set__action-button--expressive.cds--btn.cds--btn--2xl.cds--btn--disabled.cds--btn--expressive.cds--btn--secondary.cds--layout--size-2xl element removed (inherited from Button) _(2 stories)_
- **Structure** Tearsheet · .cds--btn.cds--btn--sm.cds--btn--tertiary.cds--layout--size-sm element added (inherited from Button)
- **Structure** Tearsheet · .cds--menu-button__container element added (inherited from MenuButton)
- **Structure** Tearsheet · .cds--btn.cds--btn--sm.cds--btn--tertiary.cds--layout--size-sm.cds--menu-button__trigger element added (inherited from Button, MenuButton)
- **Structure** Tearsheet · .cds--btn__icon element added (inherited from Button)
- **Structure** Tearsheet · .cds--autoalign.cds--icon-tooltip.cds--popover--auto-align.cds--popover--high-contrast.cds--popover--left.cds--popover-container.cds--tooltip element added (inherited from IconButton, Popover, Tooltip)
- **Structure** Tearsheet · .cds--tooltip-trigger__wrapper element added (inherited from Tooltip)
- **Structure** Tearsheet · .cds--btn.cds--btn--icon-only.cds--btn--primary.cds--modal-close element added (inherited from Button)
- **Structure** Tearsheet · .cds--modal-close__icon element added (inherited from Button)
- **Structure** Tearsheet · .cds--popover element added (inherited from Popover)
- **Structure** Tearsheet · .cds--truncated-text__text-content element added (inherited from TruncatedText)
- **Structure** Tearsheet · .cds--truncated-text__expand-toggle element added (inherited from TruncatedText)
- **Structure** Tearsheet · .cds--progress.cds--progress--vertical element added (inherited from ProgressIndicator)
- **Structure** Tearsheet · .cds--progress-step.cds--progress-step--current element added (inherited from ProgressIndicator)
- **Structure** Tearsheet · .cds--progress-step-button.cds--progress-step-button--unclickable element added (inherited from ProgressIndicator)
- **Structure** Tearsheet · .cds--progress-text element added (inherited from ProgressIndicator)
- **Structure** Tearsheet · .cds--progress-label element added (inherited from ProgressIndicator)
- **Structure** Tearsheet · .cds--progress-optional element added (inherited from ProgressIndicator)
- **Structure** Tearsheet · .cds--progress-line element added (inherited from ProgressIndicator)
- **Structure** Tearsheet · .cds--progress-step.cds--progress-step--incomplete element added (inherited from ProgressIndicator)
- **Structure** Tearsheet · .cds--form element added
- **Structure** Tearsheet · .cds--fieldset element added
- **Structure** Tearsheet · .cds--label element added (inherited from FormLabel)
- **Structure** Tearsheet · .cds--form-item.cds--text-input-wrapper element added (inherited from TextInput)
- **Structure** Tearsheet · .cds--text-input__label-wrapper element added (inherited from TextInput)
- **Structure** Tearsheet · .cds--text-input__field-outer-wrapper element added (inherited from TextInput)
- **Structure** Tearsheet · .cds--text-input__field-wrapper element added (inherited from TextInput)
- **Structure** Tearsheet · .cds--text-input element added (inherited from TextInput)
- **Structure** Tearsheet · .cds--text-input__counter-alert element added (inherited from TextInput)
- **Structure** Tearsheet · .cds--form-item element added
- **Structure** Tearsheet · .cds--number.cds--number--helpertext.cds--number--md element added (inherited from NumberInput)
- **Structure** Tearsheet · .cds--number__input-wrapper element added (inherited from NumberInput)
- **Structure** Tearsheet · .cds--number__controls element added (inherited from NumberInput)
- **Structure** Tearsheet · .cds--number__control-btn element added (inherited from NumberInput)
- **Structure** Tearsheet · .cds--tearsheet__navigation-bar element added
- **Structure** Tearsheet · .cds--tearsheet__scroller-container element added
- **Structure** Tearsheet · .cds--tearsheet__scroller-button-icon element added
- **Structure** Tearsheet · .cds--tearsheet__next__footer element removed
- **Structure** Tearsheet · .cds--layer-one.cds--modal.cds--tearsheet.cds--tearsheet--wide element removed
- **Structure** Tearsheet · .cds--layer-two.cds--tearsheet__header-content element removed
- **Structure** Tearsheet · .cds--tearsheet__header-fields element removed
- **Structure** Tearsheet · .cds--modal-header__heading.cds--tearsheet__heading element removed
- **Structure** Tearsheet · .cds--modal-content.cds--tearsheet__body element removed
- **Structure** Tearsheet · .cds--tearsheet__influencer element removed
- **Structure** Tearsheet · .cds--tearsheet__right element removed
- **Structure** Tearsheet · .cds--tearsheet__main element removed
- **Structure** Tearsheet · .cds--tearsheet__content element removed
- **Structure** Tearsheet · .cds--form element removed
- **Structure** Tearsheet · .cds--fieldset element removed
- **Structure** Tearsheet · .cds--label element removed (inherited from FormLabel)
- **Structure** Tearsheet · .cds--form-item.cds--text-input-wrapper element removed (inherited from TextInput)
- **Structure** Tearsheet · .cds--text-input__label-wrapper element removed (inherited from TextInput)
- **Structure** Tearsheet · .cds--text-input__field-outer-wrapper element removed (inherited from TextInput)
- **Structure** Tearsheet · .cds--text-input__field-wrapper element removed (inherited from TextInput)
- **Structure** Tearsheet · .cds--text-input element removed (inherited from TextInput)
- **Structure** Tearsheet · .cds--text-input__counter-alert element removed (inherited from TextInput)
- **Structure** Tearsheet · .cds--tearsheet__button-container element removed
- **Structure** Tearsheet · .cds--action-set.cds--action-set--2xl.cds--action-set--row-triple.cds--btn-set.cds--tearsheet__buttons element removed
- **Structure** Tearsheet · .cds--layer-one.cds--modal-content.cds--tearsheet__next__body-layout.cds--tearsheet__next__body-layout--has-influencer element removed
- **Structure** Tearsheet · .cds--tearsheet__next__influencer element removed
- **Structure** Tearsheet · .cds--tearsheet__next__navigation-bar element removed
- **Structure** Tearsheet · .cds--tearsheet__next__scroller-container element removed
- **Structure** Tearsheet · .cds--tearsheet__next__scroller-button-icon element removed

### UserAvatar

_Components · max 53.9% pixels, 2/2 stories differ_

- **API** UserAvatar · class prefix c4p-- → cds--
- **API** UserAvatar · package @carbon/ibm-products → @carbon/react
- **Structure** UserAvatar · .cds--layout element added _(2 stories)_
- **Structure** UserAvatar · .cds--user-avatar__tooltip-trigger element added _(2 stories)_
- **Structure** UserAvatar · .cds--tooltip-trigger element removed (inherited from Tooltip) _(2 stories)_

### Create flows

_Examples · max 24.4% pixels, 11/14 stories differ_

- **API** Create flows · class prefix c4p-- → cds--
- **API** Create flows · package @carbon/ibm-products → @carbon/react
- **Visual** Create flows · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(9 stories)_
- **Visual** Create flows · .cds--progress-line · background-color #c6c6c6 → #e0e0e0 (inherited from ProgressIndicator) _(5 stories)_
- **Visual** Create flows · .cds--text-input · background-color #ffffff → transparent (inherited from TextInput) _(5 stories)_
- **Visual** Create flows · .cds--btn-set · background-color #ffffff → transparent (inherited from Button) _(5 stories)_
- **Visual** Create flows · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) (inherited from TextInput) _(5 stories)_
- **Visual** Create flows · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent (inherited from TextInput) _(5 stories)_
- **Visual** Create flows · .cds--text-input · border-radius 0px → 4px (inherited from TextInput) _(5 stories)_
- **Visual** Create flows · .cds--text-input · border-top/right/left none → 1px solid transparent (inherited from TextInput) _(5 stories)_
- **Visual** Create flows · .cds--toggle__label-text.cds--visually-hidden · margin -1px -1px 16px → -1px _(4 stories)_
- **Visual** Create flows · .cds--header · background-color #f4f4f4 → #ffffff (inherited from UI Shell) _(3 stories)_
- **Visual** Create flows · .cds--header · border-bottom 1px solid #c6c6c6 → 1px solid #e0e0e0 (inherited from UI Shell) _(3 stories)_
- **Visual** Create flows · .cds--page-header__breadcrumb-bar.cds--page-header__breadcrumb-bar-border · background-color #ffffff → #f4f4f4 (inherited from PageHeader) _(2 stories)_
- **Visual** Create flows · .cds--page-header__content · background-color #ffffff → #f4f4f4 (inherited from PageHeader) _(2 stories)_
- **Visual** Create flows · .cds--page-header.cds--page-header__next · background-color #ffffff → #f4f4f4 (inherited from PageHeader) _(2 stories)_
- **Visual** Create flows · .cds--page-header.cds--page-header__next::before · background-color #ffffff → #f4f4f4 (inherited from PageHeader) _(2 stories)_
- **Visual** Create flows · .cds--page-header__breadcrumb-bar.cds--page-header__breadcrumb-bar-border · border-bottom 1px solid #e0e0e0 → 1px solid #c6c6c6 (inherited from PageHeader) _(2 stories)_
- **Visual** Create flows · .cds--page-header.cds--page-header__next · border-bottom 1px solid #e0e0e0 → 1px solid #c6c6c6 (inherited from PageHeader) _(2 stories)_
- **Visual** Create flows · .cds--truncated-text__text-content · display flow-root → inline _(2 stories)_
- **Visual** Create flows · .cds--truncated-text__text-content · line-height normal → 36.0002px _(2 stories)_
- **Visual** Create flows · .cds--side-nav.cds--side-nav__navigation · background-color #f4f4f4 → #ffffff (inherited from UI Shell)
- **Visual** Create flows · .cds--number__rule-divider · background-color #c6c6c6 → #e0e0e0 (inherited from NumberInput)
- **Visual** Create flows · .cds--number__control-btn · border none → 1px solid transparent (inherited from NumberInput)
- **Visual** Create flows · .cds--number__control-btn · border-radius 0px → 4px (inherited from NumberInput)
- **Visual** Create flows · .cds--number__rule-divider · display block → none (inherited from NumberInput)
- **Layout** Create flows · .cds--number__rule-divider · height 16px → 0px (-16px) (inherited from NumberInput)
- **Layout** Create flows · .cds--number__rule-divider · width 1px → 0px (-1px) (inherited from NumberInput)
- **Structure** Create flows · .cds--layout element added _(9 stories)_
- **Structure** Create flows · .cds--btn-set__fluid-inner.cds--btn-set__fluid-inner--auto-stack element added (inherited from Button) _(5 stories)_
- **Structure** Create flows · .cds--btn.cds--btn--2xl.cds--btn--ghost.cds--layout--size-2xl element added (inherited from Button) _(5 stories)_
- **Structure** Create flows · .cds--btn.cds--btn--2xl.cds--btn--disabled.cds--btn--secondary.cds--layout--size-2xl element added (inherited from Button) _(5 stories)_
- **Structure** Create flows · .cds--btn.cds--btn--2xl.cds--btn--disabled.cds--btn--primary.cds--layout--size-2xl element added (inherited from Button) _(5 stories)_
- **Structure** Create flows · .cds--btn.cds--btn--2xl.cds--btn--expressive.cds--btn--ghost.cds--layout--size-2xl element removed (inherited from Button) _(5 stories)_
- **Structure** Create flows · .cds--btn.cds--btn--2xl.cds--btn--disabled.cds--btn--expressive.cds--btn--secondary.cds--layout--size-2xl element removed (inherited from Button) _(5 stories)_
- **Structure** Create flows · .cds--btn.cds--btn--2xl.cds--btn--disabled.cds--btn--expressive.cds--btn--primary.cds--layout--size-2xl element removed (inherited from Button) _(5 stories)_

### Delete and remove

_Examples · max 13.1% pixels, 5/5 stories differ_

- **API** Delete and remove · package @carbon/ibm-products → @carbon/react
- **Visual** Delete and remove · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(5 stories)_
- **Structure** Delete and remove · .cds--layout element added _(5 stories)_

### ExportModal

_Examples · max 15.8% pixels, 3/3 stories differ_

- **API** ExportModal · package @carbon/ibm-products → @carbon/react
- **Visual** ExportModal · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(3 stories)_
- **Structure** ExportModal · .cds--layout element added _(3 stories)_

### Generate an API Key

_Examples · max 16.4% pixels, 7/7 stories differ_

- **API** Generate an API Key · package @carbon/ibm-products → @carbon/react
- **Visual** Generate an API Key · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(7 stories)_
- **Structure** Generate an API Key · .cds--layout element added _(7 stories)_

### Import and upload

_Examples_

- **API** Import and upload · package @carbon/ibm-products → @carbon/react
- **Story** Import and upload · story added: Import and Upload (no IBM Products equivalent)

### Onboarding

_Preview · max 59.9% pixels, 2/2 stories differ_

- **API** Onboarding · class prefix c4p-- → cds--
- **API** Onboarding · package @carbon/ibm-products → @carbon/react
- **Visual** Onboarding · .cds--guidebanner.cds--guidebanner__collapsible · background-image linear-gradient(90deg, #001d6c, #6929c4) → linear-gradient(90deg, #001d6c 0%, #6929c4 100%) _(2 stories)_
- **Visual** Onboarding · .cds--btn · border-radius 0px → 999999px (pill) (inherited from Button) _(2 stories)_
- **Visual** Onboarding · .cds--btn.cds--guidebanner__toggle-button · border-radius 0px → 999999px (pill) _(2 stories)_
- **Visual** Onboarding · .cds--btn.cds--guidebanner__element-button · border-radius 0px → 999999px (pill) _(2 stories)_
- **Visual** Onboarding · .cds--guidebanner__navigation · border-top none → 1px solid #8a3ffc
- **Visual** Onboarding · .cds--guidebanner__back-button.cds--guidebanner__back-button--disabled · display none → block
- **Visual** Onboarding · .cds--guidebanner__next-button · display none → block
- **Visual** Onboarding · .cds--guidebanner__back-button.cds--guidebanner__back-button--disabled · margin 0px 0px 0px auto → 0px 0px 0px 1072.17px
- **Visual** Onboarding · .cds--guidebanner__element · margin 0px → 16px 0px 0px
- **Visual** Onboarding · .cds--guidebanner__element · padding 0px 0px 0px 52px → 0px 52px
- **Layout** Onboarding · .cds--guidebanner.cds--guidebanner__collapsible · height 320.91px → 280.94px (-39.97px)
- **Layout** Onboarding · .cds--btn · height 0px → 40px (+40px) (inherited from Button)
- **Layout** Onboarding · .cds--guidebanner__navigation · height 40px → 41px (+1px)
- **Layout** Onboarding · .cds--guidebanner.cds--guidebanner__collapsible · height 102px → 320.91px (+218.91px)
- **Layout** Onboarding · .cds--btn · width 0px → 40px (+40px) (inherited from Button)
- **Layout** Onboarding · .cds--btn.cds--guidebanner__toggle-button · width 101.59px → 93.83px (-7.76px)
- **Structure** Onboarding · .cds--layout element added _(2 stories)_
- **Structure** Onboarding · .cds--guidebanner__carousel-elements-container element added _(2 stories)_
- **Structure** Onboarding · .cds--guidebanner__carousel-elements element added _(2 stories)_
- **Structure** Onboarding · .cds--guidebanner__item element added _(2 stories)_
- **Structure** Onboarding · .cds--guidebanner__carousel-elements-container--scrolled element added _(2 stories)_
- **Structure** Onboarding · .cds--guidebanner__carousel-elements-container--scroll-max element added _(2 stories)_
- **Structure** Onboarding · .cds--carousel__elements-container element removed _(2 stories)_
- **Structure** Onboarding · .cds--carousel__elements element removed _(2 stories)_
- **Structure** Onboarding · .cds--carousel__item element removed _(2 stories)_
- **Structure** Onboarding · .cds--carousel__elements-container--scrolled element removed _(2 stories)_
- **Structure** Onboarding · .cds--carousel__elements-container--scroll-max element removed _(2 stories)_
- **Structure** Onboarding · .cds--btn.cds--btn--ghost.cds--btn--md.cds--guidebanner__element-button.cds--layout--size-md element removed
- **Structure** Onboarding · .cds--guidebanner__element element removed
- **Structure** Onboarding · .cds--guidebanner__element-title element removed
- **Structure** Onboarding · .cds--guidebanner__element-content element removed
- **Structure** Onboarding · .cds--guidebanner__element-buttons element removed
- **Structure** Onboarding · .cds--guidebanner__element-link.cds--link.cds--link--md element removed
- **Structure** Onboarding · .cds--guidebanner__back-button.cds--guidebanner__back-button--disabled element removed
- **Structure** Onboarding · .cds--icon-tooltip.cds--icon-tooltip--disabled.cds--popover--caret.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element removed (inherited from IconButton, Popover, Tooltip)
- **Structure** Onboarding · .cds--tooltip-trigger__wrapper element removed (inherited from Tooltip)
- **Structure** Onboarding · .cds--btn.cds--btn--disabled.cds--btn--ghost.cds--btn--icon-only.cds--btn--md.cds--layout--size-md element removed (inherited from Button)
- **Structure** Onboarding · .cds--popover element removed (inherited from Popover)
- **Structure** Onboarding · .cds--guidebanner__next-button element removed
- **Structure** Onboarding · .cds--icon-tooltip.cds--popover--caret.cds--popover--high-contrast.cds--popover--top-end.cds--popover-container.cds--tooltip element removed (inherited from IconButton, Popover, Tooltip)
- **Structure** Onboarding · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--btn--md.cds--layout--size-md element removed (inherited from Button)
- **Story** Onboarding · story added: Default (no IBM Products equivalent)

### preview__BigNumber

_Preview_

- **API** preview__BigNumber · package @carbon/ibm-products → @carbon/react
- **Story** preview__BigNumber · story added: Default (no IBM Products equivalent)

### Resizer

_Utilities_

- **API** Resizer · package @carbon/ibm-products → @carbon/react
- **Story** Resizer · story added: Four panels (no IBM Products equivalent)
- **Story** Resizer · story added: Single panel (bounded) (no IBM Products equivalent)
- **Story** Resizer · story added: Single panel (no boundaries) (no IBM Products equivalent)
- **Story** Resizer · story added: Single panel (overlay) (no IBM Products equivalent)
- **Story** Resizer · story added: Two panels (horizontal) (no IBM Products equivalent)
- **Story** Resizer · story added: Two panels (vertical) (no IBM Products equivalent)
- **Story** Resizer · story added: Two panels vertical (grid) (no IBM Products equivalent)
- **Story** Resizer · story added: With custom handles (no IBM Products equivalent)

### ScrollGradient

_Utilities_

- **API** ScrollGradient · package @carbon/ibm-products → @carbon/react
- **Story** ScrollGradient · story added: Default (vertical) (no IBM Products equivalent)
- **Story** ScrollGradient · story added: With x and y axis (no IBM Products equivalent)

### TruncatedText

_Utilities · max 6.2% pixels, 2/2 stories differ_

- **API** TruncatedText · class prefix c4p-- → cds--
- **API** TruncatedText · package @carbon/ibm-products → @carbon/react
- **Visual** TruncatedText · .cds--truncated-text__text-content · font-size 14px → 16px _(2 stories)_
- **Visual** TruncatedText · .cds--truncated-text · font-size 14px → 16px _(2 stories)_
- **Visual** TruncatedText · .cds--truncated-text · letter-spacing 0.16px → normal _(2 stories)_
- **Visual** TruncatedText · .cds--truncated-text · line-height 20px → 16px _(2 stories)_
- **Visual** TruncatedText · .cds--truncated-text__expand-toggle · font-size 14px → 16px
- **Visual** TruncatedText · .cds--truncated-text__tooltip-trigger · font-size 14px → 16px
- **Visual** TruncatedText · .cds--tooltip-trigger__wrapper · font-size 14px → 16px (inherited from Tooltip)
- **Visual** TruncatedText · .cds--popover · font-size 14px → 16px (inherited from Popover)
- **Visual** TruncatedText · .cds--autoalign.cds--popover-container.cds--tooltip · font-size 14px → 16px (inherited from Tooltip)
- **Visual** TruncatedText · .cds--truncated-text__text-content · letter-spacing 0.16px → normal
- **Visual** TruncatedText · .cds--truncated-text__expand-toggle · letter-spacing 0.16px → normal
- **Visual** TruncatedText · .cds--tooltip-trigger__wrapper · letter-spacing 0.16px → normal (inherited from Tooltip)
- **Visual** TruncatedText · .cds--popover · letter-spacing 0.16px → normal (inherited from Popover)
- **Visual** TruncatedText · .cds--autoalign.cds--popover-container.cds--tooltip · letter-spacing 0.16px → normal (inherited from Tooltip)
- **Visual** TruncatedText · .cds--truncated-text__expand-toggle · line-height 20px → 16px
- **Visual** TruncatedText · .cds--truncated-text__tooltip-trigger · line-height 20px → 16px
- **Visual** TruncatedText · .cds--tooltip-trigger__wrapper · line-height 20px → 16px (inherited from Tooltip)
- **Visual** TruncatedText · .cds--popover · line-height 20px → 16px (inherited from Popover)
- **Visual** TruncatedText · .cds--autoalign.cds--popover-container.cds--tooltip · line-height 20px → 16px (inherited from Tooltip)
- **Structure** TruncatedText · .cds--layout element added _(2 stories)_

## New (1)

### Motion

_Elements_

> July 22, 2026: Initial motion API has been added to @carbon/motion and @carbon/react packages. Stories along with documentation in the Overview page can be viewed in the Elements/Motion section of Storybook. The initial work covers definition of "surfaces" which are different motion animations we want to standardize (currently examples!) and new React wrapper components that implement the Motion library under the hood. There is an option to also utilize native CSS for the "reveal" surfaces.

- **Story** Motion · story added: 🚀 Custom Surface With Motion
- **Story** Motion · story added: 🚀 Custom Surface With Native CSS
- **Story** Motion · story added: 🚀 Expand
- **Story** Motion · story added: 🚀 Button To Dialog
- **Story** Motion · story added: 🚀 Tile To Dialog

## Removed (4)

### ModalWrapper

_Deprecated_

- **Story** ModalWrapper · story removed: Default

### preview__PageHeader

_Deprecated_

- **Story** preview__PageHeader · story removed: Default

### preview__StaticNotification

_Deprecated_

- **Story** preview__StaticNotification · story removed: Default

### preview_Pagination

_Deprecated_

- **Story** preview_Pagination · story removed: with a page selector
- **Story** preview_Pagination · story removed: with no sizer, child input, or child selector
- **Story** preview_Pagination · story removed: Playground

## Unchanged (31)

### Accordion

_Components · max 0.0% pixels, 0/4 stories differ_


### AILabel

_Components · max 0.0% pixels, 0/3 stories differ_


### AspectRatio

_Components · max 0.0% pixels, 0/1 stories differ_


### Checkbox

_Components · max 0.0% pixels, 0/5 stories differ_


### ClassPrefix

_Components · max 0.0% pixels, 0/1 stories differ_


### CodeSnippet

_Components · max 0.0% pixels, 0/7 stories differ_


### ContentSwitcher

_Components · max 0.0% pixels, 0/6 stories differ_


### DefinitionTooltip

_Components · max 0.0% pixels, 0/2 stories differ_


### Heading

_Components · max 0.0% pixels, 0/2 stories differ_


### IdPrefix

_Components · max 0.0% pixels, 0/1 stories differ_


### InlineLoading

_Components · max 0.0% pixels, 0/2 stories differ_


### Layer

_Components · max 0.0% pixels, 0/4 stories differ_


### Link

_Components · max 0.0% pixels, 0/3 stories differ_


### OrderedList

_Components · max 0.0% pixels, 0/3 stories differ_


### PaginationNav

_Components · max 0.0% pixels, 0/1 stories differ_


### ProgressIndicator

_Components · max 0.0% pixels, 0/3 stories differ_


### RadioButton

_Components · max 0.0% pixels, 0/4 stories differ_


### Skeleton

_Components · max 0.0% pixels, 0/6 stories differ_


### TextArea

_Components · max 0.0% pixels, 0/4 stories differ_


### Theme

_Components · max 0.0% pixels, 0/4 stories differ_


### UnorderedList

_Components · max 0.0% pixels, 0/2 stories differ_


### FlexGrid

_Elements · max 0.0% pixels, 0/11 stories differ_


### Grid

_Elements · max 0.0% pixels, 0/12 stories differ_


### IBM Plex

_Elements · max 0.0% pixels, 0/8 stories differ_


### Icons

_Elements · max 0.0% pixels, 0/2 stories differ_

- **Flag** Icons · feature flag enable-v12-structured-list-visible-icons: off in V11 → on by default in V12
- **Flag** Icons · feature flag enable-v12-tile-default-icons: off in V11 → on by default in V12
- **Flag** Icons · feature flag enable-v12-tile-radio-icons: off in V11 → on by default in V12

### HideAtBreakpoint

_Helpers · max 0.0% pixels, 0/1 stories differ_


### useContextMenu

_Hooks · max 0.0% pixels, 0/2 stories differ_


### Stack

_Layout · max 0.0% pixels, 0/2 stories differ_


### preview__ChatButton

_Preview · max 0.0% pixels, 0/2 stories differ_


### StatusIndicators

_Preview · max 0.0% pixels, 0/4 stories differ_


### OverflowHandler

_Utilities · max 0.0% pixels, 0/1 stories differ_

