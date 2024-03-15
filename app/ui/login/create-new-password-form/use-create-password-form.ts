import {useCallback, useEffect, useState} from "react";
import {useAxios} from "@/app/hooks/useAxios";
import {baseUrl} from "@/constants";
import {ForgotPasswordSchema} from "@/app/lib/validation";

export default function useCreatePasswordForm(token: string, secret: string) {
  const initialState: {
    password: string[],
    confirmPassword: string[],
    formErrors: string[],
  } = {password: [], confirmPassword: [], formErrors: []};
  const [errors, setErrors] = useState(initialState);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const {errors: apiErrors, pending, sendRequest} = useAxios({
    url: `${baseUrl}auth/password-set`,
    mockResponseData: {data: {timestamp: (new Date().getTime())}}
  });

  //update ui with api errors
  useEffect(() => {
    setErrors({
      password: apiErrors?.errors?.password || [],
      confirmPassword: apiErrors?.errors?.password_confirm || [],
      formErrors: apiErrors?.generalError ? [apiErrors.generalError] : []
    });
  }, [apiErrors]);

  const formAction = useCallback(async (formData: FormData) => {
    setShowSuccessNotification(false);

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
      setShowSuccessNotification(true);
    }
  }, [token, secret]);

  return {errors, pending, formAction, showSuccessNotification};
}
