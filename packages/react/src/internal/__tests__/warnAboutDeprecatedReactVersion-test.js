/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('warnAboutDeprecatedReactVersion', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  let spy;

  function loadWithReactVersion(version) {
    jest.doMock('react', () => ({
      __esModule: true,
      default: {
        version,
      },
      version,
    }));

    return require('../warnAboutDeprecatedReactVersion');
  }

  beforeEach(() => {
    jest.resetModules();
    spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
    jest.dontMock('react');
    process.env.NODE_ENV = originalNodeEnv;
  });

  it.each(['16.14.0', '17.0.2'])(
    'warns when React %s is detected',
    (version) => {
      loadWithReactVersion(version);

      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining(`Detected React ${version}.`)
      );
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining('https://carbondesignsystem.com/deprecations')
      );
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Carbon v11 (@carbon/react v1.x) and will be removed in Carbon v12 (@carbon/react v2.x)'
        )
      );
    }
  );

  it.each(['18.2.0', '19.2.3'])(
    'does not warn when React %s is detected',
    (version) => {
      loadWithReactVersion(version);

      expect(spy).not.toHaveBeenCalled();
    }
  );

  it('only warns once', () => {
    const { warnAboutDeprecatedReactVersion } = loadWithReactVersion('17.0.2');

    warnAboutDeprecatedReactVersion('17.0.2');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not warn in production', () => {
    process.env.NODE_ENV = 'production';
    jest.resetModules();

    loadWithReactVersion('17.0.2');

    expect(spy).not.toHaveBeenCalled();
  });

  it('does not warn when React does not provide a version', () => {
    loadWithReactVersion(undefined);

    expect(spy).not.toHaveBeenCalled();
  });
});
