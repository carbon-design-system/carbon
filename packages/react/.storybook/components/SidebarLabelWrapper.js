import React from 'react';

import IconSidebarExternal from './IconSidebarExternal';

<script
  key="8"
  type="module"
  src="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/footer.min.js"
/>;

const SidebarLabelWrapper = ({ item }) => {
  if (item.type === 'docs' && item.id.startsWith('about-url-')) {
    const [, title, encodedURI] = item.title.split('@');

    const onClick = (e) => {
      e.preventDefault();
      window.open(decodeURIComponent(encodedURI));
    };

    return (
      <>
        <a
          className="sidebar-link"
          onClick={onClick}
          href={decodeURIComponent(encodedURI)}
          target="_blank">
          <IconSidebarExternal />
          <span className="sidebar-link-label">{title}</span>
        </a>
        <span className="invisible" aria-hidden>
          {title}
        </span>
      </>
    );
  } else if (item.type === 'docs' && item.id.startsWith('about-cookie-')) {
    const [, title, encodedURI] = item.title.split('@');

    const onClick = (e) => {
      e.preventDefault();
      window.open(decodeURIComponent(encodedURI));
    };

    return (
      <>
        <a
          className="sidebar-link"
          onClick={onClick}
          href={decodeURIComponent(encodedURI)}
          target="_blank">
          <IconSidebarExternal />
          <span className="sidebar-link-label" id="cds-cookie-preferences">
            {title}
          </span>
        </a>
        <span className="invisible" aria-hidden>
          {title}
        </span>
      </>
    );
  }
};

export default SidebarLabelWrapper;
