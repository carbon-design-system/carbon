'use strict';

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
};

const headernav = {
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
      title: 'L1 link 3',
    },
    {
      title: 'L1 link 4',
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

module.exports = {
  preview: 'ui-shell-preview',
  meta: {
    xVersionOnly: true,
  },
  context: {
    header,
    headernav,
    nav,
    sidenav,
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
    {
      name: 'Platform nav with no icons',
      context: {
        nav: {
          state: {
            expanded: true,
            category: true,
          },
          sections: nav.sections.map(section => {
            return {
              items: section.items.map(item => ({
                ...item,
                hasIcon: false,
              })),
            };
          }),
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
