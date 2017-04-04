import 'core-js/modules/es6.weak-map'; // For PhantomJS
import CopyButton from '../../src/components/copy-button/copy-button';

const HTML = `
<button data-copy-btn class="bx--btn bx--btn--primary bx--btn--copy bx--btn--sm">
  Copy button
  <svg class="bx--btn__icon">
    <use xlink:href="/carbon-icons/bluemix-icons.svg#icon--add--glyph"></use>
  </svg>
  <div class="bx--btn--copy__feedback" data-feedback="Copied!"></div>
</button>
`;

describe('Test Copy Button', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new CopyButton();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new CopyButton(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Showing and hiding feedback tooltip', function () {
    let container;
    let element;
    let feedbackTooltip;
    let copyBtn;
    let clock;

    before(function () {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-copy-btn]');
      feedbackTooltip = document.querySelector('[data-feedback]');
      copyBtn = new CopyButton(element);
    });

    beforeEach(function () {
      clock = sinon.useFakeTimers();
    });

    it('Should not show the feedback tooltip before click', function () {
      expect(feedbackTooltip.classList.contains('bx--btn--copy__feedback--displayed')).to.be.false;
    });

    it('Should show the feedback tooltip on click', function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(feedbackTooltip.classList.contains('bx--btn--copy__feedback--displayed')).to.be.true;
    });

    it('Should hide the feedback tooltip after specified timeout value', function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(feedbackTooltip.classList.contains('bx--btn--copy__feedback--displayed')).to.be.true;
      clock.tick(2000);
      expect(feedbackTooltip.classList.contains('bx--btn--copy__feedback--displayed')).to.be.false;
    });

    afterEach(function () {
      if (clock) {
        clock.restore();
        clock = null;
      }
    });

    after(function () {
      document.body.removeChild(container);
      copyBtn.release();
    });
  });
});
