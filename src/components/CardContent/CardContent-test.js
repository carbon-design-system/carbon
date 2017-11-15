import React from 'react';
import CardContent from '../CardContent';
import Icon from '../Icon';
import { shallow } from 'enzyme';

describe('CardContent', () => {
  describe('Renders as expected', () => {
    const props = {
      className: 'extra-class',
      cardIcon: 'testIcon',
      cardTitle: 'testTitle',
      cardLink: ['http://test-card-link.mybluemix.net'],
      cardInfo: ['testInfo1', 'testInfo2'],
    };
    const wrapper = shallow(
      <CardContent {...props}>
        <div className="child">Test</div>
      </CardContent>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--card__card-overview')).toBe(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toBe(true);
    });

    describe('renders an "About" div', () => {
      const about = wrapper.childAt(1);

      it('has expected classes', () => {
        expect(about.hasClass('bx--card-overview__about')).toBe(true);
      });

      it('renders a child div with an Icon', () => {
        const aboutIcon = about.childAt(0);
        expect(aboutIcon.hasClass('bx--about__icon')).toBe(true);

        const icon = wrapper.find(Icon);
        expect(icon.hasClass('bx--about__icon--img')).toBe(true);
        expect(icon.props().name).toBe('testIcon');
        expect(icon.props().description).toBe('card icon');
      });

      describe('renders a title div', () => {
        const title = about.childAt(1);

        it('has expected classes', () => {
          expect(title.hasClass('bx--about__title')).toBe(true);
        });

        it('has expected paragraph', () => {
          const paragraph = title.childAt(0);
          expect(paragraph.props().id).toBe('card-app-title');
          expect(paragraph.props().className).toBe('bx--about__title--name');
          expect(paragraph.props().children).toBe('testTitle');
        });

        it('has expected links', () => {
          const links = title.childAt(1);
          expect(links.length).toBe(1);
          expect(links.getElement().type).toBe('a');
          expect(links.hasClass('bx--about__title--link')).toBe(true);
          expect(links.props().href).toBe(
            'http://test-card-link.mybluemix.net'
          );
          expect(links.props().children).toBe(
            'http://test-card-link.mybluemix.net'
          );
        });

        it('has expected info paragraphs', () => {
          const info1 = title.childAt(2);
          expect(info1.length).toBe(1);
          expect(info1.getElement().type).toBe('h4');
          expect(info1.hasClass('bx--about__title--additional-info')).toBe(
            true
          );
          expect(info1.props().children).toBe('testInfo1');

          const info2 = title.childAt(3);
          expect(info2.length).toBe(1);
          expect(info2.getElement().type).toBe('h4');
          expect(info2.hasClass('bx--about__title--additional-info')).toBe(
            true
          );
          expect(info2.props().children).toBe('testInfo2');
        });
      });
    });
  });
});
