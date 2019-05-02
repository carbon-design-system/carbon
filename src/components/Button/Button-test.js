/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Search16 from '@carbon/icons-react/lib/search/16';
import Button from '../Button';
import Link from '../Link';
import ButtonSkeleton from '../Button/Button.Skeleton';
import { shallow, mount } from 'enzyme';

describe('Button', () => {
  describe('Renders common props as expected', () => {
    const wrapper = shallow(
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      <Button tabIndex={2} className="extra-class">
        <div className="child">child</div>
        <div className="child">child</div>
      </Button>
    );

    const wrapperHref = shallow(
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      <Button tabIndex={2} className="extra-class" href="/home">
        <div className="child">child</div>
        <div className="child">child</div>
      </Button>
    );

    it('Renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(2);
      expect(wrapperHref.find('.child').length).toBe(2);
    });

    it('Should set tabIndex if one is passed via props', () => {
      expect(wrapper.props().tabIndex).toEqual(2);
      expect(wrapperHref.props().tabIndex).toEqual(2);
    });

    it('Should add extra classes via className', () => {
      expect(wrapper.hasClass('extra-class')).toBe(true);
      expect(wrapperHref.hasClass('extra-class')).toBe(true);
    });
  });

  describe('Renders <button> props as expected', () => {
    const wrapper = shallow(
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      <Button tabIndex={2}>
        <div className="child">child</div>
        <div className="child">child</div>
      </Button>
    );

    it('Renders as a <button> element without an href', () => {
      expect(wrapper.is('button')).toBe(true);
    });

    it('Should set disabled to false by default', () => {
      expect(wrapper.props().disabled).toBe(false);
    });

    it('Should set disabled if one is passed via props', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.props().disabled).toBe(true);
    });

    it('Should set type to button by default', () => {
      expect(wrapper.props().type).toEqual('button');
    });

    it('Should only set type to [button, reset or submit] if one is passed via props', () => {
      wrapper.setProps({ type: 'reset' });
      expect(wrapper.props().type).toEqual('reset');
      wrapper.setProps({ type: 'submit' });
      expect(wrapper.props().type).toEqual('submit');
    });
  });

  describe('Renders <a> props as expected', () => {
    const wrapper = shallow(
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      <Button href="#" tabIndex={2}>
        <div className="child">child</div>
        <div className="child">child</div>
      </Button>
    );

    it('Renders as an <a> element with an href', () => {
      expect(wrapper.is('a')).toBe(true);
    });

    it('Should always render with [role="button"] by default', () => {
      expect(wrapper.props().role).toEqual('button');
    });
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
      <Button renderIcon={Search16} iconDescription="Search">
        Search
      </Button>
    );
    const icon = iconButton.find('svg');

    it('should have the appropriate icon', () => {
      expect(icon.hasClass('bx--btn__icon')).toBe(true);
    });

    it('should return error if icon given without description', () => {
      const props = {
        renderIcon: Search16,
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
      <Button renderIcon={Search16} iconDescription="Search">
        Search
      </Button>
    );
    const originalIcon = mount(<Search16 />).find('svg');
    const icon = iconButton.find('svg');

    it('should have the appropriate icon', () => {
      expect(icon.hasClass('bx--btn__icon')).toBe(true);
      expect(icon.find(':not(svg):not(title)').html()).toBe(
        originalIcon.children().html()
      );
    });

    it('should return error if icon given without description', () => {
      const props = {
        renderIcon: Search16,
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

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--btn')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('Secondary Button', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Button kind="secondary" className="extra-class" />
    );

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--btn--secondary')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('Ghost Button', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Button kind="ghost" className="extra-class" />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--btn--ghost')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('Small Button', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Button small className="extra-class" />);

    it('Has the expected classes for small', () => {
      expect(wrapper.hasClass('bx--btn--sm')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('DangerButton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Button kind="danger" className="extra-class" />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--btn--danger')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('danger--primaryButton', () => {
  describe('Renders as exptected', () => {
    const wrapper = shallow(
      <Button kind="danger--primary" className="extra-class" />
    );

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--btn--danger--primary')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('TertiaryButton', () => {
  describe('Renders as exptected', () => {
    const wrapper = shallow(<Button kind="tertiary" className="extra-class" />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--btn--tertiary')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('ButtonSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<ButtonSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton')).toEqual(true);
      expect(wrapper.hasClass('bx--btn')).toEqual(true);
    });
  });

  describe('Renders <a> props as expected', () => {
    const wrapper = shallow(
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      <ButtonSkeleton href="#" />
    );

    it('Renders as an <a> element with an href', () => {
      expect(wrapper.is('a')).toBe(true);
    });

    it('Should always render with [role="button"] by default', () => {
      expect(wrapper.props().role).toEqual('button');
    });
  });
});

describe('Small ButtonSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<ButtonSkeleton small />);

    it('Has the expected classes for small', () => {
      expect(wrapper.hasClass('bx--btn--sm')).toEqual(true);
      expect(wrapper.hasClass('bx--skeleton')).toEqual(true);
    });
  });
});
