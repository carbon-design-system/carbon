/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { TestBed } from '@angular/core/testing';

setupZoneTestEnv();

// Ensure TestBed is reset after every test so component-level
// CUSTOM_ELEMENTS_SCHEMA registrations do not leak between suites.
afterEach(() => {
  TestBed.resetTestingModule();
});
