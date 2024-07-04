// components/GetLocation.tsx
'use client';
import { useEffect, useState } from 'react';

interface Coordinates {
  lat: number | null;
  long: number | null;
}

const useGetLocation = () => {
  const [location, setLocation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    try {
      const position = await new Promise<Coordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          },
        );
      });
      setLocation(JSON.stringify(position));
      localStorage.setItem('location', JSON.stringify(position));
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // const location = localStorage.getItem('location');
    // if (location) {
    //   setLocation(location);
    // } else {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       setLocation(
    //         JSON.stringify({
    //           lat: position.coords.latitude,
    //           long: position.coords.longitude,
    //         }),
    //       );
    //       localStorage.setItem(
    //         'location',
    //         JSON.stringify({
    //           lat: position.coords.latitude,
    //           long: position.coords.longitude,
    //         }),
    //       );
    //     },
    //     (error) => {
    //       setError(error.message);
    //     },
    //   );
    // }
    getLocation();
  }, [location]);

  return { location, error };
};

export default useGetLocation;
