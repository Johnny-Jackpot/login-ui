'use server';

import {redirect} from "next/navigation";
import {AxiosError} from "axios";
import {login} from "@/app/lib/qencode-api";
import {LoginFormSchema} from "@/app/lib/validation";
import {storeCredentials} from "@/app/lib/auth";
import {revalidatePath} from "next/cache";
import {ErrorDetail, LoginFormState} from "@/app/lib/types";

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
    const {data} = await login(email, password);
    await storeCredentials(data);
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

  revalidatePath('/');
  redirect('/');
}
