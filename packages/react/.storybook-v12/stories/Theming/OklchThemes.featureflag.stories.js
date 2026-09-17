/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Layer } from '../../../src/components/Layer';
import './OklchThemes.stories.scss';

export default {
  title: 'Preview/Theming/V12 OKLCH themes',
  component: Layer,
  parameters: {
    controls: {
      disable: true,
    },
  },
};

// Reads the computed CSS custom property value from the nearest DOM ancestor.
function useTokenValue(ref, token) {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (!ref.current) return;
    const raw = getComputedStyle(ref.current)
      .getPropertyValue(`--cds-${token}`)
      .trim();
    setValue(raw);
  });
  return value;
}

function TokenRow({ label, token }) {
  const ref = useRef(null);
  const value = useTokenValue(ref, token);
  return (
    <div ref={ref} className="v12-oklch-token-row">
      <span className="v12-oklch-token-name">--cds-{token}</span>
      <span className="v12-oklch-token-value">{value}</span>
    </div>
  );
}

function LayerContent({ level }) {
  return (
    <div className="v12-oklch-layer__content">
      <h3>Layer {level}</h3>
      <p>Contextual token values active at this layer level:</p>

      <div className="v12-oklch-token-table">
        <TokenRow label="Surface" token="layer" />
        <TokenRow label="Field" token="field" />
        <TokenRow label="Accent" token="layer-accent" />
        <TokenRow label="Helper text" token="text-helper-01" />
        <TokenRow label="Border strong" token="border-strong" />
        <TokenRow label="Border subtle" token="border-subtle" />
        <TokenRow label="Skeleton" token="skeleton-background-01" />
      </div>

      <label>
        Project name
        <input placeholder="Enter a name" />
        <small>Contextual helper text</small>
      </label>
      <div className="v12-oklch-layer__accent">Contextual accent</div>
      <div className="v12-oklch-layer__skeleton" aria-label="Skeleton sample">
        <span />
        <span />
      </div>
    </div>
  );
}

function ThemePreview({ mode }) {
  return (
    <section className="v12-oklch-theme" data-carbon-theme={mode}>
      <header>
        <h2>{mode === 'light' ? 'Light theme' : 'Dark theme'}</h2>
        <p>Generated OKLCH theme · H 262 · C 0.004</p>
      </header>
      <Layer withBackground>
        <LayerContent level="01" />
        <Layer withBackground>
          <LayerContent level="02" />
        </Layer>
      </Layer>
    </section>
  );
}

export const OklchGeneratedThemes = () => (
  <>
    <aside className="v12-oklch-notice">
      <strong>Experimental V12 generated-token preview</strong>
      <span>
        This story uses generated Style Dictionary Sass output and the existing
        Layer cascade. It does not contain hardcoded theme colors. Token values
        shown are read live from computed CSS custom properties.
      </span>
    </aside>
    <div className="v12-oklch-comparison">
      <ThemePreview mode="light" />
      <ThemePreview mode="dark" />
    </div>
  </>
);
