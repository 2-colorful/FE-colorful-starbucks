import { cn } from '@/lib/utils';
import { Input } from '../input';
import { Label } from '../label';

export interface TextFieldProps extends React.ComponentProps<'input'> {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function TextField({
  label,
  error,
  className,
  ...props
}: TextFieldProps) {
  return (
    <div className={cn('relative pt-4', className)}>
      <Input
        id={props.name}
        placeholder=' '
        className='peer block w-full px-2 text-body3 text-gray-900 selection:bg-primary-100/20 selection:text-black'
        {...props}
      />
      <Label
        htmlFor={props.name}
        className='absolute px-2 left-0 top-0 text-xs text-gray-500 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:text-xs peer-focus:top-0 peer-focus:text-black'
      >
        <span>{label}</span>
        {props.required && <span className='text-error'>*</span>}
      </Label>
      {error && (
        <div className='pt-2 pl-2'>
          <p className='text-caption3 text-error'>{error}</p>
        </div>
      )}
    </div>
  );
}
