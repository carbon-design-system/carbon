import '../utils/es6-weak-map-global'; // For PhantomJS
import '../../consumables/js/polyfills/custom-event';
import NumberInput from '../../consumables/js/es2015/number-input';

describe('Test Number Input', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new NumberInput();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new NumberInput(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Adding and Subtracting', function () {
    // let input;
    // let element;

    // before(function () {
    //   element = document.createElement('input');
    //   input = new NumberInput(element);
    //   element.value = 2;
    //   document.body.appendChild(element);
    // });

    // it(`Should increase the value`, function () {
    //   element.dispatchEvent(new CustomEvent('click'));
    //   expect(element.value).to.equal('3');
    // });
    //
    // it(`Should decrease the value`, function () {
    //   element.dispatchEvent(new CustomEvent('click'));
    //   expect(element.value).to.equal('1');
    // });
  });
});
