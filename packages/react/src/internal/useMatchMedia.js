/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { canUseDOM } from './ExecutionEnvironment';

// Provide ability to explicitly enable/disable media rules
// when server-side rendering
const MatchMediaContext = createContext({});

let _matchMedia = null;

export default function useMatchMedia(queries) {
  const matchMediaRef = useRef(_matchMedia);
  const matchMediaDefaults = useContext(MatchMediaContext);
  const [matches, updateMatches] = useState(
    queries.map(query => {
      if (matchMediaDefaults[query] !== undefined) {
        return matchMediaDefaults[query];
      }
      if (!canUseDOM) {
        return true;
      }
      return window.matchMedia(query).matches;
    })
  );

  function getMatchMedia() {
    if (!matchMediaRef.current) {
      matchMediaRef.current = _matchMedia = new MatchMedia();
    }
    return matchMediaRef.current;
  }

  useEffect(() => {
    if (!canUseDOM) {
      return;
    }

    const matchMedia = getMatchMedia();
    const unsubscribers = queries.map((query, index) =>
      matchMedia.subscribe(query, event => {
        updateMatches(matches => {
          if (matches[index] === event.matches) {
            return matches;
          }
          return [
            ...matches.slice(0, index),
            event.matches,
            ...matches.slice(index + 1, matches.length),
          ];
        });
      })
    );

    return () => {
      unsubscribers.forEach(unsubscribe => {
        unsubscribe();
      });
    };
  }, queries); // eslint-disable-line react-hooks/exhaustive-deps

  return matches;
}

class MatchMedia {
  constructor() {
    this._media = {};
  }

  subscribe(query, callback) {
    if (!this._media[query]) {
      const mediaQueryList = window.matchMedia(query);
      const subscribers = [];

      // eslint-disable-next-line no-inner-declarations
      function listener(event) {
        subscribers.forEach(subscriber => {
          subscriber(event);
        });
      }

      mediaQueryList.addListener(listener);
      this._media[query] = {
        listener,
        mediaQueryList,
        subscribers,
      };
    }

    const { mediaQueryList, listener, subscribers } = this._media[query];
    subscribers.push(callback);
    callback(mediaQueryList);

    return () => {
      subscribers.splice(subscribers.indexOf(callback), 1);
      if (subscribers.length === 0) {
        mediaQueryList.removeListener(listener);
        delete this._media[query];
      }
    };
  }
}
