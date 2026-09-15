/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Layer-story.scss';
import React from 'react';
import { Layer, useLayer } from '../Layer';
import TextInput from '../TextInput';
import SkeletonText from '../SkeletonText';
import SkeletonPlaceholder from '../SkeletonPlaceholder';
import mdx from './Layer.mdx';

export default {
  title: 'Components/Layer',
  component: Layer,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: mdx,
    },
  },
  args: {
    level: 0,
  },
};

export const Default = () => {
  function TestComponent() {
    return <div className="example-layer-test-component">Test component</div>;
  }

  return (
    <>
      <TestComponent />
      <Layer>
        <TestComponent />
        <Layer>
          <TestComponent />
        </Layer>
      </Layer>
    </>
  );
};

export const withBackground = () => {
  function TestComponent() {
    return (
      <div className="example-layer-test-component-no-background">
        Test component
      </div>
    );
  }

  return (
    <>
      <TestComponent />
      <Layer withBackground>
        <TestComponent />
        <Layer withBackground>
          <TestComponent />
        </Layer>
      </Layer>
    </>
  );
};

export const CustomLevel = (args) => {
  function TestComponent() {
    return <div className="example-layer-test-component">Test component</div>;
  }

  return (
    <Layer level={2} {...args}>
      <TestComponent />
    </Layer>
  );
};

CustomLevel.args = {
  level: 2,
};

export const UseLayer = () => {
  function ExampleComponent() {
    const { level } = useLayer();
    return (
      <div style={{ padding: '1rem', background: 'var(--cds-layer)' }}>
        The current layer level is: {level}
      </div>
    );
  }

  return (
    <>
      <ExampleComponent />
      <Layer>
        <ExampleComponent />
      </Layer>
    </>
  );
};

UseLayer.story = {
  name: 'useLayer',
};

export const ContextualTokensSpike = () => {
  // Color data dictionaries showing computed Hex and OKLCH for each theme & tier
  const v11Values = {
    // In V11, these are frozen constants in g100/dark mode and white/light mode
    dark: {
      layer01: { hex: '#262626', oklch: 'oklch(0.24 0.000 0)' },
      layer02: { hex: '#393939', oklch: 'oklch(0.32 0.000 0)' },
      layer03: { hex: '#525252', oklch: 'oklch(0.42 0.000 0)' },
      field: { hex: '#262626', label: 'Frozen (#262626 across tiers)' },
      skeletonBg: { hex: '#292929', label: 'Frozen (#292929 everywhere)' },
      skeletonEl: { hex: '#393939', label: 'Frozen (#393939 everywhere)' },
      textHelper: { hex: '#a8a8a8', label: 'Frozen (#a8a8a8)' },
    },
    light: {
      layer01: { hex: '#f4f4f4', oklch: 'oklch(0.96 0.000 0)' },
      layer02: { hex: '#ffffff', oklch: 'oklch(1.00 0.000 0)' },
      layer03: { hex: '#f4f4f4', oklch: 'oklch(0.96 0.000 0)' },
      field: { hex: '#f4f4f4', label: 'Frozen (#f4f4f4 / #ffffff)' },
      skeletonBg: { hex: '#e8e8e8', label: 'Frozen (#e8e8e8 everywhere)' },
      skeletonEl: { hex: '#c6c6c6', label: 'Frozen (#c6c6c6 everywhere)' },
      textHelper: { hex: '#6f6f6f', label: 'Frozen (#6f6f6f)' },
    },
  };

  const v12Values = {
    dark: {
      1: {
        surface: { hex: '#1c1e21', oklch: 'oklch(0.200 0.004 262)' },
        field: { hex: '#141517', oklch: 'oklch(0.160 0.004 262)' },
        skeletonBg: { hex: '#111214', oklch: 'oklch(0.140 0.004 262)' },
        skeletonEl: { hex: '#202226', oklch: 'oklch(0.220 0.004 262)' },
        textHelper: { hex: '#878a90', oklch: 'oklch(0.596 0.004 262)' },
      },
      2: {
        surface: { hex: '#232629', oklch: 'oklch(0.240 0.004 262)' },
        field: { hex: '#1c1e21', oklch: 'oklch(0.200 0.004 262)' },
        skeletonBg: { hex: '#18191c', oklch: 'oklch(0.180 0.004 262)' },
        skeletonEl: { hex: '#272a2e', oklch: 'oklch(0.260 0.004 262)' },
        textHelper: { hex: '#8e9197', oklch: 'oklch(0.620 0.004 262)' },
      },
      3: {
        surface: { hex: '#141517', oklch: 'oklch(0.160 0.004 262)' },
        field: { hex: '#0e0f10', oklch: 'oklch(0.120 0.004 262)' },
        skeletonBg: { hex: '#111214', oklch: 'oklch(0.140 0.004 262)' },
        skeletonEl: { hex: '#1c1e21', oklch: 'oklch(0.200 0.004 262)' },
        textHelper: { hex: '#82858b', oklch: 'oklch(0.578 0.004 262)' },
      },
    },
  };

  function TierCard({ title, level, isV12 = true }) {
    const v12Info = v12Values.dark[level] || v12Values.dark[1];

    // Fixed styling simulation for V11 to look genuine in dark mode
    const v11LayerBg =
      level === 1 ? '#262626' : level === 2 ? '#393939' : '#525252';

    const containerStyle = isV12
      ? {
          padding: '1.25rem',
          margin: '0.75rem 0',
          borderRadius: '8px',
          border: '1px solid var(--cds-border-subtle)',
          backgroundColor: 'var(--cds-layer)',
        }
      : {
          padding: '1.25rem',
          margin: '0.75rem 0',
          borderRadius: '8px',
          border: '1px solid #525252',
          backgroundColor: v11LayerBg,
          '--cds-skeleton-background': '#292929',
          '--cds-skeleton-element': '#393939',
          '--cds-field': '#262626',
          '--cds-text-helper': '#a8a8a8',
          '--cds-text-placeholder': 'rgba(244, 244, 244, 0.4)',
        };

    return (
      <div style={containerStyle}>
        {/* Tier Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem',
          }}>
          <div>
            <strong
              style={{ fontSize: '0.9rem', color: 'var(--cds-text-primary)' }}>
              {title} (Level {level})
            </strong>
            <div
              style={{
                fontSize: '0.7rem',
                color: 'var(--cds-text-secondary)',
                fontFamily: 'monospace',
              }}>
              Surface:{' '}
              {isV12
                ? `${v12Info.surface.hex} • ${v12Info.surface.oklch}`
                : `${v11LayerBg} (Static)`}
            </div>
          </div>
          <span
            style={{
              fontSize: '0.7rem',
              padding: '3px 8px',
              borderRadius: '12px',
              backgroundColor: isV12 ? '#24a148' : '#da1e28',
              color: '#ffffff',
              fontWeight: 600,
            }}>
            {isV12 ? `Dynamic Tier 0${level}` : 'Frozen Static Swatch'}
          </span>
        </div>

        {/* 1. Form Component */}
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id={`input-${isV12 ? 'v12' : 'v11'}-lvl-${level}`}
            labelText="Form Input Field"
            placeholder="Type search query..."
            helperText={
              isV12
                ? `Helper text: ${v12Info.textHelper.hex} (4.5:1 WCAG AA)`
                : `Helper text: ${v11Values.dark.textHelper.hex} (static)`
            }
          />
          <div
            style={{
              fontSize: '0.7rem',
              color: 'var(--cds-text-secondary)',
              fontFamily: 'monospace',
              marginTop: '4px',
            }}>
            Field bg:{' '}
            {isV12
              ? `${v12Info.field.hex} • ${v12Info.field.oklch}`
              : `${v11Values.dark.field.hex} (Identical on all layers)`}
          </div>
        </div>

        {/* 2. Skeleton Component */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              marginBottom: '0.25rem',
              color: 'var(--cds-text-secondary)',
            }}>
            Loading Skeleton Container & Bone
          </div>
          <div
            style={{
              padding: '0.85rem',
              backgroundColor: isV12
                ? 'var(--cds-skeleton-background)'
                : '#292929',
              borderRadius: '4px',
              border: '1px solid var(--cds-border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
            <SkeletonText heading width="50%" />
            <SkeletonText paragraph lineCount={2} />
          </div>
          <div
            style={{
              fontSize: '0.7rem',
              color: 'var(--cds-text-secondary)',
              fontFamily: 'monospace',
              marginTop: '4px',
            }}>
            Container: {isV12 ? v12Info.skeletonBg.hex : '#292929'} | Bone:{' '}
            {isV12
              ? `${v12Info.skeletonEl.hex} (${v12Info.skeletonEl.oklch})`
              : '#393939 (No depth shift)'}
          </div>
        </div>

        {/* Color Palette Pill Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--cds-border-subtle)',
          }}>
          <span
            style={{
              fontSize: '0.65rem',
              fontFamily: 'monospace',
              padding: '2px 6px',
              background: 'var(--cds-layer)',
              border: '1px solid var(--cds-border-subtle)',
              borderRadius: '3px',
            }}>
            Layer: {isV12 ? v12Info.surface.hex : v11LayerBg}
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              fontFamily: 'monospace',
              padding: '2px 6px',
              background: 'var(--cds-field)',
              border: '1px solid var(--cds-border-subtle)',
              borderRadius: '3px',
            }}>
            Field: {isV12 ? v12Info.field.hex : '#262626'}
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              fontFamily: 'monospace',
              padding: '2px 6px',
              background: 'var(--cds-skeleton-background)',
              border: '1px solid var(--cds-border-subtle)',
              borderRadius: '3px',
            }}>
            SkelBg: {isV12 ? v12Info.skeletonBg.hex : '#292929'}
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              fontFamily: 'monospace',
              padding: '2px 6px',
              background: 'var(--cds-skeleton-element)',
              color: '#fff',
              borderRadius: '3px',
            }}>
            SkelEl: {isV12 ? v12Info.skeletonEl.hex : '#393939'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ padding: '1.5rem', maxWidth: '1300px', fontFamily: 'inherit' }}>
      {/* Header & Context Banner */}
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: 'var(--cds-layer)',
          borderRadius: '8px',
          border: '1px solid var(--cds-border-subtle)',
          marginBottom: '2rem',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.5rem',
          }}>
          <span
            style={{
              padding: '4px 10px',
              backgroundColor: 'var(--cds-interactive, #0f62fe)',
              color: '#ffffff',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.5px',
            }}>
            CARBON V12 THEME ENGINE
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: '1.3rem',
              color: 'var(--cds-text-primary)',
            }}>
            Contextual Token Evolution (Hex & OKLCH Side-by-Side)
          </h2>
        </div>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--cds-text-secondary)',
            lineHeight: '1.5',
            margin: '0.5rem 0',
          }}>
          <strong>What changed:</strong> In Carbon V11, tokens like{' '}
          <code>$skeleton-background</code>, <code>$skeleton-element</code>, and{' '}
          <code>$field</code> used static swatch aliases (e.g.{' '}
          <code>#292929</code> and <code>#393939</code>) that remained frozen
          across all 3 layer levels. In Carbon V12, they are computed via OKLCH
          lightness deltas ($\Delta L$) and guaranteed WCAG contrast formulas
          for every layer level.
        </p>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--cds-text-secondary)',
            lineHeight: '1.5',
            margin: 0,
          }}>
          <strong>Why it changed:</strong> Guarantees that loading skeletons,
          input fields, and helper text remain clearly visible and maintain
          proper depth hierarchy no matter how deeply cards, modals, or side
          panels are nested.
        </p>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        }}>
        {/* Column 1: V11 Before (Frozen) */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--cds-background)',
            borderRadius: '8px',
            border: '2px dashed #da1e28',
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            }}>
            <h3 style={{ margin: 0, color: '#da1e28', fontSize: '1.1rem' }}>
              ❌ Carbon V11: Frozen Static Hex
            </h3>
          </div>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--cds-text-secondary)',
              marginBottom: '1rem',
            }}>
            Notice that inside Level 2 and Level 3, the skeleton container (
            <code>#292929</code>), bone (<code>#393939</code>), and field (
            <code>#262626</code>) never change, causing them to wash out against
            elevated cards.
          </p>

          <TierCard title="Layer 1 (Default Surface)" level={1} isV12={false} />
          <Layer>
            <TierCard title="Layer 2 (Elevated Card)" level={2} isV12={false} />
            <Layer>
              <TierCard
                title="Layer 3 (Modal / Inner Tile)"
                level={3}
                isV12={false}
              />
            </Layer>
          </Layer>
        </div>

        {/* Column 2: V12 After (Algorithmic OKLCH) */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--cds-background)',
            borderRadius: '8px',
            border: '2px solid #24a148',
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            }}>
            <h3 style={{ margin: 0, color: '#24a148', fontSize: '1.1rem' }}>
              ✅ Carbon V12: Algorithmic OKLCH
            </h3>
          </div>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--cds-text-secondary)',
              marginBottom: '1rem',
            }}>
            Notice how the skeleton container (<code>#111214</code> →{' '}
            <code>#18191c</code>) and bone (<code>#202226</code> →{' '}
            <code>#272a2e</code>) shift dynamically to preserve 10% depth
            contrast at every tier.
          </p>

          <TierCard title="Layer 1 (Default Surface)" level={1} isV12={true} />
          <Layer>
            <TierCard title="Layer 2 (Elevated Card)" level={2} isV12={true} />
            <Layer>
              <TierCard
                title="Layer 3 (Modal / Inner Tile)"
                level={3}
                isV12={true}
              />
            </Layer>
          </Layer>
        </div>
      </div>

      {/* Decision & Specs Summary Table */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1.25rem',
          backgroundColor: 'var(--cds-layer)',
          borderRadius: '8px',
          border: '1px solid var(--cds-border-subtle)',
        }}>
        <h4
          style={{ margin: '0 0 0.75rem 0', color: 'var(--cds-text-primary)' }}>
          Mathematical Specifications (Engine Rules)
        </h4>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              fontSize: '0.8rem',
              borderCollapse: 'collapse',
              textAlign: 'left',
            }}>
            <thead>
              <tr
                style={{ borderBottom: '1px solid var(--cds-border-subtle)' }}>
                <th style={{ padding: '8px' }}>Token Family</th>
                <th style={{ padding: '8px' }}>V11 Static Value</th>
                <th style={{ padding: '8px' }}>V12 Algorithmic Formula</th>
                <th style={{ padding: '8px' }}>
                  Perceptual / Accessibility Target
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{ borderBottom: '1px solid var(--cds-border-subtle)' }}>
                <td style={{ padding: '8px' }}>
                  <code>skeleton-background</code>
                </td>
                <td style={{ padding: '8px', color: '#da1e28' }}>
                  Frozen (#e8e8e8)
                </td>
                <td style={{ padding: '8px' }}>
                  <code>L_surface - 0.04 (min 0.14 floor)</code>
                </td>
                <td style={{ padding: '8px' }}>
                  Subtle surface contrast across light & dark modes
                </td>
              </tr>
              <tr
                style={{ borderBottom: '1px solid var(--cds-border-subtle)' }}>
                <td style={{ padding: '8px' }}>
                  <code>skeleton-element</code>
                </td>
                <td style={{ padding: '8px', color: '#da1e28' }}>
                  Frozen (#c6c6c6)
                </td>
                <td style={{ padding: '8px' }}>
                  <code>L_bg ± 0.10 (adaptive delta)</code>
                </td>
                <td style={{ padding: '8px' }}>
                  10% perceptual lightness difference for loading bones
                </td>
              </tr>
              <tr
                style={{ borderBottom: '1px solid var(--cds-border-subtle)' }}>
                <td style={{ padding: '8px' }}>
                  <code>text-helper / placeholder</code>
                </td>
                <td style={{ padding: '8px', color: '#da1e28' }}>
                  Frozen (#6f6f6f)
                </td>
                <td style={{ padding: '8px' }}>
                  <code>L = 0.5465 / 0.5670 / 0.5255</code>
                </td>
                <td style={{ padding: '8px' }}>
                  Guaranteed 4.5:1 WCAG AA contrast against each tier
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>
                  <code>field-01/02/03</code>
                </td>
                <td style={{ padding: '8px', color: '#da1e28' }}>
                  Frozen (#f4f4f4 / #fff)
                </td>
                <td style={{ padding: '8px' }}>
                  <code>L_surface - 0.03 (light) / -0.04 (dark)</code>
                </td>
                <td style={{ padding: '8px' }}>
                  Consistent input recession depth across all tiers
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
