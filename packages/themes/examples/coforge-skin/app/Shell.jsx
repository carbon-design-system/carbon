/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Content,
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderPanel,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent,
  Switcher,
  SwitcherItem,
} from './carbon';
import { UserAvatar } from '@carbon/icons-react';
import { href } from './useHashLocation';
import { signOut } from './session';
import { ConciergeLayer } from '../new/ConciergeLayer/ConciergeLayer';

const JOBS = [
  { id: 'nav-tickets', label: 'Tickets', path: '/tickets', match: '/tickets' },
  { id: 'nav-hotels', label: 'Hotels', path: '/hotels', match: '/hotels' },
  {
    id: 'nav-activities',
    label: 'Activities',
    path: '/activities',
    match: '/activities',
  },
  {
    id: 'nav-itinerary',
    label: 'Itinerary',
    path: '/itinerary',
    match: '/itinerary',
  },
];

export function LumaShell({ pathname, signedIn, onSessionChange, children }) {
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const closePanels = () => {
    setConciergeOpen(false);
    setAccountOpen(false);
  };

  return (
    <div
      className="luma-app"
      style={{ minBlockSize: '100vh', background: 'var(--cds-background)' }}>
      <Header aria-label="Luma">
        <SkipToContent href="#main-content" />
        <HeaderMenuButton
          aria-label="Open menu"
          isActive={navOpen}
          onClick={() => setNavOpen((open) => !open)}
        />
        <HeaderName prefix="" href={href('/')}>
          Luma
        </HeaderName>
        <HeaderNavigation aria-label="Jobs">
          {JOBS.map((job) => (
            <HeaderMenuItem
              key={job.id}
              id={job.id}
              href={href(job.path)}
              isCurrentPage={
                pathname === job.match || pathname.startsWith(`${job.match}/`)
              }
              onClick={closePanels}>
              {job.label}
            </HeaderMenuItem>
          ))}
        </HeaderNavigation>
        <HeaderGlobalBar>
          <ConciergeLayer.Action
            expanded={conciergeOpen}
            onToggle={() => {
              setAccountOpen(false);
              setConciergeOpen((open) => !open);
            }}
          />
          <HeaderGlobalAction
            id="account"
            aria-label="Account"
            isActive={accountOpen}
            onClick={() => {
              setConciergeOpen(false);
              setAccountOpen((open) => !open);
            }}>
            <UserAvatar size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <ConciergeLayer.Panel
          expanded={conciergeOpen}
          onNavigate={closePanels}
        />
        <HeaderPanel
          expanded={accountOpen}
          href="#account"
          aria-label="Account">
          <Switcher aria-label="Account" expanded={accountOpen}>
            {signedIn ? (
              <SwitcherItem
                aria-label="Sign out"
                href={href(pathname)}
                onClick={(event) => {
                  event.preventDefault();
                  signOut();
                  onSessionChange();
                  closePanels();
                }}>
                Sign out
              </SwitcherItem>
            ) : (
              <SwitcherItem
                aria-label="Open stored documents"
                href={href('/tickets/documents')}
                onClick={closePanels}>
                Stored documents (sign in)
              </SwitcherItem>
            )}
          </Switcher>
        </HeaderPanel>
        <SideNav
          aria-label="Jobs"
          expanded={navOpen}
          isPersistent={false}
          onOverlayClick={() => setNavOpen(false)}>
          <SideNavItems>
            <HeaderSideNavItems>
              {JOBS.map((job) => (
                <HeaderMenuItem
                  key={`side-${job.id}`}
                  href={href(job.path)}
                  isCurrentPage={
                    pathname === job.match ||
                    pathname.startsWith(`${job.match}/`)
                  }
                  onClick={() => {
                    closePanels();
                    setNavOpen(false);
                  }}>
                  {job.label}
                </HeaderMenuItem>
              ))}
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
      </Header>
      <Content id="main-content">{children}</Content>
    </div>
  );
}
