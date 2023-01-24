import React from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  RadioButtonGroup,
  RadioButton,
} from '@carbon/react';

const AppHeader = (props) => {
  return (
    <Header aria-label="IBM Platform Name">
      <div>
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>
      </div>

      <HeaderNavigation aria-label="IBM [Platform]">
        <HeaderMenuItem href="/">Home</HeaderMenuItem>
        <HeaderMenuItem href="/repopage">RepoPage</HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <div className={'bx--cloud-header-list'}>
          <RadioButtonGroup
            name={'theme-selection'}
            legendText={'Choose a theme'}
            defaultSelected={'radio-1'}
            data-testid={'theme-selection'}
            onChange={(value) => {
              // eslint-disable-next-line react/prop-types
              props.sendDataToParent(value);
            }}>
            <RadioButton labelText={'White'} value={'white'} id={'radio-1'} />
            <RadioButton labelText={'g10'} value={'g10'} id={'radio-2'} />
            <RadioButton labelText={'g80'} value={'g90'} id={'radio-3'} />
            <RadioButton labelText={'g100'} value={'g100'} id={'radio-4'} />
          </RadioButtonGroup>
        </div>
      </HeaderGlobalBar>
    </Header>
  );
};

export default AppHeader;
