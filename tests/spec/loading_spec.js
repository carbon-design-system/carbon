import '../utils/es6-weak-map-global'; // For PhantomJS
import Loading from '../../consumables/js/es2015/loading';

describe('Test Loading', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new Loading();
      }).to.throw(Error);
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new Loading(document.createTextNode(''));
      }).to.throw(Error);
    });

    it(`Should default state to active`, function () {
      const spinner = new Loading(document.createElement('div'));
      expect(spinner.isActive()).to.equal(true);
    });

    it(`Should accept options`, function () {
      const options = { active: false };
      const spinner = new Loading(document.createElement('div'), options);
      expect(spinner.isActive()).to.equal(false);
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
      expect(spinner.isActive()).to.equal(true);
      spinner.set(false);
      expect(spinner.isActive()).to.equal(false);
    });

    it('Should return self after setting', function () {
      const spinner = new Loading(document.createElement('div'));
      expect(spinner.set(true)).to.equal(spinner);
    });

    it('Should set data-ie attributes of DOM element', function () {
      const isIE = window.ActiveXObject || 'ActiveXObject' in window;
      const spinner = new Loading(document.createElement('div'));
      spinner.set(true);
      expect(spinner.element.dataset.ie).to.equal('no');
      if (isIE) expect(spinner.element.dataset.ie).to.equal('yes');
    });

    it('Should set data-state attributes of DOM element', function () {
      const spinner = new Loading(document.createElement('div'));
      spinner.set(true);
      expect(spinner.element.dataset.state).to.equal('active');
      spinner.set(false);
      expect(spinner.element.dataset.state).to.equal('inactive');
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
