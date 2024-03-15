'use client'

import {useRouter} from 'next/navigation'
import Input from "@/app/ui/inputs/input";
import Button from "@/app/ui/button";
import useFieldInput from "@/app/ui/inputs/use-field-input";
import {z} from "zod";
import {email as emailRule} from "@/app/lib/validation";
import {useAxios} from "@/app/hooks/useAxios";
import {baseUrl} from "@/constants";
import {FormEvent, useState} from "react";
import GeneralError from "@/app/ui/inputs/general-error";
import Notification from "@/app/ui/notification";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [url, setUrl] = useState();
  const [email, emailErrors, , onEmailInput] = useFieldInput(
    z.object({input: emailRule})
  );
  const {errors, pending, sendRequest} = useAxios({
    url: `${baseUrl}auth/password-reset`,
    mockResponseData: {
      data: {
        url: '/login/forgot-password/create-new-password/token123/secret123'
      }
    }
  });

  return (
    <form onSubmit={(event: FormEvent) => {
      event.preventDefault();
      email && !emailErrors.length && sendRequest({email}).then(({url}) => {
        url && setUrl(url);
      });
    }}>
      <GeneralError>{errors?.generalError}</GeneralError>
      <Input
        placeholder='Enter your email'
        wrapperClassName='mb-[25px]'
        errors={emailErrors}
        onInput={onEmailInput}
      />
      <Button type='submit' className='mb-5' disabled={pending || !!emailErrors.length}>Send</Button>
      <Button buttonType='secondary' onClick={() => router.push('/login')}>Cancel</Button>
      {
        url && (
          <>
            <Notification>
              <p>If this email exists you will receive a link to set new password</p>
            </Notification>
              <p>
                For demo purposes use this <Link href={url}>link</Link>
              </p>
          </>
        )
      }
    </form>
  );
}
