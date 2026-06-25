/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../../settings';
import { useId } from '../../../global/js/utils/useId';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--empty-state`;

export const UnauthorizedIllustration = ({ theme, size, alt, ...rest }) => {
  const svgId = useId();
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={80}
      height={80}
      viewBox="0 0 80 80"
      className={cx([
        `${blockClass}__illustration`,
        `${blockClass}__illustration-unauthorized`,
        `${blockClass}__illustration--${size}`,
      ])}
      role="img"
      aria-hidden="true"
    >
      <title>{alt}</title>
      {theme === 'dark' ? (
        <>
          <defs>
            <linearGradient
              id={`prefix__b_dark_${svgId}`}
              x1={17.33}
              y1={40.68}
              x2={53.57}
              y2={19.76}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#525252" />
              <stop offset={1} stopColor="#393939" />
            </linearGradient>
            <linearGradient
              id={`prefix__a_dark_${svgId}`}
              x1={37.21}
              y1={61.49}
              x2={71.41}
              y2={41.74}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#262626" />
              <stop offset={1} stopColor="#393939" />
            </linearGradient>
            <linearGradient
              id={`prefix__c_dark_${svgId}`}
              x1={39.97}
              y1={32.38}
              x2={39.97}
              y2={1.64}
              xlinkHref={`#prefix__a_dark_${svgId}`}
            />
            <linearGradient
              id={`prefix__d_dark_${svgId}`}
              x1={24.58}
              y1={44.68}
              x2={51.62}
              y2={44.68}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#393939" />
              <stop offset={1} stopColor="#262626" />
            </linearGradient>
            <linearGradient
              id={`prefix__e_dark_${svgId}`}
              x1={32.72}
              y1={45.46}
              x2={38.82}
              y2={41.94}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#262626" />
              <stop offset={1} stopColor="#161616" />
            </linearGradient>
          </defs>
          <path fill="none" d="M0 0h80v80H0z" />
          <path
            opacity={0.25}
            d="M20.28 60.39l10.27-5.94 30.8 17.79-10.26 5.93-30.81-17.78z"
          />
          <path
            d="M61.16 32.9a1.44 1.44 0 00-.5-.51l-1.1-.64-28.48-16.44a.52.52 0 00-.5-.06l-10.11 5.83c-.11.07 2.16 28.77 2.16 28.77l4.3 2.79L61.26 33.1a1.24 1.24 0 00-.1-.2z"
            fill={`url(#prefix__b_dark_${svgId})`}
          />
          <path
            d="M61.16 62.45a.5.5 0 00.23-.48V33.64a1.38 1.38 0 00-.13-.54L26.93 52.64l24.12 15.64z"
            fill={`url(#prefix__a_dark_${svgId})`}
          />
          <path
            d="M46.88 31.4a.85.85 0 00.5.69 2.69 2.69 0 002.41 0 .85.85 0 00.49-.7V18.27c0-5.39-4.15-12-9.46-15.07-3-1.76-6-2-8.22-.78-1.9 1.09-3 3.19-3 5.89V21.5a.85.85 0 00.5.7 2.67 2.67 0 002.4 0 .87.87 0 00.5-.7V8.31a3.29 3.29 0 011.3-2.95c1.08-.62 2.88-.33 4.82.79 4.21 2.43 7.76 8 7.76 12.12z"
            fill={`url(#prefix__c_dark_${svgId})`}
          />
          <path
            d="M50.56 38.22l-1.1-.63L21 21.14a.44.44 0 00-.72.42v28.33a1.49 1.49 0 00.23.74 1.42 1.42 0 00.49.51l28.46 16.45 1.1.63a.5.5 0 00.49.06.49.49 0 00.23-.47V39.47a1.61 1.61 0 00-.72-1.25z"
            fill={`url(#prefix__d_dark_${svgId})`}
          />
          <path
            d="M38 41.63a5 5 0 00-2.25-3.9c-1.25-.72-2.26-.13-2.26 1.3a4.73 4.73 0 00.84 2.5l-.84 5.31 4.51 2.6-.84-6.27a1.48 1.48 0 00.84-1.54z"
            fill={`url(#prefix__e_dark_${svgId})`}
          />
          <path
            d="M51.41 38.51a1.9 1.9 0 00-.64-.65l-1.1-.63-28.49-16.45-.1-.05-.61.35a.33.33 0 01.17 0 .6.6 0 01.32.1l28.5 16.41 1.1.63a1.5 1.5 0 01.49.51s.05.09.08.14l.36-.21z"
            fill="#6f6f6f"
          />
        </>
      ) : (
        <>
          <defs>
            <linearGradient
              id="prefix__b"
              x1={27.98}
              y1={73.72}
              x2={53.65}
              y2={58.9}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#525252" stopOpacity={0.05} />
              <stop offset={1} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient
              id={`prefix__c_${svgId}`}
              x1={17.33}
              y1={40.68}
              x2={53.57}
              y2={19.76}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#f4f4f4" />
              <stop offset={0.78} stopColor="#e0e0e0" />
              <stop offset={1} stopColor="#c6c6c6" />
            </linearGradient>
            <linearGradient
              id={`prefix__d_${svgId}`}
              x1={28.59}
              y1={16.01}
              x2={58.88}
              y2={68.47}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#f4f4f4" />
              <stop offset={0.11} stopColor="#e0e0e0" />
              <stop offset={0.25} stopColor="#d8d8d8" />
              <stop offset={0.44} stopColor="#c6c6c6" />
              <stop offset={0.53} stopColor="#ababab" />
              <stop offset={0.93} stopColor="#a8a8a8" />
              <stop offset={1} stopColor="#8d8d8d" />
            </linearGradient>
            <linearGradient
              id={`prefix__a_${svgId}`}
              x1={26.93}
              y1={50.69}
              x2={61.39}
              y2={50.69}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#a8a8a8" />
              <stop offset={1} stopColor="#c6c6c6" />
            </linearGradient>
            <linearGradient
              id={`prefix__e_${svgId}`}
              x1={39.97}
              y1={32.38}
              x2={39.97}
              y2={1.64}
              xlinkHref={`#prefix__a_${svgId}`}
            />
            <linearGradient
              id={`prefix__f_${svgId}`}
              x1={24.58}
              y1={44.68}
              x2={51.62}
              y2={44.68}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#e0e0e0" />
              <stop offset={1} stopColor="#c6c6c6" />
            </linearGradient>
            <linearGradient
              id={`prefix__g_${svgId}`}
              x1={32.72}
              y1={45.46}
              x2={38.82}
              y2={41.94}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#a8a8a8" />
              <stop offset={1} stopColor="#8d8d8d" />
            </linearGradient>
            <linearGradient
              id={`prefix__h_${svgId}`}
              x1={20.61}
              y1={20.85}
              x2={52.7}
              y2={39.38}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0.67} stopColor="#fff" />
              <stop offset={0.76} stopColor="#fff" stopOpacity={0.99} />
              <stop offset={0.8} stopColor="#fdfdfd" stopOpacity={0.96} />
              <stop offset={0.84} stopColor="#fbfbfb" stopOpacity={0.91} />
              <stop offset={0.87} stopColor="#f7f7f7" stopOpacity={0.83} />
              <stop offset={0.9} stopColor="#f3f3f3" stopOpacity={0.74} />
              <stop offset={0.92} stopColor="#ededed" stopOpacity={0.62} />
              <stop offset={0.95} stopColor="#e6e6e6" stopOpacity={0.48} />
              <stop offset={0.97} stopColor="#dfdfdf" stopOpacity={0.31} />
              <stop offset={0.99} stopColor="#d6d6d6" stopOpacity={0.13} />
              <stop offset={1} stopColor="#d0d0d0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path fill="none" d="M0 0h80v80H0z" />
          <path
            fill={`url(#prefix__b_${svgId})`}
            d="M20.28 60.39l10.27-5.94 30.8 17.79-10.26 5.93-30.81-17.78z"
          />
          <path
            d="M61.16 32.9a1.44 1.44 0 00-.5-.51l-1.1-.64-28.48-16.44a.52.52 0 00-.5-.06l-10.11 5.83c-.11.07 2.16 28.77 2.16 28.77l4.3 2.79L61.26 33.1a1.24 1.24 0 00-.1-.2z"
            fill={`url(#prefix__c_${svgId})`}
          />
          <path
            d="M61.16 62.45a.5.5 0 00.23-.48V33.64a1.38 1.38 0 00-.13-.54L26.93 52.64l24.12 15.64z"
            fill={`url(#prefix__d_${svgId})`}
          />
          <path
            d="M61.16 62.45a.5.5 0 00.23-.48V33.64a1.38 1.38 0 00-.13-.54L26.93 52.64l24.12 15.64z"
            fill={`url(#prefix__a_${svgId})`}
          />
          <path
            d="M46.88 31.4a.85.85 0 00.5.69 2.69 2.69 0 002.41 0 .85.85 0 00.49-.7V18.27c0-5.39-4.15-12-9.46-15.07-3-1.76-6-2-8.22-.78-1.9 1.09-3 3.19-3 5.89V21.5a.85.85 0 00.5.7 2.67 2.67 0 002.4 0 .87.87 0 00.5-.7V8.31a3.29 3.29 0 011.3-2.95c1.08-.62 2.88-.33 4.82.79 4.21 2.43 7.76 8 7.76 12.12z"
            fill={`url(#prefix__e_${svgId})`}
          />
          <path
            d="M50.56 38.22l-1.1-.63L21 21.14a.44.44 0 00-.72.42v28.33a1.49 1.49 0 00.23.74 1.42 1.42 0 00.49.51l28.46 16.45 1.1.63a.5.5 0 00.49.06.49.49 0 00.23-.47V39.47a1.61 1.61 0 00-.72-1.25z"
            fill={`url(#prefix__f_${svgId})`}
          />
          <path
            d="M38 41.63a5 5 0 00-2.25-3.9c-1.25-.72-2.26-.13-2.26 1.3a4.73 4.73 0 00.84 2.5l-.84 5.31 4.51 2.6-.84-6.27a1.48 1.48 0 00.84-1.54z"
            fill={`url(#prefix__g_${svgId})`}
          />
          <path
            d="M51.41 38.51a1.9 1.9 0 00-.64-.65l-1.1-.63-28.49-16.45-.1-.05-.61.35a.33.33 0 01.17 0 .6.6 0 01.32.1l28.5 16.41 1.1.63a1.5 1.5 0 01.49.51s.05.09.08.14l.36-.21z"
            fill={`url(#prefix__h_${svgId})`}
          />
        </>
      )}
    </svg>
  );
};

UnauthorizedIllustration.propTypes = {
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['lg', 'sm']),
  theme: PropTypes.oneOf(['light', 'dark']),
};

export default UnauthorizedIllustration;
