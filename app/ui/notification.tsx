export default function Notification({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className={`bg-green-500 text-white rounded-lg p-3.5 my-4`}>{children}</p>
  )
}
