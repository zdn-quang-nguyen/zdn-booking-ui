import CustomerHeader from '@/components/header/customer-header/CustomerHeader';
import PrivateRoute from './PrivateRoute';
import GetLocation from '@/components/location/GetLocation';

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
  return (
    <PrivateRoute>
      <main>
        <CustomerHeader />
        {children}
      </main>
      <GetLocation />
    </PrivateRoute>
  );
}
