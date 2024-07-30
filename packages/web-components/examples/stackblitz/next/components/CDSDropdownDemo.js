/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import CDSDropdown from '@carbon/web-components/es/components-react/dropdown/dropdown.js';
import CDSDropdownItem from '@carbon/web-components/es/components-react/dropdown/dropdown-item.js';
import styles from './CDSDropdownDemo.module.css';

const App = () => (
  <div className={styles.contents}>
    <h1>Hello World! 👋</h1>
    <div className={styles['dropdown-container']}>
      <CDSDropdown triggerContent="Select an item">
        <CDSDropdownItem value="all">Option 1</CDSDropdownItem>
        <CDSDropdownItem value="cloudFoundry">Option 2</CDSDropdownItem>
        <CDSDropdownItem value="staging">Option 3</CDSDropdownItem>
        <CDSDropdownItem value="dea">Option 4</CDSDropdownItem>
        <CDSDropdownItem value="router">Option 5</CDSDropdownItem>
      </CDSDropdown>
    </div>
  </div>
);

export default App;
