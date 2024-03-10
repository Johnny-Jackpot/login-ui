'use client';

import Link from "next/link";
import Button from "@/app/ui/button";
import ButtonSocial from "@/app/ui/button-social";
import Divider from "@/app/ui/divider";
import Input from "@/app/ui/inputs/input";
import PasswordInput from "@/app/ui/inputs/password-input";
import {useState} from "react";

export default function LoginForm() {
  const [passwordInputVisible, setPasswordInputVisible] = useState(false);

  return (
    <form action="">
      <div className='grid grid-cols-2 gap-x-4'>
        <ButtonSocial social='google' />
        <ButtonSocial social='github' />
      </div>
      <Divider className='my-[30px]'>or</Divider>
      <Input placeholder='Work email' wrapperClassName='mb-[25px]' />
      {
        passwordInputVisible && (
          <div className='mb-[30px]'>
            <PasswordInput/>
            <p className='text-right text-sm font-medium mt-[15px]'>
              <Link href='/login/forgot-password'>Forgot your password?</Link>
            </p>
          </div>
        )
      }
      <Button className='mb-5' buttonType='primary'>Log in to Qencode</Button>
      <p className='text-center text-sm font-medium'>
        Is your company new to Qencode? <a href='#'>Sign up</a>
      </p>
    </form>
  );
}
