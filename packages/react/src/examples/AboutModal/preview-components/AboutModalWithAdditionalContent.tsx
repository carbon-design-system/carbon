/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button, Link } from '@carbon/react';
import { AboutModal } from '../components/AboutModal';
import exampleLogo from '../assets/example-logo.svg';
import grafanaLogo from '../assets/grafana-logo.png';
import ansibleLogo from '../assets/ansible-logo.png';
import jsLogo from '../assets/js-logo.png';

const blockClass = 'about-modal';

const content =
  "This Web site contains proprietary notices and copyright information, the terms of which must be observed and followed. Please see the tab entitled 'Copyright and trademark information' for related information. IBM grants you a non-exclusive, non-transferable, limited permission to access and display the Web pages within this site as a customer or potential customer of IBM provided you comply with these Terms of Use, and all copyright, trademark, and other proprietary notices remain intact.";

export const AboutModalWithAdditionalContent = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <AboutModal
        open={isOpen}
        onClose={() => setOpen(false)}
        title={
          <>
            IBM{' '}
            <span className={`${blockClass}__title-emphasis`}>
              Product name
            </span>
          </>
        }
        version="Version 0.0.0"
        copyrightText="Copyright © IBM Corp. 2020, 2026"
        closeIconDescription="Close"
        modalAriaLabel="About this product"
        content={content}
        links={[
          <Link href="#" key="link1">
            Link action
          </Link>,
          <Link href="#" key="link2">
            Link action
          </Link>,
          <Link href="#" key="link3">
            Link action
          </Link>,
        ]}
        additionalInfo={
          <>
            <p className={`${blockClass}__footer-label`}>Powered by</p>
            <img
              src={grafanaLogo}
              alt="Grafana"
              className={`${blockClass}__tech-logo`}
            />
            <img
              src={ansibleLogo}
              alt="Ansible"
              className={`${blockClass}__tech-logo`}
            />
            <img
              src={jsLogo}
              alt="JavaScript"
              className={`${blockClass}__tech-logo`}
            />
          </>
        }
        logo={
          <img
            src={exampleLogo}
            alt="Example product or service logo"
            style={{ maxWidth: '6rem' }}
          />
        }
      />
    </>
  );
};
