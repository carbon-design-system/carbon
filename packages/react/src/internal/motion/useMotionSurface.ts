/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import type { MotionSurfaceName } from '@carbon/motion';
import useIsomorphicEffect from '../useIsomorphicEffect';
import { useMatchMedia } from '../useMatchMedia';
import { useSavedCallback } from '../useSavedCallback';
import {
  createMotionAdapter,
  type MotionAnimation,
  type MotionSurfaceElements,
  type MotionSurfaceRun,
} from './adapters/motion';

const adapterFactories = {
  motion: createMotionAdapter,
};

type MotionAdapterName = keyof typeof adapterFactories;
type MotionPhase = 'closed' | 'entering' | 'exiting' | 'idle' | 'open';

interface MotionSurfaceElementRefs {
  contentRef?: RefObject<Element[] | null>;
  originRef: RefObject<HTMLElement | null>;
  overlayRef?: RefObject<HTMLElement | null>;
  targetRef?: RefObject<HTMLElement | null>;
}

interface UseMotionSurfaceOptions extends MotionSurfaceElementRefs {
  /** Animation engine used for this surface. */
  adapter?: MotionAdapterName;
  /** Called after the exit animation and component close have finished. */
  onExitComplete?: () => void;
  /** Controlled open state. */
  open: boolean;
  /** State setter for the open value. Required when targetRef is not provided
   *  so that useMotionSurface can manage the target ref internally. */
  setOpen?: (open: boolean) => void;
}

interface UseMotionSurfaceResult {
  /** Open state passed to the component while it remains mounted. */
  isComponentOpen: boolean;
  /** Whether the component should stay mounted during enter and exit. */
  isPresent: boolean;
  /** Call to open the modal and start the enter animation. */
  openWithMotion: () => void;
  /** Call to close the modal and start the exit animation. */
  closeWithMotion: () => void;
  /** Spread onto the trigger element (e.g. Button). */
  triggerProps: Record<string, unknown>;
  /** Spread onto the Modal element. */
  modalProps: { ref: (node: HTMLElement | null) => void };
  /** Wrap the Modal JSX so useMotionSurface can attach the target ref. */
  renderModal: (children: ReactNode) => ReactNode;
}

function getElements(
  refs: MotionSurfaceElementRefs,
  internalTargetRef: RefObject<HTMLElement | null>
) {
  const origin = refs.originRef.current;
  const target = (refs.targetRef ?? internalTargetRef).current;

  if (!origin || !target) {
    return null;
  }

  const elements: MotionSurfaceElements = {
    content: refs.contentRef?.current ?? [],
    origin,
    target,
  };

  if (refs.overlayRef?.current) {
    elements.overlay = refs.overlayRef.current;
  }

  return elements;
}

/**
 * Coordinates presence and lifecycle for a named Carbon motion surface.
 * Components provide the DOM refs while the selected adapter runs the motion.
 */
export function useMotionSurface(
  surfaceName: MotionSurfaceName,
  {
    adapter = 'motion',
    contentRef,
    onExitComplete,
    open,
    originRef,
    overlayRef,
    setOpen,
    targetRef,
  }: UseMotionSurfaceOptions
): UseMotionSurfaceResult {
  const shouldReduceMotion = useMatchMedia('(prefers-reduced-motion: reduce)');
  const [isPresent, setIsPresent] = useState(open);
  const [isComponentOpen, setIsComponentOpen] = useState(open);
  const phaseRef = useRef<MotionPhase>(open ? 'open' : 'idle');
  const animationsRef = useRef<MotionAnimation[]>([]);
  const runIdRef = useRef(0);
  // Internal target ref used when the caller does not supply one (invoke pattern).
  const internalTargetRef = useRef<HTMLElement | null>(null);
  const hiddenOriginRef = useRef<{
    element: HTMLElement;
    transition: string;
    visibility: string;
  } | null>(null);
  const onExitCompleteSaved = useSavedCallback(onExitComplete);

  const createAdapter = adapterFactories[adapter];
  if (!createAdapter) {
    throw new Error(
      `Unsupported motion adapter "${adapter}". Expected one of: ${Object.keys(
        adapterFactories
      ).join(', ')}`
    );
  }

  // Adapter identity must stay stable while an animation is running.
  const motionAdapter = useMemo(() => {
    return createAdapter(surfaceName, shouldReduceMotion);
  }, [createAdapter, shouldReduceMotion, surfaceName]);

  const showOrigin = useCallback(() => {
    const hiddenOrigin = hiddenOriginRef.current;
    if (!hiddenOrigin) return;

    hiddenOrigin.element.style.visibility = hiddenOrigin.visibility;
  }, []);

  const releaseOrigin = useCallback(() => {
    const hiddenOrigin = hiddenOriginRef.current;
    if (!hiddenOrigin) return;

    hiddenOrigin.element.style.visibility = hiddenOrigin.visibility;
    hiddenOrigin.element.style.transition = hiddenOrigin.transition;
    hiddenOriginRef.current = null;
  }, []);

  const hideOrigin = useCallback(
    (origin: HTMLElement) => {
      if (hiddenOriginRef.current?.element !== origin) {
        releaseOrigin();
        hiddenOriginRef.current = {
          element: origin,
          transition: origin.style.transition,
          visibility: origin.style.visibility,
        };
      }

      // ClickableTile transitions every CSS property. Disable that transition
      // so visibility changes do not delay focus restoration.
      origin.style.transition = 'none';
      origin.style.visibility = 'hidden';
    },
    [releaseOrigin]
  );

  const stopAnimations = useCallback(() => {
    runIdRef.current += 1;
    animationsRef.current.forEach((animation) => animation.stop());
    animationsRef.current = [];
  }, []);

  const openWithMotion = useCallback(() => {
    setOpen?.(true);
  }, [setOpen]);

  const closeWithMotion = useCallback(() => {
    setOpen?.(false);
  }, [setOpen]);

  // Callback ref attached to the modal container for the invoke pattern.
  const setModalRef = useCallback((node: HTMLElement | null) => {
    internalTargetRef.current = node;
  }, []);

  const triggerProps = useMemo(() => ({}), []);

  const modalProps = useMemo(() => ({ ref: setModalRef }), [setModalRef]);

  const renderModal = useCallback((children: ReactNode) => children, []);

  useIsomorphicEffect(() => {
    if (open && !isPresent) {
      // Mount first so the destination refs are ready on the next layout pass.
      phaseRef.current = 'idle';
      setIsComponentOpen(true);
      setIsPresent(true);
      return;
    }

    if (!isPresent) return;

    const elements = getElements(
      { contentRef, originRef, overlayRef, targetRef },
      internalTargetRef
    );

    if (!elements) return;

    if (open) {
      if (phaseRef.current === 'entering' || phaseRef.current === 'open') {
        return;
      }

      const fromOrigin = phaseRef.current === 'idle';
      stopAnimations();
      const runId = runIdRef.current;
      phaseRef.current = 'entering';
      setIsComponentOpen(true);
      // Only hide the origin for shared-element surfaces (e.g. expand) where
      // the launcher visually transforms into the modal. Reveal surfaces
      // (e.g. invoke) keep the launcher visible while the modal is open.
      if (surfaceName === 'expand') {
        hideOrigin(elements.origin);
      }

      let run: MotionSurfaceRun;
      try {
        run = motionAdapter.enter({ ...elements, fromOrigin });
      } catch (error) {
        phaseRef.current = 'idle';
        releaseOrigin();
        throw error;
      }
      animationsRef.current = run.animations;
      run.finished.then(
        () => {
          if (runIdRef.current === runId) {
            phaseRef.current = 'open';
          }
        },
        () => {
          // An interrupted run must not update the current lifecycle state.
        }
      );
      return;
    }

    if (phaseRef.current === 'exiting' || phaseRef.current === 'closed') {
      return;
    }

    stopAnimations();
    const runId = runIdRef.current;
    phaseRef.current = 'exiting';

    let run: MotionSurfaceRun;
    try {
      run = motionAdapter.exit(elements);
    } catch (error) {
      phaseRef.current = 'closed';
      releaseOrigin();
      setIsComponentOpen(false);
      throw error;
    }
    animationsRef.current = run.animations;
    run.finished.then(
      () => {
        if (runIdRef.current !== runId) return;

        if (surfaceName === 'expand') {
          showOrigin();
        }
        phaseRef.current = 'closed';
        setIsComponentOpen(false);
      },
      () => {
        // An interrupted run must not update the current lifecycle state.
      }
    );
  }, [
    contentRef,
    hideOrigin,
    internalTargetRef,
    isPresent,
    motionAdapter,
    open,
    originRef,
    overlayRef,
    releaseOrigin,
    showOrigin,
    stopAnimations,
    targetRef,
  ]);

  useEffect(() => {
    if (
      open ||
      isComponentOpen ||
      !isPresent ||
      phaseRef.current !== 'closed'
    ) {
      return;
    }

    // Give the component one committed closed state before removing it.
    phaseRef.current = 'idle';
    setIsPresent(false);
    onExitCompleteSaved();
  }, [isComponentOpen, isPresent, onExitCompleteSaved, open]);

  useEffect(() => {
    if (!isPresent) {
      releaseOrigin();
    }
  }, [isPresent, releaseOrigin]);

  useIsomorphicEffect(
    () => () => {
      // Reset the phase so React Strict Mode can safely run setup again.
      stopAnimations();
      phaseRef.current = 'idle';
      releaseOrigin();
    },
    [releaseOrigin, stopAnimations]
  );

  return {
    isComponentOpen,
    isPresent,
    openWithMotion,
    closeWithMotion,
    triggerProps,
    modalProps,
    renderModal,
  };
}
