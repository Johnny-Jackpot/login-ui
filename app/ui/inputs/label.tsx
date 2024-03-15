interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export default function Label({
  children,
  ...rest
}: LabelProps) {
  return (
    <label
      className='text-[15px] leading-[21px] font-medium text-[#060E1E] mb-2 inline-block cursor-pointer'
      {...rest}
    >
      {children}
    </label>
  );
}
