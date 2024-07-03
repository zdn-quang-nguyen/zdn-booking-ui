import Footer from '@/components/footer/Footer';
import GetLocation from '@/components/location/GetLocation';

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main>
      {children}
      <Footer />
      <GetLocation />
    </main>
  );
}
