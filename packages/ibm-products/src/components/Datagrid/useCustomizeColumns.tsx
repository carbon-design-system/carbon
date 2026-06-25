/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  CustomizeColumnsTearsheetWrapper,
  ToggleButtonWrapper,
} from './Datagrid/addons/CustomizeColumns';
import { DataGridState } from './types';
import { Hooks, TableInstance } from 'react-table';
import { ComponentProps } from 'react';

const useInstance = (instance: TableInstance) => {
  const { customizeColumnsProps } = instance as DataGridState;
  const { labels } = customizeColumnsProps || {};
  const [isTearsheetOpen, setIsTearsheetOpen] = React.useState(false);
  const launcherButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const CustomizeColumnsButton = React.useCallback(
    (props: ComponentProps<typeof ToggleButtonWrapper>) => (
      <ToggleButtonWrapper
        {...props}
        iconTooltipLabel={labels?.iconTooltipLabel}
        isTearsheetOpen={isTearsheetOpen}
        setIsTearsheetOpen={setIsTearsheetOpen}
        ref={launcherButtonRef}
      />
    ),
    [isTearsheetOpen, labels?.iconTooltipLabel]
  );
  const CustomizeColumnsTearsheet = React.useCallback(
    (props: ComponentProps<typeof CustomizeColumnsTearsheetWrapper>) => (
      <CustomizeColumnsTearsheetWrapper
        {...props}
        launcherButtonRef={launcherButtonRef}
      />
    ),
    [launcherButtonRef]
  );

  Object.assign(instance, {
    customizeColumnsProps: {
      ...customizeColumnsProps,
      isTearsheetOpen,
      setIsTearsheetOpen,
    },
    CustomizeColumnsButton,
    CustomizeColumnsTearsheet,
  });
};

const useCustomizeColumns = (hooks: Hooks) => {
  hooks.useInstance.push(useInstance);
};

export default useCustomizeColumns;
