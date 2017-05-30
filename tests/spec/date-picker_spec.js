import 'core-js/modules/es6.weak-map'; // For PhantomJS
import DatePicker from '../../src/components/date-picker/date-picker';

describe('Test responsive table', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new DatePicker();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new DatePicker(document.createTextNode(''));
      }).to.throw(Error);
    });
  });
});
