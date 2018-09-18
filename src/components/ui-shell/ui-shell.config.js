'use strict';

const header = {
  name: 'IBM [Platform]',
  links: [
    {
      href: '/component/ui-shell--default',
      title: 'L1 link 1',
    },
    {
      href: '/component/ui-shell--default',
      title: 'L1 link 2',
    },
    {
      href: '/component/ui-shell--default',
      title: 'L1 link 3',
    },
    {
      href: '/component/ui-shell--default',
      title: 'L1 link 4',
    },
  ],
  actions: [
    {
      title: 'Action 1',
    },
    {
      title: 'Action 2',
    },
    {
      title: 'Action 3',
    },
    {
      title: 'Action 4',
    },
  ],
};

const sidenav = {
  state: {
    expanded: false,
  },
  title: {
    text: '[L1 name here]',
  },
  links: [
    {
      category: 'L2 Category',
      links: createSidebarLinks(2),
    },
    {
      category: 'L2 Category',
      links: createSidebarLinks(3, 1),
      active: true,
    },
    {
      category: 'L2 Category',
      links: createSidebarLinks(4),
    },
  ],
};

const nav = {
  state: {
    expanded: false,
  },
  sections: [
    {
      items: [
        {
          type: 'link',
          title: 'L1 link',
          href: '/component/ui-shell--platform-navigation-expanded',
        },
        {
          type: 'link',
          title: 'L1 link',
          href: '/component/ui-shell--platform-navigation-expanded',
        },
      ],
    },
    {
      items: [
        {
          type: 'link',
          title: 'L1 link',
          href: '/component/ui-shell--platform-navigation-expanded',
        },
        {
          type: 'link',
          title: 'L1 link',
          href: '/component/ui-shell--platform-navigation-expanded',
        },
        {
          type: 'link',
          title: 'L1 link',
          href: '/component/ui-shell--platform-navigation-expanded',
        },
        {
          type: 'category',
          title: 'L1 category',
          links: [
            {
              title: 'L2 link',
              href: '/component/ui-shell--platform-navigation-expanded',
            },
            {
              title: 'L2 link',
              href: '/component/ui-shell--platform-navigation-expanded',
            },
            {
              title: 'L2 link',
              href: '/component/ui-shell--platform-navigation-expanded',
            },
          ],
        },
      ],
    },
  ],
};

module.exports = {
  preview: 'ui-shell-preview',
  meta: {
    xVersionOnly: true,
  },
  context: {
    header,
    nav,
    sidenav,
    switcher,
  },
  variants: [
    {
      name: 'Side-nav expanded',
      context: {
        sidenav: {
          state: {
            expanded: true,
          },
        },
      },
    },
    {
      name: 'Switcher Expanded Default',
      context: {
        switcher: {
          state: {
            expanded: true,
            showAll: false,
          },
        },
      },
    },
    {
      name: 'Platform nav expanded',
      context: {
        nav: {
          state: {
            expanded: true,
          },
        },
      },
    },
    {
      name: 'Switcher All Products',
      context: {
        switcher: {
          state: {
            expanded: true,
            showAll: true,
          },
        },
      },
    },
    {
      name: 'Platform nav category expanded',
      context: {
        nav: {
          state: {
            expanded: true,
            category: true,
          },
        },
      },
    },
  ],
};

function createSidebarLinks(count, activeIndex) {
  return Array.from({ length: count }, (_, i) => {
    const link = {
      title: 'L3 link',
      href: '/component/ui-shell--default',
    };
    if (i === activeIndex) {
      link.active = true;
    }
    return link;
  });
}
