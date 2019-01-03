import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { iconAddSolid, iconSearch } from 'carbon-icons';
import { AddFilled16, Search16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import Button from '../Button';
import ButtonSkeleton from '../Button/Button.Skeleton';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;

const icons = {
  None: 'None',
  'Add with filled circle (iconAddSolid from `carbon-icons`)': componentsX
    ? 'AddFilled16'
    : 'iconAddSolid',
  'Search (iconSearch from `carbon-icons`)': componentsX
    ? 'Search16'
    : 'iconSearch',
};

const iconMap = {
  iconAddSolid,
  iconSearch,
  AddFilled16: <AddFilled16 className={`${prefix}--btn__icon`} />,
  Search16: <Search16 className={`${prefix}--btn__icon`} />,
};

const kinds = {
  'Primary button (primary)': 'primary',
  'Secondary button (secondary)': 'secondary',
  'Danger button (danger)': 'danger',
  'Danger primary button (danger--primary)': 'danger--primary',
  'Ghost button (ghost)': 'ghost',
};

const props = {
  regular: () => ({
    className: 'some-class',
    kind: select('Button kind (kind)', kinds, 'primary'),
    disabled: boolean('Disabled (disabled)', false),
    small: boolean('Small (small)', false),
    icon: iconMap[select('Icon (icon)', icons, 'none')],
    onClick: action('onClick'),
    onFocus: action('onFocus'),
  }),
  set: () => ({
    className: 'some-class',
    disabled: boolean('Disabled (disabled)', false),
    small: boolean('Small (small)', false),
    icon: iconMap[select('Icon (icon)', icons, 'none')],
    onClick: action('onClick'),
    onFocus: action('onFocus'),
  }),
};

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const regularProps = props.regular();
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button {...regularProps} className="some-class">
            Button
          </Button>
          &nbsp;
          <Button {...regularProps} href="#" className="some-class">
            Link
          </Button>
          &nbsp;
        </div>
      );
    },
    {
      info: {
        text: `
          Buttons are used to initialize an action, either in the background or
          foreground of an experience.

          There are several kinds of buttons.

          Primary buttons should be used for the principle call to action
          on the page.

          Secondary buttons should be used for secondary actions on each page.

          Danger buttons should be used for a negative action (such as Delete) on the page.

          Modify the behavior of the button by changing its event properties.

          Small buttons may be used when there is not enough space for a
          regular sized button. This issue is most found in tables. Small button should have three words
          or less.

          When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are
          always paired with text.
        `,
      },
    }
  )
  .add(
    'Sets of Buttons',
    () => {
      const setProps = props.set();
      return (
        <div>
          <Button kind="secondary" {...setProps}>
            Secondary button
          </Button>
          <Button kind="primary" {...setProps}>
            Primary button
          </Button>
        </div>
      );
    },
    {
      info: {
        text: `
          When an action required by the user has more than one option, always use a a negative action button (secondary) paired with a positive action button (primary) in that order. Negative action buttons will be on the left. Positive action buttons should be on the right. When these two types buttons are paired in the correct order, they will automatically space themselves apart.
        `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div>
        <ButtonSkeleton />
        &nbsp;
        <ButtonSkeleton href="#" />
        &nbsp;
        <ButtonSkeleton small />
      </div>
    ),
    {
      info: {
        text: `
          Placeholder skeleton state to use when content is loading.
        `,
      },
    }
  );
