export default function Notification({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className='text-green-600 text-lg'>{children}</p>
  )
}
