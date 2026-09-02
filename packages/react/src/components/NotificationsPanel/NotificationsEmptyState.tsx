/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * NOTE: NotificationsEmptyState, NotificationsIllustration, and
 * EmptyStateContent are temporary inline components copied from
 * carbon-for-ibm-products. They exist solely to support NotificationsPanel.
 * Remove this file and replace the usage in NotificationsPanel when Carbon core
 * develops its own empty-state / no-data pattern.
 */

import React, { useId } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

// ---------------------------------------------------------------------------
// NotificationsIllustration
// ---------------------------------------------------------------------------

interface IllustrationProps {
  alt?: string;
  size?: 'lg' | 'sm';
  theme?: 'light' | 'dark';
}

const NotificationsIllustration = ({
  alt = '',
  size = 'lg',
  theme,
}: IllustrationProps) => {
  const svgId = useId();
  const prefix = usePrefix();
  const blockClass = `${prefix}--empty-state`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      height={80}
      viewBox="0 0 80 80"
      className={cx([
        `${blockClass}__illustration`,
        `${blockClass}__illustration-notification`,
        `${blockClass}__illustration--${size}`,
      ])}
      aria-hidden="true">
      <title>{alt}</title>
      {theme === 'dark' ? (
        <>
          <defs>
            <linearGradient
              id={`a_dark_${svgId}`}
              x1={30.05}
              y1={54.31}
              x2={35.5}
              y2={54.31}
              gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#161616" />
              <stop offset={1} stopColor="#262626" />
            </linearGradient>
            <linearGradient
              id={`b_dark_${svgId}`}
              x1={28.61}
              y1={-3.97}
              x2={70.69}
              y2={68.92}
              gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#525252" />
              <stop offset={0.52} stopColor="#393939" />
              <stop offset={0.61} stopColor="#393939" />
              <stop offset={1} stopColor="#161616" />
            </linearGradient>
            <linearGradient
              id={`c_dark_${svgId}`}
              x1={38.01}
              y1={69.51}
              x2={38.01}
              y2={-0.42}
              gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#262626" />
              <stop offset={1} stopColor="#393939" />
            </linearGradient>
            <linearGradient
              id={`d_dark_${svgId}`}
              x1={15.14}
              y1={5.72}
              x2={63.06}
              y2={33.52}
              gradientUnits="userSpaceOnUse">
              <stop offset={0.78} stopColor="#6f6f6f" />
              <stop offset={0.81} stopColor="#6c6c6c" stopOpacity={0.96} />
              <stop offset={0.85} stopColor="#636363" stopOpacity={0.84} />
              <stop offset={0.89} stopColor="#545454" stopOpacity={0.64} />
              <stop offset={0.93} stopColor="#404040" stopOpacity={0.35} />
              <stop offset={0.97} stopColor="#262626" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path fill="none" d="M0 0h80v80H0z" />
          <path
            opacity={0.25}
            d="M15.13 52.11l45.5 26.28 4.25-2.51L19.4 49.63l-4.27 2.48z"
          />
          <path
            d="M32.66 52.85l-2.25 4.22a1.08 1.08 0 01-.36.35l2.83-1.65a1.08 1.08 0 00.36-.35l2.26-4.22z"
            fill={`url(#a_dark_${svgId})`}
          />
          <path
            d="M63.45 26.58L20.63 1.86a1 1 0 00-1-.1l-4 2.3a1 1 0 011 .1l42.85 24.72a3.17 3.17 0 011.42 2.47l-.1 36.08a1 1 0 01-.42.91l4-2.3a1 1 0 00.42-.91L64.88 29a3.14 3.14 0 00-1.43-2.42z"
            fill={`url(#b_dark_${svgId})`}
          />
          <path
            d="M59.48 28.88a3.17 3.17 0 011.42 2.47l-.1 36.08c0 .9-.65 1.26-1.42.81l-26.7-15.4-2.26 4.22a.9.9 0 01-1.33.28 3.07 3.07 0 01-1.22-1.53l-2.33-7.09-9-5.2a3.15 3.15 0 01-1.43-2.46L15.23 5c0-.9.64-1.27 1.43-.81z"
            fill={`url(#c_dark_${svgId})`}
          />
          <path
            fill="#525252"
            d="M57.99 37.07l-.01 3.9L18.03 17.9l.01-3.9 39.95 23.07zM57.99 45.11l-.01 3.91-39.95-23.07.01-3.9 39.95 23.06zM44.62 45.04l-.01 3.9L18.03 33.6l.01-3.9 26.58 15.34z"
          />
          <path
            d="M60.76 30.55a2.54 2.54 0 01.14.8v3.95l.41-.13v-3.82a3.54 3.54 0 00-1.63-2.82L16.86 3.8a2.09 2.09 0 00-.44-.19l-.78.45a1 1 0 01.21-.06h.48l.27.12 21.47 12.4 21.41 12.36a3.19 3.19 0 011.28 1.67z"
            fill={`url(#d_dark_${svgId})`}
          />
        </>
      ) : (
        <>
          <defs>
            <linearGradient
              id={`a_${svgId}`}
              x1={61.44}
              y1={66.99}
              x2={61.44}
              y2={60.01}
              gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#c6c6c6" />
              <stop offset={0.78} stopColor="#e0e0e0" />
            </linearGradient>
            <linearGradient
              id={`b_${svgId}`}
              x1={28.49}
              y1={44.06}
              x2={53.04}
              y2={86.58}
              gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#525252" stopOpacity={0.05} />
              <stop offset={1} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient
              id={`c_${svgId}`}
              x1={30.05}
              y1={54.31}
              x2={35.5}
              y2={54.31}
              gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#a4a4a4" />
              <stop offset={1} stopColor="#bebebe" />
            </linearGradient>
            <linearGradient
              id={`d_${svgId}`}
              x1={28.61}
              y1={-3.97}
              x2={70.69}
              y2={68.92}
              gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#f4f4f4" />
              <stop offset={0.52} stopColor="#e0e0e0" />
              <stop offset={0.56} stopColor="#d8d8d8" />
              <stop offset={0.61} stopColor="#c6c6c6" />
              <stop offset={0.89} stopColor="#a8a8a8" />
              <stop offset={0.96} stopColor="#8d8d8d" />
            </linearGradient>
            <linearGradient
              id={`e_${svgId}`}
              x1={38.01}
              y1={59.43}
              x2={38.01}
              y2={3.27}
              xlinkHref={`#a_${svgId}`}
            />
            <linearGradient
              id={`f_${svgId}`}
              x1={21.52}
              y1={36.2}
              x2={61.39}
              y2={36.2}
              gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#e0e0e0" />
              <stop offset={1} stopColor="#c6c6c6" />
            </linearGradient>
            <linearGradient
              id={`h_${svgId}`}
              x1={17.68}
              y1={15.75}
              x2={55.37}
              y2={37.5}
              gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#fff" />
              <stop offset={0.05} stopColor="#fdfdfd" />
              <stop offset={0.3} stopColor="#f6f6f6" />
              <stop offset={1} stopColor="#f4f4f4" />
            </linearGradient>
            <linearGradient
              id={`i_${svgId}`}
              x1={14.24}
              y1={21.81}
              x2={51.92}
              y2={43.56}
              xlinkHref={`#h_${svgId}`}
            />
            <linearGradient
              id={`j_${svgId}`}
              x1={10.96}
              y1={27.56}
              x2={48.66}
              y2={49.33}
              xlinkHref={`#h_${svgId}`}
            />
            <linearGradient
              id={`k_${svgId}`}
              x1={15.14}
              y1={5.72}
              x2={63.06}
              y2={33.52}
              gradientUnits="userSpaceOnUse">
              <stop offset={0.78} stopColor="#fff" />
              <stop offset={0.8} stopColor="#fefefe" stopOpacity={0.98} />
              <stop offset={0.82} stopColor="#fcfcfc" stopOpacity={0.93} />
              <stop offset={0.85} stopColor="#f8f8f8" stopOpacity={0.84} />
              <stop offset={0.87} stopColor="#f2f2f2" stopOpacity={0.72} />
              <stop offset={0.9} stopColor="#eaeaea" stopOpacity={0.56} />
              <stop offset={0.93} stopColor="#e1e1e1" stopOpacity={0.37} />
              <stop offset={0.95} stopColor="#d7d7d7" stopOpacity={0.14} />
              <stop offset={0.97} stopColor="#d0d0d0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path fill="none" d="M0 0h80v80H0z" />
          <path
            fill={`url(#b_${svgId})`}
            d="M15.13 52.11l45.5 26.28 4.25-2.51L19.4 49.63l-4.27 2.48z"
          />
          <path
            d="M32.66 52.85l-2.25 4.22a1.08 1.08 0 01-.36.35l2.83-1.65a1.08 1.08 0 00.36-.35l2.26-4.22z"
            fill={`url(#c_${svgId})`}
          />
          <path
            d="M63.45 26.58L20.63 1.86a1 1 0 00-1-.1l-4 2.3a1 1 0 011 .1l42.85 24.72a3.17 3.17 0 011.42 2.47l-.1 36.08a1 1 0 01-.42.91l4-2.3a1 1 0 00.42-.91L64.88 29a3.14 3.14 0 00-1.43-2.42z"
            fill={`url(#d_${svgId})`}
          />
          <path
            fill={`url(#e_${svgId})`}
            d="M59.48 28.88a3.17 3.17 0 011.42 2.47l-.1 36.08c0 .9-.65 1.26-1.42.81l-26.7-15.4-2.26 4.22a.9.9 0 01-1.33.28 3.07 3.07 0 01-1.22-1.53l-2.33-7.09-9-5.2a3.15 3.15 0 01-1.43-2.46L15.23 5c0-.9.64-1.27 1.43-.81z"
          />
          <path
            d="M59.48 28.88a3.17 3.17 0 011.42 2.47l-.1 36.08c0 .9-.65 1.26-1.42.81l-26.7-15.4-2.26 4.22a.9.9 0 01-1.33.28 3.07 3.07 0 01-1.22-1.53l-2.33-7.09-9-5.2a3.15 3.15 0 01-1.43-2.46L15.23 5c0-.9.64-1.27 1.43-.81z"
            fill={`url(#f_${svgId})`}
          />
          <path
            fill={`url(#h_${svgId})`}
            d="M57.99 37.07l-.01 3.9L18.03 17.9l.01-3.9 39.95 23.07z"
          />
          <path
            fill={`url(#i_${svgId})`}
            d="M57.99 45.11l-.01 3.91-39.95-23.07.01-3.9 39.95 23.06z"
          />
          <path
            fill={`url(#j_${svgId})`}
            d="M44.62 45.04l-.01 3.9L18.03 33.6l.01-3.9 26.58 15.34z"
          />
          <path
            d="M60.76 30.55a2.54 2.54 0 01.14.8v3.95l.41-.13v-3.82a3.54 3.54 0 00-1.63-2.82L16.86 3.8a2.09 2.09 0 00-.44-.19l-.78.45a1 1 0 01.21-.06h.48l.27.12 21.47 12.4 21.41 12.36a3.19 3.19 0 011.28 1.67z"
            fill={`url(#k_${svgId})`}
          />
        </>
      )}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// NotificationsEmptyState
// ---------------------------------------------------------------------------

export interface NotificationsEmptyStateProps {
  /** Optional class. */
  className?: string;
  /**
   * Illustration theme. Pass 'dark' when your app uses a dark Carbon theme.
   */
  illustrationTheme?: 'light' | 'dark';
  /** Alt text for the illustration (falls back to title). */
  illustrationDescription?: string;
  /** Size of the illustration. */
  size?: 'lg' | 'sm';
  /** Subtitle / body text. */
  subtitle?: React.ReactNode;
  /** Title — pass an empty string to omit. */
  title: React.ReactNode;
}

/**
 * Inline empty-state for the notifications panel.
 *
 * NOTE: This is a temporary companion component copied from
 * carbon-for-ibm-products. It lives alongside NotificationsPanel so it is NOT
 * a separately exported/migrated component. Remove and replace with the Carbon
 * core empty-state pattern when one becomes available.
 */
export const NotificationsEmptyState = React.forwardRef<
  HTMLDivElement,
  NotificationsEmptyStateProps
>(
  (
    {
      className,
      illustrationDescription,
      illustrationTheme,
      size = 'lg',
      subtitle,
      title,
    },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--empty-state`;

    return (
      <div
        ref={ref}
        className={cx(
          blockClass,
          className,
          `${blockClass}-position--top`,
          `${blockClass}-type--notifications`
        )}>
        <NotificationsIllustration
          size={size}
          theme={illustrationTheme}
          alt={
            (illustrationDescription ||
              (typeof title === 'string' ? title : '')) as string
          }
        />
        <div className={`${blockClass}__content`}>
          {title && (
            <p
              className={cx(`${blockClass}__header`, {
                [`${blockClass}__header--small`]: size === 'sm',
              })}>
              {title}
            </p>
          )}
          {subtitle && (
            <div
              className={cx(`${blockClass}__subtitle`, {
                [`${blockClass}__subtitle--small`]: size === 'sm',
              })}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
    );
  }
);

NotificationsEmptyState.displayName = 'NotificationsEmptyState';
