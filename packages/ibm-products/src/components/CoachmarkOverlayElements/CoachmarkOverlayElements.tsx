/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Carbon and package components we use.
import { Button, ButtonProps } from '@carbon/react';
// Import portions of React that are needed.
import React, {
  Children,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

//TODO THIS PATH WILL NEED TO BE UPDATED ONCE IN IBM PRODUCTS
import { Carousel } from '../Carousel';
import { CarouselProps } from '../Carousel/Carousel';
// Other standard imports.
import PropTypes from 'prop-types';
//TODO THIS PATH WILL NEED TO BE UPDATED ONCE IN IBM PRODUCTS
import { clamp } from '../../global/js/utils/clamp';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import pconsole from '../../global/js/utils/pconsole';
import { pkg } from '../../settings';
import { useCoachmark } from '../Coachmark';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--coachmark-overlay-elements`;
const componentName = 'CoachmarkOverlayElements';

export interface CoachmarkOverlayElementsProps {
  /**
   * CoachmarkOverlayElements should be used with one or many CoachmarkOverlayElement components as children.
   * @see CoachmarkOverlayElement
   */
  children: ReactNode;
  /**
   * Optional class name for this component.
   */
  className?: string;
  /**
   * The visibility of CoachmarkOverlayElements is
   * managed in the parent component.
   */
  isVisible?: boolean;

  /**
   * Optional prop to render any media like images or any animated media.
   */
  renderMedia?: (params) => ReactNode;
  /**
   * The label for the Next button.
   */
  nextButtonText?: string;
  /**
   * The label for the Previous button.
   */
  previousButtonLabel?: string;
  /**
   * The label for the Close button.
   */
  closeButtonLabel?: string;
  /**
   * Callback called when clicking on the Next button.
   */
  onNext?: () => void;
  /**
   * Callback called when clicking on the Previous button.
   */
  onBack?: () => void;
  /**
   * Current step of the coachmarks.
   */
  currentStep?: number;
}

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Default values can be included here and then assigned to the prop params,
// e.g. prop = defaults.prop,
// This gathers default values together neatly and ensures non-primitive
// values are initialized early to avoid react making unnecessary re-renders.
// Note that default values are not required for props that are 'required',
// nor for props where the component can apply undefined values reasonably.
// Default values should be provided when the component needs to make a choice
// or assumption when a prop is not supplied.

// Default values for props
const defaults = {
  isVisible: false,
  nextButtonText: 'Next',
  previousButtonLabel: 'Back',
  closeButtonLabel: 'Got it',
  onNext: undefined,
  onBack: undefined,
  currentStep: 0,
};
/**
 * Composable container to allow for the displaying of CoachmarkOverlayElement
 * components in a carousel fashion.
 * @deprecated This component is deprecated.
 */
export const CoachmarkOverlayElements = React.forwardRef<
  HTMLDivElement,
  CoachmarkOverlayElementsProps
>(
  (
    {
      className,
      children,
      isVisible = defaults.isVisible,
      renderMedia,
      currentStep = defaults.currentStep,
      nextButtonText = defaults.nextButtonText,
      previousButtonLabel = defaults.previousButtonLabel,
      closeButtonLabel = defaults.closeButtonLabel,
      onNext = defaults.onNext,
      onBack = defaults.onBack,
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const buttonFocusRef = useRef<ButtonProps<any> | undefined>(undefined);
    const scrollRef = useRef<CarouselProps | undefined>(undefined);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [currentProgStep, _setCurrentProgStep] = useState(currentStep);
    const coachmark = useCoachmark();

    const setCurrentProgStep = (value) => {
      if (currentProgStep > 0 && value === 0 && buttonFocusRef.current) {
        setTimeout(() => {
          buttonFocusRef.current?.focus();
        }, 1000);
      }
      _setCurrentProgStep(value);
    };

    const numProgSteps = Children.count(children);
    const progStepFloor = 0;
    const progStepCeil = numProgSteps - 1;

    const renderMediaContent = useMemo(
      () => renderMedia?.({ playStep: currentProgStep }),
      [currentProgStep, renderMedia]
    );

    useEffect(() => {
      // When current step is set by props
      // scroll to the appropriate view on the carrousel
      const targetStep = clamp(currentStep, progStepFloor, progStepCeil);

      scrollRef?.current?.scrollToView?.(targetStep);
      // Avoid circular call to this hook
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    useEffect(() => {
      // On mount, one of the two primary buttons ("next" or "close")
      // will be rendered and must have focus. (a11y)
      if (buttonFocusRef.current) {
        buttonFocusRef.current.focus();
      }
    }, []);

    useEffect(() => {
      setTimeout(() => {
        if (buttonFocusRef.current && isVisible) {
          buttonFocusRef.current.focus();
        }
      }, 100);
    }, [isVisible]);

    if (!coachmark) {
      return pconsole.warn(
        `The ${componentName} is a composable container element which should be used only within the scope of a Coachmark or a CoachmarkFixed component.`
      );
    }

    return (
      <section
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass, // Apply the block class to the main HTML element
          className, // Apply any supplied class names to the main HTML element.
          // example: `${blockClass}__template-string-class-${kind}-n-${size}`,
          {
            // switched classes dependant on props or state
            // example: [`${blockClass}__here-if-small`]: size === 'sm',
          }
        )}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {renderMedia && (
          <div className={`${blockClass}__element-stepped-media`}>
            {renderMediaContent}
          </div>
        )}

        {numProgSteps === 1 ? (
          <>
            {children}
            {closeButtonLabel && (
              <div
                className={cx(
                  `${blockClass}__footer`,
                  'coachmark-carousel-controls'
                )}
              >
                <Button
                  size="sm"
                  {...coachmark.closeButtonProps}
                  ref={buttonFocusRef}
                >
                  {closeButtonLabel}
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <Carousel
              ref={scrollRef as RefObject<HTMLDivElement>}
              onScroll={(scrollPercent) => {
                setScrollPosition(scrollPercent);
              }}
            >
              {children}
            </Carousel>
            <div className={cx(`${blockClass}__footer`)}>
              <div className={`${blockClass}--controls-progress`}>{`${
                currentProgStep + 1
              } / ${numProgSteps}`}</div>
              {scrollPosition > 0 && (
                <Button
                  size="sm"
                  kind="ghost"
                  title={previousButtonLabel}
                  disabled={scrollPosition === 0}
                  onClick={() => {
                    const targetStep = clamp(
                      currentProgStep - 1,
                      progStepFloor,
                      progStepCeil
                    );
                    scrollRef?.current?.scrollToView?.(targetStep);
                    setCurrentProgStep(targetStep);
                    onBack?.();
                  }}
                >
                  {previousButtonLabel}
                </Button>
              )}

              {currentProgStep < progStepCeil ? (
                <Button
                  size="sm"
                  ref={buttonFocusRef}
                  title={nextButtonText}
                  disabled={scrollPosition === 1}
                  onClick={() => {
                    const targetStep = clamp(
                      currentProgStep + 1,
                      progStepFloor,
                      progStepCeil
                    );
                    scrollRef?.current?.scrollToView?.(targetStep);
                    setCurrentProgStep(targetStep);
                    onNext?.();
                  }}
                >
                  {nextButtonText}
                </Button>
              ) : (
                closeButtonLabel && (
                  <Button
                    size="sm"
                    ref={buttonFocusRef}
                    {...coachmark.closeButtonProps}
                  >
                    {closeButtonLabel}
                  </Button>
                )
              )}
            </div>
          </>
        )}
      </section>
    );
  }
);

/**@ts-ignore*/
CoachmarkOverlayElements.deprecated = {
  level: 'warn',
  details: `${componentName} is deprecated.`,
};

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkOverlayElements.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CoachmarkOverlayElements.propTypes = {
  // TODO: UPDATE COMMENT HERE - UPDATE MDX TO HAVE DIRECTION TO USE ONLY OVERLAY ELEMENTS>...CoachmarkOverlayElements will accept only one or more CoachmarkOverlayElement as child components.

  /**
   * CoachmarkOverlayElements should be used with one or many CoachmarkOverlayElement components as children.
   * @see CoachmarkOverlayElement
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional class name for this component.
   */
  className: PropTypes.string,
  /**
   * The label for the Close button.
   */
  closeButtonLabel: PropTypes.string,
  /**
   * Current step of the coachmarks
   */
  currentStep: PropTypes.number,
  /**
   * The visibility of CoachmarkOverlayElements is
   * managed in the parent component.
   */
  isVisible: PropTypes.bool,

  /**
   * The label for the Next button.
   */
  nextButtonText: PropTypes.string,
  /**
   * Optional callback called when clicking on the Previous button.
   */
  onBack: PropTypes.func,
  /**
   * Optional callback called when clicking on the Next button.
   */
  onNext: PropTypes.func,
  /**
   * The label for the Previous button.
   */
  previousButtonLabel: PropTypes.string,
  /**
   * Optional prop to render any media like images or animated media.
   */
  renderMedia: PropTypes.func,
};
