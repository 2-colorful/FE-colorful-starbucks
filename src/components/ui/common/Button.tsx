import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 rounded-full font-medium transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none py-3 text-button1",
  {
    variants: {
      variant: {
        default: 'bg-primary-100 text-white shadow-xs hover:bg-primary-100/90',
        starbucks:
          'bg-primary-200 text-white shadow-xs hover:bg-primary-200/90',
        secondary:
          'bg-secondary-100 text-white shadow-xs hover:bg-secondary-100/80',
        wooden:
          'bg-secondary-200 text-white shadow-xs hover:bg-secondary-200/90',
        destructive: 'bg-error text-white shadow-xs hover:bg-error/90',
        outline:
          'border border-border-100 bg-white text-text-800 shadow-xs hover:bg-gray-300',
        ghost: 'text-text-800 hover:bg-gray-300',
        link: 'text-primary-100 underline-offset-4 hover:underline',
        disabled: 'bg-disabled text-text-400 cursor-not-allowed',
        pending: 'bg-primary-100 text-white cursor-not-allowed',
      },
      size: {
        sm: 'h-10 py-2 text-sm',
        default: 'h-12 py-3',
      },
      width: {
        auto: 'px-6',
        full: 'w-full px-6',
        half: 'w-1/2 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      width: 'auto',
    },
  },
);

const LoadingSpinner = () => (
  <svg
    className='animate-spin -ml-1 mr-2 h-4 w-4 text-current'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    ></circle>
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
    ></path>
  </svg>
);

function Button({
  className,
  variant,
  width,
  size,
  asChild = false,
  disabled,
  isPending,
  label,
  style,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isPending?: boolean;
    label?: string;
  }) {
  const Comp = asChild ? Slot : 'button';

  // 버튼 variant 결정 로직 개선
  let buttonVariant = variant;
  if (disabled) {
    buttonVariant = 'disabled';
  } else if (isPending) {
    buttonVariant = 'pending';
  }

  return (
    <Comp
      data-slot='button'
      className={cn(
        buttonVariants({ variant: buttonVariant, width, size, className }),
      )}
      disabled={disabled || isPending}
      style={style}
      {...props}
    >
      {isPending && <LoadingSpinner />}
      {label || children}
    </Comp>
  );
}

export { Button, buttonVariants };
