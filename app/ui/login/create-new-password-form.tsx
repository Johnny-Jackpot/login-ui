'use client';

import PasswordInput from "@/app/ui/inputs/password-input";
import Button from "@/app/ui/button";
import Label from "@/app/ui/inputs/label";
import {ForgotPasswordSchema} from "@/app/lib/validation";
import {useCallback, useEffect, useState} from "react";
import GeneralError from "@/app/ui/inputs/general-error";
import {useAxios} from "@/app/hooks/useAxios";
import {baseUrl} from "@/constants";

export default function CreateNewPasswordForm({token, secret}: { token: string, secret: string }) {
  const initialState: {
    password: string[],
    confirmPassword: string[],
    formErrors: string[],
  } = {password: [], confirmPassword: [], formErrors: []};
  const [errors, setErrors] = useState(initialState);

  const {errors: apiErrors, pending, sendRequest} = useAxios({
    url: `${baseUrl}auth/password-set`,
    mockResponseData: {data: {error: 0}}
  });

  useEffect(() => {
    setErrors({
      password: apiErrors?.errors?.password || [],
      confirmPassword: apiErrors?.errors?.password_confirm || [],
      formErrors: apiErrors?.generalError ? [apiErrors.generalError] : []
    });
  }, [apiErrors]);

  const formAction = useCallback(async (formData: FormData) => {
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

    const {data: {password, confirmPassword}} = parsedValues;
    const responseData = await sendRequest({token, secret, password, password_confirm: confirmPassword});
    if (responseData?.timestamp) {
       //todo handle this case
    }
  }, [token, secret]);

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

    </form>
  );
}
