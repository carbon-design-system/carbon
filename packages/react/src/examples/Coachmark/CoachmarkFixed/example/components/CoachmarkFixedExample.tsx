/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Theme, Link as CarbonLink } from '@carbon/react';
import {
  preview__CoachmarkTagline as CoachmarkTagline,
  preview__Coachmark as Coachmark,
} from '@carbon/ibm-products';
import { InitCarousel, initCarousel } from '@carbon/utilities';

//fetching theme
function useCarbonTheme() {
  const [themeValue, setThemeValue] = useState(
    () => document.documentElement.getAttribute('data-carbon-theme') || 'g10'
  );

  useEffect(() => {
    const target = document.documentElement;

    // function to read the current theme
    const readTheme = () => {
      const newTheme = target.getAttribute('data-carbon-theme') || 'g10';
      setThemeValue((prev) => (prev !== newTheme ? newTheme : prev));
    };

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-carbon-theme'
        ) {
          readTheme();
        }
      }
    });

    observer.observe(target, {
      attributes: true,
      attributeFilter: ['data-carbon-theme'],
    });

    //fallback - check readTheme in every 200ms
    const interval = setInterval(readTheme, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return themeValue;
}

export const CoachmarkFixedExample = (args) => {
  const carbonTheme = useCarbonTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [currentViewIndex, setCurrentViewIndex] = useState(-1);
  const [lastViewIndex, setLastViewIndex] = useState(-1);
  const [fixedIsVisible, setFixedIsVisible] = useState(false);
  //prettier-ignore
  const carouselInit = useRef < InitCarousel > (null);
  //prettier-ignore
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  //prettier-ignore
  const backRef = useRef<HTMLButtonElement>(null);
  const carouselContainerRefs = useRef<{
    [key: number]: HTMLDivElement | null;
  }>({});
  const carouselItemsRef = useRef<{ [key: number]: (HTMLDivElement | null)[] }>(
    {}
  );
  const taglineRef = useRef<HTMLButtonElement>(null);

  const items = [
    {
      id: 1,
      title: 'Hello World',
      text: 'Link opens in new tab.',
      button: (
        <CarbonLink href="https://www.ibm.com" target="_blank">
          {' '}
          Learn more
        </CarbonLink>
      ),
    },
    {
      id: 2,
      title: 'Hello World 2',
      text: 'Link opens on this page.',
      button: <CarbonLink href="https://www.ibm.com">Learn more</CarbonLink>,
    },
  ];

  const handleClose = () => {
    setIsOpen(false);
    carouselInit?.current?.reset();
    // Return focus to the beacon button after closing
    setTimeout(() => {
      taglineRef.current?.focus();
    }, 0);
  };

  const handleTaglineClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleViewStackUpdate = useCallback(({ currentIndex, lastIndex }) => {
    setCurrentViewIndex(currentIndex);
    setLastViewIndex(lastIndex);
  }, []);

  const onViewChangeStart = () => {};
  const onViewChangeEnd = (options) => {
    handleViewStackUpdate(options);
  };

  useEffect(() => {
    if (isOpen) {
      // Use requestAnimationFrame to ensure the initial transform state is applied
      // before triggering the transition for smooth animation
      requestAnimationFrame(() => {
        setFixedIsVisible(true);
      });
    } else {
      setFixedIsVisible(false);
      setTimeout(() => {
        const taglineButton = document.getElementById('CoachmarkTagline');
        taglineButton?.focus();
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const activeCarouselContainer = carouselContainerRefs.current[0];
    if (isOpen && activeCarouselContainer) {
      // Destroy stale event listeners from the previous instance before
      // re-initializing, otherwise old transitionend listeners fire with a
      // stale viewIndexStack and reset currentViewIndex back to 0.
      setCurrentViewIndex(0);
      setLastViewIndex(0);
      carouselInit.current?.destroyEvents();
      carouselInit.current = initCarousel(activeCarouselContainer, {
        onViewChangeStart: () => {},
        onViewChangeEnd: (options) => handleViewStackUpdate(options),
        useMaxHeight: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselInit, isOpen]);

  const onNext = (e) => {
    carouselInit?.current?.next();
  };

  const onPrev = (e) => {
    // Focus the primary button before navigation if Back button will be hidden
    if (currentViewIndex === 1) {
      primaryButtonRef.current?.focus();
    }
    carouselInit?.current?.prev();
  };

  return (
    <Theme theme={carbonTheme}>
      <Coachmark
        open={isOpen}
        onClose={handleClose}
        align="top"
        caret={false}
        selectorPrimaryFocus="#coachmark-primary-button"
        {...args}
      >
        <CoachmarkTagline
          title="Why are there two types of severity scores?"
          closeIconDescription="Close"
          isOpen={isOpen}
          buttonProps={{
            onClick: handleTaglineClick,
            id: 'CoachmarkTagline',
            ref: taglineRef,
          }}
        ></CoachmarkTagline>
        <Coachmark.Content
          className={fixedIsVisible ? `is-visible` : ''}
          aria-label="Coachmark content"
        >
          <Coachmark.ContentHeader closeIconDescription="Close"></Coachmark.ContentHeader>
          <Coachmark.ContentBody>
            <div
              ref={(el) => {
                carouselContainerRefs.current[0] = el;
              }}
              className="exampleCarouselWrapper"
            >
              {items.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (!carouselItemsRef.current[0]) {
                      carouselItemsRef.current[0] = [];
                    }
                    carouselItemsRef.current[0][index] = el;
                  }}
                >
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                  <br></br>
                  <p>{item.button}</p>
                </div>
              ))}
            </div>

            <div className={'carouselControlWrapper__footer'}>
              <div className={'carouselControlWrapper--controls-progress'}>
                {items.map((item, index) => {
                  if (
                    carouselInit.current?.getActiveItem?.()?.index === index
                  ) {
                    return (
                      <span key={item.id}>
                        {`${carouselInit.current?.getActiveItem?.()?.index + 1} / ${items.length}`}
                      </span>
                    );
                  }
                })}
              </div>
              <div className={'carouselControlWrapper--buttons'}>
                {currentViewIndex !== 0 && (
                  <Button
                    size="sm"
                    iconDescription="Previous"
                    kind="ghost"
                    onClick={onPrev}
                    ref={backRef}
                  >
                    Back
                  </Button>
                )}
                <Button
                  id="coachmark-primary-button"
                  size="sm"
                  iconDescription={
                    currentViewIndex < items.length - 1 ? 'Next' : 'Done'
                  }
                  onClick={
                    currentViewIndex < items.length - 1 ? onNext : handleClose
                  }
                  ref={primaryButtonRef}
                >
                  {currentViewIndex < items.length - 1 ? 'Next' : 'Done'}
                </Button>
              </div>
            </div>
          </Coachmark.ContentBody>
        </Coachmark.Content>
      </Coachmark>
    </Theme>
  );
};
