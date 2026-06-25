/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Column, FlexGrid, Row } from '@carbon/react';
import { ArrowLeft, ArrowRight } from '@carbon/react/icons';
import { initCarousel } from '@carbon/utilities';

export const CarouselExample = () => {
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [lastViewIndex, setLastViewIndex] = useState(-1);

  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselInit = useRef<any>(null);

  const items = [
    {
      id: 1,
      text: 'Item One Description',
      image:
        'https://assets.ibm.com/is/image/ibm/adobestock_723170015?$original$',
    },
    {
      id: 2,
      text: 'Item Two Description',
      image:
        'https://assets.ibm.com/is/image/ibm/adobestock_285773476?$original$',
    },
    {
      id: 3,
      text: 'Item Three Description',
      image:
        'https://assets.ibm.com/is/image/ibm/adobestock_438396946?$original$',
    },
    {
      id: 4,
      text: 'Item Four Description',
      image:
        'https://assets.ibm.com/is/image/ibm/adobestock_268221428?$original$',
    },
  ];

  useEffect(() => {
    if (carouselContainerRef.current) {
      carouselInit.current = initCarousel(carouselContainerRef.current, {
        onViewChangeStart: onViewChangeStart,
        onViewChangeEnd: onViewChangeEnd,
      });
    }

    return () => {
      if (carouselInit.current?.destroyEvents) {
        carouselInit.current.destroyEvents();
      }
    };
  }, []);

  const onViewChangeStart = () => {
    // Handle view change start if needed
  };

  const onViewChangeEnd = (options: any) => {
    handleViewStackUpdate(options);
  };

  const handleViewStackUpdate = useCallback(
    ({ currentIndex, lastIndex }: any) => {
      setCurrentViewIndex(currentIndex);
      setLastViewIndex(lastIndex);
    },
    []
  );

  const onNext = () => {
    carouselInit.current?.next();
  };

  const onPrev = () => {
    carouselInit.current?.prev();
  };

  return (
    <FlexGrid>
      {/* Slide Row */}
      <Row>
        <Column>
          <div ref={carouselContainerRef} className="exampleCarouselWrapper">
            {items.map((item) => (
              <div key={item.id} style={{ height: '250px' }}>
                <img
                  src={item.image}
                  alt={`Item ${item.id}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    marginBottom: '1rem',
                  }}
                />
              </div>
            ))}
          </div>
        </Column>
      </Row>

      {/* Control Row */}
      <Row className="carouselControlWrapper">
        <Column lg={2} md={1} sm={1}>
          <Button
            kind="ghost"
            iconDescription="Previous"
            hasIconOnly
            renderIcon={ArrowLeft}
            onClick={onPrev}
            disabled={currentViewIndex === 0}
          />
        </Column>
        <Column lg={12} md={6} sm={2}>
          <div className="carouselIndicators">
            {items.map((item, index) => {
              return (
                <div
                  className={
                    carouselInit.current?.getActiveItem?.()?.index === index
                      ? 'activeIndicator'
                      : ''
                  }
                  key={item.id}
                ></div>
              );
            })}
          </div>
        </Column>
        <Column lg={2} md={1} sm={1}>
          <Button
            kind="ghost"
            iconDescription="Next"
            hasIconOnly
            renderIcon={ArrowRight}
            onClick={onNext}
            disabled={lastViewIndex === currentViewIndex}
          />
        </Column>
      </Row>
    </FlexGrid>
  );
};
