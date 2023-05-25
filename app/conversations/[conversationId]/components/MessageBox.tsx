'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Avatar from '@/app/components/Avatar';
import { useState } from 'react';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { FullMessageType } from '@/app/types';

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

export default function MessageBox({ data, isLast }: MessageBoxProps) {
  const session = useSession();

  // 내가 보낸 메시지인지 확인
  const isOwn = session.data?.user?.email === data?.sender?.email;

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2'); // 상대방은 아바타가 왼쪽, 나는 오른쪽에 위치하도록 배치
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          <div className='text-sm text-gray-500'>{data.sender.name}</div>
          <div className='text-xs text-gray-400'>
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              alt='Image'
              height='288'
              width='288'
              onClick={() => {}}
              src={data.image}
              className='
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
            '
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
      </div>
    </div>
  );
}
