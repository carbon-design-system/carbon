/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, type Ref } from 'react';
import { useFeatureFlag } from '../FeatureFlags';
import {
  OverflowMenu as OverflowMenuV12,
  type OverflowMenuProps as OverflowMenuV12Props,
} from './next';
import {
  OverflowMenu as OverflowMenuV11,
  type OverflowMenuProps,
} from './OverflowMenu';

const OverflowMenu = forwardRef<HTMLDivElement, OverflowMenuProps>(
  (props, ref) => {
    const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

    if (!enableV12OverflowMenu) {
      return <OverflowMenuV11 {...props} ref={ref as Ref<HTMLButtonElement>} />;
    }

    const {
      // v12 names the trigger's accessible name `label`, covering what v11
      // split between `iconDescription` and `aria-label`.
      iconDescription,
      ariaLabel,
      label,
      // v12 folds v11's `direction` and `flipped` into `menuAlignment`.
      direction,
      flipped,
      menuAlignment,
      // The `Menu`-based implementation owns its own positioning, open state,
      // and menu markup, so these have no v12 equivalent. They have to be
      // pulled out rather than forwarded, because v12 spreads what it doesn't
      // recognize onto its container element.
      focusTrap,
      iconClass,
      innerRef,
      light,
      menuOffset,
      menuOffsetFlip,
      menuOptionsClass,
      onClose,
      onOpen,
      open,
      selectorPrimaryFocus,
      ...rest
    } = props as OverflowMenuProps &
      Pick<OverflowMenuV12Props, 'label' | 'menuAlignment'>;

    const side = direction === 'top' ? 'top' : 'bottom';
    const alignment = flipped ? 'end' : 'start';

    // The two implementations have different prop shapes and different host
    // elements (v12 renders a div, v11 a button), so neither branch is
    // assignable from the shared v11-typed props. The v11 branch above casts
    // its ref for the same reason.
    return (
      <OverflowMenuV12
        {...(rest as unknown as OverflowMenuV12Props)}
        label={label ?? iconDescription ?? rest['aria-label'] ?? ariaLabel}
        menuAlignment={menuAlignment ?? (`${side}-${alignment}` as const)}
        ref={ref}
      />
    );
  }
);

OverflowMenu.displayName = 'OverflowMenu';
OverflowMenu.propTypes = OverflowMenuV11.propTypes;

export default OverflowMenu;
export { OverflowMenu, type OverflowMenuProps };
