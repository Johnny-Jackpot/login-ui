import PasswordInput from "@/app/ui/inputs/password-input";
import Button from "@/app/ui/button";
import Label from "@/app/ui/inputs/label";

export default function CreateNewPasswordForm() {
  return (
    <form action="">
      <Label htmlFor="">Password</Label>
      <PasswordInput wrapperClassName='mb-[25px]' placeholder='password' />
      <Label htmlFor="">Confirm Password</Label>
      <PasswordInput wrapperClassName='mb-[30px]' placeholder='password'  />
      <Button type='submit'>Reset Password</Button>
    </form>
  );
}
