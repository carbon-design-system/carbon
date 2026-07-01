/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
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
  const invokeMotion = useMotionSurface('invoke', {
    adapter: 'motion',
    open,
    originRef: launcherButtonRef,
    setOpen,
  });

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
