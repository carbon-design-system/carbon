## `@carbon/ibm-products@2.93.0-rc.0`
### Features :rocket:
- feat(preview_PageHeader): implement disable sticky tab bar (#9365)
- feat: add preventCloseOnClickOutside prop to Coachmark to prevent outside click close (#9548)

### Bug fixes :bug:
- fix(preview__Tearsheet): accessibilty review issues fixes (#9512)
- fix: interstitialScreen getting reset on re-renders (#9560)
- fix(preview_PageHeader): resolve all issues in examples (#9543)
- fix(Tearsheet): fix focus order of close button (#9496)
- fix(coachmark): release review updates (#9558)
- fix(CreateFullPage): show step error state in pure pattern progress indicator (#9514)
- fix(ExpressiveCard): fix types for the description, label, and title (#9524)
- fix(deps): update dependency @carbon-labs/react-resizer to ^0.25.0 (#9535)
- fix(coachmark): a11y issues (#9470)
- fix: replace useLayoutEffect with useIsomorphicEffect in Tearsheet usePresence (#9513)

## `@carbon/ibm-products@2.92.1`
### Bug fixes :bug:
- fix(release): remove private utilities package from dependencies (#9532)
## `@carbon/ibm-products@2.92.1-rc.0`
### Bug fixes :bug:
- fix(release): remove private utilities package from dependencies (#9532)
## `@carbon/ibm-products@2.92.0`
### Features :rocket:
- feat(addselect): code refactoring and patterns (#9515)
- feat: #9174 Added support for clearFiltersText prop (#9508)
- feat(AddSelect): composable add select with patterns (#9368)
- feat(createTearsheetNarrow): implemented as pattern (#9404)
- feat: add carousel utility story examples (#9416)

### Housekeeping :house:
- chore(deps): update dependency typescript-config-carbon to ^0.10.0 (#9469)
- docs(changelog): update for v2.91.0-rc.0 (#9462)
## `@carbon/ibm-products@2.92.0-rc.1`
### Features :rocket:
- feat(addselect): code refactoring and patterns (#9515)
- feat: #9174 Added support for clearFiltersText prop (#9508)

## `@carbon/ibm-products@2.92.0-rc.0`
### Features :rocket:
- feat(AddSelect): composable add select with patterns (#9368)
- feat(createTearsheetNarrow): implemented as pattern (#9404)
- feat: add carousel utility story examples (#9416)

### Housekeeping :house:
- chore(deps): update dependency typescript-config-carbon to ^0.10.0 (#9469)
- docs(changelog): update for v2.91.0-rc.0 (#9462)

## `@carbon/ibm-products@2.91.0`
### Features :rocket:
- feat: Replace Interstitial Screen internal carousel with Carbon utility carousel (#9399)

### Bug fixes :bug:
- fix(deps): update dependency @carbon-labs/react-resizer to ^0.24.0 (#9421)
- fix(options-tile): WC parity work  (#9387)
- fix: increase code coverage > 80 (#9376)
- fix(apikeymodal): parity  (#9313)
- fix: hook to fetch and pass in parent feature flags to Tearsheet (#9341)
- fix: replace simpleHeader with preview_pageheader (#9375)

### Housekeeping :house:
- build(deps): update Carbon 11 compatible versions to latest (#9405)
- chore: upgrade jest config to pure esm (#9407)
- chore: optimise chromatic setup (#9394)
- chore: data spreadsheet depreciation (#9395)
- chore(storybook): upgrade Storybook to 10 (#9392)

## `@carbon/ibm-products@2.90.0`
### Features :rocket:
- feat: add onRemoveItem handler to intercept remove (#9350)
- feat(coachmark): add triggerRef prop (#9326)

### Bug fixes :bug:
- fix(TruncatedText): provide keyboard accessibility (#9245)
- fix(preview_PageHeader): resolve SSR hydration error (#9264)
- fix(preview_PageHeader): `HeroImage` not taking the full height (#9268)
- fix(page-header): resolve scroller button overlapping issue (#9345)
- fix: remove unwanted paths from code coverage report (#9363)
- fix(guide-banner): WC parity work (#9221)
- fix(guidebanner): fix expand collapse labels and aria-expand values (#9321)
- fix(deleteandRemove): wc parity (#9322)
- fix(EditInPlace): resolve focus missing and few other issue (#9243)

### Housekeeping :house:
- build(deps): update to Carbon 11 compatible versions to latest (#9347)
- chore(deps): update dependency tsdown to ^0.21.0 (#9317)

## `@carbon/ibm-products@2.89.0`
### Features :rocket:
- feat(preview_Tearsheet): stacking wrapper, actions prop for footer and story updates (#9242)
- feat(ConditionBuilder): title and text ellipsis of dropdown and default statement fix (#9252)
- feat(coachmark): replaces bubble with popover (#9220)

### Bug fixes :bug:
- fix(apikeymodal): document parity (#9293)
- fix: correct header tab order and alignemnt issue (#9179)
- fix(useFilters): updated selectedFilters to check filtersState is an array (#9270)
- fix(about-modal): fix colors / theming for react and wc (#9262)
- fix: replace hardcoded instance of cds (#9165)

### Housekeeping :house:
- chore(DelimitedList): deprecate `DelimitedList` (#9219)
- chore(deps): update dependency @vitejs/plugin-react to v5.2.0 (#9236)
- chore(StringFormatter): deprecate `StringFormatter` (#9217)
- chore(deps): update dependency vite to v8 [security] (#9259)
- build(deps): update to Carbon 11 compatible versions to latest (#9257)
- docs(changelog): update for v2.88.0-rc.0 (#9247)

## `@carbon/ibm-products@2.88.0`
### Features :rocket:
- feat(preview__PageHeader): implement callbacks for intesecting observers (#9087)
- feat: add initialState support and footer actions prop (#9171)

### Bug fixes :bug:
- fix(interstitialScreen): parity issues and small screens ui of action buttons (#9032)
- fix(build): patch CJS default export interop for tsdown migration

### Housekeeping :house:
- chore(preview_PageHeader): refactor `breadcrumbPageActions` to a standalone component (#9230)
- docs(changelog): update for v2.87.0-rc.0 (#9187)

## `@carbon/ibm-products@2.87.1`
### Bug fixes :bug:
- fix(build): patch CJS default export interop for tsdown migration
## `@carbon/ibm-products@2.87.0`
### Features :rocket:
- feat(createFullPage): implemented as patterns in react (#9096)

### Bug fixes :bug:
- fix: add prop type as dep
- fix: build fixes and release CI optimisations
- fix(SidePanel): visual issues - react (#9142)
- fix: Coachmark design parity (#9155)
- fix: move step flows to utilities (#9110)

### Housekeeping :house:
- chore(deps): update dependency glob to v13 (#9035)
- chore(AGENTS.md): add AGENTS.md (#9172)
- chore: migrate to tsdown for react and wc (#9123)

## `@carbon/ibm-products@2.86.0`
### Features :rocket:
- feat(preview_Tearsheet): add support for actions prop for footer (#9103)
- feat(Tearsheet_preview): refactor portalTarget implementation in preview_Tearsheet (#9081)
- feat: incorporate usePresence for preview_Tearsheet and doc updates (#9062)
- feat: Composable Tearsheet webcomponent implementation (#8841)
- feat: refactor pattern architecture (#9061)

### Bug fixes :bug:
- fix(editinplace): readonly prop as optional (#9105)
- fix: make style specific to sidepanel in tearsheet (#9107)
- fix(preview_PageHeader): resolve breadcrumb bar mobile view issues (#9072)
- fix(useravatar): design parity (#9064)

### Housekeeping :house:
- chore: Remove Percy in favour of Chromatic for VRT (#9112)
- chore: add chromatic set up ibm-products react and wc storybook (#9086)
- chore(deps): update dependency @vitejs/plugin-react to v5 (#9027)
- build(deps): update to Carbon 11 compatible versions to latest (#9063)
- chore(OptionsTile): refactor header (#9021)

## `@carbon/ibm-products@2.85.0`
### Features :rocket:
- feat: create tearsheet pattern using preview_Tearsheet (#8937)
- feat(emptystate): code connect integration (#8954)
- feat(editinplace): add readOnly prop (#9007)
- feat(createtearsheet): disable secondary button (#8950)

### Bug fixes :bug:
- fix: delete tags and restore vesions to retry release 5
- fix: add js extension for imports
- fix: delete tags and restore vesions to retry release 4
- fix: delete tags and restore vesions to retry release 3
- fix: delete tags and restore vesions to retry release 2
- fix: delete tags and restore vesions to retry release
- fix: workaround fix to prevent popover to close on date sel (#9065)
- fix: tab stop issue in coachmark patterns (#8987)
- fix: build warnings from CoachmarkOverlayElements and CoachmarkStacked (#9043)
- fix(usePortalTarget): fix hydration error (#9029)
- fix(coachmark): enable keyboard dragging for floating variant (#9031)
- fix: preserve namespace in storycode (#8993)
- fix(security): upgrade @figma/code-connect to 1.4.0 (#9016)
- fix(usePortalTarget): fix render portal use (#9018)
- fix(ImportModal): make `inputLabel` required and add new prop `hideInputLabel` (#9011)
- fix: security vulnerability in isaacs/brace-expansion,lodash and undici (#8995)

### Housekeeping :house:
- refactor(preview__PageHeader): separate child components to separate from `PageHeader.tsx` file (#8988)
- docs(changelog): update for v2.84.0 (#9013)

## `@carbon/ibm-products@2.84.0`
### Features :rocket:
- feat(nonlinearreading): code connect integration (#8943)
- feat: show Close icon at global header actions when expanded (#8933)
- feat(tearsheetpresence): add tearsheet presence (#8929)
- feat(CoachmarkPatterns): example creation for coachmark patterns (#8918)
- feat(pageheader): code connect integration (#8716)

### Bug fixes :bug:
- fix(SidePanel): Allow closing SidePanel via ESC key (#8977)
- fix(preview__PageHeader): resolve content actions responsive issue in < 1010px viewport (#8976)
- fix(Pageheader_preview): header calulation issue fix (#8940)
- fix(CoachmarkBeacon): removed role from wrapper div (#8956)
- fix(PageHeader): use TruncatedText in PageHeader subtitle (#8917)
- fix: use carbon prefix directly from @carbon/styles package config (#8904)

### Housekeeping :house:
- chore: remove unwanted style changes (#8997)
- build(deps): update to Carbon 11 compatible versions to latest (#8991)
- chore(deps): update dependency @percy/storybook to v10 (#8982)
- chore: bump @carbon/feature-flags version (#8968)
- chore(deps): update dependency @vitejs/plugin-react to v4.7.0 (#8967)
- chore(deps): update dependency vite to v7 [security] (#8941)
- build(performance): rolldown-vite integration (#8915)
- build(deps): update to Carbon 11 compatible versions to latest (#8907)

## `@carbon/ibm-products@2.83.0`
### Features :rocket:
- feat(CreateModal): implement `CreateModal` pattern with example (#8706)
- feat: added side panel code connect file for wc (#8687)

### Bug fixes :bug:
- fix: pageheader position on scroll and resize (#8866)
- fix(storybook): add a11y checker back, react/wc (#8899)
- fix(checklist): title and chart title do not show tooltip when truncated (#8788)
- fix(coachmark): added preview status to coachmarkBeacon (#8855)
- fix: exception focusing launcherButton (#8827)

### Housekeeping :house:
- chore(deps): update dependency typescript-config-carbon to ^0.9.0 (#8894)

## `@carbon/ibm-products@2.82.0`
### Features :rocket:
- feat(coachmark): open in stackblitz (#8690)
- feat(ConditionBuilder): Added code connect files (#8483)
- feat: added support for iframes in storybook for autotrack (#8580)
- feat(Checklist): code connect (#8711)
- feat(Tearsheet):  add stackblitz examples (#8718)

### Bug fixes :bug:
- fix: convert `babel` and `jest` config packages to ESM (#8782)
- fix: avoid scroll reset on resize (#8806)
- fix(tearsheet): add preview__ for tearsheet/next props (#8779)
- fix: use correct type for portalTarget in RemoveModal (#8680)

### Housekeeping :house:
- chore(deps): update dependency @rollup/plugin-commonjs to v29 (#8584)

## `@carbon/ibm-products@2.81.0`
### Features :rocket:
- feat(Coachmark): implementation of coachmark WC (#8599)

### Bug fixes :bug:
- fix: rc clean ups
- fix: remove not needed tags and restore package.json
- fix: restore all changes after deleting unnecessary tags
- fix: stabilize npm package with rc
- fix: restore npm token and add logs
- fix: add permission for release start
- fix: skip ci for next rc
- fix: remove npm token to use OIDC and empty changes for re publish
- fix: retry publish for rc.2
- fix(DataSpreadsheet): Changed document querySelector to ref querySelector (#8717)
- fix(code-connect): exclude node_modules (#8705)

### Housekeeping :house:
- chore: retry prerelease publish
- build(deps): update Carbon 11 compatible versions to latest (#8726)
- chore: init code connect for EditInPlace (#8575)

## `@carbon/ibm-products@2.80.0`
### Features :rocket:
- feat(InlineTip): adding figma code connect file (#8611)
- feat(interstitialscreen): code connect integration (#8572)
- feat(Tearsheet): stacking, unit test, design review changes and fixes (#8563)
- feat(web-terminal): code connect integration (#8497)

### Bug fixes :bug:
- fix: tearsheet entry and exit animations not working after carbon upgrade (#8674)
- fix(CreateTearSheet): Modified the useCreateComponentFocus hook (#8076)
- fix: remove use client directive warnings from build (#8641)
- fix: prevent disable buttons hook from running on column resize (#8666)
- fix: prevent customize column hook from running on column resize (#8640)
- fix(CoachmarkStack): stack closing issue (#8635)
- fix: replace uselayouteffect with isomorphic effect (#8630)

### Housekeeping :house:
- build(deps): update Carbon 11 compatible versions to latest (#8638)
- chore(Tearsheet): replace h2 and h3 tags with Section and Heading (#8675)
- chore: add deprecation notice to coachmark (#8634)

## `@carbon/ibm-products@2.79.0`
### Features :rocket:
- feat: composable tearsheet initial implementation (#8337)

### Bug fixes :bug:
- fix(InterstitialScreen): expanded documentation with additional usage details and issue fixes (#8585)
- fix: condition builder popover getting closed on scrollbar click (#8571)
- fix: remove canary check from truncatedtext component (#8471)

### Housekeeping :house:
- chore(carbon-upgrade): address default tag margin removal (#8550)
- test(PageHeader): react tests clean up with `composeStory` (#8579)
- chore(sass): update to v1.93.2 (#8567)

## `@carbon/ibm-products@2.78.0`
### Features :rocket:
- feat(GuideBanner): code connect (#8411)
- feat(tearsheet): Added code connect files (#8472)
- feat(notificationPanel): code connect (#8408)
- feat(PageHeader): add open in stackblitz config (#8469)
- feat(sidepanel): code connect integration (#8444)

### Bug fixes :bug:
- fix(Feature flag): moved the merge logic from feature-flag js to FeatureFlag (#8535)
- fix: modified expressivecard story's incorrect "caption" prop (#8473)
- fix(PageHeader): use correct export path (#8514)
- fix: remove patterns from build output (#8468)
- fix: remove truncation styling from sidepanel title (#8322)
- fix(cards): cards (expressive and productive) code connect files causing breaking publishes (#8445)
- fix(coachmark): added missing exports (#8406)
- fix: add code panel back into storybook (#8431)

### Housekeeping :house:
- chore(PageHeader): use condensed grid for tab bar text alignment (#8491)

## `@carbon/ibm-products@2.77.1`
### Bug fixes :bug:
- fix(PageHeader): use correct export path (#8514)

## `@carbon/ibm-products@2.77.0`
### Features :rocket:
- feat(ImportAndUploadModal): implement as patterns (#8348)
- feat(coachmarkStacked): implemented as patterns (#8317)
- feat(UserAvatar): code connect (#8264)
- feat(EmptyState): integration of open in Stackblitz (#8373)
- feat: add support for react server components via `use client` directive (#8358)
- feat(code-connect): add web component code connect config setup (#8387)
- feat(FullPageError): Code connect file added (#8331)
- feat: code connect file for TagSet (#8332)
- feat(OptionsTile): Code connect (#8291)
- feat: addselect notearsheet implementation (#8259)
- feat(AboutModal): added code connect file (#8353)
- feat(ExportModal): implement export modal as a pattern (#8234)

### Bug fixes :bug:
- fix(guidebanner): add prop to control open state (#8294)
- fix(PageHeader): use section and heading components for heading levels (#8356)

### Housekeeping :house:
- chore(deps): update dependency typescript-config-carbon to ^0.8.0 (#8443)
- chore: init code connect for cards (#8258)
- chore(storybook): use theme tokens for sb doc previews (#8396)
- test(coachmarkTagline): add test (#8292)
- test(PageHeader): increases coverage, removes .only in test (#8260)

## `@carbon/ibm-products@2.76.0`
### Features :rocket:
- feat(CoachmarkFixed): implemented as patterns (#8221)
- feat(pattern): delete and remove (#8268)
- feat(code-connect): setup initial config and connect `BigNumber` (#8188)

### Bug fixes :bug:
- fix(Instrumentation): remove common script (#7722)
- fix(tagset): expansion and collapse is not conveyed to screen readers (#8283)
- fix(deps): update dependency @carbon-labs/react-resizer to ^0.10.0 (#8282)
- fix(deps): update dependency @carbon-labs/react-resizer to ^0.8.0 (#8239)

### Housekeeping :house:
- chore(telemetry): update ibm-products telemetry config
- refactor(scripts): remove chalk dep (#8321)
- chore: pin chalk (#8261)
- refactor(PageHeader): change api for tags prop in tab bar (#8205)

## `@carbon/ibm-products@2.75.0`
### Features :rocket:
- feat(PageHeader): add compact story, fix preview styles in storybook docs page (#8190)
- feat(sidepanel): utilizes layer in sidepanel (#8025)
- feat(CoachmarkOverlayElements): implemented as patterns (#8178)

### Bug fixes :bug:
- fix(deps): update dependency @carbon-labs/react-resizer to ^0.7.0 (#8175)
- fix(makeDraggable): enhacement based on carbon review comments (#8160)

### Housekeeping :house:
- chore: canary removal / add PDLC status categories to storybook (#7869)
- chore(deps): update dependency npm-run-all2 to v8 (#8219)
- chore(deps): replace dependency npm-run-all with npm-run-all2 ^5.0.0 (#7202)
- build(deps): update to Carbon 11 compatible versions to latest (#8171)
- chore(deps): update dependency typescript-config-carbon to ^0.7.0 (#8173)

## `@carbon/ibm-products@2.74.0`
### Features :rocket:
- feat(conditionbuilder): option to disable specific property dynamically (#8105)
- feat: condition builder read only state (#8125)
- feat(stepflows): introduce new step utility (#8020)

### Bug fixes :bug:
- fix: enableSidepanelResizer undefined issue (#8143)
- fix: init deprecated extension for codecov (#8039)
- fix(CoachmarkBubble): usage of ref (#8114)
- fix: replace StringFormatter with TruncatedText (#7968)
- fix(makeDraggable): improve accessibility (#8090)
- fix(coachmark): resolved circular dependency (#8104)
- fix: update format script (#8107)
- fix(coachmark): add closeIconDescription (#7973)
- fix: remove requiredIf props helpers (#8060)

### Housekeeping :house:
- test(coachmark): add coachmark test (#8043)
- docs(AboutModal): update content and structure (#8040)
- chore(deps): update dependency @percy/storybook to v9 (#8053)
- test(makeDraggable): add tests (#8099)
- test(coachmark): add avt tests (#8045)
- chore(deps): update dependency typescript-config-carbon to ^0.6.0 (#8080)

## `@carbon/ibm-products@2.73.1`
### Bug fixes :bug:
- fix: remove requiredIf props helpers (#8153)
- fix: remove requiredIf props helpers

## `@carbon/ibm-products@2.73.0`
### Features :rocket:
- feat(PageHeader): page content actions moving into breadcrumb bar on scroll (#7881)

### Bug fixes :bug:
- fix(EmptyState): Modified subtitle container to be a div (#7967)
- fix: disable ability to submit form using the Enter key (#8019)
- fix(sidepanel): blank space appears when the header has no content (#8029)
- fix: add role prop to pageheader's breadcrumb overflow menu (#8017)
- fix(deps): update dependency @carbon-labs/react-resizer to ^0.6.0 (#8027)
- fix(PageHeader): ensures expected positioning even if content component is excluded (#7946)

### Housekeeping :house:
- docs: add intro page for prebuilt patterns (#7958)
- docs(changelog): update for v2.72.0-rc.0 (#7979)

## `@carbon/ibm-products@2.72.0`
### Features :rocket:
- feat(PageHeader): add new breadcrumb overflow utility sub-component (#7910)
- feat(coachmarkv2): added floating variant (#7924)
- feat(makeDraggable): utility added for drag functionality (#7908)
- feat: api key generation pattern code init (#7882)
- feat(sidepanel): add prop for close button tooltip alignment (#7878)
- feat(TruncatedText): init TruncatedText react component (#7755)
- feat(PageHeader): create title breadcrumb sub component (#7834)
- feat(openStackblitz): remove and import modal (#7842)
- feat: change docs to overview in stories (#7854)
- feat(PageHeader): add expand/collapse functionality (#7815)

### Bug fixes :bug:
- fix: conditionBuilder need to close on outside click
- fix(ProductiveCard): Added children explicitly to productiveCard (#7957)
- fix(Storybook): render the correct story in Storybook for few components (#7960)
- fix: include .cds--menu to selectorsFloatingMenus (#7916)
- fix(build): update story imports in docs and fix circular deps (#7892)
- fix(ConditionBuilder):  flickering sometimes while hovering on add new group/ condition/ subgroup and when there is scroll (#7853)
- fix: update config to create stackblitz examples with ts support (#7901)
- fix: condition builder issue fixes (#7891)
- fix: layout breakage due to extra nodes added to Tearsheet (#7832)
- fix(notification panel): clickoutside handler function exclude trigger button (#7830)
- fix(deps): update dependency @carbon-labs/react-resizer to ^0.4.0 (#7836)

### Housekeeping :house:
- chore(deps): update dependency cross-env to v10 (#7934)
- chore: rename BigNumbers to BigNumber (#7886)
- build(deps): update to Carbon 11 compatible versions to latest (#7840)
- chore: remove core package (#7859)
- chore: remove unneeded tabIndex={0} settings (#7829)
- chore: deprecate emptystate v2 prop (#7810)

## `@carbon/ibm-products@2.71.1`
### Bug fixes :bug:
- fix(PageHeader): export as preview from ts exports, bump resizer

## `@carbon/ibm-products@2.71.0`
### Features :rocket:
- feat: add various options for description (#7708)
- feat(storybook): use vite v7 (#7745)
- feat: change to make interstitialScreen stable (#7814)
- feat: add support for  children for InterstitialScreen.Body (#7791)
- feat(storybook): upgrade to v9 (#7734)
- feat(PageHeader): new experimental PageHeader component (#7733)

### Bug fixes :bug:
- fix(PageHeader): export as preview (#7872)
- fix: percy (#7812)
- fix(coachmarkstack): align layers (#7762)
- fix: condition builder various issues fixes related to popover close and focus (#7748)
- fix: ProductiveCard - actionIcons doesn't include types for data attributes (#7486)
- fix: interstitial screen release review (#7724)
- fix: for checkbox labels in the custom columns (#7742)
- fix(APIKeyModal): delay claimFocus (#7770)
- fix: sidepanel resize feature a11y (#7704)

### Housekeeping :house:
- docs(ProductiveCard): add docs about overflow menu items (#7825)
- chore: clean up side panel resizer (#7749)
- build(deps): update Carbon 11 compatible versions to latest (#7757)
- chore: remove redundant upgrade scripts (#7774)
- test: accessibility test fixes (#7728)
- chore: add deprecation notice to userprofileimage (#7729)
- chore: init update to react 19 (#7681)

## `@carbon/ibm-products@2.70.1`
### Bug fixes :bug:
- fix: useClickoutside causing NotificationsPanel to reopen (#7820)

## `@carbon/ibm-products@2.70.0`
### Features :rocket:
- feat(sidepanel): option to hide close button (#7669)

### Bug fixes :bug:
- fix: add rest props back to card overflow (#7744)
- fix(tearsheet): incorrect color layering (#7730)
- fix(stories): remove extra carbon style imports (#7647)
- fix: save usage guidelines (#7721)
- fix(CreateTearsheet): accessibility violation (#7643)
- fix(Instrumentation): auto track follow ups (#7715)
- fix(notification panel): clickoutside return focus to trigger button (#7707)
- fix: adds nullish checker back into create tearsheet first step logic (#7634)

### Housekeeping :house:
- build(deps): update Carbon 11 compatible versions to latest (#7663)
- chore: add global mocks to jest setup (#7653)
- chore(storybook): add a11y tab in wc and remove code tab from react (#7706)
- docs: restructure storybook IA (#7592)
- refactor(instrumentation): replace amplitude with autotrack (#7710)
- test: add valid matcher for expect() (#7666)

## `@carbon/ibm-products@2.69.0`
### Features :rocket:
- feat: resize feature changes added (#7501)
- feat(MultiAddSelect): add floating ui to sort and filter buttons (#6389)

### Bug fixes :bug:
- fix: productive card overflow bug (#7645)
- fix: remove usage of local carbon prefix in component files (#7642)
- fix:  investigate and address any accessibility violations in stable components  (#7586)
- fix(Interstitial): pass forwarded refs (#7588)

### Housekeeping :house:
- build(deps): update Carbon 11 compatible versions to latest (#7593)
- chore: overflow handler web component stories (#7553)
- chore(deps): update dependency yargs to v18 (#7596)
- chore(Coachmark): deprecation of props and coachmark components (#7499)
- docs(changelog): update for v2.68.0-rc.0 (#7602)

## `@carbon/ibm-products@2.68.0`
### Features :rocket:
- feat(openStackblitz): about modal and export Modal (#7479)
- feat(InterstitialScreen): add and update various stackblitz examples (#7510)
- feat(open stackblitz): API Key modal (#7365)

### Bug fixes :bug:
- fix(rtl): minor updates to provide stronger rtl support (#7580)
- fix: interstitial accessibility issue fixes (#7478)
- fix(CustomizeColumnsTearsheet): focus on close (#7497)
- fix(page header):  current page a11y issue (#7532)
- fix: include .internal.stories to ignore stories glob (#7531)
- fix(Tearsheet): fix keyboard scroll for non-interactive tearsheet (#7536)
- fix: supress sass deprecation warnings (#7515)
- fix(CustomizeColumnsTearsheet): keyboard and screen reader fixes (#7491)

### Housekeeping :house:
- chore(CreateFullPage): onrequestsubmit can return a promise (#7538)
- chore(sidepanel): update controls in the storybook (#7561)
- refactor(useResizeObserver): migrate to TS and refactor tests to include resize validation (#7548)
- test(CreateTearsheet): remove container usage (#7533)

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.67.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.67.0-rc.0...@carbon/ibm-products@2.67.0) (2025-05-28)

**Note:** Version bump only for package @carbon/ibm-products





# [2.67.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.62.0-rc.0...@carbon/ibm-products@2.67.0-rc.0) (2025-05-19)


### Bug Fixes

* **card:** use appropriate heading level ([#7284](https://github.com/carbon-design-system/ibm-products/issues/7284)) ([e175627](https://github.com/carbon-design-system/ibm-products/commit/e17562720d29c148b9d496a3ef7f0da21baeede5)), closes [#7168](https://github.com/carbon-design-system/ibm-products/issues/7168)
* **checklist:** use appropriate heading levels ([#7286](https://github.com/carbon-design-system/ibm-products/issues/7286)) ([873454c](https://github.com/carbon-design-system/ibm-products/commit/873454cb9d5e8a8c876406dc3895687b1d7d4bdd)), closes [#7168](https://github.com/carbon-design-system/ibm-products/issues/7168)
* **coachmark:** media/button padding and navLinkLabel as tooltip ([#7213](https://github.com/carbon-design-system/ibm-products/issues/7213)) ([9b2346c](https://github.com/carbon-design-system/ibm-products/commit/9b2346c9ffc385af60353a7d7285a111b1184617))
* **ConditionBuilder:** allow user to pass custom dateformat ([#7135](https://github.com/carbon-design-system/ibm-products/issues/7135)) ([5c1fe20](https://github.com/carbon-design-system/ibm-products/commit/5c1fe201ce38c268022b0464533e7eceb45bbc05))
* **Conditionbuilder:** popovers do not close when clicked somewhere else when inside a tearsheet ([#7150](https://github.com/carbon-design-system/ibm-products/issues/7150)) ([49c4826](https://github.com/carbon-design-system/ibm-products/commit/49c4826758b08fdae32373b442120dd75b631d4e))
* correct tooltip for custom operator ([#7113](https://github.com/carbon-design-system/ibm-products/issues/7113)) ([cca6e1f](https://github.com/carbon-design-system/ibm-products/commit/cca6e1f27d23ea987ee085d29976084e82e2637a))
* **CreateFullPage:** fix build issue in next js app ([#7244](https://github.com/carbon-design-system/ibm-products/issues/7244)) ([a032766](https://github.com/carbon-design-system/ibm-products/commit/a032766afa265b9143450cdf371b19bccfed7146))
* **CreateFullPage:** use correct heading levels ([#7166](https://github.com/carbon-design-system/ibm-products/issues/7166)) ([503dbb5](https://github.com/carbon-design-system/ibm-products/commit/503dbb5fc4865d703aaa1ef94ce155e78b6957d7)), closes [#6816](https://github.com/carbon-design-system/ibm-products/issues/6816) [#6815](https://github.com/carbon-design-system/ibm-products/issues/6815)
* **CreateTearsheet:** added code fix and test ([#7431](https://github.com/carbon-design-system/ibm-products/issues/7431)) ([dc1c0fb](https://github.com/carbon-design-system/ibm-products/commit/dc1c0fb0266bce3d61e375a39b9f82c79fe98b03))
* **custom typings:** include section ([#7161](https://github.com/carbon-design-system/ibm-products/issues/7161)) ([892dc11](https://github.com/carbon-design-system/ibm-products/commit/892dc1146db2bac23fa69d03b12df5b2fd7e4382)), closes [#4336](https://github.com/carbon-design-system/ibm-products/issues/4336) [#4225](https://github.com/carbon-design-system/ibm-products/issues/4225)
* **customizeColumns:** update column ids for accessibility ([#7221](https://github.com/carbon-design-system/ibm-products/issues/7221)) ([ed0d5df](https://github.com/carbon-design-system/ibm-products/commit/ed0d5df8315d84f662363ba5c7357d5bd5888a8b))
* **datagrid:** clicking select all checkbox focus loss ([#7385](https://github.com/carbon-design-system/ibm-products/issues/7385)) ([05c037e](https://github.com/carbon-design-system/ibm-products/commit/05c037e9db9686218d2bab4a6eeb5221076c9441)), closes [#6073](https://github.com/carbon-design-system/ibm-products/issues/6073) [#5638](https://github.com/carbon-design-system/ibm-products/issues/5638) [#5638](https://github.com/carbon-design-system/ibm-products/issues/5638) [#7348](https://github.com/carbon-design-system/ibm-products/issues/7348) [#5638](https://github.com/carbon-design-system/ibm-products/issues/5638) [#7348](https://github.com/carbon-design-system/ibm-products/issues/7348) [#5638](https://github.com/carbon-design-system/ibm-products/issues/5638) [#7348](https://github.com/carbon-design-system/ibm-products/issues/7348) [#5638](https://github.com/carbon-design-system/ibm-products/issues/5638) [#7348](https://github.com/carbon-design-system/ibm-products/issues/7348)
* **datagrid:** last applied filter should be included in panel ([#7451](https://github.com/carbon-design-system/ibm-products/issues/7451)) ([5cd5216](https://github.com/carbon-design-system/ibm-products/commit/5cd521680e040618c3a8cc2a102c83e8d2849ce7))
* **Datagrid:** move `aria-sort` to Datagrid `th` element ([#7206](https://github.com/carbon-design-system/ibm-products/issues/7206)) ([f4af549](https://github.com/carbon-design-system/ibm-products/commit/f4af549e64558606cc89ae0390294be3e0d678d0))
* **empty state:** link extends LinkProps ([#7457](https://github.com/carbon-design-system/ibm-products/issues/7457)) ([a5d60c7](https://github.com/carbon-design-system/ibm-products/commit/a5d60c7e1d84a9084451fa2b78adee3865b9c74e))
* **fullpageerror:** pass kind ([#7455](https://github.com/carbon-design-system/ibm-products/issues/7455)) ([eb776c3](https://github.com/carbon-design-system/ibm-products/commit/eb776c35294afb69861b0d451350e19c243d5b0e))
* **notification:** panel focus out issue ([#7344](https://github.com/carbon-design-system/ibm-products/issues/7344)) ([a22ca69](https://github.com/carbon-design-system/ibm-products/commit/a22ca69fc2ad52c7ee9d393b0a4beb4de929aa88))
* **notificationspanel:** fix hardcoded aria-label ([#7312](https://github.com/carbon-design-system/ibm-products/issues/7312)) ([29c2865](https://github.com/carbon-design-system/ibm-products/commit/29c286567d350a0edec78a481a81aa4996ff5d3f)), closes [#7287](https://github.com/carbon-design-system/ibm-products/issues/7287) [#7287](https://github.com/carbon-design-system/ibm-products/issues/7287)
* **notificationspanel:** use appropriate heading levels ([#7288](https://github.com/carbon-design-system/ibm-products/issues/7288)) ([9517ef7](https://github.com/carbon-design-system/ibm-products/commit/9517ef7dfc1458513aa77ac32983a05091cc0cc6)), closes [#7173](https://github.com/carbon-design-system/ibm-products/issues/7173)
* **OptionsTile:** change type of title prop ([#7408](https://github.com/carbon-design-system/ibm-products/issues/7408)) ([742d5ce](https://github.com/carbon-design-system/ibm-products/commit/742d5cebea0e44c568746b67754a63c2d9a84a8e))
* **optionstile:** section needs to wrap around children ([#7368](https://github.com/carbon-design-system/ibm-products/issues/7368)) ([d6cc376](https://github.com/carbon-design-system/ibm-products/commit/d6cc376a656d81e66e51eb3fc74e1b7a52566885)), closes [#7162](https://github.com/carbon-design-system/ibm-products/issues/7162)
* **OptionsTile:** use correct heading levels ([#7163](https://github.com/carbon-design-system/ibm-products/issues/7163)) ([9645dc8](https://github.com/carbon-design-system/ibm-products/commit/9645dc85fc0a6581220691eaed9a5030941693a4))
* **pageheader:** add bottom border when background is present ([#7254](https://github.com/carbon-design-system/ibm-products/issues/7254)) ([932bfc8](https://github.com/carbon-design-system/ibm-products/commit/932bfc81a8de09b8e0dd84a591e6a03419dcdcf2))
* **PageHeader:** page actions without title (collapseTitle=true) ([#7447](https://github.com/carbon-design-system/ibm-products/issues/7447)) ([3bcb632](https://github.com/carbon-design-system/ibm-products/commit/3bcb63212f2c50e806fe809646f72cd0efdadda9))
* **productive card:** onkeydown  and onclick type missing ([#7187](https://github.com/carbon-design-system/ibm-products/issues/7187)) ([dc817f8](https://github.com/carbon-design-system/ibm-products/commit/dc817f819ea36c543f9fedabd6a97d560316cd0f))
* **ProductiveCard:** make children prop optional ([#7396](https://github.com/carbon-design-system/ibm-products/issues/7396)) ([2f8740e](https://github.com/carbon-design-system/ibm-products/commit/2f8740e8821a733b8008938f963d6debdf72890d))
* section and heading ([#7207](https://github.com/carbon-design-system/ibm-products/issues/7207)) ([45e26a8](https://github.com/carbon-design-system/ibm-products/commit/45e26a8017201392320679ded69a9faa9cff25ad))
* set minWidth to 50 instead of 0, prioritize column.minWidth ([#7181](https://github.com/carbon-design-system/ibm-products/issues/7181)) ([72f7e30](https://github.com/carbon-design-system/ibm-products/commit/72f7e3011928a57f5f5d722c5e495f188290caac))
* **sidepanel:** aria-label for back button ([#7267](https://github.com/carbon-design-system/ibm-products/issues/7267)) ([e7a7975](https://github.com/carbon-design-system/ibm-products/commit/e7a79758087c146aae33e043fa5a5b15c6971e8b))
* **SidePanel:** support aria-label for if title is not provided ([#7245](https://github.com/carbon-design-system/ibm-products/issues/7245)) ([528bc9e](https://github.com/carbon-design-system/ibm-products/commit/528bc9ec4ad5d5a0db1317f5421520f10987a178))
* **sidepanel:** use section and heading and aside ([#7283](https://github.com/carbon-design-system/ibm-products/issues/7283)) ([415c903](https://github.com/carbon-design-system/ibm-products/commit/415c903955e6f5cf4d6867a843cf38217eae7641)), closes [#7274](https://github.com/carbon-design-system/ibm-products/issues/7274) [#6314](https://github.com/carbon-design-system/ibm-products/issues/6314)
* **Storybook:** update documentation links ([#6989](https://github.com/carbon-design-system/ibm-products/issues/6989)) ([50f65d9](https://github.com/carbon-design-system/ibm-products/commit/50f65d9d610940ac1bcc253fa7ec94504259ffc6))
* **TagSet:** return focus to the overflow button ([#7449](https://github.com/carbon-design-system/ibm-products/issues/7449)) ([716f5a2](https://github.com/carbon-design-system/ibm-products/commit/716f5a2557d40f7b8bd571c7895b22f977f3e829))
* **Tearsheet:** add missing type to TearsheetAction ([#7392](https://github.com/carbon-design-system/ibm-products/issues/7392)) ([a7825ea](https://github.com/carbon-design-system/ibm-products/commit/a7825ea694ef0d07b6ddede54df73870afad3d1f))
* **tearsheet:** fix heading levels of content ([#7165](https://github.com/carbon-design-system/ibm-products/issues/7165)) ([246e6b2](https://github.com/carbon-design-system/ibm-products/commit/246e6b2d27a3c81728dbbcdef8f75a8e3778aead)), closes [#7164](https://github.com/carbon-design-system/ibm-products/issues/7164)
* **Tearsheet:** include children in props to remove ts error ([#7246](https://github.com/carbon-design-system/ibm-products/issues/7246)) ([58ea753](https://github.com/carbon-design-system/ibm-products/commit/58ea753d273955a03c06d56587daf8130d80c069))
* **use-resize-observer:** adds optional chain ([#7351](https://github.com/carbon-design-system/ibm-products/issues/7351)) ([dd77e1f](https://github.com/carbon-design-system/ibm-products/commit/dd77e1f10565a0ddd3d783e7af87ca6978ee2d75))
* **useFocus:** resolve focus missing in state change ([#7063](https://github.com/carbon-design-system/ibm-products/issues/7063)) ([6a17a20](https://github.com/carbon-design-system/ibm-products/commit/6a17a20721daa5124ea2df6d408b231413fec007))


### Features

* add storybook (react and wc) amplitude instrumentation ([#7494](https://github.com/carbon-design-system/ibm-products/issues/7494)) ([8ec3386](https://github.com/carbon-design-system/ibm-products/commit/8ec3386c3e9f0524b1a3ba442f7fb66172a7f3b4))
* add support for translateWithId to pass in to progress step ([#7148](https://github.com/carbon-design-system/ibm-products/issues/7148)) ([c947641](https://github.com/carbon-design-system/ibm-products/commit/c947641fd80a71d83de18b79c50c8f6c2761f2c0))
* composable interstitial screen implementation ([#7229](https://github.com/carbon-design-system/ibm-products/issues/7229)) ([5f350de](https://github.com/carbon-design-system/ibm-products/commit/5f350de805b02cd6e38270ee5261702af47524b5))
* **conditionBuilder:** add pre add callback before adding ([#7316](https://github.com/carbon-design-system/ibm-products/issues/7316)) ([42af630](https://github.com/carbon-design-system/ibm-products/commit/42af6304271bc2a8fdba93d14aa9f4ea45020b4c))
* **create-full-page:** can prevent modal from closing after submitting ([#7279](https://github.com/carbon-design-system/ibm-products/issues/7279)) ([0cabecd](https://github.com/carbon-design-system/ibm-products/commit/0cabecd6ba1d00fdad1590f118c8dd70694be9d3))
* **create-full-page:** null as a viable step ([#7299](https://github.com/carbon-design-system/ibm-products/issues/7299)) ([16b5d32](https://github.com/carbon-design-system/ibm-products/commit/16b5d3248a28aeebf2e5297ba1ade8d679c71f63))
* **emptystate:** automatically use right heading level ([#7463](https://github.com/carbon-design-system/ibm-products/issues/7463)) ([4a565bb](https://github.com/carbon-design-system/ibm-products/commit/4a565bbc085e31faaacb191293962d6fdd556434)), closes [#7459](https://github.com/carbon-design-system/ibm-products/issues/7459)
* ExpressiveCard should have the ability to open a link in a new window ([#7295](https://github.com/carbon-design-system/ibm-products/issues/7295)) ([c7cc5f1](https://github.com/carbon-design-system/ibm-products/commit/c7cc5f1cff52c8ae53688395c441f83e34a80819))
* **importModal:** importModal as a pattern ([#7363](https://github.com/carbon-design-system/ibm-products/issues/7363)) ([c41f2c6](https://github.com/carbon-design-system/ibm-products/commit/c41f2c699ea2501c76209f7fc16cc808c7780f85))
* **open in stackblitz:** Options Tile, Saving and Full page error ([#7256](https://github.com/carbon-design-system/ibm-products/issues/7256)) ([538097b](https://github.com/carbon-design-system/ibm-products/commit/538097b7f9ddec49470df3f89cf5b7a90c2da6e1))
* **options-tile:** allow props.tile to be a react node if it doesn't contain interactive children ([#7380](https://github.com/carbon-design-system/ibm-products/issues/7380)) ([ffbdbc4](https://github.com/carbon-design-system/ibm-products/commit/ffbdbc4c79b6549028bac4454edc3763b2ebca42))
* **stories:** open in stackblitz ([#7147](https://github.com/carbon-design-system/ibm-products/issues/7147)) ([879560e](https://github.com/carbon-design-system/ibm-products/commit/879560e5ae4391e2d2ebb235d7e7931bdd9d2c2d))
* string formatter height overflow, re-use in tearsheet ([#7345](https://github.com/carbon-design-system/ibm-products/issues/7345)) ([259cb8b](https://github.com/carbon-design-system/ibm-products/commit/259cb8be8147bc2e3c1e1bd2186c0db81e00f05b))





# [2.66.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.66.0-rc.0...@carbon/ibm-products@2.66.0) (2025-05-14)

**Note:** Version bump only for package @carbon/ibm-products





# [2.66.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.62.0-rc.0...@carbon/ibm-products@2.66.0-rc.0) (2025-05-05)


### Bug Fixes

* **card:** use appropriate heading level ([#7284](https://github.com/carbon-design-system/ibm-products/issues/7284)) ([e175627](https://github.com/carbon-design-system/ibm-products/commit/e17562720d29c148b9d496a3ef7f0da21baeede5)), closes [#7168](https://github.com/carbon-design-system/ibm-products/issues/7168)
* **checklist:** use appropriate heading levels ([#7286](https://github.com/carbon-design-system/ibm-products/issues/7286)) ([873454c](https://github.com/carbon-design-system/ibm-products/commit/873454cb9d5e8a8c876406dc3895687b1d7d4bdd)), closes [#7168](https://github.com/carbon-design-system/ibm-products/issues/7168)
* **coachmark:** media/button padding and navLinkLabel as tooltip ([#7213](https://github.com/carbon-design-system/ibm-products/issues/7213)) ([9b2346c](https://github.com/carbon-design-system/ibm-products/commit/9b2346c9ffc385af60353a7d7285a111b1184617))
* **ConditionBuilder:** allow user to pass custom dateformat ([#7135](https://github.com/carbon-design-system/ibm-products/issues/7135)) ([5c1fe20](https://github.com/carbon-design-system/ibm-products/commit/5c1fe201ce38c268022b0464533e7eceb45bbc05))
* **Conditionbuilder:** popovers do not close when clicked somewhere else when inside a tearsheet ([#7150](https://github.com/carbon-design-system/ibm-products/issues/7150)) ([49c4826](https://github.com/carbon-design-system/ibm-products/commit/49c4826758b08fdae32373b442120dd75b631d4e))
* correct tooltip for custom operator ([#7113](https://github.com/carbon-design-system/ibm-products/issues/7113)) ([cca6e1f](https://github.com/carbon-design-system/ibm-products/commit/cca6e1f27d23ea987ee085d29976084e82e2637a))
* **CreateFullPage:** fix build issue in next js app ([#7244](https://github.com/carbon-design-system/ibm-products/issues/7244)) ([a032766](https://github.com/carbon-design-system/ibm-products/commit/a032766afa265b9143450cdf371b19bccfed7146))
* **CreateFullPage:** use correct heading levels ([#7166](https://github.com/carbon-design-system/ibm-products/issues/7166)) ([503dbb5](https://github.com/carbon-design-system/ibm-products/commit/503dbb5fc4865d703aaa1ef94ce155e78b6957d7)), closes [#6816](https://github.com/carbon-design-system/ibm-products/issues/6816) [#6815](https://github.com/carbon-design-system/ibm-products/issues/6815)
* **CreateTearsheet:** added code fix and test ([#7431](https://github.com/carbon-design-system/ibm-products/issues/7431)) ([dc1c0fb](https://github.com/carbon-design-system/ibm-products/commit/dc1c0fb0266bce3d61e375a39b9f82c79fe98b03))
* **custom typings:** include section ([#7161](https://github.com/carbon-design-system/ibm-products/issues/7161)) ([892dc11](https://github.com/carbon-design-system/ibm-products/commit/892dc1146db2bac23fa69d03b12df5b2fd7e4382)), closes [#4336](https://github.com/carbon-design-system/ibm-products/issues/4336) [#4225](https://github.com/carbon-design-system/ibm-products/issues/4225)
* **customizeColumns:** update column ids for accessibility ([#7221](https://github.com/carbon-design-system/ibm-products/issues/7221)) ([ed0d5df](https://github.com/carbon-design-system/ibm-products/commit/ed0d5df8315d84f662363ba5c7357d5bd5888a8b))
* **Datagrid:** move `aria-sort` to Datagrid `th` element ([#7206](https://github.com/carbon-design-system/ibm-products/issues/7206)) ([f4af549](https://github.com/carbon-design-system/ibm-products/commit/f4af549e64558606cc89ae0390294be3e0d678d0))
* **notification:** panel focus out issue ([#7344](https://github.com/carbon-design-system/ibm-products/issues/7344)) ([a22ca69](https://github.com/carbon-design-system/ibm-products/commit/a22ca69fc2ad52c7ee9d393b0a4beb4de929aa88))
* **notificationspanel:** fix hardcoded aria-label ([#7312](https://github.com/carbon-design-system/ibm-products/issues/7312)) ([29c2865](https://github.com/carbon-design-system/ibm-products/commit/29c286567d350a0edec78a481a81aa4996ff5d3f)), closes [#7287](https://github.com/carbon-design-system/ibm-products/issues/7287) [#7287](https://github.com/carbon-design-system/ibm-products/issues/7287)
* **notificationspanel:** use appropriate heading levels ([#7288](https://github.com/carbon-design-system/ibm-products/issues/7288)) ([9517ef7](https://github.com/carbon-design-system/ibm-products/commit/9517ef7dfc1458513aa77ac32983a05091cc0cc6)), closes [#7173](https://github.com/carbon-design-system/ibm-products/issues/7173)
* **optionstile:** section needs to wrap around children ([#7368](https://github.com/carbon-design-system/ibm-products/issues/7368)) ([d6cc376](https://github.com/carbon-design-system/ibm-products/commit/d6cc376a656d81e66e51eb3fc74e1b7a52566885)), closes [#7162](https://github.com/carbon-design-system/ibm-products/issues/7162)
* **OptionsTile:** use correct heading levels ([#7163](https://github.com/carbon-design-system/ibm-products/issues/7163)) ([9645dc8](https://github.com/carbon-design-system/ibm-products/commit/9645dc85fc0a6581220691eaed9a5030941693a4))
* **pageheader:** add bottom border when background is present ([#7254](https://github.com/carbon-design-system/ibm-products/issues/7254)) ([932bfc8](https://github.com/carbon-design-system/ibm-products/commit/932bfc81a8de09b8e0dd84a591e6a03419dcdcf2))
* **productive card:** onkeydown  and onclick type missing ([#7187](https://github.com/carbon-design-system/ibm-products/issues/7187)) ([dc817f8](https://github.com/carbon-design-system/ibm-products/commit/dc817f819ea36c543f9fedabd6a97d560316cd0f))
* **ProductiveCard:** make children prop optional ([#7396](https://github.com/carbon-design-system/ibm-products/issues/7396)) ([2f8740e](https://github.com/carbon-design-system/ibm-products/commit/2f8740e8821a733b8008938f963d6debdf72890d))
* section and heading ([#7207](https://github.com/carbon-design-system/ibm-products/issues/7207)) ([45e26a8](https://github.com/carbon-design-system/ibm-products/commit/45e26a8017201392320679ded69a9faa9cff25ad))
* set minWidth to 50 instead of 0, prioritize column.minWidth ([#7181](https://github.com/carbon-design-system/ibm-products/issues/7181)) ([72f7e30](https://github.com/carbon-design-system/ibm-products/commit/72f7e3011928a57f5f5d722c5e495f188290caac))
* **sidepanel:** aria-label for back button ([#7267](https://github.com/carbon-design-system/ibm-products/issues/7267)) ([e7a7975](https://github.com/carbon-design-system/ibm-products/commit/e7a79758087c146aae33e043fa5a5b15c6971e8b))
* **SidePanel:** support aria-label for if title is not provided ([#7245](https://github.com/carbon-design-system/ibm-products/issues/7245)) ([528bc9e](https://github.com/carbon-design-system/ibm-products/commit/528bc9ec4ad5d5a0db1317f5421520f10987a178))
* **sidepanel:** use section and heading and aside ([#7283](https://github.com/carbon-design-system/ibm-products/issues/7283)) ([415c903](https://github.com/carbon-design-system/ibm-products/commit/415c903955e6f5cf4d6867a843cf38217eae7641)), closes [#7274](https://github.com/carbon-design-system/ibm-products/issues/7274) [#6314](https://github.com/carbon-design-system/ibm-products/issues/6314)
* **Storybook:** update documentation links ([#6989](https://github.com/carbon-design-system/ibm-products/issues/6989)) ([50f65d9](https://github.com/carbon-design-system/ibm-products/commit/50f65d9d610940ac1bcc253fa7ec94504259ffc6))
* **tearsheet:** fix heading levels of content ([#7165](https://github.com/carbon-design-system/ibm-products/issues/7165)) ([246e6b2](https://github.com/carbon-design-system/ibm-products/commit/246e6b2d27a3c81728dbbcdef8f75a8e3778aead)), closes [#7164](https://github.com/carbon-design-system/ibm-products/issues/7164)
* **Tearsheet:** include children in props to remove ts error ([#7246](https://github.com/carbon-design-system/ibm-products/issues/7246)) ([58ea753](https://github.com/carbon-design-system/ibm-products/commit/58ea753d273955a03c06d56587daf8130d80c069))
* **use-resize-observer:** adds optional chain ([#7351](https://github.com/carbon-design-system/ibm-products/issues/7351)) ([dd77e1f](https://github.com/carbon-design-system/ibm-products/commit/dd77e1f10565a0ddd3d783e7af87ca6978ee2d75))
* **useFocus:** resolve focus missing in state change ([#7063](https://github.com/carbon-design-system/ibm-products/issues/7063)) ([6a17a20](https://github.com/carbon-design-system/ibm-products/commit/6a17a20721daa5124ea2df6d408b231413fec007))


### Features

* add support for translateWithId to pass in to progress step ([#7148](https://github.com/carbon-design-system/ibm-products/issues/7148)) ([c947641](https://github.com/carbon-design-system/ibm-products/commit/c947641fd80a71d83de18b79c50c8f6c2761f2c0))
* composable interstitial screen implementation ([#7229](https://github.com/carbon-design-system/ibm-products/issues/7229)) ([5f350de](https://github.com/carbon-design-system/ibm-products/commit/5f350de805b02cd6e38270ee5261702af47524b5))
* **conditionBuilder:** add pre add callback before adding ([#7316](https://github.com/carbon-design-system/ibm-products/issues/7316)) ([42af630](https://github.com/carbon-design-system/ibm-products/commit/42af6304271bc2a8fdba93d14aa9f4ea45020b4c))
* **create-full-page:** can prevent modal from closing after submitting ([#7279](https://github.com/carbon-design-system/ibm-products/issues/7279)) ([0cabecd](https://github.com/carbon-design-system/ibm-products/commit/0cabecd6ba1d00fdad1590f118c8dd70694be9d3))
* **create-full-page:** null as a viable step ([#7299](https://github.com/carbon-design-system/ibm-products/issues/7299)) ([16b5d32](https://github.com/carbon-design-system/ibm-products/commit/16b5d3248a28aeebf2e5297ba1ade8d679c71f63))
* ExpressiveCard should have the ability to open a link in a new window ([#7295](https://github.com/carbon-design-system/ibm-products/issues/7295)) ([c7cc5f1](https://github.com/carbon-design-system/ibm-products/commit/c7cc5f1cff52c8ae53688395c441f83e34a80819))
* **open in stackblitz:** Options Tile, Saving and Full page error ([#7256](https://github.com/carbon-design-system/ibm-products/issues/7256)) ([538097b](https://github.com/carbon-design-system/ibm-products/commit/538097b7f9ddec49470df3f89cf5b7a90c2da6e1))
* **stories:** open in stackblitz ([#7147](https://github.com/carbon-design-system/ibm-products/issues/7147)) ([879560e](https://github.com/carbon-design-system/ibm-products/commit/879560e5ae4391e2d2ebb235d7e7931bdd9d2c2d))
* string formatter height overflow, re-use in tearsheet ([#7345](https://github.com/carbon-design-system/ibm-products/issues/7345)) ([259cb8b](https://github.com/carbon-design-system/ibm-products/commit/259cb8be8147bc2e3c1e1bd2186c0db81e00f05b))





# [2.65.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.65.0-rc.0...@carbon/ibm-products@2.65.0) (2025-04-30)

**Note:** Version bump only for package @carbon/ibm-products





# [2.65.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.62.0-rc.0...@carbon/ibm-products@2.65.0-rc.0) (2025-04-21)


### Bug Fixes

* **checklist:** use appropriate heading levels ([#7286](https://github.com/carbon-design-system/ibm-products/issues/7286)) ([873454c](https://github.com/carbon-design-system/ibm-products/commit/873454cb9d5e8a8c876406dc3895687b1d7d4bdd)), closes [#7168](https://github.com/carbon-design-system/ibm-products/issues/7168)
* **coachmark:** media/button padding and navLinkLabel as tooltip ([#7213](https://github.com/carbon-design-system/ibm-products/issues/7213)) ([9b2346c](https://github.com/carbon-design-system/ibm-products/commit/9b2346c9ffc385af60353a7d7285a111b1184617))
* **ConditionBuilder:** allow user to pass custom dateformat ([#7135](https://github.com/carbon-design-system/ibm-products/issues/7135)) ([5c1fe20](https://github.com/carbon-design-system/ibm-products/commit/5c1fe201ce38c268022b0464533e7eceb45bbc05))
* **Conditionbuilder:** popovers do not close when clicked somewhere else when inside a tearsheet ([#7150](https://github.com/carbon-design-system/ibm-products/issues/7150)) ([49c4826](https://github.com/carbon-design-system/ibm-products/commit/49c4826758b08fdae32373b442120dd75b631d4e))
* correct tooltip for custom operator ([#7113](https://github.com/carbon-design-system/ibm-products/issues/7113)) ([cca6e1f](https://github.com/carbon-design-system/ibm-products/commit/cca6e1f27d23ea987ee085d29976084e82e2637a))
* **CreateFullPage:** fix build issue in next js app ([#7244](https://github.com/carbon-design-system/ibm-products/issues/7244)) ([a032766](https://github.com/carbon-design-system/ibm-products/commit/a032766afa265b9143450cdf371b19bccfed7146))
* **CreateFullPage:** use correct heading levels ([#7166](https://github.com/carbon-design-system/ibm-products/issues/7166)) ([503dbb5](https://github.com/carbon-design-system/ibm-products/commit/503dbb5fc4865d703aaa1ef94ce155e78b6957d7)), closes [#6816](https://github.com/carbon-design-system/ibm-products/issues/6816) [#6815](https://github.com/carbon-design-system/ibm-products/issues/6815)
* **custom typings:** include section ([#7161](https://github.com/carbon-design-system/ibm-products/issues/7161)) ([892dc11](https://github.com/carbon-design-system/ibm-products/commit/892dc1146db2bac23fa69d03b12df5b2fd7e4382)), closes [#4336](https://github.com/carbon-design-system/ibm-products/issues/4336) [#4225](https://github.com/carbon-design-system/ibm-products/issues/4225)
* **customizeColumns:** update column ids for accessibility ([#7221](https://github.com/carbon-design-system/ibm-products/issues/7221)) ([ed0d5df](https://github.com/carbon-design-system/ibm-products/commit/ed0d5df8315d84f662363ba5c7357d5bd5888a8b))
* **notificationspanel:** fix hardcoded aria-label ([#7312](https://github.com/carbon-design-system/ibm-products/issues/7312)) ([29c2865](https://github.com/carbon-design-system/ibm-products/commit/29c286567d350a0edec78a481a81aa4996ff5d3f)), closes [#7287](https://github.com/carbon-design-system/ibm-products/issues/7287) [#7287](https://github.com/carbon-design-system/ibm-products/issues/7287)
* **notificationspanel:** use appropriate heading levels ([#7288](https://github.com/carbon-design-system/ibm-products/issues/7288)) ([9517ef7](https://github.com/carbon-design-system/ibm-products/commit/9517ef7dfc1458513aa77ac32983a05091cc0cc6)), closes [#7173](https://github.com/carbon-design-system/ibm-products/issues/7173)
* **OptionsTile:** use correct heading levels ([#7163](https://github.com/carbon-design-system/ibm-products/issues/7163)) ([9645dc8](https://github.com/carbon-design-system/ibm-products/commit/9645dc85fc0a6581220691eaed9a5030941693a4))
* **pageheader:** add bottom border when background is present ([#7254](https://github.com/carbon-design-system/ibm-products/issues/7254)) ([932bfc8](https://github.com/carbon-design-system/ibm-products/commit/932bfc81a8de09b8e0dd84a591e6a03419dcdcf2))
* **productive card:** onkeydown  and onclick type missing ([#7187](https://github.com/carbon-design-system/ibm-products/issues/7187)) ([dc817f8](https://github.com/carbon-design-system/ibm-products/commit/dc817f819ea36c543f9fedabd6a97d560316cd0f))
* section and heading ([#7207](https://github.com/carbon-design-system/ibm-products/issues/7207)) ([45e26a8](https://github.com/carbon-design-system/ibm-products/commit/45e26a8017201392320679ded69a9faa9cff25ad))
* set minWidth to 50 instead of 0, prioritize column.minWidth ([#7181](https://github.com/carbon-design-system/ibm-products/issues/7181)) ([72f7e30](https://github.com/carbon-design-system/ibm-products/commit/72f7e3011928a57f5f5d722c5e495f188290caac))
* **sidepanel:** aria-label for back button ([#7267](https://github.com/carbon-design-system/ibm-products/issues/7267)) ([e7a7975](https://github.com/carbon-design-system/ibm-products/commit/e7a79758087c146aae33e043fa5a5b15c6971e8b))
* **SidePanel:** support aria-label for if title is not provided ([#7245](https://github.com/carbon-design-system/ibm-products/issues/7245)) ([528bc9e](https://github.com/carbon-design-system/ibm-products/commit/528bc9ec4ad5d5a0db1317f5421520f10987a178))
* **Storybook:** update documentation links ([#6989](https://github.com/carbon-design-system/ibm-products/issues/6989)) ([50f65d9](https://github.com/carbon-design-system/ibm-products/commit/50f65d9d610940ac1bcc253fa7ec94504259ffc6))
* **tearsheet:** fix heading levels of content ([#7165](https://github.com/carbon-design-system/ibm-products/issues/7165)) ([246e6b2](https://github.com/carbon-design-system/ibm-products/commit/246e6b2d27a3c81728dbbcdef8f75a8e3778aead)), closes [#7164](https://github.com/carbon-design-system/ibm-products/issues/7164)
* **Tearsheet:** include children in props to remove ts error ([#7246](https://github.com/carbon-design-system/ibm-products/issues/7246)) ([58ea753](https://github.com/carbon-design-system/ibm-products/commit/58ea753d273955a03c06d56587daf8130d80c069))
* **useFocus:** resolve focus missing in state change ([#7063](https://github.com/carbon-design-system/ibm-products/issues/7063)) ([6a17a20](https://github.com/carbon-design-system/ibm-products/commit/6a17a20721daa5124ea2df6d408b231413fec007))


### Features

* add support for translateWithId to pass in to progress step ([#7148](https://github.com/carbon-design-system/ibm-products/issues/7148)) ([c947641](https://github.com/carbon-design-system/ibm-products/commit/c947641fd80a71d83de18b79c50c8f6c2761f2c0))
* composable interstitial screen implementation ([#7229](https://github.com/carbon-design-system/ibm-products/issues/7229)) ([5f350de](https://github.com/carbon-design-system/ibm-products/commit/5f350de805b02cd6e38270ee5261702af47524b5))
* **create-full-page:** null as a viable step ([#7299](https://github.com/carbon-design-system/ibm-products/issues/7299)) ([16b5d32](https://github.com/carbon-design-system/ibm-products/commit/16b5d3248a28aeebf2e5297ba1ade8d679c71f63))
* **stories:** open in stackblitz ([#7147](https://github.com/carbon-design-system/ibm-products/issues/7147)) ([879560e](https://github.com/carbon-design-system/ibm-products/commit/879560e5ae4391e2d2ebb235d7e7931bdd9d2c2d))





# [2.64.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.64.0-rc.0...@carbon/ibm-products@2.64.0) (2025-04-17)

**Note:** Version bump only for package @carbon/ibm-products





# [2.64.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.62.0-rc.0...@carbon/ibm-products@2.64.0-rc.0) (2025-04-07)


### Bug Fixes

* **ConditionBuilder:** allow user to pass custom dateformat ([#7135](https://github.com/carbon-design-system/ibm-products/issues/7135)) ([5c1fe20](https://github.com/carbon-design-system/ibm-products/commit/5c1fe201ce38c268022b0464533e7eceb45bbc05))
* **Conditionbuilder:** popovers do not close when clicked somewhere else when inside a tearsheet ([#7150](https://github.com/carbon-design-system/ibm-products/issues/7150)) ([49c4826](https://github.com/carbon-design-system/ibm-products/commit/49c4826758b08fdae32373b442120dd75b631d4e))
* correct tooltip for custom operator ([#7113](https://github.com/carbon-design-system/ibm-products/issues/7113)) ([cca6e1f](https://github.com/carbon-design-system/ibm-products/commit/cca6e1f27d23ea987ee085d29976084e82e2637a))
* **CreateFullPage:** use correct heading levels ([#7166](https://github.com/carbon-design-system/ibm-products/issues/7166)) ([503dbb5](https://github.com/carbon-design-system/ibm-products/commit/503dbb5fc4865d703aaa1ef94ce155e78b6957d7)), closes [#6816](https://github.com/carbon-design-system/ibm-products/issues/6816) [#6815](https://github.com/carbon-design-system/ibm-products/issues/6815)
* **custom typings:** include section ([#7161](https://github.com/carbon-design-system/ibm-products/issues/7161)) ([892dc11](https://github.com/carbon-design-system/ibm-products/commit/892dc1146db2bac23fa69d03b12df5b2fd7e4382)), closes [#4336](https://github.com/carbon-design-system/ibm-products/issues/4336) [#4225](https://github.com/carbon-design-system/ibm-products/issues/4225)
* **OptionsTile:** use correct heading levels ([#7163](https://github.com/carbon-design-system/ibm-products/issues/7163)) ([9645dc8](https://github.com/carbon-design-system/ibm-products/commit/9645dc85fc0a6581220691eaed9a5030941693a4))
* **productive card:** onkeydown  and onclick type missing ([#7187](https://github.com/carbon-design-system/ibm-products/issues/7187)) ([dc817f8](https://github.com/carbon-design-system/ibm-products/commit/dc817f819ea36c543f9fedabd6a97d560316cd0f))
* set minWidth to 50 instead of 0, prioritize column.minWidth ([#7181](https://github.com/carbon-design-system/ibm-products/issues/7181)) ([72f7e30](https://github.com/carbon-design-system/ibm-products/commit/72f7e3011928a57f5f5d722c5e495f188290caac))
* **Storybook:** update documentation links ([#6989](https://github.com/carbon-design-system/ibm-products/issues/6989)) ([50f65d9](https://github.com/carbon-design-system/ibm-products/commit/50f65d9d610940ac1bcc253fa7ec94504259ffc6))
* **tearsheet:** fix heading levels of content ([#7165](https://github.com/carbon-design-system/ibm-products/issues/7165)) ([246e6b2](https://github.com/carbon-design-system/ibm-products/commit/246e6b2d27a3c81728dbbcdef8f75a8e3778aead)), closes [#7164](https://github.com/carbon-design-system/ibm-products/issues/7164)
* **useFocus:** resolve focus missing in state change ([#7063](https://github.com/carbon-design-system/ibm-products/issues/7063)) ([6a17a20](https://github.com/carbon-design-system/ibm-products/commit/6a17a20721daa5124ea2df6d408b231413fec007))


### Features

* add support for translateWithId to pass in to progress step ([#7148](https://github.com/carbon-design-system/ibm-products/issues/7148)) ([c947641](https://github.com/carbon-design-system/ibm-products/commit/c947641fd80a71d83de18b79c50c8f6c2761f2c0))
* **stories:** open in stackblitz ([#7147](https://github.com/carbon-design-system/ibm-products/issues/7147)) ([879560e](https://github.com/carbon-design-system/ibm-products/commit/879560e5ae4391e2d2ebb235d7e7931bdd9d2c2d))





# [2.63.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.63.0-rc.0...@carbon/ibm-products@2.63.0) (2025-04-02)

**Note:** Version bump only for package @carbon/ibm-products





# [2.63.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.62.0-rc.0...@carbon/ibm-products@2.63.0-rc.0) (2025-03-24)


### Bug Fixes

* correct tooltip for custom operator ([#7113](https://github.com/carbon-design-system/ibm-products/issues/7113)) ([cca6e1f](https://github.com/carbon-design-system/ibm-products/commit/cca6e1f27d23ea987ee085d29976084e82e2637a))
* **Storybook:** update documentation links ([#6989](https://github.com/carbon-design-system/ibm-products/issues/6989)) ([50f65d9](https://github.com/carbon-design-system/ibm-products/commit/50f65d9d610940ac1bcc253fa7ec94504259ffc6))





# [2.62.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.62.0-rc.0...@carbon/ibm-products@2.62.0) (2025-03-19)

**Note:** Version bump only for package @carbon/ibm-products





# [2.62.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.54.0-rc.0...@carbon/ibm-products@2.62.0-rc.0) (2025-03-10)


### Bug Fixes

* **APIKeyModal:** implement focus return to generate button ([#6440](https://github.com/carbon-design-system/ibm-products/issues/6440)) ([535e871](https://github.com/carbon-design-system/ibm-products/commit/535e87142413695c530952f7b314201c8a35becc))
* **APIKeyModal:** implement useFocus hook ([#6290](https://github.com/carbon-design-system/ibm-products/issues/6290)) ([4a92770](https://github.com/carbon-design-system/ibm-products/commit/4a92770d9179f6b59bfe18e53c998fdb51bd794a))
* **APIKeyModal:** improve screen reader announcement ([#6481](https://github.com/carbon-design-system/ibm-products/issues/6481)) ([bea9003](https://github.com/carbon-design-system/ibm-products/commit/bea9003e1c1dcf2f1c19ecaccd6a4096bc313d8d))
* **BigNumbers:** Convert to TypeScript ([#6734](https://github.com/carbon-design-system/ibm-products/issues/6734)) ([2ac32d0](https://github.com/carbon-design-system/ibm-products/commit/2ac32d096b6bc01df000e1c534e61a574fd55e2a))
* condition builder style issues ([#6724](https://github.com/carbon-design-system/ibm-products/issues/6724)) ([37dba95](https://github.com/carbon-design-system/ibm-products/commit/37dba95fffdfce26cd5505d0451a33d82f4cb0e3))
* **Condition Builder:** accessibility violations part 1 ([#6896](https://github.com/carbon-design-system/ibm-products/issues/6896)) ([e93fa2d](https://github.com/carbon-design-system/ibm-products/commit/e93fa2d00645b1c09b696694fac57cc2e10107ab))
* **Condition builder:** correct  and add more storybook data ([#6545](https://github.com/carbon-design-system/ibm-products/issues/6545)) ([8301cc1](https://github.com/carbon-design-system/ibm-products/commit/8301cc11def0e87cc9a1d8112066e06a00947a1a))
* **Condition builder:** initial state getting reset on re-rendering ([#6555](https://github.com/carbon-design-system/ibm-products/issues/6555)) ([ea0989a](https://github.com/carbon-design-system/ibm-products/commit/ea0989ae23b6a23450491c4994bf4e46687dbeb2))
* **conditionBuilder:** issue fix and data correction ([#6421](https://github.com/carbon-design-system/ibm-products/issues/6421)) ([1f5b63e](https://github.com/carbon-design-system/ibm-products/commit/1f5b63ec428ddd2a2b2ee7c4153c83c2fff6a61c))
* **CreateTearsheet:** Dynamically disable/hide the experimentalSecondarySubmit button in CreateTearsheet ([#6412](https://github.com/carbon-design-system/ibm-products/issues/6412)) ([2eab4db](https://github.com/carbon-design-system/ibm-products/commit/2eab4db31164aed9f84c003466fce0bc74467ce3))
* datagrid select all behavior in virtual scroll ([#6546](https://github.com/carbon-design-system/ibm-products/issues/6546)) ([b80d7f0](https://github.com/carbon-design-system/ibm-products/commit/b80d7f03a79a1802279e6142432a52fdb36a966a))
* **Datagrid:** onRowClick results in toggleRow.toggleRowSelected is not a function error in console ([#6633](https://github.com/carbon-design-system/ibm-products/issues/6633)) ([82ce15c](https://github.com/carbon-design-system/ibm-products/commit/82ce15c9b96b5d80f6f566084f177e47a56054f7))
* **Emptystate:** accessibility violation ([#6605](https://github.com/carbon-design-system/ibm-products/issues/6605)) ([cc8f1aa](https://github.com/carbon-design-system/ibm-products/commit/cc8f1aa66a80346104f28b173a4228a012fe0643))
* **EmptyState:** empty states throws hydration errors in next js due to dynamic id ([#6508](https://github.com/carbon-design-system/ibm-products/issues/6508)) ([d5767e8](https://github.com/carbon-design-system/ibm-products/commit/d5767e8e9e5bc078d7324fbda71268a4d42d0bee))
* **FullPageError:** accessibility violations ([#6503](https://github.com/carbon-design-system/ibm-products/issues/6503)) ([3f45528](https://github.com/carbon-design-system/ibm-products/commit/3f45528cd037c0232c2699c18d8bf63a5da8891b))
* glitches on open ([#6873](https://github.com/carbon-design-system/ibm-products/issues/6873)) ([dd74e33](https://github.com/carbon-design-system/ibm-products/commit/dd74e337cd3670201bab669035a77e026c54103d))
* handle step change on carousal scroll ([#6676](https://github.com/carbon-design-system/ibm-products/issues/6676)) ([d3a40e7](https://github.com/carbon-design-system/ibm-products/commit/d3a40e73c0993b4e9ce35eab75aa8dfc00e80f0c))
* **notifications-panel, page-header:** remove dynamic time/dates so that percy builds are not failed ([#6828](https://github.com/carbon-design-system/ibm-products/issues/6828)) ([9187e94](https://github.com/carbon-design-system/ibm-products/commit/9187e944fd2ba5e73a79fb503429511c4cc854b1))
* **NotificationsPanel:** implemented usePresence hook ([#7028](https://github.com/carbon-design-system/ibm-products/issues/7028)) ([0fbdf56](https://github.com/carbon-design-system/ibm-products/commit/0fbdf5661bd064b4867031b6c963320f0d097a4a))
* **NotificationsPanel:** new date-time formatting function ([#6904](https://github.com/carbon-design-system/ibm-products/issues/6904)) ([3e6072f](https://github.com/carbon-design-system/ibm-products/commit/3e6072fe7fcf8bcdc094078dfaa05169379bc9d7))
* **NotificationsPanel:** remove focus trap ([#6829](https://github.com/carbon-design-system/ibm-products/issues/6829)) ([ccd0926](https://github.com/carbon-design-system/ibm-products/commit/ccd09268b98f9e1ced078086f00f00a58faf99c4))
* **NotificationsPanel:** remove hard-coded dark theme ([#6862](https://github.com/carbon-design-system/ibm-products/issues/6862)) ([64d9b48](https://github.com/carbon-design-system/ibm-products/commit/64d9b48a8db748ba21835baa14fe047fd8aaf264))
* onclose callback triggered twice ([#6582](https://github.com/carbon-design-system/ibm-products/issues/6582)) ([8361907](https://github.com/carbon-design-system/ibm-products/commit/83619075773be394ffb9b46fe06dde16defba498))
* optionstile tests and UseControllable State update ([#6920](https://github.com/carbon-design-system/ibm-products/issues/6920)) ([2fe47ca](https://github.com/carbon-design-system/ibm-products/commit/2fe47ca70fd94645145b66236d2e971f7f717b7b))
* pageheader subtitle truncation visibility ([#6551](https://github.com/carbon-design-system/ibm-products/issues/6551)) ([26394dd](https://github.com/carbon-design-system/ibm-products/commit/26394dd2b740f19306e8fbbbd6c2195fc5a3bbed))
* **Pageheader,Tearsheet,Notifications:** resolves CSP violations  ([#6340](https://github.com/carbon-design-system/ibm-products/issues/6340)) ([4e11b90](https://github.com/carbon-design-system/ibm-products/commit/4e11b90499030470e085d9324615b58eb3388438))
* remove tooltip from tagoverflow ([#6463](https://github.com/carbon-design-system/ibm-products/issues/6463)) ([c6f0ac0](https://github.com/carbon-design-system/ibm-products/commit/c6f0ac0f444165b55e37873c80462401fd34f14f))
* revert framer motion version ([#6861](https://github.com/carbon-design-system/ibm-products/issues/6861)) ([a9a4285](https://github.com/carbon-design-system/ibm-products/commit/a9a4285a116f537716153ecb144829bcd0062bd4))
* reverts framer-motion to v6 ([#6679](https://github.com/carbon-design-system/ibm-products/issues/6679)) ([13fbc56](https://github.com/carbon-design-system/ibm-products/commit/13fbc567bcb4bd6a688da81b13a7c704628cef9b))
* **scrollgradient, stringformatter, truncatedlist, webterminal:** csp ([#6346](https://github.com/carbon-design-system/ibm-products/issues/6346)) ([5b39280](https://github.com/carbon-design-system/ibm-products/commit/5b39280b9950dc78659466ff79f77bbfccb9421f))
* **side panel in react:** slideIn not working as expected ([#6501](https://github.com/carbon-design-system/ibm-products/issues/6501)) ([9d07dab](https://github.com/carbon-design-system/ibm-products/commit/9d07dab82cefd4046f65f8cac25d1d829f6d7c1a))
* **sidePanel:** resolve storybook doc page scroll issues ([#6664](https://github.com/carbon-design-system/ibm-products/issues/6664)) ([632d1a3](https://github.com/carbon-design-system/ibm-products/commit/632d1a37ea8035da3d9e3c9eb6f086c99ba33aca))
* **SidePanel:** resolve storybook SlideOver animation flickering in doc page ([#6554](https://github.com/carbon-design-system/ibm-products/issues/6554)) ([03c31fc](https://github.com/carbon-design-system/ibm-products/commit/03c31fc3625afadc16d6eb2ca7d91c898bf18de6))
* **tearsheet:** address portalTarget type ([#6400](https://github.com/carbon-design-system/ibm-products/issues/6400)) ([a11d036](https://github.com/carbon-design-system/ibm-products/commit/a11d0364a5beaa3d018db559656c3d7806e1b484))
* **Tearsheet:** missing launcherbuttonref declaration ([#6846](https://github.com/carbon-design-system/ibm-products/issues/6846)) ([4dcb2f5](https://github.com/carbon-design-system/ibm-products/commit/4dcb2f50b1131c7a055ebd9b825792fe6f411a38)), closes [#4751](https://github.com/carbon-design-system/ibm-products/issues/4751)
* **tearsheet:** resolve focusing elements multiple times while rendering ([#6513](https://github.com/carbon-design-system/ibm-products/issues/6513)) ([1c918d1](https://github.com/carbon-design-system/ibm-products/commit/1c918d1605f2a370988d7ade503c1e57e0d43df1))
* **Tearsheet:** undo previous "readonly" css fix ([#6975](https://github.com/carbon-design-system/ibm-products/issues/6975)) ([73a0d2f](https://github.com/carbon-design-system/ibm-products/commit/73a0d2fc7987d1a5e16ec8745bdadfa533a537d4))
* update accessibility-checker version ([#6525](https://github.com/carbon-design-system/ibm-products/issues/6525)) ([d8c7051](https://github.com/carbon-design-system/ibm-products/commit/d8c70518087e7e41fdf1aa45cbbf692389058d56))
* update to Carbon 11 compatible versions to latest ([#6437](https://github.com/carbon-design-system/ibm-products/issues/6437)) ([48d5c34](https://github.com/carbon-design-system/ibm-products/commit/48d5c34dca79a4b00fc69391a513431fa21295ee))
* **useFocus:** resolve focus trap issue ([#6835](https://github.com/carbon-design-system/ibm-products/issues/6835)) ([eedbef6](https://github.com/carbon-design-system/ibm-products/commit/eedbef6b082de542c3f1b5171fb1be3a3761ab62))
* **useravatar:** accessibility issue and add avt complex state ([#6399](https://github.com/carbon-design-system/ibm-products/issues/6399)) ([4a70821](https://github.com/carbon-design-system/ibm-products/commit/4a70821b85688730a9d4484340da2517ee079db1))


### Features

* add option to pass description to display on hover of properties ([#6718](https://github.com/carbon-design-system/ibm-products/issues/6718)) ([d043ffa](https://github.com/carbon-design-system/ibm-products/commit/d043ffaf274fff52d57d00f049977a0c84952640))
* add utils section to storybook ([#6394](https://github.com/carbon-design-system/ibm-products/issues/6394)) ([711eb72](https://github.com/carbon-design-system/ibm-products/commit/711eb72ef00d1f1935fd0fcec9e0c0383dff53dc))
* **BreadcrumbWithOverflow:** adopt overflowMenuV12 and floating ui ([#6411](https://github.com/carbon-design-system/ibm-products/issues/6411)) ([f716852](https://github.com/carbon-design-system/ibm-products/commit/f716852c979a0b9556e853fad7e7a7774b4c6579))
* **coachmark:** Add default opening for not-stacked coachmarks ([#6516](https://github.com/carbon-design-system/ibm-products/issues/6516)) ([73ee693](https://github.com/carbon-design-system/ibm-products/commit/73ee693dda68bbbc0ccc6ed802b0efe8f528950e))
* **CoachmarkOverlayElements:** Add next/back callbacks and currentStep properties ([#6548](https://github.com/carbon-design-system/ibm-products/issues/6548)) ([36bd4f9](https://github.com/carbon-design-system/ibm-products/commit/36bd4f96c4d5ab6f3fd5ef1a732e9efbf6ec5212))
* **conditionBuilder:** add option for formatting values in custom and date input type ([#6735](https://github.com/carbon-design-system/ibm-products/issues/6735)) ([9add0eb](https://github.com/carbon-design-system/ibm-products/commit/9add0eb03b19113544138ec5c1b31a75a939fd09))
* **conditionBuilder:** add support for custom operators in ConditionBuilder ([#6841](https://github.com/carbon-design-system/ibm-products/issues/6841)) ([9a603ed](https://github.com/carbon-design-system/ibm-products/commit/9a603edbbb117919d92c6cb82a2d2aa68eb3f318))
* **ConditionBuilder:** customize primary conditions using custom statement configuration ([#6663](https://github.com/carbon-design-system/ibm-products/issues/6663)) ([8eeab4c](https://github.com/carbon-design-system/ibm-products/commit/8eeab4c770f3a09585f187e8282f8c5d371d86f7))
* Decouple lottie-web dependency from our repo ([#6477](https://github.com/carbon-design-system/ibm-products/issues/6477)) ([6b0a75b](https://github.com/carbon-design-system/ibm-products/commit/6b0a75ba4d15d7b2e640b4bb6992635ec3ab770c))
* **interstitial screen:** deprecate media prop and introduce new prop renderMedia ([#6834](https://github.com/carbon-design-system/ibm-products/issues/6834)) ([c85b197](https://github.com/carbon-design-system/ibm-products/commit/c85b197a5c35313fc33f7bef2ee175b0e8451acd))
* **MultiAddSelect:** implement multi-select for modifiers ([#6917](https://github.com/carbon-design-system/ibm-products/issues/6917)) ([3128198](https://github.com/carbon-design-system/ibm-products/commit/3128198cafc21bf4701cdf122c889d5b5ec17c53))
* **productive card:** floating ui for overflow menu ([#6395](https://github.com/carbon-design-system/ibm-products/issues/6395)) ([42a1362](https://github.com/carbon-design-system/ibm-products/commit/42a1362ad2ff4998f8286ed0698a82c4ec8ea552))
* remove lottie web media prop and stepped animated media ([#7024](https://github.com/carbon-design-system/ibm-products/issues/7024)) ([7115972](https://github.com/carbon-design-system/ibm-products/commit/711597259fbecd8deb435eafd368c40abef9e6ea))
* **sidepanel:** implement decorator prop ([#6511](https://github.com/carbon-design-system/ibm-products/issues/6511)) ([336a5b0](https://github.com/carbon-design-system/ibm-products/commit/336a5b0ad06051bd52080e5d7cd610feb56604c8))
* **tearsheet:** change icondescription prop to optional ([#6662](https://github.com/carbon-design-system/ibm-products/issues/6662)) ([5ba3e04](https://github.com/carbon-design-system/ibm-products/commit/5ba3e0471ccd52be4d50bc5983eeb10562a6f8ff))





# [2.61.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.61.0-rc.0...@carbon/ibm-products@2.61.0) (2025-03-05)

**Note:** Version bump only for package @carbon/ibm-products





# [2.61.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.54.0-rc.0...@carbon/ibm-products@2.61.0-rc.0) (2025-02-24)


### Bug Fixes

* **APIKeyModal:** implement focus return to generate button ([#6440](https://github.com/carbon-design-system/ibm-products/issues/6440)) ([535e871](https://github.com/carbon-design-system/ibm-products/commit/535e87142413695c530952f7b314201c8a35becc))
* **APIKeyModal:** implement useFocus hook ([#6290](https://github.com/carbon-design-system/ibm-products/issues/6290)) ([4a92770](https://github.com/carbon-design-system/ibm-products/commit/4a92770d9179f6b59bfe18e53c998fdb51bd794a))
* **APIKeyModal:** improve screen reader announcement ([#6481](https://github.com/carbon-design-system/ibm-products/issues/6481)) ([bea9003](https://github.com/carbon-design-system/ibm-products/commit/bea9003e1c1dcf2f1c19ecaccd6a4096bc313d8d))
* **BigNumbers:** Convert to TypeScript ([#6734](https://github.com/carbon-design-system/ibm-products/issues/6734)) ([2ac32d0](https://github.com/carbon-design-system/ibm-products/commit/2ac32d096b6bc01df000e1c534e61a574fd55e2a))
* condition builder style issues ([#6724](https://github.com/carbon-design-system/ibm-products/issues/6724)) ([37dba95](https://github.com/carbon-design-system/ibm-products/commit/37dba95fffdfce26cd5505d0451a33d82f4cb0e3))
* **Condition Builder:** accessibility violations part 1 ([#6896](https://github.com/carbon-design-system/ibm-products/issues/6896)) ([e93fa2d](https://github.com/carbon-design-system/ibm-products/commit/e93fa2d00645b1c09b696694fac57cc2e10107ab))
* **Condition builder:** correct  and add more storybook data ([#6545](https://github.com/carbon-design-system/ibm-products/issues/6545)) ([8301cc1](https://github.com/carbon-design-system/ibm-products/commit/8301cc11def0e87cc9a1d8112066e06a00947a1a))
* **Condition builder:** initial state getting reset on re-rendering ([#6555](https://github.com/carbon-design-system/ibm-products/issues/6555)) ([ea0989a](https://github.com/carbon-design-system/ibm-products/commit/ea0989ae23b6a23450491c4994bf4e46687dbeb2))
* **conditionBuilder:** issue fix and data correction ([#6421](https://github.com/carbon-design-system/ibm-products/issues/6421)) ([1f5b63e](https://github.com/carbon-design-system/ibm-products/commit/1f5b63ec428ddd2a2b2ee7c4153c83c2fff6a61c))
* **CreateTearsheet:** Dynamically disable/hide the experimentalSecondarySubmit button in CreateTearsheet ([#6412](https://github.com/carbon-design-system/ibm-products/issues/6412)) ([2eab4db](https://github.com/carbon-design-system/ibm-products/commit/2eab4db31164aed9f84c003466fce0bc74467ce3))
* datagrid select all behavior in virtual scroll ([#6546](https://github.com/carbon-design-system/ibm-products/issues/6546)) ([b80d7f0](https://github.com/carbon-design-system/ibm-products/commit/b80d7f03a79a1802279e6142432a52fdb36a966a))
* **Datagrid:** onRowClick results in toggleRow.toggleRowSelected is not a function error in console ([#6633](https://github.com/carbon-design-system/ibm-products/issues/6633)) ([82ce15c](https://github.com/carbon-design-system/ibm-products/commit/82ce15c9b96b5d80f6f566084f177e47a56054f7))
* **Emptystate:** accessibility violation ([#6605](https://github.com/carbon-design-system/ibm-products/issues/6605)) ([cc8f1aa](https://github.com/carbon-design-system/ibm-products/commit/cc8f1aa66a80346104f28b173a4228a012fe0643))
* **EmptyState:** empty states throws hydration errors in next js due to dynamic id ([#6508](https://github.com/carbon-design-system/ibm-products/issues/6508)) ([d5767e8](https://github.com/carbon-design-system/ibm-products/commit/d5767e8e9e5bc078d7324fbda71268a4d42d0bee))
* **FullPageError:** accessibility violations ([#6503](https://github.com/carbon-design-system/ibm-products/issues/6503)) ([3f45528](https://github.com/carbon-design-system/ibm-products/commit/3f45528cd037c0232c2699c18d8bf63a5da8891b))
* glitches on open ([#6873](https://github.com/carbon-design-system/ibm-products/issues/6873)) ([dd74e33](https://github.com/carbon-design-system/ibm-products/commit/dd74e337cd3670201bab669035a77e026c54103d))
* handle step change on carousal scroll ([#6676](https://github.com/carbon-design-system/ibm-products/issues/6676)) ([d3a40e7](https://github.com/carbon-design-system/ibm-products/commit/d3a40e73c0993b4e9ce35eab75aa8dfc00e80f0c))
* **notifications-panel, page-header:** remove dynamic time/dates so that percy builds are not failed ([#6828](https://github.com/carbon-design-system/ibm-products/issues/6828)) ([9187e94](https://github.com/carbon-design-system/ibm-products/commit/9187e944fd2ba5e73a79fb503429511c4cc854b1))
* **NotificationsPanel:** remove focus trap ([#6829](https://github.com/carbon-design-system/ibm-products/issues/6829)) ([ccd0926](https://github.com/carbon-design-system/ibm-products/commit/ccd09268b98f9e1ced078086f00f00a58faf99c4))
* **NotificationsPanel:** remove hard-coded dark theme ([#6862](https://github.com/carbon-design-system/ibm-products/issues/6862)) ([64d9b48](https://github.com/carbon-design-system/ibm-products/commit/64d9b48a8db748ba21835baa14fe047fd8aaf264))
* onclose callback triggered twice ([#6582](https://github.com/carbon-design-system/ibm-products/issues/6582)) ([8361907](https://github.com/carbon-design-system/ibm-products/commit/83619075773be394ffb9b46fe06dde16defba498))
* optionstile tests and UseControllable State update ([#6920](https://github.com/carbon-design-system/ibm-products/issues/6920)) ([2fe47ca](https://github.com/carbon-design-system/ibm-products/commit/2fe47ca70fd94645145b66236d2e971f7f717b7b))
* pageheader subtitle truncation visibility ([#6551](https://github.com/carbon-design-system/ibm-products/issues/6551)) ([26394dd](https://github.com/carbon-design-system/ibm-products/commit/26394dd2b740f19306e8fbbbd6c2195fc5a3bbed))
* **Pageheader,Tearsheet,Notifications:** resolves CSP violations  ([#6340](https://github.com/carbon-design-system/ibm-products/issues/6340)) ([4e11b90](https://github.com/carbon-design-system/ibm-products/commit/4e11b90499030470e085d9324615b58eb3388438))
* remove tooltip from tagoverflow ([#6463](https://github.com/carbon-design-system/ibm-products/issues/6463)) ([c6f0ac0](https://github.com/carbon-design-system/ibm-products/commit/c6f0ac0f444165b55e37873c80462401fd34f14f))
* revert framer motion version ([#6861](https://github.com/carbon-design-system/ibm-products/issues/6861)) ([a9a4285](https://github.com/carbon-design-system/ibm-products/commit/a9a4285a116f537716153ecb144829bcd0062bd4))
* reverts framer-motion to v6 ([#6679](https://github.com/carbon-design-system/ibm-products/issues/6679)) ([13fbc56](https://github.com/carbon-design-system/ibm-products/commit/13fbc567bcb4bd6a688da81b13a7c704628cef9b))
* **scrollgradient, stringformatter, truncatedlist, webterminal:** csp ([#6346](https://github.com/carbon-design-system/ibm-products/issues/6346)) ([5b39280](https://github.com/carbon-design-system/ibm-products/commit/5b39280b9950dc78659466ff79f77bbfccb9421f))
* **side panel in react:** slideIn not working as expected ([#6501](https://github.com/carbon-design-system/ibm-products/issues/6501)) ([9d07dab](https://github.com/carbon-design-system/ibm-products/commit/9d07dab82cefd4046f65f8cac25d1d829f6d7c1a))
* **sidePanel:** resolve storybook doc page scroll issues ([#6664](https://github.com/carbon-design-system/ibm-products/issues/6664)) ([632d1a3](https://github.com/carbon-design-system/ibm-products/commit/632d1a37ea8035da3d9e3c9eb6f086c99ba33aca))
* **SidePanel:** resolve storybook SlideOver animation flickering in doc page ([#6554](https://github.com/carbon-design-system/ibm-products/issues/6554)) ([03c31fc](https://github.com/carbon-design-system/ibm-products/commit/03c31fc3625afadc16d6eb2ca7d91c898bf18de6))
* **tearsheet:** address portalTarget type ([#6400](https://github.com/carbon-design-system/ibm-products/issues/6400)) ([a11d036](https://github.com/carbon-design-system/ibm-products/commit/a11d0364a5beaa3d018db559656c3d7806e1b484))
* **Tearsheet:** missing launcherbuttonref declaration ([#6846](https://github.com/carbon-design-system/ibm-products/issues/6846)) ([4dcb2f5](https://github.com/carbon-design-system/ibm-products/commit/4dcb2f50b1131c7a055ebd9b825792fe6f411a38)), closes [#4751](https://github.com/carbon-design-system/ibm-products/issues/4751)
* **tearsheet:** resolve focusing elements multiple times while rendering ([#6513](https://github.com/carbon-design-system/ibm-products/issues/6513)) ([1c918d1](https://github.com/carbon-design-system/ibm-products/commit/1c918d1605f2a370988d7ade503c1e57e0d43df1))
* update accessibility-checker version ([#6525](https://github.com/carbon-design-system/ibm-products/issues/6525)) ([d8c7051](https://github.com/carbon-design-system/ibm-products/commit/d8c70518087e7e41fdf1aa45cbbf692389058d56))
* update to Carbon 11 compatible versions to latest ([#6437](https://github.com/carbon-design-system/ibm-products/issues/6437)) ([48d5c34](https://github.com/carbon-design-system/ibm-products/commit/48d5c34dca79a4b00fc69391a513431fa21295ee))
* **useFocus:** resolve focus trap issue ([#6835](https://github.com/carbon-design-system/ibm-products/issues/6835)) ([eedbef6](https://github.com/carbon-design-system/ibm-products/commit/eedbef6b082de542c3f1b5171fb1be3a3761ab62))
* **useravatar:** accessibility issue and add avt complex state ([#6399](https://github.com/carbon-design-system/ibm-products/issues/6399)) ([4a70821](https://github.com/carbon-design-system/ibm-products/commit/4a70821b85688730a9d4484340da2517ee079db1))


### Features

* add option to pass description to display on hover of properties ([#6718](https://github.com/carbon-design-system/ibm-products/issues/6718)) ([d043ffa](https://github.com/carbon-design-system/ibm-products/commit/d043ffaf274fff52d57d00f049977a0c84952640))
* add utils section to storybook ([#6394](https://github.com/carbon-design-system/ibm-products/issues/6394)) ([711eb72](https://github.com/carbon-design-system/ibm-products/commit/711eb72ef00d1f1935fd0fcec9e0c0383dff53dc))
* **BreadcrumbWithOverflow:** adopt overflowMenuV12 and floating ui ([#6411](https://github.com/carbon-design-system/ibm-products/issues/6411)) ([f716852](https://github.com/carbon-design-system/ibm-products/commit/f716852c979a0b9556e853fad7e7a7774b4c6579))
* **coachmark:** Add default opening for not-stacked coachmarks ([#6516](https://github.com/carbon-design-system/ibm-products/issues/6516)) ([73ee693](https://github.com/carbon-design-system/ibm-products/commit/73ee693dda68bbbc0ccc6ed802b0efe8f528950e))
* **CoachmarkOverlayElements:** Add next/back callbacks and currentStep properties ([#6548](https://github.com/carbon-design-system/ibm-products/issues/6548)) ([36bd4f9](https://github.com/carbon-design-system/ibm-products/commit/36bd4f96c4d5ab6f3fd5ef1a732e9efbf6ec5212))
* **conditionBuilder:** add option for formatting values in custom and date input type ([#6735](https://github.com/carbon-design-system/ibm-products/issues/6735)) ([9add0eb](https://github.com/carbon-design-system/ibm-products/commit/9add0eb03b19113544138ec5c1b31a75a939fd09))
* **conditionBuilder:** add support for custom operators in ConditionBuilder ([#6841](https://github.com/carbon-design-system/ibm-products/issues/6841)) ([9a603ed](https://github.com/carbon-design-system/ibm-products/commit/9a603edbbb117919d92c6cb82a2d2aa68eb3f318))
* **ConditionBuilder:** customize primary conditions using custom statement configuration ([#6663](https://github.com/carbon-design-system/ibm-products/issues/6663)) ([8eeab4c](https://github.com/carbon-design-system/ibm-products/commit/8eeab4c770f3a09585f187e8282f8c5d371d86f7))
* Decouple lottie-web dependency from our repo ([#6477](https://github.com/carbon-design-system/ibm-products/issues/6477)) ([6b0a75b](https://github.com/carbon-design-system/ibm-products/commit/6b0a75ba4d15d7b2e640b4bb6992635ec3ab770c))
* **interstitial screen:** deprecate media prop and introduce new prop renderMedia ([#6834](https://github.com/carbon-design-system/ibm-products/issues/6834)) ([c85b197](https://github.com/carbon-design-system/ibm-products/commit/c85b197a5c35313fc33f7bef2ee175b0e8451acd))
* **productive card:** floating ui for overflow menu ([#6395](https://github.com/carbon-design-system/ibm-products/issues/6395)) ([42a1362](https://github.com/carbon-design-system/ibm-products/commit/42a1362ad2ff4998f8286ed0698a82c4ec8ea552))
* **sidepanel:** implement decorator prop ([#6511](https://github.com/carbon-design-system/ibm-products/issues/6511)) ([336a5b0](https://github.com/carbon-design-system/ibm-products/commit/336a5b0ad06051bd52080e5d7cd610feb56604c8))
* **tearsheet:** change icondescription prop to optional ([#6662](https://github.com/carbon-design-system/ibm-products/issues/6662)) ([5ba3e04](https://github.com/carbon-design-system/ibm-products/commit/5ba3e0471ccd52be4d50bc5983eeb10562a6f8ff))





# [2.60.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.60.0-rc.0...@carbon/ibm-products@2.60.0) (2025-02-19)

**Note:** Version bump only for package @carbon/ibm-products





# [2.60.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.54.0-rc.0...@carbon/ibm-products@2.60.0-rc.0) (2025-02-10)


### Bug Fixes

* **APIKeyModal:** implement focus return to generate button ([#6440](https://github.com/carbon-design-system/ibm-products/issues/6440)) ([535e871](https://github.com/carbon-design-system/ibm-products/commit/535e87142413695c530952f7b314201c8a35becc))
* **APIKeyModal:** implement useFocus hook ([#6290](https://github.com/carbon-design-system/ibm-products/issues/6290)) ([4a92770](https://github.com/carbon-design-system/ibm-products/commit/4a92770d9179f6b59bfe18e53c998fdb51bd794a))
* **APIKeyModal:** improve screen reader announcement ([#6481](https://github.com/carbon-design-system/ibm-products/issues/6481)) ([bea9003](https://github.com/carbon-design-system/ibm-products/commit/bea9003e1c1dcf2f1c19ecaccd6a4096bc313d8d))
* **BigNumbers:** Convert to TypeScript ([#6734](https://github.com/carbon-design-system/ibm-products/issues/6734)) ([2ac32d0](https://github.com/carbon-design-system/ibm-products/commit/2ac32d096b6bc01df000e1c534e61a574fd55e2a))
* condition builder style issues ([#6724](https://github.com/carbon-design-system/ibm-products/issues/6724)) ([37dba95](https://github.com/carbon-design-system/ibm-products/commit/37dba95fffdfce26cd5505d0451a33d82f4cb0e3))
* **Condition builder:** correct  and add more storybook data ([#6545](https://github.com/carbon-design-system/ibm-products/issues/6545)) ([8301cc1](https://github.com/carbon-design-system/ibm-products/commit/8301cc11def0e87cc9a1d8112066e06a00947a1a))
* **Condition builder:** initial state getting reset on re-rendering ([#6555](https://github.com/carbon-design-system/ibm-products/issues/6555)) ([ea0989a](https://github.com/carbon-design-system/ibm-products/commit/ea0989ae23b6a23450491c4994bf4e46687dbeb2))
* **conditionBuilder:** issue fix and data correction ([#6421](https://github.com/carbon-design-system/ibm-products/issues/6421)) ([1f5b63e](https://github.com/carbon-design-system/ibm-products/commit/1f5b63ec428ddd2a2b2ee7c4153c83c2fff6a61c))
* **CreateTearsheet:** Dynamically disable/hide the experimentalSecondarySubmit button in CreateTearsheet ([#6412](https://github.com/carbon-design-system/ibm-products/issues/6412)) ([2eab4db](https://github.com/carbon-design-system/ibm-products/commit/2eab4db31164aed9f84c003466fce0bc74467ce3))
* datagrid select all behavior in virtual scroll ([#6546](https://github.com/carbon-design-system/ibm-products/issues/6546)) ([b80d7f0](https://github.com/carbon-design-system/ibm-products/commit/b80d7f03a79a1802279e6142432a52fdb36a966a))
* **Datagrid:** onRowClick results in toggleRow.toggleRowSelected is not a function error in console ([#6633](https://github.com/carbon-design-system/ibm-products/issues/6633)) ([82ce15c](https://github.com/carbon-design-system/ibm-products/commit/82ce15c9b96b5d80f6f566084f177e47a56054f7))
* **Emptystate:** accessibility violation ([#6605](https://github.com/carbon-design-system/ibm-products/issues/6605)) ([cc8f1aa](https://github.com/carbon-design-system/ibm-products/commit/cc8f1aa66a80346104f28b173a4228a012fe0643))
* **EmptyState:** empty states throws hydration errors in next js due to dynamic id ([#6508](https://github.com/carbon-design-system/ibm-products/issues/6508)) ([d5767e8](https://github.com/carbon-design-system/ibm-products/commit/d5767e8e9e5bc078d7324fbda71268a4d42d0bee))
* **FullPageError:** accessibility violations ([#6503](https://github.com/carbon-design-system/ibm-products/issues/6503)) ([3f45528](https://github.com/carbon-design-system/ibm-products/commit/3f45528cd037c0232c2699c18d8bf63a5da8891b))
* handle step change on carousal scroll ([#6676](https://github.com/carbon-design-system/ibm-products/issues/6676)) ([d3a40e7](https://github.com/carbon-design-system/ibm-products/commit/d3a40e73c0993b4e9ce35eab75aa8dfc00e80f0c))
* **notifications-panel, page-header:** remove dynamic time/dates so that percy builds are not failed ([#6828](https://github.com/carbon-design-system/ibm-products/issues/6828)) ([9187e94](https://github.com/carbon-design-system/ibm-products/commit/9187e944fd2ba5e73a79fb503429511c4cc854b1))
* **NotificationsPanel:** remove focus trap ([#6829](https://github.com/carbon-design-system/ibm-products/issues/6829)) ([ccd0926](https://github.com/carbon-design-system/ibm-products/commit/ccd09268b98f9e1ced078086f00f00a58faf99c4))
* onclose callback triggered twice ([#6582](https://github.com/carbon-design-system/ibm-products/issues/6582)) ([8361907](https://github.com/carbon-design-system/ibm-products/commit/83619075773be394ffb9b46fe06dde16defba498))
* pageheader subtitle truncation visibility ([#6551](https://github.com/carbon-design-system/ibm-products/issues/6551)) ([26394dd](https://github.com/carbon-design-system/ibm-products/commit/26394dd2b740f19306e8fbbbd6c2195fc5a3bbed))
* **Pageheader,Tearsheet,Notifications:** resolves CSP violations  ([#6340](https://github.com/carbon-design-system/ibm-products/issues/6340)) ([4e11b90](https://github.com/carbon-design-system/ibm-products/commit/4e11b90499030470e085d9324615b58eb3388438))
* remove tooltip from tagoverflow ([#6463](https://github.com/carbon-design-system/ibm-products/issues/6463)) ([c6f0ac0](https://github.com/carbon-design-system/ibm-products/commit/c6f0ac0f444165b55e37873c80462401fd34f14f))
* revert framer motion version ([#6861](https://github.com/carbon-design-system/ibm-products/issues/6861)) ([a9a4285](https://github.com/carbon-design-system/ibm-products/commit/a9a4285a116f537716153ecb144829bcd0062bd4))
* reverts framer-motion to v6 ([#6679](https://github.com/carbon-design-system/ibm-products/issues/6679)) ([13fbc56](https://github.com/carbon-design-system/ibm-products/commit/13fbc567bcb4bd6a688da81b13a7c704628cef9b))
* **scrollgradient, stringformatter, truncatedlist, webterminal:** csp ([#6346](https://github.com/carbon-design-system/ibm-products/issues/6346)) ([5b39280](https://github.com/carbon-design-system/ibm-products/commit/5b39280b9950dc78659466ff79f77bbfccb9421f))
* **side panel in react:** slideIn not working as expected ([#6501](https://github.com/carbon-design-system/ibm-products/issues/6501)) ([9d07dab](https://github.com/carbon-design-system/ibm-products/commit/9d07dab82cefd4046f65f8cac25d1d829f6d7c1a))
* **sidePanel:** resolve storybook doc page scroll issues ([#6664](https://github.com/carbon-design-system/ibm-products/issues/6664)) ([632d1a3](https://github.com/carbon-design-system/ibm-products/commit/632d1a37ea8035da3d9e3c9eb6f086c99ba33aca))
* **SidePanel:** resolve storybook SlideOver animation flickering in doc page ([#6554](https://github.com/carbon-design-system/ibm-products/issues/6554)) ([03c31fc](https://github.com/carbon-design-system/ibm-products/commit/03c31fc3625afadc16d6eb2ca7d91c898bf18de6))
* **tearsheet:** address portalTarget type ([#6400](https://github.com/carbon-design-system/ibm-products/issues/6400)) ([a11d036](https://github.com/carbon-design-system/ibm-products/commit/a11d0364a5beaa3d018db559656c3d7806e1b484))
* **tearsheet:** resolve focusing elements multiple times while rendering ([#6513](https://github.com/carbon-design-system/ibm-products/issues/6513)) ([1c918d1](https://github.com/carbon-design-system/ibm-products/commit/1c918d1605f2a370988d7ade503c1e57e0d43df1))
* update accessibility-checker version ([#6525](https://github.com/carbon-design-system/ibm-products/issues/6525)) ([d8c7051](https://github.com/carbon-design-system/ibm-products/commit/d8c70518087e7e41fdf1aa45cbbf692389058d56))
* update to Carbon 11 compatible versions to latest ([#6437](https://github.com/carbon-design-system/ibm-products/issues/6437)) ([48d5c34](https://github.com/carbon-design-system/ibm-products/commit/48d5c34dca79a4b00fc69391a513431fa21295ee))
* **useFocus:** resolve focus trap issue ([#6835](https://github.com/carbon-design-system/ibm-products/issues/6835)) ([eedbef6](https://github.com/carbon-design-system/ibm-products/commit/eedbef6b082de542c3f1b5171fb1be3a3761ab62))
* **useravatar:** accessibility issue and add avt complex state ([#6399](https://github.com/carbon-design-system/ibm-products/issues/6399)) ([4a70821](https://github.com/carbon-design-system/ibm-products/commit/4a70821b85688730a9d4484340da2517ee079db1))


### Features

* add option to pass description to display on hover of properties ([#6718](https://github.com/carbon-design-system/ibm-products/issues/6718)) ([d043ffa](https://github.com/carbon-design-system/ibm-products/commit/d043ffaf274fff52d57d00f049977a0c84952640))
* add utils section to storybook ([#6394](https://github.com/carbon-design-system/ibm-products/issues/6394)) ([711eb72](https://github.com/carbon-design-system/ibm-products/commit/711eb72ef00d1f1935fd0fcec9e0c0383dff53dc))
* **BreadcrumbWithOverflow:** adopt overflowMenuV12 and floating ui ([#6411](https://github.com/carbon-design-system/ibm-products/issues/6411)) ([f716852](https://github.com/carbon-design-system/ibm-products/commit/f716852c979a0b9556e853fad7e7a7774b4c6579))
* **coachmark:** Add default opening for not-stacked coachmarks ([#6516](https://github.com/carbon-design-system/ibm-products/issues/6516)) ([73ee693](https://github.com/carbon-design-system/ibm-products/commit/73ee693dda68bbbc0ccc6ed802b0efe8f528950e))
* **CoachmarkOverlayElements:** Add next/back callbacks and currentStep properties ([#6548](https://github.com/carbon-design-system/ibm-products/issues/6548)) ([36bd4f9](https://github.com/carbon-design-system/ibm-products/commit/36bd4f96c4d5ab6f3fd5ef1a732e9efbf6ec5212))
* **conditionBuilder:** add option for formatting values in custom and date input type ([#6735](https://github.com/carbon-design-system/ibm-products/issues/6735)) ([9add0eb](https://github.com/carbon-design-system/ibm-products/commit/9add0eb03b19113544138ec5c1b31a75a939fd09))
* **conditionBuilder:** add support for custom operators in ConditionBuilder ([#6841](https://github.com/carbon-design-system/ibm-products/issues/6841)) ([9a603ed](https://github.com/carbon-design-system/ibm-products/commit/9a603edbbb117919d92c6cb82a2d2aa68eb3f318))
* **ConditionBuilder:** customize primary conditions using custom statement configuration ([#6663](https://github.com/carbon-design-system/ibm-products/issues/6663)) ([8eeab4c](https://github.com/carbon-design-system/ibm-products/commit/8eeab4c770f3a09585f187e8282f8c5d371d86f7))
* Decouple lottie-web dependency from our repo ([#6477](https://github.com/carbon-design-system/ibm-products/issues/6477)) ([6b0a75b](https://github.com/carbon-design-system/ibm-products/commit/6b0a75ba4d15d7b2e640b4bb6992635ec3ab770c))
* **interstitial screen:** deprecate media prop and introduce new prop renderMedia ([#6834](https://github.com/carbon-design-system/ibm-products/issues/6834)) ([c85b197](https://github.com/carbon-design-system/ibm-products/commit/c85b197a5c35313fc33f7bef2ee175b0e8451acd))
* **productive card:** floating ui for overflow menu ([#6395](https://github.com/carbon-design-system/ibm-products/issues/6395)) ([42a1362](https://github.com/carbon-design-system/ibm-products/commit/42a1362ad2ff4998f8286ed0698a82c4ec8ea552))
* **sidepanel:** implement decorator prop ([#6511](https://github.com/carbon-design-system/ibm-products/issues/6511)) ([336a5b0](https://github.com/carbon-design-system/ibm-products/commit/336a5b0ad06051bd52080e5d7cd610feb56604c8))
* **tearsheet:** change icondescription prop to optional ([#6662](https://github.com/carbon-design-system/ibm-products/issues/6662)) ([5ba3e04](https://github.com/carbon-design-system/ibm-products/commit/5ba3e0471ccd52be4d50bc5983eeb10562a6f8ff))





# [2.59.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.59.0-rc.0...@carbon/ibm-products@2.59.0) (2025-02-05)

**Note:** Version bump only for package @carbon/ibm-products





# [2.59.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.54.0-rc.0...@carbon/ibm-products@2.59.0-rc.0) (2025-01-27)


### Bug Fixes

* **APIKeyModal:** implement focus return to generate button ([#6440](https://github.com/carbon-design-system/ibm-products/issues/6440)) ([535e871](https://github.com/carbon-design-system/ibm-products/commit/535e87142413695c530952f7b314201c8a35becc))
* **APIKeyModal:** implement useFocus hook ([#6290](https://github.com/carbon-design-system/ibm-products/issues/6290)) ([4a92770](https://github.com/carbon-design-system/ibm-products/commit/4a92770d9179f6b59bfe18e53c998fdb51bd794a))
* **APIKeyModal:** improve screen reader announcement ([#6481](https://github.com/carbon-design-system/ibm-products/issues/6481)) ([bea9003](https://github.com/carbon-design-system/ibm-products/commit/bea9003e1c1dcf2f1c19ecaccd6a4096bc313d8d))
* condition builder style issues ([#6724](https://github.com/carbon-design-system/ibm-products/issues/6724)) ([37dba95](https://github.com/carbon-design-system/ibm-products/commit/37dba95fffdfce26cd5505d0451a33d82f4cb0e3))
* **Condition builder:** correct  and add more storybook data ([#6545](https://github.com/carbon-design-system/ibm-products/issues/6545)) ([8301cc1](https://github.com/carbon-design-system/ibm-products/commit/8301cc11def0e87cc9a1d8112066e06a00947a1a))
* **Condition builder:** initial state getting reset on re-rendering ([#6555](https://github.com/carbon-design-system/ibm-products/issues/6555)) ([ea0989a](https://github.com/carbon-design-system/ibm-products/commit/ea0989ae23b6a23450491c4994bf4e46687dbeb2))
* **conditionBuilder:** issue fix and data correction ([#6421](https://github.com/carbon-design-system/ibm-products/issues/6421)) ([1f5b63e](https://github.com/carbon-design-system/ibm-products/commit/1f5b63ec428ddd2a2b2ee7c4153c83c2fff6a61c))
* **CreateTearsheet:** Dynamically disable/hide the experimentalSecondarySubmit button in CreateTearsheet ([#6412](https://github.com/carbon-design-system/ibm-products/issues/6412)) ([2eab4db](https://github.com/carbon-design-system/ibm-products/commit/2eab4db31164aed9f84c003466fce0bc74467ce3))
* datagrid select all behavior in virtual scroll ([#6546](https://github.com/carbon-design-system/ibm-products/issues/6546)) ([b80d7f0](https://github.com/carbon-design-system/ibm-products/commit/b80d7f03a79a1802279e6142432a52fdb36a966a))
* **Datagrid:** onRowClick results in toggleRow.toggleRowSelected is not a function error in console ([#6633](https://github.com/carbon-design-system/ibm-products/issues/6633)) ([82ce15c](https://github.com/carbon-design-system/ibm-products/commit/82ce15c9b96b5d80f6f566084f177e47a56054f7))
* **Emptystate:** accessibility violation ([#6605](https://github.com/carbon-design-system/ibm-products/issues/6605)) ([cc8f1aa](https://github.com/carbon-design-system/ibm-products/commit/cc8f1aa66a80346104f28b173a4228a012fe0643))
* **EmptyState:** empty states throws hydration errors in next js due to dynamic id ([#6508](https://github.com/carbon-design-system/ibm-products/issues/6508)) ([d5767e8](https://github.com/carbon-design-system/ibm-products/commit/d5767e8e9e5bc078d7324fbda71268a4d42d0bee))
* **FullPageError:** accessibility violations ([#6503](https://github.com/carbon-design-system/ibm-products/issues/6503)) ([3f45528](https://github.com/carbon-design-system/ibm-products/commit/3f45528cd037c0232c2699c18d8bf63a5da8891b))
* handle step change on carousal scroll ([#6676](https://github.com/carbon-design-system/ibm-products/issues/6676)) ([d3a40e7](https://github.com/carbon-design-system/ibm-products/commit/d3a40e73c0993b4e9ce35eab75aa8dfc00e80f0c))
* onclose callback triggered twice ([#6582](https://github.com/carbon-design-system/ibm-products/issues/6582)) ([8361907](https://github.com/carbon-design-system/ibm-products/commit/83619075773be394ffb9b46fe06dde16defba498))
* pageheader subtitle truncation visibility ([#6551](https://github.com/carbon-design-system/ibm-products/issues/6551)) ([26394dd](https://github.com/carbon-design-system/ibm-products/commit/26394dd2b740f19306e8fbbbd6c2195fc5a3bbed))
* **Pageheader,Tearsheet,Notifications:** resolves CSP violations  ([#6340](https://github.com/carbon-design-system/ibm-products/issues/6340)) ([4e11b90](https://github.com/carbon-design-system/ibm-products/commit/4e11b90499030470e085d9324615b58eb3388438))
* remove tooltip from tagoverflow ([#6463](https://github.com/carbon-design-system/ibm-products/issues/6463)) ([c6f0ac0](https://github.com/carbon-design-system/ibm-products/commit/c6f0ac0f444165b55e37873c80462401fd34f14f))
* reverts framer-motion to v6 ([#6679](https://github.com/carbon-design-system/ibm-products/issues/6679)) ([13fbc56](https://github.com/carbon-design-system/ibm-products/commit/13fbc567bcb4bd6a688da81b13a7c704628cef9b))
* **scrollgradient, stringformatter, truncatedlist, webterminal:** csp ([#6346](https://github.com/carbon-design-system/ibm-products/issues/6346)) ([5b39280](https://github.com/carbon-design-system/ibm-products/commit/5b39280b9950dc78659466ff79f77bbfccb9421f))
* **side panel in react:** slideIn not working as expected ([#6501](https://github.com/carbon-design-system/ibm-products/issues/6501)) ([9d07dab](https://github.com/carbon-design-system/ibm-products/commit/9d07dab82cefd4046f65f8cac25d1d829f6d7c1a))
* **SidePanel:** resolve storybook SlideOver animation flickering in doc page ([#6554](https://github.com/carbon-design-system/ibm-products/issues/6554)) ([03c31fc](https://github.com/carbon-design-system/ibm-products/commit/03c31fc3625afadc16d6eb2ca7d91c898bf18de6))
* **tearsheet:** address portalTarget type ([#6400](https://github.com/carbon-design-system/ibm-products/issues/6400)) ([a11d036](https://github.com/carbon-design-system/ibm-products/commit/a11d0364a5beaa3d018db559656c3d7806e1b484))
* **tearsheet:** resolve focusing elements multiple times while rendering ([#6513](https://github.com/carbon-design-system/ibm-products/issues/6513)) ([1c918d1](https://github.com/carbon-design-system/ibm-products/commit/1c918d1605f2a370988d7ade503c1e57e0d43df1))
* update accessibility-checker version ([#6525](https://github.com/carbon-design-system/ibm-products/issues/6525)) ([d8c7051](https://github.com/carbon-design-system/ibm-products/commit/d8c70518087e7e41fdf1aa45cbbf692389058d56))
* update to Carbon 11 compatible versions to latest ([#6437](https://github.com/carbon-design-system/ibm-products/issues/6437)) ([48d5c34](https://github.com/carbon-design-system/ibm-products/commit/48d5c34dca79a4b00fc69391a513431fa21295ee))
* **useravatar:** accessibility issue and add avt complex state ([#6399](https://github.com/carbon-design-system/ibm-products/issues/6399)) ([4a70821](https://github.com/carbon-design-system/ibm-products/commit/4a70821b85688730a9d4484340da2517ee079db1))


### Features

* add utils section to storybook ([#6394](https://github.com/carbon-design-system/ibm-products/issues/6394)) ([711eb72](https://github.com/carbon-design-system/ibm-products/commit/711eb72ef00d1f1935fd0fcec9e0c0383dff53dc))
* **BreadcrumbWithOverflow:** adopt overflowMenuV12 and floating ui ([#6411](https://github.com/carbon-design-system/ibm-products/issues/6411)) ([f716852](https://github.com/carbon-design-system/ibm-products/commit/f716852c979a0b9556e853fad7e7a7774b4c6579))
* **coachmark:** Add default opening for not-stacked coachmarks ([#6516](https://github.com/carbon-design-system/ibm-products/issues/6516)) ([73ee693](https://github.com/carbon-design-system/ibm-products/commit/73ee693dda68bbbc0ccc6ed802b0efe8f528950e))
* **CoachmarkOverlayElements:** Add next/back callbacks and currentStep properties ([#6548](https://github.com/carbon-design-system/ibm-products/issues/6548)) ([36bd4f9](https://github.com/carbon-design-system/ibm-products/commit/36bd4f96c4d5ab6f3fd5ef1a732e9efbf6ec5212))
* **ConditionBuilder:** customize primary conditions using custom statement configuration ([#6663](https://github.com/carbon-design-system/ibm-products/issues/6663)) ([8eeab4c](https://github.com/carbon-design-system/ibm-products/commit/8eeab4c770f3a09585f187e8282f8c5d371d86f7))
* Decouple lottie-web dependency from our repo ([#6477](https://github.com/carbon-design-system/ibm-products/issues/6477)) ([6b0a75b](https://github.com/carbon-design-system/ibm-products/commit/6b0a75ba4d15d7b2e640b4bb6992635ec3ab770c))
* **productive card:** floating ui for overflow menu ([#6395](https://github.com/carbon-design-system/ibm-products/issues/6395)) ([42a1362](https://github.com/carbon-design-system/ibm-products/commit/42a1362ad2ff4998f8286ed0698a82c4ec8ea552))
* **sidepanel:** implement decorator prop ([#6511](https://github.com/carbon-design-system/ibm-products/issues/6511)) ([336a5b0](https://github.com/carbon-design-system/ibm-products/commit/336a5b0ad06051bd52080e5d7cd610feb56604c8))
* **tearsheet:** change icondescription prop to optional ([#6662](https://github.com/carbon-design-system/ibm-products/issues/6662)) ([5ba3e04](https://github.com/carbon-design-system/ibm-products/commit/5ba3e0471ccd52be4d50bc5983eeb10562a6f8ff))





# [2.58.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.58.0-rc.0...@carbon/ibm-products@2.58.0) (2025-01-22)

**Note:** Version bump only for package @carbon/ibm-products





# [2.58.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.54.0-rc.0...@carbon/ibm-products@2.58.0-rc.0) (2025-01-13)


### Bug Fixes

* **APIKeyModal:** implement focus return to generate button ([#6440](https://github.com/carbon-design-system/ibm-products/issues/6440)) ([535e871](https://github.com/carbon-design-system/ibm-products/commit/535e87142413695c530952f7b314201c8a35becc))
* **APIKeyModal:** implement useFocus hook ([#6290](https://github.com/carbon-design-system/ibm-products/issues/6290)) ([4a92770](https://github.com/carbon-design-system/ibm-products/commit/4a92770d9179f6b59bfe18e53c998fdb51bd794a))
* **APIKeyModal:** improve screen reader announcement ([#6481](https://github.com/carbon-design-system/ibm-products/issues/6481)) ([bea9003](https://github.com/carbon-design-system/ibm-products/commit/bea9003e1c1dcf2f1c19ecaccd6a4096bc313d8d))
* **Condition builder:** correct  and add more storybook data ([#6545](https://github.com/carbon-design-system/ibm-products/issues/6545)) ([8301cc1](https://github.com/carbon-design-system/ibm-products/commit/8301cc11def0e87cc9a1d8112066e06a00947a1a))
* **Condition builder:** initial state getting reset on re-rendering ([#6555](https://github.com/carbon-design-system/ibm-products/issues/6555)) ([ea0989a](https://github.com/carbon-design-system/ibm-products/commit/ea0989ae23b6a23450491c4994bf4e46687dbeb2))
* **conditionBuilder:** issue fix and data correction ([#6421](https://github.com/carbon-design-system/ibm-products/issues/6421)) ([1f5b63e](https://github.com/carbon-design-system/ibm-products/commit/1f5b63ec428ddd2a2b2ee7c4153c83c2fff6a61c))
* **CreateTearsheet:** Dynamically disable/hide the experimentalSecondarySubmit button in CreateTearsheet ([#6412](https://github.com/carbon-design-system/ibm-products/issues/6412)) ([2eab4db](https://github.com/carbon-design-system/ibm-products/commit/2eab4db31164aed9f84c003466fce0bc74467ce3))
* datagrid select all behavior in virtual scroll ([#6546](https://github.com/carbon-design-system/ibm-products/issues/6546)) ([b80d7f0](https://github.com/carbon-design-system/ibm-products/commit/b80d7f03a79a1802279e6142432a52fdb36a966a))
* **Datagrid:** onRowClick results in toggleRow.toggleRowSelected is not a function error in console ([#6633](https://github.com/carbon-design-system/ibm-products/issues/6633)) ([82ce15c](https://github.com/carbon-design-system/ibm-products/commit/82ce15c9b96b5d80f6f566084f177e47a56054f7))
* **Emptystate:** accessibility violation ([#6605](https://github.com/carbon-design-system/ibm-products/issues/6605)) ([cc8f1aa](https://github.com/carbon-design-system/ibm-products/commit/cc8f1aa66a80346104f28b173a4228a012fe0643))
* **EmptyState:** empty states throws hydration errors in next js due to dynamic id ([#6508](https://github.com/carbon-design-system/ibm-products/issues/6508)) ([d5767e8](https://github.com/carbon-design-system/ibm-products/commit/d5767e8e9e5bc078d7324fbda71268a4d42d0bee))
* **FullPageError:** accessibility violations ([#6503](https://github.com/carbon-design-system/ibm-products/issues/6503)) ([3f45528](https://github.com/carbon-design-system/ibm-products/commit/3f45528cd037c0232c2699c18d8bf63a5da8891b))
* onclose callback triggered twice ([#6582](https://github.com/carbon-design-system/ibm-products/issues/6582)) ([8361907](https://github.com/carbon-design-system/ibm-products/commit/83619075773be394ffb9b46fe06dde16defba498))
* pageheader subtitle truncation visibility ([#6551](https://github.com/carbon-design-system/ibm-products/issues/6551)) ([26394dd](https://github.com/carbon-design-system/ibm-products/commit/26394dd2b740f19306e8fbbbd6c2195fc5a3bbed))
* remove tooltip from tagoverflow ([#6463](https://github.com/carbon-design-system/ibm-products/issues/6463)) ([c6f0ac0](https://github.com/carbon-design-system/ibm-products/commit/c6f0ac0f444165b55e37873c80462401fd34f14f))
* reverts framer-motion to v6 ([#6679](https://github.com/carbon-design-system/ibm-products/issues/6679)) ([13fbc56](https://github.com/carbon-design-system/ibm-products/commit/13fbc567bcb4bd6a688da81b13a7c704628cef9b))
* **side panel in react:** slideIn not working as expected ([#6501](https://github.com/carbon-design-system/ibm-products/issues/6501)) ([9d07dab](https://github.com/carbon-design-system/ibm-products/commit/9d07dab82cefd4046f65f8cac25d1d829f6d7c1a))
* **SidePanel:** resolve storybook SlideOver animation flickering in doc page ([#6554](https://github.com/carbon-design-system/ibm-products/issues/6554)) ([03c31fc](https://github.com/carbon-design-system/ibm-products/commit/03c31fc3625afadc16d6eb2ca7d91c898bf18de6))
* **tearsheet:** address portalTarget type ([#6400](https://github.com/carbon-design-system/ibm-products/issues/6400)) ([a11d036](https://github.com/carbon-design-system/ibm-products/commit/a11d0364a5beaa3d018db559656c3d7806e1b484))
* **tearsheet:** resolve focusing elements multiple times while rendering ([#6513](https://github.com/carbon-design-system/ibm-products/issues/6513)) ([1c918d1](https://github.com/carbon-design-system/ibm-products/commit/1c918d1605f2a370988d7ade503c1e57e0d43df1))
* update accessibility-checker version ([#6525](https://github.com/carbon-design-system/ibm-products/issues/6525)) ([d8c7051](https://github.com/carbon-design-system/ibm-products/commit/d8c70518087e7e41fdf1aa45cbbf692389058d56))
* update to Carbon 11 compatible versions to latest ([#6437](https://github.com/carbon-design-system/ibm-products/issues/6437)) ([48d5c34](https://github.com/carbon-design-system/ibm-products/commit/48d5c34dca79a4b00fc69391a513431fa21295ee))
* **useravatar:** accessibility issue and add avt complex state ([#6399](https://github.com/carbon-design-system/ibm-products/issues/6399)) ([4a70821](https://github.com/carbon-design-system/ibm-products/commit/4a70821b85688730a9d4484340da2517ee079db1))


### Features

* add utils section to storybook ([#6394](https://github.com/carbon-design-system/ibm-products/issues/6394)) ([711eb72](https://github.com/carbon-design-system/ibm-products/commit/711eb72ef00d1f1935fd0fcec9e0c0383dff53dc))
* **BreadcrumbWithOverflow:** adopt overflowMenuV12 and floating ui ([#6411](https://github.com/carbon-design-system/ibm-products/issues/6411)) ([f716852](https://github.com/carbon-design-system/ibm-products/commit/f716852c979a0b9556e853fad7e7a7774b4c6579))
* **coachmark:** Add default opening for not-stacked coachmarks ([#6516](https://github.com/carbon-design-system/ibm-products/issues/6516)) ([73ee693](https://github.com/carbon-design-system/ibm-products/commit/73ee693dda68bbbc0ccc6ed802b0efe8f528950e))
* **CoachmarkOverlayElements:** Add next/back callbacks and currentStep properties ([#6548](https://github.com/carbon-design-system/ibm-products/issues/6548)) ([36bd4f9](https://github.com/carbon-design-system/ibm-products/commit/36bd4f96c4d5ab6f3fd5ef1a732e9efbf6ec5212))
* **ConditionBuilder:** customize primary conditions using custom statement configuration ([#6663](https://github.com/carbon-design-system/ibm-products/issues/6663)) ([8eeab4c](https://github.com/carbon-design-system/ibm-products/commit/8eeab4c770f3a09585f187e8282f8c5d371d86f7))
* Decouple lottie-web dependency from our repo ([#6477](https://github.com/carbon-design-system/ibm-products/issues/6477)) ([6b0a75b](https://github.com/carbon-design-system/ibm-products/commit/6b0a75ba4d15d7b2e640b4bb6992635ec3ab770c))
* **productive card:** floating ui for overflow menu ([#6395](https://github.com/carbon-design-system/ibm-products/issues/6395)) ([42a1362](https://github.com/carbon-design-system/ibm-products/commit/42a1362ad2ff4998f8286ed0698a82c4ec8ea552))
* **sidepanel:** implement decorator prop ([#6511](https://github.com/carbon-design-system/ibm-products/issues/6511)) ([336a5b0](https://github.com/carbon-design-system/ibm-products/commit/336a5b0ad06051bd52080e5d7cd610feb56604c8))





## [2.57.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.57.1-rc.0...@carbon/ibm-products@2.57.1) (2025-01-10)

**Note:** Version bump only for package @carbon/ibm-products





## [2.57.1-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.54.0-rc.0...@carbon/ibm-products@2.57.1-rc.0) (2025-01-09)


### Bug Fixes

* **APIKeyModal:** implement focus return to generate button ([#6440](https://github.com/carbon-design-system/ibm-products/issues/6440)) ([535e871](https://github.com/carbon-design-system/ibm-products/commit/535e87142413695c530952f7b314201c8a35becc))
* **APIKeyModal:** implement useFocus hook ([#6290](https://github.com/carbon-design-system/ibm-products/issues/6290)) ([4a92770](https://github.com/carbon-design-system/ibm-products/commit/4a92770d9179f6b59bfe18e53c998fdb51bd794a))
* **APIKeyModal:** improve screen reader announcement ([#6481](https://github.com/carbon-design-system/ibm-products/issues/6481)) ([bea9003](https://github.com/carbon-design-system/ibm-products/commit/bea9003e1c1dcf2f1c19ecaccd6a4096bc313d8d))
* **Condition builder:** correct  and add more storybook data ([#6545](https://github.com/carbon-design-system/ibm-products/issues/6545)) ([8301cc1](https://github.com/carbon-design-system/ibm-products/commit/8301cc11def0e87cc9a1d8112066e06a00947a1a))
* **Condition builder:** initial state getting reset on re-rendering ([#6555](https://github.com/carbon-design-system/ibm-products/issues/6555)) ([ea0989a](https://github.com/carbon-design-system/ibm-products/commit/ea0989ae23b6a23450491c4994bf4e46687dbeb2))
* **conditionBuilder:** issue fix and data correction ([#6421](https://github.com/carbon-design-system/ibm-products/issues/6421)) ([1f5b63e](https://github.com/carbon-design-system/ibm-products/commit/1f5b63ec428ddd2a2b2ee7c4153c83c2fff6a61c))
* **CreateTearsheet:** Dynamically disable/hide the experimentalSecondarySubmit button in CreateTearsheet ([#6412](https://github.com/carbon-design-system/ibm-products/issues/6412)) ([2eab4db](https://github.com/carbon-design-system/ibm-products/commit/2eab4db31164aed9f84c003466fce0bc74467ce3))
* datagrid select all behavior in virtual scroll ([#6546](https://github.com/carbon-design-system/ibm-products/issues/6546)) ([b80d7f0](https://github.com/carbon-design-system/ibm-products/commit/b80d7f03a79a1802279e6142432a52fdb36a966a))
* **Emptystate:** accessibility violation ([#6605](https://github.com/carbon-design-system/ibm-products/issues/6605)) ([cc8f1aa](https://github.com/carbon-design-system/ibm-products/commit/cc8f1aa66a80346104f28b173a4228a012fe0643))
* **EmptyState:** empty states throws hydration errors in next js due to dynamic id ([#6508](https://github.com/carbon-design-system/ibm-products/issues/6508)) ([d5767e8](https://github.com/carbon-design-system/ibm-products/commit/d5767e8e9e5bc078d7324fbda71268a4d42d0bee))
* **FullPageError:** accessibility violations ([#6503](https://github.com/carbon-design-system/ibm-products/issues/6503)) ([3f45528](https://github.com/carbon-design-system/ibm-products/commit/3f45528cd037c0232c2699c18d8bf63a5da8891b))
* onclose callback triggered twice ([#6582](https://github.com/carbon-design-system/ibm-products/issues/6582)) ([8361907](https://github.com/carbon-design-system/ibm-products/commit/83619075773be394ffb9b46fe06dde16defba498))
* pageheader subtitle truncation visibility ([#6551](https://github.com/carbon-design-system/ibm-products/issues/6551)) ([26394dd](https://github.com/carbon-design-system/ibm-products/commit/26394dd2b740f19306e8fbbbd6c2195fc5a3bbed))
* remove tooltip from tagoverflow ([#6463](https://github.com/carbon-design-system/ibm-products/issues/6463)) ([c6f0ac0](https://github.com/carbon-design-system/ibm-products/commit/c6f0ac0f444165b55e37873c80462401fd34f14f))
* reverts framer-motion to v6 ([#6679](https://github.com/carbon-design-system/ibm-products/issues/6679)) ([13fbc56](https://github.com/carbon-design-system/ibm-products/commit/13fbc567bcb4bd6a688da81b13a7c704628cef9b))
* **side panel in react:** slideIn not working as expected ([#6501](https://github.com/carbon-design-system/ibm-products/issues/6501)) ([9d07dab](https://github.com/carbon-design-system/ibm-products/commit/9d07dab82cefd4046f65f8cac25d1d829f6d7c1a))
* **SidePanel:** resolve storybook SlideOver animation flickering in doc page ([#6554](https://github.com/carbon-design-system/ibm-products/issues/6554)) ([03c31fc](https://github.com/carbon-design-system/ibm-products/commit/03c31fc3625afadc16d6eb2ca7d91c898bf18de6))
* **tearsheet:** address portalTarget type ([#6400](https://github.com/carbon-design-system/ibm-products/issues/6400)) ([a11d036](https://github.com/carbon-design-system/ibm-products/commit/a11d0364a5beaa3d018db559656c3d7806e1b484))
* **tearsheet:** resolve focusing elements multiple times while rendering ([#6513](https://github.com/carbon-design-system/ibm-products/issues/6513)) ([1c918d1](https://github.com/carbon-design-system/ibm-products/commit/1c918d1605f2a370988d7ade503c1e57e0d43df1))
* update accessibility-checker version ([#6525](https://github.com/carbon-design-system/ibm-products/issues/6525)) ([d8c7051](https://github.com/carbon-design-system/ibm-products/commit/d8c70518087e7e41fdf1aa45cbbf692389058d56))
* update to Carbon 11 compatible versions to latest ([#6437](https://github.com/carbon-design-system/ibm-products/issues/6437)) ([48d5c34](https://github.com/carbon-design-system/ibm-products/commit/48d5c34dca79a4b00fc69391a513431fa21295ee))
* **useravatar:** accessibility issue and add avt complex state ([#6399](https://github.com/carbon-design-system/ibm-products/issues/6399)) ([4a70821](https://github.com/carbon-design-system/ibm-products/commit/4a70821b85688730a9d4484340da2517ee079db1))


### Features

* add utils section to storybook ([#6394](https://github.com/carbon-design-system/ibm-products/issues/6394)) ([711eb72](https://github.com/carbon-design-system/ibm-products/commit/711eb72ef00d1f1935fd0fcec9e0c0383dff53dc))
* **BreadcrumbWithOverflow:** adopt overflowMenuV12 and floating ui ([#6411](https://github.com/carbon-design-system/ibm-products/issues/6411)) ([f716852](https://github.com/carbon-design-system/ibm-products/commit/f716852c979a0b9556e853fad7e7a7774b4c6579))
* **coachmark:** Add default opening for not-stacked coachmarks ([#6516](https://github.com/carbon-design-system/ibm-products/issues/6516)) ([73ee693](https://github.com/carbon-design-system/ibm-products/commit/73ee693dda68bbbc0ccc6ed802b0efe8f528950e))
* **CoachmarkOverlayElements:** Add next/back callbacks and currentStep properties ([#6548](https://github.com/carbon-design-system/ibm-products/issues/6548)) ([36bd4f9](https://github.com/carbon-design-system/ibm-products/commit/36bd4f96c4d5ab6f3fd5ef1a732e9efbf6ec5212))
* **ConditionBuilder:** customize primary conditions using custom statement configuration ([#6663](https://github.com/carbon-design-system/ibm-products/issues/6663)) ([8eeab4c](https://github.com/carbon-design-system/ibm-products/commit/8eeab4c770f3a09585f187e8282f8c5d371d86f7))
* Decouple lottie-web dependency from our repo ([#6477](https://github.com/carbon-design-system/ibm-products/issues/6477)) ([6b0a75b](https://github.com/carbon-design-system/ibm-products/commit/6b0a75ba4d15d7b2e640b4bb6992635ec3ab770c))
* **productive card:** floating ui for overflow menu ([#6395](https://github.com/carbon-design-system/ibm-products/issues/6395)) ([42a1362](https://github.com/carbon-design-system/ibm-products/commit/42a1362ad2ff4998f8286ed0698a82c4ec8ea552))
* **sidepanel:** implement decorator prop ([#6511](https://github.com/carbon-design-system/ibm-products/issues/6511)) ([336a5b0](https://github.com/carbon-design-system/ibm-products/commit/336a5b0ad06051bd52080e5d7cd610feb56604c8))





# [2.57.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.57.0-rc.0...@carbon/ibm-products@2.57.0) (2025-01-08)

**Note:** Version bump only for package @carbon/ibm-products





# [2.57.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.54.0-rc.0...@carbon/ibm-products@2.57.0-rc.0) (2024-12-24)


### Bug Fixes

* **APIKeyModal:** implement focus return to generate button ([#6440](https://github.com/carbon-design-system/ibm-products/issues/6440)) ([535e871](https://github.com/carbon-design-system/ibm-products/commit/535e87142413695c530952f7b314201c8a35becc))
* **APIKeyModal:** implement useFocus hook ([#6290](https://github.com/carbon-design-system/ibm-products/issues/6290)) ([4a92770](https://github.com/carbon-design-system/ibm-products/commit/4a92770d9179f6b59bfe18e53c998fdb51bd794a))
* **APIKeyModal:** improve screen reader announcement ([#6481](https://github.com/carbon-design-system/ibm-products/issues/6481)) ([bea9003](https://github.com/carbon-design-system/ibm-products/commit/bea9003e1c1dcf2f1c19ecaccd6a4096bc313d8d))
* **Condition builder:** correct  and add more storybook data ([#6545](https://github.com/carbon-design-system/ibm-products/issues/6545)) ([8301cc1](https://github.com/carbon-design-system/ibm-products/commit/8301cc11def0e87cc9a1d8112066e06a00947a1a))
* **Condition builder:** initial state getting reset on re-rendering ([#6555](https://github.com/carbon-design-system/ibm-products/issues/6555)) ([ea0989a](https://github.com/carbon-design-system/ibm-products/commit/ea0989ae23b6a23450491c4994bf4e46687dbeb2))
* **conditionBuilder:** issue fix and data correction ([#6421](https://github.com/carbon-design-system/ibm-products/issues/6421)) ([1f5b63e](https://github.com/carbon-design-system/ibm-products/commit/1f5b63ec428ddd2a2b2ee7c4153c83c2fff6a61c))
* **CreateTearsheet:** Dynamically disable/hide the experimentalSecondarySubmit button in CreateTearsheet ([#6412](https://github.com/carbon-design-system/ibm-products/issues/6412)) ([2eab4db](https://github.com/carbon-design-system/ibm-products/commit/2eab4db31164aed9f84c003466fce0bc74467ce3))
* datagrid select all behavior in virtual scroll ([#6546](https://github.com/carbon-design-system/ibm-products/issues/6546)) ([b80d7f0](https://github.com/carbon-design-system/ibm-products/commit/b80d7f03a79a1802279e6142432a52fdb36a966a))
* **EmptyState:** empty states throws hydration errors in next js due to dynamic id ([#6508](https://github.com/carbon-design-system/ibm-products/issues/6508)) ([d5767e8](https://github.com/carbon-design-system/ibm-products/commit/d5767e8e9e5bc078d7324fbda71268a4d42d0bee))
* **FullPageError:** accessibility violations ([#6503](https://github.com/carbon-design-system/ibm-products/issues/6503)) ([3f45528](https://github.com/carbon-design-system/ibm-products/commit/3f45528cd037c0232c2699c18d8bf63a5da8891b))
* onclose callback triggered twice ([#6582](https://github.com/carbon-design-system/ibm-products/issues/6582)) ([8361907](https://github.com/carbon-design-system/ibm-products/commit/83619075773be394ffb9b46fe06dde16defba498))
* pageheader subtitle truncation visibility ([#6551](https://github.com/carbon-design-system/ibm-products/issues/6551)) ([26394dd](https://github.com/carbon-design-system/ibm-products/commit/26394dd2b740f19306e8fbbbd6c2195fc5a3bbed))
* remove tooltip from tagoverflow ([#6463](https://github.com/carbon-design-system/ibm-products/issues/6463)) ([c6f0ac0](https://github.com/carbon-design-system/ibm-products/commit/c6f0ac0f444165b55e37873c80462401fd34f14f))
* **side panel in react:** slideIn not working as expected ([#6501](https://github.com/carbon-design-system/ibm-products/issues/6501)) ([9d07dab](https://github.com/carbon-design-system/ibm-products/commit/9d07dab82cefd4046f65f8cac25d1d829f6d7c1a))
* **SidePanel:** resolve storybook SlideOver animation flickering in doc page ([#6554](https://github.com/carbon-design-system/ibm-products/issues/6554)) ([03c31fc](https://github.com/carbon-design-system/ibm-products/commit/03c31fc3625afadc16d6eb2ca7d91c898bf18de6))
* **tearsheet:** address portalTarget type ([#6400](https://github.com/carbon-design-system/ibm-products/issues/6400)) ([a11d036](https://github.com/carbon-design-system/ibm-products/commit/a11d0364a5beaa3d018db559656c3d7806e1b484))
* **tearsheet:** resolve focusing elements multiple times while rendering ([#6513](https://github.com/carbon-design-system/ibm-products/issues/6513)) ([1c918d1](https://github.com/carbon-design-system/ibm-products/commit/1c918d1605f2a370988d7ade503c1e57e0d43df1))
* update accessibility-checker version ([#6525](https://github.com/carbon-design-system/ibm-products/issues/6525)) ([d8c7051](https://github.com/carbon-design-system/ibm-products/commit/d8c70518087e7e41fdf1aa45cbbf692389058d56))
* update to Carbon 11 compatible versions to latest ([#6437](https://github.com/carbon-design-system/ibm-products/issues/6437)) ([48d5c34](https://github.com/carbon-design-system/ibm-products/commit/48d5c34dca79a4b00fc69391a513431fa21295ee))
* **useravatar:** accessibility issue and add avt complex state ([#6399](https://github.com/carbon-design-system/ibm-products/issues/6399)) ([4a70821](https://github.com/carbon-design-system/ibm-products/commit/4a70821b85688730a9d4484340da2517ee079db1))


### Features

* add utils section to storybook ([#6394](https://github.com/carbon-design-system/ibm-products/issues/6394)) ([711eb72](https://github.com/carbon-design-system/ibm-products/commit/711eb72ef00d1f1935fd0fcec9e0c0383dff53dc))
* **BreadcrumbWithOverflow:** adopt overflowMenuV12 and floating ui ([#6411](https://github.com/carbon-design-system/ibm-products/issues/6411)) ([f716852](https://github.com/carbon-design-system/ibm-products/commit/f716852c979a0b9556e853fad7e7a7774b4c6579))
* **coachmark:** Add default opening for not-stacked coachmarks ([#6516](https://github.com/carbon-design-system/ibm-products/issues/6516)) ([73ee693](https://github.com/carbon-design-system/ibm-products/commit/73ee693dda68bbbc0ccc6ed802b0efe8f528950e))
* **CoachmarkOverlayElements:** Add next/back callbacks and currentStep properties ([#6548](https://github.com/carbon-design-system/ibm-products/issues/6548)) ([36bd4f9](https://github.com/carbon-design-system/ibm-products/commit/36bd4f96c4d5ab6f3fd5ef1a732e9efbf6ec5212))
* Decouple lottie-web dependency from our repo ([#6477](https://github.com/carbon-design-system/ibm-products/issues/6477)) ([6b0a75b](https://github.com/carbon-design-system/ibm-products/commit/6b0a75ba4d15d7b2e640b4bb6992635ec3ab770c))
* **productive card:** floating ui for overflow menu ([#6395](https://github.com/carbon-design-system/ibm-products/issues/6395)) ([42a1362](https://github.com/carbon-design-system/ibm-products/commit/42a1362ad2ff4998f8286ed0698a82c4ec8ea552))
* **sidepanel:** implement decorator prop ([#6511](https://github.com/carbon-design-system/ibm-products/issues/6511)) ([336a5b0](https://github.com/carbon-design-system/ibm-products/commit/336a5b0ad06051bd52080e5d7cd610feb56604c8))





## [2.56.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.56.1-rc.0...@carbon/ibm-products@2.56.1) (2024-12-19)

**Note:** Version bump only for package @carbon/ibm-products





## [2.56.1-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.56.0...@carbon/ibm-products@2.56.1-rc.0) (2024-12-18)


### Bug Fixes

* **EmptyState:** added useId handling for older react version ([#6620](https://github.com/carbon-design-system/ibm-products/issues/6620)) ([45af420](https://github.com/carbon-design-system/ibm-products/commit/45af4204487b79754b6ee9c950c23119e2684a99))





# [2.56.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.56.0-rc.0...@carbon/ibm-products@2.56.0) (2024-12-18)

**Note:** Version bump only for package @carbon/ibm-products





# [2.56.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.54.0-rc.0...@carbon/ibm-products@2.56.0-rc.0) (2024-12-09)


### Bug Fixes

* **APIKeyModal:** implement focus return to generate button ([#6440](https://github.com/carbon-design-system/ibm-products/issues/6440)) ([535e871](https://github.com/carbon-design-system/ibm-products/commit/535e87142413695c530952f7b314201c8a35becc))
* **APIKeyModal:** implement useFocus hook ([#6290](https://github.com/carbon-design-system/ibm-products/issues/6290)) ([4a92770](https://github.com/carbon-design-system/ibm-products/commit/4a92770d9179f6b59bfe18e53c998fdb51bd794a))
* **conditionBuilder:** issue fix and data correction ([#6421](https://github.com/carbon-design-system/ibm-products/issues/6421)) ([1f5b63e](https://github.com/carbon-design-system/ibm-products/commit/1f5b63ec428ddd2a2b2ee7c4153c83c2fff6a61c))
* **CreateTearsheet:** Dynamically disable/hide the experimentalSecondarySubmit button in CreateTearsheet ([#6412](https://github.com/carbon-design-system/ibm-products/issues/6412)) ([2eab4db](https://github.com/carbon-design-system/ibm-products/commit/2eab4db31164aed9f84c003466fce0bc74467ce3))
* **EmptyState:** empty states throws hydration errors in next js due to dynamic id ([#6508](https://github.com/carbon-design-system/ibm-products/issues/6508)) ([d5767e8](https://github.com/carbon-design-system/ibm-products/commit/d5767e8e9e5bc078d7324fbda71268a4d42d0bee))
* **FullPageError:** accessibility violations ([#6503](https://github.com/carbon-design-system/ibm-products/issues/6503)) ([3f45528](https://github.com/carbon-design-system/ibm-products/commit/3f45528cd037c0232c2699c18d8bf63a5da8891b))
* **side panel in react:** slideIn not working as expected ([#6501](https://github.com/carbon-design-system/ibm-products/issues/6501)) ([9d07dab](https://github.com/carbon-design-system/ibm-products/commit/9d07dab82cefd4046f65f8cac25d1d829f6d7c1a))
* **tearsheet:** address portalTarget type ([#6400](https://github.com/carbon-design-system/ibm-products/issues/6400)) ([a11d036](https://github.com/carbon-design-system/ibm-products/commit/a11d0364a5beaa3d018db559656c3d7806e1b484))
* update accessibility-checker version ([#6525](https://github.com/carbon-design-system/ibm-products/issues/6525)) ([d8c7051](https://github.com/carbon-design-system/ibm-products/commit/d8c70518087e7e41fdf1aa45cbbf692389058d56))
* update to Carbon 11 compatible versions to latest ([#6437](https://github.com/carbon-design-system/ibm-products/issues/6437)) ([48d5c34](https://github.com/carbon-design-system/ibm-products/commit/48d5c34dca79a4b00fc69391a513431fa21295ee))
* **useravatar:** accessibility issue and add avt complex state ([#6399](https://github.com/carbon-design-system/ibm-products/issues/6399)) ([4a70821](https://github.com/carbon-design-system/ibm-products/commit/4a70821b85688730a9d4484340da2517ee079db1))


### Features

* add utils section to storybook ([#6394](https://github.com/carbon-design-system/ibm-products/issues/6394)) ([711eb72](https://github.com/carbon-design-system/ibm-products/commit/711eb72ef00d1f1935fd0fcec9e0c0383dff53dc))
* **BreadcrumbWithOverflow:** adopt overflowMenuV12 and floating ui ([#6411](https://github.com/carbon-design-system/ibm-products/issues/6411)) ([f716852](https://github.com/carbon-design-system/ibm-products/commit/f716852c979a0b9556e853fad7e7a7774b4c6579))
* **coachmark:** Add default opening for not-stacked coachmarks ([#6516](https://github.com/carbon-design-system/ibm-products/issues/6516)) ([73ee693](https://github.com/carbon-design-system/ibm-products/commit/73ee693dda68bbbc0ccc6ed802b0efe8f528950e))
* Decouple lottie-web dependency from our repo ([#6477](https://github.com/carbon-design-system/ibm-products/issues/6477)) ([6b0a75b](https://github.com/carbon-design-system/ibm-products/commit/6b0a75ba4d15d7b2e640b4bb6992635ec3ab770c))
* **productive card:** floating ui for overflow menu ([#6395](https://github.com/carbon-design-system/ibm-products/issues/6395)) ([42a1362](https://github.com/carbon-design-system/ibm-products/commit/42a1362ad2ff4998f8286ed0698a82c4ec8ea552))





# [2.55.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.55.0-rc.0...@carbon/ibm-products@2.55.0) (2024-12-04)

**Note:** Version bump only for package @carbon/ibm-products





# [2.55.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.54.0-rc.0...@carbon/ibm-products@2.55.0-rc.0) (2024-11-25)


### Bug Fixes

* **APIKeyModal:** implement focus return to generate button ([#6440](https://github.com/carbon-design-system/ibm-products/issues/6440)) ([535e871](https://github.com/carbon-design-system/ibm-products/commit/535e87142413695c530952f7b314201c8a35becc))
* **APIKeyModal:** implement useFocus hook ([#6290](https://github.com/carbon-design-system/ibm-products/issues/6290)) ([4a92770](https://github.com/carbon-design-system/ibm-products/commit/4a92770d9179f6b59bfe18e53c998fdb51bd794a))
* **conditionBuilder:** issue fix and data correction ([#6421](https://github.com/carbon-design-system/ibm-products/issues/6421)) ([1f5b63e](https://github.com/carbon-design-system/ibm-products/commit/1f5b63ec428ddd2a2b2ee7c4153c83c2fff6a61c))
* **tearsheet:** address portalTarget type ([#6400](https://github.com/carbon-design-system/ibm-products/issues/6400)) ([a11d036](https://github.com/carbon-design-system/ibm-products/commit/a11d0364a5beaa3d018db559656c3d7806e1b484))
* update to Carbon 11 compatible versions to latest ([#6437](https://github.com/carbon-design-system/ibm-products/issues/6437)) ([48d5c34](https://github.com/carbon-design-system/ibm-products/commit/48d5c34dca79a4b00fc69391a513431fa21295ee))
* **useravatar:** accessibility issue and add avt complex state ([#6399](https://github.com/carbon-design-system/ibm-products/issues/6399)) ([4a70821](https://github.com/carbon-design-system/ibm-products/commit/4a70821b85688730a9d4484340da2517ee079db1))


### Features

* add utils section to storybook ([#6394](https://github.com/carbon-design-system/ibm-products/issues/6394)) ([711eb72](https://github.com/carbon-design-system/ibm-products/commit/711eb72ef00d1f1935fd0fcec9e0c0383dff53dc))
* **productive card:** floating ui for overflow menu ([#6395](https://github.com/carbon-design-system/ibm-products/issues/6395)) ([42a1362](https://github.com/carbon-design-system/ibm-products/commit/42a1362ad2ff4998f8286ed0698a82c4ec8ea552))





# [2.54.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.54.0-rc.1...@carbon/ibm-products@2.54.0) (2024-11-20)

**Note:** Version bump only for package @carbon/ibm-products





# [2.54.0-rc.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.48.0-rc.0...@carbon/ibm-products@2.54.0-rc.1) (2024-11-15)



# 2.54.0-rc.0 (2024-11-11)


### Bug Fixes

* **AboutModal:** implement useFocus() ([#5981](https://github.com/carbon-design-system/ibm-products/issues/5981)) ([e37beea](https://github.com/carbon-design-system/ibm-products/commit/e37beeafa1f592de3c9a38930487ed7cf4e8239b))
* add floating ui to tagset ([#6005](https://github.com/carbon-design-system/ibm-products/issues/6005)) ([fac868b](https://github.com/carbon-design-system/ibm-products/commit/fac868b0bb3382aac79ab2780480d58e901da517))
* add primaryButtonDisabled prop to ProductiveCard ([#6100](https://github.com/carbon-design-system/ibm-products/issues/6100)) ([7d17364](https://github.com/carbon-design-system/ibm-products/commit/7d17364029712bd54fc9f97e7a2c1af0a9e7b381))
* **API Key Modal:** heading,label and downloadlink ([#6298](https://github.com/carbon-design-system/ibm-products/issues/6298)) ([68cb175](https://github.com/carbon-design-system/ibm-products/commit/68cb17576b7647759e68bd29d543c40c2e205e87))
* **APIKeyModal:** focus issue inside onBlue default behaviour ([#6347](https://github.com/carbon-design-system/ibm-products/issues/6347)) ([e5a66ce](https://github.com/carbon-design-system/ibm-products/commit/e5a66ce58bcf5f671365f26adf47993a70dd00d1))
* broken coachmark accessibility tests and avt ([#6398](https://github.com/carbon-design-system/ibm-products/issues/6398)) ([1fe4d81](https://github.com/carbon-design-system/ibm-products/commit/1fe4d815100c0dbaf6b7685f20dd0a4ccfac4bb9))
* **Conditionbuilder:** add await for accessibility test ([#5794](https://github.com/carbon-design-system/ibm-products/issues/5794)) ([0d86010](https://github.com/carbon-design-system/ibm-products/commit/0d860101791e8587f8d1688348aae8438c4d0fc9))
* **ConditionBuilder:** correct role for NON HIERARCHICAL_VARIANT ([#6117](https://github.com/carbon-design-system/ibm-products/issues/6117)) ([6c7823e](https://github.com/carbon-design-system/ibm-products/commit/6c7823ed1405d0dfa6ef51cac89e0373f6763ef0))
* **conditionBuilder:** release review changes1 ([#6133](https://github.com/carbon-design-system/ibm-products/issues/6133)) ([d3f08bc](https://github.com/carbon-design-system/ibm-products/commit/d3f08bcd0b479a84e69fc29dfe03a931618168a7))
* **create-full-page-step:** update hasFieldSet type ([#5876](https://github.com/carbon-design-system/ibm-products/issues/5876)) ([54afdf6](https://github.com/carbon-design-system/ibm-products/commit/54afdf6f31b60e87a21949a69e01ec94bbdc2b79))
* **CreateFullPage:** breadcrumb tooltip  visibility issue ([#6064](https://github.com/carbon-design-system/ibm-products/issues/6064)) ([03eadd2](https://github.com/carbon-design-system/ibm-products/commit/03eadd20c856a18121c5cb516fd49cd2ddc87b6a))
* **CreateFullPage:** breadcrumbs should be array ([#6058](https://github.com/carbon-design-system/ibm-products/issues/6058)) ([f076047](https://github.com/carbon-design-system/ibm-products/commit/f076047b593235b01b9c4666194c080e0b4a3b4e)), closes [#5707](https://github.com/carbon-design-system/ibm-products/issues/5707)
* **createfullpagestep:** hasFieldset and fieldsetLegendText types ([#6057](https://github.com/carbon-design-system/ibm-products/issues/6057)) ([b5db933](https://github.com/carbon-design-system/ibm-products/commit/b5db933dc668b451451736dc61fc18d35ba38ec5)), closes [#4512](https://github.com/carbon-design-system/ibm-products/issues/4512)
* **CreateTearsheet:** add custom button ([#5666](https://github.com/carbon-design-system/ibm-products/issues/5666)) ([d5f9538](https://github.com/carbon-design-system/ibm-products/commit/d5f9538902233075e38a60abf70efc52838f5804))
* csp errors on 2 illustrations ([#6202](https://github.com/carbon-design-system/ibm-products/issues/6202)) ([ad8c2d8](https://github.com/carbon-design-system/ibm-products/commit/ad8c2d84b231e9a4a5243cbfafc618fdbb63aace))
* data spreadsheet object drag drop ([#5800](https://github.com/carbon-design-system/ibm-products/issues/5800)) ([25e95ba](https://github.com/carbon-design-system/ibm-products/commit/25e95bab041d69b28cc8e2a1c15ddd78ea4ab311))
* datagrid typescript declarations ([#6122](https://github.com/carbon-design-system/ibm-products/issues/6122)) ([977e279](https://github.com/carbon-design-system/ibm-products/commit/977e279608be3d7151a4f6b58d7006dfbdd7fec3)), closes [#5257](https://github.com/carbon-design-system/ibm-products/issues/5257) [#6115](https://github.com/carbon-design-system/ibm-products/issues/6115)
* **Datagrid:** add support for autoAlign in row resize popover ([#6289](https://github.com/carbon-design-system/ibm-products/issues/6289)) ([17aeb86](https://github.com/carbon-design-system/ibm-products/commit/17aeb86bc2877974fa398b8563f7999d9c3cbce3))
* **datagrid:** batch no longer updates filter tag ([#6031](https://github.com/carbon-design-system/ibm-products/issues/6031)) ([11c1554](https://github.com/carbon-design-system/ibm-products/commit/11c1554ba92037f559862ad9c83cfdf048074659))
* **Datagrid:** clickable row retain focus after sidepanel closes ([#5952](https://github.com/carbon-design-system/ibm-products/issues/5952)) ([0df9085](https://github.com/carbon-design-system/ibm-products/commit/0df908523eab166b8bb63731f60a727ef846e41f))
* **Datagrid:** csp violation ([#5831](https://github.com/carbon-design-system/ibm-products/issues/5831)) ([73a9824](https://github.com/carbon-design-system/ibm-products/commit/73a98242150e421a7c414bf7743f453a2234caba))
* **datagrid:** customise column tearsheet update issue with new columns ([#5953](https://github.com/carbon-design-system/ibm-products/issues/5953)) ([7ab472a](https://github.com/carbon-design-system/ibm-products/commit/7ab472a22d78b07b900513f0b1a0ddce8b7db2f7))
* **DataGrid:** disable save button on customise column ([#6026](https://github.com/carbon-design-system/ibm-products/issues/6026)) ([2b32f0f](https://github.com/carbon-design-system/ibm-products/commit/2b32f0fa54034d347438347e69dfd865c1248f9f))
* **Datagrid:** enabled spacer column conditionally ([#5920](https://github.com/carbon-design-system/ibm-products/issues/5920)) ([9bd307e](https://github.com/carbon-design-system/ibm-products/commit/9bd307e4836d986383a0464e799834712f3904e0))
* **datagrid:** fixes multiselect for instant update bug ([#5970](https://github.com/carbon-design-system/ibm-products/issues/5970)) ([330e902](https://github.com/carbon-design-system/ibm-products/commit/330e902c94cf3c8720ddb4360c1ae313c12f756e))
* **dataGrid:** focus loss on radio select ([#6073](https://github.com/carbon-design-system/ibm-products/issues/6073)) ([127824b](https://github.com/carbon-design-system/ibm-products/commit/127824b9dcdb9847a58940305bb06c35565c720c))
* **dataGrid:** header scroll issues ([#6135](https://github.com/carbon-design-system/ibm-products/issues/6135)) ([9d60c0c](https://github.com/carbon-design-system/ibm-products/commit/9d60c0cd0f0ab98ba87915eb50a9de2a55dff5a1))
* **datagrid:** hidden columns included in search results ([#5989](https://github.com/carbon-design-system/ibm-products/issues/5989)) ([189f452](https://github.com/carbon-design-system/ibm-products/commit/189f4522187981788b0eb431b89f8b6e89eecd47))
* **Datagrid:** remove redundant aria disabled ([#6103](https://github.com/carbon-design-system/ibm-products/issues/6103)) ([5b58d50](https://github.com/carbon-design-system/ibm-products/commit/5b58d506a39b3d625e169004e1385ae9cfcc6985))
* **Datagrid:** remove unused span with inputProps ([#5915](https://github.com/carbon-design-system/ibm-products/issues/5915)) ([517e4f3](https://github.com/carbon-design-system/ibm-products/commit/517e4f36631cf1cc81d6f21fd25a83b3c65da540))
* **Datagrid:** resolve CSP in subcomponents ([#6229](https://github.com/carbon-design-system/ibm-products/issues/6229)) ([95c6489](https://github.com/carbon-design-system/ibm-products/commit/95c6489e30e5e20e344eff958e481ee22be9d465))
* **Datagrid:** return null for older react versions ([#6003](https://github.com/carbon-design-system/ibm-products/issues/6003)) ([6938654](https://github.com/carbon-design-system/ibm-products/commit/6938654a3ec57ea63f69c4390ffa5a290c01d886))
* **DataGrid:** row size change issues with virtual scrolling enabled ([#5895](https://github.com/carbon-design-system/ibm-products/issues/5895)) ([a297e8a](https://github.com/carbon-design-system/ibm-products/commit/a297e8a1dc67e8017083452c79b5162eaf282c99))
* **Datagrid:** select all checkbox to select current page ([#5933](https://github.com/carbon-design-system/ibm-products/issues/5933)) ([602f85d](https://github.com/carbon-design-system/ibm-products/commit/602f85d0a3afd507b31157df27091fc94e60bf27))
* **Datagrid:** select all row count updated to exclude disabled rows ([#6085](https://github.com/carbon-design-system/ibm-products/issues/6085)) ([c7064de](https://github.com/carbon-design-system/ibm-products/commit/c7064de5be480840775039e2e4bdad00fbf8d4ce))
* **datagrid:** selectall selects disabled rows ([#6008](https://github.com/carbon-design-system/ibm-products/issues/6008)) ([01d973f](https://github.com/carbon-design-system/ibm-products/commit/01d973f95256ee174e59c902e4c46ddc4781b13f))
* **Datagrid:** skip await  getAsyncSubRows when not defined ([#6028](https://github.com/carbon-design-system/ibm-products/issues/6028)) ([7390b55](https://github.com/carbon-design-system/ibm-products/commit/7390b55425aaf1ceff75056bcb81e2d09d61c118))
* **datagrid:** tooltip missing in Customize Columns modal ([#6036](https://github.com/carbon-design-system/ibm-products/issues/6036)) ([15ec2a5](https://github.com/carbon-design-system/ibm-products/commit/15ec2a5277c9ef1ba1b972b57d050e4af7da2766))
* **datagrid:** unique name attribute for row settings radio buttons ([#6009](https://github.com/carbon-design-system/ibm-products/issues/6009)) ([618cc84](https://github.com/carbon-design-system/ibm-products/commit/618cc84a372301571df132a21a06051c8d35a33a))
* **datagrid:** use same empty array every time ([#5999](https://github.com/carbon-design-system/ibm-products/issues/5999)) ([e6ce08b](https://github.com/carbon-design-system/ibm-products/commit/e6ce08b236acf9f7360e01b2ebb5e5a8568afc9c)), closes [#5998](https://github.com/carbon-design-system/ibm-products/issues/5998)
* **Datagrid:** useflexresize infinite redraw ([#6226](https://github.com/carbon-design-system/ibm-products/issues/6226)) ([8030367](https://github.com/carbon-design-system/ibm-products/commit/8030367c4fe90f9ff84db06935553a289518c2e8)), closes [#5920](https://github.com/carbon-design-system/ibm-products/issues/5920) [#5646](https://github.com/carbon-design-system/ibm-products/issues/5646)
* **Datagrid:** width logic for useSortableColumns vs useActionsColumn ([#6029](https://github.com/carbon-design-system/ibm-products/issues/6029)) ([66f9eee](https://github.com/carbon-design-system/ibm-products/commit/66f9eeeb8df559b3f7cc98989853cce3e85f5852))
* **EditInPlace:** focus and style issue ([#6146](https://github.com/carbon-design-system/ibm-products/issues/6146)) ([831a0bc](https://github.com/carbon-design-system/ibm-products/commit/831a0bc7da65e65c09228cf2b292cbb879484d3a))
* **EditInPlace:** removes focus when pressing esc or enter key ([#5943](https://github.com/carbon-design-system/ibm-products/issues/5943)) ([5eff024](https://github.com/carbon-design-system/ibm-products/commit/5eff0243b65123fb39c801194a1b1a8bb9889240))
* **Export Modal:** Focus moves to parent page ([#6077](https://github.com/carbon-design-system/ibm-products/issues/6077)) ([ef4bfa8](https://github.com/carbon-design-system/ibm-products/commit/ef4bfa87d454eba9ce8b4cb83a464e95d66a189e))
* **ExportModal:** focus return to trigger button ([#6116](https://github.com/carbon-design-system/ibm-products/issues/6116)) ([bbc770e](https://github.com/carbon-design-system/ibm-products/commit/bbc770e8fc2415c9dd898ead57bdc332e4fdf339))
* **ExportModal:** screen reader indentifies hidden controls ([#6079](https://github.com/carbon-design-system/ibm-products/issues/6079)) ([dd7564d](https://github.com/carbon-design-system/ibm-products/commit/dd7564d02dcad68052555eb5b2bf543b4a901992))
* **ExportModal:** update status message ([#6080](https://github.com/carbon-design-system/ibm-products/issues/6080)) ([ec3dead](https://github.com/carbon-design-system/ibm-products/commit/ec3dead1b2dd6c727e09bcd0356d567721d5209f))
* first step logic enhancement for CreateTearsheet ([#5884](https://github.com/carbon-design-system/ibm-products/issues/5884)) ([4f3b70f](https://github.com/carbon-design-system/ibm-products/commit/4f3b70f93d43a94c50b8eea77b5960f30b59c403))
* **getstartedcard:** disable vairant issue in JAWS ([#5886](https://github.com/carbon-design-system/ibm-products/issues/5886)) ([515d4c0](https://github.com/carbon-design-system/ibm-products/commit/515d4c0c89f8fe70539946072e9397d297b0faac))
* **InlineTip:** added optional ? flag on media ([#6137](https://github.com/carbon-design-system/ibm-products/issues/6137)) ([978f3e6](https://github.com/carbon-design-system/ibm-products/commit/978f3e65fff94f6399714fb921e8ef2208a1ec51))
* nofification panel keyboard close focus ([#6113](https://github.com/carbon-design-system/ibm-products/issues/6113)) ([752739b](https://github.com/carbon-design-system/ibm-products/commit/752739bde31c3dcb5de1ff2702167b7a838350dd))
* **NotificationPanel:** add missing role ([#5810](https://github.com/carbon-design-system/ibm-products/issues/5810)) ([bf17410](https://github.com/carbon-design-system/ibm-products/commit/bf1741045997b784c98068c618260dfbc7a79dc6))
* **NotificationPanel:** focus return to trigger on closing notification panel ([#6090](https://github.com/carbon-design-system/ibm-products/issues/6090)) ([6dd626a](https://github.com/carbon-design-system/ibm-products/commit/6dd626ac445a255ca9e7c64eb851c11dbb0117f7))
* **onboardingComponents:** csp voilation ([#6228](https://github.com/carbon-design-system/ibm-products/issues/6228)) ([6a848b7](https://github.com/carbon-design-system/ibm-products/commit/6a848b7150db52af5891e21066c273b4f9d2d598))
* **optionstile:** ontoggle should not be required ([#6056](https://github.com/carbon-design-system/ibm-products/issues/6056)) ([af6cf14](https://github.com/carbon-design-system/ibm-products/commit/af6cf147f759f344173baf3350095c319398fe2d)), closes [#4281](https://github.com/carbon-design-system/ibm-products/issues/4281)
* pageheader gap ([#6004](https://github.com/carbon-design-system/ibm-products/issues/6004)) ([97bf3ac](https://github.com/carbon-design-system/ibm-products/commit/97bf3acf41b1ae35875c634cad3315ac5c3d2936))
* **PageHeader:** change type import ([#6368](https://github.com/carbon-design-system/ibm-products/issues/6368)) ([d653f42](https://github.com/carbon-design-system/ibm-products/commit/d653f42bc06126cb35610a4d85d17655775fc374))
* **pageheader:** compensate the width of the overflow menu ([#5929](https://github.com/carbon-design-system/ibm-products/issues/5929)) ([baf0ec2](https://github.com/carbon-design-system/ibm-products/commit/baf0ec231c0c343265efbf74b69a9d38db085dd2))
* **Pageheader:** scrollable headers are not tabbable ([#6145](https://github.com/carbon-design-system/ibm-products/issues/6145)) ([ed578ec](https://github.com/carbon-design-system/ibm-products/commit/ed578ec0d45dcd72a7c96fd1e8370d4a67019ec6))
* **ProductiveCard:** makes graph screen readable, story only. ([#5883](https://github.com/carbon-design-system/ibm-products/issues/5883)) ([a2db976](https://github.com/carbon-design-system/ibm-products/commit/a2db976c1609df5fd83459e5137e42d3a356ca5d))
* remove ellipsis from EditInPlace ([#6098](https://github.com/carbon-design-system/ibm-products/issues/6098)) ([0b40cce](https://github.com/carbon-design-system/ibm-products/commit/0b40cce8451abd0e509a6b16490fff862496b414))
* remove title from datagrid expander ([#6200](https://github.com/carbon-design-system/ibm-products/issues/6200)) ([e7e025e](https://github.com/carbon-design-system/ibm-products/commit/e7e025e034fdcbc18f645145031f56ed07e6cced))
* remove unnecessary props in feature flag tests ([#6342](https://github.com/carbon-design-system/ibm-products/issues/6342)) ([62f3369](https://github.com/carbon-design-system/ibm-products/commit/62f3369fd4431bf0ecd4156530879489899fa8de))
* Resolve all typescript errors ([#6013](https://github.com/carbon-design-system/ibm-products/issues/6013)) ([e87db88](https://github.com/carbon-design-system/ibm-products/commit/e87db88a5267e2d1bf4703666c86a1b052191ad2))
* reword props in card stories ([#5871](https://github.com/carbon-design-system/ibm-products/issues/5871)) ([df80f00](https://github.com/carbon-design-system/ibm-products/commit/df80f0029af2c2ec6d7c53b66d69dfc007c1f446))
* role main removed from components ([#6006](https://github.com/carbon-design-system/ibm-products/issues/6006)) ([b334a51](https://github.com/carbon-design-system/ibm-products/commit/b334a51c4aa1f3bae26554a9e0b1e65b663b0eed))
* **sidepanel:** button text change ([#5907](https://github.com/carbon-design-system/ibm-products/issues/5907)) ([f701002](https://github.com/carbon-design-system/ibm-products/commit/f7010028dbedae7178244b4123a3b0bc485efa70))
* **SidePanel:** resolve focus wrap issue when first element is disabled ([#5991](https://github.com/carbon-design-system/ibm-products/issues/5991)) ([426f588](https://github.com/carbon-design-system/ibm-products/commit/426f588dd8351783e2cad24bde4e2a5e36c64ae7))
* **SidePanel:** style issue with multi select ([#6123](https://github.com/carbon-design-system/ibm-products/issues/6123)) ([feb6a99](https://github.com/carbon-design-system/ibm-products/commit/feb6a993cb0971442cca80f4c7c86d90eede0bbf))
* **tagoverflow:** incorrect type for filter prop ([#6000](https://github.com/carbon-design-system/ibm-products/issues/6000)) ([4134043](https://github.com/carbon-design-system/ibm-products/commit/41340439759927a870a335b3dd5dd971e8f44fcb))
* **TagOverflow:** use operational tag ([#6132](https://github.com/carbon-design-system/ibm-products/issues/6132)) ([791cbec](https://github.com/carbon-design-system/ibm-products/commit/791cbecb2319ce832c1a6341c0a8fbf16b76a3e0))
* **TagSet:** fix string formatting ([#5880](https://github.com/carbon-design-system/ibm-products/issues/5880)) ([9339559](https://github.com/carbon-design-system/ibm-products/commit/93395596b529fb2e1bb7591e8d4792f1ff1de7ff))
* **TagSet:** modal gradient ([#4478](https://github.com/carbon-design-system/ibm-products/issues/4478)) ([459109d](https://github.com/carbon-design-system/ibm-products/commit/459109d08ca6baf6a66954dd6fa49360dc553dc6))
* **tagset:** multiline prop broken ([#6027](https://github.com/carbon-design-system/ibm-products/issues/6027)) ([dff3d68](https://github.com/carbon-design-system/ibm-products/commit/dff3d68dcdc6801c58d1299e4ffa91b2578e53a4))
* **tagset:** updates props ([#5962](https://github.com/carbon-design-system/ibm-products/issues/5962)) ([cf7c88c](https://github.com/carbon-design-system/ibm-products/commit/cf7c88c293fa05406837afe68d9775d39998818c))
* tearsheet with nav accessibility ([#5971](https://github.com/carbon-design-system/ibm-products/issues/5971)) ([d2aeeb2](https://github.com/carbon-design-system/ibm-products/commit/d2aeeb2b8e226f1da45bb8fd8ca45584269574d8))
* **Tearsheet:** add missing declaration for headerActions prop ([#6114](https://github.com/carbon-design-system/ibm-products/issues/6114)) ([d1dafa1](https://github.com/carbon-design-system/ibm-products/commit/d1dafa1e94472eb64e769ccd358e5355837fa9a5)), closes [#546](https://github.com/carbon-design-system/ibm-products/issues/546)
* **Tearsheet:** changed actions prop to optional ([#5984](https://github.com/carbon-design-system/ibm-products/issues/5984)) ([068a7df](https://github.com/carbon-design-system/ibm-products/commit/068a7df53265e71193ef583145c69d17b3f76535))
* **tearsheet:** Firefox focuses Tearsheet content div with scroll ([#5973](https://github.com/carbon-design-system/ibm-products/issues/5973)) ([19e319b](https://github.com/carbon-design-system/ibm-products/commit/19e319baff3635fb2d1a54d22cfaa5dfc8e95e23))
* **tearsheet:** focus without sentinels ([#5882](https://github.com/carbon-design-system/ibm-products/issues/5882)) ([f362806](https://github.com/carbon-design-system/ibm-products/commit/f3628062a6e65ea5963353a79da1734db6bc9d80))
* **tearsheet:** implement a workaround ([#5960](https://github.com/carbon-design-system/ibm-products/issues/5960)) ([c7d1ef3](https://github.com/carbon-design-system/ibm-products/commit/c7d1ef37a22f3820dd22ad97cd247c169fdc97b4))
* **Tearsheet:** resolve focus issue ([#6217](https://github.com/carbon-design-system/ibm-products/issues/6217)) ([dc53a09](https://github.com/carbon-design-system/ibm-products/commit/dc53a099baba3450d769b9e4581c524673529fa0))
* **Tearsheet:** update portalTarget type ([#5899](https://github.com/carbon-design-system/ibm-products/issues/5899)) ([d7aa99e](https://github.com/carbon-design-system/ibm-products/commit/d7aa99ed058d3cd55302bc6fe5c169e5a120d64e))
* these at imports should not exist ([#6359](https://github.com/carbon-design-system/ibm-products/issues/6359)) ([3ea78f2](https://github.com/carbon-design-system/ibm-products/commit/3ea78f2cefc632bfec990026418a4851b3f582f0))
* **ToolbarButton:** deprecate iconDescription and use label instead ([#5893](https://github.com/carbon-design-system/ibm-products/issues/5893)) ([b968386](https://github.com/carbon-design-system/ibm-products/commit/b968386090b0934f770c66a6eab08f4af0054ee4))
* update Carbon 11 compatible versions to latest ([#6054](https://github.com/carbon-design-system/ibm-products/issues/6054)) ([0ac7669](https://github.com/carbon-design-system/ibm-products/commit/0ac76692a6eeb85655ca64ca9189297708e26bd9))
* update to Carbon 11 compatible versions to latest ([#5987](https://github.com/carbon-design-system/ibm-products/issues/5987)) ([173e6c6](https://github.com/carbon-design-system/ibm-products/commit/173e6c6455a4fe619d56148ab432926bc6c640a4))
* update to Carbon 11 compatible versions to latest ([#6214](https://github.com/carbon-design-system/ibm-products/issues/6214)) ([911c341](https://github.com/carbon-design-system/ibm-products/commit/911c341d258b410ff2109ecb39293c2670796a0e))
* update to Carbon 11 compatible versions to latest ([#6343](https://github.com/carbon-design-system/ibm-products/issues/6343)) ([71a201a](https://github.com/carbon-design-system/ibm-products/commit/71a201a50fbebe76699ffb0d7df1d2d998370256))
* update toHaveNoAxeViolations and remove skips ([#5955](https://github.com/carbon-design-system/ibm-products/issues/5955)) ([694128b](https://github.com/carbon-design-system/ibm-products/commit/694128bb707a2400d67e6618af3fea3f3ffba86f))
* **useFocus:** change delay to 1ms ([#5950](https://github.com/carbon-design-system/ibm-products/issues/5950)) ([5883cd3](https://github.com/carbon-design-system/ibm-products/commit/5883cd3a14039ab7ca044b4ab95621bb70ccf68e))
* **UserAvatar:** release review fixes ([#6293](https://github.com/carbon-design-system/ibm-products/issues/6293)) ([eafbba3](https://github.com/carbon-design-system/ibm-products/commit/eafbba33b6c9630457eeb0c6d86d030ee699940f))


### Features

* **`ibm-products-web-components`:** setup new web component package and storybook ([#6148](https://github.com/carbon-design-system/ibm-products/issues/6148)) ([6962187](https://github.com/carbon-design-system/ibm-products/commit/6962187634ba4317c5a4dcbf495978a176efcb79))
* adding the ability to disable modals for TagSet component ([#5753](https://github.com/carbon-design-system/ibm-products/issues/5753)) ([29e960c](https://github.com/carbon-design-system/ibm-products/commit/29e960c858d2c58d46c86e9ea638a351d5fddd76))
* **cards:** renames slug to aiLabel ([#6167](https://github.com/carbon-design-system/ibm-products/issues/6167)) ([5b94ed8](https://github.com/carbon-design-system/ibm-products/commit/5b94ed8d01638db747277f104d9f7dd9ab2e0eb3))
* **carousel:** adds test coverage ([#6355](https://github.com/carbon-design-system/ibm-products/issues/6355)) ([32aa2b2](https://github.com/carbon-design-system/ibm-products/commit/32aa2b24dfa792f875002f882c65533e06309d64))
* **ConditionBuilder:** enhancing the conditional operators section that manages the primary logic flow ([#5921](https://github.com/carbon-design-system/ibm-products/issues/5921)) ([91733fb](https://github.com/carbon-design-system/ibm-products/commit/91733fb43157eab26c885f0652adaf9276f372d4))
* **ConditionBuilder:** option to default enable with initial state ([#6007](https://github.com/carbon-design-system/ibm-products/issues/6007)) ([3b2b91c](https://github.com/carbon-design-system/ibm-products/commit/3b2b91c63157d748425c1fa85ed70411e2c7e018))
* **Conditionbuilder:** renaming both variants to Hierarchical and Non-Hierarchical ([#5847](https://github.com/carbon-design-system/ibm-products/issues/5847)) ([791e2b3](https://github.com/carbon-design-system/ibm-products/commit/791e2b31549f3f4480cac2fc142e550b5e12ea31))
* **datagrid:** adds radio filter ([#5877](https://github.com/carbon-design-system/ibm-products/issues/5877)) ([12667e8](https://github.com/carbon-design-system/ibm-products/commit/12667e8387afc97c8a81a791c72f7ad323d7be6b))
* **Datagrid:** call onClearFilters when clearing filters from tag summary ([#5892](https://github.com/carbon-design-system/ibm-products/issues/5892)) ([791618a](https://github.com/carbon-design-system/ibm-products/commit/791618a11618f120b15444dde994da65576a79ff))
* **datagrids:** Add custom batch actions display min ([#5776](https://github.com/carbon-design-system/ibm-products/issues/5776)) ([485e8bc](https://github.com/carbon-design-system/ibm-products/commit/485e8bcac3193e56d65721076160944b4e126256))
* **Datagrid:** slug to aiLabel renaming ([#6151](https://github.com/carbon-design-system/ibm-products/issues/6151)) ([b0b3c1c](https://github.com/carbon-design-system/ibm-products/commit/b0b3c1cf40199e7458584ea1d9093224264e1f4c))
* **empty-states:** exports types ([#6299](https://github.com/carbon-design-system/ibm-products/issues/6299)) ([436f50d](https://github.com/carbon-design-system/ibm-products/commit/436f50d29f6391593050740803bf14ef01b04335))
* expose onChange and onPrevious for CreateFullPage ([#6271](https://github.com/carbon-design-system/ibm-products/issues/6271)) ([5bd953d](https://github.com/carbon-design-system/ibm-products/commit/5bd953de33d856b791692b9302a424dc6d10d6a1))
* **tagset:** support for size on overflow tag ([#6065](https://github.com/carbon-design-system/ibm-products/issues/6065)) ([ba29c09](https://github.com/carbon-design-system/ibm-products/commit/ba29c0950f1fcc7388e58523e94a32abd588d59d))
* **tag:** updates tags to use DismissibleTag ([#6112](https://github.com/carbon-design-system/ibm-products/issues/6112)) ([18b47c7](https://github.com/carbon-design-system/ibm-products/commit/18b47c72ff381db130897da6a2d1f0aa86fd6d85))
* **Tearsheet:** Slug to aiLabel ([#6169](https://github.com/carbon-design-system/ibm-products/issues/6169)) ([5c0f2ad](https://github.com/carbon-design-system/ibm-products/commit/5c0f2adf55e6c9c7f081dab72ab711b611593476))





# [2.54.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.48.0-rc.0...@carbon/ibm-products@2.54.0-rc.0) (2024-11-11)


### Bug Fixes

* **AboutModal:** implement useFocus() ([#5981](https://github.com/carbon-design-system/ibm-products/issues/5981)) ([e37beea](https://github.com/carbon-design-system/ibm-products/commit/e37beeafa1f592de3c9a38930487ed7cf4e8239b))
* add floating ui to tagset ([#6005](https://github.com/carbon-design-system/ibm-products/issues/6005)) ([fac868b](https://github.com/carbon-design-system/ibm-products/commit/fac868b0bb3382aac79ab2780480d58e901da517))
* add primaryButtonDisabled prop to ProductiveCard ([#6100](https://github.com/carbon-design-system/ibm-products/issues/6100)) ([7d17364](https://github.com/carbon-design-system/ibm-products/commit/7d17364029712bd54fc9f97e7a2c1af0a9e7b381))
* **API Key Modal:** heading,label and downloadlink ([#6298](https://github.com/carbon-design-system/ibm-products/issues/6298)) ([68cb175](https://github.com/carbon-design-system/ibm-products/commit/68cb17576b7647759e68bd29d543c40c2e205e87))
* **APIKeyModal:** focus issue inside onBlue default behaviour ([#6347](https://github.com/carbon-design-system/ibm-products/issues/6347)) ([e5a66ce](https://github.com/carbon-design-system/ibm-products/commit/e5a66ce58bcf5f671365f26adf47993a70dd00d1))
* broken coachmark accessibility tests and avt ([#6398](https://github.com/carbon-design-system/ibm-products/issues/6398)) ([1fe4d81](https://github.com/carbon-design-system/ibm-products/commit/1fe4d815100c0dbaf6b7685f20dd0a4ccfac4bb9))
* **Conditionbuilder:** add await for accessibility test ([#5794](https://github.com/carbon-design-system/ibm-products/issues/5794)) ([0d86010](https://github.com/carbon-design-system/ibm-products/commit/0d860101791e8587f8d1688348aae8438c4d0fc9))
* **ConditionBuilder:** correct role for NON HIERARCHICAL_VARIANT ([#6117](https://github.com/carbon-design-system/ibm-products/issues/6117)) ([6c7823e](https://github.com/carbon-design-system/ibm-products/commit/6c7823ed1405d0dfa6ef51cac89e0373f6763ef0))
* **conditionBuilder:** release review changes1 ([#6133](https://github.com/carbon-design-system/ibm-products/issues/6133)) ([d3f08bc](https://github.com/carbon-design-system/ibm-products/commit/d3f08bcd0b479a84e69fc29dfe03a931618168a7))
* **create-full-page-step:** update hasFieldSet type ([#5876](https://github.com/carbon-design-system/ibm-products/issues/5876)) ([54afdf6](https://github.com/carbon-design-system/ibm-products/commit/54afdf6f31b60e87a21949a69e01ec94bbdc2b79))
* **CreateFullPage:** breadcrumb tooltip  visibility issue ([#6064](https://github.com/carbon-design-system/ibm-products/issues/6064)) ([03eadd2](https://github.com/carbon-design-system/ibm-products/commit/03eadd20c856a18121c5cb516fd49cd2ddc87b6a))
* **CreateFullPage:** breadcrumbs should be array ([#6058](https://github.com/carbon-design-system/ibm-products/issues/6058)) ([f076047](https://github.com/carbon-design-system/ibm-products/commit/f076047b593235b01b9c4666194c080e0b4a3b4e)), closes [#5707](https://github.com/carbon-design-system/ibm-products/issues/5707)
* **createfullpagestep:** hasFieldset and fieldsetLegendText types ([#6057](https://github.com/carbon-design-system/ibm-products/issues/6057)) ([b5db933](https://github.com/carbon-design-system/ibm-products/commit/b5db933dc668b451451736dc61fc18d35ba38ec5)), closes [#4512](https://github.com/carbon-design-system/ibm-products/issues/4512)
* **CreateTearsheet:** add custom button ([#5666](https://github.com/carbon-design-system/ibm-products/issues/5666)) ([d5f9538](https://github.com/carbon-design-system/ibm-products/commit/d5f9538902233075e38a60abf70efc52838f5804))
* csp errors on 2 illustrations ([#6202](https://github.com/carbon-design-system/ibm-products/issues/6202)) ([ad8c2d8](https://github.com/carbon-design-system/ibm-products/commit/ad8c2d84b231e9a4a5243cbfafc618fdbb63aace))
* data spreadsheet object drag drop ([#5800](https://github.com/carbon-design-system/ibm-products/issues/5800)) ([25e95ba](https://github.com/carbon-design-system/ibm-products/commit/25e95bab041d69b28cc8e2a1c15ddd78ea4ab311))
* datagrid typescript declarations ([#6122](https://github.com/carbon-design-system/ibm-products/issues/6122)) ([977e279](https://github.com/carbon-design-system/ibm-products/commit/977e279608be3d7151a4f6b58d7006dfbdd7fec3)), closes [#5257](https://github.com/carbon-design-system/ibm-products/issues/5257) [#6115](https://github.com/carbon-design-system/ibm-products/issues/6115)
* **Datagrid:** add support for autoAlign in row resize popover ([#6289](https://github.com/carbon-design-system/ibm-products/issues/6289)) ([17aeb86](https://github.com/carbon-design-system/ibm-products/commit/17aeb86bc2877974fa398b8563f7999d9c3cbce3))
* **datagrid:** batch no longer updates filter tag ([#6031](https://github.com/carbon-design-system/ibm-products/issues/6031)) ([11c1554](https://github.com/carbon-design-system/ibm-products/commit/11c1554ba92037f559862ad9c83cfdf048074659))
* **Datagrid:** clickable row retain focus after sidepanel closes ([#5952](https://github.com/carbon-design-system/ibm-products/issues/5952)) ([0df9085](https://github.com/carbon-design-system/ibm-products/commit/0df908523eab166b8bb63731f60a727ef846e41f))
* **Datagrid:** csp violation ([#5831](https://github.com/carbon-design-system/ibm-products/issues/5831)) ([73a9824](https://github.com/carbon-design-system/ibm-products/commit/73a98242150e421a7c414bf7743f453a2234caba))
* **datagrid:** customise column tearsheet update issue with new columns ([#5953](https://github.com/carbon-design-system/ibm-products/issues/5953)) ([7ab472a](https://github.com/carbon-design-system/ibm-products/commit/7ab472a22d78b07b900513f0b1a0ddce8b7db2f7))
* **DataGrid:** disable save button on customise column ([#6026](https://github.com/carbon-design-system/ibm-products/issues/6026)) ([2b32f0f](https://github.com/carbon-design-system/ibm-products/commit/2b32f0fa54034d347438347e69dfd865c1248f9f))
* **Datagrid:** enabled spacer column conditionally ([#5920](https://github.com/carbon-design-system/ibm-products/issues/5920)) ([9bd307e](https://github.com/carbon-design-system/ibm-products/commit/9bd307e4836d986383a0464e799834712f3904e0))
* **datagrid:** fixes multiselect for instant update bug ([#5970](https://github.com/carbon-design-system/ibm-products/issues/5970)) ([330e902](https://github.com/carbon-design-system/ibm-products/commit/330e902c94cf3c8720ddb4360c1ae313c12f756e))
* **dataGrid:** focus loss on radio select ([#6073](https://github.com/carbon-design-system/ibm-products/issues/6073)) ([127824b](https://github.com/carbon-design-system/ibm-products/commit/127824b9dcdb9847a58940305bb06c35565c720c))
* **dataGrid:** header scroll issues ([#6135](https://github.com/carbon-design-system/ibm-products/issues/6135)) ([9d60c0c](https://github.com/carbon-design-system/ibm-products/commit/9d60c0cd0f0ab98ba87915eb50a9de2a55dff5a1))
* **datagrid:** hidden columns included in search results ([#5989](https://github.com/carbon-design-system/ibm-products/issues/5989)) ([189f452](https://github.com/carbon-design-system/ibm-products/commit/189f4522187981788b0eb431b89f8b6e89eecd47))
* **Datagrid:** remove redundant aria disabled ([#6103](https://github.com/carbon-design-system/ibm-products/issues/6103)) ([5b58d50](https://github.com/carbon-design-system/ibm-products/commit/5b58d506a39b3d625e169004e1385ae9cfcc6985))
* **Datagrid:** remove unused span with inputProps ([#5915](https://github.com/carbon-design-system/ibm-products/issues/5915)) ([517e4f3](https://github.com/carbon-design-system/ibm-products/commit/517e4f36631cf1cc81d6f21fd25a83b3c65da540))
* **Datagrid:** resolve CSP in subcomponents ([#6229](https://github.com/carbon-design-system/ibm-products/issues/6229)) ([95c6489](https://github.com/carbon-design-system/ibm-products/commit/95c6489e30e5e20e344eff958e481ee22be9d465))
* **Datagrid:** return null for older react versions ([#6003](https://github.com/carbon-design-system/ibm-products/issues/6003)) ([6938654](https://github.com/carbon-design-system/ibm-products/commit/6938654a3ec57ea63f69c4390ffa5a290c01d886))
* **DataGrid:** row size change issues with virtual scrolling enabled ([#5895](https://github.com/carbon-design-system/ibm-products/issues/5895)) ([a297e8a](https://github.com/carbon-design-system/ibm-products/commit/a297e8a1dc67e8017083452c79b5162eaf282c99))
* **Datagrid:** select all checkbox to select current page ([#5933](https://github.com/carbon-design-system/ibm-products/issues/5933)) ([602f85d](https://github.com/carbon-design-system/ibm-products/commit/602f85d0a3afd507b31157df27091fc94e60bf27))
* **Datagrid:** select all row count updated to exclude disabled rows ([#6085](https://github.com/carbon-design-system/ibm-products/issues/6085)) ([c7064de](https://github.com/carbon-design-system/ibm-products/commit/c7064de5be480840775039e2e4bdad00fbf8d4ce))
* **datagrid:** selectall selects disabled rows ([#6008](https://github.com/carbon-design-system/ibm-products/issues/6008)) ([01d973f](https://github.com/carbon-design-system/ibm-products/commit/01d973f95256ee174e59c902e4c46ddc4781b13f))
* **Datagrid:** skip await  getAsyncSubRows when not defined ([#6028](https://github.com/carbon-design-system/ibm-products/issues/6028)) ([7390b55](https://github.com/carbon-design-system/ibm-products/commit/7390b55425aaf1ceff75056bcb81e2d09d61c118))
* **datagrid:** tooltip missing in Customize Columns modal ([#6036](https://github.com/carbon-design-system/ibm-products/issues/6036)) ([15ec2a5](https://github.com/carbon-design-system/ibm-products/commit/15ec2a5277c9ef1ba1b972b57d050e4af7da2766))
* **datagrid:** unique name attribute for row settings radio buttons ([#6009](https://github.com/carbon-design-system/ibm-products/issues/6009)) ([618cc84](https://github.com/carbon-design-system/ibm-products/commit/618cc84a372301571df132a21a06051c8d35a33a))
* **datagrid:** use same empty array every time ([#5999](https://github.com/carbon-design-system/ibm-products/issues/5999)) ([e6ce08b](https://github.com/carbon-design-system/ibm-products/commit/e6ce08b236acf9f7360e01b2ebb5e5a8568afc9c)), closes [#5998](https://github.com/carbon-design-system/ibm-products/issues/5998)
* **Datagrid:** useflexresize infinite redraw ([#6226](https://github.com/carbon-design-system/ibm-products/issues/6226)) ([8030367](https://github.com/carbon-design-system/ibm-products/commit/8030367c4fe90f9ff84db06935553a289518c2e8)), closes [#5920](https://github.com/carbon-design-system/ibm-products/issues/5920) [#5646](https://github.com/carbon-design-system/ibm-products/issues/5646)
* **Datagrid:** width logic for useSortableColumns vs useActionsColumn ([#6029](https://github.com/carbon-design-system/ibm-products/issues/6029)) ([66f9eee](https://github.com/carbon-design-system/ibm-products/commit/66f9eeeb8df559b3f7cc98989853cce3e85f5852))
* **EditInPlace:** focus and style issue ([#6146](https://github.com/carbon-design-system/ibm-products/issues/6146)) ([831a0bc](https://github.com/carbon-design-system/ibm-products/commit/831a0bc7da65e65c09228cf2b292cbb879484d3a))
* **EditInPlace:** removes focus when pressing esc or enter key ([#5943](https://github.com/carbon-design-system/ibm-products/issues/5943)) ([5eff024](https://github.com/carbon-design-system/ibm-products/commit/5eff0243b65123fb39c801194a1b1a8bb9889240))
* **Export Modal:** Focus moves to parent page ([#6077](https://github.com/carbon-design-system/ibm-products/issues/6077)) ([ef4bfa8](https://github.com/carbon-design-system/ibm-products/commit/ef4bfa87d454eba9ce8b4cb83a464e95d66a189e))
* **ExportModal:** focus return to trigger button ([#6116](https://github.com/carbon-design-system/ibm-products/issues/6116)) ([bbc770e](https://github.com/carbon-design-system/ibm-products/commit/bbc770e8fc2415c9dd898ead57bdc332e4fdf339))
* **ExportModal:** screen reader indentifies hidden controls ([#6079](https://github.com/carbon-design-system/ibm-products/issues/6079)) ([dd7564d](https://github.com/carbon-design-system/ibm-products/commit/dd7564d02dcad68052555eb5b2bf543b4a901992))
* **ExportModal:** update status message ([#6080](https://github.com/carbon-design-system/ibm-products/issues/6080)) ([ec3dead](https://github.com/carbon-design-system/ibm-products/commit/ec3dead1b2dd6c727e09bcd0356d567721d5209f))
* first step logic enhancement for CreateTearsheet ([#5884](https://github.com/carbon-design-system/ibm-products/issues/5884)) ([4f3b70f](https://github.com/carbon-design-system/ibm-products/commit/4f3b70f93d43a94c50b8eea77b5960f30b59c403))
* **getstartedcard:** disable vairant issue in JAWS ([#5886](https://github.com/carbon-design-system/ibm-products/issues/5886)) ([515d4c0](https://github.com/carbon-design-system/ibm-products/commit/515d4c0c89f8fe70539946072e9397d297b0faac))
* **InlineTip:** added optional ? flag on media ([#6137](https://github.com/carbon-design-system/ibm-products/issues/6137)) ([978f3e6](https://github.com/carbon-design-system/ibm-products/commit/978f3e65fff94f6399714fb921e8ef2208a1ec51))
* nofification panel keyboard close focus ([#6113](https://github.com/carbon-design-system/ibm-products/issues/6113)) ([752739b](https://github.com/carbon-design-system/ibm-products/commit/752739bde31c3dcb5de1ff2702167b7a838350dd))
* **NotificationPanel:** add missing role ([#5810](https://github.com/carbon-design-system/ibm-products/issues/5810)) ([bf17410](https://github.com/carbon-design-system/ibm-products/commit/bf1741045997b784c98068c618260dfbc7a79dc6))
* **NotificationPanel:** focus return to trigger on closing notification panel ([#6090](https://github.com/carbon-design-system/ibm-products/issues/6090)) ([6dd626a](https://github.com/carbon-design-system/ibm-products/commit/6dd626ac445a255ca9e7c64eb851c11dbb0117f7))
* **onboardingComponents:** csp voilation ([#6228](https://github.com/carbon-design-system/ibm-products/issues/6228)) ([6a848b7](https://github.com/carbon-design-system/ibm-products/commit/6a848b7150db52af5891e21066c273b4f9d2d598))
* **optionstile:** ontoggle should not be required ([#6056](https://github.com/carbon-design-system/ibm-products/issues/6056)) ([af6cf14](https://github.com/carbon-design-system/ibm-products/commit/af6cf147f759f344173baf3350095c319398fe2d)), closes [#4281](https://github.com/carbon-design-system/ibm-products/issues/4281)
* pageheader gap ([#6004](https://github.com/carbon-design-system/ibm-products/issues/6004)) ([97bf3ac](https://github.com/carbon-design-system/ibm-products/commit/97bf3acf41b1ae35875c634cad3315ac5c3d2936))
* **PageHeader:** change type import ([#6368](https://github.com/carbon-design-system/ibm-products/issues/6368)) ([d653f42](https://github.com/carbon-design-system/ibm-products/commit/d653f42bc06126cb35610a4d85d17655775fc374))
* **pageheader:** compensate the width of the overflow menu ([#5929](https://github.com/carbon-design-system/ibm-products/issues/5929)) ([baf0ec2](https://github.com/carbon-design-system/ibm-products/commit/baf0ec231c0c343265efbf74b69a9d38db085dd2))
* **Pageheader:** scrollable headers are not tabbable ([#6145](https://github.com/carbon-design-system/ibm-products/issues/6145)) ([ed578ec](https://github.com/carbon-design-system/ibm-products/commit/ed578ec0d45dcd72a7c96fd1e8370d4a67019ec6))
* **ProductiveCard:** makes graph screen readable, story only. ([#5883](https://github.com/carbon-design-system/ibm-products/issues/5883)) ([a2db976](https://github.com/carbon-design-system/ibm-products/commit/a2db976c1609df5fd83459e5137e42d3a356ca5d))
* remove ellipsis from EditInPlace ([#6098](https://github.com/carbon-design-system/ibm-products/issues/6098)) ([0b40cce](https://github.com/carbon-design-system/ibm-products/commit/0b40cce8451abd0e509a6b16490fff862496b414))
* remove title from datagrid expander ([#6200](https://github.com/carbon-design-system/ibm-products/issues/6200)) ([e7e025e](https://github.com/carbon-design-system/ibm-products/commit/e7e025e034fdcbc18f645145031f56ed07e6cced))
* remove unnecessary props in feature flag tests ([#6342](https://github.com/carbon-design-system/ibm-products/issues/6342)) ([62f3369](https://github.com/carbon-design-system/ibm-products/commit/62f3369fd4431bf0ecd4156530879489899fa8de))
* Resolve all typescript errors ([#6013](https://github.com/carbon-design-system/ibm-products/issues/6013)) ([e87db88](https://github.com/carbon-design-system/ibm-products/commit/e87db88a5267e2d1bf4703666c86a1b052191ad2))
* reword props in card stories ([#5871](https://github.com/carbon-design-system/ibm-products/issues/5871)) ([df80f00](https://github.com/carbon-design-system/ibm-products/commit/df80f0029af2c2ec6d7c53b66d69dfc007c1f446))
* role main removed from components ([#6006](https://github.com/carbon-design-system/ibm-products/issues/6006)) ([b334a51](https://github.com/carbon-design-system/ibm-products/commit/b334a51c4aa1f3bae26554a9e0b1e65b663b0eed))
* **sidepanel:** button text change ([#5907](https://github.com/carbon-design-system/ibm-products/issues/5907)) ([f701002](https://github.com/carbon-design-system/ibm-products/commit/f7010028dbedae7178244b4123a3b0bc485efa70))
* **SidePanel:** resolve focus wrap issue when first element is disabled ([#5991](https://github.com/carbon-design-system/ibm-products/issues/5991)) ([426f588](https://github.com/carbon-design-system/ibm-products/commit/426f588dd8351783e2cad24bde4e2a5e36c64ae7))
* **SidePanel:** style issue with multi select ([#6123](https://github.com/carbon-design-system/ibm-products/issues/6123)) ([feb6a99](https://github.com/carbon-design-system/ibm-products/commit/feb6a993cb0971442cca80f4c7c86d90eede0bbf))
* **tagoverflow:** incorrect type for filter prop ([#6000](https://github.com/carbon-design-system/ibm-products/issues/6000)) ([4134043](https://github.com/carbon-design-system/ibm-products/commit/41340439759927a870a335b3dd5dd971e8f44fcb))
* **TagOverflow:** use operational tag ([#6132](https://github.com/carbon-design-system/ibm-products/issues/6132)) ([791cbec](https://github.com/carbon-design-system/ibm-products/commit/791cbecb2319ce832c1a6341c0a8fbf16b76a3e0))
* **TagSet:** fix string formatting ([#5880](https://github.com/carbon-design-system/ibm-products/issues/5880)) ([9339559](https://github.com/carbon-design-system/ibm-products/commit/93395596b529fb2e1bb7591e8d4792f1ff1de7ff))
* **TagSet:** modal gradient ([#4478](https://github.com/carbon-design-system/ibm-products/issues/4478)) ([459109d](https://github.com/carbon-design-system/ibm-products/commit/459109d08ca6baf6a66954dd6fa49360dc553dc6))
* **tagset:** multiline prop broken ([#6027](https://github.com/carbon-design-system/ibm-products/issues/6027)) ([dff3d68](https://github.com/carbon-design-system/ibm-products/commit/dff3d68dcdc6801c58d1299e4ffa91b2578e53a4))
* **tagset:** updates props ([#5962](https://github.com/carbon-design-system/ibm-products/issues/5962)) ([cf7c88c](https://github.com/carbon-design-system/ibm-products/commit/cf7c88c293fa05406837afe68d9775d39998818c))
* tearsheet with nav accessibility ([#5971](https://github.com/carbon-design-system/ibm-products/issues/5971)) ([d2aeeb2](https://github.com/carbon-design-system/ibm-products/commit/d2aeeb2b8e226f1da45bb8fd8ca45584269574d8))
* **Tearsheet:** add missing declaration for headerActions prop ([#6114](https://github.com/carbon-design-system/ibm-products/issues/6114)) ([d1dafa1](https://github.com/carbon-design-system/ibm-products/commit/d1dafa1e94472eb64e769ccd358e5355837fa9a5)), closes [#546](https://github.com/carbon-design-system/ibm-products/issues/546)
* **Tearsheet:** changed actions prop to optional ([#5984](https://github.com/carbon-design-system/ibm-products/issues/5984)) ([068a7df](https://github.com/carbon-design-system/ibm-products/commit/068a7df53265e71193ef583145c69d17b3f76535))
* **tearsheet:** Firefox focuses Tearsheet content div with scroll ([#5973](https://github.com/carbon-design-system/ibm-products/issues/5973)) ([19e319b](https://github.com/carbon-design-system/ibm-products/commit/19e319baff3635fb2d1a54d22cfaa5dfc8e95e23))
* **tearsheet:** focus without sentinels ([#5882](https://github.com/carbon-design-system/ibm-products/issues/5882)) ([f362806](https://github.com/carbon-design-system/ibm-products/commit/f3628062a6e65ea5963353a79da1734db6bc9d80))
* **tearsheet:** implement a workaround ([#5960](https://github.com/carbon-design-system/ibm-products/issues/5960)) ([c7d1ef3](https://github.com/carbon-design-system/ibm-products/commit/c7d1ef37a22f3820dd22ad97cd247c169fdc97b4))
* **Tearsheet:** resolve focus issue ([#6217](https://github.com/carbon-design-system/ibm-products/issues/6217)) ([dc53a09](https://github.com/carbon-design-system/ibm-products/commit/dc53a099baba3450d769b9e4581c524673529fa0))
* **Tearsheet:** update portalTarget type ([#5899](https://github.com/carbon-design-system/ibm-products/issues/5899)) ([d7aa99e](https://github.com/carbon-design-system/ibm-products/commit/d7aa99ed058d3cd55302bc6fe5c169e5a120d64e))
* these at imports should not exist ([#6359](https://github.com/carbon-design-system/ibm-products/issues/6359)) ([3ea78f2](https://github.com/carbon-design-system/ibm-products/commit/3ea78f2cefc632bfec990026418a4851b3f582f0))
* **ToolbarButton:** deprecate iconDescription and use label instead ([#5893](https://github.com/carbon-design-system/ibm-products/issues/5893)) ([b968386](https://github.com/carbon-design-system/ibm-products/commit/b968386090b0934f770c66a6eab08f4af0054ee4))
* update Carbon 11 compatible versions to latest ([#6054](https://github.com/carbon-design-system/ibm-products/issues/6054)) ([0ac7669](https://github.com/carbon-design-system/ibm-products/commit/0ac76692a6eeb85655ca64ca9189297708e26bd9))
* update to Carbon 11 compatible versions to latest ([#5987](https://github.com/carbon-design-system/ibm-products/issues/5987)) ([173e6c6](https://github.com/carbon-design-system/ibm-products/commit/173e6c6455a4fe619d56148ab432926bc6c640a4))
* update to Carbon 11 compatible versions to latest ([#6214](https://github.com/carbon-design-system/ibm-products/issues/6214)) ([911c341](https://github.com/carbon-design-system/ibm-products/commit/911c341d258b410ff2109ecb39293c2670796a0e))
* update to Carbon 11 compatible versions to latest ([#6343](https://github.com/carbon-design-system/ibm-products/issues/6343)) ([71a201a](https://github.com/carbon-design-system/ibm-products/commit/71a201a50fbebe76699ffb0d7df1d2d998370256))
* update toHaveNoAxeViolations and remove skips ([#5955](https://github.com/carbon-design-system/ibm-products/issues/5955)) ([694128b](https://github.com/carbon-design-system/ibm-products/commit/694128bb707a2400d67e6618af3fea3f3ffba86f))
* **useFocus:** change delay to 1ms ([#5950](https://github.com/carbon-design-system/ibm-products/issues/5950)) ([5883cd3](https://github.com/carbon-design-system/ibm-products/commit/5883cd3a14039ab7ca044b4ab95621bb70ccf68e))
* **UserAvatar:** release review fixes ([#6293](https://github.com/carbon-design-system/ibm-products/issues/6293)) ([eafbba3](https://github.com/carbon-design-system/ibm-products/commit/eafbba33b6c9630457eeb0c6d86d030ee699940f))


### Features

* **`ibm-products-web-components`:** setup new web component package and storybook ([#6148](https://github.com/carbon-design-system/ibm-products/issues/6148)) ([6962187](https://github.com/carbon-design-system/ibm-products/commit/6962187634ba4317c5a4dcbf495978a176efcb79))
* adding the ability to disable modals for TagSet component ([#5753](https://github.com/carbon-design-system/ibm-products/issues/5753)) ([29e960c](https://github.com/carbon-design-system/ibm-products/commit/29e960c858d2c58d46c86e9ea638a351d5fddd76))
* **cards:** renames slug to aiLabel ([#6167](https://github.com/carbon-design-system/ibm-products/issues/6167)) ([5b94ed8](https://github.com/carbon-design-system/ibm-products/commit/5b94ed8d01638db747277f104d9f7dd9ab2e0eb3))
* **carousel:** adds test coverage ([#6355](https://github.com/carbon-design-system/ibm-products/issues/6355)) ([32aa2b2](https://github.com/carbon-design-system/ibm-products/commit/32aa2b24dfa792f875002f882c65533e06309d64))
* **ConditionBuilder:** enhancing the conditional operators section that manages the primary logic flow ([#5921](https://github.com/carbon-design-system/ibm-products/issues/5921)) ([91733fb](https://github.com/carbon-design-system/ibm-products/commit/91733fb43157eab26c885f0652adaf9276f372d4))
* **ConditionBuilder:** option to default enable with initial state ([#6007](https://github.com/carbon-design-system/ibm-products/issues/6007)) ([3b2b91c](https://github.com/carbon-design-system/ibm-products/commit/3b2b91c63157d748425c1fa85ed70411e2c7e018))
* **Conditionbuilder:** renaming both variants to Hierarchical and Non-Hierarchical ([#5847](https://github.com/carbon-design-system/ibm-products/issues/5847)) ([791e2b3](https://github.com/carbon-design-system/ibm-products/commit/791e2b31549f3f4480cac2fc142e550b5e12ea31))
* **datagrid:** adds radio filter ([#5877](https://github.com/carbon-design-system/ibm-products/issues/5877)) ([12667e8](https://github.com/carbon-design-system/ibm-products/commit/12667e8387afc97c8a81a791c72f7ad323d7be6b))
* **Datagrid:** call onClearFilters when clearing filters from tag summary ([#5892](https://github.com/carbon-design-system/ibm-products/issues/5892)) ([791618a](https://github.com/carbon-design-system/ibm-products/commit/791618a11618f120b15444dde994da65576a79ff))
* **datagrids:** Add custom batch actions display min ([#5776](https://github.com/carbon-design-system/ibm-products/issues/5776)) ([485e8bc](https://github.com/carbon-design-system/ibm-products/commit/485e8bcac3193e56d65721076160944b4e126256))
* **Datagrid:** slug to aiLabel renaming ([#6151](https://github.com/carbon-design-system/ibm-products/issues/6151)) ([b0b3c1c](https://github.com/carbon-design-system/ibm-products/commit/b0b3c1cf40199e7458584ea1d9093224264e1f4c))
* **empty-states:** exports types ([#6299](https://github.com/carbon-design-system/ibm-products/issues/6299)) ([436f50d](https://github.com/carbon-design-system/ibm-products/commit/436f50d29f6391593050740803bf14ef01b04335))
* expose onChange and onPrevious for CreateFullPage ([#6271](https://github.com/carbon-design-system/ibm-products/issues/6271)) ([5bd953d](https://github.com/carbon-design-system/ibm-products/commit/5bd953de33d856b791692b9302a424dc6d10d6a1))
* **tagset:** support for size on overflow tag ([#6065](https://github.com/carbon-design-system/ibm-products/issues/6065)) ([ba29c09](https://github.com/carbon-design-system/ibm-products/commit/ba29c0950f1fcc7388e58523e94a32abd588d59d))
* **tag:** updates tags to use DismissibleTag ([#6112](https://github.com/carbon-design-system/ibm-products/issues/6112)) ([18b47c7](https://github.com/carbon-design-system/ibm-products/commit/18b47c72ff381db130897da6a2d1f0aa86fd6d85))
* **Tearsheet:** Slug to aiLabel ([#6169](https://github.com/carbon-design-system/ibm-products/issues/6169)) ([5c0f2ad](https://github.com/carbon-design-system/ibm-products/commit/5c0f2adf55e6c9c7f081dab72ab711b611593476))





# [2.53.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.53.0-rc.0...@carbon/ibm-products@2.53.0) (2024-11-06)

**Note:** Version bump only for package @carbon/ibm-products





# [2.53.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.48.0-rc.0...@carbon/ibm-products@2.53.0-rc.0) (2024-10-28)


### Bug Fixes

* **AboutModal:** implement useFocus() ([#5981](https://github.com/carbon-design-system/ibm-products/issues/5981)) ([e37beea](https://github.com/carbon-design-system/ibm-products/commit/e37beeafa1f592de3c9a38930487ed7cf4e8239b))
* add floating ui to tagset ([#6005](https://github.com/carbon-design-system/ibm-products/issues/6005)) ([fac868b](https://github.com/carbon-design-system/ibm-products/commit/fac868b0bb3382aac79ab2780480d58e901da517))
* add primaryButtonDisabled prop to ProductiveCard ([#6100](https://github.com/carbon-design-system/ibm-products/issues/6100)) ([7d17364](https://github.com/carbon-design-system/ibm-products/commit/7d17364029712bd54fc9f97e7a2c1af0a9e7b381))
* **Conditionbuilder:** add await for accessibility test ([#5794](https://github.com/carbon-design-system/ibm-products/issues/5794)) ([0d86010](https://github.com/carbon-design-system/ibm-products/commit/0d860101791e8587f8d1688348aae8438c4d0fc9))
* **ConditionBuilder:** correct role for NON HIERARCHICAL_VARIANT ([#6117](https://github.com/carbon-design-system/ibm-products/issues/6117)) ([6c7823e](https://github.com/carbon-design-system/ibm-products/commit/6c7823ed1405d0dfa6ef51cac89e0373f6763ef0))
* **conditionBuilder:** release review changes1 ([#6133](https://github.com/carbon-design-system/ibm-products/issues/6133)) ([d3f08bc](https://github.com/carbon-design-system/ibm-products/commit/d3f08bcd0b479a84e69fc29dfe03a931618168a7))
* **create-full-page-step:** update hasFieldSet type ([#5876](https://github.com/carbon-design-system/ibm-products/issues/5876)) ([54afdf6](https://github.com/carbon-design-system/ibm-products/commit/54afdf6f31b60e87a21949a69e01ec94bbdc2b79))
* **CreateFullPage:** breadcrumb tooltip  visibility issue ([#6064](https://github.com/carbon-design-system/ibm-products/issues/6064)) ([03eadd2](https://github.com/carbon-design-system/ibm-products/commit/03eadd20c856a18121c5cb516fd49cd2ddc87b6a))
* **CreateFullPage:** breadcrumbs should be array ([#6058](https://github.com/carbon-design-system/ibm-products/issues/6058)) ([f076047](https://github.com/carbon-design-system/ibm-products/commit/f076047b593235b01b9c4666194c080e0b4a3b4e)), closes [#5707](https://github.com/carbon-design-system/ibm-products/issues/5707)
* **createfullpagestep:** hasFieldset and fieldsetLegendText types ([#6057](https://github.com/carbon-design-system/ibm-products/issues/6057)) ([b5db933](https://github.com/carbon-design-system/ibm-products/commit/b5db933dc668b451451736dc61fc18d35ba38ec5)), closes [#4512](https://github.com/carbon-design-system/ibm-products/issues/4512)
* **CreateTearsheet:** add custom button ([#5666](https://github.com/carbon-design-system/ibm-products/issues/5666)) ([d5f9538](https://github.com/carbon-design-system/ibm-products/commit/d5f9538902233075e38a60abf70efc52838f5804))
* csp errors on 2 illustrations ([#6202](https://github.com/carbon-design-system/ibm-products/issues/6202)) ([ad8c2d8](https://github.com/carbon-design-system/ibm-products/commit/ad8c2d84b231e9a4a5243cbfafc618fdbb63aace))
* data spreadsheet object drag drop ([#5800](https://github.com/carbon-design-system/ibm-products/issues/5800)) ([25e95ba](https://github.com/carbon-design-system/ibm-products/commit/25e95bab041d69b28cc8e2a1c15ddd78ea4ab311))
* datagrid typescript declarations ([#6122](https://github.com/carbon-design-system/ibm-products/issues/6122)) ([977e279](https://github.com/carbon-design-system/ibm-products/commit/977e279608be3d7151a4f6b58d7006dfbdd7fec3)), closes [#5257](https://github.com/carbon-design-system/ibm-products/issues/5257) [#6115](https://github.com/carbon-design-system/ibm-products/issues/6115)
* **datagrid:** batch no longer updates filter tag ([#6031](https://github.com/carbon-design-system/ibm-products/issues/6031)) ([11c1554](https://github.com/carbon-design-system/ibm-products/commit/11c1554ba92037f559862ad9c83cfdf048074659))
* **Datagrid:** clickable row retain focus after sidepanel closes ([#5952](https://github.com/carbon-design-system/ibm-products/issues/5952)) ([0df9085](https://github.com/carbon-design-system/ibm-products/commit/0df908523eab166b8bb63731f60a727ef846e41f))
* **Datagrid:** csp violation ([#5831](https://github.com/carbon-design-system/ibm-products/issues/5831)) ([73a9824](https://github.com/carbon-design-system/ibm-products/commit/73a98242150e421a7c414bf7743f453a2234caba))
* **datagrid:** customise column tearsheet update issue with new columns ([#5953](https://github.com/carbon-design-system/ibm-products/issues/5953)) ([7ab472a](https://github.com/carbon-design-system/ibm-products/commit/7ab472a22d78b07b900513f0b1a0ddce8b7db2f7))
* **DataGrid:** disable save button on customise column ([#6026](https://github.com/carbon-design-system/ibm-products/issues/6026)) ([2b32f0f](https://github.com/carbon-design-system/ibm-products/commit/2b32f0fa54034d347438347e69dfd865c1248f9f))
* **Datagrid:** enabled spacer column conditionally ([#5920](https://github.com/carbon-design-system/ibm-products/issues/5920)) ([9bd307e](https://github.com/carbon-design-system/ibm-products/commit/9bd307e4836d986383a0464e799834712f3904e0))
* **datagrid:** fixes multiselect for instant update bug ([#5970](https://github.com/carbon-design-system/ibm-products/issues/5970)) ([330e902](https://github.com/carbon-design-system/ibm-products/commit/330e902c94cf3c8720ddb4360c1ae313c12f756e))
* **dataGrid:** focus loss on radio select ([#6073](https://github.com/carbon-design-system/ibm-products/issues/6073)) ([127824b](https://github.com/carbon-design-system/ibm-products/commit/127824b9dcdb9847a58940305bb06c35565c720c))
* **dataGrid:** header scroll issues ([#6135](https://github.com/carbon-design-system/ibm-products/issues/6135)) ([9d60c0c](https://github.com/carbon-design-system/ibm-products/commit/9d60c0cd0f0ab98ba87915eb50a9de2a55dff5a1))
* **datagrid:** hidden columns included in search results ([#5989](https://github.com/carbon-design-system/ibm-products/issues/5989)) ([189f452](https://github.com/carbon-design-system/ibm-products/commit/189f4522187981788b0eb431b89f8b6e89eecd47))
* **Datagrid:** remove redundant aria disabled ([#6103](https://github.com/carbon-design-system/ibm-products/issues/6103)) ([5b58d50](https://github.com/carbon-design-system/ibm-products/commit/5b58d506a39b3d625e169004e1385ae9cfcc6985))
* **Datagrid:** remove unused span with inputProps ([#5915](https://github.com/carbon-design-system/ibm-products/issues/5915)) ([517e4f3](https://github.com/carbon-design-system/ibm-products/commit/517e4f36631cf1cc81d6f21fd25a83b3c65da540))
* **Datagrid:** resolve CSP in subcomponents ([#6229](https://github.com/carbon-design-system/ibm-products/issues/6229)) ([95c6489](https://github.com/carbon-design-system/ibm-products/commit/95c6489e30e5e20e344eff958e481ee22be9d465))
* **Datagrid:** return null for older react versions ([#6003](https://github.com/carbon-design-system/ibm-products/issues/6003)) ([6938654](https://github.com/carbon-design-system/ibm-products/commit/6938654a3ec57ea63f69c4390ffa5a290c01d886))
* **DataGrid:** row size change issues with virtual scrolling enabled ([#5895](https://github.com/carbon-design-system/ibm-products/issues/5895)) ([a297e8a](https://github.com/carbon-design-system/ibm-products/commit/a297e8a1dc67e8017083452c79b5162eaf282c99))
* **Datagrid:** select all checkbox to select current page ([#5933](https://github.com/carbon-design-system/ibm-products/issues/5933)) ([602f85d](https://github.com/carbon-design-system/ibm-products/commit/602f85d0a3afd507b31157df27091fc94e60bf27))
* **Datagrid:** select all row count updated to exclude disabled rows ([#6085](https://github.com/carbon-design-system/ibm-products/issues/6085)) ([c7064de](https://github.com/carbon-design-system/ibm-products/commit/c7064de5be480840775039e2e4bdad00fbf8d4ce))
* **datagrid:** selectall selects disabled rows ([#6008](https://github.com/carbon-design-system/ibm-products/issues/6008)) ([01d973f](https://github.com/carbon-design-system/ibm-products/commit/01d973f95256ee174e59c902e4c46ddc4781b13f))
* **Datagrid:** skip await  getAsyncSubRows when not defined ([#6028](https://github.com/carbon-design-system/ibm-products/issues/6028)) ([7390b55](https://github.com/carbon-design-system/ibm-products/commit/7390b55425aaf1ceff75056bcb81e2d09d61c118))
* **datagrid:** tooltip missing in Customize Columns modal ([#6036](https://github.com/carbon-design-system/ibm-products/issues/6036)) ([15ec2a5](https://github.com/carbon-design-system/ibm-products/commit/15ec2a5277c9ef1ba1b972b57d050e4af7da2766))
* **datagrid:** unique name attribute for row settings radio buttons ([#6009](https://github.com/carbon-design-system/ibm-products/issues/6009)) ([618cc84](https://github.com/carbon-design-system/ibm-products/commit/618cc84a372301571df132a21a06051c8d35a33a))
* **datagrid:** use same empty array every time ([#5999](https://github.com/carbon-design-system/ibm-products/issues/5999)) ([e6ce08b](https://github.com/carbon-design-system/ibm-products/commit/e6ce08b236acf9f7360e01b2ebb5e5a8568afc9c)), closes [#5998](https://github.com/carbon-design-system/ibm-products/issues/5998)
* **Datagrid:** useflexresize infinite redraw ([#6226](https://github.com/carbon-design-system/ibm-products/issues/6226)) ([8030367](https://github.com/carbon-design-system/ibm-products/commit/8030367c4fe90f9ff84db06935553a289518c2e8)), closes [#5920](https://github.com/carbon-design-system/ibm-products/issues/5920) [#5646](https://github.com/carbon-design-system/ibm-products/issues/5646)
* **Datagrid:** width logic for useSortableColumns vs useActionsColumn ([#6029](https://github.com/carbon-design-system/ibm-products/issues/6029)) ([66f9eee](https://github.com/carbon-design-system/ibm-products/commit/66f9eeeb8df559b3f7cc98989853cce3e85f5852))
* **EditInPlace:** focus and style issue ([#6146](https://github.com/carbon-design-system/ibm-products/issues/6146)) ([831a0bc](https://github.com/carbon-design-system/ibm-products/commit/831a0bc7da65e65c09228cf2b292cbb879484d3a))
* **EditInPlace:** removes focus when pressing esc or enter key ([#5943](https://github.com/carbon-design-system/ibm-products/issues/5943)) ([5eff024](https://github.com/carbon-design-system/ibm-products/commit/5eff0243b65123fb39c801194a1b1a8bb9889240))
* **Export Modal:** Focus moves to parent page ([#6077](https://github.com/carbon-design-system/ibm-products/issues/6077)) ([ef4bfa8](https://github.com/carbon-design-system/ibm-products/commit/ef4bfa87d454eba9ce8b4cb83a464e95d66a189e))
* **ExportModal:** focus return to trigger button ([#6116](https://github.com/carbon-design-system/ibm-products/issues/6116)) ([bbc770e](https://github.com/carbon-design-system/ibm-products/commit/bbc770e8fc2415c9dd898ead57bdc332e4fdf339))
* **ExportModal:** screen reader indentifies hidden controls ([#6079](https://github.com/carbon-design-system/ibm-products/issues/6079)) ([dd7564d](https://github.com/carbon-design-system/ibm-products/commit/dd7564d02dcad68052555eb5b2bf543b4a901992))
* **ExportModal:** update status message ([#6080](https://github.com/carbon-design-system/ibm-products/issues/6080)) ([ec3dead](https://github.com/carbon-design-system/ibm-products/commit/ec3dead1b2dd6c727e09bcd0356d567721d5209f))
* first step logic enhancement for CreateTearsheet ([#5884](https://github.com/carbon-design-system/ibm-products/issues/5884)) ([4f3b70f](https://github.com/carbon-design-system/ibm-products/commit/4f3b70f93d43a94c50b8eea77b5960f30b59c403))
* **getstartedcard:** disable vairant issue in JAWS ([#5886](https://github.com/carbon-design-system/ibm-products/issues/5886)) ([515d4c0](https://github.com/carbon-design-system/ibm-products/commit/515d4c0c89f8fe70539946072e9397d297b0faac))
* **InlineTip:** added optional ? flag on media ([#6137](https://github.com/carbon-design-system/ibm-products/issues/6137)) ([978f3e6](https://github.com/carbon-design-system/ibm-products/commit/978f3e65fff94f6399714fb921e8ef2208a1ec51))
* nofification panel keyboard close focus ([#6113](https://github.com/carbon-design-system/ibm-products/issues/6113)) ([752739b](https://github.com/carbon-design-system/ibm-products/commit/752739bde31c3dcb5de1ff2702167b7a838350dd))
* **NotificationPanel:** add missing role ([#5810](https://github.com/carbon-design-system/ibm-products/issues/5810)) ([bf17410](https://github.com/carbon-design-system/ibm-products/commit/bf1741045997b784c98068c618260dfbc7a79dc6))
* **NotificationPanel:** focus return to trigger on closing notification panel ([#6090](https://github.com/carbon-design-system/ibm-products/issues/6090)) ([6dd626a](https://github.com/carbon-design-system/ibm-products/commit/6dd626ac445a255ca9e7c64eb851c11dbb0117f7))
* **onboardingComponents:** csp voilation ([#6228](https://github.com/carbon-design-system/ibm-products/issues/6228)) ([6a848b7](https://github.com/carbon-design-system/ibm-products/commit/6a848b7150db52af5891e21066c273b4f9d2d598))
* **optionstile:** ontoggle should not be required ([#6056](https://github.com/carbon-design-system/ibm-products/issues/6056)) ([af6cf14](https://github.com/carbon-design-system/ibm-products/commit/af6cf147f759f344173baf3350095c319398fe2d)), closes [#4281](https://github.com/carbon-design-system/ibm-products/issues/4281)
* pageheader gap ([#6004](https://github.com/carbon-design-system/ibm-products/issues/6004)) ([97bf3ac](https://github.com/carbon-design-system/ibm-products/commit/97bf3acf41b1ae35875c634cad3315ac5c3d2936))
* **pageheader:** compensate the width of the overflow menu ([#5929](https://github.com/carbon-design-system/ibm-products/issues/5929)) ([baf0ec2](https://github.com/carbon-design-system/ibm-products/commit/baf0ec231c0c343265efbf74b69a9d38db085dd2))
* **Pageheader:** scrollable headers are not tabbable ([#6145](https://github.com/carbon-design-system/ibm-products/issues/6145)) ([ed578ec](https://github.com/carbon-design-system/ibm-products/commit/ed578ec0d45dcd72a7c96fd1e8370d4a67019ec6))
* **ProductiveCard:** makes graph screen readable, story only. ([#5883](https://github.com/carbon-design-system/ibm-products/issues/5883)) ([a2db976](https://github.com/carbon-design-system/ibm-products/commit/a2db976c1609df5fd83459e5137e42d3a356ca5d))
* remove ellipsis from EditInPlace ([#6098](https://github.com/carbon-design-system/ibm-products/issues/6098)) ([0b40cce](https://github.com/carbon-design-system/ibm-products/commit/0b40cce8451abd0e509a6b16490fff862496b414))
* remove title from datagrid expander ([#6200](https://github.com/carbon-design-system/ibm-products/issues/6200)) ([e7e025e](https://github.com/carbon-design-system/ibm-products/commit/e7e025e034fdcbc18f645145031f56ed07e6cced))
* reword props in card stories ([#5871](https://github.com/carbon-design-system/ibm-products/issues/5871)) ([df80f00](https://github.com/carbon-design-system/ibm-products/commit/df80f0029af2c2ec6d7c53b66d69dfc007c1f446))
* role main removed from components ([#6006](https://github.com/carbon-design-system/ibm-products/issues/6006)) ([b334a51](https://github.com/carbon-design-system/ibm-products/commit/b334a51c4aa1f3bae26554a9e0b1e65b663b0eed))
* **sidepanel:** button text change ([#5907](https://github.com/carbon-design-system/ibm-products/issues/5907)) ([f701002](https://github.com/carbon-design-system/ibm-products/commit/f7010028dbedae7178244b4123a3b0bc485efa70))
* **SidePanel:** resolve focus wrap issue when first element is disabled ([#5991](https://github.com/carbon-design-system/ibm-products/issues/5991)) ([426f588](https://github.com/carbon-design-system/ibm-products/commit/426f588dd8351783e2cad24bde4e2a5e36c64ae7))
* **SidePanel:** style issue with multi select ([#6123](https://github.com/carbon-design-system/ibm-products/issues/6123)) ([feb6a99](https://github.com/carbon-design-system/ibm-products/commit/feb6a993cb0971442cca80f4c7c86d90eede0bbf))
* **tagoverflow:** incorrect type for filter prop ([#6000](https://github.com/carbon-design-system/ibm-products/issues/6000)) ([4134043](https://github.com/carbon-design-system/ibm-products/commit/41340439759927a870a335b3dd5dd971e8f44fcb))
* **TagOverflow:** use operational tag ([#6132](https://github.com/carbon-design-system/ibm-products/issues/6132)) ([791cbec](https://github.com/carbon-design-system/ibm-products/commit/791cbecb2319ce832c1a6341c0a8fbf16b76a3e0))
* **TagSet:** fix string formatting ([#5880](https://github.com/carbon-design-system/ibm-products/issues/5880)) ([9339559](https://github.com/carbon-design-system/ibm-products/commit/93395596b529fb2e1bb7591e8d4792f1ff1de7ff))
* **TagSet:** modal gradient ([#4478](https://github.com/carbon-design-system/ibm-products/issues/4478)) ([459109d](https://github.com/carbon-design-system/ibm-products/commit/459109d08ca6baf6a66954dd6fa49360dc553dc6))
* **tagset:** multiline prop broken ([#6027](https://github.com/carbon-design-system/ibm-products/issues/6027)) ([dff3d68](https://github.com/carbon-design-system/ibm-products/commit/dff3d68dcdc6801c58d1299e4ffa91b2578e53a4))
* **tagset:** updates props ([#5962](https://github.com/carbon-design-system/ibm-products/issues/5962)) ([cf7c88c](https://github.com/carbon-design-system/ibm-products/commit/cf7c88c293fa05406837afe68d9775d39998818c))
* tearsheet with nav accessibility ([#5971](https://github.com/carbon-design-system/ibm-products/issues/5971)) ([d2aeeb2](https://github.com/carbon-design-system/ibm-products/commit/d2aeeb2b8e226f1da45bb8fd8ca45584269574d8))
* **Tearsheet:** add missing declaration for headerActions prop ([#6114](https://github.com/carbon-design-system/ibm-products/issues/6114)) ([d1dafa1](https://github.com/carbon-design-system/ibm-products/commit/d1dafa1e94472eb64e769ccd358e5355837fa9a5)), closes [#546](https://github.com/carbon-design-system/ibm-products/issues/546)
* **Tearsheet:** changed actions prop to optional ([#5984](https://github.com/carbon-design-system/ibm-products/issues/5984)) ([068a7df](https://github.com/carbon-design-system/ibm-products/commit/068a7df53265e71193ef583145c69d17b3f76535))
* **tearsheet:** Firefox focuses Tearsheet content div with scroll ([#5973](https://github.com/carbon-design-system/ibm-products/issues/5973)) ([19e319b](https://github.com/carbon-design-system/ibm-products/commit/19e319baff3635fb2d1a54d22cfaa5dfc8e95e23))
* **tearsheet:** focus without sentinels ([#5882](https://github.com/carbon-design-system/ibm-products/issues/5882)) ([f362806](https://github.com/carbon-design-system/ibm-products/commit/f3628062a6e65ea5963353a79da1734db6bc9d80))
* **tearsheet:** implement a workaround ([#5960](https://github.com/carbon-design-system/ibm-products/issues/5960)) ([c7d1ef3](https://github.com/carbon-design-system/ibm-products/commit/c7d1ef37a22f3820dd22ad97cd247c169fdc97b4))
* **Tearsheet:** resolve focus issue ([#6217](https://github.com/carbon-design-system/ibm-products/issues/6217)) ([dc53a09](https://github.com/carbon-design-system/ibm-products/commit/dc53a099baba3450d769b9e4581c524673529fa0))
* **Tearsheet:** update portalTarget type ([#5899](https://github.com/carbon-design-system/ibm-products/issues/5899)) ([d7aa99e](https://github.com/carbon-design-system/ibm-products/commit/d7aa99ed058d3cd55302bc6fe5c169e5a120d64e))
* **ToolbarButton:** deprecate iconDescription and use label instead ([#5893](https://github.com/carbon-design-system/ibm-products/issues/5893)) ([b968386](https://github.com/carbon-design-system/ibm-products/commit/b968386090b0934f770c66a6eab08f4af0054ee4))
* update Carbon 11 compatible versions to latest ([#6054](https://github.com/carbon-design-system/ibm-products/issues/6054)) ([0ac7669](https://github.com/carbon-design-system/ibm-products/commit/0ac76692a6eeb85655ca64ca9189297708e26bd9))
* update to Carbon 11 compatible versions to latest ([#5987](https://github.com/carbon-design-system/ibm-products/issues/5987)) ([173e6c6](https://github.com/carbon-design-system/ibm-products/commit/173e6c6455a4fe619d56148ab432926bc6c640a4))
* update to Carbon 11 compatible versions to latest ([#6214](https://github.com/carbon-design-system/ibm-products/issues/6214)) ([911c341](https://github.com/carbon-design-system/ibm-products/commit/911c341d258b410ff2109ecb39293c2670796a0e))
* update toHaveNoAxeViolations and remove skips ([#5955](https://github.com/carbon-design-system/ibm-products/issues/5955)) ([694128b](https://github.com/carbon-design-system/ibm-products/commit/694128bb707a2400d67e6618af3fea3f3ffba86f))
* **useFocus:** change delay to 1ms ([#5950](https://github.com/carbon-design-system/ibm-products/issues/5950)) ([5883cd3](https://github.com/carbon-design-system/ibm-products/commit/5883cd3a14039ab7ca044b4ab95621bb70ccf68e))


### Features

* **`ibm-products-web-components`:** setup new web component package and storybook ([#6148](https://github.com/carbon-design-system/ibm-products/issues/6148)) ([6962187](https://github.com/carbon-design-system/ibm-products/commit/6962187634ba4317c5a4dcbf495978a176efcb79))
* adding the ability to disable modals for TagSet component ([#5753](https://github.com/carbon-design-system/ibm-products/issues/5753)) ([29e960c](https://github.com/carbon-design-system/ibm-products/commit/29e960c858d2c58d46c86e9ea638a351d5fddd76))
* **cards:** renames slug to aiLabel ([#6167](https://github.com/carbon-design-system/ibm-products/issues/6167)) ([5b94ed8](https://github.com/carbon-design-system/ibm-products/commit/5b94ed8d01638db747277f104d9f7dd9ab2e0eb3))
* **ConditionBuilder:** enhancing the conditional operators section that manages the primary logic flow ([#5921](https://github.com/carbon-design-system/ibm-products/issues/5921)) ([91733fb](https://github.com/carbon-design-system/ibm-products/commit/91733fb43157eab26c885f0652adaf9276f372d4))
* **ConditionBuilder:** option to default enable with initial state ([#6007](https://github.com/carbon-design-system/ibm-products/issues/6007)) ([3b2b91c](https://github.com/carbon-design-system/ibm-products/commit/3b2b91c63157d748425c1fa85ed70411e2c7e018))
* **Conditionbuilder:** renaming both variants to Hierarchical and Non-Hierarchical ([#5847](https://github.com/carbon-design-system/ibm-products/issues/5847)) ([791e2b3](https://github.com/carbon-design-system/ibm-products/commit/791e2b31549f3f4480cac2fc142e550b5e12ea31))
* **datagrid:** adds radio filter ([#5877](https://github.com/carbon-design-system/ibm-products/issues/5877)) ([12667e8](https://github.com/carbon-design-system/ibm-products/commit/12667e8387afc97c8a81a791c72f7ad323d7be6b))
* **Datagrid:** call onClearFilters when clearing filters from tag summary ([#5892](https://github.com/carbon-design-system/ibm-products/issues/5892)) ([791618a](https://github.com/carbon-design-system/ibm-products/commit/791618a11618f120b15444dde994da65576a79ff))
* **datagrids:** Add custom batch actions display min ([#5776](https://github.com/carbon-design-system/ibm-products/issues/5776)) ([485e8bc](https://github.com/carbon-design-system/ibm-products/commit/485e8bcac3193e56d65721076160944b4e126256))
* **Datagrid:** slug to aiLabel renaming ([#6151](https://github.com/carbon-design-system/ibm-products/issues/6151)) ([b0b3c1c](https://github.com/carbon-design-system/ibm-products/commit/b0b3c1cf40199e7458584ea1d9093224264e1f4c))
* **empty-states:** exports types ([#6299](https://github.com/carbon-design-system/ibm-products/issues/6299)) ([436f50d](https://github.com/carbon-design-system/ibm-products/commit/436f50d29f6391593050740803bf14ef01b04335))
* **tagset:** support for size on overflow tag ([#6065](https://github.com/carbon-design-system/ibm-products/issues/6065)) ([ba29c09](https://github.com/carbon-design-system/ibm-products/commit/ba29c0950f1fcc7388e58523e94a32abd588d59d))
* **tag:** updates tags to use DismissibleTag ([#6112](https://github.com/carbon-design-system/ibm-products/issues/6112)) ([18b47c7](https://github.com/carbon-design-system/ibm-products/commit/18b47c72ff381db130897da6a2d1f0aa86fd6d85))
* **Tearsheet:** Slug to aiLabel ([#6169](https://github.com/carbon-design-system/ibm-products/issues/6169)) ([5c0f2ad](https://github.com/carbon-design-system/ibm-products/commit/5c0f2adf55e6c9c7f081dab72ab711b611593476))





# [2.52.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.52.0-rc.0...@carbon/ibm-products@2.52.0) (2024-10-23)

**Note:** Version bump only for package @carbon/ibm-products





# [2.52.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.48.0-rc.0...@carbon/ibm-products@2.52.0-rc.0) (2024-10-14)


### Bug Fixes

* **AboutModal:** implement useFocus() ([#5981](https://github.com/carbon-design-system/ibm-products/issues/5981)) ([e37beea](https://github.com/carbon-design-system/ibm-products/commit/e37beeafa1f592de3c9a38930487ed7cf4e8239b))
* add floating ui to tagset ([#6005](https://github.com/carbon-design-system/ibm-products/issues/6005)) ([fac868b](https://github.com/carbon-design-system/ibm-products/commit/fac868b0bb3382aac79ab2780480d58e901da517))
* add primaryButtonDisabled prop to ProductiveCard ([#6100](https://github.com/carbon-design-system/ibm-products/issues/6100)) ([7d17364](https://github.com/carbon-design-system/ibm-products/commit/7d17364029712bd54fc9f97e7a2c1af0a9e7b381))
* **Conditionbuilder:** add await for accessibility test ([#5794](https://github.com/carbon-design-system/ibm-products/issues/5794)) ([0d86010](https://github.com/carbon-design-system/ibm-products/commit/0d860101791e8587f8d1688348aae8438c4d0fc9))
* **ConditionBuilder:** correct role for NON HIERARCHICAL_VARIANT ([#6117](https://github.com/carbon-design-system/ibm-products/issues/6117)) ([6c7823e](https://github.com/carbon-design-system/ibm-products/commit/6c7823ed1405d0dfa6ef51cac89e0373f6763ef0))
* **create-full-page-step:** update hasFieldSet type ([#5876](https://github.com/carbon-design-system/ibm-products/issues/5876)) ([54afdf6](https://github.com/carbon-design-system/ibm-products/commit/54afdf6f31b60e87a21949a69e01ec94bbdc2b79))
* **CreateFullPage:** breadcrumb tooltip  visibility issue ([#6064](https://github.com/carbon-design-system/ibm-products/issues/6064)) ([03eadd2](https://github.com/carbon-design-system/ibm-products/commit/03eadd20c856a18121c5cb516fd49cd2ddc87b6a))
* **CreateFullPage:** breadcrumbs should be array ([#6058](https://github.com/carbon-design-system/ibm-products/issues/6058)) ([f076047](https://github.com/carbon-design-system/ibm-products/commit/f076047b593235b01b9c4666194c080e0b4a3b4e)), closes [#5707](https://github.com/carbon-design-system/ibm-products/issues/5707)
* **createfullpagestep:** hasFieldset and fieldsetLegendText types ([#6057](https://github.com/carbon-design-system/ibm-products/issues/6057)) ([b5db933](https://github.com/carbon-design-system/ibm-products/commit/b5db933dc668b451451736dc61fc18d35ba38ec5)), closes [#4512](https://github.com/carbon-design-system/ibm-products/issues/4512)
* **CreateTearsheet:** add custom button ([#5666](https://github.com/carbon-design-system/ibm-products/issues/5666)) ([d5f9538](https://github.com/carbon-design-system/ibm-products/commit/d5f9538902233075e38a60abf70efc52838f5804))
* data spreadsheet object drag drop ([#5800](https://github.com/carbon-design-system/ibm-products/issues/5800)) ([25e95ba](https://github.com/carbon-design-system/ibm-products/commit/25e95bab041d69b28cc8e2a1c15ddd78ea4ab311))
* **datagrid:** batch no longer updates filter tag ([#6031](https://github.com/carbon-design-system/ibm-products/issues/6031)) ([11c1554](https://github.com/carbon-design-system/ibm-products/commit/11c1554ba92037f559862ad9c83cfdf048074659))
* **Datagrid:** clickable row retain focus after sidepanel closes ([#5952](https://github.com/carbon-design-system/ibm-products/issues/5952)) ([0df9085](https://github.com/carbon-design-system/ibm-products/commit/0df908523eab166b8bb63731f60a727ef846e41f))
* **Datagrid:** csp violation ([#5831](https://github.com/carbon-design-system/ibm-products/issues/5831)) ([73a9824](https://github.com/carbon-design-system/ibm-products/commit/73a98242150e421a7c414bf7743f453a2234caba))
* **datagrid:** customise column tearsheet update issue with new columns ([#5953](https://github.com/carbon-design-system/ibm-products/issues/5953)) ([7ab472a](https://github.com/carbon-design-system/ibm-products/commit/7ab472a22d78b07b900513f0b1a0ddce8b7db2f7))
* **DataGrid:** disable save button on customise column ([#6026](https://github.com/carbon-design-system/ibm-products/issues/6026)) ([2b32f0f](https://github.com/carbon-design-system/ibm-products/commit/2b32f0fa54034d347438347e69dfd865c1248f9f))
* **Datagrid:** enabled spacer column conditionally ([#5920](https://github.com/carbon-design-system/ibm-products/issues/5920)) ([9bd307e](https://github.com/carbon-design-system/ibm-products/commit/9bd307e4836d986383a0464e799834712f3904e0))
* **datagrid:** fixes multiselect for instant update bug ([#5970](https://github.com/carbon-design-system/ibm-products/issues/5970)) ([330e902](https://github.com/carbon-design-system/ibm-products/commit/330e902c94cf3c8720ddb4360c1ae313c12f756e))
* **dataGrid:** focus loss on radio select ([#6073](https://github.com/carbon-design-system/ibm-products/issues/6073)) ([127824b](https://github.com/carbon-design-system/ibm-products/commit/127824b9dcdb9847a58940305bb06c35565c720c))
* **dataGrid:** header scroll issues ([#6135](https://github.com/carbon-design-system/ibm-products/issues/6135)) ([9d60c0c](https://github.com/carbon-design-system/ibm-products/commit/9d60c0cd0f0ab98ba87915eb50a9de2a55dff5a1))
* **datagrid:** hidden columns included in search results ([#5989](https://github.com/carbon-design-system/ibm-products/issues/5989)) ([189f452](https://github.com/carbon-design-system/ibm-products/commit/189f4522187981788b0eb431b89f8b6e89eecd47))
* **Datagrid:** remove redundant aria disabled ([#6103](https://github.com/carbon-design-system/ibm-products/issues/6103)) ([5b58d50](https://github.com/carbon-design-system/ibm-products/commit/5b58d506a39b3d625e169004e1385ae9cfcc6985))
* **Datagrid:** remove unused span with inputProps ([#5915](https://github.com/carbon-design-system/ibm-products/issues/5915)) ([517e4f3](https://github.com/carbon-design-system/ibm-products/commit/517e4f36631cf1cc81d6f21fd25a83b3c65da540))
* **Datagrid:** return null for older react versions ([#6003](https://github.com/carbon-design-system/ibm-products/issues/6003)) ([6938654](https://github.com/carbon-design-system/ibm-products/commit/6938654a3ec57ea63f69c4390ffa5a290c01d886))
* **DataGrid:** row size change issues with virtual scrolling enabled ([#5895](https://github.com/carbon-design-system/ibm-products/issues/5895)) ([a297e8a](https://github.com/carbon-design-system/ibm-products/commit/a297e8a1dc67e8017083452c79b5162eaf282c99))
* **Datagrid:** select all checkbox to select current page ([#5933](https://github.com/carbon-design-system/ibm-products/issues/5933)) ([602f85d](https://github.com/carbon-design-system/ibm-products/commit/602f85d0a3afd507b31157df27091fc94e60bf27))
* **Datagrid:** select all row count updated to exclude disabled rows ([#6085](https://github.com/carbon-design-system/ibm-products/issues/6085)) ([c7064de](https://github.com/carbon-design-system/ibm-products/commit/c7064de5be480840775039e2e4bdad00fbf8d4ce))
* **datagrid:** selectall selects disabled rows ([#6008](https://github.com/carbon-design-system/ibm-products/issues/6008)) ([01d973f](https://github.com/carbon-design-system/ibm-products/commit/01d973f95256ee174e59c902e4c46ddc4781b13f))
* **Datagrid:** skip await  getAsyncSubRows when not defined ([#6028](https://github.com/carbon-design-system/ibm-products/issues/6028)) ([7390b55](https://github.com/carbon-design-system/ibm-products/commit/7390b55425aaf1ceff75056bcb81e2d09d61c118))
* **datagrid:** tooltip missing in Customize Columns modal ([#6036](https://github.com/carbon-design-system/ibm-products/issues/6036)) ([15ec2a5](https://github.com/carbon-design-system/ibm-products/commit/15ec2a5277c9ef1ba1b972b57d050e4af7da2766))
* **datagrid:** unique name attribute for row settings radio buttons ([#6009](https://github.com/carbon-design-system/ibm-products/issues/6009)) ([618cc84](https://github.com/carbon-design-system/ibm-products/commit/618cc84a372301571df132a21a06051c8d35a33a))
* **datagrid:** use same empty array every time ([#5999](https://github.com/carbon-design-system/ibm-products/issues/5999)) ([e6ce08b](https://github.com/carbon-design-system/ibm-products/commit/e6ce08b236acf9f7360e01b2ebb5e5a8568afc9c)), closes [#5998](https://github.com/carbon-design-system/ibm-products/issues/5998)
* **Datagrid:** width logic for useSortableColumns vs useActionsColumn ([#6029](https://github.com/carbon-design-system/ibm-products/issues/6029)) ([66f9eee](https://github.com/carbon-design-system/ibm-products/commit/66f9eeeb8df559b3f7cc98989853cce3e85f5852))
* **EditInPlace:** focus and style issue ([#6146](https://github.com/carbon-design-system/ibm-products/issues/6146)) ([831a0bc](https://github.com/carbon-design-system/ibm-products/commit/831a0bc7da65e65c09228cf2b292cbb879484d3a))
* **EditInPlace:** removes focus when pressing esc or enter key ([#5943](https://github.com/carbon-design-system/ibm-products/issues/5943)) ([5eff024](https://github.com/carbon-design-system/ibm-products/commit/5eff0243b65123fb39c801194a1b1a8bb9889240))
* **Export Modal:** Focus moves to parent page ([#6077](https://github.com/carbon-design-system/ibm-products/issues/6077)) ([ef4bfa8](https://github.com/carbon-design-system/ibm-products/commit/ef4bfa87d454eba9ce8b4cb83a464e95d66a189e))
* **ExportModal:** focus return to trigger button ([#6116](https://github.com/carbon-design-system/ibm-products/issues/6116)) ([bbc770e](https://github.com/carbon-design-system/ibm-products/commit/bbc770e8fc2415c9dd898ead57bdc332e4fdf339))
* **ExportModal:** screen reader indentifies hidden controls ([#6079](https://github.com/carbon-design-system/ibm-products/issues/6079)) ([dd7564d](https://github.com/carbon-design-system/ibm-products/commit/dd7564d02dcad68052555eb5b2bf543b4a901992))
* **ExportModal:** update status message ([#6080](https://github.com/carbon-design-system/ibm-products/issues/6080)) ([ec3dead](https://github.com/carbon-design-system/ibm-products/commit/ec3dead1b2dd6c727e09bcd0356d567721d5209f))
* first step logic enhancement for CreateTearsheet ([#5884](https://github.com/carbon-design-system/ibm-products/issues/5884)) ([4f3b70f](https://github.com/carbon-design-system/ibm-products/commit/4f3b70f93d43a94c50b8eea77b5960f30b59c403))
* **getstartedcard:** disable vairant issue in JAWS ([#5886](https://github.com/carbon-design-system/ibm-products/issues/5886)) ([515d4c0](https://github.com/carbon-design-system/ibm-products/commit/515d4c0c89f8fe70539946072e9397d297b0faac))
* **InlineTip:** added optional ? flag on media ([#6137](https://github.com/carbon-design-system/ibm-products/issues/6137)) ([978f3e6](https://github.com/carbon-design-system/ibm-products/commit/978f3e65fff94f6399714fb921e8ef2208a1ec51))
* nofification panel keyboard close focus ([#6113](https://github.com/carbon-design-system/ibm-products/issues/6113)) ([752739b](https://github.com/carbon-design-system/ibm-products/commit/752739bde31c3dcb5de1ff2702167b7a838350dd))
* **NotificationPanel:** add missing role ([#5810](https://github.com/carbon-design-system/ibm-products/issues/5810)) ([bf17410](https://github.com/carbon-design-system/ibm-products/commit/bf1741045997b784c98068c618260dfbc7a79dc6))
* **NotificationPanel:** focus return to trigger on closing notification panel ([#6090](https://github.com/carbon-design-system/ibm-products/issues/6090)) ([6dd626a](https://github.com/carbon-design-system/ibm-products/commit/6dd626ac445a255ca9e7c64eb851c11dbb0117f7))
* **optionstile:** ontoggle should not be required ([#6056](https://github.com/carbon-design-system/ibm-products/issues/6056)) ([af6cf14](https://github.com/carbon-design-system/ibm-products/commit/af6cf147f759f344173baf3350095c319398fe2d)), closes [#4281](https://github.com/carbon-design-system/ibm-products/issues/4281)
* pageheader gap ([#6004](https://github.com/carbon-design-system/ibm-products/issues/6004)) ([97bf3ac](https://github.com/carbon-design-system/ibm-products/commit/97bf3acf41b1ae35875c634cad3315ac5c3d2936))
* **pageheader:** compensate the width of the overflow menu ([#5929](https://github.com/carbon-design-system/ibm-products/issues/5929)) ([baf0ec2](https://github.com/carbon-design-system/ibm-products/commit/baf0ec231c0c343265efbf74b69a9d38db085dd2))
* **ProductiveCard:** makes graph screen readable, story only. ([#5883](https://github.com/carbon-design-system/ibm-products/issues/5883)) ([a2db976](https://github.com/carbon-design-system/ibm-products/commit/a2db976c1609df5fd83459e5137e42d3a356ca5d))
* remove ellipsis from EditInPlace ([#6098](https://github.com/carbon-design-system/ibm-products/issues/6098)) ([0b40cce](https://github.com/carbon-design-system/ibm-products/commit/0b40cce8451abd0e509a6b16490fff862496b414))
* reword props in card stories ([#5871](https://github.com/carbon-design-system/ibm-products/issues/5871)) ([df80f00](https://github.com/carbon-design-system/ibm-products/commit/df80f0029af2c2ec6d7c53b66d69dfc007c1f446))
* role main removed from components ([#6006](https://github.com/carbon-design-system/ibm-products/issues/6006)) ([b334a51](https://github.com/carbon-design-system/ibm-products/commit/b334a51c4aa1f3bae26554a9e0b1e65b663b0eed))
* **sidepanel:** button text change ([#5907](https://github.com/carbon-design-system/ibm-products/issues/5907)) ([f701002](https://github.com/carbon-design-system/ibm-products/commit/f7010028dbedae7178244b4123a3b0bc485efa70))
* **SidePanel:** resolve focus wrap issue when first element is disabled ([#5991](https://github.com/carbon-design-system/ibm-products/issues/5991)) ([426f588](https://github.com/carbon-design-system/ibm-products/commit/426f588dd8351783e2cad24bde4e2a5e36c64ae7))
* **SidePanel:** style issue with multi select ([#6123](https://github.com/carbon-design-system/ibm-products/issues/6123)) ([feb6a99](https://github.com/carbon-design-system/ibm-products/commit/feb6a993cb0971442cca80f4c7c86d90eede0bbf))
* **tagoverflow:** incorrect type for filter prop ([#6000](https://github.com/carbon-design-system/ibm-products/issues/6000)) ([4134043](https://github.com/carbon-design-system/ibm-products/commit/41340439759927a870a335b3dd5dd971e8f44fcb))
* **TagOverflow:** use operational tag ([#6132](https://github.com/carbon-design-system/ibm-products/issues/6132)) ([791cbec](https://github.com/carbon-design-system/ibm-products/commit/791cbecb2319ce832c1a6341c0a8fbf16b76a3e0))
* **TagSet:** fix string formatting ([#5880](https://github.com/carbon-design-system/ibm-products/issues/5880)) ([9339559](https://github.com/carbon-design-system/ibm-products/commit/93395596b529fb2e1bb7591e8d4792f1ff1de7ff))
* **TagSet:** modal gradient ([#4478](https://github.com/carbon-design-system/ibm-products/issues/4478)) ([459109d](https://github.com/carbon-design-system/ibm-products/commit/459109d08ca6baf6a66954dd6fa49360dc553dc6))
* **tagset:** multiline prop broken ([#6027](https://github.com/carbon-design-system/ibm-products/issues/6027)) ([dff3d68](https://github.com/carbon-design-system/ibm-products/commit/dff3d68dcdc6801c58d1299e4ffa91b2578e53a4))
* **tagset:** updates props ([#5962](https://github.com/carbon-design-system/ibm-products/issues/5962)) ([cf7c88c](https://github.com/carbon-design-system/ibm-products/commit/cf7c88c293fa05406837afe68d9775d39998818c))
* tearsheet with nav accessibility ([#5971](https://github.com/carbon-design-system/ibm-products/issues/5971)) ([d2aeeb2](https://github.com/carbon-design-system/ibm-products/commit/d2aeeb2b8e226f1da45bb8fd8ca45584269574d8))
* **Tearsheet:** add missing declaration for headerActions prop ([#6114](https://github.com/carbon-design-system/ibm-products/issues/6114)) ([d1dafa1](https://github.com/carbon-design-system/ibm-products/commit/d1dafa1e94472eb64e769ccd358e5355837fa9a5)), closes [#546](https://github.com/carbon-design-system/ibm-products/issues/546)
* **Tearsheet:** changed actions prop to optional ([#5984](https://github.com/carbon-design-system/ibm-products/issues/5984)) ([068a7df](https://github.com/carbon-design-system/ibm-products/commit/068a7df53265e71193ef583145c69d17b3f76535))
* **tearsheet:** Firefox focuses Tearsheet content div with scroll ([#5973](https://github.com/carbon-design-system/ibm-products/issues/5973)) ([19e319b](https://github.com/carbon-design-system/ibm-products/commit/19e319baff3635fb2d1a54d22cfaa5dfc8e95e23))
* **tearsheet:** focus without sentinels ([#5882](https://github.com/carbon-design-system/ibm-products/issues/5882)) ([f362806](https://github.com/carbon-design-system/ibm-products/commit/f3628062a6e65ea5963353a79da1734db6bc9d80))
* **tearsheet:** implement a workaround ([#5960](https://github.com/carbon-design-system/ibm-products/issues/5960)) ([c7d1ef3](https://github.com/carbon-design-system/ibm-products/commit/c7d1ef37a22f3820dd22ad97cd247c169fdc97b4))
* **Tearsheet:** update portalTarget type ([#5899](https://github.com/carbon-design-system/ibm-products/issues/5899)) ([d7aa99e](https://github.com/carbon-design-system/ibm-products/commit/d7aa99ed058d3cd55302bc6fe5c169e5a120d64e))
* **ToolbarButton:** deprecate iconDescription and use label instead ([#5893](https://github.com/carbon-design-system/ibm-products/issues/5893)) ([b968386](https://github.com/carbon-design-system/ibm-products/commit/b968386090b0934f770c66a6eab08f4af0054ee4))
* update Carbon 11 compatible versions to latest ([#6054](https://github.com/carbon-design-system/ibm-products/issues/6054)) ([0ac7669](https://github.com/carbon-design-system/ibm-products/commit/0ac76692a6eeb85655ca64ca9189297708e26bd9))
* update to Carbon 11 compatible versions to latest ([#5987](https://github.com/carbon-design-system/ibm-products/issues/5987)) ([173e6c6](https://github.com/carbon-design-system/ibm-products/commit/173e6c6455a4fe619d56148ab432926bc6c640a4))
* update toHaveNoAxeViolations and remove skips ([#5955](https://github.com/carbon-design-system/ibm-products/issues/5955)) ([694128b](https://github.com/carbon-design-system/ibm-products/commit/694128bb707a2400d67e6618af3fea3f3ffba86f))
* **useFocus:** change delay to 1ms ([#5950](https://github.com/carbon-design-system/ibm-products/issues/5950)) ([5883cd3](https://github.com/carbon-design-system/ibm-products/commit/5883cd3a14039ab7ca044b4ab95621bb70ccf68e))


### Features

* **`ibm-products-web-components`:** setup new web component package and storybook ([#6148](https://github.com/carbon-design-system/ibm-products/issues/6148)) ([6962187](https://github.com/carbon-design-system/ibm-products/commit/6962187634ba4317c5a4dcbf495978a176efcb79))
* adding the ability to disable modals for TagSet component ([#5753](https://github.com/carbon-design-system/ibm-products/issues/5753)) ([29e960c](https://github.com/carbon-design-system/ibm-products/commit/29e960c858d2c58d46c86e9ea638a351d5fddd76))
* **ConditionBuilder:** enhancing the conditional operators section that manages the primary logic flow ([#5921](https://github.com/carbon-design-system/ibm-products/issues/5921)) ([91733fb](https://github.com/carbon-design-system/ibm-products/commit/91733fb43157eab26c885f0652adaf9276f372d4))
* **ConditionBuilder:** option to default enable with initial state ([#6007](https://github.com/carbon-design-system/ibm-products/issues/6007)) ([3b2b91c](https://github.com/carbon-design-system/ibm-products/commit/3b2b91c63157d748425c1fa85ed70411e2c7e018))
* **Conditionbuilder:** renaming both variants to Hierarchical and Non-Hierarchical ([#5847](https://github.com/carbon-design-system/ibm-products/issues/5847)) ([791e2b3](https://github.com/carbon-design-system/ibm-products/commit/791e2b31549f3f4480cac2fc142e550b5e12ea31))
* **datagrid:** adds radio filter ([#5877](https://github.com/carbon-design-system/ibm-products/issues/5877)) ([12667e8](https://github.com/carbon-design-system/ibm-products/commit/12667e8387afc97c8a81a791c72f7ad323d7be6b))
* **Datagrid:** call onClearFilters when clearing filters from tag summary ([#5892](https://github.com/carbon-design-system/ibm-products/issues/5892)) ([791618a](https://github.com/carbon-design-system/ibm-products/commit/791618a11618f120b15444dde994da65576a79ff))
* **datagrids:** Add custom batch actions display min ([#5776](https://github.com/carbon-design-system/ibm-products/issues/5776)) ([485e8bc](https://github.com/carbon-design-system/ibm-products/commit/485e8bcac3193e56d65721076160944b4e126256))
* **tagset:** support for size on overflow tag ([#6065](https://github.com/carbon-design-system/ibm-products/issues/6065)) ([ba29c09](https://github.com/carbon-design-system/ibm-products/commit/ba29c0950f1fcc7388e58523e94a32abd588d59d))





# [2.51.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.51.0-rc.0...@carbon/ibm-products@2.51.0) (2024-10-09)

**Note:** Version bump only for package @carbon/ibm-products





# [2.51.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.48.0-rc.0...@carbon/ibm-products@2.51.0-rc.0) (2024-09-30)


### Bug Fixes

* **AboutModal:** implement useFocus() ([#5981](https://github.com/carbon-design-system/ibm-products/issues/5981)) ([e37beea](https://github.com/carbon-design-system/ibm-products/commit/e37beeafa1f592de3c9a38930487ed7cf4e8239b))
* add floating ui to tagset ([#6005](https://github.com/carbon-design-system/ibm-products/issues/6005)) ([fac868b](https://github.com/carbon-design-system/ibm-products/commit/fac868b0bb3382aac79ab2780480d58e901da517))
* add primaryButtonDisabled prop to ProductiveCard ([#6100](https://github.com/carbon-design-system/ibm-products/issues/6100)) ([7d17364](https://github.com/carbon-design-system/ibm-products/commit/7d17364029712bd54fc9f97e7a2c1af0a9e7b381))
* **Conditionbuilder:** add await for accessibility test ([#5794](https://github.com/carbon-design-system/ibm-products/issues/5794)) ([0d86010](https://github.com/carbon-design-system/ibm-products/commit/0d860101791e8587f8d1688348aae8438c4d0fc9))
* **ConditionBuilder:** correct role for NON HIERARCHICAL_VARIANT ([#6117](https://github.com/carbon-design-system/ibm-products/issues/6117)) ([6c7823e](https://github.com/carbon-design-system/ibm-products/commit/6c7823ed1405d0dfa6ef51cac89e0373f6763ef0))
* **create-full-page-step:** update hasFieldSet type ([#5876](https://github.com/carbon-design-system/ibm-products/issues/5876)) ([54afdf6](https://github.com/carbon-design-system/ibm-products/commit/54afdf6f31b60e87a21949a69e01ec94bbdc2b79))
* **CreateFullPage:** breadcrumb tooltip  visibility issue ([#6064](https://github.com/carbon-design-system/ibm-products/issues/6064)) ([03eadd2](https://github.com/carbon-design-system/ibm-products/commit/03eadd20c856a18121c5cb516fd49cd2ddc87b6a))
* **CreateFullPage:** breadcrumbs should be array ([#6058](https://github.com/carbon-design-system/ibm-products/issues/6058)) ([f076047](https://github.com/carbon-design-system/ibm-products/commit/f076047b593235b01b9c4666194c080e0b4a3b4e)), closes [#5707](https://github.com/carbon-design-system/ibm-products/issues/5707)
* **createfullpagestep:** hasFieldset and fieldsetLegendText types ([#6057](https://github.com/carbon-design-system/ibm-products/issues/6057)) ([b5db933](https://github.com/carbon-design-system/ibm-products/commit/b5db933dc668b451451736dc61fc18d35ba38ec5)), closes [#4512](https://github.com/carbon-design-system/ibm-products/issues/4512)
* **CreateTearsheet:** add custom button ([#5666](https://github.com/carbon-design-system/ibm-products/issues/5666)) ([d5f9538](https://github.com/carbon-design-system/ibm-products/commit/d5f9538902233075e38a60abf70efc52838f5804))
* data spreadsheet object drag drop ([#5800](https://github.com/carbon-design-system/ibm-products/issues/5800)) ([25e95ba](https://github.com/carbon-design-system/ibm-products/commit/25e95bab041d69b28cc8e2a1c15ddd78ea4ab311))
* **datagrid:** batch no longer updates filter tag ([#6031](https://github.com/carbon-design-system/ibm-products/issues/6031)) ([11c1554](https://github.com/carbon-design-system/ibm-products/commit/11c1554ba92037f559862ad9c83cfdf048074659))
* **Datagrid:** clickable row retain focus after sidepanel closes ([#5952](https://github.com/carbon-design-system/ibm-products/issues/5952)) ([0df9085](https://github.com/carbon-design-system/ibm-products/commit/0df908523eab166b8bb63731f60a727ef846e41f))
* **Datagrid:** csp violation ([#5831](https://github.com/carbon-design-system/ibm-products/issues/5831)) ([73a9824](https://github.com/carbon-design-system/ibm-products/commit/73a98242150e421a7c414bf7743f453a2234caba))
* **datagrid:** customise column tearsheet update issue with new columns ([#5953](https://github.com/carbon-design-system/ibm-products/issues/5953)) ([7ab472a](https://github.com/carbon-design-system/ibm-products/commit/7ab472a22d78b07b900513f0b1a0ddce8b7db2f7))
* **DataGrid:** disable save button on customise column ([#6026](https://github.com/carbon-design-system/ibm-products/issues/6026)) ([2b32f0f](https://github.com/carbon-design-system/ibm-products/commit/2b32f0fa54034d347438347e69dfd865c1248f9f))
* **Datagrid:** enabled spacer column conditionally ([#5920](https://github.com/carbon-design-system/ibm-products/issues/5920)) ([9bd307e](https://github.com/carbon-design-system/ibm-products/commit/9bd307e4836d986383a0464e799834712f3904e0))
* **datagrid:** fixes multiselect for instant update bug ([#5970](https://github.com/carbon-design-system/ibm-products/issues/5970)) ([330e902](https://github.com/carbon-design-system/ibm-products/commit/330e902c94cf3c8720ddb4360c1ae313c12f756e))
* **dataGrid:** focus loss on radio select ([#6073](https://github.com/carbon-design-system/ibm-products/issues/6073)) ([127824b](https://github.com/carbon-design-system/ibm-products/commit/127824b9dcdb9847a58940305bb06c35565c720c))
* **datagrid:** hidden columns included in search results ([#5989](https://github.com/carbon-design-system/ibm-products/issues/5989)) ([189f452](https://github.com/carbon-design-system/ibm-products/commit/189f4522187981788b0eb431b89f8b6e89eecd47))
* **Datagrid:** remove redundant aria disabled ([#6103](https://github.com/carbon-design-system/ibm-products/issues/6103)) ([5b58d50](https://github.com/carbon-design-system/ibm-products/commit/5b58d506a39b3d625e169004e1385ae9cfcc6985))
* **Datagrid:** remove unused span with inputProps ([#5915](https://github.com/carbon-design-system/ibm-products/issues/5915)) ([517e4f3](https://github.com/carbon-design-system/ibm-products/commit/517e4f36631cf1cc81d6f21fd25a83b3c65da540))
* **Datagrid:** return null for older react versions ([#6003](https://github.com/carbon-design-system/ibm-products/issues/6003)) ([6938654](https://github.com/carbon-design-system/ibm-products/commit/6938654a3ec57ea63f69c4390ffa5a290c01d886))
* **DataGrid:** row size change issues with virtual scrolling enabled ([#5895](https://github.com/carbon-design-system/ibm-products/issues/5895)) ([a297e8a](https://github.com/carbon-design-system/ibm-products/commit/a297e8a1dc67e8017083452c79b5162eaf282c99))
* **Datagrid:** select all checkbox to select current page ([#5933](https://github.com/carbon-design-system/ibm-products/issues/5933)) ([602f85d](https://github.com/carbon-design-system/ibm-products/commit/602f85d0a3afd507b31157df27091fc94e60bf27))
* **Datagrid:** select all row count updated to exclude disabled rows ([#6085](https://github.com/carbon-design-system/ibm-products/issues/6085)) ([c7064de](https://github.com/carbon-design-system/ibm-products/commit/c7064de5be480840775039e2e4bdad00fbf8d4ce))
* **datagrid:** selectall selects disabled rows ([#6008](https://github.com/carbon-design-system/ibm-products/issues/6008)) ([01d973f](https://github.com/carbon-design-system/ibm-products/commit/01d973f95256ee174e59c902e4c46ddc4781b13f))
* **Datagrid:** skip await  getAsyncSubRows when not defined ([#6028](https://github.com/carbon-design-system/ibm-products/issues/6028)) ([7390b55](https://github.com/carbon-design-system/ibm-products/commit/7390b55425aaf1ceff75056bcb81e2d09d61c118))
* **datagrid:** tooltip missing in Customize Columns modal ([#6036](https://github.com/carbon-design-system/ibm-products/issues/6036)) ([15ec2a5](https://github.com/carbon-design-system/ibm-products/commit/15ec2a5277c9ef1ba1b972b57d050e4af7da2766))
* **datagrid:** unique name attribute for row settings radio buttons ([#6009](https://github.com/carbon-design-system/ibm-products/issues/6009)) ([618cc84](https://github.com/carbon-design-system/ibm-products/commit/618cc84a372301571df132a21a06051c8d35a33a))
* **datagrid:** use same empty array every time ([#5999](https://github.com/carbon-design-system/ibm-products/issues/5999)) ([e6ce08b](https://github.com/carbon-design-system/ibm-products/commit/e6ce08b236acf9f7360e01b2ebb5e5a8568afc9c)), closes [#5998](https://github.com/carbon-design-system/ibm-products/issues/5998)
* **Datagrid:** width logic for useSortableColumns vs useActionsColumn ([#6029](https://github.com/carbon-design-system/ibm-products/issues/6029)) ([66f9eee](https://github.com/carbon-design-system/ibm-products/commit/66f9eeeb8df559b3f7cc98989853cce3e85f5852))
* **EditInPlace:** removes focus when pressing esc or enter key ([#5943](https://github.com/carbon-design-system/ibm-products/issues/5943)) ([5eff024](https://github.com/carbon-design-system/ibm-products/commit/5eff0243b65123fb39c801194a1b1a8bb9889240))
* **Export Modal:** Focus moves to parent page ([#6077](https://github.com/carbon-design-system/ibm-products/issues/6077)) ([ef4bfa8](https://github.com/carbon-design-system/ibm-products/commit/ef4bfa87d454eba9ce8b4cb83a464e95d66a189e))
* **ExportModal:** screen reader indentifies hidden controls ([#6079](https://github.com/carbon-design-system/ibm-products/issues/6079)) ([dd7564d](https://github.com/carbon-design-system/ibm-products/commit/dd7564d02dcad68052555eb5b2bf543b4a901992))
* **ExportModal:** update status message ([#6080](https://github.com/carbon-design-system/ibm-products/issues/6080)) ([ec3dead](https://github.com/carbon-design-system/ibm-products/commit/ec3dead1b2dd6c727e09bcd0356d567721d5209f))
* first step logic enhancement for CreateTearsheet ([#5884](https://github.com/carbon-design-system/ibm-products/issues/5884)) ([4f3b70f](https://github.com/carbon-design-system/ibm-products/commit/4f3b70f93d43a94c50b8eea77b5960f30b59c403))
* **getstartedcard:** disable vairant issue in JAWS ([#5886](https://github.com/carbon-design-system/ibm-products/issues/5886)) ([515d4c0](https://github.com/carbon-design-system/ibm-products/commit/515d4c0c89f8fe70539946072e9397d297b0faac))
* nofification panel keyboard close focus ([#6113](https://github.com/carbon-design-system/ibm-products/issues/6113)) ([752739b](https://github.com/carbon-design-system/ibm-products/commit/752739bde31c3dcb5de1ff2702167b7a838350dd))
* **NotificationPanel:** add missing role ([#5810](https://github.com/carbon-design-system/ibm-products/issues/5810)) ([bf17410](https://github.com/carbon-design-system/ibm-products/commit/bf1741045997b784c98068c618260dfbc7a79dc6))
* **NotificationPanel:** focus return to trigger on closing notification panel ([#6090](https://github.com/carbon-design-system/ibm-products/issues/6090)) ([6dd626a](https://github.com/carbon-design-system/ibm-products/commit/6dd626ac445a255ca9e7c64eb851c11dbb0117f7))
* **optionstile:** ontoggle should not be required ([#6056](https://github.com/carbon-design-system/ibm-products/issues/6056)) ([af6cf14](https://github.com/carbon-design-system/ibm-products/commit/af6cf147f759f344173baf3350095c319398fe2d)), closes [#4281](https://github.com/carbon-design-system/ibm-products/issues/4281)
* pageheader gap ([#6004](https://github.com/carbon-design-system/ibm-products/issues/6004)) ([97bf3ac](https://github.com/carbon-design-system/ibm-products/commit/97bf3acf41b1ae35875c634cad3315ac5c3d2936))
* **pageheader:** compensate the width of the overflow menu ([#5929](https://github.com/carbon-design-system/ibm-products/issues/5929)) ([baf0ec2](https://github.com/carbon-design-system/ibm-products/commit/baf0ec231c0c343265efbf74b69a9d38db085dd2))
* **ProductiveCard:** makes graph screen readable, story only. ([#5883](https://github.com/carbon-design-system/ibm-products/issues/5883)) ([a2db976](https://github.com/carbon-design-system/ibm-products/commit/a2db976c1609df5fd83459e5137e42d3a356ca5d))
* remove ellipsis from EditInPlace ([#6098](https://github.com/carbon-design-system/ibm-products/issues/6098)) ([0b40cce](https://github.com/carbon-design-system/ibm-products/commit/0b40cce8451abd0e509a6b16490fff862496b414))
* reword props in card stories ([#5871](https://github.com/carbon-design-system/ibm-products/issues/5871)) ([df80f00](https://github.com/carbon-design-system/ibm-products/commit/df80f0029af2c2ec6d7c53b66d69dfc007c1f446))
* role main removed from components ([#6006](https://github.com/carbon-design-system/ibm-products/issues/6006)) ([b334a51](https://github.com/carbon-design-system/ibm-products/commit/b334a51c4aa1f3bae26554a9e0b1e65b663b0eed))
* **sidepanel:** button text change ([#5907](https://github.com/carbon-design-system/ibm-products/issues/5907)) ([f701002](https://github.com/carbon-design-system/ibm-products/commit/f7010028dbedae7178244b4123a3b0bc485efa70))
* **SidePanel:** resolve focus wrap issue when first element is disabled ([#5991](https://github.com/carbon-design-system/ibm-products/issues/5991)) ([426f588](https://github.com/carbon-design-system/ibm-products/commit/426f588dd8351783e2cad24bde4e2a5e36c64ae7))
* **SidePanel:** style issue with multi select ([#6123](https://github.com/carbon-design-system/ibm-products/issues/6123)) ([feb6a99](https://github.com/carbon-design-system/ibm-products/commit/feb6a993cb0971442cca80f4c7c86d90eede0bbf))
* **tagoverflow:** incorrect type for filter prop ([#6000](https://github.com/carbon-design-system/ibm-products/issues/6000)) ([4134043](https://github.com/carbon-design-system/ibm-products/commit/41340439759927a870a335b3dd5dd971e8f44fcb))
* **TagSet:** fix string formatting ([#5880](https://github.com/carbon-design-system/ibm-products/issues/5880)) ([9339559](https://github.com/carbon-design-system/ibm-products/commit/93395596b529fb2e1bb7591e8d4792f1ff1de7ff))
* **tagset:** multiline prop broken ([#6027](https://github.com/carbon-design-system/ibm-products/issues/6027)) ([dff3d68](https://github.com/carbon-design-system/ibm-products/commit/dff3d68dcdc6801c58d1299e4ffa91b2578e53a4))
* **tagset:** updates props ([#5962](https://github.com/carbon-design-system/ibm-products/issues/5962)) ([cf7c88c](https://github.com/carbon-design-system/ibm-products/commit/cf7c88c293fa05406837afe68d9775d39998818c))
* tearsheet with nav accessibility ([#5971](https://github.com/carbon-design-system/ibm-products/issues/5971)) ([d2aeeb2](https://github.com/carbon-design-system/ibm-products/commit/d2aeeb2b8e226f1da45bb8fd8ca45584269574d8))
* **Tearsheet:** changed actions prop to optional ([#5984](https://github.com/carbon-design-system/ibm-products/issues/5984)) ([068a7df](https://github.com/carbon-design-system/ibm-products/commit/068a7df53265e71193ef583145c69d17b3f76535))
* **tearsheet:** Firefox focuses Tearsheet content div with scroll ([#5973](https://github.com/carbon-design-system/ibm-products/issues/5973)) ([19e319b](https://github.com/carbon-design-system/ibm-products/commit/19e319baff3635fb2d1a54d22cfaa5dfc8e95e23))
* **tearsheet:** focus without sentinels ([#5882](https://github.com/carbon-design-system/ibm-products/issues/5882)) ([f362806](https://github.com/carbon-design-system/ibm-products/commit/f3628062a6e65ea5963353a79da1734db6bc9d80))
* **tearsheet:** implement a workaround ([#5960](https://github.com/carbon-design-system/ibm-products/issues/5960)) ([c7d1ef3](https://github.com/carbon-design-system/ibm-products/commit/c7d1ef37a22f3820dd22ad97cd247c169fdc97b4))
* **Tearsheet:** update portalTarget type ([#5899](https://github.com/carbon-design-system/ibm-products/issues/5899)) ([d7aa99e](https://github.com/carbon-design-system/ibm-products/commit/d7aa99ed058d3cd55302bc6fe5c169e5a120d64e))
* **ToolbarButton:** deprecate iconDescription and use label instead ([#5893](https://github.com/carbon-design-system/ibm-products/issues/5893)) ([b968386](https://github.com/carbon-design-system/ibm-products/commit/b968386090b0934f770c66a6eab08f4af0054ee4))
* update Carbon 11 compatible versions to latest ([#6054](https://github.com/carbon-design-system/ibm-products/issues/6054)) ([0ac7669](https://github.com/carbon-design-system/ibm-products/commit/0ac76692a6eeb85655ca64ca9189297708e26bd9))
* update to Carbon 11 compatible versions to latest ([#5987](https://github.com/carbon-design-system/ibm-products/issues/5987)) ([173e6c6](https://github.com/carbon-design-system/ibm-products/commit/173e6c6455a4fe619d56148ab432926bc6c640a4))
* update toHaveNoAxeViolations and remove skips ([#5955](https://github.com/carbon-design-system/ibm-products/issues/5955)) ([694128b](https://github.com/carbon-design-system/ibm-products/commit/694128bb707a2400d67e6618af3fea3f3ffba86f))
* **useFocus:** change delay to 1ms ([#5950](https://github.com/carbon-design-system/ibm-products/issues/5950)) ([5883cd3](https://github.com/carbon-design-system/ibm-products/commit/5883cd3a14039ab7ca044b4ab95621bb70ccf68e))


### Features

* **ConditionBuilder:** enhancing the conditional operators section that manages the primary logic flow ([#5921](https://github.com/carbon-design-system/ibm-products/issues/5921)) ([91733fb](https://github.com/carbon-design-system/ibm-products/commit/91733fb43157eab26c885f0652adaf9276f372d4))
* **ConditionBuilder:** option to default enable with initial state ([#6007](https://github.com/carbon-design-system/ibm-products/issues/6007)) ([3b2b91c](https://github.com/carbon-design-system/ibm-products/commit/3b2b91c63157d748425c1fa85ed70411e2c7e018))
* **Conditionbuilder:** renaming both variants to Hierarchical and Non-Hierarchical ([#5847](https://github.com/carbon-design-system/ibm-products/issues/5847)) ([791e2b3](https://github.com/carbon-design-system/ibm-products/commit/791e2b31549f3f4480cac2fc142e550b5e12ea31))
* **datagrid:** adds radio filter ([#5877](https://github.com/carbon-design-system/ibm-products/issues/5877)) ([12667e8](https://github.com/carbon-design-system/ibm-products/commit/12667e8387afc97c8a81a791c72f7ad323d7be6b))
* **Datagrid:** call onClearFilters when clearing filters from tag summary ([#5892](https://github.com/carbon-design-system/ibm-products/issues/5892)) ([791618a](https://github.com/carbon-design-system/ibm-products/commit/791618a11618f120b15444dde994da65576a79ff))
* **datagrids:** Add custom batch actions display min ([#5776](https://github.com/carbon-design-system/ibm-products/issues/5776)) ([485e8bc](https://github.com/carbon-design-system/ibm-products/commit/485e8bcac3193e56d65721076160944b4e126256))
* **tagset:** support for size on overflow tag ([#6065](https://github.com/carbon-design-system/ibm-products/issues/6065)) ([ba29c09](https://github.com/carbon-design-system/ibm-products/commit/ba29c0950f1fcc7388e58523e94a32abd588d59d))





# [2.50.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.50.0-rc.1...@carbon/ibm-products@2.50.0) (2024-09-25)

**Note:** Version bump only for package @carbon/ibm-products





# [2.50.0-rc.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.50.0-rc.0...@carbon/ibm-products@2.50.0-rc.1) (2024-09-20)


### Bug Fixes

* **Datagrid:** dynamic nested rows skeleton always showing regardless of dynamic prop being set ([#6076](https://github.com/carbon-design-system/ibm-products/issues/6076)) ([2d7c570](https://github.com/carbon-design-system/ibm-products/commit/2d7c570a9814bb63bf0c49db43c21dc8e3cd47a6))





# [2.50.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.48.0-rc.0...@carbon/ibm-products@2.50.0-rc.0) (2024-09-16)


### Bug Fixes

* **AboutModal:** implement useFocus() ([#5981](https://github.com/carbon-design-system/ibm-products/issues/5981)) ([e37beea](https://github.com/carbon-design-system/ibm-products/commit/e37beeafa1f592de3c9a38930487ed7cf4e8239b))
* add floating ui to tagset ([#6005](https://github.com/carbon-design-system/ibm-products/issues/6005)) ([fac868b](https://github.com/carbon-design-system/ibm-products/commit/fac868b0bb3382aac79ab2780480d58e901da517))
* **Conditionbuilder:** add await for accessibility test ([#5794](https://github.com/carbon-design-system/ibm-products/issues/5794)) ([0d86010](https://github.com/carbon-design-system/ibm-products/commit/0d860101791e8587f8d1688348aae8438c4d0fc9))
* **create-full-page-step:** update hasFieldSet type ([#5876](https://github.com/carbon-design-system/ibm-products/issues/5876)) ([54afdf6](https://github.com/carbon-design-system/ibm-products/commit/54afdf6f31b60e87a21949a69e01ec94bbdc2b79))
* **CreateTearsheet:** add custom button ([#5666](https://github.com/carbon-design-system/ibm-products/issues/5666)) ([d5f9538](https://github.com/carbon-design-system/ibm-products/commit/d5f9538902233075e38a60abf70efc52838f5804))
* data spreadsheet object drag drop ([#5800](https://github.com/carbon-design-system/ibm-products/issues/5800)) ([25e95ba](https://github.com/carbon-design-system/ibm-products/commit/25e95bab041d69b28cc8e2a1c15ddd78ea4ab311))
* **Datagrid:** clickable row retain focus after sidepanel closes ([#5952](https://github.com/carbon-design-system/ibm-products/issues/5952)) ([0df9085](https://github.com/carbon-design-system/ibm-products/commit/0df908523eab166b8bb63731f60a727ef846e41f))
* **Datagrid:** csp violation ([#5831](https://github.com/carbon-design-system/ibm-products/issues/5831)) ([73a9824](https://github.com/carbon-design-system/ibm-products/commit/73a98242150e421a7c414bf7743f453a2234caba))
* **datagrid:** customise column tearsheet update issue with new columns ([#5953](https://github.com/carbon-design-system/ibm-products/issues/5953)) ([7ab472a](https://github.com/carbon-design-system/ibm-products/commit/7ab472a22d78b07b900513f0b1a0ddce8b7db2f7))
* **Datagrid:** enabled spacer column conditionally ([#5920](https://github.com/carbon-design-system/ibm-products/issues/5920)) ([9bd307e](https://github.com/carbon-design-system/ibm-products/commit/9bd307e4836d986383a0464e799834712f3904e0))
* **datagrid:** fixes multiselect for instant update bug ([#5970](https://github.com/carbon-design-system/ibm-products/issues/5970)) ([330e902](https://github.com/carbon-design-system/ibm-products/commit/330e902c94cf3c8720ddb4360c1ae313c12f756e))
* **Datagrid:** remove unused span with inputProps ([#5915](https://github.com/carbon-design-system/ibm-products/issues/5915)) ([517e4f3](https://github.com/carbon-design-system/ibm-products/commit/517e4f36631cf1cc81d6f21fd25a83b3c65da540))
* **Datagrid:** return null for older react versions ([#6003](https://github.com/carbon-design-system/ibm-products/issues/6003)) ([6938654](https://github.com/carbon-design-system/ibm-products/commit/6938654a3ec57ea63f69c4390ffa5a290c01d886))
* **DataGrid:** row size change issues with virtual scrolling enabled ([#5895](https://github.com/carbon-design-system/ibm-products/issues/5895)) ([a297e8a](https://github.com/carbon-design-system/ibm-products/commit/a297e8a1dc67e8017083452c79b5162eaf282c99))
* **Datagrid:** select all checkbox to select current page ([#5933](https://github.com/carbon-design-system/ibm-products/issues/5933)) ([602f85d](https://github.com/carbon-design-system/ibm-products/commit/602f85d0a3afd507b31157df27091fc94e60bf27))
* **datagrid:** selectall selects disabled rows ([#6008](https://github.com/carbon-design-system/ibm-products/issues/6008)) ([01d973f](https://github.com/carbon-design-system/ibm-products/commit/01d973f95256ee174e59c902e4c46ddc4781b13f))
* **datagrid:** unique name attribute for row settings radio buttons ([#6009](https://github.com/carbon-design-system/ibm-products/issues/6009)) ([618cc84](https://github.com/carbon-design-system/ibm-products/commit/618cc84a372301571df132a21a06051c8d35a33a))
* **datagrid:** use same empty array every time ([#5999](https://github.com/carbon-design-system/ibm-products/issues/5999)) ([e6ce08b](https://github.com/carbon-design-system/ibm-products/commit/e6ce08b236acf9f7360e01b2ebb5e5a8568afc9c)), closes [#5998](https://github.com/carbon-design-system/ibm-products/issues/5998)
* **Datagrid:** width logic for useSortableColumns vs useActionsColumn ([#6029](https://github.com/carbon-design-system/ibm-products/issues/6029)) ([66f9eee](https://github.com/carbon-design-system/ibm-products/commit/66f9eeeb8df559b3f7cc98989853cce3e85f5852))
* **EditInPlace:** removes focus when pressing esc or enter key ([#5943](https://github.com/carbon-design-system/ibm-products/issues/5943)) ([5eff024](https://github.com/carbon-design-system/ibm-products/commit/5eff0243b65123fb39c801194a1b1a8bb9889240))
* first step logic enhancement for CreateTearsheet ([#5884](https://github.com/carbon-design-system/ibm-products/issues/5884)) ([4f3b70f](https://github.com/carbon-design-system/ibm-products/commit/4f3b70f93d43a94c50b8eea77b5960f30b59c403))
* **getstartedcard:** disable vairant issue in JAWS ([#5886](https://github.com/carbon-design-system/ibm-products/issues/5886)) ([515d4c0](https://github.com/carbon-design-system/ibm-products/commit/515d4c0c89f8fe70539946072e9397d297b0faac))
* **NotificationPanel:** add missing role ([#5810](https://github.com/carbon-design-system/ibm-products/issues/5810)) ([bf17410](https://github.com/carbon-design-system/ibm-products/commit/bf1741045997b784c98068c618260dfbc7a79dc6))
* pageheader gap ([#6004](https://github.com/carbon-design-system/ibm-products/issues/6004)) ([97bf3ac](https://github.com/carbon-design-system/ibm-products/commit/97bf3acf41b1ae35875c634cad3315ac5c3d2936))
* **pageheader:** compensate the width of the overflow menu ([#5929](https://github.com/carbon-design-system/ibm-products/issues/5929)) ([baf0ec2](https://github.com/carbon-design-system/ibm-products/commit/baf0ec231c0c343265efbf74b69a9d38db085dd2))
* **ProductiveCard:** makes graph screen readable, story only. ([#5883](https://github.com/carbon-design-system/ibm-products/issues/5883)) ([a2db976](https://github.com/carbon-design-system/ibm-products/commit/a2db976c1609df5fd83459e5137e42d3a356ca5d))
* reword props in card stories ([#5871](https://github.com/carbon-design-system/ibm-products/issues/5871)) ([df80f00](https://github.com/carbon-design-system/ibm-products/commit/df80f0029af2c2ec6d7c53b66d69dfc007c1f446))
* role main removed from components ([#6006](https://github.com/carbon-design-system/ibm-products/issues/6006)) ([b334a51](https://github.com/carbon-design-system/ibm-products/commit/b334a51c4aa1f3bae26554a9e0b1e65b663b0eed))
* **sidepanel:** button text change ([#5907](https://github.com/carbon-design-system/ibm-products/issues/5907)) ([f701002](https://github.com/carbon-design-system/ibm-products/commit/f7010028dbedae7178244b4123a3b0bc485efa70))
* **SidePanel:** resolve focus wrap issue when first element is disabled ([#5991](https://github.com/carbon-design-system/ibm-products/issues/5991)) ([426f588](https://github.com/carbon-design-system/ibm-products/commit/426f588dd8351783e2cad24bde4e2a5e36c64ae7))
* **tagoverflow:** incorrect type for filter prop ([#6000](https://github.com/carbon-design-system/ibm-products/issues/6000)) ([4134043](https://github.com/carbon-design-system/ibm-products/commit/41340439759927a870a335b3dd5dd971e8f44fcb))
* **TagSet:** fix string formatting ([#5880](https://github.com/carbon-design-system/ibm-products/issues/5880)) ([9339559](https://github.com/carbon-design-system/ibm-products/commit/93395596b529fb2e1bb7591e8d4792f1ff1de7ff))
* **tagset:** multiline prop broken ([#6027](https://github.com/carbon-design-system/ibm-products/issues/6027)) ([dff3d68](https://github.com/carbon-design-system/ibm-products/commit/dff3d68dcdc6801c58d1299e4ffa91b2578e53a4))
* **tagset:** updates props ([#5962](https://github.com/carbon-design-system/ibm-products/issues/5962)) ([cf7c88c](https://github.com/carbon-design-system/ibm-products/commit/cf7c88c293fa05406837afe68d9775d39998818c))
* tearsheet with nav accessibility ([#5971](https://github.com/carbon-design-system/ibm-products/issues/5971)) ([d2aeeb2](https://github.com/carbon-design-system/ibm-products/commit/d2aeeb2b8e226f1da45bb8fd8ca45584269574d8))
* **Tearsheet:** changed actions prop to optional ([#5984](https://github.com/carbon-design-system/ibm-products/issues/5984)) ([068a7df](https://github.com/carbon-design-system/ibm-products/commit/068a7df53265e71193ef583145c69d17b3f76535))
* **tearsheet:** Firefox focuses Tearsheet content div with scroll ([#5973](https://github.com/carbon-design-system/ibm-products/issues/5973)) ([19e319b](https://github.com/carbon-design-system/ibm-products/commit/19e319baff3635fb2d1a54d22cfaa5dfc8e95e23))
* **tearsheet:** focus without sentinels ([#5882](https://github.com/carbon-design-system/ibm-products/issues/5882)) ([f362806](https://github.com/carbon-design-system/ibm-products/commit/f3628062a6e65ea5963353a79da1734db6bc9d80))
* **tearsheet:** implement a workaround ([#5960](https://github.com/carbon-design-system/ibm-products/issues/5960)) ([c7d1ef3](https://github.com/carbon-design-system/ibm-products/commit/c7d1ef37a22f3820dd22ad97cd247c169fdc97b4))
* **Tearsheet:** update portalTarget type ([#5899](https://github.com/carbon-design-system/ibm-products/issues/5899)) ([d7aa99e](https://github.com/carbon-design-system/ibm-products/commit/d7aa99ed058d3cd55302bc6fe5c169e5a120d64e))
* **ToolbarButton:** deprecate iconDescription and use label instead ([#5893](https://github.com/carbon-design-system/ibm-products/issues/5893)) ([b968386](https://github.com/carbon-design-system/ibm-products/commit/b968386090b0934f770c66a6eab08f4af0054ee4))
* update to Carbon 11 compatible versions to latest ([#5987](https://github.com/carbon-design-system/ibm-products/issues/5987)) ([173e6c6](https://github.com/carbon-design-system/ibm-products/commit/173e6c6455a4fe619d56148ab432926bc6c640a4))
* update toHaveNoAxeViolations and remove skips ([#5955](https://github.com/carbon-design-system/ibm-products/issues/5955)) ([694128b](https://github.com/carbon-design-system/ibm-products/commit/694128bb707a2400d67e6618af3fea3f3ffba86f))
* **useFocus:** change delay to 1ms ([#5950](https://github.com/carbon-design-system/ibm-products/issues/5950)) ([5883cd3](https://github.com/carbon-design-system/ibm-products/commit/5883cd3a14039ab7ca044b4ab95621bb70ccf68e))


### Features

* **ConditionBuilder:** enhancing the conditional operators section that manages the primary logic flow ([#5921](https://github.com/carbon-design-system/ibm-products/issues/5921)) ([91733fb](https://github.com/carbon-design-system/ibm-products/commit/91733fb43157eab26c885f0652adaf9276f372d4))
* **Conditionbuilder:** renaming both variants to Hierarchical and Non-Hierarchical ([#5847](https://github.com/carbon-design-system/ibm-products/issues/5847)) ([791e2b3](https://github.com/carbon-design-system/ibm-products/commit/791e2b31549f3f4480cac2fc142e550b5e12ea31))
* **datagrid:** adds radio filter ([#5877](https://github.com/carbon-design-system/ibm-products/issues/5877)) ([12667e8](https://github.com/carbon-design-system/ibm-products/commit/12667e8387afc97c8a81a791c72f7ad323d7be6b))
* **Datagrid:** call onClearFilters when clearing filters from tag summary ([#5892](https://github.com/carbon-design-system/ibm-products/issues/5892)) ([791618a](https://github.com/carbon-design-system/ibm-products/commit/791618a11618f120b15444dde994da65576a79ff))
* **datagrids:** Add custom batch actions display min ([#5776](https://github.com/carbon-design-system/ibm-products/issues/5776)) ([485e8bc](https://github.com/carbon-design-system/ibm-products/commit/485e8bcac3193e56d65721076160944b4e126256))





## [2.49.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.49.1-rc.0...@carbon/ibm-products@2.49.1) (2024-09-16)

**Note:** Version bump only for package @carbon/ibm-products





## [2.49.1-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.49.0...@carbon/ibm-products@2.49.1-rc.0) (2024-09-13)


### Bug Fixes

* **Datagrid:** return null for older react versions ([#6048](https://github.com/carbon-design-system/ibm-products/issues/6048)) ([386d750](https://github.com/carbon-design-system/ibm-products/commit/386d7504afd35428fb1957ac2104f417f0a8e77e))





# [2.49.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.49.0-rc.0...@carbon/ibm-products@2.49.0) (2024-09-11)

**Note:** Version bump only for package @carbon/ibm-products





# [2.49.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.48.0-rc.0...@carbon/ibm-products@2.49.0-rc.0) (2024-09-03)


### Bug Fixes

* **Conditionbuilder:** add await for accessibility test ([#5794](https://github.com/carbon-design-system/ibm-products/issues/5794)) ([0d86010](https://github.com/carbon-design-system/ibm-products/commit/0d860101791e8587f8d1688348aae8438c4d0fc9))
* **create-full-page-step:** update hasFieldSet type ([#5876](https://github.com/carbon-design-system/ibm-products/issues/5876)) ([54afdf6](https://github.com/carbon-design-system/ibm-products/commit/54afdf6f31b60e87a21949a69e01ec94bbdc2b79))
* data spreadsheet object drag drop ([#5800](https://github.com/carbon-design-system/ibm-products/issues/5800)) ([25e95ba](https://github.com/carbon-design-system/ibm-products/commit/25e95bab041d69b28cc8e2a1c15ddd78ea4ab311))
* **Datagrid:** clickable row retain focus after sidepanel closes ([#5952](https://github.com/carbon-design-system/ibm-products/issues/5952)) ([0df9085](https://github.com/carbon-design-system/ibm-products/commit/0df908523eab166b8bb63731f60a727ef846e41f))
* **Datagrid:** csp violation ([#5831](https://github.com/carbon-design-system/ibm-products/issues/5831)) ([73a9824](https://github.com/carbon-design-system/ibm-products/commit/73a98242150e421a7c414bf7743f453a2234caba))
* **datagrid:** customise column tearsheet update issue with new columns ([#5953](https://github.com/carbon-design-system/ibm-products/issues/5953)) ([7ab472a](https://github.com/carbon-design-system/ibm-products/commit/7ab472a22d78b07b900513f0b1a0ddce8b7db2f7))
* **Datagrid:** remove unused span with inputProps ([#5915](https://github.com/carbon-design-system/ibm-products/issues/5915)) ([517e4f3](https://github.com/carbon-design-system/ibm-products/commit/517e4f36631cf1cc81d6f21fd25a83b3c65da540))
* **DataGrid:** row size change issues with virtual scrolling enabled ([#5895](https://github.com/carbon-design-system/ibm-products/issues/5895)) ([a297e8a](https://github.com/carbon-design-system/ibm-products/commit/a297e8a1dc67e8017083452c79b5162eaf282c99))
* **EditInPlace:** removes focus when pressing esc or enter key ([#5943](https://github.com/carbon-design-system/ibm-products/issues/5943)) ([5eff024](https://github.com/carbon-design-system/ibm-products/commit/5eff0243b65123fb39c801194a1b1a8bb9889240))
* first step logic enhancement for CreateTearsheet ([#5884](https://github.com/carbon-design-system/ibm-products/issues/5884)) ([4f3b70f](https://github.com/carbon-design-system/ibm-products/commit/4f3b70f93d43a94c50b8eea77b5960f30b59c403))
* **getstartedcard:** disable vairant issue in JAWS ([#5886](https://github.com/carbon-design-system/ibm-products/issues/5886)) ([515d4c0](https://github.com/carbon-design-system/ibm-products/commit/515d4c0c89f8fe70539946072e9397d297b0faac))
* **NotificationPanel:** add missing role ([#5810](https://github.com/carbon-design-system/ibm-products/issues/5810)) ([bf17410](https://github.com/carbon-design-system/ibm-products/commit/bf1741045997b784c98068c618260dfbc7a79dc6))
* **ProductiveCard:** makes graph screen readable, story only. ([#5883](https://github.com/carbon-design-system/ibm-products/issues/5883)) ([a2db976](https://github.com/carbon-design-system/ibm-products/commit/a2db976c1609df5fd83459e5137e42d3a356ca5d))
* reword props in card stories ([#5871](https://github.com/carbon-design-system/ibm-products/issues/5871)) ([df80f00](https://github.com/carbon-design-system/ibm-products/commit/df80f0029af2c2ec6d7c53b66d69dfc007c1f446))
* **sidepanel:** button text change ([#5907](https://github.com/carbon-design-system/ibm-products/issues/5907)) ([f701002](https://github.com/carbon-design-system/ibm-products/commit/f7010028dbedae7178244b4123a3b0bc485efa70))
* **TagSet:** fix string formatting ([#5880](https://github.com/carbon-design-system/ibm-products/issues/5880)) ([9339559](https://github.com/carbon-design-system/ibm-products/commit/93395596b529fb2e1bb7591e8d4792f1ff1de7ff))
* **tearsheet:** focus without sentinels ([#5882](https://github.com/carbon-design-system/ibm-products/issues/5882)) ([f362806](https://github.com/carbon-design-system/ibm-products/commit/f3628062a6e65ea5963353a79da1734db6bc9d80))
* **tearsheet:** implement a workaround ([#5960](https://github.com/carbon-design-system/ibm-products/issues/5960)) ([c7d1ef3](https://github.com/carbon-design-system/ibm-products/commit/c7d1ef37a22f3820dd22ad97cd247c169fdc97b4))
* **Tearsheet:** update portalTarget type ([#5899](https://github.com/carbon-design-system/ibm-products/issues/5899)) ([d7aa99e](https://github.com/carbon-design-system/ibm-products/commit/d7aa99ed058d3cd55302bc6fe5c169e5a120d64e))
* **ToolbarButton:** deprecate iconDescription and use label instead ([#5893](https://github.com/carbon-design-system/ibm-products/issues/5893)) ([b968386](https://github.com/carbon-design-system/ibm-products/commit/b968386090b0934f770c66a6eab08f4af0054ee4))
* **useFocus:** change delay to 1ms ([#5950](https://github.com/carbon-design-system/ibm-products/issues/5950)) ([5883cd3](https://github.com/carbon-design-system/ibm-products/commit/5883cd3a14039ab7ca044b4ab95621bb70ccf68e))


### Features

* **ConditionBuilder:** enhancing the conditional operators section that manages the primary logic flow ([#5921](https://github.com/carbon-design-system/ibm-products/issues/5921)) ([91733fb](https://github.com/carbon-design-system/ibm-products/commit/91733fb43157eab26c885f0652adaf9276f372d4))
* **Conditionbuilder:** renaming both variants to Hierarchical and Non-Hierarchical ([#5847](https://github.com/carbon-design-system/ibm-products/issues/5847)) ([791e2b3](https://github.com/carbon-design-system/ibm-products/commit/791e2b31549f3f4480cac2fc142e550b5e12ea31))
* **datagrid:** adds radio filter ([#5877](https://github.com/carbon-design-system/ibm-products/issues/5877)) ([12667e8](https://github.com/carbon-design-system/ibm-products/commit/12667e8387afc97c8a81a791c72f7ad323d7be6b))
* **datagrids:** Add custom batch actions display min ([#5776](https://github.com/carbon-design-system/ibm-products/issues/5776)) ([485e8bc](https://github.com/carbon-design-system/ibm-products/commit/485e8bcac3193e56d65721076160944b4e126256))





# [2.48.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.48.0-rc.0...@carbon/ibm-products@2.48.0) (2024-08-28)

**Note:** Version bump only for package @carbon/ibm-products





# [2.48.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.46.0-rc.0...@carbon/ibm-products@2.48.0-rc.0) (2024-08-20)


### Bug Fixes

* correct auto-generated guidelines links ([#5855](https://github.com/carbon-design-system/ibm-products/issues/5855)) ([9713171](https://github.com/carbon-design-system/ibm-products/commit/9713171d4b466fa7d939e9fe1398d59d4a6c3efe))
* **CreateFullPage:** breadcrumb style issue ([#5761](https://github.com/carbon-design-system/ibm-products/issues/5761)) ([f6e154f](https://github.com/carbon-design-system/ibm-products/commit/f6e154f64da8835e0b5baeb0e2cf007c26174f69))
* datagrid hidden virtual body width ([#5798](https://github.com/carbon-design-system/ibm-products/issues/5798)) ([64ef0c3](https://github.com/carbon-design-system/ibm-products/commit/64ef0c3c8e981c5193e94d25ed4b0413fc2f1f5a))
* datagrid sort reset ([#5795](https://github.com/carbon-design-system/ibm-products/issues/5795)) ([c246a3d](https://github.com/carbon-design-system/ibm-products/commit/c246a3d4cebb84b68cc879805e84466fd81dc1ab))
* **Datagrid:** column custimisation search filter truncation ([#5850](https://github.com/carbon-design-system/ibm-products/issues/5850)) ([b639fe2](https://github.com/carbon-design-system/ibm-products/commit/b639fe20c485ba3d45c8c3edadd670f90672abc8))
* **Datagrid:** editable cell shifting focus to the below cell after edit ([#5744](https://github.com/carbon-design-system/ibm-products/issues/5744)) ([43d4802](https://github.com/carbon-design-system/ibm-products/commit/43d4802a4d774512900ceba3e99adb572ad890ac))
* **datagrid:** filter tooltip causes horizontal scroll ([#5828](https://github.com/carbon-design-system/ibm-products/issues/5828)) ([abc4f22](https://github.com/carbon-design-system/ibm-products/commit/abc4f224025e862c6ff2f71106d7f41201991a64))
* **Datagrid:** only remove single filter for correct table id ([#5654](https://github.com/carbon-design-system/ibm-products/issues/5654)) ([5d21bf8](https://github.com/carbon-design-system/ibm-products/commit/5d21bf822fff0fef64e06de74c59c37470ffd900))
* **datagrid:** screen reader misreads datagrid table headers ([#5716](https://github.com/carbon-design-system/ibm-products/issues/5716)) ([137f5b1](https://github.com/carbon-design-system/ibm-products/commit/137f5b1f103140707b90e1d6f94a0e7ba2636883))
* **Datagrid:** sortable column focus issue ([#5853](https://github.com/carbon-design-system/ibm-products/issues/5853)) ([d679559](https://github.com/carbon-design-system/ibm-products/commit/d67955950c7a8c2ae26a7a88ac77d12b40ba0764))
* **editinplace:** add placeholder for text field ([#5832](https://github.com/carbon-design-system/ibm-products/issues/5832)) ([85430cb](https://github.com/carbon-design-system/ibm-products/commit/85430cbb6ca99c21bc699f216f759d06cad7a8f8))
* navigation tab usage in story ([#5692](https://github.com/carbon-design-system/ibm-products/issues/5692)) ([f4e571c](https://github.com/carbon-design-system/ibm-products/commit/f4e571cb99fe311fc2cc5bc13f72c0de33a73c7d))
* **options-tile:** size prop optional ([#5846](https://github.com/carbon-design-system/ibm-products/issues/5846)) ([da6a696](https://github.com/carbon-design-system/ibm-products/commit/da6a6965dbe59496621ba69f374702058432bc72))
* **PageHeader:** correct conditional for non zero offsets ([#5791](https://github.com/carbon-design-system/ibm-products/issues/5791)) ([2deeb83](https://github.com/carbon-design-system/ibm-products/commit/2deeb8325e99cfa3f435b5ae6004a2cb45368082))
* **ProductiveCard:** with overflow tooltip issue ([#5803](https://github.com/carbon-design-system/ibm-products/issues/5803)) ([413b210](https://github.com/carbon-design-system/ibm-products/commit/413b2107b433d4c58916ba0863a8762372759684))
* **side-panel:** close with esc key ([#5814](https://github.com/carbon-design-system/ibm-products/issues/5814)) ([49b0227](https://github.com/carbon-design-system/ibm-products/commit/49b02278f864e85f31a363491cbba7b8d1a0a4f7))
* **sidepanel:** update carbon style token ([#5809](https://github.com/carbon-design-system/ibm-products/issues/5809)) ([7bc57ff](https://github.com/carbon-design-system/ibm-products/commit/7bc57ff8e5beede05b18665c191a1432e22d0cc4))
* **Tearsheet:** focus specified els for stacked tearsheets ([#5631](https://github.com/carbon-design-system/ibm-products/issues/5631)) ([ef7c9b9](https://github.com/carbon-design-system/ibm-products/commit/ef7c9b9a234428770892220759a594f66b06a9d8))
* **tearsheet:** resolve disabled first element focus issue ([#5840](https://github.com/carbon-design-system/ibm-products/issues/5840)) ([1d8640f](https://github.com/carbon-design-system/ibm-products/commit/1d8640f5d0481f820424dd565c64b409d4ad2010))
* update to Carbon 11 compatible versions to latest ([#5664](https://github.com/carbon-design-system/ibm-products/issues/5664)) ([aa77fed](https://github.com/carbon-design-system/ibm-products/commit/aa77fedd2543836346544f068b60aa7329066af1))
* **useFocus:** variable name changed ([#5812](https://github.com/carbon-design-system/ibm-products/issues/5812)) ([bd91747](https://github.com/carbon-design-system/ibm-products/commit/bd91747bfb73a1ada8d49e5c569b1b3eb31070f0))


### Features

* **CoachmarkStack:** convert to .tsx ([#5234](https://github.com/carbon-design-system/ibm-products/issues/5234)) ([ad6821c](https://github.com/carbon-design-system/ibm-products/commit/ad6821c2d656b8271d4f1044d83d2cd4dee0454a))
* **ConditionBuilder:** design review changes ([#5762](https://github.com/carbon-design-system/ibm-products/issues/5762)) ([5c1e568](https://github.com/carbon-design-system/ibm-products/commit/5c1e5682a1d849f809f252555001adadef3c2800))
* **conditionbuilder:** design review changes 2 ([#5802](https://github.com/carbon-design-system/ibm-products/issues/5802)) ([357fb5d](https://github.com/carbon-design-system/ibm-products/commit/357fb5d964dd83cdff78b7be3615e9de19db922f))
* **Datagrid:** add support for dynamic sub rows ([#5735](https://github.com/carbon-design-system/ibm-products/issues/5735)) ([b5d7e1f](https://github.com/carbon-design-system/ibm-products/commit/b5d7e1f2f17ce37ff596877dd748f8ddb6039fa3))
* **GetStartedCard:** update to typescript ([#5719](https://github.com/carbon-design-system/ibm-products/issues/5719)) ([7731b3c](https://github.com/carbon-design-system/ibm-products/commit/7731b3cccc30dea90b96a6811759a75c554a0729))
* **RemoveModal:** update body to use ReactNode ([#5792](https://github.com/carbon-design-system/ibm-products/issues/5792)) ([353ea28](https://github.com/carbon-design-system/ibm-products/commit/353ea28729a0c1a09d1c66bc36c9e3dec147d146))
* **sidepanel:** adds launcherButtonRef to all stories ([#5845](https://github.com/carbon-design-system/ibm-products/issues/5845)) ([341c391](https://github.com/carbon-design-system/ibm-products/commit/341c39144825d9e0353c49f3b6ca43cd7803cf23))
* **typescript:** exports all types in main index ([#5807](https://github.com/carbon-design-system/ibm-products/issues/5807)) ([a0e6004](https://github.com/carbon-design-system/ibm-products/commit/a0e6004a9a59a917e2fc8eb850bd41902c080efe))
* **typescript:** update generate scripts to use typescript ([#5817](https://github.com/carbon-design-system/ibm-products/issues/5817)) ([8cb241b](https://github.com/carbon-design-system/ibm-products/commit/8cb241bb8b245b21e3d97e89194797f01663d947))





# [2.47.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.47.0-rc.0...@carbon/ibm-products@2.47.0) (2024-08-14)

**Note:** Version bump only for package @carbon/ibm-products





# [2.47.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.46.0-rc.0...@carbon/ibm-products@2.47.0-rc.0) (2024-08-05)


### Bug Fixes

* **CreateFullPage:** breadcrumb style issue ([#5761](https://github.com/carbon-design-system/ibm-products/issues/5761)) ([f6e154f](https://github.com/carbon-design-system/ibm-products/commit/f6e154f64da8835e0b5baeb0e2cf007c26174f69))
* datagrid hidden virtual body width ([#5798](https://github.com/carbon-design-system/ibm-products/issues/5798)) ([64ef0c3](https://github.com/carbon-design-system/ibm-products/commit/64ef0c3c8e981c5193e94d25ed4b0413fc2f1f5a))
* datagrid sort reset ([#5795](https://github.com/carbon-design-system/ibm-products/issues/5795)) ([c246a3d](https://github.com/carbon-design-system/ibm-products/commit/c246a3d4cebb84b68cc879805e84466fd81dc1ab))
* **Datagrid:** editable cell shifting focus to the below cell after edit ([#5744](https://github.com/carbon-design-system/ibm-products/issues/5744)) ([43d4802](https://github.com/carbon-design-system/ibm-products/commit/43d4802a4d774512900ceba3e99adb572ad890ac))
* **Datagrid:** only remove single filter for correct table id ([#5654](https://github.com/carbon-design-system/ibm-products/issues/5654)) ([5d21bf8](https://github.com/carbon-design-system/ibm-products/commit/5d21bf822fff0fef64e06de74c59c37470ffd900))
* **datagrid:** screen reader misreads datagrid table headers ([#5716](https://github.com/carbon-design-system/ibm-products/issues/5716)) ([137f5b1](https://github.com/carbon-design-system/ibm-products/commit/137f5b1f103140707b90e1d6f94a0e7ba2636883))
* navigation tab usage in story ([#5692](https://github.com/carbon-design-system/ibm-products/issues/5692)) ([f4e571c](https://github.com/carbon-design-system/ibm-products/commit/f4e571cb99fe311fc2cc5bc13f72c0de33a73c7d))
* **PageHeader:** correct conditional for non zero offsets ([#5791](https://github.com/carbon-design-system/ibm-products/issues/5791)) ([2deeb83](https://github.com/carbon-design-system/ibm-products/commit/2deeb8325e99cfa3f435b5ae6004a2cb45368082))
* **Tearsheet:** focus specified els for stacked tearsheets ([#5631](https://github.com/carbon-design-system/ibm-products/issues/5631)) ([ef7c9b9](https://github.com/carbon-design-system/ibm-products/commit/ef7c9b9a234428770892220759a594f66b06a9d8))


### Features

* **ConditionBuilder:** design review changes ([#5762](https://github.com/carbon-design-system/ibm-products/issues/5762)) ([5c1e568](https://github.com/carbon-design-system/ibm-products/commit/5c1e5682a1d849f809f252555001adadef3c2800))
* **GetStartedCard:** update to typescript ([#5719](https://github.com/carbon-design-system/ibm-products/issues/5719)) ([7731b3c](https://github.com/carbon-design-system/ibm-products/commit/7731b3cccc30dea90b96a6811759a75c554a0729))





# [2.46.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.46.0-rc.0...@carbon/ibm-products@2.46.0) (2024-07-31)

**Note:** Version bump only for package @carbon/ibm-products





# [2.46.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.45.0...@carbon/ibm-products@2.46.0-rc.0) (2024-07-22)


### Bug Fixes

* **datagrid:** Clear all button not working as expected for multiselect  ([#5635](https://github.com/carbon-design-system/ibm-products/issues/5635)) ([e0eb6fb](https://github.com/carbon-design-system/ibm-products/commit/e0eb6fb53b1cb01482b4c428d3c3901e4ce55514))
* **Datagrid:** incorrect count in column customisation tearsheet, and special columns losing isVisible parameter ([#5606](https://github.com/carbon-design-system/ibm-products/issues/5606)) ([e974388](https://github.com/carbon-design-system/ibm-products/commit/e974388969170c4cf6dcb28adb5f98b3dc5ccc27))
* **Dataspreadsheet:** add callback function for after drag/drop ends ([#5621](https://github.com/carbon-design-system/ibm-products/issues/5621)) ([566a330](https://github.com/carbon-design-system/ibm-products/commit/566a33062126c93ee66c72b3d89454569e46ae9a))
* update carbon packages to resolve max depth multi select issue ([#5643](https://github.com/carbon-design-system/ibm-products/issues/5643)) ([dc7cbc7](https://github.com/carbon-design-system/ibm-products/commit/dc7cbc7b1261c11cc84cfe152ff72bc4dee36738))


### Features

* **conditionBuilder:** accessibility and generic issue fixes ([#5647](https://github.com/carbon-design-system/ibm-products/issues/5647)) ([1b5cdaf](https://github.com/carbon-design-system/ibm-products/commit/1b5cdaf01d8c95acfed93d1c3dee03af7afa093f))
* **ConditionBuilder:** adding test cases and issue fixes ([#5685](https://github.com/carbon-design-system/ibm-products/issues/5685)) ([9b0d58d](https://github.com/carbon-design-system/ibm-products/commit/9b0d58d318e27eb456613a6d1843edb60fba19a0))
* **conditionBuilder:** unit test cases for keyboard navigation ([#5688](https://github.com/carbon-design-system/ibm-products/issues/5688)) ([7f4f39a](https://github.com/carbon-design-system/ibm-products/commit/7f4f39ac9a6c503781f638aaaebda24f3bac8e4d))
* **conditionBuilder:** unit test cases for keyboard navigation ([#5691](https://github.com/carbon-design-system/ibm-products/issues/5691)) ([a49f23c](https://github.com/carbon-design-system/ibm-products/commit/a49f23c7c00291efc9febd401b2f7472a4136642))





# [2.45.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.45.0-rc.1...@carbon/ibm-products@2.45.0) (2024-07-17)

**Note:** Version bump only for package @carbon/ibm-products





# [2.45.0-rc.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.45.0-rc.0...@carbon/ibm-products@2.45.0-rc.1) (2024-07-08)


### Bug Fixes

* address issue with active cell value ([#5619](https://github.com/carbon-design-system/ibm-products/issues/5619)) ([90960b5](https://github.com/carbon-design-system/ibm-products/commit/90960b5ed6ce6692e50e8e2c9d6f47dab1f625c0))





# [2.45.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.44.0...@carbon/ibm-products@2.45.0-rc.0) (2024-07-08)


### Bug Fixes

* **ConditionBuilder:** can't change month or year for Date type ([#5623](https://github.com/carbon-design-system/ibm-products/issues/5623)) ([e093199](https://github.com/carbon-design-system/ibm-products/commit/e093199d509d0eb222ee9eedbdc455fae6f66aaf))
* **EditTearsheet:** prevent submit while processing and add indication if submitting ([#5577](https://github.com/carbon-design-system/ibm-products/issues/5577)) ([83fa9e0](https://github.com/carbon-design-system/ibm-products/commit/83fa9e004853a68b7304b74344bcbc41e4e9abe7))
* **HTTPError:** svg inline css not working strict csp ([#5585](https://github.com/carbon-design-system/ibm-products/issues/5585)) ([da5fd0a](https://github.com/carbon-design-system/ibm-products/commit/da5fd0a09a05696e4f22cf9e3241e1ad67a941b9))
* **OptionsTile:** fix styling of summary and chevron when nesting OptionsTile ([#5612](https://github.com/carbon-design-system/ibm-products/issues/5612)) ([9927c3b](https://github.com/carbon-design-system/ibm-products/commit/9927c3b5406719cb0181487b39fdb1a17cca8302))
* **PageHeader:** silence warnings from enabling ActionBar ([#5588](https://github.com/carbon-design-system/ibm-products/issues/5588)) ([01b4add](https://github.com/carbon-design-system/ibm-products/commit/01b4adde4e5b2389da1bee6c9fe36361986d75a4))
* remove unnecessary title attributes from datagrid ([#5583](https://github.com/carbon-design-system/ibm-products/issues/5583)) ([f5e4ba4](https://github.com/carbon-design-system/ibm-products/commit/f5e4ba461948bb8285199597940b3edf896c4417))
* use value to check for index ([#5595](https://github.com/carbon-design-system/ibm-products/issues/5595)) ([e18ada0](https://github.com/carbon-design-system/ibm-products/commit/e18ada09a5a25f59bd643bda407ea76cbc6af7cf))


### Features

* **ConditionBuilder:** handle keyboard navigation for tree variant ([#5640](https://github.com/carbon-design-system/ibm-products/issues/5640)) ([2df7a14](https://github.com/carbon-design-system/ibm-products/commit/2df7a14288468af06ff51086047d3531832e4427))
* **ConditionBuilder:** translation changes , text area support ([#5563](https://github.com/carbon-design-system/ibm-products/issues/5563)) ([9f02450](https://github.com/carbon-design-system/ibm-products/commit/9f0245063cc08bb494ef3dc9e2c768ab069ec5de))
* **dataspreadsheet:** option for read only table + option for disable column swapping ([#5597](https://github.com/carbon-design-system/ibm-products/issues/5597)) ([93c82cc](https://github.com/carbon-design-system/ibm-products/commit/93c82ccc9e7609074653ac762a24a134cc4d2f73))
* **editInPlace:** allow to provide custom onBlur function otherwise use default behavior ([#5505](https://github.com/carbon-design-system/ibm-products/issues/5505)) ([c833d06](https://github.com/carbon-design-system/ibm-products/commit/c833d06ba30ebdb02250058c28295add4bada977))
* **eslint-ssr-plugin:** adds `eslint-plugin-ssr-friendly` so we can catch ssr issues/bugs during development ([#5409](https://github.com/carbon-design-system/ibm-products/issues/5409)) ([0517cdb](https://github.com/carbon-design-system/ibm-products/commit/0517cdbdd4e177bfb4a5cc7dea2c535aead0633d))





# [2.44.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.44.0-rc.2...@carbon/ibm-products@2.44.0) (2024-07-03)

**Note:** Version bump only for package @carbon/ibm-products





# [2.44.0-rc.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.44.0-rc.1...@carbon/ibm-products@2.44.0-rc.2) (2024-07-03)

**Note:** Version bump only for package @carbon/ibm-products





# [2.44.0-rc.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.44.0-rc.0...@carbon/ibm-products@2.44.0-rc.1) (2024-06-26)


### Bug Fixes

* **DataGrid:** add checkbox support ([#5380](https://github.com/carbon-design-system/ibm-products/issues/5380)) ([b1761a0](https://github.com/carbon-design-system/ibm-products/commit/b1761a0fd713a3682dd812cebe98f4503ef70f04))
* export step component ([#5580](https://github.com/carbon-design-system/ibm-products/issues/5580)) ([9715628](https://github.com/carbon-design-system/ibm-products/commit/97156281c7fc1d54f5bd34ebcefedc5f2b616de4))
* include avt report in release workflow ([#5582](https://github.com/carbon-design-system/ibm-products/issues/5582)) ([a8c8fd9](https://github.com/carbon-design-system/ibm-products/commit/a8c8fd94aa02156b2e53e3ecd4fecaa4cf6d13f9))
* **remove-modal:** primary button danger description ([#5545](https://github.com/carbon-design-system/ibm-products/issues/5545)) ([85716f9](https://github.com/carbon-design-system/ibm-products/commit/85716f9639feeb3608f66e39066760b3d94833de))
* **ToolBar:** tooltip positioning fix ([#5572](https://github.com/carbon-design-system/ibm-products/issues/5572)) ([3b3daa5](https://github.com/carbon-design-system/ibm-products/commit/3b3daa54d73f1c6be010a404580d17619c3145ce))


### Features

* **dataspreadsheet:** optional custom component to row header ([#5500](https://github.com/carbon-design-system/ibm-products/issues/5500)) ([ee749e4](https://github.com/carbon-design-system/ibm-products/commit/ee749e4485e15c30b850b9dfc3a12927d23885b0))





# [2.44.0-rc.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.43.1...@carbon/ibm-products@2.44.0-rc.0) (2024-06-24)


### Bug Fixes

* condition check ([#5527](https://github.com/carbon-design-system/ibm-products/issues/5527)) ([795cd23](https://github.com/carbon-design-system/ibm-products/commit/795cd23ae0104ddf971d77a728ac94eaf05591d0))
* data spreadsheet blur ([#5477](https://github.com/carbon-design-system/ibm-products/issues/5477)) ([de3a830](https://github.com/carbon-design-system/ibm-products/commit/de3a8306cc6ad34d09a642e11530a0c038610b63))
* **Datagrid:** add `getSubRows` property to `useDatagrid` to avoid search removing nested rows ([#5501](https://github.com/carbon-design-system/ibm-products/issues/5501)) ([504841c](https://github.com/carbon-design-system/ibm-products/commit/504841cee3b0c2393c71f7946ae1256df678d609))
* **datagrid:** check tableId before triggering reset of filters ([#5546](https://github.com/carbon-design-system/ibm-products/issues/5546)) ([cf2bb23](https://github.com/carbon-design-system/ibm-products/commit/cf2bb2369c44e9a92022c6d73ba8ac50d338f336))
* **Datagrid:** look for id from data for initially expanded rows ([#5334](https://github.com/carbon-design-system/ibm-products/issues/5334)) ([1ad9bbb](https://github.com/carbon-design-system/ibm-products/commit/1ad9bbbca350d7289bbcaa6a030ec364ff521b38))
* **Datagrid:** make last visible column flex header and body cells correctly ([#5565](https://github.com/carbon-design-system/ibm-products/issues/5565)) ([1a9f441](https://github.com/carbon-design-system/ibm-products/commit/1a9f44148f35422f3a2722c304ae83c8dc914782))
* **dataspreadsheet:** drag drop when we have overflow ([#5506](https://github.com/carbon-design-system/ibm-products/issues/5506)) ([8a0d1a4](https://github.com/carbon-design-system/ibm-products/commit/8a0d1a48aca63b9f5111c7c10abf0e385151a1ad))
* **Dataspreadsheet:** selection area behavior fixed ([#5485](https://github.com/carbon-design-system/ibm-products/issues/5485)) ([b2a413a](https://github.com/carbon-design-system/ibm-products/commit/b2a413a067c999839c9481e3fa7d1fd8b1e3d2ff))
* **Decorator:** allow decorator to inherit parent theme ([#5358](https://github.com/carbon-design-system/ibm-products/issues/5358)) ([904602b](https://github.com/carbon-design-system/ibm-products/commit/904602b53ca5a6c595b804977ebd45d9d9dab74f))
* issue with new line when hitting enter ([#5479](https://github.com/carbon-design-system/ibm-products/issues/5479)) ([5cb806b](https://github.com/carbon-design-system/ibm-products/commit/5cb806b4ea5665b28638083ff84594943852870d))
* **SidePanel:** acton toolbar style issue ([#5540](https://github.com/carbon-design-system/ibm-products/issues/5540)) ([ea48b9e](https://github.com/carbon-design-system/ibm-products/commit/ea48b9e2ef44bcf0927eb88cbf2673dbf98400de))
* upgrade sass and remove `--` prefix from function names ([#5371](https://github.com/carbon-design-system/ibm-products/issues/5371)) ([91f282e](https://github.com/carbon-design-system/ibm-products/commit/91f282e56eec038f7efda4dd15c08d708c46cb58))


### Features

* **ConditionBuilder:** action section,custom input and fixes ([#5474](https://github.com/carbon-design-system/ibm-products/issues/5474)) ([bd909f7](https://github.com/carbon-design-system/ibm-products/commit/bd909f77c703d93bfc82eadf96c088b4e10ab5df))
* **Datagrid:** add opt out ability for editable cells ([#5425](https://github.com/carbon-design-system/ibm-products/issues/5425)) ([648571e](https://github.com/carbon-design-system/ibm-products/commit/648571ed78f6418eae53d3ff10ea7fd89fb8ea45))
* **TearsheetShell:** specify additional floating menu selectors ([#5092](https://github.com/carbon-design-system/ibm-products/issues/5092)) ([5740b30](https://github.com/carbon-design-system/ibm-products/commit/5740b302856db495af369010c2c3800bc95f1f59))





## [2.43.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.43.0...@carbon/ibm-products@2.43.1) (2024-06-18)


### Bug Fixes

* add validator when leaving cell ([#5483](https://github.com/carbon-design-system/ibm-products/issues/5483)) ([59b7621](https://github.com/carbon-design-system/ibm-products/commit/59b76216c649caf03f803118c9957d1e3a844f35))
* import feature flags to prevent them from being tree shaked away ([#5516](https://github.com/carbon-design-system/ibm-products/issues/5516)) ([578f1cf](https://github.com/carbon-design-system/ibm-products/commit/578f1cfbc3b7815edb102dc1fd1f2740b32ce0d6))
* **OptionTile:** animation flicker when collapsing options tile ([#5458](https://github.com/carbon-design-system/ibm-products/issues/5458)) ([0be8378](https://github.com/carbon-design-system/ibm-products/commit/0be8378ceeec3aa2c9af5495dbb8f9fa636bc237))





# [2.43.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.42.0...@carbon/ibm-products@2.43.0) (2024-06-13)


### Bug Fixes

* **Datagrid:** column customization negative selection value and disabled column deselection ([#5435](https://github.com/carbon-design-system/ibm-products/issues/5435)) ([07b4124](https://github.com/carbon-design-system/ibm-products/commit/07b4124551093f8dc2f4db978201feecdace2e22))
* **Datagrid:** implemented nestedRow dynamic width ([#5398](https://github.com/carbon-design-system/ibm-products/issues/5398)) ([ec2281a](https://github.com/carbon-design-system/ibm-products/commit/ec2281a1b02d3e14a5e05ca8461c1148a00652bd))
* **datagrid:** Let Developer know which cell is being edited ([#5413](https://github.com/carbon-design-system/ibm-products/issues/5413)) ([cc36a9e](https://github.com/carbon-design-system/ibm-products/commit/cc36a9e2d4a35d3126451fc611e3e717eaf74c23))
* **Datagrid:** sticky header column ([#5461](https://github.com/carbon-design-system/ibm-products/issues/5461)) ([3b33561](https://github.com/carbon-design-system/ibm-products/commit/3b33561d5df828ea99b250d2f610752134828bf2))
* **FeatureFlags:** add missing imports and update build script ([#5469](https://github.com/carbon-design-system/ibm-products/issues/5469)) ([dc4a98a](https://github.com/carbon-design-system/ibm-products/commit/dc4a98a67feda8a1f00d989a426f26efbc34aaf1))
* **novice-to-pro:** change to onboarding and added getStartedCard ([#5422](https://github.com/carbon-design-system/ibm-products/issues/5422)) ([7442150](https://github.com/carbon-design-system/ibm-products/commit/7442150e758ba89967e09233bc45c944bdb8c37f))
* only call validator if in edit mode ([#5412](https://github.com/carbon-design-system/ibm-products/issues/5412)) ([f0cd7e2](https://github.com/carbon-design-system/ibm-products/commit/f0cd7e26e8d22d8ba155f1b33b42f652e091059f))
* remove spacer column in datagrid ([#5377](https://github.com/carbon-design-system/ibm-products/issues/5377)) ([b6e52bd](https://github.com/carbon-design-system/ibm-products/commit/b6e52bd37c7d7595b31e90bdfc708c413e039816))
* **SidePanel:** remove default slide-in focus trap ([#5432](https://github.com/carbon-design-system/ibm-products/issues/5432)) ([793b7d2](https://github.com/carbon-design-system/ibm-products/commit/793b7d211624906e2dea5e39fa5995572b3c1628))
* **SidePanel:** remove scrollTop behavior ([#5376](https://github.com/carbon-design-system/ibm-products/issues/5376)) ([ee2897a](https://github.com/carbon-design-system/ibm-products/commit/ee2897af4ca2e921bbfa915bb553f816f8b9a233))


### Features

* **conditionBuilder:** tree variant initial implmentation ([#5397](https://github.com/carbon-design-system/ibm-products/issues/5397)) ([553f2c7](https://github.com/carbon-design-system/ibm-products/commit/553f2c7e1c6848e853abd71d493b3bca77968252))
* **Datagrid:** add default expansion state to `useNestedRows` ([#5261](https://github.com/carbon-design-system/ibm-products/issues/5261)) ([aa4f2a1](https://github.com/carbon-design-system/ibm-products/commit/aa4f2a1401f7ef78a1760a101a904e7e0e98b39a))
* **SidePanel:** adding tooltip ([#5390](https://github.com/carbon-design-system/ibm-products/issues/5390)) ([254149c](https://github.com/carbon-design-system/ibm-products/commit/254149c106786ec59a59572b3fc2602fa63637f6))





# [2.42.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.41.0...@carbon/ibm-products@2.42.0) (2024-06-11)


### Bug Fixes

* **Coachmark:** ssr issues with `instanceOf(HTMLElement)` ([#5391](https://github.com/carbon-design-system/ibm-products/issues/5391)) ([d9fdd12](https://github.com/carbon-design-system/ibm-products/commit/d9fdd1266dc54a6ddef55c652443e5d9c6789cf9))
* **CreateTearsheet:** add focus trap behavior ([#5329](https://github.com/carbon-design-system/ibm-products/issues/5329)) ([3205383](https://github.com/carbon-design-system/ibm-products/commit/3205383613e470499593babf597f0a5a6b7b621d))
* **Datagrid:** add disable cell support ([#5385](https://github.com/carbon-design-system/ibm-products/issues/5385)) ([106c0c4](https://github.com/carbon-design-system/ibm-products/commit/106c0c49331d3b54a0395020b1d0b8277ad1046e))
* **Datagrid:** add optional chain for focus row expander hook ([#5363](https://github.com/carbon-design-system/ibm-products/issues/5363)) ([b54cbad](https://github.com/carbon-design-system/ibm-products/commit/b54cbad876d63df0c280bcd0a843eee7199bf3f7))
* **GuideBanner:** address avt failure ([#5421](https://github.com/carbon-design-system/ibm-products/issues/5421)) ([3b244e6](https://github.com/carbon-design-system/ibm-products/commit/3b244e6e25880b04f15bfad0b81299b07725bd4f))
* **WebTerminal:** fixes exit animation glitchy behaviour ([#5424](https://github.com/carbon-design-system/ibm-products/issues/5424)) ([d9bc09b](https://github.com/carbon-design-system/ibm-products/commit/d9bc09b974c0c2183b00c2584dda25bf3ec224fe))


### Features

* **FeatureFlags:** add new mechanism for feature flagging using `@carbon/feature-flags` ([#5204](https://github.com/carbon-design-system/ibm-products/issues/5204)) ([51226bf](https://github.com/carbon-design-system/ibm-products/commit/51226bf58e4a0593e41cfcb37192784b8a6291c6))





# [2.41.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.40.0...@carbon/ibm-products@2.41.0) (2024-06-04)


### Bug Fixes

* **datagrid:** pass classname from header props directly ([#5366](https://github.com/carbon-design-system/ibm-products/issues/5366)) ([51125a1](https://github.com/carbon-design-system/ibm-products/commit/51125a1f94bbfb83266c50033ca3ee9b695e7888))
* **Datagrid:** show column headers for empty infinite scroll ([#5254](https://github.com/carbon-design-system/ibm-products/issues/5254)) ([45bfa9e](https://github.com/carbon-design-system/ibm-products/commit/45bfa9e017eda8129c04b540173036cbdcca67eb))
* **notification-panel:** remove role on decorative image ([#5372](https://github.com/carbon-design-system/ibm-products/issues/5372)) ([3e32727](https://github.com/carbon-design-system/ibm-products/commit/3e32727d6ef3b585eb8c0967d211dd7042c12e31))
* **PageHeader:** enable canary `ActionBar` inside of `PageHeader` ([#5332](https://github.com/carbon-design-system/ibm-products/issues/5332)) ([662bbe2](https://github.com/carbon-design-system/ibm-products/commit/662bbe2c380b65e1540aadc514ecf9bb289b813d))


### Features

* **conditionBuilder:** keyboard accessibility for sentence variant ([#5248](https://github.com/carbon-design-system/ibm-products/issues/5248)) ([497c216](https://github.com/carbon-design-system/ibm-products/commit/497c2169e5dae4e69462f93b4ef386a865941051))
* **TagOverflow:** overflow tooltip variants ([#5249](https://github.com/carbon-design-system/ibm-products/issues/5249)) ([022f8ff](https://github.com/carbon-design-system/ibm-products/commit/022f8ff7dea05167351add931a33c68149cfb53c))





# [2.40.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.39.0...@carbon/ibm-products@2.40.0) (2024-05-28)


### Bug Fixes

* adds short text option for pageheader ([#4562](https://github.com/carbon-design-system/ibm-products/issues/4562)) ([705f403](https://github.com/carbon-design-system/ibm-products/commit/705f403f8bbdcc93ab2dcb0e06bb3b5cd7d359b3))
* **CreateInfluencer:** removed empty p tag render, if secondaryLabel='' ([#5279](https://github.com/carbon-design-system/ibm-products/issues/5279)) ([4594428](https://github.com/carbon-design-system/ibm-products/commit/4594428b2484a7dd6202f4bc2872b32f8a302d1b))
* **DataSpreadsheet:** added null check ([#5305](https://github.com/carbon-design-system/ibm-products/issues/5305)) ([a05bc39](https://github.com/carbon-design-system/ibm-products/commit/a05bc390d6b216fb36f688729e82f60df4fdd930))
* **ExpressiveCard:** use CarbonIconType for pictogram ([#5229](https://github.com/carbon-design-system/ibm-products/issues/5229)) ([a87d6e0](https://github.com/carbon-design-system/ibm-products/commit/a87d6e013e72102da4dc5d84d83c97e7d18d9e53))
* remove previously used class name ([#5283](https://github.com/carbon-design-system/ibm-products/issues/5283)) ([5fafcf2](https://github.com/carbon-design-system/ibm-products/commit/5fafcf24824bf3a38426e069db6e36533ac39c51))
* Return focus to launcher button ([#5017](https://github.com/carbon-design-system/ibm-products/issues/5017)) ([659126a](https://github.com/carbon-design-system/ibm-products/commit/659126acfcc13cd7fa384581f0a25e4b2a4d648f))
* **SidePanel:** add missing size xl ([#5274](https://github.com/carbon-design-system/ibm-products/issues/5274)) ([da5172b](https://github.com/carbon-design-system/ibm-products/commit/da5172b4cf792ebf63ecea2c986f0dbcccb2b612))
* **storybook:** use markdown comp to render custom docs ([#5303](https://github.com/carbon-design-system/ibm-products/issues/5303)) ([57e1896](https://github.com/carbon-design-system/ibm-products/commit/57e189667ec8fa859d444022ac0563430c74029b))
* **Tearsheet:** properly focus specified element with new hook ([#5264](https://github.com/carbon-design-system/ibm-products/issues/5264)) ([1dc2407](https://github.com/carbon-design-system/ibm-products/commit/1dc240759e4ec3446465b13adb4787fa56442ecb))


### Features

* **Datagrid:** add `onVirtualScroll` property to send back data around currently visible rows in virtualized Datagrids ([#5255](https://github.com/carbon-design-system/ibm-products/issues/5255)) ([9821899](https://github.com/carbon-design-system/ibm-products/commit/9821899948712e59e178423f190fe44c5e5ee78e))
* **Guidebanner:** convert to .tsx ([#5321](https://github.com/carbon-design-system/ibm-products/issues/5321)) ([bd1ace3](https://github.com/carbon-design-system/ibm-products/commit/bd1ace30a9739c4a06e7e10619eb7ec24d77b169))





# [2.39.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.38.0...@carbon/ibm-products@2.39.0) (2024-05-21)


### Bug Fixes

* **sidepanel:** resolve border bottom always showing ([#5143](https://github.com/carbon-design-system/ibm-products/issues/5143)) ([59b580a](https://github.com/carbon-design-system/ibm-products/commit/59b580aa8f911ec48955484be9781762dae9c3ce))


### Features

* **CoachmarkButton:** convert to .tsx ([#5241](https://github.com/carbon-design-system/ibm-products/issues/5241)) ([6b33291](https://github.com/carbon-design-system/ibm-products/commit/6b33291385afb9fa776ba72e7fd7e5dcba716015))
* **CoachmarkOverlayElements:** convert to .tsx ([#5163](https://github.com/carbon-design-system/ibm-products/issues/5163)) ([2bd1af9](https://github.com/carbon-design-system/ibm-products/commit/2bd1af990c2d82f0a042d4e3d826801c3e1718ce))
* **get-started:** new component ([#5054](https://github.com/carbon-design-system/ibm-products/issues/5054)) ([5d7208f](https://github.com/carbon-design-system/ibm-products/commit/5d7208fd9ed28994cf46361f629d16c349ba4b27))
* **tagoverflow:** remove TagOverflow dependency on TagSet ([#4929](https://github.com/carbon-design-system/ibm-products/issues/4929)) ([7b1bcdc](https://github.com/carbon-design-system/ibm-products/commit/7b1bcdc1dacd49602e26cc3f0e069750ce6f7af5))





# [2.38.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.37.0...@carbon/ibm-products@2.38.0) (2024-05-14)


### Bug Fixes

* **DataSpreadsheet:** initialize functions before calling them ([#5099](https://github.com/carbon-design-system/ibm-products/issues/5099)) ([72ff25d](https://github.com/carbon-design-system/ibm-products/commit/72ff25d32bc1a3235a246a50f7a9405c672f47a5))


### Features

* **Checklist:** release as stable ([#5139](https://github.com/carbon-design-system/ibm-products/issues/5139)) ([73729b5](https://github.com/carbon-design-system/ibm-products/commit/73729b593e02f7f6fbcfa32175c41e0608912909))
* **Coachmark:** convert to .tsx ([#5097](https://github.com/carbon-design-system/ibm-products/issues/5097)) ([2c4d66f](https://github.com/carbon-design-system/ibm-products/commit/2c4d66f81b6f118ce45ac29fc0d397f14162129f))
* **CoachmarkFixed:** convert to .tsx ([#5140](https://github.com/carbon-design-system/ibm-products/issues/5140)) ([1dff0cb](https://github.com/carbon-design-system/ibm-products/commit/1dff0cb771465e7316a92f73936a9377716ff7ee))
* **conditionBuilder:** issue fixes and review changes ([#5085](https://github.com/carbon-design-system/ibm-products/issues/5085)) ([9b425b0](https://github.com/carbon-design-system/ibm-products/commit/9b425b03ef74791cbcc2cc534f4740218586db1f))
* **datagrid:** added feature to control number of skeleton rows ([#4802](https://github.com/carbon-design-system/ibm-products/issues/4802)) ([1962a72](https://github.com/carbon-design-system/ibm-products/commit/1962a72d16f522a279c99032886073d1a58cbb50))
* **telemetry:** add telemetry config generator step to the release process ([#5081](https://github.com/carbon-design-system/ibm-products/issues/5081)) ([9529594](https://github.com/carbon-design-system/ibm-products/commit/9529594eaa3763f4500113288014899ad39b6aea))
* update to storybook 8 ([#5019](https://github.com/carbon-design-system/ibm-products/issues/5019)) ([af22157](https://github.com/carbon-design-system/ibm-products/commit/af2215707b60e4abcbab434f63fd9bd45a947526))





# [2.37.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.36.0...@carbon/ibm-products@2.37.0) (2024-05-07)


### Bug Fixes

* added a scroll callback which sets prog step back to 0 on resize ([#5015](https://github.com/carbon-design-system/ibm-products/issues/5015)) ([63becd7](https://github.com/carbon-design-system/ibm-products/commit/63becd77bb414046d62f26ff56a98d5925756f5a))
* check for document for matchmedia ([#4968](https://github.com/carbon-design-system/ibm-products/issues/4968)) ([c735e14](https://github.com/carbon-design-system/ibm-products/commit/c735e1474af1b3afbab0006e5ef30e5f8bcfeb25))
* import shared filterProps data for flyout example ([#5087](https://github.com/carbon-design-system/ibm-products/issues/5087)) ([7a5de0d](https://github.com/carbon-design-system/ibm-products/commit/7a5de0d1cb0368c6abb25ed0bf44703286906106))
* PageHeader breadcrumb tooltip displays underneath Carbon UI shell header ([#4907](https://github.com/carbon-design-system/ibm-products/issues/4907)) ([a6666e1](https://github.com/carbon-design-system/ibm-products/commit/a6666e1f84fb8460a6dceefd4f6f5f16a561aeea))


### Features

* **ConditionBuilder:** implementation of  main content blocks ([#4928](https://github.com/carbon-design-system/ibm-products/issues/4928)) ([6a6202d](https://github.com/carbon-design-system/ibm-products/commit/6a6202d428f870158ec1d92fe95f8814070e8a37))
* **conditionBuilder:** popover content, stories, issue fixes ([#5058](https://github.com/carbon-design-system/ibm-products/issues/5058)) ([24ac4fa](https://github.com/carbon-design-system/ibm-products/commit/24ac4fa6574c1c40fca68e24d29f0030ef452603))





# [2.36.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.35.0...@carbon/ibm-products@2.36.0) (2024-04-30)


### Bug Fixes

* **CreateTearsheet:** includeStep fix on first step ([#4942](https://github.com/carbon-design-system/ibm-products/issues/4942)) ([4bc336d](https://github.com/carbon-design-system/ibm-products/commit/4bc336d7917833417a8bf3db635b5b964370d856))
* **FullPageError:** alphabetize prop types ([#4995](https://github.com/carbon-design-system/ibm-products/issues/4995)) ([cf16c92](https://github.com/carbon-design-system/ibm-products/commit/cf16c92d3a51921a8d66d628c14b3fd01da3e530))
* support provided classname for TableCell [#4965](https://github.com/carbon-design-system/ibm-products/issues/4965) ([#4967](https://github.com/carbon-design-system/ibm-products/issues/4967)) ([f32129f](https://github.com/carbon-design-system/ibm-products/commit/f32129f4c9f75cf782ba28c205f5226f412c8dbb))
* update to Carbon 11 compatible versions to latest ([#4890](https://github.com/carbon-design-system/ibm-products/issues/4890)) ([d3234ce](https://github.com/carbon-design-system/ibm-products/commit/d3234ceda60feb704b11d5f7c7270b430a11a499)), closes [#4654](https://github.com/carbon-design-system/ibm-products/issues/4654)
* **useravatar:** fix scroll issue ([#4950](https://github.com/carbon-design-system/ibm-products/issues/4950)) ([bb47921](https://github.com/carbon-design-system/ibm-products/commit/bb479218862b14196f8ba99d6486772bfd9f1d20))


### Features

* **Carousel:** convert to .tsx ([#4964](https://github.com/carbon-design-system/ibm-products/issues/4964)) ([b41fe64](https://github.com/carbon-design-system/ibm-products/commit/b41fe640843fb169a223c9fe0afd8754fae4f209))
* **CoachmarkBeacon:** convert to .tsx ([#4974](https://github.com/carbon-design-system/ibm-products/issues/4974)) ([3b4e0fa](https://github.com/carbon-design-system/ibm-products/commit/3b4e0fa7593382128900e68051863dbc949a319b))
* **CoachmarkOverlayElements:** convert to .tsx ([#4973](https://github.com/carbon-design-system/ibm-products/issues/4973)) ([79f261b](https://github.com/carbon-design-system/ibm-products/commit/79f261bfed85f3bebbd4efd0326077b46feb54df))
* column customization should allow only disable column [#4956](https://github.com/carbon-design-system/ibm-products/issues/4956) ([#4957](https://github.com/carbon-design-system/ibm-products/issues/4957)) ([ce0df52](https://github.com/carbon-design-system/ibm-products/commit/ce0df5209fea5fd9f272d25a121b49f7a51412df))
* **Datagrid:** passes state to onApply ([#4933](https://github.com/carbon-design-system/ibm-products/issues/4933)) ([9a77b1a](https://github.com/carbon-design-system/ibm-products/commit/9a77b1a42e3ddfd5a5cdaefa7e0ccb9fafd3b61f))
* instrument current packages with js scope ([#5012](https://github.com/carbon-design-system/ibm-products/issues/5012)) ([59074fe](https://github.com/carbon-design-system/ibm-products/commit/59074fe8ae93d3854565ba3c92f20065f3f2867e))
* **NoTagsEmptyState:** convert to .tsx ([#4945](https://github.com/carbon-design-system/ibm-products/issues/4945)) ([db4c851](https://github.com/carbon-design-system/ibm-products/commit/db4c8511c28367b77879f834a1c4c3c6c684b587))





# [2.35.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.34.0...@carbon/ibm-products@2.35.0) (2024-04-16)


### Bug Fixes

* add datagrid stateReducer row prop check ([#4763](https://github.com/carbon-design-system/ibm-products/issues/4763)) ([6bef7ce](https://github.com/carbon-design-system/ibm-products/commit/6bef7ce210afe667a270345a05fad0fa0529ec6f))
* collapseHeader button and prop ([#4899](https://github.com/carbon-design-system/ibm-products/issues/4899)) ([fea8824](https://github.com/carbon-design-system/ibm-products/commit/fea88243d6f866e83a52b0a381363f43e856a889))
* **Datagrid:** export editable cell hook ([#4791](https://github.com/carbon-design-system/ibm-products/issues/4791)) ([eaed703](https://github.com/carbon-design-system/ibm-products/commit/eaed7032e9179b9f502df9fa4facafb212e7f64d))
* full page story with global header ([#4794](https://github.com/carbon-design-system/ibm-products/issues/4794)) ([af77a38](https://github.com/carbon-design-system/ibm-products/commit/af77a387747cbf3aeef25d3bfb6b85325185413e))
* **NotificationsPanel:** fixed glitchy animation after closing the panel ([#4771](https://github.com/carbon-design-system/ibm-products/issues/4771)) ([d711b78](https://github.com/carbon-design-system/ibm-products/commit/d711b78c10b9fe4a1cb8a7616f67f7f97e3c041b))
* **sidePanel:** Close scrollbar overlap 3975 ([#4680](https://github.com/carbon-design-system/ibm-products/issues/4680)) ([8ef8d7b](https://github.com/carbon-design-system/ibm-products/commit/8ef8d7b98ceebc1a9934d98a5e5891c65163fedf))
* spellcheck fixes and quiet flag ([#4805](https://github.com/carbon-design-system/ibm-products/issues/4805)) ([f29ea25](https://github.com/carbon-design-system/ibm-products/commit/f29ea25e33268b3784b504580e1e2b3e6f407b8d))
* spells ([#4912](https://github.com/carbon-design-system/ibm-products/issues/4912)) ([3f1bb6f](https://github.com/carbon-design-system/ibm-products/commit/3f1bb6f88b3c44e1aae099e3f7fa2b2c67d49b0a))


### Features

* **ConditionBuilder:** First PR with generated files and basic configs, components ([#4801](https://github.com/carbon-design-system/ibm-products/issues/4801)) ([78fcba2](https://github.com/carbon-design-system/ibm-products/commit/78fcba2b99e1dc3958f1424ba33de3bded971083))
* **FilterPanel:** added search and filter panel updates ([#4659](https://github.com/carbon-design-system/ibm-products/issues/4659)) ([8400717](https://github.com/carbon-design-system/ibm-products/commit/840071772774c85ac953c46964ce9307f5e98df7))
* full page step description as node to match tearsheet ([#4788](https://github.com/carbon-design-system/ibm-products/issues/4788)) ([b8c1fc2](https://github.com/carbon-design-system/ibm-products/commit/b8c1fc22770934bd189e06c44e08a270c362db7d))
* **NoDataEmptyState:** convert to .tsx ([#4901](https://github.com/carbon-design-system/ibm-products/issues/4901)) ([a345950](https://github.com/carbon-design-system/ibm-products/commit/a34595081b2d9f772dad48c9bea7ba96ca2f145c))
* **TagOverflow:** multiline support ([#4618](https://github.com/carbon-design-system/ibm-products/issues/4618)) ([cf8cd1f](https://github.com/carbon-design-system/ibm-products/commit/cf8cd1fedccd069b68325e599f966ecfe009ea1d))
* **TagOverflow:** new component TagOverflow ([#4535](https://github.com/carbon-design-system/ibm-products/issues/4535)) ([f9d6c57](https://github.com/carbon-design-system/ibm-products/commit/f9d6c57a35f0f6f422716f7143ea8e0b88d00f32))
* **useravatar:** add default color ([#4679](https://github.com/carbon-design-system/ibm-products/issues/4679)) ([cb9f814](https://github.com/carbon-design-system/ibm-products/commit/cb9f814f2016e22ce1078b9792c95634768dcced))





# [2.34.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.33.0...@carbon/ibm-products@2.34.0) (2024-04-02)


### Bug Fixes

* **Datagrid:** address keyboard support with selectable/dropdown editable cells ([#4580](https://github.com/carbon-design-system/ibm-products/issues/4580)) ([06e4244](https://github.com/carbon-design-system/ibm-products/commit/06e42447f8d95e032e5e973f41e2c62ba9b64b53))
* **Dataspreadsheet:** refractor larger event handlers to seperate util ([#4598](https://github.com/carbon-design-system/ibm-products/issues/4598)) ([b72827a](https://github.com/carbon-design-system/ibm-products/commit/b72827adf963a433ab4d5b05dae9f2fad90233a0))
* **SidePanel:** replace incorrect prop in conditional prop types ([#4630](https://github.com/carbon-design-system/ibm-products/issues/4630)) ([129d74a](https://github.com/carbon-design-system/ibm-products/commit/129d74aab25a366c81b6f4e9e5f9e9270dca00d6))


### Features

* **FilterPanel:** added accordion and group ([#4620](https://github.com/carbon-design-system/ibm-products/issues/4620)) ([ade8310](https://github.com/carbon-design-system/ibm-products/commit/ade8310e1d834a7e00fa82f55d02367e28ae71bb))
* **FilterPanel:** added checkbox with overflow ([#4594](https://github.com/carbon-design-system/ibm-products/issues/4594)) ([c08c303](https://github.com/carbon-design-system/ibm-products/commit/c08c3035180ef7381380db82f9f1ec47e403fa9b))
* **ScrollGradient:** new component ScrollGradient ([#4446](https://github.com/carbon-design-system/ibm-products/issues/4446)) ([75e1622](https://github.com/carbon-design-system/ibm-products/commit/75e162243e5e00d9d923d592118d6692fcae9423))
* **useravatar:** color tokens implementation ([#4608](https://github.com/carbon-design-system/ibm-products/issues/4608)) ([de8604b](https://github.com/carbon-design-system/ibm-products/commit/de8604b532a392e9e5093d2135913b4a712e8da0))
* **useravatar:** test cases ([#4637](https://github.com/carbon-design-system/ibm-products/issues/4637)) ([a172ce5](https://github.com/carbon-design-system/ibm-products/commit/a172ce57f7f53a4c4dedb11bc144971968c62b41))





# [2.33.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.32.0...@carbon/ibm-products@2.33.0) (2024-03-26)


### Bug Fixes

* **Datagrid:** address duplicate id issue in `RowSizeRadioGroup` ([#4588](https://github.com/carbon-design-system/ibm-products/issues/4588)) ([ed378a3](https://github.com/carbon-design-system/ibm-products/commit/ed378a339191eec19ad9ab687c86dbb7234be349))
* **Dataspreadsheet:** Duplication selection issue [#4241](https://github.com/carbon-design-system/ibm-products/issues/4241) ([#4333](https://github.com/carbon-design-system/ibm-products/issues/4333)) ([8f2b275](https://github.com/carbon-design-system/ibm-products/commit/8f2b275fe9d50b864b6423c2ccae42cd6d3e6940))
* **Dataspreadsheet:** glitchy behaviour issue 4551 ([#4586](https://github.com/carbon-design-system/ibm-products/issues/4586)) ([075530d](https://github.com/carbon-design-system/ibm-products/commit/075530d09dce79d6726f47bc5a939e8f49afcd7f)), closes [#4551](https://github.com/carbon-design-system/ibm-products/issues/4551)
* exporting description list child components ([#4599](https://github.com/carbon-design-system/ibm-products/issues/4599)) ([b0e84bf](https://github.com/carbon-design-system/ibm-products/commit/b0e84bf93fd745ebca5e958e4f5e9e1b79800014))
* **sidepanel:** resolve focus trap issue ([#4559](https://github.com/carbon-design-system/ibm-products/issues/4559)) ([17b1f46](https://github.com/carbon-design-system/ibm-products/commit/17b1f468d2e1e387b4eef54eb29740c03d8d4a6f))
* **tearsheet:** change side effect dependency ([#4585](https://github.com/carbon-design-system/ibm-products/issues/4585)) ([db8a287](https://github.com/carbon-design-system/ibm-products/commit/db8a28756e8ce8df232dd357c9e710c37143eeb6))


### Features

* **FilterPanel:** new component with label and checkbox ([#4563](https://github.com/carbon-design-system/ibm-products/issues/4563)) ([5412e39](https://github.com/carbon-design-system/ibm-products/commit/5412e398c70680f0ea7bf26c807e8ed0a49d0440))





# [2.32.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.31.1...@carbon/ibm-products@2.32.0) (2024-03-19)


### Bug Fixes

* filterable column counts ([#4573](https://github.com/carbon-design-system/ibm-products/issues/4573)) ([db82cc7](https://github.com/carbon-design-system/ibm-products/commit/db82cc7d783d50cf2e5067e41d1a89a5ad95364d))
* removed redundant role from Link ([#4568](https://github.com/carbon-design-system/ibm-products/issues/4568)) ([8d531e7](https://github.com/carbon-design-system/ibm-products/commit/8d531e728ddc45b798844bc1da77d6d2daaf291b))


### Features

* remove prepareStory ([#4561](https://github.com/carbon-design-system/ibm-products/issues/4561)) ([f74626f](https://github.com/carbon-design-system/ibm-products/commit/f74626fe813f18fbcf8203111b9ae2e131176b07))





## [2.31.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.31.0...@carbon/ibm-products@2.31.1) (2024-03-14)


### Bug Fixes

* **Datagrid:** adding test for customize column ([#4475](https://github.com/carbon-design-system/ibm-products/issues/4475)) ([8496875](https://github.com/carbon-design-system/ibm-products/commit/849687500568a79604c70789bbb377c6f8cf7a56))
* **Decorator:** breakout single Decorator into many smaller Decorators ([#4542](https://github.com/carbon-design-system/ibm-products/issues/4542)) ([3f57a24](https://github.com/carbon-design-system/ibm-products/commit/3f57a24c1304d1a4be3caa33b60ae29c3123d14a))
* **Tearsheet:** fous query to the elemnts with tabindex 0 ([#4464](https://github.com/carbon-design-system/ibm-products/issues/4464)) ([37ed5ec](https://github.com/carbon-design-system/ibm-products/commit/37ed5ec1a6e2c1d5c66cc7648f5744dbda9ded8b))
* update ai gradient mixin call to match 1.53 ([#4552](https://github.com/carbon-design-system/ibm-products/issues/4552)) ([332890c](https://github.com/carbon-design-system/ibm-products/commit/332890c9deceb0a38facfbf71dfadb66ca66f816))





# [2.31.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.30.0...@carbon/ibm-products@2.31.0) (2024-03-12)


### Bug Fixes

* add aria label to edit in place ([#4469](https://github.com/carbon-design-system/ibm-products/issues/4469)) ([71dfa3f](https://github.com/carbon-design-system/ibm-products/commit/71dfa3f39ba0cc8461d1eec5538eb35087b124cd))
* datagrid select all toggle rows not disabled ([#4473](https://github.com/carbon-design-system/ibm-products/issues/4473)) ([619aa38](https://github.com/carbon-design-system/ibm-products/commit/619aa3896e08af0d75c142f7b1ddbfd3b84c2291))
* **Datagrid:** add optional chain to prevent errors with disableResizing ([#4524](https://github.com/carbon-design-system/ibm-products/issues/4524)) ([1e393fa](https://github.com/carbon-design-system/ibm-products/commit/1e393fa976831d5122f249b9b75a223180926d16))
* **Datagrid:** column customization accesibility violation role listbox ([#4463](https://github.com/carbon-design-system/ibm-products/issues/4463)) ([21d18f4](https://github.com/carbon-design-system/ibm-products/commit/21d18f43f31a39594aa9189b827fdfa3df31c66f))
* remove sorting in custom column tearsheet ([#4515](https://github.com/carbon-design-system/ibm-products/issues/4515)) ([cf59e7d](https://github.com/carbon-design-system/ibm-products/commit/cf59e7dec70de2f5e2a520eb10df08c613a71e97))
* **Tearsheet:** prevent stacking visual cue with different sizes ([#4481](https://github.com/carbon-design-system/ibm-products/issues/4481)) ([ce1358a](https://github.com/carbon-design-system/ibm-products/commit/ce1358ad0493a21f742e455f5b11c3540592c78f))
* update story for selectable row ([#4480](https://github.com/carbon-design-system/ibm-products/issues/4480)) ([c129013](https://github.com/carbon-design-system/ibm-products/commit/c1290134f8f51df7d73962da8b7209b5b075b394))


### Features

* **Nav:** new component Nav ([#4420](https://github.com/carbon-design-system/ibm-products/issues/4420)) ([2850246](https://github.com/carbon-design-system/ibm-products/commit/28502464448794e048845a846635772514ac2ef5))





# [2.30.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.29.0...@carbon/ibm-products@2.30.0) (2024-03-05)


### Bug Fixes

* about modal layout ([#4454](https://github.com/carbon-design-system/ibm-products/issues/4454)) ([c0cf58a](https://github.com/carbon-design-system/ibm-products/commit/c0cf58a1e78a4ee8f66b551d39b5705fecd4674e))
* add missing support for shouldDisableMenuItem ([#4443](https://github.com/carbon-design-system/ibm-products/issues/4443)) ([6d10432](https://github.com/carbon-design-system/ibm-products/commit/6d10432dfb8161cab16a7397d09f99659788b3bb))
* **Datagrid:** add safety checks for saved filters logic ([#4442](https://github.com/carbon-design-system/ibm-products/issues/4442)) ([226d258](https://github.com/carbon-design-system/ibm-products/commit/226d258d16512c01e0fd6f4fd324e3741335612e))
* **Datagrid:** align nested/expanded row borders with text content ([#4388](https://github.com/carbon-design-system/ibm-products/issues/4388)) ([7e9fc3f](https://github.com/carbon-design-system/ibm-products/commit/7e9fc3f8e7df22078ebfafd4c6da6d9f1638a10f))
* **Datagrid:** restrict drag to y axis and parent element ([#4450](https://github.com/carbon-design-system/ibm-products/issues/4450)) ([d4b18ee](https://github.com/carbon-design-system/ibm-products/commit/d4b18eedf920c19fdba0b230a2e30638a346a3f6))
* **DataSpreadsheet:** Reduce redundancy in handleKeyPress [#4187](https://github.com/carbon-design-system/ibm-products/issues/4187) ([#4217](https://github.com/carbon-design-system/ibm-products/issues/4217)) ([19c9e27](https://github.com/carbon-design-system/ibm-products/commit/19c9e2782b240c336cadf1dcc80690215d1f31af))
* update Carbon 11 compatible versions to latest ([#4455](https://github.com/carbon-design-system/ibm-products/issues/4455)) ([c6241b2](https://github.com/carbon-design-system/ibm-products/commit/c6241b26e01eecd080d25ec3e2c6ca060a258e1d))


### Features

* add drag and drop examples/explorations ([#4448](https://github.com/carbon-design-system/ibm-products/issues/4448)) ([0543115](https://github.com/carbon-design-system/ibm-products/commit/0543115e71a5c90e85407b5c1c0bf851cf41624a))
* the frozen column doesn't follow the hover color on DataGrid [#4338](https://github.com/carbon-design-system/ibm-products/issues/4338) ([#4458](https://github.com/carbon-design-system/ibm-products/issues/4458)) ([176441c](https://github.com/carbon-design-system/ibm-products/commit/176441c38eca78cf7a29e2700a06d010e2371403))





# [2.29.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.28.1...@carbon/ibm-products@2.29.0) (2024-02-27)


### Features

* **AboutModal:** add typescript types ([#4320](https://github.com/carbon-design-system/ibm-products/issues/4320)) ([277f971](https://github.com/carbon-design-system/ibm-products/commit/277f97101b086b00f0b1dbb4543e45152d0f9afb))
* **APIKeyModal:** add typescript types ([#4336](https://github.com/carbon-design-system/ibm-products/issues/4336)) ([75e1c20](https://github.com/carbon-design-system/ibm-products/commit/75e1c209b6fa11937dbbcfcb7951e9dae875924c))
* **Datagrid:** add option to specify an initial sortable column ([#4423](https://github.com/carbon-design-system/ibm-products/issues/4423)) ([d6e306f](https://github.com/carbon-design-system/ibm-products/commit/d6e306fa2b58a454c879f911187e17076ce06ea3))
* **Decorator:** new component Decorator ([#4170](https://github.com/carbon-design-system/ibm-products/issues/4170)) ([9cea98a](https://github.com/carbon-design-system/ibm-products/commit/9cea98a32f2d169763c52d26bf123b20e886911c)), closes [#4348](https://github.com/carbon-design-system/ibm-products/issues/4348) [#4188](https://github.com/carbon-design-system/ibm-products/issues/4188) [#4227](https://github.com/carbon-design-system/ibm-products/issues/4227) [#4312](https://github.com/carbon-design-system/ibm-products/issues/4312)
* **DescriptionList:** new component DescriptionList ([#4208](https://github.com/carbon-design-system/ibm-products/issues/4208)) ([0a55d40](https://github.com/carbon-design-system/ibm-products/commit/0a55d4092668355828cda5e44538e365baca9f2d))
* new component status indicator ([#4419](https://github.com/carbon-design-system/ibm-products/issues/4419)) ([79c9794](https://github.com/carbon-design-system/ibm-products/commit/79c9794947fe6d58936fd4cf8a279f81870f8d5e))





## [2.28.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.28.0...@carbon/ibm-products@2.28.1) (2024-02-21)

**Note:** Version bump only for package @carbon/ibm-products





# [2.28.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.27.0...@carbon/ibm-products@2.28.0) (2024-02-21)


### Bug Fixes

* **DataGrid:** add support for selectrow and nestedrow ([#4354](https://github.com/carbon-design-system/ibm-products/issues/4354)) ([984da57](https://github.com/carbon-design-system/ibm-products/commit/984da575d578c56b9eab5794251fbedb637e5373))


### Features

* **Datagrid:** add support for multi select filter type ([#4361](https://github.com/carbon-design-system/ibm-products/issues/4361)) ([1a1c488](https://github.com/carbon-design-system/ibm-products/commit/1a1c488447748f7b8f8972cbc123e52957c274ee))
* **Datagrid:** apply latest ai gradients to Datagrid ([#4377](https://github.com/carbon-design-system/ibm-products/issues/4377)) ([3702c93](https://github.com/carbon-design-system/ibm-products/commit/3702c93bd2cba587ecea6e441dcf0fd204f7ad95))
* Modal ai updates ([#4362](https://github.com/carbon-design-system/ibm-products/issues/4362)) ([8feb304](https://github.com/carbon-design-system/ibm-products/commit/8feb30433371c129652b85f357c3c89de915949a))
* sort icon appear in the Actions column on Datagrid [#4339](https://github.com/carbon-design-system/ibm-products/issues/4339) ([#4346](https://github.com/carbon-design-system/ibm-products/issues/4346)) ([fac6145](https://github.com/carbon-design-system/ibm-products/commit/fac6145eb3952409d910884f1d4e3270a3c6c496))
* **useravatar:** image implementation ([#4355](https://github.com/carbon-design-system/ibm-products/issues/4355)) ([accfa2d](https://github.com/carbon-design-system/ibm-products/commit/accfa2d7736c3662c88458f2077d6e808453f4df))





# [2.27.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.26.0...@carbon/ibm-products@2.27.0) (2024-02-20)


### Bug Fixes

* adds aria label to datagrid toolbar ([#4348](https://github.com/carbon-design-system/ibm-products/issues/4348)) ([76cdfc6](https://github.com/carbon-design-system/ibm-products/commit/76cdfc6a4cd1d24ecb9ecb37c20f63e525a4ab0b))
* **Datagrid:** disable resizing during fetching state ([#4341](https://github.com/carbon-design-system/ibm-products/issues/4341)) ([1b89765](https://github.com/carbon-design-system/ibm-products/commit/1b897650bf53bff090120677cff8dd44b1dd6c78))
* **Datagrid:** filtering bug with table refresh ([#4207](https://github.com/carbon-design-system/ibm-products/issues/4207)) ([1b1d78d](https://github.com/carbon-design-system/ibm-products/commit/1b1d78da1e78adb806d927be1d6076d20a4c07f8))
* **Datagrid:** fixes selectedRowData updating on cancel/unselecting ([#4325](https://github.com/carbon-design-system/ibm-products/issues/4325)) ([a0e67c1](https://github.com/carbon-design-system/ibm-products/commit/a0e67c1a78004b97044d5f41b6efef16f22a6f0b))
* **Dataspreadsheet:** Reduce duplication with isHoldingCommandKey [#4188](https://github.com/carbon-design-system/ibm-products/issues/4188) ([#4227](https://github.com/carbon-design-system/ibm-products/issues/4227)) ([1b42224](https://github.com/carbon-design-system/ibm-products/commit/1b42224f8f0fa259f82925b7bd1df7e2530c6d12))
* update Carbon 11 compatible versions to latest ([#4343](https://github.com/carbon-design-system/ibm-products/issues/4343)) ([eee92d5](https://github.com/carbon-design-system/ibm-products/commit/eee92d57859056e07851607e67f5d81a00c3c57a))


### Features

*  Tearsheet ai ([#4215](https://github.com/carbon-design-system/ibm-products/issues/4215)) ([6b13f3f](https://github.com/carbon-design-system/ibm-products/commit/6b13f3f6db5481761a1e60853197576abb9c7833))
* add isomorphic hook for to address ssr issues ([#4324](https://github.com/carbon-design-system/ibm-products/issues/4324)) ([ee119a2](https://github.com/carbon-design-system/ibm-products/commit/ee119a2e8d5b7cfaeff91e3f4cbbe6bd3e218f65))
* **BigNumbers:** new component BigNumbers ([#4174](https://github.com/carbon-design-system/ibm-products/issues/4174)) ([8053304](https://github.com/carbon-design-system/ibm-products/commit/80533047724d9a3227285110edaef9d291244d44))
* **SidePanel:** initial reduced motion work for side panel opacity ([#4318](https://github.com/carbon-design-system/ibm-products/issues/4318)) ([378f719](https://github.com/carbon-design-system/ibm-products/commit/378f71975b7f30a4a06230b4a9cd2d73733cf0de))
* **StringFormatter:** new component StringFormatter ([#4249](https://github.com/carbon-design-system/ibm-products/issues/4249)) ([74d67d0](https://github.com/carbon-design-system/ibm-products/commit/74d67d09f3d84e85e238eb9400d5114ba69c9518))
* **UserAvatar:** implementation of name,size props ([#4312](https://github.com/carbon-design-system/ibm-products/issues/4312)) ([a4e1a21](https://github.com/carbon-design-system/ibm-products/commit/a4e1a210d6de758af7845c9b667157932e902cfe))





# [2.26.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.25.0...@carbon/ibm-products@2.26.0) (2024-02-13)


### Bug Fixes

* **Datagrid:** changes getRowId parameter to original row data ([#4302](https://github.com/carbon-design-system/ibm-products/issues/4302)) ([ec1a422](https://github.com/carbon-design-system/ibm-products/commit/ec1a422c52b253758150965b05fd976995f7b01f))
* **Datagrid:** ssr fix in select all toggle hook ([#4316](https://github.com/carbon-design-system/ibm-products/issues/4316)) ([ec82821](https://github.com/carbon-design-system/ibm-products/commit/ec828216653fb8231c3eea67e49b4a0a24d859e7))
* render Datagrid docs as expected ([#4314](https://github.com/carbon-design-system/ibm-products/issues/4314)) ([7a9a83b](https://github.com/carbon-design-system/ibm-products/commit/7a9a83bfc81764176abe04d4eed588be63b28615))
* **Tearsheet:** implement focus trapping within tearsheets ([#4129](https://github.com/carbon-design-system/ibm-products/issues/4129)) ([3403941](https://github.com/carbon-design-system/ibm-products/commit/340394128073cbab4979d411ab9caa5419e82d1c))
* use flex-start instead of start and update `DatagridSlug` return ([#4307](https://github.com/carbon-design-system/ibm-products/issues/4307)) ([54112ea](https://github.com/carbon-design-system/ibm-products/commit/54112ea5eb119fe2fed7f62d97307d28c4367d30))
* **UserAvatar:** improve interactions ([#4298](https://github.com/carbon-design-system/ibm-products/issues/4298)) ([d27dd07](https://github.com/carbon-design-system/ibm-products/commit/d27dd07ce98f9d060116e11e9a0e2ebc64d22a3b))


### Features

* **Datagrid:** add ai slug support for rows ([#4229](https://github.com/carbon-design-system/ibm-products/issues/4229)) ([3fd6ca3](https://github.com/carbon-design-system/ibm-products/commit/3fd6ca34c7451d72335807f74114cfe8dbf62741))
* **FullPageError:** added support for 403 and 404 variants ([#4304](https://github.com/carbon-design-system/ibm-products/issues/4304)) ([4cd99ea](https://github.com/carbon-design-system/ibm-products/commit/4cd99ea17cd223a5fd9bbcc5a5d00bc3f96cb6d8))





# [2.25.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.24.0...@carbon/ibm-products@2.25.0) (2024-02-09)


### Bug Fixes

* **Datagrid:** expand listener added ([#3114](https://github.com/carbon-design-system/ibm-products/issues/3114)) ([d93d72f](https://github.com/carbon-design-system/ibm-products/commit/d93d72faaafea2d233ec55d9e61f254ad3bc0b08))
* use of not has selectors ([#4233](https://github.com/carbon-design-system/ibm-products/issues/4233)) ([ea006b0](https://github.com/carbon-design-system/ibm-products/commit/ea006b0fbf10038f83a4bfe8b0a963ca9b5800ea))


### Features

* add mouseUp event for onColResizeEnd [#4235](https://github.com/carbon-design-system/ibm-products/issues/4235) ([#4243](https://github.com/carbon-design-system/ibm-products/issues/4243)) ([c36cc21](https://github.com/carbon-design-system/ibm-products/commit/c36cc21145e959476c802dd2408e32fb8fb42d28))
* **Datagrid:** update filtering copyright headers, review eslint disable rules, remove filter feature flags ([#4178](https://github.com/carbon-design-system/ibm-products/issues/4178)) ([c40af25](https://github.com/carbon-design-system/ibm-products/commit/c40af25ebd3f08646fadfb5a6742fa8190d1af7d))
* empty state v2 ([#4197](https://github.com/carbon-design-system/ibm-products/issues/4197)) ([1adf802](https://github.com/carbon-design-system/ibm-products/commit/1adf80228090565e9b48244daf69a1ccef9de211))
* **FullPageError:** create new FullPageError component ([#4211](https://github.com/carbon-design-system/ibm-products/issues/4211)) ([24afc41](https://github.com/carbon-design-system/ibm-products/commit/24afc41b83cca0c365082265130d56aa4c263695))
* **TruncatedList:** new component TruncatedList ([#4139](https://github.com/carbon-design-system/ibm-products/issues/4139)) ([bc54d2f](https://github.com/carbon-design-system/ibm-products/commit/bc54d2f1f9a016776c6dc0b998c7a3bcbb021ccb))
* **UserAvatar:** create UserAvatar component ([#4200](https://github.com/carbon-design-system/ibm-products/issues/4200)) ([3990523](https://github.com/carbon-design-system/ibm-products/commit/399052356b9492a9699809a715c0ee34e52cd6a3))





# [2.24.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.23.0...@carbon/ibm-products@2.24.0) (2024-02-06)


### Bug Fixes

* **Datagrid:** check for document before continuing ([#4205](https://github.com/carbon-design-system/ibm-products/issues/4205)) ([0ec7196](https://github.com/carbon-design-system/ibm-products/commit/0ec719663fe5f95794db23105374855d484c9ad7))
* **DataGrid:** column customisation not unselect locked columns ([#4191](https://github.com/carbon-design-system/ibm-products/issues/4191)) ([566aa31](https://github.com/carbon-design-system/ibm-products/commit/566aa31a508dcacf29eb8e7f1b92cb594a85ba98))
* **DataGrid:** Column customization improvements ([#4199](https://github.com/carbon-design-system/ibm-products/issues/4199)) ([95a4f59](https://github.com/carbon-design-system/ibm-products/commit/95a4f59d493d88f2d37d053559640caa611924e4))
* **DataGrid:** customize column prevent disabled drop ([#4180](https://github.com/carbon-design-system/ibm-products/issues/4180)) ([633de43](https://github.com/carbon-design-system/ibm-products/commit/633de43368891ce7a73078ebef08b958c16e51ca))
* **DataGrid:** use action column use isdelete prop ([#4161](https://github.com/carbon-design-system/ibm-products/issues/4161)) ([df30f19](https://github.com/carbon-design-system/ibm-products/commit/df30f1915a984ee6ecae18662b00f1892c758bcc))
* **Empty state:** accessibility defect ([#4137](https://github.com/carbon-design-system/ibm-products/issues/4137)) ([778dd03](https://github.com/carbon-design-system/ibm-products/commit/778dd03bbad3a67538742a06ae019cbc8ee723d0))
* **PageHeader:** collapsed breadcrumb tab disappears on resize ([#4068](https://github.com/carbon-design-system/ibm-products/issues/4068)) ([534b5cf](https://github.com/carbon-design-system/ibm-products/commit/534b5cff287ab4da54366f2bc38a2afad5ebf0b0))


### Features

* Gradient ai updates ([#4184](https://github.com/carbon-design-system/ibm-products/issues/4184)) ([54aa157](https://github.com/carbon-design-system/ibm-products/commit/54aa15705d613a03361476a522e242d9ff3ea5b6))
* port Coachmark component to v2 ([#4031](https://github.com/carbon-design-system/ibm-products/issues/4031)) ([dc46cf0](https://github.com/carbon-design-system/ibm-products/commit/dc46cf02ef8c67e98c21fb0887ec704de278bd9a))
* port InterstitialScreen component to V2 ([#4094](https://github.com/carbon-design-system/ibm-products/issues/4094)) ([827d97d](https://github.com/carbon-design-system/ibm-products/commit/827d97d36adaa4bd8a0b86b6375a78920b1da5a2))
* **SearchBar:** Migrate SearchBar from Products v1 / Security to Products v2 ([#4202](https://github.com/carbon-design-system/ibm-products/issues/4202)) ([b8653f0](https://github.com/carbon-design-system/ibm-products/commit/b8653f0775708898160e25d55400f22900710f4a))





# [2.23.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.22.0...@carbon/ibm-products@2.23.0) (2024-01-31)


### Bug Fixes

* side panel and tearsheet fixes ([#4183](https://github.com/carbon-design-system/ibm-products/issues/4183)) ([ee0f3ed](https://github.com/carbon-design-system/ibm-products/commit/ee0f3ed5a2f1ce10aa9850d13854bcf37d07d79a))


### Features

* **Datagrid:** add ai slug support to col headers ([#4163](https://github.com/carbon-design-system/ibm-products/issues/4163)) ([f0b17e2](https://github.com/carbon-design-system/ibm-products/commit/f0b17e284ce38157bdd08543c962fb43f4090ad7))
* **Datagrid:** add expand icon button in filter summary ([#4030](https://github.com/carbon-design-system/ibm-products/issues/4030)) ([bc7641f](https://github.com/carbon-design-system/ibm-products/commit/bc7641f6cab65a1a1d7f759a36185e14f64ad224))





# [2.22.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.21.0...@carbon/ibm-products@2.22.0) (2024-01-30)


### Bug Fixes

* close filter flyout on cancel ([#4142](https://github.com/carbon-design-system/ibm-products/issues/4142)) ([d5dc4e7](https://github.com/carbon-design-system/ibm-products/commit/d5dc4e75c9e54a84854010579b62e25efeaf0a55))
* **Datagrid:** fix placement of pagination when used with filter panel ([#4152](https://github.com/carbon-design-system/ibm-products/issues/4152)) ([d486005](https://github.com/carbon-design-system/ibm-products/commit/d4860054d31a0a3bbc9e0e1440402fdb8690e8bb))
* **Datagrid:** resolve useRowIsMouseOver issue ([#4061](https://github.com/carbon-design-system/ibm-products/issues/4061)) ([b3166a1](https://github.com/carbon-design-system/ibm-products/commit/b3166a174e6c6665d6a4b9f407bf1e010477d7c7))
* **TagSet:** close tag set overflow upon displayed tag `onClose` being called ([#3997](https://github.com/carbon-design-system/ibm-products/issues/3997)) ([56c8bb2](https://github.com/carbon-design-system/ibm-products/commit/56c8bb2f21f85b07c4ba950e6db6c36e3f0c0b9a))


### Features

* **DelimitedList:** new component DelimitedList ([#4069](https://github.com/carbon-design-system/ibm-products/issues/4069)) ([2e60709](https://github.com/carbon-design-system/ibm-products/commit/2e60709976b08718ec437890e9721e9a1b83500c)), closes [#4047](https://github.com/carbon-design-system/ibm-products/issues/4047)
* update ai-gradient to phase 2 spec ([#4145](https://github.com/carbon-design-system/ibm-products/issues/4145)) ([4e51d13](https://github.com/carbon-design-system/ibm-products/commit/4e51d132ae60b7aa154eaa433b1a58cdd98fbca2))





# [2.21.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.20.0...@carbon/ibm-products@2.21.0) (2024-01-23)


### Bug Fixes

* **DataGrid:** nested rows on click on child row ([#4055](https://github.com/carbon-design-system/ibm-products/issues/4055)) ([d6bcf02](https://github.com/carbon-design-system/ibm-products/commit/d6bcf02a37113da8062006b50d43c5f50ad66e84))
* datatable cell accessibility adjustment ([#4046](https://github.com/carbon-design-system/ibm-products/issues/4046)) ([a359d7f](https://github.com/carbon-design-system/ibm-products/commit/a359d7fc8bd9b4fca470c971151ebab93cc5753f))
* remove unnecessary datagrid roles ([#4072](https://github.com/carbon-design-system/ibm-products/issues/4072)) ([2b09059](https://github.com/carbon-design-system/ibm-products/commit/2b09059e8f9cd8e2f4a98be063bbac7ee0e1e394))
* update Carbon 11 compatible versions to latest ([#4049](https://github.com/carbon-design-system/ibm-products/issues/4049)) ([484e00c](https://github.com/carbon-design-system/ibm-products/commit/484e00c29732922fa62f4489322250c27fde0c06))
* update generate script ([#4063](https://github.com/carbon-design-system/ibm-products/issues/4063)) ([c284f25](https://github.com/carbon-design-system/ibm-products/commit/c284f25ce1c5eb4ce357cc3e26f84219c50502bd))


### Features

* **Datagrid:** add support for initially expanded nested rows ([#4088](https://github.com/carbon-design-system/ibm-products/issues/4088)) ([58ea07f](https://github.com/carbon-design-system/ibm-products/commit/58ea07f7743b8385b84ee9892bc35f720f5c5c9f))
* **Tearsheet:** support aria-label ([#4130](https://github.com/carbon-design-system/ibm-products/issues/4130)) ([01d8f56](https://github.com/carbon-design-system/ibm-products/commit/01d8f56b1f75b309cfbfdc763065d88e54bfa9e1))





# [2.20.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.19.2...@carbon/ibm-products@2.20.0) (2024-01-16)


### Bug Fixes

* datagrid empty state hover background color ([#4008](https://github.com/carbon-design-system/ibm-products/issues/4008)) ([21466c8](https://github.com/carbon-design-system/ibm-products/commit/21466c879fd4328e12d5ca1f1abc9d319b27dfa9))
* **Datagrid:** use correct motion specs for reduced motion filter panel ([#4010](https://github.com/carbon-design-system/ibm-products/issues/4010)) ([7d75155](https://github.com/carbon-design-system/ibm-products/commit/7d75155386eee89b4ebd5c571e311a70daa3fdef))
* **SidePanel:** check for element before proceeding, add warning ([#4034](https://github.com/carbon-design-system/ibm-products/issues/4034)) ([f6378ff](https://github.com/carbon-design-system/ibm-products/commit/f6378ffe2e16acf10d2a7a436d071d65672ceb62))
* **Tearsheet:** stop trying to focus closed tearsheets ([#3989](https://github.com/carbon-design-system/ibm-products/issues/3989)) ([788bb86](https://github.com/carbon-design-system/ibm-products/commit/788bb86ce710aeba473a2022cfc404d59ab91348)), closes [#3988](https://github.com/carbon-design-system/ibm-products/issues/3988)
* update Carbon 11 compatible versions to latest ([#3993](https://github.com/carbon-design-system/ibm-products/issues/3993)) ([c44ff55](https://github.com/carbon-design-system/ibm-products/commit/c44ff558cc753821289bec1b4a14d96c8bc42b46))


### Features

* **Datagrid:** add reduced motion support to filter panel ([#3994](https://github.com/carbon-design-system/ibm-products/issues/3994)) ([a9f1dc5](https://github.com/carbon-design-system/ibm-products/commit/a9f1dc5dc25024a8bac34a755610c83dc8a69daa))
* **Datagrid:** add responsive updates to filter flyout ([#4001](https://github.com/carbon-design-system/ibm-products/issues/4001)) ([6fa5e6b](https://github.com/carbon-design-system/ibm-products/commit/6fa5e6b12d30718f747f3075155c37b8ff560239))





## [2.19.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.19.1...@carbon/ibm-products@2.19.2) (2024-01-02)


### Bug Fixes

* add lottie-web to ibm-products package.json ([#3990](https://github.com/carbon-design-system/ibm-products/issues/3990)) ([89d435a](https://github.com/carbon-design-system/ibm-products/commit/89d435a1663451ea0bb19c494045a8c92af96fe3))





## [2.19.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.19.0...@carbon/ibm-products@2.19.1) (2023-12-26)

**Note:** Version bump only for package @carbon/ibm-products





# [2.19.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.18.1...@carbon/ibm-products@2.19.0) (2023-12-19)


### Bug Fixes

* add missing N2P component exports ([#3974](https://github.com/carbon-design-system/ibm-products/issues/3974)) ([a03df87](https://github.com/carbon-design-system/ibm-products/commit/a03df8742a1f462e853b95e80e080f765d8d3943))
* **Datagrid:** address duplicate id with radio filters ([#3962](https://github.com/carbon-design-system/ibm-products/issues/3962)) ([0274aef](https://github.com/carbon-design-system/ibm-products/commit/0274aeffc90a916509b6f94611262e35351013a1))
* **Datagrid:** re-apply filters during fetching state ([#3955](https://github.com/carbon-design-system/ibm-products/issues/3955)) ([29e5de9](https://github.com/carbon-design-system/ibm-products/commit/29e5de9f655a6bec1150e8048655a5a87cd20068))
* **Guidebanner:** allow adding 1rem space on the left ([#3965](https://github.com/carbon-design-system/ibm-products/issues/3965)) ([fcd0388](https://github.com/carbon-design-system/ibm-products/commit/fcd038879e19b6498c63d2848fc5ae25c74c086c))
* **InlineTip:** allow adding 1rem space on the left, v2 ([#3969](https://github.com/carbon-design-system/ibm-products/issues/3969)) ([feaa1ce](https://github.com/carbon-design-system/ibm-products/commit/feaa1cecf0386213170ace8489cbfb0ebe45f500))
* removes unnecessary roles from datagrid ([#3957](https://github.com/carbon-design-system/ibm-products/issues/3957)) ([45db4ae](https://github.com/carbon-design-system/ibm-products/commit/45db4ae33b8aa35224f7b8c44261a057930f4eaa))


### Features

* Cards ai ([#3953](https://github.com/carbon-design-system/ibm-products/issues/3953)) ([e7ab94e](https://github.com/carbon-design-system/ibm-products/commit/e7ab94eca8dcb86ce7227f83c6ed0923c413df32))
* **Datagrid:** clear out filter history on reset ([#3960](https://github.com/carbon-design-system/ibm-products/issues/3960)) ([48e4820](https://github.com/carbon-design-system/ibm-products/commit/48e4820f56a8f892c63eaa1a3d32cd3f0e6cf96b))
* **Datagrid:** support timestamp date formats in filtering ([#3967](https://github.com/carbon-design-system/ibm-products/issues/3967)) ([fecea90](https://github.com/carbon-design-system/ibm-products/commit/fecea9083ea7eb8a71f84ee654592849739efb62))
* side panel for create and edit + type check ([#3954](https://github.com/carbon-design-system/ibm-products/issues/3954)) ([8589f2e](https://github.com/carbon-design-system/ibm-products/commit/8589f2ef537d2001f1a04cb98b8dddb915f20ef8))





## [2.18.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.18.0...@carbon/ibm-products@2.18.1) (2023-12-12)

**Note:** Version bump only for package @carbon/ibm-products





# [2.18.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.17.2...@carbon/ibm-products@2.18.0) (2023-12-07)


### Bug Fixes

* fixes 3890 ([#3891](https://github.com/carbon-design-system/ibm-products/issues/3891)) ([3b7b6fd](https://github.com/carbon-design-system/ibm-products/commit/3b7b6fd11223d2cc517cd59438f7449b33ea7375))
* **WebTerminal:** Apply inline theming web terminal. ([#3888](https://github.com/carbon-design-system/ibm-products/issues/3888)) ([80a54db](https://github.com/carbon-design-system/ibm-products/commit/80a54dbf22bdaefe2b7965902268941dc702f624))


### Features

* **FilterSummary:** enable filter summary clear button to be placed inline ([#3906](https://github.com/carbon-design-system/ibm-products/issues/3906)) ([e154f89](https://github.com/carbon-design-system/ibm-products/commit/e154f89d4295f646522d7f0d20c49323c69b4c75))
* new NonLinearReading component ([#3889](https://github.com/carbon-design-system/ibm-products/issues/3889)) ([962fbb6](https://github.com/carbon-design-system/ibm-products/commit/962fbb61ea2897db2b954afb8ebd5e721afe30c9))
* port Guidebanner component w Carousel to v2 ([#3905](https://github.com/carbon-design-system/ibm-products/issues/3905)) ([e89a3f2](https://github.com/carbon-design-system/ibm-products/commit/e89a3f2575387e5f46338955c4aa4d07de663e3b))





## [2.17.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.17.1...@carbon/ibm-products@2.17.2) (2023-12-05)


### Bug Fixes

* adds id to sidepanel ([#3896](https://github.com/carbon-design-system/ibm-products/issues/3896)) ([4de63a2](https://github.com/carbon-design-system/ibm-products/commit/4de63a26e0e6c6645590144366fb72e6a4b64876))
* create tearsheet reset bug ([#3877](https://github.com/carbon-design-system/ibm-products/issues/3877)) ([97d8e11](https://github.com/carbon-design-system/ibm-products/commit/97d8e11d6eb455227cf16071d11cfae92d5a2eaf))
* **Datagrid:** always force expander to be first column ([#3885](https://github.com/carbon-design-system/ibm-products/issues/3885)) ([50784fc](https://github.com/carbon-design-system/ibm-products/commit/50784fc373f287ac4ec8929f19413b5872c1e267))
* **Datagrid:** expandable/nested review fixes, custom hook for keeping expander focus ([#3861](https://github.com/carbon-design-system/ibm-products/issues/3861)) ([ae33c58](https://github.com/carbon-design-system/ibm-products/commit/ae33c58fe13f5b352d782a6ba64e8d428c65c498))
* published side panel error ([#3900](https://github.com/carbon-design-system/ibm-products/issues/3900)) ([b1487f6](https://github.com/carbon-design-system/ibm-products/commit/b1487f600e4d6be683ec16de3783a721dad38f2d))
* update Carbon 11 compatible versions to latest ([#3880](https://github.com/carbon-design-system/ibm-products/issues/3880)) ([b96b1f2](https://github.com/carbon-design-system/ibm-products/commit/b96b1f2982336f15f504cf75d2d50f30c88c93a9))





## [2.17.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.17.0...@carbon/ibm-products@2.17.1) (2023-11-30)


### Bug Fixes

* **Datagrid:** use getRowId to set selectedRowData instead of index ([#3855](https://github.com/carbon-design-system/ibm-products/issues/3855)) ([522e990](https://github.com/carbon-design-system/ibm-products/commit/522e9904dea7adf8798cc0824373cadf6747ca39))
* no data empty state title ([#3862](https://github.com/carbon-design-system/ibm-products/issues/3862)) ([b99a106](https://github.com/carbon-design-system/ibm-products/commit/b99a106df0089874222e186cfeecab74530fe071))
* update Carbon 11 compatible versions to latest ([#3806](https://github.com/carbon-design-system/ibm-products/issues/3806)) ([1f78945](https://github.com/carbon-design-system/ibm-products/commit/1f78945fca30b46789822949d1bef08a3ec36c47))





# [2.17.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.16.0...@carbon/ibm-products@2.17.0) (2023-11-28)


### Bug Fixes

* **Datagrid:** remove hardcoded label, add cb fn for TableBatchActions ([#3851](https://github.com/carbon-design-system/ibm-products/issues/3851)) ([83d90eb](https://github.com/carbon-design-system/ibm-products/commit/83d90eb6f44c0f8d25f8460e00462a3b91aef212))
* move spacer and actions to the end ([#3846](https://github.com/carbon-design-system/ibm-products/issues/3846)) ([26b323f](https://github.com/carbon-design-system/ibm-products/commit/26b323fc7695d7e393ecb388efdc6aae9f505b9f))


### Features

* datagrid base release ([#3839](https://github.com/carbon-design-system/ibm-products/issues/3839)) ([d52200b](https://github.com/carbon-design-system/ibm-products/commit/d52200b3e90421774d68a3b69e6e02342d026734))
* publish styles as independant package ([#3799](https://github.com/carbon-design-system/ibm-products/issues/3799)) ([df080be](https://github.com/carbon-design-system/ibm-products/commit/df080be8a240a510a723805e535f7c75d438461a))





# [2.16.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.15.2...@carbon/ibm-products@2.16.0) (2023-11-21)


### Bug Fixes

* clickable row review fixes ([#3795](https://github.com/carbon-design-system/ibm-products/issues/3795)) ([21c3e58](https://github.com/carbon-design-system/ibm-products/commit/21c3e58be3d98ddaf466423c3931a7006303c03b))
* **Datagrid:** fix visible scroll bar when resizing with pagination ([#3805](https://github.com/carbon-design-system/ibm-products/issues/3805)) ([5195e45](https://github.com/carbon-design-system/ibm-products/commit/5195e45bab5b3875e24f20b469b05230f76fdd9b))
* **Datagrid:** review fixes from resizable columns review ([#3813](https://github.com/carbon-design-system/ibm-products/issues/3813)) ([0cf6dfd](https://github.com/carbon-design-system/ibm-products/commit/0cf6dfda924c322a2acfa4f1b4749ff1099d0b1f))
* empty state accessibility update ([#3834](https://github.com/carbon-design-system/ibm-products/issues/3834)) ([b9080da](https://github.com/carbon-design-system/ibm-products/commit/b9080dae976048207888cfb25b313dece349ced9))
* side panel scrolled height ([#3823](https://github.com/carbon-design-system/ibm-products/issues/3823)) ([7d55acc](https://github.com/carbon-design-system/ibm-products/commit/7d55acc11cf826e1520c9b04eccb393ac18f000d))
* unhandling error that caused by extra columns for issue [#3455](https://github.com/carbon-design-system/ibm-products/issues/3455) ([#3810](https://github.com/carbon-design-system/ibm-products/issues/3810)) ([45d4da3](https://github.com/carbon-design-system/ibm-products/commit/45d4da33c80d2d2145c5629ed38a84ac216c8061))


### Features

* **Datagrid:** selectable rows return all row data selected via react-table `state` ([#3827](https://github.com/carbon-design-system/ibm-products/issues/3827)) ([b3d7a60](https://github.com/carbon-design-system/ibm-products/commit/b3d7a608436fc8f0075b2992a7e44f08fdf880a8))
* new InlineTip and SteppedAnimatedMedia components ([#3800](https://github.com/carbon-design-system/ibm-products/issues/3800)) ([bd79dc8](https://github.com/carbon-design-system/ibm-products/commit/bd79dc8e0f402465813163f1f2021526f96dabb5))





## [2.15.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.15.1...@carbon/ibm-products@2.15.2) (2023-11-14)


### Bug Fixes

* **Datagrid:** destructure key to fix eslint unique key error ([#3772](https://github.com/carbon-design-system/ibm-products/issues/3772)) ([ce54e35](https://github.com/carbon-design-system/ibm-products/commit/ce54e3572ec2f2e0c27d462a89c9c42d6a5c2c5b))
* **Datagrid:** match designs, frozen/non frozen action button behavior ([#3778](https://github.com/carbon-design-system/ibm-products/issues/3778)) ([ad6ce58](https://github.com/carbon-design-system/ibm-products/commit/ad6ce584f4cc897347f2f4231f839c0e68f98d66))
* **Datagrid:** properly render component via jsx ([#3787](https://github.com/carbon-design-system/ibm-products/issues/3787)) ([ed0f7bf](https://github.com/carbon-design-system/ibm-products/commit/ed0f7bfabaf7d7771c5f9b6f0d9ba2ec183374be))





## [2.15.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.15.0...@carbon/ibm-products@2.15.1) (2023-11-07)


### Bug Fixes

* datagrid batch actions release review fixes ([#3771](https://github.com/carbon-design-system/ibm-products/issues/3771)) ([bf36dc9](https://github.com/carbon-design-system/ibm-products/commit/bf36dc9079b65746be70ab5896dc67baa4aad4d9))
* **Datagrid:** stop propagation of row expander click event ([#3769](https://github.com/carbon-design-system/ibm-products/issues/3769)) ([2ac6864](https://github.com/carbon-design-system/ibm-products/commit/2ac6864bce9dad258264e5b570db2fe2825eae56))
* replace prop from 'ariaLabel' to 'aria-label' ([#3765](https://github.com/carbon-design-system/ibm-products/issues/3765)) ([af02b7d](https://github.com/carbon-design-system/ibm-products/commit/af02b7d6976eadb6ed36e2aa26028410734d7352))
* Storybook error "Failed prop type: req'd titleText is missing from Dropdown" ([#3764](https://github.com/carbon-design-system/ibm-products/issues/3764)) ([2b9414e](https://github.com/carbon-design-system/ibm-products/commit/2b9414e894c16670b609be476df6d9dffd2bbc41))





# [2.15.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.14.0...@carbon/ibm-products@2.15.0) (2023-11-03)


### Bug Fixes

* change overflow menu's tooltip alignment to 'left' ([#3730](https://github.com/carbon-design-system/ibm-products/issues/3730)) ([4e3a4e8](https://github.com/carbon-design-system/ibm-products/commit/4e3a4e8aaf827db0efb02749392cec701fa1e770))
* **Checklist:** update colors and story structures ([#3739](https://github.com/carbon-design-system/ibm-products/issues/3739)) ([c154555](https://github.com/carbon-design-system/ibm-products/commit/c154555e8987216ecdd3da91244b2e6c038db191))
* **CreateTearsheet & CreateFullPage:** Influencer step error indicator extension ([#3717](https://github.com/carbon-design-system/ibm-products/issues/3717)) ([04654b2](https://github.com/carbon-design-system/ibm-products/commit/04654b26852e9db8495a81e1c9691327a14a4a16))
* datagrid header review fixes ([#3743](https://github.com/carbon-design-system/ibm-products/issues/3743)) ([d1b68e3](https://github.com/carbon-design-system/ibm-products/commit/d1b68e31f01176d1ed0e2f5c20d8990f5a3cd672))
* **Datagrid:** address resize end issues ([#3745](https://github.com/carbon-design-system/ibm-products/issues/3745)) ([ae15a37](https://github.com/carbon-design-system/ibm-products/commit/ae15a373c6637fbe2052fb2d35ab7fb5903640cc))
* **Datagrid:** adhere to min width if provided ([#3707](https://github.com/carbon-design-system/ibm-products/issues/3707)) ([49458f8](https://github.com/carbon-design-system/ibm-products/commit/49458f8a8310f47306e19bf6a40352e73738f195))
* **Datagrid:** correct number of items displayed when viewing all checkbox filters ([#3726](https://github.com/carbon-design-system/ibm-products/issues/3726)) ([21a99cf](https://github.com/carbon-design-system/ibm-products/commit/21a99cfc79ef83a00c849bf5924d63d7a500c3cf))
* **EditTearsheet:** Correctly assign action handlers to associated buttons ([#3751](https://github.com/carbon-design-system/ibm-products/issues/3751)) ([2a0024d](https://github.com/carbon-design-system/ibm-products/commit/2a0024d90d0e0edfd7126a49d95be507d0db4e4b))
* for gallery examples ([#3729](https://github.com/carbon-design-system/ibm-products/issues/3729)) ([72c600b](https://github.com/carbon-design-system/ibm-products/commit/72c600bc32cf73636e5085b6c31f1ea36c8a2e50))
* update to Carbon 11 compatible versions to latest ([#3734](https://github.com/carbon-design-system/ibm-products/issues/3734)) ([f3a2c0e](https://github.com/carbon-design-system/ibm-products/commit/f3a2c0ee60ff49e56e62589f73a7fdfd2b8e2d2e))


### Features

* add prefix hook ([#3727](https://github.com/carbon-design-system/ibm-products/issues/3727)) ([36b51a9](https://github.com/carbon-design-system/ibm-products/commit/36b51a91b4741c49a2b7361c6d9dc6404f54f2d7))





# [2.14.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.13.0...@carbon/ibm-products@2.14.0) (2023-10-31)


### Bug Fixes

* **Datagrid:** semantically hide spacer col ([#3722](https://github.com/carbon-design-system/ibm-products/issues/3722)) ([28376e9](https://github.com/carbon-design-system/ibm-products/commit/28376e97aba4b15dfea5e111872ac4d8b1389ed3))
* **Datagrid:** top align cell content for extra large row height ([#3709](https://github.com/carbon-design-system/ibm-products/issues/3709)) ([a9ce489](https://github.com/carbon-design-system/ibm-products/commit/a9ce4899180394cdd309d8a80ddda06977a1efac))
* **TagSet:** remove only from tag set tests ([#3719](https://github.com/carbon-design-system/ibm-products/issues/3719)) ([d4edc78](https://github.com/carbon-design-system/ibm-products/commit/d4edc7823babea3d71a21882121df3b35144b311))


### Features

* **TagSet:** allow for tag rendering in overflow ([#3646](https://github.com/carbon-design-system/ibm-products/issues/3646)) ([cc793a3](https://github.com/carbon-design-system/ibm-products/commit/cc793a31cec978959f205f074f768c4ccbef31aa))





# [2.13.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.12.1...@carbon/ibm-products@2.13.0) (2023-10-27)


### Bug Fixes

* **Datagrid:** address incorrect order of fn args ([#3712](https://github.com/carbon-design-system/ibm-products/issues/3712)) ([2d1c87c](https://github.com/carbon-design-system/ibm-products/commit/2d1c87c0578168ead661a32283897d86d700bf21))
* **Datagrid:** import filter summary styles from datagrid ([#3689](https://github.com/carbon-design-system/ibm-products/issues/3689)) ([4d32a6f](https://github.com/carbon-design-system/ibm-products/commit/4d32a6f6702bf6868d2aa00859273229fa372933))
* sb warning - use actions column not enabled ([#3686](https://github.com/carbon-design-system/ibm-products/issues/3686)) ([e7dde77](https://github.com/carbon-design-system/ibm-products/commit/e7dde77d5d25860cb6fcb95cc16768b6fd0a3db8))
* sb warning - use actions column not enabled ([#3693](https://github.com/carbon-design-system/ibm-products/issues/3693)) ([67954e3](https://github.com/carbon-design-system/ibm-products/commit/67954e31af36db33f5b2940988914607d3c85d51))
* sb warning - use actions column not enabled ([#3695](https://github.com/carbon-design-system/ibm-products/issues/3695)) ([52f34ee](https://github.com/carbon-design-system/ibm-products/commit/52f34eec3d9464278c4608c0766416403ae8a4c7))
* Storybook error 'multiForm is not a DOM element' ([#3698](https://github.com/carbon-design-system/ibm-products/issues/3698)) ([341d7d2](https://github.com/carbon-design-system/ibm-products/commit/341d7d217d597357a3f41e542d41d4692de82493))
* Storybook error 'triggerclassname is not a DOM element' ([#3703](https://github.com/carbon-design-system/ibm-products/issues/3703)) ([fbb7429](https://github.com/carbon-design-system/ibm-products/commit/fbb7429e4c023f9a278a39caa3d047b4eb5f83a3))
* Storybook error "labeltext of type object supplied to Toggle" ([#3700](https://github.com/carbon-design-system/ibm-products/issues/3700)) ([be992be](https://github.com/carbon-design-system/ibm-products/commit/be992bea7c7fccf098d98a6966690b129466564c))
* update to Carbon 11 compatible versions to latest ([#3603](https://github.com/carbon-design-system/ibm-products/issues/3603)) ([847d4c0](https://github.com/carbon-design-system/ibm-products/commit/847d4c079d90742ca828dd83ed9402309bb20c54))


### Features

* new Checklist component ([#3626](https://github.com/carbon-design-system/ibm-products/issues/3626)) ([0499dcd](https://github.com/carbon-design-system/ibm-products/commit/0499dcd8c5e1e6f7dc4e91bc5d67b338f3bbb24d))





## [2.12.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.12.0...@carbon/ibm-products@2.12.1) (2023-10-24)


### Bug Fixes

* **CreateFullPage:** fix back button in full page ([#3677](https://github.com/carbon-design-system/ibm-products/issues/3677)) ([31f2a64](https://github.com/carbon-design-system/ibm-products/commit/31f2a64d19182b5196d4ff210060c36d27e31dda))
* **Datagrid:** address issues with current approach to getting col titles for customize columns tearsheet ([#3669](https://github.com/carbon-design-system/ibm-products/issues/3669)) ([e9534a6](https://github.com/carbon-design-system/ibm-products/commit/e9534a6ac2cfcdd66c0a37f60482c14337bcf259))
* **Datagrid:** do not always show edit icons ([#3674](https://github.com/carbon-design-system/ibm-products/issues/3674)) ([14684b8](https://github.com/carbon-design-system/ibm-products/commit/14684b871b172fceedc728cf3e4e1e11ad2dd6b0))
* remove 'subcomponents' from storybook settings ([#3668](https://github.com/carbon-design-system/ibm-products/issues/3668)) ([2113ac4](https://github.com/carbon-design-system/ibm-products/commit/2113ac4b2bbda6d8df4d17fac80836d1dd57e841))
* Storybook console error 'role=boolean' ([#3660](https://github.com/carbon-design-system/ibm-products/issues/3660)) ([35dfa96](https://github.com/carbon-design-system/ibm-products/commit/35dfa961d465abc3aa68fd7e40eccc80d0d30bf6))
* Storybook warning "selectDisabled is not a valid prop for a DOM element" ([#3666](https://github.com/carbon-design-system/ibm-products/issues/3666)) ([1091875](https://github.com/carbon-design-system/ibm-products/commit/1091875d1bfbfa8b0c9cdfe46ea2ce2959999fad))





# [2.12.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.11.3...@carbon/ibm-products@2.12.0) (2023-10-24)


### Bug Fixes

* **ButtonMenu:** a11y timing out ([#3661](https://github.com/carbon-design-system/ibm-products/issues/3661)) ([eaaa6be](https://github.com/carbon-design-system/ibm-products/commit/eaaa6be94284d54991c0fdef6382579340103ecd))
* Card CSS typo ([#3629](https://github.com/carbon-design-system/ibm-products/issues/3629)) ([5d9d5f8](https://github.com/carbon-design-system/ibm-products/commit/5d9d5f820cf632bb01f4e97fe11eac3b81557a78))
* console error 'future React will block javascript: URLs' ([#3652](https://github.com/carbon-design-system/ibm-products/issues/3652)) ([f40d0c1](https://github.com/carbon-design-system/ibm-products/commit/f40d0c13efdcb17df0468b0de0852c2ee063132d))
* console error 'Invalid argument supplied to oneOf(...), oneOfType(...)' ([#3651](https://github.com/carbon-design-system/ibm-products/issues/3651)) ([c5557e8](https://github.com/carbon-design-system/ibm-products/commit/c5557e810e92c2e36fac4209443295ab7827c858))
* **create-full-page:** header extensions ([#3488](https://github.com/carbon-design-system/ibm-products/issues/3488)) ([42c16bf](https://github.com/carbon-design-system/ibm-products/commit/42c16bf2b7028c0488ce3afbe89a6ddd77f174f3))
* **Datagrid:** add disabled/locked col drag functionality back ([#3598](https://github.com/carbon-design-system/ibm-products/issues/3598)) ([b36deb7](https://github.com/carbon-design-system/ibm-products/commit/b36deb710d0a72d015b087d8bff85e0b37ce3fa7))
* **status icon:** updated icons ([#3482](https://github.com/carbon-design-system/ibm-products/issues/3482)) ([b5e5729](https://github.com/carbon-design-system/ibm-products/commit/b5e5729492859cedf8c45e97c560dbcd3e23938a))
* Storybook error 'Invalid prop cellSize' ([#3653](https://github.com/carbon-design-system/ibm-products/issues/3653)) ([dd9f116](https://github.com/carbon-design-system/ibm-products/commit/dd9f11600055bb31e98667016a3f2515b30eda57))
* Storybook error 'isDelete is not a DOM element' ([#3657](https://github.com/carbon-design-system/ibm-products/issues/3657)) ([f31a9af](https://github.com/carbon-design-system/ibm-products/commit/f31a9af27c23d32332682a3453829196993d1d8c))
* Storybook error 'placeHolderText is not a DOM element' ([#3654](https://github.com/carbon-design-system/ibm-products/issues/3654)) ([d2cbb1a](https://github.com/carbon-design-system/ibm-products/commit/d2cbb1accc0c8fc057d4cf6cec82a5bb059ab9b6))
* Storybook error "renderIcon is not a DOM element" ([#3656](https://github.com/carbon-design-system/ibm-products/issues/3656)) ([1b146e2](https://github.com/carbon-design-system/ibm-products/commit/1b146e2a741aa1d0916a9bf5de2ea1a9c90a814e))
* Storybook warning 'light prop is deprecated' ([#3658](https://github.com/carbon-design-system/ibm-products/issues/3658)) ([f483d56](https://github.com/carbon-design-system/ibm-products/commit/f483d560ed006eba78475eea33a849f122fc7b51))


### Features

* **Datagrid:** adds view all feature for checkboxes ([#3560](https://github.com/carbon-design-system/ibm-products/issues/3560)) ([821c232](https://github.com/carbon-design-system/ibm-products/commit/821c2322f58cabe1c78f1866f318c8fd54eb12b0))
* **Datagrid:** remove filter tags individually from `FilterSummary` ([#3582](https://github.com/carbon-design-system/ibm-products/issues/3582)) ([ad74bc6](https://github.com/carbon-design-system/ibm-products/commit/ad74bc65502e3c59d8a3cad6b19abfce6a1d98dd))





## [2.11.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.11.2...@carbon/ibm-products@2.11.3) (2023-10-17)


### Bug Fixes

* **Tearsheet:** address Element type issue ([#3621](https://github.com/carbon-design-system/ibm-products/issues/3621)) ([81e07df](https://github.com/carbon-design-system/ibm-products/commit/81e07df5ae4c6804fe47b6b6d47d3a999e0e83bd))





## [2.11.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.11.1...@carbon/ibm-products@2.11.2) (2023-10-17)


### Bug Fixes

* **Datagrid:** reset col order in tearsheet onClose ([#3578](https://github.com/carbon-design-system/ibm-products/issues/3578)) ([b97cf0f](https://github.com/carbon-design-system/ibm-products/commit/b97cf0f906fc8e441db593e1df391ad4650c0633))
* **Pattern-Saving:** Reversed the icons for default state (save) and success state(checkmark) ([#3571](https://github.com/carbon-design-system/ibm-products/issues/3571)) ([a5eadfb](https://github.com/carbon-design-system/ibm-products/commit/a5eadfb7d642b027b6e85e889c3934bed03396eb))





## [2.11.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.11.0...@carbon/ibm-products@2.11.1) (2023-10-16)


### Bug Fixes

* datagrid actions review fixes ([#3579](https://github.com/carbon-design-system/ibm-products/issues/3579)) ([c9f5e2b](https://github.com/carbon-design-system/ibm-products/commit/c9f5e2bb72008e04ccfe7e6c8f9f2c90b36696f8))
* **Datagrid:** expander title / aria-label updates ([#3564](https://github.com/carbon-design-system/ibm-products/issues/3564)) ([1bcff24](https://github.com/carbon-design-system/ibm-products/commit/1bcff24517b3d66d369ef6ae4f7759b7a479fabc))
* **EditTearsheet:** Derive influencer nav items from form titles ([#3583](https://github.com/carbon-design-system/ibm-products/issues/3583)) ([7846c4b](https://github.com/carbon-design-system/ibm-products/commit/7846c4b657b2d0c1a7cb8dcb76bed823d6881fbd)), closes [#3574](https://github.com/carbon-design-system/ibm-products/issues/3574)
* move dnd kit deps out of dev deps ([#3576](https://github.com/carbon-design-system/ibm-products/issues/3576)) ([a65ed6e](https://github.com/carbon-design-system/ibm-products/commit/a65ed6e1576d970c1feb519c0c1cfae9ede77b5a))
* to rem usage ([#3570](https://github.com/carbon-design-system/ibm-products/issues/3570)) ([e9f938f](https://github.com/carbon-design-system/ibm-products/commit/e9f938fd236a1c99aa1989773979e43d90b2e77a))





# [2.11.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.10.2...@carbon/ibm-products@2.11.0) (2023-10-10)


### Bug Fixes

* **ButtonSetWithOverflow:** fix duplicate id issue ([#3545](https://github.com/carbon-design-system/ibm-products/issues/3545)) ([eed0e4d](https://github.com/carbon-design-system/ibm-products/commit/eed0e4d19ce13704333ba41d64415ba85910f46e))
* checkbox in column customisation ([#3542](https://github.com/carbon-design-system/ibm-products/issues/3542)) ([4b94fa8](https://github.com/carbon-design-system/ibm-products/commit/4b94fa88581b071ad287f1e120348342c28b3187))
* datagrid empty state fixes ([#3528](https://github.com/carbon-design-system/ibm-products/issues/3528)) ([9df5e1d](https://github.com/carbon-design-system/ibm-products/commit/9df5e1db016a6234bff1fd650cb8f0e324bdebaf))
* datagrid pagination review fixes ([#3492](https://github.com/carbon-design-system/ibm-products/issues/3492)) ([998a059](https://github.com/carbon-design-system/ibm-products/commit/998a0595cbc2120db1b3b503046754a45d1563e0))
* **Datagrid:** expandable row add background on row hover ([#3550](https://github.com/carbon-design-system/ibm-products/issues/3550)) ([5084b0f](https://github.com/carbon-design-system/ibm-products/commit/5084b0f2b64ce22ab5d6a872ae105120a1a78f7a))
* **Datagrid:** refactor expandable implementation ([#3525](https://github.com/carbon-design-system/ibm-products/issues/3525)) ([9677581](https://github.com/carbon-design-system/ibm-products/commit/9677581b6b15d3580f308cc9d790a80cbd083521))
* invalid aria-label ([#3496](https://github.com/carbon-design-system/ibm-products/issues/3496)) ([3644522](https://github.com/carbon-design-system/ibm-products/commit/364452272b1000745d6e67ea704337447ce774ac))
* Should our CSS use of carbon rem be to-rem ([#3558](https://github.com/carbon-design-system/ibm-products/issues/3558)) ([0c3839c](https://github.com/carbon-design-system/ibm-products/commit/0c3839ce49ef622ed2b303daee84fd1ce8d6e829))


### Features

* Modal portalTarget ([#3436](https://github.com/carbon-design-system/ibm-products/issues/3436)) ([a988d5c](https://github.com/carbon-design-system/ibm-products/commit/a988d5c11f9e03bb1cb3e6bcb473558e68f236c9))
* with dnd kit ([#3513](https://github.com/carbon-design-system/ibm-products/issues/3513)) ([d0df0a2](https://github.com/carbon-design-system/ibm-products/commit/d0df0a2175c110d07b931b00d058dce8f7c94013))





## [2.10.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.10.1...@carbon/ibm-products@2.10.2) (2023-09-29)


### Bug Fixes

* **EditTearsheet:** export edit tearsheet form component ([#3520](https://github.com/carbon-design-system/ibm-products/issues/3520)) ([ee053a7](https://github.com/carbon-design-system/ibm-products/commit/ee053a71587f54f51d0300d3f0ec98060f9e8e78))
* ensure no td border appears on tr:hover ([#3514](https://github.com/carbon-design-system/ibm-products/issues/3514)) ([db74221](https://github.com/carbon-design-system/ibm-products/commit/db74221d6b8e0eea472da3fbe6adead9967e8856))
* fixed tooltip alignment ([#3503](https://github.com/carbon-design-system/ibm-products/issues/3503)) ([f8b330c](https://github.com/carbon-design-system/ibm-products/commit/f8b330c69ef9736d9d84a8faa5264303b32f8426))
* remove td bottom border when state is empty ([#3498](https://github.com/carbon-design-system/ibm-products/issues/3498)) ([cce033e](https://github.com/carbon-design-system/ibm-products/commit/cce033e90d646cb64c9d332b8a6cd487fb91069a))
* update to Carbon 11 compatible versions to latest ([#3477](https://github.com/carbon-design-system/ibm-products/issues/3477)) ([c58ac80](https://github.com/carbon-design-system/ibm-products/commit/c58ac80c8c5760415b5b54cb96666b6b40a4472f))





## [2.10.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.10.0...@carbon/ibm-products@2.10.1) (2023-09-26)

**Note:** Version bump only for package @carbon/ibm-products





# [2.10.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.9.0...@carbon/ibm-products@2.10.0) (2023-09-20)


### Bug Fixes

* datagrid row height click ([#3480](https://github.com/carbon-design-system/ibm-products/issues/3480)) ([be38b68](https://github.com/carbon-design-system/ibm-products/commit/be38b6852ab0e949dad2f51c9c7d7fe58e79c7d1))
* datagrid toolbar accessibility ([#3460](https://github.com/carbon-design-system/ibm-products/issues/3460)) ([033897d](https://github.com/carbon-design-system/ibm-products/commit/033897dba61d2dc78af2a0d01d62dd5cc57700bc))
* **datagrid:** empty state fix ([#3389](https://github.com/carbon-design-system/ibm-products/issues/3389)) ([ac5939b](https://github.com/carbon-design-system/ibm-products/commit/ac5939bce71f1deae97071c47b8ac0cdcc97fd58))
* filter flyout outside click ([#3473](https://github.com/carbon-design-system/ibm-products/issues/3473)) ([e2d05c6](https://github.com/carbon-design-system/ibm-products/commit/e2d05c647c4ebdf21b702da39eddd68f488d0e11))


### Features

* **createfullpage:** initialstep added ([#3449](https://github.com/carbon-design-system/ibm-products/issues/3449)) ([7cb13d4](https://github.com/carbon-design-system/ibm-products/commit/7cb13d42cbc89e68f077d8f28bf1a637fffa7c02))





# [2.9.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.8.1...@carbon/ibm-products@2.9.0) (2023-09-12)


### Bug Fixes

* **build:** temporarily remove drag support in customize cols ([#3458](https://github.com/carbon-design-system/ibm-products/issues/3458)) ([1ea9725](https://github.com/carbon-design-system/ibm-products/commit/1ea97254df8104e1c2421a44d8d7e140fd2158bf))


### Features

* **Datagrid:** add new select all approach in batch actions ([#3438](https://github.com/carbon-design-system/ibm-products/issues/3438)) ([b939544](https://github.com/carbon-design-system/ibm-products/commit/b939544b219a37a5e43b9325baea5bd9808196eb))





## [2.8.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.8.0...@carbon/ibm-products@2.8.1) (2023-08-30)


### Bug Fixes

* **create-full-page:** add influencer title support ([#3399](https://github.com/carbon-design-system/ibm-products/issues/3399)) ([c2852f9](https://github.com/carbon-design-system/ibm-products/commit/c2852f9fafa295d2c33a82bf29585cd82b57fad4))
* **Datagrid:** add firefox style fixes ([#3432](https://github.com/carbon-design-system/ibm-products/issues/3432)) ([3b79f8c](https://github.com/carbon-design-system/ibm-products/commit/3b79f8c08de6dff9df304bd5b0a7f433663eb846))
* **Datagrid:** add text overflow styling to title/desc ([#3426](https://github.com/carbon-design-system/ibm-products/issues/3426)) ([0034e0e](https://github.com/carbon-design-system/ibm-products/commit/0034e0e63edec42e8b3bcf38d47f8a39e5019eea))
* issue 3402 ([#3421](https://github.com/carbon-design-system/ibm-products/issues/3421)) ([2eb3181](https://github.com/carbon-design-system/ibm-products/commit/2eb3181b1ef6540c46d45e906612053c75d7e4ae))
* some full screen docs pages ([#3419](https://github.com/carbon-design-system/ibm-products/issues/3419)) ([9a1faf9](https://github.com/carbon-design-system/ibm-products/commit/9a1faf9ea45ac0205a7f5d47e798ad547427a060))





# [2.8.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.7.0...@carbon/ibm-products@2.8.0) (2023-08-29)


### Bug Fixes

* **build:** move jest config package to v1 to prevent version clashes ([#3420](https://github.com/carbon-design-system/ibm-products/issues/3420)) ([b484006](https://github.com/carbon-design-system/ibm-products/commit/b484006572bcbc62b7b0ded4083242d136d23384))
* page header scroll and incidentals ([#3383](https://github.com/carbon-design-system/ibm-products/issues/3383)) ([b8c7346](https://github.com/carbon-design-system/ibm-products/commit/b8c73462a7fbdd6fc5d3e611b1e8cb61134bb0fe))
* replaces and deprecates ButtonMenu and ComboButton ([#3284](https://github.com/carbon-design-system/ibm-products/issues/3284)) ([5b2abbf](https://github.com/carbon-design-system/ibm-products/commit/5b2abbf83f2ab767b48e4e2941bf7d1876e336ca))
* storybook use of package dev prefix ([#3400](https://github.com/carbon-design-system/ibm-products/issues/3400)) ([f0a63e6](https://github.com/carbon-design-system/ibm-products/commit/f0a63e67a913ca29f189887ba3034671218c5446))


### Features

* **Datagrid:** add column resize callback ([#3406](https://github.com/carbon-design-system/ibm-products/issues/3406)) ([bac33c1](https://github.com/carbon-design-system/ibm-products/commit/bac33c16aabe7514578791026541336f50e45419))
* **Datagrid:** add keyboard support for col resizing ([#3394](https://github.com/carbon-design-system/ibm-products/issues/3394)) ([9abd4ae](https://github.com/carbon-design-system/ibm-products/commit/9abd4ae3c981f470486a3dc2195fbc65f83bdc1b))
* **NotificationsPanel:** include other attributes inside the link ([#3388](https://github.com/carbon-design-system/ibm-products/issues/3388)) ([ef8a825](https://github.com/carbon-design-system/ibm-products/commit/ef8a825cfc20f80899f79c6102bc186d2ca3ac9a))
* upgrade main package to react 18 ([#3146](https://github.com/carbon-design-system/ibm-products/issues/3146)) ([8dbddd1](https://github.com/carbon-design-system/ibm-products/commit/8dbddd1b38938fa7f00c75f5229088613703a9ca))





# [2.7.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.6.1...@carbon/ibm-products@2.7.0) (2023-08-22)


### Bug Fixes

* datagrid accessibility updates ([#3362](https://github.com/carbon-design-system/ibm-products/issues/3362)) ([76d77de](https://github.com/carbon-design-system/ibm-products/commit/76d77decf341ba837d75987a10b3df7f5252dd61))
* **Datagrid:** add initial width value to `useResizeObserver` and add batch actions test (v2) ([#3371](https://github.com/carbon-design-system/ibm-products/issues/3371)) ([a1e3f22](https://github.com/carbon-design-system/ibm-products/commit/a1e3f22cc8da7a3b262724b501e17a909ab37784))
* **NotificationPanel:** option to remove dnd ([#3102](https://github.com/carbon-design-system/ibm-products/issues/3102)) ([7b9e62e](https://github.com/carbon-design-system/ibm-products/commit/7b9e62e131ea440c11a1895c3e16e123a5832034))
* **options-tile:** fix toggle implementation ([#3381](https://github.com/carbon-design-system/ibm-products/issues/3381)) ([b1472a2](https://github.com/carbon-design-system/ibm-products/commit/b1472a273208079fa136157f08fb2eef3f3a245e))
* update to Carbon 11 compatible versions to latest ([#3375](https://github.com/carbon-design-system/ibm-products/issues/3375)) ([0877745](https://github.com/carbon-design-system/ibm-products/commit/08777451564e2bf1e22ef1379be8bdad7364e48f))


### Features

* **ActionSet:** Include containerWidth prop inside the story ([#3351](https://github.com/carbon-design-system/ibm-products/issues/3351)) ([c90e85a](https://github.com/carbon-design-system/ibm-products/commit/c90e85a5215cbab005e9378ac546e76727044069))
* allows users to pass a renderLabel to the Datagrid filter summary ([#3372](https://github.com/carbon-design-system/ibm-products/issues/3372)) ([d0bf1d7](https://github.com/carbon-design-system/ibm-products/commit/d0bf1d7bcd671c1cc47a342db4140f42a955382a))
* **CreateTearsheet:** add optional `onPrevious` handler to step ([#3350](https://github.com/carbon-design-system/ibm-products/issues/3350)) ([873be57](https://github.com/carbon-design-system/ibm-products/commit/873be579a83893b82c5774e36b353c868e507d1e))





## [2.6.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.6.0...@carbon/ibm-products@2.6.1) (2023-08-15)


### Bug Fixes

* **Datagrid:** add support for other extensions with customizable columns (v2) ([#3344](https://github.com/carbon-design-system/ibm-products/issues/3344)) ([09aa0d1](https://github.com/carbon-design-system/ibm-products/commit/09aa0d13e85b158c37628df1f8a86ab27e51b567))





# [2.6.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.5.0...@carbon/ibm-products@2.6.0) (2023-08-08)


### Bug Fixes

* **CreateTearsheet:** use new onChange callback signature in v11 ([#3339](https://github.com/carbon-design-system/ibm-products/issues/3339)) ([f90a201](https://github.com/carbon-design-system/ibm-products/commit/f90a20107f653a3f5af4dc67977252e4ac36793a))


### Features

* **CreateTearsheet:** allow node to be passed to description prop ([#3349](https://github.com/carbon-design-system/ibm-products/issues/3349)) ([f72e3f2](https://github.com/carbon-design-system/ibm-products/commit/f72e3f24128517316811bebb1cb502c87196b058))





# [2.5.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.4.1...@carbon/ibm-products@2.5.0) (2023-08-01)


### Bug Fixes

* **Datagrid:** add batch actions to clickable row with panel story ([#3228](https://github.com/carbon-design-system/ibm-products/issues/3228)) ([3536400](https://github.com/carbon-design-system/ibm-products/commit/3536400fa04eeaa575e3d64ee91edde7212ef5d5))
* **Datagrid:** address row action disable state logic ([#3335](https://github.com/carbon-design-system/ibm-products/issues/3335)) ([435ada8](https://github.com/carbon-design-system/ibm-products/commit/435ada8d54fca0f32e2f3b765e7ce459b4c6c530))
* **Datagrid:** remove sort styles hook not in use ([#3322](https://github.com/carbon-design-system/ibm-products/issues/3322)) ([59c9541](https://github.com/carbon-design-system/ibm-products/commit/59c9541dbf56e64383e53000049eb38f0d26d8ce))


### Features

* **NotificationsPanel:** include target attribute inside the link ([#3326](https://github.com/carbon-design-system/ibm-products/issues/3326)) ([bbade1b](https://github.com/carbon-design-system/ibm-products/commit/bbade1b293eda7582b8ff47fe8ef03532f733561))





## [2.4.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.4.0...@carbon/ibm-products@2.4.1) (2023-07-25)


### Bug Fixes

* **Datagrid:** clickable row stories ([#3224](https://github.com/carbon-design-system/ibm-products/issues/3224)) ([50dfe36](https://github.com/carbon-design-system/ibm-products/commit/50dfe369afbae0742868ff71b8ed00978b9afdd6))
* **editable card:** buttons added on CardHeader ([#3110](https://github.com/carbon-design-system/ibm-products/issues/3110)) ([1173f08](https://github.com/carbon-design-system/ibm-products/commit/1173f0853f30cc5c18e418af26d5d90d69fa13fd))
* **TearSheet:** wide button 2xl size ([#3222](https://github.com/carbon-design-system/ibm-products/issues/3222)) ([c72462f](https://github.com/carbon-design-system/ibm-products/commit/c72462ff35bf4d7b1de308041213924d77731f78))





# [2.4.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.3.2...@carbon/ibm-products@2.4.0) (2023-07-18)


### Bug Fixes

* **Datagrid:** Invalid prop value was passed through table toolbar search component ([#3142](https://github.com/carbon-design-system/ibm-products/issues/3142)) ([15ab7c4](https://github.com/carbon-design-system/ibm-products/commit/15ab7c4dd06c775641e5baf2145ce23906bc710a))
* update to Carbon 11 compatible versions to latest ([#3198](https://github.com/carbon-design-system/ibm-products/issues/3198)) ([c18c206](https://github.com/carbon-design-system/ibm-products/commit/c18c206525b22446c4ceb895e6eefabb0c7c2483))


### Features

* **FilterSummary:** adds custom label render and DisplayBox ([#3168](https://github.com/carbon-design-system/ibm-products/issues/3168)) ([d973b98](https://github.com/carbon-design-system/ibm-products/commit/d973b9842f54aca25a4933dacfb080e48c05870d))





## [2.3.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.3.1...@carbon/ibm-products@2.3.2) (2023-07-11)


### Bug Fixes

* a11y issues with some forms  ([#3179](https://github.com/carbon-design-system/ibm-products/issues/3179)) ([70620c8](https://github.com/carbon-design-system/ibm-products/commit/70620c8ff06268a07df67b3426897f05110a0326))
* resize objserver infinite perspective issue ([#3176](https://github.com/carbon-design-system/ibm-products/issues/3176)) ([9b789e3](https://github.com/carbon-design-system/ibm-products/commit/9b789e3a0025e668afa45de52af93cd185bcdebd))





## [2.3.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.3.0...@carbon/ibm-products@2.3.1) (2023-06-29)

**Note:** Version bump only for package @carbon/ibm-products





# [2.3.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.2.0...@carbon/ibm-products@2.3.0) (2023-06-27)


### Features

* **Datagrid:** supply full row data in batch actions onClick callback ([#3147](https://github.com/carbon-design-system/ibm-products/issues/3147)) ([e3ec063](https://github.com/carbon-design-system/ibm-products/commit/e3ec063b42c64805f3c8ea1070fe32dcc9e25f3c))





# [2.2.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.1.3...@carbon/ibm-products@2.2.0) (2023-06-22)


### Bug Fixes

* **Datagrid:** editable cell icon rerender fix ([#3141](https://github.com/carbon-design-system/ibm-products/issues/3141)) ([f2da565](https://github.com/carbon-design-system/ibm-products/commit/f2da565a93475cab563bd4f4f7a4e6b98068f623))
* update type and theme tokens ([#3144](https://github.com/carbon-design-system/ibm-products/issues/3144)) ([36a0615](https://github.com/carbon-design-system/ibm-products/commit/36a061543213748633227ce75ea1441e1edaca7d))


### Features

* **datagrid:** exports FilterContext ([#3067](https://github.com/carbon-design-system/ibm-products/issues/3067)) ([31d0989](https://github.com/carbon-design-system/ibm-products/commit/31d0989311308f743f097e1e853452582bd1a1b1))





## [2.1.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.1.2...@carbon/ibm-products@2.1.3) (2023-06-20)


### Bug Fixes

* **Datagrid:** address `saveCellData` loop, crashes Datagrid editable cell stories ([#3136](https://github.com/carbon-design-system/ibm-products/issues/3136)) ([485d07b](https://github.com/carbon-design-system/ibm-products/commit/485d07b4f4f700ff588b82b2957f952e6c089609))
* **Datagrid:** use `selectedRowIds` to set selected rows ([#3123](https://github.com/carbon-design-system/ibm-products/issues/3123)) ([426b8b4](https://github.com/carbon-design-system/ibm-products/commit/426b8b4764e21e822d62c51fe1028cbec40df3d1))
* update to Carbon 11 compatible versions to latest ([#3137](https://github.com/carbon-design-system/ibm-products/issues/3137)) ([1709fc5](https://github.com/carbon-design-system/ibm-products/commit/1709fc5455ab9ccf84345004ac8de075b1ff29b5))





## [2.1.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.1.1...@carbon/ibm-products@2.1.2) (2023-06-13)


### Bug Fixes

* reset import modal state on close ([#3108](https://github.com/carbon-design-system/ibm-products/issues/3108)) ([4172dbc](https://github.com/carbon-design-system/ibm-products/commit/4172dbc6c2cc4ee42a4159789412d342f1516709))
* **tearsheet:** layer removed from body ([#3051](https://github.com/carbon-design-system/ibm-products/issues/3051)) ([db975f4](https://github.com/carbon-design-system/ibm-products/commit/db975f458e9b7221eee006ad5530c88216000b7e))





## [2.1.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.1.0...@carbon/ibm-products@2.1.1) (2023-06-05)


### Bug Fixes

* Add select aria updates ([#3054](https://github.com/carbon-design-system/ibm-products/issues/3054)) ([9b11343](https://github.com/carbon-design-system/ibm-products/commit/9b1134326b8ac165a36be5b80c8b7c0ee88cfc8f))
* check for window before accessing ([#3059](https://github.com/carbon-design-system/ibm-products/issues/3059)) ([1d64ff4](https://github.com/carbon-design-system/ibm-products/commit/1d64ff45d8aa0b5bf7e31cf7986e6d1ce9008231))
* **Datagrid:** address `ButtonMenu` style issues in batch action toolbar ([#3066](https://github.com/carbon-design-system/ibm-products/issues/3066)) ([d5ff3dd](https://github.com/carbon-design-system/ibm-products/commit/d5ff3dd931a811617872ada68220d41ae93d83c7))
* **DataGrid:** header misalignment when modal open ([#3056](https://github.com/carbon-design-system/ibm-products/issues/3056)) ([07b0140](https://github.com/carbon-design-system/ibm-products/commit/07b01409c98dbe03d3c6ed67653641d2ad0542c0))
* resize observer loops ([#3034](https://github.com/carbon-design-system/ibm-products/issues/3034)) ([59ad83b](https://github.com/carbon-design-system/ibm-products/commit/59ad83b5069c6862787c8785327cee39aeb0d86b))
* update to Carbon 11 compatible versions to latest ([#3062](https://github.com/carbon-design-system/ibm-products/issues/3062)) ([b93b07d](https://github.com/carbon-design-system/ibm-products/commit/b93b07da828f7a8e95559572090c886488badce0))





# [2.1.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.1...@carbon/ibm-products@2.1.0) (2023-05-30)


### Bug Fixes

* **NotificationPanel:** improve responsiveness ([#3041](https://github.com/carbon-design-system/ibm-products/issues/3041)) ([5b3051b](https://github.com/carbon-design-system/ibm-products/commit/5b3051ba45fe0166ea02f7973b92574f55017f43))
* **UserProfileImage:** tooltip position ([#3044](https://github.com/carbon-design-system/ibm-products/issues/3044)) ([e1476c6](https://github.com/carbon-design-system/ibm-products/commit/e1476c63900c28db685e0df9b7ee53c072a7bf6f))


### Features

* **datagrid:** setAllFilters can now be used externally ([#3024](https://github.com/carbon-design-system/ibm-products/issues/3024)) ([#3042](https://github.com/carbon-design-system/ibm-products/issues/3042)) ([fc9af2a](https://github.com/carbon-design-system/ibm-products/commit/fc9af2a67b1de33f8e941bea6353a67542c35af6))





## [2.0.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.39...@carbon/ibm-products@2.0.1) (2023-05-17)

**Note:** Version bump only for package @carbon/ibm-products





# [2.0.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.39...@carbon/ibm-products@2.0.0) (2023-05-17)

**Note:** Version bump only for package @carbon/ibm-products





# [2.0.0-rc.39](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.35...@carbon/ibm-products@2.0.0-rc.39) (2023-05-17)


### Bug Fixes

* correct release package versions ([#3021](https://github.com/carbon-design-system/ibm-products/issues/3021)) ([b6a6e26](https://github.com/carbon-design-system/ibm-products/commit/b6a6e262dfdeac6c8c8497609058298d818223c0))





# [2.0.0-rc.35](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.29...@carbon/ibm-products@2.0.0-rc.35) (2023-05-17)


### Bug Fixes

* about modal node for footer ([#2982](https://github.com/carbon-design-system/ibm-products/issues/2982)) ([11c2000](https://github.com/carbon-design-system/ibm-products/commit/11c200099eea07c23e69bdef2439d140dd61d37a))
* add columns in edit tearsheet grid ([#2929](https://github.com/carbon-design-system/ibm-products/issues/2929)) ([5b42621](https://github.com/carbon-design-system/ibm-products/commit/5b42621745698c3f2077bf3f0dffa88b774944d5))
* add lodash dependency ([51b8838](https://github.com/carbon-design-system/ibm-products/commit/51b883888829bb516dc8ecffec672095636c24d4))
* carbon v11 examples ([#2973](https://github.com/carbon-design-system/ibm-products/issues/2973)) ([836e68c](https://github.com/carbon-design-system/ibm-products/commit/836e68c5c9e806d4a5f7920f8787b6dd4c7ffa60))
* example gallery v2 fix ([#2999](https://github.com/carbon-design-system/ibm-products/issues/2999)) ([745e732](https://github.com/carbon-design-system/ibm-products/commit/745e7323146775da5dabf1237daf85d8ca656777))
* give empty state illustration position ([#2964](https://github.com/carbon-design-system/ibm-products/issues/2964)) ([0b48d07](https://github.com/carbon-design-system/ibm-products/commit/0b48d076e34f5a9761b988a15ad1ae08a19d5055))
* icon v11 imports ([fa3ed7d](https://github.com/carbon-design-system/ibm-products/commit/fa3ed7dd2ad717ce6ac0fce6751ec7795b97d8ab))
* release yml incorrect ([#3019](https://github.com/carbon-design-system/ibm-products/issues/3019)) ([0b19df6](https://github.com/carbon-design-system/ibm-products/commit/0b19df600601829ad531088dd92997c6dd9a1707))
* removes overflow hidden ([eaed7ae](https://github.com/carbon-design-system/ibm-products/commit/eaed7ae11925ae085bcfefed6c5b2a787ef4740a))
* repository links following rename ([#3004](https://github.com/carbon-design-system/ibm-products/issues/3004)) ([7940275](https://github.com/carbon-design-system/ibm-products/commit/79402756abb225f27312488d87c74ba1ba2fc72c))
* snapshot ([830decf](https://github.com/carbon-design-system/ibm-products/commit/830decf5ec4c1fec319a6a1f830ed81e6eb41483))
* various add select migration style fixes ([b372fd1](https://github.com/carbon-design-system/ibm-products/commit/b372fd159f3ec86c8b0bcae2f544687fa592cfe8))


### Features

* add second gallery ([#3010](https://github.com/carbon-design-system/ibm-products/issues/3010)) ([8dee2d6](https://github.com/carbon-design-system/ibm-products/commit/8dee2d64f8f11a24590c31d2d3dfe099fabb4fc4))
* **datagrid:** adds new stories to filter panel ([8b7d036](https://github.com/carbon-design-system/ibm-products/commit/8b7d03646e9c6ca659d19236dd978deab699f43d))
* **datagrid:** adds table of contents ([#2971](https://github.com/carbon-design-system/ibm-products/issues/2971)) ([408eff1](https://github.com/carbon-design-system/ibm-products/commit/408eff1fd2324d86bc5d3343fc868f3d58b6053c))
* **datagrid:** starting to move story files ([99d27d1](https://github.com/carbon-design-system/ibm-products/commit/99d27d176e99d3c3f8c947cbb4e06c3d54795927))





# [2.0.0-rc.38](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.29...@carbon/ibm-products@2.0.0-rc.38) (2023-05-17)


### Bug Fixes

* about modal node for footer ([#2982](https://github.com/carbon-design-system/ibm-products/issues/2982)) ([11c2000](https://github.com/carbon-design-system/ibm-products/commit/11c200099eea07c23e69bdef2439d140dd61d37a))
* add columns in edit tearsheet grid ([#2929](https://github.com/carbon-design-system/ibm-products/issues/2929)) ([5b42621](https://github.com/carbon-design-system/ibm-products/commit/5b42621745698c3f2077bf3f0dffa88b774944d5))
* add lodash dependency ([51b8838](https://github.com/carbon-design-system/ibm-products/commit/51b883888829bb516dc8ecffec672095636c24d4))
* carbon v11 examples ([#2973](https://github.com/carbon-design-system/ibm-products/issues/2973)) ([836e68c](https://github.com/carbon-design-system/ibm-products/commit/836e68c5c9e806d4a5f7920f8787b6dd4c7ffa60))
* example gallery v2 fix ([#2999](https://github.com/carbon-design-system/ibm-products/issues/2999)) ([745e732](https://github.com/carbon-design-system/ibm-products/commit/745e7323146775da5dabf1237daf85d8ca656777))
* get publish working ([eebfb2f](https://github.com/carbon-design-system/ibm-products/commit/eebfb2f048d3af058cbcfb9a23789dfbaaf69e48))
* give empty state illustration position ([#2964](https://github.com/carbon-design-system/ibm-products/issues/2964)) ([0b48d07](https://github.com/carbon-design-system/ibm-products/commit/0b48d076e34f5a9761b988a15ad1ae08a19d5055))
* icon v11 imports ([fa3ed7d](https://github.com/carbon-design-system/ibm-products/commit/fa3ed7dd2ad717ce6ac0fce6751ec7795b97d8ab))
* removes overflow hidden ([eaed7ae](https://github.com/carbon-design-system/ibm-products/commit/eaed7ae11925ae085bcfefed6c5b2a787ef4740a))
* repository links following rename ([#3004](https://github.com/carbon-design-system/ibm-products/issues/3004)) ([7940275](https://github.com/carbon-design-system/ibm-products/commit/79402756abb225f27312488d87c74ba1ba2fc72c))
* snapshot ([830decf](https://github.com/carbon-design-system/ibm-products/commit/830decf5ec4c1fec319a6a1f830ed81e6eb41483))
* various add select migration style fixes ([b372fd1](https://github.com/carbon-design-system/ibm-products/commit/b372fd159f3ec86c8b0bcae2f544687fa592cfe8))


### Features

* add second gallery ([#3010](https://github.com/carbon-design-system/ibm-products/issues/3010)) ([8dee2d6](https://github.com/carbon-design-system/ibm-products/commit/8dee2d64f8f11a24590c31d2d3dfe099fabb4fc4))
* **datagrid:** adds new stories to filter panel ([8b7d036](https://github.com/carbon-design-system/ibm-products/commit/8b7d03646e9c6ca659d19236dd978deab699f43d))
* **datagrid:** adds table of contents ([#2971](https://github.com/carbon-design-system/ibm-products/issues/2971)) ([408eff1](https://github.com/carbon-design-system/ibm-products/commit/408eff1fd2324d86bc5d3343fc868f3d58b6053c))
* **datagrid:** starting to move story files ([99d27d1](https://github.com/carbon-design-system/ibm-products/commit/99d27d176e99d3c3f8c947cbb4e06c3d54795927))





# [2.0.0-rc.36](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.29...@carbon/ibm-products@2.0.0-rc.36) (2023-05-17)


### Bug Fixes

* about modal node for footer ([#2982](https://github.com/carbon-design-system/ibm-products/issues/2982)) ([11c2000](https://github.com/carbon-design-system/ibm-products/commit/11c200099eea07c23e69bdef2439d140dd61d37a))
* add columns in edit tearsheet grid ([#2929](https://github.com/carbon-design-system/ibm-products/issues/2929)) ([5b42621](https://github.com/carbon-design-system/ibm-products/commit/5b42621745698c3f2077bf3f0dffa88b774944d5))
* add lodash dependency ([51b8838](https://github.com/carbon-design-system/ibm-products/commit/51b883888829bb516dc8ecffec672095636c24d4))
* carbon v11 examples ([#2973](https://github.com/carbon-design-system/ibm-products/issues/2973)) ([836e68c](https://github.com/carbon-design-system/ibm-products/commit/836e68c5c9e806d4a5f7920f8787b6dd4c7ffa60))
* example gallery v2 fix ([#2999](https://github.com/carbon-design-system/ibm-products/issues/2999)) ([745e732](https://github.com/carbon-design-system/ibm-products/commit/745e7323146775da5dabf1237daf85d8ca656777))
* get publish working ([eebfb2f](https://github.com/carbon-design-system/ibm-products/commit/eebfb2f048d3af058cbcfb9a23789dfbaaf69e48))
* give empty state illustration position ([#2964](https://github.com/carbon-design-system/ibm-products/issues/2964)) ([0b48d07](https://github.com/carbon-design-system/ibm-products/commit/0b48d076e34f5a9761b988a15ad1ae08a19d5055))
* icon v11 imports ([fa3ed7d](https://github.com/carbon-design-system/ibm-products/commit/fa3ed7dd2ad717ce6ac0fce6751ec7795b97d8ab))
* removes overflow hidden ([eaed7ae](https://github.com/carbon-design-system/ibm-products/commit/eaed7ae11925ae085bcfefed6c5b2a787ef4740a))
* repository links following rename ([#3004](https://github.com/carbon-design-system/ibm-products/issues/3004)) ([7940275](https://github.com/carbon-design-system/ibm-products/commit/79402756abb225f27312488d87c74ba1ba2fc72c))
* snapshot ([830decf](https://github.com/carbon-design-system/ibm-products/commit/830decf5ec4c1fec319a6a1f830ed81e6eb41483))
* various add select migration style fixes ([b372fd1](https://github.com/carbon-design-system/ibm-products/commit/b372fd159f3ec86c8b0bcae2f544687fa592cfe8))


### Features

* add second gallery ([#3010](https://github.com/carbon-design-system/ibm-products/issues/3010)) ([8dee2d6](https://github.com/carbon-design-system/ibm-products/commit/8dee2d64f8f11a24590c31d2d3dfe099fabb4fc4))
* **datagrid:** adds new stories to filter panel ([8b7d036](https://github.com/carbon-design-system/ibm-products/commit/8b7d03646e9c6ca659d19236dd978deab699f43d))
* **datagrid:** adds table of contents ([#2971](https://github.com/carbon-design-system/ibm-products/issues/2971)) ([408eff1](https://github.com/carbon-design-system/ibm-products/commit/408eff1fd2324d86bc5d3343fc868f3d58b6053c))
* **datagrid:** starting to move story files ([99d27d1](https://github.com/carbon-design-system/ibm-products/commit/99d27d176e99d3c3f8c947cbb4e06c3d54795927))





# [2.0.0-rc.35](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.29...@carbon/ibm-products@2.0.0-rc.35) (2023-05-17)


### Bug Fixes

* about modal node for footer ([#2982](https://github.com/carbon-design-system/ibm-products/issues/2982)) ([11c2000](https://github.com/carbon-design-system/ibm-products/commit/11c200099eea07c23e69bdef2439d140dd61d37a))
* add columns in edit tearsheet grid ([#2929](https://github.com/carbon-design-system/ibm-products/issues/2929)) ([5b42621](https://github.com/carbon-design-system/ibm-products/commit/5b42621745698c3f2077bf3f0dffa88b774944d5))
* add lodash dependency ([51b8838](https://github.com/carbon-design-system/ibm-products/commit/51b883888829bb516dc8ecffec672095636c24d4))
* carbon v11 examples ([#2973](https://github.com/carbon-design-system/ibm-products/issues/2973)) ([836e68c](https://github.com/carbon-design-system/ibm-products/commit/836e68c5c9e806d4a5f7920f8787b6dd4c7ffa60))
* example gallery v2 fix ([#2999](https://github.com/carbon-design-system/ibm-products/issues/2999)) ([745e732](https://github.com/carbon-design-system/ibm-products/commit/745e7323146775da5dabf1237daf85d8ca656777))
* get publish working ([eebfb2f](https://github.com/carbon-design-system/ibm-products/commit/eebfb2f048d3af058cbcfb9a23789dfbaaf69e48))
* give empty state illustration position ([#2964](https://github.com/carbon-design-system/ibm-products/issues/2964)) ([0b48d07](https://github.com/carbon-design-system/ibm-products/commit/0b48d076e34f5a9761b988a15ad1ae08a19d5055))
* icon v11 imports ([fa3ed7d](https://github.com/carbon-design-system/ibm-products/commit/fa3ed7dd2ad717ce6ac0fce6751ec7795b97d8ab))
* removes overflow hidden ([eaed7ae](https://github.com/carbon-design-system/ibm-products/commit/eaed7ae11925ae085bcfefed6c5b2a787ef4740a))
* repository links following rename ([#3004](https://github.com/carbon-design-system/ibm-products/issues/3004)) ([7940275](https://github.com/carbon-design-system/ibm-products/commit/79402756abb225f27312488d87c74ba1ba2fc72c))
* snapshot ([830decf](https://github.com/carbon-design-system/ibm-products/commit/830decf5ec4c1fec319a6a1f830ed81e6eb41483))
* various add select migration style fixes ([b372fd1](https://github.com/carbon-design-system/ibm-products/commit/b372fd159f3ec86c8b0bcae2f544687fa592cfe8))


### Features

* add second gallery ([#3010](https://github.com/carbon-design-system/ibm-products/issues/3010)) ([8dee2d6](https://github.com/carbon-design-system/ibm-products/commit/8dee2d64f8f11a24590c31d2d3dfe099fabb4fc4))
* **datagrid:** adds new stories to filter panel ([8b7d036](https://github.com/carbon-design-system/ibm-products/commit/8b7d03646e9c6ca659d19236dd978deab699f43d))
* **datagrid:** adds table of contents ([#2971](https://github.com/carbon-design-system/ibm-products/issues/2971)) ([408eff1](https://github.com/carbon-design-system/ibm-products/commit/408eff1fd2324d86bc5d3343fc868f3d58b6053c))
* **datagrid:** starting to move story files ([99d27d1](https://github.com/carbon-design-system/ibm-products/commit/99d27d176e99d3c3f8c947cbb4e06c3d54795927))





# [2.0.0-rc.32](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.29...@carbon/ibm-products@2.0.0-rc.32) (2023-05-17)


### Bug Fixes

* about modal node for footer ([#2982](https://github.com/carbon-design-system/ibm-products/issues/2982)) ([11c2000](https://github.com/carbon-design-system/ibm-products/commit/11c200099eea07c23e69bdef2439d140dd61d37a))
* add columns in edit tearsheet grid ([#2929](https://github.com/carbon-design-system/ibm-products/issues/2929)) ([5b42621](https://github.com/carbon-design-system/ibm-products/commit/5b42621745698c3f2077bf3f0dffa88b774944d5))
* add lodash dependency ([51b8838](https://github.com/carbon-design-system/ibm-products/commit/51b883888829bb516dc8ecffec672095636c24d4))
* carbon v11 examples ([#2973](https://github.com/carbon-design-system/ibm-products/issues/2973)) ([836e68c](https://github.com/carbon-design-system/ibm-products/commit/836e68c5c9e806d4a5f7920f8787b6dd4c7ffa60))
* example gallery v2 fix ([#2999](https://github.com/carbon-design-system/ibm-products/issues/2999)) ([745e732](https://github.com/carbon-design-system/ibm-products/commit/745e7323146775da5dabf1237daf85d8ca656777))
* give empty state illustration position ([#2964](https://github.com/carbon-design-system/ibm-products/issues/2964)) ([0b48d07](https://github.com/carbon-design-system/ibm-products/commit/0b48d076e34f5a9761b988a15ad1ae08a19d5055))
* icon v11 imports ([fa3ed7d](https://github.com/carbon-design-system/ibm-products/commit/fa3ed7dd2ad717ce6ac0fce6751ec7795b97d8ab))
* removes overflow hidden ([eaed7ae](https://github.com/carbon-design-system/ibm-products/commit/eaed7ae11925ae085bcfefed6c5b2a787ef4740a))
* repository links following rename ([#3004](https://github.com/carbon-design-system/ibm-products/issues/3004)) ([7940275](https://github.com/carbon-design-system/ibm-products/commit/79402756abb225f27312488d87c74ba1ba2fc72c))
* snapshot ([830decf](https://github.com/carbon-design-system/ibm-products/commit/830decf5ec4c1fec319a6a1f830ed81e6eb41483))
* various add select migration style fixes ([b372fd1](https://github.com/carbon-design-system/ibm-products/commit/b372fd159f3ec86c8b0bcae2f544687fa592cfe8))


### Features

* add second gallery ([#3010](https://github.com/carbon-design-system/ibm-products/issues/3010)) ([8dee2d6](https://github.com/carbon-design-system/ibm-products/commit/8dee2d64f8f11a24590c31d2d3dfe099fabb4fc4))
* **datagrid:** adds new stories to filter panel ([8b7d036](https://github.com/carbon-design-system/ibm-products/commit/8b7d03646e9c6ca659d19236dd978deab699f43d))
* **datagrid:** adds table of contents ([#2971](https://github.com/carbon-design-system/ibm-products/issues/2971)) ([408eff1](https://github.com/carbon-design-system/ibm-products/commit/408eff1fd2324d86bc5d3343fc868f3d58b6053c))
* **datagrid:** starting to move story files ([99d27d1](https://github.com/carbon-design-system/ibm-products/commit/99d27d176e99d3c3f8c947cbb4e06c3d54795927))





# [2.0.0-rc.31](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.29...@carbon/ibm-products@2.0.0-rc.31) (2023-05-17)


### Bug Fixes

* about modal node for footer ([#2982](https://github.com/carbon-design-system/ibm-products/issues/2982)) ([11c2000](https://github.com/carbon-design-system/ibm-products/commit/11c200099eea07c23e69bdef2439d140dd61d37a))
* add columns in edit tearsheet grid ([#2929](https://github.com/carbon-design-system/ibm-products/issues/2929)) ([5b42621](https://github.com/carbon-design-system/ibm-products/commit/5b42621745698c3f2077bf3f0dffa88b774944d5))
* add lodash dependency ([51b8838](https://github.com/carbon-design-system/ibm-products/commit/51b883888829bb516dc8ecffec672095636c24d4))
* carbon v11 examples ([#2973](https://github.com/carbon-design-system/ibm-products/issues/2973)) ([836e68c](https://github.com/carbon-design-system/ibm-products/commit/836e68c5c9e806d4a5f7920f8787b6dd4c7ffa60))
* example gallery v2 fix ([#2999](https://github.com/carbon-design-system/ibm-products/issues/2999)) ([745e732](https://github.com/carbon-design-system/ibm-products/commit/745e7323146775da5dabf1237daf85d8ca656777))
* give empty state illustration position ([#2964](https://github.com/carbon-design-system/ibm-products/issues/2964)) ([0b48d07](https://github.com/carbon-design-system/ibm-products/commit/0b48d076e34f5a9761b988a15ad1ae08a19d5055))
* icon v11 imports ([fa3ed7d](https://github.com/carbon-design-system/ibm-products/commit/fa3ed7dd2ad717ce6ac0fce6751ec7795b97d8ab))
* removes overflow hidden ([eaed7ae](https://github.com/carbon-design-system/ibm-products/commit/eaed7ae11925ae085bcfefed6c5b2a787ef4740a))
* repository links following rename ([#3004](https://github.com/carbon-design-system/ibm-products/issues/3004)) ([7940275](https://github.com/carbon-design-system/ibm-products/commit/79402756abb225f27312488d87c74ba1ba2fc72c))
* snapshot ([830decf](https://github.com/carbon-design-system/ibm-products/commit/830decf5ec4c1fec319a6a1f830ed81e6eb41483))
* various add select migration style fixes ([b372fd1](https://github.com/carbon-design-system/ibm-products/commit/b372fd159f3ec86c8b0bcae2f544687fa592cfe8))


### Features

* add second gallery ([#3010](https://github.com/carbon-design-system/ibm-products/issues/3010)) ([8dee2d6](https://github.com/carbon-design-system/ibm-products/commit/8dee2d64f8f11a24590c31d2d3dfe099fabb4fc4))
* **datagrid:** adds new stories to filter panel ([8b7d036](https://github.com/carbon-design-system/ibm-products/commit/8b7d03646e9c6ca659d19236dd978deab699f43d))
* **datagrid:** adds table of contents ([#2971](https://github.com/carbon-design-system/ibm-products/issues/2971)) ([408eff1](https://github.com/carbon-design-system/ibm-products/commit/408eff1fd2324d86bc5d3343fc868f3d58b6053c))
* **datagrid:** starting to move story files ([99d27d1](https://github.com/carbon-design-system/ibm-products/commit/99d27d176e99d3c3f8c947cbb4e06c3d54795927))





# [2.0.0-rc.30](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.29...@carbon/ibm-products@2.0.0-rc.30) (2023-05-17)


### Bug Fixes

* about modal node for footer ([#2982](https://github.com/carbon-design-system/ibm-products/issues/2982)) ([11c2000](https://github.com/carbon-design-system/ibm-products/commit/11c200099eea07c23e69bdef2439d140dd61d37a))
* add columns in edit tearsheet grid ([#2929](https://github.com/carbon-design-system/ibm-products/issues/2929)) ([5b42621](https://github.com/carbon-design-system/ibm-products/commit/5b42621745698c3f2077bf3f0dffa88b774944d5))
* add lodash dependency ([51b8838](https://github.com/carbon-design-system/ibm-products/commit/51b883888829bb516dc8ecffec672095636c24d4))
* carbon v11 examples ([#2973](https://github.com/carbon-design-system/ibm-products/issues/2973)) ([836e68c](https://github.com/carbon-design-system/ibm-products/commit/836e68c5c9e806d4a5f7920f8787b6dd4c7ffa60))
* example gallery v2 fix ([#2999](https://github.com/carbon-design-system/ibm-products/issues/2999)) ([745e732](https://github.com/carbon-design-system/ibm-products/commit/745e7323146775da5dabf1237daf85d8ca656777))
* give empty state illustration position ([#2964](https://github.com/carbon-design-system/ibm-products/issues/2964)) ([0b48d07](https://github.com/carbon-design-system/ibm-products/commit/0b48d076e34f5a9761b988a15ad1ae08a19d5055))
* icon v11 imports ([fa3ed7d](https://github.com/carbon-design-system/ibm-products/commit/fa3ed7dd2ad717ce6ac0fce6751ec7795b97d8ab))
* removes overflow hidden ([eaed7ae](https://github.com/carbon-design-system/ibm-products/commit/eaed7ae11925ae085bcfefed6c5b2a787ef4740a))
* repository links following rename ([#3004](https://github.com/carbon-design-system/ibm-products/issues/3004)) ([7940275](https://github.com/carbon-design-system/ibm-products/commit/79402756abb225f27312488d87c74ba1ba2fc72c))
* snapshot ([830decf](https://github.com/carbon-design-system/ibm-products/commit/830decf5ec4c1fec319a6a1f830ed81e6eb41483))
* various add select migration style fixes ([b372fd1](https://github.com/carbon-design-system/ibm-products/commit/b372fd159f3ec86c8b0bcae2f544687fa592cfe8))


### Features

* add second gallery ([#3010](https://github.com/carbon-design-system/ibm-products/issues/3010)) ([8dee2d6](https://github.com/carbon-design-system/ibm-products/commit/8dee2d64f8f11a24590c31d2d3dfe099fabb4fc4))
* **datagrid:** adds new stories to filter panel ([8b7d036](https://github.com/carbon-design-system/ibm-products/commit/8b7d03646e9c6ca659d19236dd978deab699f43d))
* **datagrid:** adds table of contents ([#2971](https://github.com/carbon-design-system/ibm-products/issues/2971)) ([408eff1](https://github.com/carbon-design-system/ibm-products/commit/408eff1fd2324d86bc5d3343fc868f3d58b6053c))
* **datagrid:** starting to move story files ([99d27d1](https://github.com/carbon-design-system/ibm-products/commit/99d27d176e99d3c3f8c947cbb4e06c3d54795927))





# [2.0.0-rc.29](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.28...@carbon/ibm-products@2.0.0-rc.29) (2023-05-09)


### Bug Fixes

* dataspreadsheet v11 migration fixes ([#2943](https://github.com/carbon-design-system/ibm-products/issues/2943)) ([75f57d5](https://github.com/carbon-design-system/ibm-products/commit/75f57d50ba0f639f53466cc4b39063c9142540c8))
* include selectorPrimaryFocus prop in tearsheet ([#2950](https://github.com/carbon-design-system/ibm-products/issues/2950)) ([b49a5ea](https://github.com/carbon-design-system/ibm-products/commit/b49a5ead4fdfc0d8e0c7b2b119a9c2d77028e65b))
* warnings in add and select tests ([#2908](https://github.com/carbon-design-system/ibm-products/issues/2908)) ([1c8b12b](https://github.com/carbon-design-system/ibm-products/commit/1c8b12b8c0c5a6b2180f5b9d9eb094d5d38575ee))


### Features

* **AboutModal:** update to match new guidelines v11 ([#2877](https://github.com/carbon-design-system/ibm-products/issues/2877)) ([e4aa7b7](https://github.com/carbon-design-system/ibm-products/commit/e4aa7b7cd4034d86dc53f95c555b96dd65fc7576))
* expose scss config file ([#2955](https://github.com/carbon-design-system/ibm-products/issues/2955)) ([c647ec7](https://github.com/carbon-design-system/ibm-products/commit/c647ec779721af577f6c8a9946618b127a5cb987))





# [2.0.0-rc.28](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.27...@carbon/ibm-products@2.0.0-rc.28) (2023-05-02)


### Features

* add ellipsis to inline-edit v2 pkg v2 ([#2932](https://github.com/carbon-design-system/ibm-products/issues/2932)) ([3c1abc8](https://github.com/carbon-design-system/ibm-products/commit/3c1abc825c248cc245b3748f7b87612cc5a4189b))
* **datagrid:** adds initial filters support ([#2938](https://github.com/carbon-design-system/ibm-products/issues/2938)) ([6a8d9bf](https://github.com/carbon-design-system/ibm-products/commit/6a8d9bfdf0432722c4ccf99e859c2679adb3075c))
* Rename inline edit to EditInPlace ([#2936](https://github.com/carbon-design-system/ibm-products/issues/2936)) ([20e2f78](https://github.com/carbon-design-system/ibm-products/commit/20e2f789f43af6aa9d8ece54d64a4e31dade791a))
* Use v2 inline edit in page header ([#2935](https://github.com/carbon-design-system/ibm-products/issues/2935)) ([0df55ab](https://github.com/carbon-design-system/ibm-products/commit/0df55ab3529cdf4a973db638e3f88f90db9a9264))





# [2.0.0-rc.27](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.26...@carbon/ibm-products@2.0.0-rc.27) (2023-04-25)


### Bug Fixes

* allow nodes to be passed to additional card props v11 ([#2886](https://github.com/carbon-design-system/ibm-products/issues/2886)) ([5c2639a](https://github.com/carbon-design-system/ibm-products/commit/5c2639a52e3b831316a113e52e8748e867c6370d))
* **card:** Add styles.test.js.snap ([3597da8](https://github.com/carbon-design-system/ibm-products/commit/3597da8e4d68071e61b599dc0557a2c38fde45f1))
* **card:** CI Lint updates ([64f225a](https://github.com/carbon-design-system/ibm-products/commit/64f225ab8f61cea0469641e4e616912d6c009d1e))
* **card:** CI Lint updates ([78034f0](https://github.com/carbon-design-system/ibm-products/commit/78034f07042098674b0cc57191b34478ae453ab2))
* **card:** Remove with action icon ([450025c](https://github.com/carbon-design-system/ibm-products/commit/450025c4fdd272b858a9c7d41d568950f20a59a0))
* **card:** update button requirements ([856e369](https://github.com/carbon-design-system/ibm-products/commit/856e369a3b643bc4721fc7cd123df14b70e9d228))
* **card:** update card design review ([#2763](https://github.com/carbon-design-system/ibm-products/issues/2763)) ([edab7e1](https://github.com/carbon-design-system/ibm-products/commit/edab7e1f834c4172a9aca5e0bf73819ebddb2685))
* **card:** Update style errors ([6dfbfc3](https://github.com/carbon-design-system/ibm-products/commit/6dfbfc3caacd822efb0da59778c76f3608ea37a0))
* **card:** Update tests ([8eb30e0](https://github.com/carbon-design-system/ibm-products/commit/8eb30e0443f0de9ea7045c3ce12eef13f4783e61))
* **Datagrid:** filtering number empty tag bug (v11) ([#2880](https://github.com/carbon-design-system/ibm-products/issues/2880)) ([b7ed43a](https://github.com/carbon-design-system/ibm-products/commit/b7ed43a8a52117db4a7436451ee15b8329a6674b))
* **Datagrid:** invalid aria role ([7ab6d49](https://github.com/carbon-design-system/ibm-products/commit/7ab6d499872b960fb789a0d5a7c69037ca464b30))
* **Datagrid:** removed explicit role from tbody ([8c10b54](https://github.com/carbon-design-system/ibm-products/commit/8c10b5450934681bff2457f82b21ac3f93dac4b1))
* styling issues found in 2830 ([#2890](https://github.com/carbon-design-system/ibm-products/issues/2890)) ([46ea160](https://github.com/carbon-design-system/ibm-products/commit/46ea1600dc11efc2b0ca06d9a2d730d1fee84fee))
* **TagSet:** remove tag radius in overflow ([#2897](https://github.com/carbon-design-system/ibm-products/issues/2897)) ([17cd5b5](https://github.com/carbon-design-system/ibm-products/commit/17cd5b5ede6dbdc1b8706983636c51c5379f508f))
* user profile image focus v11 ([#2874](https://github.com/carbon-design-system/ibm-products/issues/2874)) ([d7f4dfd](https://github.com/carbon-design-system/ibm-products/commit/d7f4dfda92481086b1e7993cc11af7dfe8ef91b7))


### Features

* **Datagrid:** add support for NotFound empty state ([efff037](https://github.com/carbon-design-system/ibm-products/commit/efff0373fd464af6f578cb16579cfd72d17aacb0))





# [2.0.0-rc.26](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.25...@carbon/ibm-products@2.0.0-rc.26) (2023-04-18)


### Bug Fixes

* Add select accessibility refactor v11 ([#2817](https://github.com/carbon-design-system/ibm-products/issues/2817)) ([c948b9f](https://github.com/carbon-design-system/ibm-products/commit/c948b9fcbfa60ec67961ca36c4466f0938d66fef))
* **Datagrid:** fix batch action logic to show one/two actions ([f64464f](https://github.com/carbon-design-system/ibm-products/commit/f64464f82476df81373560d61d5ae4ebd65c8350))
* **Datagrid:** fix how open state value is set ([#2865](https://github.com/carbon-design-system/ibm-products/issues/2865)) ([8789d88](https://github.com/carbon-design-system/ibm-products/commit/8789d88532db7550ec96f723a58f570ef0b8b734))
* **Datagrid:** refactor RowSizeDropdown to use ToggleTip ([e9037a9](https://github.com/carbon-design-system/ibm-products/commit/e9037a9d0b550fb50d9b5f0f270cc0e52cb58856))
* **Datagrid:** sortable and customizable columns work together now (v11) ([#2867](https://github.com/carbon-design-system/ibm-products/issues/2867)) ([58e0b4e](https://github.com/carbon-design-system/ibm-products/commit/58e0b4eb993da86d642f832f598fdacd08f9d3bd))
* Inline edit fixes package v2 ([#2872](https://github.com/carbon-design-system/ibm-products/issues/2872)) ([b8f5c2b](https://github.com/carbon-design-system/ibm-products/commit/b8f5c2bed0f5402342e530394ff082ebdf990826))
* **side-panel:** fix close button hover state ([#2835](https://github.com/carbon-design-system/ibm-products/issues/2835)) ([198c168](https://github.com/carbon-design-system/ibm-products/commit/198c1689b38b5fe6c14a71fdfaab689f860f7bfa))


### Features

* **Datagrid:** add option for auto sizing columns ([880ddbf](https://github.com/carbon-design-system/ibm-products/commit/880ddbfb8ed2aa982e746ccfd5e6396efe014757))
* possible feature flag usage ([#2748](https://github.com/carbon-design-system/ibm-products/issues/2748)) ([3d21f47](https://github.com/carbon-design-system/ibm-products/commit/3d21f4711d3bfe419ab8269c0ccbdb48d4ddb34a))
* **storybook:** new fn getSelectedCarbonTheme ([46f8ad9](https://github.com/carbon-design-system/ibm-products/commit/46f8ad9fba06104833b1729a2b1adc029e93a53d))





# [2.0.0-rc.25](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.24...@carbon/ibm-products@2.0.0-rc.25) (2023-04-11)


### Bug Fixes

* **create-full-page:** fix grid usage examples ([#2807](https://github.com/carbon-design-system/ibm-products/issues/2807)) ([6af2692](https://github.com/carbon-design-system/ibm-products/commit/6af26923fb3d8211c363ee130b965203133a362c))
* **create-full-page:** revert grid regression ([#2809](https://github.com/carbon-design-system/ibm-products/issues/2809)) ([379d98d](https://github.com/carbon-design-system/ibm-products/commit/379d98dd42e4d01b13a9d66957d9aebb04d25458))
* **create-tearsheet:** fix grid usage examples ([d2e61f1](https://github.com/carbon-design-system/ibm-products/commit/d2e61f1591cdb1e2cc50b6ece3c11f542b771f3f))
* **Datagrid:** add background to virtual body header, fix svg scoping ([1f75e9c](https://github.com/carbon-design-system/ibm-products/commit/1f75e9cd3f3dc059a3a509f63fdab22530371e76))
* **Datagrid:** address bug with keyboard interaction for inline edit ([72fa80a](https://github.com/carbon-design-system/ibm-products/commit/72fa80abb407d5aed90073a7ad193b067c883455))
* **Datagrid:** filter from Columns component to prevent ordering issues ([#2827](https://github.com/carbon-design-system/ibm-products/issues/2827)) ([74032e6](https://github.com/carbon-design-system/ibm-products/commit/74032e6fd81c5cbc636958c0a3a69b45a605bdc3))
* **empty-state:** update header spacing ([#2766](https://github.com/carbon-design-system/ibm-products/issues/2766)) ([#2781](https://github.com/carbon-design-system/ibm-products/issues/2781)) ([a1a8ef1](https://github.com/carbon-design-system/ibm-products/commit/a1a8ef15ac15c43f3f26676a5647c182e3c0039c))
* **side-panel:** fix icon button alignment ([#2814](https://github.com/carbon-design-system/ibm-products/issues/2814)) ([52f6fbc](https://github.com/carbon-design-system/ibm-products/commit/52f6fbc152b9b046e1e6b9b70545778110242cb8))
* **sidepanel toolbar:** tooltip truncate issue fix ([#2787](https://github.com/carbon-design-system/ibm-products/issues/2787)) ([e943f14](https://github.com/carbon-design-system/ibm-products/commit/e943f14a8af84ee8ebf7ef1de9262a5fcdc146d3))





# [2.0.0-rc.24](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.23...@carbon/ibm-products@2.0.0-rc.24) (2023-04-04)


### Bug Fixes

* add select keyboard accessibility adjustments ([#2709](https://github.com/carbon-design-system/ibm-products/issues/2709)) ([f35dabb](https://github.com/carbon-design-system/ibm-products/commit/f35dabb83d7fc640e44afc0d16681da52e06f67f))
* **create-full-page:** focus modal secondary button ([#2790](https://github.com/carbon-design-system/ibm-products/issues/2790)) ([76d92f6](https://github.com/carbon-design-system/ibm-products/commit/76d92f6141103e5d49f9f02166ef2423f1b0fe3c))
* **create-full-page:** update button sizes ([#2788](https://github.com/carbon-design-system/ibm-products/issues/2788)) ([85b8627](https://github.com/carbon-design-system/ibm-products/commit/85b86275cee3ed3f2d6edb7a0336ac33e26d5b01))
* **empty-state:** update type tokens ([#2779](https://github.com/carbon-design-system/ibm-products/issues/2779)) ([4147836](https://github.com/carbon-design-system/ibm-products/commit/41478361309d730e7f85ba1e67b1abb0eb604e36))
* **http-errors:** update type tokens ([#2780](https://github.com/carbon-design-system/ibm-products/issues/2780)) ([df903a3](https://github.com/carbon-design-system/ibm-products/commit/df903a30b3c8bba705670bec2b79222195477370))
* **tearsheet-shell:** use `Layer` for `wide` only ([#2789](https://github.com/carbon-design-system/ibm-products/issues/2789)) ([614d333](https://github.com/carbon-design-system/ibm-products/commit/614d333a4b4bad946a58e83329106f05ba481351))
* **tearsheet:** fix button sizes ([#2776](https://github.com/carbon-design-system/ibm-products/issues/2776)) ([38a01e0](https://github.com/carbon-design-system/ibm-products/commit/38a01e0b449a8efd29837f3ac2fe3816577c1940))
* **TearsheetNarrow:** increase description width to 80% ([#2795](https://github.com/carbon-design-system/ibm-products/issues/2795)) ([98180ff](https://github.com/carbon-design-system/ibm-products/commit/98180ff6a1135ce5694a73704f3105f44c37e970))





# [2.0.0-rc.23](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.22...@carbon/ibm-products@2.0.0-rc.23) (2023-03-28)


### Bug Fixes

* add `Layer` to `Tearsheet` ([#2762](https://github.com/carbon-design-system/ibm-products/issues/2762)) ([6c94cd7](https://github.com/carbon-design-system/ibm-products/commit/6c94cd7adbfdac7779d0bbe3b0f1456d3ff3ea03))
* datagrid inline edit focus background color v11 ([#2723](https://github.com/carbon-design-system/ibm-products/issues/2723)) ([b7e8736](https://github.com/carbon-design-system/ibm-products/commit/b7e8736772d0b426104b1214049cf7199d0cb501))
* **Datagrid:** hide columns with no header title ([#2746](https://github.com/carbon-design-system/ibm-products/issues/2746)) ([5e8b46b](https://github.com/carbon-design-system/ibm-products/commit/5e8b46bb8cf902b0390426d4b95fe3a697d88a91))
* use v1 inline edit in page header ([#2514](https://github.com/carbon-design-system/ibm-products/issues/2514)) ([069e042](https://github.com/carbon-design-system/ibm-products/commit/069e042e6003828482d83d83a4025cd3f190f30e))


### Features

* **SidePanel:** expose tooltip props ([#2757](https://github.com/carbon-design-system/ibm-products/issues/2757)) ([ba9ccdd](https://github.com/carbon-design-system/ibm-products/commit/ba9ccdd41e2c8624db715bc2659efd7ae0e385e3))





# [2.0.0-rc.22](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.21...@carbon/ibm-products@2.0.0-rc.22) (2023-03-21)


### Bug Fixes

* cardfooter button icon props update v11 ([#2730](https://github.com/carbon-design-system/ibm-products/issues/2730)) ([ef12540](https://github.com/carbon-design-system/ibm-products/commit/ef12540a95300366ff6e79dc81952be48562a8ad))
* **DataGrid:** design review horizontal scrolling (v11) ([#2659](https://github.com/carbon-design-system/ibm-products/issues/2659)) ([4b6784a](https://github.com/carbon-design-system/ibm-products/commit/4b6784a324a33234d717ed07f5ab8ac1289ac0cc))
* **nested rows:** fixed border color and align ([#2622](https://github.com/carbon-design-system/ibm-products/issues/2622)) ([00de831](https://github.com/carbon-design-system/ibm-products/commit/00de831f68e31820a3a671e8dcda2a4549c483e3))


### Features

* upgrade Carbon dependencies to latest compatible versions ([#2731](https://github.com/carbon-design-system/ibm-products/issues/2731)) ([d40545e](https://github.com/carbon-design-system/ibm-products/commit/d40545e16d81760334e9b0e1c33ae69f142addb1))





# [2.0.0-rc.21](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.20...@carbon/ibm-products@2.0.0-rc.21) (2023-03-14)


### Bug Fixes

* **DataGrid:** dense headeralignment fix ([#2712](https://github.com/carbon-design-system/ibm-products/issues/2712)) ([50040b4](https://github.com/carbon-design-system/ibm-products/commit/50040b48315b695254f28e16f617fd7fc2d67d52))
* **options-tile:** add safe area around toggle ([#2706](https://github.com/carbon-design-system/ibm-products/issues/2706)) ([16ca6f0](https://github.com/carbon-design-system/ibm-products/commit/16ca6f042eb5345019ca521b701f06c3c01c2a1c))


### Features

* **Datagrid:** Extracts Filtering logic into useFilters hook (v11) ([#2697](https://github.com/carbon-design-system/ibm-products/issues/2697)) ([b1256ee](https://github.com/carbon-design-system/ibm-products/commit/b1256ee15584a536b87ff6bef3242a13b22a6212))





# [2.0.0-rc.20](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.19...@carbon/ibm-products@2.0.0-rc.20) (2023-03-07)


### Bug Fixes

* **DataGrid:** sort column focus v11 ([#2674](https://github.com/carbon-design-system/ibm-products/issues/2674)) ([161190a](https://github.com/carbon-design-system/ibm-products/commit/161190a01ef717dcfe0b3a9c20a639c1509434d2))





# [2.0.0-rc.19](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.18...@carbon/ibm-products@2.0.0-rc.19) (2023-02-28)


### Bug Fixes

* **DataGrid:** any option in filter panel v11 ([#2701](https://github.com/carbon-design-system/ibm-products/issues/2701)) ([80b32f4](https://github.com/carbon-design-system/ibm-products/commit/80b32f45b267efa288fd6aac07eafce1a6702994))
* **Datagrid:** row height settings style fixes v11 ([#2691](https://github.com/carbon-design-system/ibm-products/issues/2691)) ([7b09fd0](https://github.com/carbon-design-system/ibm-products/commit/7b09fd0ef19c369b469360fabaa16aaa9a23993d))
* **options-tile:** use layer ([#2693](https://github.com/carbon-design-system/ibm-products/issues/2693)) ([8c111ca](https://github.com/carbon-design-system/ibm-products/commit/8c111ca23c497936a75a704a5933ade3bca94bc2))


### Features

* adds FilterPanel (v11) ([#2669](https://github.com/carbon-design-system/ibm-products/issues/2669)) ([5c0871c](https://github.com/carbon-design-system/ibm-products/commit/5c0871c3faf708294ce5384e7e0518424409abbf))
* **Datagrid:** Custom hook to handle `ActionSet` disabled state for `FilterPanel` & `FilterFlyout `(v11) ([#2688](https://github.com/carbon-design-system/ibm-products/issues/2688)) ([73646dd](https://github.com/carbon-design-system/ibm-products/commit/73646ddd9758caf6a15f24333c15ad69e4268808))





# [2.0.0-rc.18](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.17...@carbon/ibm-products@2.0.0-rc.18) (2023-02-21)


### Features

* **Datagrid:** show fixed columns in column customization v11 ([#2667](https://github.com/carbon-design-system/ibm-products/issues/2667)) ([b95d0d3](https://github.com/carbon-design-system/ibm-products/commit/b95d0d33a9acded60fd438a4c70d5695dc63a9e3))





# [2.0.0-rc.17](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.16...@carbon/ibm-products@2.0.0-rc.17) (2023-02-14)


### Bug Fixes

* **Datagrid:** column customization styles v11 ([#2661](https://github.com/carbon-design-system/ibm-products/issues/2661)) ([8800919](https://github.com/carbon-design-system/ibm-products/commit/880091921ef8afe9bfa830ccf45f17fa0a11afa5))


### Features

* imports all DataTable pieces from `@carbon/react` (v11) ([#2662](https://github.com/carbon-design-system/ibm-products/issues/2662)) ([91ca133](https://github.com/carbon-design-system/ibm-products/commit/91ca13368dc177e819ba5fe1a50d6495737e6fe7))





# [2.0.0-rc.16](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.15...@carbon/ibm-products@2.0.0-rc.16) (2023-02-07)


### Bug Fixes

* **Datagrid:** export useColumnCenterAlign v11 ([#2632](https://github.com/carbon-design-system/ibm-products/issues/2632)) ([a76f6ea](https://github.com/carbon-design-system/ibm-products/commit/a76f6eac2ab83abe4525fccb2916b070f407b76a))
* **DataGrid:** filter summary add heights options v11 ([#2643](https://github.com/carbon-design-system/ibm-products/issues/2643)) ([990e8c6](https://github.com/carbon-design-system/ibm-products/commit/990e8c6ded95cdc5109ea8a9fc4d0e0cd52818ad))
* **Tearsheet:** prevent description breaking ([#2646](https://github.com/carbon-design-system/ibm-products/issues/2646)) ([c04c4db](https://github.com/carbon-design-system/ibm-products/commit/c04c4dbc0ebea7e6c7f25fea6319067db70c7cac))


### Features

* exports filter flyout from datagridState ([#2639](https://github.com/carbon-design-system/ibm-products/issues/2639)) ([a576047](https://github.com/carbon-design-system/ibm-products/commit/a576047896dad647ce33e76fc3a852de66dc8246))





# [2.0.0-rc.15](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.14...@carbon/ibm-products@2.0.0-rc.15) (2023-01-31)


### Bug Fixes

* **DataGrid:** date input support typing date ([#2620](https://github.com/carbon-design-system/ibm-products/issues/2620)) ([29defff](https://github.com/carbon-design-system/ibm-products/commit/29defff3170fc849fbabd5cc72cc99fc9e23c52d))





# [2.0.0-rc.14](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.13...@carbon/ibm-products@2.0.0-rc.14) (2023-01-24)


### Bug Fixes

* **ButtonMenu:** menu size ([#2612](https://github.com/carbon-design-system/ibm-products/issues/2612)) ([24a7696](https://github.com/carbon-design-system/ibm-products/commit/24a769689da1877d5a5db6fe91854517928353a0))





# [2.0.0-rc.13](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.12...@carbon/ibm-products@2.0.0-rc.13) (2023-01-17)


### Bug Fixes

* **DataGrid:** date input to accept string date v11 ([#2593](https://github.com/carbon-design-system/ibm-products/issues/2593)) ([a344a4e](https://github.com/carbon-design-system/ibm-products/commit/a344a4e1c4a6a5431cbd1c308712e500071dd3a2))





# [2.0.0-rc.12](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.11...@carbon/ibm-products@2.0.0-rc.12) (2023-01-10)


### Bug Fixes

* **CreateTearsheet:** add firstFocusElement v11 ([#2552](https://github.com/carbon-design-system/ibm-products/issues/2552)) ([eed1a4b](https://github.com/carbon-design-system/ibm-products/commit/eed1a4b9356df62ccacf8b20af5d53c682a7ace9))
* **Datagrid:** ColumnCustomizationModal to Tearsheet Narrow - v11 ([#2587](https://github.com/carbon-design-system/ibm-products/issues/2587)) ([4da92c7](https://github.com/carbon-design-system/ibm-products/commit/4da92c7747bb73a36514f15cd1e6a9c7c996be31))
* **DataGrid:** customize column focus and search highlight - V11 ([#2519](https://github.com/carbon-design-system/ibm-products/issues/2519)) ([1fb7981](https://github.com/carbon-design-system/ibm-products/commit/1fb7981f89b0fc4d18ec8962b66e7f6afb29f997))
* exports useFiltering ([#2598](https://github.com/carbon-design-system/ibm-products/issues/2598)) ([b62e3ac](https://github.com/carbon-design-system/ibm-products/commit/b62e3acac5022c016073763556deef775cfbed6c))
* single add select fixes v11 ([#2601](https://github.com/carbon-design-system/ibm-products/issues/2601)) ([6610cd5](https://github.com/carbon-design-system/ibm-products/commit/6610cd5937221edb47ab7e2e3dfbf74047b06770))





# [2.0.0-rc.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.10...@carbon/ibm-products@2.0.0-rc.11) (2022-12-20)


### Bug Fixes

* **DataGrid:** empty state enhancement with action and link v11 ([#2562](https://github.com/carbon-design-system/ibm-products/issues/2562)) ([417dd1d](https://github.com/carbon-design-system/ibm-products/commit/417dd1d8fcd4b20180190b858938520d21902dec))
* **Datagrid:** resolve react hooks error from datagrid row ([#2575](https://github.com/carbon-design-system/ibm-products/issues/2575)) ([61ba3c5](https://github.com/carbon-design-system/ibm-products/commit/61ba3c57090568c895186234f6292e8e83c4b434))
* **DataGrid:** virtual scrollbar not visible v11 ([#2467](https://github.com/carbon-design-system/ibm-products/issues/2467)) ([fd00b33](https://github.com/carbon-design-system/ibm-products/commit/fd00b330fbeb3a87bb02df02d8941a90543aaad7))


### Features

* **Datagrid:** adds FilterFlyout and FilterSummary v11 ([#2525](https://github.com/carbon-design-system/ibm-products/issues/2525)) ([189489c](https://github.com/carbon-design-system/ibm-products/commit/189489c4a2021ce380a5fe63b6cf9caead52b332))
* **Datagrid:** makes seperate story file and adds docs for FilterFlyout (v11) ([#2570](https://github.com/carbon-design-system/ibm-products/issues/2570)) ([6aa356d](https://github.com/carbon-design-system/ibm-products/commit/6aa356d1a5cd0e18e623242611f4b7719b644aa2))





# [2.0.0-rc.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.9...@carbon/ibm-products@2.0.0-rc.10) (2022-12-13)


### Bug Fixes

* adds primaryButtonDisabled prop ([#2533](https://github.com/carbon-design-system/ibm-products/issues/2533)) ([924125b](https://github.com/carbon-design-system/ibm-products/commit/924125b11c677185e51b1c41c8ed40624e78c444))
* adds primaryButtonDisabled test to RemoveModal v11 ([#2535](https://github.com/carbon-design-system/ibm-products/issues/2535)) ([07ef4ce](https://github.com/carbon-design-system/ibm-products/commit/07ef4ce03067048f9729d126dda62105c6d789e0))
* card action bug fix v11 ([#2550](https://github.com/carbon-design-system/ibm-products/issues/2550)) ([bc7129c](https://github.com/carbon-design-system/ibm-products/commit/bc7129c9d4dfb2bca4ea55db4a53647dcda19025))
* **Datagrid:** update inline edit selection type to support string items (v11) ([#2547](https://github.com/carbon-design-system/ibm-products/issues/2547)) ([f4b236c](https://github.com/carbon-design-system/ibm-products/commit/f4b236c885d1524e6962f3618d9383688787f8e8))





# [2.0.0-rc.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.8...@carbon/ibm-products@2.0.0-rc.9) (2022-12-06)


### Bug Fixes

* **ActionBar:** add overflow menu item onClick ([#2520](https://github.com/carbon-design-system/ibm-products/issues/2520)) ([6f6311d](https://github.com/carbon-design-system/ibm-products/commit/6f6311db69c2a68b8b027054f5ef46640f16edd6))
* **create full page:** modal close issue fixed ([#2522](https://github.com/carbon-design-system/ibm-products/issues/2522)) ([a3a8ded](https://github.com/carbon-design-system/ibm-products/commit/a3a8deda35c7aa97ed864b33c371d921ff97a435))
* Multi add select review fixes v11 ([#2495](https://github.com/carbon-design-system/ibm-products/issues/2495)) ([db8e9dd](https://github.com/carbon-design-system/ibm-products/commit/db8e9dda30563041262fb6e801ead676f79bc40e))





# [2.0.0-rc.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.7...@carbon/ibm-products@2.0.0-rc.8) (2022-11-22)


### Bug Fixes

* **DataSpreadsheet:** prevent delete error from header ([#2477](https://github.com/carbon-design-system/ibm-products/issues/2477)) ([107666f](https://github.com/carbon-design-system/ibm-products/commit/107666fb61d723cda486c36ec6160bc9e6815cdc))
* **PageHeader:** Page header title truncation v11 ([#2479](https://github.com/carbon-design-system/ibm-products/issues/2479)) ([e8d2926](https://github.com/carbon-design-system/ibm-products/commit/e8d2926689114503e45e7db38fb94f85a5709506))


### Features

* inline edit v2 for v11 ([#2461](https://github.com/carbon-design-system/ibm-products/issues/2461)) ([3ea4363](https://github.com/carbon-design-system/ibm-products/commit/3ea43633fddb8e37f3a4d9df1cb79f02c4d1e849))





# [2.0.0-rc.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.6...@carbon/ibm-products@2.0.0-rc.7) (2022-11-15)


### Bug Fixes

* **ActionSet:** allow for non expressive buttons (v11) ([#2448](https://github.com/carbon-design-system/ibm-products/issues/2448)) ([e3fd916](https://github.com/carbon-design-system/ibm-products/commit/e3fd91659c32f1f94087984c501177966d701617))
* add select filter fix ([#2460](https://github.com/carbon-design-system/ibm-products/issues/2460)) ([2ba986b](https://github.com/carbon-design-system/ibm-products/commit/2ba986b21cae19556939de06c0997cb013ceb469))
* **Datagrid:** extend last nested row bottom border ([#2444](https://github.com/carbon-design-system/ibm-products/issues/2444)) ([362fd2d](https://github.com/carbon-design-system/ibm-products/commit/362fd2d03063d8e82d0c8c9fd6dc43945315f4e6))


### Features

* **OptionsTile:** add useControllableState hook, add onChange prop ([#2459](https://github.com/carbon-design-system/ibm-products/issues/2459)) ([e5f688b](https://github.com/carbon-design-system/ibm-products/commit/e5f688b998f251508bd2753cb895a9a6a61e1db4))





# [2.0.0-rc.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.5...@carbon/ibm-products@2.0.0-rc.6) (2022-11-08)


### Bug Fixes

* **Datagrid:** allow keyboard interaction with row expander ([#2435](https://github.com/carbon-design-system/ibm-products/issues/2435)) ([068a0bc](https://github.com/carbon-design-system/ibm-products/commit/068a0bc8e2086cae3dc842c8bd0d435b015eedaf))
* **Datagrid:** clear global filter in onCancel ([#2441](https://github.com/carbon-design-system/ibm-products/issues/2441)) ([ec73f19](https://github.com/carbon-design-system/ibm-products/commit/ec73f19ba1aebbfbfc908e968569ff228ce45872))





# [2.0.0-rc.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.4...@carbon/ibm-products@2.0.0-rc.5) (2022-11-01)


### Bug Fixes

* **CreateTearsheet:** fix initialStep issue when open=true - v11 ([#2354](https://github.com/carbon-design-system/ibm-products/issues/2354)) ([0a8c617](https://github.com/carbon-design-system/ibm-products/commit/0a8c617bc50f0a46e4ddf018937317ec767f4394))
* **Datagrid:** render pagination as component ([#2416](https://github.com/carbon-design-system/ibm-products/issues/2416)) ([e4bc6ad](https://github.com/carbon-design-system/ibm-products/commit/e4bc6ad6fd7d34d5acf57e672e11d6af50ef5e72))
* **PageHeader:** button alignment logic based on variable value - v11 ([#2392](https://github.com/carbon-design-system/ibm-products/issues/2392)) ([dd7a058](https://github.com/carbon-design-system/ibm-products/commit/dd7a0589c86a4359cb0b0861585810e6acf867f7))
* **PageHeader:** restrict useEffect logic to prevent scroll ([#2411](https://github.com/carbon-design-system/ibm-products/issues/2411)) ([f0b5575](https://github.com/carbon-design-system/ibm-products/commit/f0b55753fa49b4aa6b0e157777eb4c85a1207432))





# [2.0.0-rc.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.3...@carbon/ibm-products@2.0.0-rc.4) (2022-10-25)


### Bug Fixes

* **builds:** add script to fix `node_modules` path in sass source maps (v11) ([#2359](https://github.com/carbon-design-system/ibm-products/issues/2359)) ([a84342d](https://github.com/carbon-design-system/ibm-products/commit/a84342d71439459843dca8ee3b9058f19c27e81b))
* **CreateTearsheetNarrow:** Update formTitle prop as optional - v11 ([#2322](https://github.com/carbon-design-system/ibm-products/issues/2322)) ([3320f4a](https://github.com/carbon-design-system/ibm-products/commit/3320f4ae94753ae5f699ebcca00256d199aa8dc6))
* **Datagrid:** give table a default height for infinite scroll fn ([#2370](https://github.com/carbon-design-system/ibm-products/issues/2370)) ([78e2f8e](https://github.com/carbon-design-system/ibm-products/commit/78e2f8e6ca6c319daaf43eefb6329f6fbaec2cb3))
* **Datagrid:** use new Checkbox onChange prop signature ([#2401](https://github.com/carbon-design-system/ibm-products/issues/2401)) ([c198236](https://github.com/carbon-design-system/ibm-products/commit/c1982363699d641d6755b2535b1dee8160083cc3))
* **PageHeader:** Update page header to use h1 -v11 ([#2327](https://github.com/carbon-design-system/ibm-products/issues/2327)) ([9a4ac68](https://github.com/carbon-design-system/ibm-products/commit/9a4ac68f7d53bbf5b58b0deb4935cd63e7a6d94b))
* **SidePanel:** fix static title positioning ([#2396](https://github.com/carbon-design-system/ibm-products/issues/2396)) ([85841b7](https://github.com/carbon-design-system/ibm-products/commit/85841b71e856b986048b2a74a23a38b69d5450d8))
* **SidePanel:** motion refactor using framer motion (v11) ([#2314](https://github.com/carbon-design-system/ibm-products/issues/2314)) ([7bad2f2](https://github.com/carbon-design-system/ibm-products/commit/7bad2f271ec71cf8979b71a67cde0f212d0d5d6c))


### Features

* **Datagrid:** add new property to customize virtual body height ([#2382](https://github.com/carbon-design-system/ibm-products/issues/2382)) ([cd90d32](https://github.com/carbon-design-system/ibm-products/commit/cd90d32a36585b5abad4b15a40fcdbdc5e38efe7))
* **EditUpdateCards:** Edit and update cards - v11 ([#2374](https://github.com/carbon-design-system/ibm-products/issues/2374)) ([e233609](https://github.com/carbon-design-system/ibm-products/commit/e2336097fdbf4178c885d5960df726cc83c2dd99))





# [2.0.0-rc.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.2...@carbon/ibm-products@2.0.0-rc.3) (2022-09-30)


### Bug Fixes

* **Datagrid:** allow sticky column to stick again ([#2292](https://github.com/carbon-design-system/ibm-products/issues/2292)) ([fc2287a](https://github.com/carbon-design-system/ibm-products/commit/fc2287acb9c557ae0f74aa6c1769d9bb53d9dd89))
* inline edit newline fix ([#2300](https://github.com/carbon-design-system/ibm-products/issues/2300)) ([f3bb0c2](https://github.com/carbon-design-system/ibm-products/commit/f3bb0c2fce22a2105147aa52a063861055d16a19))
* **InlineEdit:** fix calc interpolation issue (v11) ([#2321](https://github.com/carbon-design-system/ibm-products/issues/2321)) ([ab80980](https://github.com/carbon-design-system/ibm-products/commit/ab80980fa146373a8f3d778e1d59de962f0d7dee))
* move carbon packages back to peer dependencies (v11) ([#2318](https://github.com/carbon-design-system/ibm-products/issues/2318)) ([17f0bdb](https://github.com/carbon-design-system/ibm-products/commit/17f0bdbfdb358fc49d4c6979f984c210804aa437))


### Features

* **Datagrid:** add validation for types text/num ([#2317](https://github.com/carbon-design-system/ibm-products/issues/2317)) ([6bfb9ec](https://github.com/carbon-design-system/ibm-products/commit/6bfb9ec7bb473a1612e2f0de3debfac170623547))





# [2.0.0-rc.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.1...@carbon/ibm-products@2.0.0-rc.2) (2022-08-23)

**Note:** Version bump only for package @carbon/ibm-products

# [2.0.0-rc.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@2.0.0-rc.0...@carbon/ibm-products@2.0.0-rc.1) (2022-08-17)


### Bug Fixes

* **AboutModal:** fix spacing issue causing build to break ([#2182](https://github.com/carbon-design-system/ibm-products/issues/2182)) ([c4cf0db](https://github.com/carbon-design-system/ibm-products/commit/c4cf0db582d9129093f8402a8d1d86c25efbb0f2))

# [1.31.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.30.0...@carbon/ibm-products@1.31.0) (2022-09-13)


### Features

* **Datagrid:** [#2237](https://github.com/carbon-design-system/ibm-products/issues/2237) datagrid inline edit `date` type ([#2238](https://github.com/carbon-design-system/ibm-products/issues/2238)) ([835dd48](https://github.com/carbon-design-system/ibm-products/commit/835dd48f439b87610f0722c420f56ce6c0385daf))





# [1.30.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.29.0...@carbon/ibm-products@1.30.0) (2022-09-13)


### Features

* **Datagrid:** inline edit - useInlineEdit hook, text and number types ([#2228](https://github.com/carbon-design-system/ibm-products/issues/2228)) ([4d6c839](https://github.com/carbon-design-system/ibm-products/commit/4d6c839e7130c841f58367c221953cb51785b16f))
* **DataSpreadsheet:** add cell deletion and theme prop for designs ([#2220](https://github.com/carbon-design-system/ibm-products/issues/2220)) ([3acddc5](https://github.com/carbon-design-system/ibm-products/commit/3acddc598017c9afa453ec217154ebfe7b683dfb))
* **ProductiveCard:** include ghost button in the Action Bar ([#2253](https://github.com/carbon-design-system/ibm-products/issues/2253)) ([865e3c0](https://github.com/carbon-design-system/ibm-products/commit/865e3c0216832f209d0c0492d4dbd332d3daabb2))





# [1.29.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.28.0...@carbon/ibm-products@1.29.0) (2022-09-06)


### Bug Fixes

* **Datagrid:** add withSelectColumns when using useSelectRows ([#2241](https://github.com/carbon-design-system/ibm-products/issues/2241)) ([2a5e194](https://github.com/carbon-design-system/ibm-products/commit/2a5e1948a16aa6cf4f1ba5126a58f1f99d1ec69d))
* **removeModal:** Edit small inconsistencies from pal ([#2245](https://github.com/carbon-design-system/ibm-products/issues/2245)) ([5cb4b4e](https://github.com/carbon-design-system/ibm-products/commit/5cb4b4ee6f3fc6ab69512811bb1dddca18e60194))
* **SidePanel:** style update for title truncation issue ([#2239](https://github.com/carbon-design-system/ibm-products/issues/2239)) ([c88b085](https://github.com/carbon-design-system/ibm-products/commit/c88b085c542fb10a12a844f2b5c419e2e4676db4))
* update to Carbon v10 compatible versions to latest ([#2249](https://github.com/carbon-design-system/ibm-products/issues/2249)) ([2a2ccfa](https://github.com/carbon-design-system/ibm-products/commit/2a2ccfaef41d5247724aed978fb62567932ea6dc))


### Features

* **WebTerminal:** Releases the WebTerminal 🚀 ([#2246](https://github.com/carbon-design-system/ibm-products/issues/2246)) ([2afe754](https://github.com/carbon-design-system/ibm-products/commit/2afe7542b29224574234ef9552dc3f62cb160dc6))





# [1.28.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.27.0...@carbon/ibm-products@1.28.0) (2022-08-30)


### Bug Fixes

* add select design review updates ([#2195](https://github.com/carbon-design-system/ibm-products/issues/2195)) ([c6e2625](https://github.com/carbon-design-system/ibm-products/commit/c6e2625f8ebdc732445c4daea2bb3bdfe0bcc89e))
* **Datagrid:** export useColumnOrder hook ([#2214](https://github.com/carbon-design-system/ibm-products/issues/2214)) ([094cc6f](https://github.com/carbon-design-system/ibm-products/commit/094cc6f55bf6e493f4c56fe4a63fb8e70a2c6221))
* **DataSpreadsheet:** add missing aria labels and update arialabelled-by ([#2211](https://github.com/carbon-design-system/ibm-products/issues/2211)) ([840864e](https://github.com/carbon-design-system/ibm-products/commit/840864ec3bac68f643fa87d5c9b35b09246b70c9))
* **ImportModal:** empty accepts array & adds "." to extension variable ([#2218](https://github.com/carbon-design-system/ibm-products/issues/2218)) ([6cdd78b](https://github.com/carbon-design-system/ibm-products/commit/6cdd78bb8586eb94db283eb65e52f4eb50de2321))
* Inline edit 2107 ([#2222](https://github.com/carbon-design-system/ibm-products/issues/2222)) ([76cfb89](https://github.com/carbon-design-system/ibm-products/commit/76cfb894e2c8472a8da3a06f96dca7a09c26e57e))
* reset state on submit or close ([#2219](https://github.com/carbon-design-system/ibm-products/issues/2219)) ([a18e538](https://github.com/carbon-design-system/ibm-products/commit/a18e5381b22a0a64c74e3545c773251c89de4dab))


### Features

* **Datagrid:** [#2070](https://github.com/carbon-design-system/ibm-products/issues/2070) add datagrid actions dropdown example ([#2210](https://github.com/carbon-design-system/ibm-products/issues/2210)) ([08f1bd5](https://github.com/carbon-design-system/ibm-products/commit/08f1bd55073abe398134430c06fa432c43e1208a))
* **Datagrid:** add frozen left column support ([#2194](https://github.com/carbon-design-system/ibm-products/issues/2194)) ([d469476](https://github.com/carbon-design-system/ibm-products/commit/d469476e0f60d376f0989c7a5cb335e3d9525a36))
* **Datagrid:** added select all button to customize columns modal; added styles; revised instruction text ([#2221](https://github.com/carbon-design-system/ibm-products/issues/2221)) ([fd90950](https://github.com/carbon-design-system/ibm-products/commit/fd909502b7f9c69024f6a43543ffb496bd7875ce))





# [1.27.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.26.0...@carbon/ibm-products@1.27.0) (2022-08-23)


### Features

* **Datagrid:** add multi line wrap option ([#2196](https://github.com/carbon-design-system/ibm-products/issues/2196)) ([537d93b](https://github.com/carbon-design-system/ibm-products/commit/537d93be2fa3997b71debe4f6fd27094c37c6935))
* **WebTerminal:** A11y test, iconDescription tests, and storybook ([#2162](https://github.com/carbon-design-system/ibm-products/issues/2162)) ([090470e](https://github.com/carbon-design-system/ibm-products/commit/090470e8f1eaba5ddde6751f5ad53338642d0015))





# [1.26.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.25.1...@carbon/ibm-products@1.26.0) (2022-08-16)


### Bug Fixes

* **InlineEdit:** fix sass calc issue with carbon token ([#2158](https://github.com/carbon-design-system/ibm-products/issues/2158)) ([ac258e6](https://github.com/carbon-design-system/ibm-products/commit/ac258e664f700819da467ff8d0fc80ad428e6ac4))


### Features

* Add Row Action Buttons ([#2168](https://github.com/carbon-design-system/ibm-products/issues/2168)) ([d0635bc](https://github.com/carbon-design-system/ibm-products/commit/d0635bc637a7133eba6321a1b4f597ba3d60d8a4))
* **Datagrid:** Batch actions ([#2022](https://github.com/carbon-design-system/ibm-products/issues/2022)) ([bb7e71b](https://github.com/carbon-design-system/ibm-products/commit/bb7e71b3a6b333c8b9ea6c0fb90d02e280042dc0))





## [1.25.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.25.0...@carbon/ibm-products@1.25.1) (2022-08-08)


### Bug Fixes

* change datagrid style files to partials ([#2153](https://github.com/carbon-design-system/ibm-products/issues/2153)) ([c8cfe3f](https://github.com/carbon-design-system/ibm-products/commit/c8cfe3f3b38367a9d1ceed6203f9f72d8a050e1e))
* **Datagrid:** fix style issues between Datagrid and Carbon data table ([#2156](https://github.com/carbon-design-system/ibm-products/issues/2156)) ([082877e](https://github.com/carbon-design-system/ibm-products/commit/082877e8f9204c74f0d5ca644a80e15a6b17016e))
* single add select css updates ([#2149](https://github.com/carbon-design-system/ibm-products/issues/2149)) ([b09524b](https://github.com/carbon-design-system/ibm-products/commit/b09524bb1953e69f7b6cdb7d762434b4b9dec7b5))





# [1.25.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.24.0...@carbon/ibm-products@1.25.0) (2022-08-02)


### Bug Fixes

* **EmptyState:** update text-styles, spacing and button-size ([#2133](https://github.com/carbon-design-system/ibm-products/issues/2133)) ([1c27e3a](https://github.com/carbon-design-system/ibm-products/commit/1c27e3add89734cee222174484c27d4d1d6e86eb))
* update to Carbon v10 compatible versions to latest ([#2144](https://github.com/carbon-design-system/ibm-products/issues/2144)) ([c67ce20](https://github.com/carbon-design-system/ibm-products/commit/c67ce20cf586218f28d2ad7bba4de6fd4d21efae))


### Features

* **ImportModal:** render icon for import by url button ([#2146](https://github.com/carbon-design-system/ibm-products/issues/2146)) ([c707b8b](https://github.com/carbon-design-system/ibm-products/commit/c707b8b23265909917794b0f31b4f93097dfbc05))
* **WebTerminal:** refactors code to useContext and custom hooks  ([#2097](https://github.com/carbon-design-system/ibm-products/issues/2097)) ([e71e21b](https://github.com/carbon-design-system/ibm-products/commit/e71e21b66782fa99edccaf230ec8365c27f6192e))





# [1.24.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.23.1...@carbon/ibm-products@1.24.0) (2022-07-27)


### Bug Fixes

* **Datagrid:** fix issue in StickActionColumn tests ([#2135](https://github.com/carbon-design-system/ibm-products/issues/2135)) ([ff37a8e](https://github.com/carbon-design-system/ibm-products/commit/ff37a8eabb13ebd256058e0404bde3a70d84c46f))
* inline edit overflow to right ([#2104](https://github.com/carbon-design-system/ibm-products/issues/2104)) ([9392372](https://github.com/carbon-design-system/ibm-products/commit/939237279f94330752c69bb93a814eaef5dfd9a0))
* **PageHeader:** solved unexpected scrollbar issue ([#2119](https://github.com/carbon-design-system/ibm-products/issues/2119)) ([15daeee](https://github.com/carbon-design-system/ibm-products/commit/15daeee4ee744df5ddee2f0c8fe579383dfc4451))
* select all duplicates in add select columns ([#2136](https://github.com/carbon-design-system/ibm-products/issues/2136)) ([fb16ab3](https://github.com/carbon-design-system/ibm-products/commit/fb16ab33c6a6a6920ca8b27c84382046ea0e3764))


### Features

* **Datatable:** table header ([#1973](https://github.com/carbon-design-system/ibm-products/issues/1973)) ([f9166ad](https://github.com/carbon-design-system/ibm-products/commit/f9166adacbda3851e20f710cb196e2db01388107))
* **edit and update:** edit and update tearsheet ([#1975](https://github.com/carbon-design-system/ibm-products/issues/1975)) ([cd09bab](https://github.com/carbon-design-system/ibm-products/commit/cd09babac9f862339760acd64fc24340c06423ae))





## [1.23.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.23.0...@carbon/ibm-products@1.23.1) (2022-07-19)


### Bug Fixes

* update to Carbon v10 compatible versions to latest ([#2101](https://github.com/carbon-design-system/ibm-products/issues/2101)) ([feebce3](https://github.com/carbon-design-system/ibm-products/commit/feebce38ac474917e29d201d9198e3baf9452a97))
* **web-terminal:** spans 100% when less than 640px ([#2087](https://github.com/carbon-design-system/ibm-products/issues/2087)) ([c012d30](https://github.com/carbon-design-system/ibm-products/commit/c012d306c0df936ef4916e5b31e7dd8517ebb3ca))
* **WebTerminal:** small fixes for release review ([#2106](https://github.com/carbon-design-system/ibm-products/issues/2106)) ([6eb3346](https://github.com/carbon-design-system/ibm-products/commit/6eb3346efaae41a1c38972620c4f9222419cce36))





# [1.23.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.22.0...@carbon/ibm-products@1.23.0) (2022-07-12)


### Bug Fixes

* add select refactor ([#2068](https://github.com/carbon-design-system/ibm-products/issues/2068)) ([b7aa521](https://github.com/carbon-design-system/ibm-products/commit/b7aa5217902ae4ca29c998692f8d7b2823c90f69))


### Features

* add multiline attribute to tagset ([#2079](https://github.com/carbon-design-system/ibm-products/issues/2079)) ([6c3286a](https://github.com/carbon-design-system/ibm-products/commit/6c3286ae43f8e4996badf20dc4582b8133a36d0f))
* align expandable rows ([#2039](https://github.com/carbon-design-system/ibm-products/issues/2039)) ([853176f](https://github.com/carbon-design-system/ibm-products/commit/853176f951d13ab867bee63cb2b2a562fd7ce7a7))
* index cloud cognitive ([#2063](https://github.com/carbon-design-system/ibm-products/issues/2063)) ([a743a20](https://github.com/carbon-design-system/ibm-products/commit/a743a206a016685f3a8a2644bbdce054ad84ead1))
* merged left panel content and datagrid on same horizontal level ([#2064](https://github.com/carbon-design-system/ibm-products/issues/2064)) ([356b101](https://github.com/carbon-design-system/ibm-products/commit/356b10107055a8f72ee68f07851357405306b99e))





# [1.22.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.21.0...@carbon/ibm-products@1.22.0) (2022-07-05)


### Features

* added center aligned columns component and centered new columns ([#2056](https://github.com/carbon-design-system/ibm-products/issues/2056)) ([9178df2](https://github.com/carbon-design-system/ibm-products/commit/9178df24c2f54370ab4064ab659c77a9ac459377))





# [1.21.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.20.3...@carbon/ibm-products@1.21.0) (2022-06-28)


### Features

* **WebTerminal:** Changes width to 640px ([#2066](https://github.com/carbon-design-system/ibm-products/issues/2066)) ([b741316](https://github.com/carbon-design-system/ibm-products/commit/b741316b74dd8be0af2f4cfc61ad28c0a672e46b))





## [1.20.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.20.2...@carbon/ibm-products@1.20.3) (2022-06-21)

**Note:** Version bump only for package @carbon/ibm-products





## [1.20.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.20.1...@carbon/ibm-products@1.20.2) (2022-06-15)


### Bug Fixes

* **Datagrid:** use checkbox in place of inline checkbox ([#2037](https://github.com/carbon-design-system/ibm-products/issues/2037)) ([1859ccf](https://github.com/carbon-design-system/ibm-products/commit/1859ccf5f1f7181ed83aad0125268042fb5a7ca1))





## [1.20.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.20.0...@carbon/ibm-products@1.20.1) (2022-06-14)


### Bug Fixes

* **Datagrid:** export datagrid hooks ([#2036](https://github.com/carbon-design-system/ibm-products/issues/2036)) ([44be0e1](https://github.com/carbon-design-system/ibm-products/commit/44be0e1e31cf5061296238026901280bdd49bc75))





# [1.20.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.19.1...@carbon/ibm-products@1.20.0) (2022-06-13)


### Bug Fixes

* **ComboButton:** remove getInstanceId and use our internal uuid util ([#2028](https://github.com/carbon-design-system/ibm-products/issues/2028)) ([c482bbd](https://github.com/carbon-design-system/ibm-products/commit/c482bbd1378ad4b774a118e677e05ccad88c4675))
* **CreateSidePanel:** use actions prop instead of ActionSet directly ([#2033](https://github.com/carbon-design-system/ibm-products/issues/2033)) ([8dbeabd](https://github.com/carbon-design-system/ibm-products/commit/8dbeabdc3a2829e9a60207c9a36da58d9817add0))
* header row horizontal scroll and scrollbar style ([#2032](https://github.com/carbon-design-system/ibm-products/issues/2032)) ([f6ea8d8](https://github.com/carbon-design-system/ibm-products/commit/f6ea8d88ca11cc959d1c36c5d309f23414cc03e3))
* hooked up add select modifier functionality ([#2019](https://github.com/carbon-design-system/ibm-products/issues/2019)) ([2cbda09](https://github.com/carbon-design-system/ibm-products/commit/2cbda091755b6c1dde20e892c5b8568c0ab18e11))
* **SidePanel:** check if window exists for reduced motion logic ([#2029](https://github.com/carbon-design-system/ibm-products/issues/2029)) ([6bc2b29](https://github.com/carbon-design-system/ibm-products/commit/6bc2b29a3dc35ee7952cf8683e5f8a9e46e59e2c))


### Features

* inline edit release ([#2025](https://github.com/carbon-design-system/ibm-products/issues/2025)) ([028a58f](https://github.com/carbon-design-system/ibm-products/commit/028a58fc10fab8cd2f7e8846d0ef7611e15862ca))





## [1.19.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.19.0...@carbon/ibm-products@1.19.1) (2022-06-06)


### Bug Fixes

* Added styles to datagrid drag and drop pattern ([#2009](https://github.com/carbon-design-system/ibm-products/issues/2009)) ([0dc0bf8](https://github.com/carbon-design-system/ibm-products/commit/0dc0bf84a794960bbf1bf08e1ebb6ba23de6e027))
* **ComboButton:** change import of overflow menu and fix styles ([#2010](https://github.com/carbon-design-system/ibm-products/issues/2010)) ([564de7d](https://github.com/carbon-design-system/ibm-products/commit/564de7d01dadb1c504e9a4add866a6698c152ccc))





# [1.19.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.18.2...@carbon/ibm-products@1.19.0) (2022-05-31)


### Bug Fixes

* add select global filter styles ([#2005](https://github.com/carbon-design-system/ibm-products/issues/2005)) ([34951a7](https://github.com/carbon-design-system/ibm-products/commit/34951a75d7d09cdfe6e61e0ccb41de04fec30d57))
* add select sidebar bug ([#2007](https://github.com/carbon-design-system/ibm-products/issues/2007)) ([9f587c8](https://github.com/carbon-design-system/ibm-products/commit/9f587c8824a0222634266e8532e64a6b42436713))


### Features

* **DataSpreadsheet:** add multiple column reordering ([#2002](https://github.com/carbon-design-system/ibm-products/issues/2002)) ([3f3588f](https://github.com/carbon-design-system/ibm-products/commit/3f3588f5521d23e8bd74fb5fdd56101ea2952e34))





## [1.18.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.18.1...@carbon/ibm-products@1.18.2) (2022-05-24)


### Bug Fixes

* **DataSpreadsheet:** support reordering columns with horizontal scroll ([#1993](https://github.com/carbon-design-system/ibm-products/issues/1993)) ([e4a9b28](https://github.com/carbon-design-system/ibm-products/commit/e4a9b280df30ad5ca80777fd46a9acd058436bf1))
* **DataSpreadsheet:** update active cell location after cellSize change ([#1992](https://github.com/carbon-design-system/ibm-products/issues/1992)) ([9c103c6](https://github.com/carbon-design-system/ibm-products/commit/9c103c6d7a55748cfcd9c22ef99d8308dfc9393a))
* **DataSpreadsheet:** update header cell border colors ([#1997](https://github.com/carbon-design-system/ibm-products/issues/1997)) ([97c99f7](https://github.com/carbon-design-system/ibm-products/commit/97c99f7a80669b103840b8f1595de28d76915804))
* when export modal closes the input should be reset ([#1998](https://github.com/carbon-design-system/ibm-products/issues/1998)) ([7980610](https://github.com/carbon-design-system/ibm-products/commit/7980610d65fa42c509024325b40778bf8b0a3b82))





## [1.18.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.18.0...@carbon/ibm-products@1.18.1) (2022-05-17)


### Bug Fixes

* add select meta panel ([#1983](https://github.com/carbon-design-system/ibm-products/issues/1983)) ([5d06c18](https://github.com/carbon-design-system/ibm-products/commit/5d06c180a1e9236e53c6b7d9c738b52f299153a1))
* converts chevron in add select to button ([#1988](https://github.com/carbon-design-system/ibm-products/issues/1988)) ([69c9b72](https://github.com/carbon-design-system/ibm-products/commit/69c9b722a3f20afe89a4ebec13da10fe845650e3))
* data table empty state ([#1969](https://github.com/carbon-design-system/ibm-products/issues/1969)) ([512655d](https://github.com/carbon-design-system/ibm-products/commit/512655d8eb887436d61a8417b275994f14e34567))
* **DataSpreadsheet:**  spreadsheet total visible columns fix ([#1991](https://github.com/carbon-design-system/ibm-products/issues/1991)) ([10e931a](https://github.com/carbon-design-system/ibm-products/commit/10e931a6fe933e17674fb76a79cc2c467120eb19))
* **DataSpreadsheet:** selected row/column cell header fixes ([#1990](https://github.com/carbon-design-system/ibm-products/issues/1990)) ([9ccc157](https://github.com/carbon-design-system/ibm-products/commit/9ccc157b9062ba3b0165bfe08899e95e0dd1c87a))





# [1.18.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.17.0...@carbon/ibm-products@1.18.0) (2022-05-10)


### Bug Fixes

* **DataSpreadsheet:** address cell editing after reorder ([#1962](https://github.com/carbon-design-system/ibm-products/issues/1962)) ([07530c6](https://github.com/carbon-design-system/ibm-products/commit/07530c6be2d57cc686e8081cebf06a225b016468))
* **DataSpreadsheet:** spreadsheet column reordering indicator line and fix selection width issue ([#1960](https://github.com/carbon-design-system/ibm-products/issues/1960)) ([4c2efde](https://github.com/carbon-design-system/ibm-products/commit/4c2efde39848742900a786bf62a63a0b4bdcb0f2))
* global filter functionality for add select ([#1970](https://github.com/carbon-design-system/ibm-products/issues/1970)) ([7f3f7ea](https://github.com/carbon-design-system/ibm-products/commit/7f3f7eab5cf27a42ec808fd9eea08df894dbb071))
* update to Carbon v10 compatible versions to latest ([#1971](https://github.com/carbon-design-system/ibm-products/issues/1971)) ([95374b8](https://github.com/carbon-design-system/ibm-products/commit/95374b89a15b1a76d18fb29c40e161a54720c447)), closes [#1970](https://github.com/carbon-design-system/ibm-products/issues/1970) [#1972](https://github.com/carbon-design-system/ibm-products/issues/1972)


### Features

* **DataSpreadsheet:** add spreadsheet column reordering ([#1959](https://github.com/carbon-design-system/ibm-products/issues/1959)) ([b4d876b](https://github.com/carbon-design-system/ibm-products/commit/b4d876bf9d804a48ecb965f94ff7c942e16490e1))





# [1.17.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.16.0...@carbon/ibm-products@1.17.0) (2022-05-03)


### Bug Fixes

* **Datagrid:** revert react-dnd versions ([#1950](https://github.com/carbon-design-system/ibm-products/issues/1950)) ([a1417b0](https://github.com/carbon-design-system/ibm-products/commit/a1417b0e97516826a44ae6352ada8a84200d8eb0))
* filename and extension default state ([#1947](https://github.com/carbon-design-system/ibm-products/issues/1947)) ([87eaf33](https://github.com/carbon-design-system/ibm-products/commit/87eaf33e72371f301a5c7c4a5f2f61a2b448bdf5))
* **SidePanel:** fix static panel height without actions ([#1943](https://github.com/carbon-design-system/ibm-products/issues/1943)) ([1092125](https://github.com/carbon-design-system/ibm-products/commit/10921258ecd9dc460492e785a69b82a49a34ba50))


### Features

* **DataSpreadsheet:** add selected row/column header state ([#1954](https://github.com/carbon-design-system/ibm-products/issues/1954)) ([b9184cb](https://github.com/carbon-design-system/ibm-products/commit/b9184cbefeb02cec3c1a7577ea3168a7919ae343))
* **DataSpreadsheet:** support variable column width ([#1945](https://github.com/carbon-design-system/ibm-products/issues/1945)) ([0ab2ae7](https://github.com/carbon-design-system/ibm-products/commit/0ab2ae779032c073deedfbcd6ba42fda6ea73176))
* **WebTerminal:** 1914 reduce motion web terminal ([#1951](https://github.com/carbon-design-system/ibm-products/issues/1951)) ([d26face](https://github.com/carbon-design-system/ibm-products/commit/d26facef16657a9bc43b7b09ac50cf3f173999f5))





# [1.16.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.15.0...@carbon/ibm-products@1.16.0) (2022-04-26)


### Bug Fixes

* adds global filter tags to add select ([#1938](https://github.com/carbon-design-system/ibm-products/issues/1938)) ([3a66201](https://github.com/carbon-design-system/ibm-products/commit/3a66201a23b7577d6abff7d575c5950ddfd9bc1a))


### Features

* **DataSpreadsheet:** support horizontal scrolling/add sticky headers ([#1934](https://github.com/carbon-design-system/ibm-products/issues/1934)) ([987cecc](https://github.com/carbon-design-system/ibm-products/commit/987cecc2d13a13958615fe229b2e290e7a69295d))





# [1.15.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.14.0...@carbon/ibm-products@1.15.0) (2022-04-19)


### Bug Fixes

* **AboutModal:** scrolling content fade visible ([#1919](https://github.com/carbon-design-system/ibm-products/issues/1919)) ([5b2fa8b](https://github.com/carbon-design-system/ibm-products/commit/5b2fa8bf61b65300ce3cd05327ee8f865bcabf7f))
* add outline tag type and test ([#1888](https://github.com/carbon-design-system/ibm-products/issues/1888)) ([4d8d3e3](https://github.com/carbon-design-system/ibm-products/commit/4d8d3e3c686a4ab3be743eda4b7a370d076ee711))
* **Datagrid:** revert namor package version ([#1909](https://github.com/carbon-design-system/ibm-products/issues/1909)) ([abc6584](https://github.com/carbon-design-system/ibm-products/commit/abc65849db6d8f785cc5cd286ff4065be3c29ae4))
* **DataSpreadsheet:** updates to keys pressed custom hook ([#1900](https://github.com/carbon-design-system/ibm-products/issues/1900)) ([2b79850](https://github.com/carbon-design-system/ibm-products/commit/2b79850ee7157bab15e19be9e79f68a4d2c1a9dc))
* show export modal close icon ([#1903](https://github.com/carbon-design-system/ibm-products/issues/1903)) ([aeaf40f](https://github.com/carbon-design-system/ibm-products/commit/aeaf40fe29cae18a0c66b270d4c799046097f1b5))


### Features

* add portal target prop to tearsheet shell ([#1905](https://github.com/carbon-design-system/ibm-products/issues/1905)) ([05808e4](https://github.com/carbon-design-system/ibm-products/commit/05808e4776ad713c0865cfaf29741924ecd23d5a))
* **DataSpreadsheet:** [#1884](https://github.com/carbon-design-system/ibm-products/issues/1884) spreadsheet more shortcuts ([#1898](https://github.com/carbon-design-system/ibm-products/issues/1898)) ([b349ce2](https://github.com/carbon-design-system/ibm-products/commit/b349ce2597db9236f979b82d77fdaa6e022f1799))
* **DataSpreadsheet:** add select all button functionality ([#1910](https://github.com/carbon-design-system/ibm-products/issues/1910)) ([e580376](https://github.com/carbon-design-system/ibm-products/commit/e58037612988de851a58e13b9536ff5b31b41082))
* **DataSpreadsheet:** add support for multi row/column selections ([#1915](https://github.com/carbon-design-system/ibm-products/issues/1915)) ([f41513c](https://github.com/carbon-design-system/ibm-products/commit/f41513c5c61d825137198100d7abeb4c90e938a9))
* **DataSpreadsheet:** move active cell within selection area with tab ([#1927](https://github.com/carbon-design-system/ibm-products/issues/1927)) ([4ef8a7c](https://github.com/carbon-design-system/ibm-products/commit/4ef8a7cd95209042d9c5f0344264c636ba06fc49))
* **DataSpreadsheet:** move active cell within selection areas ([#1921](https://github.com/carbon-design-system/ibm-products/issues/1921)) ([50e3006](https://github.com/carbon-design-system/ibm-products/commit/50e3006bc21bb46b53279af967231fb2baedff1a))
* **DataSpreadsheet:** support windows keyboards with shortcuts ([#1917](https://github.com/carbon-design-system/ibm-products/issues/1917)) ([7866c1b](https://github.com/carbon-design-system/ibm-products/commit/7866c1b6a65f664d44a1225e23411c772f25ec31))





# [1.14.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.13.0...@carbon/ibm-products@1.14.0) (2022-04-12)


### Bug Fixes

* add select global filter ([#1894](https://github.com/carbon-design-system/ibm-products/issues/1894)) ([5f7f47a](https://github.com/carbon-design-system/ibm-products/commit/5f7f47a3810b9b4ec1f32b16c432a7e1c7c7f9d6))
* **DataSpreadsheet:** correct cursor placement ([#1883](https://github.com/carbon-design-system/ibm-products/issues/1883)) ([4f52dbd](https://github.com/carbon-design-system/ibm-products/commit/4f52dbd78caab9528134464a40afae90a7270acd))
* **select:** inline background color on tearsheet ([#1901](https://github.com/carbon-design-system/ibm-products/issues/1901)) ([6f67090](https://github.com/carbon-design-system/ibm-products/commit/6f67090a0a18839c64c20a2271fc93b864745ac3))


### Features

* Datagrid component ([#1877](https://github.com/carbon-design-system/ibm-products/issues/1877)) ([f9dd8ce](https://github.com/carbon-design-system/ibm-products/commit/f9dd8ce0ab87cea39e91603fdb542091fa757cbe))
* **DataSpreadsheet:** a11y updates and keyboard shortcuts ([#1892](https://github.com/carbon-design-system/ibm-products/issues/1892)) ([aed603a](https://github.com/carbon-design-system/ibm-products/commit/aed603abe10de815f8216ee7acc65f1f36deff9d))





# [1.13.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.12.0...@carbon/ibm-products@1.13.0) (2022-04-05)


### Bug Fixes

* add select avatar and userprofileimage update ([#1853](https://github.com/carbon-design-system/ibm-products/issues/1853)) ([cab0621](https://github.com/carbon-design-system/ibm-products/commit/cab0621605f252ba908aa0e85dff1fb5079b8c57))
* add select icon support ([#1860](https://github.com/carbon-design-system/ibm-products/issues/1860)) ([d11f2b5](https://github.com/carbon-design-system/ibm-products/commit/d11f2b5e7b59881324658c2d4ad3eaadbfa503d2))
* **DataSpreadsheet:** browser fix, update selectionArea on cell updates ([#1861](https://github.com/carbon-design-system/ibm-products/issues/1861)) ([8e5764b](https://github.com/carbon-design-system/ibm-products/commit/8e5764bdf86e2f34ea2c6432b928897d26d83afd))
* **HTTP errors:** responsive behaviour ([#1828](https://github.com/carbon-design-system/ibm-products/issues/1828)) ([9d4b025](https://github.com/carbon-design-system/ibm-products/commit/9d4b025971bf913e811b4807f7eb67186a457f6a)), closes [#1826](https://github.com/carbon-design-system/ibm-products/issues/1826) [#1780](https://github.com/carbon-design-system/ibm-products/issues/1780) [#1829](https://github.com/carbon-design-system/ibm-products/issues/1829) [#1831](https://github.com/carbon-design-system/ibm-products/issues/1831) [#1830](https://github.com/carbon-design-system/ibm-products/issues/1830) [#1827](https://github.com/carbon-design-system/ibm-products/issues/1827) [#1834](https://github.com/carbon-design-system/ibm-products/issues/1834) [#1758](https://github.com/carbon-design-system/ibm-products/issues/1758) [#1840](https://github.com/carbon-design-system/ibm-products/issues/1840) [#1839](https://github.com/carbon-design-system/ibm-products/issues/1839) [#1838](https://github.com/carbon-design-system/ibm-products/issues/1838) [#1842](https://github.com/carbon-design-system/ibm-products/issues/1842) [#1841](https://github.com/carbon-design-system/ibm-products/issues/1841) [#1835](https://github.com/carbon-design-system/ibm-products/issues/1835)
* issue 1737 page header example ([#1880](https://github.com/carbon-design-system/ibm-products/issues/1880)) ([79d0a8e](https://github.com/carbon-design-system/ibm-products/commit/79d0a8ef7085666f69e4c3eec7bee36c44937fbf))
* **PageHeader:** issue1789 a11y issues BreadcrumbWithOverflow & ActionBar ([#1854](https://github.com/carbon-design-system/ibm-products/issues/1854)) ([10d3bcc](https://github.com/carbon-design-system/ibm-products/commit/10d3bcc868a5415dd95588870f320079c480f778))
* ssr maybe - moves document.body inside useEffect ([#1881](https://github.com/carbon-design-system/ibm-products/issues/1881)) ([5bc6602](https://github.com/carbon-design-system/ibm-products/commit/5bc66027aaa2f98685d0702e99f4e42494491d05))
* update Carbon versions to latest ([#1862](https://github.com/carbon-design-system/ibm-products/issues/1862)) ([c0e8024](https://github.com/carbon-design-system/ibm-products/commit/c0e8024cf060cec0262c79628077810a92a56619))


### Features

* **DataSpreadsheet:** add edit mode overflow enhancements ([#1857](https://github.com/carbon-design-system/ibm-products/issues/1857)) ([458933a](https://github.com/carbon-design-system/ibm-products/commit/458933a00276062ae189cb1ed51dae5c531feb31))
* **DataSpreadsheet:** support empty spreadsheets ([#1848](https://github.com/carbon-design-system/ibm-products/issues/1848)) ([5010ca7](https://github.com/carbon-design-system/ibm-products/commit/5010ca794d0ae9bb8f105c702ba6e30b84346836))





# [1.12.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.11.2...@carbon/ibm-products@1.12.0) (2022-03-29)


### Bug Fixes

* add select global search ([#1834](https://github.com/carbon-design-system/ibm-products/issues/1834)) ([ee4ac9e](https://github.com/carbon-design-system/ibm-products/commit/ee4ac9ef78a05ed362535c8a9d25b3bbe31747c8))
* **DataSpreadsheet:** [#1758](https://github.com/carbon-design-system/ibm-products/issues/1758) spreadsheet single cell selection area ([#1840](https://github.com/carbon-design-system/ibm-products/issues/1840)) ([f7b388d](https://github.com/carbon-design-system/ibm-products/commit/f7b388dd1a79f45b17e210360a49cc9f37c1ec7f))
* **DataSpreadsheet:** address header scrollbar issue ([#1780](https://github.com/carbon-design-system/ibm-products/issues/1780)) ([c42819c](https://github.com/carbon-design-system/ibm-products/commit/c42819c01c8e5ae3dabac4f3540b2689b01af37c))
* **DataSpreadsheet:** use type token for cells/cell editor/active cell ([#1831](https://github.com/carbon-design-system/ibm-products/issues/1831)) ([abf6d3d](https://github.com/carbon-design-system/ibm-products/commit/abf6d3d8fdfa2059b5eeb52a0f02a51e0ee563ef))
* text alignment in tagset overflow ([#1829](https://github.com/carbon-design-system/ibm-products/issues/1829)) ([4f651f0](https://github.com/carbon-design-system/ibm-products/commit/4f651f0ea8bcd80953df54fee22a94f70c815537))
* update Carbon versions to latest ([#1835](https://github.com/carbon-design-system/ibm-products/issues/1835)) ([b9152d1](https://github.com/carbon-design-system/ibm-products/commit/b9152d15813b7feab937092bbbf46439305aab50))


### Features

* **DataSpreadsheet:** add onSelectionAreaChange prop ([#1830](https://github.com/carbon-design-system/ibm-products/issues/1830)) ([626f6ba](https://github.com/carbon-design-system/ibm-products/commit/626f6ba2e717a755088cc835a4d1fc76c30a6580))





## [1.11.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.11.1...@carbon/ibm-products@1.11.2) (2022-03-22)


### Bug Fixes

* **CreateTearsheet:** change onNext initialization ([#1823](https://github.com/carbon-design-system/ibm-products/issues/1823)) ([15d5181](https://github.com/carbon-design-system/ibm-products/commit/15d51813b4a415591b19d6dcf3b1d0e4e5bf58d6))





## [1.11.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.11.0...@carbon/ibm-products@1.11.1) (2022-03-22)


### Bug Fixes

* adds column select functionality in add select ([#1788](https://github.com/carbon-design-system/ibm-products/issues/1788)) ([72c2d29](https://github.com/carbon-design-system/ibm-products/commit/72c2d29ccb2c357982c2f7b1153aeca53e8f40f6))
* **ButtonMenu:** doesn't support ghost kind ([#1779](https://github.com/carbon-design-system/ibm-products/issues/1779)) ([30b9d0f](https://github.com/carbon-design-system/ibm-products/commit/30b9d0f8cde01b20fe150eff1c0c0dd4209d49b2))
* **LoadingBar:** remove loadingbar component [#1738](https://github.com/carbon-design-system/ibm-products/issues/1738) ([#1791](https://github.com/carbon-design-system/ibm-products/issues/1791)) ([80c93a6](https://github.com/carbon-design-system/ibm-products/commit/80c93a6bd4787ed0e1eed518c08e0ea6466ad0d5))
* update Carbon versions to latest ([#1793](https://github.com/carbon-design-system/ibm-products/issues/1793)) ([9943926](https://github.com/carbon-design-system/ibm-products/commit/9943926b5234ce0690417d16483da4caa84790cf)), closes [#1738](https://github.com/carbon-design-system/ibm-products/issues/1738) [#1791](https://github.com/carbon-design-system/ibm-products/issues/1791) [#1738](https://github.com/carbon-design-system/ibm-products/issues/1738) [#1790](https://github.com/carbon-design-system/ibm-products/issues/1790)





# [1.11.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.10.0...@carbon/ibm-products@1.11.0) (2022-03-15)


### Bug Fixes

* add select cleanup ([#1774](https://github.com/carbon-design-system/ibm-products/issues/1774)) ([6f6d954](https://github.com/carbon-design-system/ibm-products/commit/6f6d9544de911a05b46257617404abc7886382ef))
* adds sort and filter functionality to add select columns ([#1765](https://github.com/carbon-design-system/ibm-products/issues/1765)) ([e9cd868](https://github.com/carbon-design-system/ibm-products/commit/e9cd86893f7a514ff2269b39caa8466f2af56361))
* adds the filter and sort buttons to add select columns ([#1753](https://github.com/carbon-design-system/ibm-products/issues/1753)) ([29ac82a](https://github.com/carbon-design-system/ibm-products/commit/29ac82a27ca801e2615b147c730a15b88a20724d))
* breadcrumb overflow z-index ([#1769](https://github.com/carbon-design-system/ibm-products/issues/1769)) ([662adfa](https://github.com/carbon-design-system/ibm-products/commit/662adfa5d6ad95839b8dcdded4ca369e144d0d60))
* edit sidepanel footer align issue ([#1751](https://github.com/carbon-design-system/ibm-products/issues/1751)) ([13098ed](https://github.com/carbon-design-system/ibm-products/commit/13098ede436a711dcefd41f6f06d7a1e008f35d7))
* **InlineEdit:** test coverage update ([#1772](https://github.com/carbon-design-system/ibm-products/issues/1772)) ([dd5f5b4](https://github.com/carbon-design-system/ibm-products/commit/dd5f5b493ff05a790dda1df2f468ea5f37f10459))
* **PageHeader:** test coverage ([#1773](https://github.com/carbon-design-system/ibm-products/issues/1773)) ([7e36775](https://github.com/carbon-design-system/ibm-products/commit/7e367751f850c92ad8272f0dc0efa8ed03cc4b63))
* **PageHeader:** various fixes ([#1761](https://github.com/carbon-design-system/ibm-products/issues/1761)) ([30e90b5](https://github.com/carbon-design-system/ibm-products/commit/30e90b51d0b91d0d5a6909295c769fa09d5735c7))
* **SidePanel:** .bx replace with #{$carbon-prefix} ([#1760](https://github.com/carbon-design-system/ibm-products/issues/1760)) ([1044685](https://github.com/carbon-design-system/ibm-products/commit/1044685a20f55c7871d88af9050609e75a38dde3))


### Features

* add inline edit tip position ([#1730](https://github.com/carbon-design-system/ibm-products/issues/1730)) ([9985b94](https://github.com/carbon-design-system/ibm-products/commit/9985b94f975f16f661fe07d54093492b8fdf3972))
* **DataSpreadsheet:** [#1703](https://github.com/carbon-design-system/ibm-products/issues/1703) add spreadsheet row/column selections ([#1777](https://github.com/carbon-design-system/ibm-products/issues/1777)) ([81e1bc5](https://github.com/carbon-design-system/ibm-products/commit/81e1bc5942b71f7c5d3d725cf54b60a8ee7ad4b9))
* **DataSpreadsheet:** add cell editing ([#1755](https://github.com/carbon-design-system/ibm-products/issues/1755)) ([349c9f1](https://github.com/carbon-design-system/ibm-products/commit/349c9f1b5fc25f2961fbfcd7961022cef114fdda))





# [1.10.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.9.0...@carbon/ibm-products@1.10.0) (2022-03-08)


### Bug Fixes

* add select multi select filtering ([#1714](https://github.com/carbon-design-system/ibm-products/issues/1714)) ([7c4b469](https://github.com/carbon-design-system/ibm-products/commit/7c4b469fb3c40f3601dd6c46a65be2e7618700db))
* **DataSpreadsheet:** prevent check on coords that do not exist ([#1716](https://github.com/carbon-design-system/ibm-products/issues/1716)) ([236fcfc](https://github.com/carbon-design-system/ibm-products/commit/236fcfccc557342a2a736d7418cd59449b4d089e))
* move show all modal to document body ([#1747](https://github.com/carbon-design-system/ibm-products/issues/1747)) ([b94e75d](https://github.com/carbon-design-system/ibm-products/commit/b94e75d7e11fa1338871c7d8a1aab4a96be568c0))
* **options-tile:** fix summary behaviour ([#1726](https://github.com/carbon-design-system/ibm-products/issues/1726)) ([1c0aa1a](https://github.com/carbon-design-system/ibm-products/commit/1c0aa1a255e67e2544b3b443860d31e8a43509f7))
* remove reserved space for invalid icon ([#1710](https://github.com/carbon-design-system/ibm-products/issues/1710)) ([5590ce7](https://github.com/carbon-design-system/ibm-products/commit/5590ce7e7b0ccb510f32bdc24b910e785760d063))
* SidePanel (enhancement): mobile responsiveness of panels ([#1735](https://github.com/carbon-design-system/ibm-products/issues/1735)) ([6a5d94a](https://github.com/carbon-design-system/ibm-products/commit/6a5d94a5856c27230574c49dcceb23a0a7afc6a3))
* update Carbon versions to latest ([#1733](https://github.com/carbon-design-system/ibm-products/issues/1733)) ([9783faa](https://github.com/carbon-design-system/ibm-products/commit/9783faac23d8f03598ef0e5994743c4c5f915705))
* **UserProfileImage:** fix tooltip version of user profile image ([#1745](https://github.com/carbon-design-system/ibm-products/issues/1745)) ([b89c73a](https://github.com/carbon-design-system/ibm-products/commit/b89c73aa92598ad39b3436c77a973e999a50bec8))


### Features

* **DataSpreadsheet:** [#1704](https://github.com/carbon-design-system/ibm-products/issues/1704) add spreadsheet shift click behavior ([#1723](https://github.com/carbon-design-system/ibm-products/issues/1723)) ([3126859](https://github.com/carbon-design-system/ibm-products/commit/312685957a08fc4bf7f8aec530520a2c9a685ec3))
* **DataSpreadsheet:** [#1731](https://github.com/carbon-design-system/ibm-products/issues/1731) add active highlight to column/row headers ([#1744](https://github.com/carbon-design-system/ibm-products/issues/1744)) ([3bac3f9](https://github.com/carbon-design-system/ibm-products/commit/3bac3f9924a29c4d20ddf8a9f7f619597578db6a))
* **DataSpreadsheet:** add keyboard support to cell selections ([#1719](https://github.com/carbon-design-system/ibm-products/issues/1719)) ([812ade5](https://github.com/carbon-design-system/ibm-products/commit/812ade5669136cd73670566d079a8be5a1159ea8))
* **DataSpreadsheet:** highlight row/column header on active cell change ([#1732](https://github.com/carbon-design-system/ibm-products/issues/1732)) ([b828e9b](https://github.com/carbon-design-system/ibm-products/commit/b828e9b809bf9349e473830a29c9aef70df1cd08))
* **DataSpreadsheet:** remove cell selection in certain case ([#1706](https://github.com/carbon-design-system/ibm-products/issues/1706)) ([712ac00](https://github.com/carbon-design-system/ibm-products/commit/712ac00e60151b101fc9375e21bb80c4b28f28f7))
* **PageHeader:** prevent breadcrumb scroll by default ([#1748](https://github.com/carbon-design-system/ibm-products/issues/1748)) ([4179840](https://github.com/carbon-design-system/ibm-products/commit/41798401e3625a0850612819573d60010b6a3a32))
* **TagSet:** add allTagsModalTarget prop ([#1749](https://github.com/carbon-design-system/ibm-products/issues/1749)) ([69c3a20](https://github.com/carbon-design-system/ibm-products/commit/69c3a204dda1962d08ad91fab5bf9adde37e2a27))





# [1.9.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.8.0...@carbon/ibm-products@1.9.0) (2022-03-01)


### Bug Fixes

* adds mutli select hierarchy support ([#1659](https://github.com/carbon-design-system/ibm-products/issues/1659)) ([743938b](https://github.com/carbon-design-system/ibm-products/commit/743938b26215859c345b1d26b86e3a2fcc8fe6d5))
* Using padding instead of margin to prevent border to being cut ([#1683](https://github.com/carbon-design-system/ibm-products/issues/1683)) ([991f865](https://github.com/carbon-design-system/ibm-products/commit/991f8657c19fe19d2797ae731970d4272f4aada0))


### Features

* **DataSpreadsheet:** [#1674](https://github.com/carbon-design-system/ibm-products/issues/1674) add support for cell selection areas ([#1689](https://github.com/carbon-design-system/ibm-products/issues/1689)) ([6c5bf94](https://github.com/carbon-design-system/ibm-products/commit/6c5bf948249cf9a3e97120d8ab068793c308aeba))
* **InlineEdit:** add cancel on use of escape key ([#1679](https://github.com/carbon-design-system/ibm-products/issues/1679)) ([fee29cd](https://github.com/carbon-design-system/ibm-products/commit/fee29cda483a8a54fea29e05aeda11254ff024b1))
* match design for edit button visibility ([#1676](https://github.com/carbon-design-system/ibm-products/issues/1676)) ([ba88bf9](https://github.com/carbon-design-system/ibm-products/commit/ba88bf97f3c431187bd5bd28c6cebcbc938e57fa))





# [1.8.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.7.0...@carbon/ibm-products@1.8.0) (2022-02-22)


### Bug Fixes

* inline edit placeholder blocking input click ([#1675](https://github.com/carbon-design-system/ibm-products/issues/1675)) ([277c133](https://github.com/carbon-design-system/ibm-products/commit/277c133f5dfcf91ab20df52bb798b7266974b8c8))
* make inline edit story validation more robust ([#1678](https://github.com/carbon-design-system/ibm-products/issues/1678)) ([75d7628](https://github.com/carbon-design-system/ibm-products/commit/75d762859d34628e1afd62428ffd6e8ff533eda3))


### Features

* **DataSpreadsheet:** [#1652](https://github.com/carbon-design-system/ibm-products/issues/1652) spreadsheet keyboard active cell ([#1663](https://github.com/carbon-design-system/ibm-products/issues/1663)) ([c64b953](https://github.com/carbon-design-system/ibm-products/commit/c64b95312ee1ea863e396b3021c8c75c2eed5fc2))
* **DataSpreadsheet:** data spreadsheet active cell ([#1648](https://github.com/carbon-design-system/ibm-products/issues/1648)) ([902cc03](https://github.com/carbon-design-system/ibm-products/commit/902cc039935f6b962aa5601427db1adda3da896a))





# [1.7.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.6.1...@carbon/ibm-products@1.7.0) (2022-02-16)


### Bug Fixes

* adds remove item from add select sidebar ([#1639](https://github.com/carbon-design-system/ibm-products/issues/1639)) ([f061a4c](https://github.com/carbon-design-system/ibm-products/commit/f061a4c84071b4afbd16ee83d829f6446538a2d5))
* avoid relying on defaultProps in carbon components ([#1645](https://github.com/carbon-design-system/ibm-products/issues/1645)) ([85718dc](https://github.com/carbon-design-system/ibm-products/commit/85718dc0b7b8aff8e73b2e36b5e64e13ea773539))
* **Tearsheet:** replace useLayoutEffect with useEffect (issue [#1640](https://github.com/carbon-design-system/ibm-products/issues/1640)) ([#1647](https://github.com/carbon-design-system/ibm-products/issues/1647)) ([f05f92e](https://github.com/carbon-design-system/ibm-products/commit/f05f92e819d300ee60d3da04a21f61b0c4563a9c))


### Features

* **DataSpreadsheet:** add initial component ([#1606](https://github.com/carbon-design-system/ibm-products/issues/1606)) ([331a087](https://github.com/carbon-design-system/ibm-products/commit/331a08757d0715aea156027e4f62772febdcf059))
* **InlineEdit:** add validation ([#1641](https://github.com/carbon-design-system/ibm-products/issues/1641)) ([7e75fad](https://github.com/carbon-design-system/ibm-products/commit/7e75fadd9ebac18da0faf791ab70582f11418bcc))
* update Carbon versions to latest ([#1646](https://github.com/carbon-design-system/ibm-products/issues/1646)) ([e323739](https://github.com/carbon-design-system/ibm-products/commit/e323739ac9a6155aa0fddf39b13e4440d04117fc))





## [1.6.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.6.0...@carbon/ibm-products@1.6.1) (2022-02-15)


### Bug Fixes

* add select sidebar flatten ([#1619](https://github.com/carbon-design-system/ibm-products/issues/1619)) ([c95ea64](https://github.com/carbon-design-system/ibm-products/commit/c95ea64397e0bd9d0671f6261301837672f17f08))
* **EmptyState:** make subtitle optional ([#1620](https://github.com/carbon-design-system/ibm-products/issues/1620)) ([508182a](https://github.com/carbon-design-system/ibm-products/commit/508182a01d469817d07e487664adc6fb21270abc)), closes [#1605](https://github.com/carbon-design-system/ibm-products/issues/1605) [#1605](https://github.com/carbon-design-system/ibm-products/issues/1605)
* inline edit validation presentation ([#1622](https://github.com/carbon-design-system/ibm-products/issues/1622)) ([7fdafcb](https://github.com/carbon-design-system/ibm-products/commit/7fdafcbafac59b144278363cc358913eb91cc77d))
* **PageHeader:** Page header title edit transition ([#1601](https://github.com/carbon-design-system/ibm-products/issues/1601)) ([e7fd2a7](https://github.com/carbon-design-system/ibm-products/commit/e7fd2a76077c3512ffdae29bcf7c467230c0e8f5))





# [1.6.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.5.0...@carbon/ibm-products@1.6.0) (2022-02-09)


### Bug Fixes

* adds nested lists ([#1591](https://github.com/carbon-design-system/ibm-products/issues/1591)) ([c091c55](https://github.com/carbon-design-system/ibm-products/commit/c091c5505c1143f0e506af2c29b48de99cdd8dc9))
* adds selection functionality to add select ([#1579](https://github.com/carbon-design-system/ibm-products/issues/1579)) ([1b5b624](https://github.com/carbon-design-system/ibm-products/commit/1b5b62422563d3909a8f30683cf7611fa630af28))
* **AddSelect:** refactor custom filter and init navigation ([#1583](https://github.com/carbon-design-system/ibm-products/issues/1583)) ([8d53206](https://github.com/carbon-design-system/ibm-products/commit/8d53206c8627151d22565631aad8369d721e4af8))
* breakup add select into multiple components ([#1602](https://github.com/carbon-design-system/ibm-products/issues/1602)) ([2a271ff](https://github.com/carbon-design-system/ibm-products/commit/2a271ff6b18e776cc5bcae8d5f963f9ce049c634))
* **PageHeader:** title without breadcrumb and action bar remains visible on scroll ([#1562](https://github.com/carbon-design-system/ibm-products/issues/1562)) ([1b62c0b](https://github.com/carbon-design-system/ibm-products/commit/1b62c0b9890ce00107dff2e465bda072f8c4e6c8))
* productive card button size and props spread ([#1581](https://github.com/carbon-design-system/ibm-products/issues/1581)) ([a33b3d8](https://github.com/carbon-design-system/ibm-products/commit/a33b3d896b010a8305ad9b27e17fa733af7ce7c6))
* update Carbon versions to latest ([#1587](https://github.com/carbon-design-system/ibm-products/issues/1587)) ([d4b5ccc](https://github.com/carbon-design-system/ibm-products/commit/d4b5cccd9ef4a9df2966063c21f49fe7810245a8))
* update stylelint to latest version ([#1597](https://github.com/carbon-design-system/ibm-products/issues/1597)) ([13d8f9e](https://github.com/carbon-design-system/ibm-products/commit/13d8f9eb2885e687ba23f66b019a5629fffa2a85))


### Features

* **NotificationsPanel:** support reduced motion ([#1598](https://github.com/carbon-design-system/ibm-products/issues/1598)) ([f614e52](https://github.com/carbon-design-system/ibm-products/commit/f614e52216fb44769250e60d1a6cb17cc68b7f88))
* **SidePanel:** add prefers-reduced-motion support for SidePanel animations ([#1586](https://github.com/carbon-design-system/ibm-products/issues/1586)) ([8e53e1b](https://github.com/carbon-design-system/ibm-products/commit/8e53e1b8ba8a0ae75434a78714d1647d1452c4c3))





# [1.5.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.4.0...@carbon/ibm-products@1.5.0) (2022-02-01)


### Bug Fixes

* remove changes to security snapshot ([#1569](https://github.com/carbon-design-system/ibm-products/issues/1569)) ([efa0557](https://github.com/carbon-design-system/ibm-products/commit/efa0557cb886f57414b65fad2cf6e090bc0aaa7d))
* **Tearsheet,SidePanel:** enable danger button kinds as actions ([#1572](https://github.com/carbon-design-system/ibm-products/issues/1572)) ([9b0acc9](https://github.com/carbon-design-system/ibm-products/commit/9b0acc96ac16eea4085e559f30b184af5e593631))


### Features

* **CreateTearsheet/FullPage:** [#1538](https://github.com/carbon-design-system/ibm-products/issues/1538) add support for dynamic steps ([#1576](https://github.com/carbon-design-system/ibm-products/issues/1576)) ([cdd0880](https://github.com/carbon-design-system/ibm-products/commit/cdd0880e2bdf07e488c7bd74c60b1dd2b44d2dc0))
* password input option for export modal ([#1574](https://github.com/carbon-design-system/ibm-products/issues/1574)) ([d5384da](https://github.com/carbon-design-system/ibm-products/commit/d5384da13e69ec6566ffff720f0616f116521e4a))





# [1.4.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.3.0...@carbon/ibm-products@1.4.0) (2022-01-25)


### Bug Fixes

* fixes for modal focus ([#1552](https://github.com/carbon-design-system/ibm-products/issues/1552)) ([cc23b0f](https://github.com/carbon-design-system/ibm-products/commit/cc23b0f6b87d082239f013020410e2af534441d0))
* issue1508 ([#1557](https://github.com/carbon-design-system/ibm-products/issues/1557)) ([f08ed89](https://github.com/carbon-design-system/ibm-products/commit/f08ed89216edf6aaccf446abf1da45f0d5cc00ed))
* Prevent id duplication in page header ([#1537](https://github.com/carbon-design-system/ibm-products/issues/1537)) ([dff0887](https://github.com/carbon-design-system/ibm-products/commit/dff088791920c32f52ae7d915076b0af2ffb5828))
* Rework breadcrumb back button ([#1545](https://github.com/carbon-design-system/ibm-products/issues/1545)) ([46fcfc2](https://github.com/carbon-design-system/ibm-products/commit/46fcfc2db159613afff049d74f8afc49c58aed07))


### Features

* add new step tracking approach allowing for custom steps ([#1524](https://github.com/carbon-design-system/ibm-products/issues/1524)) ([a4b44f5](https://github.com/carbon-design-system/ibm-products/commit/a4b44f5d1b0f99c2ed5fcbf3314c2e96c61c5aef))
* add search filter to add select ([#1547](https://github.com/carbon-design-system/ibm-products/issues/1547)) ([96a1874](https://github.com/carbon-design-system/ibm-products/commit/96a1874bfe6343620175c5de4ba40c6000bd2c68))
* initial inline edit to page-header ([#1533](https://github.com/carbon-design-system/ibm-products/issues/1533)) ([dffbba6](https://github.com/carbon-design-system/ibm-products/commit/dffbba6a761237a3fa1aa92d8f3b07c8de88fe0d))
* **OptionsTile:** add open prop ([#1534](https://github.com/carbon-design-system/ibm-products/issues/1534)) ([e99d208](https://github.com/carbon-design-system/ibm-products/commit/e99d2081a4d7986030878092e890ebe158e26691)), closes [#1521](https://github.com/carbon-design-system/ibm-products/issues/1521) [#1521](https://github.com/carbon-design-system/ibm-products/issues/1521)
* split addselect into multiple exports ([#1542](https://github.com/carbon-design-system/ibm-products/issues/1542)) ([b9de902](https://github.com/carbon-design-system/ibm-products/commit/b9de9024b7e5e422119fc90ef0258a1314a62124))
* **toolbar:** add keyboard accessibility ([#1514](https://github.com/carbon-design-system/ibm-products/issues/1514)) ([709c10a](https://github.com/carbon-design-system/ibm-products/commit/709c10afaf0845aa8209ad7dffc598e1f9ce12e6))





# [1.3.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.2.5...@carbon/ibm-products@1.3.0) (2022-01-18)


### Features

* add select component init ([#1523](https://github.com/carbon-design-system/ibm-products/issues/1523)) ([3c61353](https://github.com/carbon-design-system/ibm-products/commit/3c613539ce6334be13dbf2b5d09b5f7b73f87a20))





## [1.2.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.2.4...@carbon/ibm-products@1.2.5) (2022-01-11)


### Bug Fixes

* update Carbon versions and package dependencies to latest ([#1513](https://github.com/carbon-design-system/ibm-products/issues/1513)) ([505ba0e](https://github.com/carbon-design-system/ibm-products/commit/505ba0e13ec58bef19422835fd8ffee87c24e82a))
* update Carbon versions and package dependencies to latest ([#1518](https://github.com/carbon-design-system/ibm-products/issues/1518)) ([3ddcdf6](https://github.com/carbon-design-system/ibm-products/commit/3ddcdf6617e0d7c9f182da91e3eb0935b34cbc05))





## [1.2.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.2.3...@carbon/ibm-products@1.2.4) (2022-01-04)


### Bug Fixes

* update Carbon versions and package dependencies to latest ([#1509](https://github.com/carbon-design-system/ibm-products/issues/1509)) ([613db81](https://github.com/carbon-design-system/ibm-products/commit/613db817bffec2c5b26b1fe50a337dd7bac5d963))





## [1.2.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.2.2...@carbon/ibm-products@1.2.3) (2021-12-21)


### Bug Fixes

* **PageHeader:** adjust CSS for clarity and to avoid webpack reordering glitch ([#1498](https://github.com/carbon-design-system/ibm-products/issues/1498)) ([48b48c2](https://github.com/carbon-design-system/ibm-products/commit/48b48c214c202a78846519767c3a41a7d661c771))
* update Carbon versions and package dependencies to latest ([#1499](https://github.com/carbon-design-system/ibm-products/issues/1499)) ([8aed3d5](https://github.com/carbon-design-system/ibm-products/commit/8aed3d53d06cc896984e6847c0450cc647e34041))





## [1.2.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.2.1...@carbon/ibm-products@1.2.2) (2021-12-14)


### Bug Fixes

* update Carbon versions and package dependencies to latest ([#1493](https://github.com/carbon-design-system/ibm-products/issues/1493)) ([91b8238](https://github.com/carbon-design-system/ibm-products/commit/91b82383e0aa74383ebb81f625a9e7b870f06c00))





## [1.2.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.2.0...@carbon/ibm-products@1.2.1) (2021-12-07)


### Bug Fixes

* update Carbon versions and package dependencies to latest ([#1491](https://github.com/carbon-design-system/ibm-products/issues/1491)) ([45f7b77](https://github.com/carbon-design-system/ibm-products/commit/45f7b77f797c5841b9dc15bc3013f31e50244d29))





# [1.2.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.1.0...@carbon/ibm-products@1.2.0) (2021-12-03)


### Bug Fixes

* **Tearsheet:** don't apply modal 80% width limit to influencer content ([#1482](https://github.com/carbon-design-system/ibm-products/issues/1482)) ([ee87da6](https://github.com/carbon-design-system/ibm-products/commit/ee87da6b938c06e11a8928a68fef19799b36bd2d))


### Features

* adds svg support to buttons in productive card ([#1481](https://github.com/carbon-design-system/ibm-products/issues/1481)) ([8722de8](https://github.com/carbon-design-system/ibm-products/commit/8722de80fc775cfb675da12110e4efb373253a60))
* icon href support for cards ([#1487](https://github.com/carbon-design-system/ibm-products/issues/1487)) ([173016e](https://github.com/carbon-design-system/ibm-products/commit/173016e4894820d49a1b07a573d3ce08412617c6))





# [1.1.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@1.0.1...@carbon/ibm-products@1.1.0) (2021-11-30)


### Features

* **pageHeader:** rename property to withoutBackground following design review ([#1455](https://github.com/carbon-design-system/ibm-products/issues/1455)) ([91ab444](https://github.com/carbon-design-system/ibm-products/commit/91ab444b757cc03b07a7b58bdbbb4cf2a49b74f4))
* update Carbon versions and dependencies to latest ([#1473](https://github.com/carbon-design-system/ibm-products/issues/1473)) ([9cafbea](https://github.com/carbon-design-system/ibm-products/commit/9cafbea95226c46ff1732f9ad6b22c9c8837616e))





## [1.0.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@0.99.1...@carbon/ibm-products@1.0.1) (2021-11-23)


### Bug Fixes

* page header withotu background shadow ([#1457](https://github.com/carbon-design-system/ibm-products/issues/1457)) ([fa4df10](https://github.com/carbon-design-system/ibm-products/commit/fa4df103451adcb411e61a08c923c717bd9520be))
* **PageHeader:** user defined page action space ([#1470](https://github.com/carbon-design-system/ibm-products/issues/1470)) ([e9f79e9](https://github.com/carbon-design-system/ibm-products/commit/e9f79e95da701b2064cca5ab5f56be93b8510a1b))





# [1.0.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-products@0.99.1...@carbon/ibm-products@1.0.0) (2021-11-18)


### Bug Fixes

* page header withotu background shadow ([#1457](https://github.com/carbon-design-system/ibm-products/issues/1457)) ([fa4df10](https://github.com/carbon-design-system/ibm-products/commit/fa4df103451adcb411e61a08c923c717bd9520be))





## 0.99.1 (2021-11-18)


### Bug Fixes

* **about-modal:** align copyright and legal text color with design ([#1038](https://github.com/carbon-design-system/ibm-products/issues/1038)) ([6dbd605](https://github.com/carbon-design-system/ibm-products/commit/6dbd605aca7f6bc0218f5a5489d2c657399f2dc0))
* **about-modal:** prevent `p` browser defaults with no CSS reset ([#1034](https://github.com/carbon-design-system/ibm-products/issues/1034)) ([cf0ae3a](https://github.com/carbon-design-system/ibm-products/commit/cf0ae3a5a20295c6889b20d1023d6334b8482f6d))
* action bar crash when no space for overflow ([#556](https://github.com/carbon-design-system/ibm-products/issues/556)) ([74d1718](https://github.com/carbon-design-system/ibm-products/commit/74d1718771dffb434512905a4c5ab2ed518a9a35))
* **ActionSet:** ensure action set buttons have max width none ([#859](https://github.com/carbon-design-system/ibm-products/issues/859)) ([5aba160](https://github.com/carbon-design-system/ibm-products/commit/5aba1609193c241d86d2a2cda99ae6dfc6f43717))
* add interactive tag styling to overflow tag in TagSet ([#1022](https://github.com/carbon-design-system/ibm-products/issues/1022)) ([ae5c656](https://github.com/carbon-design-system/ibm-products/commit/ae5c656c88703a5ec50cb6bcad8541c00a78f737))
* add side effect for props-helper to package.json ([#1434](https://github.com/carbon-design-system/ibm-products/issues/1434)) ([f9f6a65](https://github.com/carbon-design-system/ibm-products/commit/f9f6a656f4e1e563460a8b4159b9c13c26101a06))
* add tag set tests n tidy ([#642](https://github.com/carbon-design-system/ibm-products/issues/642)) ([cfeeaf9](https://github.com/carbon-design-system/ibm-products/commit/cfeeaf943fe0bb70d543e962cb51e3303c6debb4))
* add tests to PageActionItem ([#516](https://github.com/carbon-design-system/ibm-products/issues/516)) ([f1e5de2](https://github.com/carbon-design-system/ibm-products/commit/f1e5de288720be43f411b173486b5ed5ebe33759))
* added additional apikeymodal tests ([#1098](https://github.com/carbon-design-system/ibm-products/issues/1098)) ([e680415](https://github.com/carbon-design-system/ibm-products/commit/e680415bbf998584910eb9ed92eff62a71913ebe))
* added additional import modal tests ([#673](https://github.com/carbon-design-system/ibm-products/issues/673)) ([f6a9a2f](https://github.com/carbon-design-system/ibm-products/commit/f6a9a2fba7519415eb5df0b3e8485c5e6bd8c6b4))
* added button icon props for cards ([#1336](https://github.com/carbon-design-system/ibm-products/issues/1336)) ([4974632](https://github.com/carbon-design-system/ibm-products/commit/4974632c7e5e691e16749a4935da2753148bfbb8))
* added sideEffects field to package.json ([#1251](https://github.com/carbon-design-system/ibm-products/issues/1251)) ([a54554b](https://github.com/carbon-design-system/ibm-products/commit/a54554b8b8b940e9049ad8dcca481dec6f54c354))
* added testing for export release review ([#635](https://github.com/carbon-design-system/ibm-products/issues/635)) ([eff717e](https://github.com/carbon-design-system/ibm-products/commit/eff717e88c024fc671ece9d8963924e5495772a0))
* adds additional check for copy ([#1258](https://github.com/carbon-design-system/ibm-products/issues/1258)) ([b69cca1](https://github.com/carbon-design-system/ibm-products/commit/b69cca1314e2cca7d99351fa7f91069687d64b72))
* adds and improves testing to several components ([#649](https://github.com/carbon-design-system/ibm-products/issues/649)) ([b336afa](https://github.com/carbon-design-system/ibm-products/commit/b336afac9a9c8f730393a38e53f1d383911c36f3))
* adds tests and updates docs for saving ([#591](https://github.com/carbon-design-system/ibm-products/issues/591)) ([d873051](https://github.com/carbon-design-system/ibm-products/commit/d8730510c08edd79f3b70a15a7fc4c323f684175))
* apikey modal pre release updates ([#906](https://github.com/carbon-design-system/ibm-products/issues/906)) ([6ae80e4](https://github.com/carbon-design-system/ibm-products/commit/6ae80e4ba115acb0ed534ccdf5efe6faa15f80e5))
* apikey story fix ([#1081](https://github.com/carbon-design-system/ibm-products/issues/1081)) ([a225b3a](https://github.com/carbon-design-system/ibm-products/commit/a225b3a291734d1d29d564708ae267aa4a202134))
* available space dep and copyright ([#1039](https://github.com/carbon-design-system/ibm-products/issues/1039)) ([e6e9a42](https://github.com/carbon-design-system/ibm-products/commit/e6e9a4222ec6f9920689b5cd74fbf03b27430781))
* back arrow tooltip ([#778](https://github.com/carbon-design-system/ibm-products/issues/778)) ([b7c6dde](https://github.com/carbon-design-system/ibm-products/commit/b7c6dde284bb681ebcfc1474738b9280ecab82ed))
* better warnings when deprecated-usage props have invalid values ([#1198](https://github.com/carbon-design-system/ibm-products/issues/1198)) ([6ec8777](https://github.com/carbon-design-system/ibm-products/commit/6ec8777b66b4f45d47ed1060051b8bf9ec8692d8))
* breadcrumb overflow in page header ([#880](https://github.com/carbon-design-system/ibm-products/issues/880)) ([fa71aa3](https://github.com/carbon-design-system/ibm-products/commit/fa71aa39c4666efadb47c02fd85c6bfe97515284))
* breadcrumb styling ([#723](https://github.com/carbon-design-system/ibm-products/issues/723)) ([65ac371](https://github.com/carbon-design-system/ibm-products/commit/65ac371a0f48406acb1d6193dd9a45cefa8f9a57))
* button and tag set block class errors ([#879](https://github.com/carbon-design-system/ibm-products/issues/879)) ([d26966d](https://github.com/carbon-design-system/ibm-products/commit/d26966dee8ef21d002c3d524914a1d2f8ff31818))
* card design feedback ([#561](https://github.com/carbon-design-system/ibm-products/issues/561)) ([7668278](https://github.com/carbon-design-system/ibm-products/commit/76682786f4422cf9267a84b7e6f1409043758537))
* card refactor to multiple exports ([#949](https://github.com/carbon-design-system/ibm-products/issues/949)) ([e60fa76](https://github.com/carbon-design-system/ibm-products/commit/e60fa76963b3027aafa4a8a87e188c9dd5ab54b0))
* card updates ([#1013](https://github.com/carbon-design-system/ibm-products/issues/1013)) ([2e14d8e](https://github.com/carbon-design-system/ibm-products/commit/2e14d8e101f73e8dfb9518c783e282c2365ef850))
* cascade release ([#1242](https://github.com/carbon-design-system/ibm-products/issues/1242)) ([144af3f](https://github.com/carbon-design-system/ibm-products/commit/144af3f2c9a32b9621418e505ae3e5df9428fdc8))
* contributors ([#960](https://github.com/carbon-design-system/ibm-products/issues/960)) ([02966c3](https://github.com/carbon-design-system/ibm-products/commit/02966c30bf253a4bf4eb601fd928d1970c55a76f))
* **CreateFullPage:** explicitly set bg color for page content ([#1249](https://github.com/carbon-design-system/ibm-products/issues/1249)) ([776d2d3](https://github.com/carbon-design-system/ibm-products/commit/776d2d35a4549815312f5b3a89be2da045271eee))
* **CreateModal:** ensure closing the modal calls onRequestClose handler ([#1147](https://github.com/carbon-design-system/ibm-products/issues/1147)) ([73cd1a4](https://github.com/carbon-design-system/ibm-products/commit/73cd1a4e99d6ad5da326b0509f115268b5696a55))
* **CreateSidePanel:** design fixes and side panel header/scrolling work ([#1141](https://github.com/carbon-design-system/ibm-products/issues/1141)) ([be67abc](https://github.com/carbon-design-system/ibm-products/commit/be67abc89964816d447d3f0c24cbc0fcbaf61c6f))
* **CreateSidePanel:** scoping issue for create side panel ([#1303](https://github.com/carbon-design-system/ibm-products/issues/1303)) ([3a198ea](https://github.com/carbon-design-system/ibm-products/commit/3a198eaf807af9401885c6b7841de65ce39b88e6))
* **CreateSidePanel:** title and subtitle padding is correct now ([#1080](https://github.com/carbon-design-system/ibm-products/issues/1080)) ([9fcbe91](https://github.com/carbon-design-system/ibm-products/commit/9fcbe9185c403f2b8bc76f79ed3b687ada9da254))
* **CreateTearsheet:** [#987](https://github.com/carbon-design-system/ibm-products/issues/987) create tearsheet resizing ([#988](https://github.com/carbon-design-system/ibm-products/issues/988)) ([5f3550e](https://github.com/carbon-design-system/ibm-products/commit/5f3550ef12665cef85b13409d438b312cb72e50b))
* **CreateTearsheet:** add grid usage to step component and storybook ([#1214](https://github.com/carbon-design-system/ibm-products/issues/1214)) ([8f49008](https://github.com/carbon-design-system/ibm-products/commit/8f490080cda913bc099a03b1e4bd97ecd93b394c))
* **CreateTearsheet:** allow progress steps to receive a secondary label ([#945](https://github.com/carbon-design-system/ibm-products/issues/945)) ([ff0ba7f](https://github.com/carbon-design-system/ibm-products/commit/ff0ba7fb442e879541dbb268bc6c5ba3eff46786))
* **CreateTearsheet:** fix console error in tests from timeout issue ([#793](https://github.com/carbon-design-system/ibm-products/issues/793)) ([18cab39](https://github.com/carbon-design-system/ibm-products/commit/18cab399c921972d5b8b3eb90222f1a744a53a54))
* **CreateTearsheet:** import components together ([#856](https://github.com/carbon-design-system/ibm-products/issues/856)) ([65e23ad](https://github.com/carbon-design-system/ibm-products/commit/65e23adfe83c9f9652e60e00cdd19e2a696a7f32))
* **CreateTearsheetNarrow:** add tests and address onRequestClose issue ([#1143](https://github.com/carbon-design-system/ibm-products/issues/1143)) ([87ed826](https://github.com/carbon-design-system/ibm-products/commit/87ed826da64825cf7f1a3f860baed4cbae1b8a54))
* **CreateTearsheet:** remove grid margin ([#1170](https://github.com/carbon-design-system/ibm-products/issues/1170)) ([75bfb54](https://github.com/carbon-design-system/ibm-products/commit/75bfb5462ec364d86970fc142a99b91d0c5a185b))
* **CreateTearsheet:** remove overflow styles ([#924](https://github.com/carbon-design-system/ibm-products/issues/924)) ([369329a](https://github.com/carbon-design-system/ibm-products/commit/369329a34cd3ea45ae8e4c21938d358a78fd92cb))
* **CreateTearsheet:** stories should receive args as expected now ([#1099](https://github.com/carbon-design-system/ibm-products/issues/1099)) ([ec43a08](https://github.com/carbon-design-system/ibm-products/commit/ec43a0891c472a554228bd2bc11bb83a0fa090ce))
* **CreateTearsheet:** story component updates ([#1091](https://github.com/carbon-design-system/ibm-products/issues/1091)) ([62f7fbc](https://github.com/carbon-design-system/ibm-products/commit/62f7fbc0b0c4d62d68cbaf288bbd5ae0170a4605))
* **CreateTearsheet:** toggle spacing is correct now ([#1025](https://github.com/carbon-design-system/ibm-products/issues/1025)) ([a662106](https://github.com/carbon-design-system/ibm-products/commit/a6621069d2a08c620f96c20aad4aaf431c8061bf))
* **CreateTearsheet:** updates based on release review ([#1233](https://github.com/carbon-design-system/ibm-products/issues/1233)) ([f50e78a](https://github.com/carbon-design-system/ibm-products/commit/f50e78ab7f7a6b12d14b779954cad5ef4f91f6eb))
* **CreateTearsheet:** use default button separator color variable ([#802](https://github.com/carbon-design-system/ibm-products/issues/802)) ([8594e69](https://github.com/carbon-design-system/ibm-products/commit/8594e69852c746b6108b778cdc88b7b56fbd6838))
* desdign review niggles ([#765](https://github.com/carbon-design-system/ibm-products/issues/765)) ([46a353b](https://github.com/carbon-design-system/ibm-products/commit/46a353b8ba9f30657f1b7cd3808a978e5cc3869c))
* **EmptyState:** fix error logs by not having defaults for shared props ([#535](https://github.com/carbon-design-system/ibm-products/issues/535)) ([3de7429](https://github.com/carbon-design-system/ibm-products/commit/3de7429a8bb841c97df37d2711bc4a97f0241064))
* **EmptyStates:** give svg elements unique ids to avoid display issues ([#1290](https://github.com/carbon-design-system/ibm-products/issues/1290)) ([72deea8](https://github.com/carbon-design-system/ibm-products/commit/72deea83d493930ba03ee938c4aa1f588662407f))
* **EmptyStates:** update stories and rename size prop ([#753](https://github.com/carbon-design-system/ibm-products/issues/753)) ([c5e6bfb](https://github.com/carbon-design-system/ibm-products/commit/c5e6bfb912b5d8bc2ab143df87f2b615f35939ac))
* ensure internal components don't render as canary placeholders ([#1167](https://github.com/carbon-design-system/ibm-products/issues/1167)) ([0b557b6](https://github.com/carbon-design-system/ibm-products/commit/0b557b6163692e796058e7d2bc3b991d019b62d9))
* Ensure PageActions can be clicked, on scroll ([#1347](https://github.com/carbon-design-system/ibm-products/issues/1347)) ([96183e2](https://github.com/carbon-design-system/ibm-products/commit/96183e2d1e54ef9f8b6b110fdfb731cac737c181))
* Ensure SCSS for all components and stories sets required carbon and project settings ([#1166](https://github.com/carbon-design-system/ibm-products/issues/1166)) ([5c77105](https://github.com/carbon-design-system/ibm-products/commit/5c77105891df498f26d3f8f6214f8d7f7fa68267))
* export cards ([#1120](https://github.com/carbon-design-system/ibm-products/issues/1120)) ([7227aeb](https://github.com/carbon-design-system/ibm-products/commit/7227aebcc0c31c2f9a3076692c5a3b3913a6a2e0))
* fixes card href support ([#1353](https://github.com/carbon-design-system/ibm-products/issues/1353)) ([30a89cb](https://github.com/carbon-design-system/ibm-products/commit/30a89cb682189f2844a3d36c88bf9f40b3e33532))
* forgot to add onclose to export modal ([#776](https://github.com/carbon-design-system/ibm-products/issues/776)) ([c381d93](https://github.com/carbon-design-system/ibm-products/commit/c381d93e123c33a600e7bf8dee0f3fd8c75767e6))
* html element method mock ([#833](https://github.com/carbon-design-system/ibm-products/issues/833)) ([fccb061](https://github.com/carbon-design-system/ibm-products/commit/fccb061fafaf42b9c91c309c9363b2e745ed1b11))
* **HTTPErrors:** addresses review findings ([#789](https://github.com/carbon-design-system/ibm-products/issues/789)) ([1f8c9d9](https://github.com/carbon-design-system/ibm-products/commit/1f8c9d9c26ec1635b96f7c8d13925ff3ed8213af))
* **HTTPErrors:** explicitly set text color and update snapshot ([#1155](https://github.com/carbon-design-system/ibm-products/issues/1155)) ([bd37ca6](https://github.com/carbon-design-system/ibm-products/commit/bd37ca69a1489c55ebb94e7c9f5f4858d3ad3923))
* **HTTPErrors:** fix centering issue with css ([#543](https://github.com/carbon-design-system/ibm-products/issues/543)) ([3783d62](https://github.com/carbon-design-system/ibm-products/commit/3783d627b5626fe6077a317c15f1b6542e23e8ff))
* **HTTPErrors:** remove canary check on http error content component ([#900](https://github.com/carbon-design-system/ibm-products/issues/900)) ([e6e394a](https://github.com/carbon-design-system/ibm-products/commit/e6e394a4e90d3bfda58489a9a5687e0499215fb9))
* import modal style updates ([#624](https://github.com/carbon-design-system/ibm-products/issues/624)) ([bf94094](https://github.com/carbon-design-system/ibm-products/commit/bf94094c7d0dfa4c6b60ecc248f7da514f24a47b))
* import review updates ([#872](https://github.com/carbon-design-system/ibm-products/issues/872)) ([fbe0ce6](https://github.com/carbon-design-system/ibm-products/commit/fbe0ce61a5435061255e4a30bee3b3a785b7659f))
* improve AboutModal stories ([#875](https://github.com/carbon-design-system/ibm-products/issues/875)) ([5faf934](https://github.com/carbon-design-system/ibm-products/commit/5faf93494a33d523330e536b150013f4e339c5ec))
* improve tree-shaking optimisation by importing icons directly from @carbons/icons-react ([#1379](https://github.com/carbon-design-system/ibm-products/issues/1379)) ([9110484](https://github.com/carbon-design-system/ibm-products/commit/9110484d7860a95a858a5e1931015b853769c3a9))
* issues raised in page header design review ([#754](https://github.com/carbon-design-system/ibm-products/issues/754)) ([13c5085](https://github.com/carbon-design-system/ibm-products/commit/13c5085b6de50c01a942f71b66e80a9516167c42))
* keep page header above content on scroll ([#1281](https://github.com/carbon-design-system/ibm-products/issues/1281)) ([f2d95e4](https://github.com/carbon-design-system/ibm-products/commit/f2d95e434f37945d6d249631f44f8ce4789b7a58))
* long tag rendering in TagSet overflow ([#1301](https://github.com/carbon-design-system/ibm-products/issues/1301)) ([722aa8b](https://github.com/carbon-design-system/ibm-products/commit/722aa8bd3504b3050784daeffedff07d057f57ee))
* lower page header z-index for sidenav ([#1343](https://github.com/carbon-design-system/ibm-products/issues/1343)) ([03d2743](https://github.com/carbon-design-system/ibm-products/commit/03d2743e895c832bfb1486f1672af272510a85c8))
* minor fix to make AboutModal stories switch more smoothly ([#609](https://github.com/carbon-design-system/ibm-products/issues/609)) ([b3fe083](https://github.com/carbon-design-system/ibm-products/commit/b3fe083c411a3d627031094fe608c57bd378990d))
* more card design feedback ([#576](https://github.com/carbon-design-system/ibm-products/issues/576)) ([cd73a79](https://github.com/carbon-design-system/ibm-products/commit/cd73a794a17b5b2e4784effd45744a07bc5b3351))
* **Notifications:** new notifications get sorted as expected now ([#527](https://github.com/carbon-design-system/ibm-products/issues/527)) ([2f762e8](https://github.com/carbon-design-system/ibm-products/commit/2f762e812c9728525721b2480e3bdd86f533bbc0))
* **NotificationsPanel:** add prop to set defaultToggled value ([#956](https://github.com/carbon-design-system/ibm-products/issues/956)) ([4f92e2a](https://github.com/carbon-design-system/ibm-products/commit/4f92e2a537bc210b86c2682bd8899a95e2693e5d))
* **NotificationsPanel:** address review findings and add more tests ([#613](https://github.com/carbon-design-system/ibm-products/issues/613)) ([a8e6bb4](https://github.com/carbon-design-system/ibm-products/commit/a8e6bb47f7b298ab00c077442c3ea3c85f7f3525))
* **NotificationsPanel:** fix z index issue in bottom actions ([#629](https://github.com/carbon-design-system/ibm-products/issues/629)) ([8700e7d](https://github.com/carbon-design-system/ibm-products/commit/8700e7d7f09c33f39395ca76540db66cd9052d2d))
* **NotificationsPanel:** release review fixes ([#584](https://github.com/carbon-design-system/ibm-products/issues/584)) ([7c9af63](https://github.com/carbon-design-system/ibm-products/commit/7c9af63a6c1b258f1b8743bcfccc47e0bd6eb1ca))
* out dated canary instruction ([#578](https://github.com/carbon-design-system/ibm-products/issues/578)) ([#579](https://github.com/carbon-design-system/ibm-products/issues/579)) ([97bb6a6](https://github.com/carbon-design-system/ibm-products/commit/97bb6a6721cdac8c6b6c7cb98452a0025d64faeb))
* overflwo z-indexes in page header ([#1361](https://github.com/carbon-design-system/ibm-products/issues/1361)) ([21cc33d](https://github.com/carbon-design-system/ibm-products/commit/21cc33d4bde5f252d95f1e6fd3c5941031b67097))
* page header action bar usage ([#622](https://github.com/carbon-design-system/ibm-products/issues/622)) ([bfa4370](https://github.com/carbon-design-system/ibm-products/commit/bfa437079b68ea8583e0ea5a9df5ce344936d85c))
* page header background over lays ([#1418](https://github.com/carbon-design-system/ibm-products/issues/1418)) ([40a3531](https://github.com/carbon-design-system/ibm-products/commit/40a3531536fbe1dcda4e551bdad32f77fad440ff))
* page header deprecations ([#697](https://github.com/carbon-design-system/ibm-products/issues/697)) ([ee559f9](https://github.com/carbon-design-system/ibm-products/commit/ee559f93896a416c01d0e790864835542726d44a))
* page header performance glitches ([#896](https://github.com/carbon-design-system/ibm-products/issues/896)) ([57eae46](https://github.com/carbon-design-system/ibm-products/commit/57eae4653f3b9efbe1218ad947ff6141760f0c14))
* page header styling on scroll ([#881](https://github.com/carbon-design-system/ibm-products/issues/881)) ([da5a472](https://github.com/carbon-design-system/ibm-products/commit/da5a472e0ecef94be5d6157dcb55b640c76bbf23))
* page header test coverage 100% ([#788](https://github.com/carbon-design-system/ibm-products/issues/788)) ([5a1d2d7](https://github.com/carbon-design-system/ibm-products/commit/5a1d2d7bdfff4d1cfc0a187f8a82992dfa946c75))
* page header tests 100 percent ([#1069](https://github.com/carbon-design-system/ibm-products/issues/1069)) ([3d025eb](https://github.com/carbon-design-system/ibm-products/commit/3d025ebf81dc4efd87b573490f87ed8969710466))
* page header title breadcrumb ([#1063](https://github.com/carbon-design-system/ibm-products/issues/1063)) ([fe5291f](https://github.com/carbon-design-system/ibm-products/commit/fe5291f52e42d6d0532264f866e8d53602f0b8d3))
* pageheader styles either side of md breakpt ([#554](https://github.com/carbon-design-system/ibm-products/issues/554)) ([6abab44](https://github.com/carbon-design-system/ibm-products/commit/6abab440845b9919dbdd7e4a3b2c6d021f6477b8))
* **PageHeader:** action bar location ([#1428](https://github.com/carbon-design-system/ibm-products/issues/1428)) ([928cec6](https://github.com/carbon-design-system/ibm-products/commit/928cec664f62d8276d043e7f6bb7d6fa5e329d45))
* **pageHeader:** breadcrumb scroll without actionbar ([#1363](https://github.com/carbon-design-system/ibm-products/issues/1363)) ([d9e781e](https://github.com/carbon-design-system/ibm-products/commit/d9e781ef1b6768e0bf4c0591507b8605aba897b4))
* **PageHeader:** pageActions scroll without actionBar but with breadcrumbs ([#1370](https://github.com/carbon-design-system/ibm-products/issues/1370)) ([9ecade4](https://github.com/carbon-design-system/ibm-products/commit/9ecade421b42b2bd05f03e13476f18c9d2210a45))
* **pageHeader:** user defined page actions not visible ([#1450](https://github.com/carbon-design-system/ibm-products/issues/1450)) ([b16af81](https://github.com/carbon-design-system/ibm-products/commit/b16af818cd652ffc9788de12b514435819df1af7))
* prevent collapse button over action bar items ([#728](https://github.com/carbon-design-system/ibm-products/issues/728)) ([b9785eb](https://github.com/carbon-design-system/ibm-products/commit/b9785ebeba8c8eb0ef72ffd73675314629bf4fe3))
* release review updates ([#1237](https://github.com/carbon-design-system/ibm-products/issues/1237)) ([1880856](https://github.com/carbon-design-system/ibm-products/commit/1880856c4f5f8063f94a26d7e16e89c8454b6ccc))
* release review updates for export ([#828](https://github.com/carbon-design-system/ibm-products/issues/828)) ([7a7ae3e](https://github.com/carbon-design-system/ibm-products/commit/7a7ae3e9d02a6fcbab9d8f99a9f242f0b1c57c23))
* remove and export modal fixes ([#830](https://github.com/carbon-design-system/ibm-products/issues/830)) ([0d8a4f5](https://github.com/carbon-design-system/ibm-products/commit/0d8a4f5d1c047b2a794a2d349693dadd891816d2))
* remove deprecated props from stories ([#1033](https://github.com/carbon-design-system/ibm-products/issues/1033)) ([89bc2a3](https://github.com/carbon-design-system/ibm-products/commit/89bc2a3a4e4e7befe69bbe0eced3a31c005a61eb))
* remove modal release feedback updates ([#757](https://github.com/carbon-design-system/ibm-products/issues/757)) ([f6b97ba](https://github.com/carbon-design-system/ibm-products/commit/f6b97babd6f98da8f08ffbc3ddc24bac8f9b059e))
* remove wibble from example story ([#780](https://github.com/carbon-design-system/ibm-products/issues/780)) ([ca4910f](https://github.com/carbon-design-system/ibm-products/commit/ca4910f918fea1d65b8e9f06767a08ba72064d93))
* **RemoveModal:** [#1426](https://github.com/carbon-design-system/ibm-products/issues/1426) reset remove modal text input value ([#1433](https://github.com/carbon-design-system/ibm-products/issues/1433)) ([e2df543](https://github.com/carbon-design-system/ibm-products/commit/e2df543280cb9aa23942eebe40244f4c27197080))
* renderIcon type in page header ([#1010](https://github.com/carbon-design-system/ibm-products/issues/1010)) ([0235762](https://github.com/carbon-design-system/ibm-products/commit/0235762486382d7c8c481b58619170b98f79aec5))
* replace "cloud & cognitive" with "Carbon for IBM Products" in docs ([#1437](https://github.com/carbon-design-system/ibm-products/issues/1437)) ([0a58354](https://github.com/carbon-design-system/ibm-products/commit/0a58354ccbdd723173b2e6758907713938a7f163))
* revert to buttoon kind ([#995](https://github.com/carbon-design-system/ibm-products/issues/995)) ([8740afd](https://github.com/carbon-design-system/ibm-products/commit/8740afdb578cb7ec57eba4abfae44b2ca7c81068))
* review feedback for cards ([#1131](https://github.com/carbon-design-system/ibm-products/issues/1131)) ([aecea1c](https://github.com/carbon-design-system/ibm-products/commit/aecea1c5b4453e0c3a7af28ab55d6f354c77dbd5))
* saving design feedback ([#582](https://github.com/carbon-design-system/ibm-products/issues/582)) ([121dbaf](https://github.com/carbon-design-system/ibm-products/commit/121dbafc1ed11579c104b4329d73cadbe56a7df9))
* **SidePanel:** [#1191](https://github.com/carbon-design-system/ibm-products/issues/1191) allow side panel title to be optional ([#1202](https://github.com/carbon-design-system/ibm-products/issues/1202)) ([a9aa0e6](https://github.com/carbon-design-system/ibm-products/commit/a9aa0e6113afd40ad17d568e60629c4e03de5555))
* **SidePanel:** [#1204](https://github.com/carbon-design-system/ibm-products/issues/1204) side panel closing animation fix ([#1222](https://github.com/carbon-design-system/ibm-products/issues/1222)) ([53953a5](https://github.com/carbon-design-system/ibm-products/commit/53953a52b5842e27253208cad16d52f8b106530b))
* **SidePanel:** add default subtitle height value ([#889](https://github.com/carbon-design-system/ibm-products/issues/889)) ([d7c61ae](https://github.com/carbon-design-system/ibm-products/commit/d7c61ae118e7c4eb9217f50d0d90bebef81fc4c8))
* **SidePanel:** add extra padding bottom to collapsed title underline ([#678](https://github.com/carbon-design-system/ibm-products/issues/678)) ([c1d5eb6](https://github.com/carbon-design-system/ibm-products/commit/c1d5eb6f8b49df96fd9f742a873ef272998900ad))
* **SidePanel:** add overflow hidden to body if includeOverlay exists ([#1238](https://github.com/carbon-design-system/ibm-products/issues/1238)) ([6ffb602](https://github.com/carbon-design-system/ibm-products/commit/6ffb60287755909bae595f2d1cf8f5bc7e5ec8c5))
* **SidePanel:** add panel height to useEffect dependencies ([#1100](https://github.com/carbon-design-system/ibm-products/issues/1100)) ([fe29cc0](https://github.com/carbon-design-system/ibm-products/commit/fe29cc0ebdbbdf3d66acf0a7d6bc8263b2139030))
* **SidePanel:** add resize detector to adapt to new actions height ([#596](https://github.com/carbon-design-system/ibm-products/issues/596)) ([e812ff9](https://github.com/carbon-design-system/ibm-products/commit/e812ff953cc40d83265d02540357578c95150ec5))
* **SidePanel:** add shadow only for slideOver panels without overlays ([#722](https://github.com/carbon-design-system/ibm-products/issues/722)) ([9cb74d4](https://github.com/carbon-design-system/ibm-products/commit/9cb74d4ff006e30c79512b80d480742219d2c639))
* **SidePanel:** add transition to divider appearing during animation ([#599](https://github.com/carbon-design-system/ibm-products/issues/599)) ([4a7fac1](https://github.com/carbon-design-system/ibm-products/commit/4a7fac1843052b5495996aca21b61660ac0ef304))
* **SidePanel:** add validator to side panel and allPropType helper ([#797](https://github.com/carbon-design-system/ibm-products/issues/797)) ([c2262c9](https://github.com/carbon-design-system/ibm-products/commit/c2262c9a8ac0ac57b21232dc0e943aca7f22d4ed))
* **SidePanel:** allow animation to complete when scroll length is short ([#970](https://github.com/carbon-design-system/ibm-products/issues/970)) ([ac894a5](https://github.com/carbon-design-system/ibm-products/commit/ac894a50bdc4a0b636adb8e6e2f5ea0a52d3e0ed))
* **SidePanel:** center close svg in close button ([#1190](https://github.com/carbon-design-system/ibm-products/issues/1190)) ([fa4a688](https://github.com/carbon-design-system/ibm-products/commit/fa4a68898eb74d2e5487732d27f36664de9648a1))
* **SidePanel:** changing size prop within panel already open works now ([#1371](https://github.com/carbon-design-system/ibm-products/issues/1371)) ([d8de35b](https://github.com/carbon-design-system/ibm-products/commit/d8de35b2bb62ca64e8210370bb5a820af99f6af9))
* **SidePanel:** correct how bottom padding of content is calculated ([#593](https://github.com/carbon-design-system/ibm-products/issues/593)) ([12168c9](https://github.com/carbon-design-system/ibm-products/commit/12168c9c023e77940a2c6a5b97d1aedeed596a7f))
* **SidePanel:** fix animating state of panel ([#1193](https://github.com/carbon-design-system/ibm-products/issues/1193)) ([5a98abc](https://github.com/carbon-design-system/ibm-products/commit/5a98abc93e06b021ea4851c19afc4bbb50a7660f))
* **SidePanel:** fix back button positioning ([#969](https://github.com/carbon-design-system/ibm-products/issues/969)) ([34e7442](https://github.com/carbon-design-system/ibm-products/commit/34e744254ce95c63779ca614bcaa8c2e4fe70309))
* **SidePanel:** fix label text layout issues on scroll animation ([#1203](https://github.com/carbon-design-system/ibm-products/issues/1203)) ([d1c5570](https://github.com/carbon-design-system/ibm-products/commit/d1c5570a56eea58157b8ad2e8faca225787f8479))
* **SidePanel:** fix ref handling in clickOutside useEffect ([#1322](https://github.com/carbon-design-system/ibm-products/issues/1322)) ([4fd8837](https://github.com/carbon-design-system/ibm-products/commit/4fd8837474042529592f644390f6d5367f78e2c0))
* **SidePanel:** give default scroll height if no subtitle ([#1315](https://github.com/carbon-design-system/ibm-products/issues/1315)) ([b70e56b](https://github.com/carbon-design-system/ibm-products/commit/b70e56bb78c9384d92b20596ddb8503ab2c1fb17))
* **SidePanel:** make review fixes for release ([#851](https://github.com/carbon-design-system/ibm-products/issues/851)) ([076616a](https://github.com/carbon-design-system/ibm-products/commit/076616a3807279548cb1acc161f67f0a3454181a))
* **SidePanel:** make title/subtitle fixed when no title animation ([#933](https://github.com/carbon-design-system/ibm-products/issues/933)) ([18c097d](https://github.com/carbon-design-system/ibm-products/commit/18c097d8d590d52eb0527eed7de1c4b3786751ca))
* **SidePanel:** revert condensed title font weight style ([#1213](https://github.com/carbon-design-system/ibm-products/issues/1213)) ([9bf141d](https://github.com/carbon-design-system/ibm-products/commit/9bf141df78325ac8b8682a647a2d27b28826dac5))
* **SidePanel:** should fix focus trap which is breaking the side panel ([#511](https://github.com/carbon-design-system/ibm-products/issues/511)) ([47d9828](https://github.com/carbon-design-system/ibm-products/commit/47d98287f25284a20da3a2e8d480b138ee876cfc))
* **SidePanel:** styles refactor/fix ([#1285](https://github.com/carbon-design-system/ibm-products/issues/1285)) ([bf78f15](https://github.com/carbon-design-system/ibm-products/commit/bf78f157192cefdf0e0977895cf144f22d9012ab))
* **SidePanel:** title animation bug addressed, missing default value ([#1064](https://github.com/carbon-design-system/ibm-products/issues/1064)) ([40cc4a6](https://github.com/carbon-design-system/ibm-products/commit/40cc4a6b285c41125f4e8f85c6f38e0b25dcbd7f))
* **SidePanel:** update storyname in mdx doc file ([#1232](https://github.com/carbon-design-system/ibm-products/issues/1232)) ([a336e37](https://github.com/carbon-design-system/ibm-products/commit/a336e37d8812f4929c65fb4e74524008ff6a1278))
* **SidePanel:** use carbon z index mixin for side panel container ([#1317](https://github.com/carbon-design-system/ibm-products/issues/1317)) ([e3b6b8f](https://github.com/carbon-design-system/ibm-products/commit/e3b6b8fab7ddbfa56f2334c14537056b456fa4e0))
* small fixes to saving for release review ([#683](https://github.com/carbon-design-system/ibm-products/issues/683)) ([384db15](https://github.com/carbon-design-system/ibm-products/commit/384db15a4057b7e91543be9cba05df303f239447))
* storybook setting masking missing component color setting ([#1241](https://github.com/carbon-design-system/ibm-products/issues/1241)) ([38c01ec](https://github.com/carbon-design-system/ibm-products/commit/38c01ec0fa1992b358aced18b714d77eda52bf09))
* tags overflow for left side tags ([#1348](https://github.com/carbon-design-system/ibm-products/issues/1348)) ([fd1f436](https://github.com/carbon-design-system/ibm-products/commit/fd1f436ff628c587b53518f11e5912de5c0b8799))
* **Tearsheet:** change the min() workaround to support older sass implementations ([#1339](https://github.com/carbon-design-system/ibm-products/issues/1339)) ([8a2700c](https://github.com/carbon-design-system/ibm-products/commit/8a2700c6e445af9d87bc0a6d38bf3cba877d71bf))
* **Tearsheet:** ensure tearsheet styles override carbon styles ([#1146](https://github.com/carbon-design-system/ibm-products/issues/1146)) ([d936f42](https://github.com/carbon-design-system/ibm-products/commit/d936f42b05acf3827154e8656ec90a243e9932ce))
* **Tearsheet:** fix background of pagination ([#747](https://github.com/carbon-design-system/ibm-products/issues/747)) ([f3fd9f7](https://github.com/carbon-design-system/ibm-products/commit/f3fd9f72e751e8b955af854b3a3c72e5a593f01d))
* **Tearsheet:** prevent heading styles being added to modal heading ([#1319](https://github.com/carbon-design-system/ibm-products/issues/1319)) ([0de0f13](https://github.com/carbon-design-system/ibm-products/commit/0de0f1304cc29388555e2e5d401166ab6d6d4c13))
* **Tearsheet:** set text color so theming works as expected ([#1270](https://github.com/carbon-design-system/ibm-products/issues/1270)) ([a88e5f0](https://github.com/carbon-design-system/ibm-products/commit/a88e5f03d2e7d3e98809ed55cd593dfa56aee4c4))
* testing and blockclass for import modal ([#686](https://github.com/carbon-design-system/ibm-products/issues/686)) ([42a4f39](https://github.com/carbon-design-system/ibm-products/commit/42a4f396b84a19cc1db98bebb3bd9ce6d860dfc4))
* title and subtitle row responsivity ([#730](https://github.com/carbon-design-system/ibm-products/issues/730)) ([03e6bf2](https://github.com/carbon-design-system/ibm-products/commit/03e6bf28ac2999fc5ce1d94aace6aa8926931d10))
* typo in property name ([#929](https://github.com/carbon-design-system/ibm-products/issues/929)) ([83e7137](https://github.com/carbon-design-system/ibm-products/commit/83e713705800a072d931b4046fa0509950eabb2b))
* update apikeymodal prop testing ([#1079](https://github.com/carbon-design-system/ibm-products/issues/1079)) ([92a1aa3](https://github.com/carbon-design-system/ibm-products/commit/92a1aa3b0f03c6663e83e52f586e28e1a9010232))
* update package readme with usage ([#951](https://github.com/carbon-design-system/ibm-products/issues/951)) ([f5b9a84](https://github.com/carbon-design-system/ibm-products/commit/f5b9a8433dfa866ec29f4a28267f1f86407db1eb))
* update page header subtitle font ([#1451](https://github.com/carbon-design-system/ibm-products/issues/1451)) ([6248c85](https://github.com/carbon-design-system/ibm-products/commit/6248c850fe53a9b3ad9a7d35b39534372bd548fb))
* update testing and package-settings ([#612](https://github.com/carbon-design-system/ibm-products/issues/612)) ([d2bb0f2](https://github.com/carbon-design-system/ibm-products/commit/d2bb0f2ae5a4b6a7c3d1e3d61e1aa0ea94c074d8))
* updates to card tests ([#972](https://github.com/carbon-design-system/ibm-products/issues/972)) ([c39e763](https://github.com/carbon-design-system/ibm-products/commit/c39e763ac961d64ea27f2c5375ddaccfc5ac962c))
* updates to import modal for release review ([#855](https://github.com/carbon-design-system/ibm-products/issues/855)) ([48a8c35](https://github.com/carbon-design-system/ibm-products/commit/48a8c350e3e21f9b5095b1199c478911fc391225))
* use node instead of string for remove modal input label ([#1267](https://github.com/carbon-design-system/ibm-products/issues/1267)) ([7e7cdf8](https://github.com/carbon-design-system/ibm-products/commit/7e7cdf879407d077d9d539dc7aaf9e76ffb6aaff))
* **UserProfileImage:** updates based on release review notes ([#665](https://github.com/carbon-design-system/ibm-products/issues/665)) ([7294117](https://github.com/carbon-design-system/ibm-products/commit/7294117be66c99e6d1dfa4fa98810e7daf2f2ca4))
* **Web terminal:** a11y fix ([#1394](https://github.com/carbon-design-system/ibm-products/issues/1394)) ([d34fbce](https://github.com/carbon-design-system/ibm-products/commit/d34fbced396e56f50671016f98b22f0414777b01))
* **WebTerminal:** color and add additional test coverage ([#1408](https://github.com/carbon-design-system/ibm-products/issues/1408)) ([163220b](https://github.com/carbon-design-system/ibm-products/commit/163220b5924068def341ada10a2f9c4af191da08))


### Features

* add action bar tests ([#338](https://github.com/carbon-design-system/ibm-products/issues/338)) ([d1df237](https://github.com/carbon-design-system/ibm-products/commit/d1df237652e9f22c5018d3fa1859827a037f477d))
* add breadcrumb test and overflow aria label ([#537](https://github.com/carbon-design-system/ibm-products/issues/537)) ([f383b36](https://github.com/carbon-design-system/ibm-products/commit/f383b36d4f2987ae3032fa53319b883df95602ba))
* add carbon telemetry ([#477](https://github.com/carbon-design-system/ibm-products/issues/477)) ([950c9f3](https://github.com/carbon-design-system/ibm-products/commit/950c9f3394af98f93f39851f70e126f944c7477a))
* add cdai apikey component ([#223](https://github.com/carbon-design-system/ibm-products/issues/223)) ([4c09f15](https://github.com/carbon-design-system/ibm-products/commit/4c09f15c3c62c3965d98c91b9695fa7a1cba8f0b))
* add closeIconDescription required prop to AboutModal ([#968](https://github.com/carbon-design-system/ibm-products/issues/968)) ([2619256](https://github.com/carbon-design-system/ibm-products/commit/261925676ab4775fe947dc39f40701a8fbfe6779))
* add header pre and toggle collapse features ([#541](https://github.com/carbon-design-system/ibm-products/issues/541)) ([7ff30b8](https://github.com/carbon-design-system/ibm-products/commit/7ff30b8d6422c955841bce4e8a75b1f805492fe3))
* add options-tile component ([#1411](https://github.com/carbon-design-system/ibm-products/issues/1411)) ([b7dbeb7](https://github.com/carbon-design-system/ibm-products/commit/b7dbeb71c6343d0839d5c3ab74a5c83e1fd6d9b6))
* address review issues ([#989](https://github.com/carbon-design-system/ibm-products/issues/989)) ([e3abcda](https://github.com/carbon-design-system/ibm-products/commit/e3abcda9f9031e553e2e9b2374bff3848b15fef4))
* adds actions prop to web terminal ([#1279](https://github.com/carbon-design-system/ibm-products/issues/1279)) ([416cb9a](https://github.com/carbon-design-system/ibm-products/commit/416cb9ad1e4ead91508d4b288bb98c0202d3e019))
* animation for in-progress icon ([#512](https://github.com/carbon-design-system/ibm-products/issues/512)) ([cf6d06f](https://github.com/carbon-design-system/ibm-products/commit/cf6d06f8b279fe84c18dd23baf9c267c85e88369))
* breadcrumb overflow title and href updates ([#898](https://github.com/carbon-design-system/ibm-products/issues/898)) ([290198b](https://github.com/carbon-design-system/ibm-products/commit/290198bdd078060f4a91bb6c27904aa17ce21b7b))
* card refactor ([#526](https://github.com/carbon-design-system/ibm-products/issues/526)) ([fe0943f](https://github.com/carbon-design-system/ibm-products/commit/fe0943ff6dbf8a7e08a6b029e9b09c258c0360a5))
* cascade component ([#1171](https://github.com/carbon-design-system/ibm-products/issues/1171)) ([76b8b6f](https://github.com/carbon-design-system/ibm-products/commit/76b8b6f1b375e093e721ba415b53e97ec3ca2262))
* change to breadcrumbs shape ([#1047](https://github.com/carbon-design-system/ibm-products/issues/1047)) ([1205fc8](https://github.com/carbon-design-system/ibm-products/commit/1205fc88771761ef37cc8328ef7ef71e08cdeb78))
* **cloud-cognitive:** use `right` `tooltipPosition` for `vertical` variant by default ([#1403](https://github.com/carbon-design-system/ibm-products/issues/1403)) ([6a18fa6](https://github.com/carbon-design-system/ibm-products/commit/6a18fa67dbd60087df6670d0d295a4093e9514ca))
* create an xl width for the page header ([#1236](https://github.com/carbon-design-system/ibm-products/issues/1236)) ([d278f85](https://github.com/carbon-design-system/ibm-products/commit/d278f854629f12459fd2e8e7b0ca3003083574b8))
* create tearsheet step, with custom components ([#1342](https://github.com/carbon-design-system/ibm-products/issues/1342)) ([ef1e972](https://github.com/carbon-design-system/ibm-products/commit/ef1e9723340bfcbf8ce1bc50062ae4735b50ed2d))
* **CreateInfluencer:** [#1107](https://github.com/carbon-design-system/ibm-products/issues/1107) create influencer shared component ([#1122](https://github.com/carbon-design-system/ibm-products/issues/1122)) ([369f466](https://github.com/carbon-design-system/ibm-products/commit/369f4665c3c3b61c62c3aaa326c86738baa08e70))
* **CreateSidePanel:** release create side panel component ([#1153](https://github.com/carbon-design-system/ibm-products/issues/1153)) ([5b39d10](https://github.com/carbon-design-system/ibm-products/commit/5b39d1095f1a52d020985a9c8cf1cebe89c5071a))
* **CreateTearsheet:** [#1028](https://github.com/carbon-design-system/ibm-products/issues/1028) create tearsheet step add onmount prop ([#1050](https://github.com/carbon-design-system/ibm-products/issues/1050)) ([1e6238a](https://github.com/carbon-design-system/ibm-products/commit/1e6238ad19e6b6fc9759faf00152852c267285b1))
* **CreateTearsheet:** [#1076](https://github.com/carbon-design-system/ibm-products/issues/1076) create tearsheet custom step ([#1174](https://github.com/carbon-design-system/ibm-products/issues/1174)) ([8d0ab04](https://github.com/carbon-design-system/ibm-products/commit/8d0ab046245a9b8862e351361b08068204a97f2a))
* **CreateTearsheet:** add animation on step changes ([#885](https://github.com/carbon-design-system/ibm-products/issues/885)) ([d72c825](https://github.com/carbon-design-system/ibm-products/commit/d72c8250cc96a16ed76076ab4dd3a7c19cd0f5a2))
* **CreateTearsheet:** add introStep functionality ([#1333](https://github.com/carbon-design-system/ibm-products/issues/1333)) ([9a067ca](https://github.com/carbon-design-system/ibm-products/commit/9a067cabf019315ac48d6f2b27e762bef8d08fa4))
* **CreateTearsheet:** add microinteraction to influencer menus ([#1104](https://github.com/carbon-design-system/ibm-products/issues/1104)) ([4dc051c](https://github.com/carbon-design-system/ibm-products/commit/4dc051ce64434b9307d23defd84741048ca10c8e))
* **CreateTearsheetNarrow:** initial component structure ([#1014](https://github.com/carbon-design-system/ibm-products/issues/1014)) ([85a17b3](https://github.com/carbon-design-system/ibm-products/commit/85a17b329dd7e44ddb167ffa2ce34a4e30c5d227))
* **CreateTearsheet:** release create tearsheet narrow ([#1149](https://github.com/carbon-design-system/ibm-products/issues/1149)) ([df907a5](https://github.com/carbon-design-system/ibm-products/commit/df907a5fa4614212ae584c1e696f46eb811130de))
* **deps:** add Carbon packages as peer dependencies ([#1089](https://github.com/carbon-design-system/ibm-products/issues/1089)) ([6b807ef](https://github.com/carbon-design-system/ibm-products/commit/6b807efa40798dd0977c76eb07bff8fb7daa170e))
* **devtools:** add attribute to numerous released components ([#1226](https://github.com/carbon-design-system/ibm-products/issues/1226)) ([783ebe9](https://github.com/carbon-design-system/ibm-products/commit/783ebe923a96a268d16e9e3b832f27d950987de4))
* **devtools:** add attribute to numerous released components ([#1229](https://github.com/carbon-design-system/ibm-products/issues/1229)) ([9993bbf](https://github.com/carbon-design-system/ibm-products/commit/9993bbf233c5ec944c17388b73ac410870d2b956))
* **devtools:** add mechanism to enable component DOM identification ([#1187](https://github.com/carbon-design-system/ibm-products/issues/1187)) ([c433158](https://github.com/carbon-design-system/ibm-products/commit/c4331581e0ec806d6a0ed65b2873d4963d3c8ac3))
* **devtools:** add support to released components (1 / 3) ([#1220](https://github.com/carbon-design-system/ibm-products/issues/1220)) ([25209f9](https://github.com/carbon-design-system/ibm-products/commit/25209f9dfe4115843315e74bb6dfcf784a8b950c))
* **EditSidePanel:** [#1266](https://github.com/carbon-design-system/ibm-products/issues/1266) edit side panel ([#1280](https://github.com/carbon-design-system/ibm-products/issues/1280)) ([25f2b6e](https://github.com/carbon-design-system/ibm-products/commit/25f2b6ebcbdb78304caa16ce4b2ece56ecc83ea5))
* ensure all component SCSS imports all dependencies ([#1118](https://github.com/carbon-design-system/ibm-products/issues/1118)) ([9d9617d](https://github.com/carbon-design-system/ibm-products/commit/9d9617dadf43120ebd95aa6a255ee71b7cbf61ca))
* ensure prettier linting causes ci-check to fail ([#1273](https://github.com/carbon-design-system/ibm-products/issues/1273)) ([ad6f347](https://github.com/carbon-design-system/ibm-products/commit/ad6f3479636d2b80b26338d9059429b4ae08ac6e))
* fix offset and add element based scroll ([#1185](https://github.com/carbon-design-system/ibm-products/issues/1185)) ([e3149ae](https://github.com/carbon-design-system/ibm-products/commit/e3149aec52eec078eb3b77abd029131ad9365385))
* further page header review updates ([#1030](https://github.com/carbon-design-system/ibm-products/issues/1030)) ([a350229](https://github.com/carbon-design-system/ibm-products/commit/a3502291e54108e63be2919e7914525712ed65a2))
* match Carbon peer deps for react ([#869](https://github.com/carbon-design-system/ibm-products/issues/869)) ([8f42118](https://github.com/carbon-design-system/ibm-products/commit/8f42118754a904554acee9ec3af2e1fae8143817))
* new release for experimental wrapper ([#532](https://github.com/carbon-design-system/ibm-products/issues/532)) ([b42c47d](https://github.com/carbon-design-system/ibm-products/commit/b42c47ddc171a31457b7d4b9a1bcf804d4fa9d4f))
* page header props to influence grid width ([#1225](https://github.com/carbon-design-system/ibm-products/issues/1225)) ([c73255d](https://github.com/carbon-design-system/ibm-products/commit/c73255d87d6a1fba94b1ce27bc826250562b915b))
* **PageHeader:** back button to replace breadcrumbs on small viewport ([#676](https://github.com/carbon-design-system/ibm-products/issues/676)) ([ae3224e](https://github.com/carbon-design-system/ibm-products/commit/ae3224e12263e78487ed667914be8ba08935e3d9))
* **PageHeader:** update for change to BreadcrumbWithOverflow props ([#1053](https://github.com/carbon-design-system/ibm-products/issues/1053)) ([f6669e8](https://github.com/carbon-design-system/ibm-products/commit/f6669e8d80d4358b19a629a92d11161ec51536c2))
* release page header ([#1072](https://github.com/carbon-design-system/ibm-products/issues/1072)) ([0d397d7](https://github.com/carbon-design-system/ibm-products/commit/0d397d77f0b353ba1d4ba368507f4f6f74733cf4))
* release TagSet ([#937](https://github.com/carbon-design-system/ibm-products/issues/937)) ([e920bf5](https://github.com/carbon-design-system/ibm-products/commit/e920bf5b8cb78a86cc51805c0d26c9bd01aeb71e))
* remove child support ([#992](https://github.com/carbon-design-system/ibm-products/issues/992)) ([b5e4f3b](https://github.com/carbon-design-system/ibm-products/commit/b5e4f3b3a05b09225a0da5ac8982f1391986a9af))
* remove context header from ccs storybook ([#892](https://github.com/carbon-design-system/ibm-products/issues/892)) ([14a1c52](https://github.com/carbon-design-system/ibm-products/commit/14a1c524bc9fe379072e9a55f215aaf06a4a5341))
* remove experimental package ([#964](https://github.com/carbon-design-system/ibm-products/issues/964)) ([063e1d1](https://github.com/carbon-design-system/ibm-products/commit/063e1d1b67eb15cf0a5397866a63a3b67fee8f4c))
* show collapse button if requested ([#732](https://github.com/carbon-design-system/ibm-products/issues/732)) ([05d7423](https://github.com/carbon-design-system/ibm-products/commit/05d74236caf2f9d5e6d834a621ab9e708a9b1abb))
* **SidePanel:** add optional onUnmount prop for cleanup ([#767](https://github.com/carbon-design-system/ibm-products/issues/767)) ([d135ea0](https://github.com/carbon-design-system/ibm-products/commit/d135ea0b2c9ae9f8e415828a1199bbc80e545551))
* **SidePanel:** add prop to prevent closing panel on click outside ([#1288](https://github.com/carbon-design-system/ibm-products/issues/1288)) ([8dfa143](https://github.com/carbon-design-system/ibm-products/commit/8dfa143ac88442e1a770d217298c9c95a07fe590))
* **SidePanel:** add rest props to actionToolbarButtons prop ([#1362](https://github.com/carbon-design-system/ibm-products/issues/1362)) ([93eac3b](https://github.com/carbon-design-system/ibm-products/commit/93eac3b95b8ac67f74b4d707f935deb97090bec9))
* **SidePanel:** allow actionToolbarButtons to be a bit more flexible ([#1189](https://github.com/carbon-design-system/ibm-products/issues/1189)) ([bc84e20](https://github.com/carbon-design-system/ibm-products/commit/bc84e20f9652ba0379b884e5a9e1c7542ef34601))
* **SidePanel:** allow node type for subtitle prop ([#1357](https://github.com/carbon-design-system/ibm-products/issues/1357)) ([0475107](https://github.com/carbon-design-system/ibm-products/commit/04751075a0936da89dd38a3cf070078404bf1a06))
* simplified carbon token value in js ([#894](https://github.com/carbon-design-system/ibm-products/issues/894)) ([a225eee](https://github.com/carbon-design-system/ibm-products/commit/a225eee68364554f62f1f41889164c3f0e48e645))
* stop tagset overflow scrolling off screen ([#740](https://github.com/carbon-design-system/ibm-products/issues/740)) ([016a3ec](https://github.com/carbon-design-system/ibm-products/commit/016a3ec8ee20691de3ee0d4eb4ea44912276e67f))
* **styles:** export used Carbon style modules ([#850](https://github.com/carbon-design-system/ibm-products/issues/850)) ([b876002](https://github.com/carbon-design-system/ibm-products/commit/b876002d7de7131d7db3880d1b3d34330d43be48))
* tagset modal design review updates ([#774](https://github.com/carbon-design-system/ibm-products/issues/774)) ([c9fdb06](https://github.com/carbon-design-system/ibm-products/commit/c9fdb06d6fdceabccd39ea97e7188141292cef9e))
* tagset review updates part 2 ([#907](https://github.com/carbon-design-system/ibm-products/issues/907)) ([fbe3143](https://github.com/carbon-design-system/ibm-products/commit/fbe3143b12abb3d87b6e79eb668014a2015cc9cc))
* **toolbar:** add `caret` variant ([#1297](https://github.com/carbon-design-system/ibm-products/issues/1297)) ([7496c07](https://github.com/carbon-design-system/ibm-products/commit/7496c07c272f51a22bdbe03aec4ab7820e968da3))
* **toolbar:** add `Toolbar`, `ToolbarButton`, and `ToolbarGroup` components ([#1103](https://github.com/carbon-design-system/ibm-products/issues/1103)) ([2d5f4cf](https://github.com/carbon-design-system/ibm-products/commit/2d5f4cfb1e5c650696831a5c2c660c57e6a54f85))
* **toolbar:** add vertical variant ([#1173](https://github.com/carbon-design-system/ibm-products/issues/1173)) ([574a2c5](https://github.com/carbon-design-system/ibm-products/commit/574a2c55fd965be4de163ea8d9d9fae0baf1e7ba))
* upd breadcrumb with overflow to internal ([#610](https://github.com/carbon-design-system/ibm-products/issues/610)) ([2e34eb9](https://github.com/carbon-design-system/ibm-products/commit/2e34eb9fe8b24c5b17d23eb134cdba6aec6736ac))
* update Carbon versions and dependencies ([#1037](https://github.com/carbon-design-system/ibm-products/issues/1037)) ([8c5937a](https://github.com/carbon-design-system/ibm-products/commit/8c5937a865d3a0cfbaf33b9eca13c4d3b4c1365d))
* update Carbon versions and dependencies ([#1084](https://github.com/carbon-design-system/ibm-products/issues/1084)) ([3735ead](https://github.com/carbon-design-system/ibm-products/commit/3735ead9a96450015ec7aeafdb25deaa93d49aaa))
* update Carbon versions and dependencies ([#1110](https://github.com/carbon-design-system/ibm-products/issues/1110)) ([b41f433](https://github.com/carbon-design-system/ibm-products/commit/b41f4331e31cbd9e41d2364b24e6ef50c7fd2d8d))
* update Carbon versions and dependencies ([#1168](https://github.com/carbon-design-system/ibm-products/issues/1168)) ([674017f](https://github.com/carbon-design-system/ibm-products/commit/674017fabc13a7737c0d16deb04ffa9872d76fe6))
* update Carbon versions and dependencies ([#927](https://github.com/carbon-design-system/ibm-products/issues/927)) ([5a8f7d6](https://github.com/carbon-design-system/ibm-products/commit/5a8f7d6b81b6da26fd0cb933c1c3de4bd27b481b))
* update Carbon versions and dependencies ([#974](https://github.com/carbon-design-system/ibm-products/issues/974)) ([555509b](https://github.com/carbon-design-system/ibm-products/commit/555509b5ccb147ed0d794b5816f685aa8f7ae451))
* update Carbon versions and dependencies to latest ([#1282](https://github.com/carbon-design-system/ibm-products/issues/1282)) ([b1451cf](https://github.com/carbon-design-system/ibm-products/commit/b1451cf5c91b75c1bd4e55ae2bdb47f025f33163))
* update Carbon versions and package dependencies ([#994](https://github.com/carbon-design-system/ibm-products/issues/994)) ([2ab4845](https://github.com/carbon-design-system/ibm-products/commit/2ab4845511573b999d41fcf77e6d412e0d446b9d))
* update Carbon versions and package dependencies to latest ([#1133](https://github.com/carbon-design-system/ibm-products/issues/1133)) ([4dfae1a](https://github.com/carbon-design-system/ibm-products/commit/4dfae1a9b27f5676d0bde570e2c9ee9ce8550b52))
* update Carbon versions and package dependencies to latest ([#1228](https://github.com/carbon-design-system/ibm-products/issues/1228)) ([4f5e24c](https://github.com/carbon-design-system/ibm-products/commit/4f5e24cd3a36e7fa9a5cd62d1cafe75a090cf32e))
* update Carbon versions and package dependencies to latest ([#1262](https://github.com/carbon-design-system/ibm-products/issues/1262)) ([ed4dcbe](https://github.com/carbon-design-system/ibm-products/commit/ed4dcbe5b6d92baa6ec39240bda6996ec55f7bc4))
* update Carbon versions and package dependencies to latest ([#1296](https://github.com/carbon-design-system/ibm-products/issues/1296)) ([f1da0bd](https://github.com/carbon-design-system/ibm-products/commit/f1da0bd9192c4d999032df0dbe20d67b6ece89b0))
* update Carbon versions and package dependencies to latest ([#1309](https://github.com/carbon-design-system/ibm-products/issues/1309)) ([945bd3b](https://github.com/carbon-design-system/ibm-products/commit/945bd3ba5608078e961af9a04448f2abd7e7fc5e))
* update Carbon versions and package dependencies to latest ([#1329](https://github.com/carbon-design-system/ibm-products/issues/1329)) ([fd3525e](https://github.com/carbon-design-system/ibm-products/commit/fd3525ec3620b70ff19f85c300e7e0bb05577cd1))
* update Carbon versions and package dependencies to latest ([#1345](https://github.com/carbon-design-system/ibm-products/issues/1345)) ([3c7e6fe](https://github.com/carbon-design-system/ibm-products/commit/3c7e6fedfc46bffc38b889568133ee6c300ddb47))
* update Carbon versions and package dependencies to latest ([#1356](https://github.com/carbon-design-system/ibm-products/issues/1356)) ([946afd6](https://github.com/carbon-design-system/ibm-products/commit/946afd6bd5a165f35940cc1d70fc0e42fb6a4303))
* update Carbon versions and package dependencies to latest ([#1365](https://github.com/carbon-design-system/ibm-products/issues/1365)) ([ea11cf7](https://github.com/carbon-design-system/ibm-products/commit/ea11cf7ae44b61b48142c511c16460cf7978b88c))
* update Carbon versions and package dependencies to latest ([#1425](https://github.com/carbon-design-system/ibm-products/issues/1425)) ([4fd5883](https://github.com/carbon-design-system/ibm-products/commit/4fd5883961e0f3fc6be1c87bbe084b2cf6dc5db0)), closes [#10000](https://github.com/carbon-design-system/ibm-products/issues/10000)
* update page header sticky again ([#891](https://github.com/carbon-design-system/ibm-products/issues/891)) ([b69ec15](https://github.com/carbon-design-system/ibm-products/commit/b69ec1597640bef2e15f166c170f002b7fb727a0))





# [0.99.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.98.0...@carbon/ibm-cloud-cognitive@0.99.0) (2021-11-16)


### Bug Fixes

* add side effect for props-helper to package.json ([#1434](https://github.com/carbon-design-system/ibm-products/issues/1434)) ([f9f6a65](https://github.com/carbon-design-system/ibm-products/commit/f9f6a656f4e1e563460a8b4159b9c13c26101a06))
* page header background over lays ([#1418](https://github.com/carbon-design-system/ibm-products/issues/1418)) ([40a3531](https://github.com/carbon-design-system/ibm-products/commit/40a3531536fbe1dcda4e551bdad32f77fad440ff))
* **PageHeader:** action bar location ([#1428](https://github.com/carbon-design-system/ibm-products/issues/1428)) ([928cec6](https://github.com/carbon-design-system/ibm-products/commit/928cec664f62d8276d043e7f6bb7d6fa5e329d45))
* **RemoveModal:** [#1426](https://github.com/carbon-design-system/ibm-products/issues/1426) reset remove modal text input value ([#1433](https://github.com/carbon-design-system/ibm-products/issues/1433)) ([e2df543](https://github.com/carbon-design-system/ibm-products/commit/e2df543280cb9aa23942eebe40244f4c27197080))
* replace "cloud & cognitive" with "Carbon for IBM Products" in docs ([#1437](https://github.com/carbon-design-system/ibm-products/issues/1437)) ([0a58354](https://github.com/carbon-design-system/ibm-products/commit/0a58354ccbdd723173b2e6758907713938a7f163))
* **WebTerminal:** color and add additional test coverage ([#1408](https://github.com/carbon-design-system/ibm-products/issues/1408)) ([163220b](https://github.com/carbon-design-system/ibm-products/commit/163220b5924068def341ada10a2f9c4af191da08))


### Features

* add options-tile component ([#1411](https://github.com/carbon-design-system/ibm-products/issues/1411)) ([b7dbeb7](https://github.com/carbon-design-system/ibm-products/commit/b7dbeb71c6343d0839d5c3ab74a5c83e1fd6d9b6))
* **cloud-cognitive:** use `right` `tooltipPosition` for `vertical` variant by default ([#1403](https://github.com/carbon-design-system/ibm-products/issues/1403)) ([6a18fa6](https://github.com/carbon-design-system/ibm-products/commit/6a18fa67dbd60087df6670d0d295a4093e9514ca))
* update Carbon versions and package dependencies to latest ([#1425](https://github.com/carbon-design-system/ibm-products/issues/1425)) ([4fd5883](https://github.com/carbon-design-system/ibm-products/commit/4fd5883961e0f3fc6be1c87bbe084b2cf6dc5db0)), closes [#10000](https://github.com/carbon-design-system/ibm-products/issues/10000)





# [0.98.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.97.2...@carbon/ibm-cloud-cognitive@0.98.0) (2021-11-09)


### Bug Fixes

* improve tree-shaking optimisation by importing icons directly from @carbons/icons-react ([#1379](https://github.com/carbon-design-system/ibm-products/issues/1379)) ([9110484](https://github.com/carbon-design-system/ibm-products/commit/9110484d7860a95a858a5e1931015b853769c3a9))
* **Web terminal:** a11y fix ([#1394](https://github.com/carbon-design-system/ibm-products/issues/1394)) ([d34fbce](https://github.com/carbon-design-system/ibm-products/commit/d34fbced396e56f50671016f98b22f0414777b01))


### Features

* update Carbon versions and package dependencies to latest ([#1365](https://github.com/carbon-design-system/ibm-products/issues/1365)) ([ea11cf7](https://github.com/carbon-design-system/ibm-products/commit/ea11cf7ae44b61b48142c511c16460cf7978b88c))





## [0.97.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.97.1...@carbon/ibm-cloud-cognitive@0.97.2) (2021-11-05)


### Bug Fixes

* **PageHeader:** pageActions scroll without actionBar but with breadcrumbs ([#1370](https://github.com/carbon-design-system/ibm-products/issues/1370)) ([9ecade4](https://github.com/carbon-design-system/ibm-products/commit/9ecade421b42b2bd05f03e13476f18c9d2210a45))
* **SidePanel:** changing size prop within panel already open works now ([#1371](https://github.com/carbon-design-system/ibm-products/issues/1371)) ([d8de35b](https://github.com/carbon-design-system/ibm-products/commit/d8de35b2bb62ca64e8210370bb5a820af99f6af9))





## [0.97.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.97.0...@carbon/ibm-cloud-cognitive@0.97.1) (2021-11-03)


### Bug Fixes

* overflwo z-indexes in page header ([#1361](https://github.com/carbon-design-system/ibm-products/issues/1361)) ([21cc33d](https://github.com/carbon-design-system/ibm-products/commit/21cc33d4bde5f252d95f1e6fd3c5941031b67097))
* **pageHeader:** breadcrumb scroll without actionbar ([#1363](https://github.com/carbon-design-system/ibm-products/issues/1363)) ([d9e781e](https://github.com/carbon-design-system/ibm-products/commit/d9e781ef1b6768e0bf4c0591507b8605aba897b4))





# [0.97.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.96.0...@carbon/ibm-cloud-cognitive@0.97.0) (2021-11-01)


### Features

* create tearsheet step, with custom components ([#1342](https://github.com/carbon-design-system/ibm-products/issues/1342)) ([ef1e972](https://github.com/carbon-design-system/ibm-products/commit/ef1e9723340bfcbf8ce1bc50062ae4735b50ed2d))
* **SidePanel:** add rest props to actionToolbarButtons prop ([#1362](https://github.com/carbon-design-system/ibm-products/issues/1362)) ([93eac3b](https://github.com/carbon-design-system/ibm-products/commit/93eac3b95b8ac67f74b4d707f935deb97090bec9))





# [0.96.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.95.2...@carbon/ibm-cloud-cognitive@0.96.0) (2021-10-28)


### Features

* **SidePanel:** allow node type for subtitle prop ([#1357](https://github.com/carbon-design-system/ibm-products/issues/1357)) ([0475107](https://github.com/carbon-design-system/ibm-products/commit/04751075a0936da89dd38a3cf070078404bf1a06))





## [0.95.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.95.1...@carbon/ibm-cloud-cognitive@0.95.2) (2021-10-28)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.95.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.95.0...@carbon/ibm-cloud-cognitive@0.95.1) (2021-10-27)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.95.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.94.3...@carbon/ibm-cloud-cognitive@0.95.0) (2021-10-27)


### Features

* update Carbon versions and package dependencies to latest ([#1356](https://github.com/carbon-design-system/ibm-products/issues/1356)) ([946afd6](https://github.com/carbon-design-system/ibm-products/commit/946afd6bd5a165f35940cc1d70fc0e42fb6a4303))





## [0.94.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.94.2...@carbon/ibm-cloud-cognitive@0.94.3) (2021-10-25)


### Bug Fixes

* fixes card href support ([#1353](https://github.com/carbon-design-system/ibm-products/issues/1353)) ([30a89cb](https://github.com/carbon-design-system/ibm-products/commit/30a89cb682189f2844a3d36c88bf9f40b3e33532))





## [0.94.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.94.1...@carbon/ibm-cloud-cognitive@0.94.2) (2021-10-22)


### Bug Fixes

* tags overflow for left side tags ([#1348](https://github.com/carbon-design-system/ibm-products/issues/1348)) ([fd1f436](https://github.com/carbon-design-system/ibm-products/commit/fd1f436ff628c587b53518f11e5912de5c0b8799))





## [0.94.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.94.0...@carbon/ibm-cloud-cognitive@0.94.1) (2021-10-22)


### Bug Fixes

* Ensure PageActions can be clicked, on scroll ([#1347](https://github.com/carbon-design-system/ibm-products/issues/1347)) ([96183e2](https://github.com/carbon-design-system/ibm-products/commit/96183e2d1e54ef9f8b6b110fdfb731cac737c181))
* lower page header z-index for sidenav ([#1343](https://github.com/carbon-design-system/ibm-products/issues/1343)) ([03d2743](https://github.com/carbon-design-system/ibm-products/commit/03d2743e895c832bfb1486f1672af272510a85c8))





# [0.94.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.93.2...@carbon/ibm-cloud-cognitive@0.94.0) (2021-10-20)


### Features

* update Carbon versions and package dependencies to latest ([#1345](https://github.com/carbon-design-system/ibm-products/issues/1345)) ([3c7e6fe](https://github.com/carbon-design-system/ibm-products/commit/3c7e6fedfc46bffc38b889568133ee6c300ddb47))





## [0.93.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.93.1...@carbon/ibm-cloud-cognitive@0.93.2) (2021-10-15)


### Bug Fixes

* added button icon props for cards ([#1336](https://github.com/carbon-design-system/ibm-products/issues/1336)) ([4974632](https://github.com/carbon-design-system/ibm-products/commit/4974632c7e5e691e16749a4935da2753148bfbb8))





## [0.93.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.93.0...@carbon/ibm-cloud-cognitive@0.93.1) (2021-10-14)


### Bug Fixes

* **Tearsheet:** change the min() workaround to support older sass implementations ([#1339](https://github.com/carbon-design-system/ibm-products/issues/1339)) ([8a2700c](https://github.com/carbon-design-system/ibm-products/commit/8a2700c6e445af9d87bc0a6d38bf3cba877d71bf))





# [0.93.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.92.0...@carbon/ibm-cloud-cognitive@0.93.0) (2021-10-14)


### Features

* **CreateTearsheet:** add introStep functionality ([#1333](https://github.com/carbon-design-system/ibm-products/issues/1333)) ([9a067ca](https://github.com/carbon-design-system/ibm-products/commit/9a067cabf019315ac48d6f2b27e762bef8d08fa4))





# [0.92.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.91.4...@carbon/ibm-cloud-cognitive@0.92.0) (2021-10-14)


### Bug Fixes

* long tag rendering in TagSet overflow ([#1301](https://github.com/carbon-design-system/ibm-products/issues/1301)) ([722aa8b](https://github.com/carbon-design-system/ibm-products/commit/722aa8bd3504b3050784daeffedff07d057f57ee))


### Features

* **toolbar:** add `caret` variant ([#1297](https://github.com/carbon-design-system/ibm-products/issues/1297)) ([7496c07](https://github.com/carbon-design-system/ibm-products/commit/7496c07c272f51a22bdbe03aec4ab7820e968da3))
* update Carbon versions and package dependencies to latest ([#1329](https://github.com/carbon-design-system/ibm-products/issues/1329)) ([fd3525e](https://github.com/carbon-design-system/ibm-products/commit/fd3525ec3620b70ff19f85c300e7e0bb05577cd1))





## [0.91.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.91.3...@carbon/ibm-cloud-cognitive@0.91.4) (2021-10-11)


### Bug Fixes

* **SidePanel:** fix ref handling in clickOutside useEffect ([#1322](https://github.com/carbon-design-system/ibm-products/issues/1322)) ([4fd8837](https://github.com/carbon-design-system/ibm-products/commit/4fd8837474042529592f644390f6d5367f78e2c0))





## [0.91.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.91.2...@carbon/ibm-cloud-cognitive@0.91.3) (2021-10-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.91.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.91.1...@carbon/ibm-cloud-cognitive@0.91.2) (2021-10-07)


### Bug Fixes

* **Tearsheet:** prevent heading styles being added to modal heading ([#1319](https://github.com/carbon-design-system/ibm-products/issues/1319)) ([0de0f13](https://github.com/carbon-design-system/ibm-products/commit/0de0f1304cc29388555e2e5d401166ab6d6d4c13))





## [0.91.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.91.0...@carbon/ibm-cloud-cognitive@0.91.1) (2021-10-07)


### Bug Fixes

* **SidePanel:** use carbon z index mixin for side panel container ([#1317](https://github.com/carbon-design-system/ibm-products/issues/1317)) ([e3b6b8f](https://github.com/carbon-design-system/ibm-products/commit/e3b6b8fab7ddbfa56f2334c14537056b456fa4e0))





# [0.91.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.90.3...@carbon/ibm-cloud-cognitive@0.91.0) (2021-10-07)


### Features

* update Carbon versions and package dependencies to latest ([#1309](https://github.com/carbon-design-system/ibm-products/issues/1309)) ([945bd3b](https://github.com/carbon-design-system/ibm-products/commit/945bd3ba5608078e961af9a04448f2abd7e7fc5e))





## [0.90.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.90.2...@carbon/ibm-cloud-cognitive@0.90.3) (2021-10-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.90.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.90.1...@carbon/ibm-cloud-cognitive@0.90.2) (2021-10-06)


### Bug Fixes

* **CreateSidePanel:** scoping issue for create side panel ([#1303](https://github.com/carbon-design-system/ibm-products/issues/1303)) ([3a198ea](https://github.com/carbon-design-system/ibm-products/commit/3a198eaf807af9401885c6b7841de65ce39b88e6))





## [0.90.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.90.0...@carbon/ibm-cloud-cognitive@0.90.1) (2021-10-06)


### Bug Fixes

* **SidePanel:** give default scroll height if no subtitle ([#1315](https://github.com/carbon-design-system/ibm-products/issues/1315)) ([b70e56b](https://github.com/carbon-design-system/ibm-products/commit/b70e56bb78c9384d92b20596ddb8503ab2c1fb17))





# [0.90.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.89.0...@carbon/ibm-cloud-cognitive@0.90.0) (2021-10-06)


### Features

* adds actions prop to web terminal ([#1279](https://github.com/carbon-design-system/ibm-products/issues/1279)) ([416cb9a](https://github.com/carbon-design-system/ibm-products/commit/416cb9ad1e4ead91508d4b288bb98c0202d3e019))





# [0.89.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.88.1...@carbon/ibm-cloud-cognitive@0.89.0) (2021-10-02)


### Features

* update Carbon versions and package dependencies to latest ([#1296](https://github.com/carbon-design-system/ibm-products/issues/1296)) ([f1da0bd](https://github.com/carbon-design-system/ibm-products/commit/f1da0bd9192c4d999032df0dbe20d67b6ece89b0))





## [0.88.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.88.0...@carbon/ibm-cloud-cognitive@0.88.1) (2021-09-29)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.88.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.87.3...@carbon/ibm-cloud-cognitive@0.88.0) (2021-09-27)


### Features

* **EditSidePanel:** [#1266](https://github.com/carbon-design-system/ibm-products/issues/1266) edit side panel ([#1280](https://github.com/carbon-design-system/ibm-products/issues/1280)) ([25f2b6e](https://github.com/carbon-design-system/ibm-products/commit/25f2b6ebcbdb78304caa16ce4b2ece56ecc83ea5))





## [0.87.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.87.2...@carbon/ibm-cloud-cognitive@0.87.3) (2021-09-24)


### Bug Fixes

* **EmptyStates:** give svg elements unique ids to avoid display issues ([#1290](https://github.com/carbon-design-system/ibm-products/issues/1290)) ([72deea8](https://github.com/carbon-design-system/ibm-products/commit/72deea83d493930ba03ee938c4aa1f588662407f))





## [0.87.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.87.1...@carbon/ibm-cloud-cognitive@0.87.2) (2021-09-23)


### Bug Fixes

* **SidePanel:** styles refactor/fix ([#1285](https://github.com/carbon-design-system/ibm-products/issues/1285)) ([bf78f15](https://github.com/carbon-design-system/ibm-products/commit/bf78f157192cefdf0e0977895cf144f22d9012ab))





## [0.87.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.87.0...@carbon/ibm-cloud-cognitive@0.87.1) (2021-09-23)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.87.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.86.1...@carbon/ibm-cloud-cognitive@0.87.0) (2021-09-23)


### Features

* **SidePanel:** add prop to prevent closing panel on click outside ([#1288](https://github.com/carbon-design-system/ibm-products/issues/1288)) ([8dfa143](https://github.com/carbon-design-system/ibm-products/commit/8dfa143ac88442e1a770d217298c9c95a07fe590))





## [0.86.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.86.0...@carbon/ibm-cloud-cognitive@0.86.1) (2021-09-23)


### Bug Fixes

* storybook setting masking missing component color setting ([#1241](https://github.com/carbon-design-system/ibm-products/issues/1241)) ([38c01ec](https://github.com/carbon-design-system/ibm-products/commit/38c01ec0fa1992b358aced18b714d77eda52bf09))





# [0.86.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.85.2...@carbon/ibm-cloud-cognitive@0.86.0) (2021-09-23)


### Features

* update Carbon versions and dependencies to latest ([#1282](https://github.com/carbon-design-system/ibm-products/issues/1282)) ([b1451cf](https://github.com/carbon-design-system/ibm-products/commit/b1451cf5c91b75c1bd4e55ae2bdb47f025f33163))





## [0.85.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.85.1...@carbon/ibm-cloud-cognitive@0.85.2) (2021-09-22)


### Bug Fixes

* keep page header above content on scroll ([#1281](https://github.com/carbon-design-system/ibm-products/issues/1281)) ([f2d95e4](https://github.com/carbon-design-system/ibm-products/commit/f2d95e434f37945d6d249631f44f8ce4789b7a58))





## [0.85.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.85.0...@carbon/ibm-cloud-cognitive@0.85.1) (2021-09-22)


### Bug Fixes

* added sideEffects field to package.json ([#1251](https://github.com/carbon-design-system/ibm-products/issues/1251)) ([a54554b](https://github.com/carbon-design-system/ibm-products/commit/a54554b8b8b940e9049ad8dcca481dec6f54c354))





# [0.85.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.84.1...@carbon/ibm-cloud-cognitive@0.85.0) (2021-09-21)


### Bug Fixes

* **Tearsheet:** set text color so theming works as expected ([#1270](https://github.com/carbon-design-system/ibm-products/issues/1270)) ([a88e5f0](https://github.com/carbon-design-system/ibm-products/commit/a88e5f03d2e7d3e98809ed55cd593dfa56aee4c4))
* use node instead of string for remove modal input label ([#1267](https://github.com/carbon-design-system/ibm-products/issues/1267)) ([7e7cdf8](https://github.com/carbon-design-system/ibm-products/commit/7e7cdf879407d077d9d539dc7aaf9e76ffb6aaff))


### Features

* ensure prettier linting causes ci-check to fail ([#1273](https://github.com/carbon-design-system/ibm-products/issues/1273)) ([ad6f347](https://github.com/carbon-design-system/ibm-products/commit/ad6f3479636d2b80b26338d9059429b4ae08ac6e))
* update Carbon versions and package dependencies to latest ([#1262](https://github.com/carbon-design-system/ibm-products/issues/1262)) ([ed4dcbe](https://github.com/carbon-design-system/ibm-products/commit/ed4dcbe5b6d92baa6ec39240bda6996ec55f7bc4))





## [0.84.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.84.0...@carbon/ibm-cloud-cognitive@0.84.1) (2021-09-15)


### Bug Fixes

* adds additional check for copy ([#1258](https://github.com/carbon-design-system/ibm-products/issues/1258)) ([b69cca1](https://github.com/carbon-design-system/ibm-products/commit/b69cca1314e2cca7d99351fa7f91069687d64b72))





# [0.84.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.83.1...@carbon/ibm-cloud-cognitive@0.84.0) (2021-09-15)


### Features

* create an xl width for the page header ([#1236](https://github.com/carbon-design-system/ibm-products/issues/1236)) ([d278f85](https://github.com/carbon-design-system/ibm-products/commit/d278f854629f12459fd2e8e7b0ca3003083574b8))





## [0.83.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.83.0...@carbon/ibm-cloud-cognitive@0.83.1) (2021-09-14)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.83.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.82.3...@carbon/ibm-cloud-cognitive@0.83.0) (2021-09-13)


### Features

* update Carbon versions and package dependencies to latest ([#1228](https://github.com/carbon-design-system/ibm-products/issues/1228)) ([4f5e24c](https://github.com/carbon-design-system/ibm-products/commit/4f5e24cd3a36e7fa9a5cd62d1cafe75a090cf32e))





## [0.82.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.82.2...@carbon/ibm-cloud-cognitive@0.82.3) (2021-09-09)


### Bug Fixes

* **CreateFullPage:** explicitly set bg color for page content ([#1249](https://github.com/carbon-design-system/ibm-products/issues/1249)) ([776d2d3](https://github.com/carbon-design-system/ibm-products/commit/776d2d35a4549815312f5b3a89be2da045271eee))





## [0.82.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.82.1...@carbon/ibm-cloud-cognitive@0.82.2) (2021-09-07)


### Bug Fixes

* cascade release ([#1242](https://github.com/carbon-design-system/ibm-products/issues/1242)) ([144af3f](https://github.com/carbon-design-system/ibm-products/commit/144af3f2c9a32b9621418e505ae3e5df9428fdc8))





## [0.82.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.82.0...@carbon/ibm-cloud-cognitive@0.82.1) (2021-09-07)


### Bug Fixes

* **SidePanel:** add overflow hidden to body if includeOverlay exists ([#1238](https://github.com/carbon-design-system/ibm-products/issues/1238)) ([6ffb602](https://github.com/carbon-design-system/ibm-products/commit/6ffb60287755909bae595f2d1cf8f5bc7e5ec8c5))





# [0.82.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.81.2...@carbon/ibm-cloud-cognitive@0.82.0) (2021-09-07)


### Features

* **devtools:** add attribute to numerous released components ([#1229](https://github.com/carbon-design-system/ibm-products/issues/1229)) ([9993bbf](https://github.com/carbon-design-system/ibm-products/commit/9993bbf233c5ec944c17388b73ac410870d2b956))





## [0.81.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.81.1...@carbon/ibm-cloud-cognitive@0.81.2) (2021-09-03)


### Bug Fixes

* **CreateTearsheet:** updates based on release review ([#1233](https://github.com/carbon-design-system/ibm-products/issues/1233)) ([f50e78a](https://github.com/carbon-design-system/ibm-products/commit/f50e78ab7f7a6b12d14b779954cad5ef4f91f6eb))
* release review updates ([#1237](https://github.com/carbon-design-system/ibm-products/issues/1237)) ([1880856](https://github.com/carbon-design-system/ibm-products/commit/1880856c4f5f8063f94a26d7e16e89c8454b6ccc))





## [0.81.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.81.0...@carbon/ibm-cloud-cognitive@0.81.1) (2021-09-02)


### Bug Fixes

* **SidePanel:** update storyname in mdx doc file ([#1232](https://github.com/carbon-design-system/ibm-products/issues/1232)) ([a336e37](https://github.com/carbon-design-system/ibm-products/commit/a336e37d8812f4929c65fb4e74524008ff6a1278))





# [0.81.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.80.1...@carbon/ibm-cloud-cognitive@0.81.0) (2021-09-02)


### Features

* **devtools:** add attribute to numerous released components ([#1226](https://github.com/carbon-design-system/ibm-products/issues/1226)) ([783ebe9](https://github.com/carbon-design-system/ibm-products/commit/783ebe923a96a268d16e9e3b832f27d950987de4))





## [0.80.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.80.0...@carbon/ibm-cloud-cognitive@0.80.1) (2021-09-01)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.80.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.79.1...@carbon/ibm-cloud-cognitive@0.80.0) (2021-08-31)


### Features

* **devtools:** add support to released components (1 / 3) ([#1220](https://github.com/carbon-design-system/ibm-products/issues/1220)) ([25209f9](https://github.com/carbon-design-system/ibm-products/commit/25209f9dfe4115843315e74bb6dfcf784a8b950c))





## [0.79.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.79.0...@carbon/ibm-cloud-cognitive@0.79.1) (2021-08-31)


### Bug Fixes

* **SidePanel:** [#1204](https://github.com/carbon-design-system/ibm-products/issues/1204) side panel closing animation fix ([#1222](https://github.com/carbon-design-system/ibm-products/issues/1222)) ([53953a5](https://github.com/carbon-design-system/ibm-products/commit/53953a52b5842e27253208cad16d52f8b106530b))





# [0.79.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.78.4...@carbon/ibm-cloud-cognitive@0.79.0) (2021-08-31)


### Features

* page header props to influence grid width ([#1225](https://github.com/carbon-design-system/ibm-products/issues/1225)) ([c73255d](https://github.com/carbon-design-system/ibm-products/commit/c73255d87d6a1fba94b1ce27bc826250562b915b))





## [0.78.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.78.3...@carbon/ibm-cloud-cognitive@0.78.4) (2021-08-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.78.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.78.2...@carbon/ibm-cloud-cognitive@0.78.3) (2021-08-30)


### Bug Fixes

* **CreateTearsheet:** add grid usage to step component and storybook ([#1214](https://github.com/carbon-design-system/ibm-products/issues/1214)) ([8f49008](https://github.com/carbon-design-system/ibm-products/commit/8f490080cda913bc099a03b1e4bd97ecd93b394c))





## [0.78.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.78.1...@carbon/ibm-cloud-cognitive@0.78.2) (2021-08-27)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.78.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.78.0...@carbon/ibm-cloud-cognitive@0.78.1) (2021-08-27)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.78.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.77.6...@carbon/ibm-cloud-cognitive@0.78.0) (2021-08-27)


### Features

* **devtools:** add mechanism to enable component DOM identification ([#1187](https://github.com/carbon-design-system/ibm-products/issues/1187)) ([c433158](https://github.com/carbon-design-system/ibm-products/commit/c4331581e0ec806d6a0ed65b2873d4963d3c8ac3))





## [0.77.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.77.5...@carbon/ibm-cloud-cognitive@0.77.6) (2021-08-26)


### Bug Fixes

* **SidePanel:** revert condensed title font weight style ([#1213](https://github.com/carbon-design-system/ibm-products/issues/1213)) ([9bf141d](https://github.com/carbon-design-system/ibm-products/commit/9bf141df78325ac8b8682a647a2d27b28826dac5))





## [0.77.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.77.4...@carbon/ibm-cloud-cognitive@0.77.5) (2021-08-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.77.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.77.3...@carbon/ibm-cloud-cognitive@0.77.4) (2021-08-26)


### Bug Fixes

* **SidePanel:** [#1191](https://github.com/carbon-design-system/ibm-products/issues/1191) allow side panel title to be optional ([#1202](https://github.com/carbon-design-system/ibm-products/issues/1202)) ([a9aa0e6](https://github.com/carbon-design-system/ibm-products/commit/a9aa0e6113afd40ad17d568e60629c4e03de5555))





## [0.77.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.77.2...@carbon/ibm-cloud-cognitive@0.77.3) (2021-08-26)


### Bug Fixes

* **SidePanel:** fix label text layout issues on scroll animation ([#1203](https://github.com/carbon-design-system/ibm-products/issues/1203)) ([d1c5570](https://github.com/carbon-design-system/ibm-products/commit/d1c5570a56eea58157b8ad2e8faca225787f8479))





## [0.77.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.77.1...@carbon/ibm-cloud-cognitive@0.77.2) (2021-08-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.77.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.77.0...@carbon/ibm-cloud-cognitive@0.77.1) (2021-08-26)


### Bug Fixes

* **SidePanel:** fix animating state of panel ([#1193](https://github.com/carbon-design-system/ibm-products/issues/1193)) ([5a98abc](https://github.com/carbon-design-system/ibm-products/commit/5a98abc93e06b021ea4851c19afc4bbb50a7660f))





# [0.77.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.76.1...@carbon/ibm-cloud-cognitive@0.77.0) (2021-08-25)


### Features

* cascade component ([#1171](https://github.com/carbon-design-system/ibm-products/issues/1171)) ([76b8b6f](https://github.com/carbon-design-system/ibm-products/commit/76b8b6f1b375e093e721ba415b53e97ec3ca2262))





## [0.76.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.76.0...@carbon/ibm-cloud-cognitive@0.76.1) (2021-08-25)


### Bug Fixes

* better warnings when deprecated-usage props have invalid values ([#1198](https://github.com/carbon-design-system/ibm-products/issues/1198)) ([6ec8777](https://github.com/carbon-design-system/ibm-products/commit/6ec8777b66b4f45d47ed1060051b8bf9ec8692d8))





# [0.76.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.75.1...@carbon/ibm-cloud-cognitive@0.76.0) (2021-08-25)


### Features

* **toolbar:** add vertical variant ([#1173](https://github.com/carbon-design-system/ibm-products/issues/1173)) ([574a2c5](https://github.com/carbon-design-system/ibm-products/commit/574a2c55fd965be4de163ea8d9d9fae0baf1e7ba))





## [0.75.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.75.0...@carbon/ibm-cloud-cognitive@0.75.1) (2021-08-25)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.75.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.74.1...@carbon/ibm-cloud-cognitive@0.75.0) (2021-08-23)


### Features

* **SidePanel:** allow actionToolbarButtons to be a bit more flexible ([#1189](https://github.com/carbon-design-system/ibm-products/issues/1189)) ([bc84e20](https://github.com/carbon-design-system/ibm-products/commit/bc84e20f9652ba0379b884e5a9e1c7542ef34601))





## [0.74.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.74.0...@carbon/ibm-cloud-cognitive@0.74.1) (2021-08-23)


### Bug Fixes

* **SidePanel:** center close svg in close button ([#1190](https://github.com/carbon-design-system/ibm-products/issues/1190)) ([fa4a688](https://github.com/carbon-design-system/ibm-products/commit/fa4a68898eb74d2e5487732d27f36664de9648a1))





# [0.74.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.73.2...@carbon/ibm-cloud-cognitive@0.74.0) (2021-08-20)


### Features

* fix offset and add element based scroll ([#1185](https://github.com/carbon-design-system/ibm-products/issues/1185)) ([e3149ae](https://github.com/carbon-design-system/ibm-products/commit/e3149aec52eec078eb3b77abd029131ad9365385))





## [0.73.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.73.1...@carbon/ibm-cloud-cognitive@0.73.2) (2021-08-20)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.73.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.73.0...@carbon/ibm-cloud-cognitive@0.73.1) (2021-08-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.73.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.72.1...@carbon/ibm-cloud-cognitive@0.73.0) (2021-08-19)


### Features

* **CreateTearsheet:** [#1076](https://github.com/carbon-design-system/ibm-products/issues/1076) create tearsheet custom step ([#1174](https://github.com/carbon-design-system/ibm-products/issues/1174)) ([8d0ab04](https://github.com/carbon-design-system/ibm-products/commit/8d0ab046245a9b8862e351361b08068204a97f2a))





## [0.72.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.72.0...@carbon/ibm-cloud-cognitive@0.72.1) (2021-08-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.72.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.71.8...@carbon/ibm-cloud-cognitive@0.72.0) (2021-08-19)


### Features

* update Carbon versions and dependencies ([#1168](https://github.com/carbon-design-system/ibm-products/issues/1168)) ([674017f](https://github.com/carbon-design-system/ibm-products/commit/674017fabc13a7737c0d16deb04ffa9872d76fe6))





## [0.71.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.71.7...@carbon/ibm-cloud-cognitive@0.71.8) (2021-08-18)


### Bug Fixes

* **CreateTearsheet:** remove grid margin ([#1170](https://github.com/carbon-design-system/ibm-products/issues/1170)) ([75bfb54](https://github.com/carbon-design-system/ibm-products/commit/75bfb5462ec364d86970fc142a99b91d0c5a185b))





## [0.71.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.71.6...@carbon/ibm-cloud-cognitive@0.71.7) (2021-08-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.71.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.71.5...@carbon/ibm-cloud-cognitive@0.71.6) (2021-08-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.71.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.71.4...@carbon/ibm-cloud-cognitive@0.71.5) (2021-08-18)


### Bug Fixes

* Ensure SCSS for all components and stories sets required carbon and project settings ([#1166](https://github.com/carbon-design-system/ibm-products/issues/1166)) ([5c77105](https://github.com/carbon-design-system/ibm-products/commit/5c77105891df498f26d3f8f6214f8d7f7fa68267))





## [0.71.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.71.3...@carbon/ibm-cloud-cognitive@0.71.4) (2021-08-18)


### Bug Fixes

* ensure internal components don't render as canary placeholders ([#1167](https://github.com/carbon-design-system/ibm-products/issues/1167)) ([0b557b6](https://github.com/carbon-design-system/ibm-products/commit/0b557b6163692e796058e7d2bc3b991d019b62d9))





## [0.71.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.71.2...@carbon/ibm-cloud-cognitive@0.71.3) (2021-08-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.71.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.71.1...@carbon/ibm-cloud-cognitive@0.71.2) (2021-08-17)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.71.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.71.0...@carbon/ibm-cloud-cognitive@0.71.1) (2021-08-17)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.71.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.70.1...@carbon/ibm-cloud-cognitive@0.71.0) (2021-08-17)


### Features

* **toolbar:** add `Toolbar`, `ToolbarButton`, and `ToolbarGroup` components ([#1103](https://github.com/carbon-design-system/ibm-products/issues/1103)) ([2d5f4cf](https://github.com/carbon-design-system/ibm-products/commit/2d5f4cfb1e5c650696831a5c2c660c57e6a54f85))





## [0.70.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.70.0...@carbon/ibm-cloud-cognitive@0.70.1) (2021-08-17)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.70.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.69.7...@carbon/ibm-cloud-cognitive@0.70.0) (2021-08-16)


### Features

* **CreateSidePanel:** release create side panel component ([#1153](https://github.com/carbon-design-system/ibm-products/issues/1153)) ([5b39d10](https://github.com/carbon-design-system/ibm-products/commit/5b39d1095f1a52d020985a9c8cf1cebe89c5071a))





## [0.69.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.69.6...@carbon/ibm-cloud-cognitive@0.69.7) (2021-08-13)


### Bug Fixes

* **HTTPErrors:** explicitly set text color and update snapshot ([#1155](https://github.com/carbon-design-system/ibm-products/issues/1155)) ([bd37ca6](https://github.com/carbon-design-system/ibm-products/commit/bd37ca69a1489c55ebb94e7c9f5f4858d3ad3923))





## [0.69.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.69.5...@carbon/ibm-cloud-cognitive@0.69.6) (2021-08-13)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.69.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.69.4...@carbon/ibm-cloud-cognitive@0.69.5) (2021-08-13)


### Bug Fixes

* **Tearsheet:** ensure tearsheet styles override carbon styles ([#1146](https://github.com/carbon-design-system/ibm-products/issues/1146)) ([d936f42](https://github.com/carbon-design-system/ibm-products/commit/d936f42b05acf3827154e8656ec90a243e9932ce))





## [0.69.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.69.3...@carbon/ibm-cloud-cognitive@0.69.4) (2021-08-12)


### Bug Fixes

* **CreateSidePanel:** design fixes and side panel header/scrolling work ([#1141](https://github.com/carbon-design-system/ibm-products/issues/1141)) ([be67abc](https://github.com/carbon-design-system/ibm-products/commit/be67abc89964816d447d3f0c24cbc0fcbaf61c6f))





## [0.69.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.69.2...@carbon/ibm-cloud-cognitive@0.69.3) (2021-08-12)


### Bug Fixes

* review feedback for cards ([#1131](https://github.com/carbon-design-system/ibm-products/issues/1131)) ([aecea1c](https://github.com/carbon-design-system/ibm-products/commit/aecea1c5b4453e0c3a7af28ab55d6f354c77dbd5))





## [0.69.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.69.1...@carbon/ibm-cloud-cognitive@0.69.2) (2021-08-12)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.69.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.69.0...@carbon/ibm-cloud-cognitive@0.69.1) (2021-08-12)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.69.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.68.2...@carbon/ibm-cloud-cognitive@0.69.0) (2021-08-12)


### Features

* **CreateTearsheet:** release create tearsheet narrow ([#1149](https://github.com/carbon-design-system/ibm-products/issues/1149)) ([df907a5](https://github.com/carbon-design-system/ibm-products/commit/df907a5fa4614212ae584c1e696f46eb811130de))





## [0.68.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.68.1...@carbon/ibm-cloud-cognitive@0.68.2) (2021-08-12)


### Bug Fixes

* **CreateModal:** ensure closing the modal calls onRequestClose handler ([#1147](https://github.com/carbon-design-system/ibm-products/issues/1147)) ([73cd1a4](https://github.com/carbon-design-system/ibm-products/commit/73cd1a4e99d6ad5da326b0509f115268b5696a55))





## [0.68.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.68.0...@carbon/ibm-cloud-cognitive@0.68.1) (2021-08-11)


### Bug Fixes

* **CreateTearsheetNarrow:** add tests and address onRequestClose issue ([#1143](https://github.com/carbon-design-system/ibm-products/issues/1143)) ([87ed826](https://github.com/carbon-design-system/ibm-products/commit/87ed826da64825cf7f1a3f860baed4cbae1b8a54))





# [0.68.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.67.1...@carbon/ibm-cloud-cognitive@0.68.0) (2021-08-11)


### Features

* update Carbon versions and package dependencies to latest ([#1133](https://github.com/carbon-design-system/ibm-products/issues/1133)) ([4dfae1a](https://github.com/carbon-design-system/ibm-products/commit/4dfae1a9b27f5676d0bde570e2c9ee9ce8550b52))





## [0.67.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.67.0...@carbon/ibm-cloud-cognitive@0.67.1) (2021-08-10)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.67.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.66.1...@carbon/ibm-cloud-cognitive@0.67.0) (2021-08-10)


### Features

* **CreateInfluencer:** [#1107](https://github.com/carbon-design-system/ibm-products/issues/1107) create influencer shared component ([#1122](https://github.com/carbon-design-system/ibm-products/issues/1122)) ([369f466](https://github.com/carbon-design-system/ibm-products/commit/369f4665c3c3b61c62c3aaa326c86738baa08e70))





## [0.66.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.66.0...@carbon/ibm-cloud-cognitive@0.66.1) (2021-08-10)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.66.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.65.0...@carbon/ibm-cloud-cognitive@0.66.0) (2021-08-10)


### Bug Fixes

* export cards ([#1120](https://github.com/carbon-design-system/ibm-products/issues/1120)) ([7227aeb](https://github.com/carbon-design-system/ibm-products/commit/7227aebcc0c31c2f9a3076692c5a3b3913a6a2e0))


### Features

* ensure all component SCSS imports all dependencies ([#1118](https://github.com/carbon-design-system/ibm-products/issues/1118)) ([9d9617d](https://github.com/carbon-design-system/ibm-products/commit/9d9617dadf43120ebd95aa6a255ee71b7cbf61ca))
* update Carbon versions and dependencies ([#1110](https://github.com/carbon-design-system/ibm-products/issues/1110)) ([b41f433](https://github.com/carbon-design-system/ibm-products/commit/b41f4331e31cbd9e41d2364b24e6ef50c7fd2d8d))





# [0.65.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.64.6...@carbon/ibm-cloud-cognitive@0.65.0) (2021-08-04)


### Features

* **CreateTearsheet:** add microinteraction to influencer menus ([#1104](https://github.com/carbon-design-system/ibm-products/issues/1104)) ([4dc051c](https://github.com/carbon-design-system/ibm-products/commit/4dc051ce64434b9307d23defd84741048ca10c8e))





## [0.64.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.64.5...@carbon/ibm-cloud-cognitive@0.64.6) (2021-08-03)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.64.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.64.4...@carbon/ibm-cloud-cognitive@0.64.5) (2021-08-03)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.64.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.64.3...@carbon/ibm-cloud-cognitive@0.64.4) (2021-08-03)


### Bug Fixes

* **CreateTearsheet:** stories should receive args as expected now ([#1099](https://github.com/carbon-design-system/ibm-products/issues/1099)) ([ec43a08](https://github.com/carbon-design-system/ibm-products/commit/ec43a0891c472a554228bd2bc11bb83a0fa090ce))





## [0.64.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.64.2...@carbon/ibm-cloud-cognitive@0.64.3) (2021-08-03)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.64.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.64.1...@carbon/ibm-cloud-cognitive@0.64.2) (2021-08-03)


### Bug Fixes

* added additional apikeymodal tests ([#1098](https://github.com/carbon-design-system/ibm-products/issues/1098)) ([e680415](https://github.com/carbon-design-system/ibm-products/commit/e680415bbf998584910eb9ed92eff62a71913ebe))





## [0.64.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.64.0...@carbon/ibm-cloud-cognitive@0.64.1) (2021-08-03)


### Bug Fixes

* **SidePanel:** add panel height to useEffect dependencies ([#1100](https://github.com/carbon-design-system/ibm-products/issues/1100)) ([fe29cc0](https://github.com/carbon-design-system/ibm-products/commit/fe29cc0ebdbbdf3d66acf0a7d6bc8263b2139030))





# [0.64.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.63.2...@carbon/ibm-cloud-cognitive@0.64.0) (2021-07-30)


### Features

* **deps:** add Carbon packages as peer dependencies ([#1089](https://github.com/carbon-design-system/ibm-products/issues/1089)) ([6b807ef](https://github.com/carbon-design-system/ibm-products/commit/6b807efa40798dd0977c76eb07bff8fb7daa170e))





## [0.63.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.63.1...@carbon/ibm-cloud-cognitive@0.63.2) (2021-07-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.63.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.63.0...@carbon/ibm-cloud-cognitive@0.63.1) (2021-07-29)


### Bug Fixes

* **CreateTearsheet:** story component updates ([#1091](https://github.com/carbon-design-system/ibm-products/issues/1091)) ([62f7fbc](https://github.com/carbon-design-system/ibm-products/commit/62f7fbc0b0c4d62d68cbaf288bbd5ae0170a4605))





# [0.63.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.62.6...@carbon/ibm-cloud-cognitive@0.63.0) (2021-07-28)


### Features

* update Carbon versions and dependencies ([#1084](https://github.com/carbon-design-system/ibm-products/issues/1084)) ([3735ead](https://github.com/carbon-design-system/ibm-products/commit/3735ead9a96450015ec7aeafdb25deaa93d49aaa))





## [0.62.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.62.5...@carbon/ibm-cloud-cognitive@0.62.6) (2021-07-27)


### Bug Fixes

* apikey story fix ([#1081](https://github.com/carbon-design-system/ibm-products/issues/1081)) ([a225b3a](https://github.com/carbon-design-system/ibm-products/commit/a225b3a291734d1d29d564708ae267aa4a202134))





## [0.62.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.62.4...@carbon/ibm-cloud-cognitive@0.62.5) (2021-07-27)


### Bug Fixes

* update apikeymodal prop testing ([#1079](https://github.com/carbon-design-system/ibm-products/issues/1079)) ([92a1aa3](https://github.com/carbon-design-system/ibm-products/commit/92a1aa3b0f03c6663e83e52f586e28e1a9010232))





## [0.62.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.62.3...@carbon/ibm-cloud-cognitive@0.62.4) (2021-07-27)


### Bug Fixes

* **CreateSidePanel:** title and subtitle padding is correct now ([#1080](https://github.com/carbon-design-system/ibm-products/issues/1080)) ([9fcbe91](https://github.com/carbon-design-system/ibm-products/commit/9fcbe9185c403f2b8bc76f79ed3b687ada9da254))





## [0.62.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.62.2...@carbon/ibm-cloud-cognitive@0.62.3) (2021-07-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.62.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.62.1...@carbon/ibm-cloud-cognitive@0.62.2) (2021-07-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.62.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.62.0...@carbon/ibm-cloud-cognitive@0.62.1) (2021-07-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.62.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.61.3...@carbon/ibm-cloud-cognitive@0.62.0) (2021-07-23)


### Features

* release page header ([#1072](https://github.com/carbon-design-system/ibm-products/issues/1072)) ([0d397d7](https://github.com/carbon-design-system/ibm-products/commit/0d397d77f0b353ba1d4ba368507f4f6f74733cf4))





## [0.61.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.61.2...@carbon/ibm-cloud-cognitive@0.61.3) (2021-07-23)


### Bug Fixes

* page header tests 100 percent ([#1069](https://github.com/carbon-design-system/ibm-products/issues/1069)) ([3d025eb](https://github.com/carbon-design-system/ibm-products/commit/3d025ebf81dc4efd87b573490f87ed8969710466))





## [0.61.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.61.1...@carbon/ibm-cloud-cognitive@0.61.2) (2021-07-23)


### Bug Fixes

* **SidePanel:** title animation bug addressed, missing default value ([#1064](https://github.com/carbon-design-system/ibm-products/issues/1064)) ([40cc4a6](https://github.com/carbon-design-system/ibm-products/commit/40cc4a6b285c41125f4e8f85c6f38e0b25dcbd7f))





## [0.61.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.61.0...@carbon/ibm-cloud-cognitive@0.61.1) (2021-07-23)


### Bug Fixes

* page header title breadcrumb ([#1063](https://github.com/carbon-design-system/ibm-products/issues/1063)) ([fe5291f](https://github.com/carbon-design-system/ibm-products/commit/fe5291f52e42d6d0532264f866e8d53602f0b8d3))





# [0.61.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.60.0...@carbon/ibm-cloud-cognitive@0.61.0) (2021-07-23)


### Features

* **PageHeader:** update for change to BreadcrumbWithOverflow props ([#1053](https://github.com/carbon-design-system/ibm-products/issues/1053)) ([f6669e8](https://github.com/carbon-design-system/ibm-products/commit/f6669e8d80d4358b19a629a92d11161ec51536c2))





# [0.60.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.59.0...@carbon/ibm-cloud-cognitive@0.60.0) (2021-07-22)


### Features

* **CreateTearsheet:** [#1028](https://github.com/carbon-design-system/ibm-products/issues/1028) create tearsheet step add onmount prop ([#1050](https://github.com/carbon-design-system/ibm-products/issues/1050)) ([1e6238a](https://github.com/carbon-design-system/ibm-products/commit/1e6238ad19e6b6fc9759faf00152852c267285b1))





# [0.59.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.58.1...@carbon/ibm-cloud-cognitive@0.59.0) (2021-07-22)


### Features

* change to breadcrumbs shape ([#1047](https://github.com/carbon-design-system/ibm-products/issues/1047)) ([1205fc8](https://github.com/carbon-design-system/ibm-products/commit/1205fc88771761ef37cc8328ef7ef71e08cdeb78))





## [0.58.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.58.0...@carbon/ibm-cloud-cognitive@0.58.1) (2021-07-22)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.58.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.57.6...@carbon/ibm-cloud-cognitive@0.58.0) (2021-07-21)


### Features

* update Carbon versions and dependencies ([#1037](https://github.com/carbon-design-system/ibm-products/issues/1037)) ([8c5937a](https://github.com/carbon-design-system/ibm-products/commit/8c5937a865d3a0cfbaf33b9eca13c4d3b4c1365d))





## [0.57.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.57.5...@carbon/ibm-cloud-cognitive@0.57.6) (2021-07-21)


### Bug Fixes

* available space dep and copyright ([#1039](https://github.com/carbon-design-system/ibm-products/issues/1039)) ([e6e9a42](https://github.com/carbon-design-system/ibm-products/commit/e6e9a4222ec6f9920689b5cd74fbf03b27430781))





## [0.57.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.57.4...@carbon/ibm-cloud-cognitive@0.57.5) (2021-07-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.57.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.57.3...@carbon/ibm-cloud-cognitive@0.57.4) (2021-07-21)


### Bug Fixes

* remove deprecated props from stories ([#1033](https://github.com/carbon-design-system/ibm-products/issues/1033)) ([89bc2a3](https://github.com/carbon-design-system/ibm-products/commit/89bc2a3a4e4e7befe69bbe0eced3a31c005a61eb))





## [0.57.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.57.2...@carbon/ibm-cloud-cognitive@0.57.3) (2021-07-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.57.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.57.1...@carbon/ibm-cloud-cognitive@0.57.2) (2021-07-21)


### Bug Fixes

* **about-modal:** align copyright and legal text color with design ([#1038](https://github.com/carbon-design-system/ibm-products/issues/1038)) ([6dbd605](https://github.com/carbon-design-system/ibm-products/commit/6dbd605aca7f6bc0218f5a5489d2c657399f2dc0))





## [0.57.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.57.0...@carbon/ibm-cloud-cognitive@0.57.1) (2021-07-20)


### Bug Fixes

* **about-modal:** prevent `p` browser defaults with no CSS reset ([#1034](https://github.com/carbon-design-system/ibm-products/issues/1034)) ([cf0ae3a](https://github.com/carbon-design-system/ibm-products/commit/cf0ae3a5a20295c6889b20d1023d6334b8482f6d))





# [0.57.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.56.3...@carbon/ibm-cloud-cognitive@0.57.0) (2021-07-20)


### Features

* further page header review updates ([#1030](https://github.com/carbon-design-system/ibm-products/issues/1030)) ([a350229](https://github.com/carbon-design-system/ibm-products/commit/a3502291e54108e63be2919e7914525712ed65a2))





## [0.56.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.56.2...@carbon/ibm-cloud-cognitive@0.56.3) (2021-07-20)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.56.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.56.1...@carbon/ibm-cloud-cognitive@0.56.2) (2021-07-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.56.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.56.0...@carbon/ibm-cloud-cognitive@0.56.1) (2021-07-19)


### Bug Fixes

* card updates ([#1013](https://github.com/carbon-design-system/ibm-products/issues/1013)) ([2e14d8e](https://github.com/carbon-design-system/ibm-products/commit/2e14d8e101f73e8dfb9518c783e282c2365ef850))





# [0.56.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.14...@carbon/ibm-cloud-cognitive@0.56.0) (2021-07-19)


### Features

* **CreateTearsheetNarrow:** initial component structure ([#1014](https://github.com/carbon-design-system/ibm-products/issues/1014)) ([85a17b3](https://github.com/carbon-design-system/ibm-products/commit/85a17b329dd7e44ddb167ffa2ce34a4e30c5d227))





## [0.55.14](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.13...@carbon/ibm-cloud-cognitive@0.55.14) (2021-07-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.55.13](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.12...@carbon/ibm-cloud-cognitive@0.55.13) (2021-07-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.55.12](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.11...@carbon/ibm-cloud-cognitive@0.55.12) (2021-07-19)


### Bug Fixes

* **CreateTearsheet:** toggle spacing is correct now ([#1025](https://github.com/carbon-design-system/ibm-products/issues/1025)) ([a662106](https://github.com/carbon-design-system/ibm-products/commit/a6621069d2a08c620f96c20aad4aaf431c8061bf))





## [0.55.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.10...@carbon/ibm-cloud-cognitive@0.55.11) (2021-07-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.55.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.9...@carbon/ibm-cloud-cognitive@0.55.10) (2021-07-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.55.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.8...@carbon/ibm-cloud-cognitive@0.55.9) (2021-07-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.55.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.7...@carbon/ibm-cloud-cognitive@0.55.8) (2021-07-16)


### Bug Fixes

* add interactive tag styling to overflow tag in TagSet ([#1022](https://github.com/carbon-design-system/ibm-products/issues/1022)) ([ae5c656](https://github.com/carbon-design-system/ibm-products/commit/ae5c656c88703a5ec50cb6bcad8541c00a78f737))





## [0.55.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.6...@carbon/ibm-cloud-cognitive@0.55.7) (2021-07-16)


### Bug Fixes

* renderIcon type in page header ([#1010](https://github.com/carbon-design-system/ibm-products/issues/1010)) ([0235762](https://github.com/carbon-design-system/ibm-products/commit/0235762486382d7c8c481b58619170b98f79aec5))





## [0.55.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.5...@carbon/ibm-cloud-cognitive@0.55.6) (2021-07-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.55.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.4...@carbon/ibm-cloud-cognitive@0.55.5) (2021-07-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.55.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.3...@carbon/ibm-cloud-cognitive@0.55.4) (2021-07-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.55.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.2...@carbon/ibm-cloud-cognitive@0.55.3) (2021-07-15)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.55.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.1...@carbon/ibm-cloud-cognitive@0.55.2) (2021-07-15)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.55.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.55.0...@carbon/ibm-cloud-cognitive@0.55.1) (2021-07-15)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.55.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.54.2...@carbon/ibm-cloud-cognitive@0.55.0) (2021-07-14)


### Features

* update Carbon versions and package dependencies ([#994](https://github.com/carbon-design-system/ibm-products/issues/994)) ([2ab4845](https://github.com/carbon-design-system/ibm-products/commit/2ab4845511573b999d41fcf77e6d412e0d446b9d))





## [0.54.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.54.1...@carbon/ibm-cloud-cognitive@0.54.2) (2021-07-14)


### Bug Fixes

* revert to button kind ([#995](https://github.com/carbon-design-system/ibm-products/issues/995)) ([8740afd](https://github.com/carbon-design-system/ibm-products/commit/8740afdb578cb7ec57eba4abfae44b2ca7c81068))





## [0.54.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.54.0...@carbon/ibm-cloud-cognitive@0.54.1) (2021-07-14)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.54.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.53.2...@carbon/ibm-cloud-cognitive@0.54.0) (2021-07-14)


### Features

* address review issues ([#989](https://github.com/carbon-design-system/ibm-products/issues/989)) ([e3abcda](https://github.com/carbon-design-system/ibm-products/commit/e3abcda9f9031e553e2e9b2374bff3848b15fef4))
* remove child support ([#992](https://github.com/carbon-design-system/ibm-products/issues/992)) ([b5e4f3b](https://github.com/carbon-design-system/ibm-products/commit/b5e4f3b3a05b09225a0da5ac8982f1391986a9af))





## [0.53.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.53.1...@carbon/ibm-cloud-cognitive@0.53.2) (2021-07-13)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.53.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.53.0...@carbon/ibm-cloud-cognitive@0.53.1) (2021-07-13)


### Bug Fixes

* **CreateTearsheet:** [#987](https://github.com/carbon-design-system/ibm-products/issues/987) create tearsheet resizing ([#988](https://github.com/carbon-design-system/ibm-products/issues/988)) ([5f3550e](https://github.com/carbon-design-system/ibm-products/commit/5f3550ef12665cef85b13409d438b312cb72e50b))





# [0.53.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.52.5...@carbon/ibm-cloud-cognitive@0.53.0) (2021-07-13)


### Features

* remove experimental package ([#964](https://github.com/carbon-design-system/ibm-products/issues/964)) ([063e1d1](https://github.com/carbon-design-system/ibm-products/commit/063e1d1b67eb15cf0a5397866a63a3b67fee8f4c))





## [0.52.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.52.4...@carbon/ibm-cloud-cognitive@0.52.5) (2021-07-13)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.52.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.52.3...@carbon/ibm-cloud-cognitive@0.52.4) (2021-07-12)


### Bug Fixes

* updates to card tests ([#972](https://github.com/carbon-design-system/ibm-products/issues/972)) ([c39e763](https://github.com/carbon-design-system/ibm-products/commit/c39e763ac961d64ea27f2c5375ddaccfc5ac962c))





## [0.52.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.52.2...@carbon/ibm-cloud-cognitive@0.52.3) (2021-07-12)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.52.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.52.1...@carbon/ibm-cloud-cognitive@0.52.2) (2021-07-08)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.52.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.52.0...@carbon/ibm-cloud-cognitive@0.52.1) (2021-07-08)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.52.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.51.6...@carbon/ibm-cloud-cognitive@0.52.0) (2021-07-07)


### Features

* update Carbon versions and dependencies ([#974](https://github.com/carbon-design-system/ibm-products/issues/974)) ([555509b](https://github.com/carbon-design-system/ibm-products/commit/555509b5ccb147ed0d794b5816f685aa8f7ae451))





## [0.51.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.51.5...@carbon/ibm-cloud-cognitive@0.51.6) (2021-07-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.51.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.51.4...@carbon/ibm-cloud-cognitive@0.51.5) (2021-07-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.51.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.51.3...@carbon/ibm-cloud-cognitive@0.51.4) (2021-07-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.51.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.51.2...@carbon/ibm-cloud-cognitive@0.51.3) (2021-07-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.51.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.51.1...@carbon/ibm-cloud-cognitive@0.51.2) (2021-07-07)


### Bug Fixes

* **SidePanel:** allow animation to complete when scroll length is short ([#970](https://github.com/carbon-design-system/ibm-products/issues/970)) ([ac894a5](https://github.com/carbon-design-system/ibm-products/commit/ac894a50bdc4a0b636adb8e6e2f5ea0a52d3e0ed))





## [0.51.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.51.0...@carbon/ibm-cloud-cognitive@0.51.1) (2021-07-06)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.51.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.11...@carbon/ibm-cloud-cognitive@0.51.0) (2021-07-06)


### Features

* add closeIconDescription required prop to AboutModal ([#968](https://github.com/carbon-design-system/ibm-products/issues/968)) ([2619256](https://github.com/carbon-design-system/ibm-products/commit/261925676ab4775fe947dc39f40701a8fbfe6779))





## [0.50.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.10...@carbon/ibm-cloud-cognitive@0.50.11) (2021-07-06)


### Bug Fixes

* **SidePanel:** fix back button positioning ([#969](https://github.com/carbon-design-system/ibm-products/issues/969)) ([34e7442](https://github.com/carbon-design-system/ibm-products/commit/34e744254ce95c63779ca614bcaa8c2e4fe70309))





## [0.50.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.9...@carbon/ibm-cloud-cognitive@0.50.10) (2021-07-02)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.50.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.8...@carbon/ibm-cloud-cognitive@0.50.9) (2021-07-01)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.50.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.7...@carbon/ibm-cloud-cognitive@0.50.8) (2021-07-01)


### Bug Fixes

* card refactor to multiple exports ([#949](https://github.com/carbon-design-system/ibm-products/issues/949)) ([e60fa76](https://github.com/carbon-design-system/ibm-products/commit/e60fa76963b3027aafa4a8a87e188c9dd5ab54b0))
* contributors ([#960](https://github.com/carbon-design-system/ibm-products/issues/960)) ([02966c3](https://github.com/carbon-design-system/ibm-products/commit/02966c30bf253a4bf4eb601fd928d1970c55a76f))
* update package readme with usage ([#951](https://github.com/carbon-design-system/ibm-products/issues/951)) ([f5b9a84](https://github.com/carbon-design-system/ibm-products/commit/f5b9a8433dfa866ec29f4a28267f1f86407db1eb))





## [0.50.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.6...@carbon/ibm-cloud-cognitive@0.50.7) (2021-07-01)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.50.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.5...@carbon/ibm-cloud-cognitive@0.50.6) (2021-07-01)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.50.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.4...@carbon/ibm-cloud-cognitive@0.50.5) (2021-06-30)


### Bug Fixes

* **NotificationsPanel:** add prop to set defaultToggled value ([#956](https://github.com/carbon-design-system/ibm-products/issues/956)) ([4f92e2a](https://github.com/carbon-design-system/ibm-products/commit/4f92e2a537bc210b86c2682bd8899a95e2693e5d))





## [0.50.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.3...@carbon/ibm-cloud-cognitive@0.50.4) (2021-06-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.50.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.2...@carbon/ibm-cloud-cognitive@0.50.3) (2021-06-30)


### Bug Fixes

* **CreateTearsheet:** allow progress steps to receive a secondary label ([#945](https://github.com/carbon-design-system/ibm-products/issues/945)) ([ff0ba7f](https://github.com/carbon-design-system/ibm-products/commit/ff0ba7fb442e879541dbb268bc6c5ba3eff46786))





## [0.50.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.1...@carbon/ibm-cloud-cognitive@0.50.2) (2021-06-29)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.50.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.50.0...@carbon/ibm-cloud-cognitive@0.50.1) (2021-06-25)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.50.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.49.4...@carbon/ibm-cloud-cognitive@0.50.0) (2021-06-25)


### Features

* release TagSet ([#937](https://github.com/carbon-design-system/ibm-products/issues/937)) ([e920bf5](https://github.com/carbon-design-system/ibm-products/commit/e920bf5b8cb78a86cc51805c0d26c9bd01aeb71e))





## [0.49.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.49.3...@carbon/ibm-cloud-cognitive@0.49.4) (2021-06-24)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.49.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.49.2...@carbon/ibm-cloud-cognitive@0.49.3) (2021-06-24)


### Bug Fixes

* **SidePanel:** make title/subtitle fixed when no title animation ([#933](https://github.com/carbon-design-system/ibm-products/issues/933)) ([18c097d](https://github.com/carbon-design-system/ibm-products/commit/18c097d8d590d52eb0527eed7de1c4b3786751ca))





## [0.49.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.49.1...@carbon/ibm-cloud-cognitive@0.49.2) (2021-06-24)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.49.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.49.0...@carbon/ibm-cloud-cognitive@0.49.1) (2021-06-24)


### Bug Fixes

* typo in property name ([#929](https://github.com/carbon-design-system/ibm-products/issues/929)) ([83e7137](https://github.com/carbon-design-system/ibm-products/commit/83e713705800a072d931b4046fa0509950eabb2b))





# [0.49.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.48.0...@carbon/ibm-cloud-cognitive@0.49.0) (2021-06-23)


### Features

* remove context header from ccs storybook ([#892](https://github.com/carbon-design-system/ibm-products/issues/892)) ([14a1c52](https://github.com/carbon-design-system/ibm-products/commit/14a1c524bc9fe379072e9a55f215aaf06a4a5341))





# [0.48.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.47.8...@carbon/ibm-cloud-cognitive@0.48.0) (2021-06-23)


### Features

* update Carbon versions and dependencies ([#927](https://github.com/carbon-design-system/ibm-products/issues/927)) ([5a8f7d6](https://github.com/carbon-design-system/ibm-products/commit/5a8f7d6b81b6da26fd0cb933c1c3de4bd27b481b))





## [0.47.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.47.7...@carbon/ibm-cloud-cognitive@0.47.8) (2021-06-23)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.47.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.47.6...@carbon/ibm-cloud-cognitive@0.47.7) (2021-06-22)


### Bug Fixes

* **CreateTearsheet:** remove overflow styles ([#924](https://github.com/carbon-design-system/ibm-products/issues/924)) ([369329a](https://github.com/carbon-design-system/ibm-products/commit/369329a34cd3ea45ae8e4c21938d358a78fd92cb))





## [0.47.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.47.5...@carbon/ibm-cloud-cognitive@0.47.6) (2021-06-22)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.47.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.47.4...@carbon/ibm-cloud-cognitive@0.47.5) (2021-06-22)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.47.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.47.3...@carbon/ibm-cloud-cognitive@0.47.4) (2021-06-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.47.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.47.2...@carbon/ibm-cloud-cognitive@0.47.3) (2021-06-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.47.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.47.1...@carbon/ibm-cloud-cognitive@0.47.2) (2021-06-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.47.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.47.0...@carbon/ibm-cloud-cognitive@0.47.1) (2021-06-20)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.47.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.46.1...@carbon/ibm-cloud-cognitive@0.47.0) (2021-06-18)


### Features

* **CreateTearsheet:** add animation on step changes ([#885](https://github.com/carbon-design-system/ibm-products/issues/885)) ([d72c825](https://github.com/carbon-design-system/ibm-products/commit/d72c8250cc96a16ed76076ab4dd3a7c19cd0f5a2))





## [0.46.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.46.0...@carbon/ibm-cloud-cognitive@0.46.1) (2021-06-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.46.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.45.4...@carbon/ibm-cloud-cognitive@0.46.0) (2021-06-17)


### Features

* tagset review updates part 2 ([#907](https://github.com/carbon-design-system/ibm-products/issues/907)) ([fbe3143](https://github.com/carbon-design-system/ibm-products/commit/fbe3143b12abb3d87b6e79eb668014a2015cc9cc))





## [0.45.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.45.3...@carbon/ibm-cloud-cognitive@0.45.4) (2021-06-17)


### Bug Fixes

* apikey modal pre release updates ([#906](https://github.com/carbon-design-system/ibm-products/issues/906)) ([6ae80e4](https://github.com/carbon-design-system/ibm-products/commit/6ae80e4ba115acb0ed534ccdf5efe6faa15f80e5))





## [0.45.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.45.2...@carbon/ibm-cloud-cognitive@0.45.3) (2021-06-17)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.45.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.45.1...@carbon/ibm-cloud-cognitive@0.45.2) (2021-06-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.45.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.45.0...@carbon/ibm-cloud-cognitive@0.45.1) (2021-06-15)


### Bug Fixes

* **HTTPErrors:** remove canary check on http error content component ([#900](https://github.com/carbon-design-system/ibm-products/issues/900)) ([e6e394a](https://github.com/carbon-design-system/ibm-products/commit/e6e394a4e90d3bfda58489a9a5687e0499215fb9))





# [0.45.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.44.0...@carbon/ibm-cloud-cognitive@0.45.0) (2021-06-15)


### Features

* breadcrumb overflow title and href updates ([#898](https://github.com/carbon-design-system/ibm-products/issues/898)) ([290198b](https://github.com/carbon-design-system/ibm-products/commit/290198bdd078060f4a91bb6c27904aa17ce21b7b))





# [0.44.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.43.1...@carbon/ibm-cloud-cognitive@0.44.0) (2021-06-15)


### Features

* simplified carbon token value in js ([#894](https://github.com/carbon-design-system/ibm-products/issues/894)) ([a225eee](https://github.com/carbon-design-system/ibm-products/commit/a225eee68364554f62f1f41889164c3f0e48e645))





## [0.43.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.43.0...@carbon/ibm-cloud-cognitive@0.43.1) (2021-06-15)


### Bug Fixes

* page header performance glitches ([#896](https://github.com/carbon-design-system/ibm-products/issues/896)) ([57eae46](https://github.com/carbon-design-system/ibm-products/commit/57eae4653f3b9efbe1218ad947ff6141760f0c14))





# [0.43.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.42.9...@carbon/ibm-cloud-cognitive@0.43.0) (2021-06-11)


### Features

* update page header sticky again ([#891](https://github.com/carbon-design-system/ibm-products/issues/891)) ([b69ec15](https://github.com/carbon-design-system/ibm-products/commit/b69ec1597640bef2e15f166c170f002b7fb727a0))





## [0.42.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.42.8...@carbon/ibm-cloud-cognitive@0.42.9) (2021-06-11)


### Bug Fixes

* **SidePanel:** add default subtitle height value ([#889](https://github.com/carbon-design-system/ibm-products/issues/889)) ([d7c61ae](https://github.com/carbon-design-system/ibm-products/commit/d7c61ae118e7c4eb9217f50d0d90bebef81fc4c8))





## [0.42.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.42.7...@carbon/ibm-cloud-cognitive@0.42.8) (2021-06-10)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.42.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.42.6...@carbon/ibm-cloud-cognitive@0.42.7) (2021-06-10)


### Bug Fixes

* import review updates ([#872](https://github.com/carbon-design-system/ibm-products/issues/872)) ([fbe0ce6](https://github.com/carbon-design-system/ibm-products/commit/fbe0ce61a5435061255e4a30bee3b3a785b7659f))





## [0.42.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.42.5...@carbon/ibm-cloud-cognitive@0.42.6) (2021-06-10)


### Bug Fixes

* page header styling on scroll ([#881](https://github.com/carbon-design-system/ibm-products/issues/881)) ([da5a472](https://github.com/carbon-design-system/ibm-products/commit/da5a472e0ecef94be5d6157dcb55b640c76bbf23))





## [0.42.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.42.4...@carbon/ibm-cloud-cognitive@0.42.5) (2021-06-10)


### Bug Fixes

* breadcrumb overflow in page header ([#880](https://github.com/carbon-design-system/ibm-products/issues/880)) ([fa71aa3](https://github.com/carbon-design-system/ibm-products/commit/fa71aa39c4666efadb47c02fd85c6bfe97515284))





## [0.42.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.42.3...@carbon/ibm-cloud-cognitive@0.42.4) (2021-06-10)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.42.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.42.2...@carbon/ibm-cloud-cognitive@0.42.3) (2021-06-10)


### Bug Fixes

* button and tag set block class errors ([#879](https://github.com/carbon-design-system/ibm-products/issues/879)) ([d26966d](https://github.com/carbon-design-system/ibm-products/commit/d26966dee8ef21d002c3d524914a1d2f8ff31818))





## [0.42.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.42.1...@carbon/ibm-cloud-cognitive@0.42.2) (2021-06-10)


### Bug Fixes

* improve AboutModal stories ([#875](https://github.com/carbon-design-system/ibm-products/issues/875)) ([5faf934](https://github.com/carbon-design-system/ibm-products/commit/5faf93494a33d523330e536b150013f4e339c5ec))





## [0.42.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.42.0...@carbon/ibm-cloud-cognitive@0.42.1) (2021-06-10)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.42.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.10...@carbon/ibm-cloud-cognitive@0.42.0) (2021-06-09)


### Features

* match Carbon peer deps for react ([#869](https://github.com/carbon-design-system/ibm-products/issues/869)) ([8f42118](https://github.com/carbon-design-system/ibm-products/commit/8f42118754a904554acee9ec3af2e1fae8143817))





## [0.41.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.9...@carbon/ibm-cloud-cognitive@0.41.10) (2021-06-09)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.41.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.8...@carbon/ibm-cloud-cognitive@0.41.9) (2021-06-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.41.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.7...@carbon/ibm-cloud-cognitive@0.41.8) (2021-06-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.41.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.6...@carbon/ibm-cloud-cognitive@0.41.7) (2021-06-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.41.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.5...@carbon/ibm-cloud-cognitive@0.41.6) (2021-06-04)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.41.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.4...@carbon/ibm-cloud-cognitive@0.41.5) (2021-06-04)


### Bug Fixes

* **CreateTearsheet:** import components together ([#856](https://github.com/carbon-design-system/ibm-products/issues/856)) ([65e23ad](https://github.com/carbon-design-system/ibm-products/commit/65e23adfe83c9f9652e60e00cdd19e2a696a7f32))





## [0.41.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.3...@carbon/ibm-cloud-cognitive@0.41.4) (2021-06-04)


### Bug Fixes

* updates to import modal for release review ([#855](https://github.com/carbon-design-system/ibm-products/issues/855)) ([48a8c35](https://github.com/carbon-design-system/ibm-products/commit/48a8c350e3e21f9b5095b1199c478911fc391225))





## [0.41.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.2...@carbon/ibm-cloud-cognitive@0.41.3) (2021-06-04)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.41.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.1...@carbon/ibm-cloud-cognitive@0.41.2) (2021-06-04)


### Bug Fixes

* **ActionSet:** ensure action set buttons have max width none ([#859](https://github.com/carbon-design-system/ibm-products/issues/859)) ([5aba160](https://github.com/carbon-design-system/ibm-products/commit/5aba1609193c241d86d2a2cda99ae6dfc6f43717))





## [0.41.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.41.0...@carbon/ibm-cloud-cognitive@0.41.1) (2021-06-03)


### Bug Fixes

* **SidePanel:** make review fixes for release ([#851](https://github.com/carbon-design-system/ibm-products/issues/851)) ([076616a](https://github.com/carbon-design-system/ibm-products/commit/076616a3807279548cb1acc161f67f0a3454181a))





# [0.41.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.20...@carbon/ibm-cloud-cognitive@0.41.0) (2021-06-02)


### Features

* **styles:** export used Carbon style modules ([#850](https://github.com/carbon-design-system/ibm-products/issues/850)) ([b876002](https://github.com/carbon-design-system/ibm-products/commit/b876002d7de7131d7db3880d1b3d34330d43be48))





## [0.40.20](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.19...@carbon/ibm-cloud-cognitive@0.40.20) (2021-06-02)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.19](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.18...@carbon/ibm-cloud-cognitive@0.40.19) (2021-06-02)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.18](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.17...@carbon/ibm-cloud-cognitive@0.40.18) (2021-06-01)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.17](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.16...@carbon/ibm-cloud-cognitive@0.40.17) (2021-06-01)


### Bug Fixes

* **CreateTearsheet:** use default button separator color variable ([#802](https://github.com/carbon-design-system/ibm-products/issues/802)) ([8594e69](https://github.com/carbon-design-system/ibm-products/commit/8594e69852c746b6108b778cdc88b7b56fbd6838))
* **SidePanel:** add validator to side panel and allPropType helper ([#797](https://github.com/carbon-design-system/ibm-products/issues/797)) ([c2262c9](https://github.com/carbon-design-system/ibm-products/commit/c2262c9a8ac0ac57b21232dc0e943aca7f22d4ed))





## [0.40.16](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.15...@carbon/ibm-cloud-cognitive@0.40.16) (2021-06-01)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.15](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.14...@carbon/ibm-cloud-cognitive@0.40.15) (2021-05-29)


### Bug Fixes

* html element method mock ([#833](https://github.com/carbon-design-system/ibm-products/issues/833)) ([fccb061](https://github.com/carbon-design-system/ibm-products/commit/fccb061fafaf42b9c91c309c9363b2e745ed1b11))





## [0.40.14](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.13...@carbon/ibm-cloud-cognitive@0.40.14) (2021-05-28)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.13](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.12...@carbon/ibm-cloud-cognitive@0.40.13) (2021-05-28)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.12](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.11...@carbon/ibm-cloud-cognitive@0.40.12) (2021-05-28)


### Bug Fixes

* remove and export modal fixes ([#830](https://github.com/carbon-design-system/ibm-products/issues/830)) ([0d8a4f5](https://github.com/carbon-design-system/ibm-products/commit/0d8a4f5d1c047b2a794a2d349693dadd891816d2))





## [0.40.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.10...@carbon/ibm-cloud-cognitive@0.40.11) (2021-05-27)


### Bug Fixes

* release review updates for export ([#828](https://github.com/carbon-design-system/ibm-products/issues/828)) ([7a7ae3e](https://github.com/carbon-design-system/ibm-products/commit/7a7ae3e9d02a6fcbab9d8f99a9f242f0b1c57c23))





## [0.40.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.9...@carbon/ibm-cloud-cognitive@0.40.10) (2021-05-27)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.8...@carbon/ibm-cloud-cognitive@0.40.9) (2021-05-27)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.7...@carbon/ibm-cloud-cognitive@0.40.8) (2021-05-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.6...@carbon/ibm-cloud-cognitive@0.40.7) (2021-05-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.5...@carbon/ibm-cloud-cognitive@0.40.6) (2021-05-26)


### Bug Fixes

* **HTTPErrors:** addresses review findings ([#789](https://github.com/carbon-design-system/ibm-products/issues/789)) ([1f8c9d9](https://github.com/carbon-design-system/ibm-products/commit/1f8c9d9c26ec1635b96f7c8d13925ff3ed8213af))





## [0.40.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.4...@carbon/ibm-cloud-cognitive@0.40.5) (2021-05-26)


### Bug Fixes

* **CreateTearsheet:** fix console error in tests from timeout issue ([#793](https://github.com/carbon-design-system/ibm-products/issues/793)) ([18cab39](https://github.com/carbon-design-system/ibm-products/commit/18cab399c921972d5b8b3eb90222f1a744a53a54))





## [0.40.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.3...@carbon/ibm-cloud-cognitive@0.40.4) (2021-05-26)


### Bug Fixes

* page header test coverage 100% ([#788](https://github.com/carbon-design-system/ibm-products/issues/788)) ([5a1d2d7](https://github.com/carbon-design-system/ibm-products/commit/5a1d2d7bdfff4d1cfc0a187f8a82992dfa946c75))





## [0.40.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.2...@carbon/ibm-cloud-cognitive@0.40.3) (2021-05-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.1...@carbon/ibm-cloud-cognitive@0.40.2) (2021-05-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.40.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.40.0...@carbon/ibm-cloud-cognitive@0.40.1) (2021-05-25)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.40.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.11...@carbon/ibm-cloud-cognitive@0.40.0) (2021-05-25)


### Features

* tagset modal design review updates ([#774](https://github.com/carbon-design-system/ibm-products/issues/774)) ([c9fdb06](https://github.com/carbon-design-system/ibm-products/commit/c9fdb06d6fdceabccd39ea97e7188141292cef9e))





## [0.39.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.10...@carbon/ibm-cloud-cognitive@0.39.11) (2021-05-25)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.39.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.9...@carbon/ibm-cloud-cognitive@0.39.10) (2021-05-24)


### Bug Fixes

* back arrow tooltip ([#778](https://github.com/carbon-design-system/ibm-products/issues/778)) ([b7c6dde](https://github.com/carbon-design-system/ibm-products/commit/b7c6dde284bb681ebcfc1474738b9280ecab82ed))





## [0.39.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.8...@carbon/ibm-cloud-cognitive@0.39.9) (2021-05-24)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.39.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.7...@carbon/ibm-cloud-cognitive@0.39.8) (2021-05-24)


### Bug Fixes

* remove wibble from example story ([#780](https://github.com/carbon-design-system/ibm-products/issues/780)) ([ca4910f](https://github.com/carbon-design-system/ibm-products/commit/ca4910f918fea1d65b8e9f06767a08ba72064d93))





## [0.39.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.6...@carbon/ibm-cloud-cognitive@0.39.7) (2021-05-24)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.39.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.5...@carbon/ibm-cloud-cognitive@0.39.6) (2021-05-24)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.39.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.4...@carbon/ibm-cloud-cognitive@0.39.5) (2021-05-21)


### Bug Fixes

* design review niggles ([#765](https://github.com/carbon-design-system/ibm-products/issues/765)) ([46a353b](https://github.com/carbon-design-system/ibm-products/commit/46a353b8ba9f30657f1b7cd3808a978e5cc3869c))





## [0.39.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.3...@carbon/ibm-cloud-cognitive@0.39.4) (2021-05-21)


### Bug Fixes

* forgot to add onClose to export modal ([#776](https://github.com/carbon-design-system/ibm-products/issues/776)) ([c381d93](https://github.com/carbon-design-system/ibm-products/commit/c381d93e123c33a600e7bf8dee0f3fd8c75767e6))





## [0.39.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.2...@carbon/ibm-cloud-cognitive@0.39.3) (2021-05-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.39.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.1...@carbon/ibm-cloud-cognitive@0.39.2) (2021-05-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.39.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.39.0...@carbon/ibm-cloud-cognitive@0.39.1) (2021-05-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.39.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.38.7...@carbon/ibm-cloud-cognitive@0.39.0) (2021-05-20)


### Features

* **SidePanel:** add optional onUnmount prop for cleanup ([#767](https://github.com/carbon-design-system/ibm-products/issues/767)) ([d135ea0](https://github.com/carbon-design-system/ibm-products/commit/d135ea0b2c9ae9f8e415828a1199bbc80e545551))





## [0.38.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.38.6...@carbon/ibm-cloud-cognitive@0.38.7) (2021-05-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.38.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.38.5...@carbon/ibm-cloud-cognitive@0.38.6) (2021-05-19)


### Bug Fixes

* remove modal release feedback updates ([#757](https://github.com/carbon-design-system/ibm-products/issues/757)) ([f6b97ba](https://github.com/carbon-design-system/ibm-products/commit/f6b97babd6f98da8f08ffbc3ddc24bac8f9b059e))





## [0.38.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.38.4...@carbon/ibm-cloud-cognitive@0.38.5) (2021-05-19)


### Bug Fixes

* issues raised in page header design review ([#754](https://github.com/carbon-design-system/ibm-products/issues/754)) ([13c5085](https://github.com/carbon-design-system/ibm-products/commit/13c5085b6de50c01a942f71b66e80a9516167c42))





## [0.38.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.38.3...@carbon/ibm-cloud-cognitive@0.38.4) (2021-05-19)


### Bug Fixes

* **Tearsheet:** fix background of pagination ([#747](https://github.com/carbon-design-system/ibm-products/issues/747)) ([f3fd9f7](https://github.com/carbon-design-system/ibm-products/commit/f3fd9f72e751e8b955af854b3a3c72e5a593f01d))





## [0.38.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.38.2...@carbon/ibm-cloud-cognitive@0.38.3) (2021-05-19)


### Bug Fixes

* **EmptyStates:** update stories and rename size prop ([#753](https://github.com/carbon-design-system/ibm-products/issues/753)) ([c5e6bfb](https://github.com/carbon-design-system/ibm-products/commit/c5e6bfb912b5d8bc2ab143df87f2b615f35939ac))





## [0.38.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.38.1...@carbon/ibm-cloud-cognitive@0.38.2) (2021-05-18)


### Bug Fixes

* **UserProfileImage:** updates based on release review notes ([#665](https://github.com/carbon-design-system/ibm-products/issues/665)) ([7294117](https://github.com/carbon-design-system/ibm-products/commit/7294117be66c99e6d1dfa4fa98810e7daf2f2ca4))





## [0.38.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.38.0...@carbon/ibm-cloud-cognitive@0.38.1) (2021-05-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.38.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.37.3...@carbon/ibm-cloud-cognitive@0.38.0) (2021-05-18)


### Features

* stop tagset overflow scrolling off screen ([#740](https://github.com/carbon-design-system/ibm-products/issues/740)) ([016a3ec](https://github.com/carbon-design-system/ibm-products/commit/016a3ec8ee20691de3ee0d4eb4ea44912276e67f))





## [0.37.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.37.2...@carbon/ibm-cloud-cognitive@0.37.3) (2021-05-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.37.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.37.1...@carbon/ibm-cloud-cognitive@0.37.2) (2021-05-17)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.37.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.37.0...@carbon/ibm-cloud-cognitive@0.37.1) (2021-05-14)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.37.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.24...@carbon/ibm-cloud-cognitive@0.37.0) (2021-05-14)


### Bug Fixes

* title and subtitle row responsivity ([#730](https://github.com/carbon-design-system/ibm-products/issues/730)) ([03e6bf2](https://github.com/carbon-design-system/ibm-products/commit/03e6bf28ac2999fc5ce1d94aace6aa8926931d10))


### Features

* show collapse button if requested ([#732](https://github.com/carbon-design-system/ibm-products/issues/732)) ([05d7423](https://github.com/carbon-design-system/ibm-products/commit/05d74236caf2f9d5e6d834a621ab9e708a9b1abb))





## [0.36.24](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.23...@carbon/ibm-cloud-cognitive@0.36.24) (2021-05-13)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.23](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.22...@carbon/ibm-cloud-cognitive@0.36.23) (2021-05-12)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.22](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.21...@carbon/ibm-cloud-cognitive@0.36.22) (2021-05-12)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.21](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.20...@carbon/ibm-cloud-cognitive@0.36.21) (2021-05-11)


### Bug Fixes

* prevent collapse button over action bar items ([#728](https://github.com/carbon-design-system/ibm-products/issues/728)) ([b9785eb](https://github.com/carbon-design-system/ibm-products/commit/b9785ebeba8c8eb0ef72ffd73675314629bf4fe3))





## [0.36.20](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.19...@carbon/ibm-cloud-cognitive@0.36.20) (2021-05-10)


### Bug Fixes

* breadcrumb styling ([#723](https://github.com/carbon-design-system/ibm-products/issues/723)) ([65ac371](https://github.com/carbon-design-system/ibm-products/commit/65ac371a0f48406acb1d6193dd9a45cefa8f9a57))





## [0.36.19](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.18...@carbon/ibm-cloud-cognitive@0.36.19) (2021-05-10)


### Bug Fixes

* **SidePanel:** add shadow only for slideOver panels without overlays ([#722](https://github.com/carbon-design-system/ibm-products/issues/722)) ([9cb74d4](https://github.com/carbon-design-system/ibm-products/commit/9cb74d4ff006e30c79512b80d480742219d2c639))





## [0.36.18](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.17...@carbon/ibm-cloud-cognitive@0.36.18) (2021-05-10)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.17](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.16...@carbon/ibm-cloud-cognitive@0.36.17) (2021-05-10)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.16](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.15...@carbon/ibm-cloud-cognitive@0.36.16) (2021-05-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.15](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.14...@carbon/ibm-cloud-cognitive@0.36.15) (2021-05-05)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.14](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.13...@carbon/ibm-cloud-cognitive@0.36.14) (2021-05-05)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.13](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.12...@carbon/ibm-cloud-cognitive@0.36.13) (2021-05-05)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.12](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.11...@carbon/ibm-cloud-cognitive@0.36.12) (2021-05-05)


### Bug Fixes

* page header deprecations ([#697](https://github.com/carbon-design-system/ibm-products/issues/697)) ([ee559f9](https://github.com/carbon-design-system/ibm-products/commit/ee559f93896a416c01d0e790864835542726d44a))





## [0.36.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.10...@carbon/ibm-cloud-cognitive@0.36.11) (2021-05-04)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.9...@carbon/ibm-cloud-cognitive@0.36.10) (2021-04-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.8...@carbon/ibm-cloud-cognitive@0.36.9) (2021-04-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.7...@carbon/ibm-cloud-cognitive@0.36.8) (2021-04-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.6...@carbon/ibm-cloud-cognitive@0.36.7) (2021-04-30)


### Bug Fixes

* testing and blockClass for import modal ([#686](https://github.com/carbon-design-system/ibm-products/issues/686)) ([42a4f39](https://github.com/carbon-design-system/ibm-products/commit/42a4f396b84a19cc1db98bebb3bd9ce6d860dfc4))





## [0.36.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.5...@carbon/ibm-cloud-cognitive@0.36.6) (2021-04-30)


### Bug Fixes

* small fixes to saving for release review ([#683](https://github.com/carbon-design-system/ibm-products/issues/683)) ([384db15](https://github.com/carbon-design-system/ibm-products/commit/384db15a4057b7e91543be9cba05df303f239447))





## [0.36.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.4...@carbon/ibm-cloud-cognitive@0.36.5) (2021-04-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.3...@carbon/ibm-cloud-cognitive@0.36.4) (2021-04-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.2...@carbon/ibm-cloud-cognitive@0.36.3) (2021-04-29)


### Bug Fixes

* **SidePanel:** add extra padding bottom to collapsed title underline ([#678](https://github.com/carbon-design-system/ibm-products/issues/678)) ([c1d5eb6](https://github.com/carbon-design-system/ibm-products/commit/c1d5eb6f8b49df96fd9f742a873ef272998900ad))





## [0.36.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.1...@carbon/ibm-cloud-cognitive@0.36.2) (2021-04-29)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.36.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.36.0...@carbon/ibm-cloud-cognitive@0.36.1) (2021-04-29)


### Bug Fixes

* added additional import modal tests ([#673](https://github.com/carbon-design-system/ibm-products/issues/673)) ([f6a9a2f](https://github.com/carbon-design-system/ibm-products/commit/f6a9a2fba7519415eb5df0b3e8485c5e6bd8c6b4))





# [0.36.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.31...@carbon/ibm-cloud-cognitive@0.36.0) (2021-04-29)


### Features

* **PageHeader:** back button to replace breadcrumbs on small viewport ([#676](https://github.com/carbon-design-system/ibm-products/issues/676)) ([ae3224e](https://github.com/carbon-design-system/ibm-products/commit/ae3224e12263e78487ed667914be8ba08935e3d9))





## [0.35.31](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.30...@carbon/ibm-cloud-cognitive@0.35.31) (2021-04-29)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.30](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.29...@carbon/ibm-cloud-cognitive@0.35.30) (2021-04-29)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.29](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.28...@carbon/ibm-cloud-cognitive@0.35.29) (2021-04-29)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.28](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.27...@carbon/ibm-cloud-cognitive@0.35.28) (2021-04-28)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.27](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.26...@carbon/ibm-cloud-cognitive@0.35.27) (2021-04-28)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.26](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.25...@carbon/ibm-cloud-cognitive@0.35.26) (2021-04-28)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.25](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.24...@carbon/ibm-cloud-cognitive@0.35.25) (2021-04-28)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.24](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.23...@carbon/ibm-cloud-cognitive@0.35.24) (2021-04-27)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.23](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.22...@carbon/ibm-cloud-cognitive@0.35.23) (2021-04-27)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.22](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.21...@carbon/ibm-cloud-cognitive@0.35.22) (2021-04-27)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.21](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.20...@carbon/ibm-cloud-cognitive@0.35.21) (2021-04-26)


### Bug Fixes

* adds and improves testing to several components ([#649](https://github.com/carbon-design-system/ibm-products/issues/649)) ([b336afa](https://github.com/carbon-design-system/ibm-products/commit/b336afac9a9c8f730393a38e53f1d383911c36f3))





## [0.35.20](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.19...@carbon/ibm-cloud-cognitive@0.35.20) (2021-04-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.19](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.18...@carbon/ibm-cloud-cognitive@0.35.19) (2021-04-26)


### Bug Fixes

* add tag set tests n tidy ([#642](https://github.com/carbon-design-system/ibm-products/issues/642)) ([cfeeaf9](https://github.com/carbon-design-system/ibm-products/commit/cfeeaf943fe0bb70d543e962cb51e3303c6debb4))





## [0.35.18](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.17...@carbon/ibm-cloud-cognitive@0.35.18) (2021-04-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.17](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.16...@carbon/ibm-cloud-cognitive@0.35.17) (2021-04-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.16](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.15...@carbon/ibm-cloud-cognitive@0.35.16) (2021-04-23)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.15](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.14...@carbon/ibm-cloud-cognitive@0.35.15) (2021-04-22)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.14](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.13...@carbon/ibm-cloud-cognitive@0.35.14) (2021-04-22)


### Bug Fixes

* page header action bar usage ([#622](https://github.com/carbon-design-system/ibm-products/issues/622)) ([bfa4370](https://github.com/carbon-design-system/ibm-products/commit/bfa437079b68ea8583e0ea5a9df5ce344936d85c))





## [0.35.13](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.12...@carbon/ibm-cloud-cognitive@0.35.13) (2021-04-21)


### Bug Fixes

* added testing for export release review ([#635](https://github.com/carbon-design-system/ibm-products/issues/635)) ([eff717e](https://github.com/carbon-design-system/ibm-products/commit/eff717e88c024fc671ece9d8963924e5495772a0))





## [0.35.12](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.11...@carbon/ibm-cloud-cognitive@0.35.12) (2021-04-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.10...@carbon/ibm-cloud-cognitive@0.35.11) (2021-04-21)


### Bug Fixes

* **NotificationsPanel:** fix z index issue in bottom actions ([#629](https://github.com/carbon-design-system/ibm-products/issues/629)) ([8700e7d](https://github.com/carbon-design-system/ibm-products/commit/8700e7d7f09c33f39395ca76540db66cd9052d2d))





## [0.35.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.9...@carbon/ibm-cloud-cognitive@0.35.10) (2021-04-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.8...@carbon/ibm-cloud-cognitive@0.35.9) (2021-04-20)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.7...@carbon/ibm-cloud-cognitive@0.35.8) (2021-04-20)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.6...@carbon/ibm-cloud-cognitive@0.35.7) (2021-04-20)


### Bug Fixes

* import modal style updates ([#624](https://github.com/carbon-design-system/ibm-products/issues/624)) ([bf94094](https://github.com/carbon-design-system/ibm-products/commit/bf94094c7d0dfa4c6b60ecc248f7da514f24a47b))





## [0.35.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.5...@carbon/ibm-cloud-cognitive@0.35.6) (2021-04-20)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.4...@carbon/ibm-cloud-cognitive@0.35.5) (2021-04-20)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.3...@carbon/ibm-cloud-cognitive@0.35.4) (2021-04-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.2...@carbon/ibm-cloud-cognitive@0.35.3) (2021-04-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.35.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.1...@carbon/ibm-cloud-cognitive@0.35.2) (2021-04-16)


### Bug Fixes

* **NotificationsPanel:** address review findings and add more tests ([#613](https://github.com/carbon-design-system/ibm-products/issues/613)) ([a8e6bb4](https://github.com/carbon-design-system/ibm-products/commit/a8e6bb47f7b298ab00c077442c3ea3c85f7f3525))





## [0.35.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.35.0...@carbon/ibm-cloud-cognitive@0.35.1) (2021-04-16)


### Bug Fixes

* minor fix to make AboutModal stories switch more smoothly ([#609](https://github.com/carbon-design-system/ibm-products/issues/609)) ([b3fe083](https://github.com/carbon-design-system/ibm-products/commit/b3fe083c411a3d627031094fe608c57bd378990d))





# [0.35.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.33...@carbon/ibm-cloud-cognitive@0.35.0) (2021-04-16)


### Features

* upd breadcrumb with overflow to internal ([#610](https://github.com/carbon-design-system/ibm-products/issues/610)) ([2e34eb9](https://github.com/carbon-design-system/ibm-products/commit/2e34eb9fe8b24c5b17d23eb134cdba6aec6736ac))





## [0.34.33](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.32...@carbon/ibm-cloud-cognitive@0.34.33) (2021-04-15)


### Bug Fixes

* update testing and package-settings ([#612](https://github.com/carbon-design-system/ibm-products/issues/612)) ([d2bb0f2](https://github.com/carbon-design-system/ibm-products/commit/d2bb0f2ae5a4b6a7c3d1e3d61e1aa0ea94c074d8))





## [0.34.32](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.31...@carbon/ibm-cloud-cognitive@0.34.32) (2021-04-15)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.31](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.30...@carbon/ibm-cloud-cognitive@0.34.31) (2021-04-15)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.30](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.29...@carbon/ibm-cloud-cognitive@0.34.30) (2021-04-15)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.29](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.28...@carbon/ibm-cloud-cognitive@0.34.29) (2021-04-14)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.28](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.27...@carbon/ibm-cloud-cognitive@0.34.28) (2021-04-14)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.27](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.26...@carbon/ibm-cloud-cognitive@0.34.27) (2021-04-14)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.26](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.25...@carbon/ibm-cloud-cognitive@0.34.26) (2021-04-14)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.25](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.24...@carbon/ibm-cloud-cognitive@0.34.25) (2021-04-14)


### Bug Fixes

* **SidePanel:** add transition to divider appearing during animation ([#599](https://github.com/carbon-design-system/ibm-products/issues/599)) ([4a7fac1](https://github.com/carbon-design-system/ibm-products/commit/4a7fac1843052b5495996aca21b61660ac0ef304))





## [0.34.24](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.23...@carbon/ibm-cloud-cognitive@0.34.24) (2021-04-13)


### Bug Fixes

* **SidePanel:** add resize detector to adapt to new actions height ([#596](https://github.com/carbon-design-system/ibm-products/issues/596)) ([e812ff9](https://github.com/carbon-design-system/ibm-products/commit/e812ff953cc40d83265d02540357578c95150ec5))





## [0.34.23](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.22...@carbon/ibm-cloud-cognitive@0.34.23) (2021-04-13)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.22](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.21...@carbon/ibm-cloud-cognitive@0.34.22) (2021-04-13)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.21](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.20...@carbon/ibm-cloud-cognitive@0.34.21) (2021-04-12)


### Bug Fixes

* **SidePanel:** correct how bottom padding of content is calculated ([#593](https://github.com/carbon-design-system/ibm-products/issues/593)) ([12168c9](https://github.com/carbon-design-system/ibm-products/commit/12168c9c023e77940a2c6a5b97d1aedeed596a7f))





## [0.34.20](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.19...@carbon/ibm-cloud-cognitive@0.34.20) (2021-04-12)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.19](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.18...@carbon/ibm-cloud-cognitive@0.34.19) (2021-04-12)


### Bug Fixes

* adds tests and updates docs for saving ([#591](https://github.com/carbon-design-system/ibm-products/issues/591)) ([d873051](https://github.com/carbon-design-system/ibm-products/commit/d8730510c08edd79f3b70a15a7fc4c323f684175))





## [0.34.18](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.17...@carbon/ibm-cloud-cognitive@0.34.18) (2021-04-12)


### Bug Fixes

* **NotificationsPanel:** release review fixes ([#584](https://github.com/carbon-design-system/ibm-products/issues/584)) ([7c9af63](https://github.com/carbon-design-system/ibm-products/commit/7c9af63a6c1b258f1b8743bcfccc47e0bd6eb1ca))





## [0.34.17](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.16...@carbon/ibm-cloud-cognitive@0.34.17) (2021-04-12)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.16](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.15...@carbon/ibm-cloud-cognitive@0.34.16) (2021-04-12)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.15](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.14...@carbon/ibm-cloud-cognitive@0.34.15) (2021-04-09)


### Bug Fixes

* saving design feedback ([#582](https://github.com/carbon-design-system/ibm-products/issues/582)) ([121dbaf](https://github.com/carbon-design-system/ibm-products/commit/121dbafc1ed11579c104b4329d73cadbe56a7df9))





## [0.34.14](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.13...@carbon/ibm-cloud-cognitive@0.34.14) (2021-04-09)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.13](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.12...@carbon/ibm-cloud-cognitive@0.34.13) (2021-04-09)


### Bug Fixes

* more card design feedback ([#576](https://github.com/carbon-design-system/ibm-products/issues/576)) ([cd73a79](https://github.com/carbon-design-system/ibm-products/commit/cd73a794a17b5b2e4784effd45744a07bc5b3351))





## [0.34.12](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.11...@carbon/ibm-cloud-cognitive@0.34.12) (2021-04-09)


### Bug Fixes

* out dated canary instruction ([#578](https://github.com/carbon-design-system/ibm-products/issues/578)) ([#579](https://github.com/carbon-design-system/ibm-products/issues/579)) ([97bb6a6](https://github.com/carbon-design-system/ibm-products/commit/97bb6a6721cdac8c6b6c7cb98452a0025d64faeb))





## [0.34.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.10...@carbon/ibm-cloud-cognitive@0.34.11) (2021-04-08)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.9...@carbon/ibm-cloud-cognitive@0.34.10) (2021-04-08)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.8...@carbon/ibm-cloud-cognitive@0.34.9) (2021-04-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.7...@carbon/ibm-cloud-cognitive@0.34.8) (2021-04-07)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.6...@carbon/ibm-cloud-cognitive@0.34.7) (2021-04-06)


### Bug Fixes

* card design feedback ([#561](https://github.com/carbon-design-system/ibm-products/issues/561)) ([7668278](https://github.com/carbon-design-system/ibm-products/commit/76682786f4422cf9267a84b7e6f1409043758537))





## [0.34.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.5...@carbon/ibm-cloud-cognitive@0.34.6) (2021-04-06)


### Bug Fixes

* action bar crash when no space for overflow ([#556](https://github.com/carbon-design-system/ibm-products/issues/556)) ([74d1718](https://github.com/carbon-design-system/ibm-products/commit/74d1718771dffb434512905a4c5ab2ed518a9a35))





## [0.34.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.4...@carbon/ibm-cloud-cognitive@0.34.5) (2021-04-05)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.3...@carbon/ibm-cloud-cognitive@0.34.4) (2021-04-05)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.2...@carbon/ibm-cloud-cognitive@0.34.3) (2021-04-02)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.1...@carbon/ibm-cloud-cognitive@0.34.2) (2021-04-01)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.34.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.34.0...@carbon/ibm-cloud-cognitive@0.34.1) (2021-04-01)


### Bug Fixes

* page header styles either side of md breakpoint ([#554](https://github.com/carbon-design-system/ibm-products/issues/554)) ([6abab44](https://github.com/carbon-design-system/ibm-products/commit/6abab440845b9919dbdd7e4a3b2c6d021f6477b8))





# [0.34.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.33.0...@carbon/ibm-cloud-cognitive@0.34.0) (2021-04-01)


### Features

* add breadcrumb test and overflow aria label ([#537](https://github.com/carbon-design-system/ibm-products/issues/537)) ([f383b36](https://github.com/carbon-design-system/ibm-products/commit/f383b36d4f2987ae3032fa53319b883df95602ba))





# [0.33.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.32.4...@carbon/ibm-cloud-cognitive@0.33.0) (2021-04-01)


### Features

* card refactor ([#526](https://github.com/carbon-design-system/ibm-products/issues/526)) ([fe0943f](https://github.com/carbon-design-system/ibm-products/commit/fe0943ff6dbf8a7e08a6b029e9b09c258c0360a5))





## [0.32.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.32.3...@carbon/ibm-cloud-cognitive@0.32.4) (2021-03-31)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.32.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.32.2...@carbon/ibm-cloud-cognitive@0.32.3) (2021-03-31)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.32.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.32.1...@carbon/ibm-cloud-cognitive@0.32.2) (2021-03-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.32.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.32.0...@carbon/ibm-cloud-cognitive@0.32.1) (2021-03-30)


### Bug Fixes

* **HTTPErrors:** fix centering issue with css ([#543](https://github.com/carbon-design-system/ibm-products/issues/543)) ([3783d62](https://github.com/carbon-design-system/ibm-products/commit/3783d627b5626fe6077a317c15f1b6542e23e8ff))





# [0.32.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.31.5...@carbon/ibm-cloud-cognitive@0.32.0) (2021-03-30)


### Features

* add header pre and toggle collapse features ([#541](https://github.com/carbon-design-system/ibm-products/issues/541)) ([7ff30b8](https://github.com/carbon-design-system/ibm-products/commit/7ff30b8d6422c955841bce4e8a75b1f805492fe3))





## [0.31.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.31.4...@carbon/ibm-cloud-cognitive@0.31.5) (2021-03-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.31.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.31.3...@carbon/ibm-cloud-cognitive@0.31.4) (2021-03-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.31.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.31.2...@carbon/ibm-cloud-cognitive@0.31.3) (2021-03-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.31.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.31.1...@carbon/ibm-cloud-cognitive@0.31.2) (2021-03-30)


### Bug Fixes

* **EmptyState:** fix error logs by not having defaults for shared props ([#535](https://github.com/carbon-design-system/ibm-products/issues/535)) ([3de7429](https://github.com/carbon-design-system/ibm-products/commit/3de7429a8bb841c97df37d2711bc4a97f0241064))





## [0.31.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.31.0...@carbon/ibm-cloud-cognitive@0.31.1) (2021-03-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





# [0.31.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.30.8...@carbon/ibm-cloud-cognitive@0.31.0) (2021-03-26)


### Features

* new release for experimental wrapper ([#532](https://github.com/carbon-design-system/ibm-products/issues/532)) ([b42c47d](https://github.com/carbon-design-system/ibm-products/commit/b42c47ddc171a31457b7d4b9a1bcf804d4fa9d4f))





## [0.30.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.30.7...@carbon/ibm-cloud-cognitive@0.30.8) (2021-03-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.30.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.30.6...@carbon/ibm-cloud-cognitive@0.30.7) (2021-03-26)


### Bug Fixes

* **Notifications:** new notifications get sorted as expected now ([#527](https://github.com/carbon-design-system/ibm-products/issues/527)) ([2f762e8](https://github.com/carbon-design-system/ibm-products/commit/2f762e812c9728525721b2480e3bdd86f533bbc0))





## [0.30.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.30.5...@carbon/ibm-cloud-cognitive@0.30.6) (2021-03-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.30.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.30.4...@carbon/ibm-cloud-cognitive@0.30.5) (2021-03-25)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.30.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.30.3...@carbon/ibm-cloud-cognitive@0.30.4) (2021-03-25)


### Bug Fixes

* add tests to PageActionItem ([#516](https://github.com/carbon-design-system/ibm-products/issues/516)) ([f1e5de2](https://github.com/carbon-design-system/ibm-products/commit/f1e5de288720be43f411b173486b5ed5ebe33759))





## [0.30.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.30.2...@carbon/ibm-cloud-cognitive@0.30.3) (2021-03-25)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.30.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.30.1...@carbon/ibm-cloud-cognitive@0.30.2) (2021-03-25)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.30.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.30.0...@carbon/ibm-cloud-cognitive@0.30.1) (2021-03-25)


### Bug Fixes

* **SidePanel:** should fix focus trap which is breaking the side panel ([#511](https://github.com/carbon-design-system/ibm-products/issues/511)) ([47d9828](https://github.com/carbon-design-system/ibm-products/commit/47d98287f25284a20da3a2e8d480b138ee876cfc))





# [0.30.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.29.0...@carbon/ibm-cloud-cognitive@0.30.0) (2021-03-24)


### Features

* animation for in-progress icon ([#512](https://github.com/carbon-design-system/ibm-products/issues/512)) ([cf6d06f](https://github.com/carbon-design-system/ibm-products/commit/cf6d06f8b279fe84c18dd23baf9c267c85e88369))





# [0.29.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.28.10...@carbon/ibm-cloud-cognitive@0.29.0) (2021-03-24)


### Features

* add action bar tests ([#338](https://github.com/carbon-design-system/ibm-products/issues/338)) ([d1df237](https://github.com/carbon-design-system/ibm-products/commit/d1df237652e9f22c5018d3fa1859827a037f477d))





## [0.28.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.28.9...@carbon/ibm-cloud-cognitive@0.28.10) (2021-03-24)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.28.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.28.8...@carbon/ibm-cloud-cognitive@0.28.9) (2021-03-23)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.28.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.28.7...@carbon/ibm-cloud-cognitive@0.28.8) (2021-03-23)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.28.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.28.6...@carbon/ibm-cloud-cognitive@0.28.7) (2021-03-22)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## [0.28.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive@0.2.7...@carbon/ibm-cloud-cognitive@0.28.6) (2021-03-22)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive





## -------- Renamed ibm-cloud-cognitive-experimental package to ibm-cloud-cognitive ----------
## [0.28.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.28.3...@carbon/ibm-cloud-cognitive-experimental@0.28.4) (2021-03-22)



## [0.28.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.28.2...@carbon/ibm-cloud-cognitive-experimental@0.28.3) (2021-03-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.28.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.28.1...@carbon/ibm-cloud-cognitive-experimental@0.28.2) (2021-03-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.28.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.28.0...@carbon/ibm-cloud-cognitive-experimental@0.28.1) (2021-03-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





# [0.28.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.27.1...@carbon/ibm-cloud-cognitive-experimental@0.28.0) (2021-03-19)


### Features

* saving ([#476](https://github.com/carbon-design-system/ibm-products/issues/476)) ([8ccf7bd](https://github.com/carbon-design-system/ibm-products/commit/8ccf7bd412e8b94ac86abc9c635a47a097700133))





## [0.27.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.27.0...@carbon/ibm-cloud-cognitive-experimental@0.27.1) (2021-03-19)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





# [0.27.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.11...@carbon/ibm-cloud-cognitive-experimental@0.27.0) (2021-03-19)


### Features

* add carbon telemetry ([#477](https://github.com/carbon-design-system/ibm-products/issues/477)) ([950c9f3](https://github.com/carbon-design-system/ibm-products/commit/950c9f3394af98f93f39851f70e126f944c7477a))





## [0.26.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.10...@carbon/ibm-cloud-cognitive-experimental@0.26.11) (2021-03-18)


### Bug Fixes

* update WebTerminal ([#479](https://github.com/carbon-design-system/ibm-products/issues/479)) ([211f3dd](https://github.com/carbon-design-system/ibm-products/commit/211f3dd2fce7e455fc98dc407ac01b9aefb3f15f))





## [0.26.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.9...@carbon/ibm-cloud-cognitive-experimental@0.26.10) (2021-03-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.26.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.8...@carbon/ibm-cloud-cognitive-experimental@0.26.9) (2021-03-18)


### Bug Fixes

* set standard pattern for SCSS per Carbon ([#478](https://github.com/carbon-design-system/ibm-products/issues/478)) ([fd19d32](https://github.com/carbon-design-system/ibm-products/commit/fd19d32199ea377d46d4bf42375b4ba6d80c31d3))





## [0.26.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.7...@carbon/ibm-cloud-cognitive-experimental@0.26.8) (2021-03-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.26.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.6...@carbon/ibm-cloud-cognitive-experimental@0.26.7) (2021-03-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.26.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.5...@carbon/ibm-cloud-cognitive-experimental@0.26.6) (2021-03-18)


### Bug Fixes

* **Notifications:** use new empty state, add empty state label prop ([#468](https://github.com/carbon-design-system/ibm-products/issues/468)) ([7ee3dcd](https://github.com/carbon-design-system/ibm-products/commit/7ee3dcd52f07d9bbf4b21c5b60af07168efa90c0))





## [0.26.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.4...@carbon/ibm-cloud-cognitive-experimental@0.26.5) (2021-03-18)


### Bug Fixes

* **EmptyStates:** remove utility classnames function ([#465](https://github.com/carbon-design-system/ibm-products/issues/465)) ([04d688e](https://github.com/carbon-design-system/ibm-products/commit/04d688e90e0b51971ad3016eb622a760408f697a))





## [0.26.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.3...@carbon/ibm-cloud-cognitive-experimental@0.26.4) (2021-03-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.26.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.2...@carbon/ibm-cloud-cognitive-experimental@0.26.3) (2021-03-18)


### Bug Fixes

* canary component warnings ([#472](https://github.com/carbon-design-system/ibm-products/issues/472)) ([91930f0](https://github.com/carbon-design-system/ibm-products/commit/91930f0ce6cba909baf01e61d8b4917fe1dadef1))





## [0.26.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.1...@carbon/ibm-cloud-cognitive-experimental@0.26.2) (2021-03-17)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.26.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.26.0...@carbon/ibm-cloud-cognitive-experimental@0.26.1) (2021-03-17)


### Bug Fixes

* quieten experimental tests ([#454](https://github.com/carbon-design-system/ibm-products/issues/454)) ([85d5a52](https://github.com/carbon-design-system/ibm-products/commit/85d5a52c98370743c6218f41ba192da9d10e7508))





# [0.26.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.25.1...@carbon/ibm-cloud-cognitive-experimental@0.26.0) (2021-03-16)


### Features

* **HTTPErrors:** add new 404 and other http error components ([#456](https://github.com/carbon-design-system/ibm-products/issues/456)) ([ea42547](https://github.com/carbon-design-system/ibm-products/commit/ea425472c2a31144989acc8f9ba53d6a175651ab))





## [0.25.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.25.0...@carbon/ibm-cloud-cognitive-experimental@0.25.1) (2021-03-16)


### Bug Fixes

* update card docs ([#459](https://github.com/carbon-design-system/ibm-products/issues/459)) ([faac6c6](https://github.com/carbon-design-system/ibm-products/commit/faac6c68268c9a9538807cd9dafaee69e13f9617))





# [0.25.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.24.6...@carbon/ibm-cloud-cognitive-experimental@0.25.0) (2021-03-16)


### Features

* warn on feature flag use ([#436](https://github.com/carbon-design-system/ibm-products/issues/436)) ([b3fc781](https://github.com/carbon-design-system/ibm-products/commit/b3fc7811e84f3e721da7882256925d9eb4bbfbda))





## [0.24.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.24.5...@carbon/ibm-cloud-cognitive-experimental@0.24.6) (2021-03-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.24.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.24.4...@carbon/ibm-cloud-cognitive-experimental@0.24.5) (2021-03-16)


### Bug Fixes

* useless fragment issue in unwrap ([#448](https://github.com/carbon-design-system/ibm-products/issues/448)) ([ef94bf2](https://github.com/carbon-design-system/ibm-products/commit/ef94bf217ced96f34aa1c5bfd48a7dff376339ed))





## [0.24.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.24.3...@carbon/ibm-cloud-cognitive-experimental@0.24.4) (2021-03-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.24.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.24.2...@carbon/ibm-cloud-cognitive-experimental@0.24.3) (2021-03-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.24.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.24.1...@carbon/ibm-cloud-cognitive-experimental@0.24.2) (2021-03-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.24.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.24.0...@carbon/ibm-cloud-cognitive-experimental@0.24.1) (2021-03-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





# [0.24.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.23.3...@carbon/ibm-cloud-cognitive-experimental@0.24.0) (2021-03-15)


### Features

* **HTTPErrors:** initial component structure ([#437](https://github.com/carbon-design-system/ibm-products/issues/437)) ([23e4454](https://github.com/carbon-design-system/ibm-products/commit/23e44549b6ac331e115f7a38665ca10639c05679))





## [0.23.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.23.2...@carbon/ibm-cloud-cognitive-experimental@0.23.3) (2021-03-15)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.23.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.23.1...@carbon/ibm-cloud-cognitive-experimental@0.23.2) (2021-03-12)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.23.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.23.0...@carbon/ibm-cloud-cognitive-experimental@0.23.1) (2021-03-11)


### Bug Fixes

* **SidePanel:** add classname prop to side panel ([#433](https://github.com/carbon-design-system/ibm-products/issues/433)) ([b2c7f18](https://github.com/carbon-design-system/ibm-products/commit/b2c7f188e50e9aaad8a1dcab3b22083ac911933a))





# [0.23.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.22.0...@carbon/ibm-cloud-cognitive-experimental@0.23.0) (2021-03-11)


### Features

* update remaining components to be in line with feature flags proposal ([#429](https://github.com/carbon-design-system/ibm-products/issues/429)) ([a6c870a](https://github.com/carbon-design-system/ibm-products/commit/a6c870a62e72a8ca1b992f17188cc8a991f00ec8))





# [0.22.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.21.6...@carbon/ibm-cloud-cognitive-experimental@0.22.0) (2021-03-11)


### Features

* bump carbon versions to latest ([#426](https://github.com/carbon-design-system/ibm-products/issues/426)) ([761ea98](https://github.com/carbon-design-system/ibm-products/commit/761ea98c33a6be318293526833c316f3d44db533))





## [0.21.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.21.5...@carbon/ibm-cloud-cognitive-experimental@0.21.6) (2021-03-11)


### Bug Fixes

* **EmptyState:** illustrations should render correctly now ([#332](https://github.com/carbon-design-system/ibm-products/issues/332)) ([d81fee2](https://github.com/carbon-design-system/ibm-products/commit/d81fee2322e6c66a9773de71f57390956756bfd3)), closes [#392](https://github.com/carbon-design-system/ibm-products/issues/392) [#396](https://github.com/carbon-design-system/ibm-products/issues/396) [#400](https://github.com/carbon-design-system/ibm-products/issues/400) [#389](https://github.com/carbon-design-system/ibm-products/issues/389) [#406](https://github.com/carbon-design-system/ibm-products/issues/406) [#402](https://github.com/carbon-design-system/ibm-products/issues/402) [#401](https://github.com/carbon-design-system/ibm-products/issues/401) [#398](https://github.com/carbon-design-system/ibm-products/issues/398) [#410](https://github.com/carbon-design-system/ibm-products/issues/410) [#403](https://github.com/carbon-design-system/ibm-products/issues/403) [#414](https://github.com/carbon-design-system/ibm-products/issues/414) [#387](https://github.com/carbon-design-system/ibm-products/issues/387) [#417](https://github.com/carbon-design-system/ibm-products/issues/417) [#385](https://github.com/carbon-design-system/ibm-products/issues/385) [#419](https://github.com/carbon-design-system/ibm-products/issues/419) [#418](https://github.com/carbon-design-system/ibm-products/issues/418) [#412](https://github.com/carbon-design-system/ibm-products/issues/412) [#421](https://github.com/carbon-design-system/ibm-products/issues/421) [#423](https://github.com/carbon-design-system/ibm-products/issues/423) [#425](https://github.com/carbon-design-system/ibm-products/issues/425) [#422](https://github.com/carbon-design-system/ibm-products/issues/422) [#351](https://github.com/carbon-design-system/ibm-products/issues/351) [#428](https://github.com/carbon-design-system/ibm-products/issues/428)





## [0.21.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.21.4...@carbon/ibm-cloud-cognitive-experimental@0.21.5) (2021-03-10)


### Bug Fixes

* card feedback round 3 ([#428](https://github.com/carbon-design-system/ibm-products/issues/428)) ([c167a11](https://github.com/carbon-design-system/ibm-products/commit/c167a11ddabb122831295e75cab98c273c20463c))





## [0.21.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.21.3...@carbon/ibm-cloud-cognitive-experimental@0.21.4) (2021-03-10)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.21.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.21.2...@carbon/ibm-cloud-cognitive-experimental@0.21.3) (2021-03-10)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.21.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.21.1...@carbon/ibm-cloud-cognitive-experimental@0.21.2) (2021-03-09)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.21.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.21.0...@carbon/ibm-cloud-cognitive-experimental@0.21.1) (2021-03-09)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





# [0.21.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.14...@carbon/ibm-cloud-cognitive-experimental@0.21.0) (2021-03-09)


### Features

* **WebTerminal:** add entrance/exit animation to panel ([#412](https://github.com/carbon-design-system/ibm-products/issues/412)) ([1fe152c](https://github.com/carbon-design-system/ibm-products/commit/1fe152cd14e82fb9e698acc4728da5bc65ed13ae))





## [0.20.14](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.13...@carbon/ibm-cloud-cognitive-experimental@0.20.14) (2021-03-09)


### Bug Fixes

* canary scss and settings imports ([#418](https://github.com/carbon-design-system/ibm-products/issues/418)) ([29711ec](https://github.com/carbon-design-system/ibm-products/commit/29711ec18c66e70565be3361688e2bfd377d23f3))





## [0.20.13](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.12...@carbon/ibm-cloud-cognitive-experimental@0.20.13) (2021-03-09)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.20.12](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.11...@carbon/ibm-cloud-cognitive-experimental@0.20.12) (2021-03-08)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.20.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.10...@carbon/ibm-cloud-cognitive-experimental@0.20.11) (2021-03-08)


### Bug Fixes

* **PageHeader:** story previews show correctly again in docs ([#414](https://github.com/carbon-design-system/ibm-products/issues/414)) ([1d58962](https://github.com/carbon-design-system/ibm-products/commit/1d58962b66f5fc15c44939ee194f4b8eacbb6312))
* action bar item tip and title title ([#403](https://github.com/carbon-design-system/ibm-products/issues/403)) ([7ec2bc9](https://github.com/carbon-design-system/ibm-products/commit/7ec2bc9c740fdb7e15c6b6ddcd8be94c8fecf0d8))





## [0.20.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.9...@carbon/ibm-cloud-cognitive-experimental@0.20.10) (2021-03-08)


### Bug Fixes

* remove console log from page header test ([#410](https://github.com/carbon-design-system/ibm-products/issues/410)) ([05aa11b](https://github.com/carbon-design-system/ibm-products/commit/05aa11bc5d0d60a1b645a3569963f6411da7549e))





## [0.20.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.8...@carbon/ibm-cloud-cognitive-experimental@0.20.9) (2021-03-05)


### Bug Fixes

* **Notifications:** add props for label strings and fix classname usage ([#398](https://github.com/carbon-design-system/ibm-products/issues/398)) ([08a836f](https://github.com/carbon-design-system/ibm-products/commit/08a836fe0ed3de03b80f2df2d2daf80f4e3611df))





## [0.20.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.7...@carbon/ibm-cloud-cognitive-experimental@0.20.8) (2021-03-05)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.20.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.6...@carbon/ibm-cloud-cognitive-experimental@0.20.7) (2021-03-04)


### Bug Fixes

* **WebTerminal:** move from experimental to canary in storybook ([#406](https://github.com/carbon-design-system/ibm-products/issues/406)) ([e179f34](https://github.com/carbon-design-system/ibm-products/commit/e179f34709aa65e190c9fcecbe0cae86ce736df5))





## [0.20.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.5...@carbon/ibm-cloud-cognitive-experimental@0.20.6) (2021-03-04)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.20.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.4...@carbon/ibm-cloud-cognitive-experimental@0.20.5) (2021-03-04)


### Bug Fixes

* **SidePanel:** remove slideIn prop from storybook, refactor classnames ([#400](https://github.com/carbon-design-system/ibm-products/issues/400)) ([e7b0d70](https://github.com/carbon-design-system/ibm-products/commit/e7b0d70d6dd2e5727d65d2e736a1ed537a6ed044))





## [0.20.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.3...@carbon/ibm-cloud-cognitive-experimental@0.20.4) (2021-03-04)


### Bug Fixes

* card design revisions v1 ([#396](https://github.com/carbon-design-system/ibm-products/issues/396)) ([7dd4479](https://github.com/carbon-design-system/ibm-products/commit/7dd44792239c42fc812e9af266e881ca0abff398))





## [0.20.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.2...@carbon/ibm-cloud-cognitive-experimental@0.20.3) (2021-03-03)


### Bug Fixes

* remove spurious scrollbar when available height is very small ([#392](https://github.com/carbon-design-system/ibm-products/issues/392)) ([37dd87c](https://github.com/carbon-design-system/ibm-products/commit/37dd87cfb906d8d9256be6d71f0218d2156b3095))





## [0.20.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.1...@carbon/ibm-cloud-cognitive-experimental@0.20.2) (2021-03-01)


### Bug Fixes

* **SidePanel:** added design changes and added new labelText prop ([#388](https://github.com/carbon-design-system/ibm-products/issues/388)) ([0d0186d](https://github.com/carbon-design-system/ibm-products/commit/0d0186d874b79797fa7ca4cd3997197cddff0242))





## [0.20.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.20.0...@carbon/ibm-cloud-cognitive-experimental@0.20.1) (2021-03-01)


### Bug Fixes

* added decorator to card story ([#359](https://github.com/carbon-design-system/ibm-products/issues/359)) ([6ef696a](https://github.com/carbon-design-system/ibm-products/commit/6ef696a53ece33e1d05e8a7e8d1326d840f5f80a))





# [0.20.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.22...@carbon/ibm-cloud-cognitive-experimental@0.20.0) (2021-02-25)


### Features

* Adds the web terminal component ([#341](https://github.com/carbon-design-system/ibm-products/issues/341)) ([2460eed](https://github.com/carbon-design-system/ibm-products/commit/2460eed2b0ef29d97a0bd2a2f63f6064ee406a03))





## [0.19.22](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.21...@carbon/ibm-cloud-cognitive-experimental@0.19.22) (2021-02-25)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.19.21](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.20...@carbon/ibm-cloud-cognitive-experimental@0.19.21) (2021-02-24)


### Bug Fixes

* crypto for ssr and add test ([#337](https://github.com/carbon-design-system/ibm-products/issues/337)) ([1464d16](https://github.com/carbon-design-system/ibm-products/commit/1464d16646832472f44c2105c4a1c0e44b69c5bc))





## [0.19.20](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.19...@carbon/ibm-cloud-cognitive-experimental@0.19.20) (2021-02-23)


### Bug Fixes

* prefix not using global settings ([#331](https://github.com/carbon-design-system/ibm-products/issues/331)) ([39b3c54](https://github.com/carbon-design-system/ibm-products/commit/39b3c544cf0769dc621ae11843e60a4a54773ddf))





## [0.19.19](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.18...@carbon/ibm-cloud-cognitive-experimental@0.19.19) (2021-02-23)


### Bug Fixes

* unwrap if fragment ([#357](https://github.com/carbon-design-system/ibm-products/issues/357)) ([f03c063](https://github.com/carbon-design-system/ibm-products/commit/f03c063ed60b563de4513ba513fd86c1f3e31a36))





## [0.19.18](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.17...@carbon/ibm-cloud-cognitive-experimental@0.19.18) (2021-02-23)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.19.17](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.16...@carbon/ibm-cloud-cognitive-experimental@0.19.17) (2021-02-22)


### Bug Fixes

* secondary button + prop comments + column config ([#335](https://github.com/carbon-design-system/ibm-products/issues/335)) ([87b704b](https://github.com/carbon-design-system/ibm-products/commit/87b704b4dd656dead0fa5992f5536aa303af5cfa))





## [0.19.16](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.15...@carbon/ibm-cloud-cognitive-experimental@0.19.16) (2021-02-19)


### Bug Fixes

* add export ([#354](https://github.com/carbon-design-system/ibm-products/issues/354)) ([c8c2eb7](https://github.com/carbon-design-system/ibm-products/commit/c8c2eb7818c0fedf5471f684040788f1fac2afe3))





## [0.19.15](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.14...@carbon/ibm-cloud-cognitive-experimental@0.19.15) (2021-02-17)


### Bug Fixes

* script to generate component shell using correct prefix now ([#350](https://github.com/carbon-design-system/ibm-products/issues/350)) ([671897d](https://github.com/carbon-design-system/ibm-products/commit/671897dc27ff82c68119f4164e3a5139aeec6de0))





## [0.19.14](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.13...@carbon/ibm-cloud-cognitive-experimental@0.19.14) (2021-02-17)


### Bug Fixes

* **Notifications:** underline issue and fix named vs default imports ([#343](https://github.com/carbon-design-system/ibm-products/issues/343)) ([2691b64](https://github.com/carbon-design-system/ibm-products/commit/2691b64b07882e50ecefd9c97dc3e47d5bee6327))





## [0.19.13](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.12...@carbon/ibm-cloud-cognitive-experimental@0.19.13) (2021-02-16)


### Bug Fixes

* more header review updates ([#325](https://github.com/carbon-design-system/ibm-products/issues/325)) ([2809275](https://github.com/carbon-design-system/ibm-products/commit/28092758e76a0f56daa14df747f3ce0572ef8b59))





## [0.19.12](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.11...@carbon/ibm-cloud-cognitive-experimental@0.19.12) (2021-02-12)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.19.11](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.10...@carbon/ibm-cloud-cognitive-experimental@0.19.11) (2021-02-11)


### Bug Fixes

* **Notifications:** use correct value to prevent horizontal scroll ([#334](https://github.com/carbon-design-system/ibm-products/issues/334)) ([fbc260e](https://github.com/carbon-design-system/ibm-products/commit/fbc260ec9fa54842a5f72c0890dd09e40988b096))





## [0.19.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.9...@carbon/ibm-cloud-cognitive-experimental@0.19.10) (2021-02-11)


### Bug Fixes

* change action bar overflow item format ([#327](https://github.com/carbon-design-system/ibm-products/issues/327)) ([d497609](https://github.com/carbon-design-system/ibm-products/commit/d497609d0a34f2d45a1b38412652a57f7fae8f2f))





## [0.19.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.8...@carbon/ibm-cloud-cognitive-experimental@0.19.9) (2021-02-10)


### Bug Fixes

* styling of breadcrumb with overflow ([#329](https://github.com/carbon-design-system/ibm-products/issues/329)) ([95c168b](https://github.com/carbon-design-system/ibm-products/commit/95c168babf1312885132a44d5f11d3c82f010d12))





## [0.19.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.7...@carbon/ibm-cloud-cognitive-experimental@0.19.8) (2021-02-10)


### Bug Fixes

* card updates ([#326](https://github.com/carbon-design-system/ibm-products/issues/326)) ([1a59e35](https://github.com/carbon-design-system/ibm-products/commit/1a59e35aeed86fd9c0a8c318a6fb671a25b51690))





## [0.19.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.6...@carbon/ibm-cloud-cognitive-experimental@0.19.7) (2021-02-09)


### Bug Fixes

* further page header review updates ([#323](https://github.com/carbon-design-system/ibm-products/issues/323)) ([137d952](https://github.com/carbon-design-system/ibm-products/commit/137d952d669adfd2cf1d794f0f3346d9d310d4f9))





## [0.19.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.5...@carbon/ibm-cloud-cognitive-experimental@0.19.6) (2021-02-08)


### Bug Fixes

* review updates ([#321](https://github.com/carbon-design-system/ibm-products/issues/321)) ([fd06c3a](https://github.com/carbon-design-system/ibm-products/commit/fd06c3addc3a85bf29499ed64e73e15099be4def))





## [0.19.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.4...@carbon/ibm-cloud-cognitive-experimental@0.19.5) (2021-02-05)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.19.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.3...@carbon/ibm-cloud-cognitive-experimental@0.19.4) (2021-02-03)


### Bug Fixes

* responsivity in action bar column ([#307](https://github.com/carbon-design-system/ibm-products/issues/307)) ([fcf8dc9](https://github.com/carbon-design-system/ibm-products/commit/fcf8dc9c4d5d7a5d200c5c4f5b71dcfe177c615c))





## [0.19.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.2...@carbon/ibm-cloud-cognitive-experimental@0.19.3) (2021-02-02)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.19.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.1...@carbon/ibm-cloud-cognitive-experimental@0.19.2) (2021-02-02)


### Bug Fixes

* additional design feedback ([#314](https://github.com/carbon-design-system/ibm-products/issues/314)) ([ab07dc2](https://github.com/carbon-design-system/ibm-products/commit/ab07dc2c359b7316becb18314b9b29b24aa0af1a))





## [0.19.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.19.0...@carbon/ibm-cloud-cognitive-experimental@0.19.1) (2021-01-29)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





# [0.19.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.18.0...@carbon/ibm-cloud-cognitive-experimental@0.19.0) (2021-01-28)


### Features

* update carbon to 10-27 ([#311](https://github.com/carbon-design-system/ibm-products/issues/311)) ([b7569b8](https://github.com/carbon-design-system/ibm-products/commit/b7569b8e3a339b8886175ed224164030e036b36c))





# [0.18.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.17.2...@carbon/ibm-cloud-cognitive-experimental@0.18.0) (2021-01-28)


### Features

* prefix change proposal ([#310](https://github.com/carbon-design-system/ibm-products/issues/310)) ([be09803](https://github.com/carbon-design-system/ibm-products/commit/be09803976360b7158bb2268e66047fbcb70f3ab))





## [0.17.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.17.1...@carbon/ibm-cloud-cognitive-experimental@0.17.2) (2021-01-26)


### Bug Fixes

* keyboard support for apikey modal ([#298](https://github.com/carbon-design-system/ibm-products/issues/298)) ([67fc055](https://github.com/carbon-design-system/ibm-products/commit/67fc055fc1ca9b60553da9c278533863b87eda1f))





## [0.17.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.17.0...@carbon/ibm-cloud-cognitive-experimental@0.17.1) (2021-01-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





# [0.17.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.10...@carbon/ibm-cloud-cognitive-experimental@0.17.0) (2021-01-26)


### Features

* add side panel component ([#282](https://github.com/carbon-design-system/ibm-products/issues/282)) ([4a128d8](https://github.com/carbon-design-system/ibm-products/commit/4a128d8b9ca78aca67c3c0870dee5baa11d0d05e))





## [0.16.10](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.9...@carbon/ibm-cloud-cognitive-experimental@0.16.10) (2021-01-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.16.9](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.8...@carbon/ibm-cloud-cognitive-experimental@0.16.9) (2021-01-25)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.16.8](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.7...@carbon/ibm-cloud-cognitive-experimental@0.16.8) (2021-01-21)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.16.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.6...@carbon/ibm-cloud-cognitive-experimental@0.16.7) (2021-01-20)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.16.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.5...@carbon/ibm-cloud-cognitive-experimental@0.16.6) (2021-01-19)


### Bug Fixes

* design feedback updates for ApiKeyModal ([#297](https://github.com/carbon-design-system/ibm-products/issues/297)) ([50f432a](https://github.com/carbon-design-system/ibm-products/commit/50f432a2ff68a1e036225ef810ef2078a04ac9a9))





## [0.16.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.4...@carbon/ibm-cloud-cognitive-experimental@0.16.5) (2021-01-13)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.16.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.3...@carbon/ibm-cloud-cognitive-experimental@0.16.4) (2021-01-07)


### Bug Fixes

* import container disabled after file added in import modal ([#294](https://github.com/carbon-design-system/ibm-products/issues/294)) ([98f1633](https://github.com/carbon-design-system/ibm-products/commit/98f1633086d5e427f3c7b1dc2e8eb3a1d73cf635))





## [0.16.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.2...@carbon/ibm-cloud-cognitive-experimental@0.16.3) (2021-01-06)


### Bug Fixes

* apikey modal design feedback ([#293](https://github.com/carbon-design-system/ibm-products/issues/293)) ([0f4b08f](https://github.com/carbon-design-system/ibm-products/commit/0f4b08fec6c8b65da7c336fb2fef0464598b1665))





## [0.16.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.1...@carbon/ibm-cloud-cognitive-experimental@0.16.2) (2021-01-05)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.16.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.16.0...@carbon/ibm-cloud-cognitive-experimental@0.16.1) (2020-12-17)


### Bug Fixes

* merge issue in breadcrumb dom ([#289](https://github.com/carbon-design-system/ibm-products/issues/289)) ([017b235](https://github.com/carbon-design-system/ibm-products/commit/017b23575644d7250f58c7fb6cc234d44d8c0902))





# [0.16.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.15.1...@carbon/ibm-cloud-cognitive-experimental@0.16.0) (2020-12-17)


### Features

*  add breadcrumb with overflow ([#275](https://github.com/carbon-design-system/ibm-products/issues/275)) ([d810cd9](https://github.com/carbon-design-system/ibm-products/commit/d810cd963be0bbf4228bbfe52ba8028e7872d057))





## [0.15.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.15.0...@carbon/ibm-cloud-cognitive-experimental@0.15.1) (2020-12-17)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





# [0.15.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.14.0...@carbon/ibm-cloud-cognitive-experimental@0.15.0) (2020-12-16)


### Features

* added multi-step functionality to apikey modal ([#279](https://github.com/carbon-design-system/ibm-products/issues/279)) ([13db6e1](https://github.com/carbon-design-system/ibm-products/commit/13db6e12ea47e142a04fa7ad0a4c149a16d0baa4))





# [0.14.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.13.2...@carbon/ibm-cloud-cognitive-experimental@0.14.0) (2020-12-16)


### Features

* review updates for page header ([#284](https://github.com/carbon-design-system/ibm-products/issues/284)) ([b45bc0f](https://github.com/carbon-design-system/ibm-products/commit/b45bc0fc40dda64f25a267f1da07bbd699689486))





## [0.13.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.13.1...@carbon/ibm-cloud-cognitive-experimental@0.13.2) (2020-12-16)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.13.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.13.0...@carbon/ibm-cloud-cognitive-experimental@0.13.1) (2020-12-16)


### Bug Fixes

* uuidv4 for ssr ([#278](https://github.com/carbon-design-system/ibm-products/issues/278)) ([1e06320](https://github.com/carbon-design-system/ibm-products/commit/1e06320b4a1cc2ee1eca78ccf17e588da76680aa))





# [0.13.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.12.6...@carbon/ibm-cloud-cognitive-experimental@0.13.0) (2020-12-16)


### Features

* Page header tag overflow update ([#264](https://github.com/carbon-design-system/ibm-products/issues/264)) ([ee22520](https://github.com/carbon-design-system/ibm-products/commit/ee225206e291fa3bca990cb2ccabfece8930fc88))





## [0.12.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.12.5...@carbon/ibm-cloud-cognitive-experimental@0.12.6) (2020-12-10)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.12.5](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.12.4...@carbon/ibm-cloud-cognitive-experimental@0.12.5) (2020-12-08)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.12.4](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.12.3...@carbon/ibm-cloud-cognitive-experimental@0.12.4) (2020-12-08)


### Bug Fixes

* additional stories and selection for export ([#263](https://github.com/carbon-design-system/ibm-products/issues/263)) ([a02a1a7](https://github.com/carbon-design-system/ibm-products/commit/a02a1a71045a34bd8475cfbc5a7bd69d1add6a27))





## [0.12.3](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.12.2...@carbon/ibm-cloud-cognitive-experimental@0.12.3) (2020-12-04)


### Bug Fixes

* change RemovalModal to RemoveDeleteModal ([#255](https://github.com/carbon-design-system/ibm-products/issues/255)) ([cdb2f5b](https://github.com/carbon-design-system/ibm-products/commit/cdb2f5b2c0643bbe5c8d8ab27d5763c939da2302))





## [0.12.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.12.1...@carbon/ibm-cloud-cognitive-experimental@0.12.2) (2020-12-04)


### Bug Fixes

* use correct carbon token for about modal gradient ([#256](https://github.com/carbon-design-system/ibm-products/issues/256)) ([9a9626a](https://github.com/carbon-design-system/ibm-products/commit/9a9626af8d8eb5b5ae26135a755e3047f1e8ea6b))





## [0.12.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.12.0...@carbon/ibm-cloud-cognitive-experimental@0.12.1) (2020-12-03)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





# [0.12.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.11.0...@carbon/ibm-cloud-cognitive-experimental@0.12.0) (2020-12-03)


### Features

* Breadcrumb with overflow ([#252](https://github.com/carbon-design-system/ibm-products/issues/252)) ([c9acc7a](https://github.com/carbon-design-system/ibm-products/commit/c9acc7af3fa35fa72495e93cb30271ce5124f99f))





# [0.11.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.10.2...@carbon/ibm-cloud-cognitive-experimental@0.11.0) (2020-12-03)


### Features

* export modal ([#253](https://github.com/carbon-design-system/ibm-products/issues/253)) ([d7e35ae](https://github.com/carbon-design-system/ibm-products/commit/d7e35ae34567dbfdb99ece3964f558137b687940))





## [0.10.2](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.10.1...@carbon/ibm-cloud-cognitive-experimental@0.10.2) (2020-12-02)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.10.1](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.10.0...@carbon/ibm-cloud-cognitive-experimental@0.10.1) (2020-12-01)


### Bug Fixes

* import modal typo fix ([#247](https://github.com/carbon-design-system/ibm-products/issues/247)) ([56b1165](https://github.com/carbon-design-system/ibm-products/commit/56b11654238e35fa4da7de0da4b842916633a984))





# [0.10.0](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.9.7...@carbon/ibm-cloud-cognitive-experimental@0.10.0) (2020-12-01)


### Features

* add automated tests for tearsheet component ([#249](https://github.com/carbon-design-system/ibm-products/issues/249)) ([6510288](https://github.com/carbon-design-system/ibm-products/commit/6510288adc51d3983d85904406184f5e0aa7db78))





## [0.9.7](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.9.6...@carbon/ibm-cloud-cognitive-experimental@0.9.7) (2020-12-01)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.9.6](https://github.com/carbon-design-system/ibm-products/compare/@carbon/ibm-cloud-cognitive-experimental@0.9.5...@carbon/ibm-cloud-cognitive-experimental@0.9.6) (2020-11-30)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.9.5](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.9.4...@carbon/ibm-cloud-cognitive-experimental@0.9.5) (2020-11-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.9.4](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.9.3...@carbon/ibm-cloud-cognitive-experimental@0.9.4) (2020-11-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.9.3](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.9.2...@carbon/ibm-cloud-cognitive-experimental@0.9.3) (2020-11-26)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental





## [0.9.2](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.9.1...@carbon/ibm-cloud-cognitive-experimental@0.9.2) (2020-11-26)


### Bug Fixes

* docgen optional chaining issue TagSet and ModifiedTabs ([#237](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/237)) ([93c6e53](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/93c6e5347670f6157e3caba62099af6109fb1f2c))





## [0.9.1](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.9.0...@carbon/ibm-cloud-cognitive-experimental@0.9.1) (2020-11-26)


### Bug Fixes

* small stories update to RemovalModal ([#230](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/230)) ([2e3e564](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/2e3e564b43efbf75bacabf1db16a700062fd2d82))





# [0.9.0](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.8.0...@carbon/ibm-cloud-cognitive-experimental@0.9.0) (2020-11-25)


### Features

* improve tearsheet documentation and stories ([#235](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/235)) ([2daff03](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/2daff03ae5cf427b8a0bce2d465d7879b519eecf))





# [0.8.0](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.7.1...@carbon/ibm-cloud-cognitive-experimental@0.8.0) (2020-11-24)


### Features

* make tearsheets stackable ([#229](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/229)) ([23c26b2](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/23c26b2db35cff9f20732e3e5f327743bdcbdfb7))





## [0.7.1](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.7.0...@carbon/ibm-cloud-cognitive-experimental@0.7.1) (2020-11-24)


### Bug Fixes

* update import and remove modal stories ([#221](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/221)) ([c08d1cf](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/c08d1cf44a4b3c726b304061a3ac6e1b6b4035e6))





# [0.7.0](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.6.0...@carbon/ibm-cloud-cognitive-experimental@0.7.0) (2020-11-23)


### Features

* add cdai apikey component ([#223](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/223)) ([4c09f15](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/4c09f15c3c62c3965d98c91b9695fa7a1cba8f0b))
* add show all to tag-set ([#222](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/222)) ([762060a](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/762060acf708ea6d19d9f48d6520d05ef3e43836))





# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.6.0](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.5.0...@carbon/ibm-cloud-cognitive-experimental@0.6.0) (2020-11-19)

### Features

- apikey modal
  ([#200](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/200))
  ([e4d94e5](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/e4d94e549fa693a66850228407a748503ff47325))

# [0.5.0](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.4.1...@carbon/ibm-cloud-cognitive-experimental@0.5.0) (2020-11-18)

### Features

- improve Tearsheet stories
  ([#220](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/220))
  ([c1fd523](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/c1fd523001357157fee25ffbb42ae054a5c11156))

## [0.4.1](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.4.0...@carbon/ibm-cloud-cognitive-experimental@0.4.1) (2020-11-18)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental

# [0.4.0](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.3.0...@carbon/ibm-cloud-cognitive-experimental@0.4.0) (2020-11-17)

### Features

- add TearsheetNarrow component
  ([#218](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/218))
  ([fe967c0](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/fe967c03ff79c241e19278dc95a803c577efc676))

# [0.3.0](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.2.5...@carbon/ibm-cloud-cognitive-experimental@0.3.0) (2020-11-17)

### Features

- update to carbon 10.24.0
  ([#217](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/217))
  ([76839f3](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/76839f36eca23132559c47f61d9efa0cfcd8414d))

## [0.2.5](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.2.4...@carbon/ibm-cloud-cognitive-experimental@0.2.5) (2020-11-17)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental

## [0.2.4](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.2.3...@carbon/ibm-cloud-cognitive-experimental@0.2.4) (2020-11-17)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.3](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.2.2...@carbon/ibm-cloud-cognitive-experimental@0.2.3) (2020-11-11)

### Bug Fixes

- add Tearsheet and PageHeader to index.js
  ([#203](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/203))
  ([cd4731f](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/cd4731fb36b9e5517e1aa756e4432f8fd68088c6))

## [0.2.2](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.2.1...@carbon/ibm-cloud-cognitive-experimental@0.2.2) (2020-11-11)

### Bug Fixes

- overflow tag styling
  ([#202](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/202))
  ([15c9abd](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/15c9abd219e5f3cf8033a3e85a215de585b1ae3e))

## [0.2.1](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.2.0...@carbon/ibm-cloud-cognitive-experimental@0.2.1) (2020-11-11)

**Note:** Version bump only for package @carbon/ibm-cloud-cognitive-experimental

# [0.2.0](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/compare/@carbon/ibm-cloud-cognitive-experimental@0.1.0...@carbon/ibm-cloud-cognitive-experimental@0.2.0) (2020-11-10)

### Features

- create tag set (tags with overflow)
  ([#188](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/188))
  ([84c4d3e](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/84c4d3ee3c5783e506a231a18b3e2fa738c9c0d1))

# 0.1.0 (2020-11-10)

### Bug Fixes

- broken carbon tabs
  ([#160](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/160))
  ([b5b46b3](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/b5b46b3916cba06bd5a3a3c275b8ac3dda7a952b))
- multiple review issues
  ([#152](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/152))
  ([6de02a2](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/6de02a27962b28b6ad42ae8984b712abdf525ff4)),
  closes
  [#151](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/151)
  [#153](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/153)
  [#149](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/149)
  [#155](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/155)
- page header responsiveness
  ([#189](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/189))
  ([dc93431](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/dc934310ee3448cc382dcc3b8dcdf2e206be94a9))
- small RemovalModal docs update
  ([#156](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/156))
  ([7006941](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/7006941a35d149f49fa12dbb1f87cd7f8ded8762))

### Features

- add new about screen modal component
  ([#187](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/187))
  ([7a8fadf](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/7a8fadf3b52bb50a733fbbbe5978051a00cf406e))
- Import component
  ([#163](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/163))
  ([980f4f3](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/980f4f3334610e97c0552921cdab269a6e01e6a7))
- various review updates
  ([#158](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/issues/158))
  ([9a39ba2](https://github.com/carbon-design-system/ibm-products/tree/master/packages/experimental/commit/9a39ba2cb2df682897b4ba293eafac8e8762a13c))
