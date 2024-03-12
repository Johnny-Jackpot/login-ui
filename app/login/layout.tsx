import Image from "next/image";
import MockToggle from "@/app/ui/MockToggle";
import {needUseMock} from "@/app/lib/mock";

export default async function Layout({children}: {children: React.ReactNode}) {
  const mock = await needUseMock();

  return (
    <div className='mt-8 sm:mt-[180px]'>
      <Image
        className='mx-auto'
        src="/logo.svg"
        alt="Qencode Logo"
        width={178}
        height={32}
        priority
      />
      <div className='mt-10 sm:mt-[80px] mx-auto max-w-[400px] box-content px-2'>{children}</div>
      <MockToggle initialMock={mock} />
    </div>
  );
}
