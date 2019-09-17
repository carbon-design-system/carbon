import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import ResourceHeader from './ResourceHeader';
import {
  Breadcrumb,
  BreadcrumbItem,
} from '@rocketsoftware/carbon-components-react';
import Dropdown from '../Dropdown';

const svg = (
  <svg width="40" height="38">
    <g fill="#152935" fillRule="evenodd">
      <path d="M18.7085833 32.1370833c-.6216666 0-1.1258333.56-1.1258333 1.25 0 .6908334.5041667 1.25 1.1258333 1.25.6216667 0 1.1266667-.5591666 1.1266667-1.25 0-.69-.505-1.25-1.1266667-1.25m0-9.2586666c-.6216666 0-1.1258333.5591666-1.1258333 1.25 0 .69.5041667 1.25 1.1258333 1.25.6216667 0 1.1266667-.56 1.1266667-1.25 0-.6908334-.505-1.25-1.1266667-1.25" />
      <path d="M20.879 18.0273333c-.1783333.0566667-.37.06-.55.0066667L1.92983333 12.6673333c-.405-.1175-.68416666-.4941666-.68-.915l.04-4.12499997C1.29066667 7.58066667 1.3065 7.539 1.31316667 7.494L20.119 13.1256667c.1575.0458333.3183333.0691666.48.0691666.1758333 0 .3533333-.0283333.5258333-.0825L38.3215 7.4915v4.2958333c0 .4133334-.265.7741667-.6575.8991667l-16.785 5.3408333zm16.37-2.39l-16.5075 5.395c-.09.0283334-.185.0291667-.2683333.005L2.58566667 15.6815l2.75-.7183333L19.979 19.234c.2008333.0591667.4075.0883333.6141667.0883333.2241666 0 .4475-.035.665-.1033333l13.0575-4.155 2.9333333.5733333zm.415 6.16l-3.3883333 1.0775-.0458334-.0108333-.0058333.0275-13.3458333 4.2466667c-.1783334.0566666-.3691667.0591666-.5491667.0058333L1.92983333 21.7773333c-.405-.1175-.68416666-.4933333-.68-.915L1.2915 16.5981667 20.119 22.2365c.1566667.045.3175.0683333.4791667.0683333.1758333 0 .3533333-.0275.5266666-.0825L38.3215 16.6015v4.2958333c0 .4133334-.265.775-.6575.9zm-.3616667 3.0808334L20.7406667 30.2915c-.0875.0275-.1808334.0291667-.2675.005L2.589 24.9406667l3.03-.785 14.3608333 4.1891666c.2008334.0583334.4075.0875.6133334.0875.225 0 .4483333-.0341666.665-.1033333l13.0675-4.1575 2.9766666.7066667zm.3616667 6.1775L20.879 36.3965c-.1783333.0566667-.37.06-.55.0066667L1.92983333 31.0365c-.405-.1175-.68416666-.4941667-.68-.915L1.2915 25.8573333l18.8275 5.6375c.1575.0458334.3183333.0691667.48.0691667.1758333 0 .3533333-.0283333.5258333-.0825L38.3215 25.8606667V30.1565c0 .4133333-.265.7741667-.6575.8991667zM19.3006667 2.11483333c.1541666-.04166666.3175-.0425.4716666-.00333333l17.545 4.3925-16.5766666 5.4183333c-.0875.0283334-.1808334.0291667-.2675.005L2.5765 6.56816667l16.7241667-4.45333334zM39.5715 11.7873333V7.49233333C39.5715 6.484 38.8881667 5.609 37.9106667 5.364l-17.835-4.465c-.36-.09083333-.7391667-.0875-1.0966667.00833333L1.669 5.5165C.72066667 5.769.05066667 6.63233333.03983333 7.61483333l-.04 4.12499997c-.00916666.9783334.64 1.8533334 1.58 2.1275L2.999 14.2815l-1.68.4383333c-.7425.1975-1.2675.8733334-1.275 1.6425l-.04416667 4.4875c-.00916666.9791667.64 1.8541667 1.58 2.1283334L3.274 23.4723333 1.319 23.979c-.7425.1975-1.2675.8725-1.275 1.6416667L-.00016667 30.109c-.00916666.9783333.64 1.8533333 1.58 2.1275L19.979 37.6031667c.2008333.0591666.4075.0883333.6141667.0883333.2241666 0 .4475-.035.665-.1033333l16.785-5.3408334C38.9565 31.9565 39.5715 31.1165 39.5715 30.1565V25.489c0-.7891667-.535-1.4741667-1.3075-1.6666667l-1.6275-.3866666 1.4066667-.4475C38.9565 22.6973333 39.5715 21.8565 39.5715 20.8973333v-4.6666666c0-.7891667-.5341667-1.4741667-1.3316667-1.6725l-1.445-.2825 1.2483334-.3975C38.9565 13.5873333 39.5715 12.7473333 39.5715 11.7873333z" />
      <path d="M18.7085833 13.7679167c-.6216666 0-1.1258333.56-1.1258333 1.25 0 .6908333.5041667 1.25 1.1258333 1.25.6216667 0 1.1266667-.5591667 1.1266667-1.25 0-.69-.505-1.25-1.1266667-1.25" />
    </g>
  </svg>
);

const items = [
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3',
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
];

const props = {
  full: () => ({
    title: text('Title', 'Resource Name'),
    isActive: true,
    subtitle: [
      'Dallas 9',
      'Public IP: 169.55.5.4',
      'Private IP: 10.142.128.147',
    ],
    icon: svg,
    status: [
      { text: 'Powered On', isTrue: true },
      { text: 'Connected', isTrue: false },
    ],
  }),
  simple: () => ({
    title: text('Title', 'Resource Name'),
  }),
  withIcon: () => ({
    title: text('Title', 'Resource Name'),
    icon: svg,
  }),
  withIconNoActions: () => ({
    title: text('Title', 'Resource Name'),
    icon: svg,
    subtitle: [
      'Dallas 9',
      'Public IP: 169.55.5.4',
      'Private IP: 10.142.128.147',
    ],
  }),
  withLeft: () => ({
    title: text('Title', 'Resource Name'),
    icon: svg,
    subtitle: [
      'Dallas 9',
      'Public IP: 169.55.5.4',
      'Private IP: 10.142.128.147',
    ],
    isActive: true,
    renderReboot: () => console.log('Reboot!'),
  }),
  rightDisconnected: () => ({
    title: text('Title', 'Resource Name'),
    icon: svg,
    subtitle: [
      'Dallas 9',
      'Public IP: 169.55.5.4',
      'Private IP: 10.142.128.147',
    ],
    status: [{ text: 'Disconnected', isTrue: false }],
  }),
};

storiesOf('ResourceHeader', module)
  .addDecorator(withKnobs)
  .add(
    'Full',
    () => {
      return (
        <ResourceHeader
          renderBreadcrumbs={() => (
            <Breadcrumb>
              <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
            </Breadcrumb>
          )}
          renderActions={() => (
            <Dropdown
              label="Actions"
              type="inline"
              items={items}
              itemToString={item => (item ? item.text : '')}
            />
          )}
          renderStop={() => console.log('Stop!')}
          renderReboot={() => console.log('Reboot!')}
          renderMaintenance={() => console.log('Maintenance Time!')}
          {...props.full()}
        />
      );
    },
    {
      info: {
        text: `
              Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
              For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
              By default, the tooltip will render above the element. The example below shows the default scenario.
            `,
      },
    }
  )
  .add(
    'Simple',
    () => {
      return (
        <ResourceHeader
          renderBreadcrumbs={() => (
            <Breadcrumb>
              <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
            </Breadcrumb>
          )}
          renderActions={() => (
            <Dropdown
              label="Actions"
              type="inline"
              items={items}
              itemToString={item => (item ? item.text : '')}
            />
          )}
          {...props.simple()}
        />
      );
    },
    {
      info: {
        text: `
              Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
              For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
              By default, the tooltip will render above the element. The example below shows the default scenario.
            `,
      },
    }
  )
  .add(
    'With Icon',
    () => {
      return (
        <ResourceHeader
          renderBreadcrumbs={() => (
            <Breadcrumb>
              <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
            </Breadcrumb>
          )}
          renderActions={() => (
            <Dropdown
              label="Actions"
              type="inline"
              items={items}
              itemToString={item => (item ? item.text : '')}
            />
          )}
          {...props.withIcon()}
        />
      );
    },
    {
      info: {
        text: `
              Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
              For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
              By default, the tooltip will render above the element. The example below shows the default scenario.
            `,
      },
    }
  )
  .add(
    'Icon & subtitle, no actions',
    () => {
      return (
        <ResourceHeader
          renderBreadcrumbs={() => (
            <Breadcrumb>
              <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
            </Breadcrumb>
          )}
          renderActions={() => (
            <Dropdown
              label="Actions"
              type="inline"
              items={items}
              itemToString={item => (item ? item.text : '')}
            />
          )}
          {...props.withIconNoActions()}
        />
      );
    },
    {
      info: {
        text: `
              Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
              For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
              By default, the tooltip will render above the element. The example below shows the default scenario.
            `,
      },
    }
  )
  .add(
    'Left Active, with Reboot',
    () => {
      return (
        <ResourceHeader
          renderBreadcrumbs={() => (
            <Breadcrumb>
              <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
            </Breadcrumb>
          )}
          renderActions={() => (
            <Dropdown
              label="Actions"
              type="inline"
              items={items}
              itemToString={item => (item ? item.text : '')}
            />
          )}
          renderReboot={() => console.log('Reboot!')}
          {...props.withLeft()}
        />
      );
    },
    {
      info: {
        text: `
          Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
          For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
          By default, the tooltip will render above the element. The example below shows the default scenario.
        `,
      },
    }
  )
  .add(
    'Right Disconnected, with Stop + Reboot',
    () => {
      return (
        <ResourceHeader
          renderBreadcrumbs={() => (
            <Breadcrumb>
              <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
            </Breadcrumb>
          )}
          renderActions={() => (
            <Dropdown
              label="Actions"
              type="inline"
              items={items}
              itemToString={item => (item ? item.text : '')}
            />
          )}
          renderReboot={() => console.log('Reboot!')}
          renderStop={() => console.log('Stop!')}
          {...props.rightDisconnected()}
        />
      );
    },
    {
      info: {
        text: `
              Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
              For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
              By default, the tooltip will render above the element. The example below shows the default scenario.
            `,
      },
    }
  );
