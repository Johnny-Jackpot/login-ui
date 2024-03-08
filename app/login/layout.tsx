import Image from "next/image";

export default function Layout({children}: {children: React.ReactNode}) {
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
    </div>
  );
}
