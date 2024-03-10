import {clsx} from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  wrapperClassName?: string,
}

export default function Input({
  type = 'text',
  iconBefore,
  iconAfter,
  wrapperClassName,
  ...rest
}: InputProps) {
  return (
    <div className={`rounded-lg h-12 box-border border border-secondary flex items-center px-3.5 ${wrapperClassName}`}>
      {iconBefore}
      <input
        className={clsx('w-full text-[15px] leading-5 outline-none', {
          'ml-3.5': iconBefore,
          'mr-3.5': iconAfter
        })}
        type={type}
        {...rest}
      />
      {iconAfter}
    </div>
  );
}
