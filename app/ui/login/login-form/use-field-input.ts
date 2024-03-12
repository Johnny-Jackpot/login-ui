'use client';

import {FormEvent, FormEventHandler, useState} from "react";
import {SafeParseReturnType, ZodObject, ZodType} from "zod";
import {debounce} from "lodash";

export type OnInputHandled = (parsedInputs: SafeParseReturnType<{}, {}>) => void;

export default function useFieldInput(
  ValidationSchema: ZodObject<{input: ZodType}>,
  afterOnInputCb?: OnInputHandled
): [
  string,
  string[],
  FormEventHandler<HTMLInputElement>
] {
  const [errors, setErrors] = useState([]);
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

  return [val, errors, onInput];
}
