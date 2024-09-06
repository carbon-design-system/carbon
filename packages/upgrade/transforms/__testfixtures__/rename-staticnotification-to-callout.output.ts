// Test lots of different import configurations, even though this would never be
// valid in a real context
import { unstable__Callout } from '@carbon/react';
import { unstable__Callout as StaticNotification } from '@carbon/react';
import { Callout } from '@carbon/react';
import { Callout } from '@carbon/react/es/components/Notification';
import { Callout } from '@carbon/react/lib/components/Notification';
import { Callout } from '@carbon/react';
import { unstable__Callout as SomeOtherName } from '@carbon/react';
import { unstable__Callout } from '@carbon/react';
import { unstable__Callout as SomeOtherOtherName } from '@carbon/react';
import { unstable__Callout as StaticNotification } from '@carbon/react';
import { StaticNotificationProps } from '@carbon/react/es/components/Notification';
import { StaticNotificationProps } from '@carbon/react/lib/components/Notification';

// Redefine the component with props to ensure type interface is handled
const Notification: React.FC<StaticNotificationProps> = (props) => {
  return <StaticNotification {...props} />;
};

// Local renames like this are unlikely but technically possible
const LocallyRenamedStaticNotification = unstable__Callout;
const LocallyRenamedCallout = unstable__Callout;

// Component usages
const App = () => {
  return (
    <>
      <Callout title="Test" />
      <SomeOtherName title="Test" />
      <SomeOtherOtherName title="Test" />
      <Callout title="Test" />
      <LocallyRenamedCallout title="Test" />
      <LocallyRenamedStaticNotification title="Test" />
    </>
  );
};
