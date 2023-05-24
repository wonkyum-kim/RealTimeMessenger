'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';

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
  // react-hook-form
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

    // TODO: Axios register
    if (variant === 'REGISTER') {
    }

    // TODO: NextAuth SignIn
    if (variant === 'LOGIN') {
    }
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      {/* Register an account */}
      {variant === 'REGISTER' && (
        <Input
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          id='name'
          label='Name'
        />
      )}
      <Input
        disabled={isLoading}
        register={register}
        errors={errors}
        required={true}
        id='email'
        label='Email address'
        type='email'
      />
      <Input
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        id='password'
        label='Password'
        type='password'
      />
      <Button disabled={isLoading} fullWidth={true} type='submit'>
        {variant === 'LOGIN' ? 'Sign in' : 'Register'}
      </Button>
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

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const socialAction = (action: string) => {
    setIsLoading(true);

    // TODO: NextAuth Social Sign In
  };

  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
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
        <GoLoginOrRegister variant={variant} toggleVariant={toggleVariant} />
      </div>
    </div>
  );
}
