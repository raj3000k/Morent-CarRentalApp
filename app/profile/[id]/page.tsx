import React from 'react';

import ProfileCard from '@/components/Profile/ProfileCard';
import Button from '@/components/reusable/Button';
import CarCard from '@/components/reusable/CarCard';
import fetchRentedCars from '@/app/api/fetchRentedCars';
import fetchMyCars from '@/app/api/fetchMyCars';
import { Car } from '@/typings';

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const rentedCarsData = await fetchRentedCars({ id: params.id });
  const myCarsData = await fetchMyCars({ id: params.id });

  const renderCarSection = (title: string, cars: Car[]) => (
    <section className='relative mt-10 flex flex-col gap-6'>
      <h5 className='px-6 text-lg font-medium text-gray-400'>{title}</h5>
      <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-4'>
        {cars.slice(0, 4).map((item) => (
          <CarCard key={item.car_id} data={item} />
        ))}
      </div>
    </section>
  );

  return (
    <main className='padding-layout flex flex-col bg-white-200 dark:bg-gray-900'>
      <h1 className='mb-[24px] mt-6 text-xl font-bold text-gray-900 md:mb-[29px] md:mt-[68px]'>
        My Profile
      </h1>
      {/* Profile Section */}
      <ProfileCard id={params.id} />

      {/* Rented Car Section */}
      {renderCarSection('Rented Cars', rentedCarsData)}

      {/* My Cars for Rent Section */}
      {renderCarSection('My Cars for Rent', myCarsData)}

      <div className='my-12 flex justify-center md:my-16'>
        <Button
          href='/addcar'
          title='Add More Cars for Rent'
          style='btn-add-cars w-[228px] h-14 px-5'
        />
      </div>
    </main>
  );
};

export default ProfilePage;
