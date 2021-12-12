/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from 'next/link';
import React from 'react';

export default function IndexPage() {
  return (
    <>
      <header>
        Carbon
        <nav aria-label="Navigation">
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/packages">
                <a>Packages</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Support</h1>
      </main>
    </>
  );
}
