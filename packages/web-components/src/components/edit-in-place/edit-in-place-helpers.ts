/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { EDIT_IN_PLACE_SIZE, TOOLTIP_ALIGNMENT } from './defs';

export const blockClass = prefix + '--edit-in-place';
export const storyClass = 'edit-in-place-example';

export const sizes = {
  [`Small (${EDIT_IN_PLACE_SIZE.SMALL})`]: EDIT_IN_PLACE_SIZE.SMALL,
  [`Medium (${EDIT_IN_PLACE_SIZE.MEDIUM})`]: EDIT_IN_PLACE_SIZE.MEDIUM,
  [`Large (${EDIT_IN_PLACE_SIZE.LARGE})`]: EDIT_IN_PLACE_SIZE.LARGE,
};

export const tooltipAlignments = {
  [`Top (${TOOLTIP_ALIGNMENT.TOP})`]: TOOLTIP_ALIGNMENT.TOP,
  [`Top left (${TOOLTIP_ALIGNMENT.TOP_LEFT})`]: TOOLTIP_ALIGNMENT.TOP_LEFT,
  [`Top right (${TOOLTIP_ALIGNMENT.TOP_RIGHT})`]: TOOLTIP_ALIGNMENT.TOP_RIGHT,
  [`Bottom (${TOOLTIP_ALIGNMENT.BOTTOM})`]: TOOLTIP_ALIGNMENT.BOTTOM,
  [`Bottom left (${TOOLTIP_ALIGNMENT.BOTTOM_LEFT})`]:
    TOOLTIP_ALIGNMENT.BOTTOM_LEFT,
  [`Bottom right (${TOOLTIP_ALIGNMENT.BOTTOM_RIGHT})`]:
    TOOLTIP_ALIGNMENT.BOTTOM_RIGHT,
  [`Left (${TOOLTIP_ALIGNMENT.LEFT})`]: TOOLTIP_ALIGNMENT.LEFT,
  [`Right (${TOOLTIP_ALIGNMENT.RIGHT})`]: TOOLTIP_ALIGNMENT.RIGHT,
};

export const defaultArgs = {
  cancelLabel: 'Cancel',
  containerWidth: 300,
  editAlwaysVisible: false,
  editLabel: 'Edit',
  id: 'story-id',
  inheritTypography: false,
  invalid: false,
  invalidText: 'This field is required',
  labelText: 'Label text',
  placeholder: 'placeholder text',
  readOnly: false,
  readOnlyLabel: 'Edit off',
  readOnlyToggleTipText: 'This field is read-only and cannot be edited',
  saveLabel: 'Save',
  size: EDIT_IN_PLACE_SIZE.SMALL,
  toggleTipAlignment: TOOLTIP_ALIGNMENT.BOTTOM,
  tooltipAlignment: TOOLTIP_ALIGNMENT.TOP,
  value: 'default',
};
