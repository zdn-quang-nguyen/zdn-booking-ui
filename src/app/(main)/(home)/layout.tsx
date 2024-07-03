import Footer from '@/components/footer/Footer';
import GetLocation from '@/components/location/GetLocation';

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="flex flex-grow flex-col">
      <div className="flex-grow">{children}</div>
      <div className="justify-self-end">
        <Footer />
      <GetLocation />
      </div>
    </main>
  );
}
