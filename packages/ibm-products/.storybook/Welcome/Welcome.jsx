/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import PackageInfo from '../../../ibm-products/package.json';
import { Link, Tag } from '@carbon/react';
import { ArrowRight, Pause, Play } from '@carbon/react/icons';
import lottie from 'lottie-web/build/player/lottie_light';
import WelcomeLottie from './welcome-lottie.json';
import './_storybook-styles.scss';

const Welcome = () => {
  const animationRef = useRef(null);

  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-react-fc
  let prefersReducedMotion = window.matchMedia(
    `(prefers-reduced-motion: reduce)`
  ).matches;

  const [isAnimating, setIsAnimating] = useState(prefersReducedMotion);

  React.useEffect(() => {
    lottie.loadAnimation({
      container: animationRef.current,
      animationData: WelcomeLottie,
      autoplay: !prefersReducedMotion,
    });
  }, [prefersReducedMotion]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);

    if (isAnimating) {
      lottie.play();
    } else {
      lottie.pause();
    }
  };

  return (
    <div className="welcome__container--outer">
      <div className="welcome__container--inner">
        <div className="welcome__col--left">
          <hgroup className="welcome__header">
            <h2 className="welcome__heading">
              Carbon for
              <br />
              IBM Products
            </h2>
            <h4 className="welcome__subtitle">{`v${PackageInfo.version}`}</h4>
            <Tag size="md" type="purple" className="welcome__tag--xl">
              Carbon 11 (v2)
            </Tag>
          </hgroup>
          <div className="welcome__links">
            <Link
              href="https://pages.github.ibm.com/carbon/ibm-products/"
              className="welcome__link"
              renderIcon={ArrowRight}
              size="lg"
            >
              Website (IBMers only)
            </Link>

            <Link
              href="https://ibm-products-web-components.carbondesignsystem.com/"
              className="welcome__link"
              renderIcon={ArrowRight}
              size="lg"
            >
              Web Components Storybook
            </Link>

            <Link
              href="https://github.com/carbon-design-system/ibm-products"
              className="welcome__link"
              renderIcon={ArrowRight}
              size="lg"
            >
              GitHub repo
            </Link>

            <Link
              href="https://github.com/carbon-design-system/ibm-products/wiki/Carbon-for-IBM-Products-Releases"
              className="welcome__link"
              renderIcon={ArrowRight}
              size="lg"
            >
              Release schedule
            </Link>

            <Link
              href="https://github.com/carbon-design-system/ibm-products?tab=security-ov-file"
              className="welcome__link"
              renderIcon={ArrowRight}
              size="lg"
            >
              Security policy
            </Link>

            <Link
              href="https://github.com/carbon-design-system/ibm-products/blob/main/docs/guides/v2.md"
              className="welcome__link"
              renderIcon={ArrowRight}
              size="lg"
            >
              v1 to v2 migration guide
            </Link>
            <Link
              href="https://pages.github.ibm.com/carbon/ibm-products/developing/get-started/"
              className="welcome__link"
              renderIcon={ArrowRight}
              size="lg"
            >
              Get started
            </Link>
          </div>
        </div>
        <div className="welcome__col--right">
          <div ref={animationRef} className="welcome__animation">
            <button
              type="button"
              className="welcome__pause-button"
              onClick={toggleAnimation}
            >
              {isAnimating ? <Play /> : <Pause />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
