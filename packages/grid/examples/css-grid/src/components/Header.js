import Link from 'next/link';

export function Header({ children, ...rest }) {
  return <header {...rest} className="cds-header bx--align-items-center">{children}</header>;
}

export function HeaderLabel({ children, ...rest }) {
  return (
    <Link {...rest} href="/">
      <a className="bx--col-span-2 cds-header-label">{children}</a>
    </Link>
  );
}
