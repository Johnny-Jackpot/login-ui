import {clsx} from "clsx";
import InputError from "@/app/ui/inputs/input-error";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  wrapperClassName?: string;
  errors?: string[];
}

export default function Input({
  type = 'text',
  iconBefore,
  iconAfter,
  wrapperClassName,
  errors = [],
  ...rest
}: InputProps) {
  return (
    <div className={wrapperClassName}>
      <div
        className={clsx(`rounded-lg h-12 box-border border flex items-center px-3.5`, {
          'border-secondary': !errors?.length,
          'border-error': errors?.length,
        })}>
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
      {
        errors.map((error) => (
          <InputError key={error}>{error}</InputError>
        ))
      }
    </div>
  );
}
