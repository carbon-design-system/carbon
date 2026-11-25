/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// re-register everything v2 does — items, skeletons and related
// elements — so that swapping this import in is a drop-in
// only the form control itself gets a preview tag
import '../index';
import './fluid-select';
