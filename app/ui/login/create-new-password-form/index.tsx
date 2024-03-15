'use client';

import PasswordInput from "@/app/ui/inputs/password-input";
import Button from "@/app/ui/button";
import Label from "@/app/ui/inputs/label";
import GeneralError from "@/app/ui/inputs/general-error";
import useCreatePasswordForm from "@/app/ui/login/create-new-password-form/use-create-password-form";
import Notification from "@/app/ui/notification";
import Link from "next/link";

export default function CreateNewPasswordForm({token, secret}: { token: string, secret: string }) {
  const {
    errors,
    pending,
    formAction,
    showSuccessNotification
  } = useCreatePasswordForm(token, secret);

  return (
    <form action={formAction}>
      {errors?.formErrors?.map((e) => <GeneralError key={e}>{e}</GeneralError>)}
      <Label htmlFor="password">Password</Label>
      <PasswordInput
        id='password'
        name='password'
        wrapperClassName='mb-[25px]'
        placeholder='password'
        errors={errors.password}
      />
      <Label htmlFor="confirm-password">Confirm Password</Label>
      <PasswordInput
        id='confirm-password'
        name='confirm-password'
        wrapperClassName='mb-[30px]'
        placeholder='password'
        errors={errors.confirmPassword}
      />
      <Button type='submit' disabled={pending}>Reset Password</Button>
      {
        showSuccessNotification && (
          <>
            <Notification>Password changes successfully.</Notification>
            <Notification>You can now  <Link href='/login'>login</Link></Notification>
          </>
        )
      }
    </form>
  );
}
