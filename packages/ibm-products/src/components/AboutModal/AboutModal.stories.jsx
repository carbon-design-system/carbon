/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// cspell:words grafana

import React, { useState } from 'react';

import { pkg } from '../../settings';
import { AboutModal } from '.';

import { Button, Link } from '@carbon/react';
import styles from './_storybook-styles.scss?inline';

import mdx from './AboutModal.mdx';

export default {
  title: 'Components/AboutModal',
  component: AboutModal,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
    layout: 'padded',
  },
  argTypes: {
    additionalInfo: {
      control: {
        type: 'select',
        labels: {
          0: 'no additional info',
          1: 'powered by logos',
        },
      },
      options: [0, 1],
    },
    links: {
      control: {
        type: 'select',
        labels: { 0: 'none', 1: 'one link', 2: 'two links', 3: 'three links' },
      },
      options: [0, 1, 2, 3],
    },
    content: {
      control: {
        type: 'select',
        labels: {
          0: 'no content',
          1: 'short content',
          2: 'medium content',
          3: 'long content',
        },
      },
      options: [0, 1, 2, 3],
    },
    logo: {
      control: false,
    },
    open: {
      control: false,
    },
    title: {
      control: {
        type: 'select',
        labels: {
          0: 'short title',
          1: 'long title',
          2: 'short title with formatting',
        },
      },
      options: [0, 1, 2],
    },
  },
};

const Template = (args, context) => {
  const blockClass = `${pkg.prefix}--about-modal`;
  const { title, content, additionalInfo, links } = args;

  const logo = (
    <img
      src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27UTF-8%27?%3e%3csvg%20width=%27157px%27%20height=%27157px%27%20viewBox=%270%200%20157%20157%27%20version=%271.1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%3e%3c!--%20Generator:%20Sketch%2055.2%20(78181)%20-%20https://sketchapp.com%20--%3e%3ctitle%3eGroup%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3clinearGradient%20x1=%27-9.94443222%25%27%20y1=%2750%25%27%20x2=%27106.211488%25%27%20y2=%2750%25%27%20id=%27linearGradient-1%27%3e%3cstop%20stop-color=%27%23BE95FF%27%20offset=%270%25%27%3e%3c/stop%3e%3cstop%20stop-color=%27%234589FF%27%20offset=%27100%25%27%3e%3c/stop%3e%3c/linearGradient%3e%3ccircle%20id=%27path-2%27%20cx=%2786%27%20cy=%2786%27%20r=%2771%27%3e%3c/circle%3e%3c/defs%3e%3cg%20id=%27Page-1%27%20stroke=%27none%27%20stroke-width=%271%27%20fill=%27none%27%20fill-rule=%27evenodd%27%3e%3cg%20id=%27Group%27%3e%3cg%20id=%27Oval%27%3e%3cuse%20fill=%27%23D8D8D8%27%20xlink:href=%27%23path-2%27%3e%3c/use%3e%3cuse%20fill=%27url(%23linearGradient-1)%27%20xlink:href=%27%23path-2%27%3e%3c/use%3e%3c/g%3e%3ccircle%20id=%27Oval%27%20fill=%27%23FFFFFF%27%20cx=%2739.5%27%20cy=%2739.5%27%20r=%2739.5%27%3e%3c/circle%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
      alt="Example product or service logo"
      style={{ maxWidth: '6rem' }}
    />
  );

  const getTitle = (value) => {
    if (value === 0) {
      return <>IBM Product name</>;
    } else if (value === 1) {
      return <>IBM Product name example that is longer than one line</>;
    } else value === 2;
    {
      return (
        <>
          IBM{' '}
          <span
            style={
              // stylelint-disable-next-line carbon/type-use
              { fontWeight: '600' }
            }
          >
            Product name
          </span>
        </>
      );
    }
  };

  const getLinks = (value) => {
    if (value === 0) {
      return null;
    } else if (value === 1) {
      return [
        <Link href="#" key="link1">
          Link action
        </Link>,
      ];
    } else if (value === 2) {
      return [
        <Link href="#" key="link1">
          Link action
        </Link>,
        <Link href="#" key="link2">
          Link action
        </Link>,
      ];
    } else {
      return [
        <Link href="#" key="link1">
          Link action
        </Link>,
        <Link href="#" key="link2">
          Link action
        </Link>,
        <Link href="#" key="link3">
          Link action
        </Link>,
      ];
    }
  };

  const getContent = (value) => {
    if (value === 0) {
      return null;
    } else if (value === 1) {
      return 'This Web site contains proprietary notices and copyright information, the terms of which must be observed and followed.';
    } else if (value === 2) {
      return "This Web site contains proprietary notices and copyright information, the terms of which must be observed and followed. Please see the tab entitled 'Copyright and trademark information' for related information. IBM grants you a non-exclusive, non-transferable, limited permission to access and display the Web pages within this site as a customer or potential customer of IBM provided you comply with these Terms of Use, and all copyright, trademark, and other proprietary notices remain intact.";
    } else {
      return "This Web site contains proprietary notices and copyright information, the terms of which must be observed and followed. Please see the tab entitled 'Copyright and trademark information' for related information. IBM grants you a non-exclusive, non-transferable, limited permission to access and display the Web pages within this site as a customer or potential customer of IBM provided you comply with these Terms of Use, and all copyright, trademark, and other proprietary notices remain intact. You may only use a crawler to crawl this Web site as permitted by this Web site's robots.txt protocol, and IBM may block any crawlers in its sole discretion. The use authorized under this agreement is non-commercial in nature (e.g., you may not sell the content you access on or through this Web site.) All other use of this site is prohibited. Except for the limited permission in the preceding paragraph, IBM does not grant you any express or implied rights or licenses under any patents, trademarks, copyrights, or other proprietary or intellectual property rights. You may not mirror any of the content from this site on another Web site or in any other media. Any software and other materials that are made available for downloading, access, or other use from this site with their own license terms will be governed by such terms, conditions, and notices. Your failure to comply with such terms or any of the terms on this site will result in automatic termination of any rights granted to you, without prior notice, and you must immediately destroy all copies of downloaded materials in your possession, custody or control. This Web site contains proprietary notices and copyright information, the terms of which must be observed and followed. Please see the tab entitled “Copyright and trademark information” for related information. IBM grants you a non-exclusive, non-transferable, limited permission to access and display the Web pages within this site as a customer or potential customer of IBM provided you comply with these Terms of Use, and all copyright, trademark, and other proprietary notices remain intact. You may only use a crawler to crawl this Web site as permitted by this Web site’s robots.txt protocol, and IBM may block any crawlers in its sole discretion. The use authorized under this agreement is non-commercial in nature (e.g., you may not sell the content you access on or through this Web site.) All other use of this site is prohibited. Except for the limited permission in the preceding paragraph, IBM does not grant you any express or implied rights or licenses under any patents, trademarks, copyrights, or other proprietary or intellectual property rights. You may not mirror any of the content from this site on another Web site or in any other media. Any software and other materials that are made available for downloading, access, or other use from this site with their own license terms will be governed by such terms, conditions, and notices. Your failure to comply with such terms or any of the terms on this site will result in automatic termination of any rights granted to you, without prior notice, and you must immediately destroy all copies of downloaded materials in your possession, custody or control.";
    }
  };

  const getAdditionalInfo = (value) => {
    if (value === 0) {
      return null;
    } else {
      return (
        <>
          <p className={`${blockClass}__footer-label`}>Powered by</p>
          <img
            src={
              'https://ibm-products.carbondesignsystem.com/assets/grafana-logo-C_G0-VRi.png'
            }
            alt="Grafana"
            className={`${blockClass}__stories--tech-logo`}
          />
          <img
            src={
              'https://ibm-products.carbondesignsystem.com/assets/ansible-logo-BdFhBRCd.png'
            }
            alt="Ansible"
            className={`${blockClass}__stories--tech-logo`}
          />
          <img
            src={
              'data:image/png;base64,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'
            }
            alt="JavaScript"
            className={`${blockClass}__stories--tech-logo`}
          />
        </>
      );
    }
  };
  const [open, setOpen] = useState(context.viewMode !== 'docs');

  return (
    <main>
      <Button onClick={() => setOpen(true)}>{'Open Modal'}</Button>

      <style>{`.${blockClass} { opacity: 0; }`};</style>
      <AboutModal
        {...args}
        title={getTitle(title)}
        links={getLinks(links)}
        additionalInfo={getAdditionalInfo(additionalInfo)}
        content={getContent(content)}
        onClose={() => setOpen(false)}
        logo={logo}
        modalAriaLabel="About this product"
        open={open}
      />
    </main>
  );
};

Template.propTypes = AboutModal.propTypes;

const commonArgs = {
  copyrightText: 'Copyright © IBM Corp. 2020, 2023',
  closeIconDescription: 'Close',
  version: 'Version 0.0.0',
};

export const Default = Template.bind({});
Default.args = {
  additionalInfo: 0,
  content: 0,
  links: 0,
  title: 1,
  ...commonArgs,
};

export const withAdditionalContent = Template.bind({});
withAdditionalContent.args = {
  additionalInfo: 1,
  content: 2,
  links: 3,
  title: 2,
  ...commonArgs,
};
