import Input from "@/app/ui/inputs/input";
import Button from "@/app/ui/button";

export default function ForgotPasswordForm() {
  return (
    <form action="">
      <Input placeholder='Enter your email' wrapperClassName='mb-[25px]' />
      <Button type='submit' className='mb-5'>Send</Button>
      <Button buttonType='secondary'>Cancel</Button>
    </form>
  );
}
