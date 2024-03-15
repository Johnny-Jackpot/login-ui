'use server';

import {redirect} from "next/navigation";
import {login} from "@/app/lib/qencode-api";
import {LoginFormSchema} from "@/app/lib/validation";
import {storeCredentials} from "@/app/lib/auth";
import {revalidatePath} from "next/cache";
import {LoginFormState} from "@/app/lib/types";
import {handleAxiosError} from "@/app/lib/utils";

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
  } catch (e: any) {
    return handleAxiosError(e);
  }

  revalidatePath('/');
  redirect('/');
}
