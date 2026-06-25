/* Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomizeColumnsTearsheet from './CustomizeColumnsTearsheet';
import { InlineEditContext } from '../InlineEdit/InlineEditContext';

const TearsheetWrapper = ({ instance, launcherButtonRef }) => {
  const {
    onSaveColumnPrefs,
    isTearsheetOpen,
    setIsTearsheetOpen,
    labels,
    ...rest
  } = instance.customizeColumnsProps;

  const { state } = useContext(InlineEditContext);
  const { featureFlags } = state || {};

  useEffect(() => {
    if (
      featureFlags &&
      !featureFlags?.['enable-datagrid-useCustomizeColumns']
    ) {
      console.error(
        `Datagrid useCustomizeColumns extension has not been enabled via feature flag.`
      );
    }
  }, [featureFlags]);

  return (
    <CustomizeColumnsTearsheet
      {...rest}
      {...labels}
      isOpen={isTearsheetOpen}
      setIsTearsheetOpen={setIsTearsheetOpen}
      launcherButtonRef={launcherButtonRef}
      columnDefinitions={instance.allColumns}
      originalColumnDefinitions={instance.columns}
      onSaveColumnPrefs={(updatedColDefs) => {
        setTimeout(() => {
          const hiddenIds = updatedColDefs
            .filter((colDef) => !colDef.isVisible)
            .map((colDef) => colDef.id);
          instance.setHiddenColumns(hiddenIds);
          if (typeof instance.setColumnOrder === 'function') {
            instance.setColumnOrder(updatedColDefs.map((colDef) => colDef.id));
          } else {
            // eslint-disable-next-line no-console
            console.warn(
              "Column order can not be updated. Did you forget to add 'useColumnOrder' in 'useDatagrid'"
            );
          }
        }, 0);
        if (typeof onSaveColumnPrefs === 'function') {
          onSaveColumnPrefs(updatedColDefs);
        }
      }}
    />
  );
};

TearsheetWrapper.propTypes = {
  instance: PropTypes.object.isRequired,
};

export default TearsheetWrapper;
