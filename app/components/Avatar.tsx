'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarProps {
  user?: User | null;
}

export default function Avatar({ user }: AvatarProps) {
  return (
    <div className='relative'>
      <div
        className='
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      '
      >
        <Image
          fill={true}
          src={user?.image || '/images/placeholder.jpg'}
          alt='Avatar'
          sizes='md:h-11 md:w-11'
        />
      </div>
      {/* TODO: user의 상태가 active일 때만 적용하기 */}
      <span
        className='
            absolute 
            block 
            rounded-full 
          bg-green-500 
            ring-2 
          ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          '
      />
    </div>
  );
}
