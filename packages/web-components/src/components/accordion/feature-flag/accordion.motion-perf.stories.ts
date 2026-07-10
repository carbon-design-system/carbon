/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

//
// compares three engines on the same DOM:
// native CSS, `motion/mini` (~3.2 KB), and full `motion` (~22.7 KB).
//
// a single `animate` control picks what is animated, each mapping to one
// rendering-pipeline tier:
//   - opacity       composite (transform/opacity; GPU fast-path)
//   - box-shadow    paint     (repaints each frame)
//   - shadow-layer  composite (animate opacity of staic-shadow overlays)
//   - height        layout    (reflow + paint + composite each frame)
// (no `size`/FLIP - `layout` animations are a motion/react feature; the
// vanilla/mini APIs can't do them.)

import { html } from 'lit';
import { animate as animateMini } from 'motion/mini';
import { animate as animateFull } from 'motion';
import styles from './accordion-motion.scss?lit';

const TRANSITION = { duration: 0.24, ease: [0.2, 0, 0.38, 0.9] } as const;
const SAMPLE_MS = 800;

// use `$shadow` theme token (white theme,
// rgba(0,0,0,0.3)) as `box-shadow: 0 2px 6px $shadow`
const SHADOW_ON = '0px 2px 6px rgba(0, 0, 0, 0.3)';
const SHADOW_OFF = '0px 2px 6px rgba(0, 0, 0, 0)';

const ANIMATE_OPTIONS = ['opacity', 'box-shadow', 'shadow-layer', 'height'];

interface PerfStats {
  fps: number;
  jank: number;
  maxGap: number;
  longTaskMs: number;
  longTaskCount: number;
}

function runFrameMeasurement(sampleMs = SAMPLE_MS): Promise<PerfStats> {
  return new Promise((resolve) => {
    const longTasks: number[] = [];
    let observer: PerformanceObserver | null = null;
    try {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) longTasks.push(entry.duration);
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch {
      observer = null;
    }

    const start = performance.now();
    let last = start;
    const gaps: number[] = [];

    const tick = (now: number) => {
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
        jank: gaps.filter((g) => g > expected * 1.5).length,
        maxGap: Math.round(Math.max(0, ...gaps)),
        longTaskMs: Math.round(longTasks.reduce((a, b) => a + b, 0)),
        longTaskCount: longTasks.length,
      });
    };
    requestAnimationFrame(tick);
  });
}

const twoFrames = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );

async function runPerf(root: HTMLElement, engine: string, animateKind: string) {
  const cells = Array.from(root.querySelectorAll<HTMLElement>('.mp-cell'));
  const panels = cells.map(
    (cell) => cell.querySelector('.mp-cell__panel') as HTMLElement
  );
  const layers = cells.map(
    (cell) => cell.querySelector('.mp-cell__shadow') as HTMLElement | null
  );

  // reset to closed
  cells.forEach((cell) => cell.classList.remove('is-open'));
  panels.forEach((panel) => {
    panel.style.cssText = '';
  });
  layers.forEach((layer) => {
    if (layer) layer.style.cssText = '';
  });
  await twoFrames();

  const measuring = runFrameMeasurement();

  if (engine === 'native') {
    cells.forEach((cell) => cell.classList.add('is-open'));
  } else {
    const animate = engine === 'mini' ? animateMini : animateFull;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const opts = TRANSITION as any;
    if (animateKind === 'shadow-layer') {
      layers.forEach((layer) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (layer) animate(layer, { opacity: [0, 1] } as any, opts);
      });
    } else {
      let keyframes: Record<string, unknown>;
      if (animateKind === 'box-shadow') {
        keyframes = { boxShadow: [SHADOW_OFF, SHADOW_ON] };
      } else if (animateKind === 'height') {
        keyframes = { height: ['0px', '80px'], opacity: [0, 1] };
      } else {
        keyframes = {
          opacity: [0, 1],
          transform: ['translateY(8px)', 'translateY(0px)'],
        };
      }
      panels.forEach((panel) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        animate(panel, keyframes as any, opts);
      });
    }
  }

  const stats = await measuring;
  const out = root.querySelector('.mp__stats');
  if (out) {
    out.innerHTML = `
      <div><dt>FPS</dt><dd>${stats.fps}</dd></div>
      <div><dt>Jank frames</dt><dd>${stats.jank}</dd></div>
      <div><dt>Max frame gap</dt><dd>${stats.maxGap}ms</dd></div>
      <div><dt>Long-task time</dt><dd>${stats.longTaskMs}ms (${stats.longTaskCount})</dd></div>`;
  }
}

const meta = {
  title: 'Components/Accordion/Feature Flag',
  tags: ['!autodocs'],
  argTypes: {
    engine: {
      description: 'native CSS; motion/mini (~3.2 KB); motion full (~22.7 KB)',
      options: ['native', 'mini', 'full'],
      control: { type: 'inline-radio' },
    },
    animate: {
      description:
        'What to animate, by tier: opacity=Composite; box-shadow=Paint; shadow-layer=Composite (overlay opacity); height=Layout',
      options: ANIMATE_OPTIONS,
      control: { type: 'select' },
    },
    count: {
      description: 'Simultaneous instances (stress)',
      control: { type: 'number', min: 1, max: 400, step: 1 },
    },
  },
  args: { engine: 'mini', animate: 'height', count: 50 },
};

export default meta;

export const PerformancePlayground = {
  name: 'Performance playground',
  render: ({ engine, animate, count }) => {
    const cells = [];
    for (let i = 0; i < count; i += 1) {
      cells.push(
        html`<div class="mp-cell mp-cell--${engine} mp-cell--${animate}">
          <div class="mp-cell__panel"></div>
          ${animate === 'shadow-layer'
            ? html`<span class="mp-cell__shadow"></span>`
            : ''}
        </div>`
      );
    }
    const onRun = (event: Event) => {
      const root = (event.currentTarget as HTMLElement).closest(
        '.mp'
      ) as HTMLElement;
      runPerf(root, engine, animate);
    };
    return html`
      <div class="mp">
        <style>
          ${styles}
        </style>
        <div class="mp__controls">
          <button class="mp__run" type="button" @click=${onRun}>Run</button>
          <span class="mp__meta"
            >${engine}; ${animate}; ${count} instances</span
          >
        </div>
        <dl class="mp__stats"></dl>
        <div class="mp__grid">${cells}</div>
      </div>
    `;
  },
};
