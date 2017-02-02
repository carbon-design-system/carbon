import '../utils/es6-weak-map-global'; // For PhantomJS
import Loading from '../../src/components/loading/loading';

describe('Test Loading', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new Loading();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new Loading(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default state to active', function () {
      const spinner = new Loading(document.createElement('div'));
      expect(spinner.isActive()).to.equal(true);
    });

    it('Should accept options', function () {
      const options = { active: false };
      const spinner = new Loading(document.createElement('div'), options);
      expect(spinner.isActive()).to.equal(false);
    });

    it('Should set class to bx--loading--ie', function () {
      const isIE = window.ActiveXObject || 'ActiveXObject' in window;
      const spinner = new Loading(document.createElement('div'));
      if (isIE) expect(spinner.element.classList.contains('bx--loading--ie')).to.be.true;
    });
  });

  describe('set()', function () {
    it('Should throw if boolean is not passed in', function () {
      const spinner = new Loading(document.createElement('div'));
      expect(() => spinner.set()).to.throw(Error);
      expect(() => spinner.set('true')).to.throw(Error);
    });

    it('Should set state', function () {
      const spinner = new Loading(document.createElement('div'));
      spinner.set(true);
      expect(spinner.isActive()).to.be.true;
      spinner.set(false);
      expect(spinner.isActive()).to.be.false;
    });

    it('Should return self', function () {
      const spinner = new Loading(document.createElement('div'));
      expect(spinner.set(true)).to.equal(spinner);
    });

    it('Should remove and add bx--loading--stop class attribute of DOM element', function () {
      const isIE = window.ActiveXObject || 'ActiveXObject' in window;
      const spinner = new Loading(document.createElement('div'));
      spinner.set(false);
      expect(spinner.element.classList.contains('bx--loading--stop'), 'Class for stopped state').to.be.true;
      if (isIE) expect(spinner.element.classList.contains('bx--loading--stop--ie'), 'IE class for stopped state').to.be.true;

      spinner.set(true);
      expect(spinner.element.classList.contains('bx--loading--stop'), 'Class for started state').to.be.false;
      if (isIE) expect(spinner.element.classList.contains('bx--loading--stop--ie'), 'IE class for started state').to.be.false;
    });

    it('Should set bx--loading--ie attributes of DOM element', function () {
      const isIE = window.ActiveXObject || 'ActiveXObject' in window;
      const spinner = new Loading(document.createElement('div'));
      spinner.set(true);
      if (isIE) expect(spinner.element.classList.contains('bx--loading--ie')).to.be.true;
    });
  });

  describe('toggle()', function () {
    it('Should toggle', function () {
      const spinner = new Loading(document.createElement('div'));
      spinner.toggle();
      expect(spinner.isActive()).to.equal(false);
      spinner.toggle();
      expect(spinner.isActive()).to.equal(true);
    });
  });

  describe('isActive()', function () {
    it('Should return spinner state', function () {
      const spinner = new Loading(document.createElement('div'));
      expect(spinner.isActive()).to.equal(true);
    });
  });

  describe('Managing instances', function () {
    let element;

    before(function () {
      element = document.createElement('a');
    });

    it('Should prevent creating duplicate instances', function () {
      let first;
      let second;
      try {
        first = Loading.create(element);
        second = Loading.create(element);
        expect(first).to.equal(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });

    it('Should let create a new instance for an element if an earlier one has been released', function () {
      let first;
      let second;
      try {
        first = Loading.create(element);
        first.release();
        second = Loading.create(element);
        expect(first).not.to.equal(second);
      } finally {
        first && first.release();
        if (first !== second) {
          second && second.release();
        }
      }
    });
  });
});
