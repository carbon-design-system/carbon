import React from 'react';
import Icon from '../Icon';
import Notification, {
  NotificationButton,
  NotificationTextDetails,
  ToastNotification,
  InlineNotification,
} from '../Notification';
import { shallow, mount } from 'enzyme';

describe('NotificationButton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<NotificationButton className="some-class" />);

    it('renders given className', () => {
      expect(wrapper.hasClass('some-class')).toBe(true);
    });

    it('renders only one Icon', () => {
      const icon = wrapper.find('Icon');
      expect(icon.length).toEqual(1);
    });

    it('renders correct Icon', () => {
      const icon = wrapper.find('Icon');
      expect(icon.props().name).toEqual('close');
    });

    describe('When notificationType equals "toast"', () => {
      it('button should have correct className by default', () => {
        expect(wrapper.hasClass('bx--toast-notification__close-button')).toBe(
          true
        );
      });

      it('icon should have correct className by default', () => {
        const icon = wrapper.find('Icon');
        expect(icon.hasClass('bx--toast-notification__icon')).toBe(true);
      });
    });

    describe('When notificationType equals "inline"', () => {
      it('button should have correct className', () => {
        wrapper.setProps({ notificationType: 'inline' });
        expect(wrapper.hasClass('bx--inline-notification__close-button')).toBe(
          true
        );
      });

      it('icon should have correct className', () => {
        const icon = wrapper.find('Icon');
        expect(icon.hasClass('bx--inline-notification__close-icon')).toBe(true);
      });
    });
  });
});

describe('NotificationTextDetails', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<NotificationTextDetails />);

    describe('When notificationType equals "toast"', () => {
      it('div shoudld have correct className by default', () => {
        expect(wrapper.hasClass('bx--toast-notification__details')).toBe(true);
      });
    });

    describe('When notificationType equals "inline"', () => {
      it('div shoudld have correct className', () => {
        wrapper.setProps({ notificationType: 'inline' });
        expect(wrapper.hasClass('bx--inline-notification__text-wrapper')).toBe(
          true
        );
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
      expect(toast.hasClass('bx--toast-notification')).toBe(true);
    });

    it('adds extra classes via className', () => {
      toast.setProps({ className: 'extra-class' });

      expect(toast.hasClass('extra-class')).toBe(true);
    });

    it('interpolates matching className based on kind prop', () => {
      const kinds = ['error', 'info', 'success', 'warning'];

      kinds.forEach(kind => {
        toast.setProps({ kind });
        expect(toast.hasClass(`bx--toast-notification--${kind}`)).toEqual(true);
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
    const inline = shallow(
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
      expect(inline.find(Icon).some('[name="checkmark--solid"]')).toBe(true);
    });

    it('renders error notification with matching kind and <icon name=""> values', () => {
      inline.setProps({ kind: 'error' });
      expect(inline.find(Icon).some('[name="error--solid"]')).toBe(true);
    });

    it('renders warning notification with matching kind and <icon name=""> values', () => {
      inline.setProps({ kind: 'warning' });
      expect(inline.find(Icon).some('[name="warning--solid"]')).toBe(true);
    });

    it('renders info notification with matching kind and <icon name=""> values', () => {
      inline.setProps({ kind: 'info' });
      expect(inline.find(Icon).some('[name="info--solid"]')).toBe(true);
    });

    it('renders HTML for inline notifications when caption does not exist', () => {
      expect(inline.hasClass('bx--inline-notification')).toBe(true);
    });

    it('adds extra classes via className', () => {
      inline.setProps({ className: 'extra-class' });
      expect(inline.hasClass('extra-class')).toBe(true);
    });

    it('interpolates matching className based on kind prop', () => {
      const kinds = ['error', 'info', 'success', 'warning'];

      kinds.forEach(kind => {
        inline.setProps({ kind });
        expect(inline.hasClass(`bx--inline-notification--${kind}`)).toEqual(
          true
        );
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
      const mountedInline = mount(<Notification {...props} />);

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

describe('[Deprecated]: Notification', () => {
  describe('Renders as expected', () => {
    const toast = shallow(<Notification {...props} caption="caption" />);
    const inline = shallow(<Notification {...props} />);
    const mountedToast = mount(<Notification {...props} caption="caption" />);
    const mountedInline = mount(<Notification {...props} />);

    describe('HTML', () => {
      it('renders itself', () => {
        expect(toast.length).toEqual(1);
        expect(inline.length).toEqual(1);
      });

      it('renders checkmark--solid icon for success inline notification', () => {
        const icon = inline.find('[name="checkmark--solid"]');
        expect(icon.props().name).toEqual('checkmark--solid');
      });

      it('renders error notification with matching kind and <icon name=""> values', () => {
        inline.setProps({ kind: 'error' });
        expect(inline.find(Icon).some('[name="error--solid"]')).toBe(true);
      });

      it('renders warning notification with matching kind and <icon name=""> values', () => {
        inline.setProps({ kind: 'warning' });
        expect(inline.find(Icon).some('[name="warning--solid"]')).toBe(true);
      });

      it('renders info notification with matching kind and <icon name=""> values', () => {
        inline.setProps({ kind: 'info' });
        expect(inline.find(Icon).some('[name="info--solid"]')).toBe(true);
      });

      it('renders HTML for toast notifications when caption exists', () => {
        expect(toast.hasClass('bx--toast-notification')).toBe(true);
      });

      it('renders HTML for inline notifications when caption does not exist', () => {
        expect(inline.hasClass('bx--inline-notification')).toBe(true);
      });
    });

    describe('className', () => {
      it('adds extra classes via className', () => {
        toast.setProps({ className: 'extra-class' });
        inline.setProps({ className: 'extra-class' });

        expect(toast.hasClass('extra-class')).toBe(true);
        expect(inline.hasClass('extra-class')).toBe(true);
      });

      it('interpolates matching className based on kind prop', () => {
        const kinds = ['error', 'info', 'success', 'warning'];

        kinds.forEach(kind => {
          inline.setProps({ kind });
          toast.setProps({ kind });
          expect(inline.hasClass(`bx--inline-notification--${kind}`)).toEqual(
            true
          );
          expect(toast.hasClass(`bx--toast-notification--${kind}`)).toEqual(
            true
          );
        });
      });
    });

    describe('other props', () => {
      it('has [role="alert"] on wrapping <div>', () => {
        expect(toast.props().role).toEqual('alert');
        expect(inline.props().role).toEqual('alert');
      });

      it('sets a new kind when passed in via props', () => {
        toast.setProps({ kind: 'success' });
        inline.setProps({ kind: 'success' });
        expect(toast.props().kind).toEqual('success');
        expect(inline.props().kind).toEqual('success');
      });

      it('sets a new title when passed in via props', () => {
        mountedToast.setProps({ title: 'new-title' });
        mountedInline.setProps({ title: 'new-title' });
        expect(mountedToast.props().title).toEqual('new-title');
        expect(mountedInline.props().title).toEqual('new-title');
      });

      it('sets a new subtitle when passed in via props', () => {
        mountedToast.setProps({ subtitle: 'new-subtitle' });
        mountedInline.setProps({ subtitle: 'new-subtitle' });
        expect(mountedToast.props().subtitle).toEqual('new-subtitle');
        expect(mountedInline.props().subtitle).toEqual('new-subtitle');
      });

      it('sets a new caption when passed in via props', () => {
        mountedToast.setProps({ caption: 'new-caption' });
        expect(mountedToast.props().caption).toEqual('new-caption');
      });

      it('sets a new iconDescription when passed in via props', () => {
        expect(mountedToast.props().iconDescription).toEqual('description');
        expect(mountedInline.props().iconDescription).toEqual('description');
      });
    });
  });
});

describe('events and state', () => {
  it('initial open state set to true', () => {
    const mountedToast = mount(<Notification {...props} caption="caption" />);
    const mountedInline = mount(<Notification {...props} />);

    expect(mountedToast.state().open).toBe(true);
    expect(mountedInline.state().open).toBe(true);
  });

  it('sets open state to false when close button is clicked', () => {
    const mountedToast = mount(<Notification {...props} caption="caption" />);
    const mountedInline = mount(<Notification {...props} />);

    mountedToast.find('button').simulate('click');
    mountedInline.find('button').simulate('click');
    expect(mountedToast.state().open).toEqual(false);
    expect(mountedInline.state().open).toEqual(false);
  });

  it('close button is not shown if hideCloseButton prop set', () => {
    const mountedToast = mount(
      <Notification {...props} hideCloseButton={true} />
    );

    expect(mountedToast.find('button')).toHaveLength(0);
  });

  it('renders null when open state is false', () => {
    const mountedToast = mount(<Notification {...props} caption="caption" />);
    const mountedInline = mount(<Notification {...props} />);

    mountedToast.setState({ open: false });
    mountedInline.setState({ open: false });
    expect(mountedToast.html()).toBeNull();
    expect(mountedInline.html()).toBeNull();
  });
});
