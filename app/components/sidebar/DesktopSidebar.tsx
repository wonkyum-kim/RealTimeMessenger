'use client';

import useRoutes from '@/app/hooks/useRoutes';
import DesktopItem from './DesktopItem';
import { User } from '@prisma/client';
import { useState } from 'react';
import Avatar from '../Avatar';

interface DesktopSidebarProps {
  currentUser: User | null;
}

export default function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className='
        hidden 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-20 
        lg:overflow-y-auto 
      lg:bg-white 
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        lg:justify-between
        lg:gap-y-4
        xl:px-6
      '
    >
      <nav className='flex flex-col justify-between'>
        <ul role='list' className='flex flex-col items-center space-y-1'>
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className='flex flex-col justify-between items-center'>
        <div
          onClick={() => setIsOpen(true)}
          className='cursor-pointer hover:opacity-75 transition'
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
}
