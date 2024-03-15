'use client';

import {useCallback, useState} from "react";
import axios from "axios";
import {handleAxiosError} from "@/app/lib/utils";
import {keyable} from "@/app/lib/types";

export function useAxios({
  url,
  method = 'POST',
  mockResponseData
}: {
  url: string;
  method?: string,
  mockResponseData?: {
    data: any,
  }
}) {
  const errorInitialState: { errors?: keyable, generalError?: string } = {errors: {}, generalError: ''};
  const [errors, setErrors] = useState(errorInitialState);
  const [pending, setPending] = useState(false);

  const sendRequest = useCallback(async (requestData: keyable): Promise<keyable> => {
    try {
      setPending(true);
      const useMock = document.cookie.search('use-mock=1') !== -1;
      const {data} = useMock && mockResponseData
        ? mockResponseData : await axios.request({url, method, data: requestData});
      return data;
    } catch (e) {
      setErrors(handleAxiosError(e));
    } finally {
      setPending(false);
    }

    return {};
  }, [url, method, mockResponseData]);

  return {errors, pending, sendRequest};
}
