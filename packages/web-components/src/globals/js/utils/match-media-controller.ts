/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactiveController, ReactiveControllerHost } from 'lit';

export class MatchMediaController implements ReactiveController {
  private mql: MediaQueryList;
  private listener = (e: MediaQueryListEvent) => {
    this.matches = e.matches;
    this.host.requestUpdate();
  };

  matches: boolean;

  constructor(
    private host: ReactiveControllerHost,
    mediaQuery: string,
    defaultState = false
  ) {
    this.mql = window.matchMedia(mediaQuery);
    this.matches = defaultState;

    host.addController(this);
  }

  hostConnected() {
    this.matches = this.mql.matches;
    this.mql.addEventListener('change', this.listener);
  }

  hostDisconnected() {
    this.mql.removeEventListener('change', this.listener);
  }
}
