import type { Metadata } from "next";
import PageTitle from "@/app/ui/page-title";
import ForgotPasswordForm from "@/app/ui/login/forgot-password-form";

export const metadata: Metadata = {
  title: 'Forgot password',
};

export default function Page() {
  return (
    <>
      <PageTitle>Forgot Password?</PageTitle>
      <ForgotPasswordForm />
    </>
  );
}
