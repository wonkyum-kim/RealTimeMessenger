'use client';

import React, { useCallback, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modals/Modal';
import Button from '@/app/components/Button';
import useConversation from '@/app/hooks/useConversation';
import { toast } from 'react-hot-toast';

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push('/conversations');
        router.refresh();
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [router, conversationId, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='sm:flex sm:items-start'>
        <div
          className='
            flex 
            h-12 
            w-12 
            flex-shrink-0 
            items-center 
            justify-center 
            rounded-full 
            bg-red-100 
            sm:mx-0 
            sm:h-10 
            sm:w-10
          '
        >
          <FiAlertTriangle className='h-6 w-6 text-red-600' />
        </div>
        <div
          className='
            mt-3 
            text-center 
            sm:ml-4 
            sm:mt-0 
            sm:text-left
          '
        >
          <Dialog.Title
            as='h3'
            className='text-base font-semibold leading-6 text-gray-900'
          >
            Delete conversation
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-gray-500 break-keep'>
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className='pt-4 flex justify-end'>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}