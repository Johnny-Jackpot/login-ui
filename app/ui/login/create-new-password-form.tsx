'use client';

import PasswordInput from "@/app/ui/inputs/password-input";
import Button from "@/app/ui/button";
import Label from "@/app/ui/inputs/label";
import {ForgotPasswordSchema} from "@/app/lib/validation";
import {useState} from "react";
import GeneralError from "@/app/ui/inputs/general-error";

export default function CreateNewPasswordForm() {
  const initialState: {
    password: string[],
    confirmPassword: string[],
    formErrors: string[],
  } = {password: [], confirmPassword: [], formErrors: []};
  const [errors, setErrors] = useState(initialState);

  const formAction = (formData: FormData) => {
    const parsedValues = ForgotPasswordSchema.safeParse({
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
    });
    if (!parsedValues.success) {
      const {
        fieldErrors: {
          password = [],
          confirmPassword = []
        },
        formErrors = []
      } = parsedValues.error.flatten();
      setErrors({password, confirmPassword, formErrors});
      return;
    }
  };

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
      <Button type='submit'>Reset Password</Button>
    </form>
  );
}
