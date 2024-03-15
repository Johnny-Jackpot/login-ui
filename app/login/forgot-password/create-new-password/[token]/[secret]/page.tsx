import type {Metadata} from "next";
import PageTitle from "@/app/ui/page-title";
import CreateNewPasswordForm from "@/app/ui/login/create-new-password-form";

export const metadata: Metadata = {
  title: 'Create new password',
};

export default function Page({
  params: {
    token,
    secret
  }
}: {
  params: {
    token: string;
    secret: string;
  }
}) {
  return (
    <>
      <PageTitle>Create new Password?</PageTitle>
      <CreateNewPasswordForm token={token} secret={secret} />
    </>
  );
}
