'use client';

import axios from 'axios';
import useConversation from '@/app/hooks/useConversation';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MessageInput from './MessageInput';

export default function Form() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  // TODO: Make the '/api/messages' route handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId,
    });
  };

  return (
    <div
      className='
        py-4 
        px-4 
      bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        w-full
        lg:gap-4 
    '
    >
      <HiPhoto size={30} className='text-sky-500' />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center gap-2 lg:gap-4 w-full'
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required={true}
          placeholder='Write a message'
        />
        <button
          type='submit'
          className='
            rounded-full 
            p-2 
          bg-sky-500 
            cursor-pointer 
          hover:bg-sky-600 
            transition
          '
        >
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  );
}
