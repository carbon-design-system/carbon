/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXMultiSelect from 'carbon-web-components/es/components-react/multi-select/multi-select';
// @ts-ignore
import BXMultiSelectItem from 'carbon-web-components/es/components-react/multi-select/multi-select-item';
import { Default as baseDefault, Filterable as filterableStory } from './multi-select-story';

export { default } from './multi-select-story';

export const Default = args => {
  const {
    clearSelectionLabel,
    colorScheme,
    disabled,
    helperText,
    invalid,
    labelText,
    light,
    open,
    size,
    toggleLabelClosed,
    toggleLabelOpen,
    triggerContent,
    type,
    validityMessage,
    disableSelection,
    disableToggle,
    onBeforeSelect,
    onBeforeToggle,
    onSelect,
    onToggle,
  } = args?.['bx-multi-select'];
  const handleBeforeSelect = (event: CustomEvent) => {
    if (onBeforeSelect) {
      onBeforeSelect(event);
    }
    if (disableSelection) {
      event.preventDefault();
    }
  };
  const handleBeforeToggle = (event: CustomEvent) => {
    if (onBeforeToggle) {
      onBeforeToggle(event);
    }
    if (disableToggle) {
      event.preventDefault();
    }
  };
  return (
    <BXMultiSelect
      colorScheme={colorScheme}
      disabled={disabled}
      invalid={invalid}
      light={light}
      open={open}
      clearSelectionLabel={clearSelectionLabel}
      helperText={helperText}
      labelText={labelText}
      size={size}
      toggleLabelClosed={toggleLabelClosed}
      toggleLabelOpen={toggleLabelOpen}
      triggerContent={triggerContent}
      type={type}
      validityMessage={validityMessage}
      onBeforeSelect={handleBeforeSelect}
      onBeforeToggle={handleBeforeToggle}
      onSelect={onSelect}
      onToggle={onToggle}>
      <BXMultiSelectItem value="all">Option 1</BXMultiSelectItem>
      <BXMultiSelectItem value="cloudFoundry">Option 2</BXMultiSelectItem>
      <BXMultiSelectItem value="staging">Option 3</BXMultiSelectItem>
      <BXMultiSelectItem value="dea">Option 4</BXMultiSelectItem>
      <BXMultiSelectItem value="router">Option 5</BXMultiSelectItem>
    </BXMultiSelect>
  );
};

Object.assign(Default, baseDefault);

export const Filterable = args => {
  const {
    clearSelectionLabel,
    colorScheme,
    disabled,
    helperText,
    invalid,
    labelText,
    light,
    open,
    size,
    toggleLabelClosed,
    toggleLabelOpen,
    triggerContent,
    type,
    validityMessage,
    disableSelection,
    disableToggle,
    onBeforeSelect,
    onBeforeToggle,
    onSelect,
    onToggle,
  } = args?.['bx-multi-select'];
  const handleBeforeSelect = (event: CustomEvent) => {
    if (onBeforeSelect) {
      onBeforeSelect(event);
    }
    if (disableSelection) {
      event.preventDefault();
    }
  };
  const handleBeforeToggle = (event: CustomEvent) => {
    if (onBeforeToggle) {
      onBeforeToggle(event);
    }
    if (disableToggle) {
      event.preventDefault();
    }
  };
  return (
    <BXMultiSelect
      filterable={true}
      colorScheme={colorScheme}
      disabled={disabled}
      invalid={invalid}
      light={light}
      open={open}
      clearSelectionLabel={clearSelectionLabel}
      helperText={helperText}
      labelText={labelText}
      size={size}
      toggleLabelClosed={toggleLabelClosed}
      toggleLabelOpen={toggleLabelOpen}
      triggerContent={triggerContent}
      type={type}
      validityMessage={validityMessage}
      onBeforeSelect={handleBeforeSelect}
      onBeforeToggle={handleBeforeToggle}
      onSelect={onSelect}
      onToggle={onToggle}>
      <BXMultiSelectItem value="example">
        An example option that is really long to show what should be done to handle long text
      </BXMultiSelectItem>
      <BXMultiSelectItem value="all">Option 1</BXMultiSelectItem>
      <BXMultiSelectItem value="cloudFoundry">Option 2</BXMultiSelectItem>
      <BXMultiSelectItem value="staging">Option 3</BXMultiSelectItem>
      <BXMultiSelectItem value="dea">Option 4</BXMultiSelectItem>
      <BXMultiSelectItem value="router">Option 5</BXMultiSelectItem>
    </BXMultiSelect>
  );
};

Object.assign(Filterable, filterableStory);
