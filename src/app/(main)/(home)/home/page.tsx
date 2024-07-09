import type { Metadata } from 'next';
import Banner from './components/Banner/Banner';
import NearestFields from './components/nearest/NearestFields';
import PopularPlaces from './components/popular/PopularPlaces';
import SportFieldsByTime from './components/fields-by-time/SportFieldsByTime';
import { message } from 'antd';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Home Page',
  description: 'Zodinet Booking - Home: Find Your Sport Field with Ease',
};
const HomePage = async () => {
  return (
    <div>
      <Banner />
      <PopularPlaces />
      <NearestFields />
      <SportFieldsByTime />
    </div>
  );
};
export default HomePage;
