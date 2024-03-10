'use client';

import Image from "next/image";
import Input, {InputProps} from "@/app/ui/inputs/input";
import {useState} from "react";

export default function PasswordInput({
  placeholder = 'Password',
  ...rest
}: InputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      minLength={8}
      placeholder={placeholder}
      type={visible ? 'text' : 'password'}
      iconAfter={
        <Image
          className='cursor-pointer'
          src='/eye.svg'
          alt="password toggle icon"
          width={20}
          height={20}
          onClick={() => {
            setVisible(prevState => !prevState);
          }}
        />
      }
      {...rest}
    />
  );
}
