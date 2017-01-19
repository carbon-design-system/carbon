import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../demo/polyfills/custom-event';
import CopyBtn from '../../src/components/buttons/copy-btn';

const HTML = `
<button data-copy-btn class="bx--btn--copy">
  Copy
  <svg class="bx--btn--right-icon__icon">
    <use class="bx--btn--right-icon__use" xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v5/img/bluemix-icons.svg#copy--code"></use>
  </svg>
  <div class="bx--btn--copy__feedback" data-feedback="Copied!"></div>
</button>
`;

describe('Test Copy Button', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new CopyBtn();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new CopyBtn(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Showing and hiding feedback tooltip', function () {
    let container;
    let element;
    let feedbackTooltip;
    let copyBtn;

    before(function () {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-copy-btn]');
      feedbackTooltip = document.querySelector('[data-feedback]');
      copyBtn = new CopyBtn(element);
    });

    it(`Should not show the feedback tooltip before click`, function () {
      expect(feedbackTooltip.classList.contains('bx--btn--copy__feedback--displayed')).to.be.false;
    });

    it(`Should show the feedback tooltip on click`, function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(feedbackTooltip.classList.contains('bx--btn--copy__feedback--displayed')).to.be.true;
    });

    it(`Should hide the feedback tooltip after specified timeout value`, function () {
      element.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(feedbackTooltip.classList.contains('bx--btn--copy__feedback--displayed')).to.be.true;
      setTimeout(() => {
        expect(feedbackTooltip.classList.contains('bx--btn--copy__feedback--displayed')).to.be.false;
      }, 2000);
    });

    after(function () {
      document.body.removeChild(container);
      copyBtn.release();
    });
  });
});
