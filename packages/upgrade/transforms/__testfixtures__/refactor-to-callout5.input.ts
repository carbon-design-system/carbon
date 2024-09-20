// Fully qualified import paths from within es
import {
  type StaticNotificationProps,
  StaticNotification,
} from '@carbon/react/es/components/Notification';

// If the transform results in duplicate imports, they should be deduped
import { unstable__StaticNotification } from '@carbon/react';
import { unstable__Callout } from '@carbon/react';

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
      <LocallyRenamedCallout title="Test" />
      <LocallyRenamedStaticNotification title="Test" />
      <Notification title="test" />
    </>
  );
};
