import {clsx} from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType?: 'primary' | 'secondary' | undefined;
}

export default function Button({
  children,
  buttonType = 'primary',
  type = 'button',
  ...rest
}: ButtonProps) {
  const className = clsx(
    `w-full h-12 rounded-lg flex justify-center items-center box-border text-base leading-[21px] font-medium`,
    buttonType === 'primary' && ['bg-primary', 'text-white'],
    buttonType === 'secondary' && ['border', 'border-[#D3D8DC]']
  );

  return (
    <button className={className} type={type} {...rest}>
      {children}
    </button>
  );
}

