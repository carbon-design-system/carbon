import { layout, header, aside, content } from './Page.module.scss';
import cx from 'classnames';
import Link from 'next/link';

export default function Page({ children }) {
  return (
    <div className={layout}>
      <header className={cx(header, 'bg-ui-05 p-5 text-white')}>
        Utility CSS
      </header>
      <aside className={cx(aside, 'p-5')}>
        <nav>
          <div className="mb-8">
            <div className="mb-3 text-text-02">Spacing</div>
            <ul>
              <li>
                <Link href="/margin">
                  <a>Margin</a>
                </Link>
              </li>
              <li>
                <Link href="/padding">
                  <a>Padding</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main className={cx(content, 'bg-ui-01 p-5')}>{children}</main>
    </div>
  );
}
