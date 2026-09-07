/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Add } from '@carbon/icons-react';
import Button from '../Button';

export const radiusTokenScale = [
  ['00', '0'],
  ['02', '0.125rem'],
  ['04', '0.25rem'],
  ['08', '0.5rem'],
  ['16', '1rem'],
  ['24', '1.5rem'],
  ['max', '999999px'],
];

export const radiusTokenOptions = [
  'unset',
  ...radiusTokenScale.map(([name]) => name),
];

export const radiusTokenMapping = {
  unset: undefined,
  ...Object.fromEntries(radiusTokenScale),
};

const stack = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const group = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const row = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  alignItems: 'center',
};

const label = {
  color: 'var(--cds-text-secondary)',
  fontSize: '0.875rem',
};

export function toRadiusStyle({
  radius,
  radiusSs,
  radiusSe,
  radiusEs,
  radiusEe,
}) {
  const style = {};
  if (radius != null) {
    style['--cds-button-radius'] = radius;
  }
  if (radiusSs != null) {
    style['--cds-button-radius-ss'] = radiusSs;
  }
  if (radiusSe != null) {
    style['--cds-button-radius-se'] = radiusSe;
  }
  if (radiusEs != null) {
    style['--cds-button-radius-es'] = radiusEs;
  }
  if (radiusEe != null) {
    style['--cds-button-radius-ee'] = radiusEe;
  }
  return style;
}

/**
 * Live radius examples for the Button Radius story and docs.
 */
export function ButtonRadiusExamples({
  radius,
  radiusSs,
  radiusSe,
  radiusEs,
  radiusEe,
  renderIcon,
  iconDescription,
  hasIconOnly: _hasIconOnly,
  ...buttonProps
}) {
  const playgroundStyle = toRadiusStyle({
    radius,
    radiusSs,
    radiusSe,
    radiusEs,
    radiusEe,
  });
  const icon = renderIcon ?? Add;
  const iconLabel = iconDescription || 'Add';

  return (
    <div style={stack}>
      <div style={group}>
        <span style={label}>Custom</span>
        <div style={{ ...row, ...playgroundStyle }}>
          <Button {...buttonProps} renderIcon={renderIcon}>
            Button
          </Button>
          <Button
            {...buttonProps}
            hasIconOnly
            renderIcon={icon}
            iconDescription={iconLabel}
          />
        </div>
      </div>
      <div style={group}>
        <span style={label}>All corners · text</span>
        <div style={row}>
          {radiusTokenScale.map(([name, value]) => (
            <div
              key={`text-${name}`}
              style={toRadiusStyle({ radius: value })}>
              <Button {...buttonProps} renderIcon={renderIcon}>
                {name}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div style={group}>
        <span style={label}>All corners · icon-only</span>
        <div style={row}>
          {radiusTokenScale.map(([name, value]) => (
            <div
              key={`icon-${name}`}
              style={toRadiusStyle({ radius: value })}>
              <Button
                {...buttonProps}
                hasIconOnly
                renderIcon={icon}
                iconDescription={name}
              />
            </div>
          ))}
        </div>
      </div>
      <div style={group}>
        <span style={label}>Joined split (Combo Button)</span>
        <div style={{ display: 'inline-flex', columnGap: 1 }}>
          <div
            style={toRadiusStyle({
              radius: '999999px',
              radiusSe: '0',
              radiusEe: '0',
            })}>
            <Button {...buttonProps}>Primary action</Button>
          </div>
          <div
            style={toRadiusStyle({
              radius: '999999px',
              radiusSs: '0',
              radiusEs: '0',
            })}>
            <Button
              {...buttonProps}
              hasIconOnly
              renderIcon={icon}
              iconDescription="More"
            />
          </div>
        </div>
      </div>
      <div style={group}>
        <span style={label}>Last action end-end (AI Label footer)</span>
        <div
          style={{
            ...toRadiusStyle({ radius: '0' }),
            display: 'inline-flex',
          }}>
          <Button {...buttonProps} kind="ghost">
            Cancel
          </Button>
          <div style={toRadiusStyle({ radiusEe: 'calc(0.5rem - 1px)' })}>
            <Button {...buttonProps}>Confirm</Button>
          </div>
        </div>
      </div>
      <div style={group}>
        <span style={label}>Nested override</span>
        <div style={{ ...toRadiusStyle({ radius: '0' }), ...row }}>
          <Button {...buttonProps}>Page</Button>
          <div style={toRadiusStyle({ radius: '999999px' })}>
            <Button {...buttonProps}>Hero</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
