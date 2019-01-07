const { prefix } = require('../../globals/js/settings');

const navigationMenu = {
  state: {
    expanded: false,
  },
  sections: [
    {
      items: [
        {
          type: 'link',
          title: 'Item link',
          href: 'javascript:void(0)',
          // href: '/component/ui-shell--platform-navigation-expanded',
          hasIcon: true,
        },
        {
          type: 'link',
          title: 'Item link',
          href: 'javascript:void(0)',
          // href: '/component/ui-shell--platform-navigation-expanded',
          hasIcon: true,
        },
      ],
    },
    {
      items: [
        {
          type: 'link',
          title: 'Item link',
          href: 'javascript:void(0)',
          // href: '/component/ui-shell--platform-navigation-expanded',
          hasIcon: true,
          active: true,
        },
        {
          type: 'link',
          title: 'Item link',
          href: 'javascript:void(0)',
          // href: '/component/ui-shell--platform-navigation-expanded',
          hasIcon: true,
        },
        {
          type: 'link',
          title: 'Item link',
          href: 'javascript:void(0)',
          // href: '/component/ui-shell--platform-navigation-expanded',
          hasIcon: true,
        },
        {
          type: 'category',
          title: 'L1 category',
          hasIcon: true,
          links: [
            {
              title: 'Nested link',
              href: 'javascript:void(0)',
              // href: '/component/ui-shell--platform-navigation-expanded',
            },
            {
              title: 'Nested link',
              href: 'javascript:void(0)',
              // href: '/component/ui-shell--platform-navigation-expanded',
              active: true,
            },
            {
              title: 'Nested link',
              href: 'javascript:void(0)',
              // href: '/component/ui-shell--platform-navigation-expanded',
            },
          ],
        },
      ],
    },
  ],
  idSuffix: Math.random()
    .toString(36)
    .substr(2),
};

const switcher = {
  state: {
    expanded: false,
    showAll: false,
  },
  links: [
    {
      href: 'javascript:void(0)',
      title: 'My Product',
    },
    {
      href: 'javascript:void(0)',
      title: 'My Product 2',
    },
  ],
  allLinks: [
    {
      href: 'javascript:void(0)',
      title: 'All Products',
    },
    {
      href: 'javascript:void(0)',
      title: 'All Products',
    },
    {
      href: 'javascript:void(0)',
      title: 'All Products',
    },
    {
      href: 'javascript:void(0)',
      title: 'All Products',
    },
    {
      href: 'javascript:void(0)',
      title: 'All Products',
    },
  ],
  idSuffix: Math.random()
    .toString(36)
    .substr(2),
};

const header = {
  company: 'IBM',
  platform: '[Platform]',
  links: [
    {
      href: 'javascript:void(0)',
      title: 'L1 link 1',
    },
    {
      href: 'javascript:void(0)',
      title: 'L1 link 2',
    },
    {
      href: 'javascript:void(0)',
      title: 'L1 link 3',
    },
    {
      href: 'javascript:void(0)',
      title: 'L1 link 4',
    },
  ],
  actions: [
    {
      title: 'Action 1',
      switcher,
    },
    {
      title: 'Action 2',
      switcher,
    },
    {
      title: 'Action 3',
      switcher,
    },
    {
      title: 'Action 4',
      switcher,
    },
  ],
  navLinks: [
    {
      href: 'javascript:void(0)',
      title: 'L1 link 1',
    },
    {
      href: 'javascript:void(0)',
      title: 'L1 link 2',
    },
    {
      title: 'L1 link 3',
      state: {
        expanded: true,
      },
      items: [
        {
          href: 'javascript:void(0)',
          title: 'Link 1',
        },
        {
          href: 'javascript:void(0)',
          title: 'Link 2',
        },
        {
          href: 'javascript:void(0)',
          title: 'Ipsum architecto voluptatem',
        },
      ],
    },
    {
      title: 'L1 link 4',
      state: {
        expanded: false,
      },
      items: [
        {
          href: 'javascript:void(0)',
          title: 'Link 1',
        },
        {
          href: 'javascript:void(0)',
          title: 'Link 2',
        },
        {
          href: 'javascript:void(0)',
          title: 'Ipsum architecto voluptatem',
        },
      ],
    },
  ],
};

const sidenav = {
  state: {
    expanded: false,
    hasIcons: false,
    fixed: false,
  },
  title: {
    text: '[L1 name here]',
  },
  links: [
    {
      category: 'Category label',
      links: createSidebarLinks(2),
    },
    {
      category: 'Category label',
      links: createSidebarLinks(3, 1),
      active: true,
    },
    {
      category: 'Category label',
      links: createSidebarLinks(4),
    },
  ],
};

module.exports = {
  preview: 'ui-shell-preview',
  meta: {
    xVersionOnly: true,
    linkOnly: true,
  },
  context: {
    prefix,
    header,
    navigationMenu,
    sidenav,
    switcher,
    content: Array.from({ length: 10 }),
  },
  variants: [
    {
      name: 'Side-nav fixed',
      context: {
        sidenav: {
          state: {
            hasIcons: false,
            expanded: true,
            fixed: true,
          },
        },
      },
    },
    {
      name: 'Navigation with no icons',
      context: {
        navigationMenu: {
          state: {
            expanded: true,
            category: true,
          },
          sections: navigationMenu.sections.map(section => ({
            items: section.items.map(item => ({
              ...item,
              hasIcon: false,
            })),
          })),
          idSuffix: Math.random()
            .toString(36)
            .substr(2),
        },
      },
    },
  ],
};

function createSidebarLinks(count, activeIndex) {
  return Array.from({ length: count }, (_, i) => {
    const link = {
      title: 'Nested link',
      href: 'javascript:void(0)',
    };
    if (i === activeIndex) {
      link.active = true;
    }
    return link;
  });
}
