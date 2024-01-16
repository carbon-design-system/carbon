/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default interface IconDescriptor {
  elem?: string;

  attrs?: Record<string, string>;

  content?: Array<IconDescriptor>;
}
