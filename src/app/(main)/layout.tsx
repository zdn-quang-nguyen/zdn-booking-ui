import CustomerHeader from '@/components/header/customer-header/CustomerHeader';

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
  return (
    <main>
      <CustomerHeader />
      {children}
    </main>
  );
}
