// Fully qualified import paths from within es
import {
  type CalloutProps,
  Callout,
} from '@carbon/react/es/components/Notification';

// If the transform results in duplicate imports, they should be deduped// note the de
import { unstable__Callout } from '@carbon/react';

// Redefine the component with props to ensure type interface is handled
const Notification: React.FC<CalloutProps> = (props) => {
  return <Callout {...props} />;
};

// Local renames like this are unlikely but technically possible
const LocallyRenamedStaticNotification = unstable__Callout;
const LocallyRenamedCallout = unstable__Callout;

// Component usages
const App = () => {
  return (
    <>
      <Callout title="Test" />
      <LocallyRenamedCallout title="Test" />
      <LocallyRenamedStaticNotification title="Test" />
      <Notification title="test" />
    </>
  );
};
