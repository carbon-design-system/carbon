/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../Button';
import { MotionSurface } from '../../internal/motion/MotionSurface';
import { usePrefix } from '../../internal/usePrefix';

/**
 * Story-only dialog chrome for the surface demos.
 *
 * The overlay reuses the stock modal classes so the backdrop fade (and its
 * reduced-motion handling) comes from the existing Carbon CSS, while the
 * container is a MotionSurface so Motion owns the morph. Threading a surface
 * through the real Modal component is the next integration step; this demo
 * keeps the chrome minimal so the story reads as a MotionSurface example.
 */
export function DemoDialog({
  surface,
  surfaceId,
  open,
  onClose,
  onExitComplete,
  heading,
  children,
}) {
  const prefix = usePrefix();
  const closeRef = useRef(null);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    }
  }, [open]);

  return (
    <div
      role="presentation"
      className={cx(`${prefix}--modal`, {
        'is-visible': open,
      })}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}>
      <MotionSurface
        surface={surface}
        surfaceId={surfaceId}
        open={open}
        onExitComplete={onExitComplete}
        role="dialog"
        aria-modal="true"
        aria-label={heading}
        className={cx(
          `${prefix}--modal-container`,
          'motion-surface-demo__container'
        )}>
        <div className={`${prefix}--modal-header`}>
          <h3 className={`${prefix}--modal-header__heading`}>{heading}</h3>
        </div>
        <div className={`${prefix}--modal-content`}>{children}</div>
        <div className={`${prefix}--modal-footer`}>
          <Button kind="secondary" onClick={onClose} ref={closeRef}>
            Close
          </Button>
        </div>
      </MotionSurface>
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
  surfaceId: PropTypes.string.isRequired,
};
