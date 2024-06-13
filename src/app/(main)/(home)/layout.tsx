import Footer from '@/components/footer/Footer';

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main>
      {children}
      <Footer />
    </main>
  );
}
