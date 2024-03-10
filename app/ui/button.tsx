import {clsx} from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType?: 'primary' | 'secondary';
  className?: string
}

export default function Button({
  children,
  buttonType = 'primary',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `w-full h-12 rounded-lg flex justify-center items-center box-border`,
        `text-base leading-[21px] font-medium ${className}`,
        buttonType === 'primary' && ['bg-primary', 'text-white'],
        buttonType === 'secondary' && ['border', 'border-secondary']
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}

