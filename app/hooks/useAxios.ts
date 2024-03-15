'use client';

import {useCallback, useState} from "react";
import axios from "axios";
import {handleAxiosError} from "@/app/lib/utils";

export function useAxios({
  url,
  method,
  mockResponseData
}: {
  url: string;
  method: string,
  mockResponseData?: {
    data: any,
  }
}) {
  const [data, setData] = useState();
  const errorInitialState: {errors?: object, generalError?: string} = {errors: [], generalError: ''};
  const [errors, setErrors] = useState(errorInitialState);
  const [pending, setPending] = useState(false);

  const sendRequest = useCallback(async (requestData: object) => {
    try {
      setPending(true);
      const useMock = document.cookie.search('use-mock=1') !== -1;
      const {data} = useMock && mockResponseData
        ? mockResponseData : await axios.request({url, method, data: requestData});
      setData(data);
    } catch (e) {
      setErrors(handleAxiosError(e));
    } finally {
      setPending(false);
    }
  }, [url, method, mockResponseData]);

  return {data, errors, pending, sendRequest};
}
