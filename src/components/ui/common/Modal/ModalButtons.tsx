import { cn } from '@/lib/utils';

interface WrapperProps {
  children?: Readonly<React.ReactNode>;
  className?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: Readonly<React.ReactNode>;
  className?: string;
}

function Wrapper({ children, className = '' }: WrapperProps) {
  return (
    <div
      className={cn(
        'border-t border-stroke-100',
        'flex justify-between items-center',
        '[&_button]:last:border-none',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        '!text-button2 cursor-pointer',
        'px-2 py-3.5 w-full',
        'border-r border-stroke-100',
        'bg-white hover:bg-gray-200 active:bg-gray-200',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export const ModalButtons = { Wrapper, Button };
