'use client';

import Link from "next/link";
import {useEffect, useState} from "react";
import {useFormState, useFormStatus} from 'react-dom';
import {z} from 'zod';
import {clsx} from "clsx";
import Button from "@/app/ui/button";
import ButtonSocial from "@/app/ui/button-social";
import Divider from "@/app/ui/divider";
import Input from "@/app/ui/inputs/input";
import PasswordInput from "@/app/ui/inputs/password-input";
import {email as emailRule, password as passwordRule} from "@/app/lib/validation";
import useFieldInput from "@/app/ui/inputs/use-field-input";
import {loginAction} from "@/app/lib/actions";
import GeneralError from "@/app/ui/inputs/general-error";

export default function LoginForm() {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [
    email,
    emailErrors,
    setEmailErrors,
    onEmailInput
  ] = useFieldInput(
    z.object({input: emailRule}),
    (parsedEmail) => {
      setShowPasswordInput(parsedEmail.success);
    });
  const [
    password,
    passwordErrors,
    setPasswordErrors,
    onPasswordInput
  ] = useFieldInput(z.object({input: passwordRule}));

  const {pending} = useFormStatus();
  const initialState = {generalError: null, errors: {}};
  const [state, dispatch] = useFormState(loginAction, initialState);
  useEffect(() => {
    setEmailErrors(state?.errors?.email || []);
    setPasswordErrors(state?.errors?.password || []);
  }, [state]);

  return (
    <form action={dispatch}>
      <div className='grid grid-cols-2 gap-x-4'>
        <ButtonSocial social='google'/>
        <ButtonSocial social='github'/>
      </div>
      <Divider className='my-[30px]'>or</Divider>
      {
        state?.generalError && (
          <GeneralError>{state?.generalError}</GeneralError>
        )
      }
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
        disabled={pending || !email || !password || !!emailErrors.length || !!passwordErrors.length}
      >
        Log in to Qencode
      </Button>
      <p className='text-center text-sm font-medium'>
        Is your company new to Qencode? <a href='#'>Sign up</a>
      </p>
    </form>
  );
}
