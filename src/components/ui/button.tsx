import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Custom variants per docs/04-design-system.md § Components — extends the
// standard shadcn/ui button with the Coach Malek "primary" (filled), "secondary"
// (outline), and "gold-ghost" (underline link) treatments.
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[20px] text-sm font-medium transition-all duration-200 ease-premium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-soft-lg active:translate-y-0',
        secondary:
          'border border-primary/20 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground',
        'gold-ghost':
          'text-primary underline-offset-4 decoration-gold decoration-2 hover:underline px-0',
        ghost: 'hover:bg-primary/5 text-primary',
      },
      size: {
        default: 'h-12 px-7',
        sm: 'h-10 px-5 text-sm',
        lg: 'h-14 px-9 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
