/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useRef, useState } from 'react';
import Button from '../Button';
import { ClassPrefix } from '../ClassPrefix';
import Modal from '../Modal';
import { ModalPresence } from '../Modal/ModalPresence';
import { useMotionSurface } from '../../internal/motion/useMotionSurface';
import './Modal.motion.stories.scss';

export default {
  title: 'Motion/Surfaces/Invoke',
  tags: ['!autodocs'],
  parameters: {
    controls: {
      exclude: ['launcherButtonRef'],
    },
  },
};

export const Invoke = () => {
  const [open, setOpen] = useState(false);
  const launcherButtonRef = useRef(null);
  // targetRef points at the inner modal container (.--modal-container) so the
  // invoke clip-path animation runs only on the panel. The outer overlay
  // element retains its default CSS fade-in from the modal styles.
  const targetRef = useRef(null);
  const invokeMotion = useMotionSurface('invoke', {
    adapter: 'motion',
    open,
    originRef: launcherButtonRef,
    setOpen,
    targetRef,
  });

  // Resolve targetRef to the inner --modal-container when the Modal mounts.
  // modalProps.ref attaches to the outer overlay <Layer>; we query downward
  // to find the panel that should receive the clip-path animation.
  const modalRef = useCallback(
    (overlayNode) => {
      invokeMotion.modalProps.ref(overlayNode);
      targetRef.current = overlayNode
        ? overlayNode.querySelector('[role="dialog"]')
        : null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [invokeMotion.modalProps.ref]
  );

  return (
    <>
      <Button
        ref={launcherButtonRef}
        {...invokeMotion.triggerProps}
        onClick={invokeMotion.openWithMotion}>
        Launch modal
      </Button>
      <ClassPrefix prefix="dialog-refactor">
        <div className="preview-modal-with-presence preview-modal-invoke">
          <ModalPresence open={invokeMotion.isPresent}>
            {invokeMotion.renderModal(
              <Modal
                {...invokeMotion.modalProps}
                ref={modalRef}
                launcherButtonRef={launcherButtonRef}
                open={invokeMotion.isComponentOpen}
                onRequestClose={invokeMotion.closeWithMotion}
                onRequestSubmit={invokeMotion.closeWithMotion}
                modalHeading="Create deployment"
                modalLabel="Invoke motion prototype"
                primaryButtonText="Create"
                secondaryButtonText="Cancel">
                <p>
                  This story keeps the existing Modal presence lifecycle and
                  uses the launch Button as the invoke origin for the
                  transition.
                </p>

                <p>
                  This story keeps the existing Modal presence lifecycle and
                  uses the launch Button as the invoke origin for the
                  transition.
                </p>

                <p>
                  This story keeps the existing Modal presence lifecycle and
                  uses the launch Button as the invoke origin for the
                  transition.
                </p>
                <p>
                  This story keeps the existing Modal presence lifecycle and
                  uses the launch Button as the invoke origin for the
                  transition.
                </p>
                <p>
                  This story keeps the existing Modal presence lifecycle and
                  uses the launch Button as the invoke origin for the
                  transition.
                </p>
              </Modal>
            )}
          </ModalPresence>
        </div>
      </ClassPrefix>
    </>
  );
};
