import { FeatureScreen } from '@/components/feature-screen';

export default function ProfileRoute() {
  return <FeatureScreen title="Company profile" description="Keep your company details and workspace preferences up to date." actionLabel="Save changes" filters={['Company details', 'Subscription', 'Alerts', 'Billing']} rows={[
    { title: 'Traxx Logistics Ltd', subtitle: 'Logistics · Lagos, Nigeria', status: 'Complete', detail: 'CAC registration and contact details are configured.' },
    { title: 'Starter plan', subtitle: 'Monthly subscription', status: 'Active', detail: 'Billing history is available in this workspace.' },
    { title: 'Alert configuration', subtitle: 'Route deviation and idle warnings', status: 'Configured', detail: 'Notifications are enabled for operations.' },
  ]} />;
}
