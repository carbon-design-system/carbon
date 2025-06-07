// Typical imports
import { unstable__Callout as Callout } from '@carbon/react';
import { unstable__Callout } from '@carbon/react';

// If they used a custom name
import { unstable__Callout as SomeOtherName } from '@carbon/react';

// If they already renamed it Callout
import { unstable__Callout as Callout } from '@carbon/react';

// Local renames like this are unlikely but technically possible
const LocallyRenamedStaticNotification = unstable__Callout;

// Component usages
// prettier-ignore
const App = () => {
  return (<>
    <Callout title="Test" />
    <SomeOtherName title="Test" />
    <Callout title="Test" />
    <LocallyRenamedStaticNotification title="Test" />
  </>);
};
