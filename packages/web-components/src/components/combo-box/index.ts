/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSComboBox from './combo-box';
import CDSComboBoxItem from './combo-box-item';

export { CDSComboBox, CDSComboBoxItem };

defineCustomElement(CDSComboBox);
defineCustomElement(CDSComboBoxItem);
