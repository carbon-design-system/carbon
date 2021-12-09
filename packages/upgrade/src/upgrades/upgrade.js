/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

class Upgrade {
  static create({ name, updates }) {
    return new Upgrade(name, updates);
  }

  constructor(name, updates) {
    this.name = name;
    this.updates = updates;
  }
}

module.exports = {
  Upgrade,
};
