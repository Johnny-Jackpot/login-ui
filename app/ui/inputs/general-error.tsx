export default function GeneralError({children}: {children: React.ReactNode;}) {
  return (
    <p className='text-md text-error'>{children}</p>
  )
}
