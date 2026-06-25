/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import uuidv4 from '../../global/js/utils/uuidv4';
// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg /*, carbon */ } from '../../settings';

import { CoachmarkDragbar } from './CoachmarkDragbar';
import { CoachmarkHeader } from './CoachmarkHeader';
import { getOffsetTune } from './utils/constants';
import { useCoachmark } from './utils/context';
import { COACHMARK_OVERLAY_KIND } from './utils/enums';
import { useIsomorphicEffect } from '../../global/js/hooks';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--coachmark-overlay`;
const componentName = 'CoachmarkOverlay';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

const defaults = {
  kind: COACHMARK_OVERLAY_KIND.FLOATING,
  theme: 'light',
};

interface CoachmarkOverlayProps {
  /**
   * The CoachmarkOverlayElements child components.
   * Validation is handled in the parent Coachmark component.
   */
  children: ReactNode;
  /**
   * Optional class name for this component.
   */
  className?: string;
  /**
   * The visibility of CoachmarkOverlay is
   * managed in the parent Coachmark component.
   */
  fixedIsVisible: boolean;
  /**
   * What kind or style of Coachmark to render.
   */
  kind?: COACHMARK_OVERLAY_KIND;
  /**
   * Function to call when the Coachmark closes.
   */
  onClose: () => void;
  /**
   * Determines the theme of the component.
   */
  theme?: 'light' | 'dark';
  /**
   * Additional props passed to the component.
   */
  [key: string]: any;
}

type StyledTune = {
  left?: number;
  top?: number;
};

/**
 * DO NOT USE. This component is for the exclusive use
 * of other Onboarding components.
 * @deprecated This component is deprecated.
 */
export const CoachmarkOverlay = forwardRef<
  HTMLDivElement,
  CoachmarkOverlayProps
>((props, ref) => {
  const {
    children,
    onClose,
    fixedIsVisible,
    className,
    kind = defaults.kind,
    theme = defaults.theme,
    ...rest
  } = props;
  const { winHeight, winWidth } = useWindowDimensions();
  const [a11yDragMode, setA11yDragMode] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const coachmark = useCoachmark();
  const isBeacon = kind === COACHMARK_OVERLAY_KIND.TOOLTIP;
  const isDraggable = kind === COACHMARK_OVERLAY_KIND.FLOATING;
  const isVisible = className?.includes('is-visible');

  const handleKeyPress = (event) => {
    const { shiftKey, key } = event;
    /* istanbul ignore next */
    if (key === 'Enter' || key === ' ') {
      setA11yDragMode((prevVal) => !prevVal);
    } else if (a11yDragMode) {
      const distanceToMove = shiftKey ? 128 : 32;
      switch (key) {
        case 'ArrowLeft':
          handleDrag(distanceToMove * -1, 0);
          break;
        case 'ArrowRight':
          handleDrag(distanceToMove, 0);
          break;
        case 'ArrowUp':
          handleDrag(0, distanceToMove * -1);
          break;
        case 'ArrowDown':
          handleDrag(0, distanceToMove);
          break;
        default:
          break;
      }
    }
  };

  const styledTune: StyledTune = useMemo(() => {
    const style: StyledTune = {};
    if (isBeacon || isDraggable) {
      if (coachmark?.targetRect) {
        style.left = coachmark.targetRect.x + window.scrollX;
        style.top = coachmark.targetRect.y + window.scrollY;
      }
      if (style.left && style.top) {
        if (isBeacon) {
          style.left = style.left + 16;
          style.top = style.top + 16;
        }
        if (isDraggable) {
          const offsetTune = getOffsetTune(coachmark, kind);

          style.left = style.left + offsetTune.left;
          style.top = style.top + offsetTune.top;
        }
      }
    }
    return style;
  }, [isBeacon, isDraggable, coachmark, kind]);

  /* istanbul ignore next */
  function handleDragBounds(x, y) {
    let xRes = x;
    let yRes = y;
    const xMax = winWidth - 288;
    const yMax = winHeight - 150;
    if (xRes < 0) {
      xRes = 0;
    } else if (xRes > xMax) {
      xRes = xMax;
    }
    if (yRes < 0) {
      yRes = 0;
    } else if (yRes > yMax) {
      yRes = yMax;
    }

    return { targetX: xRes, targetY: yRes };
  }

  function handleDrag(movementX, movementY) {
    const overlay = overlayRef.current;
    if (!overlay) {
      return;
    }
    const { x, y } = overlay.getBoundingClientRect();

    const { targetX, targetY } = handleDragBounds(x + movementX, y + movementY);

    overlay.style.transform = 'none';
    overlay.style.position = 'fixed';
    overlay.style.left = `${targetX}px`;
    overlay.style.top = `${targetY}px`;
    overlay.style.bottom = 'auto';
  }
  const contentId = uuidv4();

  useIsomorphicEffect(() => {
    if (overlayRef.current) {
      const currentStyle = overlayRef.current?.style;
      Object.keys(styledTune).forEach((key) => {
        const value = styledTune[key];
        currentStyle.setProperty(key, `${value}px`);
      });
    }
  }, [styledTune, overlayRef]);

  return (
    <div
      {...rest}
      className={cx(
        blockClass,
        `${blockClass}--${kind}`,
        `${blockClass}__${theme}`,
        (isBeacon || isDraggable) &&
          coachmark?.align &&
          `${blockClass}--${coachmark.align}`,
        fixedIsVisible && `${blockClass}--is-visible`,
        a11yDragMode && `${blockClass}--is-dragmode`,
        className
      )}
      ref={overlayRef}
      aria-labelledby={contentId}
      tabIndex={-1}
      {...getDevtoolsProps(componentName)}
    >
      {isDraggable ? (
        <CoachmarkDragbar
          a11yKeyboardHandler={handleKeyPress}
          onBlur={() => setA11yDragMode(false)}
          onDrag={handleDrag}
          theme={theme}
          onClose={onClose}
        />
      ) : (
        <CoachmarkHeader onClose={onClose} />
      )}
      <div className={`${blockClass}__body`} ref={ref} id={contentId}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child as React.ReactElement<any>, {
            isVisible,
          });
        })}
      </div>
    </div>
  );
});

function getWindowDimensions() {
  const { innerWidth: winWidth, innerHeight: winHeight } = window;
  return {
    winWidth,
    winHeight,
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    /* istanbul ignore next */
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
};

/**@ts-ignore*/
CoachmarkOverlay.deprecated = {
  level: 'warn',
  details: `${componentName} is deprecated.`,
};

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkOverlay.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CoachmarkOverlay.propTypes = {
  /**
   * The CoachmarkOverlayElements child components.
   * Validation is handled in the parent Coachmark component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional class name for this component.
   */
  className: PropTypes.string,
  /**
   * The visibility of CoachmarkOverlay is
   * managed in the parent Coachmark component.
   */
  fixedIsVisible: PropTypes.bool.isRequired,
  /**
   * What kind or style of Coachmark to render.
   */
  kind: PropTypes.oneOf(Object.values(COACHMARK_OVERLAY_KIND)),
  /**
   * Function to call when the Coachmark closes.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Determines the theme of the component.
   */
  theme: PropTypes.oneOf(['light', 'dark']),
};
