import type { Metadata } from "next";
import PageTitle from "@/app/ui/page-title";
import LoginForm from "@/app/ui/login/login-form";

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return (
    <>
      <PageTitle>Log in to your account</PageTitle>
      <LoginForm />
    </>
  );
}
