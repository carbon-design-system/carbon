import React from 'react';
import { Link } from 'gatsby';
import GlobalSearch from '../GlobalSearch';
import {
  Header,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from 'carbon-components-react/lib/components/UIShell';
import { AppSwitcher20, Close20, Search20 } from '@carbon/icons-react';

export default class WebsiteHeader extends React.Component {
  render() {
    const {
      children,
      onToggleBtnClick,
      handleSearchClick,
      isInternal,
      isSearchOpen,
      isSwitcherOpen,
    } = this.props;
    return (
      <>
        {children}
        <Header aria-label="Header" className="bx--header--website">
          <SkipToContent />
          <HeaderMenuButton
            className="bx--header__action--menu"
            aria-label="Open menu"
            onClick={() =>
              onToggleBtnClick(
                'isLeftNavOpen',
                'isLeftNavFinal',
                'isSwitcherOpen',
                'isSwitcherFinal'
              )
            }
            isActive={this.props.isLeftNavOpen}
          />
          {isInternal ? (
            <HeaderName prefix="" to="/" element={Link} href="/">
              <span>IBM Product</span>&nbsp;Design&nbsp;<span>System</span>
            </HeaderName>
          ) : (
            <HeaderName prefix="" to="/" element={Link}>
              Carbon&nbsp;<span>Design System</span>
            </HeaderName>
          )}

          <HeaderGlobalBar>
            {/* {isInternal ? null : <GlobalSearch />} */}
            {isSearchOpen ? (
              <GlobalSearch />
            ) : (
              <HeaderGlobalAction
                className="bx--header__action--search"
                aria-label="Search Website"
                onClick={() => handleSearchClick('isSearchOpen')}>
                <Search20 />
              </HeaderGlobalAction>
            )}
            <HeaderGlobalAction
              className="bx--header__action--switcher"
              aria-label="Switch"
              onClick={() =>
                onToggleBtnClick(
                  'isSwitcherOpen',
                  'isSwitcherFinal',
                  'isLeftNavOpen',
                  'isLeftNavFinal'
                )
              }>
              {isSwitcherOpen ? <Close20 /> : <AppSwitcher20 />}
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      </>
    );
  }
}
