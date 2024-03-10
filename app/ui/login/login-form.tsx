import Button from "@/app/ui/button";
import ButtonSocial from "@/app/ui/button-social";
import Divider from "@/app/ui/divider";
import Input from "@/app/ui/inputs/input";
import PasswordInput from "@/app/ui/inputs/password-input";

export default function LoginForm() {
  return (
    <form action="">
      <ButtonSocial social='google' />
      <ButtonSocial social='github' />
      <Button buttonType='primary'>Test</Button>
      <Button buttonType='secondary'>Test</Button>
      <Divider>or</Divider>
      <Input placeholder='Work email' />
      <PasswordInput />
    </form>
  );
}
