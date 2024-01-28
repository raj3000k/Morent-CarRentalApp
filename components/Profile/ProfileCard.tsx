'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Button from '../reusable/Button';
import Image from 'next/image';

interface Props {
  id: string;
}

const ProfileCard = ({ id }: Props) => {
  const [profileData, setProfileData] = useState({
    full_name: '',
    avatar_url: '',
    banner: '',
    headline: '',
  });

  useEffect(() => {
    const supabase = createClientComponentClient();
    async function fetchProfileData() {
      try {
        if (id) {
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name, avatar_url, banner, headline')
            .eq('id', id);

          if (data && data.length > 0) {
            setProfileData(data[0]);
          } else if (error) {
            console.error('Error fetching profile data:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
    fetchProfileData();
  }, [id]);

  return (
    <section className='relative flex h-[301px] w-full rounded-[10px] bg-white dark:bg-gray-850'>
      <div
        className='h-[150px] w-full rounded-t-[10px] md:h-[182px]'
        style={{
          backgroundImage: `url(${profileData.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className='absolute left-[13px] top-[115px] h-[70px] w-[70px] md:left-[31px] md:top-[119px] md:h-40 md:w-40'>
        <Image
          src={profileData.avatar_url}
          alt='Profile Image'
          fill
          priority
          className='rounded-full object-cover'
        />
      </div>
      <div className='absolute left-[13px] top-[195px] h-[50px] w-[250px] md:left-[223px] md:top-[213px]'>
        <div className='absolute left-0 top-0 text-xl font-bold text-gray-900 dark:text-white-0'>
          {profileData.full_name}
        </div>
        <div className='absolute left-0 top-[32px] text-sm font-normal text-gray-900 opacity-50 dark:text-blue-100'>
          {profileData.headline}
        </div>
      </div>
      <div className='absolute right-2.5 top-[245px] inline-flex md:right-[50px] md:top-[220px]'>
        <Button
          href='/auth/editprofile'
          title='Edit Profile'
          style='btn-edit-profile'
        />
      </div>
    </section>
  );
};

export default ProfileCard;
