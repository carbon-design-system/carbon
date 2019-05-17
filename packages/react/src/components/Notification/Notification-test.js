/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Close16 from '@carbon/icons-react/lib/close/16';
import ErrorFilled20 from '@carbon/icons-react/lib/error--filled/20';
import CheckmarkFilled20 from '@carbon/icons-react/lib/checkmark--filled/20';
import {
  NotificationButton,
  NotificationTextDetails,
  ToastNotification,
  InlineNotification,
} from '../Notification';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('NotificationButton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<NotificationButton className="some-class" />);

    it('renders given className', () => {
      expect(wrapper.hasClass('some-class')).toBe(true);
    });

    it('renders only one Icon', () => {
      const icon = wrapper.find(Close16);
      expect(icon.length).toEqual(1);
    });

    it('supports custom icon', () => {
      const iconButton = mount(
        <NotificationButton renderIcon={Close16} iconDescription="Close" />
      );
      const originalIcon = mount(<Close16 />).find('svg');
      const icon = iconButton.find('svg');
      expect(icon.find(':not(svg):not(title)').html()).toBe(
        originalIcon.children().html()
      );
    });

    describe('When notificationType equals "toast"', () => {
      it('button should have correct className by default', () => {
        expect(
          wrapper.hasClass(`${prefix}--toast-notification__close-button`)
        ).toBe(true);
      });

      it('icon should have correct className by default', () => {
        const icon = wrapper.find(Close16);
        expect(icon.hasClass(`${prefix}--toast-notification__close-icon`)).toBe(
          true
        );
      });
    });

    describe('When notificationType equals "inline"', () => {
      it('button should have correct className', () => {
        wrapper.setProps({ notificationType: 'inline' });
        expect(
          wrapper.hasClass(`${prefix}--inline-notification__close-button`)
        ).toBe(true);
      });

      it('icon should have correct className', () => {
        const icon = wrapper.find(Close16);
        expect(
          icon.hasClass(`${prefix}--inline-notification__close-icon`)
        ).toBe(true);
      });
    });
  });
});

describe('NotificationTextDetails', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<NotificationTextDetails />);

    describe('When notificationType equals "toast"', () => {
      it('div shoudld have correct className by default', () => {
        expect(wrapper.hasClass(`${prefix}--toast-notification__details`)).toBe(
          true
        );
      });
    });

    describe('When notificationType equals "inline"', () => {
      it('div shoudld have correct className', () => {
        wrapper.setProps({ notificationType: 'inline' });
        expect(
          wrapper.hasClass(`${prefix}--inline-notification__text-wrapper`)
        ).toBe(true);
      });
    });
  });
});

describe('ToastNotification', () => {
  describe('Renders as expected', () => {
    const toast = shallow(
      <ToastNotification
        kind="error"
        title="this is a title"
        subtitle="this is a subtitle"
        caption="this is a caption"
      />
    );
    it('renders itself', () => {
      expect(toast.length).toEqual(1);
    });

    it('renders HTML for toast notifications when caption exists', () => {
      expect(toast.hasClass(`${prefix}--toast-notification`)).toBe(true);
    });

    it('adds extra classes via className', () => {
      toast.setProps({ className: 'extra-class' });

      expect(toast.hasClass('extra-class')).toBe(true);
    });

    it('interpolates matching className based on kind prop', () => {
      const kinds = ['error', 'info', 'success', 'warning'];

      kinds.forEach(kind => {
        toast.setProps({ kind });
        expect(
          toast.hasClass(`${prefix}--toast-notification--${kind}`)
        ).toEqual(true);
      });
    });

    it('has [role="alert"] on wrapping <div>', () => {
      expect(toast.props().role).toEqual('alert');
    });

    it('sets a new kind when passed in via props', () => {
      toast.setProps({ kind: 'success' });
      expect(toast.props().kind).toEqual('success');
    });

    it('can render any node for the subtitle and caption', () => {
      toast.setProps({ subtitle: <button />, caption: <button /> });
      expect(toast.length).toEqual(1);
    });
  });
  describe('events and state', () => {
    it('initial open state set to true', () => {
      const mountedToast = mount(
        <ToastNotification
          kind="error"
          title="this is a title"
          subtitle="this is a subtitle"
          caption="this is a caption"
        />
      );

      expect(mountedToast.state().open).toBe(true);
    });

    it('sets open state to false when close button is clicked', () => {
      const mountedToast = mount(
        <ToastNotification
          kind="error"
          title="this is a title"
          subtitle="this is a subtitle"
          caption="this is a caption"
        />
      );

      mountedToast.find('button').simulate('click');
      expect(mountedToast.state().open).toEqual(false);
    });

    it('renders null when open state is false', () => {
      const mountedToast = mount(
        <ToastNotification
          kind="error"
          title="this is a title"
          subtitle="this is a subtitle"
          caption="this is a caption"
        />
      );

      mountedToast.setState({ open: false });
      expect(mountedToast.html()).toBeNull();
    });
  });
});

describe('InlineNotification', () => {
  describe('Renders as expected', () => {
    const inline = mount(
      <InlineNotification
        title="this is a title"
        subtitle="this is a subtitle"
        kind="error"
      />
    );

    it('renders itself', () => {
      expect(inline.length).toEqual(1);
    });

    it('renders success notification with matching kind and <icon name=""> values', () => {
      inline.setProps({ kind: 'success' });
      expect(inline.find(CheckmarkFilled20).length).toBe(1);
    });

    it('renders error notification with matching kind and <icon name=""> values', () => {
      inline.setProps({ kind: 'error' });
      expect(inline.find(ErrorFilled20).length).toBe(1);
    });

    it('renders warning notification with matching kind and <icon name=""> values', () => {
      inline.setProps({ kind: 'warning' });
      expect(
        inline.find(`.${prefix}--inline-notification__icon`).exists()
      ).toBe(true);
    });

    it('renders HTML for inline notifications when caption does not exist', () => {
      expect(inline.find(`.${prefix}--inline-notification`).exists()).toBe(
        true
      );
    });

    it('adds extra classes via className', () => {
      inline.setProps({ className: 'extra-class' });
      expect(inline.find('.extra-class').exists()).toBe(true);
    });

    it('interpolates matching className based on kind prop', () => {
      const kinds = ['error', 'info', 'success', 'warning'];

      kinds.forEach(kind => {
        inline.setProps({ kind });
        expect(
          inline.find(`.${prefix}--inline-notification--${kind}`).exists()
        ).toEqual(true);
      });
    });

    it('has [role="alert"] on wrapping <div>', () => {
      expect(inline.props().role).toEqual('alert');
    });

    it('sets a new kind when passed in via props', () => {
      inline.setProps({ kind: 'success' });
      expect(inline.props().kind).toEqual('success');
    });

    it('can render any node for the subtitle', () => {
      inline.setProps({ subtitle: <button /> });
      expect(inline.length).toEqual(1);
    });
  });

  describe('events and state', () => {
    it('initial open state set to true', () => {
      const mountedInline = mount(
        <InlineNotification
          title="this is a title"
          subtitle="this is a subtitle"
          kind="error"
        />
      );

      expect(mountedInline.state().open).toBe(true);
    });

    it('sets open state to false when close button is clicked', () => {
      const mountedInline = mount(<InlineNotification {...props} />);

      mountedInline.find('button').simulate('click');
      expect(mountedInline.state().open).toEqual(false);
    });

    it('renders null when open state is false', () => {
      const mountedInline = mount(
        <InlineNotification
          title="this is a title"
          subtitle="this is a subtitle"
          kind="error"
        />
      );

      mountedInline.setState({ open: false });
      expect(mountedInline.html()).toBeNull();
    });
  });
});

// Deprecated

const props = {
  kind: 'success',
  title: 'title',
  subtitle: 'subtitle',
  iconDescription: 'description',
};

describe('events and state', () => {
  it('initial open state set to true', () => {
    const mountedToast = mount(
      <ToastNotification {...props} caption="caption" />
    );
    const mountedInline = mount(<InlineNotification {...props} />);

    expect(mountedToast.state().open).toBe(true);
    expect(mountedInline.state().open).toBe(true);
  });

  it('sets open state to false when close button is clicked', () => {
    const mountedToast = mount(
      <ToastNotification {...props} caption="caption" />
    );
    const mountedInline = mount(<InlineNotification {...props} />);

    mountedToast.find('button').simulate('click');
    mountedInline.find('button').simulate('click');
    expect(mountedToast.state().open).toEqual(false);
    expect(mountedInline.state().open).toEqual(false);
  });

  it('close button is not shown if hideCloseButton prop set', () => {
    const mountedToast = mount(
      <ToastNotification {...props} hideCloseButton={true} />
    );

    expect(mountedToast.find('button')).toHaveLength(0);
  });

  it('renders null when open state is false', () => {
    const mountedToast = mount(
      <ToastNotification {...props} caption="caption" />
    );
    const mountedInline = mount(<InlineNotification {...props} />);

    mountedToast.setState({ open: false });
    mountedInline.setState({ open: false });
    expect(mountedToast.html()).toBeNull();
    expect(mountedInline.html()).toBeNull();
  });
});
