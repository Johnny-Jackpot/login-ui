'use client';

import Link from "next/link";
import {FormEvent, useState} from "react";
import {debounce} from 'lodash';
import {z} from 'zod';
import Button from "@/app/ui/button";
import ButtonSocial from "@/app/ui/button-social";
import Divider from "@/app/ui/divider";
import Input from "@/app/ui/inputs/input";
import PasswordInput from "@/app/ui/inputs/password-input";
import {email} from "@/app/lib/validation";

export default function LoginForm() {
  const [passwordInputVisible, setPasswordInputVisible] = useState(false);
  const [emailErrors, setEmailErrors] = useState([]);

  const onEmailInput = debounce((event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const parsedEmail = z.object({email}).safeParse({
      email: target.value
    });
    setEmailErrors(parsedEmail?.error?.flatten()?.fieldErrors?.email || []);
    setPasswordInputVisible(parsedEmail.success);
  }, 700);

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
      {
        passwordInputVisible && (
          <div className='mb-[30px]'>
            <PasswordInput name='password'/>
            <p className='text-right text-sm font-medium mt-[15px]'>
              <Link href='/login/forgot-password'>Forgot your password?</Link>
            </p>
          </div>
        )
      }
      <Button className='mb-5' buttonType='primary' type='submit'>Log in to Qencode</Button>
      <p className='text-center text-sm font-medium'>
        Is your company new to Qencode? <a href='#'>Sign up</a>
      </p>
    </form>
  );
}
