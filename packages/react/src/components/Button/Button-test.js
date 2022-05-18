/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Search, Add } from '@carbon/icons-react';
import Button from '../Button';
import Link from '../Link';
import ButtonSkeleton from '../Button/Button.Skeleton';
import { shallow, mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const prefix = 'cds';

describe('Button', () => {
  it('should support rendering elements within the button through the `children` prop', () => {
    render(
      <Button>
        <span>child</span>
      </Button>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('should support a custom tabIndex through props', () => {
    render(<Button tabIndex={-1}>test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
  });

  it('should support a custom className on the outermost element', () => {
    const { container } = render(
      <Button className="custom-class">test</Button>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render an element with the button role', () => {
    render(<Button>test</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should use the disabled prop to set disabled on the <button>', () => {
    const { rerender } = render(<Button>test</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');

    rerender(<Button disabled>test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('should render with a default button type of button', () => {
    render(<Button>test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  test.each(['button', 'submit', 'reset'])(
    'it should support changing the button type to %s with the `type` prop',
    (type) => {
      render(<Button type={type}>test</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', type);
    }
  );

  it('should render as an element with the role of `link` when the `href` prop is used', () => {
    render(<Button href="/">test</Button>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should support rendering as a custom element with the `as` prop', () => {
    function CustomComponent(props) {
      return <div data-testid="custom-component" {...props} />;
    }

    render(<Button as={CustomComponent}>test</Button>);
    expect(screen.getByTestId('custom-component')).toBeInTheDocument();
  });

  describe('Renders arbitrary component with correct props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <Button as={Link} data-foo="foo">
          <div className="child">child</div>
          <div className="child">child</div>
        </Button>
      );
    });
    it('renders as a Link with data attribute', () => {
      expect(wrapper.is(Link)).toBe(true);
      expect(wrapper.is('[data-foo="foo"]')).toBe(true);
    });
  });

  describe('Renders icon buttons', () => {
    const iconButton = mount(
      <Button renderIcon={Search} iconDescription="Search">
        Search
      </Button>
    );
    const icon = iconButton.find('svg');

    it('should have the appropriate icon', () => {
      expect(icon.hasClass(`${prefix}--btn__icon`)).toBe(true);
    });

    it('should return error if icon given without description', () => {
      const props = {
        renderIcon: Search,
      };
      // eslint-disable-next-line quotes
      const error = new Error(
        'renderIcon property specified without also providing an iconDescription property.'
      );
      expect(Button.propTypes.iconDescription(props)).toEqual(error);
    });
  });

  describe('Renders custom icon buttons', () => {
    const iconButton = mount(
      <Button renderIcon={Search} iconDescription="Search">
        Search
      </Button>
    );
    const originalIcon = mount(<Search />).find('svg');
    const icon = iconButton.find('svg');

    it('should have the appropriate icon', () => {
      expect(icon.hasClass(`${prefix}--btn__icon`)).toBe(true);
      expect(icon.find(':not(svg):not(title)').html()).toBe(
        originalIcon.children().html()
      );
    });

    it('should return error if icon given without description', () => {
      const props = {
        renderIcon: Search,
      };
      // eslint-disable-next-line quotes
      const error = new Error(
        'renderIcon property specified without also providing an iconDescription property.'
      );
      expect(Button.propTypes.iconDescription(props)).toEqual(error);
    });
  });
});

describe('Primary Button', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Button className="extra-class" />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--btn`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('Secondary Button', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Button kind="secondary" className="extra-class" />
    );

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--btn--secondary`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('Ghost Button', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Button kind="ghost" className="extra-class" />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--btn--ghost`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('Extra Large Button', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Button size="xl" className="extra-class" />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--btn--xl`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('Extra Extra Large Button', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Button size="2xl" className="extra-class" />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--btn--2xl`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('Small Button', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Button size="sm" className="extra-class" />);

    it('has the expected classes for small', () => {
      expect(wrapper.hasClass(`${prefix}--btn--sm`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
  describe('deprecated prop `small`', () => {
    const wrapper = shallow(<Button size="sm" className="extra-class" />);

    it('has the expected classes for small', () => {
      expect(wrapper.hasClass(`${prefix}--btn--sm`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('DangerButton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Button kind="danger" className="extra-class" />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--btn--danger`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });

  describe('Renders tertiary variation as expected', () => {
    const wrapper = shallow(<Button kind="danger--tertiary" />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--btn--danger--tertiary`)).toEqual(
        true
      );
    });
  });

  describe('Renders ghost variation as expected', () => {
    const wrapper = shallow(<Button kind="danger--ghost" />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--btn--danger--ghost`)).toEqual(true);
    });
  });
});

describe('danger--primaryButton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Button kind="danger--primary" className="extra-class" />
    );

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--btn--danger--primary`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('TertiaryButton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Button kind="tertiary" className="extra-class" />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--btn--tertiary`)).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('Icon-only button', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <Button hasIconOnly iconDescription="Add" renderIcon={Add} label="Add" />
    );

    it('has the expected classes', () => {
      expect(
        wrapper.find('button').hasClass(`${prefix}--btn--icon-only`)
      ).toEqual(true);
    });

    it('should only set tooltip position and alignment if passed via props', () => {
      wrapper.setProps({ tooltipPosition: 'bottom' });
      expect(wrapper.props().tooltipPosition).toEqual('bottom');
      wrapper.setProps({ tooltipAlignment: 'center' });
      expect(wrapper.props().tooltipAlignment).toEqual('center');
    });
  });
});

describe('ButtonSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<ButtonSkeleton />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--btn`)).toEqual(true);
    });

    const wrapperMd = shallow(<ButtonSkeleton size="md" />);

    it('renders the medium size', () => {
      expect(wrapperMd.hasClass(`${prefix}--btn--md`)).toEqual(true);
    });

    const wrapperLg = shallow(<ButtonSkeleton size="xl" />);

    it('renders the large size', () => {
      expect(wrapperLg.hasClass(`${prefix}--btn--xl`)).toEqual(true);
    });

    const wrapperXl = shallow(<ButtonSkeleton size="2xl" />);

    it('renders the extra-large size', () => {
      expect(wrapperXl.hasClass(`${prefix}--btn--2xl`)).toEqual(true);
    });
  });

  describe('Renders <a> props as expected', () => {
    const wrapper = shallow(
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      <ButtonSkeleton href="#" />
    );

    it('renders as an <a> element with an href', () => {
      expect(wrapper.is('a')).toBe(true);
    });

    it('should always render with [role="button"] by default', () => {
      expect(wrapper.props().role).toEqual('button');
    });
  });
});

describe('Small ButtonSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<ButtonSkeleton small />);

    it('has the expected classes for small', () => {
      expect(wrapper.hasClass(`${prefix}--btn--sm`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
    });
  });
});

describe('Button accessibility', () => {
  it('should have no Axe violations', async () => {
    render(<Button>Button Label</Button>);

    await expect(screen.getByRole('button')).toHaveNoAxeViolations();
  });

  it('should have no Accessibility Checker violations', async () => {
    render(
      <main>
        <Button>Button Label</Button>
      </main>
    );

    await expect(screen.getByRole('button')).toHaveNoACViolations('Button');
  });

  it('is keyboard accessible', () => {
    render(<Button>Button Label</Button>);
    userEvent.tab();
    expect(screen.getByText('Button Label')).toHaveFocus();
  });

  it('should have an accessible label', () => {
    render(<Button>Button Label</Button>);
    expect(() => screen.getByText('Button Label')).not.toThrow();
  });

  it('should have the role of button', () => {
    render(<Button>Button Label</Button>);
    expect(() => screen.getByRole('button')).not.toThrow();
  });

  it('is not keyboard accessible when disabled', () => {
    render(<Button disabled>Button Label</Button>);
    userEvent.tab();
    expect(document.body).toHaveFocus();
  });
});
