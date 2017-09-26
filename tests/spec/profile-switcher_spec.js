import ProfileSwitcher from '../../src/components/unified-header/profile-switcher';
import unifiedHeaderHtml from '../../src/components/unified-header/unified-header.html';

describe('Test profile switcher', function() {
  describe('Constructor', function() {
    let profileSwitcher;

    it('Should throw if root element is not given', function() {
      expect(() => {
        new ProfileSwitcher();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new ProfileSwitcher(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('Should set default options', function() {
      const container = document.createElement('div');
      container.innerHTML = unifiedHeaderHtml;
      profileSwitcher = new ProfileSwitcher(container.querySelector('[data-profile-switcher]'));
      expect(profileSwitcher.options).to.deep.equal({
        selectorInit: '[data-profile-switcher]',
        selectorProfileSwitcher: '[data-profile-switcher]',
        selectorToggle: '[data-profile-switcher-toggle]',
        selectorMenu: '[data-switcher-menu]',
        selectorLinkedAccount: '[data-switcher-account-sl]',
        selectorAccount: '[data-switcher-account]',
        selectorRegion: '[data-switcher-region]',
        selectorOrg: '[data-switcher-org]',
        selectorSpace: '[data-switcher-space]',
        selectorDropdown: '[data-dropdown]',
        selectorAccountDropdown: '[data-dropdown-account]',
        selectorAccountSlDropdown: '[data-dropdown-account-sl]',
        selectorAccountLinked: '[data-dropdown-account-linked]',
        selectorAccountSlLinked: '[data-dropdown-account-sl-linked]',
        selectorRegionDropdown: '[data-dropdown-region]',
        selectorOrgDropdown: '[data-dropdown-org]',
        selectorSpaceDropdown: '[data-dropdown-space]',
        classSwitcherOpen: 'bx--account-switcher--open',
        classLinkedIcon: '.bx--account-switcher__linked-icon',
      });
    });

    afterEach(function() {
      if (profileSwitcher) {
        profileSwitcher = profileSwitcher.release();
      }
    });
  });
});
