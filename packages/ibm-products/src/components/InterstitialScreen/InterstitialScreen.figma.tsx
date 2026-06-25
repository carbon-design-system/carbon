/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { InterstitialScreen } from './InterstitialScreen';
import { InterstitialScreenView } from './InterstitialScreenView';

import figma from '@figma/code-connect';

const connectionURL =
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728%3A642842';

figma.connect(InterstitialScreen, connectionURL, {
  variant: { Type: 'Title + steps' },
  props: {
    headerTitle: figma.textContent('Title'),
    headerSubTitle: figma.boolean('Show Subtitle', {
      true: figma.textContent('Subtitle'),
      false: undefined,
    }),
    hideProgressIndicator: figma.boolean('Steps', {
      true: undefined,
      false: true,
    }),
    contentRenderer: figma.boolean('Steps', {
      true: (internalConfig) => {
        return (
          <>
            <InterstitialScreenView stepTitle="Step">
              <h3>Use case-specific heading</h3>
              <p>
                We take the triage phase off your hands early on. We automate
                investigations, and make sure you can see the source of all your
                data. And we use AI to suggest findings you might not catch on
                your own. With fewer blind spots for the hackers to hide in, you
                can see the full picture, and take your defense to the next
                level.
              </p>
            </InterstitialScreenView>
            <InterstitialScreenView stepTitle="Step">
              <div>steps contents here</div>
            </InterstitialScreenView>
            <InterstitialScreenView stepTitle="Step">
              <div>steps contents here</div>
            </InterstitialScreenView>
          </>
        );
      },
      false: (internalConfig) => {
        return (
          <InterstitialScreenView>
            <h3>Use case-specific heading</h3>
            <p>
              We take the triage phase off your hands early on. We automate
              investigations, and make sure you can see the source of all your
              data. And we use AI to suggest findings you might not catch on
              your own. With fewer blind spots for the hackers to hide in, you
              can see the full picture, and take your defense to the next level.
            </p>
          </InterstitialScreenView>
        );
      },
    }),
  },
  example: (props) => (
    <InterstitialScreen open>
      <InterstitialScreen.Header
        headerTitle={props.headerTitle}
        headerSubTitle={props.headerSubTitle}
        hideProgressIndicator={props.hideProgressIndicator}
      ></InterstitialScreen.Header>
      <InterstitialScreen.Body
        contentRenderer={props.contentRenderer}
      ></InterstitialScreen.Body>
      <InterstitialScreen.Footer />
    </InterstitialScreen>
  ),
});

figma.connect(InterstitialScreen, connectionURL, {
  variant: { Type: 'No Steps' },
  props: {
    title: figma.textContent('Use case-specific heading'),
    description: figma.textContent(
      'We take the triage phase off your hands early on. We automate investigations, and make sure you can see the source of all your data. And we use AI to suggest findings you might not catch on your own. With fewer blind spots for the hackers to hide in, you can see the full picture, and take your defense to the next level.'
    ),
    slot: figma.boolean('Slot', {
      true: figma.children('Slot 1'),
      false: undefined,
    }),
    image: figma.children('Aspect ratio'),
  },
  example: (props) => (
    <InterstitialScreen open>
      <InterstitialScreen.Header
        hideProgressIndicator
      ></InterstitialScreen.Header>
      <InterstitialScreen.Body>
        <InterstitialScreenView>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          {props.image}
          {props.slot}
        </InterstitialScreenView>
      </InterstitialScreen.Body>
      <InterstitialScreen.Footer />
    </InterstitialScreen>
  ),
});

figma.connect(InterstitialScreen, connectionURL, {
  variant: { Type: 'Steps only' },
  props: {
    contentRenderer: figma.boolean('Steps', {
      true: (internalConfig) => {
        return (
          <div>
            Your custom progress indicator and step contents markup here
          </div>
        );
      },
      false: undefined,
    }),
  },
  example: (props) => (
    <InterstitialScreen open>
      <InterstitialScreen.Header
        hideProgressIndicator
      ></InterstitialScreen.Header>
      <InterstitialScreen.Body
        contentRenderer={props.contentRenderer}
      ></InterstitialScreen.Body>
      <InterstitialScreen.Footer />
    </InterstitialScreen>
  ),
});

const fullPageConnectionURL =
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642995';

figma.connect(InterstitialScreen, fullPageConnectionURL, {
  variant: { Type: 'Title + steps' },
  props: {
    headerTitle: figma.textContent('Personalize your experience'),
    headerSubTitle: figma.boolean('Subtitle', {
      true: figma.textContent('Subtitle'),
      false: undefined,
    }),
    hideProgressIndicator: figma.boolean('Steps', {
      true: undefined,
      false: true,
    }),
    title: figma.textContent('Use case-specific heading'),
    description: figma.textContent(
      'We take the triage phase off your hands early on. We automate investigations, and make sure you can see the source of all your data. And we use AI to suggest findings you might not catch on your own. With fewer blind spots for the hackers to hide in, you can see the full picture, and take your defense to the next level.'
    ),
    image: figma.children('Aspect ratio'),
    slot: figma.boolean('Slot', {
      true: figma.children('Slot 1'),
      false: undefined,
    }),
    steps: figma.boolean('Steps', {
      true: (
        <InterstitialScreenView stepTitle="Step">
          <div>step content markup here</div>
        </InterstitialScreenView>
      ),
      false: undefined,
    }),
  },
  example: (props) => (
    <InterstitialScreen open isFullScreen>
      <InterstitialScreen.Header
        headerTitle={props.headerTitle}
        headerSubTitle={props.headerSubTitle}
        hideProgressIndicator={props.hideProgressIndicator}
      ></InterstitialScreen.Header>
      <InterstitialScreen.Body>
        <InterstitialScreenView>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          {props.image}
          {props.slot}
        </InterstitialScreenView>
        {props.steps}
      </InterstitialScreen.Body>
      <InterstitialScreen.Footer />
    </InterstitialScreen>
  ),
});

figma.connect(InterstitialScreen, fullPageConnectionURL, {
  variant: { Type: 'No steps' },
  props: {
    title: figma.textContent('Use case-specific heading'),
    description: figma.textContent(
      'We take the triage phase off your hands early on. We automate investigations, and make sure you can see the source of all your data. And we use AI to suggest findings you might not catch on your own. With fewer blind spots for the hackers to hide in, you can see the full picture, and take your defense to the next level.'
    ),
    slot: figma.boolean('Slot', {
      true: figma.children('Slot 1'),
      false: undefined,
    }),
    image: figma.children('Aspect ratio'),
  },
  example: (props) => (
    <InterstitialScreen open isFullScreen>
      <InterstitialScreen.Header
        hideProgressIndicator
      ></InterstitialScreen.Header>
      <InterstitialScreen.Body>
        <InterstitialScreenView>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          {props.image}
          {props.slot}
        </InterstitialScreenView>
      </InterstitialScreen.Body>
      <InterstitialScreen.Footer />
    </InterstitialScreen>
  ),
});

figma.connect(InterstitialScreen, fullPageConnectionURL, {
  variant: { Type: 'Steps only' },
  props: {
    contentRenderer: figma.boolean('Steps', {
      true: (internalConfig) => {
        return (
          <div>
            Your custom progress indicator and step contents markup here
          </div>
        );
      },
      false: undefined,
    }),
  },
  example: (props) => (
    <InterstitialScreen open isFullScreen>
      <InterstitialScreen.Header
        hideProgressIndicator
      ></InterstitialScreen.Header>
      <InterstitialScreen.Body
        contentRenderer={props.contentRenderer}
      ></InterstitialScreen.Body>
      <InterstitialScreen.Footer />
    </InterstitialScreen>
  ),
});
