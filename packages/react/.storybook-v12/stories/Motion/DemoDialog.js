/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../../../src/components/Button';
import { MotionSurface } from '../../../src/internal/motion/MotionSurface';
import { usePrefix } from '../../../src/internal/usePrefix';

/**
 * Story-only dialog chrome for the surface demos.
 *
 * Reuses stock modal class names for header/content/footer chrome. Overlay
 * positioning and the backdrop live in `surfaces.stories.scss` under
 * `motion-surface-demo__modal` so the demos stay self-contained in the v12
 * Storybook (classic `.cds--modal` overlay styles are gated off there).
 *
 * Shared-element surfaces (`expand`, `invoke`) always use `MotionSurface`.
 * Reveal surfaces can opt into native CSS via `useNativeCSS`.
 */
export function DemoDialog({
  surface,
  surfaceId,
  open,
  onClose,
  onExitComplete,
  heading,
  children,
  useNativeCSS = false,
  ...rest
}) {
  const prefix = usePrefix();
  const closeRef = useRef(null);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    }
  }, [open]);

  const dialogBody = (
    <>
      <div className={`${prefix}--modal-header`}>
        <h3 className={`${prefix}--modal-header__heading`}>{heading}</h3>
      </div>
      <div className={`${prefix}--modal-content`}>{children}</div>
      <div className={`${prefix}--modal-footer`}>
        <Button kind="secondary" onClick={onClose} ref={closeRef}>
          Close
        </Button>
      </div>
    </>
  );

  const containerClassName = cx(
    `${prefix}--modal-container`,
    'motion-surface-demo__container',
    { 'motion-surface-demo__container--expand': surface === 'expand' }
  );

  return (
    <div
      role="presentation"
      className={cx(`${prefix}--modal`, 'motion-surface-demo__modal', {
        'is-visible': open,
        // Skip overlay fade so the CSS surface reveal can run alone
        'motion-surface-demo__modal--css': useNativeCSS,
      })}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}>
      {useNativeCSS ? (
        open && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={heading}
            className={containerClassName}
            {...rest}>
            {dialogBody}
          </div>
        )
      ) : (
        <MotionSurface
          surface={surface}
          surfaceId={surfaceId}
          open={open}
          onExitComplete={onExitComplete}
          role="dialog"
          aria-modal="true"
          aria-label={heading}
          className={containerClassName}>
          {dialogBody}
        </MotionSurface>
      )}
    </div>
  );
}

DemoDialog.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
  onClose: PropTypes.func,
  onExitComplete: PropTypes.func,
  open: PropTypes.bool,
  // accepts default surface names or user-defined
  surface: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  surfaceId: PropTypes.string,
  useNativeCSS: PropTypes.bool,
};
