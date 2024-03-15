import {AxiosError} from "axios";
import {ErrorDetail} from "@/app/lib/types";

export function handleAxiosError(e: any): {
  generalError?: string;
  errors?: object;
} {
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
