/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

const a11yWarningIcon = (prefix, notificationType) => (
  <svg
    className={`${prefix}--${notificationType}-notification__icon`}
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <path
        d="M18.05 15.95L9.925.95a.625.625 0 0 0-1.1 0L.7 15.95a.625.625 0 0 0 0 .625.625.625 0 0 0 .55.3H17.5a.625.625 0 0 0 .55-.925z"
        id="a"
      />
      <path
        d="M.55.006h1.406v5H.55v-5zm.7 8.119a.938.938 0 1 1 0-1.875.938.938 0 0 1 0 1.875z"
        id="b"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        d="M18.675 16.575l-8.125-15a.625.625 0 0 0-1.1 0l-8.125 15a.625.625 0 0 0 0 .625.625.625 0 0 0 .55.3h16.25a.625.625 0 0 0 .55-.925z"
        fill="#FDD13A"
      />
      <g>
        <path
          d="M9.3 6.881h1.406v5H9.3v-5zM10 15a.938.938 0 1 1 0-1.875A.938.938 0 0 1 10 15z"
          fill="#171717"
          fillRule="nonzero"
        />
      </g>
      <path d="M0 0h20v20H0z" />
    </g>
  </svg>
);

export default a11yWarningIcon;
