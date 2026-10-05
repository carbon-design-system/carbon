/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Theme } from '@carbon/react';
import {
  preview__CoachmarkBeacon as CoachmarkBeacon,
  preview__Coachmark as Coachmark,
} from '@carbon/ibm-products';
import { InitCarousel, initCarousel } from '@carbon/utilities';
import sampleImage from '../assets/sample-image.png';

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

export const CoachmarkOverlayElementsExample = (args) => {
  const carbonTheme = useCarbonTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [currentViewIndex, setCurrentViewIndex] = useState(-1);
  const [lastViewIndex, setLastViewIndex] = useState(-1);
  //prettier-ignore
  const carouselInit = useRef<InitCarousel>(null);
  //prettier-ignore
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  //prettier-ignore
  const backRef = useRef<HTMLButtonElement>(null);
  const beaconButtonRef = useRef<HTMLButtonElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);
  const carouselItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const items = [
    {
      id: 1,
      title: 'Example 1',
      text: 'This is an example description.',
    },
    {
      id: 2,
      title: 'Example 2',
      text: 'This is an example description.',
    },
  ];

  const handleClose = () => {
    setIsOpen(false);
    carouselInit?.current?.reset();
    // Return focus to the beacon button after closing
    setTimeout(() => {
      beaconButtonRef.current?.focus();
    }, 0);
  };

  const handleBeaconClick = () => {
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
    if (isOpen && carouselContainerRef.current) {
      // Destroy stale event listeners from the previous instance before
      // re-initializing, otherwise old transitionend listeners fire with a
      // stale viewIndexStack and reset currentViewIndex back to 0.
      setCurrentViewIndex(0);
      setLastViewIndex(0);
      carouselInit.current?.destroyEvents();
      carouselInit.current = initCarousel(carouselContainerRef.current, {
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
      <main className="coachmark-overlay-example">
      <Coachmark
        position={{ x: 151, y: 355 }}
        open={isOpen}
        onClose={handleClose}
        align="top"
        selectorPrimaryFocus="#coachmark-primary-button"
        {...args}
      >
        <CoachmarkBeacon
          label="Show information"
          buttonProps={{
            onClick: handleBeaconClick,
            id: 'CoachmarkBtn',
            ref: beaconButtonRef,
          }}
        ></CoachmarkBeacon>
        <Coachmark.Content aria-label="Coachmark content">
          <Coachmark.ContentHeader closeIconDescription="Close"></Coachmark.ContentHeader>
          <Coachmark.ContentBody>
            <div>
              <img
                src={sampleImage}
                alt="Example illustration"
                style={{
                  width: '100%',
                  marginBottom: '1rem',
                }}
              />
            </div>
            <div ref={carouselContainerRef} className="exampleCarouselWrapper">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    carouselItemsRef.current[index] = el;
                  }}
                >
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
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
      </main>
    </Theme>
  );
};
