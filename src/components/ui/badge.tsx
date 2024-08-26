import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        Saved:'border-transparent bg-pink-400 text-white',
        confirmed:
          'border-transparent bg-request text-white', 
        inProgress:
          'border-transparent bg-orange-500 text-white ',
        waitingValidation:
          'border-transparent bg-yellow-500 text-white ',
          Request:
          'border-transparent bg-request red text-white ', 
        Authentication:
          'border-transparent bg-authenticated text-white ',
        Validation:
          'border-transparent bg-validated text-white ', 
          Authorisation:
          'border-transparent bg-authorised text-white ',
        Approval:
          'border-transparent bg-approved text-white ', 
        Finalisation:
          'border-transparent bg-finalised text-white ', 
      
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
