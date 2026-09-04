import React from 'react';
import { Tearsheet } from '@carbon/ibm-products';
import { Button, Form, FormGroup, TextInput } from '@carbon/react';

// Test 1: Simple Tearsheet with title and actions
function SimpleTearsheet() {
  return (
    <Tearsheet
      open={true}
      onClose={() => {}}
      title="Simple Tearsheet"
      label="Customer data"
      actions={[
        { label: 'Cancel', onClick: () => {} },
        { label: 'Submit', onClick: () => {} },
      ]}>
      <Form>
        <TextInput id="name" labelText="Name" />
      </Form>
    </Tearsheet>
  );
}

// Test 2: Tearsheet with influencer
function TearsheetWithInfluencer() {
  return (
    <Tearsheet
      open={true}
      onClose={() => {}}
      title="With Influencer"
      label="Data"
      description="This is a description"
      influencer={<div>Influencer content</div>}
      influencerWidth="narrow">
      <div>Main content</div>
    </Tearsheet>
  );
}

// Test 3: Tearsheet with navigation
function TearsheetWithNavigation() {
  return (
    <Tearsheet
      open={true}
      onClose={() => {}}
      title="With Navigation"
      navigation={<div>Navigation tabs</div>}
      actions={[{ label: 'Close', onClick: () => {} }]}>
      <div>Content</div>
    </Tearsheet>
  );
}

// Test 4: Tearsheet with headerActions
function TearsheetWithHeaderActions() {
  return (
    <Tearsheet
      open={true}
      onClose={() => {}}
      title="With Header Actions"
      label="Label"
      headerActions={<Button>Action</Button>}>
      <div>Content</div>
    </Tearsheet>
  );
}

// Test 5: Tearsheet with deprecated slug prop
function TearsheetWithSlug() {
  return (
    <Tearsheet
      open={true}
      onClose={() => {}}
      title="With Slug"
      slug={<div>Slug content</div>}>
      <div>Content</div>
    </Tearsheet>
  );
}

// Test 6: Tearsheet with all features
function CompleteTearsheet() {
  return (
    <Tearsheet
      open={true}
      onClose={() => {}}
      title="Complete Tearsheet"
      label="All features"
      description="This has everything"
      decorator={<div>Decorator</div>}
      influencer={<div>Influencer</div>}
      influencerWidth="wide"
      navigation={<div>Navigation</div>}
      headerActions={<Button>Header Action</Button>}
      actions={[
        { label: 'Cancel', onClick: () => {} },
        { label: 'Submit', onClick: () => {} },
      ]}
      preventCloseOnClickOutside={true}
      variant="wide">
      <Form>
        <TextInput id="field1" labelText="Field 1" />
        <TextInput id="field2" labelText="Field 2" />
      </Form>
    </Tearsheet>
  );
}

// Test 7: Minimal Tearsheet (no header props)
function MinimalTearsheet() {
  return (
    <Tearsheet open={true} onClose={() => {}}>
      <div>Just content</div>
    </Tearsheet>
  );
}

// Test 8: Tearsheet with deprecated influencerPosition (should be removed)
function TearsheetWithInfluencerPosition() {
  return (
    <Tearsheet
      open={true}
      onClose={() => {}}
      title="Test"
      influencer={<div>Influencer</div>}
      influencerPosition="left">
      <div>Content</div>
    </Tearsheet>
  );
}

// Test 9: Stacked Tearsheets (multiple tearsheets)
function StackedTearsheets() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  return (
    <>
      <Tearsheet
        open={open1}
        onClose={() => setOpen1(false)}
        title="Tearsheet 1"
        label="First"
        actions={[{ label: 'Close', onClick: () => setOpen1(false) }]}>
        <div>Content 1</div>
      </Tearsheet>
      <Tearsheet
        open={open2}
        onClose={() => setOpen2(false)}
        title="Tearsheet 2"
        label="Second"
        actions={[{ label: 'Close', onClick: () => setOpen2(false) }]}>
        <div>Content 2</div>
      </Tearsheet>
    </>
  );
}

// Test 10: Tearsheet with spread props
function TearsheetWithSpreadProps() {
  const commonProps = {
    open: true,
    onClose: () => {},
    variant: 'wide',
  };

  return (
    <Tearsheet {...commonProps} title="With Spread" label="Spread props">
      <div>Content</div>
    </Tearsheet>
  );
}

// Test 11: Tearsheet with complex children
function TearsheetWithComplexChildren() {
  return (
    <Tearsheet
      open={true}
      onClose={() => {}}
      title="Complex Children"
      actions={[{ label: 'Submit', onClick: () => {} }]}>
      <Form>
        <FormGroup legendText="Section 1">
          <TextInput id="field1" labelText="Field 1" />
          <TextInput id="field2" labelText="Field 2" />
        </FormGroup>
        <FormGroup legendText="Section 2">
          <TextInput id="field3" labelText="Field 3" />
        </FormGroup>
      </Form>
    </Tearsheet>
  );
}

// Test 12: Tearsheet with only decorator (no other header props)
function TearsheetWithOnlyDecorator() {
  return (
    <Tearsheet open={true} onClose={() => {}} decorator={<div>Decorator</div>}>
      <div>Content</div>
    </Tearsheet>
  );
}
