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

export const NoDataIllustration = ({ theme, size, alt, ...rest }) => {
  const svgId = useId();
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      height={80}
      viewBox="0 0 80 80"
      className={cx([
        `${blockClass}__illustration`,
        `${blockClass}__illustration-noData`,
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
              id={`prefix__a_dark_${svgId}`}
              x1={11.12}
              y1={43.34}
              x2={40}
              y2={43.34}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#393939" />
              <stop offset={1} stopColor="#262626" />
            </linearGradient>
            <linearGradient
              id={`prefix__b_dark_${svgId}`}
              x1={40}
              y1={43.34}
              x2={68.88}
              y2={43.34}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#161616" />
              <stop offset={1} stopColor="#262626" />
            </linearGradient>
            <linearGradient
              id={`prefix__c_dark_${svgId}`}
              x1={32.78}
              y1={30.83}
              x2={47.22}
              y2={5.83}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#525252" />
              <stop offset={1} stopColor="#393939" />
            </linearGradient>
          </defs>
          <path fill="none" d="M0 0h80v80H0z" />
          <path
            opacity={0.25}
            d="M40 78.34L11.13 61.67 40 45.01l28.86 16.66L40 78.34z"
          />
          <path
            fill={`url(#prefix__a_dark_${svgId})`}
            d="M40 68.35L11.12 51.68l.01-33.35L40 34.99v33.36z"
          />
          <path
            fill={`url(#prefix__b_dark_${svgId})`}
            d="M68.88 51.68L40 68.35V34.99l28.87-16.66.01 33.35z"
          />
          <path
            fill={`url(#prefix__c_dark_${svgId})`}
            d="M40 34.99L11.13 18.33 40 1.66l28.87 16.67L40 34.99z"
          />
          <path
            fill="#262626"
            d="M25.97 26.67l28.67-16.55-.42-.24-28.68 16.56.43.23z"
          />
          <path
            fill="#6f6f6f"
            d="M40 35.24L11.13 18.57v-.24l.21-.12 28.87 16.67-.21.11v.25z"
          />
          <path
            fill="#525252"
            d="M21.49 33.33l-8.2-4.73.01-5.69 8.19 4.74v5.68z"
          />
        </>
      ) : (
        <>
          <defs>
            <linearGradient
              id={`prefix__a_${svgId}`}
              x1={18.35}
              y1={74.17}
              x2={61.65}
              y2={49.17}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#525252" stopOpacity={0.05} />
              <stop offset={1} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient
              id={`prefix__b_${svgId}`}
              x1={15.16}
              y1={43.34}
              x2={40.31}
              y2={43.34}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#e0e0e0" />
              <stop offset={1} stopColor="#c6c6c6" />
            </linearGradient>
            <linearGradient
              id={`prefix__c_${svgId}`}
              x1={40}
              y1={43.34}
              x2={68.88}
              y2={43.34}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#a8a8a8" />
              <stop offset={1} stopColor="#c6c6c6" />
            </linearGradient>
            <linearGradient
              id={`prefix__d_${svgId}`}
              x1={18.35}
              y1={30.83}
              x2={61.65}
              y2={5.83}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#f4f4f4" />
              <stop offset={1} stopColor="#e0e0e0" />
            </linearGradient>
          </defs>
          <path fill="none" d="M0 0h80v80H0z" />
          <path
            fill={`url(#prefix__a_${svgId})`}
            d="M40 78.34L11.13 61.67 40 45.01l28.86 16.66L40 78.34z"
          />
          <path
            fill={`url(#prefix__b_${svgId})`}
            d="M40 68.35L11.12 51.68l.01-33.35L40 34.99v33.36z"
          />
          <path
            fill={`url(#prefix__c_${svgId})`}
            d="M68.88 51.68L40 68.35V34.99l28.87-16.66.01 33.35z"
          />
          <path
            fill={`url(#prefix__d_${svgId})`}
            d="M40 34.99L11.13 18.33 40 1.66l28.87 16.67L40 34.99z"
          />
          <path
            fill="#c6c6c6"
            d="M25.97 26.67l28.67-16.55-.42-.24-28.68 16.56.43.23z"
          />
          <path
            fill="#fff"
            d="M40 35.24L11.13 18.57v-.24l.21-.12 28.87 16.67-.21.11v.25zM21.49 33.33l-8.2-4.73.01-5.69 8.19 4.74v5.68z"
          />
        </>
      )}
    </svg>
  );
};

NoDataIllustration.propTypes = {
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['lg', 'sm']),
  theme: PropTypes.oneOf(['light', 'dark']),
};

export default NoDataIllustration;
