import React from 'react';
import {
  preview__Tearsheet as Tearsheet,
  preview__Tearsheet as MyTearsheet,
  preview__Tearsheet as AnotherSheet,
} from '@carbon/ibm-products';
import { Button } from '@carbon/react';

// Edge Case 1: Multiple imports with different aliases
export const MultipleAliases = () => {
  return (<>
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Standard"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content 1</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
    <MyTearsheet open={true} onClose={() => {}}>
      <MyTearsheet.Header>
        <MyTearsheet.HeaderContent title="Aliased"></MyTearsheet.HeaderContent>
      </MyTearsheet.Header>
      <MyTearsheet.Body>
        <MyTearsheet.MainContent>

          <div>Content 2</div>

        </MyTearsheet.MainContent>
      </MyTearsheet.Body>
    </MyTearsheet>
  </>);
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
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Minimal</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
};

// Edge Case 4: Tearsheet with only root props (no header/footer)
export const OnlyRootProps = () => {
  return (
    <Tearsheet open={true} onClose={() => {}} variant="wide">
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Just content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
};

// Edge Case 5: Tearsheet with spread props
export const WithSpread = () => {
  const props = { open: true, onClose: () => {} };
  return (
    <Tearsheet {...props}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Spread"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
};

// Edge Case 6: Nested Tearsheets
export const NestedTearsheets = () => {
  return (
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Outer"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>
            <Tearsheet open={true} onClose={() => {}}>
              <Tearsheet.Header>
                <Tearsheet.HeaderContent title="Inner"></Tearsheet.HeaderContent>
              </Tearsheet.Header>
              <Tearsheet.Body>
                <Tearsheet.MainContent>

                  <div>Nested content</div>

                </Tearsheet.MainContent>
              </Tearsheet.Body>
            </Tearsheet>
          </div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
};

// Edge Case 7: Tearsheet in conditional
export const ConditionalTearsheet = ({ show }: { show: boolean }) => {
  return show ? (
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Conditional"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  ) : null;
};

// Edge Case 8: Tearsheet in array map
export const MappedTearsheets = () => {
  const items = [1, 2, 3];
  return (<>
    {items.map((i) => (
      <Tearsheet key={i} open={true} onClose={() => {}}>
        <Tearsheet.Header>
          <Tearsheet.HeaderContent title={`Item ${i}`}></Tearsheet.HeaderContent>
        </Tearsheet.Header>
        <Tearsheet.Body>
          <Tearsheet.MainContent>

            <div>Content {i}</div>

          </Tearsheet.MainContent>
        </Tearsheet.Body>
      </Tearsheet>
    ))}
  </>);
};

// Edge Case 9: Tearsheet with all deprecated props
export const AllDeprecatedProps = () => {
  return (
    <Tearsheet open={true} onClose={() => {}} decorator={<div>Slug</div>}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Deprecated"></Tearsheet.HeaderContent>
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>

          <div>Content</div>

        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
};

// Edge Case 10: Empty Tearsheet
export const EmptyTearsheet = () => {
  return (
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Body>
        <Tearsheet.MainContent></Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
};
