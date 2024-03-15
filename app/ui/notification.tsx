export default function Notification({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className='text-green-600 my-4'>{children}</p>
  )
}
