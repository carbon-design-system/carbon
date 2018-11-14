const { prefix } = require('../../globals/js/settings');

const header = {
  company: 'IBM',
  platform: '[Platform]',
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
  navLinks: [
    {
      href: '/component/ui-shell--default',
      title: 'L1 link 1',
    },
    {
      href: '/component/ui-shell--default',
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

const nav = {
  state: {
    expanded: false,
  },
  sections: [
    {
      items: [
        {
          type: 'link',
          title: 'Item link',
          href: '/component/ui-shell--platform-navigation-expanded',
          hasIcon: true,
        },
        {
          type: 'link',
          title: 'Item link',
          href: '/component/ui-shell--platform-navigation-expanded',
          hasIcon: true,
        },
      ],
    },
    {
      items: [
        {
          type: 'link',
          title: 'Item link',
          href: '/component/ui-shell--platform-navigation-expanded',
          hasIcon: true,
          active: true,
        },
        {
          type: 'link',
          title: 'Item link',
          href: '/component/ui-shell--platform-navigation-expanded',
          hasIcon: true,
        },
        {
          type: 'link',
          title: 'Item link',
          href: '/component/ui-shell--platform-navigation-expanded',
          hasIcon: true,
        },
        {
          type: 'category',
          title: 'L1 category',
          hasIcon: true,
          links: [
            {
              title: 'Nested link',
              href: '/component/ui-shell--platform-navigation-expanded',
            },
            {
              title: 'Nested link',
              href: '/component/ui-shell--platform-navigation-expanded',
              active: true,
            },
            {
              title: 'Nested link',
              href: '/component/ui-shell--platform-navigation-expanded',
            },
          ],
        },
      ],
    },
  ],
};

const switcher = {
  state: {
    expanded: false,
    showAll: false,
  },
  links: [
    {
      href: '/component/ui-shell--default',
      title: 'My Product',
    },
    {
      href: '/component/ui-shell--default',
      title: 'My Product 2',
    },
  ],
  allLinks: [
    {
      href: '/component/ui-shell--default',
      title: 'All Products',
    },
    {
      href: '/component/ui-shell--default',
      title: 'All Products',
    },
    {
      href: '/component/ui-shell--default',
      title: 'All Products',
    },
    {
      href: '/component/ui-shell--default',
      title: 'All Products',
    },
    {
      href: '/component/ui-shell--default',
      title: 'All Products',
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
            hasIcons: true,
            expanded: true,
          },
        },
      },
    },
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
      name: 'Navigation expanded',
      context: {
        nav: {
          state: {
            expanded: true,
          },
        },
      },
    },
    {
      name: 'Navigation category expanded',
      context: {
        nav: {
          state: {
            expanded: true,
            category: true,
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
      name: 'Navigation with no icons',
      context: {
        nav: {
          state: {
            expanded: true,
            category: true,
          },
          sections: nav.sections.map(section => ({
            items: section.items.map(item => ({
              ...item,
              hasIcon: false,
            })),
          })),
        },
      },
    },
  ],
};

function createSidebarLinks(count, activeIndex) {
  return Array.from({ length: count }, (_, i) => {
    const link = {
      title: 'Nested link',
      href: '/component/ui-shell--default',
    };
    if (i === activeIndex) {
      link.active = true;
    }
    return link;
  });
}
