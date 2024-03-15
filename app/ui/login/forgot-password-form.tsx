'use client'

import {useRouter} from 'next/navigation'
import Input from "@/app/ui/inputs/input";
import Button from "@/app/ui/button";
import useFieldInput from "@/app/ui/inputs/use-field-input";
import {z} from "zod";
import {email as emailRule} from "@/app/lib/validation";
import {useAxios} from "@/app/hooks/useAxios";
import {baseUrl} from "@/constants";
import {FormEvent} from "react";
import GeneralError from "@/app/ui/inputs/general-error";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email,emailErrors,,onEmailInput] = useFieldInput(
    z.object({input: emailRule})
  );
  const {data, errors, pending, sendRequest} = useAxios({
    url: `${baseUrl}auth/password-reset`,
    method: 'POST'
  });

  return (
    <form onSubmit={(event: FormEvent) => {
      event.preventDefault();
      email && !emailErrors.length && sendRequest({email});
    }}>
      <GeneralError>{errors?.generalError}</GeneralError>
      <Input
        placeholder='Enter your email'
        wrapperClassName='mb-[25px]'
        errors={emailErrors}
        onInput={onEmailInput}
      />
      <Button type='submit' className='mb-5' disabled={pending ||!!emailErrors.length}>Send</Button>
      <Button buttonType='secondary' onClick={() => router.push('/login')}>Cancel</Button>
    </form>
  );
}
