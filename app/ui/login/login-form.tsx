import Button from "@/app/ui/button";
import ButtonSocial from "@/app/ui/button-social";
import Divider from "@/app/ui/divider";

export default function LoginForm() {
  return (
    <form action="">
      <ButtonSocial social='google' />
      <ButtonSocial social='github' />
      <Button buttonType='primary'>Test</Button>
      <Button buttonType='secondary'>Test</Button>
      <Divider>or</Divider>
    </form>
  );
}
