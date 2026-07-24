import React from 'react';
import {
  Tearsheet,
  Tearsheet as MyTearsheet,
  Tearsheet as AnotherSheet,
} from '@carbon/ibm-products';
import { Button } from '@carbon/react';

// Edge Case 1: Multiple imports with different aliases
export const MultipleAliases = () => {
  return (
    <>
      <Tearsheet open={true} onClose={() => {}} title="Standard">
        <div>Content 1</div>
      </Tearsheet>
      <MyTearsheet open={true} onClose={() => {}} title="Aliased">
        <div>Content 2</div>
      </MyTearsheet>
    </>
  );
};

// Edge Case 2: No JSX usage (import only)
export const ImportOnly = () => {
  const config = {
    component: Tearsheet,
  };
  return <div>No Tearsheet JSX here</div>;
};

// Edge Case 3: Tearsheet with no props at all
export const NoProps = () => {
  return (
    <Tearsheet>
      <div>Minimal</div>
    </Tearsheet>
  );
};

// Edge Case 4: Tearsheet with only root props (no header/footer)
export const OnlyRootProps = () => {
  return (
    <Tearsheet open={true} onClose={() => {}} variant="wide">
      <div>Just content</div>
    </Tearsheet>
  );
};

// Edge Case 5: Tearsheet with spread props
export const WithSpread = () => {
  const props = { open: true, onClose: () => {} };
  return (
    <Tearsheet {...props} title="Spread">
      <div>Content</div>
    </Tearsheet>
  );
};

// Edge Case 6: Nested Tearsheets
export const NestedTearsheets = () => {
  return (
    <Tearsheet open={true} onClose={() => {}} title="Outer">
      <div>
        <Tearsheet open={true} onClose={() => {}} title="Inner">
          <div>Nested content</div>
        </Tearsheet>
      </div>
    </Tearsheet>
  );
};

// Edge Case 7: Tearsheet in conditional
export const ConditionalTearsheet = ({ show }: { show: boolean }) => {
  return show ? (
    <Tearsheet open={true} onClose={() => {}} title="Conditional">
      <div>Content</div>
    </Tearsheet>
  ) : null;
};

// Edge Case 8: Tearsheet in array map
export const MappedTearsheets = () => {
  const items = [1, 2, 3];
  return (
    <>
      {items.map((i) => (
        <Tearsheet key={i} open={true} onClose={() => {}} title={`Item ${i}`}>
          <div>Content {i}</div>
        </Tearsheet>
      ))}
    </>
  );
};

// Edge Case 9: Tearsheet with all deprecated props
export const AllDeprecatedProps = () => {
  return (
    <Tearsheet
      open={true}
      onClose={() => {}}
      slug={<div>Slug</div>}
      influencerPosition="left"
      title="Deprecated">
      <div>Content</div>
    </Tearsheet>
  );
};

// Edge Case 10: Empty Tearsheet
export const EmptyTearsheet = () => {
  return <Tearsheet open={true} onClose={() => {}} />;
};
