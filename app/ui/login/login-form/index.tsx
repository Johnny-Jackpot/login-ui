'use client';

import Link from "next/link";
import {useState} from "react";
import {z} from 'zod';
import {clsx} from "clsx";
import Button from "@/app/ui/button";
import ButtonSocial from "@/app/ui/button-social";
import Divider from "@/app/ui/divider";
import Input from "@/app/ui/inputs/input";
import PasswordInput from "@/app/ui/inputs/password-input";
import {email as emailRule, password as passwordRule} from "@/app/lib/validation";
import useFieldInput from "@/app/ui/login/login-form/use-field-input";

export default function LoginForm() {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [email, emailErrors, onEmailInput] = useFieldInput(
    z.object({input: emailRule}),
    (parsedEmail) => {
      setShowPasswordInput(parsedEmail.success);
    });
  const [
    password,
    passwordErrors,
    onPasswordInput
  ] = useFieldInput(z.object({input: passwordRule}));

  return (
    <form action=''>
      <div className='grid grid-cols-2 gap-x-4'>
        <ButtonSocial social='google'/>
        <ButtonSocial social='github'/>
      </div>
      <Divider className='my-[30px]'>or</Divider>
      <Input
        onInput={onEmailInput}
        name='email'
        placeholder='Work email'
        wrapperClassName='mb-[25px]'
        errors={emailErrors}
      />
      <div className={clsx('mb-[30px]', {'hidden ': !showPasswordInput})}>
        <PasswordInput name='password' errors={passwordErrors} onInput={onPasswordInput}/>
        <p className='text-right text-sm font-medium mt-[15px]'>
          <Link href='/login/forgot-password'>Forgot your password?</Link>
        </p>
      </div>
      <Button
        className='mb-5'
        buttonType='primary'
        type='submit'
        disabled={!email || !password || !!emailErrors.length || !!passwordErrors.length}
      >
        Log in to Qencode
      </Button>
      <p className='text-center text-sm font-medium'>
        Is your company new to Qencode? <a href='#'>Sign up</a>
      </p>
    </form>
  );
}
