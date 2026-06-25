/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import figma, { html } from '@figma/code-connect/html';

// Interstitial screen overlay
figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728%3A642842',
  {
    variant: { Type: 'Title + steps' },
    props: {
      headerTitle: figma.textContent('Title'),
      headerSubTitle: figma.boolean('Show Subtitle', {
        true: figma.textContent('Subtitle'),
        false: '',
      }),
      slot: figma.boolean('Slot', {
        true: figma.children('Slot 1'),
        false: undefined,
      }),
      stepTitle: figma.boolean('Steps', {
        true: 'Step',
        false: undefined,
      }),
      stepContent: figma.boolean('Steps', {
        true: html`<c4p-interstitial-screen-body-item id="2" stepTitle="Step">
            <!-- add markup for Step 2 -->
          </c4p-interstitial-screen-body-item>
          <c4p-interstitial-screen-body-item id="3" stepTitle="Step">
            <!-- add markup for Step 3 -->
          </c4p-interstitial-screen-body-item>`,
        false: undefined,
      }),
      title: figma.textContent('Use case-specific heading'),
      description: figma.textContent(
        'We take the triage phase off your hands early on. We automate investigations, and make sure you can see the source of all your data. And we use AI to suggest findings you might not catch on your own. With fewer blind spots for the hackers to hide in, you can see the full picture, and take your defense to the next level.'
      ),
      image: figma.children('Aspect ratio'),
    },
    example: (props) =>
      html`<c4p-interstitial-screen>
        <c4p-interstitial-screen-header
          header-title=${props.headerTitle}
          header-subtitle=${props.headerSubTitle}
        ></c4p-interstitial-screen-header>
        <c4p-interstitial-screen-body>
          <c4p-interstitial-screen-body-item
            id="1"
            stepTitle=${props.stepTitle}
          >
            <div
              role="complementary"
              class="c4p--interstitial-screen-view"
              aria-label="Use case-specific heading"
            >
              <section class="c4p--interstitial-screen-view-module">
                <h1 class="c4p--interstitial-screen-view-module--heading">
                  ${props.title}
                </h1>
                <p class="c4p--interstitial-screen-view-module--body">
                  ${props.description}
                </p>

                ${props.slot}
              </section>
              ${props.image}
            </div>
          </c4p-interstitial-screen-body-item>
          ${props.stepContent}
        </c4p-interstitial-screen-body>
        <c4p-interstitial-screen-footer></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/interstitial-screen/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728%3A642842',
  {
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
    example: (props) =>
      html`<c4p-interstitial-screen>
        <c4p-interstitial-screen-header></c4p-interstitial-screen-header>
        <c4p-interstitial-screen-body>
          <c4p-interstitial-screen-body-item id="1">
            <div
              role="complementary"
              class="c4p--interstitial-screen-view"
              aria-label="Use case-specific heading"
            >
              <section class="c4p--interstitial-screen-view-module">
                <h1 class="c4p--interstitial-screen-view-module--heading">
                  ${props.title}
                </h1>
                <p class="c4p--interstitial-screen-view-module--body">
                  ${props.description}
                </p>
                ${props.slot}
              </section>
              ${props.image}
            </div>
          </c4p-interstitial-screen-body-item>
        </c4p-interstitial-screen-body>
        <c4p-interstitial-screen-footer></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/interstitial-screen/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728%3A642842',
  {
    variant: { Type: 'Steps only' },
    example: (props) =>
      html`<c4p-interstitial-screen>
        <c4p-interstitial-screen-header></c4p-interstitial-screen-header>
        <c4p-interstitial-screen-body>
          <!--add your custom progress indicator and steps markup here -->
        </c4p-interstitial-screen-body>
        <c4p-interstitial-screen-footer></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/interstitial-screen/index.js'",
    ],
  }
);

// Interstitial screen full page
figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642995',
  {
    variant: { Type: 'Title + steps' },
    props: {
      headerTitle: figma.textContent('Personalize your experience'),
      headerSubTitle: figma.boolean('Subtitle', {
        true: figma.textContent('Subtitle'),
        false: undefined,
      }),
      slot: figma.boolean('Slot', {
        true: figma.children('Slot 1'),
        false: undefined,
      }),
      stepTitle: figma.boolean('Steps', {
        true: 'Step',
        false: undefined,
      }),
      stepContent: figma.boolean('Steps', {
        true: html`<c4p-interstitial-screen-body-item id="2" stepTitle="Step">
            <!-- add markup for Step 2 -->
          </c4p-interstitial-screen-body-item>
          <c4p-interstitial-screen-body-item id="3" stepTitle="Step">
            <!-- add markup for Step 3 -->
          </c4p-interstitial-screen-body-item>`,
        false: undefined,
      }),
      title: figma.textContent('Use case-specific heading'),
      description: figma.textContent(
        'We take the triage phase off your hands early on. We automate investigations, and make sure you can see the source of all your data. And we use AI to suggest findings you might not catch on your own. With fewer blind spots for the hackers to hide in, you can see the full picture, and take your defense to the next level.'
      ),
      image: figma.children('Aspect ratio'),
    },
    example: (props) =>
      html`<c4p-interstitial-screen fullscreen>
        <c4p-interstitial-screen-header
          header-title=${props.headerTitle}
          header-subtitle=${props.headerSubTitle}
        ></c4p-interstitial-screen-header>
        <c4p-interstitial-screen-body>
          <c4p-interstitial-screen-body-item
            id="1"
            stepTitle=${props.stepTitle}
          >
            <div
              role="complementary"
              class="c4p--interstitial-screen-view"
              aria-label="Use case-specific heading"
            >
              <section class="c4p--interstitial-screen-view-module">
                <h1 class="c4p--interstitial-screen-view-module--heading">
                  ${props.title}
                </h1>
                <p class="c4p--interstitial-screen-view-module--body">
                  ${props.description}
                </p>

                ${props.slot}
              </section>
              ${props.image}
            </div>
          </c4p-interstitial-screen-body-item>
          ${props.stepContent}
        </c4p-interstitial-screen-body>
        <c4p-interstitial-screen-footer></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/interstitial-screen/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642995',
  {
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
    example: (props) =>
      html`<c4p-interstitial-screen fullscreen>
        <c4p-interstitial-screen-body>
          <c4p-interstitial-screen-body-item id="1">
            <div
              role="complementary"
              class="c4p--interstitial-screen-view"
              aria-label="Use case-specific heading"
            >
              <section class="c4p--interstitial-screen-view-module">
                <h1 class="c4p--interstitial-screen-view-module--heading">
                  ${props.title}
                </h1>
                <p class="c4p--interstitial-screen-view-module--body">
                  ${props.description}
                </p>
                ${props.slot}
              </section>
              ${props.image}
            </div>
          </c4p-interstitial-screen-body-item>
        </c4p-interstitial-screen-body>
        <c4p-interstitial-screen-footer></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/interstitial-screen/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642995',
  {
    variant: { Type: 'Steps only' },
    example: (props) =>
      html`<c4p-interstitial-screen fullscreen>
        <c4p-interstitial-screen-body>
          <!--add your custom progress indicator and steps markup here -->
        </c4p-interstitial-screen-body>
        <c4p-interstitial-screen-footer></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/interstitial-screen/index.js'",
    ],
  }
);
