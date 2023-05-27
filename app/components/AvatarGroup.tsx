'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
  users?: User[];
}

export default function AvatarGroup({ users = [] }: AvatarGroupProps) {
  const slicedUsers = users.slice(0, 3);
  const positionArray = ['top-0 left-[12px]', 'bottom-0', 'bottom-0 right-0'];

  return (
    <div className='relative h-11 w-11'>
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute
            inline-block 
            rounded-full 
            overflow-hidden
            h-[21px]
            w-[21px]
            ${positionArray[index]}
          `}
        >
          <Image
            fill
            src={user?.image || '/images/placeholder.jpg'}
            alt='Avatar'
          />
        </div>
      ))}
    </div>
  );
}
