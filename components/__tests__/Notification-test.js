import React from 'react';
import Notification from '../Notification';
import { shallow, mount } from 'enzyme';

const props = {
  kind: 'error',
  title: 'title',
  subtitle: 'subtitle',
  iconDescription: 'description',
};

describe('Notification', () => {
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

      it('renders toast notification with one <Icon>', () => {
        expect(toast.find('Icon').length).toEqual(1);
      });

      it('Renders inline notifications with two <Icon>', () => {
        expect(inline.find('Icon').length).toEqual(2);
      });

      it('renders HTML for toast notifications when caption exists', () => {
        expect(toast.hasClass('bx--notification--new')).toBe(true);
      });

      it('renders HTML for inline notifications when caption does not exist', () => {
        expect(inline.hasClass('bx--notification--new')).toBe(false);
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
          expect(inline.hasClass(`bx--notification-inline--${kind}`)).toEqual(true);
          expect(toast.hasClass(`bx--notification--${kind}`)).toEqual(true);
        });
      });
    });

    describe('other props', () => {
      it('has [role="alert"] on wrapping <div>', () => {
        expect(toast.props().role).toEqual('alert');
        expect(inline.props().role).toEqual('alert');
      });

      it('has close button with [type="button"] by default', () => {
        expect(toast.find('button').props().type).toEqual('button');
        expect(inline.find('button').props().type).toEqual('button');
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

  it('renders null when open state is false', () => {
    const mountedToast = mount(<Notification {...props} caption="caption" />);
    const mountedInline = mount(<Notification {...props} />);

    mountedToast.setState({ open: false });
    mountedInline.setState({ open: false });
    expect(mountedToast.html()).toBeNull();
    expect(mountedInline.html()).toBeNull();
  });
});
