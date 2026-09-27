import React from 'react';
import { preview__Tearsheet as Tearsheet } from '@carbon/ibm-products';
import { Button, Form, FormGroup, TextInput } from '@carbon/react';

// Test 1: Simple Tearsheet with title and actions
function SimpleTearsheet() {
  return (
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Simple Tearsheet" label="Customer data"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <Form>
            <TextInput id="name" labelText="Name" />
          </Form>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
      <Tearsheet.Footer
        actions={[
          { label: 'Cancel', onClick: () => {} },
          { label: 'Submit', onClick: () => {} },
        ]} />
    </Tearsheet>
  );
}

// Test 2: Tearsheet with influencer
function TearsheetWithInfluencer() {
  return (
    <Tearsheet open={true} onClose={() => {}} influencerWidth="narrow">
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="With Influencer" label="Data" description="This is a description"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Influencer>
        <div>Influencer content</div>
      </Tearsheet.Influencer>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Main content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
}

// Test 3: Tearsheet with navigation
function TearsheetWithNavigation() {
  return (
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="With Navigation"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.NavigationBar>
        <div>Navigation tabs</div>
      </Tearsheet.NavigationBar>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
      <Tearsheet.Footer actions={[{ label: 'Close', onClick: () => {} }]} />
    </Tearsheet>
  );
}

// Test 4: Tearsheet with headerActions
function TearsheetWithHeaderActions() {
  return (
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent
          title="With Header Actions"
          label="Label"
          headerActions={<Button>Action</Button>}></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
}

// Test 5: Tearsheet with deprecated slug prop
function TearsheetWithSlug() {
  return (
    <Tearsheet open={true} onClose={() => {}} decorator={<div>Slug content</div>}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="With Slug"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
}

// Test 6: Tearsheet with all features
function CompleteTearsheet() {
  return (
    <Tearsheet
      open={true}
      onClose={() => {}}
      decorator={<div>Decorator</div>}
      influencerWidth="wide"
      preventCloseOnClickOutside={true}
      variant="wide">
      <Tearsheet.Header>
        <Tearsheet.HeaderContent
          title="Complete Tearsheet"
          label="All features"
          description="This has everything"
          headerActions={<Button>Header Action</Button>}></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Influencer>
        <div>Influencer</div>
      </Tearsheet.Influencer>
      <Tearsheet.NavigationBar>
        <div>Navigation</div>
      </Tearsheet.NavigationBar>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <Form>
            <TextInput id="field1" labelText="Field 1" />
            <TextInput id="field2" labelText="Field 2" />
          </Form>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
      <Tearsheet.Footer
        actions={[
          { label: 'Cancel', onClick: () => {} },
          { label: 'Submit', onClick: () => {} },
        ]} />
    </Tearsheet>
  );
}

// Test 7: Minimal Tearsheet (no header props)
function MinimalTearsheet() {
  return (
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Just content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
}

// Test 8: Tearsheet with deprecated influencerPosition (should be removed)
function TearsheetWithInfluencerPosition() {
  return (
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Test"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Influencer>
        <div>Influencer</div>
      </Tearsheet.Influencer>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
}

// Test 9: Stacked Tearsheets (multiple tearsheets)
function StackedTearsheets() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  return (<>
    <Tearsheet open={open1} onClose={() => setOpen1(false)}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Tearsheet 1" label="First"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content 1</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
      <Tearsheet.Footer actions={[{ label: 'Close', onClick: () => setOpen1(false) }]} />
    </Tearsheet>
    <Tearsheet open={open2} onClose={() => setOpen2(false)}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Tearsheet 2" label="Second"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content 2</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
      <Tearsheet.Footer actions={[{ label: 'Close', onClick: () => setOpen2(false) }]} />
    </Tearsheet>
  </>);
}

// Test 10: Tearsheet with spread props
function TearsheetWithSpreadProps() {
  const commonProps = {
    open: true,
    onClose: () => {},
    variant: 'wide',
  };

  return (
    <Tearsheet {...commonProps}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="With Spread" label="Spread props"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
}

// Test 11: Tearsheet with complex children
function TearsheetWithComplexChildren() {
  return (
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Complex Children"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <Form>
            <FormGroup legendText="Section 1">
              <TextInput id="field1" labelText="Field 1" />
              <TextInput id="field2" labelText="Field 2" />
            </FormGroup>
            <FormGroup legendText="Section 2">
              <TextInput id="field3" labelText="Field 3" />
            </FormGroup>
          </Form>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
      <Tearsheet.Footer actions={[{ label: 'Submit', onClick: () => {} }]} />
    </Tearsheet>
  );
}

// Test 12: Tearsheet with only decorator (no other header props)
function TearsheetWithOnlyDecorator() {
  return (
    <Tearsheet open={true} onClose={() => {}} decorator={<div>Decorator</div>}>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
}
