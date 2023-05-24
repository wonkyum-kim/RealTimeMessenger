'use client';

import axios from 'axios';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import { signIn } from 'next-auth/react';
import AuthSocialButton from './AuthSocialButton';
import { useState, useCallback, useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

interface FormProps {
  variant: Variant;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

interface GoLoginOrRegisterProps {
  variant: Variant;
  toggleVariant: () => void;
}

function Form({ variant, isLoading, setIsLoading }: FormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          } else if (callback?.ok) {
            router.push('/conversations');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form className='flex flex-col gap-y-6' onSubmit={handleSubmit(onSubmit)}>
      {variant === 'REGISTER' && (
        <Input
          id='name'
          label='Name'
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      )}
      <Input
        id='email'
        label='Email address'
        type='email'
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <Input
        id='password'
        label='Password'
        type='password'
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <div>
        <Button disabled={isLoading} fullWidth={true} type='submit'>
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
      </div>
    </form>
  );
}

function ContinueWith() {
  return (
    <div className='relative'>
      {/* line */}
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full border-t border-gray-300' />
      </div>
      <div className='relative flex justify-center text-sm'>
        <span className='bg-white px-2 text-gray-500'>Or continue with</span>
      </div>
    </div>
  );
}

function GoLoginOrRegister({ variant, toggleVariant }: GoLoginOrRegisterProps) {
  return (
    <div
      className='
      flex 
      gap-2 
      justify-center 
      text-sm  
      px-2 
      text-gray-500
    '
    >
      <div>
        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
      </div>
      <div onClick={toggleVariant} className='underline cursor-pointer'>
        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
      </div>
    </div>
  );
}

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN');
  }, [variant]);

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md flex flex-col gap-y-6'>
      <div
        className='
          flex
          flex-col
          gap-y-6
        bg-white 
          px-4 
          py-8 
          shadow 
          sm:rounded-lg 
          sm:px-10
        '
      >
        <Form
          variant={variant}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <ContinueWith />
        <div className='flex gap-2'>
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction('github')}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction('google')}
          />
        </div>
      </div>
      <GoLoginOrRegister variant={variant} toggleVariant={toggleVariant} />
    </div>
  );
}
