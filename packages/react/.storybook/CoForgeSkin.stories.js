/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Button from '../src/components/Button';
import Link from '../src/components/Link';
import TextInput from '../src/components/TextInput';
import { Layer } from '../src/components/Layer';
import CodeSnippet from '../src/components/CodeSnippet';
import { Stack } from '../src/components/Stack';
import '../src/components/Layer/Layer-story.scss';

export default {
  title: 'CoForge/Colour bench',
  tags: ['!autodocs'],
  parameters: {
    controls: { hideNoControlsWarning: true },
    chromatic: { disableSnapshot: true },
  },
  globals: {
    coforgeSkin: 'on',
    backgrounds: { value: 'white' },
  },
};

const snippet = `const a = 1;
function hello() {
  return a;
}`;

export const ColourRoles = () => (
  <Stack gap={6}>
    <p data-testid="coforge-copy">
      Page should be bone. This sentence is ink. Coral is not used here.
    </p>
    <Stack gap={3} orientation="horizontal">
      <Button size="lg" data-testid="coforge-btn-lg">
        Start the conversation
      </Button>
      <Button size="sm" data-testid="coforge-btn-sm">
        Small
      </Button>
    </Stack>
    <Link href="#bench" data-testid="coforge-link">
      Coral-text link
    </Link>
    <TextInput
      id="coforge-field"
      labelText="Field stays Carbon gray"
      data-testid="coforge-input"
    />
    <Layer withBackground>
      <div className="example-layer-test-component-no-background">layer 01</div>
      <Layer withBackground>
        <div className="example-layer-test-component-no-background">
          layer 02
        </div>
        <Layer withBackground>
          <div className="example-layer-test-component-no-background">
            layer 03
          </div>
        </Layer>
      </Layer>
    </Layer>
    <CodeSnippet type="multi" data-testid="coforge-snippet">
      {snippet}
    </CodeSnippet>
  </Stack>
);
