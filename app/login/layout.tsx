export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <p>Logo goes here</p>
      <div>{children}</div>
    </div>
  );
}
