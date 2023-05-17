/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as classes from './Header.module.scss';
import Link from 'next/link';

function Header() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>Carbon</a>
      </Link>
      <nav aria-label="Navigation" className={classes.nav}>
        <ul className={classes.links}>
          <li>
            <Link href="/packages">
              <a>Packages</a>
            </Link>
          </li>
          <li>
            <Link href="/insights">
              <a>Insights</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Header };
