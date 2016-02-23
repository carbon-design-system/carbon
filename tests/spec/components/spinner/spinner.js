import Spinner from '../../../../components/spinner/spinner';

describe('Test spinner', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new Spinner(); // eslint-disable-line no-new
      }).to.throw;
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new Spinner(document.createTextNode('')); // eslint-disable-line no-new
      }).to.throw;
    });

    it(`Should default state to active`, function () {
      const spinner = new Spinner(document.createElement('div'));
      expect(spinner.isActive()).to.equal(true);
    });

    it(`Should accept options`, function () {
      const options = { active: false };
      const spinner = new Spinner(document.createElement('div'), options);
      expect(spinner.isActive()).to.equal(false);
    });
  });

  describe('Set', function () {
    it('Should throw if boolean is not passed in', function () {
      const spinner = new Spinner(document.createElement('div'));
      expect(() => spinner.set()).to.throw;
      expect(() => spinner.set('true')).to.throw;
    });

    it('Should set state', function () {
      const spinner = new Spinner(document.createElement('div'));
      spinner.set(true);
      expect(spinner.isActive()).to.equal(true);
      spinner.set(false);
      expect(spinner.isActive()).to.equal(false);
    });

    it('Should return self after setting', function() {
      const spinner = new Spinner(document.createElement('div'));
      expect(spinner.set(true)).to.equal(spinner);
    });

    it('Should set class of DOM element', function() {
      const spinner = new Spinner(document.createElement('div'));
      spinner.set(true);
      expect(spinner.element.className).to.equal('spinner is-active');
      spinner.set(false);
      expect(spinner.element.className).to.equal('spinner is-inactive');
    });

    it('Should set special class for IE', function() {
      var options = { ie: true };
      const spinner = new Spinner(document.createElement('div'), options);
      spinner.set(true);
      expect(spinner.element.className).to.equal('spinner is-active is-active--ie');
      spinner.set(false);
      expect(spinner.element.className).to.equal('spinner is-inactive is-inactive--ie');
    });
  });

  describe('Toggling', function() {
    it('Should toggle', function() {
      const spinner = new Spinner(document.createElement('div'));
      spinner.toggle();
      expect(spinner.isActive()).to.equal(false);
      spinner.toggle();
      expect(spinner.isActive()).to.equal(true);
    });
  });

  describe('Check spinner state', function() {
    it('Should return spinner state', function() {
      const spinner = new Spinner(document.createElement('div'));
      expect(spinner.isActive()).to.equal(true);
    });
  });

  describe('Get DOM element', function() {
    it('Should return DOM element', function() {
      const element = document.createElement('div');
      const spinner = new Spinner(element);
      expect(spinner.element).to.equal(element);
    });
  });
});
