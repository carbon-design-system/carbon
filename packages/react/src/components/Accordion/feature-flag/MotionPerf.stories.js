/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

//
// compares three engines on the same DOM:
// native CSS and full `motion` (~22.7 KB).
//
// a single `animate` control picks what is animated, each mapping to one
// rendering-pipeline tier:
//   - opacity       composite (transform/opacity; GPU fast-path)
//   - box-shadow    paint     (repaints each frame)
//   - shadow-layer  composite (animate opacity of staic-shadow overlays)
//   - height        layout    (reflow + paint + composite each frame)
// (no `size`/FLIP - `layout` animations are a motion/react feature; the
// vanilla/mini APIs can't do them.)

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'motion/react';
import Button from '../../Button';
import './motion-perf.scss';

const TRANSITION = { duration: 0.24, ease: [0.2, 0, 0.38, 0.9] };
// pin layout/FLIP animation to the same tween (otherwise it defaults to a
// spring). used by the true `layoutId` container transform
const LAYOUT_TRANSITION = { ...TRANSITION, layout: TRANSITION };
const SAMPLE_MS = 800;

// use `$shadow` theme token (white theme,
// rgba(0,0,0,0.3)) as `box-shadow: 0 2px 6px $shadow`
const SHADOW_ON = '0px 2px 6px rgba(0, 0, 0, 0.3)';
const SHADOW_OFF = '0px 2px 6px rgba(0, 0, 0, 0)'; // same geometry, fades alpha

const ANIMATE_OPTIONS = [
  'opacity',
  'box-shadow',
  'shadow-layer',
  'height',
  'morph',
  'morph-shadow',
  'container-transform',
];

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(() => resolve()));

function runFrameMeasurement(sampleMs = SAMPLE_MS) {
  return new Promise((resolve) => {
    const longTasks = [];
    let observer;
    try {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) longTasks.push(entry.duration);
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch {
      observer = null; // not supported (Safari)
    }

    const start = performance.now();
    let last = start;
    const gaps = [];

    const tick = (now) => {
      gaps.push(now - last);
      last = now;
      if (now - start < sampleMs) {
        requestAnimationFrame(tick);
        return;
      }
      observer?.disconnect();
      const elapsed = now - start;
      const frames = gaps.length;
      const expected = 1000 / 60;
      resolve({
        fps: Math.round((frames / elapsed) * 1000),
        frames,
        jank: gaps.filter((g) => g > expected * 1.5).length,
        maxGap: Math.round(Math.max(0, ...gaps)),
        longTaskMs: Math.round(longTasks.reduce((a, b) => a + b, 0)),
        longTaskCount: longTasks.length,
      });
    };
    requestAnimationFrame(tick);
  });
}

const cellPropTypes = {
  animate: PropTypes.oneOf(ANIMATE_OPTIONS),
  open: PropTypes.bool,
};

const isMorph = (animate) => animate === 'morph' || animate === 'morph-shadow';

function NativeCell({ animate, open }) {
  // cative can't do true container transform - fall back to layout-animated
  // resize (the closest, expensive, native approximation)
  if (animate === 'container-transform') {
    return (
      <div
        className={`mp-cell mp-cell--native mp-cell--container-transform${
          open ? ' is-open' : ''
        }`}>
        <div className="mp-ct__surface" />
      </div>
    );
  }
  return (
    <div
      className={`mp-cell mp-cell--native mp-cell--${animate}${
        open ? ' is-open' : ''
      }`}>
      <div className={isMorph(animate) ? 'mp-cell__morph' : 'mp-cell__panel'} />
      {animate === 'shadow-layer' && <span className="mp-cell__shadow" />}
    </div>
  );
}

NativeCell.propTypes = cellPropTypes;

// static shadow overlay opacity (layer pattern)
function MotionShadowLayer({ open }) {
  return (
    <motion.div
      className="mp-cell__shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={TRANSITION}
    />
  );
}
MotionShadowLayer.propTypes = { open: PropTypes.bool };

// shared-element container transform: a small element morphs into a
// different, larger element via a shared `layoutId` ("card > modal")
// heavier than `morph` - motion matches the two elements by id and morphs one
// into the other. motion-only; native has no equivalent
function ContainerTransformCell({ open }) {
  const id = React.useId();
  return (
    <div className="mp-cell mp-cell--container-transform">
      {open ? (
        <motion.div
          layoutId={id}
          className="mp-ct__surface mp-ct__surface--big"
          transition={LAYOUT_TRANSITION}
        />
      ) : (
        <motion.div
          layoutId={id}
          className="mp-ct__surface mp-ct__surface--small"
          transition={LAYOUT_TRANSITION}
        />
      )}
    </div>
  );
}
ContainerTransformCell.propTypes = { open: PropTypes.bool };

function MotionCell({ animate, open }) {
  // container transform (true layoutId morph)
  if (animate === 'container-transform') {
    return <ContainerTransformCell open={open} />;
  }
  // height (layout)
  if (animate === 'height') {
    return (
      <div className="mp-cell">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="mp-cell__panel"
              style={{ overflow: 'hidden' }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 80, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={TRANSITION}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }
  // morph a single element resizing via `layout` FLIP (transform/Composite) —
  // the lighter layout animation. (The true small > large container transform is
  // the separate `container-transform` option above.) morph-shadow also animates
  // the elevation shadow (paint) - the worst case
  if (isMorph(animate)) {
    return (
      <div className={`mp-cell mp-cell--${animate}${open ? ' is-open' : ''}`}>
        <motion.div
          layout
          transition={TRANSITION}
          className="mp-cell__morph"
          animate={
            animate === 'morph-shadow'
              ? { boxShadow: open ? SHADOW_ON : SHADOW_OFF }
              : undefined
          }
        />
      </div>
    );
  }
  // box-shadow (paint)
  if (animate === 'box-shadow') {
    return (
      <div className="mp-cell">
        <motion.div
          className="mp-cell__panel"
          initial={{ boxShadow: SHADOW_OFF }}
          animate={{ boxShadow: open ? SHADOW_ON : SHADOW_OFF }}
          transition={TRANSITION}
        />
      </div>
    );
  }
  // shadow-layer (composite: overlay opacity)
  if (animate === 'shadow-layer') {
    return (
      <div className="mp-cell">
        <div className="mp-cell__panel" />
        <MotionShadowLayer open={open} />
      </div>
    );
  }
  // opacity (transform only composite baseline)
  return (
    <div className="mp-cell">
      <motion.div
        className="mp-cell__panel"
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={TRANSITION}
      />
    </div>
  );
}

MotionCell.propTypes = cellPropTypes;

function Harness({ engine, animate, count }) {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [running, setRunning] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const run = async () => {
    setRunning(true);
    setStats(null);
    setOpen(false);
    setRunKey((k) => k + 1); // remount all cells closed
    await nextFrame();
    await nextFrame(); // ensure the closed state is painted before measuring
    const measuring = runFrameMeasurement();
    setOpen(true); // trigger all instances simultaneously
    setStats(await measuring);
    setRunning(false);
  };

  const Cell = engine === 'motion' ? MotionCell : NativeCell;
  const cells = [];
  for (let i = 0; i < count; i += 1) {
    cells.push(<Cell key={`${runKey}-${i}`} animate={animate} open={open} />);
  }

  return (
    <div className="mp">
      <div className="mp__controls">
        <Button size="sm" onClick={run} disabled={running}>
          {running ? 'Running…' : 'Run'}
        </Button>
        <span className="mp__meta">
          {engine}; {animate}; {count} instances
        </span>
      </div>

      {stats && (
        <dl className="mp__stats">
          <div>
            <dt>FPS</dt>
            <dd>{stats.fps}</dd>
          </div>
          <div>
            <dt>Jank frames</dt>
            <dd>{stats.jank}</dd>
          </div>
          <div>
            <dt>Max frame gap</dt>
            <dd>{stats.maxGap}ms</dd>
          </div>
          <div>
            <dt>Long-task time</dt>
            <dd>
              {stats.longTaskMs}ms ({stats.longTaskCount})
            </dd>
          </div>
        </dl>
      )}

      <div className={`mp__grid mp__grid--${animate}`}>{cells}</div>
    </div>
  );
}

Harness.propTypes = {
  engine: PropTypes.oneOf(['native', 'motion']),
  animate: PropTypes.oneOf(ANIMATE_OPTIONS),
  count: PropTypes.number,
};

export default {
  title: 'Components/Accordion/Feature Flag',
  // use `Performance Overview` MDX page instead of an auto-generated one
  tags: ['!autodocs'],
  argTypes: {
    engine: {
      description: 'Animation engine under test',
      options: ['native', 'motion'],
      control: { type: 'inline-radio' },
    },
    animate: {
      description:
        'What to animate, by pipeline: opacity=Composite; box-shadow=Paint; shadow-layer=Composite (overlay opacity); height=Layout; morph=FLIP resize (motion=transform vs native=layout); morph-shadow=morph + animated elevation shadow; container-transform=TRUE layoutId morph, small→large element (motion only; native falls back to a layout resize)',
      options: ANIMATE_OPTIONS,
      control: { type: 'select' },
    },
    count: {
      description: 'Simultaneous instances (stress)',
      control: { type: 'number', min: 1, max: 400, step: 1 },
    },
  },
  args: { engine: 'motion', animate: 'height', count: 50 },
};

export const PerformancePlayground = (args) => <Harness {...args} />;
PerformancePlayground.storyName = 'Performance playground';
