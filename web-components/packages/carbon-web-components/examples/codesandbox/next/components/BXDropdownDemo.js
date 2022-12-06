/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import BXDropdown from '@carbon/web-components/es/components-react/dropdown/dropdown.js';
import BXDropdownItem from '@carbon/web-components/es/components-react/dropdown/dropdown-item.js';
import styles from './BXDropdownDemo.module.css';

const App = () => (
  <div className={styles.contents}>
    <h1>Hello World! 👋</h1>
    <div className={styles['dropdown-container']}>
      <BXDropdown triggerContent="Select an item">
        <BXDropdownItem value="all">Option 1</BXDropdownItem>
        <BXDropdownItem value="cloudFoundry">Option 2</BXDropdownItem>
        <BXDropdownItem value="staging">Option 3</BXDropdownItem>
        <BXDropdownItem value="dea">Option 4</BXDropdownItem>
        <BXDropdownItem value="router">Option 5</BXDropdownItem>
      </BXDropdown>
    </div>
  </div>
);

export default App;
