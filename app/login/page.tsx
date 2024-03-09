import type { Metadata } from "next";
import PageTitle from "@/app/ui/page-title";

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return (
    <>
      <PageTitle>Log in to your account</PageTitle>
    </>
  );
}
