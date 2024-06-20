'use server';

import clsx from 'clsx';
import { cookies } from 'next/headers';

export async function getLocation() {
  let provinces: Province[] = [];
  let districts: District[] = [];
  let wards: Ward[] = [];
  const cookiees = cookies().getAll();
  console.log(cookiees);
  const auth = `Bearer ${cookies().get('access_token')?.value}`;
  console.log(auth);
  try {
    // Fetch provinces
    const provincesResponse = await fetch(
      'http://localhost:5000/location/provinces',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      },
    );
    if (!provincesResponse.ok) {
      throw new Error('Failed to fetch provinces');
    }
    provinces = await provincesResponse.json();

    // Fetch districts
    const districtsResponse = await fetch(
      'http://localhost:5000/location/districts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      },
    );
    if (!districtsResponse.ok) {
      throw new Error('Failed to fetch districts');
    }
    districts = await districtsResponse.json();

    // Fetch wards
    const wardsResponse = await fetch('http://localhost:5000/location/ward', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    });
    if (!wardsResponse.ok) {
      throw new Error('Failed to fetch wards');
    }
    wards = await wardsResponse.json();

    return {
      provinces,
      districts,
      wards,
    };
  } catch (error: any) {
    return {
      provinces,
      districts,
      wards,
      error: 'Failed to fetch data',
    };
  } finally {
  }
}
