import Promise from 'bluebird'; // For testing on browsers not supporting Promise
import testAATCompliance from './test-aat-compliance';

describe('Test a11y compliance', function () {
  this.timeout(30000);

  before(async function () {
    await new Promise((resolve) => {
      const link = document.getElementById('library-style');
      if (link.loaded) {
        resolve();
      } else {
        link.addEventListener('load', resolve);
      }
    });
  });

  it('Should have a11y-compliant bluemix-components.css', async function () {
    await testAATCompliance(document.getElementById('html-fragment-container'), 'bluemix-components.css');
  });

  Object.keys(window.__html__).forEach((file) => {
    const name = (/^src\/components\/(.*)$/i.exec(file) || [])[1] || file;

    it(`Should have a11y-compliant ${name}`, async function () {
      const container = document.getElementById('html-fragment-container');
      const formContainer = document.getElementById('form-html-fragment-container');
      container.innerHTML = window.__html__[file];
      if (container.querySelector('input') && !container.querySelector('form')) {
        while (container.firstChild) {
          formContainer.appendChild(container.firstChild);
        }
      }
      await testAATCompliance(container, file);
    });
  });

  afterEach(function () {
    document.getElementById('form-html-fragment-container').innerHTML = '';
    document.getElementById('html-fragment-container').innerHTML = '';
  });
});
