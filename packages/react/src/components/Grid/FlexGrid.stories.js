import './FlexGrid.stories.scss';
import React from 'react';
import { FlexGrid, Row, Column } from './';
import mdx from './FlexGrid.mdx';

export default {
  title: 'Elements/FlexGrid',
  component: FlexGrid,
  subcomponents: {
    Row,
    Column,
  },
  decorators: [(storyFn) => <div id="templates">{storyFn()}</div>],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    columns: {
      table: {
        disable: true,
      },
    },
  },
};

export const AutoColumns = () => {
  // Grab the style from here to see the visual example
  //https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/FlexGrid.stories.scss
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <FlexGrid>
      <Row>
        <Column>
          <DemoContent>Span 25%</DemoContent>
        </Column>
        <Column>
          <DemoContent>Span 25%</DemoContent>
        </Column>
        <Column>
          <DemoContent>Span 25%</DemoContent>
        </Column>
        <Column>
          <DemoContent>Span 25%</DemoContent>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export const ResponsiveGrid = () => {
  // Grab the style from here to see the visual example
  //https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/FlexGrid.stories.scss
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <FlexGrid>
      <Row>
        <Column sm={2} md={4} lg={6}>
          <DemoContent>
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 4 of 8</p>
            <p>Large: Span 6 of 16</p>
          </DemoContent>
        </Column>
        <Column sm={2} md={2} lg={3}>
          <DemoContent>
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 2 of 8</p>
            <p>Large: Span 3 of 16</p>
          </DemoContent>
        </Column>
        <Column sm={0} md={2} lg={3}>
          <DemoContent>
            <p>Small: Span 0 of 4</p>
            <p>Medium: Span 2 of 8</p>
            <p>Large: Span 3 of 16</p>
          </DemoContent>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export const Offset = () => {
  // Grab the style from here to see the visual example
  //https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/FlexGrid.stories.scss
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <FlexGrid>
      <Row>
        <Column sm={{ span: 1, offset: 3 }}>
          <DemoContent>Small: offset 3</DemoContent>
        </Column>
        <Column sm={{ span: 2, offset: 2 }}>
          <DemoContent>Small: offset 2</DemoContent>
        </Column>
        <Column sm={{ span: 3, offset: 1 }}>
          <DemoContent>Small: offset 1</DemoContent>
        </Column>
        <Column sm={{ span: 4, offset: 0 }}>
          <DemoContent>Small: offset 0</DemoContent>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export const Condensed = () => {
  // Grab the style from here to see the visual example
  //https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/FlexGrid.stories.scss
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <FlexGrid condensed>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export const CondensedColumns = () => {
  // Grab the style from here to see the visual example
  //https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/FlexGrid.stories.scss
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <FlexGrid>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
      <Row condensed>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export const Narrow = () => {
  // Grab the style from here to see the visual example
  //https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/FlexGrid.stories.scss
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <FlexGrid narrow>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export const NarrowColumns = () => {
  // Grab the style from here to see the visual example
  //https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/FlexGrid.stories.scss
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <FlexGrid>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
      <Row narrow>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export const FullWidth = () => {
  // Grab the style from here to see the visual example
  //https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/FlexGrid.stories.scss
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <FlexGrid fullWidth>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export const MixedGutterModes = () => {
  // Grab the style from here to see the visual example
  //https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/FlexGrid.stories.scss
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <FlexGrid>
      <Row>
        <Column>
          <DemoContent>Wide</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
      <Row narrow>
        <Column>
          <DemoContent>Narrow</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
      <Row condensed>
        <Column>
          <DemoContent>Condensed</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export const Default = (args) => {
  // Grab the style from here to see the visual example
  //https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Grid/FlexGrid.stories.scss
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <FlexGrid {...args}>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </FlexGrid>
  );
};

Default.args = {
  as: 'div',
  fullWidth: false,
  narrow: false,
  condensed: false,
};

Default.argTypes = {
  as: {
    control: {
      type: 'text',
    },
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  fullWidth: {
    control: {
      type: 'boolean',
    },
  },
  narrow: {
    control: {
      type: 'boolean',
    },
  },
  condensed: {
    control: {
      type: 'boolean',
    },
  },
};
