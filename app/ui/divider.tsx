export default function Divider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`
      before:h-px before:bg-[#E3E6E9] before:grow before:mr-[5px]
      h-4 flex items-center uppercase text-xs font-medium text-[#BEC5CC]
      after:h-px after:bg-[#E3E6E9] after:grow after:ml-[5px]
    `}>{children}</div>
  );
}
