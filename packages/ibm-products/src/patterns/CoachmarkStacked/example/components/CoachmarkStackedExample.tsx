/**
 * @license
 *
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
import { Button, Theme, Link as CarbonLink } from '@carbon/react';
import {
  preview__CoachmarkTagline as CoachmarkTagline,
  preview__Coachmark as Coachmark,
} from '@carbon/ibm-products';
import { initCarousel } from '@carbon/utilities';
import { Idea } from '@carbon/react/icons';
import cx from 'classnames';

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

// eslint-disable-next-line react/prop-types
export const CoachmarkStackedExample = ({ prefix = 'c4p', ...args }) => {
  const carbonTheme = useCarbonTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [currentViewIndex, setCurrentViewIndex] = useState(-1);
  const [lastViewIndex, setLastViewIndex] = useState(-1);
  const [openId, setOpenId] = useState(0);
  const carouselInit = useRef(null);
  const [parentHeight, setParentHeight] = useState(0);
  const stackHomeContentRef = useRef(null);
  const stackedCoachmarkContentRefs = useRef([]);
  // Use ref maps to store button refs for each example separately
  const primaryButtonRefMap = useRef<{
    [key: number]: HTMLButtonElement | null;
  }>({});
  const backRefMap = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const carouselContainerRefs = useRef<{
    [key: number]: HTMLDivElement | null;
  }>({});
  const carouselItemsRef = useRef<{ [key: number]: (HTMLDivElement | null)[] }>(
    {}
  );
  const parentButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>(
    {}
  );
  const lastOpenIdRef = useRef<number>(0);

  const blockClass = `coachmark-stacked-home`;
  const stackedCoachmark = `stacked-coachmark`;
  const elementBlockClass = `stacked_element_content`;

  const items = [
    {
      id: 1,
      label: 'Example 1',
    },
    {
      id: 2,
      label: 'Example 2',
    },
    {
      id: 3,
      label: 'Example 3',
    },
  ];

  const nestedItems = [
    {
      id: 1,
      title: 'Short Coachmark',
      text: 'As small as it gets.',
      type: 'simple',
      button: (
        <Button
          ref={(el) => {
            primaryButtonRefMap.current[1] = el;
          }}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpenId(0);
          }}
        >
          Done
        </Button>
      ),
    },
    {
      id: 2,
      type: 'carousel',
      pages: [
        {
          id: '1',
          title: 'Mid-height Coachmark',
          text: (
            <>
              This should be about the same height as the base stack item.
              <br />
              <br />
              This is known as the enrichment phase. Enrichment supports you by
              emulating how an analyst would evaluate a finding—for example, by
              adding context, such as whether a certain piece of data is known
              to be malicious, or is linked...
            </>
          ),
          button: (
            <CarbonLink href="https://www.ibm.com">Learn more</CarbonLink>
          ),
        },
        {
          id: '2',
          title: 'Hello World',
          text: 'Link opens in new tab.',
          button: (
            <CarbonLink href="https://www.ibm.com" target="_blank">
              {' '}
              Learn more{' '}
            </CarbonLink>
          ),
        },
      ],
    },
    {
      id: 3,
      type: 'carousel',
      pages: [
        {
          id: '1',
          title: 'Tall Coachmark',
          text: (
            <>
              These alerts contain data gathered from your connected security
              systems.
            </>
          ),
        },
        {
          id: '2',
          title: 'Alerts contain evidence, known as artifacts',
          text: (
            <>
              These help to determine whether the alert is good or bad. And as
              alerts are added to a case, they become findings.
            </>
          ),
        },
        {
          id: '3',
          title: 'Findings are enriched with more information and context',
          text: (
            <>
              This is known as the enrichment phase. Enrichment supports you by
              emulating how an analyst would evaluate a finding—for example, by
              adding context, such as whether a certain piece of data is known
              to be malicious, or is linked to a known threat.
              <br />
              <br />
              Lets
              <br />
              <br />
              make
              <br />
              <br />
              this
              <br />
              <br />
              one
              <br />
              <br />
              really
              <br />
              <br />
              tall.
            </>
          ),
        },
        {
          id: '4',
          title: 'Next, the correlation process takes place',
          text: (
            <>
              Based on the results of the enrichment process, findings that are
              potentially related are grouped together, and then evaluated.
            </>
          ),
        },
        {
          id: '5',
          title:
            'Between enrichment and correlation, the severity of a case is determined',
          text: (
            <>
              And once you know the severity, you can easily choose which case
              to pick up next.
            </>
          ),
        },
      ],
    },
  ];

  const handleClose = (e?) => {
    e?.stopPropagation();
    // Don't close parent if a child is open
    if (openId > 0) {
      return;
    }
    setIsOpen(false);
  };

  const handleCloseCarousel = (e) => {
    e?.stopPropagation();
    setOpenId(0);
    carouselInit.current?.reset();
  };

  const handleTaglineClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const updateCarouselItemsTabIndex = useCallback(
    (itemId: number, activeIndex: number) => {
      const carouselItems = carouselItemsRef.current[itemId] || [];

      carouselItems.forEach((item, idx) => {
        if (!item) {
          return;
        }

        const isActive = idx === activeIndex;

        item.setAttribute('aria-hidden', String(!isActive));

        if (!isActive) {
          item.setAttribute('inert', '');
        } else {
          item.removeAttribute('inert');
        }

        item.removeAttribute('tabindex');
      });
    },
    []
  );

  useEffect(() => {
    if (openId > 0) {
      lastOpenIdRef.current = openId;
    } else if ((openId === 0 || openId === null) && lastOpenIdRef.current > 0) {
      // Child was closed, return focus to the parent button that opened it
      setTimeout(() => {
        const buttonToFocus = parentButtonRefs.current[lastOpenIdRef.current];
        if (buttonToFocus) {
          buttonToFocus.focus();
        }
        lastOpenIdRef.current = 0;
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId, updateCarouselItemsTabIndex]);

  useEffect(() => {
    // When parent coachmark closes, return focus to tagline button
    if (!isOpen) {
      setTimeout(() => {
        const taglineButton = document.getElementById('CoachmarkTagline');
        taglineButton?.focus();
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const activeCarouselContainer = carouselContainerRefs.current[openId];

    if (openId > 0 && activeCarouselContainer) {
      carouselInit.current = initCarousel(activeCarouselContainer, {
        onViewChangeStart: onViewChangeStart,
        onViewChangeEnd: onViewChangeEnd,
        useMaxHeight: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselInit, openId]);

  const onViewChangeStart = () => {};
  const onViewChangeEnd = (options) => {
    handleViewStackUpdate(options);
  };

  const handleViewStackUpdate = useCallback(
    ({ currentIndex, lastIndex }) => {
      setCurrentViewIndex(currentIndex);
      setLastViewIndex(lastIndex);

      // Update inert attribute for carousel items
      updateCarouselItemsTabIndex(openId, currentIndex);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openId, updateCarouselItemsTabIndex]
  );

  // Separate effect to handle focus after carousel navigation
  useEffect(() => {
    if (openId > 0 && currentViewIndex !== null) {
      // Use setTimeout with requestAnimationFrame to ensure DOM is fully updated
      setTimeout(() => {
        // Focus the primary button for this specific example
        const primaryButton = primaryButtonRefMap.current[openId];
        if (primaryButton) {
          primaryButton.focus();
        }
      }, 150);
    }
  }, [currentViewIndex, lastViewIndex, openId]);

  const onNext = (e) => {
    carouselInit?.current?.next();
  };

  const onPrev = (e) => {
    // Focus the primary button before navigation if Back button will be hidden
    if (currentViewIndex === 1) {
      const primaryButton = primaryButtonRefMap.current[openId];
      if (primaryButton) {
        primaryButton.focus();
      }
    }
    carouselInit?.current?.prev();
  };

  useLayoutEffect(() => {
    const getPopoverContentElement = (container: HTMLElement | null) =>
      container?.closest('.cds--popover-content') as HTMLElement | null;

    const stackHomeContent = getPopoverContentElement(
      stackHomeContentRef.current
    );

    if (!parentHeight) {
      if (stackHomeContent) {
        const height = stackHomeContent.clientHeight;
        if (height > 0) {
          setParentHeight(height);
        }
      }
      return;
    }

    if (stackHomeContent) {
      stackHomeContent.style.height = `${parentHeight}px`;
    }

    if (!isOpen || openId <= 0) {
      requestAnimationFrame(() => {
        if (stackHomeContent) {
          stackHomeContent.parentElement?.classList.remove(
            `${blockClass}--scaled-home`
          );
          stackHomeContent.parentElement?.classList.add(
            `${blockClass}--unscaled-home`
          );
          stackHomeContent.focus();
        }
      });
      return;
    }

    if (openId > 0 && isOpen && stackedCoachmarkContentRefs.current) {
      const container = stackedCoachmarkContentRefs.current[openId];
      const targetHome = getPopoverContentElement(container);

      if (stackHomeContent && targetHome) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const targetHomeHeight = targetHome.clientHeight;

            stackHomeContent.style.height = `calc(${targetHomeHeight}px + 16px)`;
            stackHomeContent.parentElement?.classList.add(
              `${blockClass}--scaled-home`
            );
            stackHomeContent.parentElement?.classList.remove(
              `${blockClass}--unscaled-home`
            );
            targetHome.focus();
          });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId, isOpen, parentHeight]);

  return (
    <Theme theme={carbonTheme}>
      <Coachmark
        open={isOpen}
        onClose={handleClose}
        align="top"
        {...args}
        className={`${blockClass}`}
        caret={false}
        selectorPrimaryFocus={
          openId === 0 && lastOpenIdRef.current === 0
            ? `.${blockClass}__nav-links li:first-child button`
            : undefined
        }
      >
        <CoachmarkTagline
          title="Why are there two types of severity scores?"
          closeIconDescription="Close"
          data-testid={'helloworld'}
          isOpen={isOpen}
          buttonProps={{ onClick: handleTaglineClick, id: 'CoachmarkTagline' }}
        ></CoachmarkTagline>
        <Coachmark.Content
          className={isOpen ? `--is-visible` : ''}
          ref={stackHomeContentRef}
          aria-label="Coachmark content"
        >
          <Coachmark.ContentHeader closeIconDescription="Close"></Coachmark.ContentHeader>
          <Coachmark.ContentBody className={`${blockClass}__body`}>
            <div className={`${blockClass}-element`}>
              <Idea size={20} className={`${blockClass}__icon-idea`} />
            </div>
            <div className={`${blockClass}__content`}>
              <h2 className={`${blockClass}__title`}>Example title</h2>
              <p className={`${blockClass}__body`}>
                This is an example of a description
              </p>
            </div>
            <ul className={`${blockClass}__nav-links`}>
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <li key={item.id}>
                    <Button
                      ref={(el) => {
                        parentButtonRefs.current[item.id] = el;
                      }}
                      kind="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setOpenId(item.id);
                      }}
                    >
                      {item.label}
                    </Button>
                  </li>
                </React.Fragment>
              ))}
            </ul>
            <Button
              size="sm"
              onClick={handleClose}
              className={`${blockClass}__footer`}
            >
              Close
            </Button>
            <br></br>
          </Coachmark.ContentBody>
        </Coachmark.Content>
      </Coachmark>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <Coachmark
            key={item.id}
            open={isOpen}
            onClose={() => {
              // Prevent closing during carousel navigation
              setOpenId(0);
            }}
            align="top"
            caret={false}
          >
            <Button
              style={{
                display: 'none',
              }}
            >
              {item.id}
            </Button>
            <Coachmark.Content
              ref={(el) => {
                if (el) {
                  stackedCoachmarkContentRefs.current[item.id] = el;
                }
              }}
              className={cx(`${elementBlockClass}`)}
            >
              <Coachmark.ContentHeader closeIconDescription="Close" />
              <Coachmark.ContentBody>
                {nestedItems
                  .filter((nested) => nested.id === item.id)
                  .map((nested) => {
                    if (nested.type === 'simple') {
                      return (
                        <div
                          key={nested.id}
                          className={`${stackedCoachmark}__content`}
                        >
                          <h2 className={`${stackedCoachmark}__title`}>
                            {nested.title}
                          </h2>
                          <p className={`${stackedCoachmark}__body`}>
                            {nested.text}
                          </p>
                          <div className={`${stackedCoachmark}__button`}>
                            {nested.button}
                          </div>
                        </div>
                      );
                    }
                    if (nested.type === 'carousel') {
                      return (
                        <React.Fragment key={nested.id}>
                          <div
                            ref={(el) => {
                              carouselContainerRefs.current[item.id] = el;
                            }}
                            className="exampleCarouselWrapper"
                          >
                            {nested.pages.map((page, index) => (
                              <div
                                key={page.id}
                                ref={(el) => {
                                  if (!carouselItemsRef.current[item.id]) {
                                    carouselItemsRef.current[item.id] = [];
                                  }
                                  carouselItemsRef.current[item.id][index] = el;
                                }}
                              >
                                <h2>{page.title}</h2>
                                <p>{page.text}</p>
                                <p>{page.button}</p>
                              </div>
                            ))}
                          </div>

                          <div className={'carouselControlWrapper__footer'}>
                            <div
                              className={
                                'carouselControlWrapper--controls-progress'
                              }
                            >
                              {nested.pages.map((page, index) => {
                                if (
                                  carouselInit.current?.getActiveItem?.()
                                    ?.index === index
                                ) {
                                  return (
                                    <span key={item.id}>
                                      {`${carouselInit.current?.getActiveItem?.()?.index + 1} / ${nested.pages.length}`}
                                    </span>
                                  );
                                }
                              })}
                            </div>
                            <div className={'carouselControlWrapper--buttons'}>
                              {currentViewIndex !== 0 && (
                                <Button
                                  ref={(el) => {
                                    backRefMap.current[item.id] = el;
                                  }}
                                  size="sm"
                                  iconDescription="Previous"
                                  kind="ghost"
                                  onClick={onPrev}
                                >
                                  Back
                                </Button>
                              )}
                              <Button
                                id="coachmark-primary-button"
                                size="sm"
                                iconDescription={
                                  currentViewIndex < nested.pages.length - 1
                                    ? 'Next'
                                    : 'Done'
                                }
                                onClick={
                                  currentViewIndex < nested.pages.length - 1
                                    ? onNext
                                    : handleCloseCarousel
                                }
                                ref={(el) => {
                                  primaryButtonRefMap.current[item.id] = el;
                                }}
                              >
                                {currentViewIndex < nested.pages.length - 1
                                  ? 'Next'
                                  : 'Done'}
                              </Button>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    }
                    return null;
                  })}
              </Coachmark.ContentBody>
            </Coachmark.Content>
          </Coachmark>
        );
      })}
    </Theme>
  );
};
