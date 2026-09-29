/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSFormItem from './form-item';
import CDSForm from './form';

export { CDSFormItem, CDSForm };

defineCustomElement(CDSFormItem);
defineCustomElement(CDSForm);
