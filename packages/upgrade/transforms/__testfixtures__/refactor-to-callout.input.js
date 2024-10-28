// Typical imports
import { unstable__StaticNotification as StaticNotification } from '@carbon/react';
import { unstable__StaticNotification } from '@carbon/react';

// If they used a custom name
import { unstable__StaticNotification as SomeOtherName } from '@carbon/react';

// If they already renamed it Callout
import { unstable__StaticNotification as Callout } from '@carbon/react';

// Local renames like this are unlikely but technically possible
const LocallyRenamedStaticNotification = unstable__StaticNotification;

// Component usages
// prettier-ignore
const App = () => {
  return (
    <>
      <StaticNotification title="Test" />
      <SomeOtherName title="Test" />
      <Callout title="Test" />
      <LocallyRenamedStaticNotification title="Test" />
    </>
  );
};
