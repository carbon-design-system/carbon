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
 * The overlay reuses the stock modal classes so the backdrop fade (and its
 * reduced-motion handling) comes from the existing Carbon CSS.
 *
 * For `contextual`, defaults to native CSS (data attributes + `surface`
 * mixin) unless `useMotion` is set. Shared-element surfaces (`expand`,
 * `invoke`) always use `MotionSurface`.
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
      className={cx(`${prefix}--modal`, {
        'is-visible': open,
        // Skip stock modal fade/slide so the CSS surface reveal can run
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
  surface: PropTypes.string.isRequired,
  surfaceId: PropTypes.string,
  useNativeCSS: PropTypes.bool,
};
