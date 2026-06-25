/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import { Search } from '@carbon/react';
import * as React from 'react';
import { pkg } from '../../../../../settings';

const blockClass = `${pkg.prefix}--datagrid`;

const Actions = ({ searchText, setSearchText, findColumnPlaceholderLabel }) => {
  return (
    <div className={`${blockClass}__customize-columns-tearsheet--actions`}>
      <Search
        placeholder={findColumnPlaceholderLabel}
        value={searchText}
        size="lg"
        labelText={findColumnPlaceholderLabel}
        onChange={(e) => {
          // TODO: is it performant?
          setSearchText(e.target.value);
        }}
      />
    </div>
  );
};

Actions.propTypes = {
  columns: PropTypes.array.isRequired,
  findColumnPlaceholderLabel: PropTypes.string,
  originalColumnDefinitions: PropTypes.array.isRequired,
  resetToDefaultLabel: PropTypes.string,
  searchText: PropTypes.string.isRequired,
  setColumnsObject: PropTypes.func.isRequired,
  setSearchText: PropTypes.func.isRequired,
};

export default Actions;
