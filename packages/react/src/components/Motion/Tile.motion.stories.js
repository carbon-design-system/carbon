/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { resolveDuration, resolveEasing } from '@carbon/motion';
import { ArrowRight } from '@carbon/icons-react';
import { hover } from 'motion';
import { animate } from 'motion/mini';
import PropTypes from 'prop-types';
import { AspectRatio } from '../AspectRatio';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';
import ComboBox from '../ComboBox';
import Dropdown from '../Dropdown';
import { Column, Grid } from '../Grid';
import Modal from '../Modal';
import { MultiSelect } from '../MultiSelect';
import Select from '../Select';
import SelectItem from '../SelectItem';
import {
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
  StructuredListWrapper,
} from '../StructuredList';
import TextInput from '../TextInput';
import { usePrefix } from '../../internal/usePrefix';
import { useMotionSurface } from '../../internal/motion/useMotionSurface';
import { ClickableTile } from '../Tile/Tile';
import './Tile.motion.stories.scss';

// These Carbon tiles give the story several real source surfaces.
const solutionTiles = [
  {
    id: 'multicloud-management',
    name: 'Multicloud management',
    description:
      'Increase operational efficiency with intelligent data analysis and built-in support for compliance management.',
  },
  {
    id: 'cloud-pak-integration',
    name: 'Cloud Pak for integration',
    description:
      'Integrate applications and data across on-premises and cloud environments.',
  },
  {
    id: 'cloud-pak-automation',
    name: 'Cloud Pak for automation',
    description:
      'Design, build, and run automation applications and services on any cloud.',
  },
  {
    id: 'cloud-pak-applications',
    name: 'Cloud Pak for applications',
    description:
      'Modernize existing applications and develop cloud-native apps with continuous compliance.',
  },
  {
    id: 'cloud-pak-data',
    name: 'Cloud Pak for data',
    description:
      'Collect, organize, analyze, and operationalize data and AI across your business.',
  },
  {
    id: 'all-solutions',
    name: 'View all IBM solutions',
    description:
      'Explore products and services designed to solve complex business challenges.',
  },
];

export default {
  title: 'Motion/Surfaces/Expand',
  tags: ['!autodocs'],
  parameters: {
    controls: {
      disable: true,
    },
  },
};

const permissions = ['Viewer', 'Editor', 'Manager'];
const tlsVersions = [
  { id: 'tls-0', text: '1.0' },
  { id: 'tls-1', text: '1.1' },
  { id: 'tls-2', text: '1.2' },
];
const domainMappings = [
  { id: 'mapping-0', text: 'Cloud Foundry' },
  { id: 'mapping-1', text: 'Kubernetes Ingress' },
  { id: 'mapping-2', text: 'VPC Load Balancer' },
];

// Convert the Carbon duration token to the seconds value Motion expects.
function toSeconds(duration) {
  return Number.parseInt(duration, 10) / 1000;
}

const tileHoverMotion = {
  duration: toSeconds(resolveDuration('fast-02')),
  ease: [...resolveEasing('standard', 'productive')],
};

// Just to mirrors the Default Modal story.
function DefaultModalContent() {
  return (
    <>
      <p style={{ marginBottom: '2rem' }}>
        Custom domains direct requests for your apps in this Cloud Foundry
        organization to a URL that you own. A custom domain can be a shared
        domain, a shared subdomain, or a shared domain and host.
      </p>
      <TextInput
        data-modal-primary-focus
        id="motion-domain-name"
        labelText="Domain name"
        placeholder="For example, GitHub.com"
        style={{ marginBottom: '24px' }}
      />
      <div style={{ marginBottom: '24px' }}>
        <Select defaultValue="us-south" id="motion-region" labelText="Region">
          <SelectItem value="us-south" text="US South" />
          <SelectItem value="us-east" text="US East" />
        </Select>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <ComboBox
          allowCustomValue
          autoAlign
          id="motion-permissions"
          items={permissions}
          titleText="Permissions (Example of Floating UI)"
        />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <Dropdown
          autoAlign
          id="motion-tls"
          items={tlsVersions}
          itemToString={(item) => (item ? item.text : '')}
          label="Option 1"
          titleText="TLS (Example of Floating UI)"
        />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <MultiSelect
          autoAlign
          id="motion-domain-mapping"
          items={domainMappings}
          itemToString={(item) => (item ? item.text : '')}
          label="Choose options"
          titleText="Mapping domain"
        />
      </div>
      <CheckboxGroup legendText="Terms of Agreement">
        <Checkbox
          id="motion-domain-terms"
          labelText="I confirm domain ownership and accept IBM service terms and applicable charges."
        />
      </CheckboxGroup>
    </>
  );
}

function FullWidthModalContent() {
  // Use the same StructuredList to the full-width Modal story.
  return (
    <StructuredListWrapper style={{ marginBottom: '48px' }}>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head noWrap>
            Default size
          </StructuredListCell>
          <StructuredListCell head noWrap>
            Features
          </StructuredListCell>
          <StructuredListCell head noWrap>
            Pricing
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        <StructuredListRow>
          <StructuredListCell noWrap>Lite</StructuredListCell>
          <StructuredListCell>2 vCPUs | 4GB RAM</StructuredListCell>
          <StructuredListCell>$0.12 USD / hourly</StructuredListCell>
        </StructuredListRow>
        <StructuredListRow>
          <StructuredListCell noWrap>Graduated tier</StructuredListCell>
          <StructuredListCell>2 vCPUs | 8GB RAM</StructuredListCell>
          <StructuredListCell>$0.13 USD / hourly</StructuredListCell>
        </StructuredListRow>
        <StructuredListRow>
          <StructuredListCell noWrap>Premium</StructuredListCell>
          <StructuredListCell>4 vCPUs | 10GB RAM</StructuredListCell>
          <StructuredListCell>$0.20 USD / hourly</StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
  );
}

function TileToModalDemo({
  enableHoverMotion = false,
  isFullWidth = false,
  renderModalContent,
}) {
  const prefix = usePrefix();
  const [open, setOpen] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);
  // These refs identify the Carbon elements that take part in the morph.
  const originRef = useRef(null);
  const modalRootRef = useRef(null);
  const modalSurfaceRef = useRef(null);
  const modalContentRef = useRef([]);
  const tileRefs = useRef([]);

  const motionSurface = useMotionSurface('expand', {
    adapter: 'motion',
    contentRef: modalContentRef,
    onExitComplete: () => setSelectedTile(null),
    open,
    originRef,
    overlayRef: modalRootRef,
    targetRef: modalSurfaceRef,
  });

  const setModalRef = useCallback(
    (node) => {
      modalRootRef.current = node;

      // Modal exposes its overlay, so the spike finds the inner surface here.
      // we might need refinement
      modalSurfaceRef.current = node?.querySelector(
        `.${prefix}--modal-container`
      );
      modalContentRef.current = node
        ? Array.from(
            node.querySelectorAll(
              `.${prefix}--modal-header, .${prefix}--modal-content, .${prefix}--modal-footer`
            )
          )
        : [];
    },
    [prefix]
  );

  function handleOnClick(tile, event) {
    // Save the clicked Tile so Modal can return focus to the same element.
    originRef.current = event.currentTarget;
    setSelectedTile(tile);
    setOpen(true);
  }

  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!enableHoverMotion || typeof window === 'undefined') {
      return;
    }

    // Skip the hover effect when the user asks for less motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const cleanups = tileRefs.current.filter(Boolean).map((tile) =>
      hover(tile, () => {
        const enter = animate(
          tile,
          {
            transform: [
              'translate3d(0, 0, 0) scale(1)',
              'translate3d(0, -4px, 0) scale(1.02)',
            ],
          },
          tileHoverMotion
        );

        return () => {
          enter.stop();

          animate(
            tile,
            {
              transform: [
                'translate3d(0, -4px, 0) scale(1.02)',
                'translate3d(0, 0, 0) scale(1)',
              ],
            },
            tileHoverMotion
          );
        };
      })
    );

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [enableHoverMotion]);

  return (
    <>
      <Grid condensed>
        {solutionTiles.map((tile, index) => (
          <Column key={tile.id} sm={4} md={4} lg={5}>
            <AspectRatio
              as={ClickableTile}
              aria-expanded={open && selectedTile?.id === tile.id}
              aria-haspopup="dialog"
              className={`motion-surface-tile${
                enableHoverMotion ? ' motion-surface-tile--hover-motion' : ''
              }`}
              clicked={open && selectedTile?.id === tile.id}
              onClick={(event) => handleOnClick(tile, event)}
              ratio="1x1"
              ref={(node) => {
                tileRefs.current[index] = node;
              }}
              renderIcon={ArrowRight}>
              <div className="motion-surface-tile__content">
                <h3 className="motion-surface-tile__heading">{tile.name}</h3>
                <p className="motion-surface-tile__description">
                  {tile.description}
                </p>
              </div>
            </AspectRatio>
          </Column>
        ))}
      </Grid>

      {motionSurface.isPresent && selectedTile && (
        <Modal
          aria-label="Modal content"
          isFullWidth={isFullWidth}
          launcherButtonRef={originRef}
          modalHeading={
            isFullWidth ? 'Full width modal' : 'Add a custom domain'
          }
          modalLabel={
            isFullWidth ? 'An example of a modal with no padding' : undefined
          }
          onRequestClose={closeModal}
          onRequestSubmit={closeModal}
          onSecondarySubmit={closeModal}
          open={motionSurface.isComponentOpen}
          primaryButtonText="Add"
          ref={setModalRef}
          secondaryButtonText="Cancel">
          {renderModalContent()}
        </Modal>
      )}
    </>
  );
}

TileToModalDemo.propTypes = {
  enableHoverMotion: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  renderModalContent: PropTypes.func.isRequired,
};

export const TileToDefaultModal = () => {
  return <TileToModalDemo renderModalContent={() => <DefaultModalContent />} />;
};

export const TileToFullWidthModal = () => {
  return (
    <TileToModalDemo
      enableHoverMotion
      isFullWidth
      renderModalContent={() => <FullWidthModalContent />}
    />
  );
};
