// Test lots of different import configurations, even though this would never be
// valid in a real context
import { unstable__StaticNotification } from '@carbon/react';
import { unstable__StaticNotification as StaticNotification } from '@carbon/react';
import { StaticNotification } from '@carbon/react';
import { StaticNotification } from '@carbon/react/es/components/Notification';
import { StaticNotification } from '@carbon/react/lib/components/Notification';
import { StaticNotification as Callout } from '@carbon/react';
import { StaticNotification as SomeOtherName } from '@carbon/react';
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
const LocallyRenamedStaticNotification = unstable__StaticNotification;
const LocallyRenamedCallout = unstable__Callout;

// Component usages
const App = () => {
  return (
    <>
      <StaticNotification title="Test" />
      <SomeOtherName title="Test" />
      <SomeOtherOtherName title="Test" />
      <Callout title="Test" />
      <LocallyRenamedCallout title="Test" />
      <LocallyRenamedStaticNotification title="Test" />
    </>
  );
};
