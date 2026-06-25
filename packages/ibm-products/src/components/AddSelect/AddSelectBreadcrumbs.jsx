//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings';

const blockClass = `${pkg.prefix}--add-select__breadcrumbs`;
const componentName = 'AddSelectBreadcrumbs';

export let AddSelectBreadcrumbs = ({ multi, onClick, path }) => {
  const clickHandler = (e, idx) => {
    e.preventDefault();
    onClick(idx);
  };

  const classNames = cx(blockClass, {
    [`${blockClass}-multi`]: multi,
  });

  return (
    <Breadcrumb noTrailingSlash className={classNames}>
      {path.map((entry, idx) => {
        const isCurrentPage = idx === path.length - 1;
        return (
          <BreadcrumbItem
            key={entry.id}
            isCurrentPage={isCurrentPage}
            onClick={(e) => clickHandler(e, idx)}
            href="#"
          >
            {entry.title}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

AddSelectBreadcrumbs.propTypes = {
  multi: PropTypes.bool,
  onClick: PropTypes.func,
  path: PropTypes.array,
};

AddSelectBreadcrumbs.displayName = componentName;
