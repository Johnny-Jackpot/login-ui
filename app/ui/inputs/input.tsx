export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const {type = 'text', ...rest} = props;

  return (
    <input
      className='w-full rounded-lg h-12 box-border border border-secondary outline-red outline-primary text-[15px] leading-5 p-3.5 '
      type={type}
      {...rest}
    />
  );
}
