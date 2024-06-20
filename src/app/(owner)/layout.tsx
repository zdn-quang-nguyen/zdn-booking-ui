import OwnerHeader from '@/components/header/owner-customer/OwnerHeader';

type OwnerLayoutProps = {
  children: React.ReactNode;
};

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  return (
    <main className="flex h-screen flex-col bg-[#f7f7f7]">
      <OwnerHeader />
      {children}
    </main>
  );
}
