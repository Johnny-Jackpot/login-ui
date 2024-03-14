'use client'

import {useRouter} from 'next/navigation'
import Input from "@/app/ui/inputs/input";
import Button from "@/app/ui/button";
import useFieldInput from "@/app/ui/inputs/use-field-input";
import {z} from "zod";
import {email as emailRule} from "@/app/lib/validation";
import {useFormStatus} from "react-dom";
import {FormEvent} from "react";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email,emailErrors,,onEmailInput] = useFieldInput(
    z.object({input: emailRule})
  );
  const {pending} = useFormStatus();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        placeholder='Enter your email'
        wrapperClassName='mb-[25px]'
        errors={emailErrors}
        onInput={onEmailInput}
      />
      <Button type='submit' className='mb-5' disabled={pending || !!emailErrors.length}>Send</Button>
      <Button buttonType='secondary' onClick={() => router.push('/login')}>Cancel</Button>
    </form>
  );
}
