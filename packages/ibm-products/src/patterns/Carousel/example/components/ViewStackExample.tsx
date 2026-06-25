/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@carbon/react';
import { initCarousel } from '@carbon/utilities';
import { PlayingCard } from './PlayingCard';

export const ViewStackExample = () => {
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [lastViewIndex, setLastViewIndex] = useState(-1);
  const [totalViews, setTotalViews] = useState(-1);
  const [viewStackHistory, setViewStackHistory] = useState<any[]>([]);

  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const viewStackExampleRef = useRef<any>(null);

  useEffect(() => {
    if (carouselContainerRef.current) {
      viewStackExampleRef.current = initCarousel(carouselContainerRef.current, {
        onViewChangeStart: onViewChangeStart,
        onViewChangeEnd: onViewChangeEnd,
        excludeSwipeSupport: false,
      });
    }

    return () => {
      if (viewStackExampleRef.current?.destroyEvents) {
        viewStackExampleRef.current.destroyEvents();
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
    ({ currentIndex, lastIndex, totalViews, historyStack }: any) => {
      setCurrentViewIndex(currentIndex);
      setLastViewIndex(lastIndex);
      setTotalViews(totalViews);
      setViewStackHistory(historyStack);
    },
    []
  );

  const cards = [
    { label: '2', title: 'Card 2' },
    { label: '3', title: 'Card 3' },
    { label: '4', title: 'Card 4' },
    { label: '5', title: 'Card 5' },
    { label: '6', title: 'Card 6' },
    { label: '7', title: 'Card 7' },
    { label: '8', title: 'Card 8' },
    { label: '9', title: 'Card 9' },
    { label: '10', title: 'Card 10' },
    { label: 'J', title: 'Jack' },
    { label: 'Q', title: 'Queen' },
    { label: 'K', title: 'King' },
    { label: 'A', title: 'Ace' },
  ];

  return (
    <div className="ViewStackStoryExample">
      <div className="ViewStackStoryHistory">
        <div className="ViewStackStoryHistoryRow">{`Current Index: ${currentViewIndex}`}</div>
        <div className="ViewStackStoryHistoryRow">{`Last Index: ${lastViewIndex}`}</div>
        <div className="ViewStackStoryHistoryRow">{`Total Views: ${totalViews}`}</div>
        <label
          className="ViewStackStoryHistoryEntriesLabel"
          htmlFor="historyContainer"
        >
          History:
        </label>
        <ol
          id="historyContainer"
          className="ViewStackStoryHistoryEntries"
          type="1"
        >
          {viewStackHistory &&
            viewStackHistory.map((el, idx) => (
              <li key={idx} className="ViewStackStoryHistoryEntry">
                {`[${idx}] - id: ${el.id}, title: ${el.title}`}
              </li>
            ))}
        </ol>
      </div>
      <div
        className="PlayingCardViewStack playingCardContainer"
        ref={carouselContainerRef}
      >
        {cards.map((card) => (
          <div key={card.label} title={card.title}>
            <PlayingCard label={card.label} />
          </div>
        ))}
      </div>
      <div className="ViewStackStoryControls">
        {cards.map((card, index) => (
          <Button
            key={card.label}
            size="sm"
            kind="ghost"
            onClick={() => viewStackExampleRef.current?.goToIndex(index)}
          >
            {card.title}
          </Button>
        ))}
        <Button
          size="sm"
          kind="secondary"
          disabled={currentViewIndex === lastViewIndex}
          onClick={() => viewStackExampleRef.current?.next()}
        >
          Increment
        </Button>
        <Button
          size="sm"
          kind="secondary"
          disabled={viewStackHistory.length === 1}
          onClick={() => viewStackExampleRef.current?.prev()}
        >
          Back
        </Button>
        <Button
          size="sm"
          kind="secondary"
          disabled={viewStackHistory.length === 1}
          onClick={() => viewStackExampleRef.current?.reset()}
        >
          Home
        </Button>
      </div>
    </div>
  );
};
