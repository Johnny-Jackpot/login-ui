export default function PageTitle({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <p className='text-center font-bold text-3xl leading-[38px]'>{children}</p>
  );
}
