'use client';

import useOtherUser from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/Avatar';
import ConfirmModal from './ConfirmModal';
import AvatarGroup from '@/app/components/AvatarGroup';
import { format } from 'date-fns';
import { Conversation, User } from '@prisma/client';
import { useMemo, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoClose, IoTrash } from 'react-icons/io5';

interface UserProfileProps {
  otherUser: User;
  title: string | null;
  statusText: string;
  isGroup: boolean;
  users?: User[];
}

interface DescriptionProps {
  data: Conversation & {
    users: User[];
  };
  otherUser: User;
  joinedDate: string;
}

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

function ClosePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className='flex items-center justify-end h-7 px-4 sm:px-6'>
      <button
        type='button'
        className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        onClick={onClose}
      >
        <span className='sr-only'>Close panel</span>
        <IoClose size={24} />
      </button>
    </div>
  );
}

function UserProfile({
  otherUser,
  title,
  statusText,
  isGroup,
  users,
}: UserProfileProps) {
  return (
    <>
      <div className='pb-2'>
        {isGroup ? <AvatarGroup users={users} /> : <Avatar user={otherUser} />}
      </div>
      <div>{title}</div>
      <div className='text-sm text-gray-500'>{statusText}</div>
    </>
  );
}

function DeleteChat({
  setConfirmOpen,
}: {
  setConfirmOpen: (x: boolean) => void;
}) {
  return (
    <div className='flex gap-10 py-8'>
      <div
        onClick={() => setConfirmOpen(true)}
        className='flex flex-col gap-3 items-center cursor-pointer hover:opacity-75'
      >
        <div className='w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center'>
          <IoTrash size={20} />
        </div>
        <div className='text-sm font-light text-neutral-600'>Delete</div>
      </div>
    </div>
  );
}

function Description({ data, otherUser, joinedDate }: DescriptionProps) {
  return (
    <dl className='flex flex-col w-full gap-y-8 px-4 sm:gap-y-6 sm:px-6'>
      {data.isGroup && (
        <div>
          <dt
            className='
                text-sm 
                font-medium 
                text-gray-500 
                sm:w-40 
                sm:flex-shrink-0
              '
          >
            Emails
          </dt>
          <dd
            className='
                pt-1 
                text-sm 
                text-gray-900 
                sm:col-span-2
              '
          >
            {data.users.map((user) => user.email).join(', ')}
          </dd>
        </div>
      )}
      {!data.isGroup && (
        <div>
          <dt
            className='
                text-sm 
                font-medium 
                text-gray-500 
                sm:w-40 
                sm:flex-shrink-0
              '
          >
            Email
          </dt>
          <dd
            className='
                mt-1 
                text-sm 
                text-gray-900 
                sm:col-span-2
              '
          >
            {otherUser.email}
          </dd>
        </div>
      )}
      {!data.isGroup && (
        <>
          <hr />
          <div>
            <dt
              className='
                  text-sm 
                  font-medium 
                  text-gray-500 
                  sm:w-40 
                  sm:flex-shrink-0
                '
            >
              Joined
            </dt>
            <dd
              className='
                  mt-1 
                  text-sm 
                  text-gray-900 
                  sm:col-span-2
                '
            >
              <time dateTime={joinedDate}>{joinedDate}</time>
            </dd>
          </div>
        </>
      )}
    </dl>
  );
}

export default function ProfileDrawer({
  isOpen,
  onClose,
  data,
}: ProfileDrawerProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return 'Active';
  }, [data]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-40' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex flex-col gap-y-6 h-full overflow-y-scroll bg-white py-6 shadow-xl'>
                    <ClosePanel onClose={onClose} />
                    <div className='flex flex-col items-center px-4 sm:px-6'>
                      <UserProfile
                        otherUser={otherUser}
                        title={title}
                        statusText={statusText}
                        isGroup={data.isGroup!}
                        users={data.users}
                      />
                      <DeleteChat setConfirmOpen={setConfirmOpen} />
                      <Description
                        data={data}
                        otherUser={otherUser}
                        joinedDate={joinedDate}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
