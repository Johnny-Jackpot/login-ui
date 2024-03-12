'use client';

import {Dispatch, FormEvent, FormEventHandler, SetStateAction, useState} from "react";
import {SafeParseReturnType, ZodObject, ZodType, z} from "zod";
import {debounce} from "lodash";

export type OnInputHandled = (parsedInputs: SafeParseReturnType<{}, {}>) => void;

export default function useFieldInput(
  ValidationSchema: z.ZodObject<{input: ZodType}>,
  afterOnInputCb?: OnInputHandled
): [
  string,
  string[],
  Dispatch<SetStateAction<string[]>>,
  FormEventHandler<HTMLInputElement>
] {
  const initialState: string[] = [];
  const [errors, setErrors] = useState(initialState);
  const [val, setVal] = useState('');

  const onInput = debounce((event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const parsedEmail = ValidationSchema.safeParse({
      input: target.value
    });
    setVal(target.value);
    setErrors(parsedEmail.success ? [] : parsedEmail.error.flatten().fieldErrors.input);
    afterOnInputCb && afterOnInputCb(parsedEmail);
  }, 500);

  return [val, errors, setErrors, onInput];
}
