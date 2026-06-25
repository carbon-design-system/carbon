/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import {
  InterstitialScreenContext,
  blockClass,
  disableButtonConfigType,
} from './context';
import { ModalBody } from '@carbon/react';
import { InitCarousel, initCarousel } from '@carbon/utilities';

import { EnrichedChildren } from './InterstitialScreenHeader';
import { getDevtoolsProps } from '../../global/js/utils/devtools';

type contentRendererArgs = {
  handleGotoStep?: (value: number) => void;
  progStep?: number;
  disableActionButton: (value: disableButtonConfigType) => void;
};
export interface InterstitialScreenBodyProps {
  /**
   * Optional static content for body
   */
  children?: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   *You can provide content either through a callback (contentRenderer) or as static children—but not both.
   * If both are provided, contentRenderer always takes precedence. This optional callback should return the content
   * to be rendered in the body section, which can be either a single element or an array of elements based on your needs.
   * If internal state access isn’t required, you can simply use static children instead
   */
  contentRenderer?: (
    config: contentRendererArgs
  ) => ReactElement<EnrichedChildren> | ReactNode;
}

type StepType = 'single' | 'multi';

const InterstitialScreenBody = React.forwardRef<
  HTMLDivElement,
  InterstitialScreenBodyProps
>((props, ref) => {
  const { className = '', contentRenderer, ...rest } = props;

  const bodyBlockClass = `${blockClass}--internal-body`;

  const [stepType, setStepType] = useState<StepType>();

  const {
    setBodyChildrenData,
    bodyChildrenData,
    isFullScreen,
    setProgStep,
    bodyScrollRef,
    handleGotoStep,
    progStep,
    setStepCount,
    disableButtonConfig,
    setDisableButtonConfig,
  } = useContext(InterstitialScreenContext);

  const carouselContainerRef = useRef<HTMLDivElement | null>(null);
  const carouselInitRef = useRef<InitCarousel | null>(null);

  useEffect(() => {
    // Get the content either from contentRenderer or fallback to props.children
    const _bodyContent =
      contentRenderer?.({ handleGotoStep, progStep, disableActionButton }) ??
      props.children;

    // If content is a valid React element and has children, use its children; otherwise use the content itself
    const children =
      isValidElement(_bodyContent) &&
      (_bodyContent.props as { children?: ReactNode }).children != null
        ? (_bodyContent.props as { children?: ReactNode }).children
        : _bodyContent;

    // Convert to a valid array of React elements
    const validChildren =
      React.Children.toArray(children).filter(isValidElement);

    // Determine step type and count
    if (validChildren.length > 1) {
      setStepType('multi');
      setStepCount?.(validChildren.length);
      // Store content for rendering
      setBodyChildrenData?.(validChildren);
    } else {
      setStepType('single');
      setStepCount?.(1);
      setBodyChildrenData?.(_bodyContent);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children, contentRenderer]);

  useEffect(() => {
    if (
      stepType !== 'multi' ||
      !carouselContainerRef.current ||
      !bodyChildrenData
    ) {
      return;
    }

    carouselInitRef.current?.destroyEvents?.();
    carouselInitRef.current = initCarousel(carouselContainerRef.current, {
      onViewChangeStart: () => {},
      onViewChangeEnd: ({ currentIndex }) => {
        setProgStep?.(currentIndex);
      },
      excludeSwipeSupport: true,
      useMaxHeight: true,
    });

    return () => {
      carouselInitRef.current?.destroyEvents?.();
      carouselInitRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepType]);

  useEffect(() => {
    if (stepType === 'multi' && typeof progStep === 'number') {
      const activeItem = carouselInitRef.current?.getActiveItem?.();
      const activeIndex = activeItem?.index ?? -1;

      if (activeIndex !== -1 && activeIndex < progStep) {
        carouselInitRef.current?.next?.();
      } else if (activeIndex !== -1 && activeIndex > progStep) {
        carouselInitRef.current?.prev?.();
      }
    }
  }, [progStep, stepType]);

  const disableActionButton = (config: disableButtonConfigType) => {
    setDisableButtonConfig?.({
      ...disableButtonConfig,
      ...config,
    });
  };

  const renderBody = () => (
    <div
      className={`${blockClass}--body ${className}`}
      ref={isFullScreen ? (bodyScrollRef ?? ref) : ref}
      {...getDevtoolsProps('InterstitialScreenBody')}
      {...(isFullScreen ? rest : {})}
    >
      <div className={`${blockClass}--content`}>
        {stepType === 'multi' ? (
          <div
            className={`${blockClass}__carousel `}
            ref={(node) => {
              carouselContainerRef.current = node;
            }}
          >
            {React.Children.map(bodyChildrenData, (child, index) =>
              isValidElement(child) ? (
                <div data-index={index}>{child}</div>
              ) : null
            )}
          </div>
        ) : stepType === 'single' ? (
          bodyChildrenData
        ) : (
          ''
        )}
      </div>
    </div>
  );

  return isFullScreen ? (
    renderBody()
  ) : (
    <ModalBody ref={bodyScrollRef ?? ref} className={bodyBlockClass} {...rest}>
      {renderBody()}
    </ModalBody>
  );
});

export default InterstitialScreenBody;

InterstitialScreenBody.propTypes = {
  /**
   * Optional static content for body
   */
  children: PropTypes.node,
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   *You can provide content either through a callback (contentRenderer) or as static children—but not both.
   * If both are provided, contentRenderer always takes precedence. This optional callback should return the content
   * to be rendered in the body section, which can be either a single element or an array of elements based on your needs.
   * If internal state access isn’t required, you can simply use static children instead
   */
  contentRenderer: PropTypes.func,
};
