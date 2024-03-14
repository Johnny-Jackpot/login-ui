'use client'

import { useRouter } from 'next/navigation'
import Input from "@/app/ui/inputs/input";
import Button from "@/app/ui/button";

export default function ForgotPasswordForm() {
  const router = useRouter();

  return (
    <form action="">
      <Input placeholder='Enter your email' wrapperClassName='mb-[25px]' />
      <Button type='submit' className='mb-5'>Send</Button>
      <Button buttonType='secondary' onClick={() => router.push('/login')}>Cancel</Button>
    </form>
  );
}
