'use server';

import {redirect} from "next/navigation";
import {AxiosError} from "axios";
import {login} from "@/app/lib/qencode-api";
import {LoginFormSchema} from "@/app/lib/validation";
import {storeCredentials} from "@/app/lib/auth";

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  generalError?: string | null;
};

type ErrorDetail = {
  field_name: string;
  error: string;
}

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  try {
    const parsedData = LoginFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!parsedData.success) {
      return {
        errors: parsedData.error.flatten().fieldErrors,
      }
    }

    const {email, password} = parsedData.data;
    const data = await login(email, password);
    await storeCredentials(data);
    redirect('/');
  } catch (e) {
    const generalErrorResponseData = {
      generalError: 'Something went wrong. Could not perform login.',
    };

    if (!(e instanceof AxiosError)) {
      return generalErrorResponseData;
    }

    const errorDetails: ErrorDetail[]|string = e?.response?.data?.detail;
    if (typeof errorDetails === 'string') {
      return {
        generalError: errorDetails,
      };
    }

    if (!Array.isArray(errorDetails)) {
      return generalErrorResponseData;
    }

    if (!errorDetails.length) {
      return generalErrorResponseData;
    }

    return {
      errors: errorDetails.reduce((prev, {field_name, error}) => ({...prev, [field_name]: [error]}), {}),
    };
  }
}
