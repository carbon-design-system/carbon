/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSInterstitialScreen from './interstitial-screen';
import CDSInterstitialScreenHeader from './interstitial-screen-header';
import CDSInterstitialScreenBody from './interstitial-screen-body';
import CDSInterstitialScreenBodyItem from './interstitial-screen-body-item';
import CDSInterstitialScreenFooter from './interstitial-screen-footer';

export {
  CDSInterstitialScreen,
  CDSInterstitialScreenHeader,
  CDSInterstitialScreenBody,
  CDSInterstitialScreenBodyItem,
  CDSInterstitialScreenFooter,
};

defineCustomElement(CDSInterstitialScreen);
defineCustomElement(CDSInterstitialScreenHeader);
defineCustomElement(CDSInterstitialScreenBody);
defineCustomElement(CDSInterstitialScreenBodyItem);
defineCustomElement(CDSInterstitialScreenFooter);
