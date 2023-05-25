// usePathname is a Client Component hook that lets you read the current URL's pathname.
//
// URL -> /blog/hello-world
// Returned value -> '/blog/hello-world'
//
// https://nextjs.org/docs/app/api-reference/functions/use-pathname

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from 'next-auth/react';
import useConversation from './useConversation';

export default function useRoutes() {
  const pathname = usePathname();
  const { isOpen } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations' || isOpen,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users',
      },
      {
        label: 'Logout',
        onClick: () => signOut(),
        href: '#',
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, isOpen]
  );

  return routes;
}
