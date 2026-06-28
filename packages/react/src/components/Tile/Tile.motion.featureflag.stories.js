/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { animate } from 'motion';
import { ArrowRight } from '@carbon/icons-react';
import Modal from '../Modal';
import { usePrefix } from '../../internal/usePrefix';
import { ClickableTile } from './Tile';
import { useMotionSurface } from './useMotionSurface.featureflag';
import './Tile.motion.stories.scss';

const services = [
  {
    id: 'data-warehouse',
    eyebrow: 'Data service',
    name: 'Warehouse analytics',
    description:
      'Explore query performance, storage utilization, and active workloads.',
    metric: '24 active workloads',
  },
  {
    id: 'api-gateway',
    eyebrow: 'Application service',
    name: 'API gateway',
    description:
      'Review traffic, latency, and policy enforcement across environments.',
    metric: '8.4k requests per minute',
  },
  {
    id: 'security-center',
    eyebrow: 'Security service',
    name: 'Security center',
    description:
      'Inspect posture findings and prioritize remediation across resources.',
    metric: '12 findings to review',
  },
];

export default {
  title: 'Components/Tile/Experimental motion surface',
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const ExpandIntoModal = () => {
  const prefix = usePrefix();
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const launcherRef = useRef(null);
  const modalRef = useRef(null);
  const animationsRef = useRef([]);
  const closingRef = useRef(false);
  const hasOpenedRef = useRef(false);
  const restoreFocusRef = useRef(false);
  const expandSurface = useMotionSurface('expand');
  const targetSelector = `.${prefix}--modal-container`;
  const contentSelector = [
    `.${prefix}--modal-header`,
    `.${prefix}--modal-content`,
  ].join(', ');

  const stopAnimations = useCallback(() => {
    animationsRef.current.forEach((animation) => animation.stop());
    animationsRef.current = [];
  }, []);

  const openModal = (service, event) => {
    if (closingRef.current) return;

    launcherRef.current = event.currentTarget;
    setSelectedService(service);
    setModalOpen(true);
  };

  useEffect(() => {
    if (modalOpen) {
      hasOpenedRef.current = true;
      return;
    }

    if (!selectedService || !hasOpenedRef.current) return;

    const unmount = setTimeout(() => {
      hasOpenedRef.current = false;
      closingRef.current = false;
      restoreFocusRef.current = true;
      setSelectedService(null);
    }, 50);

    return () => clearTimeout(unmount);
  }, [modalOpen, selectedService]);

  useEffect(() => {
    if (selectedService || !restoreFocusRef.current) return;

    const restoreFocus = setTimeout(() => {
      restoreFocusRef.current = false;
      launcherRef.current?.focus();
    }, 50);

    return () => clearTimeout(restoreFocus);
  }, [selectedService]);

  useLayoutEffect(() => {
    const root = modalRef.current;
    const source = launcherRef.current;
    const target = root?.querySelector(targetSelector);

    if (!modalOpen || !selectedService || !root || !source || !target) return;

    stopAnimations();
    source.style.visibility = 'hidden';

    if (expandSurface.shouldReduceMotion) {
      animationsRef.current = [
        animate(root, { opacity: [0, 1] }, expandSurface.enter),
      ];
      return stopAnimations;
    }

    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const overlayColor = getComputedStyle(root).backgroundColor;
    const content = target.querySelectorAll(contentSelector);

    target.style.transformOrigin = 'top left';
    target.style.willChange = 'transform';

    animationsRef.current = [
      animate(
        root,
        { backgroundColor: ['rgba(0, 0, 0, 0)', overlayColor] },
        expandSurface.enter
      ),
      animate(
        target,
        {
          transform: [
            expandSurface.getTransform(sourceRect, targetRect),
            'none',
          ],
        },
        expandSurface.enter
      ),
      animate(content, { opacity: [0, 1] }, expandSurface.contentEnter),
    ];

    return stopAnimations;
  }, [
    contentSelector,
    expandSurface,
    modalOpen,
    selectedService,
    stopAnimations,
    targetSelector,
  ]);

  const closeModal = useCallback(async () => {
    const root = modalRef.current;
    const source = launcherRef.current;
    const target = root?.querySelector(targetSelector);

    if (
      closingRef.current ||
      !modalOpen ||
      !selectedService ||
      !root ||
      !source ||
      !target
    ) {
      return;
    }

    closingRef.current = true;
    stopAnimations();

    if (expandSurface.shouldReduceMotion) {
      const fade = animate(root, { opacity: 0 }, expandSurface.exit);
      animationsRef.current = [fade];
      await fade.finished;
    } else {
      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const content = target.querySelectorAll(contentSelector);
      const animations = [
        animate(
          root,
          { backgroundColor: 'rgba(0, 0, 0, 0)' },
          expandSurface.exit
        ),
        animate(
          target,
          { transform: expandSurface.getTransform(sourceRect, targetRect) },
          expandSurface.exit
        ),
        animate(content, { opacity: 0 }, expandSurface.contentExit),
      ];

      animationsRef.current = animations;
      await Promise.all(animations.map((animation) => animation.finished));
    }

    source.style.visibility = '';
    setModalOpen(false);
  }, [
    contentSelector,
    expandSurface,
    modalOpen,
    selectedService,
    stopAnimations,
    targetSelector,
  ]);

  return (
    <>
      <div className="motion-surface-tile-grid">
        {services.map((service) => (
          <ClickableTile
            aria-expanded={selectedService?.id === service.id}
            aria-haspopup="dialog"
            className="motion-surface-tile"
            clicked={selectedService?.id === service.id}
            data-motion-surface-origin={service.id}
            key={service.id}
            onClick={(event) => openModal(service, event)}
            renderIcon={ArrowRight}>
            <span className="motion-surface-tile__eyebrow">
              {service.eyebrow}
            </span>
            <strong className="motion-surface-tile__heading">
              {service.name}
            </strong>
            <span className="motion-surface-tile__description">
              {service.description}
            </span>
            <span className="motion-surface-tile__metric">
              {service.metric}
            </span>
          </ClickableTile>
        ))}
      </div>

      {selectedService && (
        <Modal
          className="motion-surface-modal"
          launcherButtonRef={launcherRef}
          modalHeading={selectedService.name}
          modalLabel={selectedService.eyebrow}
          onRequestClose={closeModal}
          open={modalOpen}
          passiveModal
          ref={modalRef}>
          <p>{selectedService.description}</p>
          <dl className="motion-surface-modal__details">
            <div>
              <dt>Status</dt>
              <dd>Running</dd>
            </div>
            <div>
              <dt>Current activity</dt>
              <dd>{selectedService.metric}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>US South</dd>
            </div>
          </dl>
        </Modal>
      )}
    </>
  );
};
