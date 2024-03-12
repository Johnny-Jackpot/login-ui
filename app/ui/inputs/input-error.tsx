export default function InputError({children}: {children: React.ReactNode;}) {
  return (
    <span className='text-sm text-error'>{children}</span>
  );
}
